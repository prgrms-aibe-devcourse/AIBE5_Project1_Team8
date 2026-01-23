const places = [
  // ===== 서울 =====
  {
    id: 1,
    region: "seoul",
    name: "경복궁",
    description: "조선 왕조의 대표적인 궁궐",
    image: "images/places/gyeongbokgung.jpg"
  },
  {
    id: 2,
    region: "seoul",
    name: "남산타워",
    description: "서울 전경을 한눈에 감상",
    image: "images/places/namsan.jpg"
  },
  {
    id: 3,
    region: "seoul",
    name: "북촌한옥마을",
    description: "전통 한옥이 잘 보존된 마을",
    image: "images/places/bukchon.jpg"
  },

  // ===== 부산 =====
  {
    id: 4,
    region: "busan",
    name: "해운대 해수욕장",
    description: "부산을 대표하는 해변 관광지",
    image: "images/places/haeundae.jpg"
  },
  {
    id: 5,
    region: "busan",
    name: "광안리 해수욕장",
    description: "광안대교 야경으로 유명",
    image: "images/places/gwangalli.jpg"
  },
  {
    id: 6,
    region: "busan",
    name: "감천문화마을",
    description: "알록달록한 집들과 골목 예술",
    image: "images/places/gamcheon.jpg"
  },

  // ===== 제주 =====
  {
    id: 7,
    region: "jeju",
    name: "성산일출봉",
    description: "유네스코 세계자연유산",
    image: "images/places/seongsan.jpg"
  },
  {
    id: 8,
    region: "jeju",
    name: "한라산",
    description: "대한민국 최고봉",
    image: "images/places/hallasan.jpg"
  },
  {
    id: 9,
    region: "jeju",
    name: "협재 해수욕장",
    description: "에메랄드빛 바다와 하얀 모래",
    image: "images/places/hyeopjae.jpg"
  },

  // ===== 강릉 =====
  {
    id: 10,
    region: "gangneung",
    name: "경포대",
    description: "경포호와 동해 바다 감상",
    image: "images/places/gyeongpodae.jpg"
  },
  {
    id: 11,
    region: "gangneung",
    name: "안목해변",
    description: "커피 거리로 유명한 명소",
    image: "images/places/anmok.jpg"
  },

  // ===== 경주 =====
  {
    id: 12,
    region: "gyeongju",
    name: "불국사",
    description: "세계문화유산 사찰",
    image: "images/places/bulguksa.jpg"
  },
  {
    id: 13,
    region: "gyeongju",
    name: "첨성대",
    description: "동양에서 가장 오래된 천문대",
    image: "images/places/cheomseongdae.jpg"
  },

  // ===== 여수 =====
  {
    id: 14,
    region: "yeosu",
    name: "여수 밤바다",
    description: "아름다운 야경과 낭만",
    image: "images/places/yeosu_night.jpg"
  },
  {
    id: 15,
    region: "yeosu",
    name: "오동도",
    description: "동백꽃과 산책로가 유명",
    image: "images/places/odongdo.jpg"
  },

  // ===== 전주 =====
  {
    id: 16,
    region: "jeonju",
    name: "전주 한옥마을",
    description: "700여 채의 한옥 마을",
    image: "images/places/hanok_village.jpg"
  },
  {
    id: 17,
    region: "jeonju",
    name: "경기전",
    description: "태조 이성계의 어진을 모신 곳",
    image: "images/places/gyungijeon.jpg"
  },

  // ===== 속초 =====
  {
    id: 18,
    region: "sokcho",
    name: "설악산",
    description: "웅장한 산세와 단풍",
    image: "images/places/seoraksan.jpg"
  },
  {
    id: 19,
    region: "sokcho",
    name: "속초 중앙시장",
    description: "다양한 먹거리와 활기찬 분위기",
    image: "images/places/sokcho_market.jpg"
  },

  // ===== 인천 =====
  {
    id: 20,
    region: "incheon",
    name: "송도 센트럴파크",
    description: "도심 속 자연과 현대 도시 풍경",
    image: "images/places/songdo.jpg"
  },
  {
    id: 21,
    region: "incheon",
    name: "차이나타운",
    description: "한국에서 가장 오래된 차이나타운",
    image: "images/places/chinatown.jpg"
  },

  // ===== 대전 =====
  {
    id: 22,
    region: "daejeon",
    name: "엑스포 과학공원",
    description: "과학과 기술 체험 테마 공원",
    image: "images/places/expo.jpg"
  },
  {
    id: 23,
    region: "daejeon",
    name: "계족산 황톳길",
    description: "맨발로 걷는 황톳길 힐링 명소",
    image: "images/places/gyeryongsan.jpg"
  },

  // ===== 추가 명소들 =====
  // 서울
  {
    id: 24,
    region: "seoul",
    name: "한강 공원",
    description: "서울 시민의 휴식처, 다양한 레저 활동 가능",
    image: "images/places/hangang.jpg"
  },

  // 인천
  {
    id: 25,
    region: "incheon",
    name: "월미도 테마파크",
    description: "바다를 배경으로 한 놀이공원",
    image: "images/places/wolmido.jpg"
  },
  {
    id: 26,
    region: "incheon",
    name: "신포국제시장",
    description: "다양한 먹거리와 볼거리가 있는 전통시장",
    image: "images/places/sinpo.jpg"
  },

  // 강릉
  {
    id: 27,
    region: "gangneung",
    name: "정동진",
    description: "해돋이 명소로 유명한 동해안 해변",
    image: "images/places/jeongdongjin.jpg"
  },
  {
    id: 28,
    region: "gangneung",
    name: "오죽헌",
    description: "신사임당과 율곡 이이의 생가",
    image: "images/places/ojukheon.jpg"
  },

  // 제주
  {
    id: 29,
    region: "jeju",
    name: "만장굴",
    description: "유네스코 세계자연유산 용암동굴",
    image: "images/places/manjanggul.jpg"
  },

  // 속초
  {
    id: 30,
    region: "sokcho",
    name: "속초 해수욕장",
    description: "청정 동해 바다를 즐길 수 있는 해변",
    image: "images/places/sokcho_beach.jpg"
  },
  {
    id: 31,
    region: "sokcho",
    name: "아바이마을",
    description: "실향민들이 정착한 역사적인 마을",
    image: "images/places/abai.jpg"
  },
  {
    id: 32,
    region: "sokcho",
    name: "영금정",
    description: "기암괴석과 동해 바다가 어우러진 명소",
    image: "images/places/yeonggeumjeong.jpg"
  },

  // 부산
  {
    id: 33,
    region: "busan",
    name: "자갈치 시장",
    description: "부산 대표 수산물 시장",
    image: "images/places/jagalchi.jpg"
  },

  // 전주
  {
    id: 34,
    region: "jeonju",
    name: "전동성당",
    description: "한국 천주교 순교지이자 아름다운 성당",
    image: "images/places/jeondong.jpg"
  },
  {
    id: 35,
    region: "jeonju",
    name: "남부시장",
    description: "전주 전통 시장, 야시장으로 유명",
    image: "images/places/nambu.jpg"
  },

  // 경주
  {
    id: 36,
    region: "gyeongju",
    name: "석굴암",
    description: "유네스코 세계문화유산 석조 불상",
    image: "images/places/seokguram.jpg"
  },
  {
    id: 37,
    region: "gyeongju",
    name: "대릉원",
    description: "신라 왕릉이 모여 있는 고분군",
    image: "images/places/daereungwon.jpg"
  },
  {
    id: 38,
    region: "gyeongju",
    name: "동궁과 월지",
    description: "신라 시대 궁궐터와 연못 (안압지)",
    image: "images/places/donggung.jpg"
  },

  // 여수
  {
    id: 39,
    region: "yeosu",
    name: "향일암",
    description: "남해 일출 명소, 바다 위 사찰",
    image: "images/places/hyangilam.jpg"
  },
  {
    id: 40,
    region: "yeosu",
    name: "여수 해상케이블카",
    description: "바다 위를 가로지르는 케이블카",
    image: "images/places/yeosu_cablecar.jpg"
  },

  // 대전
  {
    id: 41,
    region: "daejeon",
    name: "유성온천",
    description: "역사 깊은 온천 휴양지",
    image: "images/places/yuseong.jpg"
  }
];

