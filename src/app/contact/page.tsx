'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Map from '@/components/Map';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
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
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
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
                  className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
                />
              </div>
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
                className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent"
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
                rows={6}
                className="w-full px-4 py-2 bg-dark border border-dark-border rounded-lg focus:ring-2 focus:ring-ap-red focus:border-transparent resize-none"
              ></textarea>
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                Send Message
              </motion.button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative">
        <Map />
      </section>
    </main>
  );
} 