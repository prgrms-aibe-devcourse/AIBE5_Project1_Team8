export function getBookingPanelHTML() {
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
                      <input type="text" id="email" placeholder="example@email.com" required>
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
              </div>
            </div>

          </div>
        </div>
      </div>
    </aside>
    `;
}