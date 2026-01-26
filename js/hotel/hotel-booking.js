// hotel-booking.js

function getBookingPanelHTML() {
  return `<div class="booking-panel-overlay" data-booking-overlay></div>

    <aside class="booking-panel" role="dialog" aria-modal="true" aria-label="숙소 예약">
      <div class="booking-panel-header" style="display:flex; justify-content:space-between; align-items:center; padding:12px; border-bottom:1px solid #ddd;">
        <strong>예약</strong>
        <button type="button" data-booking-close aria-label="닫기">✕</button>
      </div>

      <div class="booking-panel-body" style="padding:12px; overflow:auto; height:100%;">
        <div class="page-header" style="padding-top: 0;">
          <div class="header-banner">
            <h1 class="page-title">숙소 예약</h1>
          </div>
        </div>

        <div class="container">
          <div class="booking-grid">

            <!-- Booking Form -->
            <div class="booking-form-section">
              <form class="booking-form" id="bookingForm">

                <!-- Hotel Info -->
                <div class="form-card">
                  <h2 class="section-title">숙소 정보</h2>
                  <div class="hotel-info">
                    <div class="hotel-info-image">
                      <img id="hotelImage" alt="숙소 이미지">
                    </div>
                    <div class="hotel-info-content">
                      <h3 id="hotelName"></h3>
                      <p id="hotelLocation"></p>
                    </div>
                  </div>
                </div>

                <!-- Booking Details -->
                <div class="form-card">
                  <h2 class="section-title">예약 정보</h2>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="required">체크인</label>
                      <input type="date" id="checkIn" required>
                      <span class="error-message">체크인 날짜를 선택해주세요</span>
                    </div>
                    <div class="form-group">
                      <label class="required">체크아웃</label>
                      <input type="date" id="checkOut" required>
                      <span class="error-message">체크아웃 날짜를 선택해주세요</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="required">객실 유형</label>
                    <select id="roomType" required>
                      <option value="standard">스탠다드 (기본 요금)</option>
                      <option value="deluxe">디럭스 (+30%)</option>
                      <option value="suite">스위트 (+70%)</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>인원</label>
                    <select id="guestCount">
                      <option value="1">1명</option>
                      <option value="2" selected>2명</option>
                      <option value="3">3명</option>
                      <option value="4">4명</option>
                    </select>
                  </div>
                </div>

                <!-- Guest Info -->
                <div class="form-card">
                  <h2 class="section-title">예약자 정보</h2>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="required">이름</label>
                      <input type="text" id="guestName" placeholder="홍길동" required>
                      <span class="error-message">이름을 입력해주세요</span>
                    </div>
                    <div class="form-group">
                      <label class="required">영문 이름</label>
                      <input type="text" id="guestNameEn" placeholder="Hong Gildong" required>
                      <span class="error-message">영문 이름을 입력해주세요</span>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="required">전화번호</label>
                      <input type="tel" id="phone" placeholder="010-1234-5678" required>
                      <span class="error-message">전화번호를 입력해주세요</span>
                    </div>
                    <div class="form-group">
                      <label class="required">이메일</label>
                      <input type="email" id="email" placeholder="example@email.com" required>
                      <span class="error-message">이메일을 입력해주세요</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>특별 요청사항</label>
                    <textarea id="reserverRequest" placeholder="특별한 요청사항이 있으시면 입력해주세요 (선택사항)"></textarea>
                  </div>
                </div>

                <!-- Payment Method -->
                <div class="form-card">
                  <h2 class="section-title">결제 방법</h2>

                  <div class="payment-methods">
                    <label class="payment-option">
                      <input type="radio" name="payment" value="card" checked>
                      <span class="payment-label">신용/체크카드</span>
                    </label>
                    <label class="payment-option">
                      <input type="radio" name="payment" value="transfer">
                      <span class="payment-label">계좌이체</span>
                    </label>
                    <label class="payment-option">
                      <input type="radio" name="payment" value="phone">
                      <span class="payment-label">휴대폰 결제</span>
                    </label>
                  </div>
                </div>

                <!-- Terms Agreement -->
                <div class="form-card">
                  <h2 class="section-title">약관 동의</h2>

                  <div class="terms-agreement">
                    <label class="checkbox-group">
                      <input type="checkbox" id="agreeAll">
                      <span><strong>전체 동의</strong></span>
                    </label>
                    <label class="checkbox-group">
                      <input type="checkbox" id="agreeTerms" required>
                      <span>이용약관 동의 (필수)</span>
                    </label>
                    <label class="checkbox-group">
                      <input type="checkbox" id="agreePrivacy" required>
                      <span>개인정보 수집 및 이용 동의 (필수)</span>
                    </label>
                    <label class="checkbox-group">
                      <input type="checkbox" id="agreeMarketing">
                      <span>마케팅 정보 수신 동의 (선택)</span>
                    </label>
                  </div>
                </div>

              </form>
            </div>

            <!-- Booking Summary -->
            <div class="booking-summary-section">
              <div class="booking-summary">
                <h2 class="section-title">예약 요약</h2>

                <div class="summary-hotel">
                  <div class="summary-hotel-image">
                    <img id="summaryHotelImage" alt="숙소 이미지">
                  </div>
                  <div class="summary-hotel-info">
                    <h3 id="summaryHotelName"></h3>
                    <p id="summaryLocation"></p>
                  </div>
                </div>

                <div class="summary-details">
                  <div class="summary-row">
                    <span class="summary-label">체크인</span>
                    <span class="summary-value" id="summaryCheckIn">-</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">체크아웃</span>
                    <span class="summary-value" id="summaryCheckOut">-</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">숙박일수</span>
                    <span class="summary-value" id="summaryNights">0박</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">객실 유형</span>
                    <span class="summary-value" id="summaryRoomType">스탠다드</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">인원</span>
                    <span class="summary-value" id="summaryGuests">2명</span>
                  </div>
                </div>

                <div class="price-breakdown">
                  <div class="price-row">
                    <span>1박 요금</span>
                    <span id="pricePerNight">0원</span>
                  </div>
                  <div class="price-row">
                    <span>숙박일수</span>
                    <span id="nightsMultiplier">x 0박</span>
                  </div>
                  <div class="price-row total-price">
                    <span>총 결제금액</span>
                    <span id="totalPrice">0원</span>
                  </div>
                </div>

                <button type="submit" form="bookingForm" class="btn-submit" id="submitBtn">
                  결제하기
                </button>

                <button type="button" class="btn-schedule" id="scheduleBtn">
                  일정에 담기
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </aside>
    `;
}

