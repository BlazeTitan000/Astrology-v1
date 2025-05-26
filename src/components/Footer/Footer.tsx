import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PlanetsGuideSection from "../PlanetGuide/PlanetsGuideSection";
import { Divider } from "../Divider/Divider";
import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  const navigate = useNavigate();

  const handlePolicyLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full py-2 bg-[#0a0a1a] pt-[5rem]">
      <PlanetsGuideSection />
      <Divider />
      <div className="w-5/6 mx-auto flex justify-center gap-4 py-4">
        <button
          onClick={() => handlePolicyLinkClick("/terms")}
          className="text-gray-400 hover:text-[#4268a5] transition-colors duration-300"
        >
          Terms of Use
        </button>
        <span className="text-gray-600">|</span>
        <button
          onClick={() => handlePolicyLinkClick("/privacy-policy")}
          className="text-gray-400 hover:text-[#4268a5] transition-colors duration-300"
        >
          Privacy Policy
        </button>
      </div>
      <div className="w-5/6 mx-auto pt-8 min-h-[200px]">
        <div className="relative border-t border-gray-800">
          <div className="lg:w-1/2 lg:translate-x-full w-full">
            <div className="flex items-center justify-between py-8">
              <p className="text-base font-normal lg:-translate-x-1/2 w-full text-gray-400 text-center leading-4 font-libre-bodoni">
                © 2025 NextZodiac. All rights reserved.
              </p>
              <div className="flex-1" />
              <div className="flex items-center gap-8 ml-auto">
                <a
                  href="https://www.youtube.com/@nextzodiac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-gray-400 hover:text-[#4268a5] transition-all duration-300"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1C1C3A] px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    Follow us on YouTube
                  </div>
                  <FaYoutube className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="https://www.instagram.com/next_zodiac?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-gray-400 hover:text-[#4268a5] transition-all duration-300"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1C1C3A] px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    Follow us on Instagram
                  </div>
                  <FaInstagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="https://www.tiktok.com/@next.zodiac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-gray-400 hover:text-[#4268a5] transition-all duration-300"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1C1C3A] px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    Follow us on TikTok
                  </div>
                  <FaTiktok className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
