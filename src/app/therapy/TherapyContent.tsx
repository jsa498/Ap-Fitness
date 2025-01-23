'use client'

import { motion } from 'framer-motion'
import { FaClinicMedical, FaUserMd, FaBriefcase } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

const therapyServices = [
  {
    title: 'ICBC Active Rehab',
    description: 'Comprehensive rehabilitation programs for ICBC clients.',
    Icon: FaClinicMedical,
    features: [
      'Personalized recovery plans',
      'Progress documentation',
      'Regular assessments',
      'Direct billing available'
    ]
  },
  {
    title: 'Gradual Return to Work',
    description: 'Structured programs to help you safely return to work.',
    Icon: FaBriefcase,
    features: [
      'Work-specific rehabilitation',
      'Capacity assessment',
      'Progress monitoring',
      'Employer coordination'
    ]
  },
  {
    title: 'Physiotherapy',
    description: 'Professional physiotherapy services for optimal recovery.',
    Icon: FaUserMd,
    features: [
      'Manual therapy',
      'Exercise prescription',
      'Pain management',
      'Injury prevention'
    ]
  }
]

export default function TherapyContent() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] mt-28">
        <div className="absolute inset-0 mx-4 overflow-hidden">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/DSC09128.jpg"
              alt="AP Fitness Therapy"
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
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">Therapy & Rehabilitation</h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8 drop-shadow-lg">
              Professional therapy and rehabilitation services to help you recover and return to your best
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

      {/* Services Grid */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {therapyServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                id={service.title.toLowerCase().replace(/\s+/g, '-')}
                className="bg-dark-lighter rounded-[2rem] p-8 hover:bg-dark-lighter/80 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group scroll-mt-32"
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

      {/* Info Section */}
      <section className="px-4 py-16 bg-dark-lighter/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-dark-lighter to-dark p-[2px] rounded-[2rem] shadow-dark-lg"
            >
              <div className="bg-dark rounded-[1.9rem] p-8 md:p-12 h-full">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Why Choose Our Therapy Services?</h2>
                <ul className="space-y-6">
                  <li className="flex items-start group">
                    <div className="w-8 h-8 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center flex-shrink-0 mr-4 group-hover:shadow-ap-red/20 transition-all duration-300">
                      <span className="w-1.5 h-1.5 bg-text-primary rounded-full" />
                    </div>
                    <div>
                      <p className="text-text-secondary text-lg">Certified Kinesiologists with extensive experience in rehabilitation and injury prevention</p>
                    </div>
                  </li>
                  <li className="flex items-start group">
                    <div className="w-8 h-8 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center flex-shrink-0 mr-4 group-hover:shadow-ap-red/20 transition-all duration-300">
                      <span className="w-1.5 h-1.5 bg-text-primary rounded-full" />
                    </div>
                    <div>
                      <p className="text-text-secondary text-lg">Expertise in strength training, sports performance, and weight management</p>
                    </div>
                  </li>
                  <li className="flex items-start group">
                    <div className="w-8 h-8 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center flex-shrink-0 mr-4 group-hover:shadow-ap-red/20 transition-all duration-300">
                      <span className="w-1.5 h-1.5 bg-text-primary rounded-full" />
                    </div>
                    <div>
                      <p className="text-text-secondary text-lg">Evidence-based treatment approach with personalized recovery plans</p>
                    </div>
                  </li>
                  <li className="flex items-start group">
                    <div className="w-8 h-8 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center flex-shrink-0 mr-4 group-hover:shadow-ap-red/20 transition-all duration-300">
                      <span className="w-1.5 h-1.5 bg-text-primary rounded-full" />
                    </div>
                    <div>
                      <p className="text-text-secondary text-lg">State-of-the-art facilities with modern rehabilitation equipment</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[400px] rounded-[2rem] overflow-hidden group"
            >
              <Image
                src="/images/DSC09135.jpeg"
                alt="AP Fitness Therapy Facility"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-6 border border-text-primary/10">
                  <p className="text-xl md:text-2xl font-semibold drop-shadow-lg">
                    Modern facilities equipped for your recovery journey
                  </p>
                  <p className="text-text-primary mt-2 italic">
                    State-of-the-art equipment and dedicated recovery spaces
                  </p>
                </div>
              </div>
            </motion.div>
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
                src="/images/DSC09128.jpg"
                alt="AP Fitness Therapy"
                fill
                className="object-cover brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 text-center">
              <div className="bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 border border-text-primary/10 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold mb-6 drop-shadow-lg">Ready to Start Your Recovery Journey?</h2>
                <p className="text-lg text-text-primary italic mb-8 max-w-2xl mx-auto drop-shadow-lg">
                  Take the first step towards recovery with our expert therapy and rehabilitation services
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