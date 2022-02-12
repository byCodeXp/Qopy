import { useEffect, useRef, useState } from 'react';

type ReferenceStateResult<T> = [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>];

export const useReferenceState = <T>(initial: T): ReferenceStateResult<T> => {
   
    const [state, setState] = useState<T>(initial);

    const ref = useRef<T>(state);

    useEffect(() => {
        ref.current = state;
    }, [state]);

    return [state, setState, ref];
};
