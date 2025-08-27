/**
 * Low-level keyboard input hook
 * Handles raw keyboard events and provides cleaned input stream
 */

import { useEffect, useRef, useCallback, useState } from "react";

interface KeyboardInputOptions {
  preventDefault?: boolean;
  allowedKeys?: RegExp;
  blockedKeys?: string[];
  captureModifiers?: boolean;
}

interface KeyEvent {
  key: string;
  code: string;
  timestamp: number;
  modifiers: {
    ctrl: boolean;
    alt: boolean;
  };
}
