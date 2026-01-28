// 검색 결과 페이지 기능 - Firebase DB 사용

document.addEventListener('DOMContentLoaded', async () => {
    // Firebase에서 로드한 데이터 (탭별)
    let allData = {
        전체: [],
        지역: [],
        즐길거리: [],
        숙소: []
    };

    // 상태 관리
    let currentPage = 1;
    const itemsPerPage = 8;
    let savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
    let currentType = '전체';

    // DOM 요소
    const resultsGrid = document.getElementById('searchResultsGrid');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const pageInput = document.getElementById('pageInput');
    const pageTotal = document.getElementById('pageTotal');
    const searchInput = document.getElementById('keyword');
    const searchTabs = document.querySelectorAll('.tab');

    // URL 파라미터
    const urlParams = new URLSearchParams(window.location.search);
    const rawKeyword = urlParams.get('keyword');
    const searchKeyword = rawKeyword ? decodeURIComponent(rawKeyword).trim() : '';
    const urlType = urlParams.get('type');
    if (urlType) currentType = decodeURIComponent(urlType);

    if (searchInput) {
        if (searchKeyword && searchKeyword !== '관광지') searchInput.value = searchKeyword;
        else searchInput.value = '';
    }

    if (searchTabs.length > 0) {
        searchTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.innerText === currentType) tab.classList.add('active');
        });
    }

    // ---- Firebase 데이터 로드 ----
    function formatFirebaseData(firebaseData, category) {
        return {
            id: firebaseData.id || firebaseData.contentid || '',
            detailId: firebaseData.detailId || firebaseData.contentid || firebaseData.id || 0,
            name: firebaseData.name || firebaseData.title || '',
            address: firebaseData.address || firebaseData.addr1 || '',
            contact: firebaseData.contact || firebaseData.tel || '',
            image: firebaseData.image || firebaseData.firstimage || firebaseData.firstimage2 || '',
            category: category || firebaseData.category || 'culture'
        };
    }

    function inferCategoryFromData(data) {
        // contentTypeID를 먼저 확인 (14, 15, 28, 38, 39는 즐길거리로 분류)
        const contentTypeId = data.contentTypeId || data.contentTypeID || data.contenttypeid;
        if (contentTypeId) {
            const contentTypeIdStr = String(contentTypeId);
            if (['14', '15', '28', '38', '39'].includes(contentTypeIdStr)) {
                return 'leisure';
            }
        }
        
        const t = (data.title || data.name || '').toLowerCase();
        if (/호텔|리조트|펜션|모텔|게스트하우스/.test(t)) return 'accommodation';
        if (/궁|사찰|유적|박물관|미술관/.test(t)) return 'culture';
        if (/맛집|식당|카페|시장|거리/.test(t)) return 'restaurant';
        if (/산|해수욕장|공원|해변|섬/.test(t)) return 'nature';
        if (/테마파크|워터파크|스키장|골프장|케이블카/.test(t)) return 'leisure';
        if (/쇼핑|아울렛|마트|한옥마을|문화마을/.test(t)) return 'shopping';
        return 'culture';
    }

    // 페이지네이션 상태 관리
    const BATCH_SIZE = 64;
    let lastAccommodationDoc = null;
    let lastTourItemDoc = null;
    let hasMoreAccommodations = true;
    let hasMoreTourItems = true;

    // 데이터 배열 (외부에서 접근 가능하도록)
    const acc = [];
    const culture = [], restaurant = [], nature = [], leisure = [], shopping = [];

    async function loadDataFromFirebase() {
        try {
            console.log('Firebase 데이터 로드 시작...');
            const { db } = await import('../common/firebase-config.js');
            console.log('Firebase DB 연결 성공:', db ? 'OK' : 'FAILED');
            
            const { collection, query, getDocs, limit, startAfter, orderBy } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

            // 초기화 (첫 로드 시에만)
            if (lastAccommodationDoc === null) {
                acc.length = 0;
                culture.length = 0;
                restaurant.length = 0;
                nature.length = 0;
                leisure.length = 0;
                shopping.length = 0;
                hasMoreAccommodations = true;
                hasMoreTourItems = true;
            }

            // accommodations 64개씩 가져오기
            if (hasMoreAccommodations) {
                try {
                    let accQuery;
                    
                    if (lastAccommodationDoc) {
                        accQuery = query(
                            collection(db, 'accommodations'),
                            orderBy('__name__'),
                            startAfter(lastAccommodationDoc),
                            limit(BATCH_SIZE)
                        );
                    } else {
                        // 첫 로드: orderBy 없이 limit만 사용
                        accQuery = query(
                            collection(db, 'accommodations'),
                            limit(BATCH_SIZE)
                        );
                    }
                    
                    console.log('accommodations 쿼리 실행 중...');
                    const snap = await getDocs(accQuery);
                    console.log(`accommodations 스냅샷: ${snap.size}개 문서`);
                    
                    if (snap.empty) {
                        hasMoreAccommodations = false;
                    } else {
                        snap.forEach(doc => {
                            const d = { id: doc.id, ...doc.data() };
                            acc.push(formatFirebaseData(d, 'accommodation'));
                            lastAccommodationDoc = doc;
                        });
                        
                        if (snap.size < BATCH_SIZE) {
                            hasMoreAccommodations = false;
                        }
                        console.log(`✅ Accommodations 로드 완료: ${acc.length}개`);
                    }
                } catch (e) { 
                    console.error('❌ accommodations 로드 실패:', e);
                    console.error('에러 상세:', e.message, e.code);
                    hasMoreAccommodations = false;
                    
                    // orderBy 에러인 경우 재시도
                    if (e.code === 'failed-precondition' || e.message.includes('index')) {
                        try {
                            const accQuery = query(
                                collection(db, 'accommodations'),
                                limit(BATCH_SIZE)
                            );
                            const snap = await getDocs(accQuery);
                            if (!snap.empty) {
                                snap.forEach(doc => {
                                    const d = { id: doc.id, ...doc.data() };
                                    acc.push(formatFirebaseData(d, 'accommodation'));
                                    lastAccommodationDoc = doc;
                                });
                                console.log(`✅ Accommodations 재시도 성공: ${acc.length}개`);
                                if (snap.size < BATCH_SIZE) {
                                    hasMoreAccommodations = false;
                                }
                            }
                        } catch (retryError) {
                            console.error('재시도도 실패:', retryError);
                        }
                    }
                }
            }

            // tour_items 64개씩 가져오기
            if (hasMoreTourItems) {
                try {
                    let tourQuery;
                    
                    if (lastTourItemDoc) {
                        tourQuery = query(
                            collection(db, 'tour_items'),
                            orderBy('__name__'),
                            startAfter(lastTourItemDoc),
                            limit(BATCH_SIZE)
                        );
                    } else {
                        // 첫 로드: orderBy 없이 limit만 사용
                        tourQuery = query(
                            collection(db, 'tour_items'),
                            limit(BATCH_SIZE)
                        );
                    }
                    
                    console.log('tour_items 쿼리 실행 중...');
                    const snap = await getDocs(tourQuery);
                    console.log(`tour_items 스냅샷: ${snap.size}개 문서`);
                    
                    if (snap.empty) {
                        hasMoreTourItems = false;
                    } else {
                        snap.forEach(doc => {
                            const d = { id: doc.id, ...doc.data() };
                            // contentTypeID를 먼저 확인 (14, 15, 28, 38, 39는 즐길거리로 분류)
                            let cat = d.category;
                            if (!cat) {
                                const contentTypeId = d.contentTypeId || d.contentTypeID || d.contenttypeid;
                                if (contentTypeId) {
                                    const contentTypeIdStr = String(contentTypeId);
                                    if (['14', '15', '28', '38', '39'].includes(contentTypeIdStr)) {
                                        cat = 'leisure';
                                    } else {
                                        cat = inferCategoryFromData(d);
                                    }
                                } else {
                                    cat = inferCategoryFromData(d);
                                }
                            }
                            const fd = formatFirebaseData(d, cat);
                            if (cat === 'culture') culture.push(fd);
                            else if (cat === 'restaurant') restaurant.push(fd);
                            else if (cat === 'nature') nature.push(fd);
                            else if (cat === 'leisure') leisure.push(fd);
                            else if (cat === 'shopping') shopping.push(fd);
                            else culture.push(fd);
                            lastTourItemDoc = doc;
                        });
                        
                        if (snap.size < BATCH_SIZE) {
                            hasMoreTourItems = false;
                        }
                        console.log(`✅ Tour items 로드 완료: ${culture.length + restaurant.length + nature.length + leisure.length + shopping.length}개`);
                    }
                } catch (e) { 
                    console.error('❌ tour_items 로드 실패:', e);
                    console.error('에러 상세:', e.message, e.code);
                    hasMoreTourItems = false;
                    
                    // orderBy 에러인 경우 재시도
                    if (e.code === 'failed-precondition' || e.message.includes('index')) {
                        try {
                            const tourQuery = query(
                                collection(db, 'tour_items'),
                                limit(BATCH_SIZE)
                            );
                            const snap = await getDocs(tourQuery);
                            if (!snap.empty) {
                                snap.forEach(doc => {
                                    const d = { id: doc.id, ...doc.data() };
                                    // contentTypeID를 먼저 확인 (14, 15, 28, 38, 39는 즐길거리로 분류)
                                    let cat = d.category;
                                    if (!cat) {
                                        const contentTypeId = d.contentTypeId || d.contentTypeID || d.contenttypeid;
                                        if (contentTypeId) {
                                            const contentTypeIdStr = String(contentTypeId);
                                            if (['14', '15', '28', '38', '39'].includes(contentTypeIdStr)) {
                                                cat = 'leisure';
                                            } else {
                                                cat = inferCategoryFromData(d);
                                            }
                                        } else {
                                            cat = inferCategoryFromData(d);
                                        }
                                    }
                                    const fd = formatFirebaseData(d, cat);
                                    if (cat === 'culture') culture.push(fd);
                                    else if (cat === 'restaurant') restaurant.push(fd);
                                    else if (cat === 'nature') nature.push(fd);
                                    else if (cat === 'leisure') leisure.push(fd);
                                    else if (cat === 'shopping') shopping.push(fd);
                                    else culture.push(fd);
                                    lastTourItemDoc = doc;
                                });
                                console.log(`✅ Tour items 재시도 성공`);
                                if (snap.size < BATCH_SIZE) {
                                    hasMoreTourItems = false;
                                }
                            }
                        } catch (retryError) {
                            console.error('재시도도 실패:', retryError);
                        }
                    }
                }
            }

            const addType = (arr, type) => arr.map(o => ({ ...o, type }));

            allData = {
                전체: [
                    ...addType(acc, '숙소'),
                    ...addType(nature, '지역'),
                    ...addType(culture, '지역'),
                    ...addType(leisure, '즐길거리'),
                    ...addType(restaurant, '즐길거리'),
                    ...addType(shopping, '즐길거리')
                ],
                지역: [...addType(nature, '지역'), ...addType(culture, '지역')],
                즐길거리: [...addType(leisure, '즐길거리'), ...addType(restaurant, '즐길거리'), ...addType(shopping, '즐길거리')],
                숙소: addType(acc, '숙소')
            };
            console.log('✅ Firebase 데이터 로드 완료');
        } catch (e) {
            console.error('❌ Firebase 검색 데이터 로드 실패:', e);
            console.error('에러 상세:', e.message, e.stack);
        }
    }

    // ===== 추가 데이터 로드 함수 =====
    async function loadMoreData() {
        if (!hasMoreAccommodations && !hasMoreTourItems) {
            console.log('더 이상 로드할 데이터가 없습니다.');
            return false;
        }

        const beforeAccCount = acc.length;
        const beforeTourCount = culture.length + restaurant.length + nature.length + leisure.length + shopping.length;

        // 추가 데이터 로드
        await loadDataFromFirebase();

        const afterAccCount = acc.length;
        const afterTourCount = culture.length + restaurant.length + nature.length + leisure.length + shopping.length;

        const loadedAcc = afterAccCount - beforeAccCount;
        const loadedTours = afterTourCount - beforeTourCount;

        if (loadedAcc > 0 || loadedTours > 0) {
            console.log(`추가 데이터 로드 완료: Accommodations ${loadedAcc}개, Tour items ${loadedTours}개`);
            
            // allData 재구성
            const addType = (arr, type) => arr.map(o => ({ ...o, type }));
            allData = {
                전체: [
                    ...addType(acc, '숙소'),
                    ...addType(nature, '지역'),
                    ...addType(culture, '지역'),
                    ...addType(leisure, '즐길거리'),
                    ...addType(restaurant, '즐길거리'),
                    ...addType(shopping, '즐길거리')
                ],
                지역: [...addType(nature, '지역'), ...addType(culture, '지역')],
                즐길거리: [...addType(leisure, '즐길거리'), ...addType(restaurant, '즐길거리'), ...addType(shopping, '즐길거리')],
                숙소: addType(acc, '숙소')
            };
            
            renderResults();
            updatePagination();
            
            return true;
        }

        return false;
    }

    function getFilteredResults() {
        let list = allData[currentType] || [];
        if (searchKeyword && searchKeyword !== '관광지') {
            const k = searchKeyword.toLowerCase();
            list = list.filter(item =>
                (item.name || '').toLowerCase().includes(k) ||
                (item.address || '').toLowerCase().includes(k)
            );
        }
        return list;
    }

    function renderResults() {
        const filtered = getFilteredResults();
        const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
        if (currentPage > totalPages) currentPage = totalPages || 1;
        if (currentPage < 1) currentPage = 1;

        const start = (currentPage - 1) * itemsPerPage;
        const pageData = filtered.slice(start, start + itemsPerPage);

        if (!resultsGrid) return;

        const hasSearchKeyword = searchKeyword && searchKeyword !== '관광지';

        if (pageData.length === 0) {
            const msg = hasSearchKeyword
                ? '검색 결과가 없습니다.'
                : '등록된 관광지가 없습니다.';
            resultsGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #999;">${msg}</div>`;
            return;
        }

        const idStr = (id) => (id == null ? '' : String(id));
        const isSaved = (id) => savedItems.some(s => idStr(s) === idStr(id));

        resultsGrid.innerHTML = pageData.map(item => {
            const sid = idStr(item.id);
            const saved = isSaved(item.id);
            const category = item.category || (item.type === '숙소' ? 'accommodation' : 'tour');
            const detailId = item.detailId || item.id || '0';
            return `
                <div class="result-card" data-category="${category}" data-detail-id="${detailId}" style="cursor: pointer;">
                    <div class="card-image">
                        <img src="${item.image || ''}" alt="${(item.name || '').replace(/"/g, '&quot;')}" onerror="this.style.display='none'; this.parentElement.innerHTML='관광지 이미지';">
                        <button class="save-btn ${saved ? 'saved' : ''}" data-id="${sid.replace(/"/g, '&quot;')}" type="button">
                            <i class="fas fa-plus"></i>
                            <span>${saved ? '담아둠' : '담아두기'}</span>
                        </button>
                    </div>
                    <div class="card-info">
                        <h3>${(item.name || '').replace(/</g, '&lt;')}</h3>
                        <p>${(item.address || '').replace(/</g, '&lt;')}</p>
                        <p>${(item.contact || '').replace(/</g, '&lt;')}</p>
                    </div>
                </div>
            `;
        }).join('');

        // 카드 클릭 이벤트 (상세 페이지로 이동)
        resultsGrid.querySelectorAll('.result-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // save-btn 클릭은 무시
                if (e.target.closest('.save-btn')) return;
                
                const category = card.dataset.category;
                const detailId = card.dataset.detailId;
                
                // 현재 페이지와 타입을 sessionStorage에 저장
                sessionStorage.setItem('searchResultPage', currentPage.toString());
                sessionStorage.setItem('searchResultType', currentType);
                sessionStorage.setItem('searchResultKeyword', searchKeyword);
                
                // 숙박(accommodation)은 hotel-detail.html로, 나머지는 place-detail.html로 이동
                if (category === "accommodation") {
                    window.location.href = `../hotel/hotel-detail.html?id=${detailId}`;
                } else if (detailId && detailId !== "0") {
                    window.location.href = `../place/place-detail.html?id=${detailId}`;
                } else {
                    alert("상세 페이지가 준비 중입니다.");
                }
            });
        });

        resultsGrid.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // 카드 클릭 이벤트 방지
                const id = btn.getAttribute('data-id');
                if (id == null) return;
                const idx = savedItems.findIndex(s => idStr(s) === id);
                if (idx > -1) savedItems.splice(idx, 1);
                else savedItems.push(id);
                localStorage.setItem('savedItems', JSON.stringify(savedItems));
                renderResults();
                updatePagination();
            });
        });
    }

    function updatePagination() {
        const filtered = getFilteredResults();
        const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;

        if (pageInput) {
            pageInput.value = currentPage;
            pageInput.max = totalPages;
        }
        if (pageTotal) {
            pageTotal.textContent = `/ ${totalPages} 페이지`;
        }
        if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
        
        // 다음 버튼: 마지막 페이지이거나 더 이상 로드할 데이터가 없으면 비활성화
        const hasMoreData = hasMoreAccommodations || hasMoreTourItems;
        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage >= totalPages && !hasMoreData;
        }
    }

    // ===== 페이지 입력 이벤트 =====
    if (pageInput) {
        pageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                goToPage();
            }
        });
        
        pageInput.addEventListener('blur', () => {
            goToPage();
        });
    }

    // ===== 특정 페이지로 이동 =====
    function goToPage() {
        if (!pageInput) return;
        
        const filtered = getFilteredResults();
        const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
        
        let targetPage = parseInt(pageInput.value);
        
        // 유효성 검사
        if (isNaN(targetPage) || targetPage < 1) {
            targetPage = 1;
        } else if (targetPage > totalPages) {
            targetPage = totalPages;
        }
        
        // 페이지가 변경되었을 때만 이동
        if (targetPage !== currentPage) {
            currentPage = targetPage;
            renderResults();
            updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // 같은 페이지면 입력값만 업데이트
            pageInput.value = currentPage;
        }
    }

    if (searchTabs.length > 0) {
        searchTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                searchTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentType = tab.innerText;
                currentPage = 1;
                renderResults();
                updatePagination();
            });
        });
    }

    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderResults();
                updatePagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', async () => {
            const filtered = getFilteredResults();
            const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
            
            // 현재 페이지가 마지막 페이지이고, 더 로드할 데이터가 있으면 자동으로 로드
            if (currentPage >= totalPages) {
                const hasMoreData = hasMoreAccommodations || hasMoreTourItems;
                if (hasMoreData) {
                    // 로딩 표시
                    nextPageBtn.disabled = true;
                    const originalText = nextPageBtn.textContent;
                    nextPageBtn.textContent = '로딩 중...';
                    
                    // 추가 데이터 로드
                    const loaded = await loadMoreData();
                    
                    if (loaded) {
                        // 데이터 로드 후 다시 렌더링
                        renderResults();
                        updatePagination();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        // 더 이상 데이터가 없으면 버튼 비활성화
                        nextPageBtn.disabled = true;
                    }
                    nextPageBtn.textContent = originalText;
                    return;
                }
            }
            
            // 일반적인 다음 페이지 이동
            if (currentPage < totalPages) {
                currentPage++;
                renderResults();
                updatePagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    await loadDataFromFirebase();
    
    // 저장된 페이지, 타입, 검색어 복원
    const savedPage = sessionStorage.getItem('searchResultPage');
    const savedType = sessionStorage.getItem('searchResultType');
    const savedKeyword = sessionStorage.getItem('searchResultKeyword');
    
    if (savedPage) {
        const pageNum = parseInt(savedPage, 10);
        if (!isNaN(pageNum) && pageNum > 0) {
            currentPage = pageNum;
        }
    }
    
    if (savedType && allData[savedType]) {
        currentType = savedType;
        // 탭 활성화
        searchTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.innerText === currentType) {
                tab.classList.add('active');
            }
        });
    }
    
    // 저장된 검색어가 URL 파라미터와 다르면 무시 (새 검색인 경우)
    if (savedKeyword && savedKeyword === searchKeyword) {
        // 검색어가 동일하면 저장된 페이지 사용
    } else if (savedKeyword && savedKeyword !== searchKeyword) {
        // 검색어가 다르면 1페이지로 초기화
        currentPage = 1;
        sessionStorage.removeItem('searchResultPage');
        sessionStorage.removeItem('searchResultType');
        sessionStorage.removeItem('searchResultKeyword');
    }
    
    renderResults();
    updatePagination();
    
    // 저장된 페이지로 스크롤
    if (savedPage && savedKeyword === searchKeyword) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
