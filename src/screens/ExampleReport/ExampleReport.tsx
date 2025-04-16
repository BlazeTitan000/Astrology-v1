import React, { useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ScrollToTopButton } from '../../components/ScrollToTopButton/ScrollToTopButton';

export const ExampleReport: React.FC = () => {
    const sectionRef = useScrollAnimation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#1C1C3A]">
            <Header />
            <section ref={sectionRef} className="pt-24 pb-24 text-white px-4 sm:px-6 pb-24 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center font-libre-bodoni">Sample Astrological Reading</h1>

                    <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                        <iframe
                            src="/sample.pdf"
                            className="w-full h-[80vh] rounded-lg"
                            title="Sample Astrology Report"
                        />
                    </div>
                </div>
            </section>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}; 