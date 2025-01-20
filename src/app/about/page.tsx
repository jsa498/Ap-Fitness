'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMedal, FaUsers, FaHeart } from 'react-icons/fa';
import Link from 'next/link';

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
            className="text-3xl font-bold text-center mb-12 text-text-primary"
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
                transition={{ delay: index * 0.1 }}
                className="bg-dark-lighter rounded-lg shadow-dark-lg overflow-hidden border border-dark-border hover:border-ap-red/50 transition-colors"
              >
                <div className="relative h-[400px]">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className={`object-cover ${trainer.name === 'Prabhjot Singh' ? 'object-[center_60%]' : 'object-center'}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
                <div className="p-6 bg-gradient-to-br from-dark to-dark-lighter">
                  <h3 className="text-2xl font-bold mb-2 text-text-primary">{trainer.name}</h3>
                  <p className="text-ap-red font-medium mb-4">{trainer.role}</p>
                  <p className="text-text-secondary mb-4">{trainer.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {trainer.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="bg-dark px-3 py-1 rounded-full text-sm text-text-secondary border border-dark-border"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="bg-gradient-to-br from-dark to-dark-lighter py-16 border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-text-primary">Our Facility</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Train in our state-of-the-art facility equipped with the latest fitness
              equipment and amenities for an optimal workout experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: '/images/DSC05169-min.jpeg', alt: 'Weight Training Area' },
              { src: '/images/DSC05170-min.jpeg', alt: 'Cardio Section' },
              { src: '/images/DSC05203-min.jpeg', alt: 'Boxing Area' }
            ].map((image, index) => (
              <motion.div
                key={image.alt}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative h-64 rounded-lg overflow-hidden shadow-dark-lg border border-dark-border hover:border-ap-red/50 transition-colors"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">Start Your Journey With Us</h2>
          <p className="text-text-secondary mb-8">
            Join our community and experience the difference of training with certified professionals.
          </p>
          <Link
            href="/book"
            className="inline-block bg-ap-red hover:bg-ap-red-dark text-text-primary px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
} 