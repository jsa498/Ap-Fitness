import Image from 'next/image';
import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact AP Fitness - Get in Touch',
  description: 'Contact AP Fitness in Surrey, BC. Reach out for inquiries about personal training, fitness classes, or to start your fitness journey. Visit our state-of-the-art facility.',
  openGraph: {
    title: 'Contact AP Fitness - Get in Touch',
    description: 'Ready to transform your life? Contact AP Fitness today and let our certified kinesiologists help you achieve your fitness goals.',
    images: [
      {
        url: '/images/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact AP Fitness',
      }
    ],
  },
  twitter: {
    title: 'Contact AP Fitness - Get in Touch',
    description: 'Ready to transform your life? Contact AP Fitness today and let our certified kinesiologists help you achieve your fitness goals.',
    images: ['/images/contact-twitter.jpg'],
  },
}

export default function ContactPage() {
  return (
    <main className="flex-1">
      <ContactForm />
    </main>
  );
} 