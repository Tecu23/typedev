export interface UseVisualEngineOptions {
  enabled?: boolean;
  onTestComplete?: () => void;
  onError?: (error: Error) => void;
}

export interface VisualEngineState {
  currentWordIndex: number;
  currentCharIndex: number;
  inputBuffer: string;
  isInitialized: boolean;
}
