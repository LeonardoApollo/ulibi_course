import { useState } from 'react';

export function useScrollToTopPosition() {
    const windowHeight = window.innerHeight;
    const [isScrollPosition, setIsScrollPosition] = useState(false);

    window.addEventListener('scroll', () => {
        const { scrollY } = window;
        if (windowHeight < scrollY) {
            setIsScrollPosition(true);
        } else {
            setIsScrollPosition(false);
        }
    });

    return isScrollPosition;
}
