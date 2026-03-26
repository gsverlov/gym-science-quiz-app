/**
 * quiz.test.js
 *
 * Tests for js/quiz.js — exercises the state-machine engine against a
 * minimal in-memory DOM provided by Jest's jsdom environment.
 *
 * Strategy:
 *   1. Before each test, build the full HTML skeleton that quiz.js expects.
 *   2. Inject a known `questions` array into `global.questions`.
 *   3. Evaluate quiz.js via eval() so the IIFE executes against the fresh DOM.
 *   4. Assert on DOM state.
 *
 * AC tested here:
 *   AC1  – start screen is shown on load
 *   AC2  – four answer buttons are rendered per question
 *   AC3  – buttons are disabled after one answer is selected
 *   AC4  – correct/incorrect visual feedback is applied immediately
 *   AC5  – explanation text is populated after answering
 *   AC6  – "Next Question" / "See Results" button is visible after answering
 *   AC7  – progress text reads "Question X of N"
 *   AC8  – results screen shows "score / total" string
 *   AC9  – restart button resets to start screen
 */

const fs = require("fs");
const path = require("path");

// ── Helpers ────────────────────────────────────────────────────────────────

const QUIZ_SRC = fs.readFileSync(
  path.resolve(__dirname, "../quiz.js"),
  "utf8"
);

/** Minimal question fixtures — enough to drive all state transitions. */
const MOCK_QUESTIONS = [
  {
    topic: "Test Topic A",
    question: "What is 1 + 1?",
    options: ["1", "2", "3", "4"],
    correctIndex: 1,
    explanation: "1 + 1 equals 2 by the rules of arithmetic.",
  },
  {
    topic: "Test Topic B",
    question: "What colour is the sky?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correctIndex: 2,
    explanation: "The sky appears blue due to Rayleigh scattering.",
  },
  {
    topic: "Test Topic C",
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctIndex: 1,
    explanation: "Mercury is the innermost planet of our solar system.",
  },
];

/**
 * Builds the HTML skeleton that quiz.js expects to find in the DOM,
 * then evaluates the IIFE against it.
 *
 * @param {object[]} [qs] - Optional custom questions array.
 */
function bootQuiz(qs = MOCK_QUESTIONS) {
  document.body.innerHTML = `
    <section id="start-screen" class="screen active"></section>

    <section id="quiz-screen" class="screen">
      <div class="progress-bar-wrap" role="progressbar" aria-valuemin="0" aria-valuemax="10" aria-valuenow="0">
        <div id="progress-bar-fill" class="progress-bar-fill"></div>
      </div>
      <p id="progress-text">Question 1 of 10</p>
      <p id="topic-label"></p>
      <h2 id="question-text"></h2>
      <div id="options-container"></div>
      <div id="feedback-container" class="hidden">
        <p id="feedback-message"></p>
        <p id="explanation-text"></p>
        <button id="next-btn">Next Question</button>
      </div>
    </section>

    <section id="results-screen" class="screen">
      <div id="result-icon"></div>
      <p id="score-display"></p>
      <p id="score-message"></p>
      <button id="restart-btn">Restart Quiz</button>
    </section>

    <button id="start-btn">Start Quiz</button>
  `;

  global.questions = qs;

  // Execute the IIFE
  // eslint-disable-next-line no-eval
  eval(QUIZ_SRC);
}

// ── Helpers to interact with the DOM ──────────────────────────────────────

function click(id) {
  document.getElementById(id).click();
}

function getOptionBtns() {
  return Array.from(
    document.getElementById("options-container").querySelectorAll(".option-btn")
  );
}

function isVisible(id) {
  return document.getElementById(id).classList.contains("active");
}

function isHidden(id) {
  return document.getElementById(id).classList.contains("hidden");
}

// ── Test suites ────────────────────────────────────────────────────────────

describe("Initial render — start screen (AC1)", () => {
  beforeEach(() => bootQuiz());

  test("start-screen is active on load", () => {
    expect(isVisible("start-screen")).toBe(true);
  });

  test("quiz-screen is NOT active on load", () => {
    expect(isVisible("quiz-screen")).toBe(false);
  });

  test("results-screen is NOT active on load", () => {
    expect(isVisible("results-screen")).toBe(false);
  });
});

