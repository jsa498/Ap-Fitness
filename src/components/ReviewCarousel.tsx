'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import Image from 'next/image';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url: string;
  relative_time_description: string;
}

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollX = useRef(0);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();
        if (data.reviews) {
          // Sort reviews by time (most recent first) and take only the 10 most recent
          const sortedReviews = data.reviews
            .sort((a: Review, b: Review) => b.time - a.time)
            .slice(0, 10);
          // Triple the reviews for infinite scroll
          setReviews([...sortedReviews, ...sortedReviews, ...sortedReviews]);
          setCurrentIndex(sortedReviews.length); // Start from middle set
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

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

  // Helper function to calculate the centered position
  const calculateCenteredOffset = (index: number, containerWidth: number, cardWidth: number) => {
    const centeringOffset = (containerWidth - cardWidth) / 2;
    const cardPosition = -index * (cardWidth + 24);
    return cardPosition + centeringOffset;
  };

  // Mouse/Touch handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return;
    setIsDragging(true);
    controls.stop();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    dragStartScrollX.current = 0;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current || isAnimating) return;

    const container = containerRef.current;
    const cardWidth = container.offsetWidth * (isMobile ? 0.85 : 0.333);
    const baseOffset = calculateCenteredOffset(currentIndex, container.offsetWidth, cardWidth);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStartX.current;
    dragStartScrollX.current = diff;

    // Add resistance to prevent over-dragging
    const resistance = 0.8;
    const adjustedDiff = diff * resistance;
    
    controls.set({ x: baseOffset + adjustedDiff });
  };

  const handleDragEnd = async () => {
    if (!containerRef.current || isAnimating || !isDragging) return;
    
    setIsDragging(false);
    setIsAnimating(true);
    
    try {
      const container = containerRef.current;
      const cardWidth = container.offsetWidth * (isMobile ? 0.85 : 0.333);
      const dragDistance = dragStartScrollX.current;

      let targetIndex = currentIndex;
      const dragThreshold = cardWidth * 0.3;

      if (Math.abs(dragDistance) > dragThreshold) {
        targetIndex += dragDistance > 0 ? -1 : 1;
      }

      const originalReviewsLength = reviews.length / 3;
      
      // Update boundary conditions
      if (targetIndex < originalReviewsLength) {
        targetIndex = originalReviewsLength * 2 - 1;
      } else if (targetIndex >= originalReviewsLength * 2) {
        targetIndex = originalReviewsLength;
      }

      const finalOffset = calculateCenteredOffset(targetIndex, container.offsetWidth, cardWidth);
      
      await controls.start({
        x: finalOffset,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 25,
          restDelta: 0.5
        }
      });

      setCurrentIndex(targetIndex);
    } finally {
      setIsAnimating(false);
      dragStartScrollX.current = 0;
    }
  };

  if (reviews.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden px-4">
      <div 
        className="relative overflow-hidden"
        ref={containerRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <motion.div 
          className="flex gap-6 py-4"
          animate={controls}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={`${index}-${review.author_name}`}
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
                  {/* Author Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-ap-red/20"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary group-hover:text-ap-red transition-colors">
                        {review.author_name}
                      </h3>
                      <p className="text-sm text-text-secondary">{review.relative_time_description}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-400'
                        } transition-colors group-hover:text-yellow-500`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <div className="relative">
                    <FaQuoteLeft className="absolute -left-2 -top-2 w-8 h-8 text-ap-red/20 group-hover:text-ap-red/30 transition-colors" />
                    <p className="text-text-secondary pl-8 line-clamp-4 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 