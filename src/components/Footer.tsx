'use client';

import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Contact Us</h3>
            <p className="mb-2 text-text-secondary">
              <a href="mailto:apfitnessbc@gmail.com" className="hover:text-ap-red transition-colors">
                Email: apfitnessbc@gmail.com
              </a>
            </p>
            <p className="mb-2 text-text-secondary">
              <a href="tel:+16044017917" className="hover:text-ap-red transition-colors">
                Phone: (604) 401-7917
              </a>
            </p>
            <p className="text-text-secondary">
              <a 
                href="https://maps.google.com/?q=8160+120+St,+Surrey,+BC+V3W+3N3"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ap-red transition-colors"
              >
                8160 120 St<br />
                Surrey, BC V3W 3N3
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-ap-red transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-ap-red transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-text-secondary hover:text-ap-red transition-colors">
                  Class Schedule
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-ap-red transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-ap-red transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-ap-red transition-colors"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-ap-red transition-colors"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-border text-center">
          <p className="text-text-secondary">
            © {currentYear} AP Fitness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 