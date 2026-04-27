import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-neutral-content p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mx-auto">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Class Crush. All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link to="/about" className="hover:underline hover:text-white">
            About
          </Link>

          <Link to="/contact" className="hover:underline hover:text-white">
            Contact
          </Link>

          <Link
            to="/privacy-policy"
            className="hover:underline hover:text-white"
          >
            Privacy Policy
          </Link>

          <Link
            to="/refund-policy"
            className="hover:underline hover:text-white"
          >
            Refund Policy
          </Link>

          <Link
            to="/terms-and-conditions"
            className="hover:underline hover:text-white"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
