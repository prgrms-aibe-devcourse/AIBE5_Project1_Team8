// ===== 지역별 숙소 데이터 =====

// 서울 (Seoul) - 수도권 주요 관광지
const seoulHotels = [
  {
    id: 1001,
    name: "그랜드 하얏트 서울",
    address: "서울특별시 용산구 소월로 322",
    contact: "02-797-1234",
    price: "350,000원~",
    rating: 4.8,
    image: "images/hotels/seoul_1.jpg",
    region: "seoul",
    amenities: ["무료 WiFi", "수영장", "피트니스", "스파"]
  },
  {
    id: 1002,
    name: "롯데호텔 서울",
    address: "서울특별시 중구 을지로 30",
    contact: "02-771-1000",
    price: "280,000원~",
    rating: 4.7,
    image: "images/hotels/seoul_2.jpg",
    region: "seoul",
    amenities: ["무료 WiFi", "피트니스", "레스토랑", "비즈니스센터"]
  },
  {
    id: 1003,
    name: "신라호텔",
    address: "서울특별시 중구 동호로 249",
    contact: "02-2233-3131",
    price: "400,000원~",
    rating: 4.9,
    image: "images/hotels/seoul_3.jpg",
    region: "seoul",
    amenities: ["무료 WiFi", "수영장", "스파", "골프장"]
  },
  {
    id: 1004,
    name: "JW 메리어트 동대문",
    address: "서울특별시 종로구 청계천로 279",
    contact: "02-2276-3000",
    price: "320,000원~",
    rating: 4.6,
    image: "images/hotels/seoul_4.jpg",
    region: "seoul",
    amenities: ["무료 WiFi", "피트니스", "수영장", "레스토랑"]
  },
  {
    id: 1005,
    name: "파크 하얏트 서울",
    address: "서울특별시 강남구 테헤란로 606",
    contact: "02-2016-1234",
    price: "380,000원~",
    rating: 4.8,
    image: "images/hotels/seoul_5.jpg",
    region: "seoul",
    amenities: ["무료 WiFi", "스파", "피트니스", "미니바"]
  },
  {
    id: 1006,
    name: "노보텔 앰배서더 강남",
    address: "서울특별시 강남구 봉은사로 130",
    contact: "02-567-1101",
    price: "180,000원~",
    rating: 4.4,
    image: "images/hotels/seoul_6.jpg",
    region: "seoul",
    amenities: ["무료 WiFi", "피트니스", "레스토랑", "회의실"]
  }
];

// 부산 (Busan) - 해운대, 광안리 등
const busanHotels = [
  {
    id: 2001,
    name: "파크 하얏트 부산",
    address: "부산광역시 해운대구 마린시티1로 51",
    contact: "051-990-1234",
    price: "350,000원~",
    rating: 4.9,
    image: "images/hotels/busan_1.jpg",
    region: "busan",
    amenities: ["무료 WiFi", "오션뷰", "스파", "수영장"]
  },
  {
    id: 2002,
    name: "웨스틴 조선 부산",
    address: "부산광역시 해운대구 해운대해변로 67",
    contact: "051-749-7000",
    price: "280,000원~",
    rating: 4.7,
    image: "images/hotels/busan_2.jpg",
    region: "busan",
    amenities: ["무료 WiFi", "해변접근", "피트니스", "레스토랑"]
  },
  {
    id: 2003,
    name: "시그니엘 부산",
    address: "부산광역시 해운대구 달맞이길 30",
    contact: "051-922-1000",
    price: "450,000원~",
    rating: 4.9,
    image: "images/hotels/busan_3.jpg",
    region: "busan",
    amenities: ["무료 WiFi", "인피니티풀", "스파", "루프탑바"]
  },
  {
    id: 2004,
    name: "해운대 그랜드호텔",
    address: "부산광역시 해운대구 해운대해변로 217",
    contact: "051-740-0114",
    price: "200,000원~",
    rating: 4.5,
    image: "images/hotels/busan_4.jpg",
    region: "busan",
    amenities: ["무료 WiFi", "오션뷰", "사우나", "레스토랑"]
  },
  {
    id: 2005,
    name: "파라다이스 호텔 부산",
    address: "부산광역시 해운대구 해운대해변로 296",
    contact: "051-742-2121",
    price: "300,000원~",
    rating: 4.6,
    image: "images/hotels/busan_5.jpg",
    region: "busan",
    amenities: ["무료 WiFi", "카지노", "스파", "수영장"]
  },
  {
    id: 2006,
    name: "호텔 농심",
    address: "부산광역시 동래구 금강공원로 23",
    contact: "051-550-2100",
    price: "150,000원~",
    rating: 4.3,
    image: "images/hotels/busan_6.jpg",
    region: "busan",
    amenities: ["무료 WiFi", "온천", "사우나", "레스토랑"]
  }
];

