import { useEffect, useState } from 'react';

// /. imports

function useDebounce(value: string, delay: number): any {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
