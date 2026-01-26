# AIBE5_Project1_Team8

> **여행의 시작부터 끝까지, 당신의 여정을 위한 맞춤형 가이드**
>
> 여행지 선택의 고민을 덜고, AI와 지도 기반 서비스를 통해 나만의 여행을 쉽고 빠르게 계획하세요.

<p align="center">
  <img src="./images/github/mainPage.png" width="500" alt="메인 화면 스크린샷">
</p>

## 1. 프로젝트 개요
여행지 선택 과정에서 오는 '결정 피로'를 해결하고, 사용자에게 최적화된 여행 경험을 제공하기 위한 플랫폼입니다. 대한민국 지도 기반의 직관적인 검색과 생성형 AI를 활용한 맞춤형 추천 서비스를 통해, 사용자가 원하는 숙소와 관광 정보를 빠르고 편리하게 찾을 수 있도록 돕습니다.

**개발 기간:** 2026.01.23 ~ 2026.01.29

## 2. 프로젝트 기획서
- **Google Docs (기획서):** [기획서 바로가기](https://docs.google.com/document/d/1lC6pMJFUVG0xZJYS4ucyPysfBe4y6eBV1InFxHeBTUc/edit?usp=sharing)
- **Notion (프로젝트 대시보드):** [Notion 바로가기](https://www.notion.so/Team8_-2f13550b7b5580bca8abfbbb9aa33e4e)

## 3. 기술 스택 (Tech Stack)

### Frontend
- **HTML5**
- **CSS**
- **JavaScript**
    - **leaflet.js:** 상호작용 가능한 대한민국 지도 시각화

### Backend & AI
- **Python:** 백엔드 로직 처리
    - **Google Gen AI Python SDK:** Google Gemini API 연동

### Database
- **IndexedDB:** 브라우저 내 데이터(여행지 정보, 유저 데이터 등) 저장 및 관리

### External API
- **한국관광공사 국문 관광정보 서비스 OpenAPI:** 전국 관광지 정보 및 이미지 데이터 활용

## 4. 주요 기능 (Key Features)

* **지도 기반 관광지 추천 서비스**
    * leaflet.js를 활용한 대한민국 지도 인터페이스 제공
    * 추천 관광지 클릭 시 해당 지역의 관광지 정보 제공

* **생성형 AI 기반 여행지 추천 챗봇**
    * Google Gemini를 기반으로 하는 실시간 챗봇
    * 사용자의 대화를 기반으로 실시간 맟춤 여행지 추천

* **여행 후기 및 커뮤니티**
    * 여행지별 사진 업로드 및 별점 평가 기능
    * 사용자 간 생생한 여행 경험 공유

* **일정 및 예약 관리**
    * 숙소 예약 및 취소 기능
    * 나만의 여행 일정 생성 및 관리

* **회원 관리**
    * 회원가입, 로그인, 마이페이지(정보 수정/탈퇴) 기능 제공

## 5. 팀원 구성 (Team Members)

| 이름 | 역할 | 담당 업무 | GitHub |
| :---: | :---: | :--- | :---: |
| **정준후** | 팀장 | 관광, 지역, 명소 데이터 관리 및 기획 총괄 | [Github](https://github.com/suzibd) |
| **전우현** | 팀원 | 숙소 예약 및 결제 페이지 구현 | [Github](https://github.com/jwh039) |
| **황보혜** | 팀원 | 마이페이지, 나의 일정 페이지 구현, 발표 | [Github](https://github.com/hwangbohye03) |
| **이근찬** | 팀원 | 여행 후기 작성 및 리뷰 기능 구현 | [Github](https://github.com/geunchanlee) |
| **이상민** | 팀원 | 디자인 레이아웃, 메인 페이지, UI, 메뉴바/검색바 구현, 검수/검토, 발표 | [Github](https://github.com/Paley-Z) |
| **박수빈** | 팀원 | 고객센터 기능 및 UI 구현 | [Github](https://github.com/SooBin111) |
| **김진현** | 팀원 | AI 기반 추천 시스템 및 여행지 검색 로직 구현 | [Github](https://github.com/jinhyenkim01) |
