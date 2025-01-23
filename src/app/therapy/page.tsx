import { Metadata } from 'next'
import TherapyContent from './TherapyContent'

export const metadata: Metadata = {
  title: 'Therapy & Rehabilitation Services | AP Fitness',
  description: 'Professional therapy and rehabilitation services including ICBC Active Rehab, Gradual Return to Work programs, and Physiotherapy.',
  openGraph: {
    title: 'Therapy & Rehabilitation Services | AP Fitness',
    description: 'Professional therapy and rehabilitation services including ICBC Active Rehab, Gradual Return to Work programs, and Physiotherapy.',
  },
}

export default function TherapyPage() {
  return <TherapyContent />
} 