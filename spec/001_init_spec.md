# MonkeyType Clone - Technical Specification Document

## 1. Project Overview

### Goal

A high-performance, React-based typing test application that provides users with an accurate assessment of their typing speed and accuracy. The application targets typists of all skill levels, from beginners seeking to improve their typing skills to professionals benchmarking their performance. The platform delivers real-time feedback, comprehensive statistics, and a distraction-free testing environment.

### Key Features

- Real-time typing speed measurement with Words Per Minute (WPM) calculation
- Character-level accuracy tracking with visual feedback for correct/incorrect inputs
- Multiple test modes (time-based: 15s, 30s, 60s, 120s; word-based: 10, 25, 50, 100 words)
- Live statistics display during typing sessions
- Comprehensive results analysis with error breakdown
- Customizable test settings (punctuation, numbers, stop on error mode)
- Responsive design optimized for desktop and mobile devices
- Keyboard shortcut support for test control (Tab to restart, Escape to stop)
- Historical performance tracking with local storage persistence
- Dark/light theme support

## 2. Core Components & User Interface (UI)

### App (Main Container)

The root component serves as the application's orchestrator, managing global state, theme preferences, and component composition.

**Responsibilities:**

- Initialize and manage global application state through Context API
- Handle theme switching between dark and light modes
- Coordinate data flow between child components
- Manage keyboard shortcuts at the application level
- Persist user preferences to local storage

**State Management:**

- Current theme preference
- User settings configuration
- Historical test results
- Active test session data

### TypingTest

The central component orchestrating the typing test experience, managing test flow, and coordinating between input handling and display components.

**State:**

```javascript
{
  testStatus: 'idle' | 'active' | 'completed',
  testMode: { type: 'time' | 'words', value: number },
  generatedWords: string[],
  currentWordIndex: number,
  currentCharIndex: number,
  userInput: string,
  typedHistory: Array<{ word: string, typed: string, correct: boolean }>,
  startTime: number | null,
  endTime: number | null,
  totalCharactersTyped: number,
  correctCharacters: number,
  incorrectCharacters: number,
  timeRemaining: number,
  wordsCompleted: number
}
```

**Props:**

```javascript
{
  testConfiguration: {
    mode: 'time' | 'words',
    duration: number, // seconds for time mode
    wordCount: number, // for word mode
    includePunctuation: boolean,
    includeNumbers: boolean,
    stopOnError: boolean,
    difficulty: 'easy' | 'medium' | 'hard'
  },
  onTestComplete: (results: TestResults) => void,
  onTestRestart: () => void
}
```

**Methods:**

- `initializeTest()`: Generate word list and reset all counters
- `handleInput(key: string)`: Process keyboard input and update state
- `calculateWPM()`: Compute current typing speed
- `calculateAccuracy()`: Compute current accuracy percentage
- `completeTest()`: Finalize test and transition to results

### WordList

A presentational component responsible for rendering the word list with appropriate visual states for user progress and errors.

**Logic:**

- Render each word as an individual span element with character-level spans
- Apply CSS classes based on character state: pending, correct, incorrect, current
- Implement smooth scrolling to keep current word in viewport
- Handle word wrapping for responsive layouts

**Visuals:**

```css
.word-current {
  background-color: rgba(59, 130, 246, 0.1);
}
.char-correct {
  color: #10b981;
}
.char-incorrect {
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
}
.char-pending {
  color: #6b7280;
}
.cursor {
  animation: blink 1s infinite;
  border-left: 2px solid #3b82f6;
}
```

**Props:**

```javascript
{
  words: string[],
  currentWordIndex: number,
  currentCharIndex: number,
  typedHistory: Array<{ word: string, typed: string, correct: boolean }>,
  userInput: string
}
```

### InputBox

The input component capturing user keystrokes and managing input state with appropriate event handling.

**Event Handling:**

- `onKeyDown`: Capture special keys (Backspace, Space, Tab, Escape)
- `onChange`: Process character input
- `onPaste`: Prevent paste operations to maintain test integrity

**Logic:**

