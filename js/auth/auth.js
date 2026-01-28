// ------------------------------------------------
// Firebase 설정 및 모듈 가져오기
// ------------------------------------------------
import { db } from '../common/firebase-config.js';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { showToast } from '../common/toast.js';

const isLoggedIn = localStorage.getItem('auth_isLoggedIn') === 'true';
if (isLoggedIn) {
    // 이미 로그인된 상태라면 메인으로 즉시 튕겨냅니다.
    window.location.replace('/index.html');
}

// 로그인 후 돌아갈 페이지 설정
const urlParams = new URLSearchParams(window.location.search);
const redirectPage = urlParams.get('redirect') || '/index.html';

const loginBox = document.getElementById('loginBox');
const registerBox = document.getElementById('registerBox');
const goRegister = document.getElementById('goRegister');
const goLogin = document.getElementById('goLogin');

// 화면 전환 함수
function showLogin() {
    loginBox.classList.add('is-active');
    registerBox.classList.remove('is-active');
}
function showRegister() {
    registerBox.classList.add('is-active');
    loginBox.classList.remove('is-active');
}

goRegister.addEventListener('click', showRegister);
goLogin.addEventListener('click', showLogin);

// ------------------------------------------------
// 2. 로그인 로직 (Firestore 조회)
// ------------------------------------------------
const loginBtn = document.querySelector('.auth-login .primary-btn');

loginBtn.addEventListener('click', async () => {
    const usernameInput = document.querySelector(
        ".auth-login input[type='text']",
    );
    const pwInput = document.querySelector(
        ".auth-login input[type='password']",
    );

    const inputUsername = usernameInput.value.trim();
    const inputPw = pwInput.value.trim();

    if (!inputUsername || !inputPw) {
        showToast('아이디와 비밀번호를 입력해주세요.', 'error');
        return;
    }

    try {
        // Firestore에서 아이디와 비밀번호가 일치하는 사용자 찾기
        const q = query(
            collection(db, 'users'),
            where('username', '==', inputUsername),
            where('password', '==', inputPw),
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // 로그인 성공
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            // 세션 유지용 데이터 저장 -> localStorage (마이페이지/리뷰에서 사용)
            const authPayload = {
                uid: userDoc.id, // Firestore 문서 ID
                username: userData.username,
                name: userData.name, // 실제 이름
                email: userData.email, // 이메일
                phone: userData.phone || '010-0000-0000', // 전화번호 필드가 있다면 추가
                profileImg:
                    userData.profileImg || '/images/default_profile.png',
                loggedInAt: new Date().toISOString(),
            };

            localStorage.setItem('auth_user', JSON.stringify(authPayload));
            localStorage.setItem('auth_isLoggedIn', 'true');

            showToast(`${userData.name}님, 반가워요!`, 'success', 1800);
            setTimeout(() => {
                // 인코딩된 주소를 다시 일반 주소로 변환해서 이동합니다.
                window.location.replace(decodeURIComponent(redirectPage));
            }, 800);
        } else {
            showToast('아이디 또는 비밀번호가 일치하지 않습니다.', 'error');
        }
    } catch (error) {
        console.error('로그인 에러:', error);
        showToast('로그인 중 오류가 발생했습니다.', 'error');
    }
});

// ------------------------------------------------
// 3. 회원가입 로직 (Firestore 저장)
// ------------------------------------------------
const registerBtn = document.querySelector('.auth-register .primary-btn');

registerBtn.addEventListener('click', async () => {
    const inputs = document.querySelectorAll('.auth-register .auth-input');
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const username = inputs[2].value.trim();
    const password = inputs[3].value;
    const passwordConfirm = inputs[4].value;

    // 기본 유효성 검사 (우현님 기존 로직 활용)
    if (!name || !email || !username || !password || !passwordConfirm) {
        showToast('모든 항목을 입력해주세요.', 'error');
        return;
    }

    if (password !== passwordConfirm) {
        showToast('비밀번호 확인이 일치하지 않습니다.', 'error');
        return;
    }

    try {
        // [중요] 중복 아이디 체크
        const q = query(
            collection(db, 'users'),
            where('username', '==', username),
        );
        const checkSnapshot = await getDocs(q);

        if (!checkSnapshot.empty) {
            showToast('이미 사용 중인 Username입니다.', 'error');
            return;
        }

        // Firestore에 사용자 생성
        await addDoc(collection(db, 'users'), {
            name,
            email,
            username,
            password, // 주의: 실제 서비스에선 암호화 필요 -> 해시함수 등.
            createdAt: serverTimestamp(),
        });

        showToast(
            '회원가입이 완료되었습니다! 로그인해주세요.',
            'success',
            2000,
        );

        // 폼 초기화 및 화면 전환
        inputs.forEach((input) => (input.value = ''));
        showLogin();
    } catch (error) {
        console.error('회원가입 에러:', error);
        showToast('회원가입 처리 중 오류가 발생했습니다.', 'error');
    }
});

// ------------------------------------------------
// 4. 로그인 창 닫기 버튼
// ------------------------------------------------

const closeBtn = document.getElementById("closeBtn");

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    // 1. 이전 페이지가 있다면 뒤로 가기
    if (document.referrer) {
      window.history.back();
    } else {
      // 2. 뒤로 갈 곳이 없다면(주소창에 직접 입력 등) 메인으로 이동
      window.location.href = "/index.html";
    }
  });
}