import { checkAuth } from '../auth/auth-guard.js'; // 사용자 로그인 정보 가져오기

// 가드 로직으로 로그인 여부 먼저 확인
if (checkAuth()) {
    // 1. localStorage에서 유저 정보 가져오기
    const loggedInUser = JSON.parse(localStorage.getItem('auth_user'));

    // 2. DOM이 로드된 후 닉네임 표시 및 일정 로드
    document.addEventListener('DOMContentLoaded', async () => {
        if (loggedInUser && loggedInUser.name) {
            const nicknameEl = document.querySelector('.nickname');
            if (nicknameEl) {
                nicknameEl.textContent = loggedInUser.name;
            }
        }

        // Firebase에서 일정 데이터 로드
        await loadSchedulesFromFirebase();
    });

    /* ================= DOM 요소 가져오기 ================= */
    const calendarEl = document.getElementById('calendar'); // 캘린더 날짜들이 들어갈 영역
    const monthTitle = document.getElementById('monthTitle'); // 상단 월 표시 텍스트
    const scheduleList = document.getElementById('scheduleList'); // 선택한 날짜의 일정 리스트
    const selectedDateTitle = document.getElementById('selectedDateTitle'); // 선택된 날짜 제목
    const prevBtn = document.getElementById('prevMonth'); // 이전 달 버튼
    const nextBtn = document.getElementById('nextMonth'); // 다음 달 버튼

    /* ================= 상태 값 ================= */
    let currentDate = new Date(); // 현재 보고 있는 달
    let selectedDate = null; // 선택된 날짜 (yyyy-mm-dd)

    /* ================= 일정 데이터 ================= */
    // 날짜별 일정 목록 (Firebase에서 동적으로 로드)
    let schedules = {};
    window.schedules = schedules; // 전역 접근을 위한 참조

    /* ================= Firebase에서 일정 데이터 가져오기 ================= */
    async function loadSchedulesFromFirebase() {
        try {
            const { db } = await import('../common/firebase-config.js');
            const { collection, query, where, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

            const userId = loggedInUser?.username || loggedInUser?.uid;
            if (!userId) {
                console.warn('사용자 ID를 찾을 수 없습니다.');
                schedules = {};
                renderCalendar();
                return;
            }

            // 사용자별 일정 가져오기
            const schedulesRef = collection(db, 'schedules');
            const q = query(schedulesRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            // 일정 데이터 초기화
            schedules = {};
            window.schedules = schedules; // 전역 참조 업데이트

            // Firebase 데이터를 날짜별로 그룹화
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const scheduleItem = {
                    id: doc.id, // Firebase 문서 ID
                    title: data.name || '',
                    type: data.type === 'hotel' ? 'stay' : 'tour', // hotel -> stay, 나머지 -> tour
                    startDate: data.startDate,
                    endDate: data.endDate,
                    ...data // 기타 데이터 (image, location, contact 등)
                };

                // 시작일부터 종료일까지 모든 날짜에 일정 추가
                const start = new Date(data.startDate);
                const end = new Date(data.endDate);

                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                    
                    if (!schedules[dateStr]) {
                        schedules[dateStr] = [];
                    }
                    schedules[dateStr].push(scheduleItem);
                }
            });

            console.log('Firebase에서 일정 로드 완료:', schedules);
            window.schedules = schedules; // 전역 참조 업데이트
            renderCalendar();
            
            // 선택된 날짜가 있으면 일정 리스트도 업데이트
            if (selectedDate) {
                renderSchedule();
            }
        } catch (error) {
            console.error('일정 데이터 로드 실패:', error);
            schedules = {};
            window.schedules = schedules; // 전역 참조 업데이트
            renderCalendar();
        }
    }

    /* ================= 캘린더 렌더링 ================= */
    function renderCalendar() {
        calendarEl.innerHTML = ''; // 기존 캘린더 초기화

        // 현재 기준 날짜 정보 가져오기
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        monthTitle.textContent = `${year}년 ${month + 1}월`;
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // 시작 요일까지 빈 칸 채우기 -> 수요일 시작 달이라면  월(공백) 화(공백) 수(1)
        for (let i = 0; i < firstDay; i++) {
            calendarEl.appendChild(document.createElement('div'));
        }

        // 날짜 생성
        for (let day = 1; day <= lastDate; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(
                2,
                '0',
            )}-${String(day).padStart(2, '0')}`;
            const div = document.createElement('div');

            div.className = 'calendar-day';
            div.textContent = day;

            if (schedules[dateStr]) div.classList.add('has-schedule');
            if (dateStr === selectedDate) div.classList.add('active');

            div.onclick = () => selectDate(dateStr, div);
            calendarEl.appendChild(div);
        }
    }

    /* ================= 날짜 선택 ================= */
    function selectDate(dateStr, el) {
        document
            .querySelectorAll('.calendar-day')
            .forEach((d) => d.classList.remove('active'));
        el.classList.add('active');
        selectedDate = dateStr;
        selectedDateTitle.textContent = `${dateStr} 일정`;
        renderSchedule();
    }

    /* ================= 일정 렌더링 ================= */
    function renderSchedule() {
        scheduleList.innerHTML = '';
        const list = schedules[selectedDate] || [];

        if (list.length === 0) {
            scheduleList.innerHTML = '<li>등록된 일정이 없어요 🌱</li>';
            return;
        }

        list.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'schedule-item';

            const label = item.type === 'stay' ? '🏨 숙박' : '📍 관광';

            li.innerHTML = `
          <span class="schedule-type ${item.type}">${label}</span>
          <span class="schedule-title">${item.title}</span>
        `;

            // 일정 삭제 버튼 이벤트 (모든 타입에 대해 삭제 가능)
            const delBtn = document.createElement('button');
            delBtn.textContent = '삭제';
            delBtn.className = 'delete-btn';
            delBtn.onclick = () => openDeleteModal(selectedDate, index, item.id); // 일정 제거 모달창 열기 (Firebase 문서 ID 전달)

            li.appendChild(delBtn);

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

    // 전역에서 함수들 접근 가능하도록
    window.loadSchedulesFromFirebase = loadSchedulesFromFirebase;
    window.renderCalendar = renderCalendar;
    window.renderSchedule = renderSchedule;
}
