// eslint-disable-next-line no-unused-vars
import React from "react";
import { FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-white py-6 px-4 flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0 md:py-8 md:px-16">
      {/* Social icons at the top in mobile view */}
      <div className="flex space-x-4 order-1 md:order-2">
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          <FaYoutube size={20} />
        </a>
        <a
          href="https://x.com/?lang=en"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          <FaFacebook size={20} />
        </a>
      </div>

      {/* Navigation links in a single line for mobile */}
      <div className="flex flex-row space-x-4 order-2 md:order-3">
        <a href="/contact" className="text-sm hover:underline">
          Contact us
        </a>
        <a href="/privacy-policy" className="text-sm hover:underline">
          Privacy Policies
        </a>
        <a href="/help" className="text-sm hover:underline">
          Help
        </a>
      </div>

      {/* Copyright text centered in mobile, shifted left in desktop */}
      <div className="text-center text-sm order-3 md:text-left md:order-1">
        ©2022 All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
