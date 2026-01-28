import { openBookingPanel } from "./hotel-booking.js";
import { checkAuth } from '../auth/auth-guard.js';

// ===== 전역 상태 관리 =====
let hotel = null;
let hotelReviews = [];
let currentPage = 1;
const REVIEWS_PER_PAGE = 3;
let totalPages = 1;
let isFetching = false; // [팀원 추가] 예약 로딩 상태 변수

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
const noSmokingInfo = document.getElementById("noSmokingStatus")?.parentElement; // ID 구조에 따른 조정
const breakfastInfo = document.getElementById("breakfastStatus")?.parentElement;

const bookingBtn = document.getElementById("bookingBtn");
const modalHotelName = document.getElementById("modalHotelName");

const reviewList = document.getElementById("reviewList");
const reviewCount = document.getElementById("reviewCount");
const pagination = document.getElementById("pagination");

// ===== [1] 유틸리티 및 데이터 매핑 함수 =====

function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating 
      ? '<span class="star" style="color: #ffb400;">&#9733;</span>' 
      : '<span class="star empty" style="color: #ccc;">&#9733;</span>';
  }
  return stars;
}

function mapAccommodationDocToHotel(docData, hotelId) {
  const name = docData?.name || docData?.title || "숙소명";
  const address = docData?.address || docData?.addr1 || "";
  const contact = docData?.contact || docData?.tel || "";
  const image = docData?.image || docData?.firstimage || docData?.firstimage2 || "";

  const latRaw = docData?.lat ?? docData?.latitude ?? docData?.mapy ?? docData?.gpsy ?? null;
  const lngRaw = docData?.lng ?? docData?.longitude ?? docData?.mapx ?? docData?.gpsx ?? null;
  const lat = latRaw != null ? Number(latRaw) : null;
  const lng = lngRaw != null ? Number(lngRaw) : null;

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

// [팀원 추가] 중복 예약 방지를 위해 사용자 예약 내역 가져오기
async function fetchUserReservationInfo() {
  const authUser = localStorage.getItem('auth_user');
  if (localStorage.getItem('auth_isLoggedIn') !== 'true' || !authUser) return [];
  
  try {
    const loggedInUser = JSON.parse(authUser);
    const [{ db }, { getDocs, collection, query, where }] = await Promise.all([
      import("../common/firebase-config.js"),
      import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js")
    ]);
    const q = query(collection(db, "reservations"), where("userId", "==", loggedInUser.uid));
    const snapshot = await getDocs(q);

    const formatDateAsDate = (ts) => {
      if (!ts) return null;
      const d = ts.toDate ? ts.toDate() : new Date(ts);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    return snapshot.docs.map(doc => {
      const data = doc.data();
      const checkIn = formatDateAsDate(data.checkIn);
      const checkOut = formatDateAsDate(data.checkOut);
      if (!checkIn || !checkOut || !data.contentId) return null;
      return { id: doc.id, checkIn, checkOut, title: data.title, contentId: data.contentId };
    }).filter(Boolean);
  } catch (error) {
    console.error("예약 내역 로드 실패:", error);
    return [];
  }
}

// [근찬님] 실시간 리뷰 + 유저 실명 연동 로직
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
      const uSnap = await getDoc(doc(db, "users", uid));
      userCache[uid] = uSnap.exists() ? uSnap.data().name : "익명 사용자";
    }));

    return rawReviews.map(data => ({
      nickname: userCache[data.userId] || "익명 사용자",
      date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : "2026.01.28",
      rating: data.rating || 0,
      travelerType: data.travelerType || "일반",
      content: data.content || "",
      images: data.imageUrls || (data.img ? [data.img] : [])
    }));
  } catch (e) { return []; }
}

// ===== [3] 화면 렌더링 함수 =====

function renderHotelInfo() {
  headerHotelName.textContent = hotel.name;
  hotelImage.src = hotel.image;
  hotelName.textContent = hotel.name;
  hotelAddress.textContent = hotel.address;
  hotelContact.textContent = hotel.contact;
  hotelPrice.textContent = hotel.price;
  hotelDesc.textContent = hotel.desc;
  if(modalHotelName) modalHotelName.textContent = hotel.name;
  renderLeafletMap({ lat: hotel.lat, lng: hotel.lng, name: hotel.name });
}

