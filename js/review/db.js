// js/review/db.js
import { db } from '../common/firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * 이미지를 리사이징하고 Base64로 변환합니다. (1MB 제한 방어)
 */
async function compressAndEncode(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800; // 가로 800px로 리사이징
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // 0.7 정도의 화질로 압축하여 Base64 반환
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
        };
    });
}

/**
 * 리뷰 텍스트와 이미지 문자열을 함께 저장
 */
export async function saveReview(reviewData) {
    try {
        // 1. 모든 사진을 압축된 Base64로 변환 (병렬 처리)
        const encodedImages = await Promise.all(
            reviewData.images.map(file => compressAndEncode(file))
        );

        // 2. Firestore에 직접 저장
        const docRef = await addDoc(collection(db, "reviews"), {
            rating: reviewData.rating,
            travelerType: reviewData.travelerType,
            content: reviewData.content,
            imageUrls: encodedImages, // 이제 문자열 배열이 들어감
            createdAt: serverTimestamp()
        });

        console.log("Base64 저장 완료! ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("데이터 저장 실패:", error);
        throw error;
    }
}

/**
 * 모든 리뷰를 최신순으로 가져옵니다.
 */
export async function getAllReviews() {
    try {
        const reviewsRef = collection(db, "reviews");
        
        // 1. 최신순(desc)으로 정렬하는 쿼리 생성
        const q = query(reviewsRef, orderBy("createdAt", "desc"));
        
        // 2. 쿼리 실행하여 데이터 스냅샷 가져오기
        const querySnapshot = await getDocs(q);
        
        // 3. 문서 배열로 변환
        const reviews = [];
        querySnapshot.forEach((doc) => {
            // 문서 ID와 데이터를 합쳐서 배열에 넣음
            reviews.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return reviews;
    } catch (error) {
        console.error("리뷰 조회 중 오류 발생:", error);
        throw error;
    }
}

/**
 * 특정 ID의 리뷰를 삭제합니다.
 */
export async function deleteReview(reviewId) {
    try {
        await deleteDoc(doc(db, "reviews", reviewId));
        console.log("리뷰 삭제 완료:", reviewId);
    } catch (error) {
        console.error("삭제 실패:", error);
        throw error;
    }
}