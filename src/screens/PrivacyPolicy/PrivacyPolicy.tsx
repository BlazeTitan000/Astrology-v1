import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ScrollToTopButton } from '../../components/ScrollToTopButton/ScrollToTopButton';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#1C1C3A] text-white">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-4xl translate-y-[100px] mb-[100px]">
                <h1 className="text-4xl font-bold mb-8 text-center font-libre-bodoni bg-gradient-to-r from-[#4268a5] to-[#8a2be2] text-transparent bg-clip-text">
                    Privacy Policy
                </h1>

                <div className="space-y-6 text-gray-300">
                    <div className="text-sm text-gray-400 mb-8 text-center">
                        <p>Effective Date: 01-01-2025</p>
                        <p>Last Updated: 18-04-2025</p>
                    </div>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">1. Introduction</h2>
                        <p>
                            This privacy policy explains how NextZodiac ("we," "us," "our") collects, uses, and protects your personal data when you use our website www.nextzodiac.com ("Site") and our services.
                        </p>
                        <p className="mt-4">
                            We are committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR) and applicable Dutch law.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">2. What Data We Collect</h2>
                        <p className="mb-4">When you purchase a personalized astrology report, we collect the following data:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Name</li>
                            <li>Email address</li>
                            <li>Birth date</li>
                            <li>Birth time</li>
                            <li>Birth place</li>
                        </ul>
                        <p className="mt-4">
                            We do not collect or store your payment information. All payments are processed securely via Stripe.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">3. How We Use Your Data</h2>
                        <p>Your data is used to:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Generate and deliver your personalized astrology report</li>
                            <li>Send transactional emails (such as report delivery and confirmation)</li>
                            <li>Send occasional emails about new features, offers, or related astrology services from NextZodiac (only if you've given consent)</li>
                        </ul>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">4. Legal Basis for Processing</h2>
                        <p>
                            We process your data based on your consent at the time of purchase and our contractual obligation to deliver the service you paid for. You may separately consent to receive marketing emails.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">5. How Long We Retain Your Data</h2>
                        <p>
                            We retain your personal data for up to 30 days after your report has been delivered, unless a longer retention is necessary for administrative, legal, or technical purposes.
                        </p>
                        <p className="mt-4">
                            Email addresses collected for marketing purposes will be retained until you unsubscribe or request deletion.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">6. Data Sharing</h2>
                        <p>
                            We do not sell, rent, or share your personal data with third parties. We only work with trusted service providers (such as Stripe and email delivery platforms) who meet GDPR requirements.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">7. Your Rights</h2>
                        <p>Under the GDPR, you have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Access the data we have about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Withdraw your consent at any time</li>
                            <li>Unsubscribe from marketing emails at any time</li>
                            <li>File a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens)</li>
                        </ul>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">8. Security</h2>
                        <p>
                            We implement technical and organizational measures to protect your personal data against unauthorized access, loss, or misuse.
                        </p>
                    </section>

                    <section className="bg-[#2A2A4A]/50 p-6 rounded-lg backdrop-blur-sm border border-[#4268a5]/20">
                        <h2 className="text-2xl font-semibold mb-4 text-[#4268a5]">9. Contact</h2>
                        <p>
                            If you have any questions or wish to exercise your rights, you can contact us at:{' '}
                            <a href="mailto:grobunventures@gmail.com" className="text-[#4268a5] hover:underline">
                                grobunventures@gmail.com
                            </a>
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}; 