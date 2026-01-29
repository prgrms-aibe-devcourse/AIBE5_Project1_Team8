document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------
    // 1. 기존 검색 탭 기능
    // ------------------------------------------------
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            console.log('Selected Tab:', this.textContent);
        });
    });


    // ------------------------------------------------
    // 2. 랜덤 색상 테마 여행 기능 (New)
    // ------------------------------------------------

    // 데이터셋
    const themes = [
        { id: 'lilac', name: 'Lilac Purple', korName: '라일락 퍼플', code: '#C8A2C8', places: [{ name: '신안 퍼플섬', desc: '마을 지붕부터 다리까지 온통 보라색인 섬.' }, { name: '고성 하늬라벤더팜', desc: '6월이면 드넓은 구릉이 보랏빛 라벤더로 뒤덮이는 곳.' }, { name: '성주 성밖숲', desc: '왕버들 나무 아래 맥문동 꽃이 보라색 융단을 이루는 곳.' }, { name: '태안 팜카밀레', desc: '다양한 허브와 야생화가 어우러진 이국적인 정원.' }, { name: '정읍 구절초 지방정원', desc: '가을철 솔숲 아래 은은한 보랏빛 구절초가 가득한 곳.' }] },
        { id: 'neon', name: 'Electric Neon', korName: '일렉트릭 네온', code: '#D0FF14', places: [{ name: 'DDP (동대문)', desc: '우주선 같은 건물과 화려한 조명이 만드는 미래 도시.' }, { name: '부산 더베이 101', desc: '마린시티 고층 빌딩의 빛이 바다에 반사되는 야경 명소.' }, { name: '대구 이월드 83타워', desc: '도시 전체를 내려다보는 화려한 빛의 타워.' }, { name: '경주 동궁과 월지', desc: '밤이면 전각이 연못에 비쳐 황금빛 네온을 뿜어내는 곳.' }, { name: '여수 낭만포차', desc: '여수 밤바다와 돌산대교의 조명이 어우러진 거리.' }] },
        { id: 'sky', name: 'Clear Sky', korName: '클리어 스카이', code: '#87CEEB', places: [{ name: '포항 스페이스워크', desc: '하늘을 걷는 듯한 곡선형 철제 계단.' }, { name: '부산 블루라인파크', desc: '바다 옆 공중 레일을 달리는 스카이캡슐.' }, { name: '강릉 안목해변', desc: '탁 트인 하늘과 코발트 블루 바다가 만나는 곳.' }, { name: '영덕 블루로드', desc: '파도가 부서지는 해안선을 따라 걷는 환상의 바닷길.' }, { name: '제주 협재해수욕장', desc: '에메랄드빛 바다와 비양도가 어우러진 하늘색 풍경.' }] },
        { id: 'forest', name: 'Deep Forest Green', korName: '딥 포레스트 그린', code: '#228B22', places: [{ name: '담양 죽녹원', desc: '하늘을 찌를 듯한 대나무 숲의 짙은 초록색 그늘.' }, { name: '보성 대한다원', desc: '굽이굽이 펼쳐진 녹차 밭의 싱그러운 초록색.' }, { name: '삼척 도계 이끼폭포', desc: '원시림 속 바위를 뒤덮은 이끼와 폭포.' }, { name: '제주 비자림', desc: '천 년의 세월을 간직한 비자나무 군락지.' }, { name: '울산 태화강 십리대숲', desc: '도심 속 강변을 따라 펼쳐진 대나무 숲.' }] },
        { id: 'pink', name: 'Romantic Pink', korName: '로맨틱 핑크', code: '#FFB7C5', places: [{ name: '합천 황매산', desc: '산 정상 평원이 진분홍 철쭉으로 뒤덮이는 장관.' }, { name: '제주 휴애리', desc: '계절마다 매화, 수국, 핑크뮬리가 피는 공원.' }, { name: '경주 보문단지', desc: '호수 주변 벚꽃 터널이 연분홍 꽃비를 내리는 곳.' }, { name: '양주 나리공원', desc: '가을철 핑크뮬리와 천일홍이 파스텔 톤을 만드는 곳.' }, { name: '강진 백련사', desc: '동백나무 숲에 떨어지는 붉은 분홍빛 꽃송이들.' }] },
        { id: 'gold', name: 'Sunset Gold', korName: '선셋 골드', code: '#FFD700', places: [{ name: '아산 곡교천', desc: '수백 그루 은행나무가 만드는 황금빛 터널.' }, { name: '태안 꽃지해수욕장', desc: '낙조가 바다를 붉은 황금색으로 물들이는 명소.' }, { name: '순천만 습지', desc: '햇빛 받은 갈대밭이 황금색으로 일렁이는 곳.' }, { name: '제주 성산일출봉', desc: '검은 현무암과 대비되는 샛노란 유채꽃밭.' }, { name: '영주 부석사', desc: '해 질 녘 사찰을 감싸는 노란 빛의 고즈넉함.' }] },
        { id: 'white', name: 'Pure White', korName: '퓨어 화이트', code: '#F0F8FF', places: [{ name: '인제 자작나무 숲', desc: '하얀 나무껍질과 눈이 만드는 동화 같은 세상.' }, { name: '무주 덕유산', desc: '상고대가 피어나 산호초처럼 변하는 설경.' }, { name: '대관령 양떼목장', desc: '능선에 눈이 쌓이면 펼쳐지는 한국의 알프스.' }, { name: '청송 얼음골', desc: '거대한 암벽 빙벽이 주는 압도적인 하얀색.' }, { name: '이호테우 해변', desc: '푸른 바다 배경의 하얀 말 등대 포토존.' }] },
        { id: 'black', name: 'Volcanic Black', korName: '볼케이노 블랙', code: '#36454F', places: [{ name: '제주 주상절리대', desc: '검은 육각형 돌기둥들이 병풍처럼 둘러친 곳.' }, { name: '철원 한탄강', desc: '현무암 협곡의 묵직한 검은 바위 절벽.' }, { name: '제주 돌문화공원', desc: '검은 돌과 곶자왈이 어우러진 차분한 공간.' }, { name: '울릉도 해안산책로', desc: '검은 화산암 절벽과 파도의 조화.' }, { name: '우도 검멀레 해변', desc: '검은 모래사장과 거대한 암벽의 이색 풍경.' }] },
        { id: 'red', name: 'Fiery Red', korName: '파이어리 레드', code: '#CD5C5C', places: [{ name: '정읍 내장산', desc: '가을이면 산 전체가 붉은 단풍 터널을 이루는 곳.' }, { name: '영광 불갑사', desc: '사찰 주변을 붉은 상사화가 융단처럼 뒤덮는 곳.' }, { name: '창덕궁 후원', desc: '전통 건축의 붉은 기둥과 단풍의 조화.' }, { name: '고창 선운사', desc: '사찰 뒤뜰에 툭툭 떨어지는 붉은 동백꽃.' }, { name: '단양강 잔도', desc: '붉은 조명과 단풍이 강물에 비치는 풍경.' }] },
        { id: 'beige', name: 'Earth Beige', korName: '어스 베이지', code: '#D2B48C', places: [{ name: '안동 하회마을', desc: '황토 담장과 초가가 주는 따뜻한 베이지 톤.' }, { name: '수원 화성', desc: '햇빛 받은 성곽 벽돌의 은은한 흙빛.' }, { name: '경주 대릉원', desc: '부드러운 곡선의 고분과 잔디가 주는 차분함.' }, { name: '순천 낙안읍성', desc: '초가집들이 옹기종기 모인 포근한 마을.' }, { name: '서천 신성리 갈대밭', desc: '바람에 일렁이는 끝없는 갈색 갈대 물결.' }] },
        { id: 'mint', name: 'Emerald Mint', korName: '에메랄드 민트', code: '#50C878', places: [{ name: '삼척 장호항', desc: '투명 카누를 타는 한국의 나폴리.' }, { name: '제주 월정리', desc: '맑은 민트색 젤리 같은 바다 색감.' }, { name: '남해 상주 은모래비치', desc: '은빛 백사장과 어우러진 청록빛 바다.' }, { name: '울진 죽변 하트해변', desc: '파도가 잔잔해 투명한 옥빛 물색.' }, { name: '원주 소금산', desc: '출렁다리 아래로 흐르는 짙은 옥색 강물.' }] },
        { id: 'gray', name: 'Antique Gray', korName: '앤티크 그레이', code: '#808080', places: [{ name: '원주 뮤지엄 산', desc: '노출 콘크리트와 물, 돌이 조화를 이루는 곳.' }, { name: '설악산 울산바위', desc: '거대한 화강암 덩어리의 웅장한 회색.' }, { name: '익산 미륵사지', desc: '천 년 세월이 묻어나는 화강암 석탑.' }, { name: '낙산공원 성곽길', desc: '도시를 감싸는 회색 성곽의 고즈넉함.' }, { name: '강화 고인돌', desc: '선사시대 거대한 덮개돌의 묵직한 존재감.' }] },
        { id: 'silver', name: 'Silvery Shimmer', korName: '실버리 쉬머', code: '#C0C0C0', places: [{ name: '정선 민둥산', desc: '산 전체가 억새로 뒤덮여 은빛 바다를 이루는 곳.' }, { name: '서울 하늘공원', desc: '가을철 끝없이 펼쳐진 은빛 억새밭.' }, { name: '울산 간월재', desc: '구름 위에서 억새가 바람에 일렁이는 영남 알프스.' }, { name: '제주 새별오름', desc: '해 질 녘 억새가 은색과 금색으로 물드는 곳.' }, { name: '포천 명성산', desc: '산정호수와 어우러진 바위산의 은빛 억새.' }] },
        { id: 'yellow', name: 'Sunshine Yellow', korName: '선샤인 옐로우', code: '#FFEC8B', places: [{ name: '신안 선도', desc: '지붕도 꽃도 온통 노란 수선화 섬.' }, { name: '구례 산수유마을', desc: '돌담길 따라 노란 산수유꽃이 팝콘처럼 터지는 곳.' }, { name: '장성 황룡강', desc: '강변을 따라 해바라기와 노란 꽃이 끝없는 곳.' }, { name: '부산 대저 생태공원', desc: '낙동강변 광활한 평지에 유채꽃이 만발하는 곳.' }, { name: '이천 산수유 마을', desc: '고즈넉한 한옥과 어우러진 노란 꽃구름.' }] },
        { id: 'rainbow', name: 'Vivid Rainbow', korName: '비비드 레인보우', code: '#FF69B4', places: [{ name: '제주 도두동 무지개도로', desc: '파란 바다 배경의 알록달록 무지개 방호벽.' }, { name: '부산 장림포구', desc: '형형색색 건물들이 베네치아를 연상시키는 곳.' }, { name: '사천 무지개 해안도로', desc: '갯벌과 바다를 끼고 달리는 무지개빛 드라이브.' }, { name: '인천 송월동 동화마을', desc: '세계 명작 동화 테마의 입체적이고 컬러풀한 마을.' }, { name: '가평 쁘띠프랑스', desc: '프랑스 남부 테마의 파스텔 톤 건물들.' }] },
        { id: 'indigo', name: 'Indigo Blue', korName: '인디고 블루', code: '#191970', places: [{ name: '울릉도 해안', desc: '잉크를 풀어놓은 듯한 깊고 진한 바다색.' }, { name: '나주 천연염색 박물관', desc: '전통 쪽 염색이 만드는 깊고 푸른 색의 미학.' }, { name: '영양 반딧불이 공원', desc: '칠흑 같은 밤하늘 속 쏟아지는 별.' }, { name: '동해 추암 촛대바위', desc: '기암괴석 사이로 넘실거리는 짙푸른 파도.' }, { name: '부산 광안대교', desc: '밤바다 위를 수놓는 보라색과 남색 조명.' }] },
        { id: 'brown', name: 'Terracotta Brown', korName: '테라코타 브라운', code: '#A0522D', places: [{ name: '대전 계족산 황토길', desc: '숲속 붉은 황토길을 맨발로 걷는 체험.' }, { name: '무안 황토 갯벌랜드', desc: '붉은 기운이 감도는 갯벌과 황토 밭.' }, { name: '고창 고창읍성', desc: '세월의 흔적이 묻은 붉은 갈색 성곽.' }, { name: '하동 최참판댁', desc: '붉은 흙벽과 나무 기둥이 어우러진 전통 가옥.' }, { name: '영주 무섬마을', desc: '내성천 모래사장과 어우러진 고택 마을.' }] },
        { id: 'fog', name: 'Mystic Fog', korName: '미스틱 포그', code: '#B0C4DE', places: [{ name: '춘천 소양강 스카이워크', desc: '물안개가 피어오르는 몽환적인 호수 풍경.' }, { name: '양평 두물머리', desc: '새벽녘 강가 안개와 느티나무의 신비로움.' }, { name: '옥천 용암사', desc: '산봉우리들이 구름 바다 위로 떠 있는 운해 명소.' }, { name: '청송 주산지', desc: '물안개 속 왕버들 나무가 영화 같은 장면을 연출.' }, { name: '화순 세량지', desc: '벚꽃 필 무렵 물안개와 반영이 아름다운 곳.' }] }
    ];

    const themeSection = document.querySelector('.color-theme-section');

    const circles = document.querySelectorAll('.interactive-circle');
    const mainCard = document.getElementById('mainCard');
    const exploreBtn = document.getElementById('exploreBtn');
    const fadeElements = document.querySelectorAll('.fade-element');

    const resultContainer = document.getElementById('resultContainer');
    const resultTitle = document.getElementById('resultTitle');
    const contentWrapper = document.getElementById('contentWrapper');
    const placeName = document.getElementById('placeName');
    const placeDesc = document.getElementById('placeDesc');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const textContentArea = document.getElementById('textContentArea');
    const refreshBtn = document.getElementById('refreshBtn');
    const searchBtn = document.getElementById('searchBtn');
    const imagePlaceholder = document.querySelector('.image-placeholder');

    let intervalId;
    let shuffledThemes = [];
    let themeIndex = 0;
    let currentThemeData = null;
    let currentPlaceIndex = 0;
    let isTransitioning = false;

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        const newArray = [...array];
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
        }
        return newArray;
    }

    function initShuffle() {
        shuffledThemes = shuffle(themes);
        themeIndex = 0;
    }

    function getUniqueRandomColors(count) {
        const shuffled = [...themes].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function getContrastColor(hexColor) {
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#333333' : '#FFFFFF';
    }

    function changeCircleColors() {
        const selectedThemes = getUniqueRandomColors(5);
        circles.forEach((circle, index) => {
            circle.style.backgroundColor = selectedThemes[index].code;
        });
    }

    function showPlace(index, withFade = false) {
        if (!currentThemeData || isTransitioning) return;
        
        isTransitioning = true;
        const place = currentThemeData.places[index];
        const imagePath = `images/color/${currentThemeData.id}_${index + 1}.jpg`;

        // 1. [심플 페이드] 전환 효과
        if (withFade) {
            contentWrapper.style.opacity = '0';
            
            setTimeout(() => {
                placeName.innerText = place.name;
                placeDesc.innerText = place.desc;
                imagePlaceholder.style.backgroundImage = `url('${imagePath}')`;
                imagePlaceholder.innerText = "";

                // 다시 서서히 나타나게 함
                contentWrapper.style.opacity = '1';
                isTransitioning = false;
            }, 300); // 0.3초 동안 투명해졌을 때 교체
        } else {
            // 페이드 효과 없을 경우 즉시 교체
            placeName.innerText = place.name;
            placeDesc.innerText = place.desc;
            imagePlaceholder.style.backgroundImage = `url('${imagePath}')`;
            imagePlaceholder.innerText = "";
            isTransitioning = false;
        }
    }

    const box = document.querySelector('.small-box');

    if (box) {
        let ticking = false; // 프레임 최적화용 변수

        box.addEventListener('mousemove', (e) => {
            // [수정] 전환 애니메이션 중에는 작동 방지
            if (isTransitioning) return;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = box.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const xPos = (x - rect.width / 2) / (rect.width / 2);
                    const yPos = (y - rect.height / 2) / (rect.height / 2);

                    // 기울기 감도는 10 정도가 가장 적당합니다
                    const rotateX = (yPos * -10).toFixed(2);
                    const rotateY = (xPos * 10).toFixed(2);
                    
                    const shadowX = (xPos * -20).toFixed(2);
                    const shadowY = (yPos * -20).toFixed(2);

                    // [핵심] 마우스 이동 중에는 transition을 꺼야 버벅임이 사라집니다.
                    box.style.transition = 'none'; 
                    box.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
                    box.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, 0.3)`;
                    
                    ticking = false;
                });
                ticking = true;
            }
        });

        box.addEventListener('mouseleave', () => {
            // [핵심] 나갈 때는 다시 부드럽게 돌아오도록 transition 부여
            box.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease';
            box.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            box.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.2)`;
        });
    }

    function updateThemeDisplay(withFade = false) {
        currentThemeData = shuffledThemes[themeIndex];
        currentPlaceIndex = 0;

        const bgColor = currentThemeData.code;
        const contrastColor = getContrastColor(bgColor);
        if (themeSection) {
            themeSection.style.backgroundColor = bgColor;
        }
        mainCard.style.height = '640px';
        mainCard.style.backgroundColor = bgColor;
        mainCard.classList.add('active');

        textContentArea.style.color = contrastColor;
        prevBtn.style.color = contrastColor;
        nextBtn.style.color = contrastColor;

        resultTitle.innerText = `랜덤 색상: ${currentThemeData.korName}`;
        showPlace(currentPlaceIndex, withFade);

        themeIndex++;
        if (themeIndex >= shuffledThemes.length) {
            initShuffle();
        }
    }

    // 애니메이션 시작
    if (mainCard) {
        changeCircleColors();
        intervalId = setInterval(changeCircleColors, 2500);

        exploreBtn.addEventListener('click', () => {
            clearInterval(intervalId);

            fadeElements.forEach(el => {
                el.style.opacity = '0';
                el.style.pointerEvents = 'none';
            });

            initShuffle();
            updateThemeDisplay(false);

            setTimeout(() => {
                resultContainer.style.opacity = '1';
                resultContainer.style.pointerEvents = 'auto';
            }, 500);
        });

        refreshBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            contentWrapper.style.opacity = '0';
            setTimeout(() => {
                updateThemeDisplay(false);
                contentWrapper.style.opacity = '1';
            }, 300);
        });

        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentPlaceIndex = (currentPlaceIndex - 1 + 5) % 5;
            showPlace(currentPlaceIndex, true);
        });

        nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentPlaceIndex = (currentPlaceIndex + 1) % 5;
            showPlace(currentPlaceIndex, true);
        });

        searchBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            setTimeout(() => {
                const searchInput = document.getElementById('keyword');
                if (searchInput) {
                    searchInput.focus();
                }
            }, 500);
        });
    }

    // ------------------------------------------------
    // 3. Interactive Map Logic (New)
    // ------------------------------------------------

    // Only run if map element exists to prevent errors
    if (document.getElementById('map')) {

        // 1. Locations Data
        const locations = [
            { id: 1, name: "1. 서울: 경복궁 (Gyeongbokgung Palace)", lat: 37.5796, lng: 126.9770, img: "spot_1.jpg", desc: "서울의 대표적인 랜드마크이자 한국적인 미가 집약된 곳입니다. 특히 경회루 연못에 비친 반영이나, 근정전의 웅장한 처마 곡선은 사계절 내내 최고의 피사체입니다." },
            { id: 2, name: "2. 강원도 인제: 원대리 자작나무 숲", lat: 38.0093, lng: 128.1943, img: "spot_2.jpg", desc: "마치 북유럽에 온 듯한 이국적인 풍경을 자랑합니다. 빽빽하게 솟은 하얀 자작나무들이 군락을 이루고 있어 신비로운 분위기가 연출됩니다." },
            { id: 3, name: "3. 경주: 동궁과 월지", lat: 35.8346, lng: 129.2271, img: "spot_3.jpg", desc: "대한민국 최고의 야경 명소입니다. 밤이 되면 궁궐이 연못에 거울처럼 비쳐 황금빛으로 빛나는 환상적인 사진을 얻을 수 있습니다." },
            { id: 4, name: "4. 순천: 순천만 습지", lat: 34.8427, lng: 127.5061, img: "spot_4.jpg", desc: "끝없이 펼쳐진 갈대밭과 S자 물길이 장관입니다. 해 질 녘 용산 전망대에서 바라보는 붉은 노을은 숨 막히는 풍경을 선사합니다." },
            { id: 5, name: "5. 제주: 성산일출봉", lat: 33.4589, lng: 126.9408, img: "spot_5.jpg", desc: "바다 위 거대한 화산 분화구의 웅장함. 유채꽃밭과 함께 담거나 광치기 해변에서 바라보는 뷰가 사진이 정말 잘 나옵니다." },
            { id: 6, name: "6. 부산: 감천문화마을", lat: 35.0975, lng: 129.0106, img: "spot_6.jpg", desc: "산자락을 따라 늘어선 알록달록한 파스텔톤 집들이 마치 레고 블록 같습니다. '한국의 마추픽추'로 불리는 필수 포토존입니다." },
            { id: 7, name: "7. 단양: 도담삼봉", lat: 36.9942, lng: 128.3615, img: "spot_7.jpg", desc: "남한강 한가운데 우뚝 솟은 세 개의 기암괴석. 물안개가 피어오를 때나 액자 조형물을 활용해 찍으면 한 폭의 그림 같습니다." },
            { id: 8, name: "8. 태안: 꽃지해수욕장", lat: 36.4965, lng: 126.3361, img: "spot_8.jpg", desc: "서해안 최고의 낙조 명소. 할미바위와 할아비바위 사이로 해가 떨어지는 순간은 사진작가들이 꼽는 최고의 명장면입니다." },
            { id: 9, name: "9. 진안: 마이산 탑사", lat: 35.7613, lng: 127.4208, img: "spot_9.jpg", desc: "말의 귀를 닮은 산 아래, 사람이 쌓아 올린 80여 개의 돌탑들이 신비롭고 미스터리한 분위기를 자아냅니다." },
            { id: 10, name: "10. 양평: 두물머리", lat: 37.5316, lng: 127.3142, img: "spot_10.jpg", desc: "북한강과 남한강이 만나는 곳. 400년 된 느티나무와 황포돛배, 그리고 새벽 물안개가 어우러져 서정적인 풍경을 자랑합니다." },
            { id: 11, name: "11. 포항: 스페이스 워크", lat: 36.0627, lng: 129.3973, img: "spot_11.jpg", desc: "하늘 위에 떠 있는 롤러코스터 트랙 같은 철제 조형물. 곡선 트랙과 영일만 바다가 어우러져 미래지향적인 사진을 남길 수 있습니다." },
            { id: 12, name: "12. 보성: 대한다원 녹차밭", lat: 34.7167, lng: 127.0813, img: "spot_12.jpg", desc: "굽이굽이 펼쳐진 초록빛 녹차 밭의 곡선미가 예술입니다. 안개 낀 새벽이나 삼나무 숲길의 빛내림은 몽환적인 분위기를 연출합니다." },
            { id: 13, name: "13. 거제: 바람의 언덕", lat: 34.7602, lng: 128.6732, img: "spot_13.jpg", desc: "푸른 남해 바다를 배경으로 서 있는 거대한 풍차와 언덕. 이국적이고 청량감 넘치는 인생샷을 남길 수 있는 곳입니다." },
            { id: 14, name: "14. 인천: 송도 센트럴파크", lat: 37.3932, lng: 126.6392, img: "spot_14.jpg", desc: "수로를 따라 늘어선 마천루들이 물 위에 비치는 야경은 홍콩 못지않게 화려합니다. 모던한 도시 감성의 사진을 찍기 좋습니다." },
            { id: 15, name: "15. 춘천: 남이섬", lat: 37.7913, lng: 127.5255, img: "spot_15.jpg", desc: "메타세쿼이아 길의 곧게 뻗은 나무들이 만드는 소실점 구도는 사진의 정석. 가을 단풍과 겨울 설경이 특히 아름답습니다." },
            { id: 16, name: "16. 창녕: 우포늪", lat: 35.5569, lng: 128.4228, img: "spot_16.jpg", desc: "1억 4천만 년 태고의 신비를 간직한 국내 최대 습지. 새벽 물안개 속 나룻배 타는 모습은 몽환적인 사진의 끝판왕입니다." },
            { id: 17, name: "17. 서귀포: 용머리 해안", lat: 33.2320, lng: 126.3146, img: "spot_17.jpg", desc: "한국의 그랜드 캐니언. 층층이 쌓인 사암층의 기묘한 곡선과 파도가 어우러져 압도적인 대자연의 배경을 선사합니다." },
            { id: 18, name: "18. 부여: 궁남지", lat: 36.2745, lng: 126.9152, img: "spot_18.jpg", desc: "우리나라에서 가장 오래된 인공 연못. 연꽃 축제 기간 만개한 연꽃과 정자(포룡정)의 조화는 한국의 고전미를 보여줍니다." },
            { id: 19, name: "19. 속초: 설악산 울산바위", lat: 38.1969, lng: 128.4682, img: "spot_19.jpg", desc: "병풍처럼 펼쳐진 거대한 화강암 봉우리. 인근 카페 옥상 등에서 망원 렌즈로 담으면 비현실적으로 웅장한 인생샷이 나옵니다." },
            { id: 20, name: "20. 담양: 죽녹원", lat: 35.3275, lng: 126.9917, img: "spot_20.jpg", desc: "하늘을 찌를 듯한 대나무 숲. 대나무 사이로 쏟아지는 햇살과 짙은 초록 배경이 인물을 더욱 화사하게 만들어 줍니다." }
        ];

        // 2. Initialize Map
        const INITIAL_CENTER = [35.9, 127.8];
        const INITIAL_ZOOM = 7;
        const INITIAL_TITLE = "이번 주의 추천 여행지";
        const INITIAL_DESC = "지도에 있는 핀을 클릭하셔서 더 자세히 알아보세요.";

        const map = L.map('map').setView(INITIAL_CENTER, INITIAL_ZOOM);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // 3. UI Elements
        const resetBtn = document.getElementById('reset-map-btn');
        const titleEl = document.getElementById('title-text');
        const descEl = document.getElementById('desc-text');

        // Prevent click on reset button from bubbling to map
        L.DomEvent.disableClickPropagation(resetBtn);

        // Reset Button Logic
        resetBtn.addEventListener('click', function () {
            map.flyTo(INITIAL_CENTER, INITIAL_ZOOM, { duration: 0.5 });
            map.closePopup();
            titleEl.innerText = INITIAL_TITLE;
            descEl.innerText = INITIAL_DESC;
            currentLocation = null;
        });

        // Show/Hide Reset Button based on map movement
        map.on('move', function () {
            const currentCenter = map.getCenter();
            const currentZoom = map.getZoom();
            const distance = map.distance(currentCenter, INITIAL_CENTER);

            if (currentZoom !== INITIAL_ZOOM || distance > 10000) {
                resetBtn.style.display = 'block';
            } else {
                resetBtn.style.display = 'none';
            }
        });

        // 4. Create Markers
        let currentLocation = null; // 현재 선택된 장소 저장

        locations.forEach(loc => {
            const marker = L.marker([loc.lat, loc.lng]).addTo(map);

            // [FIXED] Removed the wrapping <div> to prevent layout gaps
            const popupContent = `<img src="images/map/${loc.img}" class="popup-img" alt="${loc.name}" onerror="this.style.display='none';">`;

            marker.bindPopup(popupContent);

            marker.on('click', function () {
                // Update text description
                titleEl.innerText = loc.name;
                descEl.innerText = loc.desc;

                // 현재 선택된 장소 저장
                currentLocation = loc;

                // Fly to location with offset (so pin is not covered by popup)
                const targetZoom = 13;
                const mapHeight = map.getSize().y;
                // Calculate logic to center the marker slightly lower so popup is visible
                const targetPoint = map.project([loc.lat, loc.lng], targetZoom);
                const offset = mapHeight * 0.1; // Shift map down slightly
                const newCenterPoint = L.point(targetPoint.x, targetPoint.y - offset);
                const newCenterLatLng = map.unproject(newCenterPoint, targetZoom);

                map.flyTo(newCenterLatLng, targetZoom, { duration: 1.1 });
            });
        });

        // 5. 일정에 추가 버튼 클릭 이벤트
        const addScheduleBtn = document.querySelector('.add-btn');
        if (addScheduleBtn) {
            addScheduleBtn.addEventListener('click', function () {
                if (!currentLocation) {
                    alert('먼저 지도에서 여행지를 선택해주세요.');
                    return;
                }

                // 장소 이름에서 번호 제거 (예: "1. 서울: 경복궁" -> "경복궁")
                const fullName = currentLocation.name;
                const colonIndex = fullName.lastIndexOf(':');
                const placeName = colonIndex !== -1
                    ? fullName.substring(colonIndex + 1).trim().split(' (')[0]
                    : fullName;

                // 장소 데이터 구성
                const placeData = {
                    type: 'recommended',
                    originalId: currentLocation.id,
                    image: `images/map/${currentLocation.img}`,
                    location: currentLocation.desc,
                    lat: currentLocation.lat,
                    lng: currentLocation.lng
                };

                // 캘린더 모달 열기
                if (typeof calendarModal !== 'undefined') {
                    calendarModal.open(placeName, placeData, (scheduleData) => {
                        console.log("일정이 추가되었습니다:", scheduleData);
                    });
                } else {
                    alert('캘린더 모달을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
                }
            });
        }
    }

});