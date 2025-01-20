'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  // State Management
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(pathname);

  // Body Scroll Lock for Mobile Menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

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

  // Update Hovered Path when Route Changes
  useEffect(() => {
    setHoveredPath(pathname);
  }, [pathname]);

  // Keyboard Navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  // Navigation Items
  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/services', name: 'Services' },
    { path: '/about', name: 'About' },
    { path: '/classes', name: 'Classes' },
    { path: '/contact', name: 'Contact' }
  ];

  // Dynamic Navbar Classes
  const navClasses = `
    fixed z-[100] transition-all duration-300 
    w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] 
    left-1/2 -translate-x-1/2 top-2 lg:top-4
    bg-dark/95 backdrop-blur-xl shadow-2xl rounded-full
    border border-dark-border/30
    ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'}
  `;

  return (
    <nav 
      className={navClasses}
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
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
                className="h-10 md:h-14 w-auto rounded-full shadow-lg bg-white p-[1px] md:p-[2px] hover:shadow-ap-red/20 transition-all duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div 
            className="hidden md:flex items-center justify-center space-x-1"
            role="menubar"
          >
            <AnimatePresence mode="wait">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  role="menuitem"
                  aria-current={item.path === pathname ? 'page' : undefined}
                  className={`
                    relative px-4 py-2 transition-colors rounded-md
                    ${item.path === pathname ? 'text-ap-red' : 'text-text-primary hover:text-ap-red'}
                  `}
                  onMouseOver={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath(pathname)}
                  onFocus={() => setHoveredPath(item.path)}
                  tabIndex={0}
                >
                  <span className="relative z-10">{item.name}</span>
                  {item.path === hoveredPath && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-dark-lighter rounded-md -z-0"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                </Link>
              ))}
            </AnimatePresence>
          </div>

          {/* Book Now Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/book"
              className="px-6 py-2 bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary rounded-full font-medium transition-all hover:shadow-lg"
              role="button"
              aria-label="Book a consultation"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary hover:text-ap-red transition-colors p-2 relative z-50"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 md:hidden"
            id="mobile-menu"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <motion.div
              className="bg-dark backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-dark-border"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <div className="flex flex-col p-6 space-y-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center"
                      role="menuitem"
                      aria-current={isActive ? 'page' : undefined}
                      tabIndex={0}
                    >
                      <span
                        className={`
                          px-6 py-2 text-lg transition-all duration-300 rounded-full
                          ${isActive 
                            ? 'text-text-primary font-semibold bg-ap-red' 
                            : 'text-text-primary hover:text-ap-red font-normal'
                          }
                        `}
                      >
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
                <Link
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center"
                  role="menuitem"
                  aria-label="Book a consultation"
                  tabIndex={0}
                >
                  <span className="px-6 py-2 text-lg bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary rounded-full font-medium">
                    Book Now
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 