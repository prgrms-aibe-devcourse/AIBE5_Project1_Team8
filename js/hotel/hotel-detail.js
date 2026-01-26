// hotel-detail.js
// 호텔 상세 페이지 로직

import { openBookingPanel } from "./hotel-booking.js";

// ===============================
// 1. URL 파라미터 읽기
// ===============================
const params = new URLSearchParams(window.location.search);
const hotelId = parseInt(params.get("id"), 10);
const region = params.get("region");

// 유효성 검사
if (!hotelId || !region) {
  alert("잘못된 접근입니다.");
  location.href = "../accommodation/accommodation.html";
}

// ===============================
// 2. hotel-data.js에서 호텔 찾기
// ===============================
const regionHotels = window.allHotelData?.[region];
if (!regionHotels) {
  alert("존재하지 않는 지역입니다.");
  location.href = "../accommodation/accommodation.html";
}

const hotel = regionHotels.find(h => h.id === hotelId);
if (!hotel) {
  alert("해당 호텔 정보를 찾을 수 없습니다.");
  location.href = "../accommodation/accommodation.html";
}

// ===============================
// 3. 호텔 상세 정보 (id 기준)
// ===============================
const hotelDetailData = {
  // 서울
  1001: {
    desc: "서울 도심과 한강을 동시에 조망할 수 있는 럭셔리 호텔입니다. 남산의 푸른 자연과 서울의 스카이라인을 한눈에 담을 수 있으며, 세계적인 수준의 서비스와 시설을 갖추고 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 350000
  },
  1002: {
    desc: "명동 중심에 위치한 비즈니스·관광 최적의 호텔입니다. 쇼핑과 관광의 중심지에서 편리한 접근성을 자랑하며, 다양한 부대시설과 함께 최고의 휴식을 제공합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 280000
  },
  1003: {
    desc: "대한민국을 대표하는 5성급 호텔로 최고급 서비스를 제공합니다. 1979년 개관 이래 한국 최고의 호텔로서의 명성을 이어오고 있으며, 세계 정상급 VIP들이 선호하는 호텔입니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 400000
  },
  1004: {
    desc: "동대문 쇼핑 중심지에 위치한 럭셔리 호텔입니다. 동대문디자인플라자(DDP)와 인접하여 쇼핑과 문화를 동시에 즐길 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 320000
  },
  1005: {
    desc: "강남 테헤란로에 위치한 부티크 럭셔리 호텔입니다. 현대적인 디자인과 프라이빗한 서비스로 비즈니스 여행객에게 인기가 높습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 380000
  },
  1006: {
    desc: "강남 코엑스 인근에 위치한 비즈니스 호텔입니다. 합리적인 가격에 편안한 숙박을 제공하며, 주요 비즈니스 지구와의 접근성이 뛰어납니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 180000
  },
  // 부산
  2001: {
    desc: "마린시티의 오션뷰를 자랑하는 부산 최고급 호텔입니다. 광안대교와 해운대 바다를 한눈에 담을 수 있는 파노라마 뷰가 압권입니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 350000
  },
  2002: {
    desc: "해운대 해변 바로 앞에 위치한 전통 있는 특급 호텔입니다. 아침에 일어나면 창밖으로 펼쳐지는 해운대 바다가 여행의 피로를 씻어줍니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 280000
  },
  2003: {
    desc: "부산 최고층 랜드마크 호텔로, 도시와 바다의 환상적인 조화를 경험할 수 있습니다. 인피니티풀에서 바라보는 일몰은 잊지 못할 추억이 됩니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 450000
  },
  2004: {
    desc: "해운대 해변에서 도보 1분 거리에 위치한 호텔입니다. 여름 해수욕과 겨울 바다 산책 모두 즐기기 좋은 최적의 위치입니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 200000
  },
  2005: {
    desc: "부산의 대표적인 복합 리조트 호텔입니다. 카지노, 스파, 다양한 레스토랑이 한 곳에 모여 있어 호텔 안에서 모든 것을 즐길 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 300000
  },
  2006: {
    desc: "동래 금강공원 인근의 온천 호텔입니다. 천연 온천수로 여행의 피로를 풀 수 있으며, 전통과 현대가 어우러진 분위기를 자랑합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 150000
  },
  // 제주
  3001: {
    desc: "중문 관광단지 내 위치한 가족 친화형 리조트 호텔입니다. 다양한 테마파크와 수영장으로 가족 여행객에게 최고의 선택입니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 320000
  },
  3002: {
    desc: "제주 중문에 위치한 명품 호텔로, 프라이빗 비치와 최고급 골프 코스를 보유하고 있습니다. 럭셔리한 휴양을 원하는 분들께 추천합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 380000
  },
  3003: {
    desc: "표선면 해안가에 위치한 프리미엄 리조트입니다. 아이들을 위한 키즈클럽과 다양한 액티비티로 가족 여행객에게 인기가 높습니다.",
    parking: true, pet: true, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 350000
  },
  3004: {
    desc: "제주 도심 최대 규모의 럭셔리 호텔로 인피니티풀이 유명합니다. 한라산과 바다를 동시에 조망할 수 있는 최고의 전망을 자랑합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 400000
  },
  3005: {
    desc: "제주시 탑동에 위치한 비즈니스 호텔입니다. 제주 국제공항에서 가까워 접근성이 뛰어나며, 카지노와 다양한 부대시설을 갖추고 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 180000
  },
  3006: {
    desc: "제주시 노연로에 위치한 감각적인 디자인 호텔입니다. 루프탑 수영장에서 제주의 하늘과 바다를 만끽할 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 220000
  },
  // 강릉
  4001: {
    desc: "경포해변 인근의 감각적인 오션뷰 호텔입니다. 동해의 푸른 바다와 일출을 객실에서 직접 감상할 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 280000
  },
  4002: {
    desc: "경포해변 바로 앞에 위치한 호텔입니다. 해변까지 도보 1분으로, 여름 해수욕을 즐기기에 최적의 위치입니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 250000
  },
  4003: {
    desc: "강릉의 대표 럭셔리 호텔로, 오션뷰와 골프장을 함께 즐길 수 있습니다. 가족 및 단체 여행객 모두에게 추천합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 300000
  },
  4004: {
    desc: "경포 관광지 인근의 가성비 호텔입니다. 깔끔한 시설과 친절한 서비스로 편안한 여행을 보장합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 180000
  },
  4005: {
    desc: "프라이빗 비치와 인피니티풀을 갖춘 프리미엄 리조트입니다. 동해안 최고의 휴양지로 손꼽히며, 특별한 휴식을 원하는 분께 추천합니다.",
    parking: true, pet: true, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 350000
  },
  // 경주
  5001: {
    desc: "보문단지 호수 전망을 자랑하는 프리미엄 호텔입니다. 천년 고도 경주의 역사와 자연을 동시에 느낄 수 있는 최적의 숙소입니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 250000
  },
  5002: {
    desc: "보문관광단지 내에 위치한 전통 있는 호텔입니다. 경주의 주요 관광지와 가까워 관광과 휴식을 동시에 즐길 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 200000
  },
  5003: {
    desc: "온천과 수영장을 갖춘 휴양 호텔입니다. 경주 여행 후 온천에서 피로를 풀며 힐링하기 좋습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 180000
  },
  5004: {
    desc: "가족 단위 여행객에게 인기 있는 호텔입니다. 넓은 객실과 다양한 부대시설로 편안한 가족 여행을 보장합니다.",
    parking: true, pet: true, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 220000
  },
  5005: {
    desc: "워터파크와 스파를 갖춘 복합 리조트입니다. 경주 관광과 함께 물놀이와 휴식을 한 번에 즐길 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 280000
  },
  // 여수
  6001: {
    desc: "여수 밤바다를 한눈에 담을 수 있는 대표 호텔입니다. 오동도와 여수 앞바다의 아름다운 야경이 로맨틱한 분위기를 연출합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 220000
  },
  6002: {
    desc: "여수 소호동에 위치한 프리미엄 리조트입니다. 인피니티풀에서 바라보는 남해의 풍경이 일품입니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 300000
  },
  6003: {
    desc: "오동도 인근에 위치한 호텔로, 여수의 주요 관광지 접근성이 뛰어납니다. 깔끔한 시설과 친절한 서비스가 강점입니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 250000
  },
  6004: {
    desc: "프라이빗 비치를 보유한 부티크 호텔입니다. 조용하고 한적한 분위기에서 특별한 휴식을 즐길 수 있습니다.",
    parking: true, pet: true, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 280000
  },
  6005: {
    desc: "돌산도에 위치한 마리나 호텔입니다. 요트 투어와 함께 여수의 바다를 색다르게 즐길 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 200000
  },
  // 전주
  7001: {
    desc: "전주 한옥마을 인근에 위치한 현대식 호텔입니다. 전통과 현대의 조화로운 경험을 선사합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 180000
  },
  7002: {
    desc: "전주 한옥마을 내 위치한 전통 한옥 스테이입니다. 온돌방에서 한국 전통의 정취를 느끼며 특별한 밤을 보낼 수 있습니다.",
    parking: false, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 150000
  },
  7003: {
    desc: "전주 객사 근처에 위치한 클래식한 분위기의 호텔입니다. 전주 구도심 탐방에 최적의 위치입니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 160000
  },
  7004: {
    desc: "전주 시내 중심가에 위치한 비즈니스 호텔입니다. 합리적인 가격과 편리한 교통으로 인기가 높습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 140000
  },
  7005: {
    desc: "한옥마을 내 위치한 전통 고택입니다. 아름다운 정원과 다도 체험으로 한국 전통문화를 깊이 경험할 수 있습니다.",
    parking: false, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 180000
  },
  // 속초
  8001: {
    desc: "설악산 전망을 자랑하는 프리미엄 호텔입니다. 사계절 설악산의 아름다움을 객실에서 감상할 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 280000
  },
  8002: {
    desc: "속초 해변가에 위치한 오션뷰 호텔입니다. 동해의 일출과 함께하는 아침이 특별합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 250000
  },
  8003: {
    desc: "워터파크와 스파를 갖춘 가족 리조트입니다. 설악산 관광과 물놀이를 한 번에 즐길 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 300000
  },
  8004: {
    desc: "설악산 국립공원 입구에 위치한 호텔입니다. 등산과 트레킹을 즐기는 여행객에게 최적의 베이스캠프입니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 220000
  },
  8005: {
    desc: "골프와 스파를 즐길 수 있는 프리미엄 리조트입니다. 설악산과 동해를 동시에 만끽할 수 있는 최고의 휴양지입니다.",
    parking: true, pet: true, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 350000
  },
  // 인천
  9001: {
    desc: "송도 국제도시에 위치한 럭셔리 호텔입니다. 현대적인 도시 경관과 함께 최고급 시설을 경험할 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 280000
  },
  9002: {
    desc: "영종도에 위치한 복합 리조트입니다. 카지노, 스파, 테마파크 등 다양한 엔터테인먼트를 한 곳에서 즐길 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 350000
  },
  9003: {
    desc: "인천공항 인근에 위치한 특급 호텔입니다. 공항 이용객에게 편리한 셔틀 서비스를 제공합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 300000
  },
  9004: {
    desc: "송도에 위치한 장기 투숙 가능한 레지던스 호텔입니다. 넓은 객실과 키친 시설로 편안한 장기 체류가 가능합니다.",
    parking: true, pet: true, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 220000
  },
  9005: {
    desc: "인천공항과 가까운 비즈니스 호텔입니다. 이른 비행기나 늦은 도착 시 편리하게 이용할 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 180000
  },
  // 대전
  10001: {
    desc: "대전 컨벤션센터에 인접한 비즈니스 호텔입니다. 전시회 및 컨퍼런스 참가객에게 최적의 위치입니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 200000
  },
  10002: {
    desc: "대전 유성구에 위치한 시티 호텔입니다. 깔끔한 시설과 합리적인 가격으로 비즈니스 여행객에게 인기가 높습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 150000
  },
  10003: {
    desc: "유성 온천지구에 위치한 온천 호텔입니다. 천연 온천수로 여행의 피로를 풀 수 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 180000
  },
  10004: {
    desc: "유성구에 위치한 온천 호텔입니다. 가족 단위 여행객에게 인기 있는 곳으로, 온천과 사우나 시설이 잘 갖춰져 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 120000
  },
  10005: {
    desc: "대전역 인근에 위치한 비즈니스 호텔입니다. KTX 이용객에게 편리한 접근성을 제공합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 130000
  },
  // 대구
  11001: {
    desc: "대구 수성구에 위치한 복합 리조트입니다. 골프장, 수영장, 스파 등 다양한 시설을 갖추고 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 180000
  },
  11002: {
    desc: "동성로 중심가에 위치한 비즈니스 호텔입니다. 쇼핑과 관광에 최적의 위치를 자랑합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 150000
  },
  11003: {
    desc: "동대구역 인근에 위치한 호텔입니다. KTX 이용객에게 편리하며, 비즈니스 미팅에 적합한 시설을 갖추고 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 130000
  },
  11004: {
    desc: "대구 수성구에 위치한 전통 있는 호텔입니다. 사우나와 레스토랑 등 편의시설이 잘 갖춰져 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 140000
  },
  11005: {
    desc: "수성못 인근에 위치한 호텔입니다. 수성못의 아름다운 경치를 감상하며 산책하기 좋습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 160000
  },
  // 광주
  12001: {
    desc: "광주 상무지구에 위치한 인터내셔널 호텔입니다. 수영장, 피트니스 등 다양한 부대시설을 갖추고 있습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: true,
    basePrice: 180000
  },
  12002: {
    desc: "상무공원 인근에 위치한 비즈니스 호텔입니다. 깔끔한 시설과 편리한 교통으로 비즈니스 여행객에게 인기가 높습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 150000
  },
  12003: {
    desc: "충장로 번화가에 위치한 호텔입니다. 광주의 중심에서 쇼핑과 맛집 탐방을 즐기기 좋습니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 120000
  },
  12004: {
    desc: "무등산 인근에 위치한 호텔입니다. 등산과 자연을 즐기는 여행객에게 추천합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 140000
  },
  12005: {
    desc: "광주 상무지구에 위치한 가성비 호텔입니다. 비즈니스 출장 및 관광 모두에 적합합니다.",
    parking: true, pet: false, wifi: true, noSmoking: true, breakfast: false,
    basePrice: 110000
  }
};

