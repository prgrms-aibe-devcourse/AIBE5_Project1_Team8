export const userData = {
    name: "김이름",
    email: "mail@email.com",
    phone: "010-1234-5678",
    profileImg: "../images/default_profile.png",
    pw: "abcd1234", 
};

export const reservations = [
  {
    contentId: 1,
    type: "upcoming",
    title: "호텔 그랜드",
    img: "../images/daejeon_hotel.jpg",
    checkIn: "2026-02-20-15",
    checkOut: "2026-02-22-11",
    date: "2026-01-10",
    address: "대전광역시 서구 둔산로 123",
    phone: "042-123-4567",
    userId: 1
  },
  {
    contentId: 1231,
    type: "completed",
    title: "부산 바다 팬션",
    img: "../images/seoul_hotel2.jpg",
    checkIn: "2026-01-15-15",
    checkOut: "2026-01-16-10",
    date: "2026-01-05",
    address: "서울시 강남구 테헤란로 123",
    phone: "02-123-4567",
    userId: 1
  },
  {
    contentId: 3,
    type: "completed",
    title: "호텔 그랜드",
    img: "../images/gangneung_hotel.jpg",
    checkIn: "2026-02-21-15",
    checkOut: "2026-02-23-11",
    date: "2026-01-12",
    address: "대전광역시 서구 둔산로 456",
    phone: "042-987-6543",
    userId: 1
  },
  {
    contentId: 1232,
    type: "completed",
    title: "서울 시티 호텔",
    img: "../images/seoul_hotel.png",
    checkIn: "2026-01-20-15",
    checkOut: "2026-01-22-10",
    date: "2026-01-03",
    address: "서울시 강남구 테헤란로 789",
    phone: "02-987-6543",
    userId: 1
  },
  {
    contentId: 5,
    type: "upcoming",
    title: "팰리스 호텔",
    img: "../images/yeosu_hotel.jpg",
    checkIn: "2026-03-01-15",
    checkOut: "2026-03-03-11",
    date: "2026-01-15",
    address: "대전광역시 서구 둔산로 789",
    phone: "042-111-2222",
    userId: 1
  },
];


export const reviews = [
  {
    id: 1,
    title: "부산 바다 팬션",
    contentId: 1231,
    img: "../images/seoul_hotel2.jpg",
    date: "2026-01-15",  // 작성일자
    rating: 5,
    content: "위치도 좋고 직원분들이 정말 친절했어요. 다음에 또 이용하고 싶어요!"
  },
  {
    id: 2,
    title: "서울 시티 호텔",
    contentId: 1232,
    img: "../images/seoul_hotel.png",
    date: "2026-02-01",
    rating: 4,
    content: "교통이 너무 편하고 방도 깔끔했어요. 출장 숙소로 딱입니다."
  },
  
];
