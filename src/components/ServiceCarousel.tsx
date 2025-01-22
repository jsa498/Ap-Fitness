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
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const dragStartX = useRef(0);
  const resetPositionRef = useRef<NodeJS.Timeout>();
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-play duration and timing
  const autoPlayDuration = 5.0;
  const slideDelay = 1000;

  // Helper function to calculate the centered position for a given index
  const calculateCenteredOffset = (index: number, containerWidth: number, cardWidth: number) => {
    const centeringOffset = (containerWidth - cardWidth) / 2;
    const cardPosition = -index * (cardWidth + 24);
    return cardPosition + centeringOffset;
  };

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

  // Update position on resize
  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current && !isDragging && !isAnimating) {
        const container = containerRef.current;
        const cardWidth = container.offsetWidth * (isMobile ? 0.85 : 0.333);
        const offset = calculateCenteredOffset(currentIndex, container.offsetWidth, cardWidth);
        controls.set({ x: offset });
      }
    };

    const debouncedUpdate = debounce(updatePosition, 250);
    updatePosition();
    window.addEventListener('resize', debouncedUpdate);
    return () => window.removeEventListener('resize', debouncedUpdate);
  }, [isMobile, controls, currentIndex, isDragging, isAnimating]);

  // Auto-play effect
  useEffect(() => {
    const startAutoPlay = async () => {
      if (isDragging || isAnimating) return;
      
      const container = containerRef.current;
      if (!container) return;

      const cardWidth = container.offsetWidth * (isMobile ? 0.85 : 0.333);
      const nextIndex = currentIndex + 1;

      setIsAnimating(true);

      try {
        // Move to next position
        const nextOffset = calculateCenteredOffset(nextIndex, container.offsetWidth, cardWidth);
        await controls.start({
          x: nextOffset,
          transition: { 
            duration: autoPlayDuration,
            ease: [0.4, 0.0, 0.2, 1],
          }
        });

        // Update index and handle reset if needed
        if (nextIndex >= services.length * 2) {
          setCurrentIndex(services.length);
          const resetOffset = calculateCenteredOffset(services.length, container.offsetWidth, cardWidth);
          controls.set({ x: resetOffset });
        } else {
          setCurrentIndex(nextIndex);
        }
      } finally {
        setIsAnimating(false);
      }
    };

    const timer = setInterval(startAutoPlay, autoPlayDuration * 1000 + slideDelay);
    return () => clearInterval(timer);
  }, [controls, currentIndex, isMobile, isDragging, isAnimating]);

  // Drag handlers
  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    if (isAnimating) return;
    
    setIsDragging(true);
    controls.stop();
    
    const clientX = 'touches' in event 
      ? event.touches[0].clientX 
      : (event as MouseEvent).clientX;
    
    dragStartX.current = clientX;
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging || !containerRef.current || isAnimating) return;
    
    const container = containerRef.current;
    const cardWidth = container.offsetWidth * (isMobile ? 0.85 : 0.333);
    const baseOffset = calculateCenteredOffset(currentIndex, container.offsetWidth, cardWidth);
    const dragOffset = info.offset.x;
    
    // Apply drag with limits
    const maxDrag = cardWidth + 24;
    const clampedDrag = Math.max(Math.min(dragOffset, maxDrag), -maxDrag);
    controls.set({ x: baseOffset + clampedDrag });
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!containerRef.current || isAnimating) return;
    
    setIsDragging(false);
    setIsAnimating(true);
    
    try {
      const container = containerRef.current;
      const cardWidth = container.offsetWidth * (isMobile ? 0.85 : 0.333);
      const dragDistance = info.offset.x;
      const velocity = info.velocity.x;
      
      // Determine target index
      let targetIndex = currentIndex;
      if (Math.abs(dragDistance) > cardWidth * 0.15 || Math.abs(velocity) > 500) {
        targetIndex += dragDistance > 0 ? -1 : 1;
      }
      
      // Ensure target index stays within bounds
      targetIndex = Math.max(0, Math.min(targetIndex, extendedServices.length - 1));
      
      // Animate to final position
      const finalOffset = calculateCenteredOffset(targetIndex, container.offsetWidth, cardWidth);
      await controls.start({
        x: finalOffset,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 25,
          velocity: velocity * 0.1,
          restDelta: 0.001
        },
      });

      // Handle reset if needed
      if (targetIndex <= services.length / 2 || targetIndex >= services.length * 2.5) {
        const resetIndex = targetIndex <= services.length / 2 
          ? services.length + (targetIndex % services.length)
          : services.length + (targetIndex % services.length);
        
        setCurrentIndex(resetIndex);
        const resetOffset = calculateCenteredOffset(resetIndex, container.offsetWidth, cardWidth);
        controls.set({ x: resetOffset });
      } else {
        setCurrentIndex(targetIndex);
      }
    } finally {
      setIsAnimating(false);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (resetPositionRef.current) clearTimeout(resetPositionRef.current);
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    };
  }, []);

  // Debounce utility
  const debounce = (fn: (...args: any[]) => void, ms: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  };

  return (
    <div className="relative w-full overflow-hidden px-4">
      <div 
        className="relative overflow-hidden touch-pan-y"
        ref={containerRef}
      >
        <motion.div 
          className="flex gap-6 py-4"
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={true}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {extendedServices.map((service, index) => (
            <motion.div
              key={`${index}-${service.title}`}
              className={`
                flex-shrink-0 w-[85%] md:w-[33.333%]
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
    </div>
  );
} 