---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain-skipped', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
inputDocuments: ['planning-artifacts/product-brief-uoa-2026-03-07.md', 'brainstorming/brainstorming-session-2026-03-07-154700.md']
workflowType: 'prd'
briefCount: 1
researchCount: 0
brainstormingCount: 1
projectDocsCount: 0
classification:
  projectType: web_app
  domain: entertainment_general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - UOA (Ú Òa)

**Author:** Uoa
**Date:** 2026-03-07

## Executive Summary

**UOA (Ú Òa)** là web app giải trí client-side, biến tình huống "nghĩ lý do" — hủy kèo, xin nghỉ, giải thích trễ giờ — thành trải nghiệm vui vẻ cho Gen Z & Millennials VN (18-30 tuổi). Sản phẩm định vị là **entertainment-first, tool-second**: user mở app để cười trước, tình cờ có thêm công cụ hữu ích.

**Core Loop gồm 2 tab chính (v0.1):**
- **TẠO** — Chọn tình huống + đối tượng + kéo Tone Slider → Template Engine sinh excuse trong <5 giây → Copy 1 chạm
- **SOI** — Paste excuse → BS Scorer rule-based chấm điểm xạo (0-100%) → Verdict badge → Share text format viral-ready

**Kiến trúc zero-cost:** 90% logic client-side (template engine + rule-based scorer), không backend, không auth, không database. Chi phí vận hành = $0/tháng. Hosting trên Vercel Free Tier.

**Thị trường:** Blue Ocean tại VN — chưa có đối thủ trực tiếp nhắm vào "văn hóa sủi kèo" kết hợp AI + gamification + Gen Z UX.

**North Star Metric:** Share Rate 40-50% (cứ 10 user → 4-5 copy/share kết quả). Target 1,000 organic users tháng đầu qua Word of Mouth.

### What Makes This Special

1. **Tone Slider = UX Signature** — Centerpiece UI chiếm 1/3 màn hình, emoji & gradient morph real-time (😇→🐍→🎭). Không app nào có interaction tương tự.
2. **BS Score (Excuse Detector)** — Tính năng chưa từng tồn tại: chấm điểm xác suất xạo với speedometer gauge animation. Kết quả tự nó là viral content.
3. **Zero-cost, instant response** — 100% client-side → 0ms API latency, hoạt động offline, vận hành $0. Scalable vô hạn.
4. **Văn hóa VN-first** — 50+ templates viết bởi người VN, cho context VN, đúng tone Gen Z. Không phải bản dịch từ tiếng Anh.
5. **Viral loop tự nhiên** — Share kết quả SOI → bạn bè click → họ thử → họ share tiếp. Organic growth, $0 marketing.

## Project Classification

| Thuộc tính | Giá trị |
|---|---|
| **Project Type** | Web App (SPA) — Vite + React |
| **Domain** | Entertainment / General |
| **Complexity** | Low — client-side only, no regulated data |
| **Project Context** | Greenfield — sản phẩm hoàn toàn mới |
| **Target Platform** | Mobile-first responsive, desktop compatible |
| **Hosting** | Vercel Free Tier |

## Success Criteria

### User Success

| Criteria | Metric | Target | Cách đo |
|---|---|---|---|
| Tạo excuse nhanh | Time-to-excuse (bắt đầu → copy) | **< 5 giây** | Client-side timestamp |
| Aha moment TẠO | Tone Slider interaction rate | >70% sessions có kéo slider | Event tracking |
| Aha moment SOI | SOI engagement rate | >20% sessions dùng tab SOI | Tab switch tracking |
| Hành vi viral | Copy/Share rate trên tổng excuses | **40-50%** (North Star) | Copy/Share click count |
| Quay lại | Weekly return rate | 1-2 lần/tuần | Vercel Analytics |

### Business Success

| Timeframe | Metric | Target | Go/No-Go |
|---|---|---|---|
| **Tuần 1** | Organic users | **500 users** | ≥500 → continue, <200 → pivot |
| **Tháng 1** | Total organic users | **1,000 users** | Validate product-market fit |
| **Tháng 3** | Users + monetization | **10,000 users**, "Buy me a coffee" live | Scale decision |
| **Tháng 6** | Community + revenue | Social Feed active, donation > $0 | Platform evolution |

### Technical Success

| Criteria | Target |
|---|---|
| First Contentful Paint | < 1.5 giây |
| Bundle size | < 200KB gzipped |
| Template coverage | 50+ templates, 5+ tình huống |
| BS Scorer accuracy | >70% match human judgment |
| Mobile responsive | 100% features work trên 375px+ |
| Offline capable | Core features work offline |

### Measurable Outcomes

