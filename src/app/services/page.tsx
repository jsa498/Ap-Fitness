'use client';

import { motion } from 'framer-motion';
import { FaDumbbell, FaUsers, FaHeart, FaAppleAlt, FaLaptop } from 'react-icons/fa';
import { GiBoxingGlove } from 'react-icons/gi';
import Image from 'next/image';

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

export default function Services() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] mb-16">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC05203-min.jpeg"
            alt="AP Fitness Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dark/80" />
        </div>
        <div className="relative h-full flex items-center justify-center text-text-primary">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Professional fitness services tailored to help you achieve your goals
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-lighter rounded-lg shadow-dark-lg overflow-hidden border border-dark-border hover:border-ap-red/50 transition-colors"
            >
              <div className="p-6 bg-gradient-to-br from-dark to-dark-lighter">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center shadow-lg">
                    <service.Icon className="w-6 h-6 text-text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold ml-4 text-text-primary">{service.title}</h2>
                </div>
                <p className="text-text-secondary mb-6">{service.description}</p>
                
                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-text-primary">Features:</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-text-secondary">
                        <span className="w-2 h-2 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-dark to-dark-lighter border-t border-dark-border py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">Ready to Start Your Fitness Journey?</h2>
          <p className="text-text-secondary mb-8">
            Book a consultation with our expert trainers and take the first step towards achieving your fitness goals.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            Book a Consultation
          </motion.button>
        </div>
      </section>
    </main>
  );
} 