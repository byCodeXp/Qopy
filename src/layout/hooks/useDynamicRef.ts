import { useEffect, useRef } from 'react';

export const useDynamicRef = <T>(value: T) => {
    const ref = useRef<T>(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref;
};
