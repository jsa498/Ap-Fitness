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
  },
  {
    title: 'Pre & Postnatal',
    description: 'Safe and effective workouts designed specifically for expecting and new mothers. Stay fit throughout your pregnancy and recovery.',
    Icon: FaHeart,
    features: [
      'Certified prenatal trainers',
      'Safe exercise modifications',
      'Pregnancy-specific nutrition',
      'Recovery guidance',
      'Community support'
    ]
  },
  {
    title: 'Nutritional Coaching',
    description: 'Comprehensive nutrition plans that complement your fitness routine. Learn how to fuel your body for optimal performance.',
    Icon: FaAppleAlt,
    features: [
      'Personalized meal plans',
      'Dietary analysis',
      'Shopping guides',
      'Recipe suggestions',
      'Regular check-ins'
    ]
  },
  {
    title: 'Online Coaching',
    description: 'Get expert guidance from anywhere. Perfect for busy professionals or those who prefer working out from home.',
    Icon: FaLaptop,
    features: [
      'Video consultations',
      'Custom workout plans',
      'Remote progress tracking',
      'Nutrition guidance',
      '24/7 support'
    ]
  }
];

export default function ServicesContent() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] mt-8 mb-16">
        <div className="absolute inset-0 mx-4 mt-4">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/DSC05643.jpeg"
              alt="AP Fitness Services"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
          </div>
        </div>
        <div className="relative h-full flex items-center justify-center text-text-primary">
          <div className="text-center bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 mx-4 border border-text-primary/10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Our Services</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4 drop-shadow-lg">
              Professional fitness services tailored to help you achieve your goals
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-[2px] rounded-[2rem] bg-gradient-to-br from-dark-lighter to-dark group hover:from-ap-red/20 hover:to-dark transition-all duration-500"
            >
              <div className="relative h-full bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 border border-text-primary/10 overflow-hidden">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/95 rounded-[2rem]" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <service.Icon className="w-7 h-7 text-text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold ml-4 text-text-primary group-hover:text-ap-red transition-colors">{service.title}</h2>
                  </div>
                  <p className="text-text-secondary mb-6 leading-relaxed">{service.description}</p>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-text-primary mb-4">Features:</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.map((feature, i) => (
                        <div 
                          key={i} 
                          className="flex items-center text-text-secondary bg-dark/40 rounded-xl p-3 border border-text-primary/5 group-hover:border-ap-red/20 transition-all duration-300"
                        >
                          <span className="w-2 h-2 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full mr-3"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
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
      </section>
    </main>
  );
} 