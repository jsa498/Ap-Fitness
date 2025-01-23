'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { sendConsultationEmail } from '@/lib/emailService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaBullseye, FaDumbbell, FaClock, FaUserFriends, FaInfoCircle, FaPaperPlane, FaRunning, FaChevronRight, FaBox, FaTimes, FaCheck, FaUsers, FaFistRaised, FaChild, FaGlobe, FaClinicMedical, FaUserMd } from 'react-icons/fa';
import { GiWeightScale } from 'react-icons/gi';

const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
const trainingTypes = [
  {
    type: 'Personal Training',
    description: 'One-on-one personalized training with certified kinesiologists',
    icon: FaUserFriends
  },
  {
    type: 'Group Training',
    description: 'High-energy group workouts for all fitness levels',
    icon: FaUsers
  },
  {
    type: 'ICBC Active Rehab',
    description: 'Specialized rehabilitation programs for ICBC clients',
    icon: FaClinicMedical
  },
  {
    type: 'Physiotherapy',
    description: 'Professional services for injury recovery and pain management',
    icon: FaUserMd
  },
  {
    type: 'Online Training',
    description: 'Expert guidance and support from anywhere',
    icon: FaGlobe
  }
];
const timeSlots = [
  'Early Morning (6AM-9AM)',
  'Morning (9AM-12PM)',
  'Afternoon (12PM-4PM)',
  'Evening (4PM-8PM)',
  'Late Evening (8PM-10PM)'
];

const personalTrainingDurations = ["30 min", "45 min", "1 hour"];
const personalTrainingSessions = ["8", "12", "24", "36"];

const onlineCoachingPackages = [
  {
    title: "1 Month Online Coaching",
    duration: "1 month",
    features: [
      "Initial Consultation",
      "Custom Workout Program",
      "Custom Nutrition Program",
      "Healthy Recipe Handbook",
      "Access to training software",
      "Weekly check-ins",
      "Daily text/phone support",
      "Group chat support"
    ]
  },
  {
    title: "3 Month Online Coaching",
    duration: "3 months",
    features: [
      "Initial Consultation",
      "Custom Workout Program",
      "Custom Nutrition Program",
      "Healthy Recipe Handbook",
      "Access to training software",
      "Weekly check-ins",
      "Daily text/phone support",
      "Group chat support"
    ]
  },
  {
    title: "6 Month Transformation",
    duration: "6 months",
    popular: true,
    features: [
      "Initial Consultation",
      "Custom Workout Program",
      "Custom Nutrition Program",
      "Healthy Recipe Handbook",
      "Access to training software",
      "Weekly check-ins",
      "Daily text/phone support",
      "Group chat support"
    ]
  }
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
  selected_package?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  weight: string;
  gender: string;
  age: string;
  fitness_goal: string;
  experience_level: string;
  training_type: string;
  preferred_time: string;
  additional_info: string;
  selected_package: string;
  preferred_trainer: string;
  [key: string]: string; // Add index signature
}

