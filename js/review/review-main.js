import { initStarRating } from './rating.js';
import { initCharCounter } from './counter.js';
import { initTravelerType } from './types.js';
import { initImagePreview, getSelectedFiles } from './preview.js';
import { showToast } from '../common/toast.js';
import { saveReview } from './db.js';
import { db } from '../common/firebase-config.js'; // DB 추가
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async () => {
    // [1] URL에서 contentId 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const contentIdRaw = urlParams.get('contentId');
    const contentId = Number(contentIdRaw);
    const q = query(
        collection(db, 'reservations'),
        where('contentId', '==', contentId),
    );
    const loggedInUser = JSON.parse(localStorage.getItem('auth_user'));

    // [2] 화면 초기화
    initStarRating('star-rating');
    const typeController = initTravelerType('traveler-type-group');
    initCharCounter('review-textarea', 'current-count');
    initImagePreview('file-input', 'preview-container', 'image-count');

    let reservationData = null;

    // [3] 예약 데이터 불러와서 UI 반영하기
    if (contentId) {
        try {
            const q = query(
                collection(db, 'reservations'),
                where('contentId', '==', contentId),
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const r = querySnapshot.docs[0].data();

                // ⭐ 이 줄이 핵심입니다! 불러온 데이터를 reservationData에 넣어줘야
                // 나중에 제출 버튼을 눌렀을 때 title 정보를 가져올 수 있어요.
                reservationData = r;

                const picBox = document.querySelector('.service-pic-box');
                picBox.innerHTML = `<img src="${r.img}" style="width:100%; height:100%; object-fit:cover;" />`;
                document.querySelector('.service-name').textContent = r.title;
                const dateObj = r.checkIn.toDate
                    ? r.checkIn.toDate()
                    : new Date(r.checkIn);
                document.querySelector('.service-date').textContent =
                    `이용일자: ${dateObj.toLocaleDateString()}`;
            } else {
                console.warn('해당 contentId로 예약 정보를 찾을 수 없습니다.');
                // 데이터가 없을 때의 기본 이미지 처리
                document.querySelector('.service-pic-box').innerHTML =
                    `<p>이미지 없음</p>`;
            }
        } catch (error) {
            console.error('정보 로드 에러:', error);
        }
    }

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
            userId: loggedInUser.uid, // 작성자 ID
            contentId: contentId, // 매칭용 ID
            title: reservationData?.title || '알 수 없는 장소', // 마이페이지 표시용
            rating: ratingCount,
            travelerType: typeController.getSelectedValue(),
            content: contentBody,
            images: files,
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

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = '등록 중...';

            await saveReview(reviewData);

            showToast('✅ 리뷰가 성공적으로 등록되었어요!', 'success');
            setTimeout(() => {
                window.location.href = './mypage.html';
            }, 1200);
        } catch (error) {
            console.error('저장 에러:', error);
            showToast('❌ 저장 중 오류가 발생했습니다.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = '작성 완료';
        }
    });
});
