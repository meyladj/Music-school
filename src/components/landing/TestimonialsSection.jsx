import React from 'react';
import { Star, Award, Quote, CheckCircle } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Nadia B.",
      title: "Maman d'Amine (12 ans, Cursus Piano)",
      quote: "L'accréditation avec l'American Canadian Academy a complètement transformé la motivation de mon fils. Il a obtenu son Grade 3 avec félicitations du jury. La possibilité d'avoir un cours individuel chaque semaine et de préparer un diplôme international à Alger est une chance inestimable.",
      grade: "Grade 3 Piano ACA",
      format: "Cours Individuel",
      rating: 5
    },
    {
      name: "Sofiane Mansouri",
      title: "Apprenant Batterie (24 ans)",
      quote: "J'ai toujours voulu apprendre la batterie. À l'Îlot Musique, j'ai commencé en cours individuel pour les rudiments, puis j'ai rejoint les ateliers d'ensemble pour jouer avec des guitaristes et bassistes. Le matériel est au top et l'ambiance formidable.",
      grade: "Session Batterie Groove",
      format: "Formule Hybride",
      rating: 5
    },
    {
      name: "Dr. Lynda K.",
      title: "Parent d'élèves en Violon et Éveil Musical",
      quote: "Mes deux filles sont inscrites : la grande au violon et la petite en éveil musical. Les professeurs sont d'une infinie patience et d'une rigueur admirable. La direction est d'un professionnalisme exemplaire avec les quittances et le suivi régulier.",
      grade: "Grade 2 Violon ACA & Éveil",
      format: "Cours Individuel & Groupe",
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] border-b border-music-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-music-border text-xs font-bold text-music-ink">
            <Star className="w-3.5 h-3.5 text-music-gold fill-music-gold" />
            <span>Retours d'Expérience</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-music-ink tracking-tight">
            Ce que disent nos élèves & leurs familles
          </h2>

          <p className="text-xs sm:text-sm text-music-inkMuted">
            Témoignages sur l'apprentissage instrumental, les cours en groupe et l'obtention des grades American Canadian Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-music-border shadow-2xs hover:shadow-card transition flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 space-x-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                    {t.format}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-music-gold/30" />

                <p className="text-xs sm:text-sm text-music-inkMuted leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-music-border flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-music-ink">{t.name}</h4>
                  <p className="text-[11px] text-music-inkLight">{t.title}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    <span>{t.grade}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
