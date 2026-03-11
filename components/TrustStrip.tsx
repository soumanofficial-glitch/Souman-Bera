import React from 'react';

const banks = [
  { name: "HDFC Bank", domain: "hdfcbank.com" },
  { name: "ICICI Bank", domain: "icicibank.com" },
  { name: "SBI", domain: "sbi.co.in" },
  { name: "Axis Bank", domain: "axisbank.com" },
  { name: "Bajaj Finserv", domain: "bajajfinserv.in" },
  { name: "Tata Capital", domain: "tatacapital.com" },
  { name: "Kotak Mahindra", domain: "kotak.com" },
  { name: "IDFC First", domain: "idfcfirstbank.com" },
  { name: "Aditya Birla", domain: "adityabirlacapital.com" },
  { name: "IndusInd", domain: "indusind.com" },
  { name: "Yes Bank", domain: "yesbank.in" },
  { name: "Standard Chartered", domain: "sc.com" },
  { name: "L&T Finance", domain: "ltfs.com" },
  { name: "Piramal Finance", domain: "piramalfinance.com" },
];

const TrustStrip: React.FC = () => {
  // Duplicate the array for seamless marquee effect
  const marqueeBanks = [...banks, ...banks];

  return (
    <section id="partners" className="py-12 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
          Our Direct Banking Partners & NBFCs
        </p>
      </div>

      <div className="flex relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-white after:to-transparent">
        <div className="flex animate-marquee items-center whitespace-nowrap">
          {marqueeBanks.map((bank, index) => (
            <div 
              key={`${bank.domain}-${index}`} 
              className="mx-8 md:mx-12 flex h-16 w-32 md:w-40 items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
            >
              <img 
                src={`https://logo.clearbit.com/${bank.domain}?size=160`} 
                alt={`${bank.name} Logo`}
                className="max-h-12 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const span = e.currentTarget.parentElement?.querySelector('.fallback-text');
                  if (span) span.classList.remove('hidden');
                }}
              />
              <span className="hidden fallback-text text-sm font-bold text-gray-400 font-serif whitespace-nowrap">{bank.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;