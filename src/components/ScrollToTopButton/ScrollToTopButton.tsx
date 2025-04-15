import React from 'react';
import { ChevronUp } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const ScrollToTopButton: React.FC = () => {
    const { showButton, scrollToTop } = useScrollToTop();

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 w-12 h-12 bg-[#4268a5] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#355694] transition-all duration-300 hover:scale-110 z-50 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
        >
            <ChevronUp className="w-6 h-6" />
        </button>
    );
}; 