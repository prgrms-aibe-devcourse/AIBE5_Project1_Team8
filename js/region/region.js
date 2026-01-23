const regions = [
  {
    id: "seoul",
    name: "서울",
    country: "대한민국",
    image: "images/regions/seoul.jpg",
    rating: 4.6,
    reviewCount: 512,
    tags: ["도시", "문화", "쇼핑"],
    description: "대한민국의 수도이자 정치, 경제, 문화의 중심지. 전통과 현대가 공존하는 역동적인 도시입니다.",
    highlights: [
      { name: "경복궁", placeId: 1 },
      { name: "명동 쇼핑", placeId: null },
      { name: "남산타워", placeId: 2 },
      { name: "한강 공원", placeId: 24 }
    ],
    recommendedSeasons: ["봄", "가을"],
    budget: "300,000원 ~ 1,000,000원",
    badge: "인기"
  },
  {
    id: "incheon",
    name: "인천",
    country: "대한민국",
    image: "images/regions/incheon.jpg",
    rating: 4.4,
    reviewCount: 215,
    tags: ["도시", "역사", "해변"],
    description: "대한민국의 관문이자 개항장의 역사를 간직한 도시. 차이나타운, 송도 센트럴파크, 월미도 등이 유명합니다.",
    highlights: [
      { name: "차이나타운", placeId: 21 },
      { name: "송도 센트럴파크", placeId: 20 },
      { name: "월미도 테마파크", placeId: 25 },
      { name: "신포국제시장", placeId: 26 }
    ],
    recommendedSeasons: ["봄", "가을"],
    budget: "200,000원 ~ 500,000원",
    badge: "도시"
  },
  {
    id: "gangneung",
    name: "강릉",
    country: "대한민국",
    image: "images/regions/gangneung.jpg",
    rating: 4.4,
    reviewCount: 178,
    tags: ["자연", "해변", "힐링"],
    description: "동해안의 대표 관광도시. 아름다운 해변과 커피거리로 유명합니다.",
    highlights: [
      { name: "경포대 해변", placeId: 10 },
      { name: "안목 커피거리", placeId: 11 },
      { name: "정동진", placeId: 27 },
      { name: "오죽헌", placeId: 28 }
    ],
    recommendedSeasons: ["여름", "가을"],
    budget: "200,000원 ~ 500,000원",
    badge: "HOT"
  },
  {
    id: "jeju",
    name: "제주도",
    country: "대한민국",
    image: "images/regions/jeju.jpg",
    rating: 4.7,
    reviewCount: 342,
    tags: ["자연", "힐링", "액티비티"],
    description: "대한민국 최남단의 화산섬으로, 아름다운 자연경관과 독특한 문화를 자랑합니다. 한라산, 성산일출봉, 만장굴 등 유네스코 세계자연유산이 있습니다.",
    highlights: [
      { name: "한라산 등반", placeId: 8 },
      { name: "해변과 올레길", placeId: 9 },
      { name: "성산일출봉", placeId: 7 },
      { name: "만장굴", placeId: 29 }
    ],
    recommendedSeasons: ["봄", "가을"],
    budget: "300,000원 ~ 800,000원",
    badge: "인기"
  },
  {
    id: "sokcho",
    name: "속초",
    country: "대한민국",
    image: "images/regions/sokcho.jpg",
    rating: 4.3,
    reviewCount: 156,
    tags: ["자연", "해변", "액티비티"],
    description: "설악산과 동해바다를 함께 즐길 수 있는 관광도시입니다.",
    highlights: [
      { name: "설악산", placeId: 18 },
      { name: "속초 해수욕장", placeId: 30 },
      { name: "아바이마을", placeId: 31 },
      { name: "영금정", placeId: 32 }
    ],
    recommendedSeasons: ["여름", "가을"],
    budget: "250,000원 ~ 600,000원",
    badge: "자연"
  },
  {
    id: "busan",
    name: "부산",
    country: "대한민국",
    image: "images/regions/busan.jpg",
    rating: 4.5,
    reviewCount: 289,
    tags: ["도시", "해변", "문화"],
    description: "대한민국 제2의 도시이자 최대 항구도시. 해운대 해수욕장, 광안리, 자갈치 시장 등이 유명합니다.",
    highlights: [
      { name: "해운대 해수욕장", placeId: 4 },
      { name: "광안대교 야경", placeId: 5 },
      { name: "감천문화마을", placeId: 6 },
      { name: "자갈치 시장", placeId: 33 }
    ],
    recommendedSeasons: ["여름", "가을"],
    budget: "250,000원 ~ 600,000원",
    badge: "추천"
  },
  {
    id: "jeonju",
    name: "전주",
    country: "대한민국",
    image: "images/regions/jeonju.jpg",
    rating: 4.5,
    reviewCount: 234,
    tags: ["문화", "음식", "전통"],
    description: "전통 한옥마을과 비빔밥으로 유명한 문화의 도시입니다.",
    highlights: [
      { name: "한옥마을", placeId: 16 },
      { name: "전주 비빔밥", placeId: null },
      { name: "전동성당", placeId: 34 },
      { name: "남부시장", placeId: 35 }
    ],
    recommendedSeasons: ["봄", "가을"],
    budget: "150,000원 ~ 400,000원",
    badge: "문화"
  },
  {
    id: "gyeongju",
    name: "경주",
    country: "대한민국",
    image: "images/regions/gyeongju.jpg",
    rating: 4.6,
    reviewCount: 298,
    tags: ["문화", "역사", "전통"],
    description: "신라 천년의 고도. 불국사, 석굴암 등 유네스코 세계문화유산이 있습니다.",
    highlights: [
      { name: "불국사", placeId: 12 },
      { name: "석굴암", placeId: 36 },
      { name: "대릉원", placeId: 37 },
      { name: "동궁과 월지", placeId: 38 }
    ],
    recommendedSeasons: ["봄", "가을"],
    budget: "200,000원 ~ 500,000원",
    badge: "문화"
  },
  {
    id: "yeosu",
    name: "여수",
    country: "대한민국",
    image: "images/regions/yeosu.jpg",
    rating: 4.5,
    reviewCount: 201,
    tags: ["자연", "해변", "야경"],
    description: "아름다운 밤바다 야경과 해산물이 유명한 항구도시입니다.",
    highlights: [
      { name: "여수 밤바다", placeId: 14 },
      { name: "오동도", placeId: 15 },
      { name: "향일암", placeId: 39 },
      { name: "여수 해상케이블카", placeId: 40 }
    ],
    recommendedSeasons: ["봄", "여름"],
    budget: "250,000원 ~ 600,000원",
    badge: "추천"
  },
  {
    id: "daejeon",
    name: "대전",
    country: "대한민국",
    image: "images/regions/daejeon.jpg",
    rating: 4.2,
    reviewCount: 145,
    tags: ["도시", "과학", "자연"],
    description: "과학과 자연이 조화로운 도시. 엑스포 과학공원과 계족산 황톳길이 유명합니다.",
    highlights: [
      { name: "엑스포 과학공원", placeId: 22 },
      { name: "계족산 황톳길", placeId: 23 },
      { name: "대전 성심당", placeId: null },
      { name: "유성온천", placeId: 41 }
    ],
    recommendedSeasons: ["봄", "가을"],
    budget: "150,000원 ~ 400,000원",
    badge: "도시"
  }
];

