import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

export const Error: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#1C1C3A]">
            <Header />
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
                <div className="max-w-md w-full text-center">
                    <div className="mb-8">
                        <div className="text-[#f6ba02] text-6xl mb-4">⚠️</div>
                    </div>
                    <h1 className="text-3xl font-libre-bodoni text-[#f6ba02] mb-4">
                        Oops! Something went wrong
                    </h1>
                    <p className="text-gray-300 font-playfair mb-8">
                        We encountered an error while generating your astrology report.
                        Please try again later or contact support if the problem persists.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#4268a5] hover:bg-[#355694] text-white font-libre-bodoni px-6 py-3 rounded-full transition-all duration-300"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}; 