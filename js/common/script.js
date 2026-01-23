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
        if (!currentThemeData) return;
        const place = currentThemeData.places[index];

        const imagePath = `images/${currentThemeData.id}_${index + 1}.jpg`;

        if (withFade) {
            contentWrapper.style.opacity = '0';
            isTransitioning = true;
            setTimeout(() => {
                placeName.innerText = place.name;
                placeDesc.innerText = place.desc;
                imagePlaceholder.style.backgroundImage = `url('${imagePath}')`;
                imagePlaceholder.innerText = ""; // 텍스트 숨김

                contentWrapper.style.opacity = '1';
                isTransitioning = false;
            }, 300);
        } else {
            placeName.innerText = place.name;
            placeDesc.innerText = place.desc;
            imagePlaceholder.style.backgroundImage = `url('${imagePath}')`;
            imagePlaceholder.innerText = "";
        }
    }

    function updateThemeDisplay(withFade = false) {
        currentThemeData = shuffledThemes[themeIndex];
        currentPlaceIndex = 0;

        const bgColor = currentThemeData.code;
        const contrastColor = getContrastColor(bgColor);

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
            // 검색창으로 부드럽게 스크롤
            const searchContainer = document.querySelector('.search-container');
            if (searchContainer) {
                searchContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // 스크롤 후 검색 입력창에 포커스
                setTimeout(() => {
                    const searchInput = document.getElementById('keyword');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }, 500);
            }
        });
    }

    });