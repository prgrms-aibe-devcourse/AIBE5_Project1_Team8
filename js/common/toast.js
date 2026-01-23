/**
 * @param {string} message - 표시할 문구
 * @param {'success' | 'error' | 'info'} type - 종류
 * @param {number} duration - 표시 시간
 */
export function showToast(message, type = 'success', duration = 3000) {
    // 1. 이미 떠 있는 토스트가 있다면 제거 (중복 방지)
    const existingToast = document.querySelector('.toast-container');
    if (existingToast) {
        existingToast.remove();
    }

    // 2. 새로운 토스트 생성
    const toast = document.createElement('div');
    toast.className = `toast-container toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // 3. 나타나기
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // 4. 사라지기
    setTimeout(() => {
        toast.classList.remove('show');

        // 애니메이션 완료 후 요소 완전 삭제
        toast.addEventListener('transitionend', () => {
            toast.remove();
        });
    }, duration);
}
