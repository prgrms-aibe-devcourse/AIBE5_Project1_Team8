import { initStarRating } from './rating.js';
import { initCharCounter } from './counter.js';
import { initTravelerType } from './types.js';
import { initImagePreview, getSelectedFiles } from './preview.js';
import { showToast } from '../common/toast.js';
import { saveReview } from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. 각 기능 초기화
    initStarRating('star-rating');
    const typeController = initTravelerType('traveler-type-group');
    initCharCounter('review-textarea', 'current-count');

    // 사진 미리보기 초기화
    initImagePreview('file-input', 'preview-container', 'image-count');

    const submitBtn = document.querySelector('.submit-btn');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        // [데이터 수집]
        const files = getSelectedFiles();
        const ratingCount = document.querySelectorAll(
            '#star-rating .star.filled',
        ).length;
        const contentBody = document
            .getElementById('review-textarea')
            .value.trim();

        const reviewData = {
            rating: ratingCount,
            travelerType: typeController.getSelectedValue(),
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
            showToast(`⚠️ 리뷰를 30자 이상 작성해주세요.`, 'error');
            return;
        }

        // [DB 저장 단계]
        try {
            // 1. 버튼 비활성화 -> 한 번만 등록하게
            submitBtn.disabled = true;
            submitBtn.textContent = '등록 중...';
            submitBtn.style.opacity = '0.6';

            // 2. Firebase 저장 실행 (Base64 압축 및 전송)
            await saveReview(reviewData);

            // 3. 성공 토스트 출력
            showToast('✅ 리뷰가 성공적으로 등록되었어요!', 'success');

            // 4. 토스트 창 출력하고 인지할 수 있는 시간 부여
            setTimeout(() => {
                // mypage로 이동
                window.location.href = './mypage.html';
            }, 1200);
        } catch (error) {
            console.error('저장 에러:', error);
            showToast('❌ 저장 중 오류가 발생했습니다.', 'error');

            // 에러 난 경우 버튼 다시 
            submitBtn.disabled = false;
            submitBtn.textContent = '작성 완료';
            submitBtn.style.opacity = '1';
        }
    });
});
