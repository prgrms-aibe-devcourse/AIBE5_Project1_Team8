import { initStarRating } from './rating.js';
import { initCharCounter } from './counter.js';
import { initTravelerType } from './types.js';
import { initImagePreview, getSelectedFiles } from './preview.js';
import { showToast } from '../common/toast.js';
import { saveReview } from './db.js';
import { db } from '../common/firebase-config.js';
import { 
    collection, query, where, getDocs 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async () => {
    // [1] 사용자 정보 및 URL 파라미터 확인
    const loggedInUser = JSON.parse(localStorage.getItem('auth_user'));
    
    // 로그인이 안 되어 있다면 마이페이지로 튕겨내기 (안전장치)
    if (!loggedInUser) {
        location.href = '../auth/login.html'; // 또는 적절한 로그인 페이지
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const contentIdRaw = urlParams.get('contentId');
    const contentId = Number(contentIdRaw);
    
    // [2] 화면 기능 초기화
    initStarRating('star-rating');
    const typeController = initTravelerType('traveler-type-group');
    initCharCounter('review-textarea', 'current-count');
    initImagePreview('file-input', 'preview-container', 'image-count');

    let reservationData = null;

    // [3] 예약 데이터 불러오기
    if (contentId) {
        try {
            const q = query(
                collection(db, 'reservations'),
                where('contentId', '==', contentId)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                reservationData = querySnapshot.docs[0].data();
                const r = reservationData;

                // UI 반영
                const picBox = document.querySelector('.service-pic-box');
                picBox.innerHTML = `<img src="${r.img}" style="width:100%; height:100%; object-fit:cover; border-radius:4px;" />`;
                document.querySelector('.service-name').textContent = r.title;
                
                const dateObj = r.checkIn?.toDate ? r.checkIn.toDate() : new Date(r.checkIn);
                document.querySelector('.service-date').textContent = `이용일자: ${dateObj.toLocaleDateString()}`;
            } else {
                console.warn('예약 정보를 찾을 수 없습니다.');
                document.querySelector('.service-pic-box').innerHTML = `<p>이미지 없음</p>`;
            }
        } catch (error) {
            console.error('데이터 로드 실패:', error);
        }
    }

    // [4] 리뷰 제출 로직
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const files = getSelectedFiles();
        const ratingCount = document.querySelectorAll('#star-rating .star.filled').length;
        const contentBody = document.getElementById('review-textarea').value.trim();

        // 수집 데이터 구성
        const reviewData = {
            userId: loggedInUser.uid,
            contentId: contentId,
            title: reservationData?.title || '알 수 없는 장소',
            rating: ratingCount,
            travelerType: typeController.getSelectedValue(),
            content: contentBody,
            images: files,
        };

        // 유효성 검사
        if (reviewData.rating === 0) { showToast('⚠️ 별점을 선택해주세요!', 'error'); return; }
        if (!reviewData.travelerType) { showToast('⚠️ 여행자 타입을 선택해주세요!', 'error'); return; }
        if (reviewData.content.length < 30) { showToast(`⚠️ 리뷰를 30자 이상 작성해주세요.`, 'error'); return; }

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = '등록 중...';

            await saveReview(reviewData);

            // 이동 후 토스트창 띄우기용 sessionsStorage
            sessionStorage.setItem('review_success', 'true');

            // 지연 시간 없이 바로 이동 
            window.location.href = './mypage.html';
        } catch (error) {
            console.error('저장 에러:', error);
            showToast('❌ 저장 중 오류가 발생했습니다.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = '작성 완료';
        }
    });
});