import { getAllReviews, deleteReview } from '../review/db.js'; // firebase 연동

document.addEventListener('DOMContentLoaded', async () => {
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
    imgInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => (profileImg.src = event.target.result);
            reader.readAsDataURL(file);
        }
    });

    // 프로필 수정 버튼
    profileBtn.addEventListener('click', () => {
        if (!editing) {
            // 수정 모드
            profileInfo.innerHTML = `
        <input value="${
            profileInfo.querySelector('.profile-name').textContent
        }" />
        <input value="${
            profileInfo.querySelector('.profile-email').textContent
        }" />
        <input value="${
            profileInfo.querySelector('.profile-phone').textContent
        }" />
        `;
            profileBtn.textContent = '저장';
            editing = true;
            uploadBtn.style.display = 'block'; // 버튼 보이기
        } else {
            // 저장 후 일반 모드
            const inputs = profileInfo.querySelectorAll('input');
            profileInfo.innerHTML = `
        <p class="profile-name">${inputs[0].value}</p>
        <p class="profile-email">${inputs[1].value}</p>
        <p class="profile-phone">${inputs[2].value}</p>
        `;
            profileBtn.textContent = '프로필 수정';
            editing = false;
            uploadBtn.style.display = 'none'; // 버튼 숨기기
        }
    });

    // 초기엔 버튼 숨김
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

    // modalControl 확장
    function modalControl(openBtn, modal, confirmCb) {
        openBtn.addEventListener('click', () =>
            modal.classList.remove('hidden'),
        );
        modal.querySelector('.cancel').onclick = () =>
            modal.classList.add('hidden');

        modal.querySelector('.confirm').onclick = () => {
            // 비밀번호 확인
            if (modal === passwordModal) {
                const current = passwordInputs[0].value;
                const check = passwordInputs[1].value;
                const newPass = passwordInputs[2].value;

                if (current === check && current !== '') {
                    // 성공
                    modal.classList.add('hidden');
                    passwordSuccessModal.classList.remove('hidden');
                } else {
                    // 실패
                    modal.classList.add('hidden');
                    passwordFailModal.classList.remove('hidden');
                }

                // 입력값 초기화
                passwordInputs.forEach((input) => (input.value = ''));
            } else {
                confirmCb && confirmCb();
                modal.classList.add('hidden');
            }
        };
    }

    // 완료 / 실패 모달 확인 버튼
    passwordSuccessModal.querySelector('.confirm').onclick = () =>
        passwordSuccessModal.classList.add('hidden');
    passwordFailModal.querySelector('.confirm').onclick = () =>
        passwordFailModal.classList.add('hidden');

    // 적용
    modalControl(document.querySelectorAll('.profile-btn')[1], passwordModal);

    /* =====================
        계정 탈퇴 모달
    ===================== */
    modalControl(
        // 프로필 계정 탈퇴
        document.querySelector('.profile-btn.danger'),
        document.getElementById('withdrawModal'),
        () => (location.href = '../index.html'),
    );

    /* =====================
        예약 탭 필터
    ===================== */
    const tabs = document.querySelectorAll('.reservation-tab');
    const items = document.querySelectorAll('.mypage-reservation-item');

    tabs.forEach((tab, idx) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            items.forEach((item) => {
                item.style.display =
                    idx === 0 ||
                    (idx === 1 && item.classList.contains('upcoming')) ||
                    (idx === 2 && item.classList.contains('completed'))
                        ? 'flex'
                        : 'none';
            });
        });
    });

    /* =====================
        페이지네이션
    ===================== */
    function setupPagination(items, container, perPage = 4) {
        let currentPage = 1;
        const totalPage = Math.ceil(items.length / perPage);

        function render() {
            items.forEach((item, idx) => {
                item.style.display =
                    idx >= (currentPage - 1) * perPage &&
                    idx < currentPage * perPage
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
                    render();
                };
                container.appendChild(btn);
            }
        }

        render();
        return { render }; // 외부에서 재렌더링 가능하도록 반환
    }

    const reviewList = document.querySelector('.mypage-review-list');
    const reviewPaginationContainer =
        document.querySelector('.review-pagination');

    async function loadReviews() {
        // 1. 기존 하드코딩된 목록 비우기
        reviewList.innerHTML =
            '<p class="loading">후기를 불러오는 중입니다...</p>';

        try {
            const reviews = await getAllReviews(); // DB에서 가져오기
            reviewList.innerHTML = ''; // 로딩 메시지 제거

            if (reviews.length === 0) {
                reviewList.innerHTML =
                    '<p class="empty-msg">작성한 후기가 없습니다.</p>';
                return;
            }

            // 2. 데이터를 순회하며 HTML 생성
            reviews.forEach((review) => {
                const li = document.createElement('li');
                li.className = 'mypage-review-item';

                // Firestore의 Timestamp를 날짜 문자열로 변환
                const date = review.createdAt?.toDate
                    ? review.createdAt.toDate().toLocaleDateString()
                    : '2026-01-26';

                li.innerHTML = `
                    <div class="review-left">
                        <img src="${
                            review.imageUrls[0] || '../images/busan_hotel.jpg'
                        }" alt="리뷰 이미지" />
                    </div>
                    <div class="review-center">
                        <div class="review-header">
                            <span class="review-title">${
                                review.travelerType || '여행 후기'
                            }</span>
                            <span class="review-date">${date}</span>
                        </div>
                        <p class="review-rating">${'⭐'.repeat(
                            review.rating,
                        )}</p>
                        <p class="review-content">${review.content}</p>
                    </div>
                    <div class="review-right">
                        <button class="review-action-btn danger" data-id="${
                            review.id
                        }">삭제</button>
                    </div>
                `;
                reviewList.appendChild(li);
            });

            // 3. 렌더링 후 기존의 페이지네이션 및 정렬 기능 다시 연결
            reInitializeReviewLogic();
        } catch (error) {
            reviewList.innerHTML =
                '<p class="error">데이터를 불러오는 데 실패했습니다.</p>';
        }
    }

    // 기존의 정렬/페이지네이션 로직을 함수로 묶어서 호출
    function reInitializeReviewLogic() {
        let reviewItems = [...reviewList.children];
        const reviewPagination = setupPagination(
            reviewItems,
            reviewPaginationContainer,
        );

        // 정렬 이벤트 다시 연결
        const sortSelect = document.getElementById('sortSelect');
        sortSelect.onchange = () => {
            reviewItems.sort((a, b) => {
                if (sortSelect.value === '별점순') {
                    return (
                        b.querySelector('.review-rating').textContent.length -
                        a.querySelector('.review-rating').textContent.length
                    );
                }
                return (
                    new Date(b.querySelector('.review-date').textContent) -
                    new Date(a.querySelector('.review-date').textContent)
                );
            });
            reviewItems.forEach((item) => reviewList.appendChild(item));
            reviewPagination.render();
        };
    }

    /* =====================
        삭제 로직 수정 (DB 연동)
    ===================== */
    reviewList.addEventListener('click', (e) => {
        const btn = e.target.closest('.review-action-btn');
        if (!btn) return;

        const targetReview = btn.closest('li');
        const reviewId = btn.getAttribute('data-id');

        modalControl(
            btn,
            document.getElementById('reviewDeleteModal'),
            async () => {
                await deleteReview(reviewId); // DB에서 삭제
                targetReview.remove(); // 화면에서 삭제
                loadReviews(); // 페이지네이션 재계산을 위해 다시 로드
            },
        );
    });

    // 최초 실행
    await loadReviews();
    /* =====================
        예약 페이지네이션
    ===================== */
    const reservationItems = document.querySelectorAll(
        '.mypage-reservation-item',
    );
    setupPagination(
        [...reservationItems],
        document.querySelector('.reservation-pagination'),
    );

    /* =====================
        상세보기
    ===================== */
    document.querySelectorAll('.detail-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.mypage-reservation-item');
            item.classList.toggle('open');
            btn.textContent = item.classList.contains('open')
                ? '접기'
                : '상세보기';
        });
    });

    /* =====================
        D-Day 계산 (시작일 기준)
    ===================== */
    document.querySelectorAll('.upcoming').forEach((item) => {
        const dateText = item.querySelector('.reservation-date').textContent;
        const checkIn = new Date(dateText.split('~')[0].trim());
        const today = new Date();
        const diff = Math.ceil((checkIn - today) / (1000 * 60 * 60 * 24));
        item.querySelector('.d-day').textContent = `D-${diff}`;
    });
});
