# Gym Science Quiz App

A single-page, zero-dependency web quiz that tests your knowledge of exercise science — covering muscle physiology, nutrition & macronutrients, training principles, and recovery.

## Features

- **12 questions** across **4 topic areas**
- Immediate correct / incorrect feedback with a concise explanation after each answer
- Progress indicator ("Question X of 12") throughout the quiz
- Final score screen with a personalised result message
- Fully static — no backend, no login, no build step required

## Running the App

### Option A — Open directly in a browser

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

Or simply double-click `index.html` in your file explorer. The app works on the `file://` protocol.

### Option B — Serve locally (avoids any browser file:// restrictions)

```bash
# Python 3
python3 -m http.server 8080
# then visit http://localhost:8080
```

```bash
# Node.js (npx, no install required)
npx serve .
```

### Option C — Deploy to a static host

Drop the repo folder onto any static hosting provider:

| Provider | Command |
|---|---|
| **Netlify** | `netlify deploy --prod` |
| **Vercel** | `vercel --prod` |
| **GitHub Pages** | Push to `gh-pages` branch or configure Pages in repo settings |

## File Structure

```
gym-science-quiz-app/
├── index.html          # HTML shell — three screen containers
├── style.css           # All styles (screens, buttons, feedback states)
└── js/
    ├── questions.js    # Question data (topic, options, answer, explanation)
    └── quiz.js         # State machine + DOM rendering engine
```

## Extending the Quiz

To add or edit questions, open `js/questions.js` and follow the existing object shape:

```js
{
  topic: "Your Topic",
  question: "Your question stem?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctIndex: 0,          // 0-based index of the correct option
  explanation: "Why the answer is correct, in 1–2 sentences."
}
```

## Browser Support

Tested in Chrome, Firefox, and Safari (latest stable). No polyfills required.

---

Built by the software factory from ticket **LIN-7**.
