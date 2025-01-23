'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserMd, FaClipboardCheck, FaChartLine, FaHandHoldingHeart, FaCarCrash, FaFileInvoiceDollar, FaClock, FaCheckCircle } from 'react-icons/fa';

const rehabFeatures = [
  {
    title: "Personalized Assessment",
    description: "Comprehensive evaluation by certified kinesiologists to understand your condition and create a tailored recovery plan.",
    Icon: FaClipboardCheck,
    details: [
      "Initial physical assessment",
      "Medical history review",
      "Pain and mobility evaluation",
      "Treatment goal setting",
      "Custom recovery planning"
    ]
  },
  {
    title: "ICBC Direct Billing",
    description: "We bill ICBC directly for Active Rehab services, making your recovery process hassle-free.",
    Icon: FaFileInvoiceDollar,
    details: [
      "Direct ICBC billing",
      "Pre-approved treatments",
      "Claim assistance",
      "Documentation support",
      "Progress reporting"
    ]
  },
  {
    title: "Expert Care",
    description: "Our experienced team of kinesiologists and physiotherapists provide professional guidance throughout your recovery.",
    Icon: FaUserMd,
    details: [
      "Certified kinesiologists",
      "Licensed physiotherapists",
      "Ongoing supervision",
      "Expert guidance",
      "Professional care"
    ]
  },
  {
    title: "Progress Tracking",
    description: "Regular assessments and adjustments to your treatment plan to ensure optimal recovery.",
    Icon: FaChartLine,
    details: [
      "Regular progress reviews",
      "Treatment adjustments",
      "Goal monitoring",
      "Recovery milestones",
      "Detailed documentation"
    ]
  },
  {
    title: "Holistic Approach",
    description: "Combining active rehabilitation with physiotherapy for comprehensive recovery.",
    Icon: FaHandHoldingHeart,
    details: [
      "Exercise therapy",
      "Manual therapy",
      "Pain management",
      "Mobility work",
      "Strength training"
    ]
  },
  {
    title: "MVA Specialists",
    description: "Specialized in treating injuries from motor vehicle accidents with proven recovery protocols.",
    Icon: FaCarCrash,
    details: [
      "MVA injury expertise",
      "Whiplash treatment",
      "Back pain management",
      "Joint rehabilitation",
      "Soft tissue recovery"
    ]
  }
];

const treatmentTypes = [
  {
    title: "Exercise Therapy",
    description: "Targeted exercises to improve strength, flexibility, and function of injured areas."
  },
  {
    title: "Manual Therapy",
    description: "Hands-on techniques to reduce pain and improve joint mobility."
  },
  {
    title: "Pain Management",
    description: "Evidence-based strategies to manage and reduce pain during recovery."
  },
  {
    title: "Functional Training",
    description: "Practical exercises that help you return to daily activities safely."
  }
];

const commonInjuries = [
  "Whiplash",
  "Back Pain",
  "Neck Pain",
  "Shoulder Injuries",
  "Knee Injuries",
  "Soft Tissue Injuries"
];

export default function RehabContent() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] mt-28">
        <div className="absolute inset-0 mx-4 overflow-hidden">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/DSC05643.jpeg"
              alt="AP Fitness Rehab"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-text-primary px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Active Rehab & Physiotherapy</h1>
            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
              Comprehensive rehabilitation services covered by ICBC to help you recover and regain your strength
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* ICBC Coverage Info */}
        <div className="relative p-[2px] rounded-[3rem] bg-gradient-to-br from-ap-red/20 to-dark mb-16 group hover:from-ap-red/30 hover:to-dark transition-all duration-500">
          <div className="relative h-full bg-dark-lighter/20 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 border border-text-primary/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/95 rounded-[3rem]" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-text-primary group-hover:text-ap-red transition-colors">ICBC Active Rehab Coverage</h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <FaClock className="text-ap-red w-5 h-5" />
                  <span className="text-text-secondary">12 Pre-approved Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-ap-red w-5 h-5" />
                  <span className="text-text-secondary">Direct Billing</span>
                </div>
              </div>
              <p className="text-lg mb-6 text-text-secondary">
                You may be fully-covered for an Active Rehab Program where a Kinesiologist will take you through an exercise-based treatment plan focused on improving your mobility, posture, and strength.
              </p>
              <p className="text-lg mb-8 text-text-secondary">
                If you have coverage through ICBC, you may begin ICBC Kinesiology (Active Rehab) immediately after you report your claim to ICBC and have a claim number. Up to 12 treatments are preapproved within the first 12 weeks after injury.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="/book"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-ap-red to-ap-red-dark text-white rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                >
                  Book Your Assessment
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Treatment Types Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-text-primary">Our Treatment Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {treatmentTypes.map((treatment, index) => (
              <motion.div
                key={treatment.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-[2px] rounded-[2rem] bg-gradient-to-br from-dark-lighter to-dark group hover:from-ap-red/20 hover:to-dark transition-all duration-500"
              >
                <div className="relative h-full bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-6 border border-text-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/95 rounded-[2rem]" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold mb-2 text-text-primary group-hover:text-ap-red transition-colors">{treatment.title}</h3>
                    <p className="text-text-secondary">{treatment.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Common Injuries Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-text-primary">Common Injuries We Treat</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {commonInjuries.map((injury, index) => (
              <motion.div
                key={injury}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-[2px] rounded-xl bg-gradient-to-br from-dark-lighter to-dark group hover:from-ap-red/20 hover:to-dark transition-all duration-500"
              >
                <div className="relative bg-dark-lighter/20 backdrop-blur-sm rounded-xl p-4 border border-text-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/95 rounded-xl" />
                  <p className="relative z-10 text-center text-text-primary group-hover:text-ap-red transition-colors">{injury}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rehabFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-[2px] rounded-[2rem] bg-gradient-to-br from-dark-lighter to-dark group hover:from-ap-red/20 hover:to-dark transition-all duration-500"
            >
              <div className="relative h-full bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 border border-text-primary/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/95 rounded-[2rem]" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-ap-red to-ap-red-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg mx-auto transform group-hover:scale-110 transition-all duration-500"
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.Icon className="w-8 h-8 text-text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4 text-text-primary text-center group-hover:text-ap-red transition-colors">{feature.title}</h3>
                  <div className="h-[2px] w-12 bg-gradient-to-r from-ap-red to-ap-red-dark mx-auto mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
                  <p className="text-text-secondary text-center mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li 
                        key={i}
                        className="flex items-center text-text-secondary text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-ap-red rounded-full mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 mt-16">
        <div className="absolute inset-0 mx-4 overflow-hidden">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <Image
              src="/images/DSC09177.jpeg"
              alt="Training Session"
              fill
              className="object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/85" />
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-lighter/20 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 border border-text-primary/10"
          >
            <h2 className="text-4xl font-bold mb-6 text-text-primary">Start Your Recovery Journey Today</h2>
            <p className="text-xl mb-8 text-text-primary">
              Take the first step towards recovery with our expert team of kinesiologists and physiotherapists.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/book"
                className="bg-gradient-to-r from-ap-red to-ap-red-dark text-text-primary px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] inline-block"
              >
                Book Your Assessment
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 