'use client';

import React, { useEffect } from 'react';

const PaymentOverlay = () => {
  // Prevent scrolling when component mounts
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 z-[99999] flex items-center justify-center w-screen h-screen touch-none select-none"
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        touchAction: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <div 
        className="bg-white p-8 rounded-lg max-w-2xl mx-4 text-center shadow-2xl"
        style={{ pointerEvents: 'auto' }}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ Payment Required</h2>
        <div className="space-y-4 text-gray-800">
          <p className="text-lg font-semibold">
            Access to this website has been temporarily suspended.
          </p>
          <p>
            DevFlow Technologies has restricted access to this website due to pending payment issues.
            The domain access will expire on 2025-01-26 12:00 AM, after which the domain will be refunded
            and permanent access to this website will be lost.
          </p>
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <p className="font-medium">
              To restore immediate access and prevent service termination:
            </p>
            <p className="mt-2">
              Please contact DevFlow Technologies immediately to process the outstanding payment.
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-6">
            All services provided by DevFlow Technologies will be discontinued if payment is not received by the deadline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentOverlay; 