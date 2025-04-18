import React, { useState, useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => {
    // Check if we're returning from a successful payment
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');
    const success = searchParams.get('success');

    if (success === 'true' && sessionId) {
      // Get the stored birth details from session storage
      const storedDetails = sessionStorage.getItem('birthDetails');
      if (storedDetails) {
        // Navigate to loading page for report generation
        navigate('/loading');
      }
    }
  }, [location, navigate]);

  const handleNext = (details: Partial<BirthDetails>) => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setBirthDetails(prev => ({ ...prev, ...details }));
    } else {
      // Handle form submission
      const finalDetails = { ...birthDetails, ...details } as BirthDetails;

      // Store birth details in session storage
      sessionStorage.setItem('birthDetails', JSON.stringify(finalDetails));

      // Navigate to checkout page
      navigate('/checkout');

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
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