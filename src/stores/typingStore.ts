import { create } from "zustand";

const useTypingStore = create((set, get) => ({
  // Core values
  targetText: "",
  userInput: "",

  // Validation variables
  isComplete: false,

  // Actions
  updateInput: (input) => {},
  initializeTest: (text) => {},
  resetTest: () => {},
}));