- **North Star:** Share Rate ≥ 40% → viral loop confirmed
- **v0.2 Trigger:** 500 users tuần 1 + Share Rate >25% → mở khóa Gemini API + ROAST tab
- **Retention signal:** 30%+ users quay lại tuần 2 → entertainment value proven

## Product Scope

### MVP — v0.1 (24h, $0) 🔒 LOCKED

| # | Feature | Acceptance Criteria |
|---|---|---|
| 1 | **Tab TẠO** | Dropdown 5+ tình huống × 3+ đối tượng. Tone Slider 5 mức (emoji morph). Template Engine sinh excuse <1 giây. Copy button 1-tap. |
| 2 | **Tab SOI** | Textarea ≥20 ký tự. BS Score 0-100% (speedometer gauge anim). Verdict badge. Share text format. Copy button. |
| 3 | **UI/UX Premium** | Dark theme. Glassmorphism cards. CSS-native animations. Mobile-first responsive. |
| 4 | **Content** | 50+ Vietnamese excuse templates. BS keywords dictionary. 5+ verdict badges. |

### Growth Features (Post-MVP)

| Version | Features | Trigger |
|---|---|---|
| **v0.2** (+3d) | Tab ROAST + Gemini API + Vòng Quay | 500 users + 25% share |
| **v0.3** (+3d) | Share Cards + Mobile Polish + AI Deep SOI | Organic growth |
| **v1.0** (+2w) | User profiles + Social Feed + Leaderboard | 10K users |

### Vision (Future 2-3 năm)

**"Mạng Xã Hội Giải Trí Ngách"** — Creator Economy, Excuse Battle League, Oscar Xạo Lẹo thường niên.

## User Journeys

### Journey 1: Linh — "Sáng thứ 2 nghỉ học" (Primary - TẠO Success Path)

> **7h15 sáng thứ Hai.** Linh (21, sinh viên năm 3) nằm cuộn trên giường ký túc xá. Alarm kêu lần thứ 3. Buổi seminar 8h — Linh biết mình *không thể* dậy nổi.
>
> Mở Chrome → gõ "uoa" → Dark UI hiện ra. Bấm **TẠO** → chọn "Nghỉ học" → "Giảng viên" → **kéo Tone Slider**. Ở "Thật thà 😇": *"Em bị đau bụng, xin nghỉ ạ."* Kéo sang "Bậc thầy 🎭": *"Dạ thưa thầy, em đang bị phản ứng phụ với thuốc kháng sinh bác sĩ kê hôm qua, cần nằm theo dõi..."*
>
> Linh bật cười 🤣. Bấm **Copy** → paste vào Zalo nhóm lớp → Gửi. **15 giây. Xong.**

### Journey 2: Minh — "Soi tin nhắn đồng nghiệp" (Primary - SOI Path)

> **9h30 sáng thứ Ba.** Minh (26, marketing) đang ở văn phòng. An gửi Zalo nhóm: *"Mọi người ơi, tôi bị sốt cao từ đêm qua, hôm nay xin nghỉ..."*
>
> Minh nheo mắt. Tuần trước An cũng "sốt". Mở UOA → tab **SOI** → paste tin nhắn.
>
> **Speedometer quay... DỪNG.** "92% XẠO! 🐍" — Verdict: "CAO THỦ LƯƠN LẸO 🎭". Breakdown: *"Dùng từ 'sốt cao' nhưng không nói nhiệt độ • Thêm 'từ đêm qua' để tạo cảm giác nghiêm trọng..."*
>
> Minh bấm **Share** → copy text: `"🔍 UOA phán: 92% XẠO! 🐍 Verdict: CAO THỦ LƯƠN LẸO 🎭"` → paste vào group chat bạn thân. Group nổ tung.

### Journey 3: Trang — "Làm content TikTok" (Secondary - Creator)

> **20h thứ Năm.** Trang (24, TikToker) cần ý tưởng video. Mở UOA → TẠO → "Hủy hẹn hò" → Tone max → copy excuse cực ngầu → paste ngay sang SOI → BS Score: 95% 🐍.
>
> Screenshots cả quá trình. Quay video: *"AI chê văn mẫu lươn lẹo của tui 🤣"* → đăng TikTok → 50K views. Comment: "App gì thế??" → Trang pin link UOA → **500 clicks trong 1 đêm**.

### Journey 4: Khoa — "Bị cancel phút chót" (Secondary - Detective)

> **17h30 thứ Sáu.** Khoa (23) đang chờ bạn đi ăn. Zalo: *"Ê sorry tao bệnh rồi không đi được..."*
>
> Khoa mở UOA → SOI → paste → **87% XẠO!** "FBI WANTED 🚨" → screenshot gửi nhóm: *"SOI rồi, 87% xạo! @Hùng"*. Nhóm cười ngất. **Cả nhóm cài UOA.**

