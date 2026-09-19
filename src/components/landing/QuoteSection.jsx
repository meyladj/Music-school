import React from 'react';

export default function QuoteSection() {
  return (
    <section className="bg-[#FAF8F5] py-24 lg:py-32 border-b border-[#EAE5DD] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Quote Typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Big Decorative Double Quote */}
            <div className="text-[#D8BE9F] font-serif text-6xl sm:text-7xl lg:text-8xl leading-none select-none -mb-4">
              “
            </div>

            {/* Quote Body */}
            <blockquote className="font-serif italic text-3xl sm:text-4xl lg:text-[2.85rem] text-[#1C1814] font-normal leading-[1.22] tracking-tight">
              La musique<br />
              révèle ce que les mots<br />
              ne peuvent pas dire.
            </blockquote>

            {/* Underline divider */}
            <div className="w-12 h-[1.5px] bg-[#4A453E] pt-0"></div>

          </div>

          {/* Right Column: Arched Photo of Violinist with Orbital Gold Rings */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer Golden Geometric Ring 1 (Top / Upper background) */}
              <div 
                className="absolute -top-10 -left-10 sm:-top-12 sm:-left-12 w-64 sm:w-80 h-64 sm:h-80 rounded-full border border-[#D8BE9F]/60 pointer-events-none z-0" 
              />

              {/* Soft Sand Disc Ring 2 (Bottom left overlap) */}
              <div 
                className="absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 w-36 sm:w-44 h-36 sm:h-44 rounded-full bg-[#EFE7DA]/70 border border-[#D8BE9F]/40 pointer-events-none z-0" 
              />

              {/* Arched Photo Frame matching Mockup 2 */}
              <div className="relative z-10 w-full aspect-[3/4] rounded-t-[140px] sm:rounded-t-[170px] rounded-b-2xl overflow-hidden shadow-2xl border border-[#E2DDD5] bg-[#FAF8F5] group">
                <img 
                  src="/photos/photo_10.png" 
                  alt="Jeune violoniste en répétition - Îlot Musique Alger" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700 ease-out"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
