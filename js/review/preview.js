let selectedFiles = []; 

/**
 * [추가] 페이지 이동이나 초기화 시 배열을 비워주는 함수
 */
export function resetSelectedFiles() {
    selectedFiles = [];
}

/**
 * @description 이미지 미리보기 초기화
 * @param {Function} existingCountGetter - 현재 화면에 있는 기존 사진 개수를 반환하는 함수
 */
export function initImagePreview(inputId, containerId, countId, maxFiles = 9, existingCountGetter = () => 0) {
    const fileInput = document.getElementById(inputId);
    const previewContainer = document.getElementById(containerId);
    const countDisplay = document.getElementById(countId);

    if (!fileInput || !previewContainer || !countDisplay) return;

    fileInput.addEventListener('change', (e) => {
        const newFiles = Array.from(e.target.files);
        
        const currentTotal = existingCountGetter() + selectedFiles.length;
        if (currentTotal + newFiles.length > maxFiles) {
            alert(`사진은 최대 ${maxFiles}장까지만 업로드할 수 있습니다.`);
            fileInput.value = '';
            return;
        }

        selectedFiles = [...selectedFiles, ...newFiles];
        renderPreviews(previewContainer, countDisplay, maxFiles, existingCountGetter);
        fileInput.value = ''; 
    });
}

function renderPreviews(container, countDisplay, maxFiles, existingCountGetter) {
    container.innerHTML = ''; 
    
    // 전체 개수 업데이트 (기존 + 신규)
    const totalCount = existingCountGetter() + selectedFiles.length;
    countDisplay.textContent = `${totalCount}/${maxFiles}`;

    selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const item = document.createElement('div');
            item.className = 'preview-item';
            item.innerHTML = `
                <img src="${e.target.result}" class="preview-thumbnail">
                <button type="button" class="delete-btn">×</button>
            `;

            item.querySelector('.delete-btn').addEventListener('click', () => {
                item.classList.add('fade-out');
                item.addEventListener('transitionend', () => {
                    selectedFiles.splice(index, 1);
                    renderPreviews(container, countDisplay, maxFiles, existingCountGetter);
                }, { once: true });
            });

            container.appendChild(item);
        };
        reader.readAsDataURL(file);
    });
}

export function getSelectedFiles() {
    return selectedFiles;
}