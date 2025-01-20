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
              className="flex flex-col"
            >
              <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden mb-6">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{trainer.name}</h3>
                  <p className="text-ap-red font-medium">{trainer.role}</p>
                </div>
              </div>

              <div>
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
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/about"
            className="inline-flex items-center text-ap-red hover:text-ap-red-dark font-semibold transition-colors group"
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
        </div>
      </div>
    </div>
  );
} 