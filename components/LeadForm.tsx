import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, CheckCircle, ShieldCheck, User, 
  Briefcase, Home, RefreshCw, ChevronLeft, 
  AlertCircle, Lock, Building2, TrendingUp, BadgeCheck, Smartphone, Car
} from 'lucide-react';
import { LeadFormData, LoanType, CibilRange, IncomeRange } from '../types';

const totalSteps = 5;
const STORAGE_KEY = 'jayotu_lead_form_v1';

const initialFormData: LeadFormData = {
  loanType: 'Personal Loan',
  employmentType: 'Salaried (Private)',
  incomeRange: 'Above ₹50,000',
  cibilScore: '750+',
  loanAmount: '',
  hasOngoingLoans: 'No',
  totalMonthlyEmis: '',
  hasDefaults: 'No',
  fullName: '',
  mobile: '',
  email: '',
  consent: false
};

const loanOptions = [
  { type: 'Personal Loan', rate: '9.97%', icon: User, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { type: 'Home Loan', rate: '7.35%', icon: Home, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
  { type: 'Loan Against Property', rate: '9.5%', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  { type: 'Business Loan', rate: '16%', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  { type: 'Car Loan', rate: '8.75%', icon: Car, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
] as const;

const LeadForm: React.FC = () => {
  // Lazy initialize step from localStorage
  const [step, setStep] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.step === 'number' ? parsed.step : 1;
      }
    } catch (error) {
      console.error('Failed to load step from storage', error);
    }
    return 1;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  
  // Lazy initialize formData from localStorage
  const [formData, setFormData] = useState<LeadFormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialFormData, ...parsed.formData };
      }
    } catch (error) {
      console.error('Failed to load form data from storage', error);
    }
    return initialFormData;
  });

  // Auto-save to localStorage
  useEffect(() => {
    if (!isSuccess && !isRejected) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, formData }));
    }
  }, [step, formData, isSuccess, isRejected]);

  // Calculate profile strength for badge
  const isHighProfile = (formData.cibilScore === '750+' || formData.cibilScore === '700-749') && 
                        (formData.incomeRange === 'Above ₹50,000' || formData.incomeRange === '₹30,000 - ₹50,000');

  const handleNext = () => {
    // Logic Gate for Step 2
    if (step === 2) {
      if (formData.cibilScore === 'Below 650' || formData.cibilScore === '650-699') {
        setRejectionReason("Currently, we process applications for applicants with a CIBIL score of 700 or above.");
        setIsRejected(true);
        return;
      }
      if (formData.incomeRange === 'Below ₹20,000') {
        setRejectionReason("We currently require a minimum monthly income of ₹20,000 to proceed with bank partners.");
        setIsRejected(true);
        return;
      }
    }

    // Logic Gate for Step 4
    if (step === 4) {
      if (formData.hasDefaults === 'Yes') {
         setRejectionReason("We are unable to process applications with recent payment defaults.");
         setIsRejected(true);
         return;
      }
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateField = (field: keyof LeadFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.consent) {
      alert("Please accept the terms to proceed.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      localStorage.removeItem(STORAGE_KEY);
    }, 2000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setIsRejected(false);
    setStep(1);
    setFormData(initialFormData);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Render Sub-components
  const renderProgressBar = () => (
    <div className="w-full bg-gray-100 h-2 rounded-full mb-8 overflow-hidden">
      <div 
        className="bg-brand-gold h-full transition-all duration-500 ease-out"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      ></div>
    </div>
  );

  if (isRejected) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-red-500 h-full flex flex-col items-center text-center justify-center animate-fade-in">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">We couldn't proceed</h3>
        <p className="text-gray-600 mb-6">{rejectionReason}</p>
        <button 
          onClick={handleReset}
          className="text-brand-900 font-semibold underline hover:text-brand-gold"
        >
          Check eligibility for another product
        </button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-brand-gold h-full flex flex-col items-center text-center justify-center animate-fade-in">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        {isHighProfile && (
           <div className="mb-4 bg-brand-gold/10 text-brand-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-gold/20">
             Pre-Qualified
           </div>
        )}

        <h3 className="text-2xl font-serif font-bold text-brand-900 mb-2">Application Received!</h3>
        <p className="text-gray-600 mb-6 max-w-sm">
          Thank you <strong>{formData.fullName}</strong>. Based on your profile, you are eligible for offers from up to <strong>3 Banks</strong>.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg w-full mb-6 text-left flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-brand-900 shrink-0 mt-1" />
          <div>
             <p className="text-xs text-gray-500 uppercase font-bold">Next Step</p>
             <p className="text-sm text-gray-800">Our senior relationship manager will call you within 15 minutes to discuss the interest rates.</p>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="text-gray-400 text-sm hover:text-brand-900"
        >
          Start New Application
        </button>
      </div>
    );
  }

  return (
    <div id="lead-form" className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-full min-h-[500px]">
      
      {/* Header */}
      <div className="bg-brand-950 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-gold" />
          <span className="text-sm font-semibold tracking-wide">Jayotu Eligibility Check</span>
        </div>
        <span className="text-xs text-gray-400">Step {step} of {totalSteps}</span>
      </div>

      <div className="p-6 md:p-8 flex-1 flex flex-col">
        {renderProgressBar()}

        {/* --- Step 1: Loan Type --- */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-serif font-bold text-brand-900 mb-6">Select Loan Requirement</h3>
            <div className="grid grid-cols-1 gap-3">
              {loanOptions.map((item) => (
                <button
                  key={item.type}
                  onClick={() => {
                    updateField('loanType', item.type);
                    setStep(2);
                  }}
                  className={`relative p-4 rounded-xl border-2 flex items-center justify-between transition-all duration-200 text-left group hover:shadow-lg ${
                    formData.loanType === item.type 
                    ? `border-brand-gold bg-brand-gold/5`
                    : `border-gray-100 hover:border-brand-900/20 bg-white`
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${item.bg} ${item.color} group-hover:bg-brand-900 group-hover:text-white transition-colors`}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <span className={`block font-bold text-lg ${formData.loanType === item.type ? 'text-brand-900' : 'text-gray-800'}`}>
                        {item.type}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Starting @ <span className="text-brand-gold font-bold text-sm">{item.rate}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-300 group-hover:text-brand-gold transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-400 text-center flex items-center justify-center gap-2">
              <TrendingUp size={12} /> Live rates updated today
            </p>
          </div>
        )}

        {/* --- Step 2: Basic Filters --- */}
        {step === 2 && (
          <div className="animate-fade-in-up">
             <h3 className="text-2xl font-serif font-bold text-brand-900 mb-2">Basic Details</h3>
             <p className="text-gray-500 mb-6 text-sm">Help us match you with the right banks.</p>
             
             <div className="space-y-6">
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Employment Type</label>
                 <select 
                    value={formData.employmentType}
                    onChange={(e) => updateField('employmentType', e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                 >
                   <option>Salaried (Private)</option>
                   <option>Salaried (Govt)</option>
                   <option>Self-Employed Business</option>
                   <option>Self-Employed Professional</option>
                 </select>
               </div>

               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Monthly In-hand Income</label>
                 <div className="grid grid-cols-2 gap-3">
                   {['Above ₹50,000', '₹30,000 - ₹50,000', '₹20,000 - ₹30,000', 'Below ₹20,000'].map((range) => (
                     <button
                       key={range}
                       onClick={() => updateField('incomeRange', range)}
                       className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                         formData.incomeRange === range 
                         ? 'bg-brand-900 text-white border-brand-900' 
                         : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                       }`}
                     >
                       {range}
                     </button>
                   ))}
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Current CIBIL Score</label>
                 <div className="grid grid-cols-4 gap-2">
                   {['750+', '700-749', '650-699', 'Below 650'].map((score) => (
                     <button
                       key={score}
                       onClick={() => updateField('cibilScore', score)}
                       className={`py-2 px-1 text-xs md:text-sm rounded-lg border transition-all font-medium ${
                         formData.cibilScore === score 
                         ? 'bg-brand-gold text-white border-brand-gold' 
                         : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                       }`}
                     >
                       {score}
                     </button>
                   ))}
                 </div>
                 {formData.cibilScore === 'Below 650' && (
                   <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                     <AlertCircle size={12} /> Low scores may impact approval chances.
                   </p>
                 )}
               </div>
             </div>
          </div>
        )}

        {/* --- Step 3: Specifics --- */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-serif font-bold text-brand-900 mb-6">
              {formData.loanType} Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Required Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 font-bold">₹</span>
                  <input 
                    type="number"
                    placeholder="e.g. 5,00,000"
                    value={formData.loanAmount}
                    onChange={(e) => updateField('loanAmount', e.target.value)}
                    className="w-full pl-8 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  />
                </div>
              </div>

              {(formData.loanType === 'Personal Loan' || formData.loanType === 'Business Loan') && (
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    {formData.loanType === 'Business Loan' ? 'Company / Business Name' : 'Current Company Name'}
                  </label>
                  <input 
                    type="text"
                    placeholder="Where do you work?"
                    value={formData.companyName || ''}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  />
                </div>
              )}

              {(formData.loanType === 'Home Loan' || formData.loanType === 'Loan Against Property') && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Property City</label>
                    <input 
                      type="text"
                      placeholder="City where property is located"
                      value={formData.city || ''}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Estimated Property Value</label>
                    <input 
                      type="number"
                      placeholder="Market Value"
                      value={formData.propertyValue || ''}
                      onChange={(e) => updateField('propertyValue', e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                    />
                  </div>
                </>
              )}

              {(formData.loanType === 'Car Loan') && (
                <div>
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-1">City of Residence</label>
                   <input 
                      type="text"
                      placeholder="Current City"
                      value={formData.city || ''}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                    />
                </div>
              )}

              {formData.loanType === 'Balance Transfer' && (
                <div>
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Existing Bank Name</label>
                   <input 
                      type="text"
                      placeholder="e.g. HDFC, SBI"
                      value={formData.existingBank || ''}
                      onChange={(e) => updateField('existingBank', e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                    />
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- Step 4: Financial Health --- */}
        {step === 4 && (
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-serif font-bold text-brand-900 mb-2">Financial Stability</h3>
            <p className="text-gray-500 mb-6 text-sm">We need to ensure you are not over-leveraged.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Do you have any ongoing loans?</label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => updateField('hasOngoingLoans', opt)}
                      className={`flex-1 py-3 rounded-lg border font-semibold ${
                        formData.hasOngoingLoans === opt 
                        ? 'bg-brand-900 text-white border-brand-900' 
                        : 'bg-white text-gray-600 border-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {formData.hasOngoingLoans === 'Yes' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Total Monthly EMI Amount</label>
                  <input 
                    type="number"
                    placeholder="e.g. 15000"
                    value={formData.totalMonthlyEmis}
                    onChange={(e) => updateField('totalMonthlyEmis', e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Any loan defaults/write-offs in last 2 years?</label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => updateField('hasDefaults', opt)}
                      className={`flex-1 py-3 rounded-lg border font-semibold ${
                        formData.hasDefaults === opt 
                        ? 'bg-red-50 text-red-600 border-red-200' 
                        : 'bg-green-50 text-green-700 border-green-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {formData.hasDefaults === 'Yes' && (
                  <p className="text-xs text-red-500 mt-2">
                    Note: Defaults severely impact approval chances.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- Step 5: Contact --- */}
        {step === 5 && (
          <div className="animate-fade-in-up">
            {isHighProfile && (
              <div className="mb-4 bg-gradient-to-r from-brand-gold to-yellow-400 text-white p-3 rounded-lg flex items-center gap-2 shadow-lg">
                <BadgeCheck className="w-5 h-5" />
                <span className="text-sm font-bold">You are Pre-Qualified for Premium Rates!</span>
              </div>
            )}
            
            <h3 className="text-2xl font-serif font-bold text-brand-900 mb-2">Final Step</h3>
            <p className="text-gray-500 mb-6 text-sm">Where should we send your official quote?</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
                <input 
                  type="text"
                  placeholder="As per PAN Card"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Mobile</label>
                  <input 
                    type="tel"
                    placeholder="10 digit number"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) => updateField('mobile', e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  />
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
                  <input 
                    type="email"
                    placeholder="Official Email preferred"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">PAN Number (Optional)</label>
                <input 
                  type="text"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none uppercase"
                  value={formData.pan || ''}
                  onChange={(e) => updateField('pan', e.target.value)}
                />
              </div>

              <div className="flex items-start gap-3 mt-4 bg-gray-50 p-3 rounded-lg">
                <input 
                  type="checkbox" 
                  id="consent"
                  className="mt-1 w-4 h-4 text-brand-gold rounded focus:ring-brand-gold"
                  checked={formData.consent}
                  onChange={(e) => updateField('consent', e.target.checked)}
                />
                <label htmlFor="consent" className="text-xs text-gray-500 leading-snug">
                  I authorize Jayotu Capital & its partnering banks to contact me via Call/SMS/WhatsApp to explain the loan details. I agree to the Privacy Policy.
                </label>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer / Navigation */}
      <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        {step > 1 ? (
          <button 
            onClick={handleBack}
            className="text-gray-500 font-semibold flex items-center gap-1 hover:text-brand-900 px-2 py-1"
          >
            <ChevronLeft size={18} /> Back
          </button>
        ) : (
          <div></div> // Spacer
        )}

        <button
          onClick={handleNext}
          disabled={isSubmitting || (step === totalSteps && !formData.consent)}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 ${
            isSubmitting || (step === totalSteps && !formData.consent)
             ? 'bg-gray-400 cursor-not-allowed' 
             : 'bg-brand-900 hover:bg-brand-800'
          }`}
        >
          {isSubmitting ? (
            'Processing...'
          ) : step === totalSteps ? (
            'Check Offers'
          ) : (
            <>Next <ArrowRight size={18} /></>
          )}
        </button>
      </div>
      
      {/* Trust Footer */}
      <div className="bg-gray-100 px-6 py-2 flex justify-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        <span className="flex items-center gap-1"><Lock size={10} /> 256-bit Secure</span>
        <span className="flex items-center gap-1"><ShieldCheck size={10} /> Data Protected</span>
      </div>
    </div>
  );
};

export default LeadForm;