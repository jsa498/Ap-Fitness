import type { Metadata } from 'next';
import RehabContent from './RehabContent';

export const metadata: Metadata = {
  title: 'ICBC Active Rehab & Physiotherapy in Surrey | AP Fitness',
  description: 'ICBC-covered active rehabilitation and physiotherapy services in Surrey, BC. Expert kinesiologists and physiotherapists help with motor vehicle accident recovery, injury rehabilitation, and pain management. Up to 12 pre-approved treatments available.',
  openGraph: {
    title: 'ICBC Active Rehab & Physiotherapy in Surrey | AP Fitness',
    description: 'Expert rehabilitation services for ICBC claims. Our certified kinesiologists and physiotherapists provide personalized treatment plans for optimal recovery after motor vehicle accidents.',
    url: '/rehab',
    siteName: 'AP Fitness',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/images/rehab-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AP Fitness Rehabilitation Services',
      }
    ],
  },
  keywords: [
    'ICBC active rehab',
    'physiotherapy surrey',
    'motor vehicle accident rehabilitation',
    'ICBC claim treatment',
    'injury recovery surrey',
    'kinesiology services',
    'rehab center surrey',
    'ICBC approved provider',
    'MVA treatment',
    'physical therapy'
  ],
  alternates: {
    canonical: 'https://ap-fitness.ca/rehab'
  }
};

export default function RehabPage() {
  return <RehabContent />;
} 