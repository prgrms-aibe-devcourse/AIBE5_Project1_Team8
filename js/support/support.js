import { db } from '../common/firebase-config.js';
import { addDoc, getDocs, collection, query, where,} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';


// 로그인 상태 가져오기
const isLoggedIn = localStorage.getItem("auth_isLoggedIn") === "true";
const userId = JSON.parse(localStorage.getItem("auth_user") || '{}').uid || '';

document.addEventListener('DOMContentLoaded', async() => {
    /*==================================================
        [통합 실행] 모든 기능 초기화
    ================================================== */
    initFaqAccordion();
    // initAccordion();       // FAQ / 문의내역 아코디언
    initFaqManager();      // FAQ 검색 + 탭 필터
    initModal();           // 문의 작성 모달
    initImagePreview();    // 이미지 미리보기
    initCharCounter();     // 글자 수 카운트
    initSaveButton();      // 저장 버튼

    const inquiries = await fetchMyInquiries(); // 문의 내역 조회
    renderInquiries(inquiries);
    initInquiryAccordion(); // 렌더 후 실행
    initInquiryTabs(); // 탭 필터 기능
    
});

/* ==================================================
   0. 나의 문의 내역 데이터 조회
================================================== */
async function fetchMyInquiries() {
    if (!userId) return [];

    const q = query(
        collection(db, "inquiry"),
        where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);
    const inquiries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return inquiries;
}

/* ==================================================
   1. 아코디언 (FAQ, 문의내역 공통)
================================================== */
// function initAccordion() {
//     const triggers = document.querySelectorAll(
//         '.faq-trigger, .inquiry-trigger'
//     );
//     triggers.forEach(trigger => {
//         trigger.addEventListener('click', () =inquiry-trigger> {
//             trigger.classList.toggle('active');
//         });
//     });
// }
function initFaqAccordion() {
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            trigger.classList.toggle('active');
        });
    });
}

function initInquiryAccordion() {
    const inquiryTriggers = document.querySelectorAll('.inquiry-trigger');
    inquiryTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            trigger.classList.toggle('active');
        });
    });
}

/* ==================================================
   2. FAQ 관리 (검색 + 탭 필터)
================================================== */
function initFaqManager() {
    const searchInput = document.getElementById('faqSearchInput');
    const faqTabs     = document.getElementById('faqTabs');
    const faqList     = document.getElementById('faqList');
    const faqItems    = document.querySelectorAll('.faq-item');
    if (!faqList) return;
    /* 결과 없음 메시지 */
    let noResultMsg = document.querySelector('.no-result');
    if (!noResultMsg) {
        noResultMsg = document.createElement('div');
        noResultMsg.className = 'no-result';
        noResultMsg.style.cssText = `
            text-align: center;
            padding: 30px;
        `;
        noResultMsg.innerText = '검색 결과가 없습니다.';
        faqList.appendChild(noResultMsg);
    }
    function filterFaq() {
        const keyword = searchInput
            ? searchInput.value.toLowerCase().trim()
            : '';
        const activeTab = faqTabs
            ? faqTabs.querySelector('.tab.active')
            : null;
        const filterValue = activeTab ? activeTab.dataset.filter : 'all';
        let visibleCount = 0;
        faqItems.forEach(item => {
            const text     = item.textContent.toLowerCase();
            const category = item.dataset.category;
            const matchSearch = text.includes(keyword);
            const matchTab    = filterValue === 'all' || category === filterValue;
            if (matchSearch && matchTab) {
                item.classList.remove('item-hidden');
                visibleCount++;
            } else {
                item.classList.add('item-hidden');
            }
        });
        noResultMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
    if (searchInput) {
        searchInput.addEventListener('input', filterFaq);
    }
    if (faqTabs) {
        faqTabs.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                faqTabs.querySelectorAll('.tab')
                       .forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                filterFaq();
            });
        });
    }
}
/* ==================================================
   3. 문의내역 탭 필터
================================================== */
function initInquiryTabs() {
    const inquiryTabs  = document.getElementById('inquiryTabs');
    const inquiryItems = document.querySelectorAll('.inquiry-item');
    if (!inquiryTabs) return;
    inquiryTabs.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const filterValue = tab.dataset.filter;
            inquiryTabs.querySelectorAll('.tab')
                       .forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            inquiryItems.forEach(item => {
                const status = item.dataset.status;
                item.style.display =
                    filterValue === 'all' || status === filterValue
                        ? 'block'
                        : 'none';
            });
        });
    });
}
/* ==================================================
   4. 문의 작성 모달
================================================== */
function initModal() {
    const modal   = document.getElementById('inquiryModal');
    const openBtn = document.getElementById('openModalBtn');
    if (!modal || !openBtn) return;
    const closeBtn = modal.querySelector('.close-modal');
    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}
/* ==================================================
   5. 이미지 미리보기
================================================== */
function initImagePreview() {
    const input   = document.getElementById('imgInput');
    const preview = document.getElementById('imgPreview');
    if (!input || !preview) return;
    input.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            preview.innerHTML = `
                <div class="preview-item">
                    <img src="${ev.target.result}">
                    <button class="preview-remove">×</button>
                </div>
            `;
            preview.querySelector('.preview-remove')
                   .addEventListener('click', () => {
                       preview.innerHTML = '';
                       input.value = '';
                   });
        };
        reader.readAsDataURL(file);
    });
}

