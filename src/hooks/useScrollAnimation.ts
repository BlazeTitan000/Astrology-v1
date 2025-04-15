import { useEffect, useRef } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in-view');
                        // Remove the observer after animation is triggered
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Add initial animation classes
        element.classList.add('animate-on-scroll');

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return elementRef;
}; 