// ===== Accommodation Page Logic =====
// 호텔 데이터는 hotel-data.js에서 전역 변수로 제공됩니다.

// ===== DOM 요소 =====
const hotelList = document.getElementById("hotelList");
const noResults = document.getElementById("noResults");
const regionTabs = document.querySelectorAll(".category-tab");
const pagination = document.getElementById("pagination");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

// ===== 상태 관리 =====
let currentRegion = "seoul";
let currentPage = 1;
const itemsPerPage = 6;

// ===== 별점 렌더링 =====
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHtml = '';

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fas fa-star"></i>';
  }
  if (hasHalfStar) {
    starsHtml += '<i class="fas fa-star-half-alt"></i>';
  }
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="far fa-star"></i>';
  }

  return starsHtml;
}

// ===== 편의시설 렌더링 =====
function renderAmenities(amenities) {
  return amenities.slice(0, 3).map(item => `<span class="amenity-tag">${item}</span>`).join('');
}

// ===== 카드 렌더링 =====
function renderHotels() {
  // hotel-data.js에서 전역 변수로 제공되는 데이터 사용
  const data = window.allHotelData?.[currentRegion] || [];
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // 페이지 범위 조정
  if (currentPage > totalPages) currentPage = totalPages || 1;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  // 결과가 없을 때
  if (pageData.length === 0) {
    hotelList.style.display = "none";
    noResults.style.display = "block";
    pagination.style.display = "none";
    return;
  }

  hotelList.style.display = "grid";
  noResults.style.display = "none";
  pagination.style.display = "flex";
  hotelList.innerHTML = "";

  pageData.forEach((hotel, index) => {
    const card = document.createElement("div");
    card.className = "hotel-card";
    card.style.animationDelay = `${index * 0.1}s`;
    card.dataset.hotelId = hotel.id;
    card.dataset.region = hotel.region;

    card.innerHTML = `
      <div class="hotel-card-image">
        <img src="../../${hotel.image}" alt="${hotel.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22200%22 height=%22200%22 rx=%2220%22/%3E%3Ctext x=%2250%25%22 y=%2245%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22%3E숙소%3C/text%3E%3Ctext x=%2250%25%22 y=%2260%25%22 text-anchor=%22middle%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22%3E이미지%3C/text%3E%3C/svg%3E'">
        <div class="hotel-badge">${window.regionNames?.[hotel.region] || hotel.region}</div>
      </div>
      <div class="hotel-card-info">
        <div class="hotel-name">${hotel.name}</div>
        <div class="hotel-rating">
          <span class="stars">${renderStars(hotel.rating)}</span>
          <span class="rating-value">${hotel.rating}</span>
        </div>
        <div class="hotel-address"><i class="fas fa-map-marker-alt"></i> ${hotel.address}</div>
        <div class="hotel-amenities">${renderAmenities(hotel.amenities)}</div>
        <div class="hotel-price">${hotel.price}</div>
      </div>
      <button class="book-btn" data-hotel-id="${hotel.id}" data-region="${hotel.region}">
        <span class="book-text">예약하기</span>
      </button>
    `;

    hotelList.appendChild(card);
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
regionTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // 활성 탭 변경
    regionTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // 지역 변경 및 페이지 초기화
    currentRegion = tab.dataset.region;
    currentPage = 1;
    renderHotels();
  });
});

// ===== 페이지네이션 이벤트 =====
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderHotels();
    window.scrollTo({ top: 300, behavior: "smooth" });
  }
});

nextBtn.addEventListener("click", () => {
  const data = window.allHotelData?.[currentRegion] || [];
  const totalPages = Math.ceil(data.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderHotels();
    window.scrollTo({ top: 300, behavior: "smooth" });
  }
});

// ===== 카드 클릭 이벤트 =====
hotelList.addEventListener("click", (e) => {
  // 예약 버튼 클릭 시
  const bookBtn = e.target.closest(".book-btn");
  if (bookBtn) {
    e.stopPropagation();
    const hotelId = parseInt(bookBtn.dataset.hotelId);
    const region = bookBtn.dataset.region;
    const data = window.allHotelData?.[region] || [];
    const selectedHotel = data.find(h => h.id === hotelId);

    if (selectedHotel) {
      // 호텔 상세 페이지로 이동 (예약 기능은 상세 페이지에서)
      window.location.href = `../hotel/hotel-detail.html?id=${hotelId}&region=${region}`;
    }
    return;
  }

  // 카드 클릭 시 상세 페이지로 이동
  const card = e.target.closest(".hotel-card");
  if (card) {
    const hotelId = card.dataset.hotelId;
    const region = card.dataset.region;
    window.location.href = `../hotel/hotel-detail.html?id=${hotelId}&region=${region}`;
  }
});

// ===== URL 파라미터 처리 =====
const params = new URLSearchParams(window.location.search);
const regionParam = params.get("region");
if (regionParam && window.allHotelData?.[regionParam]) {
  currentRegion = regionParam;
  regionTabs.forEach(tab => {
    tab.classList.remove("active");
    if (tab.dataset.region === regionParam) {
      tab.classList.add("active");
    }
  });
}

// ===== 초기 렌더링 =====
document.addEventListener("DOMContentLoaded", function() {
  // hotel-data.js가 로드되었는지 확인
  if (window.allHotelData) {
    renderHotels();
  } else {
    // hotel-data.js 로드 대기
    setTimeout(() => {
      renderHotels();
    }, 100);
  }
});

// 페이지 로드 시 바로 실행 (DOMContentLoaded 이벤트가 이미 발생한 경우)
if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(() => {
    renderHotels();
  }, 100);
}
