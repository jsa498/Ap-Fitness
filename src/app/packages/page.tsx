import type { Metadata } from 'next';
import PackagesContent from './PackagesContent';

export const metadata: Metadata = {
  title: 'Training Packages | AP Fitness',
  description: 'Explore our comprehensive personal training and online coaching packages designed to help you achieve your fitness goals. Choose from flexible options tailored to your needs.',
  openGraph: {
    title: 'Training Packages | AP Fitness',
    description: 'Explore our comprehensive personal training and online coaching packages designed to help you achieve your fitness goals. Choose from flexible options tailored to your needs.',
    url: '/packages',
    siteName: 'AP Fitness',
    locale: 'en_US',
    type: 'website',
  },
};

export default function PackagesPage() {
  return <PackagesContent />;
} 