import { getBookingPanelHTML } from "./hotel-booking-template.js";
import { ensureBookingPanelBaseStyle } from "./hotel-booking-style.js";


function closeBookingPanel() {
  const root = document.getElementById("booking-panel-root");
  if (!root) return;

  // 열림 상태 제거 → CSS가 슬라이드 아웃 시작
  root.classList.remove("is-open");

  // 배경 스크롤 복구
  document.body.style.overflow = "";

  // 애니메이션 끝난 뒤 DOM 제거
  setTimeout(() => {
    root.innerHTML = "";
  }, 600); // ← CSS transition 시간보다 살짝 크게
}


function onEscClose(e) {
  if (e.key === "Escape") closeBookingPanel();
}

function onPanelRootClick(e) {
  const overlay = e.target.closest("[data-booking-overlay]");
  const closeBtn = e.target.closest("[data-booking-close]");
  if (overlay || closeBtn) closeBookingPanel();
}

export function openBookingPanel(bookingData) {
  const root = document.getElementById("booking-panel-root");
  if (!root) return;
  if (root.querySelector(".booking-panel")) {
    closeBookingPanel();
    return;
  }
  ensureBookingPanelBaseStyle();
  root.innerHTML = getBookingPanelHTML();

  // transition을 먹이려면 한 프레임 뒤에 open
  requestAnimationFrame(() => {
    root.classList.add("is-open");
  });

  document.body.style.overflow = "hidden";
  root.addEventListener("click", onPanelRootClick);
  document.addEventListener("keydown", onEscClose);

  // 데이터 채우기
  const img = root.querySelector("#hotelImage");
  const name = root.querySelector("#hotelName");
  const loc = root.querySelector("#hotelLocation");
  const sImg = root.querySelector("#summaryHotelImage");
  const sName = root.querySelector("#summaryHotelName");
  const sLoc = root.querySelector("#summaryLocation");

  if (img && bookingData.image) img.src = bookingData.image;
  if (sImg && bookingData.image) sImg.src = bookingData.image;

  if (name) name.textContent = bookingData.hotelName ?? "";
  if (sName) sName.textContent = bookingData.hotelName ?? "";

  if (loc) loc.textContent = bookingData.addr ?? "";
  if (sLoc) sLoc.textContent = bookingData.addr ?? "";

  initBookingPanel(root, bookingData, {
    onClose: closeBookingPanel
  });
}

// hotel-booking.js 내부

const roomPrices = { standard: 1, deluxe: 1.3, suite: 1.7 };
const roomTypeNames = { standard: "스탠다드", deluxe: "디럭스", suite: "스위트" };

function getNights(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = (end - start) / (1000 * 60 * 60 * 24);
  return nights > 0 ? nights : 0;
}

