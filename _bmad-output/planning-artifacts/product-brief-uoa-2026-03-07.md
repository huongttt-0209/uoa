---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments: ['_bmad-output/brainstorming/brainstorming-session-2026-03-07-154700.md']
date: 2026-03-07
author: Uoa
---

# Product Brief: UOA (Ú Òa)

## Executive Summary

**UOA (Ú Òa)** là **app giải trí đầu tiên, công cụ thứ hai**. Tận dụng AI và template engine, UOA biến việc "nghĩ lý do" — vốn căng thẳng và ngại ngùng — thành trải nghiệm vui vẻ, nhẹ nhàng cho cả người gửi và người nhận. Sản phẩm tự động sinh các lý do hủy kèo, xin nghỉ, trễ giờ một cách hài hước, đồng thời cho phép người dùng "soi" mức độ xạo (BS Score) của excuse người khác — tạo thành viral loop tự nhiên.

UOA ra mắt vào thời điểm hoàn hảo: Free API từ LLM hàng đầu (Gemini, Groq) đang mạnh mẽ, kết hợp với trend "văn vở" và "bóc phốt" hài hước đang viral trên Threads, TikTok tại Việt Nam. Đây là sản phẩm **Blue Ocean** — chưa có nền tảng nào tại VN tập trung vào "văn hóa sủi kèo" kết hợp Gen Z UX + AI + gamification.

> **Elevator Pitch:** *"Ú Òa (UOA) — Cỗ máy AI 'đẻ' văn mẫu lươn lẹo giúp bạn sủi mọi kèo khó trong 3 giây và soi xem hội bạn thân đang nói thật hay xạo."*

---

## Core Vision

### Problem Statement

Ai cũng từng phải "nghĩ lý do" — hủy kèo bạn bè, xin nghỉ phút chót, giải thích vì sao đến trễ. Đây là tình huống xảy ra hàng ngày, nhưng:

- **Khó nghĩ lý do hay:** Đặc biệt khi gấp, não bộ "đơ" hoàn toàn
- **Lười gõ phím:** Soạn tin nhắn dài, thuyết phục mất thời gian và công sức
- **Căng thẳng, ngại ngùng:** Tình huống "xin xỏ" luôn mang tâm lý áp lực

### Problem Impact

- Gen Z & Millennials VN (18-30 tuổi, ~20M người) đối mặt với tình huống này hàng tuần
- User hiện tại phải tự nghĩ, Google, hoặc hỏi bạn bè → mất thời gian, thiếu sáng tạo
- Không có công cụ nào biến tình huống bất tiện này thành **trải nghiệm giải trí**

### Why Existing Solutions Fall Short

- **Text generator random:** Chỉ tạo text ngẫu nhiên, không hiểu context VN, không hài hước
- **ChatGPT/Gemini trực tiếp:** Phải tự soạn prompt, output generic, không UX chuyên biệt
- **Không ai làm "Excuse Detector":** Chưa có sản phẩm nào cho phép chấm điểm BS excuse
- **Thiếu yếu tố cộng đồng:** Không ai biến excuse thành entertainment content

→ **Blue Ocean** tại Việt Nam: Chưa có đối thủ trực tiếp.

### Proposed Solution

**UOA v0.1 — Micro-MVP** (24h, $0):

| # | Feature | Priority | Mô tả |
|---|---|---|---|
| 1 | 🎭 **Tab TẠO** | P0 | Chọn tình huống + đối tượng + **Tone Slider (centerpiece UI, 1/3 màn hình, emoji animation 😇→🐍→🎭)** → Template Engine sinh excuse |
| 2 | 🔍 **Tab SOI** | P0 | Paste excuse → BS Score **(gauge speedometer)** + breakdown + verdict badge |
| 3 | 📋 **Copy** | P0 | 1-tap copy kết quả |
| 4 | 📤 **Share Text SOI** | P0 | Format text share-worthy: `"🔍 UOA phán: 87% XẠO! 🐍 Verdict: FBI WANTED 🚨"` |

**UI/UX:** Dark theme + neon accents + glassmorphism cards + CSS-native micro-animations (transitions, keyframes, gradient shifts — mượt mà và nhẹ, không import thư viện nặng).

**Content strategy:** Content is king — templates chất lượng là competitive moat. Đầu tư 50+ templates VN-localized.

