/* ================= DOM 요소 가져오기 ================= */
const calendarEl = document.getElementById("calendar"); // 캘린더 날짜들이 들어갈 영역
const monthTitle = document.getElementById("monthTitle"); // 상단 월 표시 텍스트
const scheduleList = document.getElementById("scheduleList"); // 선택한 날짜의 일정 리스트
const selectedDateTitle = document.getElementById("selectedDateTitle"); // 선택된 날짜 제목
const prevBtn = document.getElementById("prevMonth"); // 이전 달 버튼
const nextBtn = document.getElementById("nextMonth");  // 다음 달 버튼

/* ================= 상태 값 ================= */
let currentDate = new Date(); // 현재 보고 있는 달
let selectedDate = null; // 선택된 날짜 (yyyy-mm-dd)


/* ================= 일정 데이터 ================= */
// 날짜별 일정 목록     
const schedules = {
  "2026-01-20": [
    { title: "월미도 문화의거리", type: "tour" },
    { title: "개항장 루프탑 카페거리", type: "tour" }
  ],
  "2026-01-22": [
    { title: "여의도 한강공원", type: "tour" },
    { title: "북촌 한옥마을", type: "tour" },
    { title: "익선동 한옥거리", type: "tour" }
  ],
  "2026-03-20": [
    { title: "제주 신라호텔", type: "stay" },
    { title: "성산일출봉", type: "tour" },
    { title: "섭지코지", type: "tour" }
  ],
  "2026-03-21": [
    { title: "제주 신라호텔", type: "stay" }
  ],
  "2026-03-22": [
    { title: "제주 신라호텔", type: "stay" }
  ]
};

/* ================= 캘린더 렌더링 ================= */
function renderCalendar() {
    calendarEl.innerHTML = ""; // 기존 캘린더 초기화

    // 현재 기준 날짜 정보 가져오기
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthTitle.textContent = `${year}년 ${month + 1}월`;
    const firstDay = new Date(year, month, 1).getDay(); 
    const lastDate = new Date(year, month + 1, 0).getDate(); 

    // 시작 요일까지 빈 칸 채우기 -> 수요일 시작 달이라면  월(공백) 화(공백) 수(1)
    for (let i = 0; i < firstDay; i++) {
        calendarEl.appendChild(document.createElement("div"));
    }

    // 날짜 생성
    for (let day = 1; day <= lastDate; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const div = document.createElement("div");

        div.className = "calendar-day";
        div.textContent = day;

        if (schedules[dateStr]) div.classList.add("has-schedule");
        if (dateStr === selectedDate) div.classList.add("active");

        div.onclick = () => selectDate(dateStr, div);
        calendarEl.appendChild(div);
    }
}


/* ================= 날짜 선택 ================= */
function selectDate(dateStr, el) {
    document.querySelectorAll(".calendar-day").forEach(d => d.classList.remove("active"));
    el.classList.add("active");
    selectedDate = dateStr;
    selectedDateTitle.textContent = `${dateStr} 일정`;
    renderSchedule();
}


/* ================= 일정 렌더링 ================= */
function renderSchedule() {
    scheduleList.innerHTML = "";
    const list = schedules[selectedDate] || [];

    if (list.length === 0) {
        scheduleList.innerHTML = "<li>등록된 일정이 없어요 🌱</li>";
        return;
    }

    list.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "schedule-item";

        const label = item.type === "stay" ? "🏨 숙박" : "📍 관광";

        li.innerHTML = `
          <span class="schedule-type ${item.type}">${label}</span>
          <span class="schedule-title">${item.title}</span>
        `;

        // 일정 삭제 버튼 이벤트
        if (item.type === "tour") {
            const delBtn = document.createElement("button");
            delBtn.textContent = "삭제";
            delBtn.className = "delete-btn";
            delBtn.onclick = () => openDeleteModal(selectedDate, index); // 일정 제거 모달창 열기
            
            li.appendChild(delBtn);
        }

        scheduleList.appendChild(li);
    });
}


/* ================= 월 이동 ================= */
prevBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};
nextBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

/* ================= 최초 렌더링 ================= */
renderCalendar();