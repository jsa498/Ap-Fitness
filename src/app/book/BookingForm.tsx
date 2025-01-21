'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaClock, FaUser } from 'react-icons/fa';
import { sendConsultationEmail } from '@/lib/emailService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { validateEmail, validatePhone, validateName, validateAge, validateWeight, validateRequired, ValidationError } from '@/lib/validation';

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

export default function BookingForm() {
  // Move the form logic here
  return (
    <div>
      {/* Move the form JSX here */}
    </div>
  );
} 