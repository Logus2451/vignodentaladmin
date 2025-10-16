import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Chief Dental Officer',
      practice: 'Smile Dental Group',
      avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/80x80/3b82f6/ffffff?text=SJ',
      rating: 5,
      content: 'DentalCare Pro has completely transformed our practice operations. The AI-powered scheduling has reduced our no-shows by 40% and the patient management system has streamlined our workflow tremendously.',
      metrics: { patients: '2,500+', efficiency: '35%', revenue: '$180K' },
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      title: 'Practice Owner',
      practice: 'Pacific Dental Care',
      avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/80x80/14b8a6/ffffff?text=MC',
      rating: 5,
      content: 'The analytics dashboard gives us insights we never had before. We\'ve increased our revenue by 25% in just 6 months using the data-driven recommendations from DentalCare Pro.',
      metrics: { patients: '1,800+', efficiency: '28%', revenue: '$125K' },
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      title: 'Dental Director',
      practice: 'Modern Dentistry Solutions',
      avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/80x80/8b5cf6/ffffff?text=ER',
      rating: 5,
      content: 'As someone who manages multiple locations, DentalCare Pro\'s multi-practice dashboard is a game-changer. I can monitor all our locations in real-time and make informed decisions quickly.',
      metrics: { patients: '5,200+', efficiency: '42%', revenue: '$350K' },
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      title: 'Senior Partner',
      practice: 'Elite Dental Partners',
      avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/80x80/f59e0b/ffffff?text=DK',
      rating: 5,
      content: 'The HIPAA compliance features and security measures give us complete peace of mind. Our patients love the automated reminders and online scheduling capabilities.',
      metrics: { patients: '3,100+', efficiency: '31%', revenue: '$220K' },
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      title: 'Practice Manager',
      practice: 'Family Dental Center',
      avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/80x80/ef4444/ffffff?text=LT',
      rating: 5,
      content: 'The billing integration has saved us countless hours. Insurance claims are processed automatically and our payment collection has improved by 60%. Absolutely worth the investment.',
      metrics: { patients: '1,600+', efficiency: '45%', revenue: '$95K' },
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-medical-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
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
            Trusted by Leading{' '}
            <span className="bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent">
              Dental Practices
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of dental professionals who have transformed their practices with DentalCare Pro. Here's what they have to say about their experience.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Column - Testimonial Content */}
              <div className="space-y-8">
                {/* Quote Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-16 h-16 bg-gradient-to-r from-primary-500 to-medical-500 rounded-2xl flex items-center justify-center"
                >
                  <Quote className="w-8 h-8 text-white" />
                </motion.div>

                {/* Stars */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex space-x-1"
                >
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-accent-400 fill-current" />
                  ))}
                </motion.div>

                {/* Testimonial Text */}
                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium"
                >
                  "{testimonials[currentIndex].content}"
                </motion.blockquote>

                {/* Author Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center space-x-4"
                >
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].title}
                    </p>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {testimonials[currentIndex].practice}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Metrics */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Practice Results
                </h3>
                
                <div className="space-y-6">
                  {Object.entries(testimonials[currentIndex].metrics).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {key === 'patients' ? 'Patients Managed' : 
                         key === 'efficiency' ? 'Efficiency Increase' : 
                         'Revenue Growth'}
                      </span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent">
                        {value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Animation */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1 }}
                  className="h-2 bg-gradient-to-r from-primary-500 to-medical-500 rounded-full mt-6"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-primary-500 to-medical-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
