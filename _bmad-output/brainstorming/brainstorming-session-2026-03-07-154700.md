---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: []
session_topic: 'Ú Òa (UOA) - Web App giải trí tích hợp AI sinh lý do hủy kèo, xin nghỉ, trễ giờ hài hước'
session_goals: 'Brainstorm ý tưởng hoàn thiện Micro-MVP v0.1 (24h launch)'
selected_approach: 'progressive-flow + ai-recommended'
techniques_used: ['What If Scenarios', 'SCAMPER', 'Six Thinking Hats', 'Reverse Brainstorming', 'Morphological Analysis', 'Persona Journey', 'Resource Constraints', 'Decision Tree Mapping']
ideas_generated: 37
context_file: ''
---

# 🎉 Brainstorming Session Results — UOA (Ú Òa)

**Facilitator:** Uoa
**Date:** 2026-03-07
**Duration:** ~50 phút | **Techniques:** 8 | **Ideas:** 37+

---

## 1. Tầm nhìn sản phẩm

**UOA (Ú Òa)** — Web App giải trí AI giúp người dùng tự động sinh ra các lý do hủy kèo, xin nghỉ, trễ giờ... một cách **hài hước và lươn lẹo** dựa trên LLM.

> **Breakthrough Insight:** UOA không chỉ là tool — mà là **mạng xã hội giải trí thu nhỏ**. User mở app hàng ngày để lướt xem cộng đồng có excuse gì "trời ơi đất hỡi" để thả react và xả stress.

### Core Triangle — Vòng lặp engagement

```
    🎭 TẠO excuse
       ↗         ↘
🔥 ROAST ←——→ 🔍 SOI excuse
   excuse          người khác
```

---

## 2. Micro-MVP v0.1 — Ra mắt trong 24h

### Constraints
- 💰 Budget: **$0**
- ⏱️ Timeline: **24 giờ**
- 🤖 AI: **Template engine only** (0 API cost)
- 💾 Database: **Local Storage** (0 cost)
- 🌐 Hosting: **Vercel Free**
- 🎨 UI/UX: **Phải đẹp, thu hút** — dark theme, glassmorphism, micro-animations

### Feature List v0.1

| Feature | Mô tả | Processing |
|---|---|---|
| **🎭 Tab TẠO** | Chọn tình huống + đối tượng + Tone Slider → nhận excuse | Template Engine (client-side, $0) |
| **🔍 Tab SOI** | Paste excuse → BS Score (0-100%) + breakdown + verdict badge | Rule-based Scorer (client-side, $0) |
| **📋 Copy** | 1-tap copy kết quả vào clipboard | Clipboard API |

### UI/UX Requirements
- Dark theme với accent colors neon (xanh lá / tím)
- Glassmorphism cards cho kết quả
- Tone Slider với gradient animation (😇→🐍→🎭)
- BS Score gauge animation (0→100% fill)
- Verdict badges đầy màu sắc ("Lương Thiện 😇" / "Hơi Xạo 🤥" / "Bậc Thầy 🐍" / "FBI Wanted 🚨")
- Tab switching smooth transition
- Mobile responsive từ đầu
- Micro-animations: hover effects, button press, kết quả xuất hiện

### Tech Stack

| Layer | Công nghệ | Chi phí |
|---|---|---|
| Framework | Vite + React (hoặc Vanilla JS) | $0 |
| Styling | Vanilla CSS (dark, glassmorphism) | $0 |
| Logic | templateEngine.js + bsScorer.js | $0 |
| Data | excuseTemplates.json + bsKeywords.json | $0 |
| Testing | Vitest (unit) + Playwright (E2E) | $0 |
| Hosting | Vercel Free | $0 |
| CI | GitHub Actions Free | $0 |

### Cấu trúc Project

```
uoa/
├── src/
│   ├── components/           # UI components
│   │   ├── ToneSlider        # Slider 😇→🐍→🎭
│   │   ├── BSScoreGauge      # Score animation
│   │   ├── ExcuseCard        # Kết quả excuse
│   │   ├── VerdictBadge      # Badge BS level
│   │   └── TabNavigation     # 2 tabs
│   ├── engines/              # Core logic (unit testable)
│   │   ├── templateEngine.js # Tạo excuse từ templates
│   │   └── bsScorer.js       # Chấm BS score
│   ├── data/                 # Static content
│   │   ├── excuseTemplates.json
│   │   └── bsKeywords.json
│   ├── App.jsx
│   └── index.css             # Dark theme + glassmorphism
├── tests/
│   ├── unit/                 # templateEngine + bsScorer tests
│   └── e2e/                  # Playwright user flows
└── package.json
```

