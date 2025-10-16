import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Monitor, Tablet, Smartphone } from 'lucide-react';

const Screenshots: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeDevice, setActiveDevice] = useState('desktop');

  const devices = [
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'tablet', label: 'Tablet', icon: Tablet },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
  ];

  const screenshots = {
    desktop: [
      {
        title: 'Dashboard Overview',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x500/3b82f6/ffffff?text=Dashboard+Overview',
        description: 'Comprehensive dashboard with real-time analytics and key metrics',
      },
      {
        title: 'Patient Management',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x500/14b8a6/ffffff?text=Patient+Management',
        description: 'Advanced patient profiles with complete medical history',
      },
      {
        title: 'Appointment Scheduling',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x500/8b5cf6/ffffff?text=Appointment+Scheduling',
        description: 'Intelligent scheduling system with conflict resolution',
      },
    ],
    tablet: [
      {
        title: 'Mobile Dashboard',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/3b82f6/ffffff?text=Tablet+Dashboard',
        description: 'Optimized tablet interface for on-the-go access',
      },
    ],
    mobile: [
      {
        title: 'Mobile App',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x600/14b8a6/ffffff?text=Mobile+App',
        description: 'Native mobile experience for patients and staff',
      },
    ],
  };

  return (
    <section id="demo" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            See DentalCare Pro{' '}
            <span className="bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent">
              In Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Experience the power of our platform through interactive demos and real screenshots from dental practices using DentalCare Pro.
          </p>

          {/* Video Demo Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVideoOpen(true)}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-medical-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Play className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            Watch 2-Minute Demo
          </motion.button>
        </motion.div>

        {/* Device Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-2 flex space-x-2">
            {devices.map((device) => (
              <motion.button
                key={device.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveDevice(device.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeDevice === device.id
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <device.icon className="w-5 h-5" />
                <span>{device.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Screenshots Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDevice}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`grid gap-8 ${
              activeDevice === 'mobile' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {screenshots[activeDevice as keyof typeof screenshots].map((screenshot, index) => (
              <motion.div
                key={screenshot.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  {/* Screenshot */}
                  <div className="relative overflow-hidden rounded-xl mb-6">
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                      >
                        <Play className="w-6 h-6 text-primary-600" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {screenshot.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {screenshot.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Video Modal */}
        <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsVideoOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsVideoOpen(false)}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* Video Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary-500 to-medical-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-20 h-20 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">Demo Video</h3>
                    <p className="opacity-90">2-minute overview of DentalCare Pro platform</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Screenshots;
