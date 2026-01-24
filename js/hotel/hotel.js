// ===== 카테고리별 데이터 =====

// 숙박 (호텔)
const accommodationData = [
  {
    id: 1,
    name: "서울 센트럴 호텔",
    address: "서울특별시 중구 명동길 123",
    contact: "02-1234-5678",
    image: "images/seoul_hotel.png",
    category: "accommodation"
  },
  {
    id: 2,
    name: "부산 오션뷰 호텔",
    address: "부산광역시 해운대구 해운대로 456",
    contact: "051-2345-6789",
    image: "images/busan_hotel.png",
    category: "accommodation"
  },
  {
    id: 3,
    name: "제주 힐링 리조트",
    address: "제주특별자치도 서귀포시 중문로 789",
    contact: "064-3456-7890",
    image: "images/jeju_hotel.png",
    category: "accommodation"
  },
  {
    id: 4,
    name: "강릉 비치 호텔",
    address: "강원도 강릉시 경포로 101",
    contact: "033-4567-8901",
    image: "images/gangneung_hotel.jpg",
    category: "accommodation"
  },
  {
    id: 5,
    name: "경주 헤리티지 호텔",
    address: "경상북도 경주시 불국로 202",
    contact: "054-5678-9012",
    image: "images/gyeongju_hotel.jpg",
    category: "accommodation"
  },
  {
    id: 6,
    name: "여수 마리나 호텔",
    address: "전라남도 여수시 오동도로 303",
    contact: "061-6789-0123",
    image: "images/yeosu_hotel.jpg",
    category: "accommodation"
  },
  {
    id: 7,
    name: "전주 한옥 스테이",
    address: "전라북도 전주시 완산구 한옥마을길 404",
    contact: "063-7890-1234",
    image: "images/jeonju_hotel.jpg",
    category: "accommodation"
  },
  {
    id: 8,
    name: "속초 씨사이드 호텔",
    address: "강원도 속초시 청초호반로 505",
    contact: "033-8901-2345",
    image: "images/sokcho_hotel.jpg",
    category: "accommodation"
  },
  {
    id: 9,
    name: "송도 센트럴 호텔",
    address: "인천광역시 연수구 센트럴로 606",
    contact: "032-9012-3456",
    image: "images/incheon_hotel.jpg",
    category: "accommodation"
  },
  {
    id: 10,
    name: "대전 비즈니스 호텔",
    address: "대전광역시 유성구 과학로 707",
    contact: "042-0123-4567",
    image: "images/daejeon_hotel.jpg",
    category: "accommodation"
  }
];

// 문화 (궁궐, 사찰, 유적지 등)
const cultureData = [
  {
    id: 101,
    detailId: 1,
    name: "경복궁",
    address: "서울특별시 종로구 사직로 161",
    contact: "02-3700-3900",
    image: "images/places/gyeongbokgung.jpg",
    category: "culture"
  },
  {
    id: 102,
    detailId: 12,
    name: "불국사",
    address: "경상북도 경주시 불국로 385",
    contact: "054-746-9913",
    image: "images/places/bulguksa.jpg",
    category: "culture"
  },
  {
    id: 103,
    detailId: 13,
    name: "첨성대",
    address: "경상북도 경주시 인왕동 839-1",
    contact: "054-772-5134",
    image: "images/places/cheomseongdae.jpg",
    category: "culture"
  },
  {
    id: 104,
    detailId: 36,
    name: "석굴암",
    address: "경상북도 경주시 불국로 873-243",
    contact: "054-746-9933",
    image: "images/places/seokguram.jpg",
    category: "culture"
  },
  {
    id: 105,
    detailId: 17,
    name: "경기전",
    address: "전라북도 전주시 완산구 태조로 44",
    contact: "063-281-2790",
    image: "images/places/gyungijeon.jpg",
    category: "culture"
  },
  {
    id: 106,
    detailId: 34,
    name: "전동성당",
    address: "전라북도 전주시 완산구 태조로 51",
    contact: "063-284-3222",
    image: "images/places/jeondong.jpg",
    category: "culture"
  },
  {
    id: 107,
    detailId: 38,
    name: "동궁과 월지",
    address: "경상북도 경주시 원화로 102",
    contact: "054-750-8655",
    image: "images/places/donggung.jpg",
    category: "culture"
  },
  {
    id: 108,
    detailId: 37,
    name: "대릉원",
    address: "경상북도 경주시 황남동 183",
    contact: "054-750-8650",
    image: "images/places/daereungwon.jpg",
    category: "culture"
  },
  {
    id: 109,
    detailId: 28,
    name: "오죽헌",
    address: "강원도 강릉시 율곡로 3139번길 24",
    contact: "033-660-3301",
    image: "images/places/ojukheon.jpg",
    category: "culture"
  },
  {
    id: 110,
    detailId: 39,
    name: "향일암",
    address: "전라남도 여수시 돌산읍 향일암로 60",
    contact: "061-644-4742",
    image: "images/places/hyangilam.jpg",
    category: "culture"
  }
];