### Auto-Test Architecture (Testability: 9/10)

| Layer | Test Type | Coverage |
|---|---|---|
| Template Engine | Unit Test (Vitest) | Tất cả template combos |
| BS Scorer | Unit Test (Vitest) | Golden dataset 50+ cases |
| UI Components | Component Test | Slider, Gauge, Cards |
| User Flows | E2E (Playwright) | Tab TẠO flow, Tab SOI flow |

---

## 3. Lộ trình phát triển

```
v0.1 (24h)   🎭 TẠO + 🔍 SOI (template only, UI đẹp)
    ↓
v0.2 (+3d)   + 🔥 ROAST tab + Vòng Quay Khẩn Cấp + Gemini AI
    ↓
v0.3 (+3d)   + Share Cards + Excuse Detector AI Deep + Mobile polish
    ↓
v1.0 (+5d)   + Social Feed + Community + Leaderboard
```

---

## 4. Ngân hàng ý tưởng (Để sau)

### Ưu tiên cao (v0.2-v0.3)
| # | Tên | Mô tả |
|---|---|---|
| 24 | Excuse Roast | AI roast excuse user + letter grade + suggest upgrade |
| 14 | Vòng Quay Khẩn Cấp | Spin animation → random excuse → auto-copy |
| 7 | Panic Button | 1-tap widget (gộp vào Vòng Quay) |
| 10 | Save My Ass | Forward tin → AI soạn reply |

### Ưu tiên trung bình (v1.0+)
| # | Tên | Mô tả |
|---|---|---|
| 11 | Excuse Feed | Bảng tin excuse cộng đồng kiểu TikTok |
| 8 | Hall of Fame | Vote excuse hay nhất hàng tuần |
| 9 | Excuse Battle | 2 user đấu excuse, cộng đồng vote |
| 17 | Daily Streak | Challenge hàng ngày kiểu Duolingo |
| 19 | Excuse Awards | Oscar Xạo Lẹo hàng tháng |
| 15 | Crowd-sourced | SOS → community + AI đề xuất |

### Ý tưởng dài hạn
| # | Tên | Mô tả |
|---|---|---|
| 12 | Voice AI | Voice message excuse giọng ốm |
| 13 | Professional Mode | B2B corporate version |
| 18 | Cinematic Universe | Mini story + plot twist |
| 20 | Compliment Generator | Dùng AI engine tạo khen/tỏ tình |
| 22 | Zero UI | Keyboard shortcut, no app |
| 16 | Excuse Matching | Match 2 người cùng tình huống |

---

## 5. Zero-Cost Architecture (từ Reverse Brainstorming)

```
User Request Flow:
1. Check cache (0ms, $0) 
2. Template Remix JS (1ms, $0)     ← v0.1 dừng ở đây
3. Rule-based Score (1ms, $0)      ← v0.1 dừng ở đây
4. AI Provider A - Gemini (500ms)  ← v0.2+
5. Failover Provider B (500ms)     ← v0.2+
6. Graceful Degradation ($0)       ← v0.2+

→ User LUÔN có kết quả, KHÔNG BAO GIỜ thấy lỗi!
```

**Key strategies:**
- **Excuse Cache Pool** (#28): Pre-generate 50-100 excuses, cache Local Storage
- **Smart Rate Limiter** (#29): 10 AI lượt/ngày, gamified
- **Template Remix Engine** (#30): JS client-side tạo vô hạn excuse
- **BS Score Algorithm** (#32): Rule-based scoring, 0 API
- **Multi-Provider Failover** (#36): Gemini→Groq→Mistral
- **Graceful Degradation** (#37): Khi hết AI → "AI đang ngủ 😴"

---

## 6. Persona Validation

| Persona | Hành trình | Giá trị |
|---|---|---|
| **Minh** (văn phòng, 26) | TẠO → copy → gửi sếp | Tiết kiệm thời gian sáng thứ 2 |
| **Linh** (sinh viên, 20) | Vòng Quay → share story | Viral content + fun |
| **Hùng** (freelancer, 30) | TẠO → SOI excuse client | Tool + entertainment |
| **Mai** (creator, 24) | ROAST → screenshot TikTok | Nguồn content miễn phí |
