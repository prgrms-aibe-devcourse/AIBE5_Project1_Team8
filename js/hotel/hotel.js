// ===== 카테고리별 데이터 =====
// 모든 데이터는 Firebase에서 가져옴

// 카테고리별 데이터 변수
let accommodationData = [];  // 숙박 (호텔)
let cultureData = [];         // 문화 (궁궐, 사찰, 유적지 등)
let restaurantData = [];      // 식당 (맛집, 시장 등)
let natureData = [];          // 자연 (산, 바다, 공원 등)
let leisureData = [];         // 레저 (테마파크, 액티비티 등)
let shoppingData = [];        // 쇼핑 (시장, 쇼핑몰 등)

// ===== 페이지네이션 상태 관리 =====
const BATCH_SIZE = 64; // 한번에 가져올 문서 수
let lastAccommodationDoc = null;
let lastTourItemDoc = null;
let hasMoreAccommodations = true;
let hasMoreTourItems = true;

// ===== Firebase에서 데이터 가져오기 (64개씩) =====
async function loadDataFromFirebase() {
  try {
    console.log('Firebase 데이터 로드 시작...');
    const { db } = await import('../common/firebase-config.js');
    console.log('Firebase DB 연결 성공:', db ? 'OK' : 'FAILED');
    
    const { collection, query, getDocs, limit, startAfter, orderBy } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    // 배열 초기화 (초기 로드 시에만)
    if (lastAccommodationDoc === null) {
      accommodationData = [];
      cultureData = [];
      restaurantData = [];
      natureData = [];
      leisureData = [];
      shoppingData = [];
      hasMoreAccommodations = true;
      hasMoreTourItems = true;
      console.log('데이터 배열 초기화 완료');
    }
    
    // 1. accommodations 컬렉션에서 숙박 데이터 가져오기 (64개씩)
    if (hasMoreAccommodations) {
      try {
        let accommodationsQuery;
        
        // orderBy 없이 단순 limit 쿼리 사용 (인덱스 문제 방지)
        if (lastAccommodationDoc) {
          // 페이지네이션: 마지막 문서 이후부터
          accommodationsQuery = query(
            collection(db, 'accommodations'),
            orderBy('__name__'),
            startAfter(lastAccommodationDoc),
            limit(BATCH_SIZE)
          );
        } else {
          // 첫 로드: orderBy 없이 limit만 사용 (더 안정적)
          accommodationsQuery = query(
            collection(db, 'accommodations'),
            limit(BATCH_SIZE)
          );
        }
        
        console.log('accommodations 쿼리 실행 중...');
        const accommodationsSnapshot = await getDocs(accommodationsQuery);
        console.log(`accommodations 스냅샷: ${accommodationsSnapshot.size}개 문서`);
        
        if (accommodationsSnapshot.empty) {
          console.log('accommodations 컬렉션이 비어있습니다.');
          hasMoreAccommodations = false;
        } else {
          accommodationsSnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              ...doc.data()
            };
            
            // 데이터 형식 변환
            const formattedData = formatFirebaseData(data, 'accommodation');
            accommodationData.push(formattedData);
            lastAccommodationDoc = doc;
          });
          
          // 64개 미만이면 더 이상 없음
          if (accommodationsSnapshot.size < BATCH_SIZE) {
            hasMoreAccommodations = false;
          }
          
          console.log(`✅ Accommodations 로드 완료: 총 ${accommodationData.length}개 (이번 배치: ${accommodationsSnapshot.size}개)`);
        }
      } catch (error) {
        console.error('❌ accommodations 컬렉션 로드 실패:', error);
        console.error('에러 상세:', error.message, error.code);
        hasMoreAccommodations = false;
        
        // orderBy 에러인 경우, orderBy 없이 재시도
        if (error.code === 'failed-precondition' || error.message.includes('index')) {
          console.log('orderBy 에러 감지, orderBy 없이 재시도...');
          try {
            const accommodationsQuery = query(
              collection(db, 'accommodations'),
              limit(BATCH_SIZE)
            );
            const accommodationsSnapshot = await getDocs(accommodationsQuery);
            
            if (!accommodationsSnapshot.empty) {
              accommodationsSnapshot.forEach((doc) => {
                const data = {
                  id: doc.id,
                  ...doc.data()
                };
                const formattedData = formatFirebaseData(data, 'accommodation');
                accommodationData.push(formattedData);
                lastAccommodationDoc = doc;
              });
              console.log(`✅ Accommodations 재시도 성공: ${accommodationData.length}개`);
              if (accommodationsSnapshot.size < BATCH_SIZE) {
                hasMoreAccommodations = false;
              }
            }
          } catch (retryError) {
            console.error('재시도도 실패:', retryError);
          }
        }
      }
    }
    
    // 2. tour_items 컬렉션에서 관광지 데이터 가져오기 (64개씩)
    if (hasMoreTourItems) {
      try {
        let tourItemsQuery;
        
        if (lastTourItemDoc) {
          tourItemsQuery = query(
            collection(db, 'tour_items'),
            orderBy('__name__'),
            startAfter(lastTourItemDoc),
            limit(BATCH_SIZE)
          );
        } else {
          // 첫 로드: orderBy 없이 limit만 사용
          tourItemsQuery = query(
            collection(db, 'tour_items'),
            limit(BATCH_SIZE)
          );
        }
        
        console.log('tour_items 쿼리 실행 중...');
        const tourItemsSnapshot = await getDocs(tourItemsQuery);
        console.log(`tour_items 스냅샷: ${tourItemsSnapshot.size}개 문서`);
        
        if (tourItemsSnapshot.empty) {
          console.log('tour_items 컬렉션이 비어있습니다.');
          hasMoreTourItems = false;
        } else {
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
            
            lastTourItemDoc = doc;
          });
          
          // 64개 미만이면 더 이상 없음
          if (tourItemsSnapshot.size < BATCH_SIZE) {
            hasMoreTourItems = false;
          }
          
          console.log(`✅ Tour items 로드 완료:`, {
            culture: cultureData.length,
            restaurant: restaurantData.length,
            nature: natureData.length,
            leisure: leisureData.length,
            shopping: shoppingData.length,
            batch: tourItemsSnapshot.size
          });
        }
      } catch (error) {
        console.error('❌ tour_items 컬렉션 로드 실패:', error);
        console.error('에러 상세:', error.message, error.code);
        hasMoreTourItems = false;
        
        // orderBy 에러인 경우, orderBy 없이 재시도
        if (error.code === 'failed-precondition' || error.message.includes('index')) {
          console.log('orderBy 에러 감지, orderBy 없이 재시도...');
          try {
            const tourItemsQuery = query(
              collection(db, 'tour_items'),
              limit(BATCH_SIZE)
            );
            const tourItemsSnapshot = await getDocs(tourItemsQuery);
            
            if (!tourItemsSnapshot.empty) {
              tourItemsSnapshot.forEach((doc) => {
                const data = {
                  id: doc.id,
                  ...doc.data()
                };
                const category = data.category || inferCategoryFromData(data);
                const formattedData = formatFirebaseData(data, category);
                
                switch (category) {
                  case 'culture': cultureData.push(formattedData); break;
                  case 'restaurant': restaurantData.push(formattedData); break;
                  case 'nature': natureData.push(formattedData); break;
                  case 'leisure': leisureData.push(formattedData); break;
                  case 'shopping': shoppingData.push(formattedData); break;
                  default: cultureData.push(formattedData);
                }
                lastTourItemDoc = doc;
              });
              console.log(`✅ Tour items 재시도 성공`);
              if (tourItemsSnapshot.size < BATCH_SIZE) {
                hasMoreTourItems = false;
              }
            }
          } catch (retryError) {
            console.error('재시도도 실패:', retryError);
          }
        }
      }
    }
    
    // allDataOriginal과 allData 업데이트
    updateDataStructures();
    console.log('✅ 데이터 구조 업데이트 완료');
    
  } catch (error) {
    console.error('❌ Firebase 데이터 로드 실패:', error);
    console.error('에러 상세:', error.message, error.stack);
    
    // 사용자에게 알림
    const noResults = document.getElementById('noResults');
    if (noResults) {
      noResults.style.display = 'block';
      noResults.innerHTML = `
        <div class="no-results-icon">⚠️</div>
        <h3>데이터를 불러올 수 없습니다</h3>
        <p>Firebase 연결을 확인해주세요. 콘솔을 확인하세요.</p>
      `;
    }
  }
}

