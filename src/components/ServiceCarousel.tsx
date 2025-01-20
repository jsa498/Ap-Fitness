'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaUsers, FaHeart, FaAppleAlt, FaLaptop } from 'react-icons/fa';
import { GiBoxingGlove } from 'react-icons/gi';
import Link from 'next/link';

const services = [
  {
    title: 'Personal Training',
    description: 'Customized one-on-one sessions to achieve your specific fitness goals.',
    Icon: FaDumbbell,
  },
  {
    title: 'Group Fitness',
    description: 'Fun and supportive classes for all fitness levels.',
    Icon: FaUsers,
  },
  {
    title: 'Boxing & Kickboxing',
    description: 'High-energy sessions focusing on technique, strength, and endurance.',
    Icon: GiBoxingGlove,
  },
  {
    title: 'Pre & Postnatal',
    description: 'Specialized programs to support mothers before and after childbirth.',
    Icon: FaHeart,
  },
  {
    title: 'Nutritional Coaching',
    description: 'Personalized plans to enhance fitness and overall wellness.',
    Icon: FaAppleAlt,
  },
  {
    title: 'Online Coaching',
    description: 'Flexible training accessible from anywhere.',
    Icon: FaLaptop,
  },
];

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout>();

  // Function to get the next index with wrapping
  const getNextIndex = (current: number) => (current + 1) % services.length;

  // Auto scroll functionality
  useEffect(() => {
    if (isAutoScrolling) {
      autoScrollRef.current = setInterval(() => {
        setActiveIndex(prev => getNextIndex(prev));
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling]);

  // Handle manual scroll interaction
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let startTime: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      setIsAutoScrolling(false);
      container.classList.add('cursor-grabbing');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      startTime = Date.now();
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.classList.remove('cursor-grabbing');
      setIsAutoScrolling(true);
    };

    const handleMouseUp = (e: MouseEvent) => {
      isDown = false;
      container.classList.remove('cursor-grabbing');
      
      // Calculate velocity for momentum scrolling
      const endTime = Date.now();
      const timeElapsed = endTime - startTime;
      const endX = e.pageX - container.offsetLeft;
      const distance = endX - startX;
      const velocity = Math.abs(distance / timeElapsed);

      // Determine direction and snap to next/previous card
      if (velocity > 0.5) { // Threshold for swipe
        if (distance < 0) {
          setActiveIndex(prev => getNextIndex(prev));
        } else {
          setActiveIndex(prev => (prev - 1 + services.length) % services.length);
        }
      }

      setIsAutoScrolling(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      isDown = true;
      setIsAutoScrolling(false);
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      startTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      isDown = false;
      setIsAutoScrolling(true);
      
      const endTime = Date.now();
      const timeElapsed = endTime - startTime;
      const endX = e.changedTouches[0].pageX - container.offsetLeft;
      const distance = endX - startX;
      const velocity = Math.abs(distance / timeElapsed);

      if (velocity > 0.5) {
        if (distance < 0) {
          setActiveIndex(prev => getNextIndex(prev));
        } else {
          setActiveIndex(prev => (prev - 1 + services.length) % services.length);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchmove', handleTouchMove);

    return () => {
      // Remove event listeners
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Get visible services with one extra on each side for infinite scroll effect
  const getVisibleServices = () => {
    const prevIndex = (activeIndex - 1 + services.length) % services.length;
    const nextIndex = getNextIndex(activeIndex);
    return [
      services[prevIndex],
      services[activeIndex],
      services[nextIndex],
    ];
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none md:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none md:hidden" />

      {/* Services Grid/Scroll Container */}
      <div
        ref={containerRef}
        className="
          flex md:grid md:grid-cols-3 gap-6 px-4 pb-4 md:pb-0
          overflow-x-auto scrollbar-hide cursor-grab md:cursor-default
          snap-x snap-mandatory md:snap-none
          relative
        "
      >
        <AnimatePresence mode="wait">
          {getVisibleServices().map((service, index) => (
            <motion.div
              key={`${service.title}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: index === 1 ? 1 : 0.6, 
                scale: index === 1 ? 1 : 0.9,
                x: 0 
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="
                min-w-[300px] md:min-w-0 snap-center
                bg-dark-lighter rounded-lg p-6 shadow-dark-lg 
                border border-dark-border hover:border-ap-red/50 
                transition-all duration-300 group
              "
            >
              <div className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <service.Icon className="w-6 h-6 text-text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary group-hover:text-ap-red transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-text-secondary mb-4">{service.description}</p>
              <Link
                href="/services"
                className="inline-flex items-center text-ap-red hover:text-ap-red-dark font-semibold transition-colors group-hover:translate-x-2 duration-300"
              >
                Learn More
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2 md:hidden">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setIsAutoScrolling(false);
              setTimeout(() => setIsAutoScrolling(true), 5000);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-ap-red w-4' : 'bg-dark-border'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 