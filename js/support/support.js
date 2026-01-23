/* [1] 기본 초기화 */
* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Pretendard', sans-serif; }
body { background-color: #F0FAFA; padding: 30px; }
.wrapper { max-width: 850px; margin: 0 auto; }

/* [2] 헤더 및 메인 배너 */
.site-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 30px; }
.nav-menu { display: flex; gap: 12px; font-size: 11px; color: #999; align-items: center; }
.nav-menu span { cursor: pointer; }
.auth-btn { background: #D9D9D9; border: none; padding: 5px 12px; border-radius: 15px; cursor: pointer; }

.main-title-box { 
    background-color: #BDBDBD; color: white; text-align: center; 
    padding: 40px; border-radius: 20px; font-size: 26px; font-weight: bold; margin-bottom: 45px; 
}

/* [3] 섹션 레이아웃 */
.section-wrap { margin-bottom: 45px; }
.label { font-size: 14px; font-weight: bold; color: #444; margin-bottom: 12px; display: block; padding-left: 5px; }
.gray-box { background-color: #E5E5E5; border-radius: 30px; padding: 35px; position: relative; }

/* [4] 카드 인터랙션 (색 변화 없이 눌리는 느낌만) */
.card { 
    background: white; border-radius: 12px; border: none; padding: 18px 25px; 
    margin-bottom: 12px; display: flex; align-items: center; width: 100%; 
    box-shadow: 0 2px 4px rgba(0,0,0,0.02); 
    cursor: pointer; transition: transform 0.1s; 
}
.card:active { transform: translateY(1px); }
.card-center { justify-content: center; width: 250px; font-size: 14px; }
.btn-absolute { position: absolute; bottom: 25px; right: 35px; background: white; border: none; border-radius: 8px; padding: 8px 20px; font-size: 12px; cursor: pointer; }

/* [5] 탭 디자인 수정 (선 제거, 전체 탭 배경 채움) */
.tabs { display: flex; gap: 10px; margin-bottom: 25px; border: none; }
.tab { background: white; border: none; padding: 10px 25px; border-radius: 8px; font-size: 13px; cursor: pointer; }
.tab.active { background-color: #BDBDBD; color: white; font-weight: bold; }

/* [6] 아이콘 및 정렬 */
.flex-between { justify-content: space-between; font-size: 14px; }
.icon-down::after { content: "▼"; font-size: 10px; margin-left: 10px; }
.icon-up::after { content: "▲"; font-size: 10px; margin-left: 10px; }

.faq-open { flex-direction: column; align-items: flex-start; cursor: default; }
.faq-header { display: flex; justify-content: space-between; width: 100%; cursor: pointer; }
.faq-answer { width: 100%; margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; color: #666; font-size: 13px; }

/* [7] 문의 내역 상태 프레임 */
.status-frame { 
    background: #FFFFFF; border: 1px solid #DDD; padding: 6px 15px; 
    border-radius: 12px; font-size: 12px; display: flex; 
    align-items: center; gap: 8px; min-width: 100px; justify-content: center; 
}