// 기본 상세 데이터 (데이터가 없는 호텔용)
const defaultDetail = {
  desc: "편안한 휴식과 최적의 위치를 제공하는 호텔입니다. 깨끗한 시설과 친절한 서비스로 여행의 피로를 씻어드립니다.",
  parking: true,
  pet: false,
  wifi: true,
  noSmoking: true,
  breakfast: false,
  basePrice: 150000
};

// 상세 데이터 병합
const detail = hotelDetailData[hotel.id] || defaultDetail;

// ===============================
// 4. DOM 요소
// ===============================
const headerHotelName = document.getElementById("headerHotelName");
const hotelImage = document.getElementById("hotelImage");
const hotelName = document.getElementById("hotelName");
const hotelAddress = document.getElementById("hotelAddress");
const hotelContact = document.getElementById("hotelContact");
const hotelPrice = document.getElementById("hotelPrice");
const hotelDesc = document.getElementById("hotelDesc");

// 픽토그램
const parkingInfo = document.getElementById("parkingInfo");
const petInfo = document.getElementById("petInfo");
const wifiInfo = document.getElementById("wifiInfo");
const noSmokingInfo = document.getElementById("noSmokingInfo");
const breakfastInfo = document.getElementById("breakfastInfo");

// 버튼
const bookingBtn = document.getElementById("bookingBtn");
const addScheduleBtn = document.getElementById("addScheduleBtn");
const detailBtn = document.getElementById("detailBtn");
const modalHotelName = document.getElementById("modalHotelName");

