import { initStarRating } from './rating.js';
import { initCharCounter } from './counter.js'; //
import { initTravelerType } from './types.js'; //
import { initImagePreview, getSelectedFiles } from './preview.js';
import { showToast } from '../common/toast.js';
import { saveReview } from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. 각 기능 초기화 (누락된 부분을 다시 추가했습니다)
    initStarRating('star-rating');
    const typeController = initTravelerType('traveler-type-group'); //
    initCharCounter('review-textarea', 'current-count'); //
    
    // 사진 미리보기 초기화
    initImagePreview('file-input', 'preview-container', 'image-count');

    const submitBtn = document.querySelector('.submit-btn');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        // [데이터 수집]
        const files = getSelectedFiles();
        const ratingCount = document.querySelectorAll('#star-rating .star.filled').length;
        const contentBody = document.getElementById('review-textarea').value.trim();

        const reviewData = {
            rating: ratingCount,
            travelerType: typeController.getSelectedValue(), //
            content: contentBody,
            images: files,
            createdAt: new Date(),
        };

        // [유효성 검사 단계]
        if (reviewData.rating === 0) {
            showToast('⚠️ 별점을 선택해주세요!', 'error');
            return;
        }

        if (!reviewData.travelerType) {
            showToast('⚠️ 여행자 타입을 선택해주세요!', 'error');
            return;
        }

        // 30자 이상 작성 검사
        if (reviewData.content.length < 30) {
            showToast(`⚠️ 리뷰를 30자 이상 작성해주세요. (현재 ${reviewData.content.length}자)`, 'error'); //
            return;
        }

        // [DB 저장 단계]
        try {
            await saveReview(reviewData);
            showToast('✅ 리뷰가 성공적으로 등록되었어요!', 'success');
            
            // 성공 시 페이지 이동 등 후속 처리
            // window.location.href = '../index.html';
        } catch (error) {
            console.error('저장 에러:', error);
            showToast('❌ 저장 중 오류가 발생했습니다.', 'error');
        }
    });
});