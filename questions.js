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
    category: "Space & Science",
    question: "Which Chinese lunar exploration program is named after a moon goddess?",
    options: ["Shenzhou", "Tianwen", "Chang'e", "Tiangong"],
    correctIndex: 2,
    explanation: "Chang'e is named after the Chinese moon goddess legend.",
  },
  {
    id: 4,
    category: "Internet & Apps",
    question: 'Which search engine is often called the "Google of China"?',
    options: ["Baidu", "Sohu", "Weibo", "Youku"],
    correctIndex: 0,
    explanation: "Baidu dominates search in China much like Google does globally.",
  },
];
