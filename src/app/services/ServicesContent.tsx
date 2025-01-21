'use client';

import { motion } from 'framer-motion';
import { FaDumbbell, FaUsers, FaHeart, FaAppleAlt, FaLaptop } from 'react-icons/fa';
import { GiBoxingGlove } from 'react-icons/gi';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: 'Personal Training',
    description: 'One-on-one personalized training sessions tailored to your specific goals and fitness level. Our certified kinesiologists will create a custom program just for you.',
    Icon: FaDumbbell,
    features: [
      'Initial fitness assessment',
      'Customized workout plans',
      'Nutrition guidance',
      'Progress tracking',
      'Flexible scheduling'
    ]
  },
  {
    title: 'Group Fitness',
    description: 'Join our energetic group classes designed for all fitness levels. Experience the motivation and fun of working out with others.',
    Icon: FaUsers,
    features: [
      'Various class types',
      'Expert instruction',
      'Supportive environment',
      'Flexible schedule',
      'Community events'
    ]
  },
  {
    title: 'Boxing & Kickboxing',
    description: 'Learn proper technique while getting an incredible full-body workout. Perfect for stress relief and building confidence.',
    Icon: GiBoxingGlove,
    features: [
      'Technical instruction',
      'Cardio conditioning',
      'Strength training',
      'Sparring sessions',
      'All skill levels'
    ]
  }
];

export default function ServicesContent() {
  return (
    <main className="min-h-screen">
      {/* Add your existing Services page JSX here */}
    </main>
  );
} 