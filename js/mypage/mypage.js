import { compressImage } from '../common/image-utils.js';
import { checkAuth } from '../auth/auth-guard.js';
import { db } from '../common/firebase-config.js';
import { doc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where,} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { showToast } from '../common/toast.js';




// 로그인 여부 확인
if (checkAuth()) {
    document.addEventListener('DOMContentLoaded', async () => {
        // 리뷰 작성 후 돌아온건지 확인하고 토스트창 출력
        const isReviewSuccess = sessionStorage.getItem('review_success');
        
        if (isReviewSuccess === 'true') {
            // 토스트 출력
            showToast('✅ 리뷰가 성공적으로 등록되었어요!', 'success');
            sessionStorage.removeItem('review_success');
        }

        const loggedInUser = JSON.parse(localStorage.getItem('auth_user'));
        const loggedInUserId = loggedInUser.uid;
        const loggedInId = loggedInUser.username;
        let myReservations = [];
        let myReviews = [];

        /* =====================
        사용자 프로필 렌더링
         ===================== */
        function renderProfile(data) {
            document.querySelector('.mypage-name').textContent = data.name;
            document.querySelector('.profile-name').textContent = data.name;
            document.querySelector('.profile-email').textContent =
                data.email || '이메일 정보 없음';
            document.querySelector('.profile-phone').textContent =
                data.phone || '연락처를 등록해주세요';
            const profileImgElement = document.querySelector('.profile-img');
            if (data.profileImg) {
                profileImgElement.src = data.profileImg;
            }
        }
        if (loggedInUser) {
            renderProfile(loggedInUser);
        }

    
        async function fetchData() {
            // 1. 내 예약
            const reservations = collection(db, "reservations");
            const reservationsQuery = query( reservations, where("userId", "==", loggedInUserId));
            const reservationsSnapshot = await getDocs(reservationsQuery);
            myReservations = reservationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // console.log("내 예약 데이터 확인:", myReservations); // ✅ 확인용

            // 2. 내 리뷰
            const reviews = collection(db, "review_for_mypage_test");
            const reviewsQuery = query(reviews, where("userId", "==", loggedInUserId) );
            const reviewsSnapshot = await getDocs(reviewsQuery);
            myReviews = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // console.log("내 리뷰 데이터 확인:", myReviews); // ✅ 확인용

            // 3. 렌더링
            renderReservations();
            renderReservationPage([
                ...document.querySelectorAll('.mypage-reservation-item'),
            ]);
            renderReviews();
        }



        /* =====================
            예약 리스트 렌더링
        ===================== */
        function renderReservations() {
            const reservationList = document.querySelector('.mypage-reservation-list');
            reservationList.innerHTML = '';

            //YYYY-MM-DD 문자열 변환
            const formatDate = (timestamp) => {
                if (!timestamp) return '';
                const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
                return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
            };

            myReservations.forEach((r) => {
                // 완료 항목에서 후기 존재 여부 체크
                const hasReview = myReviews.some(
                    (review) => review.contentId === r.contentId
                );

                const checkIn = formatDate(r.checkIn);
                const checkOut = formatDate(r.checkOut);
                const date = formatDate(r.date);

                const li = document.createElement('li');
                li.className = `mypage-reservation-item ${r.type}`;
                li.dataset.reservationId = r.id; // Firestore의 reservation 문서 ID 저장
                li.innerHTML = `
                <div class="reservation-top">
                    <div class="reservation-left">
                        <img class="reservation-img" src="${r.img}" />
                        <div class="reservation-info">
                            <p class="reservation-title">${r.title}</p>
                            <p class="reservation-date">${checkIn} ~ ${checkOut}</p>
                        </div>
                    </div>
                    <div class="reservation-right">
                        ${r.type === 'upcoming' ? `<div class="d-day"></div>` : ''}
                        <div class="reservation-actions">
                            ${
                                r.type === 'completed' && !hasReview
                                    ? `<button class="reservation-btn review-btn"
                                        onclick="location.href='./review.html?contentId=${r.contentId}'">
                                        후기 작성
                                    </button>`
                                    : r.type === 'upcoming'
                                        ? `<button class="reservation-btn cancel-btn">예약 취소</button>`
                                        : ''
                            }

                            <button class="reservation-btn detail-btn">상세보기</button>
                        </div>
                    </div>
                </div>
                <div class="reservation-detail">
                    <p><strong>예약 일자</strong> ${date}</p>
                    <p><strong>숙소 주소</strong> ${r.address}</p>
                    <p><strong>숙소 연락처</strong> ${r.phone}</p>
                    <p><strong>체크인</strong> ${checkIn}</p>
                    <p><strong>체크아웃</strong> ${checkOut}</p>
                </div>
                `;
                reservationList.appendChild(li);
            });

            // D-Day 계산
            document.querySelectorAll('.mypage-reservation-item.upcoming').forEach((item) => {
                const checkInText = item.querySelector('.reservation-date').textContent.split('~')[0].trim();
                const checkInDate = new Date(checkInText);
                const today = new Date();
                const diff = Math.ceil((checkInDate - today) / (1000 * 60 * 60 * 24));
                item.querySelector('.d-day').textContent = `D-${diff}`;
            });

            // 상세보기 버튼
            reservationList.querySelectorAll('.detail-btn').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const item = btn.closest('.mypage-reservation-item');
                    item.classList.toggle('open');
                    btn.textContent = item.classList.contains('open') ? '접기' : '상세보기';
                });
            });
        }

        fetchData(); 

        /* =====================
            예약 탭 필터 + 페이지네이션
        ===================== */
        const tabs = document.querySelectorAll('.reservation-tab');
        const container = document.querySelector('.reservation-pagination');
        const perPage = 4;
        let currentPage = 1;

        // 페이지네이션 렌더링 함수 (항상 전달받은 items 기준)
        function renderReservationPage(items) {
            const totalPage = Math.ceil(items.length / perPage);
            if (currentPage > totalPage) currentPage = totalPage || 1;
 
            // 모든 항목 숨기기
            document
                .querySelectorAll('.mypage-reservation-item')
                .forEach((item) => (item.style.display = 'none'));

            // 현재 페이지 항목만 표시
            items
                .slice((currentPage - 1) * perPage, currentPage * perPage)
                .forEach((item) => (item.style.display = 'flex'));

            // 페이지네이션 버튼 렌더
            container.innerHTML = '';
            for (let i = 1; i <= totalPage; i++) {
                const btn = document.createElement('button');
                btn.textContent = i;
                if (i === currentPage) btn.classList.add('active');
                btn.onclick = () => {
                    currentPage = i;
                    renderReservationPage(items);
                };
                container.appendChild(btn);
            }
        }

        // 탭 클릭 시 필터 적용
        tabs.forEach((tab, idx) => {
            tab.addEventListener('click', () => {
                tabs.forEach((t) => t.classList.remove('active'));
                tab.classList.add('active');
                currentPage = 1; // 탭 바뀌면 1페이지부터 시작

                // 현재 탭 기준 필터링
                const allItems = [
                    ...document.querySelectorAll('.mypage-reservation-item'),
                ];
                const filteredItems = allItems.filter(
                    (item) =>
                        idx === 0 ||
                        (idx === 1 && item.classList.contains('upcoming')) ||
                        (idx === 2 && item.classList.contains('completed')),
                );

                renderReservationPage(filteredItems); // 필터된 항목만 페이지네이션
            });
        });

        
        /* ===================== 
        후기 리스트 렌더링 + 최신순 정렬 + 삭제(모달) + 페이지네이션
        ===================== */
        function renderReviews() {
            const reviewList = document.querySelector('.mypage-review-list');
            const sortSelect = document.getElementById('sortSelect');
            const reviewDeleteModal = document.getElementById('reviewDeleteModal');
            const modalCancel = reviewDeleteModal.querySelector('.cancel');
            const modalConfirm = reviewDeleteModal.querySelector('.confirm');

            reviewList.innerHTML = '';

            // Firestore Timestamp → YYYY-MM-DD
            const formatDate = (timestamp) => {
                if (!timestamp) return '';
                const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
                return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
            };

            // DOM에 리뷰 li 생성
            myReviews.forEach((r) => {
                const li = document.createElement('li');
                li.className = 'mypage-review-item';
                li.dataset.date = formatDate(r.date); // UI용
                li.dataset.timestamp = r.date.toDate ? r.date.toDate().getTime() : new Date(r.date).getTime(); // 정렬용
                li.dataset.id = r.id; // 항목 아이디 (리뷰 삭제 활용)
                const reviewDate = formatDate(r.date);

                li.innerHTML = `
                <div class="review-left">
                    ${r.img ? `<img src="${r.img}" alt="리뷰 이미지" />` : ''}
                </div>
                <div class="review-center">
                    <div class="review-header">
                        <span class="review-title">${r.title}</span>
                        <span class="review-date">${reviewDate}</span>
                    </div>
                    <p class="review-rating">${'⭐'.repeat(r.rating || 0)}</p>
                    <p class="review-content">${r.content || ''}</p>
                </div>
                <div class="review-right">
                    <button class="review-action-btn danger">삭제</button>
                </div>
                `;

                reviewList.appendChild(li);
            });

            // 페이지네이션 함수
            function setupReviewPagination(items) {
                const container = document.querySelector('.review-pagination');
                const perPage = 4;
                let currentPage = 1;

                function renderPage() {
                    const totalPage = Math.ceil(items.length / perPage);
                    if (currentPage > totalPage) currentPage = totalPage || 1;

                    items.forEach((item, idx) => {
                        item.style.display =
                            idx >= (currentPage - 1) * perPage && idx < currentPage * perPage
                                ? 'flex'
                                : 'none';
                    });

                    container.innerHTML = '';
                    for (let i = 1; i <= totalPage; i++) {
                        const btn = document.createElement('button');
                        btn.textContent = i;
                        if (i === currentPage) btn.classList.add('active');
                        btn.onclick = () => {
                            currentPage = i;
                            renderPage();
                        };
                        container.appendChild(btn);
                    }
                }

                renderPage();

                return {
                    setItems(newItems) {
                        items = newItems;
                        renderPage();
                    },
                };
            }

            // 초기 배열 & 최신순 정렬
            let reviewItems = [...reviewList.children];
            reviewItems.sort((a, b) => b.dataset.timestamp - a.dataset.timestamp);
            reviewItems.forEach((item) => reviewList.appendChild(item));

            const reviewPagination = setupReviewPagination(reviewItems);
            sortSelect.addEventListener('change', () => {
                reviewItems.sort((a, b) => {
                    if (sortSelect.value === '별점순') {
                        return b.querySelector('.review-rating').textContent.length -
                            a.querySelector('.review-rating').textContent.length;
                    } else {
                        return (b.dataset.timestamp - a.dataset.timestamp);
                    }
                });

                reviewItems.forEach((item) => reviewList.appendChild(item));
                reviewPagination.setItems(reviewItems);
            });


            // 삭제 이벤트 (모달 방식)
            let targetToDelete = null;

            reviewList.addEventListener('click', (e) => {
                const btn = e.target.closest('.review-action-btn');
                if (!btn) return;
                targetToDelete = btn.closest('li');
                reviewDeleteModal.classList.remove('hidden');
            });

            modalCancel.addEventListener('click', () => {
                targetToDelete = null;
                reviewDeleteModal.classList.add('hidden');
            });

            modalConfirm.addEventListener('click', async () => {
                if (targetToDelete) {
                    try {
                        // Firestore에서 삭제
                        const reviewId = targetToDelete.dataset.id; // li에 id 저장했다고 가정
                        await deleteDoc(doc(db, "review_for_mypage_test", reviewId));

                        // UI 반영
                        targetToDelete.remove();
                        reviewItems = reviewItems.filter((i) => i !== targetToDelete);
                        reviewPagination.setItems(reviewItems);

                    } catch (error) {
                        console.error("리뷰 삭제 실패:", error);
                        alert("리뷰 삭제 중 오류가 발생했습니다.");
                    }
                }
                targetToDelete = null;
                reviewDeleteModal.classList.add('hidden');
            });
        }
        // 호출
        renderReviews();


        /* =====================
        프로필 수정
        ===================== */
        const profileBtn = document.querySelector('.profile-btn');
        const profileInfo = document.querySelector('.profile-info');
        const profileImg = document.querySelector('.profile-img');

        let editing = false; // 수정 여부

        const imgInput = document.createElement('input');
        imgInput.type = 'file';
        imgInput.accept = 'image/*';
        imgInput.style.display = 'none';
        document.body.appendChild(imgInput);

        // 프로필 이미지 래퍼 생성
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'profile-img-wrapper';
        imgWrapper.style.position = 'relative';
        imgWrapper.style.width = profileImg.width + 'px';
        imgWrapper.style.height = profileImg.height + 'px';

        // 기존 이미지 래퍼 안으로 이동
        profileImg.parentNode.insertBefore(imgWrapper, profileImg);
        imgWrapper.appendChild(profileImg);

        // 업로드 버튼 생성
        const uploadBtn = document.createElement('button');
        uploadBtn.textContent = '업로드';
        uploadBtn.style.position = 'absolute';
        uploadBtn.style.bottom = '5px';
        uploadBtn.style.left = '50%';
        uploadBtn.style.transform = 'translateX(-50%)';
        uploadBtn.style.background = 'rgba(0,0,0,0.6)';
        uploadBtn.style.color = '#fff';
        uploadBtn.style.border = 'none';
        uploadBtn.style.padding = '4px 10px';
        uploadBtn.style.borderRadius = '12px';
        uploadBtn.style.cursor = 'pointer';
        uploadBtn.style.fontSize = '12px';

        // 버튼 클릭 → 파일 선택
        uploadBtn.addEventListener('click', () => {
            if (editing) imgInput.click();
        });

        // 버튼을 래퍼 안에 추가
        imgWrapper.appendChild(uploadBtn);

        // 파일 선택 → 미리보기
        imgInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    // 만들어둔 이미지 크기 압축 함수로 압축하기
                    const compressedBase64 = await compressImage(
                        file,
                        300,
                        0.7,
                    );

                    profileImg.src = compressedBase64; // 미리보기 교체
                    // showToast('이미지가 최적화되었습니다.', 'success');
                } catch (error) {
                    console.error('이미지 처리 실패:', error);
                    showToast('이미지 압축 중 오류가 발생했습니다.', 'error');
                }
            }
        });

        /* =====================
            프로필 수정 및 Firestore 저장
        ===================== */
        profileBtn.addEventListener('click', async () => {
            if (!editing) {
                // [수정 모드 진입]
                const currentName =
                    profileInfo.querySelector('.profile-name').textContent;
                const currentEmail =
                    profileInfo.querySelector('.profile-email').textContent;
                const currentPhone =
                    profileInfo.querySelector('.profile-phone').textContent;

                profileInfo.innerHTML = `
            <input class="edit-input" value="${currentName}" />
            <input class="edit-input" value="${currentEmail}" />
            <input class="edit-input" value="${currentPhone}" />
        `;
                profileBtn.textContent = '저장';
                editing = true;
                uploadBtn.style.display = 'block';
            } else {
                // [저장 버튼 클릭 시]
                const inputs = profileInfo.querySelectorAll('input');
                const updatedData = {
                    name: inputs[0].value.trim(),
                    email: inputs[1].value.trim(),
                    phone: inputs[2].value.trim(),
                    profileImg: profileImg.src, // 압축된 Base64 데이터
                };

                try {
                    const userRef = doc(db, 'users', loggedInUser.uid);
                    await updateDoc(userRef, updatedData);

                    // localStorage도 최신화해서 헤더 등에 바로 반영
                    const newAuthUser = { ...loggedInUser, ...updatedData };
                    localStorage.setItem(
                        'auth_user',
                        JSON.stringify(newAuthUser),
                    );
                    // 3. UI 복구
                    profileInfo.innerHTML = `
                        <p class="profile-name">${updatedData.name}</p>
                        <p class="profile-email">${updatedData.email}</p>
                        <p class="profile-phone">${updatedData.phone}</p>
                    `;

                    document.querySelector('.mypage-name').textContent =
                        updatedData.name;
                    profileBtn.textContent = '프로필 수정';
                    editing = false;
                    uploadBtn.style.display = 'none';

                    showToast('프로필 정보가 변경되었습니다.', 'success');
                } catch (error) {
                    console.error('프로필 저장 실패:', error);
                    showToast('저장 중 오류가 발생했습니다.', 'error');
                }
            }
        });
        uploadBtn.style.display = 'none';

        /* =====================
            모달 공통
        ===================== */
        function modalControl(openBtn, modal, confirmCb) {
            openBtn.addEventListener('click', () =>
                modal.classList.remove('hidden'),
            );
            modal.querySelector('.cancel').onclick = () =>
                modal.classList.add('hidden');
            modal.querySelector('.confirm').onclick = () => {
                confirmCb && confirmCb();
                modal.classList.add('hidden');
            };
        }

        /* =====================
            비밀번호 수정 모달
        ===================== */

        // 비밀번호 변경 확인 모달
        const passwordModal = document.getElementById('passwordModal');
        const passwordInputs = passwordModal.querySelectorAll('input');

        // 변경 완료 모달
        const passwordSuccessModal = document.createElement('div');
        passwordSuccessModal.className = 'modal hidden';
        passwordSuccessModal.innerHTML = `
        <div class="modal-content">
            <p class="modal-title">비밀번호가 성공적으로 변경되었습니다.</p>
            <div class="modal-actions">
            <button class="confirm">확인</button>
            </div>
        </div>
        `;
        document.body.appendChild(passwordSuccessModal);

        // 변경 실패 모달
        const passwordFailModal = document.createElement('div');
        passwordFailModal.className = 'modal hidden';
        passwordFailModal.innerHTML = `
        <div class="modal-content">
            <p class="modal-title">비밀번호가 일치하지 않아 변경할 수 없습니다.</p>
            <div class="modal-actions">
            <button class="confirm">확인</button>
            </div>
        </div>
        `;
        document.body.appendChild(passwordFailModal);

        /* =====================
            비밀번호 수정 로직 (Firestore 연동)
        ===================== */
        async function handlePasswordChange() {
            const currentPass = passwordInputs[0].value; // 현재 비밀번호
            const newPass = passwordInputs[1].value; // 새로운 비밀번호
            const newPassConfirm = passwordInputs[2].value; // 새로운 비밀번호 확인

            // 1. 빈 칸 검사
            if (!currentPass || !newPass || !newPassConfirm) {
                showToast('모든 항목을 입력해주세요.', 'error');
                return;
            }

            // 2. 새로운 비밀번호 일치 여부 확인 (이게 핵심!)
            if (newPass !== newPassConfirm) {
                showToast('새로운 비밀번호가 서로 일치하지 않습니다.', 'error');
                // 이 부분에서 passwordFailModal을 띄우거나 토스트로 처리하면 됩니다.
                return;
            }

            // 3. 현재 비밀번호가 8자 미만 등 너무 짧은지 체크 (선택 사항)
            if (newPass.length < 6) {
                showToast('새 비밀번호는 6자 이상이어야 합니다.', 'error');
                return;
            }

            try {
                const userRef = doc(db, 'users', loggedInUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const realPassword = userSnap.data().password;

                    // 4. DB의 실제 비밀번호와 사용자가 입력한 '현재 비밀번호' 대조
                    if (currentPass === realPassword) {
                        await updateDoc(userRef, {
                            password: newPass,
                        });

                        passwordModal.classList.add('hidden');
                        passwordSuccessModal.classList.remove('hidden');
                        passwordInputs.forEach((input) => (input.value = ''));
                    } else {
                        // 현재 비밀번호가 틀린 경우
                        passwordModal.classList.add('hidden');
                        passwordFailModal.classList.remove('hidden');
                    }
                }
            } catch (error) {
                console.error('비밀번호 변경 중 오류:', error);
                showToast('오류가 발생했습니다.', 'error');
            }
        }
        // modalControl 내부의 confirm 버튼 클릭 이벤트에 연결
        modalControl(
            document.querySelectorAll('.profile-btn')[1],
            passwordModal,
            handlePasswordChange, // 콜백 함수로 전달
        );

        // 완료 / 실패 모달 확인 버튼
        passwordSuccessModal.querySelector('.confirm').onclick = () =>
            passwordSuccessModal.classList.add('hidden');
        passwordFailModal.querySelector('.confirm').onclick = () =>
            passwordFailModal.classList.add('hidden');

        /* =====================
            계정 탈퇴 기능 (Firestore 연동)
        ===================== */
        modalControl(
            document.querySelector('.profile-btn.danger'), // 탈퇴 버튼
            document.getElementById('withdrawModal'), // 탈퇴 확인 모달
            async () => {
                try {
                    // 1. Firestore에서 해당 유저의 문서 삭제
                    // 로그인 시 저장했던 uid를 사용하여 문서 경로를 지정합니다.
                    const userRef = doc(db, 'users', loggedInUser.uid);
                    await deleteDoc(userRef);

                    // 2. 브라우저의 로그인 정보 삭제 (로그아웃 처리)
                    localStorage.removeItem('auth_user');
                    localStorage.removeItem('auth_isLoggedIn');

                    alert(
                        '탈퇴가 완료되었습니다. 그동안 이용해 주셔서 감사합니다.',
                    );

                    // 3. 메인 페이지로 이동
                    location.href = '../index.html';
                } catch (error) {
                    console.error('탈퇴 처리 중 오류 발생:', error);
                    alert(
                        '탈퇴 처리 중 문제가 발생했습니다. 다시 시도해 주세요.',
                    );
                }
            },
        );



        /* =====================
            예약 취소
        ===================== */
        const cancelModal = document.getElementById('cancelModal');
        const cancelYesBtn = document.getElementById('cancelYesBtn');
        const cancelNoBtn = document.getElementById('cancelNoBtn');

        let selectedReservation = null;

        // 예약 취소 버튼 클릭
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.cancel-btn');
            if (!btn) return;

            selectedReservation = btn.closest('li'); // or reservation id
            cancelModal.classList.remove('hidden');
        });

        // 취소 안 함
        cancelNoBtn.addEventListener('click', () => {
            cancelModal.classList.add('hidden');
            selectedReservation = null;
        });

        // 취소 확정
        // cancelYesBtn.addEventListener('click', async() => {
        //     cancelModal.classList.add('hidden');

        //     if (!selectedReservation) return;
            
        //     // 🔥 여기서 Firestore 예약 취소 / 삭제 처리
        //     const reservationId = selectedReservation.dataset.reservationId; // 파이어베이스 문서 아이디
        //     await deleteDoc(doc(db, 'reservations', reservationId));
            
        //     selectedReservation.remove(); // UI 즉시 반영
        //     showToast('예약이 성공적으로 취소되었습니다.', 'success');
        //     setTimeout(() => { location.reload();}, 800); // 새로고침
            
        // });

        cancelYesBtn.addEventListener('click', async () => {
            cancelModal.classList.add('hidden');
            if (!selectedReservation) return;

            const reservationId = selectedReservation.dataset.reservationId;

            // 🔥 예약 데이터
            const reservation = myReservations.find(
                (r) => r.id === reservationId
            );

            try {
                // 1. 예약 삭제
                await deleteDoc(doc(db, 'reservations', reservationId));

                // 2. 일정 삭제 (schedules)
                const schedulesRef = collection(db, 'schedules');
                const schedulesQuery = query(
                    schedulesRef,
                    where('userId', '==', loggedInId),
                    where('hotelId', '==', String(reservation.contentId))
                );
                
                const schedulesSnapshot = await getDocs(schedulesQuery);
                // console.log( '일정 개수:', schedulesSnapshot.size, schedulesSnapshot.docs.map(d => d.data()));

                for (const scheduleDoc of schedulesSnapshot.docs) {
                    await deleteDoc(scheduleDoc.ref);
                }

                // 3. UI 반영
                selectedReservation.remove();
                showToast('예약 및 일정이 성공적으로 취소되었습니다.', 'success');

                setTimeout(() => {
                    location.reload();
                }, 800);

            } catch (error) {
                console.error('예약/일정 삭제 실패:', error);
                showToast('삭제 중 오류가 발생했습니다.', 'error');
            }

            selectedReservation = null;
        });


    });
}
