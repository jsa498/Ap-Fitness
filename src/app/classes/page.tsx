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
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] mb-16">
        <div className="absolute inset-0 rounded-b-[3rem] overflow-hidden">
          <Image
            src="/images/DSC05169-min.jpeg"
            alt="AP Fitness Classes"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
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
      <section className="max-w-7xl mx-auto px-4 mb-16">
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
      <section className="bg-gradient-to-br from-dark to-dark-lighter py-16 border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-text-primary"
          >
            Class Schedule
          </motion.h2>

          {/* Day Selection */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.keys(schedule).map((day) => (
              <motion.button
                key={day}
                onClick={() => setSelectedDay(day)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary shadow-ap-red/20'
                    : 'bg-dark-lighter text-text-secondary hover:bg-dark border border-dark-border hover:border-ap-red/50'
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
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">Ready to Join a Class?</h2>
          <p className="text-text-secondary mb-8">
            Experience the energy and motivation of group training with our expert instructors.
          </p>
          <Link href="/book">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </motion.button>
          </Link>
        </div>
      </section>
    </main>
  );
} 