### Key Differentiators

1. **Entertainment-first, Tool-second** — User mở app để vui, tình cờ có thêm công cụ hữu ích
2. **Tone Slider = UX Signature** — Kéo thanh trượt lớn, emoji & gradient thay đổi real-time
3. **BS Score Speedometer** — Dramatic gauge animation, share-worthy kết quả
4. **Zero-Cost Architecture** — 90% client-side → instant response, $0/tháng
5. **Văn hóa VN-first** — Nội dung viết cho người VN, đúng tone Gen Z
6. **Share-worthy text format** — Kết quả SOI tự nó là viral content

---

## Target Users

### Primary Users

**🎓 Persona 1: Linh — Sinh viên năm 3 (21 tuổi)**

- **Context:** Sinh viên đại học, sống ký túc xá, lịch học kín, đời sống xã hội active
- **Motivation:** Balance giữa học và chơi, thường xuyên cần "sủi" lịch hẹn hoặc buổi học nhóm
- **Hiện tại:** Vắt óc nghĩ lý do → lặp lại "em bị ốm" → bạn bè bắt bài
- **Khung giờ vàng:** 7h sáng (nghỉ học), chiều thứ 6 (hủy kèo nhậu để về nhà)
- **Aha moment TẠO:** Kéo Tone Slider → thấy excuse biến đổi real-time → cười không nhịn được
- **Aha moment SOI:** Paste tin nhắn xin nghỉ ốm của bạn → "99% Xạo Lố 🐍" → screenshot bóc phốt

**🏢 Persona 2: Minh — Nhân viên văn phòng (26 tuổi)**

- **Context:** Làm marketing tại startup, sếp hay check Zalo, áp lực deadline
- **Motivation:** Justify thời gian nghỉ, tin nhắn "thuyết phục và chuyên nghiệp nhưng không quá giả tạo"
- **Hiện tại:** Google "cách xin nghỉ ốm thuyết phục" → copy mẫu cũ → chỉnh sửa thủ công
- **Khung giờ vàng:** 7h-8h sáng thứ 2 (nghỉ ở nhà), 16h-17h chiều thứ 6 (về sớm)
- **Aha moment TẠO:** Chọn "Nghỉ làm" + "Sếp" + Tone slider → excuse hoàn hảo trong 3 giây
- **Aha moment SOI:** Soi excuse đồng nghiệp hay nghỉ → "92% Xạo" → cười ngầm

### Secondary Users

**📱 Persona 3: Trang — TikToker/Content Creator (24 tuổi)**

- **Context:** Làm content hài/lifestyle, luôn cần ý tưởng video mới
- **Motivation:** Dùng UOA lấy chất liệu — screenshot kết quả Roast/SOI làm content
- **Hành vi:** Tạo excuse → AI roast → screenshot → đăng TikTok → viral
- **Giá trị:** UOA = nguồn content miễn phí, không bao giờ cạn ý tưởng

**🔍 Persona 4: Khoa — "Thám tử excuse" (23 tuổi)**

- **Context:** Hay bị "leo cây", bị cancel phút chót
- **Motivation:** Dùng tab SOI kiểm chứng excuse bạn bè gửi
- **Hành vi:** Bạn nhắn "tao bị sốt" → copy → paste SOI → "87% BS" → đá lại group kèm screenshot
- **Giá trị:** Biến bực bội khi bị hủy kèo → trò vui cho cả nhóm

### User Journey

1. **Discovery:** Thấy bạn share kết quả SOI trên story/Threads → Tò mò → Click link → Vào app
2. **Onboarding:** Mở app → Dark UI đẹp → 2 tab rõ ràng → Kéo thử Tone Slider → WOW! → Tạo excuse đầu tiên → Cười → Copy → Hook!
3. **Core Usage:** Thứ 2 sáng TẠO excuse nghỉ làm, thứ 6 chiều hủy kèo, bất kỳ lúc nào SOI excuse người khác
4. **Aha Moment:** TẠO — Tone Slider biến đổi real-time | SOI — "99% XẠO LỐ!" verdict
5. **Viral Loop:** Share kết quả SOI → Bạn bè click → Họ thử SOI → Họ share tiếp → Organic growth, $0 marketing

---

## Success Metrics

### User Success Metrics

