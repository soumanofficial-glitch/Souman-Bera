import React from 'react';
import LeadForm from './LeadForm';
import { CheckCircle2, Star, Shield, TrendingDown } from 'lucide-react';

const Hero: React.FC = () => {
  const bankLogos = [
    { domain: 'hdfcbank.com', name: 'HDFC Bank' },
    { domain: 'icicibank.com', name: 'ICICI Bank' },
    { domain: 'axisbank.com', name: 'Axis Bank' },
    { domain: 'bajajfinserv.in', name: 'Bajaj Finserv' },
    { domain: 'sbi.co.in', name: 'SBI' },
    { domain: 'kotak.com', name: 'Kotak' }
  ];

  return (
    <section className="relative w-full min-h-[110vh] lg:min-h-screen bg-brand-950 pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold/10 rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8 animate-fade-in-up">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-gold-light text-sm font-semibold backdrop-blur-md shadow-lg hover:bg-white/10 transition-colors cursor-default">
              <Star size={16} fill="currentColor" /> 
              <span>#1 Trusted DSA Partner in India</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.1] tracking-tight">
              Instant Loans from <br />
              <span className="gold-text-gradient">India’s Top Banks and NBFC's</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Unlock the best financial deals. We partner with the biggest names in Indian banking to get you the lowest EMIs.
              <span className="text-white font-medium block mt-2">Personal & Business Loans @ <span className="text-brand-gold-light font-bold text-2xl">10.25%*</span></span>
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
               <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-gray-200">
                 <div className="bg-emerald-500/20 p-1 rounded-full"><CheckCircle2 className="text-emerald-400" size={16} /></div>
                 <span className="text-sm font-medium">Disbursal in 24 Hrs</span>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-gray-200">
                 <div className="bg-emerald-500/20 p-1 rounded-full"><TrendingDown className="text-emerald-400" size={16} /></div>
                 <span className="text-sm font-medium">Lowest Interest Rates</span>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-gray-200">
                 <div className="bg-emerald-500/20 p-1 rounded-full"><Shield className="text-emerald-400" size={16} /></div>
                 <span className="text-sm font-medium">100% Secure</span>
               </div>
            </div>

            {/* Trust Badges - Desktop */}
            <div className="hidden lg:block pt-10 border-t border-white/10 mt-8">
              <p className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest">Official Lending Partners</p>
              <div className="flex items-center gap-3 flex-wrap opacity-90 hover:opacity-100 transition-opacity">
                {bankLogos.map((bank, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-xl h-12 w-28 flex items-center justify-center shadow-lg hover:shadow-brand-gold/30 hover:-translate-y-1 transition-all cursor-pointer overflow-hidden border border-white">
                     <img 
                       src={`https://logo.clearbit.com/${bank.domain}?size=120`} 
                       alt={bank.name} 
                       className="h-full w-full object-contain"
                       title={bank.name}
                     />
                  </div>
                ))}
                <div className="flex items-center justify-center h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-bold hover:bg-white/10 transition-colors">
                  +18 MORE
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-5 relative">
            {/* Decorative elements behind form */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            
            <div className="transform hover:scale-[1.01] transition-transform duration-500 relative z-10">
               <LeadForm />
            </div>
            
            {/* Social Proof Mobile/Desktop */}
            <div className="mt-6 flex items-center justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <div className="flex -space-x-3">
                <img src="https://picsum.photos/id/1005/50/50" className="w-10 h-10 rounded-full border-2 border-brand-950" alt="user" />
                <img src="https://picsum.photos/id/1011/50/50" className="w-10 h-10 rounded-full border-2 border-brand-950" alt="user" />
                <img src="https://picsum.photos/id/1027/50/50" className="w-10 h-10 rounded-full border-2 border-brand-950" alt="user" />
                <div className="w-10 h-10 rounded-full border-2 border-brand-950 bg-brand-800 text-white flex items-center justify-center text-xs font-bold">+2k</div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                   {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-brand-gold fill-current" />)}
                </div>
                <p className="text-gray-400 text-xs mt-1"><span className="text-white font-bold">4.9/5 Rating</span> from 10k+ customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;