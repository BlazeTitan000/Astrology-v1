import React, { useState } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { ProgressCard } from "../../components/ProgressCard/ProgressCard";

import { Button } from "../../components/ui/button";
import { BlogSection } from "../../components/BlogSection/BlogSection";
import { questions } from "./questions";

export const Frame = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = questions.length;

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
          <section className="w-full bg-[#161630] py-20">
            <div className="relative w-5/6 mx-auto">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="w-full max-w-[600px]">
                  <h2 className="text-4xl font-normal text-white leading-9 [font-family:'Montserrat',Helvetica]">
                    What is a Birth Chart?
                  </h2>

                  <p className="mt-[74px] font-normal text-gray-300 text-base leading-6 [font-family:'Montserrat',Helvetica] max-w-[543px]">
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
                  <Button className="mt-8 sm:mt-10 md:mt-12 w-full sm:w-auto px-8 py-8 bg-[#4268a5] rounded-full text-base sm:text-lg [font-family:'Montserrat',Helvetica] hover:bg-[#355694] transition-colors">
                    Generate Your Birth Chart
                  </Button>
                </div>

                <div className="w-full max-w-[600px]">
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
          <section className="w-full py-10 bg-[url(/main-1.png)] bg-cover bg-center">
            <ProgressCard
              currentStep={currentStep}
              totalSteps={totalSteps}
              question={questions[currentStep]}
              onNext={handleNext}
            />
          </section>

          {/* Blog Section */}
          <BlogSection />

          <Footer />
        </div>
      </div>
    </div>
  );
};