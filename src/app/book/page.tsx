'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaDumbbell, FaClock, FaUser } from 'react-icons/fa';
import { sendConsultationEmail } from '@/lib/emailService';
import LoadingSpinner from '@/components/LoadingSpinner';

const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
const trainingTypes = [
  'One to One Personal Training',
  'Group Training',
  'Boxing & Kickboxing',
  'Pre & Postnatal',
  'Online Coaching'
];
const timeSlots = [
  'Early Morning (6AM-9AM)',
  'Morning (9AM-12PM)',
  'Afternoon (12PM-4PM)',
  'Evening (4PM-8PM)',
  'Late Evening (8PM-10PM)'
];

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
    training_type: '',
    preferred_time: '',
    preferred_trainer: '',
    additional_info: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await sendConsultationEmail(formData);
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
        training_type: '',
        preferred_time: '',
        preferred_trainer: '',
        additional_info: ''
      });
    } catch (error) {
      console.error('Error sending consultation request:', error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] mb-16">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC05643.jpeg"
            alt="AP Fitness Consultation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dark/80" />
        </div>
        <div className="relative h-full flex items-center justify-center text-text-primary">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Book a Free Consultation</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Take the first step towards your fitness goals with a personalized consultation
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-dark-lighter rounded-2xl p-8 shadow-dark-lg">
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
              <p className="text-text-secondary mb-6">
                We'll contact you within 24 hours to confirm your consultation time.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-ap-red hover:text-ap-red-dark transition-colors"
              >
                Book another consultation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-text-primary flex items-center">
                  <FaUser className="w-5 h-5 mr-2 text-ap-red" />
                  Personal Information
                </h3>
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
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                      placeholder="John Doe"
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
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
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
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                      placeholder="(604) 123-4567"
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
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-text-primary font-medium mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="16"
                      max="99"
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label htmlFor="weight" className="block text-text-primary font-medium mb-2">
                      Weight (lbs) *
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                      placeholder="150"
                    />
                  </div>
                </div>
              </div>

              {/* Fitness Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-text-primary flex items-center">
                  <FaDumbbell className="w-5 h-5 mr-2 text-ap-red" />
                  Fitness Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="fitness_goal" className="block text-text-primary font-medium mb-2">
                      What are your fitness goals? *
                    </label>
                    <textarea
                      id="fitness_goal"
                      name="fitness_goal"
                      value={formData.fitness_goal}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none"
                      placeholder="Tell us about your fitness goals..."
                    />
                  </div>
                  <div>
                    <label htmlFor="experience_level" className="block text-text-primary font-medium mb-2">
                      Experience Level *
                    </label>
                    <select
                      id="experience_level"
                      name="experience_level"
                      value={formData.experience_level}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                    >
                      <option value="">Select your experience level</option>
                      {experienceLevels.map(level => (
                        <option key={level} value={level.toLowerCase()}>{level}</option>
                      ))}
                    </select>
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
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                    >
                      <option value="">Select training type</option>
                      {trainingTypes.map(type => (
                        <option key={type} value={type.toLowerCase()}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-text-primary flex items-center">
                  <FaClock className="w-5 h-5 mr-2 text-ap-red" />
                  Schedule Preference
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                    >
                      <option value="">Select preferred time</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot.toLowerCase()}>{slot}</option>
                      ))}
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
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="additional_info" className="block text-text-primary font-medium mb-2">
                      Additional Information
                    </label>
                    <textarea
                      id="additional_info"
                      name="additional_info"
                      value={formData.additional_info}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none"
                      placeholder="Any additional information you'd like us to know..."
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {status === 'loading' ? (
                  <>
                    <LoadingSpinner />
                    <span>Sending...</span>
                  </>
                ) : (
                  'Book Consultation'
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-center mt-4">
                  There was an error sending your consultation request. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-dark-lighter rounded-2xl p-8 shadow-dark-lg">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">What to Expect</h2>
          <div className="space-y-4 text-text-secondary">
            <p>
              After submitting your booking request, our team will contact you within 24 hours to confirm 
              your consultation and provide additional information.
            </p>
            <p>
              During your consultation, we'll discuss your fitness goals in detail, assess your current 
              fitness level, and create a personalized plan tailored to your needs.
            </p>
            <p>
              The consultation typically takes 45-60 minutes and includes:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>Initial fitness assessment</li>
              <li>Goal setting discussion</li>
              <li>Training program overview</li>
              <li>Nutrition guidance</li>
              <li>Q&A session</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
} 