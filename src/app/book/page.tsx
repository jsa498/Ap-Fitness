'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaDumbbell, FaClock, FaUser } from 'react-icons/fa';
import { sendConsultationEmail } from '@/lib/emailService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { validateEmail, validatePhone, validateName, validateAge, validateWeight, validateRequired, ValidationError } from '@/lib/validation';
import type { Metadata } from 'next'

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

export const metadata: Metadata = {
  title: 'Book a Free Consultation - Start Your Fitness Journey',
  description: 'Book a free consultation with AP Fitness in Surrey, BC. Meet our certified kinesiologists and start your personalized fitness journey. Transform your life today.',
  openGraph: {
    title: 'Book a Free Consultation - Start Your Fitness Journey',
    description: 'Take the first step towards your fitness goals. Book a free consultation with our certified kinesiologists and discover how AP Fitness can help you succeed.',
    images: [
      {
        url: '/images/book-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Book a Consultation at AP Fitness',
      }
    ],
  },
  twitter: {
    title: 'Book a Free Consultation - Start Your Fitness Journey',
    description: 'Take the first step towards your fitness goals. Book a free consultation with our certified kinesiologists and discover how AP Fitness can help you succeed.',
    images: ['/images/book-twitter.jpg'],
  },
}

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'age':
        return validateAge(value);
      case 'weight':
        return validateWeight(value);
      case 'gender':
      case 'fitness_goal':
      case 'experience_level':
      case 'training_type':
      case 'preferred_time':
        return validateRequired(value, name.replace('_', ' '));
      default:
        return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Validate on change for better user experience
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    // Validate all required fields
    Object.entries(formData).forEach(([name, value]) => {
      if (name === 'additional_info' || name === 'preferred_trainer') return; // Skip optional fields
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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
      setErrors({});
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
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
                  <p className="text-red-500">
                    There was an error sending your consultation request. Please try again or contact us directly.
                  </p>
                </div>
              )}
              
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.name ? 'border-red-500' : 'border-dark-border'
                      }`}
                      placeholder="John Doe"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-500">
                        {errors.name}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-500' : 'border-dark-border'
                      }`}
                      placeholder="john@example.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-dark-border'
                      }`}
                      placeholder="(604) 123-4567"
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.gender ? 'border-red-500' : 'border-dark-border'
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                    {errors.gender && (
                      <p id="gender-error" className="mt-1 text-sm text-red-500">
                        {errors.gender}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.age ? 'border-red-500' : 'border-dark-border'
                      }`}
                    />
                    {errors.age && (
                      <p id="age-error" className="mt-1 text-sm text-red-500">
                        {errors.age}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.weight ? 'border-red-500' : 'border-dark-border'
                      }`}
                    />
                    {errors.weight && (
                      <p id="weight-error" className="mt-1 text-sm text-red-500">
                        {errors.weight}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.fitness_goal ? 'border-red-500' : 'border-dark-border'
                      }`}
                    />
                    {errors.fitness_goal && (
                      <p id="fitness_goal-error" className="mt-1 text-sm text-red-500">
                        {errors.fitness_goal}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.experience_level ? 'border-red-500' : 'border-dark-border'
                      }`}
                    >
                      <option value="">Select your experience level</option>
                      {experienceLevels.map(level => (
                        <option key={level} value={level.toLowerCase()}>{level}</option>
                      ))}
                    </select>
                    {errors.experience_level && (
                      <p id="experience_level-error" className="mt-1 text-sm text-red-500">
                        {errors.experience_level}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.training_type ? 'border-red-500' : 'border-dark-border'
                      }`}
                    >
                      <option value="">Select training type</option>
                      {trainingTypes.map(type => (
                        <option key={type} value={type.toLowerCase()}>{type}</option>
                      ))}
                    </select>
                    {errors.training_type && (
                      <p id="training_type-error" className="mt-1 text-sm text-red-500">
                        {errors.training_type}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.preferred_time ? 'border-red-500' : 'border-dark-border'
                      }`}
                    >
                      <option value="">Select preferred time</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot.toLowerCase()}>{slot}</option>
                      ))}
                    </select>
                    {errors.preferred_time && (
                      <p id="preferred_time-error" className="mt-1 text-sm text-red-500">
                        {errors.preferred_time}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.preferred_trainer ? 'border-red-500' : 'border-dark-border'
                      }`}
                      placeholder="Optional"
                    />
                    {errors.preferred_trainer && (
                      <p id="preferred_trainer-error" className="mt-1 text-sm text-red-500">
                        {errors.preferred_trainer}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-dark border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent transition-colors ${
                        errors.additional_info ? 'border-red-500' : 'border-dark-border'
                      }`}
                    />
                    {errors.additional_info && (
                      <p id="additional_info-error" className="mt-1 text-sm text-red-500">
                        {errors.additional_info}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    bg-gradient-to-r from-ap-red to-ap-red-dark 
                    text-text-primary px-8 py-3 rounded-full 
                    text-lg font-medium transition-all 
                    hover:shadow-xl disabled:opacity-50
                    flex items-center space-x-2
                  `}
                >
                  {status === 'loading' ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Book Consultation</span>
                  )}
                </motion.button>
              </div>
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