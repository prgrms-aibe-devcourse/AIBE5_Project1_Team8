// 검색 기능
document.addEventListener('DOMContentLoaded', () => {
    //데이터 API로 가져와야 함
    const sampleData = [
        { type: "전체", name: "서울 여행" },
        { type: "지역", name: "부산 맛집" },
        { type: "즐길거리", name: "강릉 서핑" },
        { type: "숙소", name: "제주 호텔" }
    ];
    
    let currentType = "전체";
    
    // 탭 클릭 이벤트
    const tabs = document.querySelectorAll(".tab");
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
            const activeTab = document.querySelector('.tab.active');
            const selectedType = activeTab ? activeTab.innerText : '전체';
            
            // 검색어와 타입을 함께 전달
            if (keyword) {
                window.location.href = `../pages/search-result.html?keyword=${encodeURIComponent(keyword)}&type=${encodeURIComponent(selectedType)}`;
            } else {
                // 검색어가 없으면 기본 검색 결과 페이지로 이동
                window.location.href = `../pages/search-result.html?keyword=관광지&type=${encodeURIComponent(selectedType)}`;
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
  