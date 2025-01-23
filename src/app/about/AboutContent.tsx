'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaMedal, FaUsers, FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const trainers = [
  {
    name: 'Prabhjot Mand',
    role: 'KINESIOLOGIST / PERSONAL TRAINER',
    image: '/images/DSC05701.jpeg',
    quote: 'Dedicated to helping clients achieve their fitness goals through evidence-based training and personalized attention.',
    bio: 'Prabhjot is a certified kinesiologist and personal trainer with a passion for helping clients achieve their fitness goals. With his evidence-based approach and personalized attention, he creates effective training programs that deliver results.',
    certifications: [
      'Bachelor of Kinesiology',
      'BCRPA Certified Personal Trainer',
      'First Aid & CPR Certified'
    ],
    specialties: ['Strength Training', 'Sports Performance', 'Injury Prevention', 'Weight Management']
  },
  {
    name: 'Amrit Jagdeo',
    role: 'KINESIOLOGIST / PERSONAL TRAINER',
    image: '/images/DSC09205.jpeg',
    quote: 'Passionate about empowering clients to reach their full potential through holistic wellness and sustainable fitness practices.',
    bio: 'Amrit is a dedicated kinesiologist and personal trainer who believes in a holistic approach to fitness. He focuses on creating sustainable, long-term solutions that help clients transform their lives through proper training and education.',
    certifications: [
      'Bachelor of Kinesiology',
      'BCRPA Certified Personal Trainer',
      'First Aid & CPR Certified'
    ],
    specialties: ['Strength Training', 'Sports Performance', 'Injury Prevention', 'Weight Management']
  }
];

const stats = [
  { icon: FaUsers, value: '500+', label: 'Happy Clients' },
  { icon: FaGraduationCap, value: '✅', label: 'Certifications' },
  { icon: FaMedal, value: '5+', label: 'Years Experience' },
  { icon: FaHeart, value: '500+', label: 'Transformations' }
];

export default function AboutContent() {
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
      <section id="mission" className="max-w-4xl mx-auto px-4 py-16 text-center scroll-mt-32">
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
      <section className="py-16 relative">
        {/* Scroll Target for Trainers */}
        <div id="trainers" className="absolute top-96" aria-hidden="true" />
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
                  <div className="relative h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden mb-8">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover brightness-90"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent opacity-90" />
                    
                    {/* Name, Title, and Quote Section */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%]">
                      <div className="bg-dark/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg">
                        {/* Name with red accent */}
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-1 h-6 bg-ap-red rounded-full"></div>
                          <h2 className="text-3xl font-bold text-white">
                            {trainer.name}
                          </h2>
                        </div>
                        
                        {/* Role badge */}
                        <div className="bg-ap-red/90 backdrop-blur-sm px-3 py-1 rounded-lg inline-block mb-3">
                          <p className="text-white font-bold tracking-wider text-sm">
                            {trainer.role}
                          </p>
                        </div>

                        {/* Quote */}
                        {trainer.quote && (
                          <p className="text-white/90 text-lg italic leading-relaxed pl-3 border-l-2 border-ap-red/30">
                            {trainer.quote}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bio Text Section */}
                  <div className="bg-dark-lighter/20 backdrop-blur-sm rounded-2xl p-6 border border-text-primary/10 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 bg-ap-red rounded-full"></div>
                      <h3 className="text-xl font-semibold text-text-primary">Biography</h3>
                    </div>
                    <p className="text-text-secondary leading-relaxed">
                      {trainer.bio}
                    </p>
                  </div>

                  {/* Certifications and Specialties Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6">
                    {/* Certifications Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-0.5 h-4 bg-ap-red rounded-full"></div>
                        <h4 className="text-base font-semibold text-text-primary">Certifications</h4>
                      </div>
                      <div className="space-y-2">
                        {trainer.certifications.map((cert, i) => (
                          <div
                            key={i}
                            className="flex items-center text-text-secondary rounded-lg py-1.5 px-2 hover:text-white transition-all duration-300"
                          >
                            <div className="flex-shrink-0 w-1.5 h-1.5 bg-ap-red rounded-full mr-2"></div>
                            <span className="text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specialties Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-0.5 h-4 bg-ap-red rounded-full"></div>
                        <h4 className="text-base font-semibold text-text-primary">Specialties</h4>
                      </div>
                      <div className="space-y-2">
                        {trainer.specialties.map((specialty, i) => (
                          <div
                            key={i}
                            className="flex items-center text-text-secondary rounded-lg py-1.5 px-2 hover:text-white transition-all duration-300"
                          >
                            <div className="flex-shrink-0 w-1.5 h-1.5 bg-ap-red rounded-full mr-2"></div>
                            <span className="text-sm">{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="py-16 relative">
        {/* Scroll Target for Facility */}
        <div id="facility" className="absolute top-96" aria-hidden="true" />
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