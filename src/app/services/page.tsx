import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Fitness Services & Training Programs',
  description: 'Discover our comprehensive fitness services including personal training, group classes, boxing, kickboxing, and specialized programs. Expert guidance from certified kinesiologists.',
  openGraph: {
    title: 'Fitness Services & Training Programs',
    description: 'Transform your life with our comprehensive fitness services. Expert guidance from certified kinesiologists in a state-of-the-art facility.',
    images: [
      {
        url: '/images/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AP Fitness Services',
      }
    ],
  },
  twitter: {
    title: 'Fitness Services & Training Programs',
    description: 'Transform your life with our comprehensive fitness services. Expert guidance from certified kinesiologists in a state-of-the-art facility.',
    images: ['/images/services-twitter.jpg'],
  },
}

export default function ServicesPage() {
  return (
    <>
      <Image
        src="/images/DSC09190.jpg"
        alt="AP Fitness Services"
        fill
        className="object-cover brightness-50"
        priority
      />
      <ServicesContent />
    </>
  );
} 