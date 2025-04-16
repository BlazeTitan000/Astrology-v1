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
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";

interface BirthDetails {
  name: string;
  birthDate: string;
  birthTime: string | null;
  birthplace: string;
  email: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not defined');
}

if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error('VITE_STRIPE_PUBLISHABLE_KEY environment variable is not defined');
}

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

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
        const finalDetails = JSON.parse(storedDetails) as BirthDetails;

        // Send generate request
        axios.post(`${API_URL}/generate-astrology-report`, finalDetails)
          .then((response: { data: { pdfUrl: string } }) => {
            console.log('Report generated successfully:', response.data);

            // Create a temporary link element to download the PDF
            const link = document.createElement('a');
            link.href = API_URL + response.data.pdfUrl;
            link.target = '_blank'; // Open in new tab
            link.download = 'astrology-report.pdf'; // Set the filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clear stored details
            sessionStorage.removeItem('birthDetails');
            // Redirect to success page or show success message
            navigate('/success');
          })
          .catch((error: any) => {
            console.error('Error generating report:', error);
            // Handle error
          });
      }
    }
  }, [location]);

  const handlePayment = async (finalDetails: BirthDetails) => {
    try {
      // Store birth details in session storage
      sessionStorage.setItem('birthDetails', JSON.stringify(finalDetails));

      // Create a payment session
      const response = await axios.post(`${API_URL}/create-payment-session`, {
        ...finalDetails,
        success_url: `${window.location.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/?canceled=true`
      });

      const { sessionId } = response.data;
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        // Handle error
      }
    } catch (error) {
      console.error('Payment error:', error);
      // Handle error
    }
  };

  const handleNext = (details: Partial<BirthDetails>) => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setBirthDetails(prev => ({ ...prev, ...details }));
    } else {
      // Handle form submission
      const finalDetails = { ...birthDetails, ...details } as BirthDetails;

      // Initiate payment flow
      handlePayment(finalDetails);
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