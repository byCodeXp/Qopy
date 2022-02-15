export interface CodeEditorController {
    moveLeft: () => void;
    moveRight: () => void;
    moveUp: () => void;
    moveDown: () => void;
    eraseBefore: () => void;
    eraseAfter: () => void;
    newLine: () => void;
}

function clone<T>(object: T) {
    if (Array.isArray(object)) {
        return Object.assign([''], object);
    } else {
        return Object.assign({}, object);
    }
}

export const useCodeEditorController = (
    codeLinesRef: React.MutableRefObject<string[]>,
    setCodeLines: React.Dispatch<React.SetStateAction<string[]>>,
    cursorPositionRef: React.MutableRefObject<{ X: number; Y: number }>,
    setCursorPosition: React.Dispatch<React.SetStateAction<{ X: number; Y: number }>>
): CodeEditorController => {
    return {
        moveLeft() {
            const cursorPosition = clone(cursorPositionRef.current);

            if (cursorPosition.X > 0) {
                cursorPosition.X--;
            } else if (cursorPosition.Y > 0) {
                cursorPosition.X = codeLinesRef.current[cursorPosition.Y - 1].length;
                cursorPosition.Y--;
            }

            setCursorPosition(cursorPosition);
        },
        moveRight() {
            const cursorPosition = clone(cursorPositionRef.current);

            const currentCodeLine = codeLinesRef.current[cursorPosition.Y];

            if (cursorPosition.X < currentCodeLine.length) {
                cursorPosition.X++;
            } else if (cursorPosition.Y + 1 < codeLinesRef.current.length) {
                cursorPosition.X = 0;
                cursorPosition.Y++;
            }

            setCursorPosition(cursorPosition);
        },
        moveUp() {
            const cursorPosition = clone(cursorPositionRef.current);

            if (cursorPosition.Y > 0) {
                cursorPosition.Y--;

                const prevLine = codeLinesRef.current[cursorPosition.Y];

                if (cursorPosition.X > prevLine.length) {
                    cursorPosition.X = prevLine.length;
                }
            }

            setCursorPosition(cursorPosition);
        },
        moveDown() {
            const cursorPosition = clone(cursorPositionRef.current);

            if (cursorPosition.Y + 1 < codeLinesRef.current.length) {
                cursorPosition.Y++;

                const nextLine = codeLinesRef.current[cursorPosition.Y];

                if (cursorPosition.X > nextLine.length) {
                    cursorPosition.X = nextLine.length;
                }
            }

            setCursorPosition(cursorPosition);
        },
        eraseBefore() {
            const cursorPosition = clone(cursorPositionRef.current);
            let lines = clone(codeLinesRef.current);

            if (cursorPosition.X === 0) {
                if (cursorPosition.Y > 0) {
                    const prepareLine = lines[cursorPosition.Y - 1] + lines[cursorPosition.Y];

                    lines = [
                        ...lines.slice(0, cursorPosition.Y - 1),
                        prepareLine,
                        ...lines.slice(cursorPosition.Y + 1)
                    ];

                    cursorPosition.X = codeLinesRef.current[cursorPosition.Y - 1].length;
                    cursorPosition.Y--;
                }
            } else {
                const prepareLine =
                    lines[cursorPosition.Y].substring(0, cursorPosition.X - 1) +
                    lines[cursorPosition.Y].substring(cursorPosition.X);

                lines = [
                    ...lines.slice(0, cursorPosition.Y),
                    prepareLine,
                    ...lines.slice(cursorPosition.Y + 1)
                ];

                cursorPosition.X--;
            }

            setCodeLines(lines);
            setCursorPosition(cursorPosition);
        },
        eraseAfter() {
            const cursorPosition = clone(cursorPositionRef.current);
            let lines = clone(codeLinesRef.current);

            const currentCodeLine = lines[cursorPosition.Y];

            if (cursorPosition.X === currentCodeLine.length) {
                if (cursorPosition.Y + 1 < lines.length) {
                    const prepareLine = currentCodeLine + lines[cursorPosition.Y + 1];

                    lines = [
                        ...lines.slice(0, cursorPosition.Y),
                        prepareLine,
                        ...lines.slice(cursorPosition.Y + 2)
                    ];
                }
            } else {
                const prepareLine =
                    currentCodeLine.substring(0, cursorPosition.X) +
                    currentCodeLine.substring(cursorPosition.X + 1);

                lines = [
                    ...lines.slice(0, cursorPosition.Y),
                    prepareLine,
                    ...lines.slice(cursorPosition.Y + 1)
                ];
            }

            setCodeLines(lines);
        },
        newLine() {
            const cursorPosition = clone(cursorPositionRef.current);
            let lines = clone(codeLinesRef.current);

            const currentCodeLine = lines[cursorPosition.Y];

            if (currentCodeLine.length > 0) {
                if (cursorPosition.X === 0) {
                    lines = [...lines.slice(0, cursorPosition.Y), '', ...lines.slice(cursorPosition.Y)];
                } else if (cursorPosition.X === currentCodeLine.length) {
                    lines = [
                        ...lines.slice(0, cursorPosition.Y + 1),
                        '',
                        ...lines.slice(cursorPosition.Y + 1)
                    ];
                } else {

                    lines = [
                        ...lines.slice(0, cursorPosition.Y),
                        currentCodeLine.substring(0, cursorPosition.X),
                        currentCodeLine.substring(cursorPosition.X),
                        ...lines.slice(cursorPosition.Y + 1)
                    ];
                }
            } else {
                lines = [...lines.slice(0, cursorPosition.Y), '', ...lines.slice(cursorPosition.Y)];
            }
            
            setCodeLines(lines);

            cursorPosition.X = 0;
            cursorPosition.Y++;

            setCursorPosition(cursorPosition);
        }
    };
};
