'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { sendConsultationEmail } from '@/lib/emailService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaBullseye, FaDumbbell, FaClock, FaUserFriends, FaInfoCircle, FaPaperPlane, FaRunning, FaChevronRight, FaBox, FaTimes, FaCheck, FaUsers, FaFistRaised, FaChild, FaGlobe } from 'react-icons/fa';
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
    additional_info: '',
    selected_package: ''
  });

  const [currentSection, setCurrentSection] = useState<FormSection>('personal');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<ValidationError>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showPackageSelector, setShowPackageSelector] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedSessions, setSelectedSessions] = useState('');
  const [showTrainingTypeSelector, setShowTrainingTypeSelector] = useState(false);

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
      if (!formData.selected_package) newErrors.selected_package = 'Package selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          additional_info: '',
          selected_package: ''
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

  const requiresPackageSelection = (trainingType: string) => {
    return trainingType === 'One to One Personal Training' || trainingType === 'Online Coaching';
  };

  const handleTrainingTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setFormData(prev => ({
      ...prev,
      training_type: newType,
      selected_package: ''
    }));

    if (newType === 'One to One Personal Training') {
      setSelectedDuration('');
      setSelectedSessions('');
      setShowPackageSelector(true);
    }
  };

  const handlePersonalPackageSelect = () => {
    if (selectedDuration && selectedSessions) {
      const packageName = `${selectedDuration} sessions - ${selectedSessions} sessions`;
      setFormData(prev => ({
        ...prev,
        selected_package: packageName
      }));
      setShowPackageSelector(false);
    }
  };

  const handleOnlinePackageSelect = (packageTitle: string) => {
    setFormData(prev => ({
      ...prev,
      selected_package: packageTitle
    }));
    setShowPackageSelector(false);
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

        {requiresPackageSelection(formData.training_type) && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaBox className="text-ap-red" />
              <label className="text-text-primary font-medium">
                Selected Package *
              </label>
            </div>
            <button
              type="button"
              onClick={() => setShowPackageSelector(true)}
              className="w-full px-4 py-3 bg-dark border border-dark-border rounded-full text-left transition-all hover:border-ap-red/50 focus:ring-2 focus:ring-ap-red focus:border-transparent flex items-center justify-between"
            >
              <span className={formData.selected_package ? 'text-text-primary' : 'text-text-secondary'}>
                {formData.selected_package || 'Select a package'}
              </span>
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="text-xs">Click to change</span>
                <FaChevronRight className="w-3 h-3" />
              </div>
            </button>
            {errors.selected_package && <p className="text-red-500 text-sm mt-1">{errors.selected_package}</p>}
          </div>
        )}

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
            <option value="">Select preferred time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.preferred_time && <p className="text-red-500 text-sm mt-1">{errors.preferred_time}</p>}
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

  const PackageSelectorModal = () => {
    const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

    if (!showPackageSelector) return null;

    return (
      <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-dark-lighter w-full max-w-md rounded-[2rem] p-6 max-h-[85vh] overflow-y-auto relative mx-4">
          <button
            onClick={() => setShowPackageSelector(false)}
            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          {formData.training_type === 'One to One Personal Training' ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-text-primary mb-1">Select Your Package</h3>
                <p className="text-sm text-text-secondary">Choose your preferred session duration and package size</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-text-primary font-medium mb-2 block">Session Duration</label>
                  <div className="grid grid-cols-3 gap-3">
                    {personalTrainingDurations.map((duration) => (
                      <motion.button
                        key={duration}
                        onClick={() => setSelectedDuration(duration)}
                        initial={false}
                        animate={{
                          scale: selectedDuration === duration ? 1 : 1,
                          backgroundColor: selectedDuration === duration ? 'rgba(220, 38, 38, 0.1)' : 'transparent'
                        }}
                        className={`p-3 rounded-xl border transition-colors ${
                          selectedDuration === duration
                            ? 'border-ap-red text-text-primary'
                            : 'border-dark-border text-text-secondary hover:border-ap-red/50'
                        }`}
                      >
                        {duration}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-text-primary font-medium mb-2 block">Number of Sessions</label>
                  <div className="grid grid-cols-4 gap-3">
                    {personalTrainingSessions.map((sessions) => (
                      <motion.button
                        key={sessions}
                        onClick={() => setSelectedSessions(sessions)}
                        initial={false}
                        animate={{
                          scale: selectedSessions === sessions ? 1 : 1,
                          backgroundColor: selectedSessions === sessions ? 'rgba(220, 38, 38, 0.1)' : 'transparent'
                        }}
                        className={`p-3 rounded-xl border transition-colors ${
                          selectedSessions === sessions
                            ? 'border-ap-red text-text-primary'
                            : 'border-dark-border text-text-secondary hover:border-ap-red/50'
                        }`}
                      >
                        {sessions}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePersonalPackageSelect}
                disabled={!selectedDuration || !selectedSessions}
                className="w-full bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Confirm Selection
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-text-primary mb-1">Select Your Package</h3>
                <p className="text-sm text-text-secondary">Choose your preferred online coaching program</p>
              </div>

              <div className="space-y-3">
                {onlineCoachingPackages.map((package_) => (
                  <motion.div
                    key={package_.title}
                    layout
                    transition={{ type: "spring", duration: 0.5 }}
                    className={`relative rounded-xl border ${
                      package_.popular
                        ? 'border-ap-red bg-ap-red/5'
                        : 'border-dark-border hover:border-ap-red/30'
                    }`}
                  >
                    <motion.div 
                      layout="position"
                      className={`p-4 ${package_.popular ? 'mt-4' : ''}`}
                    >
                      {package_.popular && (
                        <div className="absolute top-0 left-0 w-full flex justify-center z-20 -translate-y-1/2">
                          <span className="bg-ap-red text-text-primary px-3 py-0.5 rounded-full text-xs font-medium">
                            Popular
                          </span>
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-text-primary">{package_.title}</h4>
                          <p className="text-sm text-text-secondary">{package_.duration} program</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleOnlinePackageSelect(package_.title)}
                          className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-6 py-2 rounded-full text-sm font-medium"
                        >
                          Select
                        </motion.button>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{ height: expandedPackage === package_.title ? 'auto' : '0' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4">
                          <div className="grid grid-cols-2 gap-2">
                            {package_.features.map((feature, i) => (
                              <div 
                                key={i} 
                                className="flex items-center text-text-secondary"
                              >
                                <FaCheck className="w-3 h-3 text-ap-red mr-2 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      <button
                        onClick={() => setExpandedPackage(
                          expandedPackage === package_.title ? null : package_.title
                        )}
                        className="mt-2 text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
                      >
                        {expandedPackage === package_.title ? 'Show less' : 'Show features'}
                        <motion.div
                          animate={{ rotate: expandedPackage === package_.title ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaChevronRight className="w-3 h-3" />
                        </motion.div>
                      </button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const TrainingTypeSelectorModal = () => {
    if (!showTrainingTypeSelector) return null;

    return (
      <AnimatePresence>
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
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-dark-lighter w-full max-w-md rounded-[2rem] p-6 max-h-[85vh] overflow-y-auto relative mx-4"
          >
            <button
              onClick={() => setShowTrainingTypeSelector(false)}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-text-primary mb-1">Select Training Type</h3>
              <p className="text-sm text-text-secondary">Choose your preferred training method</p>
            </div>

            <div className="space-y-3">
              {trainingTypeDetails.map((type) => {
                const Icon = type.icon;
                return (
                  <motion.button
                    key={type.type}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, training_type: type.type }));
                      setShowTrainingTypeSelector(false);
                      if (type.type === 'One to One Personal Training' || type.type === 'Online Coaching') {
                        setShowPackageSelector(true);
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                      formData.training_type === type.type
                        ? 'border-ap-red bg-ap-red/5'
                        : 'border-dark-border hover:border-ap-red/50'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${
                      formData.training_type === type.type
                        ? 'bg-ap-red text-text-primary'
                        : 'bg-dark text-text-secondary'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="text-base font-semibold text-text-primary">{type.type}</h4>
                      <p className="text-xs text-text-secondary line-clamp-2">{type.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Form Navigation */}
      <div className="flex justify-center mb-8 px-4">
        <div className="inline-flex gap-2">
          {(['personal', 'physical', 'fitness', 'training'] as FormSection[]).map((section) => (
            <motion.button
              key={section}
              onClick={() => setCurrentSection(section)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
        </div>
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

      <AnimatePresence>
        {showPackageSelector && <PackageSelectorModal />}
        {showTrainingTypeSelector && <TrainingTypeSelectorModal />}
      </AnimatePresence>
    </main>
  );
} 