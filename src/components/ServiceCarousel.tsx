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
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const dragStartX = useRef(0);
  const lastDragPosition = useRef(0);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();
  const dragVelocity = useRef(0);
  const lastDragTime = useRef(0);

  // Reduced autoplay duration
  const autoPlayDuration = 3.0;

  // Helper function to calculate the centered position
  const calculateCenteredOffset = (index: number, containerWidth: number, cardWidth: number) => {
    const centeringOffset = (containerWidth - cardWidth) / 2;
    const cardPosition = -index * (cardWidth + 24);
    return cardPosition + centeringOffset;
  };

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Autoplay effect
  useEffect(() => {
    if (!isVisible || isDragging || isAnimating) return;

    const startAutoPlay = async () => {
      const container = containerRef.current;
      if (!container) return;

      const cardWidth = container.offsetWidth * (isMobile ? 0.85 : 0.333);
      const nextIndex = currentIndex + 1;

      setIsAnimating(true);

      try {
        const nextOffset = calculateCenteredOffset(nextIndex, container.offsetWidth, cardWidth);
        await controls.start({
          x: nextOffset,
          transition: { 
            duration: autoPlayDuration,
            ease: [0.4, 0.0, 0.2, 1],
          }
        });

        if (nextIndex >= services.length * 2) {
          setCurrentIndex(services.length);
          controls.set({ 
            x: calculateCenteredOffset(services.length, container.offsetWidth, cardWidth) 
          });
        } else {
          setCurrentIndex(nextIndex);
        }
      } finally {
        setIsAnimating(false);
      }
    };

    const timer = setInterval(startAutoPlay, autoPlayDuration * 1000);
    startAutoPlay();

    return () => clearInterval(timer);
  }, [controls, currentIndex, isMobile, isDragging, isAnimating, isVisible]);

  // Drag handlers with improved physics
  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    if (isAnimating) return;
    
    setIsDragging(true);
    controls.stop();
    
    const clientX = 'touches' in event 
      ? event.touches[0].clientX 
      : (event as MouseEvent).clientX;
    
    dragStartX.current = clientX;
    lastDragPosition.current = clientX;
    lastDragTime.current = Date.now();
    dragVelocity.current = 0;
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging || !containerRef.current || isAnimating) return;

    const container = containerRef.current;
    const cardWidth = container.offsetWidth * (isMobile ? 0.85 : 0.333);
    const baseOffset = calculateCenteredOffset(currentIndex, container.offsetWidth, cardWidth);
    
    // Calculate real-time velocity
    const currentTime = Date.now();
    const timeDelta = currentTime - lastDragTime.current;
    if (timeDelta > 0) {
      const currentPosition = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
      const positionDelta = currentPosition - lastDragPosition.current;
      dragVelocity.current = positionDelta / timeDelta;
      lastDragPosition.current = currentPosition;
      lastDragTime.current = currentTime;
    }

    // Apply progressive resistance based on drag distance
    const dragOffset = info.offset.x;
    const dragProgress = Math.abs(dragOffset) / cardWidth;
    const resistance = 1 - Math.min(dragProgress * 0.5, 0.5);
    const adjustedOffset = dragOffset * resistance;

    controls.set({ x: baseOffset + adjustedOffset });
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!containerRef.current || isAnimating) {
      setIsDragging(false);
      return;
    }
    
    setIsDragging(false);
    setIsAnimating(true);
    
    try {
      const container = containerRef.current;
      const cardWidth = container.offsetWidth * (isMobile ? 0.85 : 0.333);
      const dragDistance = info.offset.x;
      
      // Use calculated velocity for more natural feeling
      const velocity = Math.abs(dragVelocity.current) > Math.abs(info.velocity.x) 
        ? dragVelocity.current 
        : info.velocity.x;

      let targetIndex = currentIndex;
      const dragThreshold = cardWidth * 0.15;
      const velocityThreshold = 0.5;

      if (Math.abs(dragDistance) > dragThreshold || Math.abs(velocity) > velocityThreshold) {
        targetIndex += dragDistance > 0 ? -1 : 1;
      }

      targetIndex = Math.max(
        services.length / 2, 
        Math.min(targetIndex, services.length * 2.5 - 1)
      );

      const finalOffset = calculateCenteredOffset(targetIndex, container.offsetWidth, cardWidth);
      
      // Smoother spring animation
      await controls.start({
        x: finalOffset,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 15,
          restDelta: 0.001,
          restSpeed: 0.001,
        }
      });

      // Reset position if needed
      if (targetIndex <= services.length / 2 || targetIndex >= services.length * 2.5) {
        const resetIndex = services.length + (targetIndex % services.length);
        setCurrentIndex(resetIndex);
        controls.set({ 
          x: calculateCenteredOffset(resetIndex, container.offsetWidth, cardWidth) 
        });
      } else {
        setCurrentIndex(targetIndex);
      }
    } finally {
      setIsAnimating(false);
      dragVelocity.current = 0;
    }
  };

  return (
    <div className="relative w-full overflow-hidden px-4">
      <div 
        className="relative overflow-hidden"
        ref={containerRef}
      >
        <motion.div 
          className="flex gap-6 py-4"
          drag="x"
          dragDirectionLock
          dragPropagation={false}
          dragConstraints={containerRef}
          dragElastic={0.03}
          dragTransition={{ power: 0.1, timeConstant: 200 }}
          dragMomentum={false}
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
                select-none touch-none
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