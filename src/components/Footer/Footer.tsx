import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import PlanetsGuideSection from '../PlanetGuide/PlanetsGuideSection';

export const Footer = () => {
  return (
    <footer className="w-full py-2 bg-[#0a0a1a] pt-[5rem]">
      <PlanetsGuideSection />
      <div className="w-5/6 mx-auto pt-8  min-h-[200px]">
        <div className="relative border-t border-gray-800">
          <div className='lg:w-1/2 lg:translate-x-full w-full'>
            <div className="flex items-center justify-between py-8 ">
              <p className="text-base font-normal lg:-translate-x-1/2 w-full text-gray-400 text-center leading-4 font-libre-bodoni">
                © 2025 AstroAI. All rights reserved.
              </p>
              <div className="flex-1" />
              <div className="flex items-center gap-4 ml-auto">
                <FacebookIcon className="w-5 h-5 text-gray-400" />
                <TwitterIcon className="w-5 h-5 text-gray-400" />
                <InstagramIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};