const hotels = [
  { id: 1, name: "서울 센트럴 호텔", region: "seoul", price: 120000, rating: 4.6, image: "images/seoul_hotel.jpg" },
  { id: 2, name: "부산 오션뷰 호텔", region: "busan", price: 150000, rating: 4.8, image: "images/busan_hotel.jpg" },
  { id: 3, name: "제주 힐링 리조트", region: "jeju", price: 180000, rating: 4.7, image: "images/jeju_hotel.jpg" },
  { id: 4, name: "강릉 비치 호텔", region: "gangneung", price: 130000, rating: 4.5, image: "images/gangneung_hotel.jpg" },
  { id: 5, name: "경주 헤리티지 호텔", region: "gyeongju", price: 110000, rating: 4.4, image: "images/gyeongju_hotel.jpg" },
  { id: 6, name: "여수 마리나 호텔", region: "yeosu", price: 140000, rating: 4.6, image: "images/yeosu_hotel.jpg" },
  { id: 7, name: "전주 한옥 스테이", region: "jeonju", price: 100000, rating: 4.3, image: "images/jeonju_hotel.jpg" },
  { id: 8, name: "속초 씨사이드 호텔", region: "sokcho", price: 125000, rating: 4.5, image: "images/sokcho_hotel.jpg" },
  { id: 9, name: "송도 센트럴 호텔", region: "incheon", price: 135000, rating: 4.4, image: "images/incheon_hotel.jpg" },
  { id: 10, name: "대전 비즈니스 호텔", region: "daejeon", price: 105000, rating: 4.2, image: "images/daejeon_hotel.jpg" }
];

