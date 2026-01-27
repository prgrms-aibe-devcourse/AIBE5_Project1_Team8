export function ensureBookingPanelBaseStyle() {
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