describe("Start Quiz button — transition to quiz screen", () => {
  beforeEach(() => bootQuiz());

  test("clicking Start Quiz shows quiz-screen", () => {
    click("start-btn");
    expect(isVisible("quiz-screen")).toBe(true);
  });

  test("clicking Start Quiz hides start-screen", () => {
    click("start-btn");
    expect(isVisible("start-screen")).toBe(false);
  });
});

describe("Question rendering (AC2, AC7)", () => {
  beforeEach(() => {
    bootQuiz();
    click("start-btn");
  });

  test("renders exactly 4 answer option buttons (AC2)", () => {
    expect(getOptionBtns()).toHaveLength(4);
  });

  test("option buttons display the correct text for question 1", () => {
    const btns = getOptionBtns();
    MOCK_QUESTIONS[0].options.forEach((opt, i) => {
      expect(btns[i].textContent).toBe(opt);
    });
  });

  test("progress text shows 'Question 1 of N' (AC7)", () => {
    const text = document.getElementById("progress-text").textContent;
    expect(text).toBe(`Question 1 of ${MOCK_QUESTIONS.length}`);
  });

  test("topic label is populated with the first question's topic", () => {
    const label = document.getElementById("topic-label").textContent;
    expect(label).toBe(MOCK_QUESTIONS[0].topic);
  });

  test("question text matches the first question", () => {
    const text = document.getElementById("question-text").textContent;
    expect(text).toBe(MOCK_QUESTIONS[0].question);
  });

  test("feedback container is hidden before any answer is selected", () => {
    expect(isHidden("feedback-container")).toBe(true);
  });
});

describe("Answering correctly (AC3, AC4, AC5, AC6)", () => {
  beforeEach(() => {
    bootQuiz();
    click("start-btn");
    // Select the correct answer for Q1 (index 1 → button index 1)
    getOptionBtns()[MOCK_QUESTIONS[0].correctIndex].click();
  });

  test("all option buttons are disabled after selection (AC3)", () => {
    getOptionBtns().forEach((btn) => {
      expect(btn.disabled).toBe(true);
    });
  });

  test("correct button receives 'correct' CSS class (AC4)", () => {
    const btns = getOptionBtns();
    expect(btns[MOCK_QUESTIONS[0].correctIndex].classList.contains("correct")).toBe(true);
  });

  test("no button receives 'incorrect' CSS class when answer is correct (AC4)", () => {
    getOptionBtns().forEach((btn) => {
      expect(btn.classList.contains("incorrect")).toBe(false);
    });
  });

  test("feedback container becomes visible (AC4)", () => {
    expect(isHidden("feedback-container")).toBe(false);
  });

  test("feedback message indicates a correct answer (AC4)", () => {
    const msg = document.getElementById("feedback-message").textContent;
    expect(msg).toContain("Correct");
  });

  test("feedback message has 'correct' CSS class", () => {
    const el = document.getElementById("feedback-message");
    expect(el.classList.contains("correct")).toBe(true);
  });

  test("explanation text is populated (AC5)", () => {
    const text = document.getElementById("explanation-text").textContent;
    expect(text).toBe(MOCK_QUESTIONS[0].explanation);
  });

  test("'Next Question' button is visible (AC6)", () => {
    const btn = document.getElementById("next-btn");
    expect(btn).toBeTruthy();
    expect(isHidden("feedback-container")).toBe(false);
  });
});

describe("Answering incorrectly (AC3, AC4)", () => {
  const wrongIndex = 0; // Q1 correctIndex is 1, so 0 is wrong

  beforeEach(() => {
    bootQuiz();
    click("start-btn");
    getOptionBtns()[wrongIndex].click();
  });

  test("all option buttons are disabled after wrong selection (AC3)", () => {
    getOptionBtns().forEach((btn) => {
      expect(btn.disabled).toBe(true);
    });
  });

  test("selected wrong button receives 'incorrect' CSS class (AC4)", () => {
    const btns = getOptionBtns();
    expect(btns[wrongIndex].classList.contains("incorrect")).toBe(true);
  });

  test("correct button still receives 'correct' CSS class (AC4)", () => {
    const btns = getOptionBtns();
    expect(btns[MOCK_QUESTIONS[0].correctIndex].classList.contains("correct")).toBe(true);
  });

  test("feedback message indicates an incorrect answer (AC4)", () => {
    const msg = document.getElementById("feedback-message").textContent;
    expect(msg).toContain("Incorrect");
  });

  test("feedback message has 'incorrect' CSS class", () => {
    const el = document.getElementById("feedback-message");
    expect(el.classList.contains("incorrect")).toBe(true);
  });

  test("incorrect feedback message names the correct answer", () => {
    const msg = document.getElementById("feedback-message").textContent;
    expect(msg).toContain(MOCK_QUESTIONS[0].options[MOCK_QUESTIONS[0].correctIndex]);
  });

  test("explanation is still shown even for wrong answers (AC5)", () => {
    const text = document.getElementById("explanation-text").textContent;
    expect(text).toBe(MOCK_QUESTIONS[0].explanation);
  });
});

