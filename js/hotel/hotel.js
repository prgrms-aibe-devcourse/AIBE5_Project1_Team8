// ===== 카테고리별 데이터 =====
// 모든 데이터는 Firebase에서 가져옴

// 카테고리별 데이터 변수
let accommodationData = [];  // 숙박 (호텔)
let cultureData = [];         // 문화 (궁궐, 사찰, 유적지 등)
let restaurantData = [];      // 식당 (맛집, 시장 등)
let natureData = [];          // 자연 (산, 바다, 공원 등)
let leisureData = [];         // 레저 (테마파크, 액티비티 등)
let shoppingData = [];        // 쇼핑 (시장, 쇼핑몰 등)

// ===== Firebase에서 데이터 가져오기 =====
async function loadDataFromFirebase() {
  try {
    const { db } = await import('../common/firebase-Config.js');
    const { collection, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    // 배열 초기화
    accommodationData = [];
    cultureData = [];
    restaurantData = [];
    natureData = [];
    leisureData = [];
    shoppingData = [];
    
    // 1. accommodations 컬렉션에서 숙박 데이터 가져오기
    try {
      const accommodationsCollection = collection(db, 'accommodations');
      const accommodationsSnapshot = await getDocs(accommodationsCollection);
      
      accommodationsSnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        
        // 데이터 형식 변환
        const formattedData = formatFirebaseData(data, 'accommodation');
        accommodationData.push(formattedData);
      });
      
      console.log(`Accommodations 로드 완료: ${accommodationData.length}개`);
    } catch (error) {
      console.warn('accommodations 컬렉션 로드 실패:', error);
    }
    
    // 2. tour_items 컬렉션에서 관광지 데이터 가져오기
    try {
      const tourItemsCollection = collection(db, 'tour_items');
      const tourItemsSnapshot = await getDocs(tourItemsCollection);
      
      tourItemsSnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        
        // category에 따라 분류
        const category = data.category || inferCategoryFromData(data);
        const formattedData = formatFirebaseData(data, category);
        
        switch (category) {
          case 'culture':
            cultureData.push(formattedData);
            break;
          case 'restaurant':
            restaurantData.push(formattedData);
            break;
          case 'nature':
            natureData.push(formattedData);
            break;
          case 'leisure':
            leisureData.push(formattedData);
            break;
          case 'shopping':
            shoppingData.push(formattedData);
            break;
          default:
            // category가 없으면 culture로 기본 설정
            cultureData.push(formattedData);
        }
      });
      
      console.log(`Tour items 로드 완료:`, {
        culture: cultureData.length,
        restaurant: restaurantData.length,
        nature: natureData.length,
        leisure: leisureData.length,
        shopping: shoppingData.length
      });
    } catch (error) {
      console.warn('tour_items 컬렉션 로드 실패:', error);
    }
    
    // allDataOriginal과 allData 업데이트
    updateDataStructures();
    
  } catch (error) {
    console.error('Firebase 데이터 로드 실패:', error);
  }
}

// ===== Firebase 데이터를 앱 형식으로 변환 =====
function formatFirebaseData(firebaseData, category) {
  return {
    id: firebaseData.id || firebaseData.contentid || '',
    detailId: firebaseData.detailId || firebaseData.contentid || firebaseData.id || 0,
    name: firebaseData.name || firebaseData.title || '',
    address: firebaseData.address || firebaseData.addr1 || '',
    contact: firebaseData.contact || firebaseData.tel || '',
    image: firebaseData.image || firebaseData.firstimage || firebaseData.firstimage2 || '',
    category: category || firebaseData.category || 'culture',
    // 추가 필드
    mapx: firebaseData.mapx || '',
    mapy: firebaseData.mapy || '',
    overview: firebaseData.overview || '',
    homepage: firebaseData.homepage || ''
  };
}

// ===== 데이터에서 카테고리 추론 =====
function inferCategoryFromData(data) {
  const title = (data.title || data.name || '').toLowerCase();
  
  if (title.includes('호텔') || title.includes('리조트') || title.includes('펜션') || 
      title.includes('모텔') || title.includes('게스트하우스')) {
    return 'accommodation';
  }
  if (title.includes('궁') || title.includes('사찰') || title.includes('유적') || 
      title.includes('박물관') || title.includes('미술관')) {
    return 'culture';
  }
  if (title.includes('맛집') || title.includes('식당') || title.includes('카페') || 
      title.includes('시장') || title.includes('거리')) {
    return 'restaurant';
  }
  if (title.includes('산') || title.includes('해수욕장') || title.includes('공원') || 
      title.includes('해변') || title.includes('섬')) {
    return 'nature';
  }
  if (title.includes('테마파크') || title.includes('워터파크') || title.includes('스키장') || 
      title.includes('골프장') || title.includes('케이블카')) {
    return 'leisure';
  }
  if (title.includes('쇼핑') || title.includes('아울렛') || title.includes('마트') || 
      title.includes('한옥마을') || title.includes('문화마을')) {
    return 'shopping';
  }
  
  return 'culture'; // 기본값
}

