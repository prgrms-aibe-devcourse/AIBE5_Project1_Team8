// js/review/db.js
import { db } from '../common/firebase-config.js';
import {
    collection,
    addDoc,
    serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { compressImage } from '../common/image-utils.js';

const COLLECTION_NAME = 'review_for_mypage_test';

export async function saveReview(reviewData) {
    try {
        // 1. 이미지 압축 및 변환
        let mainImg = '';
        if (reviewData.images && reviewData.images.length > 0) {
            // 이미 별도로 분리한 유틸리티를 아주 잘 활용하고 계시네요!
            mainImg = await compressImage(reviewData.images[0]);
        }

        // 2. Firestore 저장
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            userId: reviewData.userId,
            // [중요] 조회 시 에러 방지를 위해 숫자로 확실히 변환해서 저장합니다.
            contentId: Number(reviewData.contentId), 
            title: reviewData.title,
            rating: Number(reviewData.rating),
            content: reviewData.content,
            // [수정] encodedImages[0] 대신 위에서 선언한 mainImg를 사용합니다.
            img: mainImg || '', 
            date: serverTimestamp(),
            createdAt: serverTimestamp(),
        });

        console.log("리뷰 저장 성공! ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('데이터 저장 실패:', error);
        throw error;
    }
}