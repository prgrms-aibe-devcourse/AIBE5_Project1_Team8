import { openBookingPanel } from "./hotel-booking.js";

// 숙소 데이터 (10개)
const hotels = {
  1: {
    name: "서울 센트럴 호텔",
    address: "서울특별시 중구 명동길 123",
    contact: "02-1234-5678",
    price: "1박 120,000원~",
    desc: "서울 중심부에 위치한 비즈니스 및 관광객을 위한 최적의 숙소입니다. 명동과 남산타워가 도보 거리에 있어 관광에 편리하며, 깔끔한 객실과 친절한 서비스로 편안한 휴식을 제공합니다. 조식 뷔페, 피트니스 센터, 비즈니스 라운지 등 다양한 부대시설을 갖추고 있습니다.",
    image: "https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Seoul+Hotel",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 120000
  },
  2: {
    name: "부산 오션뷰 호텔",
    address: "부산광역시 해운대구 해운대로 456",
    contact: "051-2345-6789",
    price: "1박 150,000원~",
    desc: "해운대 해수욕장이 한눈에 보이는 오션뷰 객실을 제공합니다. 바다를 바라보며 여유로운 시간을 보낼 수 있으며, 루프탑 수영장과 스파에서 특별한 경험을 즐길 수 있습니다. 신선한 해산물 레스토랑과 바가 있어 미식 여행도 함께 할 수 있습니다.",
    image: "https://via.placeholder.com/400x300/20B2AA/FFFFFF?text=Busan+Hotel",
    parking: true,
    pet: true,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 150000
  },
  3: {
    name: "제주 힐링 리조트",
    address: "제주특별자치도 서귀포시 중문로 789",
    contact: "064-3456-7890",
    price: "1박 180,000원~",
    desc: "제주 중문관광단지 내에 위치한 프리미엄 리조트입니다. 천혜의 자연경관을 배경으로 골프, 스파, 수영장 등 다양한 레저 시설을 갖추고 있습니다. 가족 여행객을 위한 키즈클럽과 프로그램이 마련되어 있어 온 가족이 즐거운 시간을 보낼 수 있습니다.",
    image: "https://via.placeholder.com/400x300/32CD32/FFFFFF?text=Jeju+Resort",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 180000
  },
  4: {
    name: "강릉 비치 호텔",
    address: "강원도 강릉시 경포로 101",
    contact: "033-4567-8901",
    price: "1박 110,000원~",
    desc: "경포해변과 경포호수 사이에 위치한 해변 호텔입니다. 객실에서 바로 바다를 감상할 수 있으며, 안목해변 커피거리가 가까워 바다 카페 투어를 즐기기에 최적입니다. 서핑, 카약 등 해양 레포츠 프로그램도 운영하고 있습니다.",
    image: "https://via.placeholder.com/400x300/4169E1/FFFFFF?text=Gangneung+Hotel",
    parking: true,
    pet: true,
    wifi: true,
    noSmoking: false,
    breakfast: false,
    basePrice: 110000
  },
  5: {
    name: "경주 헤리티지 호텔",
    address: "경상북도 경주시 불국로 202",
    contact: "054-5678-9012",
    price: "1박 100,000원~",
    desc: "천년 고도 경주의 역사와 함께하는 호텔입니다. 불국사, 석굴암 등 주요 유적지와 가까우며, 한옥 스타일의 인테리어로 전통의 멋을 느낄 수 있습니다. 저녁에는 첨성대와 대릉원의 야경 투어도 즐길 수 있습니다.",
    image: "https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Gyeongju+Hotel",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 100000
  },
  6: {
    name: "여수 마리나 호텔",
    address: "전라남도 여수시 오동도로 303",
    contact: "061-6789-0123",
    price: "1박 130,000원~",
    desc: "여수 밤바다의 낭만을 느낄 수 있는 마리나 호텔입니다. 돌산대교와 여수 밤바다의 아름다운 야경을 객실에서 감상할 수 있으며, 해상케이블카, 오동도 등 주요 관광지가 가깝습니다. 신선한 해산물 요리를 맛볼 수 있는 레스토랑도 운영됩니다.",
    image: "https://via.placeholder.com/400x300/1E90FF/FFFFFF?text=Yeosu+Hotel",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 130000
  },
  7: {
    name: "전주 한옥 스테이",
    address: "전라북도 전주시 완산구 한옥마을길 404",
    contact: "063-7890-1234",
    price: "1박 90,000원~",
    desc: "전주 한옥마을 내에 위치한 전통 한옥 숙소입니다. 온돌방에서의 따뜻한 잠자리와 전통 다과 서비스를 제공합니다. 경기전, 전동성당 등 주요 명소가 도보 거리에 있으며, 전주 비빔밥과 한정식 맛집들이 즐비합니다.",
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Jeonju+Hanok",
    parking: false,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 90000
  },
  8: {
    name: "속초 씨사이드 호텔",
    address: "강원도 속초시 청초호반로 505",
    contact: "033-8901-2345",
    price: "1박 120,000원~",
    desc: "청초호와 동해바다가 만나는 곳에 위치한 호텔입니다. 설악산 국립공원이 가깝고, 속초 중앙시장과 아바이마을도 쉽게 방문할 수 있습니다. 일출 명소인 영금정이 가까워 새벽 일출 투어를 추천합니다.",
    image: "https://via.placeholder.com/400x300/00CED1/FFFFFF?text=Sokcho+Hotel",
    parking: true,
    pet: true,
    wifi: true,
    noSmoking: true,
    breakfast: false,
    basePrice: 120000
  },
  9: {
    name: "송도 센트럴 호텔",
    address: "인천광역시 연수구 센트럴로 606",
    contact: "032-9012-3456",
    price: "1박 140,000원~",
    desc: "인천 송도 국제도시에 위치한 현대적인 비즈니스 호텔입니다. 송도 센트럴파크와 인천대교 전망이 아름다우며, 컨벤션 센터와 가까워 비즈니스 여행객에게 최적입니다. 차이나타운, 월미도도 쉽게 방문할 수 있습니다.",
    image: "https://via.placeholder.com/400x300/4682B4/FFFFFF?text=Songdo+Hotel",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 140000
  },
  10: {
    name: "대전 비즈니스 호텔",
    address: "대전광역시 유성구 과학로 707",
    contact: "042-0123-4567",
    price: "1박 95,000원~",
    desc: "대전 유성구 과학단지 인근에 위치한 비즈니스 호텔입니다. 유성온천이 가까워 온천욕을 즐길 수 있으며, 엑스포 과학공원과 계족산 황톳길도 추천 코스입니다. 합리적인 가격에 깔끔한 시설을 제공합니다.",
    image: "https://via.placeholder.com/400x300/708090/FFFFFF?text=Daejeon+Hotel",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: false,
    basePrice: 95000
  }
};

