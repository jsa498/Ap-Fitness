import { Metadata } from 'next'
import { FaDumbbell, FaUsers, FaLaptop, FaAppleAlt, FaKey, FaUserNurse } from 'react-icons/fa'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { PiMedalFill } from 'react-icons/pi'
import { IoSchoolOutline } from 'react-icons/io5'
import TrainingContent from './TrainingContent'

export const metadata: Metadata = {
  title: 'Training Programs & Services | AP Fitness',
  description: 'Transform your fitness journey with our comprehensive training programs. From personal training to group classes, nutrition coaching, and exclusive gym membership options.',
  openGraph: {
    title: 'Training Programs & Services | AP Fitness',
    description: 'Transform your fitness journey with our comprehensive training programs. From personal training to group classes, nutrition coaching, and exclusive gym membership options.',
  },
}

export default function TrainingPage() {
  return <TrainingContent />
} 