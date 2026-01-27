import { openBookingPanel } from "./hotel-booking.js";

// ===== Firebase에서 숙소 상세 조회 =====
async function fetchHotelFromFirebase(hotelId) {
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
    const ref = doc(db, "accommodations", hotelId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
  } catch (e) {
    console.warn("accommodations doc(id) 조회 실패:", e);
  }

  // 2) contentid로 조회 (list에서 detailId로 넘어오는 값이 contentid인 경우)
  try {
    const q = query(
      collection(db, "accommodations"),
      where("contentid", "==", hotelId),
      limit(1)
    );
    const qs = await getDocs(q);
    if (!qs.empty) {
      const d = qs.docs[0];
      return { id: d.id, ...d.data() };
    }
  } catch (e) {
    console.warn("accommodations where(contentid) 조회 실패:", e);
  }

  return null;
}

function mapAccommodationDocToHotel(docData, hotelId) {
  const name = docData?.name || docData?.title || "숙소명";
  const address = docData?.address || docData?.addr1 || "";
  const contact = docData?.contact || docData?.tel || "";
  const image =
    docData?.image ||
    docData?.firstimage ||
    docData?.firstimage2 ||
    "";

  // 가격 필드가 다양할 수 있어서 여러 후보를 시도
  const basePriceRaw =
    docData?.basePrice ?? docData?.price ?? docData?.roomPrice ?? docData?.minPrice;
  const basePrice =
    typeof basePriceRaw === "number"
      ? basePriceRaw
      : parseInt(String(basePriceRaw ?? "").replace(/[^\d]/g, ""), 10) || 0;

  const priceText =
    docData?.priceText ||
    (basePrice ? `${basePrice.toLocaleString()}원~` : "가격 정보 없음");

  const desc =
    docData?.desc ||
    docData?.overview ||
    docData?.description ||
    "숙소 상세 설명이 준비 중입니다.";

  return {
    id: docData?.id || docData?.contentid || hotelId,
    name,
    address,
    contact,
    image,
    price: priceText,
    basePrice,
    desc,
    // 픽토그램은 DB에 없을 수 있으니 안전 기본값
    parking: Boolean(docData?.parking ?? false),
    pet: Boolean(docData?.pet ?? false),
    wifi: Boolean(docData?.wifi ?? false),
    noSmoking: Boolean(docData?.noSmoking ?? false),
    breakfast: Boolean(docData?.breakfast ?? false),
  };
}

// 리뷰 데이터(현재는 기존 구조 유지)
const reviews = {};

// URL에서 호텔 ID 가져오기
const params = new URLSearchParams(window.location.search);
const hotelId = params.get("id") || "";
let hotel = null;
let hotelReviews = reviews[hotelId] || [];

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
    if (!hotel) return;
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
  if (!hotel) return;
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
let totalPages = Math.ceil(hotelReviews.length / REVIEWS_PER_PAGE);

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

// ===== 초기화 (DB에서 숙소 불러온 후 렌더) =====
(async () => {
  try {
    if (!hotelId) {
      alert("숙소 ID가 없습니다.");
      location.href = "hotel.html";
      return;
    }

    const docData = await fetchHotelFromFirebase(hotelId);
    if (!docData) {
      alert("존재하지 않는 숙소입니다.");
      location.href = "hotel.html";
      return;
    }

    hotel = mapAccommodationDocToHotel(docData, hotelId);
    // 리뷰는 기존(하드코딩) 구조 유지. 필요하면 여기서 reviews 컬렉션으로 교체 가능.
    hotelReviews = reviews[hotelId] || [];
    totalPages = Math.ceil(hotelReviews.length / REVIEWS_PER_PAGE) || 1;

    renderHotelInfo();
    updatePictograms();
    renderReviews();
  } catch (e) {
    console.error("hotel-detail init failed:", e);
    alert("숙소 정보를 불러오지 못했습니다. 콘솔을 확인해주세요.");
  }
})();