// ===== 추가 데이터 로드 함수 =====
async function loadMoreData() {
  if (!hasMoreAccommodations && !hasMoreTourItems) {
    console.log('더 이상 로드할 데이터가 없습니다.');
    return false;
  }

  const beforeAccommodationCount = accommodationData.length;
  const beforeTourCount = cultureData.length + restaurantData.length + natureData.length + leisureData.length + shoppingData.length;

  // 추가 데이터 로드
  await loadDataFromFirebase();

  const afterAccommodationCount = accommodationData.length;
  const afterTourCount = cultureData.length + restaurantData.length + natureData.length + leisureData.length + shoppingData.length;

  const loadedAccommodations = afterAccommodationCount - beforeAccommodationCount;
  const loadedTours = afterTourCount - beforeTourCount;

  if (loadedAccommodations > 0 || loadedTours > 0) {
    console.log(`추가 데이터 로드 완료: Accommodations ${loadedAccommodations}개, Tour items ${loadedTours}개`);
    
    // 데이터 구조 업데이트 및 화면 갱신
    updateDataStructures();
    renderSpots();
    
    return true;
  }

  return false;
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
const pageInput = document.getElementById("pageInput");
const pageTotal = document.getElementById("pageTotal");

// ===== 상태 관리 =====
let currentCategory = "전체";
let currentPage = 1;
let currentKeyword = "";
const itemsPerPage = 8;

// ===== 카드 렌더링 =====
function renderSpots() {
  let data = allData[currentCategory] || [];

  // 검색어가 없으면 필터링하지 않고 전체 표시, 있으면 이름/주소로 필터링
  if (currentKeyword) {
    const keyword = currentKeyword.toLowerCase();
    data = data.filter(spot =>
      (spot.name || '').toLowerCase().includes(keyword) ||
      (spot.address || '').toLowerCase().includes(keyword)
    );
  }

  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;

  // 페이지 범위 조정
  if (currentPage > totalPages) currentPage = totalPages || 1;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  // 검색어가 있는데 매칭 없음 → "검색 결과가 없습니다" / 검색어 없음 → 전체 표시(데이터 없을 때만 noResults)
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
    const isAccommodation = spot.category === "accommodation";

    card.innerHTML = `
      <div class="spot-card-image">
        <img src="${spot.image}" alt="${spot.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22200%22 height=%22200%22 rx=%2220%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22%3E관광지%3C/text%3E%3Ctext x=%2250%25%22 y=%2265%25%22 text-anchor=%22middle%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22%3E이미지%3C/text%3E%3C/svg%3E'">
      </div>
      <div class="spot-card-info">
        <div class="spot-name">${spot.name}</div>
        <div class="spot-address">${spot.address}</div>
        <div class="spot-contact">${spot.contact}</div>
      </div>
      ${isAccommodation ? `
      <button class="detail-view-btn" data-detail-id="${spot.detailId || spot.id}">
        <span class="detail-text">상세보기</span>
      </button>
      ` : `
      <button class="add-schedule-btn" data-spot-id="${spot.id}" data-category="${spot.category}">
        <span class="add-icon">+</span>
        <span class="add-text">일정에 추가</span>
      </button>
      `}
    `;

    spotList.appendChild(card);
  });

  // 페이지네이션 업데이트
  updatePagination(totalPages);
}

