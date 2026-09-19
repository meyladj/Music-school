import React, { useState } from 'react';
import { Award, ChevronDown, ChevronUp, Globe, CheckCircle2 } from 'lucide-react';

export default function AcaPartnershipSection() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="partenariat" className="bg-[#FAF8F5] py-20 lg:py-28 border-b border-[#EAE5DD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] text-[#1C1814] font-normal leading-[1.12] tracking-tight">
              Une ouverture<br />
              sur le monde
            </h2>

            <p className="text-base sm:text-lg text-[#554E46] font-normal leading-relaxed max-w-lg font-sans">
              Ilot Musique Alger est fier d'être partenaire de l'<strong>American Canadian Academy</strong>, 
              offrant ainsi à nos élèves des standards pédagogiques internationaux et de nouvelles opportunités.
            </p>

            {/* Accreditation details toggle */}
            <div className="pt-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-[#1C1814] hover:text-[#9B3B2B] transition group"
              >
                <Award className="w-4 h-4 text-[#C28422]" />
                <span>En savoir plus sur l'accréditation ACA</span>
                {showDetails ? (
                  <ChevronUp className="w-3.5 h-3.5 ml-1 transition-transform" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-y-0.5" />
                )}
              </button>

              {showDetails && (
                <div className="mt-4 p-5 rounded-2xl bg-white border border-[#EAE5DD] shadow-sm space-y-3 text-xs text-[#554E46] animate-fadeIn">
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2A785E] flex-shrink-0 mt-0.5" />
                    <span><strong>Validation internationale des paliers :</strong> Préparation des examens officiels ACA (Grades 1 à 8).</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2A785E] flex-shrink-0 mt-0.5" />
                    <span><strong>Reconnaissance académique :</strong> Attestations et crédits valorisables pour des parcours à l'international.</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2A785E] flex-shrink-0 mt-0.5" />
                    <span><strong>Auditions annuelles agréées :</strong> Jurys d'évaluation sous supervision des référentiels nord-américains.</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: photo_2_transparent.png (Handshake & Flags) */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-xl group flex justify-center">
              <img 
                src="/photos/photo_2_transparent.png" 
                alt="Partenariat American Canadian Academy et Îlot Musique Alger" 
                className="w-full h-auto object-contain transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
