// ===== 상태 관리 =====
let schedules = [];
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let selectedSchedule = null;

// ===== DOM 요소 =====
const yearSelect = document.getElementById("yearSelect");
const monthSelect = document.getElementById("monthSelect");
const calendarGrid = document.getElementById("calendarGrid");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

const scheduleList = document.getElementById("scheduleList");
const scheduleCount = document.getElementById("scheduleCount");
const emptyState = document.getElementById("emptyState");

const scheduleDetailModal = document.getElementById("scheduleDetailModal");
const detailName = document.getElementById("detailName");
const detailPeriod = document.getElementById("detailPeriod");
const detailLocation = document.getElementById("detailLocation");
const closeDetailBtn = document.getElementById("closeDetailBtn");
const deleteScheduleBtn = document.getElementById("deleteScheduleBtn");

const deleteModal = document.getElementById("deleteModal");
const deletePlaceName = document.getElementById("deletePlaceName");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

// ===== 일정 로드/저장 =====
function loadSchedules() {
  const stored = localStorage.getItem("mySchedules");
  if (stored) {
    schedules = JSON.parse(stored);
  }
}

function saveSchedules() {
  localStorage.setItem("mySchedules", JSON.stringify(schedules));
}

// ===== 년도/월 선택 초기화 =====
function initSelects() {
  // 년도 선택 (현재 년도 기준 ±5년)
  yearSelect.innerHTML = "";
  for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = `${y}년`;
    if (y === currentYear) option.selected = true;
    yearSelect.appendChild(option);
  }

  // 월 선택
  monthSelect.innerHTML = "";
  for (let m = 0; m < 12; m++) {
    const option = document.createElement("option");
    option.value = m;
    option.textContent = `${m + 1}월`;
    if (m === currentMonth) option.selected = true;
    monthSelect.appendChild(option);
  }
}

// ===== 캘린더 렌더링 =====
function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // 이전 달의 마지막 날짜들
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();

  calendarGrid.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 이전 달 날짜들
  for (let i = startDay - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const dayEl = createDayElement(day, true, null);
    calendarGrid.appendChild(dayEl);
  }

  // 현재 달 날짜들
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isToday = date.getTime() === today.getTime();
    const dayOfWeek = date.getDay();

    // 해당 날짜의 일정 확인
    const daySchedules = getSchedulesForDate(date);

    const dayEl = createDayElement(day, false, daySchedules, isToday, dayOfWeek, date);
    calendarGrid.appendChild(dayEl);
  }

  // 다음 달 날짜들 (6주 맞춤)
  const totalCells = startDay + daysInMonth;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let day = 1; day <= remainingCells; day++) {
    const dayEl = createDayElement(day, true, null);
    calendarGrid.appendChild(dayEl);
  }

  // 년/월 선택 업데이트
  yearSelect.value = currentYear;
  monthSelect.value = currentMonth;
}