```javascript
const handleKeyDown = (e: KeyboardEvent) => {
  if (testStatus !== 'active' && e.key !== 'Tab') {
    startTest();
  }

  switch(e.key) {
    case 'Backspace':
      if (!stopOnError || currentCharIndex > 0) {
        handleBackspace();
      }
      break;
    case ' ':
      e.preventDefault();
      handleSpace();
      break;
    case 'Tab':
      e.preventDefault();
      restartTest();
      break;
    case 'Escape':
      stopTest();
      break;
  }
};
```

**Props:**

```javascript
{
  value: string,
  onChange: (value: string) => void,
  onKeyDown: (event: KeyboardEvent) => void,
  disabled: boolean,
  placeholder: string
}
```

### StatsDisplay

A real-time statistics component showing live metrics during the typing test.

**Data:**

- Current WPM with rolling average calculation
- Real-time accuracy percentage
- Countdown timer or elapsed time
- Words completed counter
- Characters typed counter

**Update Frequency:**

- WPM: Calculate every 500ms for smooth updates
- Accuracy: Update on every character input
- Timer: Update every 100ms for precise display

**Props:**

```javascript
{
  wpm: number,
  accuracy: number,
  timeRemaining: number | null,
  wordsCompleted: number,
  charactersTyped: number,
  testMode: { type: 'time' | 'words', value: number }
}
```

### ResultScreen

The post-test component displaying comprehensive results and performance analysis.

**Data:**

- Final WPM calculation
- Overall accuracy percentage
- Total words typed
- Character breakdown (correct/incorrect/extra)
- Error frequency analysis
- Performance graph (optional)
- Comparison with previous tests

**Actions:**

- Restart button with keyboard shortcut (Tab)
- Share results functionality
- Save to history
- Detailed error analysis modal

**Props:**

```javascript
{
  results: {
    wpm: number,
    rawWpm: number,
    accuracy: number,
    correctCharacters: number,
    incorrectCharacters: number,
    totalCharacters: number,
    duration: number,
    wordsTyped: number,
    errors: Array<{ word: string, typed: string, position: number }>
  },
  onRestart: () => void,
  previousBest: { wpm: number, accuracy: number } | null
}
```

## 3. Application Workflow & Logic

### Test Initialization

When the application loads or a new test begins:

1. **Word Generation:** Fetch or generate a pool of words based on selected difficulty and configuration
2. **State Reset:** Clear all counters, timers, and input fields
3. **UI Preparation:** Position cursor at the first character of the first word
4. **Focus Management:** Automatically focus the input field
5. **Instructions Display:** Show brief instructions if first-time user

### Typing & Character Validation

**Correct Character:**

```javascript
if (currentChar === typedChar) {
  correctCharacters++;
  currentCharIndex++;
  updateCharacterDisplay("correct", wordIndex, charIndex);
  moveCursor(wordIndex, charIndex + 1);
}
```

**Incorrect Character:**

```javascript
if (currentChar !== typedChar) {
  incorrectCharacters++;
  if (!stopOnError) {
    currentCharIndex++;
    updateCharacterDisplay("incorrect", wordIndex, charIndex);
    addToErrorList(currentWord, currentChar, typedChar);
  } else {
    blockInput();
    highlightError(wordIndex, charIndex);
  }
}
```

**Space Key:**

```javascript
const handleSpace = () => {
  const currentWord = words[currentWordIndex];
  const typedWord = userInput.trim();

  // Validate word completion
  if (typedWord.length > 0) {
    const isCorrect = currentWord === typedWord;
    recordWordCompletion(currentWord, typedWord, isCorrect);

    // Move to next word
    currentWordIndex++;
    currentCharIndex = 0;
    userInput = "";

    // Check test completion
    if (isTestComplete()) {
      completeTest();
    }
  }
};
```

**Backspace Key:**

