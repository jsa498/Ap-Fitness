'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
        <div className="absolute inset-0">
          <Image
            src="/images/DSC05169-min.jpeg"
            alt="AP Fitness Classes"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dark/80" />
        </div>
        <div className="relative h-full flex items-center justify-center text-text-primary">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Our Classes</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Join our energetic group classes led by expert trainers
            </p>
          </div>
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
              className="bg-dark-lighter rounded-lg shadow-dark-lg overflow-hidden border border-dark-border hover:border-ap-red/50 transition-colors"
            >
              <div className="relative h-48">
                <Image
                  src={classItem.image}
                  alt={classItem.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-gradient-to-br from-dark to-dark-lighter">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center shadow-lg">
                    <classItem.icon className="w-6 h-6 text-text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold ml-4 text-text-primary">{classItem.name}</h3>
                </div>
                <p className="text-text-secondary mb-4">{classItem.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">
                    <strong className="text-text-primary">Duration:</strong> {classItem.duration}
                  </span>
                  <span className="text-text-secondary">
                    <strong className="text-text-primary">Intensity:</strong> {classItem.intensity}
                  </span>
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
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.keys(schedule).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary shadow-lg'
                    : 'bg-dark text-text-secondary hover:bg-dark-lighter'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark rounded-lg shadow-dark-lg overflow-hidden border border-dark-border"
          >
            <div className="divide-y divide-dark-border">
              {schedule[selectedDay as keyof typeof schedule].map((slot, index) => (
                <div
                  key={slot.time}
                  className="flex items-center p-4 hover:bg-dark-lighter transition-colors"
                >
                  <div className="w-24 font-medium text-text-primary">{slot.time}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-text-primary">{slot.class}</div>
                    <div className="text-sm text-text-secondary">
                      {classes.find((c) => c.name === slot.class)?.duration}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg hover:shadow-xl"
                  >
                    Book Class
                  </motion.button>
                </div>
              ))}
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </motion.button>
        </div>
      </section>
    </main>
  );
} 