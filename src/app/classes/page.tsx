'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaDumbbell, FaUsers, FaHeart } from 'react-icons/fa';
import { GiBoxingGlove } from 'react-icons/gi';

const classes = [
  {
    name: 'HIIT Training',
    description: 'High-intensity interval training that combines strength and cardio for maximum results.',
    duration: '45 min',
    intensity: 'High',
    icon: FaDumbbell,
    image: '/images/DSC05169-min.jpeg'
  },
  {
    name: 'Boxing Fundamentals',
    description: 'Learn proper boxing techniques, footwork, and combinations while getting a great workout.',
    duration: '60 min',
    intensity: 'Medium-High',
    icon: GiBoxingGlove,
    image: '/images/DSC05170-min.jpeg'
  },
  {
    name: 'Group Fitness',
    description: 'Fun, energetic workouts combining cardio, strength, and core exercises.',
    duration: '50 min',
    intensity: 'Medium',
    icon: FaUsers,
    image: '/images/DSC05185-min.jpeg'
  },
  {
    name: 'Prenatal Fitness',
    description: 'Safe and effective workouts designed specifically for expecting mothers.',
    duration: '45 min',
    intensity: 'Low-Medium',
    icon: FaHeart,
    image: '/images/DSC05203-min.jpeg'
  }
];

const schedule = {
  Monday: [
    { time: '6:00 AM', class: 'HIIT Training' },
    { time: '9:00 AM', class: 'Prenatal Fitness' },
    { time: '12:00 PM', class: 'Boxing Fundamentals' },
    { time: '5:30 PM', class: 'Group Fitness' },
    { time: '7:00 PM', class: 'HIIT Training' }
  ],
  Tuesday: [
    { time: '6:00 AM', class: 'Group Fitness' },
    { time: '9:00 AM', class: 'Boxing Fundamentals' },
    { time: '12:00 PM', class: 'HIIT Training' },
    { time: '5:30 PM', class: 'Prenatal Fitness' },
    { time: '7:00 PM', class: 'Boxing Fundamentals' }
  ],
  Wednesday: [
    { time: '6:00 AM', class: 'HIIT Training' },
    { time: '9:00 AM', class: 'Group Fitness' },
    { time: '12:00 PM', class: 'Boxing Fundamentals' },
    { time: '5:30 PM', class: 'HIIT Training' },
    { time: '7:00 PM', class: 'Group Fitness' }
  ],
  Thursday: [
    { time: '6:00 AM', class: 'Boxing Fundamentals' },
    { time: '9:00 AM', class: 'Prenatal Fitness' },
    { time: '12:00 PM', class: 'Group Fitness' },
    { time: '5:30 PM', class: 'HIIT Training' },
    { time: '7:00 PM', class: 'Boxing Fundamentals' }
  ],
  Friday: [
    { time: '6:00 AM', class: 'HIIT Training' },
    { time: '9:00 AM', class: 'Boxing Fundamentals' },
    { time: '12:00 PM', class: 'Group Fitness' },
    { time: '5:30 PM', class: 'Boxing Fundamentals' },
    { time: '7:00 PM', class: 'HIIT Training' }
  ],
  Saturday: [
    { time: '8:00 AM', class: 'HIIT Training' },
    { time: '9:30 AM', class: 'Group Fitness' },
    { time: '11:00 AM', class: 'Boxing Fundamentals' },
    { time: '12:30 PM', class: 'Prenatal Fitness' }
  ],
  Sunday: [
    { time: '9:00 AM', class: 'Group Fitness' },
    { time: '10:30 AM', class: 'HIIT Training' },
    { time: '12:00 PM', class: 'Boxing Fundamentals' }
  ]
};

export default function Classes() {
  const [selectedDay, setSelectedDay] = useState('Monday');

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] mt-28">
        <div className="absolute inset-0 mx-4 overflow-hidden">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/DSC05169-min.jpeg"
              alt="AP Fitness Classes"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
          </div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-text-primary">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-12 border border-text-primary/10 mx-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg"
            >
              Our Classes
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-lg"
            >
              Join our energetic group classes led by expert trainers
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Class Types */}
      <section className="max-w-7xl mx-auto px-4 mb-16 mt-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-text-primary"
        >
          Available Classes
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-dark-lighter to-dark p-[2px] rounded-[2rem] shadow-dark-lg group"
            >
              <div className="relative h-full rounded-[1.9rem] overflow-hidden bg-dark">
                <div className="relative h-48">
                  <Image
                    src={classItem.image}
                    alt={classItem.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                </div>
                <div className="p-6 bg-gradient-to-br from-dark to-dark-lighter relative">
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center shadow-lg absolute -top-6 left-6"
                  >
                    <classItem.icon className="w-6 h-6 text-text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold ml-16 text-text-primary group-hover:text-ap-red transition-colors duration-300">{classItem.name}</h3>
                  <p className="text-text-secondary mt-4 mb-4">{classItem.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      <strong className="text-text-primary">Duration:</strong> {classItem.duration}
                    </span>
                    <span className="text-text-secondary">
                      <strong className="text-text-primary">Intensity:</strong> {classItem.intensity}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Schedule Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-ap-red/5 via-dark to-dark opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-ap-red/5 via-dark to-dark opacity-70" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="bg-gradient-to-r from-ap-red to-ap-red-dark p-[2px] rounded-full">
                <div className="bg-dark rounded-full p-3">
                  <svg className="w-6 h-6 text-ap-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-text-primary drop-shadow-lg"
            >
              Class Schedule
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-text-secondary max-w-2xl mx-auto"
            >
              Find the perfect time for your workout with our flexible class schedule
            </motion.p>
          </motion.div>

          {/* Day Selection */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.keys(schedule).map((day) => (
              <motion.button
                key={day}
                onClick={() => setSelectedDay(day)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full text-lg transition-all duration-300 ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary font-semibold'
                    : 'bg-dark-lighter/30 backdrop-blur-sm text-text-primary border border-text-primary/10 hover:border-ap-red/50'
                }`}
              >
                {day}
              </motion.button>
            ))}
          </div>

          {/* Schedule Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-dark-lighter to-dark p-[2px] rounded-[2rem] shadow-dark-lg"
          >
            <div className="bg-dark rounded-[1.9rem] overflow-hidden">
              <div className="divide-y divide-dark-border">
                {schedule[selectedDay as keyof typeof schedule].map((slot, index) => (
                  <motion.div
                    key={slot.time}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center p-6 hover:bg-dark-lighter transition-all duration-300 group"
                  >
                    <div className="w-24 font-medium text-text-primary group-hover:text-ap-red transition-colors">{slot.time}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-text-primary group-hover:text-ap-red transition-colors">{slot.class}</div>
                      <div className="text-sm text-text-secondary">
                        {classes.find((c) => c.name === slot.class)?.duration}
                      </div>
                    </div>
                    <Link href="/book">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-ap-red/20"
                      >
                        Book Class
                      </motion.button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 mx-4">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/DSC09177.jpeg"
              alt="Training Session"
              fill
              className="object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-12 border border-text-primary/10 text-center"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 text-text-primary drop-shadow-lg"
            >
              Ready to Join a Class?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-primary mb-8 drop-shadow-lg max-w-2xl mx-auto"
            >
              Experience the energy and motivation of group training with our expert instructors.
            </motion.p>
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
  );
} 