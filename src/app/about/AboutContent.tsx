'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaMedal, FaUsers, FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const trainers = [
  {
    name: 'Prabhjot Singh',
    role: 'Co-Founder & Head Trainer',
    image: '/images/DSC05701.jpeg',
    specialties: ['Personal Training', 'Strength & Conditioning', 'Boxing'],
    certifications: ['B.Sc. Kinesiology', 'CSEP-CPT', 'Boxing Coach Level 2'],
    bio: 'With over 8 years of experience in fitness and athletics, Prabhjot brings expertise in strength training and boxing to help clients achieve their goals.'
  },
  {
    name: 'Amrit Singh',
    role: 'Co-Founder & Wellness Director',
    image: '/images/DSC09205.jpeg',
    specialties: ['Nutrition Coaching', 'Pre/Postnatal Fitness', 'Group Training'],
    certifications: ['B.Sc. Kinesiology', 'Precision Nutrition Level 2', 'Pre/Postnatal Specialist'],
    bio: 'Amrit specializes in holistic wellness, combining nutrition coaching with personalized training to create sustainable lifestyle changes.'
  }
];

const stats = [
  { icon: FaUsers, value: '500+', label: 'Happy Clients' },
  { icon: FaGraduationCap, value: '✅', label: 'Certifications' },
  { icon: FaMedal, value: '5+', label: 'Years Experience' },
  { icon: FaHeart, value: '500+', label: 'Transformations' }
];

export default function AboutContent() {
  return (
    <main className="min-h-screen">
      {/* Add your existing About page JSX here */}
    </main>
  );
} 