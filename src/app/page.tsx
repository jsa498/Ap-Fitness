'use client';

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ServiceCarousel from '@/components/ServiceCarousel'
import TrainersPreview from '@/components/TrainersPreview'
import { FaDumbbell, FaUsers, FaHeart } from 'react-icons/fa'
import { GiBoxingGlove } from 'react-icons/gi'
import { FaAppleAlt, FaLaptop } from 'react-icons/fa'

export default function Home() {
  const services = [
    {
      title: 'Personal Training',
      description: 'Customized one-on-one sessions to achieve your specific fitness goals.',
      Icon: FaDumbbell,
    },
    {
      title: 'Group Fitness',
      description: 'Fun and supportive classes for all fitness levels.',
      Icon: FaUsers,
    },
    {
      title: 'Boxing & Kickboxing',
      description: 'High-energy sessions focusing on technique, strength, and endurance.',
      Icon: GiBoxingGlove,
    },
    {
      title: 'Pre & Postnatal',
      description: 'Specialized programs to support mothers before and after childbirth.',
      Icon: FaHeart,
    },
    {
      title: 'Nutritional Coaching',
      description: 'Personalized plans to enhance fitness and overall wellness.',
      Icon: FaAppleAlt,
    },
    {
      title: 'Online Coaching',
      description: 'Flexible training accessible from anywhere.',
      Icon: FaLaptop,
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC05227-2-min.jpeg"
            alt="AP Fitness Gym"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/95 via-dark/90 to-dark/95" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-text-primary px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-center mb-4"
          >
            Transform Your Life
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-center mb-8 max-w-2xl"
          >
            Professional personal training and wellness services by certified kinesiologists
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/book"
              className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Book a Consultation
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-text-primary p-1"
          >
            <motion.div className="w-1.5 h-1.5 bg-text-primary rounded-full mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-lighter border-y border-dark-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 px-4"
          >
            <h2 className="text-4xl font-bold mb-4 text-text-primary">Our Services</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Discover our comprehensive range of fitness and wellness services
              designed to help you achieve your goals
            </p>
          </motion.div>
          <ServiceCarousel />
        </div>
      </section>

      {/* Trainers Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 px-4"
          >
            <h2 className="text-4xl font-bold mb-4 text-text-primary">Meet Our Trainers</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Expert guidance from certified kinesiologists dedicated to your success
            </p>
          </motion.div>
          <TrainersPreview />
        </div>
      </section>

      {/* Facility Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-text-primary">Our Facility</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Train in our state-of-the-art facility equipped with the latest fitness equipment
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: '/images/DSC05170-min.jpeg', alt: 'Weight Training Area', title: 'Weight Training' },
              { src: '/images/DSC05185-min.jpeg', alt: 'Cardio Section', title: 'Cardio Zone' },
              { src: '/images/DSC05169-min.jpeg', alt: 'Boxing Area', title: 'Boxing Area' }
            ].map((image, index) => (
              <motion.div
                key={image.alt}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="relative h-64 rounded-[2rem] overflow-hidden shadow-dark-lg group bg-gradient-to-br from-dark-lighter to-dark p-[2px]"
              >
                <div className="absolute inset-[2px] rounded-[1.9rem] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-text-primary">{image.title}</h3>
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
              href="/about#facility"
              className="inline-flex items-center bg-gradient-to-r from-dark-lighter to-dark hover:from-ap-red hover:to-ap-red-dark px-8 py-3 rounded-full text-text-primary font-semibold transition-all duration-300 group"
            >
              View Our Facility
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
        <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-12 border border-text-primary/10"
          >
            <h2 className="text-4xl font-bold mb-6 text-text-primary drop-shadow-lg">Ready to Start Your Fitness Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-text-primary drop-shadow-lg">
              Join AP Fitness today and transform your life with our expert guidance and
              support. Your fitness goals are within reach.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/book"
                className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] inline-block"
              >
                Get Started Today
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 