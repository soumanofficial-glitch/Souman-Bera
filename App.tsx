import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Features from './components/Features';
import LoanProducts from './components/LoanProducts';
import ProcessStep from './components/ProcessStep';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustStrip />
      <Features />
      <LoanProducts />
      <ProcessStep />
      <Testimonials />
      
      {/* Bottom Sticky CTA for Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
        <button 
          onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-brand-gold text-white font-bold py-3 rounded-lg shadow-lg animate-pulse"
        >
          Check Loan Eligibility
        </button>
      </div>
      
      <Footer />
    </div>
  );
};

export default App;