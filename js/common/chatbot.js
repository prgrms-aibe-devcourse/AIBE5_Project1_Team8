// js/common/chatbot.js

// 1. Firebase Config
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// 2. Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// 3. Global Variables
let db;
let sessionId;
let currentStep = 0;
let isProcessing = false;
const questions = [
    "이번 여행의 전체적인 분위기는 어땠으면 좋겠어요?",
    "도착해서 눈앞에 펼쳐진 풍경이 어떤 모습일 때 가장 설렐 것 같나요?",
    "마지막으로, 이번 여행에서 '이것만큼은 꼭 하고 싶다' 하는 게 있을까요?"
];

// 4. MAIN INJECTION FUNCTION
document.addEventListener("DOMContentLoaded", () => {
    injectChatbotHTML();
    initializeChatbotLogic();
});

function injectChatbotHTML() {
    if (document.getElementById('chatbot-root')) return;

    const chatRoot = document.createElement('div');
    chatRoot.id = 'chatbot-root';

    // [UPDATED] Uses new unique class names
    chatRoot.innerHTML = `
        <button id="chatbot-trigger" class="chat-btn">
            <span class="material-icons">chat_bubble</span>
        </button>

        <div id="chat-window" class="chat-window hidden">
            <div class="chat-header">
                <div class="chat-profile-area">
                    <div class="chat-avatar-circle"></div>
                    <span class="chat-bot-name">AI 여행 도우미</span>
                </div>
                <button id="close-chat-btn" class="chat-close-btn">
                    <span class="material-icons">close</span>
                </button>
            </div>

            <div id="chat-body" class="chat-body"></div>

            <div class="chat-footer">
                <div class="chat-input-container">
                    <input type="text" id="chat-user-input" placeholder="답변을 입력하세요..." autocomplete="off">
                    <button id="chat-send-btn">
                        <span class="material-icons">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(chatRoot);
}

function initializeChatbotLogic() {
    const chatWindow = document.getElementById("chat-window");
    const chatBody = document.getElementById("chat-body");
    const userInput = document.getElementById("chat-user-input"); // Updated ID
    const triggerBtn = document.getElementById("chatbot-trigger");
    const closeBtn = document.getElementById("close-chat-btn");
    const sendBtn = document.getElementById("chat-send-btn"); // Updated ID

    if (!chatWindow || (!db && typeof firebase !== 'undefined')) {
        db = firebase.firestore();
    }

    // --- Session Management ---
    sessionId = sessionStorage.getItem("chatSessionId");
    if (!sessionId) {
        sessionId = "sess_" + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem("chatSessionId", sessionId);
    }

    // --- UI State ---
    const isChatOpen = sessionStorage.getItem("isChatOpen") === "true";
    if (isChatOpen) {
        chatWindow.classList.remove("hidden");
    }

    // --- Event Listeners ---
    triggerBtn.addEventListener("click", () => {
        const isHidden = chatWindow.classList.contains("hidden");
        toggleChat(isHidden);
    });

    closeBtn.addEventListener("click", () => toggleChat(false));

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    // --- Firestore Listener ---
    db.collection("chats").doc(sessionId).collection("messages")
        .orderBy("timestamp")
        .onSnapshot((snapshot) => {
            let userMsgCount = 0;
            snapshot.docs.forEach(doc => {
                if (doc.data().sender === 'user') userMsgCount++;
            });
            currentStep = userMsgCount;

            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const msg = change.doc.data();
                    renderMessage(msg);
                }
            });
        });

    // --- Functions ---
    function toggleChat(forceOpen) {
        if (forceOpen) {
            chatWindow.classList.remove("hidden");
            sessionStorage.setItem("isChatOpen", "true");

            if (chatBody.childElementCount === 0 && currentStep === 0) {
                db.collection("chats").doc(sessionId).collection("messages").get().then(snap => {
                    if (snap.empty) {
                        db.collection("chats").doc(sessionId).collection("messages").add({
                            sender: "ai",
                            text: "안녕하세요! 당신에게 딱 맞는 국내 여행지를 찾아드릴게요.",
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        });
                        setTimeout(() => {
                            db.collection("chats").doc(sessionId).collection("messages").add({
                                sender: "ai",
                                text: `Q1. ${questions[0]}`,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            });
                        }, 500);
                    }
                });
            }
        } else {
            chatWindow.classList.add("hidden");
            sessionStorage.setItem("isChatOpen", "false");
        }
    }

    function renderMessage(msg) {
        // Prevent duplicates
        const messages = Array.from(chatBody.getElementsByClassName('chat-message'));
        const exists = messages.some(div => div.innerText === msg.text);

        if (msg.sender === "user") {
            if (!exists) addMessageUI("user", msg.text);
        } else if (msg.type === "recommendation") {
            // Check for existing cards
            const hasCards = document.querySelectorAll('.ai-place-card').length > 0;
            if (!hasCards && msg.content && msg.content.recommendations) {
                msg.content.recommendations.forEach(place => addPlaceCard(place));
                addMessageUI("ai", "고객님의 답변에 가장 어울리는 5개의 여행지를 엄선했습니다. 즐거운 여행 되세요!");
            }
        } else {
            if (!exists) addMessageUI("ai", msg.text);
        }
    }

    function addMessageUI(sender, text) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chat-message", sender); // Updated class
        msgDiv.innerText = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text || isProcessing) return;

        userInput.value = "";

        const nextQIndex = currentStep + 1;

        try {
            await db.collection("chats").doc(sessionId).collection("messages").add({
                sender: "user",
                text: text,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            if (nextQIndex < 3) {
                setTimeout(() => {
                    db.collection("chats").doc(sessionId).collection("messages").add({
                        sender: "ai",
                        text: `Q${nextQIndex + 1}. ${questions[nextQIndex]}`,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }, 800);
            } else if (nextQIndex === 3) {
                addMessageUI("ai", "여행 취향을 분석하고 한국관광공사 데이터를 검색 중입니다... 🔍");
            }
        } catch (e) {
            console.error(e);
            addMessageUI("ai", "전송 중 오류가 발생했습니다.");
        }
    }

    function addPlaceCard(place) {
        const cardDiv = document.createElement("div");
        // [UPDATED] Uses new unique class names
        cardDiv.classList.add("ai-place-card");

        let imgUrl = place.image ? place.image : 'https://via.placeholder.com/300x200?text=No+Image';

        cardDiv.innerHTML = `
            <div class="ai-card-image">
                <img src="${imgUrl}" onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'">
            </div>
            <div class="ai-card-content">
                <h3 class="ai-place-title">${place.title}</h3>
                <p class="ai-place-desc">${place.description || "설명을 불러오는 중입니다..."}</p>
            </div>
        `;
        chatBody.appendChild(cardDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}