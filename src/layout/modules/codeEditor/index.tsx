import { useEffect } from 'react';
import { useReferenceState } from '../../hooks/useReferenceState';
import { Keys } from './keys';
import { CodeEditorController, useCodeEditorController } from './controller';
import { KeyEventHandler } from './keyEventHandler';

const Cursor = (position: { X: number; Y: number }) => {
    return (
        <div
            className="w-[2px] h-[16px] bg-[#c2c2c2] absolute left-0 m-[10px]"
            style={{ left: position.X * 8.41 - 2, top: position.Y * 20 }}
        />
    );
};

interface CodeEditorModuleProps {
    defaultValue?: string;
}

export const CodeEditorModule = (props: CodeEditorModuleProps) => {

    const [codeLines, setCodeLines, codeLinesRef] = useReferenceState(['']);

    const [cursorPosition, setCursorPosition, cursorPositionRef] = useReferenceState({ X: 0, Y: 0 });

    const controller = useCodeEditorController(codeLinesRef, setCodeLines, cursorPositionRef, setCursorPosition);

    const handleKeyDown = (event: KeyboardEvent) => {

        const hanlder = new KeyEventHandler();

        hanlder.on(Keys.ArrowLeft, (controller: CodeEditorController) => {

            controller.moveLeft();
        }, controller);

        hanlder.on(Keys.ArrowRight, (controller: CodeEditorController) => {

            controller.moveRight();
        }, controller);

        hanlder.test(event.key);
    };

    // Setup when open new instance of code editor
    useEffect(() => {

        if (props.defaultValue) {

            setCodeLines(props.defaultValue.split('\r\n'));
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {

            document.removeEventListener('keydown', handleKeyDown);
        };
        
    }, []);

    return (
        <div className="w-full h-full text-white bg-primary-color p-[8px] font-mono text-[14px] relative">
            <div>
                {codeLines.map((line, index) => (
                    <div className="h-[20px] leading-[20px] whitespace-pre-wrap" key={index}>
                        {line}
                    </div>
                ))}
                <Cursor X={cursorPosition.X} Y={cursorPosition.Y} />
            </div>
        </div>
    );
};
