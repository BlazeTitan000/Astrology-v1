import React from 'react';
import { Button } from "../ui/button";

export const HeroSection = () => {
  return (
    <section className="relative w-full lg:min-h-screen min-h-[60vh] overflow-hidden pt-[100px]">
      <div className="relative lg:min-h-screen min-h-[60vh]">
        <div className="absolute inset-0 bg-[url(/main-1.png)] bg-cover bg-center scale-150 -translate-x-1/4 -translate-y-1/4  transform origin-center transition-transform duration-700">
          <div className="h-full rounded-lg [background:linear-gradient(90deg,rgba(0,0,0,0.64)_37%,rgba(255,105,245,0)_100%)]" />
        </div>

        <div className="absolute  w-5/6 mx-auto inset-x-0 top-1/2 -translate-y-1/2">
          <div className="relative w-full max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#f6ba02] leading-tight [font-family:'Libre_Bodoni',Helvetica]">
              Discover Your Cosmic Blueprint with AI- Powered Astrology
            </h1>

            <p className="mt-4 sm:mt-6 md:mt-8 font-normal text-base sm:text-lg md:text-xl text-[#d0a933] leading-relaxed [font-family:'Playfair_Display',Helvetica]">
              Unlock the secrets of your personality, life path, and
              destiny through advanced astrological analysis
            </p>

            <Button className="mt-8 sm:mt-10 md:mt-12 w-full sm:w-auto px-8 py-8 bg-[#4268a5] rounded-full text-base sm:text-lg [font-family:'Montserrat',Helvetica] hover:bg-[#355694] transition-colors">
              Generate Your Birth Chart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};