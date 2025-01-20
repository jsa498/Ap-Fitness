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
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const result = await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        subject: formData.subject || 'New Contact Form Submission',
        reply_to: formData.email,
        phone: formData.phone
      });

      if (result.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact us directly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      content: '(123) 456-7890',
      link: 'tel:+11234567890'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'info@apfitness.com',
      link: 'mailto:info@apfitness.com'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      content: '123 Fitness Street, Vancouver, BC V6B 1A1',
      link: 'https://maps.google.com'
    },
    {
      icon: FaClock,
      title: 'Hours',
      content: 'Mon-Fri: 6am-10pm\nSat-Sun: 8am-8pm',
      link: null
    }
  ];

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

      {/* Contact Info Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-lighter rounded-lg shadow-dark-lg overflow-hidden border border-dark-border hover:border-ap-red/50 transition-colors p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <info.icon className="w-6 h-6 text-text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-text-primary text-center">{info.title}</h3>
              {info.link ? (
                <a
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-text-secondary hover:text-ap-red transition-colors whitespace-pre-line text-center block"
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-text-secondary whitespace-pre-line text-center">{info.content}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-dark-lighter rounded-lg shadow-dark-lg p-8 border border-dark-border"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-text-primary">Send Us a Message</h2>
          
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
                    className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
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
                    className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
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
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
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
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent disabled:opacity-50"
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
                  rows={6}
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none disabled:opacity-50"
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="text-red-500 text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto"
                >
                  {status === 'loading' ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative">
        <Map />
      </section>
    </main>
  );
} 