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
      .logo-image {
        height: 40px;
        width: auto;
        margin-right: 10px;
        display: flex;
        align-items: center;
      }

      .logo-image img {
        height: 100%;
        width: auto;
        object-fit: contain;
      }

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
      .header-inner {
         display: flex;
         align-items: center; /* 요소들을 세로 중앙 정렬 */
      }

      .header-divider {
        width: 1px;
        height: 14px;
        background-color: #ccc; 
        margin-left: 20px;

        display: inline-block;
      }

      .user-greeting {
        margin-right: 15px;
        font-family: 'Pretendard', sans-serif;
        font-weight: 400;
      }
      .user-greeting strong {
        font-weight: 700;
        color: var(--navy-blue, #2f4157);
      }
  `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
    injectHeaderStyles();

    const header = document.querySelector('header');
    if (!header) return;

    header.innerHTML = `
  <div class="header-inner">
    <div class="logo" onclick="location.href='/'">LOGO</div>

      <!-- 메뉴 -->
      <nav class="nav">
        <a href="/index.html">홈</a>
        <a href="/pages/hotel/hotel.html">관광지</a>
        <a href="/pages/support.html">고객센터</a>
        <a href="/pages/schedule.html">나의 일정</a>
        <a href="/pages/mypage.html">마이 페이지</a>
      </nav>
    <span class="header-divider"></span>

    <div class="auth"></div>
  </div>
  `;
    header.classList.add('header');

    // 3. 로그인 상태 확인 (localStorage 활용)
    const authArea = header.querySelector('.auth');
    const isLoggedIn = localStorage.getItem('auth_isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('auth_user'));

    if (isLoggedIn && userData) {
        // [로그인 상태] 이름 표시 및 로그아웃 버튼
        authArea.innerHTML = `
      <span class="user-greeting" style="margin-right: 15px; font-size: 14px; color: #555;">
        <strong>${userData.name}</strong>님 환영합니다
      </span>
      <button class="logout-btn">Logout</button>
    `;

        // 로그아웃 이벤트
        authArea.querySelector('.logout-btn').addEventListener('click', () => {
            // 로그아웃 확인하는 confirm
            if (confirm('로그아웃 하시겠습니까?')) {
                localStorage.removeItem('auth_user');
                localStorage.removeItem('auth_isLoggedIn');

                // href 대신 replace를 쓰면 브라우저 히스토리에서 현재 페이지를 지워버려 더 깔끔
                window.location.replace('/index.html');
            }
        });
    } else {
        // [로그아웃 상태] 로그인 버튼
        authArea.innerHTML = `
      <button class="login-btn">Sign in / Register</button>
    `;

        // 로그인 페이지로 이동
        authArea.querySelector('.login-btn').addEventListener('click', () => {
            window.location.href = '/pages/auth/';
        });
    }
});