describe("Advancing through questions (AC7)", () => {
  beforeEach(() => {
    bootQuiz();
    click("start-btn");
  });

  test("progress text updates to 'Question 2 of N' after advancing (AC7)", () => {
    getOptionBtns()[0].click();
    click("next-btn");
    const text = document.getElementById("progress-text").textContent;
    expect(text).toBe(`Question 2 of ${MOCK_QUESTIONS.length}`);
  });

  test("question text changes after advancing to Q2", () => {
    getOptionBtns()[0].click();
    click("next-btn");
    const text = document.getElementById("question-text").textContent;
    expect(text).toBe(MOCK_QUESTIONS[1].question);
  });

  test("feedback container is hidden again after advancing to the next question", () => {
    getOptionBtns()[0].click();
    click("next-btn");
    expect(isHidden("feedback-container")).toBe(true);
  });

  test("new set of 4 option buttons is rendered for Q2 (AC2)", () => {
    getOptionBtns()[0].click();
    click("next-btn");
    expect(getOptionBtns()).toHaveLength(4);
  });
});

describe("Last question — 'See Results' button label (AC6)", () => {
  function advanceToLastQuestion() {
    click("start-btn");
    // Answer all questions except the last
    for (let i = 0; i < MOCK_QUESTIONS.length - 1; i++) {
      getOptionBtns()[0].click();
      click("next-btn");
    }
  }

  beforeEach(() => {
    bootQuiz();
    advanceToLastQuestion();
  });

  test("'next-btn' label is 'See Results' on the last question", () => {
    // Answer the last question to reveal the next button
    getOptionBtns()[0].click();
    const btn = document.getElementById("next-btn");
    expect(btn.textContent).toBe("See Results");
  });

  test("clicking 'See Results' shows the results screen (AC8)", () => {
    getOptionBtns()[0].click();
    click("next-btn");
    expect(isVisible("results-screen")).toBe(true);
  });
});

describe("Results screen (AC8)", () => {
  function runFullQuiz(answerAll = "correct") {
    click("start-btn");
    MOCK_QUESTIONS.forEach((q, i) => {
      const idx = answerAll === "correct" ? q.correctIndex : (q.correctIndex + 1) % 4;
      getOptionBtns()[idx].click();
      click("next-btn");
    });
  }

  test("score display shows 'N / total' when all answers correct (AC8)", () => {
    bootQuiz();
    runFullQuiz("correct");
    const text = document.getElementById("score-display").textContent;
    expect(text).toBe(`${MOCK_QUESTIONS.length} / ${MOCK_QUESTIONS.length}`);
  });

  test("score display shows '0 / total' when all answers wrong (AC8)", () => {
    bootQuiz();
    runFullQuiz("wrong");
    const text = document.getElementById("score-display").textContent;
    expect(text).toBe(`0 / ${MOCK_QUESTIONS.length}`);
  });

  test("result icon is populated on results screen", () => {
    bootQuiz();
    runFullQuiz("correct");
    const icon = document.getElementById("result-icon").textContent;
    expect(icon.trim().length).toBeGreaterThan(0);
  });

  test("score message is populated on results screen", () => {
    bootQuiz();
    runFullQuiz("correct");
    const msg = document.getElementById("score-message").textContent;
    expect(msg.trim().length).toBeGreaterThan(0);
  });

  test("results screen is NOT active before quiz completion", () => {
    bootQuiz();
    click("start-btn");
    expect(isVisible("results-screen")).toBe(false);
  });
});