function ensureBookingPanelBaseStyle() {
  if (document.getElementById("booking-panel-base-style")) return;

  const style = document.createElement("style");
  style.id = "booking-panel-base-style";
  style.textContent = `
    /* ===== Base layout (existing) ===== */
    #booking-panel-root { position: relative; z-index: 9999; }
    #booking-panel-root .booking-panel-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.35);
    }
    #booking-panel-root .booking-panel {
      position: fixed;
      top: 0; right: 0;
      width: min(520px, 92vw);
      height: 100vh;
      background: #fff;
      box-shadow: -12px 0 24px rgba(0,0,0,.18);
      display: flex;
      flex-direction: column;
    }

    /* ===== Booking Panel Theme (scoped) ===== */
    #booking-panel-root{
      --bp-bg: #f3f1ee;              /* 예시처럼 오프화이트/웜그레이 */
      --bp-card: #dedcd9;            /* Total 영역 박스 */
      --bp-line: rgba(0,0,0,.35);    /* 헤어라인 */
      --bp-line-soft: rgba(0,0,0,.18);
      --bp-text: #222;
      --bp-muted: rgba(0,0,0,.55);
      --bp-navy: var(--navy-blue, #2f4157);
      --bp-radius: 18px;
      --bp-pad: 18px;
      --bp-letter: .22em;
    }

    /* 패널 전체 배경/타이포 */
    #booking-panel-root .booking-panel{
      background: var(--bp-bg);
      color: var(--bp-text);
      font-family: 'Noto Sans', 'Noto Sans KR', sans-serif;
    }

    /* 헤더: 심플 + 얇은 라인 */
    #booking-panel-root .booking-panel-header{
      background: var(--bp-bg) !important;
      border-bottom: 1px solid var(--bp-line-soft) !important;
      padding: 16px 18px !important;
    }
    #booking-panel-root .booking-panel-header strong{
      font-weight: 700;
      letter-spacing: .14em;
    }
    #booking-panel-root [data-booking-close]{
      appearance: none;
      border: none;
      background: transparent;
      width: 36px; height: 36px;
      border-radius: 999px;
      cursor: pointer;
      color: var(--bp-muted);
    }
    #booking-panel-root [data-booking-close]:hover{
      background: rgba(0,0,0,.06);
      color: var(--bp-text);
    }

    /* body */
    #booking-panel-root .booking-panel-body{
      padding: 18px !important;
      height: 100%;
      overflow: auto;
    }

    /* page header는 실질적으로 필요 없으면 최소화 */
    #booking-panel-root .page-header,
    #booking-panel-root .header-banner{
      padding: 0 !important;
      margin: 0 0 10px 0;
      background: transparent !important;
    }
    #booking-panel-root .page-title{
      font-size: 12px;
      font-weight: 700;
      letter-spacing: var(--bp-letter);
      text-transform: uppercase;
      color: var(--bp-muted);
      margin: 0 0 14px 0;
    }

    /* container/grid: 패널에서는 세로 1열로 정돈 */
    #booking-panel-root .container{ max-width: 100% !important; padding: 0 !important; }
    #booking-panel-root .booking-grid{
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;
      align-items: start;
    }

    /* 섹션 타이틀: 예시처럼 자간 + 얇은 라인 */
    #booking-panel-root .section-title{
      font-size: 12px;
      font-weight: 700;
      letter-spacing: var(--bp-letter);
      text-transform: uppercase;
      color: var(--bp-text);
      margin: 0 0 14px 0;
    }

    /* form-card: 박스카드 느낌을 줄이고 섹션+라인 느낌으로 */
    #booking-panel-root .form-card{
      background: transparent;
      border-radius: 0;
      padding: 0 0 18px 0;
      margin: 0 0 18px 0;
      border-bottom: 1px solid var(--bp-line);
    }
    #booking-panel-root .form-card:last-child{
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    /* 호텔 정보 */
    #booking-panel-root .hotel-info{
      display: grid;
      grid-template-columns: 78px 1fr;
      gap: 14px;
      align-items: center;
    }
    #booking-panel-root .hotel-info-image{
      width: 78px; height: 78px;
      border-radius: 14px;
      overflow: hidden;
      background: rgba(0,0,0,.06);
    }
    #booking-panel-root .hotel-info-image img{
      width: 100%; height: 100%;
      object-fit: cover;
      display: block;
    }
    #booking-panel-root .hotel-info-content h3{
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 6px 0;
      letter-spacing: .02em;
    }
    #booking-panel-root .hotel-info-content p{
      margin: 0;
      font-size: 12px;
      color: var(--bp-muted);
      letter-spacing: .08em;
    }

    /* 폼 행/그룹 */
    #booking-panel-root .form-row{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 14px;
    }
    #booking-panel-root .form-group{
      display: grid;
      gap: 8px;
      margin-bottom: 14px;
    }
    #booking-panel-root .form-group:last-child{ margin-bottom: 0; }
    
    /* 좌/우 폼 상단 라인 맞추기 */
    #booking-panel-root .form-row{
      align-items: start;          /* 핵심: 위 기준 정렬 */
    }

    /* form-group이 내부에서 baseline 영향 받지 않게 */
    #booking-panel-root .form-group{
      align-content: start;
    }

    /* 라벨 높이를 고정해서 좌/우 라벨 줄수 차이로 밀리는 것 방지 */
    #booking-panel-root .form-group > label{
      display: block;
      min-height: 18px;            /* 라벨 한 줄 높이 확보 */
    }

    /* 에러 메시지는 자리 차지 안 하게(숨겨져 있을 때도 높이 영향 최소화) */
    #booking-panel-root .error-message{
      min-height: 0;
      line-height: 1.2;
    }

    #booking-panel-root label{
      font-size: 11px;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: var(--bp-muted);
    }
    #booking-panel-root label.required::after{
      content: " *";
      color: rgba(185,57,32,.9); /* var(--btn-red) 계열 */
      letter-spacing: 0;
    }

    /* 언더라인 인풋 스타일 (예시 핵심) */
    #booking-panel-root input[type="text"],
    #booking-panel-root input[type="email"],
    #booking-panel-root input[type="tel"],
    #booking-panel-root input[type="date"],
    #booking-panel-root select,
    #booking-panel-root textarea{
      width: 100%;
      border: none;
      border-bottom: 1px solid var(--bp-line);
      background: transparent;
      padding: 10px 2px;
      font-size: 14px;
      color: var(--bp-text);
      outline: none;
      border-radius: 0;
    }
    #booking-panel-root textarea{
      resize: vertical;
      min-height: 76px;
      line-height: 1.5;
    }
    #booking-panel-root input::placeholder,
    #booking-panel-root textarea::placeholder{
      color: rgba(0,0,0,.35);
      letter-spacing: .12em;
    }
    #booking-panel-root input:focus,
    #booking-panel-root select:focus,
    #booking-panel-root textarea:focus{
      border-bottom-color: rgba(0,0,0,.7);
    }

    /* select 화살표 최소 스타일 (브라우저별 차이 감안) */
    #booking-panel-root select{
      appearance: none;
      padding-right: 28px;
      background-image:
        linear-gradient(45deg, transparent 50%, rgba(0,0,0,.55) 50%),
        linear-gradient(135deg, rgba(0,0,0,.55) 50%, transparent 50%);
      background-position:
        calc(100% - 14px) 55%,
        calc(100% - 9px) 55%;
      background-size: 5px 5px, 5px 5px;
      background-repeat: no-repeat;
    }

    /* 에러 메시지: 기본은 숨김(필요 시 JS로 show) */
    #booking-panel-root .error-message{
      display: none;
      font-size: 11px;
      color: rgba(185,57,32,.95);
      letter-spacing: .06em;
    }
    #booking-panel-root .is-invalid + .error-message{ display: block; }

    /* 결제 방법: 라인 기반 */
    #booking-panel-root .payment-methods{
      display: grid;
      gap: 10px;
      margin-top: 6px;
    }
    #booking-panel-root .payment-option{
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid var(--bp-line-soft);
      cursor: pointer;
      user-select: none;
    }
    #booking-panel-root .payment-option:last-child{ border-bottom: none; }
    #booking-panel-root .payment-option input{ accent-color: var(--bp-navy); }
    #booking-panel-root .payment-label{
      font-size: 13px;
      letter-spacing: .12em;
      color: var(--bp-text);
    }

    /* 약관 */
    #booking-panel-root .terms-agreement{
      display: grid;
      gap: 10px;
      margin-top: 6px;
    }
    #booking-panel-root .checkbox-group{
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      user-select: none;
      padding: 6px 0;
      border-bottom: 1px solid var(--bp-line-soft);
    }
    #booking-panel-root .checkbox-group:last-child{ border-bottom: none; }
    #booking-panel-root .checkbox-group span{
      font-size: 13px;
      letter-spacing: .08em;
      color: var(--bp-text);
    }
    #booking-panel-root .checkbox-group input{ accent-color: var(--bp-navy); }

    /* ===== Summary: 예시처럼 ‘요약 + Total Cost 카드’ ===== */
    #booking-panel-root .booking-summary{
      background: transparent;
      border-bottom: 1px solid var(--bp-line);
      padding-bottom: 18px;
      margin-bottom: 8px;
    }

    /* 요약 호텔 */
    #booking-panel-root .summary-hotel{
      display: grid;
      grid-template-columns: 64px 1fr;
      gap: 12px;
      align-items: center;
      margin-bottom: 14px;
    }
    #booking-panel-root .summary-hotel-image{
      width: 64px; height: 64px;
      border-radius: 14px;
      overflow: hidden;
      background: rgba(0,0,0,.06);
    }
    #booking-panel-root .summary-hotel-image img{
      width: 100%; height: 100%;
      object-fit: cover;
      display: block;
    }
    #booking-panel-root .summary-hotel-info h3{
      margin: 0 0 6px 0;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: .02em;
    }
    #booking-panel-root .summary-hotel-info p{
      margin: 0;
      font-size: 12px;
      color: var(--bp-muted);
      letter-spacing: .10em;
    }

    /* 좌 라벨 / 우 값 2열 */
    #booking-panel-root .summary-details{
      display: grid;
      gap: 10px;
      padding: 10px 0 16px 0;
      border-top: 1px solid var(--bp-line);
      border-bottom: 1px solid var(--bp-line);
      margin-bottom: 16px;
    }
    #booking-panel-root .summary-row{
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 12px;
    }
    #booking-panel-root .summary-label{
      font-size: 11px;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: var(--bp-muted);
    }
    #booking-panel-root .summary-value{
      font-size: 12px;
      letter-spacing: .14em;
      color: var(--bp-text);
    }

    /* 가격 영역: 예시의 Total Cost 박스 */
    #booking-panel-root .price-breakdown{
      background: var(--bp-card);
      border-radius: var(--bp-radius);
      padding: 16px;
    }
    #booking-panel-root .price-row{
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 12px;
      padding: 10px 4px;
      border-bottom: 1px solid rgba(0,0,0,.18);
      font-size: 12px;
      letter-spacing: .14em;
    }
    #booking-panel-root .price-row:last-child{ border-bottom: none; }
    #booking-panel-root .price-row span:first-child{
      color: rgba(0,0,0,.62);
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: .18em;
    }
    #booking-panel-root .total-price{
      padding-top: 14px;
      margin-top: 6px;
    }
    #booking-panel-root .total-price span:first-child{
      font-size: 12px;
      letter-spacing: .22em;
      color: rgba(0,0,0,.7);
    }
    #booking-panel-root #totalPrice{
      font-size: 20px;
      font-weight: 800;
      letter-spacing: .10em;
      color: var(--bp-text);
    }

    /* ===== Buttons ===== */
    #booking-panel-root .btn-submit,
    #booking-panel-root .btn-schedule{
      width: 100%;
      border: none;
      height: 50px;
      border-radius: 999px;
      font-size: 14px;
      letter-spacing: .18em;
      cursor: pointer;
      margin-top: 12px;
    }
    /* Pay Now 느낌 */
    #booking-panel-root .btn-submit{
      background: var(--bp-navy);
      color: #fff;
      box-shadow: 0 10px 24px rgba(47,65,87,.22);
    }
    #booking-panel-root .btn-submit:hover{ opacity: .95; }

    /* 비활성/서브 버튼 느낌 */
    #booking-panel-root .btn-schedule{
      background: rgba(0,0,0,.10);
      color: rgba(0,0,0,.55);
      box-shadow: none;
    }
    #booking-panel-root .btn-schedule:hover{
      background: rgba(0,0,0,.14);
      color: rgba(0,0,0,.65);
    }

    /* ===== Overlay click affordance ===== */
    #booking-panel-root .booking-panel-overlay{
      backdrop-filter: blur(1px);
    }

    /* ===== Slide-in animation ===== */
    #booking-panel-root .booking-panel-overlay{
      opacity: 0;
      pointer-events: none;
      transition: opacity .45s ease;
    }

    #booking-panel-root .booking-panel{
      border-top-left-radius: 24px;
      border-bottom-left-radius: 24px;
      overflow: hidden; /* 내부 배경 삐져나오는 거 방지 */
      box-shadow: -18px 0 40px rgba(0,0,0,.22);
    }

    #booking-panel-root .booking-panel{
      transform: translateX(110%);
      transition: transform .55s cubic-bezier(.22,1,.36,1);
      will-change: transform;
    }

    /* 열렸을 때 */
    #booking-panel-root.is-open .booking-panel-overlay{
      opacity: 1;
      pointer-events: auto;
    }

    #booking-panel-root.is-open .booking-panel{
      transform: translateX(0);
    }
    
    /* ===== Responsive ===== */
    @media (max-width: 520px){
      #booking-panel-root .booking-panel-body{ padding: 14px !important; }
      #booking-panel-root .form-row{ grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
}


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
