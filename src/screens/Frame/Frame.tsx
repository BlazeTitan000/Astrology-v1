import React, { useState } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { ProgressCard } from "../../components/ProgressCard/ProgressCard";

import { Button } from "../../components/ui/button";
import { BlogSection } from "../../components/BlogSection/BlogSection";
import { questions } from "./questions";
import Lottie from "lottie-react";
import animationData from '../../assets/animation/star.json';
import './Frame.css';
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export const Frame = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = questions.length;
  const birthChartRef = useScrollAnimation();
  const progressCardRef = useScrollAnimation();
  const blogRef = useScrollAnimation();

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="flex flex-col items-start bg-[#502b92]">
      <div className="relative w-full">
        <div className="relative bg-[#0d0d1f]">
          <Header />
          <HeroSection />

          {/* Birth Chart Section */}
          <section
            ref={birthChartRef}
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
                <div className="w-full max-w-[600px] order-2 md:order-1 animate-slide-in-left">
                  <h2 className="text-4xl font-normal text-white leading-9 font-libre-bodoni">
                    What is a Birth Chart?
                  </h2>

                  <div className="md:hidden w-full mt-6 animate-fade-in">
                    <img
                      className="w-full max-w-[612px] h-auto object-cover rounded-[2rem]"
                      alt="Birth chart"
                      src="/birth-chart-1.png"
                    />
                  </div>

                  <p className="mt-[74px] font-normal text-gray-300 text-base leading-6 font-playfair animate-fade-in-delay">
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
                    className="mt-8 w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 bg-[#4268a5] rounded-full text-base sm:text-lg font-libre-bodoni hover:bg-[#355694] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(66,104,165,0.5)] animate-float"
                    onClick={() => {
                      const section = document.getElementById("progress-card-section");
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Generate Your Birth Chart
                  </Button>
                </div>

                <div className="w-full max-w-[600px] order-1 md:order-2 hidden md:block animate-slide-in-right">
                  <img
                    className="w-full max-w-[612px] h-auto object-cover rounded-[2rem]"
                    alt="Birth chart"
                    src="/birth-chart-1.png"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Progress Card Section */}
          <section
            ref={progressCardRef}
            className="w-full py-10 bg-[url(/main-1.png)] min-h-screen bg-cover bg-center flex items-center z-10"
            id='progress-card-section'
          >
            <ProgressCard
              currentStep={currentStep}
              totalSteps={totalSteps}
              question={questions[currentStep]}
              onNext={handleNext}
            />
          </section>

          {/* Blog Section */}
          <div ref={blogRef} className="z-10">
            <BlogSection />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};