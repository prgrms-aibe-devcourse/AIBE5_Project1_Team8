// 검색 결과 페이지 기능

document.addEventListener('DOMContentLoaded', () => {
    // 샘플 데이터 (실제로는 API에서 가져와야 함)
    const sampleResults = [
        {
            id: 1,
            name: "경복궁",
            address: "서울특별시 종로구 사직로 161",
            phone: "02-3700-3900",
            category: "문화",
            type: "지역", // 지역 분류
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop"
        },
        {
            id: 2,
            name: "N서울타워",
            address: "서울특별시 용산구 남산공원길 105",
            phone: "02-3455-9277",
            category: "문화",
            type: "지역", // 지역 분류
            image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=300&h=300&fit=crop"
        },
        {
            id: 3,
            name: "롯데월드",
            address: "서울특별시 송파구 올림픽로 240",
            phone: "02-411-2000",
            category: "레저",
            type: "즐길거리", // 즐길거리 분류
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"
        },
        {
            id: 4,
            name: "명동",
            address: "서울특별시 중구 명동길",
            phone: "02-778-0333",
            category: "쇼핑",
            type: "지역", // 지역 분류
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop"
        },
        {
            id: 5,
            name: "북한산국립공원",
            address: "서울특별시 강북구 우이동",
            phone: "02-909-0497",
            category: "자연",
            type: "즐길거리", // 즐길거리 분류
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop"
        },
        {
            id: 6,
            name: "한강공원",
            address: "서울특별시 영등포구 여의도동",
            phone: "02-3780-0561",
            category: "자연",
            type: "즐길거리", // 즐길거리 분류
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=300&fit=crop"
        },
        {
            id: 7,
            name: "인사동",
            address: "서울특별시 종로구 인사동길",
            phone: "02-734-0222",
            category: "문화",
            type: "지역", // 지역 분류
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop"
        },
        {
            id: 8,
            name: "동대문디자인플라자",
            address: "서울특별시 중구 을지로 281",
            phone: "02-2153-0000",
            category: "문화",
            type: "지역", // 지역 분류
            image: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=300&h=300&fit=crop"
        },
        {
            id: 9,
            name: "서울 그랜드 호텔",
            address: "서울특별시 중구 을지로 30",
            phone: "02-771-0500",
            category: "숙박",
            type: "숙소", // 숙소 분류
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop"
        },
        {
            id: 10,
            name: "롯데 호텔 서울",
            address: "서울특별시 중구 을지로 30",
            phone: "02-771-1000",
            category: "숙박",
            type: "숙소", // 숙소 분류
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=300&fit=crop"
        },
        {
            id: 11,
            name: "에버랜드",
            address: "경기도 용인시 처인구 포곡읍 에버랜드로 199",
            phone: "031-320-5000",
            category: "레저",
            type: "즐길거리", // 즐길거리 분류
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"
        },
        {
            id: 12,
            name: "부산 해운대",
            address: "부산광역시 해운대구 해운대해변로 264",
            phone: "051-749-4000",
            category: "자연",
            type: "지역", // 지역 분류
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=300&fit=crop"
        }
    ];

    // 상태 관리
    let currentPage = 1;
    const itemsPerPage = 8;
    let savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
    let currentType = "전체"; // 검색 탭 타입

    // DOM 요소
    const resultsGrid = document.getElementById('searchResultsGrid');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const currentPageSpan = document.getElementById('currentPage');
    const searchInput = document.getElementById('keyword');
    const searchTabs = document.querySelectorAll('.tab');

    // URL 파라미터에서 검색어와 타입 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const rawKeyword = urlParams.get('keyword');
    const searchKeyword = rawKeyword ? decodeURIComponent(rawKeyword).trim() : '';
    const urlType = urlParams.get('type');
    if (urlType) {
        currentType = decodeURIComponent(urlType);
    }
    
    // 검색 입력창에 검색어 설정
    if (searchInput) {
        if (searchKeyword && searchKeyword !== '관광지') {
            // 검색어가 있으면 입력창에 표시
            searchInput.value = searchKeyword;
        } else {
            // 검색어가 없거나 기본값이면 빈 값 (placeholder 표시)
            searchInput.value = '';
        }
    }

    // 검색 탭 활성화 상태 설정
    if (searchTabs.length > 0) {
        searchTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.innerText === currentType) {
                tab.classList.add('active');
            }
        });
    }

    // 검색 탭 클릭 이벤트
    if (searchTabs.length > 0) {
        searchTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                searchTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentType = tab.innerText;
                currentPage = 1; // 탭 변경 시 첫 페이지로
                renderResults();
                updatePagination();
            });
        });
    }

    // 결과 렌더링
    function renderResults() {
        // 타입 필터링 (전체, 지역, 즐길거리, 숙소)
        let filteredResults = sampleResults;
        if (currentType !== "전체") {
            filteredResults = filteredResults.filter(item => item.type === currentType);
        }

        // 검색어 필터링
        if (searchKeyword && searchKeyword !== '관광지') {
            filteredResults = filteredResults.filter(item => 
                item.name.includes(searchKeyword) || 
                item.address.includes(searchKeyword)
            );
        }

        // 페이지네이션
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedResults = filteredResults.slice(startIndex, endIndex);

        // 결과 그리드 렌더링
        if (resultsGrid) {
            if (paginatedResults.length === 0) {
                resultsGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #999;">검색 결과가 없습니다.</div>';
            } else {
                resultsGrid.innerHTML = paginatedResults.map(item => `
                    <div class="result-card">
                        <div class="card-image">
                            <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='관광지 이미지';">
                            <button class="save-btn ${savedItems.includes(item.id) ? 'saved' : ''}" 
                                    data-id="${item.id}"
                                    onclick="toggleSave(${item.id})">
                                <i class="fas fa-plus"></i>
                                <span>${savedItems.includes(item.id) ? '담아둠' : '담아두기'}</span>
                            </button>
                        </div>
                        <div class="card-info">
                            <h3>${item.name}</h3>
                            <p>${item.address}</p>
                            <p>${item.phone}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    // 페이지네이션 업데이트
    function updatePagination() {
        // 타입 필터링
        let filteredResults = sampleResults;
        if (currentType !== "전체") {
            filteredResults = filteredResults.filter(item => item.type === currentType);
        }

        // 검색어 필터링
        if (searchKeyword && searchKeyword !== '관광지') {
            filteredResults = filteredResults.filter(item => 
                item.name.includes(searchKeyword) || 
                item.address.includes(searchKeyword)
            );
        }

        const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
        
        if (currentPageSpan) {
            currentPageSpan.textContent = currentPage;
        }

        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage === 1;
        }

        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage >= totalPages || totalPages === 0;
        }
    }

    // 담아두기 토글 함수 (전역으로 노출)
    window.toggleSave = function(itemId) {
        const index = savedItems.indexOf(itemId);
        if (index > -1) {
            savedItems.splice(index, 1);
        } else {
            savedItems.push(itemId);
        }
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        renderResults();
    };

    // 페이지네이션 버튼 이벤트
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
            // 타입 필터링
            let filteredResults = sampleResults;
            if (currentType !== "전체") {
                filteredResults = filteredResults.filter(item => item.type === currentType);
            }
            
            // 검색어 필터링
            if (searchKeyword && searchKeyword !== '관광지') {
                filteredResults = filteredResults.filter(item => 
                    item.name.includes(searchKeyword) || 
                    item.address.includes(searchKeyword)
                );
            }
            const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
            
            if (currentPage < totalPages) {
                currentPage++;
                renderResults();
                updatePagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // 초기 렌더링
    renderResults();
    updatePagination();
});
