// js/review/review-main.js
import { initStarRating } from './rating.js';
import { initCharCounter } from './counter.js';
import { initTravelerType } from './types.js';
import { initImagePreview, resetSelectedFiles, getSelectedFiles } from './preview.js';
import { showToast } from '../common/toast.js';
import { saveReview, getReviewById, updateReview } from './db.js';
import { db } from '../common/firebase-config.js';
import { compressImage } from '../common/image-utils.js';
import {
    collection,
    query,
    where,
    getDocs,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async () => {
    resetSelectedFiles();
    const loggedInUser = JSON.parse(localStorage.getItem('auth_user'));
    if (!loggedInUser) {
        location.href = '../auth/login.html';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const contentIdRaw = urlParams.get('contentId');
    const reviewId = urlParams.get('reviewId');
    const contentId = contentIdRaw ? Number(contentIdRaw) : null;

    // [중요] 기존 사진들을 관리할 상태 배열
    let existingImages = [];

    initStarRating('star-rating');
    const typeController = initTravelerType('traveler-type-group');
    initCharCounter('review-textarea', 'current-count');
    initImagePreview(
        'file-input',
        'new-preview-wrapper',
        'image-count',
        9,
        () => existingImages.length,
    );
    let reservationData = null;
    let existingReviewData = null;

    // [기존 사진 렌더링 함수]
    function renderExistingImages() {
        const wrapper = document.getElementById('existing-preview-wrapper');
        if (!wrapper) return;

        wrapper.innerHTML = ''; // 기존 내용을 비우고 다시 그림

        existingImages.forEach((url, index) => {
            const item = document.createElement('div');
            item.className = 'preview-item';
            item.innerHTML = `
                <img src="${url}" class="preview-thumbnail">
                <button type="button" class="delete-btn existing-delete" data-index="${index}">×</button>
                <p style="position:absolute; bottom:0; background:rgba(0,0,0,0.5); color:#fff; width:100%; font-size:10px; text-align:center; margin:0; border-radius:0 0 4px 4px;">기존 사진</p>
            `;
            wrapper.appendChild(item);
        });

        // 삭제 버튼 이벤트 연결
        wrapper.querySelectorAll('.existing-delete').forEach((btn) => {
            btn.onclick = (e) => {
                const idx = e.target.dataset.index;
                existingImages.splice(idx, 1); // [핵심] 배열에서 실제 제거
                renderExistingImages(); // UI 새로고침
                updateTotalCount(); // 상단 숫자(1/9 등) 업데이트
            };
        });
    }

    function updateTotalCount() {
        const imageCount = document.getElementById('image-count');
        const newFilesCount = getSelectedFiles().length;
        const total = existingImages.length + newFilesCount;
        if (imageCount) imageCount.textContent = `${total}/9`;
    }

    // 수정 모드: 데이터 복구
    if (reviewId && reviewId.trim() !== '') {
        try {
            document.querySelector('.main-title').textContent = '리뷰 수정';
            document.querySelector('.submit-btn').textContent = '수정 완료';

            existingReviewData = await getReviewById(reviewId);

            if (existingReviewData) {
                const stars = document.querySelectorAll('#star-rating .star');
                stars.forEach((s, idx) => {
                    if (idx < existingReviewData.rating)
                        s.classList.add('filled');
                });

                if (existingReviewData.travelerType) {
                    typeController.setSelectedValue(
                        existingReviewData.travelerType,
                    );
                }

                const textarea = document.getElementById('review-textarea');
                textarea.value = existingReviewData.content;
                textarea.dispatchEvent(new Event('input'));

                // 여러 장의 이미지(imageUrls) 또는 단일 이미지(img) 로드
                existingImages =
                    existingReviewData.imageUrls ||
                    (existingReviewData.img ? [existingReviewData.img] : []);
                renderExistingImages();
            }
        } catch (error) {
            console.error('기존 리뷰 로드 실패:', error);
        }
    }

    // 호텔 정보 로드 (기존 로직 유지)
    if (contentId !== null && !isNaN(contentId)) {
        try {
            const q = query(
                collection(db, 'reservations'),
                where('contentId', '==', contentId),
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                reservationData = querySnapshot.docs[0].data();
                const r = reservationData;
                const picBox = document.querySelector('.service-pic-box');
                picBox.innerHTML = `<img src="${r.img}" style="width:100%; height:100%; object-fit:cover; border-radius:4px;" />`;
                document.querySelector('.service-name').textContent = r.title;
                const dateObj = r.checkIn?.toDate
                    ? r.checkIn.toDate()
                    : new Date(r.checkIn);
                document.querySelector('.service-date').textContent =
                    `이용일자: ${dateObj.toLocaleDateString()}`;
            }
        } catch (error) {
            console.error('데이터 로드 실패:', error);
        }
    }

    // 리뷰 제출
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const newFiles = getSelectedFiles();
        const ratingCount = document.querySelectorAll(
            '#star-rating .star.filled',
        ).length;
        const contentBody = document
            .getElementById('review-textarea')
            .value.trim();

        // 1. 유효성 검사
        if (ratingCount === 0) {
            showToast('⚠️ 별점을 선택해주세요!', 'error');
            return;
        }
        if (!typeController.getSelectedValue()) {
            showToast('⚠️ 여행자 타입을 선택해주세요!', 'error');
            return;
        }
        if (contentBody.length < 30) {
            showToast(`⚠️ 리뷰를 30자 이상 작성해주세요.`, 'error');
            return;
        }

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = '처리 중...';

            // 2. 새 파일들 압축 실행
            const newCompressed = await Promise.all(
                newFiles.map((file) => compressImage(file)),
            );

            // 3. 최종 이미지 배열 구성: 남겨진 기존 사진 + 새로 압축한 사진
            const finalImageUrls = [...existingImages, ...newCompressed];

            const reviewData = {
                userId: loggedInUser.uid,
                userName: loggedInUser.name || '익명 사용자',
                contentId: contentId,
                title:
                    reservationData?.title ||
                    existingReviewData?.title ||
                    '알 수 없는 장소',
                rating: ratingCount,
                travelerType: typeController.getSelectedValue(),
                content: contentBody,
                imageUrls: finalImageUrls, // 배열로 저장
                img: finalImageUrls[0] || '', // 썸네일용 (첫 번째 사진)
            };

            if (reviewId) {
                await updateReview(reviewId, reviewData);
                sessionStorage.setItem(
                    'review_success_msg',
                    '✅ 리뷰가 수정되었습니다!',
                );
            } else {
                await saveReview(reviewData);
                sessionStorage.setItem(
                    'review_success_msg',
                    '✅ 리뷰가 등록되었습니다!',
                );
            }

            sessionStorage.setItem('review_success', 'true');
            location.href = './mypage.html';
        } catch (error) {
            console.error('저장 에러:', error);
            showToast('❌ 저장 중 오류가 발생했습니다.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = reviewId ? '수정 완료' : '작성 완료';
        }
    });
});
