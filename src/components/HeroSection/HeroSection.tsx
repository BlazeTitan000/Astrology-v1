import React, { useEffect, useRef } from 'react';
import { Button } from "../ui/button";
import animationData from '../../assets/animation/gradient.json';
import Lottie from "lottie-react";
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create stars with different colors
    const starColors = [
      '#ffffff', // white
      '#f6ba02', // gold
      '#4268a5', // blue
      '#d0a933', // yellow
      '#ff6b6b', // pink
      '#4ecdc4', // teal
    ];

    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const size = Math.random() * 4 + 1; // Random size between 1-3px

      star.className = 'absolute rounded-full animate-twinkle';
      star.style.opacity = `${Math.random() * 0.5 + 0.5}`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = color;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${Math.random() * 2 + 2}s`; // Random duration between 2-4s
      container.appendChild(star);
    }

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();

      const x = ((clientX - left) / width) * 100;
      const y = ((clientY - top) / height) * 100;

      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGetStarted = () => {
    const progressCardSection = document.getElementById('progress-card-section');
    if (progressCardSection) {
      progressCardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full lg:min-h-screen min-h-[90vh] overflow-hidden pt-[100px]">
      <div className="relative lg:min-h-screen min-h-[90vh]" ref={containerRef}>
        <div className="absolute inset-0 bg-[url(/main-1.png)] bg-cover bg-center scale-150 -translate-x-1/4 -translate-y-1/4 transform origin-center transition-transform duration-700">
          <div className="h-full rounded-lg [background:linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.4)_60%,rgba(255,105,245,0)_100%)] md:[background:linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.8)_40%,rgba(0,0,0,0.4)_70%,rgba(255,105,245,0)_100%)]" />
        </div>
        {/* <Lottie
          animationData={animationData}
          loop
          autoplay
          className="absolute inset-0 h-full object-cover opacity-20 pointer-events-none scale-125"
        /> */}
        <div className="absolute w-5/6 mx-auto inset-x-0 top-1/2 -translate-y-1/2">
          <div className="relative w-full max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#f6ba02] leading-tight font-libre-bodoni animate-fade-in">
              Discover Your Cosmic Blueprint with AI- Powered Astrology
            </h1>

            <p className="mt-6 sm:mt-8 md:mt-10 font-normal text-base sm:text-lg md:text-xl text-[#d0a933] leading-relaxed font-playfair animate-fade-in-delay">
              Unlock the secrets of your personality, life path, and
              destiny through advanced astrological analysis
            </p>

            <p className="mt-4 text-2xl text-[#f6ba02] font-libre-bodoni animate-fade-in-delay">
              Only $6.99
            </p>

            <div className="mt-[20vh] lg:mt-[10vh] hero-button-container">
              <Button
                className="hero-button"
                onClick={handleGetStarted}
              >
                <span className="relative z-10">Generate Your Birth Chart</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-twinkle {
          animation: twinkle 3s infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.5s forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};