// URL에서 region 값 읽기
const params = new URLSearchParams(window.location.search);
const selectedRegion = params.get("region");

const placeList = document.getElementById("placeList");
const hotelsList = document.getElementById("hotelsList");
const regionTitle = document.getElementById("regionTitle");
const regionSubtitle = document.getElementById("regionSubtitle");
const viewAllHotelsBtn = document.getElementById("viewAllHotelsBtn");
const scrollTopBtn = document.getElementById("scrollTop");

// Schedule modal elements
const scheduleModal = document.getElementById("scheduleModal");
const modalPlaceName = document.getElementById("modalPlaceName");
const cancelScheduleBtn = document.getElementById("cancelScheduleBtn");
const confirmScheduleBtn = document.getElementById("confirmScheduleBtn");

// State for modal
let selectedPlace = null;

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

// 지역 타이틀 업데이트
if (selectedRegion && regionNames[selectedRegion]) {
  regionTitle.textContent = `${regionNames[selectedRegion]} 명소`;
  regionSubtitle.textContent = `${regionNames[selectedRegion]}의 아름다운 명소를 탐험하세요`;
}

// 명소 렌더링
function renderPlaces() {
  placeList.innerHTML = "";

  const filteredPlaces = places.filter(place => place.region === selectedRegion);

  filteredPlaces.forEach((place, index) => {
    const card = document.createElement("div");
    card.className = "place-card";
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <img src="${place.image}" alt="${place.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2218%22%3E${place.name}%3C/text%3E%3C/svg%3E'">
      <div class="place-info">
        <h3>${place.name}</h3>
        <p class="place-description">${place.description}</p>
        <button class="btn-add-schedule" data-place-id="${place.id}">📅 일정 추가</button>
      </div>
    `;

    card.querySelector('img, h3, .place-description').addEventListener("click", () => {
      window.location.href = `place-detail.html?id=${place.id}`;
    });

    placeList.appendChild(card);
  });
}

// 호텔 렌더링
function renderHotels() {
  hotelsList.innerHTML = "";

  const filteredHotels = hotels.filter(hotel => hotel.region === selectedRegion);

  filteredHotels.forEach((hotel, index) => {
    const card = document.createElement("div");
    card.className = "hotel-card";
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <img src="${hotel.image}" alt="${hotel.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22180%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22180%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2218%22%3E🏨 ${hotel.name}%3C/text%3E%3C/svg%3E'">
      <div class="hotel-card-info">
        <h3 class="hotel-card-title">${hotel.name}</h3>
        <div class="hotel-rating">⭐ ${hotel.rating}</div>
        <div class="hotel-price">
          ₩${hotel.price.toLocaleString()} <span class="hotel-price-label">/ 1박</span>
        </div>
        <button class="btn-add-hotel-schedule" data-hotel-id="${hotel.id}">❤️ 일정에 담기</button>
      </div>
    `;

    // 카드 클릭 시 상세 페이지로 이동 (버튼 제외)
    card.querySelector("img").addEventListener("click", () => {
      window.location.href = `hotel-detail.html?id=${hotel.id}`;
    });
    card.querySelector(".hotel-card-title").addEventListener("click", () => {
      window.location.href = `hotel-detail.html?id=${hotel.id}`;
    });

    hotelsList.appendChild(card);
  });

  // 호텔이 없으면 섹션 숨기기
  if (filteredHotels.length === 0) {
    document.querySelector('.hotels-section').style.display = 'none';
  }
}

// "모든 호텔 보기" 버튼에 지역 필터 추가
if (selectedRegion) {
  viewAllHotelsBtn.href = `hotel.html?region=${selectedRegion}`;
}

