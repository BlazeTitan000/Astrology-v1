import React from 'react';
import { Button } from "../ui/button";

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[800px]">
      <div className="relative h-[800px]">
        <div className="absolute w-full h-[800px] bg-[url(/main-1.png)] bg-cover bg-center">
          <div className="h-[800px] rounded-[10px] [background:linear-gradient(90deg,rgba(0,0,0,0.64)_37%,rgba(255,105,245,0)_100%)]" />
        </div>

        <div className="absolute w-full max-w-[1280px] h-[397px] top-[202px] left-1/2 -translate-x-1/2 px-4">
          <div className="relative w-full max-w-[768px]">
            <h1 className="text-6xl font-normal text-[#f6ba02] leading-[60px] [font-family:'Libre_Bodoni',Helvetica] max-w-[648px]">
              Discover Your Cosmic Blueprint with AI- Powered Astrology
            </h1>

            <p className="mt-[246px] font-normal text-xl text-[#d0a933] leading-5 [font-family:'Playfair_Display',Helvetica] max-w-[681px]">
              Unlock the secrets of your personality, life path, and
              destiny through advanced astrological analysis
            </p>

            <Button className="mt-[82px] w-[301px] h-[60px] bg-[#4268a5] rounded-full text-lg [font-family:'Montserrat',Helvetica]">
              Generate Your Birth Chart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};