import { initStarRating } from './rating.js';
import { initCharCounter } from './counter.js';
import { showToast } from '../common/toast.js'; // 토스트 모듈 임포트
import { initTravelerType } from './types.js';
// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', () => {
    // 각 기능 초기화
    const ratingController = initStarRating('star-rating');
    const typeController = initTravelerType('traveler-type-group');
    initCharCounter('review-textarea', 'current-count');

    const submitBtn = document.querySelector('.submit-btn');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // 데이터 수집
        const reviewData = {
            rating: document.querySelectorAll('#star-rating .star.filled')
                .length, // 별점 개수
            travelerType: typeController.getSelectedValue(), // 여행자 타입
            content: document.getElementById('review-textarea').value, // 리뷰 내용
        };

        // 유효성 검사
        if (!reviewData.rating) {
            showToast('⚠️ 별점을 선택해주세요!', 'error');
            return;
        }
        if (!reviewData.travelerType) {
            showToast('⚠️ 여행자 타입을 선택해주세요!', 'error');
            return;
        }
        if (reviewData.content.length < 30) {
            showToast('⚠️ 리뷰를 30자 이상 작성해주세요.', 'error');
            return;
        }

        // 결과 확인 및 서버 전송 준비
        console.log('전송될 데이터:', reviewData);
        showToast('✅ 리뷰가 등록되었어요!', 'success');
    });
});
