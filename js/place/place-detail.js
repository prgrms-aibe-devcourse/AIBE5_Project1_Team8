// ===== 관광지 데이터 (색상 테마 기반 상세정보) =====
const places = {
  // ===== 문화 카테고리 (gold, beige, brown) =====

  // gold 색상
  101: {
    name: "아산 곡교천",
    region: "chungnam",
    image: "images/color/gold_1.jpg",
    address: "충청남도 아산시 염치읍 백암리",
    contact: "041-540-2114",
    time: "연중무휴",
    desc: "수백 그루 은행나무가 만드는 황금빛 터널. 가을이면 2km에 달하는 은행나무 가로수길이 노란 융단을 깔아놓은 듯 황홀한 풍경을 선사합니다.",
    parking: true,
    chkbabycarriage: true
  },
  102: {
    name: "태안 꽃지해수욕장",
    region: "chungnam",
    image: "images/color/gold_2.jpg",
    address: "충청남도 태안군 안면읍 꽃지해안로",
    contact: "041-670-2114",
    time: "연중무휴",
    desc: "낙조가 바다를 붉은 황금색으로 물들이는 서해안 최고의 일몰 명소입니다.",
    parking: true,
    chkbabycarriage: true
  },
  103: {
    name: "순천만 습지",
    region: "jeonnam",
    image: "images/color/gold_3.jpg",
    address: "전라남도 순천시 순천만길 513-25",
    contact: "061-749-6052",
    time: "08:00 ~ 일몰시",
    desc: "햇빛 받은 갈대밭이 황금색으로 일렁이는 곳. 끝없이 펼쳐진 갈대밭과 S자 물길이 장관입니다.",
    parking: true,
    chkbabycarriage: true
  },
  104: {
    name: "제주 성산일출봉",
    region: "jeju",
    image: "images/color/gold_4.jpg",
    address: "제주특별자치도 서귀포시 성산읍 성산리",
    contact: "064-783-0959",
    time: "07:00 ~ 19:00",
    desc: "유네스코 세계자연유산으로 지정된 제주도의 대표적인 일출 명소입니다.",
    parking: true,
    chkbabycarriage: false
  },
  105: {
    name: "영주 부석사",
    region: "gyeongbuk",
    image: "images/color/gold_5.jpg",
    address: "경상북도 영주시 부석면 부석사로 345",
    contact: "054-633-3464",
    time: "08:00 ~ 18:00",
    desc: "해 질 녘 사찰을 감싸는 노란 빛의 고즈넉함. 천년고찰의 아름다운 낙조를 감상할 수 있습니다.",
    parking: true,
    chkbabycarriage: false
  },

  // beige 색상
  106: {
    name: "안동 하회마을",
    region: "gyeongbuk",
    image: "images/color/beige_1.jpg",
    address: "경상북도 안동시 풍천면 하회종가길",
    contact: "054-852-3588",
    time: "09:00 ~ 18:00",
    desc: "유네스코 세계문화유산으로 지정된 전통마을로, 600년 역사의 양반문화를 체험할 수 있습니다.",
    parking: true,
    chkbabycarriage: true
  },
  107: {
    name: "수원 화성",
    region: "gyeonggi",
    image: "images/color/beige_2.jpg",
    address: "경기도 수원시 팔달구 정조로 825",
    contact: "031-290-3600",
    time: "09:00 ~ 18:00",
    desc: "유네스코 세계문화유산으로 정조의 효심이 담긴 조선 후기 성곽 건축의 백미입니다.",
    parking: true,
    chkbabycarriage: true
  },
  108: {
    name: "경주 대릉원",
    region: "gyeongbuk",
    image: "images/color/beige_3.jpg",
    address: "경상북도 경주시 황남동 183",
    contact: "054-750-8650",
    time: "09:00 ~ 22:00",
    desc: "신라 왕과 귀족들의 무덤이 모여 있는 고분군으로, 천마총이 유명합니다.",
    parking: true,
    chkbabycarriage: true
  },
  109: {
    name: "순천 낙안읍성",
    region: "jeonnam",
    image: "images/color/beige_4.jpg",
    address: "전라남도 순천시 낙안면 충민길 30",
    contact: "061-749-8831",
    time: "09:00 ~ 18:00",
    desc: "조선시대 읍성의 원형이 잘 보존된 민속마을로, 실제로 주민들이 거주하고 있습니다.",
    parking: true,
    chkbabycarriage: true
  },
  110: {
    name: "서천 신성리 갈대밭",
    region: "chungnam",
    image: "images/color/beige_5.jpg",
    address: "충청남도 서천군 한산면 신성리",
    contact: "041-950-4114",
    time: "연중무휴",
    desc: "금강 하구의 광활한 갈대밭으로, 영화 JSA 촬영지로도 유명합니다.",
    parking: true,
    chkbabycarriage: true
  },

  // brown 색상
  111: {
    name: "대전 계족산 황토길",
    region: "daejeon",
    image: "images/color/brown_1.jpg",
    address: "대전광역시 대덕구 장동 산 29-1",
    contact: "042-608-6551",
    time: "연중무휴",
    desc: "약 14km의 맨발 산책로가 조성되어 있어 힐링과 건강을 동시에 챙길 수 있습니다.",
    parking: true,
    chkbabycarriage: false
  },
  112: {
    name: "무안 황토 갯벌랜드",
    region: "jeonnam",
    image: "images/color/brown_2.jpg",
    address: "전라남도 무안군 해제면 만송로 36-11",
    contact: "061-450-5114",
    time: "09:00 ~ 18:00",
    desc: "황토와 갯벌 체험을 동시에 즐길 수 있는 독특한 생태공원입니다.",
    parking: true,
    chkbabycarriage: true
  },
  113: {
    name: "고창 고창읍성",
    region: "jeonbuk",
    image: "images/color/brown_3.jpg",
    address: "전라북도 고창군 고창읍 읍내리",
    contact: "063-560-2714",
    time: "09:00 ~ 18:00",
    desc: "조선시대 읍성 중 가장 잘 보존된 곳으로, 성곽 밟기 체험이 유명합니다.",
    parking: true,
    chkbabycarriage: true
  },
  114: {
    name: "하동 최참판댁",
    region: "gyeongnam",
    image: "images/color/brown_4.jpg",
    address: "경상남도 하동군 악양면 평사리길 66-7",
    contact: "055-880-2950",
    time: "09:00 ~ 18:00",
    desc: "소설 '토지'의 배경으로, 조선 후기 부농 가옥의 모습을 재현했습니다.",
    parking: true,
    chkbabycarriage: true
  },
  115: {
    name: "영주 무섬마을",
    region: "gyeongbuk",
    image: "images/color/brown_5.jpg",
    address: "경상북도 영주시 문수면 수도리",
    contact: "054-638-7930",
    time: "연중무휴",
    desc: "물 위에 떠 있는 섬처럼 생긴 전통마을로, 외나무다리가 유명합니다.",
    parking: true,
    chkbabycarriage: true
  },

  // ===== 식당 카테고리 (red, neon, yellow) =====

  // red 색상
  201: {
    name: "정읍 내장산",
    region: "jeonbuk",
    image: "images/color/red_1.jpg",
    address: "전라북도 정읍시 내장산로 936",
    contact: "063-538-7875",
    time: "일출 ~ 일몰",
    desc: "가을 단풍의 명소로, 붉은 단풍이 산 전체를 물들입니다.",
    parking: true,
    chkbabycarriage: false
  },
  202: {
    name: "영광 불갑사",
    region: "jeonnam",
    image: "images/color/red_2.jpg",
    address: "전라남도 영광군 불갑면 불갑사로 450",
    contact: "061-350-5600",
    time: "07:00 ~ 19:00",
    desc: "천년 고찰로 가을 꽃무릇(상사화)이 유명합니다.",
    parking: true,
    chkbabycarriage: true
  },
  203: {
    name: "창덕궁 후원",
    region: "seoul",
    image: "images/color/red_3.jpg",
    address: "서울특별시 종로구 율곡로 99",
    contact: "02-3668-2300",
    time: "09:00 ~ 18:00",
    desc: "조선 왕실의 비밀 정원으로, 사계절 아름다운 풍경을 자랑합니다.",
    parking: true,
    chkbabycarriage: false
  },
  204: {
    name: "고창 선운사",
    region: "jeonbuk",
    image: "images/color/red_4.jpg",
    address: "전라북도 고창군 아산면 선운사로 250",
    contact: "063-561-1422",
    time: "일출 ~ 일몰",
    desc: "동백꽃과 단풍으로 유명한 천년 고찰입니다.",
    parking: true,
    chkbabycarriage: true
  },
  205: {
    name: "단양강 잔도",
    region: "chungbuk",
    image: "images/color/red_5.jpg",
    address: "충청북도 단양군 적성면 애곡리",
    contact: "043-420-2114",
    time: "09:00 ~ 18:00",
    desc: "절벽을 따라 조성된 보도교에서 남한강의 아름다운 절경을 감상할 수 있습니다.",
    parking: true,
    chkbabycarriage: true
  },

  // neon 색상
  206: {
    name: "DDP (동대문디자인플라자)",
    region: "seoul",
    image: "images/color/neon_1.jpg",
    address: "서울특별시 중구 을지로 281",
    contact: "02-2153-0000",
    time: "10:00 ~ 20:00",
    desc: "세계적인 건축가 자하 하디드가 설계한 서울의 랜드마크입니다.",
    parking: true,
    chkbabycarriage: true
  },
  207: {
    name: "부산 더베이 101",
    region: "busan",
    image: "images/color/neon_2.jpg",
    address: "부산광역시 해운대구 동백로 52",
    contact: "051-726-8888",
    time: "11:00 ~ 22:00",
    desc: "해운대 마린시티의 화려한 야경을 감상할 수 있는 복합문화공간입니다.",
    parking: true,
    chkbabycarriage: true
  },
  208: {
    name: "대구 이월드 83타워",
    region: "daegu",
    image: "images/color/neon_3.jpg",
    address: "대구광역시 달서구 두류공원로 200",
    contact: "053-620-0001",
    time: "10:00 ~ 22:00",
    desc: "대구의 랜드마크로 화려한 야경과 전망을 자랑합니다.",
    parking: true,
    chkbabycarriage: true
  },
  209: {
    name: "경주 동궁과 월지",
    region: "gyeongbuk",
    image: "images/color/neon_4.jpg",
    address: "경상북도 경주시 원화로 102",
    contact: "054-750-8655",
    time: "09:00 ~ 22:00",
    desc: "신라 왕궁의 별궁터로, 야간 조명이 아름다운 명소입니다.",
    parking: true,
    chkbabycarriage: true
  },
  210: {
    name: "여수 낭만포차",
    region: "jeonnam",
    image: "images/color/neon_5.jpg",
    address: "전라남도 여수시 중앙동 해안가",
    contact: "061-659-1800",
    time: "18:00 ~ 02:00",
    desc: "여수 밤바다와 함께 즐기는 낭만적인 야시장입니다.",
    parking: true,
    chkbabycarriage: true
  },

  // yellow 색상
  211: {
    name: "신안 선도",
    region: "jeonnam",
    image: "images/color/yellow_1.jpg",
    address: "전라남도 신안군 지도읍 선도리",
    contact: "061-240-8114",
    time: "연중무휴",
    desc: "노란 수선화가 가득한 섬으로, 봄이면 황금빛 물결이 펼쳐집니다.",
    parking: true,
    chkbabycarriage: true
  },
  212: {
    name: "구례 산수유마을",
    region: "jeonnam",
    image: "images/color/yellow_2.jpg",
    address: "전라남도 구례군 산동면 좌사리",
    contact: "061-780-2450",
    time: "연중무휴",
    desc: "봄이면 노란 산수유꽃이 마을 전체를 물들입니다.",
    parking: true,
    chkbabycarriage: true
  },
  213: {
    name: "장성 황룡강",
    region: "jeonnam",
    image: "images/color/yellow_3.jpg",
    address: "전라남도 장성군 황룡면 황룡리",
    contact: "061-390-7224",
    time: "연중무휴",
    desc: "황룡강변을 따라 펼쳐진 노란 유채꽃밭이 장관입니다.",
    parking: true,
    chkbabycarriage: true
  },
  214: {
    name: "부산 대저 생태공원",
    region: "busan",
    image: "images/color/yellow_4.jpg",
    address: "부산광역시 강서구 대저1동",
    contact: "051-970-3975",
    time: "연중무휴",
    desc: "낙동강 하구의 광활한 유채꽃밭으로 유명합니다.",
    parking: true,
    chkbabycarriage: true
  },
  215: {
    name: "이천 산수유 마을",
    region: "gyeonggi",
    image: "images/color/yellow_5.jpg",
    address: "경기도 이천시 백사면 도립리",
    contact: "031-644-2114",
    time: "연중무휴",
    desc: "이른 봄 노란 산수유꽃이 만개하는 아름다운 마을입니다.",
    parking: true,
    chkbabycarriage: true
  },

  // ===== 자연 카테고리 (forest, sky, mint 등) =====

  // forest 색상
  301: {
    name: "담양 죽녹원",
    region: "jeonnam",
    image: "images/color/forest_1.jpg",
    address: "전라남도 담양군 담양읍 죽녹원로 119",
    contact: "061-380-3149",
    time: "09:00 ~ 19:00",
    desc: "울창한 대나무 숲이 조성된 힐링 명소입니다.",
    parking: true,
    chkbabycarriage: true
  },
  302: {
    name: "보성 대한다원",
    region: "jeonnam",
    image: "images/color/forest_2.jpg",
    address: "전라남도 보성군 보성읍 녹차로 763-67",
    contact: "061-852-4540",
    time: "09:00 ~ 18:00",
    desc: "푸른 녹차밭이 펼쳐진 한국 최대의 차 재배지입니다.",
    parking: true,
    chkbabycarriage: true
  },
  303: {
    name: "삼척 도계 이끼폭포",
    region: "gangwon",
    image: "images/color/forest_3.jpg",
    address: "강원도 삼척시 도계읍 무건리",
    contact: "033-570-3545",
    time: "연중무휴",
    desc: "초록 이끼로 덮인 신비로운 폭포입니다.",
    parking: true,
    chkbabycarriage: false
  },
  304: {
    name: "제주 비자림",
    region: "jeju",
    image: "images/color/forest_4.jpg",
    address: "제주특별자치도 제주시 구좌읍 비자숲길 55",
    contact: "064-710-7912",
    time: "09:00 ~ 18:00",
    desc: "천년 비자나무 숲으로 피톤치드가 가득한 산책로입니다.",
    parking: true,
    chkbabycarriage: true
  },
  305: {
    name: "울산 태화강 십리대숲",
    region: "ulsan",
    image: "images/color/forest_5.jpg",
    address: "울산광역시 중구 태화동",
    contact: "052-229-6142",
    time: "연중무휴",
    desc: "태화강을 따라 펼쳐진 4km 대나무 숲길입니다.",
    parking: true,
    chkbabycarriage: true
  },

  // sky 색상
  306: {
    name: "포항 스페이스워크",
    region: "gyeongbuk",
    image: "images/color/sky_1.jpg",
    address: "경상북도 포항시 북구 환호공원길 30",
    contact: "054-270-5855",
    time: "10:00 ~ 21:00",
    desc: "하늘을 걷는 듯한 독특한 구조물의 전망대입니다.",
    parking: true,
    chkbabycarriage: false
  },
  307: {
    name: "부산 블루라인파크",
    region: "busan",
    image: "images/color/sky_2.jpg",
    address: "부산광역시 해운대구 청사포로 116",
    contact: "051-701-5548",
    time: "09:00 ~ 18:00",
    desc: "해안 절경을 따라 달리는 스카이캡슐입니다.",
    parking: true,
    chkbabycarriage: true
  },
  308: {
    name: "강릉 안목해변",
    region: "gangwon",
    image: "images/color/sky_3.jpg",
    address: "강원도 강릉시 창해로14번길",
    contact: "033-640-5420",
    time: "연중무휴",
    desc: "커피거리로 유명한 아름다운 해변입니다.",
    parking: true,
    chkbabycarriage: true
  },
  309: {
    name: "영덕 블루로드",
    region: "gyeongbuk",
    image: "images/color/sky_4.jpg",
    address: "경상북도 영덕군 강구면 강구항로",
    contact: "054-730-6114",
    time: "연중무휴",
    desc: "동해안의 푸른 바다를 따라 걷는 해안 트레일입니다.",
    parking: true,
    chkbabycarriage: true
  },
  310: {
    name: "제주 협재해수욕장",
    region: "jeju",
    image: "images/color/sky_5.jpg",
    address: "제주특별자치도 제주시 한림읍 협재리",
    contact: "064-728-3981",
    time: "연중무휴",
    desc: "에메랄드빛 바다가 아름다운 제주의 대표 해수욕장입니다.",
    parking: true,
    chkbabycarriage: true
  },

  // mint 색상
  311: {
    name: "삼척 장호항",
    region: "gangwon",
    image: "images/color/mint_1.jpg",
    address: "강원도 삼척시 근덕면 장호리",
    contact: "033-570-3843",
    time: "연중무휴",
    desc: "맑고 투명한 바다로 스노클링 명소입니다.",
    parking: true,
    chkbabycarriage: true
  },
  312: {
    name: "제주 월정리",
    region: "jeju",
    image: "images/color/mint_2.jpg",
    address: "제주특별자치도 제주시 구좌읍 월정리",
    contact: "064-728-7973",
    time: "연중무휴",
    desc: "에메랄드빛 바다와 하얀 모래가 어우러진 해변입니다.",
    parking: true,
    chkbabycarriage: true
  },
  313: {
    name: "남해 상주 은모래비치",
    region: "gyeongnam",
    image: "images/color/mint_3.jpg",
    address: "경상남도 남해군 상주면 상주리",
    contact: "055-860-8631",
    time: "연중무휴",
    desc: "고운 백사장과 맑은 바다가 아름다운 해변입니다.",
    parking: true,
    chkbabycarriage: true
  },
  314: {
    name: "울진 죽변 하트해변",
    region: "gyeongbuk",
    image: "images/color/mint_4.jpg",
    address: "경상북도 울진군 죽변면 죽변리",
    contact: "054-789-6903",
    time: "연중무휴",
    desc: "하트 모양의 독특한 해변으로 연인들에게 인기입니다.",
    parking: true,
    chkbabycarriage: true
  },
  315: {
    name: "원주 소금산",
    region: "gangwon",
    image: "images/color/mint_5.jpg",
    address: "강원도 원주시 지정면 소금산길 12",
    contact: "033-766-3399",
    time: "09:00 ~ 18:00",
    desc: "출렁다리와 스카이워크가 있는 자연 명소입니다.",
    parking: true,
    chkbabycarriage: false
  },

  // white 색상
  316: {
    name: "인제 자작나무 숲",
    region: "gangwon",
    image: "images/color/white_1.jpg",
    address: "강원도 인제군 인제읍 원대리",
    contact: "033-460-8036",
    time: "09:00 ~ 17:00",
    desc: "하얀 자작나무가 군락을 이룬 신비로운 숲입니다.",
    parking: true,
    chkbabycarriage: false
  },
  317: {
    name: "무주 덕유산",
    region: "jeonbuk",
    image: "images/color/white_2.jpg",
    address: "전라북도 무주군 설천면 삼공리",
    contact: "063-322-3174",
    time: "연중무휴",
    desc: "겨울 설경이 아름다운 국립공원입니다.",
    parking: true,
    chkbabycarriage: false
  },
  318: {
    name: "대관령 양떼목장",
    region: "gangwon",
    image: "images/color/white_3.jpg",
    address: "강원도 평창군 대관령면 대관령마루길 483-32",
    contact: "033-335-1966",
    time: "09:00 ~ 18:00",
    desc: "푸른 초원과 양떼가 어우러진 목가적인 풍경입니다.",
    parking: true,
    chkbabycarriage: true
  },
  319: {
    name: "청송 얼음골",
    region: "gyeongbuk",
    image: "images/color/white_4.jpg",
    address: "경상북도 청송군 주왕산면 주왕산로",
    contact: "054-873-0014",
    time: "연중무휴",
    desc: "여름에도 얼음이 어는 신비로운 계곡입니다.",
    parking: true,
    chkbabycarriage: false
  },
  320: {
    name: "이호테우 해변",
    region: "jeju",
    image: "images/color/white_5.jpg",
    address: "제주특별자치도 제주시 이호일동",
    contact: "064-728-3984",
    time: "연중무휴",
    desc: "빨간 말과 하얀 말 조형물이 있는 제주의 해변입니다.",
    parking: true,
    chkbabycarriage: true
  },

  // fog 색상
  321: {
    name: "춘천 소양강 스카이워크",
    region: "gangwon",
    image: "images/color/fog_1.jpg",
    address: "강원도 춘천시 영서로 2663",
    contact: "033-240-1695",
    time: "09:00 ~ 18:00",
    desc: "소양강 위를 걷는 듯한 투명 바닥 전망대입니다.",
    parking: true,
    chkbabycarriage: true
  },
  322: {
    name: "양평 두물머리",
    region: "gyeonggi",
    image: "images/color/fog_2.jpg",
    address: "경기도 양평군 양서면 양수리",
    contact: "031-770-1001",
    time: "연중무휴",
    desc: "북한강과 남한강이 만나는 운무가 아름다운 곳입니다.",
    parking: true,
    chkbabycarriage: true
  },
  323: {
    name: "옥천 용암사",
    region: "chungbuk",
    image: "images/color/fog_3.jpg",
    address: "충청북도 옥천군 옥천읍 용암리",
    contact: "043-730-3561",
    time: "연중무휴",
    desc: "운해가 아름다운 일출 명소입니다.",
    parking: true,
    chkbabycarriage: false
  },
  324: {
    name: "청송 주산지",
    region: "gyeongbuk",
    image: "images/color/fog_4.jpg",
    address: "경상북도 청송군 주왕산면 주산지리",
    contact: "054-870-6114",
    time: "연중무휴",
    desc: "물에 잠긴 왕버들이 신비로운 풍경을 만드는 저수지입니다.",
    parking: true,
    chkbabycarriage: true
  },
  325: {
    name: "화순 세량지",
    region: "jeonnam",
    image: "images/color/fog_5.jpg",
    address: "전라남도 화순군 화순읍 세량리",
    contact: "061-379-3502",
    time: "연중무휴",
    desc: "새벽 물안개가 피어오르는 아름다운 저수지입니다.",
    parking: true,
    chkbabycarriage: true
  },

  // black 색상
  326: {
    name: "제주 주상절리대",
    region: "jeju",
    image: "images/color/black_1.jpg",
    address: "제주특별자치도 서귀포시 중문동",
    contact: "064-738-1521",
    time: "09:00 ~ 18:00",
    desc: "검은 현무암 기둥이 장관을 이루는 해안 절경입니다.",
    parking: true,
    chkbabycarriage: true
  },
  327: {
    name: "철원 한탄강",
    region: "gangwon",
    image: "images/color/black_2.jpg",
    address: "강원도 철원군 동송읍 장흥리",
    contact: "033-450-5558",
    time: "연중무휴",
    desc: "화산 활동으로 형성된 검은 현무암 협곡입니다.",
    parking: true,
    chkbabycarriage: false
  },
  328: {
    name: "제주 돌문화공원",
    region: "jeju",
    image: "images/color/black_3.jpg",
    address: "제주특별자치도 제주시 조천읍 남조로 2023",
    contact: "064-710-7731",
    time: "09:00 ~ 18:00",
    desc: "제주의 돌 문화를 체험할 수 있는 테마공원입니다.",
    parking: true,
    chkbabycarriage: true
  },
  329: {
    name: "울릉도 해안산책로",
    region: "gyeongbuk",
    image: "images/color/black_4.jpg",
    address: "경상북도 울릉군 울릉읍 도동리",
    contact: "054-790-6114",
    time: "연중무휴",
    desc: "검은 화산암 해안을 따라 걷는 산책로입니다.",
    parking: true,
    chkbabycarriage: false
  },
  330: {
    name: "우도 검멀레 해변",
    region: "jeju",
    image: "images/color/black_5.jpg",
    address: "제주특별자치도 제주시 우도면 연평리",
    contact: "064-728-4353",
    time: "연중무휴",
    desc: "검은 모래와 자갈로 이루어진 독특한 해변입니다.",
    parking: true,
    chkbabycarriage: true
  },

  // ===== 레져 카테고리 (rainbow, pink, lilac) =====

  // rainbow 색상
  401: {
    name: "제주 도두동 무지개도로",
    region: "jeju",
    image: "images/color/rainbow_1.jpg",
    address: "제주특별자치도 제주시 도두동",
    contact: "064-728-2114",
    time: "연중무휴",
    desc: "알록달록한 무지개색으로 칠해진 해안도로입니다.",
    parking: true,
    chkbabycarriage: true
  },
  402: {
    name: "부산 장림포구",
    region: "busan",
    image: "images/color/rainbow_2.jpg",
    address: "부산광역시 사하구 장림동",
    contact: "051-220-4000",
    time: "연중무휴",
    desc: "알록달록한 건물들이 포토존으로 인기입니다.",
    parking: true,
    chkbabycarriage: true
  },
  403: {
    name: "사천 무지개 해안도로",
    region: "gyeongnam",
    image: "images/color/rainbow_3.jpg",
    address: "경상남도 사천시 삼천포대교로",
    contact: "055-831-2114",
    time: "연중무휴",
    desc: "무지개색 난간이 설치된 해안도로입니다.",
    parking: true,
    chkbabycarriage: true
  },
  404: {
    name: "인천 송월동 동화마을",
    region: "incheon",
    image: "images/color/rainbow_4.jpg",
    address: "인천광역시 중구 송월동3가",
    contact: "032-760-6484",
    time: "연중무휴",
    desc: "세계 동화를 테마로 꾸며진 알록달록한 마을입니다.",
    parking: true,
    chkbabycarriage: true
  },
  405: {
    name: "가평 쁘띠프랑스",
    region: "gyeonggi",
    image: "images/color/rainbow_5.jpg",
    address: "경기도 가평군 청평면 호반로 1063",
    contact: "031-584-8200",
    time: "09:00 ~ 18:00",
    desc: "프랑스 마을을 재현한 테마파크입니다.",
    parking: true,
    chkbabycarriage: true
  },

  // pink 색상
  406: {
    name: "합천 황매산",
    region: "gyeongnam",
    image: "images/color/pink_1.jpg",
    address: "경상남도 합천군 가회면 황매산로",
    contact: "055-930-3756",
    time: "연중무휴",
    desc: "봄이면 철쭉이 만개하는 분홍빛 천국입니다.",
    parking: true,
    chkbabycarriage: false
  },
  407: {
    name: "제주 휴애리",
    region: "jeju",
    image: "images/color/pink_2.jpg",
    address: "제주특별자치도 서귀포시 남원읍 신례동로 256",
    contact: "064-732-2114",
    time: "09:00 ~ 18:00",
    desc: "사계절 꽃을 즐길 수 있는 자연생태공원입니다.",
    parking: true,
    chkbabycarriage: true
  },
  408: {
    name: "경주 보문단지",
    region: "gyeongbuk",
    image: "images/color/pink_3.jpg",
    address: "경상북도 경주시 보문로 446-48",
    contact: "054-745-7601",
    time: "연중무휴",
    desc: "벚꽃이 아름다운 경주의 관광단지입니다.",
    parking: true,
    chkbabycarriage: true
  },
  409: {
    name: "양주 나리공원",
    region: "gyeonggi",
    image: "images/color/pink_4.jpg",
    address: "경기도 양주시 광적면 효촌리",
    contact: "031-8082-4545",
    time: "10:00 ~ 18:00",
    desc: "수국과 다양한 꽃을 감상할 수 있는 공원입니다.",
    parking: true,
    chkbabycarriage: true
  },
  410: {
    name: "강진 백련사",
    region: "jeonnam",
    image: "images/color/pink_5.jpg",
    address: "전라남도 강진군 도암면 백련사길 145",
    contact: "061-432-0837",
    time: "08:00 ~ 18:00",
    desc: "동백꽃이 아름다운 천년 고찰입니다.",
    parking: true,
    chkbabycarriage: true
  },

  // lilac 색상
  411: {
    name: "신안 퍼플섬",
    region: "jeonnam",
    image: "images/color/lilac_1.jpg",
    address: "전라남도 신안군 안좌면 반월도",
    contact: "061-240-8114",
    time: "연중무휴",
    desc: "보라색으로 물든 섬으로 독특한 풍경을 자랑합니다.",
    parking: true,
    chkbabycarriage: true
  },
  412: {
    name: "고성 하늬라벤더팜",
    region: "gangwon",
    image: "images/color/lilac_2.jpg",
    address: "강원도 고성군 간성읍 흘리리",
    contact: "033-681-0005",
    time: "09:00 ~ 18:00",
    desc: "보라빛 라벤더가 가득한 힐링 농원입니다.",
    parking: true,
    chkbabycarriage: true
  },
  413: {
    name: "성주 성밖숲",
    region: "gyeongbuk",
    image: "images/color/lilac_3.jpg",
    address: "경상북도 성주군 성주읍 경산리",
    contact: "054-930-8371",
    time: "연중무휴",
    desc: "300년 된 왕버들 숲이 신비로운 분위기를 만듭니다.",
    parking: true,
    chkbabycarriage: true
  },
  414: {
    name: "태안 팜카밀레",
    region: "chungnam",
    image: "images/color/lilac_4.jpg",
    address: "충청남도 태안군 남면 연꽃길 178",
    contact: "041-675-3636",
    time: "09:00 ~ 18:00",
    desc: "다양한 허브와 꽃을 즐길 수 있는 허브농원입니다.",
    parking: true,
    chkbabycarriage: true
  },
  415: {
    name: "정읍 구절초 지방정원",
    region: "jeonbuk",
    image: "images/color/lilac_5.jpg",
    address: "전라북도 정읍시 산내면 매죽리",
    contact: "063-539-5696",
    time: "09:00 ~ 18:00",
    desc: "가을 구절초가 만개하는 아름다운 정원입니다.",
    parking: true,
    chkbabycarriage: true
  },

  // ===== 쇼핑 카테고리 (indigo, silver, gray) =====

  // indigo 색상
  501: {
    name: "울릉도 해안",
    region: "gyeongbuk",
    image: "images/color/indigo_1.jpg",
    address: "경상북도 울릉군 울릉읍 도동리",
    contact: "054-790-6114",
    time: "연중무휴",
    desc: "깊고 푸른 동해를 감상할 수 있는 섬입니다.",
    parking: true,
    chkbabycarriage: false
  },
  502: {
    name: "나주 천연염색 박물관",
    region: "jeonnam",
    image: "images/color/indigo_2.jpg",
    address: "전라남도 나주시 다시면 백호로 379",
    contact: "061-335-0071",
    time: "09:00 ~ 18:00",
    desc: "쪽빛 천연염색의 역사와 체험을 즐길 수 있습니다.",
    parking: true,
    chkbabycarriage: true
  },
  503: {
    name: "영양 반딧불이 공원",
    region: "gyeongbuk",
    image: "images/color/indigo_3.jpg",
    address: "경상북도 영양군 수비면 수하리",
    contact: "054-680-5332",
    time: "연중무휴",
    desc: "밤하늘 별과 반딧불이를 감상할 수 있는 청정지역입니다.",
    parking: true,
    chkbabycarriage: true
  },
  504: {
    name: "동해 추암 촛대바위",
    region: "gangwon",
    image: "images/color/indigo_4.jpg",
    address: "강원도 동해시 추암동",
    contact: "033-530-2801",
    time: "연중무휴",
    desc: "일출 명소로 유명한 기암괴석입니다.",
    parking: true,
    chkbabycarriage: true
  },
  505: {
    name: "부산 광안대교",
    region: "busan",
    image: "images/color/indigo_5.jpg",
    address: "부산광역시 수영구 광안해변로",
    contact: "051-610-4742",
    time: "연중무휴",
    desc: "밤에 화려한 조명이 아름다운 부산의 상징입니다.",
    parking: true,
    chkbabycarriage: true
  },

  // silver 색상
  506: {
    name: "정선 민둥산",
    region: "gangwon",
    image: "images/color/silver_1.jpg",
    address: "강원도 정선군 남면 민둥산로",
    contact: "033-560-2114",
    time: "연중무휴",
    desc: "가을 억새가 은빛 물결을 이루는 산입니다.",
    parking: true,
    chkbabycarriage: false
  },
  507: {
    name: "서울 하늘공원",
    region: "seoul",
    image: "images/color/silver_2.jpg",
    address: "서울특별시 마포구 하늘공원로 95",
    contact: "02-300-5500",
    time: "연중무휴",
    desc: "억새와 갈대가 아름다운 생태공원입니다.",
    parking: true,
    chkbabycarriage: true
  },
  508: {
    name: "울산 간월재",
    region: "ulsan",
    image: "images/color/silver_3.jpg",
    address: "울산광역시 울주군 상북면 등억리",
    contact: "052-229-7631",
    time: "연중무휴",
    desc: "광활한 억새밭이 장관인 고개입니다.",
    parking: true,
    chkbabycarriage: false
  },
  509: {
    name: "제주 새별오름",
    region: "jeju",
    image: "images/color/silver_4.jpg",
    address: "제주특별자치도 제주시 애월읍 봉성리",
    contact: "064-728-2114",
    time: "연중무휴",
    desc: "억새와 일몰이 아름다운 오름입니다.",
    parking: true,
    chkbabycarriage: false
  },
  510: {
    name: "포천 명성산",
    region: "gyeonggi",
    image: "images/color/silver_5.jpg",
    address: "경기도 포천시 영북면 산정리",
    contact: "031-538-2114",
    time: "연중무휴",
    desc: "가을 억새가 유명한 산으로 산정호수가 있습니다.",
    parking: true,
    chkbabycarriage: false
  },

  // gray 색상
  511: {
    name: "원주 뮤지엄 산",
    region: "gangwon",
    image: "images/color/gray_1.jpg",
    address: "강원도 원주시 지정면 오크밸리2길 260",
    contact: "033-730-9000",
    time: "10:00 ~ 18:00",
    desc: "안도 다다오가 설계한 현대 건축 미술관입니다.",
    parking: true,
    chkbabycarriage: true
  },
  512: {
    name: "설악산 울산바위",
    region: "gangwon",
    image: "images/color/gray_2.jpg",
    address: "강원도 속초시 설악산로 833",
    contact: "033-636-7700",
    time: "일출 ~ 일몰",
    desc: "거대한 화강암 바위로 설악산의 상징입니다.",
    parking: true,
    chkbabycarriage: false
  },
  513: {
    name: "익산 미륵사지",
    region: "jeonbuk",
    image: "images/color/gray_3.jpg",
    address: "전라북도 익산시 금마면 미륵사지로 362",
    contact: "063-290-6799",
    time: "09:00 ~ 18:00",
    desc: "백제 최대의 사찰터로 유네스코 세계유산입니다.",
    parking: true,
    chkbabycarriage: true
  },
  514: {
    name: "낙산공원 성곽길",
    region: "seoul",
    image: "images/color/gray_4.jpg",
    address: "서울특별시 종로구 낙산길 41",
    contact: "02-743-7985",
    time: "연중무휴",
    desc: "서울 도심을 조망할 수 있는 성곽 산책로입니다.",
    parking: false,
    chkbabycarriage: true
  },
  515: {
    name: "강화 고인돌",
    region: "incheon",
    image: "images/color/gray_5.jpg",
    address: "인천광역시 강화군 하점면 부근리",
    contact: "032-930-7070",
    time: "09:00 ~ 18:00",
    desc: "세계문화유산으로 등재된 선사시대 유적입니다.",
    parking: true,
    chkbabycarriage: true
  }
};

