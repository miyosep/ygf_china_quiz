# 🇨🇳 China Tech & AI Quiz Website — Implementation Plan

## Overview

A quiz website covering general knowledge, tech, science, and AI in China.
Target audience: **foreigners (non-Chinese) in their late teens to early twenties**. Difficulty: **easy and fun**.
Format: **5 multiple-choice questions** (4 options each), spanning basic China knowledge through AI models, companies, and tech trends.

**Site title (browser tab):** `YGF_China`

**Language policy (product-facing):**
- UI copy: **English only** — no Korean anywhere in the app
- Quiz content: **mostly English**; Chinese characters (汉字) may be added per question during content review — scope TBD by stakeholder after first build
- Fonts: **Inter** (Latin/UI) + **Noto Sans SC** (Chinese characters, when used)

---

## Quiz Categories & Question Pool

### Category Pool
*The quiz has exactly **5 questions** in a **fixed order**. Each question maps to one category (0 → 4).*

| # | Category | Theme |
|---|----------|-------|
| 0 | 🏯 Basic China Knowledge | Capital, symbols, landmarks, food, culture |
| 1 | 🤖 AI Models & Companies | DeepSeek, Kimi, GLM, Qwen; Baidu, Alibaba, Tencent, Huawei |
| 2 | 📱 Consumer Tech | Smartphones, apps (TikTok, WeChat), EV/battery (CATL, BYD) |
| 3 | 🚀 Space & Science | Chang'e, Tianwen, Shenzhou; China/world firsts; supercomputers |
| 4 | 🌐 Internet & Apps | "Google of China", Xiaohongshu, Pinduoduo, Alipay; Chinese equivalents |

---

## Quiz Format

| Item | Spec |
|------|------|
| Question count | **5** (fixed order: category 0 → 4) |
| Type | 4-option multiple choice |
| Difficulty | Easy (general knowledge for foreigners) |
| UI language | English only |
| Content language | Mostly English; Chinese TBD per question during review |
| Option order | **Fixed** (as defined in `questions.js`) |
| Question order | **Fixed** (always 0 → 4) |
| Navigation | **No back** — forward only |
| Timer / sharing | **None** |
| Scoring / ranks | **None** — user must answer correctly to advance |

### Interaction flow (per question)

```
[Question screen — shows progress: "Q1 / 5"]
  → Confirm button is DISABLED until an option is selected
  → User selects an option (may change freely before confirming)
  → User clicks "Confirm"  (button becomes active once an option is selected)
       ├─ Wrong  → [Try Again screen] → return to same question (selection cleared)
       └─ Correct → inline "Correct!" feedback + one-line explanation
                  → "Next" button appears
                  → (after Q5 "Next") → Completion screen
```

| Step | Behavior |
|------|----------|
| No option selected | Confirm button is **disabled** |
| Select option | Highlight selection; Confirm becomes **active**; user may still switch |
| Confirm | Locks in choice; reveals correct / incorrect |
| Wrong answer | **Try Again screen** (full-screen interstitial); alternates copy A / B; CTA returns to same question, selection cleared |
| Correct answer | **Inline** "Correct!" banner + one-line explanation displayed on question card; "Next" button appears below. If card height is too tight to display comfortably, promote to a full-screen feedback page instead (implementation decision at build time) |
| Progress indicator | "Q{n} / 5" shown at top of every question screen |
| After Q5 correct | **Completion screen** |

### Try Again copy (alternating)

On each wrong answer, show one of these messages **in rotation** (1st wrong → A, 2nd → B, 3rd → A, …):

| Variant | Message |
|---------|---------|
| A | Not quite — give it another shot! |
| B | Hmm, that's not it. Think again! |

CTA button on Try Again screen returns user to the same question.

---

## Copy & Screen Text

### Start screen

- **Quiz title** (headline, fun question): *"are u ready to find out how chinese ur brain really is?"*
- **CTA button label**: `let's go`
- Vibe: casual, meme-adjacent, not corporate

### Completion screen

After all 5 questions are answered correctly:

- Text (exact, intentional lowercase): **`you met me at very chinese moment`**
- **Fun image** — placeholder for now; stakeholder will provide final asset (playful / meme-friendly vibe)
- **"Play Again" button** — clicking returns user to the **Start screen** (full reset)
- No confetti; keep motion minimal

---

## Design Direction

- **Theme**: **Light background** — clean, bright, fun (not dark mode)
- **Colors**: **No red/gold** — neutral light base + one or two soft accent colors (e.g. soft blue, teal, or purple — finalize at build)
- **Fonts**: Google Fonts — **Inter** (UI/English) + **Noto Sans SC** (Chinese, when needed)
- **Layout**: Card-based; light shadow / subtle borders
- **Animations**: **Minimal** — short fade on screen transitions; optional subtle shake on wrong confirm only
- **Background**: Plain light gradient or soft pattern — nothing busy
- **Target device**: **Desktop-first** (centered card, reasonable max-width); basic mobile fallback optional

---

## Tech Stack