```javascript
const handleBackspace = () => {
  if (currentCharIndex > 0) {
    currentCharIndex--;
    userInput = userInput.slice(0, -1);

    // Reset character display
    updateCharacterDisplay("pending", currentWordIndex, currentCharIndex);

    // Update statistics
    if (wasCorrect(currentWordIndex, currentCharIndex)) {
      correctCharacters--;
    } else {
      incorrectCharacters--;
    }
  } else if (currentWordIndex > 0 && allowWordNavigation) {
    // Navigate to previous word
    currentWordIndex--;
    const previousWord = typedHistory[currentWordIndex];
    userInput = previousWord.typed;
    currentCharIndex = previousWord.typed.length;
  }
};
```

### WPM & Accuracy Calculation

**WPM Formula:**

```javascript
const calculateWPM = (correctChars: number, timeInSeconds: number): number => {
  const timeInMinutes = timeInSeconds / 60;
  const words = correctChars / 5; // Standard word length
  return Math.round(words / timeInMinutes);
};

// Net WPM (accounting for errors)
const calculateNetWPM = (
  correctChars: number,
  incorrectChars: number,
  timeInSeconds: number
): number => {
  const timeInMinutes = timeInSeconds / 60;
  const netCharacters = Math.max(0, correctChars - incorrectChars);
  const words = netCharacters / 5;
  return Math.round(words / timeInMinutes);
};
```

**Accuracy Formula:**

```javascript
const calculateAccuracy = (
  correctChars: number,
  totalChars: number
): number => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100 * 10) / 10; // One decimal place
};
```

### Test Completion

Test completion triggers when:

1. **Timer expires** (time-based mode)
2. **All words typed** (word-based mode)
3. **User manually stops** (Escape key)

Completion sequence:

```javascript
const completeTest = () => {
  // 1. Stop timer
  endTime = Date.now();
  clearInterval(timerInterval);

  // 2. Calculate final statistics
  const duration = (endTime - startTime) / 1000;
  const finalWPM = calculateWPM(correctCharacters, duration);
  const finalAccuracy = calculateAccuracy(
    correctCharacters,
    totalCharactersTyped,
  );

  // 3. Prepare results object
  const results = {
    wpm: finalWPM,
    accuracy: finalAccuracy,
    duration,
    correctCharacters,
    incorrectCharacters,
    totalCharacters: totalCharactersTyped,
    wordsTyped: wordsCompleted,
    timestamp: endTime,
    testMode,
  };

  // 4. Save to history
  saveToLocalStorage(results);

  // 5. Transition to results screen
  setTestStatus("completed");
  onTestComplete(results);
};
```

## 4. State Management

### Primary State

The application utilizes React Context API for global state management with the following structure:

```javascript
const AppContext = {
  // User preferences
  preferences: {
    theme: 'dark' | 'light',
    fontSize: 'small' | 'medium' | 'large',
    smoothCaret: boolean,
    showLiveWPM: boolean,
    showLiveAccuracy: boolean
  },

  // Test configuration
  testConfig: {
    mode: 'time' | 'words',
    timeLimit: 15 | 30 | 60 | 120,
    wordCount: 10 | 25 | 50 | 100,
    language: 'english',
    includePunctuation: boolean,
    includeNumbers: boolean,
    stopOnError: boolean
  },

  // Current test session
  currentSession: {
    status: 'idle' | 'active' | 'completed',
    startTime: number | null,
    words: string[],
    progress: {
      currentWordIndex: number,
      currentCharIndex: number,
      completedWords: number
    },
    statistics: {
      correctCharacters: number,
      incorrectCharacters: number,
      wpm: number,
      accuracy: number
    }
  },

  // Historical data
  history: Array<TestResult>
};
```

### State Updates

User actions trigger state changes through dispatched actions:

```javascript
const appReducer = (state, action) => {
  switch (action.type) {
    case "START_TEST":
      return {
        ...state,
        currentSession: {
          ...initialSessionState,
          status: "active",
          startTime: Date.now(),
          words: action.payload.words,
        },
      };

    case "UPDATE_PROGRESS":
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          progress: action.payload,
          statistics: calculateStatistics(action.payload),
        },
      };

    case "COMPLETE_TEST":
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          status: "completed",
        },
        history: [...state.history, action.payload.results],
      };

    case "UPDATE_PREFERENCES":
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };
  }
};
```

### State Persistence

Local storage implementation for preserving user data:

