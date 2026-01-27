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
    const currentPageSpan = document.getElementById('currentPage');
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
            const { db } = await import('../common/firebase-config.js');
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
                    let accQuery = query(
                        collection(db, 'accommodations'),
                        orderBy('__name__'),
                        limit(BATCH_SIZE)
                    );
                    
                    if (lastAccommodationDoc) {
                        accQuery = query(
                            collection(db, 'accommodations'),
                            orderBy('__name__'),
                            startAfter(lastAccommodationDoc),
                            limit(BATCH_SIZE)
                        );
                    }
                    
                    const snap = await getDocs(accQuery);
                    
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
                    }
                } catch (e) { 
                    console.warn('accommodations 로드 실패:', e);
                    hasMoreAccommodations = false;
                }
            }

            // tour_items 64개씩 가져오기
            if (hasMoreTourItems) {
                try {
                    let tourQuery = query(
                        collection(db, 'tour_items'),
                        orderBy('__name__'),
                        limit(BATCH_SIZE)
                    );
                    
                    if (lastTourItemDoc) {
                        tourQuery = query(
                            collection(db, 'tour_items'),
                            orderBy('__name__'),
                            startAfter(lastTourItemDoc),
                            limit(BATCH_SIZE)
                        );
                    }
                    
                    const snap = await getDocs(tourQuery);
                    
                    if (snap.empty) {
                        hasMoreTourItems = false;
                    } else {
                        snap.forEach(doc => {
                            const d = { id: doc.id, ...doc.data() };
                            const cat = d.category || inferCategoryFromData(d);
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
                    }
                } catch (e) { 
                    console.warn('tour_items 로드 실패:', e);
                    hasMoreTourItems = false;
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
        } catch (e) {
            console.error('Firebase 검색 데이터 로드 실패:', e);
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
            return `
                <div class="result-card">
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

        resultsGrid.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', () => {
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

        if (currentPageSpan) currentPageSpan.textContent = currentPage;
        if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
        if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages || totalPages === 0;
        
        // 더 보기 버튼 표시/숨김
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            if (hasMoreAccommodations || hasMoreTourItems) {
                loadMoreBtn.style.display = 'block';
                loadMoreBtn.disabled = false;
            } else {
                loadMoreBtn.style.display = 'none';
            }
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
        nextPageBtn.addEventListener('click', () => {
            const filtered = getFilteredResults();
            const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
            if (currentPage < totalPages) {
                currentPage++;
                renderResults();
                updatePagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // 더 보기 버튼 이벤트
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', async () => {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = '로딩 중...';
            
            const loaded = await loadMoreData();
            
            if (loaded) {
                loadMoreBtn.textContent = '더 보기';
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            } else {
                loadMoreBtn.textContent = '더 이상 없음';
                loadMoreBtn.disabled = true;
            }
        });
    }

    await loadDataFromFirebase();
    renderResults();
    updatePagination();
});
