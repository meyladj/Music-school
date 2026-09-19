import React from 'react';

export default function LessonFormatsSection({ onSelectFormat }) {
  const handleSelect = (formatId) => {
    if (onSelectFormat) {
      onSelectFormat(formatId, 'format');
    }
    const el = document.getElementById('admission');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="formats-cours" className="bg-[#FAF8F5] py-24 lg:py-32 border-b border-[#EAE5DD] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Centered Header */}
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] text-[#1C1814] font-normal tracking-tight">
            Des cours adaptés à chacun
          </h2>
          {/* Subtle minimal divider */}
          <div className="w-12 h-[1.5px] bg-[#4A453E] mx-auto"></div>
        </div>

        {/* 2 Wide Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Card 1: Cours en groupe */}
          <div 
            onClick={() => handleSelect('groupe')}
            className="group cursor-pointer select-none flex flex-col items-center"
          >
            <div className="w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-md border border-[#E2DDD5] bg-white group-hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-1">
              <img 
                src="/photos/cours_groupe.png" 
                alt="Cours de musique en groupe à Îlot Musique Alger" 
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-700 ease-out"
              />
            </div>
            <h3 className="mt-5 font-serif text-xl sm:text-2xl text-[#1C1814] group-hover:text-[#9B3B2B] transition duration-200 tracking-wide font-normal">
              Cours en groupe
            </h3>
          </div>

          {/* Card 2: Cours individuels */}
          <div 
            onClick={() => handleSelect('individuel')}
            className="group cursor-pointer select-none flex flex-col items-center"
          >
            <div className="w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-md border border-[#E2DDD5] bg-white group-hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-1">
              <img 
                src="/photos/cours_individuel.png" 
                alt="Cours de musique individuel à Îlot Musique Alger" 
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-700 ease-out"
              />
            </div>
            <h3 className="mt-5 font-serif text-xl sm:text-2xl text-[#1C1814] group-hover:text-[#9B3B2B] transition duration-200 tracking-wide font-normal">
              Cours individuels
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}