// 제주 (Jeju) - 제주시, 서귀포 등
const jejuHotels = [
  {
    id: 3001,
    name: "롯데호텔 제주",
    address: "제주특별자치도 서귀포시 중문관광로 72번길 35",
    contact: "064-731-1000",
    price: "320,000원~",
    rating: 4.7,
    image: "images/hotels/jeju_1.jpg",
    region: "jeju",
    amenities: ["무료 WiFi", "수영장", "테마파크", "레스토랑"]
  },
  {
    id: 3002,
    name: "신라호텔 제주",
    address: "제주특별자치도 서귀포시 중문관광로 75",
    contact: "064-735-5114",
    price: "380,000원~",
    rating: 4.8,
    image: "images/hotels/jeju_2.jpg",
    region: "jeju",
    amenities: ["무료 WiFi", "프라이빗비치", "골프장", "스파"]
  },
  {
    id: 3003,
    name: "해비치 호텔앤드리조트",
    address: "제주특별자치도 서귀포시 표선면 민속해안로 537",
    contact: "064-780-8000",
    price: "350,000원~",
    rating: 4.7,
    image: "images/hotels/jeju_3.jpg",
    region: "jeju",
    amenities: ["무료 WiFi", "오션뷰", "수영장", "키즈클럽"]
  },
  {
    id: 3004,
    name: "그랜드 하얏트 제주",
    address: "제주특별자치도 제주시 노연로 12",
    contact: "064-907-1234",
    price: "400,000원~",
    rating: 4.9,
    image: "images/hotels/jeju_4.jpg",
    region: "jeju",
    amenities: ["무료 WiFi", "인피니티풀", "스파", "피트니스"]
  },
  {
    id: 3005,
    name: "라마다 프라자 제주호텔",
    address: "제주특별자치도 제주시 탑동로 66",
    contact: "064-729-8100",
    price: "180,000원~",
    rating: 4.4,
    image: "images/hotels/jeju_5.jpg",
    region: "jeju",
    amenities: ["무료 WiFi", "카지노", "레스토랑", "회의실"]
  },
  {
    id: 3006,
    name: "메종 글래드 제주",
    address: "제주특별자치도 제주시 노연로 80",
    contact: "064-717-1100",
    price: "220,000원~",
    rating: 4.5,
    image: "images/hotels/jeju_6.jpg",
    region: "jeju",
    amenities: ["무료 WiFi", "수영장", "피트니스", "조식포함"]
  }
];

// 강릉 (Gangneung) - 경포대, 주문진 등
const gangneungHotels = [
  {
    id: 4001,
    name: "세인트존스 호텔",
    address: "강원도 강릉시 창해로 307",
    contact: "033-660-9000",
    price: "280,000원~",
    rating: 4.6,
    image: "images/hotels/gangneung_1.jpg",
    region: "gangneung",
    amenities: ["무료 WiFi", "오션뷰", "수영장", "스파"]
  },
  {
    id: 4002,
    name: "스카이베이 호텔 경포",
    address: "강원도 강릉시 해안로 406번길 2",
    contact: "033-923-2000",
    price: "250,000원~",
    rating: 4.5,
    image: "images/hotels/gangneung_2.jpg",
    region: "gangneung",
    amenities: ["무료 WiFi", "경포해변", "레스토랑", "피트니스"]
  },
  {
    id: 4003,
    name: "강릉 씨마크 호텔",
    address: "강원도 강릉시 해안로 406번길 2",
    contact: "033-650-7000",
    price: "300,000원~",
    rating: 4.7,
    image: "images/hotels/gangneung_3.jpg",
    region: "gangneung",
    amenities: ["무료 WiFi", "오션뷰", "수영장", "골프장"]
  },
  {
    id: 4004,
    name: "호텔 탑스텐 강릉",
    address: "강원도 강릉시 경포로 476",
    contact: "033-650-2000",
    price: "180,000원~",
    rating: 4.3,
    image: "images/hotels/gangneung_4.jpg",
    region: "gangneung",
    amenities: ["무료 WiFi", "해변접근", "레스토랑", "주차"]
  },
  {
    id: 4005,
    name: "라카이 샌드파인 리조트",
    address: "강원도 강릉시 해안로 583",
    contact: "033-610-7000",
    price: "350,000원~",
    rating: 4.8,
    image: "images/hotels/gangneung_5.jpg",
    region: "gangneung",
    amenities: ["무료 WiFi", "프라이빗비치", "인피니티풀", "스파"]
  }
];

