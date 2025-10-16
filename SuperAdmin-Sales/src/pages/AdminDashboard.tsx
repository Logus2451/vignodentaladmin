import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, CreditCard, LogOut, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import HospitalsTab from '../components/HospitalsTab';
import SubscriptionsTab from '../components/SubscriptionsTab';
import TemplatesTab from '../components/TemplatesTab';
import AdminUsersTab from '../components/AdminUsersTab';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hospitals');
  const [stats, setStats] = useState({
    totalHospitals: 0,
    totalClinics: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: hospitals } = await supabase.from('hospitals').select('*');
      const { data: clinics } = await supabase.from('clinics').select('*');
      const { data: subscriptions } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('status', 'active');
      
      const monthlyRevenue = subscriptions?.reduce((total, sub) => {
        return total + (sub.billing_cycle === 'monthly' ? sub.monthly_price : sub.yearly_price / 12);
      }, 0) || 0;

      setStats({
        totalHospitals: hospitals?.length || 0,
        totalClinics: clinics?.length || 0,
        activeSubscriptions: subscriptions?.length || 0,
        monthlyRevenue: Math.round(monthlyRevenue)
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
  };

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
              Super Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage hospitals, subscriptions, and billing across the platform.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Total Hospitals
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalHospitals}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-blue-600">
                <Building2 className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Total Clinics
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalClinics}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-green-600">
                <Building2 className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Active Subscriptions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.activeSubscriptions}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-purple-600">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  ₹{stats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-orange-600">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Management Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveTab('hospitals')}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              activeTab === 'hospitals'
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full mb-3 bg-gradient-to-r from-blue-500 to-blue-600">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${
                activeTab === 'hospitals'
                  ? 'text-blue-900'
                  : 'text-gray-900'
              }`}>
                Hospitals
              </h3>
              <p className="text-xs text-gray-500">
                Manage hospitals
              </p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setActiveTab('subscriptions')}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              activeTab === 'subscriptions'
                ? 'border-purple-500 bg-purple-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full mb-3 bg-gradient-to-r from-purple-500 to-purple-600">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${
                activeTab === 'subscriptions'
                  ? 'text-purple-900'
                  : 'text-gray-900'
              }`}>
                Subscriptions
              </h3>
              <p className="text-xs text-gray-500">
                Manage plans
              </p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setActiveTab('templates')}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              activeTab === 'templates'
                ? 'border-green-500 bg-green-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full mb-3 bg-gradient-to-r from-green-500 to-green-600">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${
                activeTab === 'templates'
                  ? 'text-green-900'
                  : 'text-gray-900'
              }`}>
                Templates
              </h3>
              <p className="text-xs text-gray-500">
                Plan templates
              </p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setActiveTab('admins')}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              activeTab === 'admins'
                ? 'border-orange-500 bg-orange-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-sm'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full mb-3 bg-gradient-to-r from-orange-500 to-orange-600">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${
                activeTab === 'admins'
                  ? 'text-orange-900'
                  : 'text-gray-900'
              }`}>
                Admin Users
              </h3>
              <p className="text-xs text-gray-500">
                Manage admins
              </p>
            </div>
          </motion.button>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          {activeTab === 'hospitals' && <HospitalsTab onStatsUpdate={fetchStats} />}
          {activeTab === 'subscriptions' && <SubscriptionsTab />}
          {activeTab === 'templates' && <TemplatesTab />}
          {activeTab === 'admins' && <AdminUsersTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