// 식당/시장
const restaurantData = [
  {
    id: 201,
    detailId: 33,
    name: "자갈치 시장",
    address: "부산광역시 중구 자갈치해안로 52",
    contact: "051-245-2594",
    image: "images/places/jagalchi.jpg",
    category: "restaurant"
  },
  {
    id: 202,
    detailId: 19,
    name: "속초 중앙시장",
    address: "강원도 속초시 중앙로 147번길 16",
    contact: "033-632-5765",
    image: "images/places/sokcho_market.jpg",
    category: "restaurant"
  },
  {
    id: 203,
    detailId: 26,
    name: "신포국제시장",
    address: "인천광역시 중구 신포로27번길 11-5",
    contact: "032-772-5812",
    image: "images/places/sinpo.jpg",
    category: "restaurant"
  },
  {
    id: 204,
    detailId: 35,
    name: "남부시장",
    address: "전라북도 전주시 완산구 풍남문3길 27",
    contact: "063-284-1344",
    image: "images/places/nambu.jpg",
    category: "restaurant"
  },
  {
    id: 205,
    detailId: 11,
    name: "안목해변 커피거리",
    address: "강원도 강릉시 창해로14번길",
    contact: "033-640-5420",
    image: "images/places/anmok.jpg",
    category: "restaurant"
  },
  {
    id: 206,
    detailId: 21,
    name: "차이나타운",
    address: "인천광역시 중구 차이나타운로 12",
    contact: "032-760-7114",
    image: "images/places/chinatown.jpg",
    category: "restaurant"
  },
  {
    id: 207,
    detailId: 0,
    name: "제주 동문시장",
    address: "제주특별자치도 제주시 관덕로14길 20",
    contact: "064-752-3001",
    image: "images/places/dongmun_market.jpg",
    category: "restaurant"
  },
  {
    id: 208,
    detailId: 0,
    name: "광장시장",
    address: "서울특별시 종로구 창경궁로 88",
    contact: "02-2267-0291",
    image: "images/places/gwangjang.jpg",
    category: "restaurant"
  }
];

