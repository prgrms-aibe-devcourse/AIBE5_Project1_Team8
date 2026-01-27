/**
 * 이미지를 압축하여 Base64 문자열로 반환합니다.
 * firestore 용량 문제로 저장하기 전 클라이언트 사이드에서 최적화 하기 위함.
 * @param {File} file - 업로드된 이미지 파일
 * @param {number} maxWidth - 가로 최대 크기 (기본값 300px)
 * @param {number} quality - 압축 품질 (0.1 ~ 1.0, 기본값 0.7)
 * @returns {Promise<string>} - 압축된 Base64 문자열
 */
export function compressImage(file, maxWidth = 300, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                
                // 원본 비율 유지하며 크기 계산
                const scale = maxWidth / img.width;
                canvas.width = maxWidth;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext('2d');
                // 이미지 부드럽게 그리기 설정
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // JPEG 형식으로 압축 (용량 최적화)
                const base64 = canvas.toDataURL('image/jpeg', quality);
                resolve(base64);
            };

            img.onerror = (error) => reject(error);
        };

        reader.onerror = (error) => reject(error);
    });
}