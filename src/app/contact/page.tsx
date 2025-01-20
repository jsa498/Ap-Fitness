'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Map from '@/components/Map';
import { sendEmail } from '@/lib/emailService';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        phone: formData.phone,
      });
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] mb-16">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC05643.jpeg"
            alt="AP Fitness Contact"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dark/80" />
        </div>
        <div className="relative h-full flex items-center justify-center text-text-primary">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Get in touch with us for any inquiries or to start your fitness journey
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Get In Touch */}
          <div className="bg-dark-lighter rounded-2xl p-8 shadow-dark-lg">
            <h2 className="text-3xl font-bold mb-8 text-text-primary">Get In Touch</h2>
            
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-ap-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhone className="w-5 h-5 text-ap-red" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Phone</h3>
                  <a href="tel:+16044017917" className="text-text-secondary hover:text-ap-red transition-colors">
                    (604) 401-7917
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-ap-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="w-5 h-5 text-ap-red" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Email</h3>
                  <a href="mailto:apfitnessbc@gmail.com" className="text-text-secondary hover:text-ap-red transition-colors">
                    apfitnessbc@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-ap-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="w-5 h-5 text-ap-red" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Location</h3>
                  <a 
                    href="https://maps.google.com/?q=8160+120+St,+Surrey,+BC+V3W+3N3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-ap-red transition-colors"
                  >
                    8160 120 St<br />
                    Surrey, BC V3W 3N3
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-ap-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaClock className="w-5 h-5 text-ap-red" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Hours</h3>
                  <p className="text-text-secondary">
                    Mon-Fri: 6am-10pm<br />
                    Sat-Sun: 8am-8pm
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-lighter rounded-2xl p-8 shadow-dark-lg">
            <h2 className="text-3xl font-bold mb-8 text-text-primary">Send Message</h2>
            
            {status === 'success' ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent Successfully!</h3>
                <p className="text-text-secondary mb-6">We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-ap-red hover:text-ap-red-dark transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-text-primary font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-text-primary font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-text-primary font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-text-primary font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {status === 'loading' ? (
                    <>
                      <LoadingSpinner />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {status === 'error' && (
                  <p className="text-red-500 text-center">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-dark-lighter rounded-2xl shadow-dark-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-lighter/50 to-transparent z-10 pointer-events-none h-16" />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-dark-lighter/50 to-transparent z-10 pointer-events-none h-16" />
          <div className="h-[400px] relative">
            <Map />
          </div>
          <div className="absolute bottom-6 left-6 bg-dark-lighter px-6 py-4 rounded-xl shadow-xl border border-dark-border z-20">
            <h3 className="text-lg font-semibold text-text-primary mb-2 flex items-center">
              <FaMapMarkerAlt className="w-5 h-5 text-ap-red mr-2" />
              Visit Us
            </h3>
            <a 
              href="https://maps.google.com/?q=8160+120+St,+Surrey,+BC+V3W+3N3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-ap-red transition-colors"
            >
              8160 120 St<br />
              Surrey, BC V3W 3N3
            </a>
          </div>
        </div>
      </section>
    </main>
  );
} 