function renderLeafletMap({ lat, lng, name }) {
  const section = document.getElementById("detailMapSection");
  const mapEl = document.getElementById("detailMap");
  if (!section || !mapEl || !Number.isFinite(lat)) return;
  section.style.display = "block";
  const map = window.L.map(mapEl, { scrollWheelZoom: false }).setView([lat, lng], 14);
  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  window.L.marker([lat, lng]).addTo(map).bindPopup(name || "위치").openPopup();
}

function updatePictograms() {
  const update = (elem, statusElemId, isAvailable, posText, negText) => {
    const statusElem = document.getElementById(statusElemId);
    if (!elem || !statusElem) return;
    elem.classList.toggle("available", isAvailable);
    elem.classList.toggle("unavailable", !isAvailable);
    statusElem.textContent = isAvailable ? posText : negText;
  };
  update(parkingInfo, "parkingStatus", hotel.parking, "가능", "불가");
  update(petInfo, "petStatus", hotel.pet, "동반가능", "불가");
  update(wifiInfo, "wifiStatus", hotel.wifi, "무료", "없음");
  update(noSmokingInfo, "noSmokingStatus", hotel.noSmoking, "금연", "흡연 불가");
  update(breakfastInfo, "breakfastStatus", hotel.breakfast, "제공", "미제공");
}

function renderReviews() {
  reviewCount.textContent = `${hotelReviews.length}개의 후기`;
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const pageReviews = hotelReviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

  reviewList.innerHTML = pageReviews.map(review => {
    const hasImages = review.images && review.images.length > 0;
    return `
    <div class="review-card" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
      <div class="review-user" style="display: flex; align-items: center;">
        <div class="review-avatar" style="margin-right: 12px; font-size: 24px;">👤</div>
        <div class="review-user-info" style="flex: 1;">
          <div class="review-nickname" style="font-weight: 600;">${review.nickname}</div>
          <div class="review-meta" style="font-size: 12px; color: #888;">
            <span>${review.date}</span> | <span class="traveler-tag">${review.travelerType}</span>
          </div>
        </div>
        <div class="review-rating">${renderStars(review.rating)}</div>
      </div>
      <div class="review-body" style="display: flex; gap: 20px;">
        ${hasImages ? `
          <div class="review-left" style="flex: 0 0 120px;">
            <img src="${review.images[0]}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;">
          </div>` : ""}
        <div class="review-right" style="flex: 1; line-height: 1.6; white-space: pre-wrap;">${review.content}</div>
      </div>
    </div>`;
  }).join("");
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

window.goToPage = (page) => {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderReviews();
  document.querySelector(".review-section").scrollIntoView({ behavior: "smooth" });
};

// ===== [4] 이벤트 리스너 및 초기화 =====

detailBtn?.addEventListener("click", () => {
  pictogramSection.style.display = pictogramSection.style.display === "none" ? "block" : "none";
  detailBtn.textContent = pictogramSection.style.display === "block" ? "상세 정보 닫기" : "상세 정보";
});

// [팀원 수정] 예약 버튼 클릭 시 중복 체크 로직 포함
bookingBtn?.addEventListener("click", async () => {
  if (isFetching || !hotel) return;
  if(checkAuth()) {
    isFetching = true;
    const userReservationInfo = await fetchUserReservationInfo();
    openBookingPanel({
      hotelId: hotelId,
      hotelName: hotel.name,
      addr: hotel.address,
      image: hotel.image,
      basePrice: hotel.basePrice,
      tel: hotel.contact
    }, userReservationInfo); // [팀원 포인트] 유저 예약 정보 전달
    isFetching = false;
  }
});

(async () => {
  try {
    if (!hotelId) return (location.href = "hotel.html");
    const docData = await fetchHotelFromFirebase(hotelId);
    if (!docData) return (location.href = "hotel.html");

    hotel = mapAccommodationDocToHotel(docData, hotelId);
    renderHotelInfo();
    updatePictograms();

    hotelReviews = await fetchReviewsFromFirebase(hotel.id); 
    totalPages = Math.ceil(hotelReviews.length / REVIEWS_PER_PAGE) || 1;
    renderReviews();
  } catch (e) { console.error("초기화 실패:", e); }
})();