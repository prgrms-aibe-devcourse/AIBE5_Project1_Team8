// import { reservations, reviews, userData } from "./data.js";
// import { getAllReviews, deleteReview } from '../review/db.js'; // firebase 연동

import { db } from "../common/firebase-config-sample.js"; // 초기화 파일에서 가져오기
import { collection, getDocs, updateDoc, deleteDoc, doc, query, where} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// DOM 로드
document.addEventListener("DOMContentLoaded", async () => {   

    /* ===================== 
        userId==1 프로필 & 예약 & 리뷰 내역 조회 
     ===================== */
    let currentUserDocId = null;
    let currentUserPassword = null;

    async function fetchUser() { // 프로필 정보
        const snapshot = await getDocs(collection(db, "users"));
        const docSnap = snapshot.docs[1]; // 임시: 첫 번째 유저 // 수정

        currentUserDocId = docSnap.id; // 사용자 식별용 문서 아이디
        const userData = docSnap.data();
        currentUserPassword = userData.password;

        document.querySelector(".mypage-name").textContent = userData.name;
        document.querySelector(".profile-name").textContent = userData.name;
        document.querySelector(".profile-email").textContent = userData.email;
        document.querySelector(".profile-phone").textContent = userData.phone ?? "";
        document.querySelector(".profile-img").src = userData.profileImg || "../images/default_profile.png";
    }

    async function fetchReservations() { // 예약 내역 
        const q = query(
            collection(db, "reservations"),
            where("userId", "==", 1)
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const d = doc.data();
            return {
            id: doc.id,
            ...d,
            date: d.date.toDate(),
            checkIn: d.checkIn.toDate(),
            checkOut: d.checkOut.toDate(),
            };
        });
    }

    async function fetchReviews() {
        const q = query(
            collection(db, "review_for_mypage_test"),
            where("userId", "==", 1)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    await fetchUser();  
    const reservations = await fetchReservations();
    const reviews = await fetchReviews();
    console.log(reviews);

    /* ===================== 
        예약 렌더링 
        ===================== */

    function renderReservations(reservations, reviews) {
        const listEl = document.querySelector(".mypage-reservation-list");
        listEl.innerHTML = "";

        // 리뷰가 이미 존재하는 contentId 모음
        const reviewedContentIds = new Set(
            reviews.map(r => r.contentId)
        );

        reservations.forEach(r => {
            const hasReview = reviewedContentIds.has(r.contentId);

            const li = document.createElement("li");
            li.dataset.contentId = r.contentId; // 후기 작성 페이지에 넘겨줄 콘텐츠 아이디
            li.className = `mypage-reservation-item ${r.type}`;
            li.innerHTML = `
            <div class="reservation-top">
                <div class="reservation-left">
                <img class="reservation-img" src="${r.img}" />
                <div class="reservation-info">
                    <p class="reservation-title">${r.title}</p>
                    <p class="reservation-date">
                    ${r.checkIn.getFullYear()}-${r.checkIn.getMonth() + 1}-${r.checkIn.getDate()}
                    </p>
                </div>
                </div>
                <div class="reservation-right">
                ${r.type === "upcoming" ? `<div class="d-day"></div>` : ""}
                <div class="reservation-actions">
                    ${
                    r.type === "completed" && !hasReview
                        ? `<button class="reservation-btn review-btn">후기 작성</button>`
                        : ``
                    }
                    <button class="reservation-btn detail-btn">상세보기</button>
                </div>
                </div>
            </div>
            <div class="reservation-detail">
                <p><strong>예약 일자</strong> ${r.date.toLocaleDateString()}</p>
                <p><strong>숙소 주소</strong> ${r.address}</p>
                <p><strong>숙소 연락처</strong> ${r.phone}</p>
                <p><strong>체크인</strong> ${r.checkIn.toLocaleString()}</p>
                <p><strong>체크아웃</strong> ${r.checkOut.toLocaleString()}</p>
            </div>
            `;
            listEl.appendChild(li);
        });

        // 상세보기 버튼
        listEl.querySelectorAll(".detail-btn").forEach(btn => {
            btn.addEventListener("click", () => {
            const item = btn.closest(".mypage-reservation-item");
            item.classList.toggle("open");
            btn.textContent = item.classList.contains("open") ? "접기" : "상세보기";
            });
        });

        listEl.querySelectorAll(".review-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const item = btn.closest(".mypage-reservation-item");
                const contentId = item.dataset.contentId; // 예약 콘텐츠 식별자
                window.location.href = `./review.html?contentId=${contentId}`;
            });
        });

        // D-Day 계산
        listEl.querySelectorAll(".mypage-reservation-item.upcoming").forEach(item => {
            const dateText = item.querySelector(".reservation-date").textContent;
            const [year, month, day] = dateText.split("-").map(Number);
            const checkIn = new Date(year, month - 1, day);
            const diff = Math.ceil((checkIn - new Date()) / (1000 * 60 * 60 * 24));
            item.querySelector(".d-day").textContent = `D-${diff}`;
        });
    }
    renderReservations(reservations, reviews);


    /* ===================== 
    예약 탭 필터 + 페이지네이션 
    ===================== */
    const tabs = document.querySelectorAll(".reservation-tab");
    const container = document.querySelector(".reservation-pagination");
    const perPage = 4;
    let currentPage = 1;

    // 페이지네이션 렌더링 함수 (항상 전달받은 items 기준)
    function renderReservationPage(items) {
        const totalPage = Math.ceil(items.length / perPage);
        if (currentPage > totalPage) currentPage = totalPage || 1;

        // 모든 항목 숨기기
        document.querySelectorAll(".mypage-reservation-item").forEach(item => item.style.display = "none");

        // 현재 페이지 항목만 표시
        items.slice((currentPage - 1) * perPage, currentPage * perPage)
            .forEach(item => item.style.display = "flex");

        // 페이지네이션 버튼 렌더
        container.innerHTML = "";
        for (let i = 1; i <= totalPage; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            if (i === currentPage) btn.classList.add("active");
            btn.onclick = () => {
                currentPage = i;
                renderReservationPage(items);
            };
            container.appendChild(btn);
        }
    }

    // 탭 클릭 시 필터 적용
    tabs.forEach((tab, idx) => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            currentPage = 1; // 탭 바뀌면 1페이지부터 시작

            // 현재 탭 기준 필터링
            const allItems = [...document.querySelectorAll(".mypage-reservation-item")];
            const filteredItems = allItems.filter(item =>
                idx === 0 ||
                (idx === 1 && item.classList.contains("upcoming")) ||
                (idx === 2 && item.classList.contains("completed"))
            );

            renderReservationPage(filteredItems); // 💡 필터된 항목만 페이지네이션
        });
    });

    // 초기 로드 시 전체 페이지네이션
    renderReservationPage([...document.querySelectorAll(".mypage-reservation-item")]);


    /* =====================  
    후기 리스트 렌더링 + 최신순 정렬 + 삭제(모달) + 페이지네이션 
    ===================== */
    function renderReviews(reviews) {
        const reviewList = document.querySelector(".mypage-review-list");
        const sortSelect = document.getElementById("sortSelect");
        const reviewDeleteModal = document.getElementById("reviewDeleteModal");
        const modalCancel = reviewDeleteModal.querySelector(".cancel");
        const modalConfirm = reviewDeleteModal.querySelector(".confirm");

        reviewList.innerHTML = "";

        // 후기 li 생성
        reviews.forEach(r => {
            const li = document.createElement("li");
            li.className = "mypage-review-item";
            li.dataset.id = r.id; // Firestore 문서 ID
            li.dataset.date = r.date.toDate().toISOString(); // 정렬용

            li.innerHTML = `
            <div class="review-left">
                ${r.img ? `<img src="${r.img}" alt="리뷰 이미지" />` : ""}
            </div>
            <div class="review-center">
                <div class="review-header">
                <span class="review-title">${r.title}</span>
                <span class="review-date">
                    ${r.date.toDate().toLocaleDateString()}
                </span>
                </div>
                <p class="review-rating">${"⭐".repeat(r.rating)}</p>
                <p class="review-content">${r.content}</p>
            </div>
            <div class="review-right">
                <button class="review-action-btn danger">삭제</button>
            </div>
            `;
            reviewList.appendChild(li);
        });

        /* ===================== 후기 영역 페이지네이션 ===================== */
        function setupReviewPagination(items) {
            const container = document.querySelector(".review-pagination");
            const perPage = 4;
            let currentPage = 1;

            function renderPage() {
            const totalPage = Math.ceil(items.length / perPage);
            if (currentPage > totalPage) currentPage = totalPage || 1;

            items.forEach((item, idx) => {
                item.style.display =
                idx >= (currentPage - 1) * perPage &&
                idx < currentPage * perPage
                    ? "flex"
                    : "none";
            });

            container.innerHTML = "";
            for (let i = 1; i <= totalPage; i++) {
                const btn = document.createElement("button");
                btn.textContent = i;
                if (i === currentPage) btn.classList.add("active");
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
            }
            };
        }

        // 최신순 정렬
        let reviewItems = [...reviewList.children];
        reviewItems.sort(
            (a, b) => new Date(b.dataset.date) - new Date(a.dataset.date)
        );
        reviewItems.forEach(item => reviewList.appendChild(item));

        const reviewPagination = setupReviewPagination(reviewItems);

        /* ===================== 리뷰 삭제 모달  ===================== */
        let targetToDelete = null;

        reviewList.addEventListener("click", e => {
            const btn = e.target.closest(".review-action-btn");
            if (!btn) return;

            targetToDelete = btn.closest("li");
            reviewDeleteModal.classList.remove("hidden");
        });

        modalCancel.addEventListener("click", () => {
            targetToDelete = null;
            reviewDeleteModal.classList.add("hidden");
        });

        modalConfirm.addEventListener("click", async () => {
            if (!targetToDelete) return;

            const reviewId = targetToDelete.dataset.id;

            // Firestore 삭제
            await deleteDoc(doc(db, "review_for_mypage_test", reviewId));

            // UI 반영
            targetToDelete.remove();
            reviewItems = reviewItems.filter(i => i !== targetToDelete);
            reviewPagination.setItems(reviewItems);

            targetToDelete = null;
            reviewDeleteModal.classList.add("hidden");
        });

        /* ===================== 리뷰 정렬 필터 ===================== */
        sortSelect.addEventListener("change", () => {
            reviewItems.sort((a, b) => {
                if (sortSelect.value === "별점순") {
                    return (
                    b.querySelector(".review-rating").textContent.length -
                    a.querySelector(".review-rating").textContent.length
                    );
                } else {
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                }
            });

            reviewItems.forEach(item => reviewList.appendChild(item));
            reviewPagination.setItems(reviewItems);
        });
    }

    renderReviews(reviews);



    /* =====================
        프로필 수정
    ===================== */
    async function updateUserProfile(data) {
        const userRef = doc(db, "users", currentUserDocId);
        await updateDoc(userRef, data); // 기존 문서는 유지, 전달한 필드만 변경
    }

    const profileBtn = document.querySelector(".profile-btn");
    const profileInfo = document.querySelector(".profile-info");
    const profileImg = document.querySelector(".profile-img");

    let editing = false; // 수정 여부

    const imgInput = document.createElement("input");
    imgInput.type = "file";
    imgInput.accept = "image/*";
    imgInput.style.display = "none";
    document.body.appendChild(imgInput);

    // 프로필 이미지 래퍼 생성
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "profile-img-wrapper";
    imgWrapper.style.position = "relative";
    imgWrapper.style.width = profileImg.width + "px";
    imgWrapper.style.height = profileImg.height + "px";

    // 기존 이미지 래퍼 안으로 이동
    profileImg.parentNode.insertBefore(imgWrapper, profileImg);
    imgWrapper.appendChild(profileImg);

    // 업로드 버튼 생성
    const uploadBtn = document.createElement("button");
    uploadBtn.textContent = "업로드";
    uploadBtn.style.position = "absolute";
    uploadBtn.style.bottom = "5px";
    uploadBtn.style.left = "50%";
    uploadBtn.style.transform = "translateX(-50%)";
    uploadBtn.style.background = "rgba(0,0,0,0.6)";
    uploadBtn.style.color = "#fff";
    uploadBtn.style.border = "none";
    uploadBtn.style.padding = "4px 10px";
    uploadBtn.style.borderRadius = "12px";
    uploadBtn.style.cursor = "pointer";
    uploadBtn.style.fontSize = "12px";

    // 버튼 클릭 → 파일 선택
    uploadBtn.addEventListener("click", () => {
        if (editing) imgInput.click();
    });

    // 버튼을 래퍼 안에 추가
    imgWrapper.appendChild(uploadBtn);

    // 파일 선택 → 미리보기
    imgInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => (profileImg.src = event.target.result);
            reader.readAsDataURL(file);
        }
    });

    

    // 프로필 수정 버튼
    profileBtn.addEventListener("click", async() => {
        if (!editing) {// 기본 상태 -> 수정 모드
            // 기존 프로필 텍스트를 input으로 바꿔서 수정 가능하게 함
            profileInfo.innerHTML = `
            <input value="${profileInfo.querySelector(".profile-name").textContent}" />
            <input value="${profileInfo.querySelector(".profile-email").textContent}" />
            <input value="${profileInfo.querySelector(".profile-phone").textContent}" placeholder="전화번호를 입력해주세요."/>
            `;
            profileBtn.textContent = "저장";
            editing = true;
            uploadBtn.style.display = "block"; // 이미지 업로드 버튼 보이기
        } else { // 수정 모드 -> 기본 상태
            // 입력된 input 요소들 가져오기
            const inputs = profileInfo.querySelectorAll("input");
            // 입력값을 객체로 정리
            const updatedData = {
                name: inputs[0].value,
                email: inputs[1].value,
                phone: inputs[2].value,
            };

            await updateUserProfile(updatedData);

            profileInfo.innerHTML = `
                <p class="profile-name">${updatedData.name}</p>
                <p class="profile-email">${updatedData.email}</p>
                <p class="profile-phone">${updatedData.phone}</p>
            `;

            document.querySelector(".mypage-name").textContent = updatedData.name;

            profileBtn.textContent = "프로필 수정";
            editing = false;
            uploadBtn.style.display = "none";
        }

    });

    // 초기엔 버튼 숨김
    uploadBtn.style.display = "none";


    /* =====================
        모달 공통
    ===================== */
    function modalControl(openBtn, modal, confirmCb) {
        openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
        modal.querySelector(".cancel").onclick = () =>
            modal.classList.add("hidden");
        modal.querySelector(".confirm").onclick = () => {
            confirmCb && confirmCb();
            modal.classList.add("hidden");
        };
    }

    /* =====================
        비밀번호 수정 모달
    ===================== */
    async function updateUserPassword(newPassword) {
        const userRef = doc(db, "users", currentUserDocId);
        await updateDoc(userRef, {
            password: newPassword,
        });
    }

    // 비밀번호 변경 확인 모달
    const passwordModal = document.getElementById("passwordModal");
    const passwordInputs = passwordModal.querySelectorAll("input");

    // 변경 완료 모달
    const passwordSuccessModal = document.createElement("div");
    passwordSuccessModal.className = "modal hidden";
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
    const passwordFailModal = document.createElement("div");
    passwordFailModal.className = "modal hidden";
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
        openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
        modal.querySelector(".cancel").onclick = () => modal.classList.add("hidden");

        modal.querySelector(".confirm").onclick = async () => {
            if (modal === passwordModal) {
                const inputCurrent = passwordInputs[0].value; // 현재 비밀번호 입력
                const inputCheck = passwordInputs[1].value;   // 현재 비밀번호 확인
                const newPass = passwordInputs[2].value;      // 새 비밀번호

                // 1️⃣ 기존 비밀번호 검증
                if (inputCurrent===currentUserPassword && inputCurrent===inputCheck && newPass !== "" ){
                    await updateUserPassword(newPass);
                    currentUserPassword = newPass; // pw 갱신
                    passwordModal.classList.add("hidden");
                    passwordSuccessModal.classList.remove("hidden");
                } else {
                    passwordModal.classList.add("hidden");
                    passwordFailModal.classList.remove("hidden");
                }

                passwordInputs.forEach(input => (input.value = ""));
            }
        };

    }

    // 완료 / 실패 모달 확인 버튼
    passwordSuccessModal.querySelector(".confirm").onclick = () => passwordSuccessModal.classList.add("hidden");
    passwordFailModal.querySelector(".confirm").onclick = () => passwordFailModal.classList.add("hidden");

    // 적용
    modalControl(
        document.querySelectorAll(".profile-btn")[1],
        passwordModal
    );


    /* =====================
        계정 탈퇴 모달
    ===================== */
    modalControl(  // 프로필 계정 탈퇴
        document.querySelector(".profile-btn.danger"),
        document.getElementById("withdrawModal"),
        () => (location.href = "../index.html")
    );
});