// 픽토그램 섹션
const pictogramSection = document.getElementById("pictogramSection");

// ===============================
// 5. 호텔 정보 렌더링
// ===============================
function renderHotelInfo() {
  // 헤더 및 기본 정보
  if (headerHotelName) headerHotelName.textContent = hotel.name;
  if (hotelName) hotelName.textContent = hotel.name;
  if (hotelAddress) hotelAddress.textContent = hotel.address;
  if (hotelContact) hotelContact.textContent = hotel.contact;
  if (hotelPrice) hotelPrice.textContent = hotel.price;
  if (modalHotelName) modalHotelName.textContent = hotel.name;

  // 이미지
  if (hotelImage) {
    hotelImage.src = `../../${hotel.image}`;
    hotelImage.alt = hotel.name;
    hotelImage.onerror = function() {
      this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="280"%3E%3Crect fill="%23e0e0e0" width="320" height="280" rx="16"/%3E%3Ctext x="50%25" y="45%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="sans-serif" font-size="18"%3E%EC%88%99%EC%86%8C%3C/text%3E%3Ctext x="50%25" y="55%25" text-anchor="middle" fill="%23999" font-family="sans-serif" font-size="18"%3E%EC%9D%B4%EB%AF%B8%EC%A7%80%3C/text%3E%3C/svg%3E';
    };
  }

  // 설명
  if (hotelDesc) hotelDesc.textContent = detail.desc;

  // 픽토그램 상태 설정
  setPictogram(parkingInfo, detail.parking, detail.parking ? "가능" : "불가");
  setPictogram(petInfo, detail.pet, detail.pet ? "동반 가능" : "불가");
  setPictogram(wifiInfo, detail.wifi, detail.wifi ? "무료" : "유료");
  setPictogram(noSmokingInfo, detail.noSmoking, detail.noSmoking ? "금연" : "흡연 가능");
  setPictogram(breakfastInfo, detail.breakfast, detail.breakfast ? "제공" : "미제공");

  // 페이지 타이틀 업데이트
  document.title = `${hotel.name} | TravelKorea`;
}

