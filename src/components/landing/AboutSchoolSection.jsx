import React from 'react';
import { ArrowRight, Leaf, Users, BarChart3, Sparkles } from 'lucide-react';

export default function AboutSchoolSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="notre-ecole" className="bg-[#FFFFFF] border-b border-[#E8E1D7] py-14 lg:py-18 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Atmospheric Singer Photo */}
          <div className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-card border border-[#E8E1D7] min-h-[360px] lg:min-h-[420px] bg-[#1C1814]">
            <img 
              src="/images/clean_notre_ecole_singer.png" 
              alt="Artiste chanteuse et pianiste à l'Îlot Musique Alger" 
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Center Column: School Philosophy & 3 Feature Columns */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 px-2 lg:px-4">
            
            {/* Top Text & Philosophy */}
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C8276] block">
                NOTRE ÉCOLE
              </span>

              <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#1A1715] tracking-tight leading-tight">
                Plus qu'une école,<br />
                <span className="font-semibold">une aventure humaine</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#665E56] font-normal leading-relaxed max-w-xl">
                À Îlot Musique Alger, nous croyons en la force de la musique pour révéler les personnalités, 
                développer la confiance et créer des liens durables. Notre école est un lieu d'apprentissage, 
                de discipline, de créativité et d'expression, ouvert à tous les âges.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => scrollTo('admission-section')}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#9B3B2B] text-white hover:bg-[#822F21] shadow-xs transition flex items-center space-x-2"
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3 Pillars matching the circular icons in the design */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E8E1D7]">
              
              {/* Feature 1: Pédagogie bienveillante */}
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#FAF5EE] border border-[#E5DDD3] flex items-center justify-center text-[#9B3B2B]">
                  <Leaf className="w-4 h-4" />
                </div>
                <h3 className="font-sans font-bold text-xs sm:text-sm text-[#1A1715] leading-snug">
                  Une pédagogie bienveillante
                </h3>
                <p className="text-[11px] text-[#665E56] leading-relaxed">
                  Un cadre positif pour apprendre en confiance où chacun progresse à son rythme.
                </p>
              </div>

              {/* Feature 2: Accompagnement personnalisé */}
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#FAF5EE] border border-[#E5DDD3] flex items-center justify-center text-[#9B3B2B]">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-sans font-bold text-xs sm:text-sm text-[#1A1715] leading-snug">
                  Un accompagnement personnalisé
                </h3>
                <p className="text-[11px] text-[#665E56] leading-relaxed">
                  Des professeurs à l'écoute pour révéler et guider chaque talent.
                </p>
              </div>

              {/* Feature 3: Cours adaptés à chaque niveau */}
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#FAF5EE] border border-[#E5DDD3] flex items-center justify-center text-[#9B3B2B]">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="font-sans font-bold text-xs sm:text-sm text-[#1A1715] leading-snug">
                  Des cours adaptés à chaque niveau
                </h3>
                <p className="text-[11px] text-[#665E56] leading-relaxed">
                  Du débutant au confirmé, chacun trouve sa place et son propre chemin musical.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Arched Window with Algiers View & Vertical Caption */}
          <div className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-card border border-[#E8E1D7] min-h-[360px] lg:min-h-[420px] bg-[#FAF7F2]">
            <img 
              src="/images/clean_notre_ecole_algiers.png" 
              alt="Vue sur Alger depuis le conservatoire Îlot Musique" 
              className="w-full h-full object-cover object-center"
            />

            {/* Vertical typographical overlay matching the design */}
            <div className="absolute top-6 right-6 text-right select-none">
              <div className="text-[9px] tracking-[0.25em] text-[#1A1715] uppercase font-bold leading-relaxed bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/50">
                <span>LA MUSIQUE</span><br />
                <span>ICI,</span><br />
                <span>AUJOURD'HUI</span><br />
                <span>ET TOUJOURS —</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
