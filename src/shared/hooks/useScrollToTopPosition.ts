import { useEffect, useState } from 'react';

export function useScrollToTopPosition() {
    const windowHeight = window.innerHeight;
    const [isScrollPosition, setIsScrollPosition] = useState(false);

    function scrollPosition() {
        const { scrollY } = window;
        if (windowHeight < scrollY) {
            setIsScrollPosition(true);
        } else {
            setIsScrollPosition(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollPosition);
        return () => {
            window.removeEventListener('scroll', scrollPosition);
        };
    });

    return isScrollPosition;
}
