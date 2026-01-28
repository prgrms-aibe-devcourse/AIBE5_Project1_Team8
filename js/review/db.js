// js/review/db.js
import { db } from '../common/firebase-config.js';
import {
    collection, addDoc, serverTimestamp, doc, getDoc, updateDoc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { compressImage } from '../common/image-utils.js';

const COLLECTION_NAME = 'review_for_mypage_test';

export async function saveReview(reviewData) {
    try {
        // 이미 review-main.js에서 압축해서 보냈으므로 그대로 저장
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...reviewData,
            date: serverTimestamp(),
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error('데이터 저장 실패:', error);
        throw error;
    }
}

export async function getReviewById(reviewId) {
    const docRef = doc(db, COLLECTION_NAME, reviewId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

export async function updateReview(reviewId, updateData) {
    try {
        const docRef = doc(db, COLLECTION_NAME, reviewId);
        // undefined 방지를 위해 객체 재구성
        const dataToSave = {
            rating: Number(updateData.rating),
            travelerType: updateData.travelerType,
            content: updateData.content,
            imageUrls: updateData.imageUrls || [],
            img: updateData.img || "", // 썸네일
            updatedAt: serverTimestamp()
        };
        await updateDoc(docRef, dataToSave);
    } catch (error) {
        console.error("리뷰 수정 실패:", error);
        throw error;
    }
}