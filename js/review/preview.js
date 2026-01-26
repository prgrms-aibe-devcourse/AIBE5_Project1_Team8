// 현재 선택된 파일들을 담는 전역 배열 (페이지가 열려있는 동안 유지됨)
let selectedFiles = []; 

/**
 * @description 이미지 미리보기 및 삭제 기능 초기화
 */
export function initImagePreview(inputId, containerId, countId, maxFiles = 9) {
    const fileInput = document.getElementById(inputId);
    const previewContainer = document.getElementById(containerId);
    const countDisplay = document.getElementById(countId);

    if (!fileInput || !previewContainer || !countDisplay) return;

    // 파일 선택이 변경될 때마다 실행
    fileInput.addEventListener('change', (e) => {
        const newFiles = Array.from(e.target.files);
        
        // 1. 최대 개수 제한 체크
        if (selectedFiles.length + newFiles.length > maxFiles) {
            alert(`사진은 최대 ${maxFiles}장까지만 업로드할 수 있습니다.`);
            fileInput.value = ''; // input 초기화
            return;
        }

        // 2. 새로운 파일들을 기존 배열에 추가
        selectedFiles = [...selectedFiles, ...newFiles];

        // 3. 화면 다시 그리기
        renderPreviews(previewContainer, countDisplay, maxFiles);
        
        // 4. 같은 파일을 다시 올릴 수 있도록 input 초기화
        fileInput.value = ''; 
    });
}

/**
 * @description 화면에 썸네일과 삭제 버튼을 그리는 함수
 */
function renderPreviews(container, countDisplay, maxFiles) {
    // 기존 화면을 비우고 새로 그림
    container.innerHTML = ''; 
    countDisplay.textContent = `${selectedFiles.length}/${maxFiles}`;

    selectedFiles.forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            // 미리보기 아이템 생성
            const item = document.createElement('div');
            item.className = 'preview-item';
            
            item.innerHTML = `
                <img src="${e.target.result}" class="preview-thumbnail">
                <button type="button" class="delete-btn">×</button>
            `;

            // 삭제 버튼 이벤트 연결
            item.querySelector('.delete-btn').addEventListener('click', () => {
                // // 삭제 애니메이션 실행
                item.classList.add('fade-out'); // classList.add() 요소에 클래스 값을 추가한다.

                // 애니메이션이 끝나면 실제 데이터 삭제 및 재랜더링
                item.addEventListener('transitionend', () => {
                    selectedFiles.splice(index, 1);
                    renderPreviews(container, countDisplay, maxFiles);
                }, { once: true });
            });

            container.appendChild(item);
        };

        // 파일을 읽어서 이미지 경로(Base64)로 변환
        reader.readAsDataURL(file);
    });
}

/**
 * 최종 선택된 파일 배열을 반환 (제출 시 db.js에서 사용)
 */
export function getSelectedFiles() {
    return selectedFiles;
}