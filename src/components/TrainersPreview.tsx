'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const trainers = [
  {
    name: 'Prabhjot Singh',
    role: 'Co-Founder & Head Trainer',
    image: '/images/DSC05701.jpeg',
    specialties: ['Personal Training', 'Strength & Conditioning', 'Boxing'],
  },
  {
    name: 'Amrit Singh',
    role: 'Co-Founder & Wellness Director',
    image: '/images/DSC09205.jpeg',
    specialties: ['Nutrition Coaching', 'Pre/Postnatal Fitness', 'Group Training'],
  },
];

export default function TrainersPreview() {
  const [activeTrainer, setActiveTrainer] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setActiveTrainer((prev) => (prev + 1) % trainers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  return (
    <div 
      className="relative overflow-hidden py-12"
      onMouseEnter={() => setIsAutoScrolling(false)}
      onMouseLeave={() => setIsAutoScrolling(true)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          <AnimatePresence mode="wait">
            {trainers.map((trainer, index) => (
              index === activeTrainer && (
                <motion.div
                  key={trainer.name}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-2xl font-bold text-text-primary mb-2">{trainer.name}</h3>
                      <p className="text-ap-red font-medium">{trainer.role}</p>
                    </motion.div>
                  </div>

                  <div className="lg:pl-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-xl font-semibold mb-4 text-text-primary">Specialties</h4>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {trainer.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="bg-dark-lighter px-4 py-2 rounded-full text-text-secondary border border-dark-border"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <Link
                        href="/about"
                        className="inline-flex items-center text-ap-red hover:text-ap-red-dark font-semibold transition-colors"
                      >
                        Meet Our Team
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
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {trainers.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveTrainer(index);
                  setIsAutoScrolling(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeTrainer
                    ? 'bg-ap-red w-6'
                    : 'bg-dark-lighter hover:bg-ap-red/50'
                }`}
                aria-label={`View trainer ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 