| Metric | Target | Cách đo |
|---|---|---|
| **Time-to-excuse** | < 5 giây từ lúc bấm Tạo → Copy xong | Timestamp client-side |
| **Aha moment — TẠO** | Slider interaction real-time | Slider interaction count |
| **Aha moment — SOI** | User copy/share kết quả "bóc phốt" | Share/Copy rate tab SOI |
| **Weekly return rate** | 1-2 lần/tuần | Vercel Analytics free |
| **Core action completion** | >80% sessions → Copy hoặc Share | Copy/Share click count |

### Business Objectives

| Timeframe | Mục tiêu | KPI |
|---|---|---|
| **Tháng 1** | Validate idea | 1,000 organic users (Word of Mouth) |
| **Tháng 3** | Scale + v1.5 | 10,000+ users, Social Feed, test "Buy me a coffee" |
| **Tháng 6** | Community + monetization | Excuse Feed active, donation revenue > $0 |

### Key Performance Indicators

| KPI | Target | Ý nghĩa |
|---|---|---|
| 🎯 **Share Rate** (North Star) | **40-50%** | Viral loop hoạt động |
| 📈 **Organic Growth** | 1,000 users tháng 1 | Word of Mouth work |
| 🔄 **Retention** | 30%+ quay lại tuần 2 | Giải trí thật sự |
| ⚡ **Time-to-value** | <5 giây | UX đủ nhanh |
| 🔍 **SOI engagement** | >20% sessions dùng SOI | SOI = viral driver |

> **North Star Metric:** Share Rate 40-50% — cứ 10 user mà 4-5 copy mang đi → viral loop hoạt động hoàn hảo.

---

## MVP Scope

### Core Features (v0.1 — 24h, $0) 🔒 SCOPE LOCKED

| # | Feature | Chi tiết |
|---|---|---|
| 1 | 🎭 **Tab TẠO** | Dropdown tình huống + đối tượng, Tone Slider (centerpiece, emoji animation), Template Engine sinh excuse, nút Copy |
| 2 | 🔍 **Tab SOI** | Textarea paste excuse, BS Scorer rule-based, Speedometer gauge, Verdict badge, nút Copy + Share text |
| 3 | 🎨 **UI/UX Premium** | Dark theme, glassmorphism cards, CSS-native micro-animations, neon accents, responsive mobile |
| 4 | 📋 **50+ Templates** | Vietnamese-localized excuse templates + BS keywords dictionary |

> ⚡ **Design directive:** Toàn bộ quỹ thời gian 24h ưu tiên trau chuốt UI/UX — giao diện "đẹp lung linh" là vũ khí giữ chân user.

### Out of Scope for MVP

| Feature | Version | Lý do |
|---|---|---|
| 🔥 Tab ROAST | v0.2 | Scope creep |
| 🎰 Vòng Quay Khẩn Cấp | v0.2 | Animation phức tạp |
| 🤖 AI API (Gemini) | v0.2 | Chỉ kích hoạt khi v0.1 proven |
| 🖼️ Share Card (ảnh) | v0.2 | Canvas generation phức tạp |
| 👤 User accounts | v1.0 | Không cần cho v0.1 |
| 📰 Social Feed | v1.5 | Community feature |
| 🏆 Leaderboard / Streaks | v2.0 | Gamification layer |

### MVP Success Criteria — Trigger cho v0.2

| Gate | Target | Ý nghĩa |
|---|---|---|
| 🚪 **User Gate** | 500 organic users tuần đầu | Nhu cầu tồn tại |
| 🔁 **Viral Gate** | Share/Copy rate >25% | Core Loop thành công |
| ✅ **Cả 2 đạt** | → Mở khóa v0.2 (Gemini + ROAST) | Scale-up approved |

### Future Vision — "Mạng Xã Hội Giải Trí Ngách"

- **v0.1 (24h):** Tool giải trí cá nhân
- **v0.2 (+3d):** + AI Gemini + ROAST tab
- **v1.0 (+2w):** Platform giải trí cộng đồng
- **v2.0 (3-6m):** Niche Entertainment Platform
- **Vision (2-3y):** Hệ sinh thái "Sủi Kèo" — Creator Economy, Excuse Battle League, Oscar Xạo Lẹo thường niên. Nơi người ta thi thố ai lươn lẹo nghệ thuật hơn.
