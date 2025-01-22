'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Map from '@/components/Map';
import { sendEmail } from '@/lib/emailService';
import LoadingSpinner from '@/components/LoadingSpinner';
import Image from 'next/image';

export default function ContactForm() {
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
      <section className="relative h-[40vh] mt-28">
        <div className="absolute inset-0 mx-4 overflow-hidden">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/DSC05617.jpeg"
              alt="AP Fitness Contact"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
          </div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-text-primary">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-12 border border-text-primary/10 mx-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-lg"
            >
              Get in touch with us for any inquiries or to start your fitness journey
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 mb-16 mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Get In Touch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-dark-lighter to-dark p-[2px] rounded-[2rem] shadow-dark-lg"
          >
            <div className="bg-dark rounded-[1.9rem] p-8 h-full">
              <h2 className="text-3xl font-bold mb-8 text-text-primary">Get In Touch</h2>
              
              <div className="space-y-8">
                {/* Phone */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-ap-red/20 transition-all duration-300">
                    <FaPhone className="w-5 h-5 text-text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-ap-red transition-colors">Phone</h3>
                    <a href="tel:+16044017917" className="text-text-secondary hover:text-ap-red transition-colors">
                      (604) 401-7917
                    </a>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-ap-red/20 transition-all duration-300">
                    <FaEnvelope className="w-5 h-5 text-text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-ap-red transition-colors">Email</h3>
                    <a href="mailto:apfitnessbc@gmail.com" className="text-text-secondary hover:text-ap-red transition-colors">
                      apfitnessbc@gmail.com
                    </a>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-ap-red/20 transition-all duration-300">
                    <FaMapMarkerAlt className="w-5 h-5 text-text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-ap-red transition-colors">Location</h3>
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
                </motion.div>

                {/* Hours */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-ap-red/20 transition-all duration-300">
                    <FaClock className="w-5 h-5 text-text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-ap-red transition-colors">Hours</h3>
                    <p className="text-text-secondary">
                      Mon-Fri: 6am-10pm<br />
                      Sat-Sun: 8am-8pm
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-dark-lighter to-dark p-[2px] rounded-[2rem] shadow-dark-lg"
          >
            <div className="bg-dark rounded-[1.9rem] p-8 h-full">
              <h2 className="text-3xl font-bold mb-8 text-text-primary">Send Message</h2>
              
              {status === 'success' ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent Successfully!</h3>
                  <p className="text-text-secondary mb-6">We'll get back to you as soon as possible.</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStatus('idle')}
                    className="text-ap-red hover:text-ap-red-dark transition-colors"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
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
                        className="w-full px-4 py-3 bg-dark border border-dark-border rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50"
                        placeholder="John Doe"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
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
                        className="w-full px-4 py-3 bg-dark border border-dark-border rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
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
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50"
                      placeholder="(123) 456-7890"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
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
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-full focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50"
                      placeholder="How can we help you?"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
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
                      className="w-full px-4 py-3 bg-dark border border-dark-border rounded-2xl focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50 transition-all duration-300 hover:border-ap-red/50 resize-none"
                      placeholder="Your message here..."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-end"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={status === 'loading'}
                      className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-ap-red/20 disabled:opacity-50 flex items-center space-x-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <LoadingSpinner />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </motion.button>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
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