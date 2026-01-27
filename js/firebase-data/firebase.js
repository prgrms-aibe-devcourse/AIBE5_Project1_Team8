// Firebase 설정 및 초기화
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: 'AIzaSyBxbQ66KBpMsH57t2vujRG0EOPphCPq7NQ',
    authDomain: 'aibe5-team8.firebaseapp.com',
    projectId: 'aibe5-team8',
    storageBucket: 'aibe5-team8.firebasestorage.app',
    messagingSenderId: '273490651300',
    appId: '1:273490651300:web:facbab2b74870ec48a9e31',
};

const app = initializeApp(firebaseConfig);

// 서비스별 인스턴스 생성 및 내보내기
export const db = getFirestore(app); // 데이터베이스(Firestore)
export const storage = getStorage(app); // 이미지 저장소(Storage)
export const auth = getAuth(app); // 인증(Auth)