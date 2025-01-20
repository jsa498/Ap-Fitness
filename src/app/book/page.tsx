'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner';
import { sendConsultationEmail } from '@/lib/emailService';

export default function Book() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weight: '',
    gender: '',
    age: '',
    fitness_goal: '',
    experience_level: '',
    training_type: 'One to One Personal Training',
    preferred_time: '',
    preferred_trainer: '',
    additional_info: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const result = await sendConsultationEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        weight: formData.weight,
        gender: formData.gender,
        age: formData.age,
        fitness_goal: formData.fitness_goal,
        experience_level: formData.experience_level,
        training_type: formData.training_type,
        preferred_time: formData.preferred_time,
        preferred_trainer: formData.preferred_trainer,
        additional_info: formData.additional_info
      });

      if (result.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          weight: '',
          gender: '',
          age: '',
          fitness_goal: '',
          experience_level: '',
          training_type: 'One to One Personal Training',
          preferred_time: '',
          preferred_trainer: '',
          additional_info: ''
        });
      } else {
        throw new Error('Failed to send consultation request');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send consultation request. Please try again or contact us directly.');
    }
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
      <section className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-lighter rounded-lg shadow-dark-lg p-8 border border-dark-border"
        >
          <h1 className="text-4xl font-bold text-center mb-8 text-text-primary">Schedule Your Free Consultation</h1>

          {status === 'success' ? (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">Consultation Request Sent!</h3>
              <p className="text-text-secondary mb-6">We'll get back to you shortly to confirm your consultation.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-ap-red hover:text-ap-red-dark transition-colors"
              >
                Book another consultation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    disabled={status === 'loading'}
                    className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
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
                    disabled={status === 'loading'}
                    className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-text-primary font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="block text-text-primary font-medium mb-2">
                    Weight *
                  </label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-text-primary font-medium mb-2">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="age" className="block text-text-primary font-medium mb-2">
                    Age *
                  </label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="fitness_goal" className="block text-text-primary font-medium mb-2">
                    Fitness Goal *
                  </label>
                  <textarea
                    id="fitness_goal"
                    name="fitness_goal"
                    value={formData.fitness_goal}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    rows={3}
                    className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none disabled:opacity-50"
                    placeholder="Tell us about your fitness goal..."
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="experience_level" className="block text-text-primary font-medium mb-2">
                    Fitness Experience Level *
                  </label>
                  <select
                    id="experience_level"
                    name="experience_level"
                    value={formData.experience_level}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="training_type" className="block text-text-primary font-medium mb-2">
                  Training Type *
                </label>
                <select
                  id="training_type"
                  name="training_type"
                  value={formData.training_type}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Select a training type</option>
                  <option value="One to One Personal Training">One to One Personal Training</option>
                  <option value="Group Fitness">Group Fitness</option>
                  <option value="Boxing & Kickboxing">Boxing & Kickboxing</option>
                  <option value="Pre & Postnatal">Pre & Postnatal</option>
                  <option value="Nutritional Coaching">Nutritional Coaching</option>
                  <option value="Online Coaching">Online Coaching</option>
                </select>
              </div>

              <div>
                <label htmlFor="preferred_time" className="block text-text-primary font-medium mb-2">
                  Preferred Time *
                </label>
                <select
                  id="preferred_time"
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Select a time</option>
                  <option value="morning">Morning (6AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 10PM)</option>
                </select>
              </div>

              <div>
                <label htmlFor="preferred_trainer" className="block text-text-primary font-medium mb-2">
                  Preferred Trainer
                </label>
                <input
                  type="text"
                  id="preferred_trainer"
                  name="preferred_trainer"
                  value={formData.preferred_trainer}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="additional_info" className="block text-text-primary font-medium mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additional_info"
                  name="additional_info"
                  value={formData.additional_info}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none disabled:opacity-50"
                  placeholder="Any additional information you'd like us to know..."
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="text-red-500 text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto"
                >
                  {status === 'loading' ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Book Consultation'
                  )}
                </motion.button>
              </div>
            </form>
          )}
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