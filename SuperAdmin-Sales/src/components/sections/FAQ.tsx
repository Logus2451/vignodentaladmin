import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long does it take to set up DentalCare Pro?',
      answer: 'Most practices are up and running within 24-48 hours. Our dedicated onboarding team handles data migration, staff training, and system configuration. We provide white-glove service to ensure a smooth transition from your current system.',
    },
    {
      question: 'Is my patient data secure and HIPAA compliant?',
      answer: 'Absolutely. DentalCare Pro is fully HIPAA compliant with bank-level security measures including end-to-end encryption, secure data centers, regular security audits, and comprehensive audit trails. We maintain SOC 2 Type II certification and undergo annual third-party security assessments.',
    },
    {
      question: 'Can I import data from my current practice management software?',
      answer: 'Yes! We support data migration from virtually all major dental practice management systems including Dentrix, Eaglesoft, Open Dental, Practice-Web, and many others. Our migration specialists handle the entire process at no additional cost.',
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer 24/7 phone and chat support, extensive online documentation, video tutorials, and regular webinar training sessions. Professional and Enterprise plans include priority support with dedicated account managers and faster response times.',
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes! We offer a 30-day free trial with full access to all features. No credit card required to start. Our team will also provide a personalized demo and help you set up a test environment with your practice data.',
    },
    {
      question: 'Can I integrate DentalCare Pro with my existing tools?',
      answer: 'DentalCare Pro integrates with hundreds of dental and business tools including imaging software (Dexis, Schick, Planmeca), payment processors (Square, Stripe, PayPal), accounting software (QuickBooks, Xero), and email marketing platforms (Mailchimp, Constant Contact).',
    },
    {
      question: 'What happens if I need to cancel my subscription?',
      answer: 'You can cancel anytime with 30 days notice. We provide full data export in standard formats, and our team will assist with the transition process. We also offer a 30-day money-back guarantee for new customers.',
    },
    {
      question: 'How does pricing work for multiple locations?',
      answer: 'Our Professional plan supports up to 3 locations, while Enterprise offers unlimited locations. Multi-location practices benefit from centralized management, consolidated reporting, and volume discounts. Contact our sales team for custom pricing on larger practices.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about DentalCare Pro. Can't find what you're looking for? Our support team is here to help.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <motion.button
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-primary-600" />
                  ) : (
                    <Plus className="w-6 h-6 text-gray-400" />
                  )}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Still have questions? We're here to help!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-500 to-medical-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