// 경주 (Gyeongju) - 보문단지 등
const gyeongjuHotels = [
  {
    id: 5001,
    name: "힐튼 경주",
    address: "경상북도 경주시 보문로 484-7",
    contact: "054-745-7788",
    price: "250,000원~",
    rating: 4.6,
    image: "images/hotels/gyeongju_1.jpg",
    region: "gyeongju",
    amenities: ["무료 WiFi", "보문호수뷰", "수영장", "골프장"]
  },
  {
    id: 5002,
    name: "코오롱 호텔 경주",
    address: "경상북도 경주시 보문로 111",
    contact: "054-746-9001",
    price: "200,000원~",
    rating: 4.4,
    image: "images/hotels/gyeongju_2.jpg",
    region: "gyeongju",
    amenities: ["무료 WiFi", "레스토랑", "피트니스", "사우나"]
  },
  {
    id: 5003,
    name: "경주 더케이호텔",
    address: "경상북도 경주시 보문로 338",
    contact: "054-769-9000",
    price: "180,000원~",
    rating: 4.3,
    image: "images/hotels/gyeongju_3.jpg",
    region: "gyeongju",
    amenities: ["무료 WiFi", "온천", "수영장", "레스토랑"]
  },
  {
    id: 5004,
    name: "라한호텔 경주",
    address: "경상북도 경주시 보문로 338",
    contact: "054-771-0071",
    price: "220,000원~",
    rating: 4.5,
    image: "images/hotels/gyeongju_4.jpg",
    region: "gyeongju",
    amenities: ["무료 WiFi", "가족룸", "레스토랑", "주차"]
  },
  {
    id: 5005,
    name: "경주 블루원 리조트",
    address: "경상북도 경주시 보문로 148-14",
    contact: "054-745-7711",
    price: "280,000원~",
    rating: 4.6,
    image: "images/hotels/gyeongju_5.jpg",
    region: "gyeongju",
    amenities: ["무료 WiFi", "워터파크", "스파", "골프장"]
  }
];

// 여수 (Yeosu) - 여수 밤바다 등
const yeosuHotels = [
  {
    id: 6001,
    name: "여수 베네치아 호텔",
    address: "전라남도 여수시 오동도로 61-15",
    contact: "061-660-7700",
    price: "220,000원~",
    rating: 4.5,
    image: "images/hotels/yeosu_1.jpg",
    region: "yeosu",
    amenities: ["무료 WiFi", "오션뷰", "루프탑", "레스토랑"]
  },
  {
    id: 6002,
    name: "디오션 리조트 여수",
    address: "전라남도 여수시 소호로 65",
    contact: "061-689-1000",
    price: "300,000원~",
    rating: 4.7,
    image: "images/hotels/yeosu_2.jpg",
    region: "yeosu",
    amenities: ["무료 WiFi", "인피니티풀", "스파", "해변접근"]
  },
  {
    id: 6003,
    name: "MVL 호텔 여수",
    address: "전라남도 여수시 오동도로 111",
    contact: "061-660-5000",
    price: "250,000원~",
    rating: 4.6,
    image: "images/hotels/yeosu_3.jpg",
    region: "yeosu",
    amenities: ["무료 WiFi", "오션뷰", "피트니스", "레스토랑"]
  },
  {
    id: 6004,
    name: "히든베이 호텔",
    address: "전라남도 여수시 돌산읍 무술목길 142",
    contact: "061-644-0100",
    price: "280,000원~",
    rating: 4.7,
    image: "images/hotels/yeosu_4.jpg",
    region: "yeosu",
    amenities: ["무료 WiFi", "프라이빗비치", "수영장", "바베큐"]
  },
  {
    id: 6005,
    name: "유탑 마리나 호텔",
    address: "전라남도 여수시 돌산읍 돌산로 3617-24",
    contact: "061-690-1000",
    price: "200,000원~",
    rating: 4.4,
    image: "images/hotels/yeosu_5.jpg",
    region: "yeosu",
    amenities: ["무료 WiFi", "요트투어", "레스토랑", "주차"]
  }
];

