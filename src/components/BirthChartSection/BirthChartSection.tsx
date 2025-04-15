import React, { useRef, useEffect } from "react";
import { Button } from "../ui/button";
import Lottie from "lottie-react";
import animationData from '../../assets/animation/star.json';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

interface BirthChartSectionProps {
    onScrollToProgress: () => void;
}

export const BirthChartSection: React.FC<BirthChartSectionProps> = ({ onScrollToProgress }) => {
    const sectionRef = useScrollAnimation();
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Create floating animation for the image
        const createFloatingAnimation = () => {
            if (!imageRef.current) return;

            gsap.set(imageRef.current, {
                transformPerspective: 1000,
                transformStyle: "preserve-3d"
            });

            const timeline = gsap.timeline({
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            timeline
                .to(imageRef.current, {
                    y: -20,
                    rotateX: 5,
                    rotateY: 5,
                    duration: 3,
                    ease: "sine.inOut"
                })
                .to(imageRef.current, {
                    y: 0,
                    rotateX: -5,
                    rotateY: -5,
                    duration: 3,
                    ease: "sine.inOut"
                });

            return timeline;
        };

        const floatingAnimation = createFloatingAnimation();

        return () => {
            floatingAnimation?.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center justify-center py-8 bg-[#161630] overflow-hidden z-10"
        >
            <Lottie
                animationData={animationData}
                loop
                autoplay
                className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none scale-150"
            />
            <div className="relative w-5/6 mx-auto">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="w-full max-w-[600px] order-2 md:order-1">
                        <h2 className="text-4xl font-normal text-white leading-9 font-libre-bodoni">
                            What is a Birth Chart?
                        </h2>

                        <div className="md:hidden w-full mt-6">
                            <img
                                ref={imageRef}
                                className="w-full max-w-[612px] h-auto object-cover rounded-[2rem]"
                                alt="Birth chart"
                                src="/birth-chart-1.png"
                            />
                        </div>

                        <p className="mt-[74px] font-normal text-gray-300 text-base leading-6 font-playfair">
                            Your Birth Chart also known as the Natal Chart is like a
                            snapshot of the sky the moment you were born, capturing a
                            unique arrangement of planets and stars that shapes your
                            personality, strengths, potential, and life path. It goes
                            beyond your sun sign, offering a deeper look at how
                            different aspects of the heavens interact. <br />
                            <br />
                            Think of your birth chart as a code filled with symbols that
                            reveal your talents, potential challenges, and the path your
                            life may take. Exploring your birth chart is a journey of
                            self-discovery, helping you uncover your strengths and
                            navigate the possibilities ahead.
                        </p>
                        <Button
                            className="mt-8 w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 bg-[#4268a5] rounded-full text-base sm:text-lg font-libre-bodoni hover:bg-[#355694] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(66,104,165,0.5)]"
                            onClick={onScrollToProgress}
                        >
                            Generate Your Birth Chart
                        </Button>
                    </div>

                    <div className="w-full max-w-[600px] order-1 md:order-2 hidden md:block">
                        <img
                            ref={imageRef}
                            className="w-full max-w-[612px] h-auto object-cover rounded-[2rem]"
                            alt="Birth chart"
                            src="/birth-chart-1.png"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}; 