import { showToast } from "../common/toast.js";

/**
 * 로그인이 필요한 페이지인지 확인하고, 비로그인 시 인증 페이지로 튕겨냅니다.
 */
export function checkAuth() {
  const isLoggedIn = localStorage.getItem("auth_isLoggedIn") === "true";

  if (!isLoggedIn) {
    // 1. 현재 페이지 주소를 기억해둡니다 (로그인 후 다시 돌아오기 위함)
    const currentPath = window.location.pathname;
    const searchParams = window.location.search;
    const redirectUrl = encodeURIComponent(currentPath + searchParams);

    // 2. 알림 메시지 출력
    alert("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.");

    // 3. 인증 페이지로 리다이렉트 (redirect 파라미터 포함)
    window.location.href = `/pages/auth/?redirect=${redirectUrl}`;
    return false;
  }
  return true;
}