const trainingTypeDetails = [
  {
    type: 'One to One Personal Training',
    description: 'Personalized 1-on-1 training tailored to your goals',
    icon: FaUserFriends
  },
  {
    type: 'Group Training',
    description: 'High-energy group workouts for all fitness levels',
    icon: FaUsers
  },
  {
    type: 'Boxing & Kickboxing',
    description: 'Learn boxing techniques while getting fit',
    icon: FaFistRaised
  },
  {
    type: 'Pre & Postnatal',
    description: 'Safe and effective workouts for expecting and new mothers',
    icon: FaChild
  },
  {
    type: 'Online Coaching',
    description: 'Expert guidance and support from anywhere',
    icon: FaGlobe
  }
];

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
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
    additional_info: '',
    selected_package: '',
    preferred_trainer: '',
  });

  const [currentSection, setCurrentSection] = useState<FormSection>('personal');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<ValidationError>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showTrainingTypeSelector, setShowTrainingTypeSelector] = useState(false);
  const [showGenderSelector, setShowGenderSelector] = useState(false);
  const [showExperienceSelector, setShowExperienceSelector] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [showTrainerSelector, setShowTrainerSelector] = useState(false);

  useEffect(() => {
    const packageParam = searchParams.get('package');
    if (packageParam) {
      const decodedPackage = decodeURIComponent(packageParam);
      setFormData(prev => {
        const newData = { ...prev, selected_package: decodedPackage };
        if (onlineCoachingPackages.some(pkg => pkg.title === decodedPackage)) {
          newData.training_type = 'Online Coaching';
        }
        return newData;
      });
    }
  }, [searchParams]);

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
  };

  const handleNextSection = () => {
    setErrors({});
    
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
    e.stopPropagation();
    
    console.log('Form submission started');
    setErrors({});
    
    if (currentSection !== 'training') {
      console.log('Not on final section, preventing submission');
      return;
    }
    
    const sections: FormSection[] = ['personal', 'physical', 'fitness', 'training'];
    let isValid = true;
    let firstInvalidSection: FormSection | null = null;
    
    for (const section of sections) {
      if (!validateForm(section)) {
        isValid = false;
        if (!firstInvalidSection) firstInvalidSection = section;
      }
    }
    
    if (!isValid && firstInvalidSection) {
      console.log('Form validation failed:', errors);
      setCurrentSection(firstInvalidSection);
      setErrorMessage('Please fill in all required fields correctly.');
      return;
    }

    const requiredFields: Record<keyof FormData, string> = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      weight: 'Weight',
      age: 'Age',
      gender: 'Gender',
      fitness_goal: 'Fitness Goal',
      experience_level: 'Experience Level',
      training_type: 'Training Type',
      preferred_time: 'Preferred Time',
      preferred_trainer: 'Trainer Preference',
      additional_info: 'Additional Information',
      selected_package: ''
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, label]) => label && !formData[key as keyof FormData])
      .map(([_, label]) => label);

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      setErrorMessage(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }

    console.log('Form validation passed, proceeding with submission');
    setStatus('loading');
    setErrorMessage('');

    try {
      const formattedPhone = formData.phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      
      const submissionData = {
        ...formData,
        phone: formattedPhone,
        gender: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1),
        experience_level: formData.experience_level.charAt(0).toUpperCase() + formData.experience_level.slice(1),
        preferred_trainer: formData.preferred_trainer ? 
          `${formData.preferred_trainer.charAt(0).toUpperCase() + formData.preferred_trainer.slice(1)} Trainer` : 
          'No Preference',
        subject: `New Consultation Request - ${formData.name}`,
        weight: `${formData.weight} lbs`,
        age: `${formData.age} years`,
        fitness_goal: formData.fitness_goal || 'Not specified',
        additional_info: formData.additional_info || 'No additional information provided',
        selected_package: formData.selected_package || 'No package selected'
      };

      console.log('Sending consultation email with data:', submissionData);
      
      const result = await sendConsultationEmail(submissionData);
      console.log('Email service response:', result);
      
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
          additional_info: '',
          selected_package: '',
          preferred_trainer: '',
        });
        setCurrentSection('personal');
        setErrors({});
      } else {
        throw new Error(result.error || 'Failed to send consultation request');
      }
    } catch (error) {
      console.error('Consultation booking error:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to send consultation request. Please try again or contact us directly.'
      );
    }
  };

  const handleTrainingTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setFormData(prev => ({
      ...prev,
      training_type: newType
    }));
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
                  <label className="text-text-primary font-medium">
                    Gender *
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGenderSelector(true)}
                  className={`w-full px-4 py-3 bg-dark border ${
                    errors.gender ? 'border-red-500' : 'border-dark-border'
                  } rounded-full text-left transition-all hover:border-ap-red/50 focus:ring-2 focus:ring-ap-red focus:border-transparent flex items-center justify-between`}
                >
                  <span className={formData.gender ? 'text-text-primary' : 'text-text-secondary'}>
                    {formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : 'Select your gender'}
                  </span>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <span className="text-xs">Click to change</span>
                    <FaChevronRight className="w-3 h-3" />
                  </div>
                </button>
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
                  <label className="text-text-primary font-medium">
                    Experience Level *
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowExperienceSelector(true)}
                  className={`w-full px-4 py-3 bg-dark border ${
                    errors.experience_level ? 'border-red-500' : 'border-dark-border'
                  } rounded-full text-left transition-all hover:border-ap-red/50 focus:ring-2 focus:ring-ap-red focus:border-transparent flex items-center justify-between`}
                >
                  <span className={formData.experience_level ? 'text-text-primary' : 'text-text-secondary'}>
                    {formData.experience_level ? formData.experience_level.charAt(0).toUpperCase() + formData.experience_level.slice(1) : 'Select your experience level'}
                  </span>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <span className="text-xs">Click to change</span>
                    <FaChevronRight className="w-3 h-3" />
                  </div>
                </button>
                {errors.experience_level && <p className="text-red-500 text-sm mt-1">{errors.experience_level}</p>}
              </div>
            </div>
          </motion.div>
        );

      case 'training':
        return renderTrainingSection();

      default:
        return null;
    }
  };

  const renderTrainingSection = () => (
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
            <FaUserFriends className="text-ap-red" />
            <label className="text-text-primary font-medium">
              Training Type *
            </label>
          </div>
          <button
            type="button"
            onClick={() => setShowTrainingTypeSelector(true)}
            className={`w-full px-4 py-3 bg-dark border ${
              errors.training_type ? 'border-red-500' : 'border-dark-border'
            } rounded-full text-left transition-all hover:border-ap-red/50 focus:ring-2 focus:ring-ap-red focus:border-transparent flex items-center justify-between`}
          >
            <span className={formData.training_type ? 'text-text-primary' : 'text-text-secondary'}>
              {formData.training_type || 'Select training type'}
            </span>
            <div className="flex items-center gap-2 text-text-secondary">
              <span className="text-xs">Click to change</span>
              <FaChevronRight className="w-3 h-3" />
            </div>
          </button>
          {errors.training_type && <p className="text-red-500 text-sm mt-1">{errors.training_type}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FaClock className="text-ap-red" />
            <label className="text-text-primary font-medium">
              Preferred Time *
            </label>
          </div>
          <button
            type="button"
            onClick={() => setShowTimeSelector(true)}
            className={`w-full px-4 py-3 bg-dark border ${
              errors.preferred_time ? 'border-red-500' : 'border-dark-border'
            } rounded-full text-left transition-all hover:border-ap-red/50 focus:ring-2 focus:ring-ap-red focus:border-transparent flex items-center justify-between`}
          >
            <span className={formData.preferred_time ? 'text-text-primary' : 'text-text-secondary'}>
              {formData.preferred_time || 'Select preferred time'}
            </span>
            <div className="flex items-center gap-2 text-text-secondary">
              <span className="text-xs">Click to change</span>
              <FaChevronRight className="w-3 h-3" />
            </div>
          </button>
          {errors.preferred_time && <p className="text-red-500 text-sm mt-1">{errors.preferred_time}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FaUserFriends className="text-ap-red" />
            <label className="text-text-primary font-medium">
              Preferred Trainer *
            </label>
          </div>
          <button
            onClick={() => setShowTrainerSelector(true)}
            className="w-full px-4 py-3 bg-dark border border-dark-border rounded-full text-left transition-all hover:border-ap-red/50 focus:ring-2 focus:ring-ap-red focus:border-transparent flex items-center justify-between"
          >
            <span className={formData.preferred_trainer ? 'text-text-primary' : 'text-text-secondary'}>
              {formData.preferred_trainer ? 
                `${formData.preferred_trainer.charAt(0).toUpperCase() + formData.preferred_trainer.slice(1)} Trainer` : 
                'Select trainer preference'}
            </span>
            <div className="flex items-center gap-2 text-text-secondary">
              <span className="text-xs">Click to change</span>
              <FaChevronRight className="w-3 h-3" />
            </div>
          </button>
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
            disabled={status === 'loading'}
            rows={4}
            className="w-full px-4 py-3 bg-dark border border-dark-border rounded-3xl focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50"
            placeholder="Any additional information you'd like to share..."
          />
        </div>
      </div>
    </motion.div>
  );

  const TrainingTypeModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setShowTrainingTypeSelector(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-dark rounded-[2rem] p-6 w-full max-w-lg relative"
      >
        <button
          onClick={() => setShowTrainingTypeSelector(false)}
          className="absolute right-6 top-6 text-text-secondary hover:text-text-primary"
        >
          <FaTimes className="text-xl" />
        </button>

        <h3 className="text-2xl font-bold mb-2">Select Training Type</h3>
        <p className="text-text-secondary mb-6">Choose your preferred training method</p>

        <div className="space-y-3">
          {trainingTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.type}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, training_type: type.type }));
                  setShowTrainingTypeSelector(false);
                }}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  formData.training_type === type.type
                    ? 'bg-gradient-to-r from-ap-red to-ap-red-dark text-white'
                    : 'bg-dark-lighter hover:bg-dark-lighter/80'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  formData.training_type === type.type
                    ? 'bg-white/10'
                    : 'bg-gradient-to-br from-ap-red to-ap-red-dark'
                }`}>
                  <Icon className={`text-2xl ${
                    formData.training_type === type.type
                      ? 'text-white'
                      : 'text-text-primary'
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium">{type.type}</h4>
                  <p className={`text-sm ${
                    formData.training_type === type.type
                      ? 'text-white/80'
                      : 'text-text-secondary'
                  }`}>
                    {type.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );

  const GenderSelectorModal = () => {
    if (!showGenderSelector) return null;

    const genderOptions = [
      { value: 'male', label: 'Male', icon: FaUser },
      { value: 'female', label: 'Female', icon: FaUser },
      { value: 'other', label: 'Other', icon: FaUser }
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-dark-lighter w-full max-w-md rounded-[2rem] p-6 relative mx-4"
        >
          <button
            onClick={() => setShowGenderSelector(false)}
            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-text-primary mb-1">Select Gender</h3>
            <p className="text-sm text-text-secondary">Choose your gender</p>
          </div>

          <div className="space-y-3">
            {genderOptions.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, gender: option.value }));
                  setShowGenderSelector(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  formData.gender === option.value
                    ? 'border-ap-red bg-ap-red/5'
                    : 'border-dark-border hover:border-ap-red/50'
                }`}
              >
                <div className={`p-3 rounded-xl ${
                  formData.gender === option.value
                    ? 'bg-ap-red text-text-primary'
                    : 'bg-dark text-text-secondary'
                }`}>
                  <option.icon className="w-5 h-5" />
                </div>
                <span className="text-text-primary font-medium">{option.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const ExperienceSelectorModal = () => {
    if (!showExperienceSelector) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-dark-lighter w-full max-w-md rounded-[2rem] p-6 relative mx-4"
        >
          <button
            onClick={() => setShowExperienceSelector(false)}
            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-text-primary mb-1">Select Experience Level</h3>
            <p className="text-sm text-text-secondary">Choose your fitness experience level</p>
          </div>

          <div className="space-y-3">
            {experienceLevels.map((level) => (
              <motion.button
                key={level}
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, experience_level: level.toLowerCase() }));
                  setShowExperienceSelector(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  formData.experience_level === level.toLowerCase()
                    ? 'border-ap-red bg-ap-red/5'
                    : 'border-dark-border hover:border-ap-red/50'
                }`}
              >
                <div className={`p-3 rounded-xl ${
                  formData.experience_level === level.toLowerCase()
                    ? 'bg-ap-red text-text-primary'
                    : 'bg-dark text-text-secondary'
                }`}>
                  <FaDumbbell className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-text-primary font-medium">{level}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const TimeSelectorModal = () => {
    if (!showTimeSelector) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-dark-lighter w-full max-w-md rounded-[2rem] p-6 relative mx-4"
        >
          <button
            onClick={() => setShowTimeSelector(false)}
            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-text-primary mb-1">Select Preferred Time</h3>
            <p className="text-sm text-text-secondary">Choose your preferred training time</p>
          </div>

          <div className="space-y-3">
            {timeSlots.map((slot) => (
              <motion.button
                key={slot}
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, preferred_time: slot }));
                  setShowTimeSelector(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  formData.preferred_time === slot
                    ? 'border-ap-red bg-ap-red/5'
                    : 'border-dark-border hover:border-ap-red/50'
                }`}
              >
                <div className={`p-3 rounded-xl ${
                  formData.preferred_time === slot
                    ? 'bg-ap-red text-text-primary'
                    : 'bg-dark text-text-secondary'
                }`}>
                  <FaClock className="w-5 h-5" />
                </div>
                <span className="text-text-primary font-medium">{slot}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const TrainerPreferenceModal = () => {
    if (!showTrainerSelector) return null;

    const trainerOptions = [
      { 
        name: 'Any Trainer',
        gender: 'any',
        description: 'No preference for trainer gender'
      },
      { 
        name: 'Male Trainer',
        gender: 'male',
        description: 'Prefer a male trainer'
      },
      { 
        name: 'Female Trainer',
        gender: 'female',
        description: 'Prefer a female trainer'
      }
    ];

    const handleTrainerSelect = (option: { gender: string, name: string }) => {
      // Prevent event propagation
      event?.preventDefault();
      event?.stopPropagation();
      
      setFormData(prev => ({ ...prev, preferred_trainer: option.gender }));
      setShowTrainerSelector(false);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowTrainerSelector(false);
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-dark-lighter w-full max-w-md rounded-[2rem] p-6 relative mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowTrainerSelector(false);
            }}
            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-text-primary mb-1">Trainer Preference</h3>
            <p className="text-sm text-text-secondary">Select your preferred trainer gender</p>
          </div>

          <div className="space-y-3">
            {trainerOptions.map((option) => (
              <motion.button
                key={option.gender}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleTrainerSelect(option);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  formData.preferred_trainer === option.gender
                    ? 'border-ap-red bg-ap-red/5'
                    : 'border-dark-border hover:border-ap-red/50'
                }`}
              >
                <div className={`p-3 rounded-xl ${
                  formData.preferred_trainer === option.gender
                    ? 'bg-ap-red text-text-primary'
                    : 'bg-dark text-text-secondary'
                }`}>
                  <FaUserFriends className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-text-primary font-medium">{option.name}</span>
                  <p className="text-sm text-text-secondary">{option.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <main className="flex-1 pt-28">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center mb-8">
          <nav className="bg-dark-lighter rounded-full p-1 inline-flex">
            {['Personal', 'Physical', 'Fitness', 'Training'].map((section) => (
              <button
                key={section}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentSection.toLowerCase() === section.toLowerCase()
                    ? 'bg-ap-red text-white'
                    : 'text-text-secondary hover:text-white'
                }`}
                onClick={() => setCurrentSection(section.toLowerCase() as FormSection)}
              >
                {section}
              </button>
            ))}
          </nav>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Schedule Your Free Consultation</h1>
          <p className="text-text-secondary">
            Take the first step towards achieving your fitness goals
          </p>
        </div>

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
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-text-primary mb-4">Consultation Request Sent!</h3>
                  
                  <div className="max-w-md mx-auto space-y-4 text-text-secondary">
                    <p className="text-lg">Thank you for choosing AP Fitness! Here's what happens next:</p>
                    
                    <div className="bg-dark-lighter rounded-xl p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-500 text-sm">1</span>
                        </div>
                        <p className="text-sm">Our team will review your request within 24 hours</p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-500 text-sm">2</span>
                        </div>
                        <p className="text-sm">We'll contact you via email or phone to confirm your consultation time</p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-500 text-sm">3</span>
                        </div>
                        <p className="text-sm">Prepare any questions you have for your consultation session</p>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-ap-red hover:text-ap-red-dark transition-colors inline-flex items-center gap-2"
                  >
                    <span>Book another consultation</span>
                    <FaChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {renderFormSection()}

                  <div className="flex justify-between items-center mt-8 gap-4">
                    {currentSection !== 'personal' && (
                      <motion.button
                        type="button"
                        onClick={handlePrevSection}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-dark-lighter text-text-primary px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:bg-dark flex items-center gap-2 group"
                      >
                        <FaChevronRight className="rotate-180 w-5 h-5 text-ap-red group-hover:text-text-primary transition-colors" />
                        <span className="mr-1">Previous</span>
                      </motion.button>
                    )}

                    {currentSection !== 'training' ? (
                      <motion.button
                        type="button"
                        onClick={handleNextSection}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-ap-red/20 ml-auto flex items-center gap-2"
                      >
                        <span className="ml-1">Next</span>
                        <FaChevronRight className="w-4 h-4" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-ap-red/20 disabled:opacity-50 flex items-center gap-2 ml-auto justify-center"
                      >
                        {status === 'loading' ? (
                          <>
                            <LoadingSpinner size="sm" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="w-4 h-4" />
                            <span>Book Consultation</span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>

                  {status === 'error' && (
                    <div className="text-red-500 text-sm text-center mt-4">
                      {errorMessage}
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </section>

        <AnimatePresence>
          {showTrainingTypeSelector && <TrainingTypeModal />}
          {showGenderSelector && <GenderSelectorModal />}
          {showExperienceSelector && <ExperienceSelectorModal />}
          {showTimeSelector && <TimeSelectorModal />}
          {showTrainerSelector && <TrainerPreferenceModal />}
        </AnimatePresence>
      </div>
    </main>
  );
} 