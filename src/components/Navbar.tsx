'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';

// Navigation structure with dropdowns
const navigationStructure = {
  '/': {
    name: 'Home',
    dropdownItems: []
  },
  '/about': {
    name: 'About',
    dropdownItems: [
      { name: 'View All', href: '/about', isViewAll: true },
      { name: 'Our Story', href: '/about#mission' },
      { name: 'Our Team', href: '/about#trainers' },
      { name: 'Facility', href: '/about#facility' }
    ]
  },
  '/training': {
    name: 'Training',
    dropdownItems: [
      { name: 'View All', href: '/training', isViewAll: true },
      { name: 'Personal Training', href: '/training#personal-training' },
      { name: 'Group Classes', href: '/training#group-classes' },
      { name: 'Online Training', href: '/training#online-training' },
      { name: 'Gym Membership', href: '/training#gym-membership' },
      { name: 'First Responder Program', href: '/training#first-responder' }
    ]
  },
  '/therapy': {
    name: 'Therapy',
    dropdownItems: [
      { name: 'View All', href: '/therapy', isViewAll: true },
      { name: 'ICBC Active Rehab', href: '/therapy#icbc-active-rehab' },
      { name: 'Gradual Return to Work', href: '/therapy#gradual-return-to-work' },
      { name: 'Physiotherapy', href: '/therapy#physiotherapy' }
    ]
  },
  '/contact': {
    name: 'Contact',
    dropdownItems: []
  }
};

export default function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Handle smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Add a highlight animation class
      element.classList.add('highlight-section');
      
      // Scroll to element with smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      // Add focus ring animation
      element.classList.add('ring-animation');
      
      // Remove highlight and ring classes after animation
      setTimeout(() => {
        element.classList.remove('highlight-section', 'ring-animation');
      }, 2000);
    }
  };

  // Handle navigation with smooth scroll
  const handleNavigation = async (href: string) => {
    const [path, hash] = href.split('#');
    
    // If we're already on the correct page
    if (pathname === path) {
      if (hash) {
        scrollToSection(hash);
      }
    } else {
      // Navigate to new page then scroll
      await router.push(path);
      if (hash) {
        // Wait for page load and then scroll
        setTimeout(() => {
          scrollToSection(hash);
        }, 500); // Increased delay to ensure page content is loaded
      }
    }
    
    setActiveDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.nav-item')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  // Handle scroll behavior
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
      setActiveDropdown(null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Dynamic Navbar Classes
  const navClasses = `
    fixed z-[100] transition-all duration-300 
    w-[calc(100%-0.5rem)] sm:w-[calc(100%-2rem)] 
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
      <div className="max-w-7xl mx-auto px-1.5 xs:px-2 sm:px-4">
        <div className="flex items-center justify-between h-[3.25rem] sm:h-14 lg:h-20 gap-0.5 sm:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 pl-1 xs:pl-1.5 sm:pl-2">
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

          {/* Navigation Items */}
          <div className="flex items-center justify-center gap-[2px] xs:gap-[4px] sm:gap-2 md:gap-3 overflow-x-visible flex-1 px-1 xs:px-2">
            {Object.entries(navigationStructure).map(([path, item]) => (
              <div key={path} className="relative nav-item">
                <button
                  onClick={() => {
                    if (item.dropdownItems.length > 0) {
                      setActiveDropdown(activeDropdown === path ? null : path);
                    } else {
                      handleNavigation(path);
                    }
                  }}
                  className={`
                    relative px-2 xs:px-2.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 transition-colors rounded-full text-[0.7rem] xs:text-[0.8rem] sm:text-sm md:text-base whitespace-nowrap
                    ${path === pathname 
                      ? 'text-text-primary font-semibold bg-ap-red' 
                      : 'text-text-primary hover:text-ap-red hover:bg-dark-lighter font-normal'
                    }
                    ${item.dropdownItems.length > 0 ? 'pr-6' : ''}
                  `}
                >
                  {item.name}
                  {item.dropdownItems.length > 0 && (
                    <FaChevronDown 
                      className={`
                        absolute right-1 xs:right-2 top-1/2 -translate-y-1/2 
                        w-2.5 h-2.5 xs:w-3 xs:h-3 
                        transition-transform duration-300
                        ${activeDropdown === path ? 'rotate-180' : ''}
                      `} 
                    />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.dropdownItems.length > 0 && activeDropdown === path && (
                  <div 
                    className="
                      absolute top-full left-0 mt-2 w-48 
                      rounded-xl bg-dark-lighter border border-dark-border/30 
                      shadow-lg overflow-hidden backdrop-blur-xl
                      animate-fadeIn
                    "
                  >
                    <div className="py-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <button
                          key={dropdownItem.href}
                          onClick={() => handleNavigation(dropdownItem.href)}
                          className={`
                            block w-full text-left px-4 py-2 text-sm text-text-primary 
                            hover:bg-ap-red transition-colors
                            ${dropdownItem.isViewAll ? 'border-b border-dark-border/30 mb-1' : ''}
                          `}
                        >
                          {dropdownItem.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Book Now Button */}
          <div className="flex-shrink-0 pr-1 xs:pr-1.5 sm:pr-2">
            <Link
              href="/book"
              className="inline-flex items-center px-3 py-1.5 xs:px-4 xs:py-1.5 sm:px-4 sm:py-1.5 md:px-6 md:py-2 bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary rounded-full font-medium transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] text-[0.7rem] sm:text-sm md:text-base whitespace-nowrap"
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