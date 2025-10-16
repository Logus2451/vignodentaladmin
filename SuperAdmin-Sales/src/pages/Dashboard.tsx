import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Today\'s Appointments', value: '24', icon: Calendar, color: 'text-blue-600' },
    { label: 'Active Patients', value: '1,247', icon: Users, color: 'text-green-600' },
    { label: 'Monthly Revenue', value: '₹12.5K', icon: DollarSign, color: 'text-purple-600' },
    { label: 'Growth Rate', value: '+15%', icon: TrendingUp, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homepage
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Practice Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, Dr. Johnson. Here's your practice overview.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Dashboard Content
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is a preview of the practice dashboard. Connect Supabase to enable full functionality.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