// ===== 날짜 요소 생성 =====
function createDayElement(day, isOtherMonth, daySchedules, isToday = false, dayOfWeek = 0, date = null) {
  const dayEl = document.createElement("div");
  dayEl.className = "calendar-day";

  if (isOtherMonth) {
    dayEl.classList.add("other-month");
  }

  if (isToday) {
    dayEl.classList.add("today");
  }

  if (dayOfWeek === 0) {
    dayEl.classList.add("sun");
  } else if (dayOfWeek === 6) {
    dayEl.classList.add("sat");
  }

  // 일정 스타일 적용
  if (daySchedules && daySchedules.length > 0) {
    dayEl.classList.add("has-schedule");

    // 첫 번째 일정의 시작/종료일 확인
    const schedule = daySchedules[0];
    const startDate = new Date(schedule.startDate);
    const endDate = new Date(schedule.endDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    if (startDate.getTime() === endDate.getTime()) {
      dayEl.classList.add("schedule-single");
    } else if (currentDate.getTime() === startDate.getTime()) {
      dayEl.classList.add("schedule-start");
    } else if (currentDate.getTime() === endDate.getTime()) {
      dayEl.classList.add("schedule-end");
    } else {
      dayEl.classList.add("schedule-middle");
    }
  }

  dayEl.innerHTML = `
    <span class="day-number">${day}</span>
    ${daySchedules && daySchedules.length > 0 ? `
      <div class="day-schedules">
        ${daySchedules.slice(0, 2).map(s => `
          <span class="day-schedule-name">${s.name}</span>
        `).join("")}
      </div>
    ` : ""}
  `;

  // 일정이 있는 날짜 클릭 시 상세 보기
  if (daySchedules && daySchedules.length > 0) {
    dayEl.addEventListener("click", () => {
      showScheduleDetail(daySchedules[0]);
    });
  }

  return dayEl;
}

// ===== 특정 날짜의 일정 조회 =====
function getSchedulesForDate(date) {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  return schedules.filter(schedule => {
    if (!schedule.startDate || !schedule.endDate) return false;

    const startDate = new Date(schedule.startDate);
    const endDate = new Date(schedule.endDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    return targetDate >= startDate && targetDate <= endDate;
  });
}

// ===== 일정 목록 렌더링 =====
function renderScheduleList() {
  // 날짜가 있는 일정만 필터링하고 시작일 기준 정렬
  const sortedSchedules = schedules
    .filter(s => s.startDate && s.endDate)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  scheduleCount.textContent = `${sortedSchedules.length}개의 일정`;

  if (sortedSchedules.length === 0) {
    scheduleList.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  scheduleList.style.display = "flex";
  emptyState.style.display = "none";

  scheduleList.innerHTML = sortedSchedules.map(schedule => {
    const startDate = formatDate(schedule.startDate);
    const endDate = formatDate(schedule.endDate);
    const period = startDate === endDate ? startDate : `${startDate} ~ ${endDate}`;

    return `
      <div class="schedule-item" data-id="${schedule.id}">
        <div class="schedule-item-color"></div>
        <div class="schedule-item-image">
          <img src="${schedule.image}" alt="${schedule.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect fill=%22%23e0e0e0%22 width=%2260%22 height=%2260%22/%3E%3C/svg%3E'">
        </div>
        <div class="schedule-item-info">
          <div class="schedule-item-name">${schedule.name}</div>
          <div class="schedule-item-period">${period}</div>
          <div class="schedule-item-location">${schedule.location || ""}</div>
        </div>
        <button class="schedule-item-delete" data-id="${schedule.id}">×</button>
      </div>
    `;
  }).join("");

  // 이벤트 리스너 추가
  document.querySelectorAll(".schedule-item").forEach(item => {
    item.addEventListener("click", (e) => {
      if (!e.target.classList.contains("schedule-item-delete")) {
        const scheduleId = parseInt(item.dataset.id);
        const schedule = schedules.find(s => s.id === scheduleId);
        if (schedule) {
          showScheduleDetail(schedule);
        }
      }
    });
  });

  document.querySelectorAll(".schedule-item-delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const scheduleId = parseInt(btn.dataset.id);
      const schedule = schedules.find(s => s.id === scheduleId);
      if (schedule) {
        showDeleteConfirm(schedule);
      }
    });
  });
}

// ===== 날짜 포맷팅 =====
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

// ===== 일정 상세 보기 =====
function showScheduleDetail(schedule) {
  selectedSchedule = schedule;

  detailName.textContent = schedule.name;
  detailPeriod.textContent = schedule.startDate === schedule.endDate
    ? formatDate(schedule.startDate)
    : `${formatDate(schedule.startDate)} ~ ${formatDate(schedule.endDate)}`;
  detailLocation.textContent = schedule.location || "위치 정보 없음";

  scheduleDetailModal.style.display = "flex";
}

// ===== 삭제 확인 모달 =====
function showDeleteConfirm(schedule) {
  selectedSchedule = schedule;
  deletePlaceName.textContent = schedule.name;
  scheduleDetailModal.style.display = "none";
  deleteModal.style.display = "flex";
}

// ===== 일정 삭제 =====
function deleteSchedule() {
  if (!selectedSchedule) return;

  schedules = schedules.filter(s => s.id !== selectedSchedule.id);
  saveSchedules();
  renderCalendar();
  renderScheduleList();
  closeModals();
}

// ===== 모달 닫기 =====
function closeModals() {
  scheduleDetailModal.style.display = "none";
  deleteModal.style.display = "none";
  selectedSchedule = null;
}

// ===== 이벤트 리스너 =====
prevMonthBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

yearSelect.addEventListener("change", () => {
  currentYear = parseInt(yearSelect.value);
  renderCalendar();
});

monthSelect.addEventListener("change", () => {
  currentMonth = parseInt(monthSelect.value);
  renderCalendar();
});

closeDetailBtn.addEventListener("click", closeModals);
deleteScheduleBtn.addEventListener("click", () => {
  if (selectedSchedule) {
    showDeleteConfirm(selectedSchedule);
  }
});

cancelDeleteBtn.addEventListener("click", closeModals);
confirmDeleteBtn.addEventListener("click", deleteSchedule);

// 모달 외부 클릭 시 닫기
scheduleDetailModal.addEventListener("click", (e) => {
  if (e.target === scheduleDetailModal) {
    closeModals();
  }
});

deleteModal.addEventListener("click", (e) => {
  if (e.target === deleteModal) {
    closeModals();
  }
});

// ESC 키로 모달 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModals();
  }
});

// ===== 초기화 =====
loadSchedules();
initSelects();
renderCalendar();
renderScheduleList();
