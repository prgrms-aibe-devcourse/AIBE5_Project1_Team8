// ===== Firebase에서 관광지 상세 조회 =====
async function fetchPlaceFromFirebase(placeId) {
  const { db } = await import("../common/firebase-config.js");
  const {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    query,
    where,
  } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

  // 1) 문서 ID로 직접 조회 (가장 빠름)
  try {
    const ref = doc(db, "tour_items", placeId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
  } catch (e) {
    console.warn("tour_items doc(id) 조회 실패:", e);
  }

  // 2) contentid로 조회 (list에서 detailId로 넘어오는 값이 contentid인 경우)
  try {
    const q = query(
      collection(db, "tour_items"),
      where("contentid", "==", placeId),
      limit(1)
    );
    const qs = await getDocs(q);
    if (!qs.empty) {
      const d = qs.docs[0];
      return { id: d.id, ...d.data() };
    }
  } catch (e) {
    console.warn("tour_items where(contentid) 조회 실패:", e);
  }

  return null;
}

function mapTourItemDocToPlace(docData, placeId) {
  const name = docData?.name || docData?.title || "관광지명";
  const address = docData?.address || docData?.addr1 || "";
  const contact = docData?.contact || docData?.tel || "";
  const image =
    docData?.image ||
    docData?.firstimage ||
    docData?.firstimage2 ||
    "";
  
  const time = docData?.time || docData?.usetime || docData?.usetimeculture || "정보 없음";
  
  const desc =
    docData?.desc ||
    docData?.overview ||
    docData?.description ||
    "관광지 상세 설명이 준비 중입니다.";

  // DB의 boolean 필드 정규화: null/undefined -> false, true/"true"/1 -> true
  const toBool = (v) => {
    if (v == null) return false; // null/undefined
    if (typeof v === "boolean") return v;
    if (typeof v === "number") return v === 1;
    if (typeof v === "string") {
      const s = v.trim().toLowerCase();
      return s === "true" || s === "1" || s === "y" || s === "yes";
    }
    return Boolean(v);
  };

  return {
    id: docData?.id || docData?.contentid || placeId,
    name,
    address,
    contact,
    image,
    time,
    desc,
    // 픽토그램은 DB에 없을 수 있으니 안전 기본값
    parking: toBool(docData?.parking),
    pet: toBool(docData?.pet),
    chkbabycarriage: toBool(docData?.chkbabycarriage),
  };
}

// ===== 관광지 데이터 (하드코딩 - 폴백용, 주석 처리) =====
const places = {
  // ===== 서울 =====
  1: {
    name: "경복궁",
    region: "seoul",
    image: "images/places/gyeongbokgung.jpg",
    address: "서울특별시 종로구 사직로 161",
    contact: "02-3700-3900",
    time: "09:00 ~ 18:00 (화요일 휴궁)",
    desc: "조선 왕조의 대표적인 궁궐로, 한국의 역사와 전통을 느낄 수 있는 서울의 상징적인 명소입니다. 1395년 태조 이성계가 창건하였으며, 근정전, 경회루, 향원정 등 아름다운 건축물들이 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  2: {
    name: "남산타워",
    region: "seoul",
    image: "images/places/namsan.jpg",
    address: "서울특별시 용산구 남산공원길 105",
    contact: "02-3455-9277",
    time: "10:00 ~ 23:00",
    desc: "서울 전경을 한눈에 감상할 수 있는 전망 명소로 야경이 특히 아름답습니다. 사랑의 자물쇠로 유명하며, 케이블카를 타고 올라갈 수 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  3: {
    name: "북촌한옥마을",
    region: "seoul",
    image: "images/places/bukchon.jpg",
    address: "서울특별시 종로구 계동길 37",
    contact: "02-2148-4160",
    time: "연중무휴 (주택가이므로 조용히 관람)",
    desc: "전통 한옥이 잘 보존된 마을로, 서울 도심에서 한국의 전통미를 느낄 수 있습니다. 600년 역사를 간직한 한옥들이 모여있는 아름다운 골목길입니다.",
    parking: false,
    chkcreditcard: false,
    expagerange: "전연령",
    chkbabycarriage: false
  },

  // ===== 부산 =====
  4: {
    name: "해운대 해수욕장",
    region: "busan",
    image: "images/places/haeundae.jpg",
    address: "부산광역시 해운대구 해운대해변로 264",
    contact: "051-749-7601",
    time: "연중무휴 (해수욕장 개장: 7~8월)",
    desc: "부산을 대표하는 해변 관광지로 사계절 내내 많은 관광객이 찾는 명소입니다. 1.5km의 아름다운 백사장과 다양한 편의시설이 갖춰져 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  5: {
    name: "광안리 해수욕장",
    region: "busan",
    image: "images/places/gwangalli.jpg",
    address: "부산광역시 수영구 광안해변로 219",
    contact: "051-610-4742",
    time: "연중무휴",
    desc: "광안대교 야경으로 유명한 부산의 인기 해변입니다. 해변가 카페와 레스토랑이 즐비하며 불꽃축제로도 유명합니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  6: {
    name: "감천문화마을",
    region: "busan",
    image: "images/places/gamcheon.jpg",
    address: "부산광역시 사하구 감내2로 203",
    contact: "051-291-1444",
    time: "09:00 ~ 18:00",
    desc: "알록달록한 집들과 골목 예술로 유명한 부산의 대표적인 문화 마을입니다. 한국의 마추픽추라 불리며 다양한 조형물과 벽화가 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: false
  },

  // ===== 제주 =====
  7: {
    name: "성산일출봉",
    region: "jeju",
    image: "images/places/seongsan.jpg",
    address: "제주특별자치도 서귀포시 성산읍 성산리 1",
    contact: "064-783-0959",
    time: "07:00 ~ 19:00 (계절별 상이)",
    desc: "유네스코 세계자연유산으로 지정된 제주도의 대표적인 일출 명소입니다. 약 5,000년 전 해저 화산 폭발로 형성된 분화구입니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: false
  },
  8: {
    name: "한라산",
    region: "jeju",
    image: "images/places/hallasan.jpg",
    address: "제주특별자치도 제주시 1100로 2070-61",
    contact: "064-713-9950",
    time: "계절별 입산통제 상이",
    desc: "제주도의 중심에 위치한 대한민국 최고봉으로 사계절 모두 아름다운 자연을 자랑합니다. 해발 1,947m로 다양한 등산 코스가 있습니다.",
    parking: true,
    chkcreditcard: false,
    expagerange: "7세 이상",
    chkbabycarriage: false
  },
  9: {
    name: "협재 해수욕장",
    region: "jeju",
    image: "images/places/hyeopjae.jpg",
    address: "제주특별자치도 제주시 한림읍 협재리 2497-1",
    contact: "064-728-3981",
    time: "연중무휴",
    desc: "에메랄드빛 바다와 하얀 모래가 인상적인 제주도의 인기 해변입니다. 비양도를 배경으로 한 아름다운 석양으로 유명합니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },

  // ===== 강릉 =====
  10: {
    name: "경포대",
    region: "gangneung",
    image: "images/places/gyeongpodae.jpg",
    address: "강원도 강릉시 경포로 365",
    contact: "033-640-5420",
    time: "연중무휴",
    desc: "경포호와 동해 바다를 함께 감상할 수 있는 강릉의 대표적인 관광지입니다. 관동팔경 중 하나로 달을 감상하기 좋은 정자가 있습니다.",
    parking: true,
    chkcreditcard: false,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  11: {
    name: "안목해변",
    region: "gangneung",
    image: "images/places/anmok.jpg",
    address: "강원도 강릉시 창해로14번길",
    contact: "033-640-5420",
    time: "연중무휴",
    desc: "바다를 바라보며 커피를 즐길 수 있는 카페 거리로 유명한 명소입니다. 강릉 커피 문화의 중심지로 다양한 카페가 즐비합니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },

  // ===== 경주 =====
  12: {
    name: "불국사",
    region: "gyeongju",
    image: "images/places/bulguksa.jpg",
    address: "경상북도 경주시 불국로 385",
    contact: "054-746-9913",
    time: "09:00 ~ 18:00",
    desc: "신라 시대의 대표적인 사찰로 세계문화유산에 등재된 역사 명소입니다. 석가탑, 다보탑 등 국보급 문화재가 많습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: false
  },
  13: {
    name: "첨성대",
    region: "gyeongju",
    image: "images/places/cheomseongdae.jpg",
    address: "경상북도 경주시 인왕동 839-1",
    contact: "054-772-5134",
    time: "연중무휴",
    desc: "동양에서 가장 오래된 천문대로 알려진 신라 시대의 유적입니다. 선덕여왕 때 건립되었으며 362개의 돌로 쌓았습니다.",
    parking: true,
    chkcreditcard: false,
    expagerange: "전연령",
    chkbabycarriage: true
  },

  // ===== 여수 =====
  14: {
    name: "여수 밤바다",
    region: "yeosu",
    image: "images/places/yeosu_night.jpg",
    address: "전라남도 여수시 중앙동 해안가",
    contact: "061-659-1800",
    time: "연중무휴",
    desc: "아름다운 야경과 함께 낭만적인 분위기를 즐길 수 있는 여수의 명소입니다. 버스킹 공연과 해산물 요리가 유명합니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  15: {
    name: "오동도",
    region: "yeosu",
    image: "images/places/odongdo.jpg",
    address: "전라남도 여수시 오동도로 222",
    contact: "061-659-1819",
    time: "연중무휴 (동백열차 운행시간 확인)",
    desc: "동백꽃과 산책로가 유명한 여수의 대표적인 섬 관광지입니다. 약 3,000그루의 동백나무가 자생하고 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },

  // ===== 전주 =====
  16: {
    name: "전주 한옥마을",
    region: "jeonju",
    image: "images/places/hanok_village.jpg",
    address: "전라북도 전주시 완산구 기린대로 99",
    contact: "063-282-1330",
    time: "연중무휴",
    desc: "700여 채의 한옥이 모여 있는 전주의 대표적인 관광 명소입니다. 한복 체험, 전통 음식, 공예 체험 등을 즐길 수 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  17: {
    name: "경기전",
    region: "jeonju",
    image: "images/places/gyungijeon.jpg",
    address: "전라북도 전주시 완산구 태조로 44",
    contact: "063-281-2790",
    time: "09:00 ~ 18:00 (월요일 휴관)",
    desc: "조선을 건국한 태조 이성계의 어진을 모신 역사적인 장소입니다. 드라마 촬영지로도 유명합니다.",
    parking: false,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },

  // ===== 속초 =====
  18: {
    name: "설악산",
    region: "sokcho",
    image: "images/places/seoraksan.jpg",
    address: "강원도 속초시 설악산로 833",
    contact: "033-636-7700",
    time: "계절별 입산통제 상이",
    desc: "웅장한 산세와 단풍으로 유명한 대한민국 대표 국립공원입니다. 울산바위, 비선대, 금강굴 등 명소가 많습니다.",
    parking: true,
    chkcreditcard: false,
    expagerange: "7세 이상",
    chkbabycarriage: false
  },
  19: {
    name: "속초 중앙시장",
    region: "sokcho",
    image: "images/places/sokcho_market.jpg",
    address: "강원도 속초시 중앙로 147번길 16",
    contact: "033-632-5765",
    time: "10:00 ~ 22:00",
    desc: "다양한 먹거리와 활기찬 분위기를 즐길 수 있는 전통 시장입니다. 닭강정, 오징어순대 등이 유명합니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },

  // ===== 인천 =====
  20: {
    name: "송도 센트럴파크",
    region: "incheon",
    image: "images/places/songdo.jpg",
    address: "인천광역시 연수구 컨벤시아대로 160",
    contact: "032-832-1234",
    time: "연중무휴",
    desc: "도심 속에서 자연과 현대적인 도시 풍경을 함께 즐길 수 있는 공원입니다. 수상택시, 카약 등 레저 활동이 가능합니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  21: {
    name: "차이나타운",
    region: "incheon",
    image: "images/places/chinatown.jpg",
    address: "인천광역시 중구 차이나타운로 12",
    contact: "032-760-7114",
    time: "연중무휴 (상점별 상이)",
    desc: "한국에서 가장 오래된 차이나타운으로 다양한 음식과 문화를 체험할 수 있습니다. 짜장면 박물관도 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },

  // ===== 대전 =====
  22: {
    name: "엑스포 과학공원",
    region: "daejeon",
    image: "images/places/expo.jpg",
    address: "대전광역시 유성구 대덕대로 480",
    contact: "042-866-5114",
    time: "09:00 ~ 18:00 (월요일 휴관)",
    desc: "과학과 기술을 체험할 수 있는 대전의 대표적인 테마 공원입니다. 1993년 대전엑스포 개최지였습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  23: {
    name: "계족산 황톳길",
    region: "daejeon",
    image: "images/places/gyeryongsan.jpg",
    address: "대전광역시 대덕구 장동 산 29-1",
    contact: "042-608-6551",
    time: "연중무휴 (야간 조명 22:00까지)",
    desc: "맨발로 걷는 황톳길 체험으로 유명한 힐링 산책 명소입니다. 약 14km의 맨발 산책로가 조성되어 있습니다.",
    parking: true,
    chkcreditcard: false,
    expagerange: "전연령",
    chkbabycarriage: false
  },

  // ===== 추가 명소들 =====
  24: {
    name: "한강 공원",
    region: "seoul",
    image: "images/places/hangang.jpg",
    address: "서울특별시 영등포구 여의동로 330",
    contact: "02-3780-0561",
    time: "연중무휴",
    desc: "서울 시민의 대표적인 휴식처로, 자전거, 피크닉, 수상 레저 등 다양한 활동을 즐길 수 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  25: {
    name: "월미도 테마파크",
    region: "incheon",
    image: "images/places/wolmido.jpg",
    address: "인천광역시 중구 월미로 136",
    contact: "032-765-4169",
    time: "10:00 ~ 22:00",
    desc: "바다를 배경으로 한 놀이공원으로, 디스코팡팡, 바이킹 등 다양한 놀이기구가 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  26: {
    name: "신포국제시장",
    region: "incheon",
    image: "images/places/sinpo.jpg",
    address: "인천광역시 중구 신포로27번길 11-5",
    contact: "032-772-5812",
    time: "10:00 ~ 21:00",
    desc: "인천의 대표적인 전통시장으로, 신포만두, 닭강정 등 다양한 먹거리가 유명합니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  27: {
    name: "정동진",
    region: "gangneung",
    image: "images/places/jeongdongjin.jpg",
    address: "강원도 강릉시 강동면 정동진리",
    contact: "033-640-4414",
    time: "연중무휴",
    desc: "한국에서 가장 유명한 해돋이 명소로, 모래시계 공원과 정동진역이 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  28: {
    name: "오죽헌",
    region: "gangneung",
    image: "images/places/ojukheon.jpg",
    address: "강원도 강릉시 율곡로 3139번길 24",
    contact: "033-660-3301",
    time: "09:00 ~ 18:00",
    desc: "신사임당과 율곡 이이가 태어난 곳으로, 조선시대 양반 가옥의 모습을 잘 보존하고 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  29: {
    name: "만장굴",
    region: "jeju",
    image: "images/places/manjanggul.jpg",
    address: "제주특별자치도 제주시 구좌읍 만장굴길 182",
    contact: "064-710-7903",
    time: "09:00 ~ 18:00 (매월 첫째 수요일 휴관)",
    desc: "유네스코 세계자연유산으로 지정된 용암동굴로, 세계 최장의 용암동굴 중 하나입니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: false
  },
  30: {
    name: "속초 해수욕장",
    region: "sokcho",
    image: "images/places/sokcho_beach.jpg",
    address: "강원도 속초시 해오름로 186",
    contact: "033-639-2027",
    time: "연중무휴",
    desc: "맑고 깨끗한 동해 바다를 즐길 수 있는 속초의 대표적인 해변입니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  31: {
    name: "아바이마을",
    region: "sokcho",
    image: "images/places/abai.jpg",
    address: "강원도 속초시 청호동 1017",
    contact: "033-639-2690",
    time: "연중무휴",
    desc: "한국전쟁 이후 실향민들이 정착한 마을로, 독특한 음식과 문화가 있습니다. 갯배 체험이 유명합니다.",
    parking: false,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  32: {
    name: "영금정",
    region: "sokcho",
    image: "images/places/yeonggeumjeong.jpg",
    address: "강원도 속초시 영금정로 43",
    contact: "033-639-2690",
    time: "연중무휴",
    desc: "기암괴석과 동해 바다가 어우러진 아름다운 해안 절경을 감상할 수 있는 명소입니다.",
    parking: true,
    chkcreditcard: false,
    expagerange: "전연령",
    chkbabycarriage: false
  },
  33: {
    name: "자갈치 시장",
    region: "busan",
    image: "images/places/jagalchi.jpg",
    address: "부산광역시 중구 자갈치해안로 52",
    contact: "051-245-2594",
    time: "05:00 ~ 22:00",
    desc: "부산의 대표적인 수산물 시장으로, 신선한 해산물을 맛볼 수 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  34: {
    name: "전동성당",
    region: "jeonju",
    image: "images/places/jeondong.jpg",
    address: "전라북도 전주시 완산구 태조로 51",
    contact: "063-284-3222",
    time: "09:00 ~ 18:00",
    desc: "한국 천주교 순교지에 세워진 아름다운 로마네스크 양식의 성당입니다.",
    parking: false,
    chkcreditcard: false,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  35: {
    name: "남부시장",
    region: "jeonju",
    image: "images/places/nambu.jpg",
    address: "전라북도 전주시 완산구 풍남문3길 27",
    contact: "063-284-1344",
    time: "09:00 ~ 22:00 (야시장 운영)",
    desc: "전주의 대표적인 전통시장으로, 야시장에서 다양한 먹거리를 즐길 수 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  36: {
    name: "석굴암",
    region: "gyeongju",
    image: "images/places/seokguram.jpg",
    address: "경상북도 경주시 불국로 873-243",
    contact: "054-746-9933",
    time: "06:30 ~ 18:00",
    desc: "유네스코 세계문화유산으로 지정된 신라시대의 석조 불상으로, 뛰어난 예술성을 자랑합니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: false
  },
  37: {
    name: "대릉원",
    region: "gyeongju",
    image: "images/places/daereungwon.jpg",
    address: "경상북도 경주시 황남동 183",
    contact: "054-750-8650",
    time: "09:00 ~ 22:00",
    desc: "신라 왕과 귀족들의 무덤이 모여 있는 고분군으로, 천마총이 유명합니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  38: {
    name: "동궁과 월지",
    region: "gyeongju",
    image: "images/places/donggung.jpg",
    address: "경상북도 경주시 원화로 102",
    contact: "054-750-8655",
    time: "09:00 ~ 22:00",
    desc: "신라 시대의 궁궐터와 인공 연못으로, 야경이 특히 아름답습니다. 과거 안압지로 불렸습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  39: {
    name: "향일암",
    region: "yeosu",
    image: "images/places/hyangilam.jpg",
    address: "전라남도 여수시 돌산읍 향일암로 60",
    contact: "061-644-4742",
    time: "연중무휴",
    desc: "남해 바다 위 절벽에 위치한 사찰로, 일출 명소로 유명합니다.",
    parking: true,
    chkcreditcard: false,
    expagerange: "전연령",
    chkbabycarriage: false
  },
  40: {
    name: "여수 해상케이블카",
    region: "yeosu",
    image: "images/places/yeosu_cablecar.jpg",
    address: "전라남도 여수시 돌산읍 돌산로 3600-1",
    contact: "061-664-7301",
    time: "09:00 ~ 21:00",
    desc: "바다 위를 가로지르는 케이블카로, 여수의 아름다운 해안 경관을 감상할 수 있습니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  },
  41: {
    name: "유성온천",
    region: "daejeon",
    image: "images/places/yuseong.jpg",
    address: "대전광역시 유성구 봉명동 온천로 일대",
    contact: "042-611-2114",
    time: "연중무휴 (시설별 상이)",
    desc: "역사 깊은 온천 휴양지로, 피부에 좋은 알칼리성 온천수가 유명합니다.",
    parking: true,
    chkcreditcard: true,
    expagerange: "전연령",
    chkbabycarriage: true
  }
};

// 지역명 매핑
const regionNames = {
  seoul: "서울",
  busan: "부산",
  jeju: "제주",
  gangneung: "강릉",
  gyeongju: "경주",
  yeosu: "여수",
  jeonju: "전주",
  sokcho: "속초",
  incheon: "인천",
  daejeon: "대전"
};

// URL에서 id 읽기
const params = new URLSearchParams(window.location.search);
const placeId = params.get("id") || "";
let place = null;

// DOM Elements
const headerPlaceName = document.getElementById("headerPlaceName");
const placeName = document.getElementById("placeName");
const placeImage = document.getElementById("placeImage");
const placeAddress = document.getElementById("placeAddress");
const placeContact = document.getElementById("placeContact");
const placeTime = document.getElementById("placeTime");
const placeDesc = document.getElementById("placeDesc");
const detailBtn = document.getElementById("detailBtn");
const pictogramSection = document.getElementById("pictogramSection");
const addScheduleBtn = document.getElementById("addScheduleBtn");
const scheduleModal = document.getElementById("scheduleModal");
const modalPlaceName = document.getElementById("modalPlaceName");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

// 픽토그램 상태 요소
const parkingStatus = document.getElementById("parkingStatus");
const petStatus = document.getElementById("petStatus");
const babycarStatus = document.getElementById("babycarStatus");
const restroomStatus = document.getElementById("restroomStatus");

const parkingInfo = document.getElementById("parkingInfo");
const petInfo = document.getElementById("petInfo");
const babycarInfo = document.getElementById("babycarInfo");
const restroomInfo = document.getElementById("restroomInfo");

// 관광지 정보 렌더링
function renderPlaceInfo() {
  headerPlaceName.textContent = place.name;
  placeName.textContent = place.name;
  placeImage.src = place.image;
  placeImage.alt = place.name;
  placeImage.onerror = function () {
    this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e0e0e0' width='400' height='300' rx='20'/%3E%3Ctext x='50%25' y='45%25' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='16'%3E관광지 이미지%3C/text%3E%3Ctext x='50%25' y='55%25' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='14'%3E(FIRSTIMAGE)%3C/text%3E%3C/svg%3E`;
  };
  placeAddress.textContent = place.address;
  placeContact.textContent = place.contact;
  placeTime.textContent = place.time;
  placeDesc.textContent = place.desc;
  
  // 페이지 타이틀 업데이트
  document.title = `${place.name} 상세 조회 | TravelKorea`;
}

// 픽토그램 정보 설정
function updatePictograms() {
  // 주차 정보
  parkingStatus.textContent = place.parking ? "가능" : "불가";
  parkingInfo.classList.toggle("available", place.parking);
  parkingInfo.classList.toggle("unavailable", !place.parking);

  // 반려동물 정보
  const isPetAvailable = place.pet || false;
  petStatus.textContent = isPetAvailable ? "동반가능" : "불가";
  petInfo.classList.toggle("available", isPetAvailable);
  petInfo.classList.toggle("unavailable", !isPetAvailable);

  // 유모차 정보
  babycarStatus.textContent = place.chkbabycarriage ? "대여가능" : "불가";
  babycarInfo.classList.toggle("available", place.chkbabycarriage);
  babycarInfo.classList.toggle("unavailable", !place.chkbabycarriage);

  // 화장실 정보 (데이터 없음, 기본값 '있음'으로 처리)
  restroomStatus.textContent = "있음";
  restroomInfo.classList.add("available");
}

// 상세정보 버튼 클릭 - 픽토그램 토글
let isPictogramVisible = false;

if (detailBtn && pictogramSection) {
  detailBtn.addEventListener("click", () => {
    isPictogramVisible = !isPictogramVisible;
    pictogramSection.style.display = isPictogramVisible ? "block" : "none";
    detailBtn.textContent = isPictogramVisible ? "상세 정보 닫기" : "상세 정보";

    if (isPictogramVisible) {
      pictogramSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

// 일정 추가 버튼 클릭 - 캘린더 모달 열기
if (addScheduleBtn) {
  addScheduleBtn.addEventListener("click", () => {
    if (!place) return;
    const placeData = {
      type: "place",
      originalId: place.id,
      image: place.image,
      location: place.address,
      time: place.time,
      contact: place.contact
    };

    if (typeof calendarModal !== 'undefined') {
      calendarModal.open(place.name, placeData, (scheduleData) => {
        console.log("일정이 추가되었습니다:", scheduleData);
      });
    } else {
      console.error('calendarModal이 정의되지 않았습니다.');
    }
  });
}

// ===== 초기화 (DB에서 관광지 불러온 후 렌더) =====
(async () => {
  try {
    if (!placeId) {
      alert("관광지 ID가 없습니다.");
      location.href = "../hotel/hotel.html";
      return;
    }

    const docData = await fetchPlaceFromFirebase(placeId);
    if (!docData) {
      alert("존재하지 않는 관광지입니다.");
      location.href = "../hotel/hotel.html";
      return;
    }

    place = mapTourItemDocToPlace(docData, placeId);

    renderPlaceInfo();
    updatePictograms();

    // 픽토그램 섹션이 안 보인다는 이슈가 많아서: 기본으로 열어둠
    if (pictogramSection && detailBtn) {
      isPictogramVisible = true;
      pictogramSection.style.display = "block";
      detailBtn.textContent = "상세 정보 닫기";
    }
  } catch (e) {
    console.error("place-detail init failed:", e);
    alert("관광지 정보를 불러오지 못했습니다. 콘솔을 확인해주세요.");
  }
})();
