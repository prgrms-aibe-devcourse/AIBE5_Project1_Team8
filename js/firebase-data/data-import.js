// Firebase에서 한국 관광공사 API 기반 데이터를 가져와 필터별로 정리하는 모듈

// Firebase 설정 파일 import
import { db } from './firebase.js';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy,
  limit,
  startAfter 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// ===== 카테고리별 데이터 변수 =====
let accommodationData = [];  // 숙박 (호텔)
let cultureData = [];         // 문화 (궁궐, 사찰, 유적지 등)
let restaurantData = [];      // 식당 (맛집, 시장 등)
let natureData = [];          // 자연 (산, 바다, 공원 등)
let leisureData = [];         // 레저 (테마파크, 액티비티 등)
let shoppingData = [];        // 쇼핑 (시장, 쇼핑몰 등)

// ===== Firebase에서 데이터 가져오기 =====
async function fetchDataFromFirebase() {
  try {
    // Firestore 컬렉션 참조 (한국 관광공사 API 데이터가 저장된 컬렉션)
    const spotsCollection = collection(db, 'spots');
    
    // 모든 데이터 가져오기 (한국 관광공사 API에서 가져온 데이터)
    const querySnapshot = await getDocs(spotsCollection);
    
    // 배열 초기화
    accommodationData = [];
    cultureData = [];
    restaurantData = [];
    natureData = [];
    leisureData = [];
    shoppingData = [];
    
    // 카테고리별로 데이터 분류
    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data()
      };
      
      // 한국 관광공사 API 데이터 구조에 맞춰 매핑
      // category 필드에 따라 분류
      const category = data.category || data.contentTypeId || '';
      
      switch (category) {
        case 'accommodation':
        case '32': // 한국 관광공사 API 숙박 contentTypeId
          accommodationData.push(mapKtoDataToAppFormat(data));
          break;
        case 'culture':
        case '14': // 한국 관광공사 API 문화시설 contentTypeId
          cultureData.push(mapKtoDataToAppFormat(data));
          break;
        case 'restaurant':
        case '39': // 한국 관광공사 API 식당 contentTypeId
          restaurantData.push(mapKtoDataToAppFormat(data));
          break;
        case 'nature':
        case '12': // 한국 관광공사 API 관광지 contentTypeId
          // cat1, cat2로 세부 분류
          if (data.cat1 === 'A01' || data.cat2 === 'A0101') {
            natureData.push(mapKtoDataToAppFormat(data));
          } else {
            cultureData.push(mapKtoDataToAppFormat(data));
          }
          break;
        case 'leisure':
        case '28': // 한국 관광공사 API 레포츠 contentTypeId
          leisureData.push(mapKtoDataToAppFormat(data));
          break;
        case 'shopping':
        case '38': // 한국 관광공사 API 쇼핑 contentTypeId
          shoppingData.push(mapKtoDataToAppFormat(data));
          break;
        default:
          // category가 없거나 알 수 없는 경우 title이나 addr1로 추론
          const inferredCategory = inferCategoryFromData(data);
          if (inferredCategory) {
            switch (inferredCategory) {
              case 'accommodation':
                accommodationData.push(mapKtoDataToAppFormat(data));
                break;
              case 'culture':
                cultureData.push(mapKtoDataToAppFormat(data));
                break;
              case 'restaurant':
                restaurantData.push(mapKtoDataToAppFormat(data));
                break;
              case 'nature':
                natureData.push(mapKtoDataToAppFormat(data));
                break;
              case 'leisure':
                leisureData.push(mapKtoDataToAppFormat(data));
                break;
              case 'shopping':
                shoppingData.push(mapKtoDataToAppFormat(data));
                break;
            }
          } else {
            console.warn(`알 수 없는 카테고리: ${category}`, data);
          }
      }
    });
    
    console.log('Firebase 데이터 로드 완료 (한국 관광공사 API 기반):', {
      accommodation: accommodationData.length,
      culture: cultureData.length,
      restaurant: restaurantData.length,
      nature: natureData.length,
      leisure: leisureData.length,
      shopping: shoppingData.length
    });
    
    return {
      accommodationData,
      cultureData,
      restaurantData,
      natureData,
      leisureData,
      shoppingData
    };
    
  } catch (error) {
    console.error('Firebase 데이터 가져오기 실패:', error);
    throw error;
  }
}

