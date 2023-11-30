import { useState } from 'react';

export function useTrackInnerWidth() {
    const [isInnerWidth, setIsInnerWidth] = useState(window.innerWidth);

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        setIsInnerWidth(width);
    });

    return isInnerWidth;
}
