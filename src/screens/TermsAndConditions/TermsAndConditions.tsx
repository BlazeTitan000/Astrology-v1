import React, { useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ScrollToTopButton } from '../../components/ScrollToTopButton/ScrollToTopButton';

export const TermsAndConditions: React.FC = () => {
    const sectionRef = useScrollAnimation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="min-h-screen bg-[#1C1C3A]">
            <Header />
            <section ref={sectionRef} className="py-24 text-white px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center font-libre-bodoni">Terms & Conditions</h1>

                    <div className="space-y-8 font-playfair">
                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">1. Introduction</h2>
                            <p className="text-gray-300">
                                Welcome to our astrology service. By using our service, you agree to these terms and conditions.
                                Please read them carefully before proceeding.
                            </p>
                        </div>

                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">2. Service Description</h2>
                            <p className="text-gray-300">
                                Our service provides personalized astrological readings based on the information you provide.
                                The readings are for entertainment purposes only and should not be considered as professional advice.
                            </p>
                        </div>

                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">3. User Data</h2>
                            <p className="text-gray-300">
                                We collect and process your personal data in accordance with our Privacy Policy.
                                By using our service, you consent to the collection and use of your data as described in our Privacy Policy.
                            </p>
                        </div>

                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">4. Intellectual Property</h2>
                            <p className="text-gray-300">
                                All content, including text, graphics, and software, is the property of our company and is protected by copyright laws.
                                You may not reproduce, distribute, or create derivative works without our permission.
                            </p>
                        </div>

                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">5. Limitation of Liability</h2>
                            <p className="text-gray-300">
                                Our service is provided "as is" without any warranties. We are not liable for any damages that may result from your use of our service.
                            </p>
                        </div>

                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">6. Changes to Terms</h2>
                            <p className="text-gray-300">
                                We reserve the right to modify these terms at any time. Your continued use of the service after any changes indicates your acceptance of the new terms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}; 