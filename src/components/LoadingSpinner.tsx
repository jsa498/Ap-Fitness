'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const sizes = {
  sm: 'h-6 w-6',
  md: 'h-12 w-12',
  lg: 'h-16 w-16'
};

const LoadingSpinner = ({ size = 'md', fullScreen = false }: LoadingSpinnerProps) => {
  const spinner = (
    <div className="relative">
      <motion.div
        className={`${sizes[size]} border-2 border-ap-red/20 border-t-ap-red rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute inset-0 border-2 border-transparent border-t-ap-red rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {spinner}
    </div>
  );
};

export default LoadingSpinner; 