### Journey Requirements Summary

| Journey | Capabilities |
|---|---|
| Linh (TẠO) | Dropdown tình huống × đối tượng, Tone Slider 5 mức, Template Engine, Copy 1-tap, <5s flow |
| Minh (SOI) | Textarea paste, BS Scorer, Speedometer gauge, Verdict badge, Breakdown, Share text |
| Trang (Creator) | TẠO→SOI flow liền mạch, Screenshot-worthy UI, Content output thú vị |
| Khoa (Detective) | SOI quick paste, BS Score visual impact, Share text copy, Viral output |

## Innovation & Novel Patterns

### Detected Innovation Areas

| Innovation | Loại | Mô tả |
|---|---|---|
| **Tone Slider** | New Interaction Pattern | Slider điều chỉnh "mức độ xạo" real-time với emoji morphing — UX chưa có tiền lệ |
| **BS Score** | Novel Feature Category | Chấm điểm xác suất xạo — feature category hoàn toàn mới |
| **Culture-first Entertainment** | Market Innovation | Blue Ocean tại VN — biến "sủi kèo" thành entertainment platform |
| **Zero-cost Architecture** | Technical Innovation | Full-featured app $0 vận hành: template engine + rule-based scorer client-side |

### Market Context

- **Quốc tế:** excusegenerator.com → text random, no AI/social/UX. UOA vượt trội mọi mặt.
- **VN:** Không có đối thủ trực tiếp target "văn hóa sủi kèo" + Gen Z.
- **Adjacent:** ChatGPT/Gemini → cần tự prompt, output generic, UX không chuyên biệt.

### Validation Approach

| Innovation | Validate | Signal |
|---|---|---|
| Tone Slider | A/B test slider vs dropdown | >70% sessions kéo slider |
| BS Score | User survey accuracy | >70% match human judgment |
| Culture-first | Share Rate tracking | ≥40% share |
| Zero-cost | Vercel cost monitoring | $0 sau 30 ngày |

### Risk Mitigation

| Risk | Mitigation |
|---|---|
| Tone Slider phức tạp | Tooltip + default mức giữa + animation gợi ý |
| BS Score không thuyết phục | Focus entertainment value, không claim accuracy |
| Zero-cost giới hạn scale | v0.2+ chuyển Gemini API khi đạt trigger |
| Blue Ocean = chưa proven | 24h MVP validate nhanh, pivot cost ≈ $0 |

## Web App Specific Requirements

### Project-Type Overview

SPA (Single Page Application) client-side, mobile-first, deploy Vercel. Không cần SSR — content sinh dynamic bởi template engine. Viral qua word-of-mouth, không qua search.

### Browser Matrix

| Browser | Version | Priority |
|---|---|---|
| Chrome Mobile | 90+ | 🟢 P0 |
| Safari Mobile | 15+ | 🟢 P0 |
| Chrome Desktop | 90+ | 🟡 P1 |
| Firefox | 95+ | 🟡 P2 |
| Samsung Internet | 15+ | 🟡 P2 |

### Responsive Design

| Breakpoint | Target |
|---|---|
| **375px** | Minimum viable (iPhone SE) |
| **390px** | Primary target (iPhone 14) |
| **768px** | Supported (Tablet) |
| **1024px+** | Supported (Desktop, max-width container) |

### Performance Targets

| Metric | Target |
|---|---|
| FCP | < 1.5s |
| LCP | < 2.0s |
| TTI | < 2.5s |
| CLS | < 0.1 |
| Bundle | < 200KB gzipped |
| Lighthouse Performance | > 90 |

### SEO Strategy

- Minimal SEO — viral qua word-of-mouth + social share
- Basic meta tags + OG tags cho social preview
- Custom OG Image: "UOA — Cỗ máy văn mẫu lươn lẹo"

### Accessibility (Level A)

| Feature | Implementation |
|---|---|
| Keyboard navigation | Tab focus tất cả interactive elements |
| Screen reader | aria-labels cho Slider, Gauge |
| Color contrast | WCAG AA (4.5:1) trên dark theme |
| Touch targets | Minimum 48×48px |
| Reduced motion | `prefers-reduced-motion` media query |

### Implementation Stack

- **Framework:** Vite + React (hoặc vanilla JS)
- **CSS:** Vanilla CSS + Custom Properties
- **State:** useState/useReducer (no Redux)
- **Storage:** localStorage (future history)
- **Deploy:** Vercel Free Tier, auto-deploy từ GitHub
- **Analytics:** Vercel Analytics (free)

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**Approach:** Experience MVP — ship cảm xúc trước, polish sau. MVP chỉ cần: user cười khi dùng + share kết quả.
**Resource:** Solo dev, 24h, $0.

