/* =====================
   FAQ 토글
===================== */
document.querySelectorAll('.card.flex-between').forEach(card => {
  card.addEventListener('click', () => {
    // 이미 열린 FAQ 닫기
    document.querySelectorAll('.faq-container').forEach(openFaq => {
      openFaq.remove();
    });

    // FAQ 컨테이너 생성
    const faq = document.createElement('div');
    faq.className = 'card faq-container';

    faq.innerHTML = `
      <div class="faq-question">
        <span>Q. 자주 묻는 질문</span>
        <span class="icon-up"></span>
      </div>
      <div class="faq-answer">
        A. 질문에 대한 답변입니다. 실제 서비스에서는 서버 데이터로 치환됩니다.
      </div>
    `;

    // 클릭한 질문 바로 아래에 삽입
    card.after(faq);
  });
});


/* =====================
   상단 FAQ 탭 활성화
===================== */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});


/* =====================
   문의내역 하단 탭 활성화
===================== */
document.querySelectorAll('.tab-under').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab-under').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* =====================
   1:1 문의 모달 제어 (안전형)
===================== */
// 페이지가 완전히 로드된 후 실행되도록 감쌉니다.
window.onload = function() {
    const modal = document.getElementById('inquiryModal');
    const openBtn = document.querySelector('.btn-absolute'); // '1:1 문의하기' 버튼
    const closeBtn = document.querySelector('.close-modal');

    // [확인용] 버튼이 제대로 잡혔는지 확인
    if(!openBtn) {
        console.error("1:1 문의하기 버튼(.btn-absolute)을 찾을 수 없습니다.");
        return;
    }

    // 1. 모달 열기
    openBtn.onclick = function() {
        console.log("문의하기 버튼 클릭됨!");
        modal.style.display = 'flex'; // CSS에서 숨긴 모달을 flex로 변경하여 표시
    };

    // 2. X 버튼으로 닫기
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // 3. 배경 클릭 시 닫기
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
};



