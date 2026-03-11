import React from 'react';
import { Percent, Clock, ShieldCheck, Layers, MousePointerClick, FileCheck } from 'lucide-react';

const features = [
  {
    icon: MousePointerClick,
    title: "100% Digital Process",
    desc: "No physical branch visits. Complete your application from home."
  },
  {
    icon: Layers,
    title: "Compare 20+ Banks",
    desc: "We check policies of multiple banks to find your perfect match."
  },
  {
    icon: Percent,
    title: "Lowest Interest Rates",
    desc: "Rates starting from 10.25% reducing. Save more on EMIs."
  },
  {
    icon: ShieldCheck,
    title: "Zero Hidden Charges",
    desc: "Transparent processing fees. No surprise charges later."
  },
  {
    icon: Clock,
    title: "Quick Disbursal",
    desc: "Loan amount credited to your account within 24-48 hours."
  },
  {
    icon: FileCheck,
    title: "High Approval Rate",
    desc: "Our AI-match system ensures your application goes to the right bank."
  }
];

const Features: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-900 via-brand-gold to-brand-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-widest text-xs uppercase mb-2 block">Why Choose Jayotu Capital</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-4">
            Smart Financing for <br/>Smart Indians
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We don't just sell loans; we act as your financial advocate to get you the best deal from the banking system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
              {/* Hover Gradient Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-16 h-16 rounded-xl bg-gray-50 group-hover:bg-brand-gold/10 flex items-center justify-center mb-6 transition-colors duration-300">
                <item.icon className="w-8 h-8 text-brand-900 group-hover:text-brand-gold transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-brand-900 mb-3 group-hover:text-brand-gold transition-colors">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">{item.desc}</p>
              
              {/* Decorative Corner */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gray-50 rounded-full group-hover:bg-brand-gold/5 transition-colors"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;