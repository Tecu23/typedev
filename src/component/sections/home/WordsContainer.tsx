import { useEffect, useRef, useMemo, useCallback } from "react";

import { VariableSizeList as List } from "react-window";

import Cursor from "../../ui/Cursor";

const WORD_HEIGHT = 50; // Line height from your CSS
const CONTAINER_HEIGHT = 300; // Container height from your CSS

const WordsContainer = ({ words, typed }: { words: string; typed: string }) => {
    const listRef = useRef<List>(null);
    const rowHeights = useRef<{ [index: number]: number }>({});
    const containerRef = useRef<HTMLDivElement>(null);

    const typedWords = typed.split(" ");
    const generatedWords = words.split(" ");

    const currentWordIndex = typedWords.length - 1;
    const currentLetterIndex = typedWords[currentWordIndex]?.length || 0;

    const cursorPosition = {
        wordIndex: currentWordIndex,
        letterIndex: currentLetterIndex,
    };

    // Group words into rows based on container width
    const rows = useMemo(() => {
        const containerWidth = 768 - 64; // max-w-3xl minus margins
        const wordSpacing = 32; // gap-x-8 in pixels
        const avgCharWidth = 24; // Approximate for text-4xl

        const rows: Array<{ words: Array<{ word: string; index: number }>; startIndex: number }> = [];
        let currentRow: Array<{ word: string; index: number }> = [];
        let currentRowWidth = 0;
        let currentRowStartIndex = 0;

        generatedWords.forEach((word, index) => {
            const wordWidth = word.length * avgCharWidth;

            if (
                currentRowWidth + wordWidth + (currentRow.length > 0 ? wordSpacing : 0) > containerWidth &&
                currentRow.length > 0
            ) {
                rows.push({ words: currentRow, startIndex: currentRowStartIndex });
                currentRow = [{ word, index }];
                currentRowWidth = wordWidth;
                currentRowStartIndex = index;
            } else {
                currentRow.push({ word, index });
                currentRowWidth += wordWidth + (currentRow.length > 1 ? wordSpacing : 0);
            }
        });

        if (currentRow.length > 0) {
            rows.push({ words: currentRow, startIndex: currentRowStartIndex });
        }

        return rows;
    }, [generatedWords]);

    // Find which row contains the cursor
    const cursorRowIndex = useMemo(() => {
        return rows.findIndex((row) => row.words.some(({ index }) => index === cursorPosition.wordIndex));
    }, [rows, cursorPosition.wordIndex]);

    // Scroll to cursor position when it changes
    useEffect(() => {
        if (listRef.current && cursorRowIndex >= 0) {
            listRef.current.scrollToItem(cursorRowIndex, "center");
        }
    }, [cursorRowIndex]);

    const getRowHeight = useCallback((index: number) => {
        return rowHeights.current[index] || WORD_HEIGHT;
    }, []);

    const setRowHeight = useCallback((index: number, height: number) => {
        if (rowHeights.current[index] !== height) {
            rowHeights.current[index] = height;
            if (listRef.current) {
                listRef.current.resetAfterIndex(index);
            }
        }
    }, []);

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const rowRef = useRef<HTMLDivElement>(null);
        const row = rows[index];

        useEffect(() => {
            if (rowRef.current) {
                const height = rowRef.current.getBoundingClientRect().height;
                setRowHeight(index, height);
            }
        }, [index, typed]);

        return (
            <div style={style}>
                <div ref={rowRef} className="flex flex-wrap gap-x-8">
                    {row.words.map(({ word, index: wordIndex }) => (
                        <Word
                            key={`${word}_${wordIndex}`}
                            word={word}
                            typedWord={typedWords[wordIndex]}
                            cursorPosition={cursorPosition}
                            wordIndex={wordIndex}
                            isLast={wordIndex === typedWords.length - 1}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div ref={containerRef} className="mx-8 w-[768px] relative overflow-hidden h-[300px]">
            <List
                style={{
                    overflow: "hidden",
                }}
                ref={listRef}
                height={CONTAINER_HEIGHT}
                itemCount={rows.length}
                itemSize={getRowHeight}
                width="100%"
                overscanCount={2}
            >
                {Row}
            </List>
        </div>
    );
};

const Word = ({
    word,
    typedWord = null,
    isLast,
    cursorPosition,
    wordIndex,
}: {
    word: string;
    typedWord: string | null;
    wordIndex: number;
    cursorPosition: { wordIndex: number; letterIndex: number };
    isLast: boolean;
}) => {
    const tmpLetters: React.JSX.Element[] = [];
    const generatedLetters = word.split("");
    const typedLetters = typedWord == null ? [] : typedWord.split("");

    let i: number;

    for (i = 0; i < generatedLetters.length; i++) {
        let className = "";
        if (typedWord == null || (typedWord === "" && isLast)) {
            className = "text-untyped";
        } else {
            if (typedLetters[i] != null) {
                if (generatedLetters[i] == typedLetters[i]) {
                    className = "text-foreground";
                } else {
                    className = "text-error";
                }
            } else {
                if (isLast) {
                    className = "text-untyped";
                } else {
                    className = "text-error";
                }
            }
        }

        if (cursorPosition.wordIndex === wordIndex && 0 === cursorPosition.letterIndex && i === 0) {
            tmpLetters.push(<Cursor key="cursor" />);
        }

        tmpLetters.push(
            <span key={`${word}_${wordIndex}_${generatedLetters[i]}_${i}`} className={className}>
                {generatedLetters[i]}
            </span>,
        );

        if (cursorPosition.wordIndex === wordIndex && i === cursorPosition.letterIndex - 1) {
            tmpLetters.push(<Cursor key="cursor" />);
        }
    }

    if (i < typedLetters.length) {
        for (i = i + 0; i < typedLetters.length; i++) {
            const show_cursor = cursorPosition.wordIndex === wordIndex && i === cursorPosition.letterIndex - 1;

            tmpLetters.push(
                <span key={`${word}_${wordIndex}_${typedLetters[i]}_${i}`} className="text-error-space">
                    {typedLetters[i]}
                </span>,
            );

            if (show_cursor) {
                tmpLetters.push(<Cursor key="cursor" />);
            }
        }
    }

    return (
        <div key={`${word}_${wordIndex}`} className="word text-4xl leading-[50px]">
            {tmpLetters}
        </div>
    );
};

export default WordsContainer;
