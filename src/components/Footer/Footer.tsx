import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full h-[130px] bg-[#0a0a1a]">
      <div className="w-full max-w-[1248px] mx-auto px-6 pt-[31px]">
        <div className="relative border-t border-gray-800">
          <div className="flex items-center justify-between pt-8">
            <div className="flex-1" />
            <p className="text-base font-normal text-gray-400 text-center leading-4 [font-family:'Montserrat',Helvetica]">
              © 2025 AstroAI. All rights reserved.
            </p>
            <div className="flex items-center gap-4 ml-auto">
              <FacebookIcon className="w-5 h-5 text-gray-400" />
              <TwitterIcon className="w-5 h-5 text-gray-400" />
              <InstagramIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};