export function initBookingPanel(root, bookingData, { onClose } = {}) {
  // root는 booking-panel-root(또는 패널 컨테이너) 안쪽을 넘겨줘야 함
  if (!root) return;

  if (!bookingData) {
    alert("예약 정보가 없습니다.");
    onClose?.(); // 패널 닫기 콜백
    return;
  }

  // DOM 요소(모두 root 범위에서만 찾기)
  const hotelImage = root.querySelector("#hotelImage");
  const hotelName = root.querySelector("#hotelName");
  const hotelLocation = root.querySelector("#hotelLocation");
  const summaryHotelImage = root.querySelector("#summaryHotelImage");
  const summaryHotelName = root.querySelector("#summaryHotelName");
  const summaryLocation = root.querySelector("#summaryLocation");

  const checkInInput = root.querySelector("#checkIn");
  const checkOutInput = root.querySelector("#checkOut");
  const roomTypeSelect = root.querySelector("#roomType");
  const guestCountSelect = root.querySelector("#guestCount");

  const summaryCheckIn = root.querySelector("#summaryCheckIn");
  const summaryCheckOut = root.querySelector("#summaryCheckOut");
  const summaryNights = root.querySelector("#summaryNights");
  const summaryRoomType = root.querySelector("#summaryRoomType");
  const summaryGuests = root.querySelector("#summaryGuests");

  const pricePerNight = root.querySelector("#pricePerNight");
  const nightsMultiplier = root.querySelector("#nightsMultiplier");
  const totalPriceDisplay = root.querySelector("#totalPrice");

  const bookingForm = root.querySelector("#bookingForm");
  const scheduleBtn = root.querySelector("#scheduleBtn");
  const agreeAll = root.querySelector("#agreeAll");
  const agreeTerms = root.querySelector("#agreeTerms");
  const agreePrivacy = root.querySelector("#agreePrivacy");

  // 방어: 필수 요소 없으면 종료 (패널 HTML이 바뀌면 여기서 바로 잡힘)
  if (!bookingForm || !checkInInput || !checkOutInput || !roomTypeSelect || !guestCountSelect) {
    console.warn("Booking panel DOM is missing required elements.");
    return;
  }

  // 숙소 정보 표시
  if (hotelImage) hotelImage.src = bookingData.image || "";
  if (hotelName) hotelName.textContent = bookingData.hotelName || "";
  if (hotelLocation) hotelLocation.textContent = bookingData.addr || "";
  if (summaryHotelImage) summaryHotelImage.src = bookingData.image || "";
  if (summaryHotelName) summaryHotelName.textContent = bookingData.hotelName || "";
  if (summaryLocation) summaryLocation.textContent = bookingData.addr || "";

  // 최소 날짜 설정 (오늘 이후)
  const today = new Date().toISOString().split("T")[0];
  checkInInput.setAttribute("min", today);
  checkOutInput.setAttribute("min", today);

  function calculatePrice() {
    const roomType = roomTypeSelect.value;
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    const guests = guestCountSelect.value;

    if (summaryCheckIn) summaryCheckIn.textContent = checkIn || "-";
    if (summaryCheckOut) summaryCheckOut.textContent = checkOut || "-";
    if (summaryRoomType) summaryRoomType.textContent = roomTypeNames[roomType];
    if (summaryGuests) summaryGuests.textContent = guests + "명";

    if (!checkIn || !checkOut) {
      if (summaryNights) summaryNights.textContent = "0박";
      if (pricePerNight) pricePerNight.textContent = "0원";
      if (nightsMultiplier) nightsMultiplier.textContent = "x 0박";
      if (totalPriceDisplay) totalPriceDisplay.textContent = "0원";
      return;
    }

    const nights = getNights(checkIn, checkOut);
    if (nights <= 0) {
      if (summaryNights) summaryNights.textContent = "0박";
      if (pricePerNight) pricePerNight.textContent = "0원";
      if (nightsMultiplier) nightsMultiplier.textContent = "x 0박";
      if (totalPriceDisplay) totalPriceDisplay.textContent = "0원";
      return;
    }

    const basePrice = (bookingData.basePrice || 0) * roomPrices[roomType];
    const total = basePrice * nights;

    if (summaryNights) summaryNights.textContent = `${nights}박`;
    if (pricePerNight) pricePerNight.textContent = `${basePrice.toLocaleString()}원`;
    if (nightsMultiplier) nightsMultiplier.textContent = `x ${nights}박`;
    if (totalPriceDisplay) totalPriceDisplay.textContent = `${total.toLocaleString()}원`;
  }

  // 이벤트 리스너
  checkInInput.addEventListener("change", function () {
    const checkInDate = new Date(this.value);
    checkInDate.setDate(checkInDate.getDate() + 1);
    const minCheckOut = checkInDate.toISOString().split("T")[0];
    checkOutInput.setAttribute("min", minCheckOut);

    if (checkOutInput.value && checkOutInput.value <= this.value) {
      checkOutInput.value = "";
    }
    calculatePrice();
  });

  checkOutInput.addEventListener("change", calculatePrice);
  roomTypeSelect.addEventListener("change", calculatePrice);
  guestCountSelect.addEventListener("change", calculatePrice);

  // 전체 동의 체크박스
  if (agreeAll) {
    agreeAll.addEventListener("change", function () {
      const checkboxes = root.querySelectorAll('.terms-agreement input[type="checkbox"]:not(#agreeAll)');
      checkboxes.forEach(cb => (cb.checked = this.checked));
    });
  }

  // 개별 체크박스 변경 시 전체 동의 체크 업데이트
  root.querySelectorAll('.terms-agreement input[type="checkbox"]:not(#agreeAll)').forEach(cb => {
    cb.addEventListener("change", function () {
      const allChecked = Array.from(
        root.querySelectorAll('.terms-agreement input[type="checkbox"]:not(#agreeAll)')
      ).every(x => x.checked);
      if (agreeAll) agreeAll.checked = allChecked;
    });
  });

  function validateForm() {
    let isValid = true;

    const checkIn = checkInInput;
    const checkOut = checkOutInput;

    if (!checkIn.value) {
      checkIn.closest(".form-group")?.classList.add("error");
      isValid = false;
    } else {
      checkIn.closest(".form-group")?.classList.remove("error");
    }

    if (!checkOut.value) {
      checkOut.closest(".form-group")?.classList.add("error");
      isValid = false;
    } else {
      checkOut.closest(".form-group")?.classList.remove("error");
    }

    if (checkIn.value && checkOut.value) {
      const nights = getNights(checkIn.value, checkOut.value);
      if (nights <= 0) {
        alert("체크아웃 날짜는 체크인 날짜 이후여야 합니다.");
        isValid = false;
      }
    }

    const guestName = root.querySelector("#guestName");
    const guestNameEn = root.querySelector("#guestNameEn");
    const phone = root.querySelector("#phone");
    const email = root.querySelector("#email");

    if (!guestName?.value.trim()) {
      guestName?.closest(".form-group")?.classList.add("error");
      isValid = false;
    } else {
      guestName.closest(".form-group")?.classList.remove("error");
    }

    if (!guestNameEn?.value.trim()) {
      guestNameEn?.closest(".form-group")?.classList.add("error");
      isValid = false;
    } else {
      guestNameEn.closest(".form-group")?.classList.remove("error");
    }

    if (!phone?.value.trim()) {
      phone?.closest(".form-group")?.classList.add("error");
      isValid = false;
    } else {
      phone.closest(".form-group")?.classList.remove("error");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email?.value.trim() || !emailRegex.test(email.value)) {
      email?.closest(".form-group")?.classList.add("error");
      isValid = false;
    } else {
      email.closest(".form-group")?.classList.remove("error");
    }

    if (!agreeTerms?.checked || !agreePrivacy?.checked) {
      alert("필수 약관에 동의해주세요.");
      isValid = false;
    }

    return isValid;
  }

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    const roomType = roomTypeSelect.value;
    const nights = getNights(checkIn, checkOut);

    const basePrice = (bookingData.basePrice || 0) * roomPrices[roomType];
    const totalPrice = basePrice * nights;

    const reservationData = {
      userPk: 1,
      reservationNumber: "RES" + Date.now(),
      accomodation: {
        //...bookingData,
        contentId: bookingData.hotelId,
        title: bookingData.hotelName,
        addr: bookingData.addr,
        tel: bookingData.tel,
        imgUrl: bookingData.image,
        checkIn,
        checkOut,
        nights,
        roomType,
        guestCount: guestCountSelect.value,
        basePrice,
        totalPrice
      },
      reserver: {
        name: root.querySelector("#guestName")?.value || "",
        nameEn: root.querySelector("#guestNameEn")?.value || "",
        email: root.querySelector("#email")?.value || "",
        tel: root.querySelector("#phone")?.value || "",
        reservedAt: new Date().toISOString(),
        paymentMethod: root.querySelector('input[name="payment"]:checked')?.value || "card",
        reserverRequest: root.querySelector("#reserverRequest")?.value || "",
      }
    };

    const reservations = JSON.parse(localStorage.getItem("myReservations")) || []; // Array that contains objects
    reservations.push(reservationData);
    localStorage.setItem("myReservations", JSON.stringify(reservations));

    alert(
      `예약이 완료되었습니다!\n\n` +
      `예약번호: ${reservationData.reservationNumber}\n` +
      `호텔: ${bookingData.hotelName}\n` +
      `체크인: ${checkIn}\n` +
      `체크아웃: ${checkOut}\n` +
      `객실: ${roomTypeNames[roomType]}\n` +
      `총 금액: ${totalPrice.toLocaleString()}원\n\n` +
      `예약 확인 이메일이 발송됩니다.`
    );

    // 패널 UX에 맞게: sessionStorage 정리 후 닫기
    sessionStorage.removeItem("bookingData");
    onClose?.();
  });

  if (scheduleBtn) {
    scheduleBtn.addEventListener("click", function () {
      const schedules = JSON.parse(localStorage.getItem("mySchedules")) || [];
      const exists = schedules.some(s => s.name === bookingData.hotelName && s.type === "hotel");
      if (exists) {
        alert("이미 일정에 추가된 숙소입니다.");
        return;
      }

      schedules.push({
        id: Date.now(),
        originalId: parseInt(bookingData.hotelId, 10),
        name: bookingData.hotelName,
        image: bookingData.image,
        location: bookingData.addr,
        description: `1박 ${(bookingData.basePrice || 0).toLocaleString()}원부터`,
        type: "hotel",
        addedAt: new Date().toISOString()
      });

      localStorage.setItem("mySchedules", JSON.stringify(schedules));
      alert("일정이 추가되었습니다!");
    });
  }

  // 초기화
  calculatePrice();
}
