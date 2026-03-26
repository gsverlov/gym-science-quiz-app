/**
 * Gym Science Quiz — Engine (State Machine)
 *
 * States:  start → question → feedback → (question | results) → start
 *
 * Reads the global `questions` array defined in questions.js.
 */

(function () {
  "use strict";

  // ── State ──────────────────────────────────────────────────────────────────
  var currentIndex = 0;
  var score = 0;

  // ── DOM references ─────────────────────────────────────────────────────────
  var startScreen      = document.getElementById("start-screen");
  var quizScreen       = document.getElementById("quiz-screen");
  var resultsScreen    = document.getElementById("results-screen");

  var startBtn         = document.getElementById("start-btn");
  var nextBtn          = document.getElementById("next-btn");
  var restartBtn       = document.getElementById("restart-btn");

  var progressBarFill  = document.getElementById("progress-bar-fill");
  var progressBarWrap  = progressBarFill.parentElement;
  var progressText     = document.getElementById("progress-text");
  var topicLabel       = document.getElementById("topic-label");
  var questionText     = document.getElementById("question-text");
  var optionsContainer = document.getElementById("options-container");
  var feedbackContainer= document.getElementById("feedback-container");
  var feedbackMessage  = document.getElementById("feedback-message");
  var explanationText  = document.getElementById("explanation-text");

  var scoreDisplay     = document.getElementById("score-display");
  var scoreMessage     = document.getElementById("score-message");
  var resultIcon       = document.getElementById("result-icon");

  // ── Helpers ────────────────────────────────────────────────────────────────
  function showScreen(screenEl) {
    [startScreen, quizScreen, resultsScreen].forEach(function (s) {
      s.classList.remove("active");
    });
    screenEl.classList.add("active");
  }

  // ── showStart ──────────────────────────────────────────────────────────────
  function showStart() {
    showScreen(startScreen);
  }

  // ── showQuestion ───────────────────────────────────────────────────────────
  function showQuestion() {
    var q = questions[currentIndex];
    var total = questions.length;

    // Progress
    var pct = (currentIndex / total) * 100;
    progressBarFill.style.width = pct + "%";
    progressBarWrap.setAttribute("aria-valuenow", currentIndex);
    progressText.textContent = "Question " + (currentIndex + 1) + " of " + total;

    // Topic & question
    topicLabel.textContent = q.topic;
    questionText.textContent = q.question;

    // Options
    optionsContainer.innerHTML = "";
    q.options.forEach(function (optionText, idx) {
      var btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = optionText;
      btn.addEventListener("click", function () {
        handleAnswer(idx);
      });
      optionsContainer.appendChild(btn);
    });

    // Hide feedback
    feedbackContainer.classList.add("hidden");
    feedbackMessage.className = "feedback-message";

    showScreen(quizScreen);
  }

  // ── handleAnswer ───────────────────────────────────────────────────────────
  function handleAnswer(selectedIdx) {
    var q = questions[currentIndex];
    var isCorrect = selectedIdx === q.correctIndex;

    // Score
    if (isCorrect) {
      score += 1;
    }

    // Disable all buttons and apply correct/incorrect styling
    var optionBtns = optionsContainer.querySelectorAll(".option-btn");
    optionBtns.forEach(function (btn, idx) {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add("correct");
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add("incorrect");
      }
    });

    // Feedback message
    if (isCorrect) {
      feedbackMessage.textContent = "✓ Correct!";
      feedbackMessage.className = "feedback-message correct";
    } else {
      feedbackMessage.textContent = "✗ Incorrect — the correct answer is: " + q.options[q.correctIndex];
      feedbackMessage.className = "feedback-message incorrect";
    }

    // Explanation
    explanationText.textContent = q.explanation;

    // Next / See Results button label
    var isLast = currentIndex === questions.length - 1;
    nextBtn.textContent = isLast ? "See Results" : "Next Question";

    // Show feedback
    feedbackContainer.classList.remove("hidden");
  }

  // ── showResults ────────────────────────────────────────────────────────────
  function showResults() {
    var total = questions.length;
    var pct = score / total;

    scoreDisplay.textContent = score + " / " + total;

    var icon, msg;
    if (pct === 1) {
      icon = "🏆";
      msg = "Perfect score — you're a gym science expert!";
    } else if (pct >= 0.7) {
      icon = "💪";
      msg = "Great work! You have solid gym-science knowledge.";
    } else if (pct >= 0.4) {
      icon = "📚";
      msg = "Not bad! A little more study will sharpen your knowledge.";
    } else {
      icon = "🔬";
      msg = "Keep learning — understanding the science will level up your training!";
    }

    resultIcon.textContent = icon;
    scoreMessage.textContent = msg;

    // Final progress bar at 100%
    progressBarFill.style.width = "100%";

    showScreen(resultsScreen);
  }

  // ── Event listeners ────────────────────────────────────────────────────────
  startBtn.addEventListener("click", function () {
    currentIndex = 0;
    score = 0;
    showQuestion();
  });

  nextBtn.addEventListener("click", function () {
    currentIndex += 1;
    if (currentIndex >= questions.length) {
      showResults();
    } else {
      showQuestion();
    }
  });

  restartBtn.addEventListener("click", function () {
    currentIndex = 0;
    score = 0;
    showStart();
  });

  // ── Initialise ─────────────────────────────────────────────────────────────
  showStart();
})();