describe("Restart Quiz button (AC9)", () => {
  function completeQuiz() {
    click("start-btn");
    MOCK_QUESTIONS.forEach(() => {
      getOptionBtns()[0].click();
      click("next-btn");
    });
  }

  beforeEach(() => {
    bootQuiz();
    completeQuiz();
  });

  test("results screen is shown before restart", () => {
    expect(isVisible("results-screen")).toBe(true);
  });

  test("clicking Restart Quiz shows start-screen (AC9)", () => {
    click("restart-btn");
    expect(isVisible("start-screen")).toBe(true);
  });

  test("clicking Restart Quiz hides results-screen (AC9)", () => {
    click("restart-btn");
    expect(isVisible("results-screen")).toBe(false);
  });

  test("after restart, Start Quiz begins quiz at question 1 again (AC9)", () => {
    click("restart-btn");
    click("start-btn");
    const text = document.getElementById("progress-text").textContent;
    expect(text).toBe(`Question 1 of ${MOCK_QUESTIONS.length}`);
  });

  test("after restart, score is reset (new full run scores correctly)", () => {
    // Restart and answer all correct
    click("restart-btn");
    click("start-btn");
    MOCK_QUESTIONS.forEach((q) => {
      getOptionBtns()[q.correctIndex].click();
      click("next-btn");
    });
    const text = document.getElementById("score-display").textContent;
    expect(text).toBe(`${MOCK_QUESTIONS.length} / ${MOCK_QUESTIONS.length}`);
  });
});

describe("Score message variants — result icon and message content", () => {
  /**
   * Runs the quiz with a controlled number of correct answers.
   * @param {number} correctCount - how many questions to answer correctly (first N)
   */
  function runWithScore(correctCount) {
    bootQuiz();
    click("start-btn");
    MOCK_QUESTIONS.forEach((q, i) => {
      const pickedIdx = i < correctCount ? q.correctIndex : (q.correctIndex + 1) % 4;
      getOptionBtns()[pickedIdx].click();
      click("next-btn");
    });
  }

  test("perfect score (100%) shows trophy icon 🏆", () => {
    runWithScore(MOCK_QUESTIONS.length); // 3/3
    expect(document.getElementById("result-icon").textContent).toContain("🏆");
  });

  test("low score (<40%) shows a non-trophy icon", () => {
    runWithScore(0); // 0/3 = 0%
    const icon = document.getElementById("result-icon").textContent;
    expect(icon).not.toContain("🏆");
  });
});

describe("Edge cases", () => {
  test("clicking two different answer buttons in a row only counts the first (buttons are disabled)", () => {
    bootQuiz();
    click("start-btn");
    const btns = getOptionBtns();
    // Click correct answer
    btns[MOCK_QUESTIONS[0].correctIndex].click();
    // Attempt to click a wrong answer — should be disabled and do nothing
    btns[(MOCK_QUESTIONS[0].correctIndex + 1) % 4].click();
    // Advance to results via remaining questions
    for (let i = 0; i < MOCK_QUESTIONS.length - 1; i++) {
      click("next-btn");
      getOptionBtns()[0].click();
    }
    click("next-btn");
    // We answered Q1 correctly, so score should be at least 1
    const scoreText = document.getElementById("score-display").textContent;
    const score = parseInt(scoreText.split("/")[0].trim(), 10);
    expect(score).toBeGreaterThanOrEqual(1);
  });

  test("progress bar fill width increases as quiz progresses", () => {
    bootQuiz();
    click("start-btn");
    const fillAtQ1 = parseFloat(
      document.getElementById("progress-bar-fill").style.width
    );
    getOptionBtns()[0].click();
    click("next-btn");
    const fillAtQ2 = parseFloat(
      document.getElementById("progress-bar-fill").style.width
    );
    expect(fillAtQ2).toBeGreaterThan(fillAtQ1);
  });

  test("quiz works with a single-question dataset (boundary: minimum length 1)", () => {
    const singleQ = [
      {
        topic: "Solo Topic",
        question: "Is this the only question?",
        options: ["Yes", "No", "Maybe", "Always"],
        correctIndex: 0,
        explanation: "This is the only question in this test dataset.",
      },
    ];
    bootQuiz(singleQ);
    click("start-btn");
    expect(getOptionBtns()).toHaveLength(4);
    // The next button should immediately read "See Results"
    getOptionBtns()[0].click();
    expect(document.getElementById("next-btn").textContent).toBe("See Results");
    click("next-btn");
    expect(isVisible("results-screen")).toBe(true);
  });
});
