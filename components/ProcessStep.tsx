import React from 'react';
import { FileText, UserCheck, Truck, Coins } from 'lucide-react';

const ProcessStep: React.FC = () => {
  const steps = [
    { num: "01", icon: FileText, title: "Check Eligibility", desc: "Fill the simple form above to check your offer." },
    { num: "02", icon: UserCheck, title: "Get Bank Offers", desc: "Our team fetches best quotes from HDFC, ICICI, etc." },
    { num: "03", icon: Truck, title: "Document Pickup", desc: "Digital KYC or doorstep document collection." },
    { num: "04", icon: Coins, title: "Loan Disbursed", desc: "Amount credited directly to your bank account." }
  ];

  return (
    <section id="process" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif font-bold text-brand-900 mb-4">Hassle-Free 4 Step Process</h2>
          <p className="text-gray-600">From application to account credit in record time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-[10%] w-[80%] h-1 bg-gray-200 -z-0 rounded-full"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center mb-8 relative transition-transform group-hover:scale-110">
                <div className="absolute inset-0 rounded-full bg-brand-gold opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <step.icon className="w-8 h-8 text-brand-900 group-hover:text-brand-gold transition-colors" />
                
                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-900 text-white flex items-center justify-center text-sm font-bold border-2 border-white">
                  {step.num}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-brand-900 mb-3">{step.title}</h3>
              <p className="text-sm text-gray-500 px-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessStep;