import React from 'react';
import Lottie from 'lottie-react';
import writingAnimation from '../../assets/animation/writing-animation.json';
import waitingAnimation from '../../assets/animation/waiting.json';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const Loading: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1C1C3A] to-[#131325] text-white">
            <Header />

            <main className="flex-grow flex items-center justify-center px-6 py-16">

                <div className="w-full max-w-3xl text-center">
                    <div className=" ">
                    </div>
                    <div className="mb-8">
                        <Lottie
                            animationData={writingAnimation}
                            loop
                            className="w-48 h-48 mx-auto drop-shadow-xl"
                        />
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-libre-bodoni text-[#f6ba02] mb-4 leading-tight">
                        Crafting Your Personalized Report
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-300 font-playfair mb-10 max-w-2xl mx-auto leading-relaxed">
                        We're diving deep into your birth chart details using advanced astrological algorithms.
                        Sit tight — your report will be ready shortly.
                    </p>

                    <div className="flex justify-center">
                        <Lottie
                            animationData={waitingAnimation}
                            loop
                            className="w-28 h-28 opacity-80"
                        />
                    </div>

                    <p className="mt-6 text-sm text-gray-500 italic">
                        This usually takes less than a minute.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};
