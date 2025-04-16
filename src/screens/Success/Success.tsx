import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import successAnimation from '../../assets/animation/success.json';
import downloadAnimation from '../../assets/animation/download.json';
import bookAnimation from '../../assets/animation/book.json';

export const Success: React.FC = () => {
    const navigate = useNavigate();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        // Get PDF URL from session storage
        const storedPdfUrl = sessionStorage.getItem('pdfUrl');
        if (storedPdfUrl) {
            setPdfUrl(storedPdfUrl);
        }
    }, []);

    const handleDownload = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.target = '_blank';
            link.download = 'astrology-report.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="min-h-screen bg-[#1C1C3A]">
            <Header />
            <div className="flex flex-col items-center justify-center min-h-[100vh] px-4  lg:translate-y-10 translate-y-15 py-8 mb-4">
                <div className="max-w-md w-full text-center">
                    <Lottie
                        animationData={successAnimation}
                        loop={true}
                        className="w-64 h-64 mx-auto"
                    />
                    <h1 className="text-3xl font-libre-bodoni text-[#f6ba02] mb-4">
                        Your Report is Ready!
                    </h1>
                    <p className="text-gray-300 font-playfair mb-8">
                        Your personalized astrology report has been generated.
                        Click the book below to download your report.
                    </p>

                    {/* Book Card */}
                    <div
                        onClick={handleDownload}
                        className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg cursor-pointer hover:bg-[rgba(40,40,70,1)] transition-all duration-300 mb-8"
                    >
                        <div className="flex items-center justify-between">
                            <Lottie
                                animationData={bookAnimation}
                                loop={true}
                                className="w-64 mx-auto"
                            />
                        </div>

                        <Lottie
                            animationData={downloadAnimation}
                            loop={true}
                            className="w-32 mx-auto"
                        />
                    </div>

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