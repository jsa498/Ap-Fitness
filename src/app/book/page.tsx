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
          <div className="absolute inset-0 bg-dark/80" />
        </div>
        <div className="relative h-full flex items-center justify-center text-text-primary">
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
          className="bg-dark-lighter rounded-lg shadow-dark-lg p-8 border border-dark-border"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-text-primary">Schedule Your Free Consultation</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-text-primary font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-text-primary font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="preferredTime" className="block text-text-primary font-medium mb-2">
                  Preferred Time
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                >
                  <option value="">Select a time</option>
                  <option value="morning">Morning (6AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 10PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-text-primary font-medium mb-2">
                Service Type *
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
              >
                <option value="">Select a service</option>
                <option value="personal">Personal Training</option>
                <option value="group">Group Fitness</option>
                <option value="boxing">Boxing & Kickboxing</option>
                <option value="prenatal">Pre & Postnatal</option>
                <option value="nutrition">Nutritional Coaching</option>
                <option value="online">Online Coaching</option>
              </select>
            </div>

            <div>
              <label htmlFor="experience" className="block text-text-primary font-medium mb-2">
                Fitness Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label htmlFor="goals" className="block text-text-primary font-medium mb-2">
                Fitness Goals
              </label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none"
                placeholder="Tell us about your fitness goals..."
              ></textarea>
            </div>

            <div>
              <label htmlFor="message" className="block text-text-primary font-medium mb-2">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none"
                placeholder="Any additional information you'd like us to know..."
              ></textarea>
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                Book Consultation
              </motion.button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Additional Information */}
      <section className="bg-gradient-to-br from-dark to-dark-lighter py-16 border-y border-dark-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">What to Expect</h2>
          <p className="text-text-secondary mb-8">
            After submitting your booking request, our team will contact you within 24 hours
            to confirm your consultation and provide additional information. During your
            consultation, we'll discuss your goals, assess your current fitness level, and
            create a personalized plan to help you succeed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-text-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-text-primary">Initial Consultation</h3>
              <p className="text-text-secondary">Meet with our expert trainers to discuss your goals</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-text-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-text-primary">Fitness Assessment</h3>
              <p className="text-text-secondary">Complete a comprehensive fitness evaluation</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-text-primary font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-text-primary">Custom Plan</h3>
              <p className="text-text-secondary">Receive your personalized training program</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 