// ===============================
// 6. 픽토그램 렌더링
// ===============================
function setPictogram(element, available, text) {
  if (!element) return;

  element.classList.toggle("available", available);
  element.classList.toggle("unavailable", !available);

  const statusEl = element.querySelector(".pictogram-status");
  if (statusEl) {
    statusEl.textContent = text;
  }
}

// ===============================
// 7. 이벤트 리스너
// ===============================

// 상세 정보 버튼 (픽토그램 토글)
if (detailBtn) {
  detailBtn.addEventListener("click", function() {
    if (pictogramSection) {
      const isHidden = pictogramSection.style.display === "none";
      pictogramSection.style.display = isHidden ? "block" : "none";
      this.textContent = isHidden ? "상세 정보 숨기기" : "상세 정보";
    }
  });
}

// 예약 버튼
if (bookingBtn) {
  bookingBtn.addEventListener("click", function() {
    const bookingData = {
      hotelId: hotel.id,
      hotelName: hotel.name,
      image: `../../${hotel.image}`,
      addr: hotel.address,
      tel: hotel.contact,
      basePrice: detail.basePrice,
      region: region
    };

    openBookingPanel(bookingData);
  });
}

// 일정 추가 버튼
if (addScheduleBtn) {
  addScheduleBtn.addEventListener("click", function() {
    const schedules = JSON.parse(localStorage.getItem("mySchedules")) || [];

    // 중복 체크
    const exists = schedules.some(s => s.originalId === hotel.id && s.type === "hotel");
    if (exists) {
      alert("이미 일정에 추가된 숙소입니다.");
      return;
    }

    schedules.push({
      id: Date.now(),
      originalId: hotel.id,
      name: hotel.name,
      image: `../../${hotel.image}`,
      location: hotel.address,
      description: `1박 ${detail.basePrice.toLocaleString()}원부터`,
      type: "hotel",
      region: region,
      addedAt: new Date().toISOString()
    });

    localStorage.setItem("mySchedules", JSON.stringify(schedules));
    alert("일정에 추가되었습니다!");
  });
}

