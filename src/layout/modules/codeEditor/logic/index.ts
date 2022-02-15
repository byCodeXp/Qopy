import { useEffect } from 'react';
import { CodeEditorModuleProps } from '..';
import { useReferenceState } from '../../../hooks/useReferenceState';
import { useCodeEditorController, CodeEditorController } from './controller';
import { KeyEventHandler } from './keyEventHandler';
import { Keys } from './keys';

export const CodeEditorModuleLogic = (props: CodeEditorModuleProps) => {
    const [codeLines, setCodeLines, codeLinesRef] = useReferenceState(['']);

    const [cursorPosition, setCursorPosition, cursorPositionRef] = useReferenceState({ X: 0, Y: 0 });

    const controller = useCodeEditorController(
        codeLinesRef,
        setCodeLines,
        cursorPositionRef,
        setCursorPosition
    );

    const handleKeyDown = (event: KeyboardEvent) => {

        const handler = new KeyEventHandler();

        handler.on(
            Keys.ArrowLeft,
            (controller: CodeEditorController) => {
                controller.moveLeft();
            },
            controller
        );

        handler.on(
            Keys.ArrowRight,
            (controller: CodeEditorController) => {
                controller.moveRight();
            },
            controller
        );

        handler.on(
            Keys.ArrowUp,
            (controller: CodeEditorController) => {
                controller.moveUp();
            },
            controller
        );

        handler.on(
            Keys.ArrowDown,
            (controller: CodeEditorController) => {
                controller.moveDown();
            },
            controller
        );

        handler.on(
            Keys.BackSpace,
            (controller: CodeEditorController) => {
                controller.eraseBefore();
            },
            controller
        );

        handler.on(
            Keys.Delete,
            (controller: CodeEditorController) => {
                controller.eraseAfter();
            },
            controller
        );

        handler.on(
            Keys.Enter,
            (controller: CodeEditorController) => {
                controller.newLine();
            },
            controller
        );

        handler.test(event.key);
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

    return { codeLines, cursorPosition };
};
