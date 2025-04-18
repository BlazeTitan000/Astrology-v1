import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ScrollToTopButton } from '../../components/ScrollToTopButton/ScrollToTopButton';

export const TermsOfUse: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#1C1C3A] text-white">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-4xl translate-y-[100px] mb-[100px]">
                <h1 className="text-4xl font-bold mb-8 text-center font-libre-bodoni bg-gradient-to-r from-[#4268a5] to-[#8a2be2] text-transparent bg-clip-text">
                    Terms of Use
                </h1>

                <div className="space-y-6 text-gray-300">
                    <div className="text-sm text-gray-400 mb-8 text-center">
                        <p>Effective Date: 01-01-2025</p>
                        <p>Last Updated: 18-04-2025</p>
                    </div>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">1. Introduction</h2>
                        <p>
                            These terms of use apply to the use of the website www.nextzodiac.com ("Site"), operated by NextZodiac ("we," "us," or "our"). By purchasing a report or using our services, you agree to be bound by these terms. If you do not agree, please do not use our services.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">2. Our Services</h2>
                        <p>
                            NextZodiac provides digital, personalized astrology reports based on the birth information you submit at checkout. Each report is created individually and delivered after a one-time payment. We do not offer subscriptions or user accounts.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">3. Use of Content</h2>
                        <p>
                            All content and reports are provided for personal insight and reflection purposes only. The information should not be considered as legal, medical, psychological, or financial advice. You are fully responsible for any decisions you make based on your report.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">4. Ordering and Payment</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>All payments are one-time and processed securely through Stripe.</li>
                            <li>Reports are delivered via email or download link after payment.</li>
                            <li>Due to the personalized nature of our product, we do not offer refunds once the report has been delivered.</li>
                            <li>You are responsible for entering correct and complete birth data to receive a valid report.</li>
                        </ul>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">5. Intellectual Property</h2>
                        <p>
                            All website content, reports, and visual materials are the intellectual property of NextZodiac. You may not reproduce, distribute, resell, or modify our content without written permission.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">6. Liability</h2>
                        <p>
                            Our services are provided "as is" and without any guarantees. We do not accept liability for direct or indirect damages resulting from the use of our services. By using NextZodiac, you acknowledge that astrology is a form of personal exploration and not a proven science.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">7. Data and Privacy</h2>
                        <p>
                            We collect only the data necessary to generate your report (name, birth date, time, place, and email). We do not create user accounts or retain payment data. For more information, see our <a href="/privacy-policy" className="text-[#4268a5] hover:underline">Privacy Policy</a>.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">8. Applicable Law</h2>
                        <p>
                            These terms are governed by and construed in accordance with Dutch law. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of the Netherlands.
                        </p>
                    </section>

                    <div className="mt-8 pt-8 border-t border-[#4268a5]/20">
                        <p className="text-center">
                            For questions about these terms, please contact us at{' '}
                            <a href="mailto:grobunventures@gmail.com" className="text-[#4268a5] hover:underline">
                                grobunventures@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}; 