// ===== 한국 관광공사 API 데이터를 앱 형식으로 변환 =====
function mapKtoDataToAppFormat(ktoData) {
  return {
    id: ktoData.id || ktoData.contentid || '',
    detailId: ktoData.detailId || ktoData.contentid || 0,
    name: ktoData.name || ktoData.title || '',
    address: ktoData.address || ktoData.addr1 || '',
    contact: ktoData.contact || ktoData.tel || '',
    image: ktoData.image || ktoData.firstimage || ktoData.firstimage2 || '',
    category: ktoData.category || mapContentTypeIdToCategory(ktoData.contentTypeId),
    // 한국 관광공사 API 추가 필드
    mapx: ktoData.mapx || '',
    mapy: ktoData.mapy || '',
    overview: ktoData.overview || '',
    homepage: ktoData.homepage || '',
    // 원본 데이터 보존
    originalData: ktoData
  };
}

// ===== contentTypeId를 카테고리로 변환 =====
function mapContentTypeIdToCategory(contentTypeId) {
  const mapping = {
    '12': 'nature',      // 관광지
    '14': 'culture',     // 문화시설
    '15': 'leisure',     // 축제공연행사
    '25': 'leisure',     // 여행코스
    '28': 'leisure',     // 레포츠
    '32': 'accommodation', // 숙박
    '38': 'shopping',    // 쇼핑
    '39': 'restaurant'   // 식당
  };
  return mapping[contentTypeId] || 'culture';
}

// ===== 데이터에서 카테고리 추론 =====
function inferCategoryFromData(data) {
  const title = (data.title || data.name || '').toLowerCase();
  const addr = (data.addr1 || data.address || '').toLowerCase();
  
  // 키워드 기반 추론
  if (title.includes('호텔') || title.includes('리조트') || title.includes('펜션') || 
      title.includes('모텔') || title.includes('게스트하우스')) {
    return 'accommodation';
  }
  if (title.includes('궁') || title.includes('사찰') || title.includes('유적') || 
      title.includes('박물관') || title.includes('미술관')) {
    return 'culture';
  }
  if (title.includes('맛집') || title.includes('식당') || title.includes('카페') || 
      title.includes('시장') || title.includes('거리')) {
    return 'restaurant';
  }
  if (title.includes('산') || title.includes('해수욕장') || title.includes('공원') || 
      title.includes('해변') || title.includes('섬')) {
    return 'nature';
  }
  if (title.includes('테마파크') || title.includes('워터파크') || title.includes('스키장') || 
      title.includes('골프장')) {
    return 'leisure';
  }
  if (title.includes('쇼핑') || title.includes('아울렛') || title.includes('마트')) {
    return 'shopping';
  }
  
  return null;
}

// ===== 필터별 데이터 통합 =====
function organizeDataByFilters() {
  // 전체 데이터 통합 (기존 구조 유지)
  const allDataOriginal = {
    accommodation: accommodationData,
    culture: cultureData,
    restaurant: restaurantData,
    nature: natureData,
    leisure: leisureData,
    shopping: shoppingData
  };
  
  // 검색 탭 카테고리별 데이터 통합
  const allData = {
    전체: [
      ...accommodationData,
      ...cultureData,
      ...restaurantData,
      ...natureData,
      ...leisureData,
      ...shoppingData
    ],
    지역: [
      ...natureData,
      ...cultureData
    ],
    즐길거리: [
      ...leisureData,
      ...restaurantData,
      ...shoppingData
    ],
    숙소: [
      ...accommodationData
    ]
  };
  
  return {
    allDataOriginal,
    allData
  };
}

// ===== 지역별 필터링 =====
function filterByRegion(dataArray, region) {
  const regionNames = {
    seoul: "서울",
    busan: "부산",
    jeju: "제주",
    gangneung: "강릉",
    gyeongju: "경주",
    yeosu: "여수",
    jeonju: "전주",
    sokcho: "속초",
    incheon: "인천",
    daejeon: "대전"
  };
  
  const regionName = regionNames[region] || region;
  
  return dataArray.filter(item => {
    // address 필드에서 지역명 검색
    return item.address && item.address.includes(regionName);
  });
}

// ===== 카테고리별 필터링 =====
function filterByCategory(dataArray, category) {
  return dataArray.filter(item => item.category === category);
}

// ===== 검색어로 필터링 =====
function filterByKeyword(dataArray, keyword) {
  if (!keyword || keyword.trim() === '') {
    return dataArray;
  }
  
  const lowerKeyword = keyword.toLowerCase();
  
  return dataArray.filter(item => {
    return (
      (item.name && item.name.toLowerCase().includes(lowerKeyword)) ||
      (item.address && item.address.toLowerCase().includes(lowerKeyword)) ||
      (item.contact && item.contact.includes(keyword)) ||
      (item.overview && item.overview.toLowerCase().includes(lowerKeyword))
    );
  });
}

