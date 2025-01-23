'use client'

import { motion } from 'framer-motion'
import { FaDumbbell, FaUsers, FaLaptop, FaAppleAlt, FaKey, FaUserNurse } from 'react-icons/fa'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { PiMedalFill } from 'react-icons/pi'
import { IoSchoolOutline } from 'react-icons/io5'
import Image from 'next/image'
import Link from 'next/link'

const trainingServices = [
  {
    title: 'Personal Training',
    description: 'One-on-one personalized training sessions with certified kinesiologists.',
    Icon: FaDumbbell,
    features: [
      'Customized workout plans',
      'Progress tracking',
      'Nutrition guidance',
      'Flexible scheduling'
    ]
  },
  {
    title: 'Group Classes',
    description: 'Energetic group sessions led by experienced trainers.',
    Icon: FaUsers,
    features: [
      'High-energy workouts',
      'Community atmosphere',
      'Various class types',
      'All fitness levels'
    ]
  },
  {
    title: 'Online Training',
    description: 'Remote training programs designed for your schedule.',
    Icon: FaLaptop,
    features: [
      'Virtual coaching',
      'Workout tracking app',
      'Video demonstrations',
      'Regular check-ins'
    ]
  },
  {
    title: 'Nutritional Training',
    description: 'Comprehensive nutrition guidance for optimal results.',
    Icon: FaAppleAlt,
    features: [
      'Meal planning',
      'Dietary analysis',
      'Supplement guidance',
      'Progress monitoring'
    ]
  },
  {
    title: 'Gym Membership',
    description: '24/7 access to our state-of-the-art facility.',
    Icon: GiWeightLiftingUp,
    features: [
      '24/7 gym access',
      'Modern equipment',
      'Shower facilities',
      'Free parking'
    ]
  },
  {
    title: 'First Responder & Healthcare Worker Program',
    description: 'Special discounts and programs for our local heroes.',
    Icon: FaUserNurse,
    features: [
      'Exclusive membership rates',
      'Flexible scheduling',
      'Personalized programs',
      'Group training options'
    ]
  }
]

const specialPrograms = [
  {
    title: 'Sport Specific Training',
    description: 'Specialized training for athletes.',
    Icon: PiMedalFill
  },
  {
    title: 'Team Training',
    description: 'Custom programs for sports teams.',
    Icon: FaUsers
  },
  {
    title: 'After School Program',
    description: 'Youth fitness and development.',
    Icon: IoSchoolOutline
  }
]

export default function TrainingContent() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] mt-28">
        <div className="absolute inset-0 mx-4 overflow-hidden">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/pullup.jpeg"
              alt="AP Fitness Training"
              fill
              sizes="100vw"
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-text-primary px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 border border-text-primary/10 mx-4"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">Training Programs</h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8 drop-shadow-lg">
              Transform your fitness journey with our comprehensive training programs and expert guidance
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-ap-red to-ap-red-dark text-white rounded-full font-medium transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] text-lg"
            >
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                id={service.title.toLowerCase().replace(/\s+/g, '-')}
                className="
                  bg-dark-lighter rounded-[2rem] p-8 
                  hover:bg-dark-lighter/80 transition-all duration-300 
                  transform hover:scale-[1.02] hover:shadow-lg group
                  scroll-mt-32 target:ring-2 target:ring-ap-red/50
                "
              >
                <service.Icon className="text-4xl text-ap-red mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-text-secondary mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 bg-ap-red rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="px-4 py-16 bg-dark-lighter/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-center mb-12"
          >
            Specialized Programs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-dark-lighter rounded-[2rem] p-8 text-center hover:bg-dark-lighter/80 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group"
              >
                <program.Icon className="text-4xl text-ap-red mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-4">{program.title}</h3>
                <p className="text-text-secondary">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-[2rem] overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/DSC05643.jpeg"
                alt="AP Fitness Training"
                fill
                className="object-cover brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 text-center">
              <div className="bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 border border-text-primary/10 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold mb-6 drop-shadow-lg">Ready to Start Your Fitness Journey?</h2>
                <p className="text-lg text-text-primary italic mb-8 max-w-2xl mx-auto drop-shadow-lg">
                  Join us at AP Fitness and transform your life with our expert guidance and comprehensive programs
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-ap-red to-ap-red-dark text-white rounded-full font-medium transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] text-lg"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 