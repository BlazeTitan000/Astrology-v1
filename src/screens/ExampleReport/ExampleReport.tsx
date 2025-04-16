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

                    <div className="space-y-8 font-playfair">
                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                                <div>
                                    <p><span className="font-semibold">Name:</span> John Doe</p>
                                    <p><span className="font-semibold">Birth Date:</span> January 15, 1990</p>
                                    <p><span className="font-semibold">Birth Time:</span> 10:30 AM</p>
                                    <p><span className="font-semibold">Birth Place:</span> New York, USA</p>
                                </div>
                                <div>
                                    <p><span className="font-semibold">Sun Sign:</span> Capricorn</p>
                                    <p><span className="font-semibold">Moon Sign:</span> Taurus</p>
                                    <p><span className="font-semibold">Rising Sign:</span> Leo</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">Personality Analysis</h2>
                            <p className="text-gray-300">
                                Your Capricorn sun sign indicates a strong sense of responsibility and ambition.
                                Combined with your Taurus moon, you have a practical approach to life and value stability.
                                The Leo rising adds a touch of charisma and leadership qualities to your personality.
                            </p>
                        </div>

                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">Career Insights</h2>
                            <p className="text-gray-300">
                                Your chart suggests success in management and leadership roles.
                                The combination of Capricorn's discipline and Leo's confidence makes you well-suited for
                                positions that require both strategic planning and public presence.
                            </p>
                        </div>

                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">Relationship Compatibility</h2>
                            <p className="text-gray-300">
                                You tend to be most compatible with earth and water signs.
                                Your practical nature meshes well with Taurus and Virgo, while your emotional depth
                                resonates with Cancer and Scorpio.
                            </p>
                        </div>

                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">Current Transits</h2>
                            <p className="text-gray-300">
                                Jupiter's current position suggests a period of growth and opportunity in your career sector.
                                Saturn's influence indicates a time for reassessing long-term goals and commitments.
                            </p>
                        </div>

                        <div className="bg-[rgba(40,40,70,0.9)] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 font-libre-bodoni">Recommendations</h2>
                            <p className="text-gray-300">
                                This is an excellent time to focus on career advancement and professional development.
                                Consider taking on new responsibilities or pursuing additional education in your field.
                                In relationships, practice patience and clear communication.
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