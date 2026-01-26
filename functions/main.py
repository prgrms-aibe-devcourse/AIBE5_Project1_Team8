# functions/main.py
from firebase_functions import firestore_fn, options
from firebase_admin import initialize_app, firestore
import google.genai as genai
from google.genai import types
import requests
import json
import urllib.parse
import re

# Initialize Firebase
initialize_app()

# ==========================================
# [CONFIGURATION] API KEYS
# ==========================================
GOOGLE_API_KEY = ""
KTO_SERVICE_KEY = ""

# Initialize Gemini Client
client = genai.Client(api_key=GOOGLE_API_KEY)

# Category Mapping
CATEGORY_MAP = {
    "a": {"contentTypeId": "12", "cat1": "A01", "cat2": "A0101", "cat3": ""},
    "b": {"contentTypeId": "12", "cat1": "A02", "cat2": "A0201", "cat3": ""},
    "c": {"contentTypeId": "12", "cat1": "A02", "cat2": "A0202", "cat3": ""},
    "d": {"contentTypeId": "12", "cat1": "A02", "cat2": "A0205", "cat3": ""},
    "e": {"contentTypeId": "12", "cat1": "A02", "cat2": "A0203", "cat3": ""},
    "f": {"contentTypeId": "14", "cat1": "A02", "cat2": "A0206", "cat3": "A02060100"},
    "g": {"contentTypeId": "14", "cat1": "A02", "cat2": "A0206", "cat3": "A02060500"},
    "h": {"contentTypeId": "15", "cat1": "A02", "cat2": "A0207", "cat3": "A02070100"},
    "i": {"contentTypeId": "15", "cat1": "A02", "cat2": "A0207", "cat3": "A02070200"}
}

def clean_json_text(text):
    text = text.strip()
    if text.startswith("```"):
        lines = text.splitlines()
        if len(lines) >= 3:
            return "\n".join(lines[1:-1])
    return text

# ==========================================
# CLOUD FUNCTION
# ==========================================
@firestore_fn.on_document_created(
    document="chats/{sessionId}/messages/{messageId}",
    region="asia-northeast3"
)
def on_message_created(event: firestore_fn.Event[firestore_fn.DocumentSnapshot]) -> None:
    
    # Lazy Initialization
    db = firestore.client()
    
    snapshot = event.data
    new_message = snapshot.to_dict()
    session_id = event.params["sessionId"]

    if not new_message or new_message.get("sender") != "user":
        return

    messages_ref = db.collection("chats").document(session_id).collection("messages")
    query = messages_ref.order_by("timestamp").stream()
    history = [doc.to_dict().get("text") for doc in query if doc.to_dict().get("sender") == "user"]
    
    if len(history) == 3:
        generate_recommendation(session_id, history, db)

def generate_recommendation(session_id, answers, db):
    try:
        # [Step 1] Analyze Category
        prompt_step1 = f"""
        User Answers: {answers}
        Analyze the answers and select one category code (a-i) from the list below.
        Categories:
        a. 자연관광지, b. 역사관광지, c. 휴양관광지, d. 건축/조형물, e. 체험관광지, 
        f. 박물관, g. 미술관, h. 문화관광축제, i. 일반축제

        Output ONLY JSON: {{ "selected_code": "code" }}
        """
        response1 = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt_step1,
            config=types.GenerateContentConfig(response_mime_type="application/json")
        )
        result1 = json.loads(clean_json_text(response1.text))
        category_code = result1.get("selected_code", "a")

        # [Step 2] Call KTO API
        api_params = CATEGORY_MAP.get(category_code, CATEGORY_MAP["a"])
        base_url = "http://apis.data.go.kr/B551011/KorService2/areaBasedList2"
        params = {
            "serviceKey": urllib.parse.unquote(KTO_SERVICE_KEY), 
            "numOfRows": "15", "pageNo": "1", "MobileOS": "ETC", "MobileApp": "AIBE", 
            "_type": "json", "arrange": "Q", "contentTypeId": api_params["contentTypeId"],
            "cat1": api_params["cat1"], "cat2": api_params["cat2"], "cat3": api_params["cat3"]
        }
        
        res = requests.get(base_url, params=params)
        kto_data = res.json()
        
        try:
            items = kto_data['response']['body']['items']['item']
        except (KeyError, TypeError):
            items = []
        
        # 주소(addr1) 정보도 후보군에 포함
        candidates = [{"title": i.get("title"), "addr": i.get("addr1"), "image": i.get("firstimage")} for i in items]

        # [Step 3] Final Recommendation (Prompt Strengthened)
        prompt_step2 = f"""
        User Preferences: "{answers}"
        Candidate List: {json.dumps(candidates[:15], ensure_ascii=False)} 

        TASK: Select top 5 places and write a recommendation description for EACH.
        
        CRITICAL RULES:
        1. You MUST include a "description" field for every item.
        2. The description must be 2 sentences in Korean, explaining why this place fits the user's vibe.
        3. Do NOT omit the description.
        4. Output strictly valid JSON.

        Output Format:
        {{
            "recommendations": [
                {{ 
                    "title": "Place Name", 
                    "image": "Image URL", 
                    "description": "Write the description here (Korean)" 
                }}
            ]
        }}
        """
        response2 = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt_step2,
            config=types.GenerateContentConfig(response_mime_type="application/json")
        )
        final_result = json.loads(clean_json_text(response2.text))

        # [Step 4] Save to Firestore
        db.collection("chats").document(session_id).collection("messages").add({
            "sender": "ai",
            "type": "recommendation",
            "content": final_result,
            "timestamp": firestore.SERVER_TIMESTAMP
        })

    except Exception as e:
        print(f"Error: {e}")
        db.collection("chats").document(session_id).collection("messages").add({
            "sender": "ai",
            "text": "죄송합니다. 오류가 발생했습니다.",
            "timestamp": firestore.SERVER_TIMESTAMP
        })