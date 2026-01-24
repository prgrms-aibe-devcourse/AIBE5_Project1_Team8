/**
 * @description 리뷰 작성 글자수 세어 주고,
 * 30자 조건에 따라 색 바꿈
 * 
 * @param {string} textareaId - textarea 요소의 ID
 * @param {string} countId - 숫자를 표시할 span 요소의 ID
 */

export function initCharCounter(textareaId, countId) {
    const textarea = document.getElementById(textareaId);
    const countDisplay = document.getElementById(countId);
    const MAX_CHARS = 500; // 최대 글자 수 설정

    if (!textarea || !countDisplay) return;

    textarea.addEventListener('input', () => {
        let length = textarea.value.length;

        // 혹시나 복사 붙여넣기로 500자가 넘는 경우를 대비해 한 번 더 자름
        if (length > MAX_CHARS) {
            textarea.value = textarea.value.substring(0, MAX_CHARS);
            length = MAX_CHARS;
        }

        updateCount(length, countDisplay);
    });
}

function updateCount(length, countDisplay) {
    countDisplay.textContent = length;

    if (length < 30) {
        // 30자 미만이면 warning 클래스 추가
        countDisplay.classList.add('warning');
        countDisplay.classList.remove('success');
    } else {
        // 30자 이상이면 success 클래스로 교체
        countDisplay.classList.remove('warning');
        countDisplay.classList.add('success');
    }
}