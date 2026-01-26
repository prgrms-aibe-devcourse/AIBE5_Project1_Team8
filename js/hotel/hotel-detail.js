=======
import { openBookingPanel } from "./hotel-booking.js";

>>>>>>> a4915bb0e03732d3723ea0cee376b8ed531b6b3f
// ?™ì†Œ ?°ì´??(10ê°?
const hotels = {
  1: {
    name: "?œìš¸ ?¼íŠ¸???¸í…”",
    address: "?œìš¸?¹ë³„??ì¤‘êµ¬ ëª…ë™ê¸?123",
    contact: "02-1234-5678",
    price: "1ë°?120,000??",
    desc: "?œìš¸ ì¤‘ì‹¬ë¶€???„ì¹˜??ë¹„ì¦ˆ?ˆìŠ¤ ë°?ê´€ê´‘ê°???„í•œ ìµœì ???™ì†Œ?…ë‹ˆ?? ëª…ë™ê³??¨ì‚°?€?Œê? ?„ë³´ ê±°ë¦¬???ˆì–´ ê´€ê´‘ì— ?¸ë¦¬?˜ë©°, ê¹”ë”??ê°ì‹¤ê³?ì¹œì ˆ???œë¹„?¤ë¡œ ?¸ì•ˆ???´ì‹???œê³µ?©ë‹ˆ?? ì¡°ì‹ ë·”í˜, ?¼íŠ¸?ˆìŠ¤ ?¼í„°, ë¹„ì¦ˆ?ˆìŠ¤ ?¼ìš´ì§€ ???¤ì–‘??ë¶€?€?œì„¤??ê°–ì¶”ê³??ˆìŠµ?ˆë‹¤.",
    image: "https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Seoul+Hotel",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 120000
  },
  2: {
    name: "ë¶€???¤ì…˜ë·??¸í…”",
    address: "ë¶€?°ê´‘??‹œ ?´ìš´?€êµ??´ìš´?€ë¡?456",
    contact: "051-2345-6789",
    price: "1ë°?150,000??",
    desc: "?´ìš´?€ ?´ìˆ˜?•ì¥???œëˆˆ??ë³´ì´???¤ì…˜ë·?ê°ì‹¤???œê³µ?©ë‹ˆ?? ë°”ë‹¤ë¥?ë°”ë¼ë³´ë©° ?¬ìœ ë¡œìš´ ?œê°„??ë³´ë‚¼ ???ˆìœ¼ë©? ë£¨í”„???˜ì˜?¥ê³¼ ?¤íŒŒ?ì„œ ?¹ë³„??ê²½í—˜??ì¦ê¸¸ ???ˆìŠµ?ˆë‹¤. ? ì„ ???´ì‚°ë¬??ˆìŠ¤? ë‘ê³?ë°”ê? ?ˆì–´ ë¯¸ì‹ ?¬í–‰???¨ê»˜ ?????ˆìŠµ?ˆë‹¤.",
    image: "https://via.placeholder.com/400x300/20B2AA/FFFFFF?text=Busan+Hotel",
    parking: true,
    pet: true,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 150000
  },
  3: {
    name: "?œì£¼ ?ë§ ë¦¬ì¡°??,
    address: "?œì£¼?¹ë³„?ì¹˜???œê??¬ì‹œ ì¤‘ë¬¸ë¡?789",
    contact: "064-3456-7890",
    price: "1ë°?180,000??",
    desc: "?œì£¼ ì¤‘ë¬¸ê´€ê´‘ë‹¨ì§€ ?´ì— ?„ì¹˜???„ë¦¬ë¯¸ì—„ ë¦¬ì¡°?¸ì…?ˆë‹¤. ì²œí˜œ???ì—°ê²½ê???ë°°ê²½?¼ë¡œ ê³¨í”„, ?¤íŒŒ, ?˜ì˜?????¤ì–‘???ˆì? ?œì„¤??ê°–ì¶”ê³??ˆìŠµ?ˆë‹¤. ê°€ì¡??¬í–‰ê°ì„ ?„í•œ ?¤ì¦ˆ?´ëŸ½ê³??„ë¡œê·¸ë¨??ë§ˆë ¨?˜ì–´ ?ˆì–´ ??ê°€ì¡±ì´ ì¦ê±°???œê°„??ë³´ë‚¼ ???ˆìŠµ?ˆë‹¤.",
    image: "https://via.placeholder.com/400x300/32CD32/FFFFFF?text=Jeju+Resort",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 180000
  },
  4: {
    name: "ê°•ë¦‰ ë¹„ì¹˜ ?¸í…”",
    address: "ê°•ì›??ê°•ë¦‰??ê²½í¬ë¡?101",
    contact: "033-4567-8901",
    price: "1ë°?110,000??",
    desc: "ê²½í¬?´ë?ê³?ê²½í¬?¸ìˆ˜ ?¬ì´???„ì¹˜???´ë? ?¸í…”?…ë‹ˆ?? ê°ì‹¤?ì„œ ë°”ë¡œ ë°”ë‹¤ë¥?ê°ìƒ?????ˆìœ¼ë©? ?ˆëª©?´ë? ì»¤í”¼ê±°ë¦¬ê°€ ê°€ê¹Œì›Œ ë°”ë‹¤ ì¹´í˜ ?¬ì–´ë¥?ì¦ê¸°ê¸°ì— ìµœì ?…ë‹ˆ?? ?œí•‘, ì¹´ì•½ ???´ì–‘ ?ˆí¬ì¸??„ë¡œê·¸ë¨???´ì˜?˜ê³  ?ˆìŠµ?ˆë‹¤.",
    image: "https://via.placeholder.com/400x300/4169E1/FFFFFF?text=Gangneung+Hotel",
    parking: true,
    pet: true,
    wifi: true,
    noSmoking: false,
    breakfast: false,
    basePrice: 110000
  },
  5: {
    name: "ê²½ì£¼ ?¤ë¦¬?°ì? ?¸í…”",
    address: "ê²½ìƒë¶ë„ ê²½ì£¼??ë¶ˆêµ­ë¡?202",
    contact: "054-5678-9012",
    price: "1ë°?100,000??",
    desc: "ì²œë…„ ê³ ë„ ê²½ì£¼????‚¬?€ ?¨ê»˜?˜ëŠ” ?¸í…”?…ë‹ˆ?? ë¶ˆêµ­?? ?êµ´????ì£¼ìš” ? ì ì§€?€ ê°€ê¹Œìš°ë©? ?œì˜¥ ?¤í??¼ì˜ ?¸í…Œë¦¬ì–´ë¡??„í†µ??ë©‹ì„ ?ë‚„ ???ˆìŠµ?ˆë‹¤. ?€?ì—??ì²¨ì„±?€?€ ?€ë¦‰ì›???¼ê²½ ?¬ì–´??ì¦ê¸¸ ???ˆìŠµ?ˆë‹¤.",
    image: "https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Gyeongju+Hotel",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 100000
  },
  6: {
    name: "?¬ìˆ˜ ë§ˆë¦¬???¸í…”",
    address: "?„ë¼?¨ë„ ?¬ìˆ˜???¤ë™?„ë¡œ 303",
    contact: "061-6789-0123",
    price: "1ë°?130,000??",
    desc: "?¬ìˆ˜ ë°¤ë°”?¤ì˜ ??§Œ???ë‚„ ???ˆëŠ” ë§ˆë¦¬???¸í…”?…ë‹ˆ?? ?Œì‚°?€êµì? ?¬ìˆ˜ ë°¤ë°”?¤ì˜ ?„ë¦„?¤ìš´ ?¼ê²½??ê°ì‹¤?ì„œ ê°ìƒ?????ˆìœ¼ë©? ?´ìƒì¼€?´ë¸”ì¹? ?¤ë™????ì£¼ìš” ê´€ê´‘ì?ê°€ ê°€ê¹ìŠµ?ˆë‹¤. ? ì„ ???´ì‚°ë¬??”ë¦¬ë¥?ë§›ë³¼ ???ˆëŠ” ?ˆìŠ¤? ë‘???´ì˜?©ë‹ˆ??",
    image: "https://via.placeholder.com/400x300/1E90FF/FFFFFF?text=Yeosu+Hotel",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 130000
  },
  7: {
    name: "?„ì£¼ ?œì˜¥ ?¤í…Œ??,
    address: "?„ë¼ë¶ë„ ?„ì£¼???„ì‚°êµ??œì˜¥ë§ˆì„ê¸?404",
    contact: "063-7890-1234",
    price: "1ë°?90,000??",
    desc: "?„ì£¼ ?œì˜¥ë§ˆì„ ?´ì— ?„ì¹˜???„í†µ ?œì˜¥ ?™ì†Œ?…ë‹ˆ?? ?¨ëŒë°©ì—?œì˜ ?°ëœ»??? ìë¦¬ì? ?„í†µ ?¤ê³¼ ?œë¹„?¤ë? ?œê³µ?©ë‹ˆ?? ê²½ê¸°?? ?„ë™?±ë‹¹ ??ì£¼ìš” ëª…ì†Œê°€ ?„ë³´ ê±°ë¦¬???ˆìœ¼ë©? ?„ì£¼ ë¹„ë¹”ë°¥ê³¼ ?œì •??ë§›ì§‘?¤ì´ ì¦ë¹„?©ë‹ˆ??",
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Jeonju+Hanok",
    parking: false,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 90000
  },
  8: {
    name: "?ì´ˆ ?¨ì‚¬?´ë“œ ?¸í…”",
    address: "ê°•ì›???ì´ˆ??ì²?´ˆ?¸ë°˜ë¡?505",
    contact: "033-8901-2345",
    price: "1ë°?120,000??",
    desc: "ì²?´ˆ?¸ì? ?™í•´ë°”ë‹¤ê°€ ë§Œë‚˜??ê³³ì— ?„ì¹˜???¸í…”?…ë‹ˆ?? ?¤ì•…??êµ?¦½ê³µì›??ê°€ê¹ê³ , ?ì´ˆ ì¤‘ì•™?œì¥ê³??„ë°”?´ë§ˆ?„ë„ ?½ê²Œ ë°©ë¬¸?????ˆìŠµ?ˆë‹¤. ?¼ì¶œ ëª…ì†Œ???ê¸ˆ?•ì´ ê°€ê¹Œì›Œ ?ˆë²½ ?¼ì¶œ ?¬ì–´ë¥?ì¶”ì²œ?©ë‹ˆ??",
    image: "https://via.placeholder.com/400x300/00CED1/FFFFFF?text=Sokcho+Hotel",
    parking: true,
    pet: true,
    wifi: true,
    noSmoking: true,
    breakfast: false,
    basePrice: 120000
  },
  9: {
    name: "?¡ë„ ?¼íŠ¸???¸í…”",
    address: "?¸ì²œê´‘ì—­???°ìˆ˜êµ??¼íŠ¸?´ë¡œ 606",
    contact: "032-9012-3456",
    price: "1ë°?140,000??",
    desc: "?¸ì²œ ?¡ë„ êµ? œ?„ì‹œ???„ì¹˜???„ë??ì¸ ë¹„ì¦ˆ?ˆìŠ¤ ?¸í…”?…ë‹ˆ?? ?¡ë„ ?¼íŠ¸?´íŒŒ?¬ì? ?¸ì²œ?€êµ??„ë§???„ë¦„?¤ìš°ë©? ì»¨ë²¤???¼í„°?€ ê°€ê¹Œì›Œ ë¹„ì¦ˆ?ˆìŠ¤ ?¬í–‰ê°ì—ê²?ìµœì ?…ë‹ˆ?? ì°¨ì´?˜í??? ?”ë??„ë„ ?½ê²Œ ë°©ë¬¸?????ˆìŠµ?ˆë‹¤.",
    image: "https://via.placeholder.com/400x300/4682B4/FFFFFF?text=Songdo+Hotel",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: true,
    basePrice: 140000
  },
  10: {
    name: "?€??ë¹„ì¦ˆ?ˆìŠ¤ ?¸í…”",
    address: "?€?„ê´‘??‹œ ? ì„±êµ?ê³¼í•™ë¡?707",
    contact: "042-0123-4567",
    price: "1ë°?95,000??",
    desc: "?€??? ì„±êµ?ê³¼í•™?¨ì? ?¸ê·¼???„ì¹˜??ë¹„ì¦ˆ?ˆìŠ¤ ?¸í…”?…ë‹ˆ?? ? ì„±?¨ì²œ??ê°€ê¹Œì›Œ ?¨ì²œ?•ì„ ì¦ê¸¸ ???ˆìœ¼ë©? ?‘ìŠ¤??ê³¼í•™ê³µì›ê³?ê³„ì¡±???©í†³ê¸¸ë„ ì¶”ì²œ ì½”ìŠ¤?…ë‹ˆ?? ?©ë¦¬?ì¸ ê°€ê²©ì— ê¹”ë”???œì„¤???œê³µ?©ë‹ˆ??",
    image: "https://via.placeholder.com/400x300/708090/FFFFFF?text=Daejeon+Hotel",
    parking: true,
    pet: false,
    wifi: true,
    noSmoking: true,
    breakfast: false,
    basePrice: 95000
  }
};

