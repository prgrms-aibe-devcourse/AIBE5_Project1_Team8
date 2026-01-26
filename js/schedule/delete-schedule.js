const modal = document.getElementById("deleteModal");

let deleteTarget = {
  date: null,
  index: null
};

// 모달 열기
function openDeleteModal(date, index) {
  deleteTarget.date = date;
  deleteTarget.index = index;
  modal.style.display = "flex";
}

// 취소
document.querySelector(".btn-cancel").onclick = () => {
  modal.style.display = "none";
  deleteTarget.date = null;
  deleteTarget.index = null;
};

// 삭제 확정
document.querySelector(".btn-confirm").onclick = () => {
  const { date, index } = deleteTarget;

  if (date && index !== null) {
    schedules[date].splice(index, 1);

    if (schedules[date].length === 0) {
      delete schedules[date];
    }

    renderSchedule();
    renderCalendar(); // 캘린더 색 갱신
  }

  modal.style.display = "none";
};
