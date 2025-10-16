import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const stats = [
    { label: 'Dental Practices', value: '10,000+' },
    { label: 'Patients Managed', value: '2M+' },
    { label: 'Appointments Scheduled', value: '50M+' },
  ];

  const features = [
    'Advanced Scheduling System',
    'Patient Management Portal',
    'Real-time Analytics Dashboard',
    'HIPAA Compliant & Secure',
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-medical-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 dark:bg-primary-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-medical-200 dark:bg-medical-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-accent-200 dark:bg-accent-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-medical-100 dark:from-primary-900/30 dark:to-medical-900/30 px-4 py-2 rounded-full text-sm font-medium text-primary-700 dark:text-primary-300 mb-6"
            >
              <Star className="w-4 h-4 text-accent-500" />
              <span>Trusted by 10,000+ dental practices worldwide</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              Transform Your{' '}
              <span className="bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent">
                Dental Practice
              </span>{' '}
              with AI-Powered Management
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Streamline operations, enhance patient care, and boost revenue with our comprehensive dental practice management platform. HIPAA-compliant, cloud-based, and trusted by industry leaders.
            </motion.p>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid sm:grid-cols-2 gap-3 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5 text-medical-500" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-medical-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 group"
              >
                <Play className="mr-2 w-5 h-5 text-primary-500" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            {/* Dashboard Preview */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700"
              >
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-medical-500 rounded-lg"></div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      Dashboard
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Mock Dashboard Content */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {['Today\'s Appointments', 'Revenue', 'Patients'].map((title, index) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                      >
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{title}</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {index === 0 ? '24' : index === 1 ? '$12.5K' : '1,247'}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    {[1, 2, 3].map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                        className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-medical-400 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
              >
                <CheckCircle className="w-6 h-6" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-accent-500 text-white p-3 rounded-full shadow-lg animate-pulse-slow"
              >
                <Star className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
