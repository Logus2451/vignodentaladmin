import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  BarChart3, 
  Shield, 
  Clock, 
  CreditCard,
  MessageSquare,
  FileText,
  Zap
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-powered appointment scheduling with automated reminders, conflict resolution, and optimal time slot suggestions.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Comprehensive patient profiles with medical history, treatment plans, and communication logs in one place.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time insights into practice performance, revenue tracking, and predictive analytics for growth.',
      color: 'from-purple-500 to-violet-500',
    },
    {
      icon: Shield,
      title: 'HIPAA Compliance',
      description: 'Bank-level security with end-to-end encryption, audit trails, and complete HIPAA compliance.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Accurate appointment duration tracking and resource optimization for maximum efficiency.',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: CreditCard,
      title: 'Billing & Payments',
      description: 'Integrated payment processing, insurance claim management, and automated billing workflows.',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: MessageSquare,
      title: 'Communication Hub',
      description: 'Multi-channel patient communication with SMS, email, and in-app messaging capabilities.',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: FileText,
      title: 'Digital Records',
      description: 'Paperless practice management with digital forms, e-signatures, and cloud-based storage.',
      color: 'from-rose-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'API Integration',
      description: 'Seamless integration with existing dental software, imaging systems, and third-party tools.',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
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
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent">
              Scale Your Practice
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and features modern dental practices need to deliver exceptional patient care while maximizing operational efficiency.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '2rem' }}
                  transition={{ duration: 0.3 }}
                  className={`h-1 bg-gradient-to-r ${feature.color} mt-6 rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-medical-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explore All Features
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="ml-2"
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
