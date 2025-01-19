import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Employee Productivity Tracker. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <Link
            to="/about"
            className="text-gray-300 hover:text-white transition"
          >
            About Us
          </Link>
          <Link
            to="/privacy"
            className="text-gray-300 hover:text-white transition"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-gray-300 hover:text-white transition"
          >
            Terms of Service
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 hover:text-white transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
