'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaUsers, FaCalendarAlt, FaCheck, FaArrowRight } from 'react-icons/fa';
import LoadingSpinner from '@/components/LoadingSpinner';

// Package data
const personalTrainingPackages = {
  title: "Personal Training",
  description: "Determining the packages for personal training involves several variables to tailor the experience to your unique needs and goals.",
  options: [
    {
      title: "Duration Options",
      icon: FaClock,
      items: ["30 min sessions", "45 min sessions", "1 hour sessions"]
    },
    {
      title: "Package Sizes",
      icon: FaCalendarAlt,
      items: ["8 sessions", "12 sessions", "24 sessions", "36 sessions"]
    },
    {
      title: "Training Types",
      icon: FaUsers,
      items: ["Personal Training", "Tandem Training", "Small Group Training"]
    }
  ]
};

const onlineCoachingPackages = [
  {
    title: "1 Month Online Coaching",
    duration: "1 month",
    features: [
      "Initial Consultation",
      "Custom Workout Program",
      "Custom Nutrition Program",
      "Healthy Recipe Handbook",
      "Access to training software",
      "Weekly check-ins",
      "Daily text/phone support",
      "Group chat support"
    ]
  },
  {
    title: "3 Month Online Coaching",
    duration: "3 months",
    features: [
      "Initial Consultation",
      "Custom Workout Program",
      "Custom Nutrition Program",
      "Healthy Recipe Handbook",
      "Access to training software",
      "Weekly check-ins",
      "Daily text/phone support",
      "Group chat support"
    ]
  },
  {
    title: "6 Month Transformation",
    duration: "6 months",
    popular: true,
    features: [
      "Initial Consultation",
      "Custom Workout Program",
      "Custom Nutrition Program",
      "Healthy Recipe Handbook",
      "Access to training software",
      "Weekly check-ins",
      "Daily text/phone support",
      "Group chat support"
    ]
  }
];

export default function PackagesContent() {
  const [activeTab, setActiveTab] = useState<'personal' | 'online'>('personal');
  const [isLoading, setIsLoading] = useState(true);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-text-secondary animate-pulse">Loading amazing packages...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-ap-red origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[50vh] mt-8 mb-16"
      >
        <div className="absolute inset-0 mx-4 mt-4">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/DSC05643.jpeg"
              alt="AP Fitness Packages"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative h-full flex items-center justify-center text-text-primary"
        >
          <div className="text-center bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 mx-4 border border-text-primary/10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Training Packages</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4 drop-shadow-lg">
              Choose the perfect training package tailored to your fitness goals and lifestyle
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Package Selection Tabs */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('personal')}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
              activeTab === 'personal'
                ? 'bg-ap-red text-text-primary'
                : 'bg-dark-lighter text-text-primary hover:bg-ap-red/20'
            }`}
          >
            Personal Training
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('online')}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
              activeTab === 'online'
                ? 'bg-ap-red text-text-primary'
                : 'bg-dark-lighter text-text-primary hover:bg-ap-red/20'
            }`}
          >
            Online Coaching
          </motion.button>
        </div>

        {/* Package Content */}
        <div className="max-w-7xl mx-auto">
          {/* Personal Training Content */}
          {activeTab === 'personal' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-text-primary mb-6"
                >
                  {personalTrainingPackages.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-text-secondary"
                >
                  {personalTrainingPackages.description}
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {personalTrainingPackages.options.map((option, index) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -10 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-[2rem] blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500" />
                    <div className="relative bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 border border-text-primary/10 h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-all duration-300">
                        <option.icon className="w-8 h-8 text-text-primary" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-text-primary mb-6">{option.title}</h3>
                      
                      <ul className="space-y-4">
                        {option.items.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="flex items-center text-text-secondary"
                          >
                            <div className="w-8 h-8 bg-ap-red/10 rounded-lg flex items-center justify-center mr-4">
                              <FaCheck className="w-4 h-4 text-ap-red" />
                            </div>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Online Coaching Content */}
          {activeTab === 'online' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-text-primary mb-6"
                >
                  Online Coaching Programs
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-text-secondary"
                >
                  Get professional guidance and support from anywhere with our comprehensive online coaching programs.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {onlineCoachingPackages.map((package_, index) => (
                  <motion.div
                    key={package_.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -10 }}
                    className={`relative group ${package_.popular ? 'md:scale-105' : ''}`}
                  >
                    <div className={`absolute inset-0 rounded-[2rem] blur-xl opacity-0 transition-all duration-500 ${
                      package_.popular 
                        ? 'bg-gradient-to-br from-ap-red to-ap-red-dark group-hover:opacity-20'
                        : 'bg-gradient-to-br from-dark-lighter to-dark group-hover:opacity-10'
                    }`} />
                    <div className={`relative h-full backdrop-blur-sm rounded-[2rem] p-8 border border-text-primary/10 ${
                      package_.popular
                        ? 'bg-gradient-to-br from-ap-red/20 to-ap-red-dark/5'
                        : 'bg-dark-lighter/20'
                    }`}>
                      {package_.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <div className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-6 py-1 rounded-full text-sm font-semibold shadow-lg">
                            Most Popular
                          </div>
                        </div>
                      )}
                      
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-text-primary mb-2">{package_.title}</h3>
                        <p className="text-text-secondary mb-4">{package_.duration} program</p>
                      </div>
                      
                      <ul className="space-y-4 mb-8">
                        {package_.features.map((feature, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="flex items-center text-text-secondary"
                          >
                            <div className="w-8 h-8 bg-ap-red/10 rounded-lg flex items-center justify-center mr-4">
                              <FaCheck className="w-4 h-4 text-ap-red" />
                            </div>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-auto"
                      >
                        <Link
                          href={`/book?package=${encodeURIComponent(package_.title)}`}
                          className={`block w-full text-center py-4 rounded-full font-semibold transition-all duration-300 ${
                            package_.popular
                              ? 'bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary shadow-lg hover:shadow-ap-red/30'
                              : 'bg-dark text-text-primary hover:bg-ap-red/20'
                          }`}
                        >
                          Get Started
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative py-20"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[3rem] mx-4">
          <Image
            src="/images/DSC09177.jpeg"
            alt="Training Session"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 border border-text-primary/10">
            <h2 className="text-4xl font-bold mb-6 text-text-primary">Let's Get Started</h2>
            <p className="text-xl mb-8 text-text-primary">
              Book a complimentary consultation to discuss your goals and find the perfect package for your fitness journey.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/book"
                className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] inline-block"
              >
                Book a Consultation
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
} 