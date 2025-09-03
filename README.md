# Monkeytype Clone - React Typing Test Application

A feature-rich clone of [Monkeytype](https://monkeytype.com) built with React,
TypeScript, and Vite. This project recreates the popular typing test experience
with modern web technologies and a clean architecture.

![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 🐵 About This Project

This is a React-based implementation of Monkeytype, the popular minimalist typing
test website. Built as a learning project and technical demonstration, it aims to
replicate the core functionality and smooth user experience of the original while
exploring modern React patterns and performance optimizations.

### Why a Clone?

- **Learning Purpose**: Demonstrates advanced React patterns, state management,
  and performance optimization
- **Technical Challenge**: Recreating smooth typing mechanics and real-time statistics
- **Portfolio Project**: Showcases full-stack development skills
- **Open Source**: Provides a foundation for customization and experimentation

## ✨ Features

### Core Monkeytype Features Implemented

#### Test Modes

- **Time Mode** - 15, 30, 60, 120 seconds options
- **Words Mode** - 10, 25, 50, 100, 200 words options
- **Quote Mode** - Type famous quotes (coming soon)
- **Zen Mode** - Endless typing practice
- **Custom Mode** - Set your own parameters

#### Typing Experience

- **Smooth Caret** - Fluid cursor animations
- **Live WPM** - Real-time speed calculation
- **Live Accuracy** - Instant accuracy feedback
- **Error Handling** - Visual feedback for mistakes
- **Word Highlighting** - Current word emphasis

#### Statistics & Results

- **WPM Chart** - Speed progression over time
- **Raw vs Corrected WPM** - Detailed speed metrics
- **Accuracy Percentage** - Character-level precision
- **Consistency Score** - Typing rhythm analysis
- **Character Breakdown** - Correct/Incorrect/Extra/Missed

### Technical Features

- **Visual Engine** - Custom rendering system for optimal performance
- **Keyboard Input Pipeline** - Advanced input processing and normalization
- **State Management** - Zustand for efficient state updates
- **Responsive Design** - Mobile-friendly layout with Tailwind CSS
- **Performance Optimized** - 60 FPS typing experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/monkeytype-clone.git
cd monkeytype-clone

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

## 🏗️ Project Architecture

### Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite for lightning-fast HMR
- **State Management**: Zustand with Immer
- **Styling**: Tailwind CSS
- **Charts**: Highcharts for statistics
- **Animations**: Motion for smooth transitions
- **Icons**: Lucide React

### Project Structure

```text
src/
├── components/
│   ├── App.tsx                 # Main application shell
│   ├── TypingTest.tsx          # Core typing test container
│   ├── WordsContainer.tsx      # Word display and management
│   ├── Timer.tsx               # Countdown timer
│   ├── Results.tsx             # Results screen
│   ├── TestConfig.tsx          # Mode and settings selector
│   └── navigation/             # Header/Footer
├── hooks/
│   ├── useVisualEngine.ts      # Visual rendering engine
│   ├── useTypingInput.ts       # Input processing
│   ├── useKeyboardInput.ts     # Keyboard event handling
│   └── useWords.ts             # Word generation
├── store/
│   └── typingStore.ts          # Global state management
├── types/
│   ├── common.ts               # Shared types
│   ├── game.ts                 # Game logic types
│   └── store.ts                # Store types
└── utils/
    └── words.ts                # Word list utilities
```

## 🎮 How It Works

### Visual Engine System

The heart of the smooth typing experience is the custom visual engine that:

1. **Manages DOM References** - Efficiently tracks character and word elements
2. **Updates Visual State** - Handles cursor movement and character highlighting
3. **Optimizes Rendering** - Batches DOM updates for performance
4. **Handles Edge Cases** - Manages word wrapping, overflow, and corrections

### Input Processing Pipeline

```text
Keyboard Event → Input Hook → Normalization → Visual Update → State Update
```

1. **Capture** - Raw keyboard events captured
2. **Process** - Handle special keys (backspace, space)
3. **Validate** - Check against expected characters
4. **Update** - Trigger visual and state changes
5. **Calculate** - Update statistics in real-time

### State Management Architecture

Using Zustand for centralized state:

```typescript
interface TypingStore {
  // Configuration
  config: TestConfig;

  // Game State
  status: "idle" | "typing" | "finished";
  wordList: string[];
  currentWordIndex: number;

  // Performance
  keystrokeHistory: Keystroke[];
  liveStats: LiveStats;
  finalStats: FinalStats;

  // Actions
  startTest: () => void;
  finishTest: () => void;
  addKeystroke: (keystroke) => void;
}
```

## 🎯 Monkeytype Feature Comparison

### Implemented Features ✅

- Time and words modes
- Live WPM/accuracy
- Smooth caret animation
- Result statistics
- Restart functionality (Tab)
- Responsive design
- Custom time/word counts

### In Progress 🚧

- Quote mode
- Theme customization
- Language selection
- Punctuation/numbers/capitals toggles
- Custom word lists
- Leaderboards

### Planned Features 📋

- Account system
- Personal bests
- Multiplayer races
- Advanced statistics
- Command palette
- Settings persistence

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run type-check # TypeScript type checking
```

### Key Development Features

- **Hot Module Replacement** - Instant updates without refresh
- **TypeScript Strict Mode** - Maximum type safety
- **ESLint Configuration** - Consistent code style
- **React Strict Mode** - Identify potential problems

### Performance Considerations

- **Memoization** - Strategic use of useMemo/useCallback
- **Virtual Scrolling** - Efficient rendering of long texts
- **Batch Updates** - Group DOM mutations
- **Debouncing** - Throttle statistics calculations

## 🤝 Contributing

Contributions are welcome! This is a learning project and community improvements
are encouraged.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Ideas

- Add missing Monkeytype features
- Improve performance
- Add new test modes
- Enhance accessibility
- Write tests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 🙏 Acknowledgments

- **[Monkeytype](https://monkeytype.com)** - The original typing test that
  inspired this clone
- **React Team** - For the amazing framework
- **Vite Team** - For the blazing fast build tool
- **Community** - For feedback and contributions

## ⚠️ Disclaimer

This is an educational clone project created for learning purposes. It is not
affiliated with or endorsed by the original Monkeytype. If you enjoy typing tests,
please visit and support the original [Monkeytype](https://monkeytype.com).

## 🔗 Links

- [Original Monkeytype](https://monkeytype.com)
- [Monkeytype GitHub](https://github.com/monkeytypegame/monkeytype)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## 📈 Project Status

This project is actively maintained and under development. Check
the [Issues](https://github.com/yourusername/monkeytype-clone/issues) page for
current bugs and feature requests.

### Recent Updates

- Implemented core typing mechanics
- Added visual engine for smooth animations
- Integrated Zustand state management
- Created responsive layout with Tailwind
- Added basic statistics and charts

### Coming Soon

- Theme system with dark/light modes
- More comprehensive statistics
- Settings persistence
- Improved mobile experience
- Test history tracking
