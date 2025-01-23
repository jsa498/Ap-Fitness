'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const trainers = [
  {
    name: 'Prabhjot Mand',
    role: 'KINESIOLOGIST / PERSONAL TRAINER',
    image: '/images/DSC05663.jpeg',
    quote: 'Dedicated to helping clients achieve their fitness goals through evidence-based training and personalized attention.',
    specialties: ['Strength Training', 'Sports Performance', 'Injury Prevention', 'Weight Management'],
  },
  {
    name: 'Amrit Jagdeo',
    role: 'KINESIOLOGIST / PERSONAL TRAINER',
    image: '/images/DSC09205.jpeg',
    quote: 'Passionate about empowering clients to reach their full potential through holistic wellness and sustainable fitness practices.',
    specialties: ['Strength Training', 'Sports Performance', 'Injury Prevention', 'Weight Management'],
  },
];

export default function TrainersPreview() {
  return (
    <div className="relative py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col group"
            >
              <div className="relative h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden mb-6">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className={`object-cover brightness-90 transition-transform duration-300 group-hover:scale-105 ${
                    trainer.name === 'Prabhjot Mand' ? 'object-[center_60%]' : 'object-center'
                  }`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
                
                {/* Content Container - Centered and lowered */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%]">
                  {/* Glass card for text - Made more compact */}
                  <div className="bg-dark/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg">
                    {/* Name with red accent line */}
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-1 h-6 bg-ap-red rounded-full"></div>
                      <h3 className="text-xl font-bold text-white">
                        {trainer.name}
                      </h3>
                    </div>
                    
                    {/* Role badge - Made more compact */}
                    <div className="bg-ap-red/90 backdrop-blur-sm px-3 py-0.5 rounded-lg inline-block mb-2">
                      <p className="text-white font-bold tracking-wider text-xs">
                        {trainer.role}
                      </p>
                    </div>
                    
                    {/* Quote with subtle styling - Made more compact */}
                    <div className="relative pl-3">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-ap-red/30 rounded-full"></div>
                      <p className="text-white/90 text-xs italic leading-relaxed">
                        {trainer.quote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redesigned Specialties Section - More elegant and minimal */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-0.5 h-4 bg-ap-red rounded-full"></div>
                  <h4 className="text-base font-bold text-white/90">Specialties</h4>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {trainer.specialties.map((specialty) => (
                    <div
                      key={specialty}
                      className="group relative inline-flex"
                    >
                      <span className="relative px-3 py-1 rounded-full text-sm text-white/80 font-medium border border-white/10 hover:border-ap-red/30 hover:text-white transition-all duration-300">
                        {specialty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            href="/about"
            className="inline-flex items-center bg-gradient-to-r from-dark-lighter to-dark hover:from-ap-red hover:to-ap-red-dark px-8 py-3 rounded-full text-text-primary font-semibold transition-all duration-300 group"
          >
            Meet Our Team
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
    </div>
  );
} 