// ===== 페이지네이션 업데이트 =====
function updatePagination(totalPages) {
  if (pageInput) {
    pageInput.value = currentPage;
    pageInput.max = totalPages;
  }
  if (pageTotal) {
    pageTotal.textContent = `/ ${totalPages} 페이지`;
  }
  prevBtn.disabled = currentPage <= 1;
  
  // 다음 버튼: 마지막 페이지이거나 더 이상 로드할 데이터가 없으면 비활성화
  const hasMoreData = hasMoreAccommodations || hasMoreTourItems;
  nextBtn.disabled = currentPage >= totalPages && !hasMoreData;
  
  // 다음 페이지로 갈 데이터가 부족하면 로딩 표시
  if (nextBtn.disabled && hasMoreData) {
    // 이 경우는 없지만, 혹시 모르니
    nextBtn.textContent = '&gt;';
  }
}

// ===== 페이지 입력 이벤트 =====
if (pageInput) {
  pageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      goToPage();
    }
  });
  
  pageInput.addEventListener('blur', () => {
    goToPage();
  });
}

// ===== 특정 페이지로 이동 =====
function goToPage() {
  if (!pageInput) return;
  
  const data = allData[currentCategory] || [];
  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
  
  let targetPage = parseInt(pageInput.value);
  
  // 유효성 검사
  if (isNaN(targetPage) || targetPage < 1) {
    targetPage = 1;
  } else if (targetPage > totalPages) {
    targetPage = totalPages;
  }
  
  // 페이지가 변경되었을 때만 이동
  if (targetPage !== currentPage) {
    currentPage = targetPage;
    renderSpots();
    window.scrollTo({ top: 300, behavior: "smooth" });
  } else {
    // 같은 페이지면 입력값만 업데이트
    pageInput.value = currentPage;
  }
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

nextBtn.addEventListener("click", async () => {
  const data = allData[currentCategory] || [];
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  // 현재 페이지가 마지막 페이지이고, 더 로드할 데이터가 있으면 자동으로 로드
  if (currentPage >= totalPages) {
    const hasMoreData = hasMoreAccommodations || hasMoreTourItems;
    if (hasMoreData) {
      // 로딩 표시
      nextBtn.disabled = true;
      const originalText = nextBtn.textContent;
      nextBtn.textContent = '로딩 중...';
      
      // 추가 데이터 로드
      const loaded = await loadMoreData();
      
      if (loaded) {
        // 데이터 로드 후 다시 렌더링
        renderSpots();
        window.scrollTo({ top: 300, behavior: "smooth" });
      } else {
        // 더 이상 데이터가 없으면 버튼 비활성화
        nextBtn.disabled = true;
      }
      nextBtn.textContent = originalText;
      return;
    }
  }
  
  // 일반적인 다음 페이지 이동
  if (currentPage < totalPages) {
    currentPage++;
    renderSpots();
    window.scrollTo({ top: 300, behavior: "smooth" });
  }
});


// ===== 카드 클릭 이벤트 (상세 페이지 이동) =====
spotList.addEventListener("click", (e) => {
  // 숙소 상세보기 버튼 클릭 시
  const detailBtn = e.target.closest(".detail-view-btn");
  if (detailBtn) {
    e.stopPropagation();
    e.preventDefault();
    const card = e.target.closest(".spot-card");
    const detailId = detailBtn.dataset.detailId || (card ? card.dataset.detailId : null);
    if (detailId) {
      window.location.href = `hotel-detail.html?id=${detailId}`;
    }
    return;
  }

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