// 자연 (산, 바다, 공원 등)
const natureData = [
  {
    id: 301,
    detailId: 8,
    name: "한라산",
    address: "제주특별자치도 제주시 1100로 2070-61",
    contact: "064-713-9950",
    image: "images/places/hallasan.jpg",
    category: "nature"
  },
  {
    id: 302,
    detailId: 18,
    name: "설악산",
    address: "강원도 속초시 설악산로 833",
    contact: "033-636-7700",
    image: "images/places/seoraksan.jpg",
    category: "nature"
  },
  {
    id: 303,
    detailId: 7,
    name: "성산일출봉",
    address: "제주특별자치도 서귀포시 성산읍 성산리 1",
    contact: "064-783-0959",
    image: "images/places/seongsan.jpg",
    category: "nature"
  },
  {
    id: 304,
    detailId: 4,
    name: "해운대 해수욕장",
    address: "부산광역시 해운대구 해운대해변로 264",
    contact: "051-749-7601",
    image: "images/places/haeundae.jpg",
    category: "nature"
  },
  {
    id: 305,
    detailId: 5,
    name: "광안리 해수욕장",
    address: "부산광역시 수영구 광안해변로 219",
    contact: "051-610-4742",
    image: "images/places/gwangalli.jpg",
    category: "nature"
  },
  {
    id: 306,
    detailId: 9,
    name: "협재 해수욕장",
    address: "제주특별자치도 제주시 한림읍 협재리 2497-1",
    contact: "064-728-3981",
    image: "images/places/hyeopjae.jpg",
    category: "nature"
  },
  {
    id: 307,
    detailId: 10,
    name: "경포대",
    address: "강원도 강릉시 경포로 365",
    contact: "033-640-5420",
    image: "images/places/gyeongpodae.jpg",
    category: "nature"
  },
  {
    id: 308,
    detailId: 27,
    name: "정동진",
    address: "강원도 강릉시 강동면 정동진리",
    contact: "033-640-4414",
    image: "images/places/jeongdongjin.jpg",
    category: "nature"
  },
  {
    id: 309,
    detailId: 15,
    name: "오동도",
    address: "전라남도 여수시 오동도로 222",
    contact: "061-659-1819",
    image: "images/places/odongdo.jpg",
    category: "nature"
  },
  {
    id: 310,
    detailId: 23,
    name: "계족산 황톳길",
    address: "대전광역시 대덕구 장동 산 29-1",
    contact: "042-608-6551",
    image: "images/places/gyeryongsan.jpg",
    category: "nature"
  },
  {
    id: 311,
    detailId: 29,
    name: "만장굴",
    address: "제주특별자치도 제주시 구좌읍 만장굴길 182",
    contact: "064-710-7903",
    image: "images/places/manjanggul.jpg",
    category: "nature"
  },
  {
    id: 312,
    detailId: 24,
    name: "한강 공원",
    address: "서울특별시 영등포구 여의동로 330",
    contact: "02-3780-0561",
    image: "images/places/hangang.jpg",
    category: "nature"
  },
  {
    id: 313,
    detailId: 30,
    name: "속초 해수욕장",
    address: "강원도 속초시 해오름로 186",
    contact: "033-639-2027",
    image: "images/places/sokcho_beach.jpg",
    category: "nature"
  },
  {
    id: 314,
    detailId: 32,
    name: "영금정",
    address: "강원도 속초시 영금정로 43",
    contact: "033-639-2690",
    image: "images/places/yeonggeumjeong.jpg",
    category: "nature"
  },
  {
    id: 315,
    detailId: 14,
    name: "여수 밤바다",
    address: "전라남도 여수시 중앙동 해안가",
    contact: "061-659-1800",
    image: "images/places/yeosu_night.jpg",
    category: "nature"
  },
  {
    id: 316,
    detailId: 20,
    name: "송도 센트럴파크",
    address: "인천광역시 연수구 컨벤시아대로 160",
    contact: "032-832-1234",
    image: "images/places/songdo.jpg",
    category: "nature"
  }
];

// 레져 (테마파크, 케이블카 등)
const leisureData = [
  {
    id: 401,
    detailId: 25,
    name: "월미도 테마파크",
    address: "인천광역시 중구 월미로 136",
    contact: "032-765-4169",
    image: "images/places/wolmido.jpg",
    category: "leisure"
  },
  {
    id: 402,
    detailId: 40,
    name: "여수 해상케이블카",
    address: "전라남도 여수시 돌산읍 돌산로 3600-1",
    contact: "061-664-7301",
    image: "images/places/yeosu_cablecar.jpg",
    category: "leisure"
  },
  {
    id: 403,
    detailId: 22,
    name: "엑스포 과학공원",
    address: "대전광역시 유성구 대덕대로 480",
    contact: "042-866-5114",
    image: "images/places/expo.jpg",
    category: "leisure"
  },
  {
    id: 404,
    detailId: 2,
    name: "남산타워",
    address: "서울특별시 용산구 남산공원길 105",
    contact: "02-3455-9277",
    image: "images/places/namsan.jpg",
    category: "leisure"
  },
  {
    id: 405,
    detailId: 41,
    name: "유성온천",
    address: "대전광역시 유성구 봉명동 온천로 일대",
    contact: "042-611-2114",
    image: "images/places/yuseong.jpg",
    category: "leisure"
  },
  {
    id: 406,
    detailId: 18,
    name: "설악 케이블카",
    address: "강원도 속초시 설악산로 1085",
    contact: "033-636-4300",
    image: "images/places/seorak_cable.jpg",
    category: "leisure"
  },
  {
    id: 407,
    detailId: 0,
    name: "제주 아쿠아플라넷",
    address: "제주특별자치도 서귀포시 성산읍 섭지코지로 95",
    contact: "064-780-0900",
    image: "images/places/aquaplanet.jpg",
    category: "leisure"
  },
  {
    id: 408,
    detailId: 0,
    name: "롯데월드 어드벤처",
    address: "서울특별시 송파구 올림픽로 240",
    contact: "02-411-2000",
    image: "images/places/lotteworld.jpg",
    category: "leisure"
  }
];

