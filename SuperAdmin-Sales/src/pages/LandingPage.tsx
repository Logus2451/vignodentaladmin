import React from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Screenshots from '../components/sections/Screenshots';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Screenshots />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