const regionList = document.getElementById("regionList");
const scrollTop = document.getElementById("scrollTop");

// 별점 렌더링
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let stars = "";
  for (let i = 0; i < fullStars; i++) {
    stars += "★";
  }
  if (hasHalf) {
    stars += "☆";
  }
  return stars;
}

// 지역 카드 렌더링
function renderRegions() {
  regionList.innerHTML = "";

  regions.forEach((region, index) => {
    const card = document.createElement("div");
    card.className = "region-card";
    card.style.animationDelay = `${index * 0.1}s`;

    // 하이라이트 링크 생성
    const highlightLinks = region.highlights.map(h => {
      if (h.placeId) {
        return `<a href="place-detail.html?id=${h.placeId}" class="highlight-link" onclick="event.stopPropagation();">${h.name}</a>`;
      }
      return `<span class="highlight-text">${h.name}</span>`;
    }).join("");

    card.innerHTML = `
      <div class="region-card-image">
        <img src="${region.image}" alt="${region.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2224%22%3E${region.name}%3C/text%3E%3C/svg%3E'">
        <div class="region-badge">${region.badge}</div>
      </div>
      <div class="region-info">
        <div class="region-header">
          <h3>${region.name}</h3>
          <span class="region-country">${region.country}</span>
        </div>

        <div class="region-rating">
          <span class="stars">${renderStars(region.rating)}</span>
          <span class="rating-value">${region.rating}</span>
          <span class="review-count">(${region.reviewCount}개의 후기)</span>
        </div>

        <div class="region-tags">
          ${region.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>

        <div class="region-buttons">
          <button class="btn-add-plan" data-region-id="${region.id}" onclick="event.stopPropagation(); addToPlan('${region.id}');">
            + 여행 계획에 추가
          </button>
          <button class="btn-booking" data-region-id="${region.id}" onclick="event.stopPropagation(); goToHotels('${region.id}');">
            예약하기
          </button>
        </div>

        <div class="region-detail">
          <div class="detail-section">
            <h4>소개</h4>
            <p>${region.description}</p>
          </div>

          <div class="detail-section">
            <h4>하이라이트</h4>
            <div class="highlights-list">
              ${highlightLinks}
            </div>
          </div>

          <div class="detail-row">
            <div class="detail-item">
              <h4>추천 계절</h4>
              <p>${region.recommendedSeasons.join(", ")}</p>
            </div>
            <div class="detail-item">
              <h4>예상 예산</h4>
              <p>${region.budget}</p>
              <span class="budget-note">1인당 평균 비용 (교통, 숙박, 식사 포함)</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // 카드 클릭 시 명소 페이지로 이동
    card.addEventListener("click", (e) => {
      // 버튼이나 링크 클릭이 아닌 경우에만 이동
      if (!e.target.closest('.btn-add-plan') && !e.target.closest('.btn-booking') && !e.target.closest('.highlight-link')) {
        window.location.href = `place.html?region=${region.id}`;
      }
    });

    regionList.appendChild(card);
  });
}

// 여행 계획에 추가
function addToPlan(regionId) {
  const region = regions.find(r => r.id === regionId);
  if (!region) return;

  const schedules = JSON.parse(localStorage.getItem("mySchedules")) || [];

  // 중복 체크
  const exists = schedules.some(s => s.name === region.name && s.type === "region");

  if (exists) {
    alert("이미 여행 계획에 추가된 지역입니다.");
    return;
  }

  schedules.push({
    id: Date.now(),
    originalId: regionId,
    name: region.name,
    image: region.image,
    location: region.country,
    description: region.description,
    type: "region",
    addedAt: new Date().toISOString()
  });

  localStorage.setItem("mySchedules", JSON.stringify(schedules));
  alert(`${region.name}이(가) 여행 계획에 추가되었습니다!`);
}

// 해당 지역 호텔로 이동
function goToHotels(regionId) {
  window.location.href = `hotel.html?region=${regionId}`;
}

// Scroll to top 버튼
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTop.classList.add("visible");
  } else {
    scrollTop.classList.remove("visible");
  }
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// 초기 렌더링 (로딩 효과 후)
setTimeout(() => {
  renderRegions();
}, 500);
