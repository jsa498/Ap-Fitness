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

// Triple the services for smoother infinite scroll
const extendedServices = [...services, ...services, ...services];

export default function ServiceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(services.length);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const slideWidth = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const dragStartX = useRef(0);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();
  const resetPositionRef = useRef<NodeJS.Timeout>();

  // Slower, more readable auto-play speed
  const autoPlayDuration = 30; // seconds

  // Check if mobile and update on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();

    const debouncedResize = debounce(checkIfMobile, 250);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // Update slide width with debounced resize handler
  useEffect(() => {
    const updateSlideWidth = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const cardWidth = container.offsetWidth * (isMobile ? 0.85 : 0.333);
        slideWidth.current = cardWidth;
        
        // Update position when width changes
        controls.set({ x: -currentIndex * cardWidth });
      }
    };

    const debouncedUpdate = debounce(updateSlideWidth, 250);
    updateSlideWidth();
    window.addEventListener('resize', debouncedUpdate);
    return () => window.removeEventListener('resize', debouncedUpdate);
  }, [isMobile, controls, currentIndex]);

  // Handle auto-play and hover pause
  useEffect(() => {
    if (!isAutoPlaying || isHovered || isDragging) return;

    const startAutoPlay = async () => {
      const nextIndex = currentIndex + 1;
      
      // Reset position smoothly when reaching end
      if (nextIndex >= services.length * 2) {
        await controls.start({
          x: -nextIndex * slideWidth.current,
          transition: { duration: 0.5, ease: "easeInOut" }
        });
        
        setCurrentIndex(services.length);
        controls.set({ x: -services.length * slideWidth.current });
        return;
      }

      await controls.start({
        x: -nextIndex * slideWidth.current,
        transition: {
          duration: hasUserInteracted ? autoPlayDuration / 2 : autoPlayDuration,
          ease: "linear",
        },
      });

      setCurrentIndex(nextIndex);
    };

    autoPlayTimeoutRef.current = setTimeout(startAutoPlay, 100);
    return () => {
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      controls.stop();
    };
  }, [isAutoPlaying, controls, currentIndex, isHovered, isDragging, hasUserInteracted]);

  // Improved drag handling with better touch support
  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    setIsDragging(true);
    setHasUserInteracted(true);
    controls.stop();
    
    const clientX = 'touches' in event 
      ? event.touches[0].clientX 
      : (event as MouseEvent).clientX;
    
    dragStartX.current = clientX;
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const clientX = 'changedTouches' in event 
      ? event.changedTouches[0].clientX 
      : (event as MouseEvent).clientX;
    
    const dragDistance = clientX - dragStartX.current;
    const direction = dragDistance > 0 ? -1 : 1;
    
    // More forgiving drag threshold with velocity consideration
    if (Math.abs(dragDistance) > slideWidth.current * 0.15 || Math.abs(info.velocity.x) > 50) {
      const targetIndex = currentIndex + direction;
      
      await controls.start({
        x: -targetIndex * slideWidth.current,
        transition: {
          type: "spring",
          stiffness: 150,
          damping: 20,
          velocity: info.velocity.x * 0.5
        },
      });
      
      setCurrentIndex(targetIndex);

      // Reset position if needed
      if (targetIndex <= services.length / 2 || targetIndex >= services.length * 2.5) {
        resetPositionRef.current = setTimeout(() => {
          const resetIndex = targetIndex <= services.length / 2 
            ? services.length + (targetIndex % services.length)
            : services.length + (targetIndex % services.length);
          
          setCurrentIndex(resetIndex);
          controls.set({ x: -resetIndex * slideWidth.current });
        }, 100);
      }
    } else {
      // Smooth snap back to current position
      await controls.start({
        x: -currentIndex * slideWidth.current,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 25,
        },
      });
    }

    // Resume auto-play after interaction
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 1000);
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      if (resetPositionRef.current) clearTimeout(resetPositionRef.current);
    };
  }, []);

  // Debounce utility function
  function debounce(fn: Function, ms: number) {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  return (
    <div 
      className="relative w-full overflow-hidden px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Auto-play Progress Indicator */}
      {isAutoPlaying && !isHovered && !isDragging && (
        <motion.div 
          className="absolute top-0 left-4 right-4 h-0.5 bg-ap-red/20 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-full w-full bg-ap-red origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: hasUserInteracted ? autoPlayDuration / 2 : autoPlayDuration,
              ease: "linear",
              repeat: Infinity
            }}
          />
        </motion.div>
      )}

      {/* Service Cards Container */}
      <div 
        className="relative overflow-hidden touch-pan-y"
        ref={containerRef}
      >
        <motion.div 
          className="flex gap-6 py-4"
          animate={controls}
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.2}
          dragTransition={{ 
            bounceStiffness: 150, 
            bounceDamping: 20 
          }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          dragMomentum={true}
        >
          {extendedServices.map((service, index) => (
            <motion.div
              key={`${index}-${service.title}`}
              className={`
                flex-shrink-0 w-[85%] md:w-[calc(33.333%-1rem)]
                relative p-[2px] rounded-[2rem] overflow-hidden
                bg-gradient-to-br from-dark-lighter to-dark
                group hover:from-ap-red/20 hover:to-dark
                transition-all duration-500
                ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                select-none
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-full bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 border border-text-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/95 rounded-[2rem]" />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <service.Icon className="w-7 h-7 text-text-primary" />
                  </motion.div>
                  
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

      {/* Navigation Arrows - Only on Desktop */}
      <AnimatePresence>
        {!isMobile && (isHovered || isDragging) && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => {
                setHasUserInteracted(true);
                setIsAutoPlaying(false);
                const prevIndex = currentIndex - 1;
                controls.start({
                  x: -prevIndex * slideWidth.current,
                  transition: { type: "spring", stiffness: 300, damping: 30 },
                });
                setCurrentIndex(prevIndex);
              }}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-dark-lighter/50 backdrop-blur-sm hover:bg-ap-red/20 border border-text-primary/10 hover:border-ap-red/50 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => {
                setHasUserInteracted(true);
                setIsAutoPlaying(false);
                const nextIndex = currentIndex + 1;
                controls.start({
                  x: -nextIndex * slideWidth.current,
                  transition: { type: "spring", stiffness: 300, damping: 30 },
                });
                setCurrentIndex(nextIndex);
              }}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-dark-lighter/50 backdrop-blur-sm hover:bg-ap-red/20 border border-text-primary/10 hover:border-ap-red/50 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 