// ===== Firebase에서 카테고리별로 직접 쿼리 =====
export async function fetchDataByCategoryFromFirebase(category) {
  try {
    const spotsCollection = collection(db, 'spots');
    let q;
    
    // 카테고리를 contentTypeId로 변환
    const contentTypeIdMap = {
      'accommodation': '32',
      'culture': '14',
      'restaurant': '39',
      'nature': '12',
      'leisure': '28',
      'shopping': '38'
    };
    
    const contentTypeId = contentTypeIdMap[category];
    
    if (contentTypeId) {
      q = query(
        spotsCollection,
        where('contentTypeId', '==', contentTypeId),
        orderBy('title')
      );
    } else {
      q = query(spotsCollection, orderBy('title'));
    }
    
    const querySnapshot = await getDocs(q);
    const results = [];
    
    querySnapshot.forEach((doc) => {
      results.push(mapKtoDataToAppFormat({
        id: doc.id,
        ...doc.data()
      }));
    });
    
    return results;
  } catch (error) {
    console.error(`카테고리별 데이터 가져오기 실패 (${category}):`, error);
    throw error;
  }
}

// ===== 메인 함수: Firebase에서 데이터 가져와서 정리 =====
export async function initializeData() {
  try {
    // Firebase에서 데이터 가져오기
    await fetchDataFromFirebase();
    
    // 필터별로 데이터 정리
    const { allDataOriginal, allData } = organizeDataByFilters();
    
    return {
      // 개별 카테고리 데이터
      accommodationData,
      cultureData,
      restaurantData,
      natureData,
      leisureData,
      shoppingData,
      
      // 통합 데이터
      allDataOriginal,
      allData,
      
      // 필터 함수들
      filterByRegion,
      filterByCategory,
      filterByKeyword
    };
    
  } catch (error) {
    console.error('데이터 초기화 실패:', error);
    throw error;
  }
}

// ===== 개별 카테고리 데이터 가져오기 =====
export async function getDataByCategory(category) {
  await fetchDataFromFirebase();
  
  switch (category) {
    case 'accommodation':
      return accommodationData;
    case 'culture':
      return cultureData;
    case 'restaurant':
      return restaurantData;
    case 'nature':
      return natureData;
    case 'leisure':
      return leisureData;
    case 'shopping':
      return shoppingData;
    default:
      return [];
  }
}

// ===== 검색 탭별 데이터 가져오기 =====
export async function getDataBySearchTab(tabName) {
  await fetchDataFromFirebase();
  const { allData } = organizeDataByFilters();
  
  return allData[tabName] || [];
}

// ===== 지역별 데이터 가져오기 =====
export async function getDataByRegion(region) {
  await fetchDataFromFirebase();
  const { allData } = organizeDataByFilters();
  
  // 전체 데이터에서 지역 필터링
  const allItems = allData['전체'] || [];
  return filterByRegion(allItems, region);
}

// ===== 통합 검색 (카테고리 + 지역 + 키워드) =====
export async function searchData({ category, region, keyword, searchTab }) {
  await fetchDataFromFirebase();
  const { allData, allDataOriginal } = organizeDataByFilters();
  
  let result = [];
  
  // 1. 검색 탭으로 필터링
  if (searchTab && allData[searchTab]) {
    result = allData[searchTab];
  } else {
    result = allData['전체'];
  }
  
  // 2. 카테고리로 필터링
  if (category && allDataOriginal[category]) {
    result = result.filter(item => item.category === category);
  }
  
  // 3. 지역으로 필터링
  if (region) {
    result = filterByRegion(result, region);
  }
  
  // 4. 키워드로 필터링
  if (keyword) {
    result = filterByKeyword(result, keyword);
  }
  
  return result;
}

// ===== 페이지네이션을 위한 데이터 가져오기 =====
export async function fetchDataWithPagination(category, page = 1, pageSize = 10) {
  try {
    const spotsCollection = collection(db, 'spots');
    const contentTypeIdMap = {
      'accommodation': '32',
      'culture': '14',
      'restaurant': '39',
      'nature': '12',
      'leisure': '28',
      'shopping': '38'
    };
    
    const contentTypeId = contentTypeIdMap[category];
    let q;
    
    if (contentTypeId) {
      q = query(
        spotsCollection,
        where('contentTypeId', '==', contentTypeId),
        orderBy('title'),
        limit(pageSize)
      );
    } else {
      q = query(
        spotsCollection,
        orderBy('title'),
        limit(pageSize)
      );
    }
    
    const querySnapshot = await getDocs(q);
    const results = [];
    
    querySnapshot.forEach((doc) => {
      results.push(mapKtoDataToAppFormat({
        id: doc.id,
        ...doc.data()
      }));
    });
    
    return {
      data: results,
      hasMore: querySnapshot.size === pageSize,
      page,
      pageSize
    };
  } catch (error) {
    console.error('페이지네이션 데이터 가져오기 실패:', error);
    throw error;
  }
}
