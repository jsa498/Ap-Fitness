'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { sendConsultationEmail } from '@/lib/emailService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaBullseye, FaDumbbell, FaClock, FaUserFriends, FaInfoCircle, FaPaperPlane, FaRunning, FaChevronRight } from 'react-icons/fa';
import { GiWeightScale } from 'react-icons/gi';

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

type FormSection = 'personal' | 'physical' | 'fitness' | 'training';

interface ValidationError {
  name?: string;
  email?: string;
  phone?: string;
  weight?: string;
  age?: string;
  gender?: string;
  fitness_goal?: string;
  experience_level?: string;
  training_type?: string;
  preferred_time?: string;
}

export default function BookingForm() {
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

  const [currentSection, setCurrentSection] = useState<FormSection>('personal');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<ValidationError>({});
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (section: FormSection): boolean => {
    const newErrors: ValidationError = {};

    if (section === 'personal') {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Invalid phone number format';
      }
    }

    if (section === 'physical') {
      if (!formData.weight) newErrors.weight = 'Weight is required';
      if (!formData.age) newErrors.age = 'Age is required';
      else if (isNaN(Number(formData.age)) || Number(formData.age) < 0) {
        newErrors.age = 'Invalid age';
      }
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    if (section === 'fitness') {
      if (!formData.fitness_goal) newErrors.fitness_goal = 'Fitness goal is required';
      if (!formData.experience_level) newErrors.experience_level = 'Experience level is required';
    }

    if (section === 'training') {
      if (!formData.training_type) newErrors.training_type = 'Training type is required';
      if (!formData.preferred_time) newErrors.preferred_time = 'Preferred time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ValidationError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNextSection = () => {
    if (validateForm(currentSection)) {
      const sections: FormSection[] = ['personal', 'physical', 'fitness', 'training'];
      const currentIndex = sections.indexOf(currentSection);
      if (currentIndex < sections.length - 1) {
        setCurrentSection(sections[currentIndex + 1]);
      }
    }
  };

  const handlePrevSection = () => {
    const sections: FormSection[] = ['personal', 'physical', 'fitness', 'training'];
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(currentSection)) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const result = await sendConsultationEmail(formData);
      
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
        setCurrentSection('personal');
      } else {
        throw new Error('Failed to send consultation request');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send consultation request. Please try again or contact us directly.');
    }
  };

  const renderFormSection = () => {
    switch (currentSection) {
      case 'personal':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-ap-red" />
                  <label htmlFor="name" className="text-text-primary font-medium">
                    Full Name *
                  </label>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-dark border ${errors.name ? 'border-red-500' : 'border-dark-border'} rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-ap-red" />
                  <label htmlFor="email" className="text-text-primary font-medium">
                    Email Address *
                  </label>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-dark border ${errors.email ? 'border-red-500' : 'border-dark-border'} rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-ap-red" />
                  <label htmlFor="phone" className="text-text-primary font-medium">
                    Phone Number *
                  </label>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-dark border ${errors.phone ? 'border-red-500' : 'border-dark-border'} rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </motion.div>
        );

      case 'physical':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6">Physical Details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <GiWeightScale className="text-ap-red" />
                  <label htmlFor="weight" className="text-text-primary font-medium">
                    Weight *
                  </label>
                </div>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-dark border ${errors.weight ? 'border-red-500' : 'border-dark-border'} rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50`}
                />
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaBirthdayCake className="text-ap-red" />
                  <label htmlFor="age" className="text-text-primary font-medium">
                    Age *
                  </label>
                </div>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-dark border ${errors.age ? 'border-red-500' : 'border-dark-border'} rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50`}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-ap-red" />
                  <label htmlFor="gender" className="text-text-primary font-medium">
                    Gender *
                  </label>
                </div>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-dark border ${errors.gender ? 'border-red-500' : 'border-dark-border'} rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50`}
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
            </div>
          </motion.div>
        );

      case 'fitness':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6">Fitness Profile</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaBullseye className="text-ap-red" />
                  <label htmlFor="fitness_goal" className="text-text-primary font-medium">
                    Fitness Goal *
                  </label>
                </div>
                <textarea
                  id="fitness_goal"
                  name="fitness_goal"
                  value={formData.fitness_goal}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  rows={3}
                  className={`w-full px-4 py-3 bg-dark border ${errors.fitness_goal ? 'border-red-500' : 'border-dark-border'} rounded-2xl focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50`}
                  placeholder="Tell us about your fitness goal..."
                />
                {errors.fitness_goal && <p className="text-red-500 text-sm mt-1">{errors.fitness_goal}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaDumbbell className="text-ap-red" />
                  <label htmlFor="experience_level" className="text-text-primary font-medium">
                    Fitness Experience Level *
                  </label>
                </div>
                <select
                  id="experience_level"
                  name="experience_level"
                  value={formData.experience_level}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-dark border ${errors.experience_level ? 'border-red-500' : 'border-dark-border'} rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50`}
                >
                  <option value="">Select your experience level</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level.toLowerCase()}>{level}</option>
                  ))}
                </select>
                {errors.experience_level && <p className="text-red-500 text-sm mt-1">{errors.experience_level}</p>}
              </div>
            </div>
          </motion.div>
        );

      case 'training':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6">Training Preferences</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaRunning className="text-ap-red" />
                  <label htmlFor="training_type" className="text-text-primary font-medium">
                    Training Type *
                  </label>
                </div>
                <select
                  id="training_type"
                  name="training_type"
                  value={formData.training_type}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-dark border ${errors.training_type ? 'border-red-500' : 'border-dark-border'} rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50`}
                >
                  <option value="">Select a training type</option>
                  {trainingTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.training_type && <p className="text-red-500 text-sm mt-1">{errors.training_type}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaClock className="text-ap-red" />
                  <label htmlFor="preferred_time" className="text-text-primary font-medium">
                    Preferred Time *
                  </label>
                </div>
                <select
                  id="preferred_time"
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-dark border ${errors.preferred_time ? 'border-red-500' : 'border-dark-border'} rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50`}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.preferred_time && <p className="text-red-500 text-sm mt-1">{errors.preferred_time}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaUserFriends className="text-ap-red" />
                  <label htmlFor="preferred_trainer" className="text-text-primary font-medium">
                    Preferred Trainer
                  </label>
                </div>
                <input
                  type="text"
                  id="preferred_trainer"
                  name="preferred_trainer"
                  value={formData.preferred_trainer}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 bg-dark border border-dark-border rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaInfoCircle className="text-ap-red" />
                  <label htmlFor="additional_info" className="text-text-primary font-medium">
                    Additional Information
                  </label>
                </div>
                <textarea
                  id="additional_info"
                  name="additional_info"
                  value={formData.additional_info}
                  onChange={handleChange}
                  rows={3}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 bg-dark border border-dark-border rounded-2xl focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50"
                  placeholder="Any additional information you'd like us to know..."
                />
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] mt-28">
        <div className="absolute inset-0 mx-4 overflow-hidden">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/DSC05643.jpeg"
              alt="AP Fitness Booking"
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
              Book a Session
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-lg"
            >
              Take the first step towards your fitness goals
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form Section Navigation */}
      <section className="max-w-4xl mx-auto px-4 pt-16">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex space-x-4"
          >
            {(['personal', 'physical', 'fitness', 'training'] as FormSection[]).map((section, index) => (
              <motion.button
                key={section}
                onClick={() => setCurrentSection(section)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentSection === section
                    ? 'bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary'
                    : 'bg-dark-lighter text-text-secondary hover:bg-dark'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-dark-lighter to-dark p-[2px] rounded-[2rem] shadow-dark-lg"
        >
          <div className="bg-dark rounded-[1.9rem] p-8 h-full">
            <h1 className="text-4xl font-bold text-center mb-8 text-text-primary">Schedule Your Free Consultation</h1>

            {status === 'success' ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Consultation Request Sent!</h3>
                <p className="text-text-secondary mb-6">We'll get back to you shortly to confirm your consultation.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStatus('idle')}
                  className="text-ap-red hover:text-ap-red-dark transition-colors"
                >
                  Book another consultation
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderFormSection()}

                <div className="flex justify-between mt-8">
                  {currentSection !== 'personal' && (
                    <motion.button
                      type="button"
                      onClick={handlePrevSection}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-dark-lighter text-text-primary px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-dark flex items-center space-x-2"
                    >
                      <FaChevronRight className="rotate-180" />
                      <span>Previous</span>
                    </motion.button>
                  )}

                  {currentSection !== 'training' ? (
                    <motion.button
                      type="button"
                      onClick={handleNextSection}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-ap-red/20 ml-auto flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <FaChevronRight />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-ap-red/20 disabled:opacity-50 flex items-center space-x-2 ml-auto"
                    >
                      {status === 'loading' ? (
                        <>
                          <LoadingSpinner size="sm" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          <span>Book Consultation</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>

                {status === 'error' && (
                  <div className="text-red-500 text-sm text-center">
                    {errorMessage}
                  </div>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </section>
    </main>
  );
} 