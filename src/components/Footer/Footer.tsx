import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import PlanetsGuideSection from '../PlanetGuide/PlanetsGuideSection';
import { Divider } from '../Divider/Divider';

export const Footer = () => {
  return (
    <footer className="w-full py-2 bg-[#0a0a1a] pt-[5rem]">
      <PlanetsGuideSection />
      <Divider />
      <div className="w-5/6 mx-auto pt-8 min-h-[200px]">
        <div className="relative border-t border-gray-800">
          <div className='lg:w-1/2 lg:translate-x-full w-full'>
            <div className="flex items-center justify-between py-8">
              <p className="text-base font-normal lg:-translate-x-1/2 w-full text-gray-400 text-center leading-4 font-libre-bodoni">
                © 2025 NextZodiac. All rights reserved.
              </p>
              <div className="flex-1" />
              <div className="flex items-center gap-4 ml-auto">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-gray-400 hover:text-[#4268a5] transition-all duration-300"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1C1C3A] px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    Follow us on Facebook
                  </div>
                  <FacebookIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-gray-400 hover:text-[#4268a5] transition-all duration-300"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1C1C3A] px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    Follow us on Twitter
                  </div>
                  <TwitterIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-gray-400 hover:text-[#4268a5] transition-all duration-300"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1C1C3A] px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    Follow us on Instagram
                  </div>
                  <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};