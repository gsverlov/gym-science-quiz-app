/**
 * questions.test.js
 *
 * Tests for js/questions.js — validates that the question data array
 * is structurally sound, complete, and meets acceptance criteria.
 *
 * AC tested here:
 *   AC2  – each question has at least 4 answer options
 *   AC5  – each question has an explanation
 *   AC7  – progress indicator relies on questions.length being accurate
 *   AC10 – minimum 10 questions, minimum 3 distinct topic areas
 */

const fs = require("fs");
const path = require("path");

// Load questions.js in a sandboxed scope — it defines a global `questions`
// variable (var) so we evaluate it and capture the binding.
let questions;
beforeAll(() => {
  const src = fs.readFileSync(
    path.resolve(__dirname, "../questions.js"),
    "utf8"
  );
  // Wrap in a function so `var questions` becomes a local we can capture.
  // Then expose it via a return value instead of a global.
  const fn = new Function(`${src}\nreturn questions;`);
  questions = fn();
});

// ── Structural completeness ────────────────────────────────────────────────

describe("questions array — structural completeness", () => {
  test("is defined and is an array", () => {
    expect(Array.isArray(questions)).toBe(true);
  });

  test("contains at least 10 questions (AC10)", () => {
    expect(questions.length).toBeGreaterThanOrEqual(10);
  });

  test("every question has a non-empty `topic` string", () => {
    questions.forEach((q, i) => {
      expect(typeof q.topic).toBe("string");
      expect(q.topic.trim().length).toBeGreaterThan(0);
    });
  });

  test("every question has a non-empty `question` string", () => {
    questions.forEach((q, i) => {
      expect(typeof q.question).toBe("string");
      expect(q.question.trim().length).toBeGreaterThan(0);
    });
  });

  test("every question has an `options` array with exactly 4 entries (AC2)", () => {
    questions.forEach((q, i) => {
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options).toHaveLength(4);
    });
  });

  test("every option is a non-empty string", () => {
    questions.forEach((q) => {
      q.options.forEach((opt) => {
        expect(typeof opt).toBe("string");
        expect(opt.trim().length).toBeGreaterThan(0);
      });
    });
  });

  test("every question has a `correctIndex` that is a valid index into options", () => {
    questions.forEach((q, i) => {
      expect(typeof q.correctIndex).toBe("number");
      expect(Number.isInteger(q.correctIndex)).toBe(true);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
    });
  });

  test("every question has a non-empty `explanation` string (AC5)", () => {
    questions.forEach((q, i) => {
      expect(typeof q.explanation).toBe("string");
      expect(q.explanation.trim().length).toBeGreaterThan(0);
    });
  });
});

// ── Topic area coverage ────────────────────────────────────────────────────

describe("questions array — topic area coverage (AC10)", () => {
  test("contains at least 3 distinct topic areas", () => {
    const topics = new Set(questions.map((q) => q.topic));
    expect(topics.size).toBeGreaterThanOrEqual(3);
  });

  test("each topic has at least 1 question assigned to it", () => {
    const topicCounts = {};
    questions.forEach((q) => {
      topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
    });
    Object.values(topicCounts).forEach((count) => {
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });
});

// ── Edge cases ─────────────────────────────────────────────────────────────

describe("questions array — edge cases", () => {
  test("no duplicate question strings (all questions are unique)", () => {
    const questionTexts = questions.map((q) => q.question);
    const unique = new Set(questionTexts);
    expect(unique.size).toBe(questionTexts.length);
  });

  test("no question has duplicate option strings within itself", () => {
    questions.forEach((q) => {
      const unique = new Set(q.options);
      expect(unique.size).toBe(
        q.options.length
      );
    });
  });

  test("correctIndex is not consistently 0 for all questions (not a trivial dataset)", () => {
    // If every answer is option 0 the quiz would be trivially solvable —
    // verify at least two different correctIndex values exist across the set.
    const indices = new Set(questions.map((q) => q.correctIndex));
    expect(indices.size).toBeGreaterThanOrEqual(2);
  });

  test("explanations are at least 20 characters (1–2 full sentences)", () => {
    questions.forEach((q) => {
      expect(q.explanation.length).toBeGreaterThanOrEqual(20);
    });
  });
});
