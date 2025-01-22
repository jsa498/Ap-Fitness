'use client';

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ServiceCarousel from '@/components/ServiceCarousel'
import TrainersPreview from '@/components/TrainersPreview'
import ReviewCarousel from '@/components/ReviewCarousel'
import { FaDumbbell, FaUsers, FaClinicMedical, FaUserMd, FaAppleAlt, FaLaptop, FaHandHoldingHeart } from 'react-icons/fa'
import { GiWeightLiftingUp } from 'react-icons/gi'

export default function Home() {
  const services = [
    {
      title: 'Personal Training',
      description: 'One-on-one personalized training sessions with certified kinesiologists.',
      Icon: FaDumbbell,
    },
    {
      title: 'ICBC Active Rehab',
      description: 'Specialized rehabilitation programs for ICBC clients.',
      Icon: FaClinicMedical,
    },
    {
      title: 'Gym Membership',
      description: 'Access to our state-of-the-art facility with modern equipment.',
      Icon: GiWeightLiftingUp,
    },
    {
      title: 'Online Coaching',
      description: 'Remote training programs designed for your schedule.',
      Icon: FaLaptop,
    },
    {
      title: 'Group Classes',
      description: 'Energetic group sessions led by experienced trainers.',
      Icon: FaUsers,
    },
    {
      title: 'Nutritional Coaching',
      description: 'Comprehensive nutrition guidance for optimal results.',
      Icon: FaAppleAlt,
    },
    {
      title: 'Physiotherapy',
      description: 'Professional services for injury recovery and pain management.',
      Icon: FaUserMd,
    },
    {
      title: 'Massage Therapy',
      description: 'Professional massage therapy for muscle tension and overall wellness.',
      Icon: FaHandHoldingHeart,
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] mt-28">
        <div className="absolute inset-0 mx-4 overflow-hidden">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/DSC05227-2-min.jpeg"
              alt="AP Fitness Gym"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-text-primary px-4">
          {/* AP Logo and Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 md:mb-8 text-center"
          >
            <div className="inline-flex flex-col items-center">
              <div className="relative w-[200px] md:w-[280px] h-[120px] md:h-[168px]">
                <Image
                  src="/images/AP-Logo_processed.jpeg"
                  alt="AP Fitness"
                  fill
                  className="object-contain invert"
                  priority
                />
              </div>
              <p className="text-xl md:text-2xl font-semibold tracking-[0.2em] text-white uppercase bg-gradient-to-r from-white to-white/80 bg-clip-text -mt-6 md:-mt-8">
                FITNESS & REHAB
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-5 md:p-8 border border-text-primary/10 max-w-[90%] md:max-w-lg mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 md:mb-3 drop-shadow-lg"
            >
              Transform Your Life
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-center mb-4 md:mb-6 max-w-md mx-auto drop-shadow-lg"
            >
              Professional personal training and wellness services by certified kinesiologists
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="transition-all duration-300"
            >
              <Link
                href="/book"
                className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-5 md:px-7 py-2.5 md:py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] inline-block"
              >
                Book a Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 px-4"
          >
            <h2 className="text-4xl font-bold mb-4 text-text-primary drop-shadow-lg">Our Services</h2>
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

      {/* Reviews Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 px-4"
          >
            <h2 className="text-4xl font-bold mb-4 text-text-primary">What Our Clients Say</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Read what our amazing clients have to say about their experience with AP Fitness
            </p>
          </motion.div>
          <ReviewCarousel />
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