// 리뷰 데이터
const reviews = {
  1: [
    { id: 1, nickname: "여행러버", rating: 5, content: "명동과 가까워서 쇼핑하기 정말 좋았어요. 객실도 깨끗하고 직원분들도 친절했습니다. 조식 뷔페도 다양하게 준비되어 있어서 만족스러웠어요.", date: "2025-01-15", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Review+1" },
    { id: 2, nickname: "비즈니스맨", rating: 4, content: "출장으로 자주 이용하는데 비즈니스 센터가 잘 되어있어서 편리합니다. 다만 주차장이 협소해서 별 하나 뺍니다.", date: "2025-01-10", image: null },
    { id: 3, nickname: "가족여행", rating: 5, content: "아이들과 함께 왔는데 가족 객실이 넓어서 좋았어요. 남산타워 야경도 멋지게 보였습니다!", date: "2025-01-05", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Review+2" },
    { id: 4, nickname: "커플투어", rating: 4, content: "연인과 함께 머물렀는데 분위기가 좋았어요. 명동까지 걸어서 10분 거리라 편했습니다.", date: "2024-12-28", image: null },
    { id: 5, nickname: "혼자여행", rating: 5, content: "1인 여행자에게도 추천합니다. 가성비 좋고 위치도 좋아요.", date: "2024-12-20", image: null }
  ],
  2: [
    { id: 1, nickname: "바다사랑", rating: 5, content: "객실에서 보이는 해운대 뷰가 정말 환상적이었어요! 아침에 일출 보면서 커피 마시는 게 최고였습니다.", date: "2025-01-18", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Ocean+View" },
    { id: 2, nickname: "스파매니아", rating: 5, content: "루프탑 수영장과 스파 시설이 정말 훌륭해요. 숙박 가격에 비해 서비스가 뛰어납니다.", date: "2025-01-12", image: null },
    { id: 3, nickname: "미식가", rating: 4, content: "호텔 내 해산물 레스토랑이 맛있어요. 다만 조금 비싼 편이에요.", date: "2025-01-08", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Restaurant" },
    { id: 4, nickname: "웨딩투어", rating: 5, content: "신혼여행으로 왔는데 최고의 선택이었어요. 특별한 추억이 되었습니다.", date: "2024-12-30", image: null }
  ],
  3: [
    { id: 1, nickname: "골프왕", rating: 5, content: "리조트 내 골프장이 정말 좋았습니다. 코스도 아름답고 시설 관리가 잘 되어있어요.", date: "2025-01-20", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Golf" },
    { id: 2, nickname: "아이엄마", rating: 5, content: "키즈클럽 프로그램이 다양해서 아이들이 정말 좋아했어요. 가족 여행으로 강력 추천!", date: "2025-01-14", image: null },
    { id: 3, nickname: "자연인", rating: 4, content: "제주 자연을 만끽할 수 있어서 좋았어요. 다만 관광지와 조금 떨어져 있어서 렌터카 필수입니다.", date: "2025-01-09", image: null },
    { id: 4, nickname: "힐링족", rating: 5, content: "스파에서 받은 마사지가 정말 시원했어요. 힐링 여행으로 딱입니다.", date: "2025-01-02", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Spa" },
    { id: 5, nickname: "사진작가", rating: 5, content: "리조트 전경이 정말 아름다워요. 사진 찍기 좋은 포토존이 많습니다.", date: "2024-12-25", image: null },
    { id: 6, nickname: "부부여행", rating: 4, content: "조용하고 평화로운 분위기에서 휴식할 수 있었어요. 부부 여행으로 추천합니다.", date: "2024-12-18", image: null }
  ],
  4: [
    { id: 1, nickname: "서핑러버", rating: 5, content: "서핑하기 딱 좋은 위치에요! 해변이 바로 앞이라 편했습니다.", date: "2025-01-19", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Surfing" },
    { id: 2, nickname: "커피덕후", rating: 4, content: "안목해변 커피거리가 가까워서 매일 카페 투어했어요. 객실도 깨끗했습니다.", date: "2025-01-13", image: null },
    { id: 3, nickname: "반려동물가족", rating: 5, content: "반려견과 함께 묵을 수 있어서 좋았어요. 해변 산책도 같이 할 수 있었습니다.", date: "2025-01-07", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Pet" }
  ],
  5: [
    { id: 1, nickname: "역사덕후", rating: 5, content: "불국사, 석굴암 관광하기 정말 좋은 위치였어요. 호텔 인테리어도 전통적이라 분위기 있었습니다.", date: "2025-01-17", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Bulguksa" },
    { id: 2, nickname: "야경투어", rating: 5, content: "첨성대 야경 투어 프로그램이 있어서 참여했는데 너무 좋았어요!", date: "2025-01-11", image: null },
    { id: 3, nickname: "문화탐방", rating: 4, content: "경주 월드까지 무료 셔틀이 있어서 편리했어요. 조식도 맛있었습니다.", date: "2025-01-06", image: null }
  ],
  6: [
    { id: 1, nickname: "야경마니아", rating: 5, content: "여수 밤바다 노래가 왜 나왔는지 알겠어요. 객실에서 보는 야경이 정말 예뻤습니다.", date: "2025-01-16", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Night+View" },
    { id: 2, nickname: "케이블카팬", rating: 4, content: "해상케이블카 타러 갔다 왔는데 호텔에서 가까워서 좋았어요. 객실도 깨끗했습니다.", date: "2025-01-10", image: null },
    { id: 3, nickname: "맛집탐방", rating: 5, content: "여수 맛집들이 가까워서 좋았어요. 갓김치와 게장 맛집 추천 받아서 잘 다녀왔습니다.", date: "2025-01-04", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Food" },
    { id: 4, nickname: "로맨틱커플", rating: 5, content: "돌산대교 야경 보면서 로맨틱한 시간 보냈어요. 커플 여행으로 추천합니다.", date: "2024-12-29", image: null }
  ],
  7: [
    { id: 1, nickname: "한옥매니아", rating: 5, content: "정말 예쁜 한옥에서 하룻밤 묵었어요. 온돌방이 따뜻하고 정겨웠습니다.", date: "2025-01-18", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Hanok" },
    { id: 2, nickname: "전주비빔밥", rating: 5, content: "한옥마을 중심에 있어서 관광하기 편했어요. 비빔밥 맛집도 추천받았습니다.", date: "2025-01-12", image: null },
    { id: 3, nickname: "전통체험", rating: 4, content: "한복 체험하고 사진 많이 찍었어요. 주차장이 없어서 조금 불편했지만 그래도 좋았어요.", date: "2025-01-06", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Hanbok" },
    { id: 4, nickname: "다과타임", rating: 5, content: "저녁에 제공되는 전통 다과가 정말 맛있었어요. 분위기 최고!", date: "2024-12-31", image: null }
  ],
  8: [
    { id: 1, nickname: "설악산등산", rating: 5, content: "설악산 등산 후 묵기 좋았어요. 피로가 확 풀렸습니다.", date: "2025-01-20", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Seoraksan" },
    { id: 2, nickname: "일출투어", rating: 5, content: "영금정 일출 보러 새벽에 나갔는데 감동적이었어요. 호텔에서 도보로 가능해서 편했습니다.", date: "2025-01-14", image: null },
    { id: 3, nickname: "시장투어", rating: 4, content: "중앙시장 닭강정이 맛있었어요! 호텔에서 가까워서 편하게 다녀왔습니다.", date: "2025-01-08", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Market" },
    { id: 4, nickname: "펫프렌들리", rating: 5, content: "반려견과 함께 숙박할 수 있어서 좋았어요. 청초호 산책도 같이 했습니다.", date: "2025-01-02", image: null }
  ],
  9: [
    { id: 1, nickname: "비즈니스", rating: 4, content: "컨벤션 참석차 왔는데 위치가 좋았어요. 시설도 현대적이고 깔끔합니다.", date: "2025-01-17", image: null },
    { id: 2, nickname: "센트럴파크", rating: 5, content: "송도 센트럴파크 야경이 멋있어요. 산책하기 좋았습니다.", date: "2025-01-11", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Songdo+Park" },
    { id: 3, nickname: "차이나타운", rating: 4, content: "인천 차이나타운까지 버스로 30분 정도 걸렸어요. 자장면 맛있게 먹고 왔습니다.", date: "2025-01-05", image: null },
    { id: 4, nickname: "가족여행객", rating: 5, content: "가족들과 왔는데 조식이 다양해서 좋았어요. 아이들이 좋아했습니다.", date: "2024-12-29", image: null }
  ],
  10: [
    { id: 1, nickname: "온천여행", rating: 5, content: "유성온천이 가까워서 온천욕 다녀왔어요. 피로가 확 풀렸습니다.", date: "2025-01-19", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Hot+Spring" },
    { id: 2, nickname: "출장맨", rating: 4, content: "출장으로 왔는데 가격 대비 시설이 좋았어요. 위치도 편리합니다.", date: "2025-01-13", image: null },
    { id: 3, nickname: "황톳길", rating: 5, content: "계족산 황톳길 맨발 걷기 체험했어요. 힐링됐습니다!", date: "2025-01-07", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Trail" }
  ]
};

// URL에서 호텔 ID 가져오기
const params = new URLSearchParams(window.location.search);
const hotelId = params.get("id") || "1";
const hotel = hotels[hotelId];
const hotelReviews = reviews[hotelId] || [];

// 페이지 유효성 검사
if (!hotel) {
  alert("존재하지 않는 숙소입니다.");
  location.href = "hotel.html";
}

// DOM 요소
const headerHotelName = document.getElementById("headerHotelName");
const hotelImage = document.getElementById("hotelImage");
const hotelName = document.getElementById("hotelName");
const hotelAddress = document.getElementById("hotelAddress");
const hotelContact = document.getElementById("hotelContact");
const hotelPrice = document.getElementById("hotelPrice");
const hotelDesc = document.getElementById("hotelDesc");

const detailBtn = document.getElementById("detailBtn");
const pictogramSection = document.getElementById("pictogramSection");
const parkingInfo = document.getElementById("parkingInfo");
const petInfo = document.getElementById("petInfo");
const wifiInfo = document.getElementById("wifiInfo");
const noSmokingInfo = document.getElementById("noSmokingInfo");
const breakfastInfo = document.getElementById("breakfastInfo");

const bookingBtn = document.getElementById("bookingBtn");
const bookingModal = document.getElementById("bookingModal");
const modalHotelName = document.getElementById("modalHotelName");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

const reviewList = document.getElementById("reviewList");
const reviewCount = document.getElementById("reviewCount");
const pagination = document.getElementById("pagination");

// 숙소 정보 표시
function renderHotelInfo() {
  headerHotelName.textContent = hotel.name;
  hotelImage.src = hotel.image;
  hotelImage.alt = hotel.name;
  hotelName.textContent = hotel.name;
  hotelAddress.textContent = hotel.address;
  hotelContact.textContent = hotel.contact;
  hotelPrice.textContent = hotel.price;
  hotelDesc.textContent = hotel.desc;
  if(modalHotelName) modalHotelName.textContent = hotel.name;
}

// 픽토그램 상태 업데이트
function updatePictograms() {
  // 주차시설
  if (hotel.parking) {
    parkingInfo.classList.add("available");
    parkingInfo.classList.remove("unavailable");
    document.getElementById("parkingStatus").textContent = "가능";
  } else {
    parkingInfo.classList.add("unavailable");
    parkingInfo.classList.remove("available");
    document.getElementById("parkingStatus").textContent = "불가";
  }

  // 반려동물
  if (hotel.pet) {
    petInfo.classList.add("available");
    petInfo.classList.remove("unavailable");
    document.getElementById("petStatus").textContent = "동반가능";
  } else {
    petInfo.classList.add("unavailable");
    petInfo.classList.remove("available");
    document.getElementById("petStatus").textContent = "불가";
  }

  // 와이파이
  if (hotel.wifi) {
    wifiInfo.classList.add("available");
    wifiInfo.classList.remove("unavailable");
    document.getElementById("wifiStatus").textContent = "무료";
  } else {
    wifiInfo.classList.add("unavailable");
    wifiInfo.classList.remove("available");
    document.getElementById("wifiStatus").textContent = "없음";
  }

  // 금연공간
  if (hotel.noSmoking) {
    noSmokingInfo.classList.add("available");
    noSmokingInfo.classList.remove("unavailable");
    document.getElementById("noSmokingStatus").textContent = "금연";
  } else {
    noSmokingInfo.classList.add("unavailable");
    noSmokingInfo.classList.remove("available");
    document.getElementById("noSmokingStatus").textContent = "흡연가능";
  }

  // 조식제공
  if (hotel.breakfast) {
    breakfastInfo.classList.add("available");
    breakfastInfo.classList.remove("unavailable");
    document.getElementById("breakfastStatus").textContent = "제공";
  } else {
    breakfastInfo.classList.add("unavailable");
    breakfastInfo.classList.remove("available");
    document.getElementById("breakfastStatus").textContent = "미제공";
  }
}

// 상세 정보 버튼 클릭 - 픽토그램 토글
let isPictogramVisible = false;

detailBtn.addEventListener("click", () => {
  isPictogramVisible = !isPictogramVisible;
  pictogramSection.style.display = isPictogramVisible ? "block" : "none";
  detailBtn.textContent = isPictogramVisible ? "상세 정보 닫기" : "상세 정보";
});

// 일정추가 버튼 클릭 - 캘린더 모달 열기
const addScheduleBtn = document.getElementById("addScheduleBtn");
if (addScheduleBtn) {
  addScheduleBtn.addEventListener("click", () => {
    const placeData = {
      type: "hotel",
      hotelId: hotelId,
      image: hotel.image,
      location: hotel.address,
      contact: hotel.contact,
      price: hotel.price
    };

    calendarModal.open(hotel.name, placeData, (scheduleData) => {
      console.log("일정이 추가되었습니다:", scheduleData);
    });
  });
}

// 예약 버튼 클릭 - 예약 페이지로 이동
bookingBtn.addEventListener("click", () => {
  // 예약 데이터를 sessionStorage에 저장
  const bookingData = {
    hotelId: hotelId,
    hotelName: hotel.name,
    addr: hotel.address,
    image: hotel.image,
    basePrice: hotel.basePrice,
    tel: hotel.contact
  };
  
  sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
  
  // 예약 패널 열기
  openBookingPanel(bookingData);
});

// 리뷰 페이지네이션
const REVIEWS_PER_PAGE = 3;
let currentPage = 1;
const totalPages = Math.ceil(hotelReviews.length / REVIEWS_PER_PAGE);

// 별점 렌더링
function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<span class="star">&#9733;</span>';
    } else {
      stars += '<span class="star empty">&#9733;</span>';
    }
  }
  return stars;
}

// 리뷰 렌더링
function renderReviews() {
  reviewCount.textContent = `${hotelReviews.length}개의 후기`;

  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const pageReviews = hotelReviews.slice(startIndex, endIndex);

  reviewList.innerHTML = pageReviews.map(review => `
    <div class="review-card">
      <div class="review-user">
        <div class="review-avatar">
          <span class="review-avatar-placeholder">&#128100;</span>
        </div>
        <div class="review-user-info">
          <div class="review-nickname">${review.nickname}</div>
          <div class="review-date">${review.date}</div>
        </div>
        <div class="review-rating">
          ${renderStars(review.rating)}
        </div>
      </div>
      <div class="review-content">${review.content}</div>
      ${review.image ? `
        <div class="review-image">
          <img src="${review.image}" alt="리뷰 이미지">
        </div>
      ` : ""}
    </div>
  `).join("");

  renderPagination();
}

// 페이지네이션 렌더링
function renderPagination() {
  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let paginationHTML = "";

  // 이전 버튼
  paginationHTML += `
    <button class="page-btn" ${currentPage === 1 ? "disabled" : ""} onclick="goToPage(${currentPage - 1})">
      &lt;
    </button>
  `;

  // 페이지 번호
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="page-btn ${i === currentPage ? "active" : ""}" onclick="goToPage(${i})">
        ${i}
      </button>
    `;
  }

  // 다음 버튼
  paginationHTML += `
    <button class="page-btn" ${currentPage === totalPages ? "disabled" : ""} onclick="goToPage(${currentPage + 1})">
      &gt;
    </button>
  `;

  pagination.innerHTML = paginationHTML;
}

// 페이지 이동
function goToPage(page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderReviews();

  // 리뷰 섹션으로 스크롤
  document.querySelector(".review-section").scrollIntoView({ behavior: "smooth" });
}

// 전역 함수로 노출
window.goToPage = goToPage;

// 초기화
try {
  renderHotelInfo();
} catch (e) {
  console.error("renderHotelInfo crashed:", e);
}
try {
  updatePictograms();
} catch (e) {
  console.error("updatePictograms crashed:", e);
}
try {
  renderReviews();
} catch (e) {
  console.error("renderReviews crashed:", e);
}
