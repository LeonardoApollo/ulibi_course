import { useEffect, useState } from 'react';

export function useTrackInnerWidth() {
    const [isInnerWidth, setIsInnerWidth] = useState(window.innerWidth);

    function trackWidth() {
        const width = window.innerWidth;
        setIsInnerWidth(width);
    }

    useEffect(() => {
        window.addEventListener('resize', trackWidth);
        return () => {
            window.removeEventListener('resize', trackWidth);
        };
    }, []);

    return isInnerWidth;
}
