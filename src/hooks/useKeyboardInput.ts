/**
 * Low-level keyboard input hook
 * Handles raw keyboard events and provides cleaned input stream
 */

import { useEffect, useCallback } from "react";

interface KeyboardEvent {
  key: string;
  code: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  timestamp: number;
  type: "keydown" | "keyup";
}

interface UseKeyboardInputOptions {
  preventDefault?: boolean;
  capture?: boolean;
  disabled?: boolean;
  allowedKeys?: string[] | null; // null means all keys allowed
  blockedKeys?: string[];
}

export const useKeyboardInput = (onKeyEvent: (event: KeyboardEvent) => void, options: UseKeyboardInputOptions = {}) => {
  const {
    preventDefault = true,
    capture = true,
    disabled = false,
    allowedKeys = null,
    blockedKeys = ["Tab", "Alt", "Meta", "Control"],
  } = options;

  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (disabled) return;

      // Check if key is blocked
      if (blockedKeys.includes(e.key)) return;

      // Check if key is in allowed list (if specified)
      if (allowedKeys && !allowedKeys.includes(e.key)) return;

      // Prevent default for certain keys
      if (preventDefault) {
        // Always prevent Tab to avoid focus loss
        if (e.key === "Tab") {
          e.preventDefault();
        }

        // Prevent backspace from navigation back
        if ((e.key === "Backspace" && !e.target) || (e.target as HTMLElement).tagName !== "INPUT") {
          e.preventDefault();
        }
      }

      onKeyEvent({
        key: e.key,
        code: e.code,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        timestamp: Date.now(),
        type: "keydown",
      });
    },
    [disabled, preventDefault, allowedKeys, blockedKeys],
  );

  const handleKeyUp = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (disabled) return;

      onKeyEvent({
        key: e.key,
        code: e.code,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        timestamp: Date.now(),
        type: "keyup",
      });
    },
    [disabled, onKeyEvent],
  );

  useEffect(() => {
    if (disabled) return;

    const options = { capture };

    window.addEventListener("keydown", handleKeyDown, options);
    window.addEventListener("keyup", handleKeyUp, options);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, options);
      window.removeEventListener("keyup", handleKeyUp, options);
    };
  }, [disabled, capture, handleKeyDown, handleKeyUp]);
};