/* ==================================================
   6. 글자 수 카운트
================================================== */
function initCharCounter() {
    const text    = document.getElementById('inquiryContent');
    const counter = document.getElementById('currentChars');
    if (!text || !counter) return;
    text.addEventListener('input', () => {
        counter.innerText = text.value.length;
    });
}
/* ==================================================
   7. 저장 버튼
================================================== */

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

async function initSaveButton() {
    const saveBtn = document.getElementById('saveInquiryBtn');
    if (!saveBtn) return;

    saveBtn.addEventListener('click', async () => {
        const title        = document.getElementById('inquiryTitle'); // 문의 제목
        const typeInput    = document.getElementById('inquiryType');  // 문의 유형
        const contentInput = document.getElementById('inquiryContent'); // 문의 내용
        const imgInput     = document.getElementById('imgInput');       // 이미지 파일 input

        // 필수 입력 체크
        if (!title.value.trim() || !typeInput.value.trim() || !contentInput.value.trim()) {
            triggerToast('내용을 모두 입력해주세요.', 'error');
            return;
        }

        // 이미지 Base64 변환
        let imgBase64 = null;
        if (imgInput.files && imgInput.files[0]) {
            imgBase64 = await compressAndEncode(imgInput.files[0]);
        }

        const inquiryData = {
            userId: userId || '',              // 로그인된 사용자 ID
            type: typeInput.value.trim(),      // 문의 유형
            title: title.value.trim(),         // 문의 제목
            content: contentInput.value.trim(),// 문의 내용
            img: imgBase64 || null,            // 이미지 (없으면 null)
            state: '처리중',
            answer: null,
            date: new Date(),
        };


        try {
            const docRef = await addDoc(collection(db, "inquiry"), inquiryData);
            console.log("문의가 저장되었습니다. ID:", docRef);
            triggerToast('성공적으로 접수되었습니다.', 'success');

            // 입력폼 초기화 (페이지 새로고침 없이)
            typeInput.value = '';
            contentInput.value = '';
            imgInput.value = '';
            document.getElementById('imgPreview').innerHTML = '';

        } catch (error) {
            console.error("문의 저장 중 오류:", error);
            triggerToast('문의 저장에 실패했습니다.', 'error');
        }
 
        console.log('문의 데이터:', inquiryData);

        triggerToast('성공적으로 접수되었습니다.', 'success');
        setTimeout(() => location.reload(), 1500);
    });
}


/* ==================================================
   8. 토스트 메시지
================================================== */
function triggerToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast-container toast-${type} show`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

/* ==================================================
   9. 나의 문의 내역으로 이동
================================================== */
document.addEventListener('DOMContentLoaded', function() {
    const goMyInquiryBtn = document.getElementById('goMyInquiryBtn');
    const myInquirySection = document.getElementById('myInquirySection');
    if (goMyInquiryBtn && myInquirySection) {
        goMyInquiryBtn.addEventListener('click', function() {
            // 해당 섹션으로 부드럽게 이동
            myInquirySection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});




/* ==================================================
   문의 내역 렌더링
================================================== */
function renderInquiries(inquiries) {
    const list = document.getElementById('myInquiryList');
    if (!list) return;

    list.innerHTML = ''; // 기존 내용 초기화

    inquiries.forEach(item => {
        const statusText = item.state === '처리중' ? 'pending' : 'completed';
        const statusClass = statusText === 'completed' ? 'completed' : '';

        const li = document.createElement('div');
        li.className = 'inquiry-item';
        li.dataset.status = statusText;
        li.innerHTML = `
            <button class="card flex-between inquiry-trigger">
                <span>[${item.type}] ${item.title}</span>
                <span class="status-frame ${statusClass}">
                    ${item.state === '처리중' ? '처리중' : '답변 완료'}
                </span>
            </button>
            <div class="inquiry-content-box">
                <div class="inquiry-detail">
                    <p><strong>문의내용:</strong> ${item.content}</p>
                    <div class="reply-box">
                        <strong>답변:</strong> ${item.answer || '확인 중에 있습니다.'}
                    </div>
                </div>
            </div>
        `;
        list.appendChild(li);
    });
}


/* ==================================================
   로그인 여부에 따른 요소 표시
================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const myInquirySection = document.getElementById('myInquirySection'); // 문의 섹션 (로그인 필요)
    const goMyInquiryBtn = document.getElementById('goMyInquiryBtn');
    const openModalBtn = document.getElementById('openModalBtn');
    if (isLoggedIn) {
        console.log("로그인 상태입니다.");
        if (myInquirySection) myInquirySection.style.display = 'block'; // 로그인 상태면 보여주기
        if (goMyInquiryBtn) goMyInquiryBtn.style.display = 'block'; // 로그인 상태면 보여주기
        if (openModalBtn) openModalBtn.style.display = 'block'; // 로그인 상태면 보여주기
    } else {
        console.log("로그아웃 상태입니다.");
        if (myInquirySection) myInquirySection.style.display = 'none';  // 로그아웃 상태면 숨기기
        if (goMyInquiryBtn) goMyInquiryBtn.style.display = 'none';  // 로그아웃 상태면 숨기기
        if (openModalBtn) openModalBtn.style.display = 'none';  // 로그아웃 상태면 숨기기
    }
});