// 전주 (Jeonju) - 한옥마을 등
const jeonjuHotels = [
  {
    id: 7001,
    name: "라한호텔 전주",
    address: "전라북도 전주시 완산구 기린대로 85",
    contact: "063-232-7000",
    price: "180,000원~",
    rating: 4.5,
    image: "images/hotels/jeonju_1.jpg",
    region: "jeonju",
    amenities: ["무료 WiFi", "한옥마을접근", "레스토랑", "피트니스"]
  },
  {
    id: 7002,
    name: "전주 한옥 스테이 락고재",
    address: "전라북도 전주시 완산구 은행로 56-1",
    contact: "063-284-1004",
    price: "150,000원~",
    rating: 4.8,
    image: "images/hotels/jeonju_2.jpg",
    region: "jeonju",
    amenities: ["무료 WiFi", "전통한옥", "조식포함", "정원"]
  },
  {
    id: 7003,
    name: "전주 더 클래식호텔",
    address: "전라북도 전주시 완산구 전주객사3길 22",
    contact: "063-285-2000",
    price: "160,000원~",
    rating: 4.4,
    image: "images/hotels/jeonju_3.jpg",
    region: "jeonju",
    amenities: ["무료 WiFi", "도보이동", "레스토랑", "주차"]
  },
  {
    id: 7004,
    name: "호텔르윈 전주",
    address: "전라북도 전주시 완산구 홍산중앙로 48",
    contact: "063-277-1000",
    price: "140,000원~",
    rating: 4.3,
    image: "images/hotels/jeonju_4.jpg",
    region: "jeonju",
    amenities: ["무료 WiFi", "피트니스", "회의실", "주차"]
  },
  {
    id: 7005,
    name: "전주 한옥마을 교동재",
    address: "전라북도 전주시 완산구 최명희길 21",
    contact: "063-232-2211",
    price: "180,000원~",
    rating: 4.7,
    image: "images/hotels/jeonju_5.jpg",
    region: "jeonju",
    amenities: ["무료 WiFi", "전통한옥", "정원", "다도체험"]
  }
];

// 속초 (Sokcho) - 설악산 등
const sokchoHotels = [
  {
    id: 8001,
    name: "설악 켄싱턴 스타즈 호텔",
    address: "강원도 속초시 미시령로 2983번길 111",
    contact: "033-635-4001",
    price: "280,000원~",
    rating: 4.6,
    image: "images/hotels/sokcho_1.jpg",
    region: "sokcho",
    amenities: ["무료 WiFi", "설악산뷰", "스파", "레스토랑"]
  },
  {
    id: 8002,
    name: "마레몬스 호텔",
    address: "강원도 속초시 해오름로 190",
    contact: "033-630-7000",
    price: "250,000원~",
    rating: 4.5,
    image: "images/hotels/sokcho_2.jpg",
    region: "sokcho",
    amenities: ["무료 WiFi", "오션뷰", "수영장", "피트니스"]
  },
  {
    id: 8003,
    name: "속초 롯데리조트",
    address: "강원도 속초시 대포항길 186",
    contact: "033-634-1000",
    price: "300,000원~",
    rating: 4.7,
    image: "images/hotels/sokcho_3.jpg",
    region: "sokcho",
    amenities: ["무료 WiFi", "워터파크", "스파", "키즈클럽"]
  },
  {
    id: 8004,
    name: "설악파크 호텔",
    address: "강원도 속초시 설악산로 1090",
    contact: "033-636-7711",
    price: "220,000원~",
    rating: 4.4,
    image: "images/hotels/sokcho_4.jpg",
    region: "sokcho",
    amenities: ["무료 WiFi", "설악산접근", "온천", "레스토랑"]
  },
  {
    id: 8005,
    name: "델피노 골프앤리조트",
    address: "강원도 고성군 토성면 미시령로 2983번길 45",
    contact: "033-630-5000",
    price: "350,000원~",
    rating: 4.8,
    image: "images/hotels/sokcho_5.jpg",
    region: "sokcho",
    amenities: ["무료 WiFi", "골프장", "스파", "수영장"]
  }
];

