/* ==================================================
   [통합 실행] 모든 기능 초기화
================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initAccordion();       // FAQ / 문의내역 아코디언
    initFaqManager();      // FAQ 검색 + 탭 필터
    initInquiryTabs();     // 문의내역 탭 필터
    initModal();           // 문의 작성 모달
    initImagePreview();    // 이미지 미리보기
    initCharCounter();     // 글자 수 카운트
    initSaveButton();      // 저장 버튼
});


/* ==================================================
   1. 아코디언 (FAQ, 문의내역 공통)
================================================== */
function initAccordion() {
    const triggers = document.querySelectorAll(
        '.faq-trigger, .inquiry-trigger'
    );

    triggers.forEach(trigger => {
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
function initSaveButton() {
    const saveBtn = document.getElementById('saveInquiryBtn');
    if (!saveBtn) return;

    saveBtn.addEventListener('click', () => {
        const title   = document.getElementById('inquiryTitle');
        const content = document.getElementById('inquiryContent');

        if (!title.value.trim() || !content.value.trim()) {
            triggerToast('내용을 모두 입력해주세요.', 'error');
            return;
        }

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