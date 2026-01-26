// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
};

const app = initializeApp(firebaseConfig);

// 3. 서비스별 인스턴스 생성 및 내보내기
export const db = getFirestore(app); // 데이터베이스(Firestore)
export const storage = getStorage(app); // 이미지 저장소(Storage)
export const auth = getAuth(app); // 인증(Auth)