// 인천 (Incheon) - 송도, 영종도 등
const incheonHotels = [
  {
    id: 9001,
    name: "쉐라톤 그랜드 인천",
    address: "인천광역시 연수구 컨벤시아대로 153",
    contact: "032-835-1000",
    price: "280,000원~",
    rating: 4.7,
    image: "images/hotels/incheon_1.jpg",
    region: "incheon",
    amenities: ["무료 WiFi", "송도뷰", "수영장", "피트니스"]
  },
  {
    id: 9002,
    name: "파라다이스시티",
    address: "인천광역시 중구 영종해안남로 321번길 186",
    contact: "032-729-2000",
    price: "350,000원~",
    rating: 4.8,
    image: "images/hotels/incheon_2.jpg",
    region: "incheon",
    amenities: ["무료 WiFi", "카지노", "스파", "테마파크"]
  },
  {
    id: 9003,
    name: "그랜드 하얏트 인천",
    address: "인천광역시 중구 제물량로 208",
    contact: "032-745-1234",
    price: "300,000원~",
    rating: 4.6,
    image: "images/hotels/incheon_3.jpg",
    region: "incheon",
    amenities: ["무료 WiFi", "공항셔틀", "수영장", "레스토랑"]
  },
  {
    id: 9004,
    name: "오크우드 프리미어 인천",
    address: "인천광역시 연수구 센트럴로 194",
    contact: "032-310-8000",
    price: "220,000원~",
    rating: 4.5,
    image: "images/hotels/incheon_4.jpg",
    region: "incheon",
    amenities: ["무료 WiFi", "키친", "피트니스", "주차"]
  },
  {
    id: 9005,
    name: "네스트 호텔 인천",
    address: "인천광역시 중구 신도시남로 95",
    contact: "032-743-9000",
    price: "180,000원~",
    rating: 4.3,
    image: "images/hotels/incheon_5.jpg",
    region: "incheon",
    amenities: ["무료 WiFi", "공항접근", "레스토랑", "회의실"]
  }
];

// 대전 (Daejeon) - 유성구 등
const daejeonHotels = [
  {
    id: 10001,
    name: "호텔 ICC",
    address: "대전광역시 유성구 엑스포로 107",
    contact: "042-866-6660",
    price: "200,000원~",
    rating: 4.5,
    image: "images/hotels/daejeon_1.jpg",
    region: "daejeon",
    amenities: ["무료 WiFi", "컨벤션센터", "피트니스", "레스토랑"]
  },
  {
    id: 10002,
    name: "롯데시티호텔 대전",
    address: "대전광역시 유성구 대덕대로 598",
    contact: "042-333-1000",
    price: "150,000원~",
    rating: 4.4,
    image: "images/hotels/daejeon_2.jpg",
    region: "daejeon",
    amenities: ["무료 WiFi", "레스토랑", "피트니스", "주차"]
  },
  {
    id: 10003,
    name: "유성호텔",
    address: "대전광역시 유성구 온천로 59",
    contact: "042-820-0100",
    price: "180,000원~",
    rating: 4.3,
    image: "images/hotels/daejeon_3.jpg",
    region: "daejeon",
    amenities: ["무료 WiFi", "온천", "사우나", "레스토랑"]
  },
  {
    id: 10004,
    name: "리베라 호텔",
    address: "대전광역시 유성구 봉명동 535",
    contact: "042-823-2111",
    price: "120,000원~",
    rating: 4.2,
    image: "images/hotels/daejeon_4.jpg",
    region: "daejeon",
    amenities: ["무료 WiFi", "온천", "주차", "레스토랑"]
  },
  {
    id: 10005,
    name: "인터시티 호텔",
    address: "대전광역시 서구 대덕대로 223",
    contact: "042-257-1234",
    price: "130,000원~",
    rating: 4.1,
    image: "images/hotels/daejeon_5.jpg",
    region: "daejeon",
    amenities: ["무료 WiFi", "역세권", "레스토랑", "주차"]
  }
];