// ë¦¬ë·° ?°ì´??
const reviews = {
  1: [
    { id: 1, nickname: "?¬í–‰?¬ë²„", rating: 5, content: "ëª…ë™ê³?ê°€ê¹Œì›Œ???¼í•‘?˜ê¸° ?•ë§ ì¢‹ì•˜?´ìš”. ê°ì‹¤??ê¹¨ë—?˜ê³  ì§ì›ë¶„ë“¤??ì¹œì ˆ?ˆìŠµ?ˆë‹¤. ì¡°ì‹ ë·”í˜???¤ì–‘?˜ê²Œ ì¤€ë¹„ë˜???ˆì–´??ë§Œì¡±?¤ëŸ¬? ì–´??", date: "2025-01-15", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Review+1" },
    { id: 2, nickname: "ë¹„ì¦ˆ?ˆìŠ¤ë§?, rating: 4, content: "ì¶œì¥?¼ë¡œ ?ì£¼ ?´ìš©?˜ëŠ”??ë¹„ì¦ˆ?ˆìŠ¤ ?¼í„°ê°€ ???˜ì–´?ˆì–´???¸ë¦¬?©ë‹ˆ?? ?¤ë§Œ ì£¼ì°¨?¥ì´ ?‘ì†Œ?´ì„œ ë³??˜ë‚˜ ëºë‹ˆ??", date: "2025-01-10", image: null },
    { id: 3, nickname: "ê°€ì¡±ì—¬??, rating: 5, content: "?„ì´?¤ê³¼ ?¨ê»˜ ?”ëŠ”??ê°€ì¡?ê°ì‹¤???“ì–´??ì¢‹ì•˜?´ìš”. ?¨ì‚°?€???¼ê²½??ë©‹ì?ê²?ë³´ì??µë‹ˆ??", date: "2025-01-05", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Review+2" },
    { id: 4, nickname: "ì»¤í”Œ?¬ì–´", rating: 4, content: "?°ì¸ê³??¨ê»˜ ë¨¸ë¬¼?€?”ë° ë¶„ìœ„ê¸°ê? ì¢‹ì•˜?´ìš”. ëª…ë™ê¹Œì? ê±¸ì–´??10ë¶?ê±°ë¦¬???¸í–ˆ?µë‹ˆ??", date: "2024-12-28", image: null },
    { id: 5, nickname: "?¼ì?¬í–‰", rating: 5, content: "1???¬í–‰?ì—ê²Œë„ ì¶”ì²œ?©ë‹ˆ?? ê°€?±ë¹„ ì¢‹ê³  ?„ì¹˜??ì¢‹ì•„??", date: "2024-12-20", image: null }
  ],
  2: [
    { id: 1, nickname: "ë°”ë‹¤?¬ë‘", rating: 5, content: "ê°ì‹¤?ì„œ ë³´ì´???´ìš´?€ ë·°ê? ?•ë§ ?˜ìƒ?ì´?ˆì–´?? ?„ì¹¨???¼ì¶œ ë³´ë©´??ì»¤í”¼ ë§ˆì‹œ??ê²?ìµœê³ ?€?µë‹ˆ??", date: "2025-01-18", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Ocean+View" },
    { id: 2, nickname: "?¤íŒŒë§¤ë‹ˆ??, rating: 5, content: "ë£¨í”„???˜ì˜?¥ê³¼ ?¤íŒŒ ?œì„¤???•ë§ ?Œë??´ìš”. ?™ë°• ê°€ê²©ì— ë¹„í•´ ?œë¹„?¤ê? ?°ì–´?©ë‹ˆ??", date: "2025-01-12", image: null },
    { id: 3, nickname: "ë¯¸ì‹ê°€", rating: 4, content: "?¸í…” ???´ì‚°ë¬??ˆìŠ¤? ë‘??ë§›ìˆ?´ìš”. ?¤ë§Œ ì¡°ê¸ˆ ë¹„ì‹¼ ?¸ì´?ìš”.", date: "2025-01-08", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Restaurant" },
    { id: 4, nickname: "?¨ë”©?¬ì–´", rating: 5, content: "? í˜¼?¬í–‰?¼ë¡œ ?”ëŠ”??ìµœê³ ??? íƒ?´ì—ˆ?´ìš”. ?¹ë³„??ì¶”ì–µ???˜ì—ˆ?µë‹ˆ??", date: "2024-12-30", image: null }
  ],
  3: [
    { id: 1, nickname: "ê³¨í”„??, rating: 5, content: "ë¦¬ì¡°????ê³¨í”„?¥ì´ ?•ë§ ì¢‹ì•˜?µë‹ˆ?? ì½”ìŠ¤???„ë¦„?µê³  ?œì„¤ ê´€ë¦¬ê? ???˜ì–´?ˆì–´??", date: "2025-01-20", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Golf" },
    { id: 2, nickname: "?„ì´?„ë§ˆ", rating: 5, content: "?¤ì¦ˆ?´ëŸ½ ?„ë¡œê·¸ë¨???¤ì–‘?´ì„œ ?„ì´?¤ì´ ?•ë§ ì¢‹ì•„?ˆì–´?? ê°€ì¡??¬í–‰?¼ë¡œ ê°•ë ¥ ì¶”ì²œ!", date: "2025-01-14", image: null },
    { id: 3, nickname: "?ì—°??, rating: 4, content: "?œì£¼ ?ì—°??ë§Œë½?????ˆì–´??ì¢‹ì•˜?´ìš”. ?¤ë§Œ ê´€ê´‘ì??€ ì¡°ê¸ˆ ?¨ì–´???ˆì–´???Œí„°ì¹??„ìˆ˜?…ë‹ˆ??", date: "2025-01-09", image: null },
    { id: 4, nickname: "?ë§ì¡?, rating: 5, content: "?¤íŒŒ?ì„œ ë°›ì? ë§ˆì‚¬ì§€ê°€ ?•ë§ ?œì›?ˆì–´?? ?ë§ ?¬í–‰?¼ë¡œ ?±ì…?ˆë‹¤.", date: "2025-01-02", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Spa" },
    { id: 5, nickname: "?¬ì§„?‘ê?", rating: 5, content: "ë¦¬ì¡°???„ê²½???•ë§ ?„ë¦„?¤ì›Œ?? ?¬ì§„ ì°ê¸° ì¢‹ì? ?¬í† ì¡´ì´ ë§ìŠµ?ˆë‹¤.", date: "2024-12-25", image: null },
    { id: 6, nickname: "ë¶€ë¶€?¬í–‰", rating: 4, content: "ì¡°ìš©?˜ê³  ?‰í™”ë¡œìš´ ë¶„ìœ„ê¸°ì—???´ì‹?????ˆì—ˆ?´ìš”. ë¶€ë¶€ ?¬í–‰?¼ë¡œ ì¶”ì²œ?©ë‹ˆ??", date: "2024-12-18", image: null }
  ],
  4: [
    { id: 1, nickname: "?œí•‘?¬ë²„", rating: 5, content: "?œí•‘?˜ê¸° ??ì¢‹ì? ?„ì¹˜?ìš”! ?´ë???ë°”ë¡œ ?ì´???¸í–ˆ?µë‹ˆ??", date: "2025-01-19", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Surfing" },
    { id: 2, nickname: "ì»¤í”¼?•í›„", rating: 4, content: "?ˆëª©?´ë? ì»¤í”¼ê±°ë¦¬ê°€ ê°€ê¹Œì›Œ??ë§¤ì¼ ì¹´í˜ ?¬ì–´?ˆì–´?? ê°ì‹¤??ê¹¨ë—?ˆìŠµ?ˆë‹¤.", date: "2025-01-13", image: null },
    { id: 3, nickname: "ë°˜ë ¤?™ë¬¼ê°€ì¡?, rating: 5, content: "ë°˜ë ¤ê²¬ê³¼ ?¨ê»˜ ë¬µì„ ???ˆì–´??ì¢‹ì•˜?´ìš”. ?´ë? ?°ì±…??ê°™ì´ ?????ˆì—ˆ?µë‹ˆ??", date: "2025-01-07", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Pet" }
  ],
  5: [
    { id: 1, nickname: "??‚¬?•í›„", rating: 5, content: "ë¶ˆêµ­?? ?êµ´??ê´€ê´‘í•˜ê¸??•ë§ ì¢‹ì? ?„ì¹˜?€?´ìš”. ?¸í…” ?¸í…Œë¦¬ì–´???„í†µ?ì´??ë¶„ìœ„ê¸??ˆì—ˆ?µë‹ˆ??", date: "2025-01-17", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Bulguksa" },
    { id: 2, nickname: "?¼ê²½?¬ì–´", rating: 5, content: "ì²¨ì„±?€ ?¼ê²½ ?¬ì–´ ?„ë¡œê·¸ë¨???ˆì–´??ì°¸ì—¬?ˆëŠ”???ˆë¬´ ì¢‹ì•˜?´ìš”!", date: "2025-01-11", image: null },
    { id: 3, nickname: "ë¬¸í™”?ë°©", rating: 4, content: "ê²½ì£¼ ?”ë“œê¹Œì? ë¬´ë£Œ ?”í????ˆì–´???¸ë¦¬?ˆì–´?? ì¡°ì‹??ë§›ìˆ?ˆìŠµ?ˆë‹¤.", date: "2025-01-06", image: null }
  ],
  6: [
    { id: 1, nickname: "?¼ê²½ë§ˆë‹ˆ??, rating: 5, content: "?¬ìˆ˜ ë°¤ë°”???¸ë˜ê°€ ???˜ì™”?”ì? ?Œê² ?´ìš”. ê°ì‹¤?ì„œ ë³´ëŠ” ?¼ê²½???•ë§ ?ˆë»¤?µë‹ˆ??", date: "2025-01-16", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Night+View" },
    { id: 2, nickname: "ì¼€?´ë¸”ì¹´íŒ¬", rating: 4, content: "?´ìƒì¼€?´ë¸”ì¹??€??ê°”ë‹¤ ?”ëŠ”???¸í…”?ì„œ ê°€ê¹Œì›Œ??ì¢‹ì•˜?´ìš”. ê°ì‹¤??ê¹¨ë—?ˆìŠµ?ˆë‹¤.", date: "2025-01-10", image: null },
    { id: 3, nickname: "ë§›ì§‘?ë°©", rating: 5, content: "?¬ìˆ˜ ë§›ì§‘?¤ì´ ê°€ê¹Œì›Œ??ì¢‹ì•˜?´ìš”. ê°“ê?ì¹˜ì? ê²Œì¥ ë§›ì§‘ ì¶”ì²œ ë°›ì•„?????¤ë??”ìŠµ?ˆë‹¤.", date: "2025-01-04", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Food" },
    { id: 4, nickname: "ë¡œë§¨?±ì»¤??, rating: 5, content: "?Œì‚°?€êµ??¼ê²½ ë³´ë©´??ë¡œë§¨?±í•œ ?œê°„ ë³´ëƒˆ?´ìš”. ì»¤í”Œ ?¬í–‰?¼ë¡œ ì¶”ì²œ?©ë‹ˆ??", date: "2024-12-29", image: null }
  ],
  7: [
    { id: 1, nickname: "?œì˜¥ë§¤ë‹ˆ??, rating: 5, content: "?•ë§ ?ˆìœ ?œì˜¥?ì„œ ?˜ë£»ë°?ë¬µì—ˆ?´ìš”. ?¨ëŒë°©ì´ ?°ëœ»?˜ê³  ?•ê²¨? ìŠµ?ˆë‹¤.", date: "2025-01-18", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Hanok" },
    { id: 2, nickname: "?„ì£¼ë¹„ë¹”ë°?, rating: 5, content: "?œì˜¥ë§ˆì„ ì¤‘ì‹¬???ˆì–´??ê´€ê´‘í•˜ê¸??¸í–ˆ?´ìš”. ë¹„ë¹”ë°?ë§›ì§‘??ì¶”ì²œë°›ì•˜?µë‹ˆ??", date: "2025-01-12", image: null },
    { id: 3, nickname: "?„í†µì²´í—˜", rating: 4, content: "?œë³µ ì²´í—˜?˜ê³  ?¬ì§„ ë§ì´ ì°ì—ˆ?´ìš”. ì£¼ì°¨?¥ì´ ?†ì–´??ì¡°ê¸ˆ ë¶ˆí¸?ˆì?ë§?ê·¸ë˜??ì¢‹ì•˜?´ìš”.", date: "2025-01-06", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Hanbok" },
    { id: 4, nickname: "?¤ê³¼?€??, rating: 5, content: "?€?ì— ?œê³µ?˜ëŠ” ?„í†µ ?¤ê³¼ê°€ ?•ë§ ë§›ìˆ?ˆì–´?? ë¶„ìœ„ê¸?ìµœê³ !", date: "2024-12-31", image: null }
  ],
  8: [
    { id: 1, nickname: "?¤ì•…?°ë“±??, rating: 5, content: "?¤ì•…???±ì‚° ??ë¬µê¸° ì¢‹ì•˜?´ìš”. ?¼ë¡œê°€ ???€?¸ìŠµ?ˆë‹¤.", date: "2025-01-20", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Seoraksan" },
    { id: 2, nickname: "?¼ì¶œ?¬ì–´", rating: 5, content: "?ê¸ˆ???¼ì¶œ ë³´ëŸ¬ ?ˆë²½???˜ê°”?”ë° ê°ë™?ì´?ˆì–´?? ?¸í…”?ì„œ ?„ë³´ë¡?ê°€?¥í•´???¸í–ˆ?µë‹ˆ??", date: "2025-01-14", image: null },
    { id: 3, nickname: "?œì¥?¬ì–´", rating: 4, content: "ì¤‘ì•™?œì¥ ??°•?•ì´ ë§›ìˆ?ˆì–´?? ?¸í…”?ì„œ ê°€ê¹Œì›Œ???¸í•˜ê²??¤ë??”ìŠµ?ˆë‹¤.", date: "2025-01-08", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Market" },
    { id: 4, nickname: "?«í”„?Œë“¤ë¦?, rating: 5, content: "ë°˜ë ¤ê²¬ê³¼ ?¨ê»˜ ?™ë°•?????ˆì–´??ì¢‹ì•˜?´ìš”. ì²?´ˆ???°ì±…??ê°™ì´ ?ˆìŠµ?ˆë‹¤.", date: "2025-01-02", image: null }
  ],
  9: [
    { id: 1, nickname: "ë¹„ì¦ˆ?ˆìŠ¤", rating: 4, content: "ì»¨ë²¤??ì°¸ì„ì°??”ëŠ”???„ì¹˜ê°€ ì¢‹ì•˜?´ìš”. ?œì„¤???„ë??ì´ê³?ê¹”ë”?©ë‹ˆ??", date: "2025-01-17", image: null },
    { id: 2, nickname: "?¼íŠ¸?´íŒŒ??, rating: 5, content: "?¡ë„ ?¼íŠ¸?´íŒŒ???¼ê²½??ë©‹ìˆ?´ìš”. ?°ì±…?˜ê¸° ì¢‹ì•˜?µë‹ˆ??", date: "2025-01-11", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Songdo+Park" },
    { id: 3, nickname: "ì°¨ì´?˜í???, rating: 4, content: "?¸ì²œ ì°¨ì´?˜í??´ê¹Œì§€ ë²„ìŠ¤ë¡?30ë¶??•ë„ ê±¸ë ¸?´ìš”. ?ì¥ë©?ë§›ìˆê²?ë¨¹ê³  ?”ìŠµ?ˆë‹¤.", date: "2025-01-05", image: null },
    { id: 4, nickname: "ê°€ì¡±ì—¬?‰ê°", rating: 5, content: "ê°€ì¡±ë“¤ê³??”ëŠ”??ì¡°ì‹???¤ì–‘?´ì„œ ì¢‹ì•˜?´ìš”. ?„ì´?¤ì´ ì¢‹ì•„?ˆìŠµ?ˆë‹¤.", date: "2024-12-29", image: null }
  ],
  10: [
    { id: 1, nickname: "?¨ì²œ?¬í–‰", rating: 5, content: "? ì„±?¨ì²œ??ê°€ê¹Œì›Œ???¨ì²œ???¤ë??”ì–´?? ?¼ë¡œê°€ ???€?¸ìŠµ?ˆë‹¤.", date: "2025-01-19", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Hot+Spring" },
    { id: 2, nickname: "ì¶œì¥ë§?, rating: 4, content: "ì¶œì¥?¼ë¡œ ?”ëŠ”??ê°€ê²??€ë¹??œì„¤??ì¢‹ì•˜?´ìš”. ?„ì¹˜???¸ë¦¬?©ë‹ˆ??", date: "2025-01-13", image: null },
    { id: 3, nickname: "?©í†³ê¸?, rating: 5, content: "ê³„ì¡±???©í†³ê¸?ë§¨ë°œ ê±·ê¸° ì²´í—˜?ˆì–´?? ?ë§?ìŠµ?ˆë‹¤!", date: "2025-01-07", image: "https://via.placeholder.com/200x150/e0e0e0/666666?text=Trail" }
  ]
};

// URL?ì„œ ?¸í…” ID ê°€?¸ì˜¤ê¸?
const params = new URLSearchParams(window.location.search);
const hotelId = params.get("id") || "1";
const hotel = hotels[hotelId];
const hotelReviews = reviews[hotelId] || [];

// ?˜ì´ì§€ ? íš¨??ê²€??
if (!hotel) {
  alert("ì¡´ì¬?˜ì? ?ŠëŠ” ?™ì†Œ?…ë‹ˆ??");
  location.href = "hotel.html";
}

// DOM ?”ì†Œ
const headerHotelName = document.getElementById("headerHotelName");
const hotelImage = document.getElementById("hotelImage");
const hotelName = document.getElementById("hotelName");
const hotelAddress = document.getElementById("hotelAddress");
const hotelContact = document.getElementById("hotelContact");
const hotelPrice = document.getElementById("hotelPrice");
const hotelDesc = document.getElementById("hotelDesc");

const detailBtn = document.getElementById("detailBtn");
const pictogramSection = document.getElementById("pictogramSection");
const parkingInfo = document.getElementById("parkingInfo");
const petInfo = document.getElementById("petInfo");
const wifiInfo = document.getElementById("wifiInfo");
const noSmokingInfo = document.getElementById("noSmokingInfo");
const breakfastInfo = document.getElementById("breakfastInfo");

const bookingBtn = document.getElementById("bookingBtn");
const bookingModal = document.getElementById("bookingModal");
const modalHotelName = document.getElementById("modalHotelName");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

const reviewList = document.getElementById("reviewList");
const reviewCount = document.getElementById("reviewCount");
const pagination = document.getElementById("pagination");

// ?™ì†Œ ?•ë³´ ?œì‹œ
function renderHotelInfo() {
  headerHotelName.textContent = hotel.name;
  hotelImage.src = hotel.image;
  hotelImage.alt = hotel.name;
  hotelName.textContent = hotel.name;
  hotelAddress.textContent = hotel.address;
  hotelContact.textContent = hotel.contact;
  hotelPrice.textContent = hotel.price;
  hotelDesc.textContent = hotel.desc;
  modalHotelName.textContent = hotel.name;
}

// ?½í† ê·¸ë¨ ?íƒœ ?…ë°?´íŠ¸
function updatePictograms() {
  // ì£¼ì°¨?œì„¤
  if (hotel.parking) {
    parkingInfo.classList.add("available");
    parkingInfo.classList.remove("unavailable");
    document.getElementById("parkingStatus").textContent = "ê°€??;
  } else {
    parkingInfo.classList.add("unavailable");
    parkingInfo.classList.remove("available");
    document.getElementById("parkingStatus").textContent = "ë¶ˆê?";
  }

  // ë°˜ë ¤?™ë¬¼
  if (hotel.pet) {
    petInfo.classList.add("available");
    petInfo.classList.remove("unavailable");
    document.getElementById("petStatus").textContent = "?™ë°˜ê°€??;
  } else {
    petInfo.classList.add("unavailable");
    petInfo.classList.remove("available");
    document.getElementById("petStatus").textContent = "ë¶ˆê?";
  }

  // ?€?´íŒŒ??
  if (hotel.wifi) {
    wifiInfo.classList.add("available");
    wifiInfo.classList.remove("unavailable");
    document.getElementById("wifiStatus").textContent = "ë¬´ë£Œ";
  } else {
    wifiInfo.classList.add("unavailable");
    wifiInfo.classList.remove("available");
    document.getElementById("wifiStatus").textContent = "?†ìŒ";
  }

  // ê¸ˆì—°ê³µê°„
  if (hotel.noSmoking) {
    noSmokingInfo.classList.add("available");
    noSmokingInfo.classList.remove("unavailable");
    document.getElementById("noSmokingStatus").textContent = "ê¸ˆì—°";
  } else {
    noSmokingInfo.classList.add("unavailable");
    noSmokingInfo.classList.remove("available");
    document.getElementById("noSmokingStatus").textContent = "?¡ì—°ê°€??;
  }

  // ì¡°ì‹?œê³µ
  if (hotel.breakfast) {
    breakfastInfo.classList.add("available");
    breakfastInfo.classList.remove("unavailable");
    document.getElementById("breakfastStatus").textContent = "?œê³µ";
  } else {
    breakfastInfo.classList.add("unavailable");
    breakfastInfo.classList.remove("available");
    document.getElementById("breakfastStatus").textContent = "ë¯¸ì œê³?;
  }
}

// ?ì„¸ ?•ë³´ ë²„íŠ¼ ?´ë¦­ - ?½í† ê·¸ë¨ ? ê?
let isPictogramVisible = false;

detailBtn.addEventListener("click", () => {
  isPictogramVisible = !isPictogramVisible;
  pictogramSection.style.display = isPictogramVisible ? "block" : "none";
  detailBtn.textContent = isPictogramVisible ? "?ì„¸ ?•ë³´ ?«ê¸°" : "?ì„¸ ?•ë³´";
});

// ?¼ì •ì¶”ê? ë²„íŠ¼ ?´ë¦­ - ìº˜ë¦°??ëª¨ë‹¬ ?´ê¸°
const addScheduleBtn = document.getElementById("addScheduleBtn");
addScheduleBtn.addEventListener("click", () => {
  const placeData = {
    type: "hotel",
    hotelId: hotelId,
    image: hotel.image,
    location: hotel.address,
    contact: hotel.contact,
    price: hotel.price
  };

  calendarModal.open(hotel.name, placeData, (scheduleData) => {
    console.log("?¼ì •??ì¶”ê??˜ì—ˆ?µë‹ˆ??", scheduleData);
  });
});

// ?ˆì•½ ë²„íŠ¼ ?´ë¦­ - ?ˆì•½ ?˜ì´ì§€ë¡??´ë™
bookingBtn.addEventListener("click", () => {
  // ?ˆì•½ ?°ì´?°ë? sessionStorage???€??
  const bookingData = {
    hotelId: hotelId,
    hotelName: hotel.name,
    region: hotel.address,
    image: hotel.image,
    basePrice: hotel.basePrice
  };
  
  sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
  
  // ?ˆì•½ ?˜ì´ì§€ë¡??´ë™
  window.location.href = `hotel-booking.html`;
});

// ë¦¬ë·° ?˜ì´ì§€?¤ì´??
const REVIEWS_PER_PAGE = 3;
let currentPage = 1;
const totalPages = Math.ceil(hotelReviews.length / REVIEWS_PER_PAGE);

// ë³„ì  ?Œë”ë§?
function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<span class="star">&#9733;</span>';
    } else {
      stars += '<span class="star empty">&#9733;</span>';
    }
  }
  return stars;
}

// ë¦¬ë·° ?Œë”ë§?
function renderReviews() {
  reviewCount.textContent = `${hotelReviews.length}ê°œì˜ ?„ê¸°`;

  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const pageReviews = hotelReviews.slice(startIndex, endIndex);

  reviewList.innerHTML = pageReviews.map(review => `
    <div class="review-card">
      <div class="review-user">
        <div class="review-avatar">
          <span class="review-avatar-placeholder">&#128100;</span>
        </div>
        <div class="review-user-info">
          <div class="review-nickname">${review.nickname}</div>
          <div class="review-date">${review.date}</div>
        </div>
        <div class="review-rating">
          ${renderStars(review.rating)}
        </div>
      </div>
      <div class="review-content">${review.content}</div>
      ${review.image ? `
        <div class="review-image">
          <img src="${review.image}" alt="ë¦¬ë·° ?´ë?ì§€">
        </div>
      ` : ""}
    </div>
  `).join("");

  renderPagination();
}

// ?˜ì´ì§€?¤ì´???Œë”ë§?
function renderPagination() {
  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let paginationHTML = "";

  // ?´ì „ ë²„íŠ¼
  paginationHTML += `
    <button class="page-btn" ${currentPage === 1 ? "disabled" : ""} onclick="goToPage(${currentPage - 1})">
      &lt;
    </button>
  `;

  // ?˜ì´ì§€ ë²ˆí˜¸
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="page-btn ${i === currentPage ? "active" : ""}" onclick="goToPage(${i})">
        ${i}
      </button>
    `;
  }

  // ?¤ìŒ ë²„íŠ¼
  paginationHTML += `
    <button class="page-btn" ${currentPage === totalPages ? "disabled" : ""} onclick="goToPage(${currentPage + 1})">
      &gt;
    </button>
  `;

  pagination.innerHTML = paginationHTML;
}

// ?˜ì´ì§€ ?´ë™
function goToPage(page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderReviews();

  // ë¦¬ë·° ?¹ì…˜?¼ë¡œ ?¤í¬ë¡?
  document.querySelector(".review-section").scrollIntoView({ behavior: "smooth" });
}

// ?„ì—­ ?¨ìˆ˜ë¡??¸ì¶œ
window.goToPage = goToPage;

// ì´ˆê¸°??
renderHotelInfo();
updatePictograms();
renderReviews();
