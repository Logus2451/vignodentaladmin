import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Building2 } from 'lucide-react';

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Basic',
      icon: Zap,
      description: 'Perfect for small practices getting started',
      monthlyPrice: 99,
      yearlyPrice: 89,
      popular: false,
      features: [
        'Up to 500 patients',
        'Basic scheduling',
        'Patient records management',
        'Email reminders',
        'Basic reporting',
        'Phone support',
        '10GB storage',
        'Single location',
      ],
      limitations: [
        'No SMS reminders',
        'Limited integrations',
        'Basic analytics only',
      ],
    },
    {
      name: 'Professional',
      icon: Star,
      description: 'Most popular choice for growing practices',
      monthlyPrice: 199,
      yearlyPrice: 179,
      popular: true,
      features: [
        'Up to 2,000 patients',
        'Advanced AI scheduling',
        'Complete patient management',
        'SMS & email reminders',
        'Advanced analytics',
        'Priority support',
        '100GB storage',
        'Up to 3 locations',
        'Insurance integration',
        'Online booking portal',
        'Treatment planning',
        'Digital forms',
      ],
      limitations: [],
    },
    {
      name: 'Enterprise',
      icon: Crown,
      description: 'Comprehensive solution for large practices',
      monthlyPrice: 399,
      yearlyPrice: 359,
      popular: false,
      features: [
        'Unlimited patients',
        'AI-powered insights',
        'Multi-location management',
        'Advanced automation',
        'Custom reporting',
        'Dedicated success manager',
        '1TB storage',
        'Unlimited locations',
        'Advanced integrations',
        'API access',
        'Custom workflows',
        'White-label options',
        'Advanced security',
        'Compliance tools',
      ],
      limitations: [],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
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
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your practice. All plans include free migration, onboarding, and 24/7 support. No hidden fees or setup costs.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-4"
          >
            <span className={`font-medium ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-200 ${
                isYearly ? 'bg-gradient-to-r from-primary-500 to-medical-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: isYearly ? 32 : 4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
              />
            </motion.button>
            <span className={`font-medium ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Yearly
            </span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: isYearly ? 1 : 0 }}
              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium"
            >
              Save 10%
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                plan.popular
                  ? 'border-gradient-to-r from-primary-500 to-medical-500 border-primary-200 dark:border-primary-700'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-gradient-to-r from-primary-500 to-medical-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                </motion.div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`inline-flex p-3 rounded-xl mb-4 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary-500 to-medical-500'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-xl text-gray-600 dark:text-gray-400 ml-2">
                      /month
                    </span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Billed annually (${(isYearly ? plan.yearlyPrice : plan.monthlyPrice) * 12}/year)
                    </p>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 + featureIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-medical-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </motion.button>

                {/* Money Back Guarantee */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  30-day money-back guarantee
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-medical-50 dark:from-primary-900/20 dark:to-medical-900/20 rounded-3xl p-8 border border-primary-200 dark:border-primary-800">
            <Building2 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              For enterprise clients with specific requirements, we offer custom pricing, dedicated infrastructure, and personalized onboarding.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-medical-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Enterprise Sales
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
