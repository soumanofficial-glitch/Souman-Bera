import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Amit Sharma",
      loc: "Delhi",
      role: "Business Owner",
      img: "https://picsum.photos/id/1012/100/100",
      text: "I needed a business loan urgently for stock expansion. The team at Jayotu Capital got me an offer from HDFC within 4 hours. The documentation was picked up from my office.",
      loan: "Business Loan ₹15L"
    },
    {
      name: "Pooja Verma",
      loc: "Mumbai",
      role: "Software Engineer",
      img: "https://picsum.photos/id/338/100/100",
      text: "Other agents were pushing for high-interest loans. Here, I got a transparent comparison of 3 banks. I chose ICICI because the rate was 10.5%. Very smooth.",
      loan: "Personal Loan ₹5L"
    },
    {
      name: "Ramesh Patel",
      loc: "Ahmedabad",
      role: "Retail Trader",
      img: "https://picsum.photos/id/203/100/100",
      text: "Best service for MSME loans. They understood my turnover requirements and helped me get a limit enhancement. No running around branches.",
      loan: "MSME Loan ₹25L"
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-brand-900 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-1 text-brand-gold font-bold tracking-widest text-xs uppercase mb-3">
             <Star size={12} fill="currentColor" /> Testimonials
           </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Stories of Financial Success
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied Indians who found their financial freedom with Jayotu Capital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="glass-card-dark rounded-2xl p-8 relative hover:transform hover:-translate-y-2 transition-transform duration-300">
              <Quote className="absolute top-6 right-6 text-brand-gold/20 w-12 h-12" />
              
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="text-brand-gold fill-current" />
                ))}
              </div>
              
              <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed min-h-[80px]">"{review.text}"</p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-gold/50" />
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={10} /> {review.loc} • {review.role}
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-3 left-8 px-3 py-1 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-wider rounded-b-lg shadow-lg">
                Verified Customer
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;