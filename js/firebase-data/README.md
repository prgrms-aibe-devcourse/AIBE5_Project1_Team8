# Firebase 데이터 가져오기 모듈

한국 관광공사 API에서 가져온 데이터를 Firebase Firestore에 저장한 후, 이를 필터별로 정리하여 사용하는 모듈입니다.

## 설정 방법

### 1. Firebase 설정 파일 생성

`js/common/firebase-config.js` 파일을 생성하고 Firebase 프로젝트 설정 정보를 입력하세요:

```javascript
// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
```

### 2. Firebase Firestore 데이터 구조

Firestore의 `spots` 컬렉션에 한국 관광공사 API 데이터가 다음과 같은 구조로 저장되어 있어야 합니다:

```javascript
{
  contentid: "123456",           // 한국 관광공사 API contentid
  title: "경복궁",                // 관광지 이름
  addr1: "서울특별시 종로구...",  // 주소
  tel: "02-3700-3900",            // 전화번호
  firstimage: "https://...",     // 대표 이미지
  contentTypeId: "12",           // 콘텐츠 타입 ID
  cat1: "A01",                    // 대분류
  cat2: "A0101",                  // 중분류
  cat3: "",                       // 소분류
  mapx: "126.977",                // 경도
  mapy: "37.579",                 // 위도
  overview: "조선 왕조의...",     // 개요
  homepage: "http://...",         // 홈페이지
  category: "culture"             // 앱 내부 카테고리 (선택사항)
}
```

## 사용 방법

### 기본 사용법

```javascript
import { initializeData } from './js/firebase-data.js/data-import.js';

// 데이터 초기화
const data = await initializeData();

// 개별 카테고리 데이터 접근
console.log(data.accommodationData);  // 숙박 데이터
console.log(data.cultureData);        // 문화 데이터
console.log(data.restaurantData);     // 식당 데이터
console.log(data.natureData);         // 자연 데이터
console.log(data.leisureData);        // 레저 데이터
console.log(data.shoppingData);       // 쇼핑 데이터

// 통합 데이터 접근
console.log(data.allData['전체']);    // 전체 데이터
console.log(data.allData['지역']);    // 지역 데이터
console.log(data.allData['즐길거리']); // 즐길거리 데이터
console.log(data.allData['숙소']);     // 숙소 데이터
```

### 검색 탭별 데이터 가져오기

```javascript
import { getDataBySearchTab } from './js/firebase-data.js/data-import.js';

const 전체데이터 = await getDataBySearchTab('전체');
const 지역데이터 = await getDataBySearchTab('지역');
const 즐길거리데이터 = await getDataBySearchTab('즐길거리');
const 숙소데이터 = await getDataBySearchTab('숙소');
```

### 카테고리별 데이터 가져오기

```javascript
import { getDataByCategory } from './js/firebase-data.js/data-import.js';

const 숙박데이터 = await getDataByCategory('accommodation');
const 문화데이터 = await getDataByCategory('culture');
const 식당데이터 = await getDataByCategory('restaurant');
```

### 지역별 데이터 가져오기

```javascript
import { getDataByRegion } from './js/firebase-data.js/data-import.js';

const 서울데이터 = await getDataByRegion('seoul');
const 부산데이터 = await getDataByRegion('busan');
const 제주데이터 = await getDataByRegion('jeju');
```

### 통합 검색

```javascript
import { searchData } from './js/firebase-data.js/data-import.js';

// 검색 탭 + 키워드
const 결과1 = await searchData({
  searchTab: '지역',
  keyword: '서울'
});

// 카테고리 + 지역 + 키워드
const 결과2 = await searchData({
  category: 'culture',
  region: 'seoul',
  keyword: '궁'
});

// 검색 탭 + 지역
const 결과3 = await searchData({
  searchTab: '숙소',
  region: '제주'
});
```

### 페이지네이션

```javascript
import { fetchDataWithPagination } from './js/firebase-data.js/data-import.js';

const page1 = await fetchDataWithPagination('culture', 1, 10);
console.log(page1.data);      // 데이터 배열
console.log(page1.hasMore);   // 더 있는지 여부
console.log(page1.page);      // 현재 페이지
console.log(page1.pageSize);  // 페이지 크기
```

## hotel.js에서 사용하기

기존 `hotel.js`의 하드코딩된 데이터를 Firebase 데이터로 교체:

```javascript
import { initializeData } from '../firebase-data.js/data-import.js';

// 기존 하드코딩된 데이터 대신
const data = await initializeData();

// 기존 구조와 호환되도록 매핑
const allDataOriginal = data.allDataOriginal;
const allData = data.allData;

// 나머지 코드는 동일하게 사용
```

## 한국 관광공사 API contentTypeId 매핑

| contentTypeId | 카테고리 | 설명 |
|--------------|---------|------|
| 12 | nature | 관광지 |
| 14 | culture | 문화시설 |
| 15 | leisure | 축제공연행사 |
| 25 | leisure | 여행코스 |
| 28 | leisure | 레포츠 |
| 32 | accommodation | 숙박 |
| 38 | shopping | 쇼핑 |
| 39 | restaurant | 식당 |

## 주의사항

1. Firebase 설정 파일(`firebase-config.js`)에 실제 Firebase 프로젝트 정보를 입력해야 합니다.
2. Firestore의 `spots` 컬렉션에 한국 관광공사 API 데이터가 저장되어 있어야 합니다.
3. 데이터가 많을 경우 페이지네이션을 사용하는 것을 권장합니다.
4. 네트워크 오류 시 에러 처리를 추가하세요.
