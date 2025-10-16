import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun, Zap } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#demo" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="bg-gradient-to-r from-primary-500 to-medical-500 p-2 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent">
              DentalCare Pro
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Login Button
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
            >
              Login
            </motion.button> */}

            {/* Get Started Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-primary-500 to-medical-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <button className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                Login
              </button>
              <button className="block w-full px-6 py-2 bg-gradient-to-r from-primary-500 to-medical-500 text-white font-semibold rounded-lg shadow-lg text-center">
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;