```javascript
// Save preferences and history
const persistState = (state) => {
  localStorage.setItem(
    "typingTestPreferences",
    JSON.stringify(state.preferences),
  );
  localStorage.setItem("typingTestHistory", JSON.stringify(state.history));
};

// Load on initialization
const loadPersistedState = () => {
  const preferences = JSON.parse(
    localStorage.getItem("typingTestPreferences") || "{}",
  );
  const history = JSON.parse(localStorage.getItem("typingTestHistory") || "[]");
  return { preferences, history };
};

// Auto-save on state changes
useEffect(() => {
  persistState(state);
}, [state.preferences, state.history]);
```

## 5. Technical Specifications

### Technology Stack

**Core Framework:**

- React 18.x with functional components and hooks
- TypeScript for type safety and enhanced developer experience
- Tailwind CSS 3.x for utility-first responsive styling
- Vite for build tooling and development server

### Dependencies

**Essential Libraries:**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "clsx": "^2.0.0",
    "framer-motion": "^10.16.0",
    "react-hotkeys-hook": "^4.4.0",
    "nanoid": "^5.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "vite": "^4.4.0",
    "eslint": "^8.45.0",
    "prettier": "^3.0.0"
  }
}
```

### Code Structure

**Recommended File Organization:**

```
src/
├── components/
│   ├── App/
│   │   ├── App.tsx
│   │   ├── App.styles.css
│   │   └── App.test.tsx
│   ├── TypingTest/
│   │   ├── TypingTest.tsx
│   │   ├── TypingTest.hooks.ts
│   │   └── TypingTest.types.ts
│   ├── WordList/
│   │   ├── WordList.tsx
│   │   └── Word.tsx
│   ├── InputBox/
│   │   └── InputBox.tsx
│   ├── StatsDisplay/
│   │   └── StatsDisplay.tsx
│   └── ResultScreen/
│       └── ResultScreen.tsx
├── contexts/
│   ├── AppContext.tsx
│   └── ThemeContext.tsx
├── hooks/
│   ├── useTimer.ts
│   ├── useKeyboard.ts
│   └── useLocalStorage.ts
├── utils/
│   ├── calculations.ts
│   ├── wordGenerator.ts
│   └── validators.ts
├── data/
│   ├── words.json
│   └── languages/
├── types/
│   └── index.ts
├── styles/
│   └── globals.css
└── main.tsx
```

### Data Model

**Word List Structure:**

```json
{
  "languages": {
    "english": {
      "common": ["the", "be", "to", "of", "and", "a", "in", "that"],
      "extended": ["ability", "able", "about", "above", "accept"],
      "punctuation": ["however,", "therefore;", "can't", "won't"],
      "numbers": ["123", "2024", "100%", "$50"]
    }
  },
  "difficulty": {
    "easy": { "minLength": 2, "maxLength": 5, "commonality": 0.8 },
    "medium": { "minLength": 3, "maxLength": 8, "commonality": 0.5 },
    "hard": { "minLength": 5, "maxLength": 12, "commonality": 0.2 }
  }
}
```

**Test Results Structure:**

```typescript
interface TestResult {
  id: string;
  timestamp: number;
  mode: {
    type: "time" | "words";
    value: number;
  };
  statistics: {
    wpm: number;
    rawWpm: number;
    accuracy: number;
    consistency: number;
  };
  characters: {
    correct: number;
    incorrect: number;
    extra: number;
    missed: number;
    total: number;
  };
  duration: number;
  wordsTyped: number;
  errors: Array<{
    word: string;
    typed: string;
    position: number;
  }>;
  configuration: {
    includePunctuation: boolean;
    includeNumbers: boolean;
    stopOnError: boolean;
    language: string;
  };
}
```

**Performance Metrics:**

- Target 60 FPS during typing
- Input latency < 16ms
- Initial load time < 2 seconds
- Time to Interactive < 3 seconds
- Lighthouse score > 95

**Browser Support:**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Responsive Breakpoints:**

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

---

_This specification document serves as the authoritative reference for the MonkeyType clone implementation. All development decisions should align with the architectures and patterns defined herein._
