'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Navbar Hide/Show on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      
      if (currentScrollY > lastScrollY) {
        if (currentScrollY > 50) {
          setIsVisible(false);
        }
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Navigation Items
  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/services', name: 'Services' },
    { path: '/packages', name: 'Packages' },
    { path: '/about', name: 'About' },
    { path: '/classes', name: 'Classes' },
    { path: '/contact', name: 'Contact' }
  ];

  // Dynamic Navbar Classes
  const navClasses = `
    fixed z-[100] transition-all duration-300 
    w-[calc(100%-0.75rem)] sm:w-[calc(100%-2rem)] 
    left-1/2 -translate-x-1/2 top-1 sm:top-2 lg:top-4
    bg-dark/95 backdrop-blur-xl shadow-2xl rounded-full
    border border-dark-border/30
    ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'}
  `;

  return (
    <nav 
      className={navClasses}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-1.5 sm:px-4">
        <div className="flex items-center justify-between h-[3.25rem] sm:h-14 lg:h-20 gap-0.5 sm:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center"
              aria-label="AP Fitness Home"
            >
              <Image 
                src="/images/AP-Logo_processed.jpeg"
                alt="AP Fitness"
                width={64}
                height={64}
                className="h-8 sm:h-10 md:h-12 w-auto rounded-full shadow-lg bg-white p-[1px] md:p-[2px] hover:shadow-ap-red/20 transition-all duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Navigation Items - Always Visible */}
          <div className="flex items-center justify-center gap-[2px] sm:gap-1 md:gap-2 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                role="menuitem"
                aria-current={item.path === pathname ? 'page' : undefined}
                className={`
                  relative px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 transition-colors rounded-full text-[0.7rem] sm:text-sm md:text-base whitespace-nowrap
                  ${item.path === pathname 
                    ? 'text-text-primary font-semibold bg-ap-red' 
                    : 'text-text-primary hover:text-ap-red hover:bg-dark-lighter font-normal'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Book Now Button */}
          <div className="flex-shrink-0 -translate-x-1.5">
            <Link
              href="/book"
              className="inline-flex items-center px-2.5 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary rounded-full font-medium transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] text-[0.7rem] sm:text-sm md:text-base whitespace-nowrap"
              role="button"
              aria-label="Book a consultation"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 