// ===============================
// 8. 리뷰 섹션 (샘플 데이터)
// ===============================
const sampleReviews = [
  {
    id: 1,
    nickname: "여행자123",
    date: "2024.12.15",
    rating: 5,
    content: "위치도 좋고 시설도 깨끗해서 너무 만족스러웠습니다. 직원분들도 친절하시고 다음에 또 방문하고 싶네요!"
  },
  {
    id: 2,
    nickname: "김서울",
    date: "2024.12.10",
    rating: 4,
    content: "전반적으로 좋았습니다. 조식이 다양하고 맛있었어요. 다만 주차 공간이 조금 협소한 점이 아쉬웠습니다."
  },
  {
    id: 3,
    nickname: "부산사람",
    date: "2024.12.05",
    rating: 5,
    content: "뷰가 정말 최고였습니다! 특히 야경이 너무 예뻐서 오래도록 기억에 남을 것 같아요. 강력 추천합니다."
  }
];

function renderReviews() {
  const reviewList = document.getElementById("reviewList");
  const reviewCount = document.getElementById("reviewCount");

  if (!reviewList) return;

  if (reviewCount) {
    reviewCount.textContent = `${sampleReviews.length}개의 후기`;
  }

  reviewList.innerHTML = sampleReviews.map(review => `
    <div class="review-card">
      <div class="review-user">
        <div class="review-avatar">
          <span class="review-avatar-placeholder">👤</span>
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
    </div>
  `).join("");
}

function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<span class="star">★</span>';
    } else {
      stars += '<span class="star empty">☆</span>';
    }
  }
  return stars;
}

// ===============================
// 9. 초기화
// ===============================
document.addEventListener("DOMContentLoaded", function() {
  renderHotelInfo();
  renderReviews();
});

// 페이지 로드 시 바로 실행 (DOMContentLoaded 이벤트가 이미 발생한 경우)
if (document.readyState === "complete" || document.readyState === "interactive") {
  renderHotelInfo();
  renderReviews();
}
