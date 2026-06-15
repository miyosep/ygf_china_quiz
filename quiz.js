// quiz.js — flow logic only. Quiz content lives in questions.js.
//
// Flow:
//   Start → Question(×5) → (wrong → Try Again → same question) → Completion → Play Again → Start
//
// Rules:
//   - Options are shown in fixed order (no shuffle).
//   - Confirm is disabled until an option is selected; selection may change before confirm.
//   - Wrong answer → full-screen Try Again (copy alternates A/B) → back to same question.
//   - Correct answer → inline "Correct!" + explanation → Next.
//   - Home button (top-left) returns to Start anytime during the quiz.
//   - No per-question back navigation. Completion has Play Again → resets to Start.

(function () {
  "use strict";

  const TRY_AGAIN_COPY = [
    "Not quite — give it another shot!",
    "Hmm, that's not it. Think again!",
  ];

  const screens = {
    start: document.getElementById("screen-start"),
    question: document.getElementById("screen-question"),
    tryagain: document.getElementById("screen-tryagain"),
    complete: document.getElementById("screen-complete"),
  };

  const el = {
    btnHome: document.getElementById("btn-home"),
    btnStart: document.getElementById("btn-start"),
    progress: document.getElementById("progress"),
    progressFill: document.getElementById("progress-fill"),
    category: document.getElementById("category"),
    questionText: document.getElementById("question-text"),
    options: document.getElementById("options"),
    feedback: document.getElementById("feedback"),
    feedbackExplanation: document.getElementById("feedback-explanation"),
    btnConfirm: document.getElementById("btn-confirm"),
    btnNext: document.getElementById("btn-next"),
    tryagainMessage: document.getElementById("tryagain-message"),
    btnRetry: document.getElementById("btn-retry"),
    btnPlayagain: document.getElementById("btn-playagain"),
  };

  const state = {
    index: 0, // current question index
    selected: null, // selected option index, or null
    answered: false, // current question answered correctly
    wrongCount: 0, // total wrong attempts (drives Try Again copy rotation)
  };

  const LETTERS = ["A", "B", "C", "D"];

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("is-active"));
    screens[name].classList.add("is-active");
    el.btnHome.hidden = name !== "question" && name !== "tryagain";
  }

  function renderQuestion() {
    const total = QUESTIONS.length;
    const q = QUESTIONS[state.index];

    state.selected = null;
    state.answered = false;

    el.progress.textContent = `Q${state.index + 1} / ${total}`;
    el.progressFill.style.width = `${(state.index / total) * 100}%`;
    el.category.textContent = q.category || "";
    el.questionText.textContent = q.question;

    el.feedback.hidden = true;
    el.feedbackExplanation.textContent = "";
    el.btnNext.hidden = true;
    el.btnConfirm.hidden = false;
    el.btnConfirm.disabled = true;

    el.options.innerHTML = "";
    q.options.forEach((text, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.dataset.index = String(i);

      const marker = document.createElement("span");
      marker.className = "option__marker";
      marker.textContent = LETTERS[i] || i + 1;

      const label = document.createElement("span");
      label.className = "option__label";
      label.textContent = text;

      btn.append(marker, label);
      btn.addEventListener("click", () => onSelect(i));
      el.options.appendChild(btn);
    });
  }

  function onSelect(i) {
    if (state.answered) return;
    state.selected = i;

    [...el.options.children].forEach((btn, idx) => {
      btn.classList.toggle("is-selected", idx === i);
    });

    el.btnConfirm.disabled = false;
  }

  function onConfirm() {
    if (state.selected === null || state.answered) return;
    const q = QUESTIONS[state.index];

    if (state.selected === q.correctIndex) {
      handleCorrect(q);
    } else {
      handleWrong();
    }
  }

  function handleCorrect(q) {
    state.answered = true;

    [...el.options.children].forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add("is-correct");
        btn.classList.remove("is-selected");
      }
    });

    el.feedbackExplanation.textContent = q.explanation || "";
    el.feedback.hidden = false;

    el.btnConfirm.hidden = true;
    el.btnNext.hidden = false;

    const total = QUESTIONS.length;
    el.progressFill.style.width = `${((state.index + 1) / total) * 100}%`;
    el.btnNext.focus();
  }

  function handleWrong() {
    const msg = TRY_AGAIN_COPY[state.wrongCount % TRY_AGAIN_COPY.length];
    state.wrongCount += 1;
    el.tryagainMessage.textContent = msg;
    showScreen("tryagain");
  }

  function onNext() {
    if (state.index < QUESTIONS.length - 1) {
      state.index += 1;
      renderQuestion();
      showScreen("question");
    } else {
      showScreen("complete");
    }
  }

  function onRetry() {
    // Return to the same question with a clean slate.
    renderQuestion();
    showScreen("question");
  }

  function startQuiz() {
    state.index = 0;
    state.wrongCount = 0;
    renderQuestion();
    showScreen("question");
  }

  function resetToStart() {
    state.index = 0;
    state.selected = null;
    state.answered = false;
    state.wrongCount = 0;
    showScreen("start");
  }

  el.btnStart.addEventListener("click", startQuiz);
  el.btnHome.addEventListener("click", resetToStart);
  el.btnConfirm.addEventListener("click", onConfirm);
  el.btnNext.addEventListener("click", onNext);
  el.btnRetry.addEventListener("click", onRetry);
  el.btnPlayagain.addEventListener("click", resetToStart);
})();
