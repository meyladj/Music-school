import React from 'react';

export default function QuoteBannerSection() {
  return (
    <section className="relative overflow-hidden bg-[#181412] text-white py-14 md:py-16 border-y border-[#3A332C]">
      {/* Subtle musical stave texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none stave-pattern-light" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          
          {/* Main Inspirational Quote */}
          <div className="max-w-4xl mx-auto lg:mx-0">
            <blockquote className="font-serif italic font-normal text-xl sm:text-2xl lg:text-[1.75rem] text-[#FAF5EE] leading-relaxed tracking-wide">
              “La musique transmet plus qu'un savoir :<br className="hidden sm:inline" /> elle construit la confiance, l'écoute et la sensibilité.”
            </blockquote>
          </div>

          {/* Right Typographical Slogan */}
          <div className="text-[10px] tracking-[0.25em] text-[#C5BBB0] uppercase font-semibold leading-relaxed border-t lg:border-t-0 lg:border-l border-white/20 pt-4 lg:pt-0 lg:pl-8 select-none text-center lg:text-right">
            <span>DES TALENTS</span><br />
            <span>POUR UN MONDE</span><br />
            <span>PLUS HARMONIEUX</span>
          </div>

        </div>
      </div>
    </section>
  );
}