// 지역명 매핑
const regionNames = {
  seoul: "서울",
  busan: "부산",
  jeju: "제주",
  gangwon: "강원",
  gyeonggi: "경기",
  gyeongbuk: "경북",
  gyeongnam: "경남",
  jeonnam: "전남",
  jeonbuk: "전북",
  chungnam: "충남",
  chungbuk: "충북",
  daegu: "대구",
  daejeon: "대전",
  ulsan: "울산",
  incheon: "인천"
};

// URL에서 id 가져오기
const params = new URLSearchParams(window.location.search);
const placeId = params.get("id");
const place = places[placeId];

if (!place) {
  alert("존재하지 않는 관광지입니다.");
  location.href = "../hotel/hotel.html";
}

// DOM Elements
const headerPlaceName = document.getElementById("headerPlaceName");
const placeName = document.getElementById("placeName");
const placeImage = document.getElementById("placeImage");
const placeAddress = document.getElementById("placeAddress");
const placeContact = document.getElementById("placeContact");
const placeTime = document.getElementById("placeTime");
const placeDesc = document.getElementById("placeDesc");
const detailBtn = document.getElementById("detailBtn");
const pictogramSection = document.getElementById("pictogramSection");
const addScheduleBtn = document.getElementById("addScheduleBtn");
const scheduleModal = document.getElementById("scheduleModal");
const modalPlaceName = document.getElementById("modalPlaceName");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

