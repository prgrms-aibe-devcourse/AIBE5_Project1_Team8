const modal = document.getElementById("deleteModal");

let deleteTarget = {
  date: null,
  index: null,
  scheduleId: null // Firebase 문서 ID
};

// 모달 열기
function openDeleteModal(date, index, scheduleId = null) {
  deleteTarget.date = date;
  deleteTarget.index = index;
  deleteTarget.scheduleId = scheduleId;
  modal.style.display = "flex";
}

// 취소
document.querySelector(".btn-cancel").onclick = () => {
  modal.style.display = "none";
  deleteTarget.date = null;
  deleteTarget.index = null;
  deleteTarget.scheduleId = null;
};

// 삭제 확정
document.querySelector(".btn-confirm").onclick = async () => {
  const { date, index, scheduleId } = deleteTarget;

  if (date && index !== null) {
    try {
      // Firebase에서 삭제
      if (scheduleId) {
        const { db } = await import('../common/firebase-config.js');
        const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        await deleteDoc(doc(db, 'schedules', scheduleId));
        console.log('Firebase에서 일정 삭제 완료:', scheduleId);
      }

      // 로컬 데이터에서도 삭제
      if (window.schedules && window.schedules[date]) {
        window.schedules[date].splice(index, 1);

        if (window.schedules[date].length === 0) {
          delete window.schedules[date];
        }
      }

      // Firebase에서 다시 일정 로드 (동기화)
      if (typeof window.loadSchedulesFromFirebase === 'function') {
        await window.loadSchedulesFromFirebase();
      } else {
        // 함수가 없으면 로컬 렌더링만
        if (typeof window.renderSchedule === 'function') {
          window.renderSchedule();
        }
        if (typeof window.renderCalendar === 'function') {
          window.renderCalendar();
        }
      }
      
      alert('일정이 삭제되었습니다.');
    } catch (error) {
      console.error('일정 삭제 실패:', error);
      alert('일정 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }

  modal.style.display = "none";
  deleteTarget.date = null;
  deleteTarget.index = null;
  deleteTarget.scheduleId = null;
};
