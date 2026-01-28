import { openBookingPanel } from "./hotel-booking.js";
import { checkAuth } from '../auth/auth-guard.js';

// ===== 전역 상태 관리 =====
let hotel = null;
let hotelReviews = [];
let currentPage = 1;
const REVIEWS_PER_PAGE = 3;
let totalPages = 1;

// URL에서 호텔 ID 가져오기
const params = new URLSearchParams(window.location.search);
const hotelId = params.get("id") || "";

// DOM 요소 캐싱
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
const modalHotelName = document.getElementById("modalHotelName");

const reviewList = document.getElementById("reviewList");
const reviewCount = document.getElementById("reviewCount");
const pagination = document.getElementById("pagination");

// ===== [1] 유틸리티 및 데이터 매핑 함수 =====

// 별점 렌더링 (근찬님 커스텀 컬러 버전)
function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating 
      ? '<span class="star" style="color: #ffb400;">&#9733;</span>' 
      : '<span class="star empty" style="color: #ccc;">&#9733;</span>';
  }
  return stars;
}

// 팀원의 지도 좌표 매핑 + 기존 매핑 로직 통합
function mapAccommodationDocToHotel(docData, hotelId) {
  const name = docData?.name || docData?.title || "숙소명";
  const address = docData?.address || docData?.addr1 || "";
  const contact = docData?.contact || docData?.tel || "";
  const image = docData?.image || docData?.firstimage || docData?.firstimage2 || "";

  // [팀원 추가] 좌표(Leaflet): KTO 기준 mapx=경도, mapy=위도
  const latRaw = docData?.lat ?? docData?.latitude ?? docData?.mapy ?? docData?.gpsy ?? null;
  const lngRaw = docData?.lng ?? docData?.longitude ?? docData?.mapx ?? docData?.gpsx ?? null;
  const lat = latRaw != null ? Number(latRaw) : null;
  const lng = lngRaw != null ? Number(lngRaw) : null;

  // 가격 처리 (Knuth 상수 기반 랜덤 시드 포함)
  const basePriceRaw = docData?.basePrice ?? docData?.price ?? docData?.roomPrice ?? docData?.minPrice;
  const basePrice = typeof basePriceRaw === "number" ? basePriceRaw : parseInt(String(basePriceRaw ?? "").replace(/[^\d]/g, ""), 10) || 0;
  const idInMapAccToHotel = docData?.id || docData?.contentid || hotelId;
  const randomSeed = (idInMapAccToHotel * 2654435761) >>> 0; 
  let randomPrice = ((randomSeed % 18) + 8) * 10000;
  
  const priceText = docData?.priceText || (basePrice ? `${basePrice.toLocaleString()}원~` : `${randomPrice.toLocaleString()}원~`);
  const desc = docData?.desc || docData?.overview || docData?.description || "숙소 상세 설명이 준비 중입니다.";

  const toBool = (v) => {
    if (v == null) return false;
    if (typeof v === "boolean") return v;
    const s = String(v).trim().toLowerCase();
    return s === "true" || s === "1" || s === "y" || s === "yes";
  };

  return {
    id: idInMapAccToHotel,
    name, address, contact, image,
    lat: Number.isFinite(lat) ? lat : null,
    lng: Number.isFinite(lng) ? lng : null,
    price: priceText,
    basePrice: basePrice || randomPrice,
    desc,
    parking: toBool(docData?.parking),
    pet: toBool(docData?.pet),
    wifi: toBool(docData?.wifi),
    noSmoking: toBool(docData?.noSmoking),
    breakfast: toBool(docData?.breakfast),
  };
}

// ===== [2] 데이터 통신 함수 (Firebase) =====