// Scroll to top 버튼
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===== 명소 일정 추가 기능 =====
// "일정 추가" 버튼 클릭 이벤트 (이벤트 위임)
placeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-schedule")) {
    e.stopPropagation();
    const placeId = parseInt(e.target.dataset.placeId);
    selectedPlace = places.find(p => p.id === placeId);

    if (selectedPlace) {
      modalPlaceName.textContent = selectedPlace.name;
      scheduleModal.style.display = "flex";
    }
  }
});

// 모달 취소 버튼
cancelScheduleBtn.addEventListener("click", () => {
  scheduleModal.style.display = "none";
  selectedPlace = null;
});

// 모달 확인 버튼 - 명소를 일정에 추가
confirmScheduleBtn.addEventListener("click", () => {
  if (!selectedPlace) return;

  const schedules = JSON.parse(localStorage.getItem("mySchedules")) || [];

  // 중복 체크
  const exists = schedules.some(s => s.name === selectedPlace.name && s.type === "place");

  if (exists) {
    alert("이미 일정에 추가된 명소입니다.");
    scheduleModal.style.display = "none";
    selectedPlace = null;
    return;
  }

  // 새로운 일정 추가
  schedules.push({
    id: Date.now(),
    originalId: selectedPlace.id,
    name: selectedPlace.name,
    image: selectedPlace.image,
    location: regionNames[selectedPlace.region] || selectedPlace.region,
    description: selectedPlace.description,
    type: "place",
    addedAt: new Date().toISOString()
  });

  localStorage.setItem("mySchedules", JSON.stringify(schedules));
  alert("일정이 추가되었습니다!");

  scheduleModal.style.display = "none";
  selectedPlace = null;
});

// 모달 오버레이 클릭 시 닫기
scheduleModal.addEventListener("click", (e) => {
  if (e.target === scheduleModal) {
    scheduleModal.style.display = "none";
    selectedPlace = null;
  }
});

// ===== 호텔 일정 추가 기능 =====
const hotelScheduleModal = document.getElementById("hotelScheduleModal");
const modalHotelName = document.getElementById("modalHotelName");
const cancelHotelScheduleBtn = document.getElementById("cancelHotelScheduleBtn");
const confirmHotelScheduleBtn = document.getElementById("confirmHotelScheduleBtn");

let selectedHotel = null;

// 호텔 "일정 추가" 버튼 클릭 이벤트 (이벤트 위임)
hotelsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-hotel-schedule")) {
    e.stopPropagation();
    const hotelId = parseInt(e.target.dataset.hotelId);
    selectedHotel = hotels.find(h => h.id === hotelId);

    if (selectedHotel) {
      modalHotelName.textContent = selectedHotel.name;
      hotelScheduleModal.style.display = "flex";
    }
  }
});

// 호텔 모달 취소 버튼
cancelHotelScheduleBtn.addEventListener("click", () => {
  hotelScheduleModal.style.display = "none";
  selectedHotel = null;
});

// 호텔 모달 확인 버튼 - 호텔을 일정에 추가
confirmHotelScheduleBtn.addEventListener("click", () => {
  if (!selectedHotel) return;

  const schedules = JSON.parse(localStorage.getItem("mySchedules")) || [];

  // 중복 체크
  const exists = schedules.some(s => s.name === selectedHotel.name && s.type === "hotel");

  if (exists) {
    alert("이미 일정에 추가된 호텔입니다.");
    hotelScheduleModal.style.display = "none";
    selectedHotel = null;
    return;
  }

  // 새로운 일정 추가
  schedules.push({
    id: Date.now(),
    originalId: selectedHotel.id,
    name: selectedHotel.name,
    image: selectedHotel.image,
    location: regionNames[selectedHotel.region] || selectedHotel.region,
    description: `⭐ ${selectedHotel.rating} · 1박 ₩${selectedHotel.price.toLocaleString()}부터`,
    type: "hotel",
    addedAt: new Date().toISOString()
  });

  localStorage.setItem("mySchedules", JSON.stringify(schedules));
  alert("일정이 추가되었습니다!");

  hotelScheduleModal.style.display = "none";
  selectedHotel = null;
});

// 호텔 모달 오버레이 클릭 시 닫기
hotelScheduleModal.addEventListener("click", (e) => {
  if (e.target === hotelScheduleModal) {
    hotelScheduleModal.style.display = "none";
    selectedHotel = null;
  }
});

// ESC 키로 모달 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (scheduleModal.style.display === "flex") {
      scheduleModal.style.display = "none";
      selectedPlace = null;
    }
    if (hotelScheduleModal.style.display === "flex") {
      hotelScheduleModal.style.display = "none";
      selectedHotel = null;
    }
  }
});

// 초기 렌더링 (로딩 효과 후)
setTimeout(() => {
  renderPlaces();
  renderHotels();
}, 500);
