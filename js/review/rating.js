export function initStarRating(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const stars = container.querySelectorAll('.star');

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('filled');
                    s.textContent = '★';
                } else {
                    s.classList.remove('filled');
                    s.textContent = '☆';
                }
            });
        });
    });
}