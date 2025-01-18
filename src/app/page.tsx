'use client';

import Image from 'next/image'
import Link from 'next/link'
import ServiceCard from '@/components/ServiceCard'
import { FaDumbbell, FaUsers, FaHeart, FaAppleAlt, FaLaptop } from 'react-icons/fa'
import { GiBoxingGlove } from 'react-icons/gi'
import { motion } from 'framer-motion'

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
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <Image
            src="/images/AP-Logo_processed.jpeg"
            alt="AP Fitness Logo"
            width={200}
            height={100}
            className="mb-8"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
            Transform Your Life
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
            Professional personal training and wellness services by certified kinesiologists
          </p>
          <Link
            href="/book"
            className="bg-ap-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive fitness and wellness services tailored to your individual needs
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/DSC05643.jpeg"
                alt="AP Fitness Trainer"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">About AP Fitness</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded by certified kinesiologists and personal trainers Prabhjot and Amrit,
                AP Fitness is dedicated to delivering exceptional fitness and wellness services.
                Our state-of-the-art facility and expert guidance ensure you achieve your fitness goals.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-ap-red hover:text-red-700 font-semibold"
              >
                Learn More
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC09177.jpeg"
            alt="Training Session"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join AP Fitness today and transform your life with our expert guidance and
            support. Your fitness goals are within reach.
          </p>
          <Link
            href="/book"
            className="bg-ap-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </main>
  )
} 