// 쇼핑 (한옥마을, 문화마을 등)
const shoppingData = [
  {
    id: 501,
    detailId: 3,
    name: "북촌한옥마을",
    address: "서울특별시 종로구 계동길 37",
    contact: "02-2148-4160",
    image: "images/places/bukchon.jpg",
    category: "shopping"
  },
  {
    id: 502,
    detailId: 16,
    name: "전주 한옥마을",
    address: "전라북도 전주시 완산구 기린대로 99",
    contact: "063-282-1330",
    image: "images/places/hanok_village.jpg",
    category: "shopping"
  },
  {
    id: 503,
    detailId: 6,
    name: "감천문화마을",
    address: "부산광역시 사하구 감내2로 203",
    contact: "051-291-1444",
    image: "images/places/gamcheon.jpg",
    category: "shopping"
  },
  {
    id: 504,
    detailId: 31,
    name: "아바이마을",
    address: "강원도 속초시 청호동 1017",
    contact: "033-639-2690",
    image: "images/places/abai.jpg",
    category: "shopping"
  },
  {
    id: 505,
    detailId: 0,
    name: "명동 쇼핑거리",
    address: "서울특별시 중구 명동길 일대",
    contact: "02-3210-0101",
    image: "images/places/myeongdong.jpg",
    category: "shopping"
  },
  {
    id: 506,
    detailId: 0,
    name: "해운대 시장",
    address: "부산광역시 해운대구 구남로41번길 22",
    contact: "051-746-3001",
    image: "images/places/haeundae_market.jpg",
    category: "shopping"
  },
  {
    id: 507,
    detailId: 0,
    name: "서면 지하상가",
    address: "부산광역시 부산진구 서면로 지하 68",
    contact: "051-803-3001",
    image: "images/places/seomyeon.jpg",
    category: "shopping"
  },
  {
    id: 508,
    detailId: 0,
    name: "제주 올레시장",
    address: "제주특별자치도 제주시 관덕로14길 12",
    contact: "064-752-3001",
    image: "images/places/olle_market.jpg",
    category: "shopping"
  }
];

// 전체 데이터 통합
const allData = {
  accommodation: accommodationData,
  culture: cultureData,
  restaurant: restaurantData,
  nature: natureData,
  leisure: leisureData,
  shopping: shoppingData
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

// ===== DOM 요소 =====
const spotList = document.getElementById("spotList");
const noResults = document.getElementById("noResults");
const categoryTabs = document.querySelectorAll(".category-tab");
const pagination = document.getElementById("pagination");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

// ===== 상태 관리 =====
let currentCategory = "accommodation";
let currentPage = 1;
const itemsPerPage = 8;

// ===== 카드 렌더링 =====
function renderSpots() {
  const data = allData[currentCategory] || [];
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // 페이지 범위 조정
  if (currentPage > totalPages) currentPage = totalPages || 1;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  // 결과가 없을 때
  if (pageData.length === 0) {
    spotList.style.display = "none";
    noResults.style.display = "block";
    pagination.style.display = "none";
    return;
  }

  spotList.style.display = "grid";
  noResults.style.display = "none";
  pagination.style.display = "flex";
  spotList.innerHTML = "";

  pageData.forEach((spot, index) => {
    const card = document.createElement("div");
    card.className = "spot-card";
    card.style.animationDelay = `${index * 0.1}s`;
    card.dataset.spotId = spot.id;
    card.dataset.category = spot.category;
    card.dataset.detailId = spot.detailId || spot.id;

    card.innerHTML = `
      <div class="spot-card-image">
        <img src="${spot.image}" alt="${spot.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22200%22 height=%22200%22 rx=%2220%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22%3E관광지%3C/text%3E%3Ctext x=%2250%25%22 y=%2265%25%22 text-anchor=%22middle%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22%3E이미지%3C/text%3E%3C/svg%3E'">
      </div>
      <div class="spot-card-info">
        <div class="spot-name">${spot.name}</div>
        <div class="spot-address">${spot.address}</div>
        <div class="spot-contact">${spot.contact}</div>
      </div>
      <button class="add-schedule-btn" data-spot-id="${spot.id}" data-category="${spot.category}">
        <span class="add-icon">+</span>
        <span class="add-text">일정에 추가</span>
      </button>
    `;

    spotList.appendChild(card);
  });

  // 페이지네이션 업데이트
  updatePagination(totalPages);
}

// ===== 페이지네이션 업데이트 =====
function updatePagination(totalPages) {
  pageInfo.textContent = `${currentPage} / ${totalPages} 페이지`;
  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= totalPages;
}

// ===== 탭 클릭 이벤트 =====
categoryTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // 활성 탭 변경
    categoryTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // 카테고리 변경 및 페이지 초기화
    currentCategory = tab.dataset.category;
    currentPage = 1;
    renderSpots();
  });
});

