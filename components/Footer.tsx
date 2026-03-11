import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
               <Shield className="w-6 h-6" />
               <span className="text-xl font-bold font-serif">Jayotu Capital</span>
            </div>
            <p className="text-sm leading-relaxed">
              India's premium financial bridge connecting borrowers with the nation's leading banks and NBFCs. Fast, Secure, and Transparent.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Loan Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-gold">Personal Loan</a></li>
              <li><a href="#" className="hover:text-brand-gold">Business Loan</a></li>
              <li><a href="#" className="hover:text-brand-gold">Home Loan</a></li>
              <li><a href="#" className="hover:text-brand-gold">Balance Transfer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-gold">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-gold">Terms of Use</a></li>
              <li><a href="#" className="hover:text-brand-gold">Disclaimer</a></li>
              <li><a href="#" className="hover:text-brand-gold">Grievance Redressal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>support@jayotucapital.in</li>
              <li>+91 22 4567 8900</li>
              <li>BKC, Mumbai, Maharashtra 400051</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-xs text-justify space-y-4">
          <p>
            <strong>Disclaimer:</strong> Jayotu Capital acts as a Direct Selling Agent (DSA) / Referral Partner for various Banks and NBFCs. We are not a lender. All loan approvals, interest rates, and disbursals are at the sole discretion of the respective lending partners. We do not charge any upfront fees from customers for loan processing.
          </p>
          <p>
            *Interest rates are subject to change based on credit profile and bank policies. Approval timelines depend on document submission and verification checks.
          </p>
          <p className="text-center pt-4">
            &copy; {new Date().getFullYear()} Jayotu Capital Financial Services. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;