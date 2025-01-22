'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, PanInfo } from 'framer-motion';
import { FaDumbbell, FaUsers, FaClinicMedical, FaUserMd, FaAppleAlt, FaLaptop, FaHandHoldingHeart } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';
import Link from 'next/link';

const services = [
  {
    title: 'Personal Training',
    description: 'One-on-one personalized training sessions with certified kinesiologists.',
    Icon: FaDumbbell,
  },
  {
    title: 'ICBC Active Rehab',
    description: 'Specialized rehabilitation programs for ICBC clients.',
    Icon: FaClinicMedical,
  },
  {
    title: 'Gym Membership',
    description: 'Access to our state-of-the-art facility with modern equipment.',
    Icon: GiWeightLiftingUp,
  },
  {
    title: 'Online Coaching',
    description: 'Remote training programs designed for your schedule.',
    Icon: FaLaptop,
  },
  {
    title: 'Group Classes',
    description: 'Energetic group sessions led by experienced trainers.',
    Icon: FaUsers,
  },
  {
    title: 'Nutritional Coaching',
    description: 'Comprehensive nutrition guidance for optimal results.',
    Icon: FaAppleAlt,
  },
  {
    title: 'Physiotherapy',
    description: 'Professional services for injury recovery and pain management.',
    Icon: FaUserMd,
  },
  {
    title: 'Massage Therapy',
    description: 'Professional massage therapy for muscle tension and overall wellness.',
    Icon: FaHandHoldingHeart,
  }
];

// Duplicate services for infinite scroll effect
const extendedServices = [...services, ...services, ...services];

export default function ServiceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(services.length);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const slideWidth = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const mobileTransitionDuration = 30; // seconds for mobile
  const desktopTransitionDuration = 45; // seconds for desktop

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cardWidth = container.offsetWidth * (isMobile ? 0.7 : 0.333); // 70% on mobile, 33.333% on desktop
      slideWidth.current = cardWidth;
    }
  }, [isMobile]);

  // Auto-play animation
  useEffect(() => {
    if (!isAutoPlaying) return;

    const startAutoPlay = async () => {
      await controls.start({
        x: -slideWidth.current * services.length,
        transition: {
          duration: isMobile ? mobileTransitionDuration : desktopTransitionDuration,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    startAutoPlay();

    return () => {
      controls.stop();
    };
  }, [isAutoPlaying, controls, isMobile]);

  const handleDragStart = () => {
    setIsAutoPlaying(false);
    setIsDragging(true);
    controls.stop();
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = slideWidth.current * 0.2;
    const velocity = 0.5;

    if (Math.abs(info.velocity.x) > velocity || Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? -1 : 1;
      const targetIndex = currentIndex + direction;
      
      await controls.start({
        x: -targetIndex * slideWidth.current,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      });

      setCurrentIndex(targetIndex);
    } else {
      // Snap back to current position
      controls.start({
        x: -currentIndex * slideWidth.current,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      });
    }

    // Resume auto-play after a short delay
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 1000);
  };

  return (
    <div className="relative w-full overflow-hidden px-4">
      {/* Navigation Buttons */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          onClick={async () => {
            setIsAutoPlaying(false);
            await controls.start({
              x: -(currentIndex - 1) * slideWidth.current,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            });
            setCurrentIndex(prev => prev - 1);
            setTimeout(() => setIsAutoPlaying(true), 1000);
          }}
          className="p-3 rounded-full bg-dark-lighter/50 backdrop-blur-sm hover:bg-ap-red/20 border border-text-primary/10 hover:border-ap-red/50 transition-all duration-300"
        >
          <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          onClick={async () => {
            setIsAutoPlaying(false);
            await controls.start({
              x: -(currentIndex + 1) * slideWidth.current,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            });
            setCurrentIndex(prev => prev + 1);
            setTimeout(() => setIsAutoPlaying(true), 1000);
          }}
          className="p-3 rounded-full bg-dark-lighter/50 backdrop-blur-sm hover:bg-ap-red/20 border border-text-primary/10 hover:border-ap-red/50 transition-all duration-300"
        >
          <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Service Cards Container */}
      <div className="relative overflow-hidden" ref={containerRef}>
        <motion.div 
          className="flex gap-6 py-4"
          animate={controls}
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          dragMomentum={false}
        >
          {extendedServices.map((service, index) => (
            <motion.div
              key={`${index}-${service.title}`}
              className={`
                flex-shrink-0 w-[70%] md:w-[calc(33.333%-1rem)]
                relative p-[2px] rounded-[2rem] overflow-hidden
                bg-gradient-to-br from-dark-lighter to-dark
                group hover:from-ap-red/20 hover:to-dark
                transition-all duration-500
                ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                touch-pan-y
              `}
              style={{
                scrollSnapAlign: 'center',
              }}
            >
              <div className="relative h-full bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 border border-text-primary/10">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/95 rounded-[2rem]" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <service.Icon className="w-7 h-7 text-text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-text-primary group-hover:text-ap-red transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-6 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <Link
                    href="/services"
                    className="inline-flex items-center text-ap-red hover:text-ap-red-dark font-semibold transition-all duration-300 group-hover:translate-x-2"
                  >
                    Learn More
                    <svg
                      className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 