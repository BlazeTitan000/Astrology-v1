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
import "./Frame.css";
import axios from "axios";

interface BirthDetails {
  name: string;
  birthDate: string;
  birthTime: string | null;
  birthplace: string;
  email: string;
}

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not defined');
}

export const Frame = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const [birthDetails, setBirthDetails] = useState<BirthDetails>({
    name: "",
    birthDate: "",
    birthTime: null,
    birthplace: "",
    email: ""
  });
  const totalSteps = questions.length;
  const progressCardRef = useScrollAnimation();
  const blogRef = useScrollAnimation();

  const handleNext = (details: Partial<BirthDetails>) => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setBirthDetails(prev => ({ ...prev, ...details }));
    } else {
      // Handle form submission
      const finalDetails = { ...birthDetails, ...details };

      // Send data to backend
      axios.post(`${API_URL}/backendApi/generate-astrology-report`, finalDetails)
        .then((response: { data: any }) => {
          // Handle successful response
          console.log('Report generated successfully:', response.data);
          // You might want to redirect to a success page or show a success message
        })
        .catch((error: any) => {
          // Handle error
          console.error('Error generating report:', error);
          // You might want to show an error message to the user
        });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleScrollToProgress = () => {
    const section = document.getElementById("progress-card-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="frame-container">
      <div className="frame-wrapper">
        <div className="frame-content">
          <Header />
          <HeroSection />
          <BirthChartSection onScrollToProgress={handleScrollToProgress} />

          {/* Progress Card Section */}
          <section
            ref={progressCardRef}
            className="progress-section"
            id='progress-card-section'
          >
            <div className="progress-content">
              <ProgressCard
                currentStep={currentStep + 1}
                totalSteps={totalSteps}
                question={questions[currentStep]}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            </div>
          </section>

          {/* Blog Section */}
          <section ref={blogRef} className="blog-section">
            <BlogSection />
          </section>

          <Footer />
          <ScrollToTopButton />
        </div>
      </div>
    </div>
  );
};