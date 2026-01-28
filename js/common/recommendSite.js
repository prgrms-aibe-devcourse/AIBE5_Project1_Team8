// ------------------------------------------------
    // 3. 추천 여행지 슬라이드 쇼 기능
    // ------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 슬라이드 쇼 HTML 생성 및 삽입
    const featuredGrid = document.querySelector('.featured-grid');
    if (featuredGrid) {
        const firstCard = featuredGrid.querySelector('.card.large-card');
        if (firstCard) {
            firstCard.innerHTML = `
                <div class="slideshow-wrapper">
                    <div class="slide active" style="background-image: url('https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1000&auto=format&fit=crop');">
                        <div class="overlay">
                            <h2>추천 여행지</h2>
                            <div class="content-center">
                                <h3>제주도 한라산</h3>
                                <p>한국의 최고봉으로, 사계절 아름다운 풍경을 자랑하는 제주도의 상징적인 산입니다.</p>
                                <a href="pages/hotel/hotel.html" class="details-link">자세히</a>
                            </div>
                        </div>
                    </div>
                    <div class="slide" style="background-image: url('https://media.tel-co.net/uploads/View_B_01_b932377a99.jpg');">
                        <div class="overlay">
                            <h2>추천 여행지</h2>
                            <div class="content-center">
                                <h3>부산 해운대</h3>
                                <p>아름다운 해변과 현대적인 도시가 어우러진 부산의 대표적인 관광 명소입니다.</p>
                                <a href="pages/hotel/hotel.html" class="details-link">자세히</a>
                            </div>
                        </div>
                    </div>
                    <div class="slide" style="background-image: url('https://i.namu.wiki/i/XO6E06_qrvaiZnbaLsHC-Ov1z4WI8vRqSn_R9IqHobEgHD2gYLLN3Ldi3zvnFLRYcLTQmWpRuAdsfH_2IrNNPQ.webp');">
                        <div class="overlay">
                            <h2>추천 여행지</h2>
                            <div class="content-center">
                                <h3>경주 불국사</h3>
                                <p>신라 시대의 찬란한 불교 문화를 보여주는 세계문화유산으로, 한국의 대표적인 고찰입니다.</p>
                                <a href="pages/hotel/hotel.html" class="details-link">자세히</a>
                            </div>
                        </div>
                    </div>
                    <div class="slide" style="background-image: url('https://gangwon.to/upload/board/BDMAIN03/792f049a-6d93-4943-8384-c83680b9887b.jpg');">
                        <div class="overlay">
                            <h2>추천 여행지</h2>
                            <div class="content-center">
                                <h3>설악산 국립공원</h3>
                                <p>가을 단풍과 겨울 설경이 유명한 한국의 대표적인 산악 관광지입니다.</p>
                                <a href="pages/hotel/hotel.html" class="details-link">자세히</a>
                            </div>
                        </div>
                    </div>
                    <div class="slide" style="background-image: url('https://img.seoul.co.kr/img/upload/2023/05/05/SSC_20230505100531.jpg');">
                        <div class="overlay">
                            <h2>추천 여행지</h2>
                            <div class="content-center">
                                <h3>전주 한옥마을</h3>
                                <p>전통 한옥과 한국의 전통 문화를 체험할 수 있는 아름다운 전통 마을입니다.</p>
                                <a href="pages/hotel/hotel.html" class="details-link">자세히</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slideshow-indicators">
                    <span class="indicator active" data-slide="0"></span>
                    <span class="indicator" data-slide="1"></span>
                    <span class="indicator" data-slide="2"></span>
                    <span class="indicator" data-slide="3"></span>
                    <span class="indicator" data-slide="4"></span>
                </div>
            `;
            firstCard.classList.add('slideshow-container');
            
            // HTML 삽입 후 슬라이드 쇼 기능 초기화
            initSlideshow();
        }
    }

    function initSlideshow() {
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            // 모든 슬라이드 숨기기
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));

            // 현재 슬라이드 표시
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }

            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 5000); // 5초마다 자동 전환
        }

        function stopSlideshow() {
            clearInterval(slideInterval);
        }

        // 인디케이터 클릭 이벤트
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopSlideshow();
                showSlide(index);
                startSlideshow();
            });
        });

        // 슬라이드 컨테이너에 마우스 오버 시 자동 슬라이드 정지
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', stopSlideshow);
            slideshowContainer.addEventListener('mouseleave', startSlideshow);
        }

        // 초기 슬라이드 표시 및 자동 슬라이드 시작
        showSlide(0);
        startSlideshow();
    }
});