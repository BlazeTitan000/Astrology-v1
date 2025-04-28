import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animation/waiting.json';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

interface BirthDetails {
    name: string;
    birthDate: string;
    birthTime: string | null;
    birthplace: string;
    email: string;
    paymentIntentId: string;
}

export const Loading = () => {
    const navigate = useNavigate();
    const requestMade = useRef(false);

    useEffect(() => {
        console.log('123123123')
    })

    useEffect(() => {
        const generateReport = async () => {
            // Prevent multiple requests
            if (requestMade.current) return;
            requestMade.current = true;

            try {
                // Get the stored birth details
                const storedDetails = sessionStorage.getItem('birthDetails');
                if (!storedDetails) {
                    navigate('/');
                    return;
                }

                const birthDetails = JSON.parse(storedDetails) as BirthDetails;
                // Generate the report
                const response = await fetch(`${import.meta.env.VITE_API_URL}/generate-astrology-report`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...birthDetails,
                        paymentIntentId: birthDetails.paymentIntentId
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to generate report');
                }

                const { pdfUrl } = await response.json();

                // Save PDF URL to session storage
                sessionStorage.setItem('pdfUrl', import.meta.env.VITE_API_URL + pdfUrl);

                // Clear birth details from session storage
                sessionStorage.removeItem('birthDetails');

                // Navigate to success page
                navigate('/success');
            } catch (error) {
                console.error('Error generating report:', error);
                navigate('/error');
            }
        };

        generateReport();
    }, []); // Empty dependency array since we're using refs

    return (
        <div className="min-h-screen bg-[#1C1C3A] flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-64 h-64 mx-auto mb-8">
                        <Lottie animationData={loadingAnimation} loop />
                    </div>
                    <h1 className="text-2xl text-white font-libre-bodoni mb-4">
                        Generating Your Astrology Report
                    </h1>
                    <p className="text-gray-300">
                        Please wait while we analyze your birth details...
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};
