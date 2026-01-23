export function initCharCounter(textareaId, countId, maxLimit = 1000) {
    const textarea = document.getElementById(textareaId);
    const countDisplay = document.getElementById(countId);

    if (!textarea || !countDisplay) return;

    textarea.addEventListener('input', () => {
        let length = textarea.value.length;

        if (length > maxLimit) {
            textarea.value = textarea.value.substring(0, maxLimit);
            length = maxLimit;
        }

        countDisplay.textContent = length;
    });
}