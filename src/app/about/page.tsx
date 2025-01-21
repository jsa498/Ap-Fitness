'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMedal, FaUsers, FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import type { Metadata } from 'next'

const trainers = [
  {
    name: 'Prabhjot Singh',
    role: 'Co-Founder & Head Trainer',
    image: '/images/DSC05701.jpeg',
    specialties: ['Personal Training', 'Strength & Conditioning', 'Boxing'],
    certifications: ['B.Sc. Kinesiology', 'CSEP-CPT', 'Boxing Coach Level 2'],
    bio: 'With over 8 years of experience in fitness and athletics, Prabhjot brings expertise in strength training and boxing to help clients achieve their goals.'
  },
  {
    name: 'Amrit Singh',
    role: 'Co-Founder & Wellness Director',
    image: '/images/DSC09205.jpeg',
    specialties: ['Nutrition Coaching', 'Pre/Postnatal Fitness', 'Group Training'],
    certifications: ['B.Sc. Kinesiology', 'Precision Nutrition Level 2', 'Pre/Postnatal Specialist'],
    bio: 'Amrit specializes in holistic wellness, combining nutrition coaching with personalized training to create sustainable lifestyle changes.'
  }
];

const stats = [
  { icon: FaUsers, value: '500+', label: 'Happy Clients' },
  { icon: FaGraduationCap, value: '✅', label: 'Certifications' },
  { icon: FaMedal, value: '5+', label: 'Years Experience' },
  { icon: FaHeart, value: '500+', label: 'Transformations' }
];

export const metadata: Metadata = {
  title: 'About AP Fitness - Our Story & Mission',
  description: 'Learn about AP Fitness, our certified kinesiologists, state-of-the-art facility, and commitment to helping clients achieve their fitness goals in Surrey, BC.',
  openGraph: {
    title: 'About AP Fitness - Our Story & Mission',
    description: 'Discover the AP Fitness difference. Our team of certified kinesiologists is dedicated to providing personalized fitness solutions in a state-of-the-art facility.',
    images: [
      {
        url: '/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AP Fitness Team and Facility',
      }
    ],
  },
  twitter: {
    title: 'About AP Fitness - Our Story & Mission',
    description: 'Discover the AP Fitness difference. Our team of certified kinesiologists is dedicated to providing personalized fitness solutions in a state-of-the-art facility.',
    images: ['/images/about-twitter.jpg'],
  },
}

export default function About() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] mt-8 mb-16">
        <div className="absolute inset-0 mx-4 mt-4">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/DSC05206-min.jpeg"
              alt="AP Fitness About"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
          </div>
        </div>
        <div className="relative h-full flex items-center justify-center text-text-primary">
          <div className="text-center bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 mx-4 border border-text-primary/10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">About Us</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4 drop-shadow-lg">
              Professional trainers dedicated to transforming lives through fitness
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-text-primary">Our Mission</h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            At AP Fitness, we believe in transforming lives through personalized fitness
            and wellness solutions. Our mission is to provide expert guidance, support,
            and motivation to help our clients achieve their health and fitness goals
            in a welcoming and professional environment.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-dark-lighter/20 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 border border-text-primary/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-dark/40 backdrop-blur-sm border border-text-primary/5 hover:border-ap-red/30 transition-all duration-300"
                >
                  <stat.icon className="w-10 h-10 text-ap-red mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2 text-text-primary bg-gradient-to-r from-text-primary to-ap-red bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-text-secondary font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 text-text-primary drop-shadow-lg"
          >
            Meet Our Trainers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group bg-gradient-to-br from-dark-lighter to-dark rounded-[2rem] p-[2px] shadow-dark-lg"
              >
                <div className="bg-dark rounded-[1.9rem] overflow-hidden">
                  <div className="relative h-[400px]">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                        trainer.name === 'Prabhjot Singh' ? 'object-[center_60%]' : 'object-center'
                      }`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-8 bg-gradient-to-br from-dark to-dark-lighter">
                    <h3 className="text-2xl font-bold mb-2 text-text-primary">{trainer.name}</h3>
                    <p className="text-ap-red font-medium mb-4">{trainer.role}</p>
                    <p className="text-text-secondary mb-6">{trainer.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="bg-dark-lighter/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-text-primary border border-text-primary/10 hover:border-ap-red/50 transition-colors duration-300"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-text-primary drop-shadow-lg">Our Facility</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Train in our state-of-the-art facility equipped with the latest fitness
              equipment and amenities for an optimal workout experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: '/images/DSC05169-min.jpeg', alt: 'Weight Training Area', title: 'Boxing Area' },
              { src: '/images/DSC05170-min.jpeg', alt: 'Cardio Section', title: 'Weight Training' },
              { src: '/images/DSC05185-min.jpeg', alt: 'Boxing Area', title: 'Cardio Zone' }
            ].map((image, index) => (
              <motion.div
                key={image.alt}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="relative h-64 rounded-[2rem] overflow-hidden group bg-gradient-to-br from-dark-lighter to-dark p-[2px]"
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <div className="absolute inset-0 mx-4 overflow-hidden rounded-[3rem]">
          <Image
            src="/images/DSC09177.jpeg"
            alt="Training Session"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-12 border border-text-primary/10"
          >
            <h2 className="text-4xl font-bold mb-6 text-text-primary drop-shadow-lg">Start Your Journey With Us</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-text-primary drop-shadow-lg">
              Join our community and experience the difference of training with certified professionals.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/book"
                className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] inline-block"
              >
                Book a Free Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 