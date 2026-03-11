import React, { useState, useEffect } from 'react';
import { Briefcase, User, Home, TrendingUp, Check, Calculator, PieChart } from 'lucide-react';

const products = [
  {
    title: "Personal Loan",
    icon: User,
    amount: "Up to ₹40 Lakhs",
    interest: "From 10.25% p.a.",
    features: ["No Collateral Required", "Flexible Tenure (1-5 Years)", "Use for any purpose"],
    color: "bg-blue-50"
  },
  {
    title: "Business Loan",
    icon: Briefcase,
    amount: "Up to ₹5 Crores",
    interest: "From 15% p.a.",
    features: ["Unsecured Options", "GST Based Loans", "Overdraft Facility"],
    color: "bg-amber-50"
  },
  {
    title: "MSME Loan",
    icon: TrendingUp,
    amount: "Up to ₹2 Crores",
    interest: "Competitive Rates",
    features: ["CGTMSE Support", "Quick Working Capital", "Machinery Purchase"],
    color: "bg-emerald-50"
  },
  {
    title: "Loan Against Property",
    icon: Home,
    amount: "Up to ₹10 Crores",
    interest: "From 8.50% p.a.",
    features: ["High Loan Value", "Longest Tenure (15 Years)", "Lower EMI burden"],
    color: "bg-indigo-50"
  }
];

const LoanProducts: React.FC = () => {
  const [calcType, setCalcType] = useState<'personal' | 'home'>('personal');
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [years, setYears] = useState(3);

  // Defaults based on loan type
  useEffect(() => {
    if (calcType === 'personal') {
      setAmount(500000);
      setRate(10.5);
      setYears(3);
    } else {
      setAmount(3000000);
      setRate(8.50);
      setYears(20);
    }
  }, [calcType]);

  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalAmount = emi * months;
  const totalInterest = totalAmount - amount;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="py-20 bg-gray-50" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-gold font-bold uppercase tracking-wider text-sm">Tailored Financial Solutions</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-900 mt-2">
            Choose the Right Loan for You
          </h2>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border-t-4 border-brand-900 flex flex-col h-full group">
              <div className={`w-12 h-12 rounded-lg ${product.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <product.icon className="w-6 h-6 text-brand-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
              <div className="mb-4">
                <p className="text-2xl font-bold text-brand-gold">{product.amount}</p>
                <p className="text-sm text-gray-500">{product.interest}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full block text-center py-3 border border-brand-900 text-brand-900 font-semibold rounded-lg hover:bg-brand-900 hover:text-white transition-colors"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* Calculator Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-brand-900 p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
               <div className="bg-brand-gold/20 p-3 rounded-full">
                 <Calculator className="w-8 h-8 text-brand-gold" />
               </div>
               <div>
                 <h3 className="text-2xl font-serif font-bold">EMI Calculator</h3>
                 <p className="text-gray-400 text-sm">Plan your finances before you apply</p>
               </div>
            </div>
            
            <div className="flex bg-white/10 p-1 rounded-xl">
              <button 
                onClick={() => setCalcType('personal')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                  calcType === 'personal' ? 'bg-brand-gold text-white shadow-lg' : 'text-gray-300 hover:text-white'
                }`}
              >
                Personal Loan
              </button>
              <button 
                onClick={() => setCalcType('home')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                  calcType === 'home' ? 'bg-brand-gold text-white shadow-lg' : 'text-gray-300 hover:text-white'
                }`}
              >
                Home Loan
              </button>
            </div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
             {/* Controls */}
             <div className="space-y-8">
               
               {/* Loan Amount */}
               <div>
                 <div className="flex justify-between mb-2">
                   <label className="text-gray-600 font-semibold">Loan Amount</label>
                   <span className="text-brand-900 font-bold bg-gray-100 px-3 py-1 rounded-lg">
                     {formatCurrency(amount)}
                   </span>
                 </div>
                 <input 
                   type="range" 
                   min={calcType === 'personal' ? 50000 : 500000} 
                   max={calcType === 'personal' ? 5000000 : 100000000} 
                   step={calcType === 'personal' ? 10000 : 100000}
                   value={amount}
                   onChange={(e) => setAmount(Number(e.target.value))}
                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                 />
                 <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>{formatCurrency(calcType === 'personal' ? 50000 : 500000)}</span>
                    <span>{formatCurrency(calcType === 'personal' ? 5000000 : 100000000)}</span>
                 </div>
               </div>

               {/* Interest Rate */}
               <div>
                 <div className="flex justify-between mb-2">
                   <label className="text-gray-600 font-semibold">Interest Rate (p.a.)</label>
                   <span className="text-brand-900 font-bold bg-gray-100 px-3 py-1 rounded-lg">
                     {rate}%
                   </span>
                 </div>
                 <input 
                   type="range" 
                   min={8} 
                   max={24} 
                   step={0.1}
                   value={rate}
                   onChange={(e) => setRate(Number(e.target.value))}
                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                 />
                 <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>8%</span>
                    <span>24%</span>
                 </div>
               </div>

               {/* Tenure */}
               <div>
                 <div className="flex justify-between mb-2">
                   <label className="text-gray-600 font-semibold">Tenure (Years)</label>
                   <span className="text-brand-900 font-bold bg-gray-100 px-3 py-1 rounded-lg">
                     {years} Years
                   </span>
                 </div>
                 <input 
                   type="range" 
                   min={1} 
                   max={calcType === 'personal' ? 7 : 30} 
                   step={1}
                   value={years}
                   onChange={(e) => setYears(Number(e.target.value))}
                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                 />
                 <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>1 Year</span>
                    <span>{calcType === 'personal' ? 7 : 30} Years</span>
                 </div>
               </div>

             </div>

             {/* Result Card */}
             <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <p className="text-gray-500 text-sm uppercase tracking-wide font-bold mb-2">Your Monthly EMI</p>
                  <p className="text-4xl md:text-5xl font-serif font-bold text-brand-gold">{formatCurrency(Math.round(emi))}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand-900"></div> Principal Amount
                    </span>
                    <span className="font-bold text-gray-900">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand-gold"></div> Total Interest
                    </span>
                    <span className="font-bold text-gray-900">{formatCurrency(Math.round(totalInterest))}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 font-bold">Total Amount Payable</span>
                    <span className="font-bold text-xl text-brand-900">{formatCurrency(Math.round(totalAmount))}</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button 
                    onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-brand-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-brand-800 transition-all flex items-center justify-center gap-2"
                  >
                    Check Eligibility for {formatCurrency(amount)} Loan <Check size={20} />
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3">*Calculated figures are indicative.</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LoanProducts;