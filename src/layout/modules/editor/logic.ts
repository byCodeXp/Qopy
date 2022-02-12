import { useEffect } from 'react';
import { EditorModuleProps } from '.';
import { useDynamicRef } from '../../hooks/useDynamicRef';
import { useReferenceState } from '../../hooks/useReferenceState';
import { keysEventHandler } from './keysEventHandler';

export const EditorModuleLogic = (props: EditorModuleProps) => {

    const [lines, setLines, linesRef] = useReferenceState<Array<string>>([]);

    const [currentLine, setCurrentLine, currentLineRef] = useReferenceState(0);

    const [currentPosition, setCurrentPosition, currentPositionRef] = useReferenceState(0); 

    const activeRef = useDynamicRef(props.active);

    const calcYposition = currentLine * 20;
    const calcXposition = currentPosition * 8.41 - 2;


    const handleEventKeyDown = (event: KeyboardEvent) => {

        if (!activeRef.current) {
            return;
        }

        keysEventHandler(
            event,
            linesRef.current,
            setLines,
            currentLineRef.current,
            setCurrentLine,
            currentPositionRef.current,
            setCurrentPosition
        );
    };

    useEffect(() => {
        
        if (props.initialValue) {
            setLines(props.initialValue.split('\n'));
        } else {
            setLines(['']);
        }

        
        
        window.addEventListener('keydown', handleEventKeyDown);

        return () => window.removeEventListener('keydown', handleEventKeyDown);
    }, []);

    return {
        lines,
        cursor: {
            X: calcXposition,
            Y: calcYposition
        }
    };
};
