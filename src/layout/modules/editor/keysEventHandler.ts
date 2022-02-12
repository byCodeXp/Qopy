
export const keysEventHandler = (
    event: KeyboardEvent,
    lines: string[],
    setLines: React.Dispatch<React.SetStateAction<string[]>>,
    currentLineNumber: number,
    setCurrentLine: React.Dispatch<React.SetStateAction<number>>,
    currentPositionNumber: number,
    setCurrentPosition: React.Dispatch<React.SetStateAction<number>>
) => {

    const currentLineContent = lines[currentLineNumber];

    switch (event.code) {
        case 'ArrowUp': {
            if (currentLineNumber > 0) {
                setCurrentLine((prev) => prev - 1);

                if (currentPositionNumber > lines[currentLineNumber - 1].length) {
                    setCurrentPosition(lines[currentLineNumber - 1].length);
                }
            }
            break;
        }
        case 'ArrowDown': {
            if (currentLineNumber + 1 < lines.length) {
                setCurrentLine((prev) => prev + 1);
                if (currentPositionNumber > lines[currentLineNumber + 1].length) {
                    setCurrentPosition(lines[currentLineNumber + 1].length);
                }
            }
            break;
        }
        case 'ArrowLeft': {
            if (currentPositionNumber > 0) {
                setCurrentPosition((prev) => prev - 1);
            } else if (currentLineNumber > 0) {
                setCurrentLine((prev) => prev - 1);
                setCurrentPosition(lines[currentLineNumber - 1].length);
            }
            break;
        }
        case 'ArrowRight': {
            if (currentPositionNumber < currentLineContent.length) {
                setCurrentPosition((prev) => prev + 1);
            } else if (currentLineNumber + 1 < lines.length) {
                setCurrentLine((prev) => prev + 1);
                setCurrentPosition(0);
            }
            break;
        }
        case 'ShiftLeft': {
            break;
        }
        case 'ShiftRight': {
            break;
        }
        case 'Space': {
            const tmpLine = currentLineContent.slice(0, currentPositionNumber) + ' ' + currentLineContent.slice(currentPositionNumber);

            setLines([...lines.slice(0, currentLineNumber), tmpLine, ...lines.slice(currentLineNumber + 1)]);
            setCurrentPosition((prev) => prev + 1);
            break;
        }
        case 'Tab': {
            const tmpLine = currentLineContent.slice(0, currentPositionNumber) + '   ' + currentLineContent.slice(currentPositionNumber);

            setLines([...lines.slice(0, currentLineNumber), tmpLine, ...lines.slice(currentLineNumber + 1)]);
            setCurrentPosition((prev) => prev + 3);
            break;
        }
        case 'Backspace': {
            if (currentPositionNumber === 0) {
                if (currentLineNumber > 0) {
                    const prepareLine = lines[currentLineNumber - 1] + currentLineContent;

                    setLines([
                        ...lines.slice(0, currentLineNumber - 1),
                        prepareLine,
                        ...lines.slice(currentLineNumber + 1)
                    ]);
                    setCurrentLine((prev) => prev - 1);
                    setCurrentPosition(lines[currentLineNumber - 1].length);
                }
            } else {
                const prepareLine =
                    currentLineContent.substring(0, currentPositionNumber - 1) + currentLineContent.substring(currentPositionNumber);

                setLines([
                    ...lines.slice(0, currentLineNumber),
                    prepareLine,
                    ...lines.slice(currentLineNumber + 1)
                ]);
                setCurrentPosition((prev) => prev - 1);
            }
            break;
        }
        case 'Enter': {
            let result: Array<string> = lines;

            if (currentLineContent.length > 0) {
                if (currentPositionNumber === 0) {
                    // before

                    result = [...lines.slice(0, currentLineNumber), '', ...lines.slice(currentLineNumber)];
                } else if (currentPositionNumber === currentLineContent.length) {
                    // after
                    result = [...lines.slice(0, currentLineNumber + 1), '', ...lines.slice(currentLineNumber + 1)];
                } else {
                    // middle
                    result = [
                        ...lines.slice(0, currentLineNumber),
                        currentLineContent.substring(0, currentPositionNumber),
                        currentLineContent.substring(currentPositionNumber),
                        ...lines.slice(currentLineNumber + 1)
                    ];
                }
            } else {
                result = [...lines.slice(0, currentLineNumber), '', ...lines.slice(currentLineNumber)];
            }

            setLines(result);
            setCurrentLine((prev) => prev + 1);
            setCurrentPosition(0);

            break;
        }
        default: {
            const alphabet = 'qwertyuiopasdfghjklzxcvbnm0123456789!@#$%^&*()_+=-{}[]:;\'"|\\/<>?.,~`';

            if (!alphabet.toLowerCase().includes(event.key.toLowerCase())) return;

            const result =
                currentLineContent.slice(0, currentPositionNumber) + event.key + currentLineContent.slice(currentPositionNumber);

            setLines([...lines.slice(0, currentLineNumber), result, ...lines.slice(currentLineNumber + 1)]);
            setCurrentPosition((prev) => prev + 1);
        }
    }
};
