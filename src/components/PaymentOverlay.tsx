import React from 'react';

const PaymentOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-2xl mx-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ Payment Required</h2>
        <div className="space-y-4 text-gray-800">
          <p className="text-lg font-semibold">
            Access to this website has been temporarily suspended.
          </p>
          <p>
            DevFlow Technologies has restricted access to this website due to pending payment issues.
            The domain access will expire at 6:00 PM today, after which the domain will be refunded
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