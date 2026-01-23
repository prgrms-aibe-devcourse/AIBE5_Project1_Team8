// 나중에 실제 로직으로 교체 -> 로그인 상태 여부 브라우저 DB에 저장하고 가져오는 방식으로
const isLoggedIn = true; // true면 로그인 상태

const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');

/* 로그인 상태에 따른 버튼 노출 제어 */
if (isLoggedIn) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
} else {
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
}


/* 로그인 버튼 이벤트 (로그인 페이지) */
loginBtn.addEventListener('click', () => {
  window.location.href = './html/auth.html';
});

/* 로그아웃 버튼 이벤트  (로그아웃 처리 후 메인) */
logoutBtn.addEventListener('click', () => {
  // 브라우저 내장 DB에서 로그인 상태 여부 수정 로직
  window.location.href = './html/index.html';
});