### MVP Feature Set (Phase 1) — 🔒 LOCKED

| # | Capability | Why Must-Have |
|---|---|---|
| 1 | Template Engine + 50+ templates | Core product value |
| 2 | Tone Slider (5 mức) | UX signature differentiation |
| 3 | BS Scorer rule-based | Viral feature chính |
| 4 | Copy 1-tap | UX table-stakes |
| 5 | Share text SOI | Viral loop = acquisition channel |
| 6 | Dark theme + CSS animations | Premium feel + screenshot-worthy |

### Post-MVP Phases

| Phase | Features | Trigger | Timeline |
|---|---|---|---|
| **2** Growth | ROAST, Gemini API, Vòng Quay | 500 users + 25% share | +3d |
| **3** Enhance | Share Cards, AI Deep SOI | Organic growth | +3d |
| **4** Platform | Profiles, Social Feed, Leaderboard | 10K users | +2w |

### Risk Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Templates nhàm chán | 🔴 High | Viết templates trước code. Test 5 bạn trước launch |
| BS Scorer không thuyết phục | 🟡 Med | Multiple signals. Fallback: entertainment value |
| Gen Z không quan tâm | 🔴 High | 24h MVP = fast validation. Pivot cost ≈ $0 |
| Quá offensive | 🟡 Med | Default tone giữa. Disclaimer "for entertainment" |
| Solo dev burnout | 🟡 Med | 24h strict scope. Không thêm feature |

## Functional Requirements

### Excuse Generation (TẠO)

- **FR1:** User can select an excuse situation from predefined categories
- **FR2:** User can select the target recipient for the excuse
- **FR3:** User can adjust the excuse tone level across a spectrum from sincere to elaborate
- **FR4:** System generates contextually appropriate excuses based on situation, recipient, and tone
- **FR5:** User can copy generated excuse text to clipboard with a single action
- **FR6:** User can regenerate a different excuse with the same parameters
- **FR7:** System provides visual feedback of current tone level with emotional indicators

### Excuse Detection (SOI)

- **FR8:** User can paste or type text to analyze for BS detection
- **FR9:** System calculates and displays a BS probability score (0-100%) for submitted text
- **FR10:** System provides a breakdown of factors contributing to the BS score
- **FR11:** System assigns a verdict badge based on the BS score threshold
- **FR12:** User can copy the BS analysis result as pre-formatted shareable text
- **FR13:** System enforces minimum text length for meaningful analysis

### Navigation & Layout

- **FR14:** User can switch between excuse generation and excuse detection modes
- **FR15:** System maintains current mode state during a session
- **FR16:** System displays the product brand identity consistently

### Content & Templates

- **FR17:** System provides excuse templates covering at least 5 distinct situation categories
- **FR18:** System provides templates targeting at least 3 distinct recipient types
- **FR19:** System generates varied excuse outputs (no exact repeats in sequence)
- **FR20:** System uses culturally appropriate Vietnamese language and context

### Visual Experience

- **FR21:** System presents a dark-themed visual environment
- **FR22:** System provides animated transitions for interactive elements
- **FR23:** System displays the BS score result with an animated gauge visualization
- **FR24:** System adapts its layout for mobile and desktop viewport sizes

### Analytics & Tracking

- **FR25:** System tracks excuse generation events (situation, recipient, tone)
- **FR26:** System tracks BS detection events (score, verdict)
- **FR27:** System tracks copy and share actions

## Non-Functional Requirements

### Performance

- **NFR1:** Excuse generation completes within 500ms of parameter selection
- **NFR2:** BS Score calculation completes within 1 second of text submission
- **NFR3:** Tone Slider responds within 16ms (60fps animation)
- **NFR4:** First Contentful Paint under 1.5s on 4G mobile
- **NFR5:** Total bundle under 200KB gzipped
- **NFR6:** CSS animations at 60fps on mid-range devices

### Accessibility

- **NFR7:** All interactive elements reachable via keyboard
- **NFR8:** WCAG AA color contrast (4.5:1) on dark theme
- **NFR9:** Touch targets minimum 48×48px mobile
- **NFR10:** `prefers-reduced-motion` respected
- **NFR11:** Screen reader compatible with `aria-labels` on custom controls

### Reliability

- **NFR12:** Core features function offline after initial load
- **NFR13:** No state loss on page refresh mid-session

### Compatibility

- **NFR14:** Full functionality on Chrome/Safari mobile 90+/15+
- **NFR15:** Graceful degradation on older browsers
- **NFR16:** Viewport support 375px–2560px