| Item | Choice |
|------|--------|
| Structure | HTML5 |
| Style | Vanilla CSS (CSS Variables) |
| Logic | Vanilla JavaScript |
| Fonts | Google Fonts (Inter, Noto Sans SC) |
| Deployment | **Static multi-file site** (`index.html` + `style.css` + `quiz.js` + `questions.js` + `assets/`) — works locally and on GitHub Pages |

No build step, no framework, no backend.

---

## File Structure

```
YGF_quiz/
├── index.html          # Shell: Start → Question → Try Again → Completion
├── style.css           # Light theme, desktop-first layout
├── quiz.js             # Flow state machine, UI wiring (no question text here)
├── questions.js        # ★ All question content — edit/replace here only
└── assets/
    ├── completion.png  # Placeholder fun image (replace when stakeholder provides)
    └── (optional) icons
```

### Easy content swap

- **`questions.js`** — stakeholder edits text, options, correctIndex, explanation without touching logic files.
- **`assets/completion.png`** — drop in replacement file to change the completion image.

---

## Question Data Shape

```javascript
// questions.js — edit ONLY this file to change quiz content
//
// Fields:
//   id           : number, 0-based, matches array index
//   category     : string label (display only)
//   question     : string, the question text
//   options      : string[4], answer choices in display order (NO shuffle)
//   correctIndex : number, index into options[] above (0-3)
//   explanation  : string, shown inline after a correct answer

const QUESTIONS = [
  {
    id: 0,
    category: "basic",
    question: "What is the capital city of China?",
    options: ["Shanghai", "Beijing", "Guangzhou", "Chengdu"],
    correctIndex: 1,
    explanation: "Beijing has been China's capital for centuries."
  },
  // ... 4 more
];
```

- Options are displayed **as-is** (no runtime shuffle).
- `correctIndex` is a direct index into `options[]` — no shuffle mapping needed.

---

## Sample Questions (v1 — replace content in `questions.js`)

1. **What is the capital city of China?** *(Basic)*
   - Shanghai / **Beijing** / Guangzhou / Chengdu
   - *Explanation:* Beijing has been China's capital for centuries.

2. **Which of the following is NOT a Chinese AI language model?** *(AI)*
   - DeepSeek / Kimi / GLM / **Mistral**
   - *Explanation:* Mistral is a French AI company, not Chinese.

3. **Which Chinese company created the short-video app TikTok?** *(Consumer Tech)*
   - Tencent / Baidu / **ByteDance** / Alibaba
   - *Explanation:* ByteDance launched TikTok as the international version of Douyin.

4. **Which Chinese lunar exploration program is named after a moon goddess?** *(Space & Science)*
   - Shenzhou / Tianwen / **Chang'e** / Tiangong
   - *Explanation:* Chang'e is named after the Chinese moon goddess legend.

5. **Which search engine is often called the "Google of China"?** *(Internet & Apps)*
   - **Baidu** / Sohu / Weibo / Youku
   - *Explanation:* Baidu dominates search in China much like Google does globally.

---

## Screen Map

| Screen | Purpose |
|--------|---------|
| **Start** | Quiz title + "let's go" CTA |
| **Question (×5)** | Progress indicator + question + 4 options + Confirm (disabled until selection) |
| **Try Again** | Alternating wrong-answer message + CTA to retry same question |
| **Correct feedback** | Inline on question card (or separate page if space too tight — impl decision) |
| **Completion** | `you met me at very chinese moment` + image + "Play Again" → Start |

---

## Implementation Steps

- [ ] **Step 1**: `questions.js` — 5 sample questions with explanations; options in fixed order.
- [ ] **Step 2**: `index.html` — `<title>YGF_China</title>`, all screen shells.
- [ ] **Step 3**: `style.css` — light theme, desktop-first, minimal animation.
- [ ] **Step 4**: `quiz.js` — fixed-order options, confirm/disabled logic, progress indicator, try-again rotation, inline correct feedback, Play Again reset.
- [ ] **Step 5**: Placeholder `assets/completion.png` + completion screen with Play Again.
- [ ] **Step 6**: Desktop smoke test; deploy to GitHub Pages when ready.

---

## Decisions Log

| Topic | Decision |
|-------|----------|
| Site title | `YGF_China` |
| Completion line | Intentionally lowercase: `you met me at very chinese moment` |
| Completion image | Placeholder now; stakeholder provides fun/meme-style image later |
| Play Again | Button on completion → returns to Start screen (full reset) |
| Try Again copy | Alternate A / B on each wrong attempt |
| Correct feedback | Inline on question card; promote to full-screen page if space is tight (impl decision) |
| Progress | "Q{n} / 5" shown on every question screen |
| Confirm button | Disabled until at least one option is selected |
| Start CTA label | `let's go` |
| Start screen title | `are u ready to find out how chinese ur brain really is?` |
| Option order | **Fixed** (no shuffle) — as written in `questions.js` |
| Chinese in content | Mostly English; fine-tune after stakeholder reviews live site |
| Visual tone | Light background; no red/gold |
| Animation | Minimal |
| Primary device | Desktop |
| Questions | Sample set in `questions.js`; stakeholder will replace content later |
