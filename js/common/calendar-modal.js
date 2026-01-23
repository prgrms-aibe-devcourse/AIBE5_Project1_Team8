// ===== Calendar Modal Module =====

class CalendarModal {
  constructor() {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.startDate = null;
    this.endDate = null;
    this.isSelectingEnd = false;
    this.onConfirm = null;
    this.placeName = "";
    this.placeData = null;

    this.createModal();
    this.bindEvents();
  }

  createModal() {
    const modalHTML = `
      <div class="calendar-modal-overlay" id="calendarModalOverlay" style="display: none;">
        <div class="calendar-modal">
          <div class="calendar-modal-header">
            <h3>일정 선택</h3>
          </div>
          <div class="calendar-modal-body">
            <div class="calendar-modal-nav">
              <button class="calendar-modal-nav-btn" id="calModalPrevMonth">&lt;</button>
              <div class="calendar-modal-selects">
                <select class="calendar-modal-select" id="calModalYearSelect"></select>
                <select class="calendar-modal-select" id="calModalMonthSelect"></select>
              </div>
              <button class="calendar-modal-nav-btn" id="calModalNextMonth">&gt;</button>
            </div>

            <div class="calendar-modal-weekdays">
              <div class="calendar-modal-weekday sun">일</div>
              <div class="calendar-modal-weekday">월</div>
              <div class="calendar-modal-weekday">화</div>
              <div class="calendar-modal-weekday">수</div>
              <div class="calendar-modal-weekday">목</div>
              <div class="calendar-modal-weekday">금</div>
              <div class="calendar-modal-weekday sat">토</div>
            </div>

            <div class="calendar-modal-grid" id="calModalGrid">
              <!-- Calendar days will be rendered here -->
            </div>

            <div class="calendar-modal-selected-info">
              <span class="calendar-modal-selected-text" id="calModalSelectedText">날짜를 선택해주세요</span>
            </div>
          </div>
          <div class="calendar-modal-footer">
            <button class="calendar-modal-btn calendar-modal-btn-cancel" id="calModalCancelBtn">취소</button>
            <button class="calendar-modal-btn calendar-modal-btn-confirm" id="calModalConfirmBtn" disabled>추가</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // DOM 요소 참조
    this.overlay = document.getElementById("calendarModalOverlay");
    this.yearSelect = document.getElementById("calModalYearSelect");
    this.monthSelect = document.getElementById("calModalMonthSelect");
    this.grid = document.getElementById("calModalGrid");
    this.selectedText = document.getElementById("calModalSelectedText");
    this.prevBtn = document.getElementById("calModalPrevMonth");
    this.nextBtn = document.getElementById("calModalNextMonth");
    this.cancelBtn = document.getElementById("calModalCancelBtn");
    this.confirmBtn = document.getElementById("calModalConfirmBtn");

    this.initSelects();
  }

  initSelects() {
    // 년도 선택 초기화
    this.yearSelect.innerHTML = "";
    for (let y = this.currentYear - 1; y <= this.currentYear + 3; y++) {
      const option = document.createElement("option");
      option.value = y;
      option.textContent = `${y}년`;
      if (y === this.currentYear) option.selected = true;
      this.yearSelect.appendChild(option);
    }

    // 월 선택 초기화
    this.monthSelect.innerHTML = "";
    for (let m = 0; m < 12; m++) {
      const option = document.createElement("option");
      option.value = m;
      option.textContent = `${m + 1}월`;
      if (m === this.currentMonth) option.selected = true;
      this.monthSelect.appendChild(option);
    }
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.changeMonth(-1));
    this.nextBtn.addEventListener("click", () => this.changeMonth(1));

    this.yearSelect.addEventListener("change", () => {
      this.currentYear = parseInt(this.yearSelect.value);
      this.renderCalendar();
    });

    this.monthSelect.addEventListener("change", () => {
      this.currentMonth = parseInt(this.monthSelect.value);
      this.renderCalendar();
    });

    this.cancelBtn.addEventListener("click", () => this.close());
    this.confirmBtn.addEventListener("click", () => this.confirm());

    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.overlay.style.display === "flex") {
        this.close();
      }
    });
  }

  changeMonth(delta) {
    this.currentMonth += delta;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.yearSelect.value = this.currentYear;
    this.monthSelect.value = this.currentMonth;
    this.renderCalendar();
  }

  renderCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();

    this.grid.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 이전 달 날짜들
    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const dayEl = this.createDayElement(day, true);
      this.grid.appendChild(dayEl);
    }

    // 현재 달 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      date.setHours(0, 0, 0, 0);
      const isToday = date.getTime() === today.getTime();
      const dayOfWeek = date.getDay();
      const isPast = date < today;

      const dayEl = this.createDayElement(day, false, date, isToday, dayOfWeek, isPast);
      this.grid.appendChild(dayEl);
    }

    // 다음 달 날짜들
    const totalCells = startDay + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let day = 1; day <= remainingCells; day++) {
      const dayEl = this.createDayElement(day, true);
      this.grid.appendChild(dayEl);
    }
  }

  createDayElement(day, isOtherMonth, date = null, isToday = false, dayOfWeek = 0, isPast = false) {
    const dayEl = document.createElement("div");
    dayEl.className = "calendar-modal-day";
    dayEl.textContent = day;

    if (isOtherMonth) {
      dayEl.classList.add("other-month");
      return dayEl;
    }

    if (isToday) {
      dayEl.classList.add("today");
    }

    if (dayOfWeek === 0) {
      dayEl.classList.add("sun");
    } else if (dayOfWeek === 6) {
      dayEl.classList.add("sat");
    }

    // 범위 선택 스타일 적용
    if (this.startDate && this.endDate && date) {
      const start = this.startDate.getTime();
      const end = this.endDate.getTime();
      const current = date.getTime();

      if (start === end && current === start) {
        dayEl.classList.add("range-single");
      } else if (current === start) {
        dayEl.classList.add("range-start");
      } else if (current === end) {
        dayEl.classList.add("range-end");
      } else if (current > start && current < end) {
        dayEl.classList.add("in-range");
      }
    } else if (this.startDate && !this.endDate && date) {
      if (date.getTime() === this.startDate.getTime()) {
        dayEl.classList.add("selected");
      }
    }

    // 클릭 이벤트
    if (!isOtherMonth && !isPast && date) {
      dayEl.addEventListener("click", () => this.selectDate(date));
    } else if (isPast) {
      dayEl.style.opacity = "0.4";
      dayEl.style.cursor = "not-allowed";
    }

    return dayEl;
  }

  selectDate(date) {
    if (!this.startDate || (this.startDate && this.endDate)) {
      // 첫 번째 선택 또는 리셋
      this.startDate = date;
      this.endDate = null;
      this.isSelectingEnd = true;
    } else if (this.isSelectingEnd) {
      // 두 번째 선택
      if (date < this.startDate) {
        // 선택한 날짜가 시작일보다 이전이면 시작일로 설정
        this.endDate = this.startDate;
        this.startDate = date;
      } else {
        this.endDate = date;
      }
      this.isSelectingEnd = false;
    }

    this.updateSelectedText();
    this.renderCalendar();
    this.updateConfirmButton();
  }

  updateSelectedText() {
    if (!this.startDate) {
      this.selectedText.textContent = "날짜를 선택해주세요";
    } else if (!this.endDate) {
      this.selectedText.innerHTML = `<span class="calendar-modal-selected-date">${this.formatDate(this.startDate)}</span> ~ 종료일 선택`;
    } else {
      if (this.startDate.getTime() === this.endDate.getTime()) {
        this.selectedText.innerHTML = `<span class="calendar-modal-selected-date">${this.formatDate(this.startDate)}</span>`;
      } else {
        this.selectedText.innerHTML = `<span class="calendar-modal-selected-date">${this.formatDate(this.startDate)}</span> ~ <span class="calendar-modal-selected-date">${this.formatDate(this.endDate)}</span>`;
      }
    }
  }

  updateConfirmButton() {
    this.confirmBtn.disabled = !this.startDate;
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }

  formatDateISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  open(placeName, placeData, callback) {
    this.placeName = placeName;
    this.placeData = placeData;
    this.onConfirm = callback;

    // 리셋
    this.startDate = null;
    this.endDate = null;
    this.isSelectingEnd = false;
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();

    this.initSelects();
    this.updateSelectedText();
    this.updateConfirmButton();
    this.renderCalendar();

    this.overlay.style.display = "flex";
  }

  close() {
    this.overlay.style.display = "none";
    this.startDate = null;
    this.endDate = null;
    this.placeName = "";
    this.placeData = null;
    this.onConfirm = null;
  }

  confirm() {
    if (!this.startDate) return;

    // 종료일이 없으면 시작일과 동일하게 설정
    if (!this.endDate) {
      this.endDate = new Date(this.startDate);
    }

    const scheduleData = {
      id: Date.now(),
      name: this.placeName,
      startDate: this.formatDateISO(this.startDate),
      endDate: this.formatDateISO(this.endDate),
      ...this.placeData
    };

    // 기존 일정에 추가
    const schedules = JSON.parse(localStorage.getItem("mySchedules")) || [];

    // 중복 체크 (같은 이름, 같은 기간)
    const exists = schedules.some(s =>
      s.name === scheduleData.name &&
      s.startDate === scheduleData.startDate &&
      s.endDate === scheduleData.endDate
    );

    if (exists) {
      alert("이미 같은 기간에 동일한 일정이 있습니다.");
      return;
    }

    schedules.push(scheduleData);
    localStorage.setItem("mySchedules", JSON.stringify(schedules));

    if (this.onConfirm) {
      this.onConfirm(scheduleData);
    }

    alert(`"${this.placeName}" 일정이 추가되었습니다!\n기간: ${this.formatDate(this.startDate)}${this.endDate && this.startDate.getTime() !== this.endDate.getTime() ? ` ~ ${this.formatDate(this.endDate)}` : ""}`);

    this.close();
  }
}

// 전역 인스턴스 생성
const calendarModal = new CalendarModal();
