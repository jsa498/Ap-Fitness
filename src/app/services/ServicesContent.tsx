'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaDumbbell, FaUsers, FaHeart, FaAppleAlt, FaLaptop, FaClinicMedical, FaUserMd, FaHandHoldingHeart } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: 'Personal Training',
    description: 'One-on-one personalized training sessions with certified kinesiologists. Our expert trainers create custom programs tailored to your specific goals and fitness level.',
    Icon: FaDumbbell,
    features: [
      'Initial fitness assessment',
      'Customized workout plans',
      'Progress tracking',
      'Expert guidance',
      'Flexible scheduling'
    ]
  },
  {
    title: 'ICBC Active Rehab',
    description: 'Specialized rehabilitation programs for ICBC clients. Our kinesiologists work with you to recover from injuries and regain your strength and mobility.',
    Icon: FaClinicMedical,
    features: [
      'Injury assessment',
      'Customized rehab plans',
      'Progress documentation',
      'ICBC approved programs',
      'Expert rehabilitation guidance'
    ]
  },
  {
    title: 'Gym Membership',
    description: 'Access to our state-of-the-art facility equipped with modern fitness equipment. Train in a welcoming environment with professional support when needed.',
    Icon: GiWeightLiftingUp,
    features: [
      'Modern equipment',
      'Flexible hours',
      'Professional environment',
      'Community atmosphere',
      'Expert staff available'
    ]
  },
  {
    title: 'Online Coaching',
    description: 'Remote training programs designed for those who prefer working out from home or have busy schedules. Get expert guidance wherever you are.',
    Icon: FaLaptop,
    features: [
      'Virtual consultations',
      'Custom workout plans',
      'Remote progress tracking',
      'Flexible scheduling',
      'Ongoing support'
    ]
  },
  {
    title: 'Group Classes',
    description: 'Energetic group sessions led by experienced trainers. Experience the motivation and fun of working out with others while reaching your fitness goals.',
    Icon: FaUsers,
    features: [
      'Various class types',
      'Expert instruction',
      'Motivating environment',
      'Community support',
      'All fitness levels'
    ]
  },
  {
    title: 'Nutritional Coaching',
    description: 'Comprehensive nutrition guidance to complement your fitness journey. Learn how to fuel your body effectively for optimal performance and results.',
    Icon: FaAppleAlt,
    features: [
      'Personalized meal plans',
      'Dietary analysis',
      'Nutrition education',
      'Progress monitoring',
      'Ongoing support'
    ]
  },
  {
    title: 'Physiotherapy',
    description: 'Professional physiotherapy services to help you recover from injuries, manage pain, and improve mobility. Our experts work with you to achieve optimal physical function.',
    Icon: FaUserMd,
    features: [
      'Expert assessment',
      'Treatment plans',
      'Manual therapy',
      'Exercise prescription',
      'Recovery guidance'
    ]
  },
  {
    title: 'Massage Therapy',
    description: 'Professional massage therapy services to help reduce muscle tension, improve circulation, and promote overall wellness. Our experienced therapists provide customized treatments.',
    Icon: FaHandHoldingHeart,
    features: [
      'Customized treatments',
      'Pain management',
      'Stress reduction',
      'Injury recovery',
      'Deep tissue massage'
    ]
  }
];

export default function ServicesContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Set loaded state after initial render
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  return (
    <main className="min-h-screen pt-20">
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
              alt="AP Fitness Services"
              fill
              className="object-cover brightness-50"
              priority
              onLoad={() => setIsLoaded(true)}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Our Services</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4 drop-shadow-lg">
              Professional fitness services tailored to help you achieve your goals
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="relative p-[2px] rounded-[2rem] bg-gradient-to-br from-dark-lighter to-dark group hover:from-ap-red/20 hover:to-dark transition-all duration-500"
            >
              <div className="relative h-full bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 border border-text-primary/10 overflow-hidden">
                {/* Enhanced Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/95 rounded-[2rem]" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-500">
                      <service.Icon className="w-8 h-8 text-text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary group-hover:text-ap-red transition-colors">
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-text-secondary mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features with enhanced styling */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <div className="w-1 h-5 bg-ap-red rounded-full"></div>
                      Features
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.map((feature, i) => (
                        <div 
                          key={i} 
                          className="flex items-center text-text-secondary bg-dark/40 rounded-xl p-3 border border-text-primary/5 group-hover:border-ap-red/20 transition-all duration-300 hover:bg-dark/60"
                        >
                          <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full mr-3"></div>
                          <span className="text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
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
            <h2 className="text-4xl font-bold mb-6 text-text-primary drop-shadow-lg">Ready to Start Your Fitness Journey?</h2>
            <p className="text-xl mb-8 text-text-primary drop-shadow-lg">
              Book a consultation with our expert trainers and take the first step towards achieving your fitness goals.
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