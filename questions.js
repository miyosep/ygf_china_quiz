// questions.js — edit ONLY this file to change quiz content.
//
// Fields:
//   id           : number, 0-based, matches array index
//   category     : string label (display only)
//   question     : string, the question text
//   options      : string[4], answer choices in display order (NO shuffle)
//   correctIndex : number, index into options[] above (0-3)
//   explanation  : string, shown inline after a correct answer
//
// To swap the quiz: replace the text/options/correctIndex/explanation below.
// Keep exactly 5 entries with 4 options each for the layout to stay consistent.

const QUESTIONS = [
  {
    id: 0,
    category: "Basic China Knowledge",
    question: "What is the capital city of China?",
    options: ["Shanghai", "Beijing", "Guangzhou", "Chengdu"],
    correctIndex: 1,
    explanation: "Beijing has been China's capital for centuries.",
  },
  {
    id: 1,
    category: "AI Models & Companies",
    question: "Which of the following is NOT a Chinese AI language model?",
    options: ["DeepSeek", "Kimi", "GLM", "Mistral"],
    correctIndex: 3,
    explanation: "Mistral is a French AI company, not Chinese.",
  },
  {
    id: 2,
    category: "Consumer Tech",
    question: "Which Chinese company created the short-video app TikTok?",
    options: ["Tencent", "Baidu", "ByteDance", "Alibaba"],
    correctIndex: 2,
    explanation: "ByteDance launched TikTok as the international version of Douyin.",
  },
  {
    id: 3,
    category: "Chinese Language",
    question: "What does \"wo ai ni\" (我爱你) mean in English?",
    options: ["I love you", "Hello", "Thank you", "Goodbye"],
    correctIndex: 0,
    explanation: "Wo ai ni (我爱你) means \"I love you\" in Mandarin.",
  },
  {
    id: 4,
    category: "Internet & Apps",
    question: "Which app is China's most popular messaging app?",
    options: ["WeChat", "WhatsApp", "LINE", "Telegram"],
    correctIndex: 0,
    explanation: "WeChat (微信) is the go-to messaging and super-app used daily across China.",
  },
];
