import { showToast } from "../common/toast.js";

const dummyUsers = [
  {
    name: "Alex Kim",
    email: "alex.kim@test.com",
    username: "alex01",
    password: "password123!"
  },
  {
    name: "Jamie Lee",
    email: "jamie.lee@test.com",
    username: "jamie02",
    password: "qwerty789!"
  }
];

// 로그인 후 돌아갈 페이지를 URL에서 읽기
const urlParams = new URLSearchParams(window.location.search);
const redirectPage = urlParams.get("redirect") || "../index.html";

const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

const goRegister = document.getElementById("goRegister");
const goLogin = document.getElementById("goLogin");

function showLogin() {
  loginBox.classList.add("is-active");
  registerBox.classList.remove("is-active");
}

function showRegister() {
  registerBox.classList.add("is-active");
  loginBox.classList.remove("is-active");
}

goRegister.addEventListener("click", showRegister);
goLogin.addEventListener("click", showLogin);

const loginBtn = document.querySelector(".auth-login .primary-btn");

loginBtn.addEventListener("click", () => {
  const usernameInput = document.querySelector(".auth-login input[type='text']");
  const pwInput = document.querySelector(".auth-login input[type='password']");

  const inputUsername = usernameInput.value.trim();
  const inputPw = pwInput.value.trim();

  const matchedUser = dummyUsers.find(
    user => user.username === inputUsername && user.password === inputPw
  );

  if (matchedUser) {
    const authPayload = {
      username: matchedUser.username,
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem("auth_user", JSON.stringify(authPayload));
    localStorage.setItem("auth_isLoggedIn", "true");
    showToast("로그인 성공하였습니다", "success", 2000);
    //window.location.replace(redirectPage); // replace로 히스토리 제거 - 일단 주석처리
    setTimeout(() => {
      window.location.href = redirectPage;
    }, 800);
  } else {
    showToast("로그인에 실패했습니다", "error", 2000);
  }
});

// ===============================
// Register validation + create user
// ===============================

const registerBtn = document.querySelector(".auth-register .primary-btn");

registerBtn.addEventListener("click", () => {
  // REGISTER 폼 input 5개 (NAME, EMAIL, USERNAME(ID), PASSWORD, PASSWORD CONFIRM)
  const inputs = document.querySelectorAll(".auth-register .auth-input");
  const nameInput = inputs[0];
  const emailInput = inputs[1];
  const usernameInput = inputs[2];
  const pwInput = inputs[3];
  const pwConfirmInput = inputs[4];

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const username = usernameInput.value.trim();
  const password = pwInput.value;
  const passwordConfirm = pwConfirmInput.value;

  // 1) 빈 값 체크
  if (!name || !email || !username || !password || !passwordConfirm) {
    showToast("모든 항목을 입력해주세요.", "error", 2000);
    return;
  }

  // 2) 이메일 형식 체크 (input type="email" 기본 검증 활용)
  if (!emailInput.checkValidity()) {
    showToast("이메일 형식이 올바르지 않습니다.", "error", 2000);
    emailInput.focus();
    return;
  }

  // 3) Username 형식 체크: 4~20자, 영문/숫자/_/-, 공백 금지, 첫 글자 영문
  const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_-]{3,19}$/;
  if (!usernamePattern.test(username)) {
    showToast("Username은 4~20자 영문/숫자/_/-만 가능하며, 첫 글자는 영문이어야 합니다.", "error", 2500);
    usernameInput.focus();
    return;
  }

  // 4) Username 중복 체크
  const usernameExists = dummyUsers.some(user => user.username.toLowerCase() === username.toLowerCase());
  if (usernameExists) {
    showToast("이미 사용 중인 Username입니다.", "error", 2000);
    usernameInput.focus();
    return;
  }

  // 5) 비밀번호 최소 조건: 8자 이상
  if (password.length < 8) {
    showToast("비밀번호는 8자 이상이어야 합니다.", "error", 2000);
    pwInput.focus();
    return;
  }

  // 6) 비밀번호 확인 일치
  if (password !== passwordConfirm) {
    showToast("비밀번호 확인이 일치하지 않습니다.", "error", 2000);
    pwConfirmInput.focus();
    return;
  }

  // 통과: 더미 계정에 추가(메모리 상)
  // 해당 계정으로 로그인 시 크롬에서 경고(비밀번호 노출) 나와서, 일단 주석 처리
  // dummyUsers.push({ name, email, username, password }); 

  showToast("회원가입이 완료되었습니다.", "success", 2000);

  // 폼 비우기
  nameInput.value = "";
  emailInput.value = "";
  usernameInput.value = "";
  pwInput.value = "";
  pwConfirmInput.value = "";

  // 로그인 화면으로 전환
  showLogin();
});