async function fetchHotelFromFirebase(hotelId) {
  const { db } = await import("../common/firebase-config.js");
  const { collection, doc, getDoc, getDocs, limit, query, where } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

  try {
    const ref = doc(db, "accommodations", hotelId);
    const snap = await getDoc(ref);
    if (snap.exists()) return { id: snap.id, ...snap.data() };
  } catch (e) { console.warn("doc(id) 조회 실패:", e); }

  try {
    const q = query(collection(db, "accommodations"), where("contentid", "==", hotelId), limit(1));
    const qs = await getDocs(q);
    if (!qs.empty) return { id: qs.docs[0].id, ...qs.docs[0].data() };
  } catch (e) { console.warn("where(contentid) 조회 실패:", e); }

  return null;
}

// 실시간 리뷰 + 유저 실명 연동 로직
async function fetchReviewsFromFirebase(contentId) {
  if (!contentId || isNaN(Number(contentId))) return [];
  const { db } = await import("../common/firebase-config.js");
  const { collection, query, where, getDocs, orderBy, doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

  try {
    const q = query(
      collection(db, "review_for_mypage_test"),
      where("contentId", "==", Number(contentId)),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const rawReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const userCache = {};
    const uniqueUserIds = [...new Set(rawReviews.map(r => r.userId))].filter(Boolean);

    await Promise.all(uniqueUserIds.map(async (uid) => {
      try {
        const uSnap = await getDoc(doc(db, "users", uid));
        userCache[uid] = uSnap.exists() ? uSnap.data().name : "익명 사용자";
      } catch (err) { userCache[uid] = "익명 사용자"; }
    }));

    return rawReviews.map(data => ({
      id: data.id,
      nickname: userCache[data.userId] || "익명 사용자",
      date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : "2026.01.28",
      rating: data.rating || 0,
      travelerType: data.travelerType || "일반",
      content: data.content || "",
      images: data.imageUrls || (data.img ? [data.img] : [])
    }));
  } catch (e) {
    console.error("후기 로드 실패:", e);
    return [];
  }
}

// ===== [3] 화면 렌더링 함수 =====

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

  // [팀원 추가] 지도 렌더링 호출
  renderLeafletMap({ lat: hotel.lat, lng: hotel.lng, name: hotel.name });
}

// [팀원 추가] Leaflet 지도 렌더링 함수
function renderLeafletMap({ lat, lng, name }) {
  const section = document.getElementById("detailMapSection");
  const mapEl = document.getElementById("detailMap");
  if (!section || !mapEl) return;

  if (!Number.isFinite(lat) || !Number.isFinite(lng) || typeof window.L === "undefined") {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  if (mapEl._leaflet_id) {
    try { mapEl._leaflet_id = null; mapEl.innerHTML = ""; } catch (_) {}
  }

  const map = window.L.map(mapEl, { scrollWheelZoom: false }).setView([lat, lng], 14);
  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  window.L.marker([lat, lng]).addTo(map).bindPopup(name || "위치").openPopup();
  setTimeout(() => map.invalidateSize(), 0);
}

function updatePictograms() {
  const update = (elem, statusElem, isAvailable, posText, negText) => {
    if (!elem || !statusElem) return;
    elem.classList.toggle("available", isAvailable);
    elem.classList.toggle("unavailable", !isAvailable);
    statusElem.textContent = isAvailable ? posText : negText;
  };
  update(parkingInfo, document.getElementById("parkingStatus"), hotel.parking, "가능", "불가");
  update(petInfo, document.getElementById("petStatus"), hotel.pet, "동반가능", "불가");
  update(wifiInfo, document.getElementById("wifiStatus"), hotel.wifi, "무료", "없음");
  update(noSmokingInfo, document.getElementById("noSmokingStatus"), hotel.noSmoking, "금연", "흡연 불가");
  update(breakfastInfo, document.getElementById("breakfastStatus"), hotel.breakfast, "제공", "미제공");
}

// [근찬님 7전8기 디자인] 후기 렌더링 (좌측 사진, 우측 내용)
function renderReviews() {
  reviewCount.textContent = `${hotelReviews.length}개의 후기`;
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const pageReviews = hotelReviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

  reviewList.innerHTML = pageReviews.map(review => {
    const hasImages = review.images && review.images.length > 0;
    return `
    <div class="review-card" style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
      <div class="review-user" style="display: flex; align-items: center; margin-bottom: 12px;">
        <div class="review-avatar" style="margin-right: 12px; font-size: 24px;">👤</div>
        <div class="review-user-info" style="flex: 1;">
          <div class="review-nickname" style="font-weight: 600;">${review.nickname}</div>
          <div class="review-meta" style="font-size: 12px; color: #888;">
            <span>${review.date}</span> | <span class="traveler-tag">${review.travelerType}</span>
          </div>
        </div>
        <div class="review-rating">${renderStars(review.rating)}</div>
      </div>

      <div class="review-body" style="display: flex; gap: 20px; align-items: flex-start;">
        ${hasImages ? `
          <div class="review-left" style="flex: 0 0 120px;">
            <div class="review-image-gallery" style="display: flex; flex-direction: column; gap: 8px;">
              ${review.images.map((img, idx) => `
                <img src="${img}" alt="후기 사진 ${idx+1}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px; border: 1px solid #ddd;">
              `).join("")}
            </div>
          </div>
        ` : ""}
        <div class="review-right" style="flex: 1;">
          <div class="review-content" style="line-height: 1.6; color: #444; white-space: pre-wrap;">${review.content}</div>
        </div>
      </div>
    </div>
  `}).join("");
  renderPagination();
}

function renderPagination() {
  if (totalPages <= 1) { pagination.innerHTML = ""; return; }
  let html = `<button class="page-btn" ${currentPage === 1 ? "disabled" : ""} onclick="goToPage(${currentPage - 1})">&lt;</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="goToPage(${i})">${i}</button>`;
  }
  html += `<button class="page-btn" ${currentPage === totalPages ? "disabled" : ""} onclick="goToPage(${currentPage + 1})">&gt;</button>`;
  pagination.innerHTML = html;
}

window.goToPage = function(page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderReviews();
  document.querySelector(".review-section").scrollIntoView({ behavior: "smooth" });
};

// ===== [4] 이벤트 리스너 및 초기화 =====

let isPictogramVisible = false;
if (detailBtn && pictogramSection) {
  detailBtn.addEventListener("click", () => {
    isPictogramVisible = !isPictogramVisible;
    pictogramSection.style.display = isPictogramVisible ? "block" : "none";
    detailBtn.textContent = isPictogramVisible ? "상세 정보 닫기" : "상세 정보";
  });
}

const addScheduleBtn = document.getElementById("addScheduleBtn");
if (addScheduleBtn) {
  addScheduleBtn.addEventListener("click", () => {
    if (!hotel) return;
    calendarModal.open(hotel.name, {
      type: "hotel", hotelId: hotelId, image: hotel.image,
      location: hotel.address, contact: hotel.contact, price: hotel.price
    }, (data) => console.log("일정 추가 완료:", data));
  });
}

bookingBtn.addEventListener("click", () => {
  if (!hotel) return;
  if(checkAuth()) openBookingPanel({
    hotelId: hotelId, hotelName: hotel.name, addr: hotel.address,
    image: hotel.image, basePrice: hotel.basePrice, tel: hotel.contact
  });
});

(async () => {
  try {
    if (!hotelId) return (location.href = "hotel.html");
    const docData = await fetchHotelFromFirebase(hotelId);
    if (!docData) return (location.href = "hotel.html");

    hotel = mapAccommodationDocToHotel(docData, hotelId);
    renderHotelInfo();
    updatePictograms();

    if (pictogramSection && detailBtn) {
      isPictogramVisible = true;
      pictogramSection.style.display = "block";
      detailBtn.textContent = "상세 정보 닫기";
    }

    // 실시간 리뷰 로드
    hotelReviews = await fetchReviewsFromFirebase(hotel.id); 
    totalPages = Math.ceil(hotelReviews.length / REVIEWS_PER_PAGE) || 1;
    renderReviews();
  } catch (e) { console.error("초기화 실패:", e); }
})();