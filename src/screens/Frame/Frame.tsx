import React, { useState } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { ProgressCard } from "../../components/ProgressCard/ProgressCard";
import { BlogSection } from "../../components/BlogSection/BlogSection";
import { BirthChartSection } from "../../components/BirthChartSection/BirthChartSection";
import { ScrollToTopButton } from "../../components/ScrollToTopButton/ScrollToTopButton";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { questions } from "./questions";

export const Frame = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = questions.length;
  const progressCardRef = useScrollAnimation();
  const blogRef = useScrollAnimation();

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleScrollToProgress = () => {
    const section = document.getElementById("progress-card-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-start bg-[#502b92]">
      <div className="relative w-full">
        <div className="relative bg-[#0d0d1f]">
          <Header />
          <HeroSection />
          <BirthChartSection onScrollToProgress={handleScrollToProgress} />

          {/* Progress Card Section */}
          <section
            ref={progressCardRef}
            className="w-full py-10 bg-[url(/main-1.png)] min-h-screen bg-cover bg-center flex items-center relative z-10"
            id='progress-card-section'
          >
            <div className="w-full">
              <ProgressCard
                currentStep={currentStep}
                totalSteps={totalSteps}
                question={questions[currentStep]}
                onNext={handleNext}
              />
            </div>
          </section>

          {/* Blog Section */}
          <section ref={blogRef} className="relative z-10">
            <BlogSection />
          </section>

          <Footer />
          <ScrollToTopButton />
        </div>
      </div>
    </div>
  );
};