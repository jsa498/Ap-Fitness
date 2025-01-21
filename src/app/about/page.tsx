import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About AP Fitness - Our Story & Mission',
  description: 'Learn about AP Fitness, our certified kinesiologists, state-of-the-art facility, and commitment to helping clients achieve their fitness goals in Surrey, BC.',
  openGraph: {
    title: 'About AP Fitness - Our Story & Mission',
    description: 'Discover the AP Fitness difference. Our team of certified kinesiologists is dedicated to providing personalized fitness solutions in a state-of-the-art facility.',
    images: [
      {
        url: '/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AP Fitness Team and Facility',
      }
    ],
  },
  twitter: {
    title: 'About AP Fitness - Our Story & Mission',
    description: 'Discover the AP Fitness difference. Our team of certified kinesiologists is dedicated to providing personalized fitness solutions in a state-of-the-art facility.',
    images: ['/images/about-twitter.jpg'],
  },
}

export default function AboutPage() {
  return <AboutContent />;
} 