// ===== 페이지네이션 이벤트 =====
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderSpots();
    window.scrollTo({ top: 300, behavior: "smooth" });
  }
});

nextBtn.addEventListener("click", () => {
  const data = allData[currentCategory] || [];
  const totalPages = Math.ceil(data.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderSpots();
    window.scrollTo({ top: 300, behavior: "smooth" });
  }
});


// ===== 카드 클릭 이벤트 (상세 페이지 이동) =====
spotList.addEventListener("click", (e) => {
  // 일정 추가 버튼 클릭 시
  const addBtn = e.target.closest(".add-schedule-btn");
  if (addBtn) {
    e.stopPropagation();
    const spotId = parseInt(addBtn.dataset.spotId);
    const category = addBtn.dataset.category;
    const data = allData[category] || [];
    const selectedSpot = data.find(s => s.id === spotId);

    if (selectedSpot) {
      // 카테고리별 데이터 구조 설정
      let placeData;
      if (category === "accommodation") {
        // 호텔/숙박 데이터
        placeData = {
          type: "hotel",
          hotelId: selectedSpot.id,
          image: selectedSpot.image,
          location: selectedSpot.address,
          contact: selectedSpot.contact
        };
      } else {
        // 기타 관광지 데이터
        placeData = {
          type: category,
          originalId: selectedSpot.id,
          image: selectedSpot.image,
          location: selectedSpot.address,
          contact: selectedSpot.contact
        };
      }

      // 캘린더 모달 열기
      calendarModal.open(selectedSpot.name, placeData, (scheduleData) => {
        console.log("일정이 추가되었습니다:", scheduleData);
      });
    }
    return;
  }

  // 카드 클릭 시 상세 페이지로 이동
  const card = e.target.closest(".spot-card");
  if (card) {
    const category = card.dataset.category;
    const detailId = card.dataset.detailId;

    // 숙박(accommodation)은 hotel-detail.html로, 나머지는 place-detail.html로 이동
    if (category === "accommodation") {
      window.location.href = `hotel-detail.html?id=${detailId}`;
    } else if (detailId && detailId !== "0") {
      window.location.href = `../place/place-detail.html?id=${detailId}`;
    } else {
      alert("상세 페이지가 준비 중입니다.");
    }
  }
});

// ===== URL 파라미터 처리 =====
const params = new URLSearchParams(window.location.search);
const categoryParam = params.get("category");
if (categoryParam && allData[categoryParam]) {
  currentCategory = categoryParam;
  categoryTabs.forEach(tab => {
    tab.classList.remove("active");
    if (tab.dataset.category === categoryParam) {
      tab.classList.add("active");
    }
  });
}

// ===== 초기 렌더링 =====
setTimeout(() => {
  renderSpots();
}, 300);


// 나중에 실제 로직으로 교체 -> 로그인 상태 여부 브라우저 DB에 저장하고 가져오는 방식으로
// 나중에 실제 로직으로 교체 -> 로그인 상태 여부 브라우저 DB에 저장하고 가져오는 방식으로
// const isLoggedIn = true; // true면 로그인 상태

// const loginBtn = document.querySelector('.login-btn');
// const logoutBtn = document.querySelector('.logout-btn');

/* 로그인 상태에 따른 버튼 노출 제어 */
// if (loginBtn && logoutBtn) {
//   if (isLoggedIn) {
//     loginBtn.style.display = 'none';
//     logoutBtn.style.display = 'block';
//   } else {
//     loginBtn.style.display = 'block';
//     logoutBtn.style.display = 'none';
//   }
// }


/* 로그인 버튼 이벤트 (로그인 페이지) */
// if (loginBtn) {
//   loginBtn.addEventListener('click', () => {
//     window.location.href = './html/auth.html';
//   });
// }

/* 로그아웃 버튼 이벤트  (로그아웃 처리 후 메인) */
// if (logoutBtn) {
//   logoutBtn.addEventListener('click', () => {
//     // 브라우저 내장 DB에서 로그인 상태 여부 수정 로직
//     window.location.href = './html/index.html';
//   });
// }