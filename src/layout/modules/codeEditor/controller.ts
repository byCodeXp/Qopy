export interface CodeEditorController {
    moveLeft: () => void;
    moveRight: () => void;
}

export const useCodeEditorController = (
    codeLinesRef: React.MutableRefObject<string[]>,
    setCodeLines: React.Dispatch<React.SetStateAction<string[]>>,
    cursorPositionRef: React.MutableRefObject<{ X: number; Y: number }>,
    setCursorPosition: React.Dispatch<React.SetStateAction<{ X: number; Y: number }>>
): CodeEditorController => {
    return {
        moveLeft() {
            if (cursorPositionRef.current.X > 0) {
                setCursorPosition({
                    X: cursorPositionRef.current.X - 1,
                    Y: cursorPositionRef.current.Y
                });
            } else if (cursorPositionRef.current.Y > 0) {
                const calcX = codeLinesRef.current[cursorPositionRef.current.Y - 1].length;
                setCursorPosition({ X: calcX, Y: cursorPositionRef.current.Y - 1 });
            }
        },
        moveRight() {
            const currentCodeLine = codeLinesRef.current[cursorPositionRef.current.Y];

            if (cursorPositionRef.current.X < currentCodeLine.length) {
                setCursorPosition({
                    X: cursorPositionRef.current.X + 1,
                    Y: cursorPositionRef.current.Y
                });
            } else if (cursorPositionRef.current.Y + 1 < codeLinesRef.current.length) {
                setCursorPosition({ X: 0, Y: cursorPositionRef.current.Y + 1 });
            }
        }
    };
};