// ===== 데이터 구조 업데이트 =====
function updateDataStructures() {
  allDataOriginal = {
    accommodation: accommodationData,
    culture: cultureData,
    restaurant: restaurantData,
    nature: natureData,
    leisure: leisureData,
    shopping: shoppingData
  };
  
  allData = {
    전체: [...accommodationData, ...cultureData, ...restaurantData, ...natureData, ...leisureData, ...shoppingData],
    지역: [...natureData, ...cultureData],
    즐길거리: [...leisureData, ...restaurantData, ...shoppingData],
    숙소: [...accommodationData]
  };
}

// 하드코딩된 데이터는 모두 제거됨 - Firebase에서 가져옴

// 전체 데이터 통합 (기존)
let allDataOriginal = {
  accommodation: accommodationData,
  culture: cultureData,
  restaurant: restaurantData,
  nature: natureData,
  leisure: leisureData,
  shopping: shoppingData
};

// 검색 탭 카테고리별 데이터 통합
let allData = {
  전체: [...accommodationData, ...cultureData, ...restaurantData, ...natureData, ...leisureData, ...shoppingData],
  지역: [...natureData, ...cultureData],
  즐길거리: [...leisureData, ...restaurantData, ...shoppingData],
  숙소: [...accommodationData]
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
const searchTabs = document.querySelectorAll(".search-container .tab");
const pagination = document.getElementById("pagination");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

// ===== 상태 관리 =====
let currentCategory = "전체";
let currentPage = 1;
let currentKeyword = "";
const itemsPerPage = 8;

// ===== 카드 렌더링 =====
function renderSpots() {
  let data = allData[currentCategory] || [];
  
  // 검색어로 필터링
  if (currentKeyword) {
    const keyword = currentKeyword.toLowerCase();
    data = data.filter(spot => 
      spot.name.toLowerCase().includes(keyword) ||
      spot.address.toLowerCase().includes(keyword)
    );
  }
  
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

// ===== 검색 탭 클릭 이벤트 =====
searchTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // 활성 탭 변경
    searchTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // 카테고리 변경 및 페이지, 검색어 초기화
    currentCategory = tab.innerText;
    currentPage = 1;
    currentKeyword = "";
    
    // 검색창 초기화
    const keywordInput = document.getElementById("keyword");
    if (keywordInput) keywordInput.value = "";
    
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
    e.preventDefault();
    
    const spotId = addBtn.dataset.spotId; // 문자열로 유지 (Firebase ID일 수 있음)
    const category = addBtn.dataset.category;
    
    // 현재 카테고리의 모든 데이터에서 찾기
    let selectedSpot = null;
    
    // allDataOriginal에서 찾기
    if (allDataOriginal[category]) {
      selectedSpot = allDataOriginal[category].find(s => 
        String(s.id) === String(spotId) || s.id === spotId
      );
    }
    
    // 찾지 못했으면 allData에서 찾기
    if (!selectedSpot) {
      const allCategoryData = allData[currentCategory] || [];
      selectedSpot = allCategoryData.find(s => 
        String(s.id) === String(spotId) || s.id === spotId
      );
    }

    if (selectedSpot) {
      // 카테고리별 데이터 구조 설정
      let placeData;
      if (category === "accommodation") {
        // 호텔/숙박 데이터
        placeData = {
          type: "hotel",
          hotelId: selectedSpot.id,
          image: selectedSpot.image || '',
          location: selectedSpot.address || '',
          contact: selectedSpot.contact || ''
        };
      } else {
        // 기타 관광지 데이터
        placeData = {
          type: category || 'place',
          originalId: selectedSpot.id,
          image: selectedSpot.image || '',
          location: selectedSpot.address || '',
          contact: selectedSpot.contact || ''
        };
      }

      // 캘린더 모달 열기
      if (typeof calendarModal !== 'undefined') {
        calendarModal.open(selectedSpot.name, placeData, (scheduleData) => {
          console.log("일정이 추가되었습니다:", scheduleData);
        });
      } else {
        console.error('calendarModal이 정의되지 않았습니다.');
        alert('캘린더 모달을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      }
    } else {
      console.warn('선택된 장소를 찾을 수 없습니다:', { spotId, category });
      alert('장소 정보를 찾을 수 없습니다.');
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
const categoryParam = params.get("type");
if (categoryParam && allData[categoryParam]) {
  currentCategory = categoryParam;
  searchTabs.forEach(tab => {
    tab.classList.remove("active");
    if (tab.innerText === categoryParam) {
      tab.classList.add("active");
    }
  });
}

// ===== 검색 이벤트 처리 (searchbar.js에서 발생) =====
document.addEventListener('hotelSearch', (e) => {
  const { keyword, type } = e.detail;
  
  // 카테고리 변경
  if (type && allData[type]) {
    currentCategory = type;
    searchTabs.forEach(tab => {
      tab.classList.remove("active");
      if (tab.innerText === type) {
        tab.classList.add("active");
      }
    });
  }
  
  // 검색어 설정 및 렌더링
  currentKeyword = keyword;
  currentPage = 1;
  renderSpots();
});

// ===== 초기 렌더링 =====
(async () => {
  // Firebase에서 모든 데이터 로드 (tour_items와 accommodations)
  await loadDataFromFirebase();
  
  // 초기 렌더링
  setTimeout(() => {
    renderSpots();
  }, 300);
})();