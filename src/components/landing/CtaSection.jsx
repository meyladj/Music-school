import React from 'react';

export default function CtaSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-28 lg:py-36 overflow-hidden bg-[#100D0B] flex items-center justify-center text-center">
      
      {/* Background with moody studio lighting & blurred piano depth */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/photos/photo_1.png" 
          alt="Studio Îlot Musique Alger" 
          className="w-full h-full object-cover object-center filter blur-[4px] brightness-[0.28] scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-6">
        
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight">
          Rejoignez l'aventure
        </h2>

        {/* Minimal divider line */}
        <div className="w-12 h-[1.5px] bg-white/40 mx-auto"></div>

        {/* Pill Button: Nous contacter */}
        <div className="pt-4">
          <button
            onClick={() => scrollTo('admission')}
            className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-medium bg-[#E5CEB4] hover:bg-[#D8BE9F] text-[#1A1715] transition duration-300 shadow-lg transform hover:-translate-y-0.5 tracking-wide inline-flex items-center space-x-2"
          >
            <span>Nous contacter</span>
          </button>
        </div>

      </div>
    </section>
  );
}
