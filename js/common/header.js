// ------------------------------------------------
// Header 동적 생성
// ------------------------------------------------

// Header CSS 스타일 동적 삽입
function injectHeaderStyles() {
  // 이미 스타일이 삽입되었는지 확인
  if (document.getElementById('header-styles')) {
      return;
  }

  const style = document.createElement('style');
  style.id = 'header-styles';
  style.textContent = `
      /* 헤더 전체 */
      .header {
        position: fixed; /*상단 고정*/
        top: 0;
        left: 0;
        width: 100%;
        height: 64px;
        background-color: #ffffff;
        border-bottom: 1px solid #e5e5e5;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      /* 헤더가 fixed이므로 body에 padding-top 추가 */
      body {
        padding-top: 64px;
      }

      /* 헤더 내부 컨테이너 */
      .header-inner {
        max-width: 1200px;
        height: 100%;
        margin: 0 auto;
        padding: 0 20px;

        display: flex;
        align-items: center;
      }

      /* 로고 */
      .logo {
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
        margin-right: auto; /* 로고를 좌측에 고정 */
        color: var(--navy-blue, #2f4157);
        transition: opacity 0.2s;
      }

      .logo:hover {
        opacity: 0.8;
      }

      /* 네비게이션 */
      .nav {
        display: flex;
        gap: 40px; /*단일 메뉴 간 간격*/
      }

      .nav a {
        font-family: 'Noto Sans KR', sans-serif;
        text-decoration: none;
        color: #333333; 
        font-size: 14px;
        font-weight: 500;
      }

      .nav a:hover {
        color: #B93920;
      }

      /* 로그인&아웃 영역 */
      .auth {
        display: flex;
        align-items: center;
        margin-left: 24px; /* 메뉴바와 간격 */
      }

      /* 로그인&아웃 버튼 */
      .login-btn,
      .logout-btn {
        padding: 8px 14px;

        font-family: 'Noto Sans KR', sans-serif;
        font-size: 14px;
        font-weight: 300;
        border-radius: 30px;
        cursor: pointer;

        border: 1px solid #B93920;
        background-color: #B93920;
        color: #fff;
        transition: background-color 0.2s, border-color 0.2s;
      }

      .login-btn:hover,
      .logout-btn:hover {
        background-color: #9E2F19;
        border-color: #9E2F19;
      }
  `;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
  // CSS 스타일 먼저 삽입
  injectHeaderStyles();
  
  const header = document.querySelector('header');
  if (header) {
    header.innerHTML = `
    <div class="header-inner">

      <!-- 로고 -->
      <div class="logo">LOGO</div>

      <!-- 메뉴 -->
      <nav class="nav">
        <a href="/index.html">홈</a>
        <a href="/pages/hotel/hotel.html">관광지</a>
        <a href="/pages/support.html">고객센터</a>
        <a href="/pages/my-schedule.html">나의 일정</a>
        <a href="/pages/mypage.html">마이 페이지</a>
      </nav>

      <!-- 로그인 / 로그아웃 -->
      <div class="auth">
        <!-- 로그아웃 상태일 때(기본값) -->
        <button class="login-btn">Sign in / Register</button>

        <!-- 로그인 상태일 때 -->
        <button class="logout-btn">Logout</button>
      </div>

    </div>
    `;
    header.classList.add('header');

    // 나중에 실제 로직으로 교체 -> 로그인 상태 여부 브라우저 DB에 저장하고 가져오는 방식으로
    const isLoggedIn = true; // true면 로그인 상태

    const loginBtn = document.querySelector('.login-btn');
    const logoutBtn = document.querySelector('.logout-btn');

    /* 로그인 상태에 따른 버튼 노출 제어 */
    if (isLoggedIn) {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    } else {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
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
  }
});
