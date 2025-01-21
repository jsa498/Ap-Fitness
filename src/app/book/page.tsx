import Image from 'next/image';
import type { Metadata } from 'next';
import BookingForm from './BookingForm';

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

export default function BookPage() {
  return (
    <main className="flex-1">
      <BookingForm />
    </main>
  );
} 