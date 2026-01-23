// IndexedDB 사용해 리뷰 데이터 저장

const DB_NAME = 'TravelReviewDB';
const DB_VERSION = 1;
const STORE_NAME = 'reviews';

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // 'reviews' 저장소 생성 (자동 증가 ID 사용)
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('DB를 열 수 없습니다.');
    });
}

// 리뷰 데이터 저장 함수
export async function saveReview(reviewData) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(reviewData);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('리뷰 저장 실패');
    });
}