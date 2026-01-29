// 검색 기능

// 검색바 CSS 동적 삽입
(function() {
    const searchbarStyles = `
        /* --- Search Section --- */
        .search-container {
            max-width: 1200px;
            margin: 50px auto 80px auto;
            padding: 0 20px;
            box-sizing: border-box;
        }

        .search-tabs {
            display: flex;
            gap: 15px;
            margin-bottom: 10px;
        }

        .search-container .tab {
            background: var(--beige-bg);
            border: var(--border-gray);
            padding: 10px 30px;
            border-radius: var(--border-radius-lg);
            cursor: pointer;
            font-weight: 700;
            color: var(--primary-text);
        }

        .search-container .tab.active {
            background-color: var(--navy-blue);
            color: #fff;
        }

        .search-bar {
            display: flex;
            align-items: center;
            gap: 0;
            padding: 6px 8px 6px 20px;
            position: relative;
            height: 60px;
            border: var(--border-gray);
            border-radius: 30px;
            background-color: var(--beige-bg);
            box-sizing: border-box;
        }

        .search-bar input {
            flex: 1;
            height: 100%;
            min-height: 0;
            padding: 0 16px 0 0;
            font-size: 16px;
            border: none;
            background: transparent;
            outline: none;
        }

        .search-bar input::placeholder {
            color: var(--primary-text);
            opacity: 0.6;
        }

        .btn-search {
            background-color: var(--navy-blue);
            color: #fff;
            border: none;
            padding: 0 32px;
            border-radius: 24px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
            flex-shrink: 0;
            height: 48px;
            line-height: 48px;
            box-sizing: border-box;
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = searchbarStyles;
    document.head.appendChild(styleElement);
})();

document.addEventListener('DOMContentLoaded', () => {
    //데이터 API로 가져와야 함
    const sampleData = [
        { type: "전체", name: "서울 여행" },
        { type: "지역", name: "부산 맛집" },
        { type: "즐길거리", name: "강릉 서핑" },
        { type: "숙소", name: "제주 호텔" }
    ];
    
    let currentType = "전체";
    
    // hotel.html 페이지인지 확인
    function isHotelPage() {
        return window.location.pathname.includes('hotel.html');
    }

    // index(메인) 페이지인지 확인 (루트 또는 index.html)
    function isIndexPage() {
        const path = window.location.pathname;
        return path === '/' || path.endsWith('index.html') || (!path.includes('/pages/') && !path.includes('search-result'));
    }
    
    // 현재 페이지 위치에 따라 검색 결과 이동 경로 계산
    function getSearchResultPath() {
        const currentPath = window.location.pathname;
        
        // index(메인) 페이지에서는 hotel.html로 이동
        if (isIndexPage()) {
            return 'pages/hotel/hotel.html';
        }
        // 이미 search-result.html에 있는 경우
        if (currentPath.includes('search-result.html')) {
            return 'search-result.html';
        }
        // pages/hotel/ 또는 pages/place/ 등 하위 폴더에 있는 경우
        if (currentPath.includes('/pages/') && currentPath.split('/pages/')[1].includes('/')) {
            return '../search-result.html';
        }
        // pages/ 폴더에 있는 경우
        if (currentPath.includes('/pages/')) {
            return 'search-result.html';
        }
        return 'pages/search-result.html';
    }
    
    // 탭 클릭 이벤트
    const tabs = document.querySelectorAll(".search-container .tab");
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                currentType = tab.innerText;
            });
        });
    }
    
    // 검색 버튼 클릭
    const btnSearch = document.getElementById("btnSearch");
    const keywordInput = document.getElementById("keyword");
    
    if (btnSearch && keywordInput) {
        btnSearch.addEventListener("click", () => {
            const keyword = keywordInput.value.trim();
            const activeTab = document.querySelector('.search-container .tab.active');
            const selectedType = activeTab ? activeTab.innerText : '전체';
            
            // hotel.html에서는 페이지 내 검색 (hotel.js에서 처리)
            if (isHotelPage()) {
                // 커스텀 이벤트 발생 - hotel.js에서 처리
                const searchEvent = new CustomEvent('hotelSearch', {
                    detail: { keyword, type: selectedType }
                });
                document.dispatchEvent(searchEvent);
                return;
            }
            
            const searchResultPath = getSearchResultPath();
            const params = new URLSearchParams();
            params.set('type', selectedType);
            if (keyword) params.set('keyword', keyword);

            // index 페이지에서는 hotel.html로 이동 (keyword 없으면 type만 전달)
            if (isIndexPage()) {
                window.location.href = `${searchResultPath}?${params.toString()}`;
                return;
            }
            
            // 그 외 페이지는 기존 search-result.html로
            if (keyword) {
                window.location.href = `${searchResultPath}?keyword=${encodeURIComponent(keyword)}&type=${encodeURIComponent(selectedType)}`;
            } else {
                window.location.href = `${searchResultPath}?keyword=관광지&type=${encodeURIComponent(selectedType)}`;
            }
        });

        // Enter 키로도 검색 가능하도록
        keywordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                btnSearch.click();
            }
        });
    }
});
  