// 픽토그램 상태 요소
const parkingStatus = document.getElementById("parkingStatus");
const petStatus = document.getElementById("petStatus");
const babycarStatus = document.getElementById("babycarStatus");
const restroomStatus = document.getElementById("restroomStatus");

const parkingInfo = document.getElementById("parkingInfo");
const petInfo = document.getElementById("petInfo");
const babycarInfo = document.getElementById("babycarInfo");
const restroomInfo = document.getElementById("restroomInfo");

// 관광지 정보 렌더링
if (place) {
  headerPlaceName.textContent = place.name;
  placeName.textContent = place.name;
  placeImage.src = "../../" + place.image;
  placeImage.alt = place.name;
  placeImage.onerror = function () {
    this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e0e0e0' width='400' height='300' rx='20'/%3E%3Ctext x='50%25' y='45%25' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='16'%3E관광지 이미지%3C/text%3E%3Ctext x='50%25' y='55%25' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='14'%3E(이미지 준비중)%3C/text%3E%3C/svg%3E`;
  };
  placeAddress.textContent = place.address;
  placeContact.textContent = place.contact;
  placeTime.textContent = place.time;
  placeDesc.textContent = place.desc;

  // 픽토그램 정보 설정
  function updatePictograms() {
    // 주차 정보
    parkingStatus.textContent = place.parking ? "가능" : "불가";
    parkingInfo.classList.toggle("available", place.parking);
    parkingInfo.classList.toggle("unavailable", !place.parking);

    // 반려동물 정보
    const isPetAvailable = place.pet || false;
    petStatus.textContent = isPetAvailable ? "동반가능" : "불가";
    petInfo.classList.toggle("available", isPetAvailable);
    petInfo.classList.toggle("unavailable", !isPetAvailable);

    // 유모차 정보
    babycarStatus.textContent = place.chkbabycarriage ? "대여가능" : "불가";
    babycarInfo.classList.toggle("available", place.chkbabycarriage);
    babycarInfo.classList.toggle("unavailable", !place.chkbabycarriage);

    // 화장실 정보 (기본값 '있음')
    restroomStatus.textContent = "있음";
    restroomInfo.classList.add("available");
  }

  updatePictograms();
}

// 상세 정보 버튼 클릭 이벤트
detailBtn.addEventListener("click", () => {
  pictogramSection.style.display = pictogramSection.style.display === "none" ? "block" : "none";
});

// 일정 추가 버튼 클릭 이벤트
addScheduleBtn.addEventListener("click", () => {
  if (typeof calendarModal !== 'undefined') {
    const placeData = {
      type: "place",
      originalId: placeId,
      image: place.image,
      location: place.address,
      contact: place.contact
    };
    calendarModal.open(place.name, placeData, (scheduleData) => {
      console.log("일정이 추가되었습니다:", scheduleData);
    });
  } else {
    modalPlaceName.textContent = place.name;
    scheduleModal.style.display = "flex";
  }
});

// 모달 닫기
if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    scheduleModal.style.display = "none";
  });
}

if (confirmBtn) {
  confirmBtn.addEventListener("click", () => {
    alert(`"${place.name}"이(가) 일정에 추가되었습니다.`);
    scheduleModal.style.display = "none";
  });
}

// 모달 외부 클릭 시 닫기
if (scheduleModal) {
  scheduleModal.addEventListener("click", (e) => {
    if (e.target === scheduleModal) {
      scheduleModal.style.display = "none";
    }
  });
}
