import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-[88vh] lg:min-h-[92vh] flex items-center overflow-hidden bg-[#12100E]">
      
      {/* 1. Full-bleed Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/photos/photo_1.png" 
          alt="Grand piano à queue face à la baie d'Alger - Îlot Musique" 
          className="w-full h-full object-cover object-center transform scale-100"
        />
        {/* Cinematic gradient overlay to guarantee exquisite typographic contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-20 lg:py-24">
        <div className="max-w-2xl text-left space-y-6">
          
          {/* Main Title: ILOT MUSIQUE */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] text-white font-normal leading-[0.98] tracking-tight uppercase select-none drop-shadow-md">
            ILOT<br />
            MUSIQUE
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 font-light leading-relaxed tracking-wide drop-shadow-sm font-sans pt-1">
            Plus qu'une école,<br />
            une harmonie pour la vie.
          </p>

          {/* Scroll Down Indicator Circle Button matching Mockup */}
          <div className="pt-4 sm:pt-8">
            <button
              onClick={() => scrollTo('partenariat')}
              className="w-12 h-12 rounded-full border border-white/70 hover:border-white hover:bg-white/15 text-white flex items-center justify-center transition duration-300 transform hover:translate-y-1 shadow-md group"
              aria-label="Faire défiler vers le bas"
            >
              <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition duration-200" />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