// 대구 (Daegu) - 동성로, 수성구 등
const daeguHotels = [
  {
    id: 11001,
    name: "인터불고 호텔 대구",
    address: "대구광역시 수성구 팔현길 100",
    contact: "053-602-7114",
    price: "180,000원~",
    rating: 4.5,
    image: "images/hotels/daegu_1.jpg",
    region: "daegu",
    amenities: ["무료 WiFi", "골프장", "수영장", "스파"]
  },
  {
    id: 11002,
    name: "노보텔 앰배서더 대구",
    address: "대구광역시 중구 국채보상로 611",
    contact: "053-664-1101",
    price: "150,000원~",
    rating: 4.4,
    image: "images/hotels/daegu_2.jpg",
    region: "daegu",
    amenities: ["무료 WiFi", "동성로접근", "피트니스", "레스토랑"]
  },
  {
    id: 11003,
    name: "엘디스 리젠트 호텔",
    address: "대구광역시 수성구 동대구로 305",
    contact: "053-253-7711",
    price: "130,000원~",
    rating: 4.3,
    image: "images/hotels/daegu_3.jpg",
    region: "daegu",
    amenities: ["무료 WiFi", "레스토랑", "주차", "비즈니스센터"]
  },
  {
    id: 11004,
    name: "그랜드호텔 대구",
    address: "대구광역시 수성구 동대구로 305",
    contact: "053-742-0001",
    price: "140,000원~",
    rating: 4.2,
    image: "images/hotels/daegu_4.jpg",
    region: "daegu",
    amenities: ["무료 WiFi", "사우나", "레스토랑", "주차"]
  },
  {
    id: 11005,
    name: "호텔 수성",
    address: "대구광역시 수성구 수성로 217",
    contact: "053-763-8000",
    price: "160,000원~",
    rating: 4.4,
    image: "images/hotels/daegu_5.jpg",
    region: "daegu",
    amenities: ["무료 WiFi", "수성못뷰", "레스토랑", "피트니스"]
  }
];

// 광주 (Gwangju) - 충장로 등
const gwangjuHotels = [
  {
    id: 12001,
    name: "홀리데이인 광주",
    address: "광주광역시 서구 상무중앙로 111",
    contact: "062-610-7000",
    price: "180,000원~",
    rating: 4.5,
    image: "images/hotels/gwangju_1.jpg",
    region: "gwangju",
    amenities: ["무료 WiFi", "수영장", "피트니스", "레스토랑"]
  },
  {
    id: 12002,
    name: "라마다 플라자 광주",
    address: "광주광역시 서구 상무공원로 25",
    contact: "062-717-7000",
    price: "150,000원~",
    rating: 4.4,
    image: "images/hotels/gwangju_2.jpg",
    region: "gwangju",
    amenities: ["무료 WiFi", "레스토랑", "피트니스", "주차"]
  },
  {
    id: 12003,
    name: "프리마 호텔",
    address: "광주광역시 동구 금남로 140",
    contact: "062-224-6611",
    price: "120,000원~",
    rating: 4.2,
    image: "images/hotels/gwangju_3.jpg",
    region: "gwangju",
    amenities: ["무료 WiFi", "충장로접근", "레스토랑", "주차"]
  },
  {
    id: 12004,
    name: "신양파크호텔",
    address: "광주광역시 북구 무등로 77",
    contact: "062-228-8000",
    price: "140,000원~",
    rating: 4.3,
    image: "images/hotels/gwangju_4.jpg",
    region: "gwangju",
    amenities: ["무료 WiFi", "무등산접근", "사우나", "레스토랑"]
  },
  {
    id: 12005,
    name: "상무 그린호텔",
    address: "광주광역시 서구 상무대로 923",
    contact: "062-383-9000",
    price: "110,000원~",
    rating: 4.1,
    image: "images/hotels/gwangju_5.jpg",
    region: "gwangju",
    amenities: ["무료 WiFi", "비즈니스센터", "레스토랑", "주차"]
  }
];

// 전체 데이터 통합
const allHotelData = {
  seoul: seoulHotels,
  busan: busanHotels,
  jeju: jejuHotels,
  gangneung: gangneungHotels,
  gyeongju: gyeongjuHotels,
  yeosu: yeosuHotels,
  jeonju: jeonjuHotels,
  sokcho: sokchoHotels,
  incheon: incheonHotels,
  daejeon: daejeonHotels,
  daegu: daeguHotels,
  gwangju: gwangjuHotels
};

// 지역명 매핑
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
  daejeon: "대전",
  daegu: "대구",
  gwangju: "광주"
};

// ID로 호텔 찾기 Helper
function getHotelById(id) {
  const hotelId = parseInt(id);
  for (const region in allHotelData) {
    const found = allHotelData[region].find(hotel => hotel.id === hotelId);
    if (found) return found;
  }
  return null;
}
