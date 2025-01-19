'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type ServiceType = 'personal-training' | 'group-fitness' | 'boxing' | 'prenatal' | 'nutrition' | 'online';

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  experience: string;
  goals: string;
  preferredTime: string;
  message: string;
}

export default function Book() {
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    serviceType: 'personal-training',
    experience: '',
    goals: '',
    preferredTime: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] mb-16">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC05227-2-min.jpeg"
            alt="Book AP Fitness"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Book a Consultation</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Take the first step towards achieving your fitness goals
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Schedule Your Free Consultation</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="serviceType" className="block text-gray-700 font-medium mb-2">
                  Service Type *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                >
                  <option value="personal-training">Personal Training</option>
                  <option value="group-fitness">Group Fitness</option>
                  <option value="boxing">Boxing & Kickboxing</option>
                  <option value="prenatal">Pre & Postnatal Fitness</option>
                  <option value="nutrition">Nutritional Coaching</option>
                  <option value="online">Online Coaching</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">
                Fitness Experience Level *
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner - New to fitness</option>
                <option value="intermediate">Intermediate - Some experience</option>
                <option value="advanced">Advanced - Regular exerciser</option>
                <option value="athlete">Athlete - Competitive training</option>
              </select>
            </div>

            <div>
              <label htmlFor="goals" className="block text-gray-700 font-medium mb-2">
                Fitness Goals *
              </label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                required
                rows={3}
                placeholder="What are your main fitness goals?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none"
              ></textarea>
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-gray-700 font-medium mb-2">
                Preferred Training Time
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
              >
                <option value="">Select preferred time</option>
                <option value="early-morning">Early Morning (6am-9am)</option>
                <option value="morning">Morning (9am-12pm)</option>
                <option value="afternoon">Afternoon (12pm-4pm)</option>
                <option value="evening">Evening (4pm-8pm)</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Any additional information you'd like us to know (e.g., injuries, medical conditions, specific preferences)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none"
              ></textarea>
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-ap-red hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
              >
                Book Consultation
              </motion.button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Additional Information */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
          <p className="text-gray-600 mb-8">
            After submitting your booking request, our team will contact you within 24 hours
            to confirm your consultation and provide additional information. During your
            consultation, we'll discuss your goals, assess your current fitness level, and
            create a personalized plan to help you succeed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-ap-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Initial Consultation</h3>
              <p className="text-gray-600">Meet with our expert trainers to discuss your goals</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-ap-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Fitness Assessment</h3>
              <p className="text-gray-600">Complete a comprehensive fitness evaluation</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-ap-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Custom Plan</h3>
              <p className="text-gray-600">Receive your personalized training program</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 