import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Instagram,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Product': [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Demo', href: '#demo' },
      { name: 'API Documentation', href: '#' },
      { name: 'Integrations', href: '#' },
    ],
    'Company': [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Contact', href: '#contact' },
    ],
    'Resources': [
      { name: 'Help Center', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Webinars', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Training', href: '#' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'HIPAA Compliance', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-primary-500 to-medical-500 p-2 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">DentalCare Pro</span>
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transform your dental practice with our comprehensive management platform. Trusted by over 10,000 dental professionals worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                  <span>hello@dentalcarepro.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-800 rounded-2xl p-8 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400">
                Get the latest updates on new features, dental industry insights, and best practices.
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-medical-500 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400">
              © {currentYear} DentalCare Pro. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                HIPAA Compliant
              </span>
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                SOC 2 Certified
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
