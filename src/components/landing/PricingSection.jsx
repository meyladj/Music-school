import React from 'react';
import { 
  CreditCard, 
  Check, 
  Sparkles, 
  ArrowRight, 
  FileCheck, 
  ShieldCheck,
  Building,
  Smartphone
} from 'lucide-react';

export default function PricingSection() {
  const scrollToForm = (formula) => {
    const el = document.getElementById('admission-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="tarifs" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-music-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-music-border text-xs font-bold text-music-ink">
            <CreditCard className="w-3.5 h-3.5 text-music-gold" />
            <span>Tarifs & Règlements en Dinars Algériens (DZD)</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-music-ink tracking-tight">
            Des Formules Claires, Adaptées à Votre Rythme
          </h2>

          <p className="text-sm sm:text-base text-music-inkMuted leading-relaxed">
            Profitez de l'excellence pédagogique d'un conservatoire international à Alger 
            avec des cotisations transparentes et un suivi administratif rigoureux.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 items-stretch">
          
          {/* Plan 1: 1 séance / semaine */}
          <div className="bg-white rounded-3xl p-7 border border-music-border shadow-2xs hover:shadow-card transition flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-music-inkLight">
                Formule Découverte
              </span>
              <h3 className="font-display font-bold text-xl text-music-ink">
                1 Séance / Semaine
              </h3>
              <p className="text-xs text-music-inkMuted">
                Idéal pour débuter un instrument ou maintenir une pratique musicale régulière avec plaisir.
              </p>

              <div className="pt-2">
                <div className="flex items-baseline space-x-1">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-music-ink">6 500</span>
                  <span className="text-xs font-bold text-music-inkMuted">DA / mois</span>
                </div>
                <span className="text-[10px] text-music-inkLight">Soit 4 séances par mois</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-music-border text-xs">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Cours individuel ou atelier en groupe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Accès à la bibliothèque de partitions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Carnet de suivi pédagogique numérique</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Option passage examen ACA en fin d'année</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-music-border">
              <button
                onClick={() => scrollToForm('1_seance')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white border border-music-border text-music-ink hover:bg-music-card transition shadow-2xs"
              >
                Choisir la formule 1 séance
              </button>
            </div>
          </div>

          {/* Plan 2: 2 séances / semaine (Cursus Phare ACA) */}
          <div className="bg-[#1C1814] text-white rounded-3xl p-7 border-2 border-music-gold shadow-elevated transition flex flex-col justify-between relative transform lg:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-music-gold text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Cursus Recommandé ACA</span>
            </div>

            <div className="space-y-4 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-music-gold">
                Cursus Intensif Diplômant
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                2 Séances / Semaine
              </h3>
              <p className="text-xs text-white/80">
                La formule par excellence : progression technique rapide, ateliers d'ensemble et préparation aux examens de grade ACA.
              </p>

              <div className="pt-2">
                <div className="flex items-baseline space-x-1">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-music-gold">10 000</span>
                  <span className="text-xs font-bold text-white/70">DA / mois</span>
                </div>
                <span className="text-[10px] text-white/60">Soit 8 séances par mois (Individuel + Atelier)</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-music-gold flex-shrink-0" />
                  <span>1 cours individuel + 1 cours en groupe par semaine</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-music-gold flex-shrink-0" />
                  <span>Préparation complète au syllabus American Canadian Academy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-music-gold flex-shrink-0" />
                  <span>Accès prioritaire aux studios de répétition à Alger</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-music-gold flex-shrink-0" />
                  <span>Participation garantie aux concerts et galas de scène</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-music-gold flex-shrink-0" />
                  <span>Quittance officielle de paiement et relevé de notes</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <button
                onClick={() => scrollToForm('2_seances')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-music-gold text-white hover:bg-music-goldHover transition shadow-sm flex items-center justify-center space-x-2"
              >
                <span>Rejoindre le Cursus Intensif</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Plan 3: Eveil Musical Enfants */}
          <div className="bg-white rounded-3xl p-7 border border-music-border shadow-2xs hover:shadow-card transition flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-music-inkLight">
                Petite Enfance (4 à 7 ans)
              </span>
              <h3 className="font-display font-bold text-xl text-music-ink">
                Éveil Musical
              </h3>
              <p className="text-xs text-music-inkMuted">
                Sensibilisation ludique aux sons, à la motricité rythmique et découverte active des instruments.
              </p>

              <div className="pt-2">
                <div className="flex items-baseline space-x-1">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-music-ink">5 500</span>
                  <span className="text-xs font-bold text-music-inkMuted">DA / mois</span>
                </div>
                <span className="text-[10px] text-music-inkLight">1 séance ludique de 60 min / semaine</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-music-border text-xs">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Petits effectifs (5 à 8 enfants maximum)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Petites percussions, xylophones et chant d'éveil</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Premier contact doux avec le piano et le violon</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Pédagogie active et bienveillante</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-music-border">
              <button
                onClick={() => scrollToForm('eveil')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white border border-music-border text-music-ink hover:bg-music-card transition shadow-2xs"
              >
                Inscrire un enfant en Éveil
              </button>
            </div>
          </div>

        </div>

        {/* Payment Methods supported in Algeria */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-music-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-2 text-music-ink font-bold">
              <ShieldCheck className="w-5 h-5 text-music-gold" />
              <span>Modes de Règlement Acceptés en Algérie :</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-music-inkMuted text-xs">
              <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-music-border font-medium">
                <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                <span>BaridiMob (Paiement instantané)</span>
              </span>

              <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-music-border font-medium">
                <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>CCP (Virement & Versement Postal)</span>
              </span>

              <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-music-border font-medium">
                <Building className="w-3.5 h-3.5 text-blue-700" />
                <span>Espèces au Secrétariat d'Alger</span>
              </span>

              <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-music-border font-medium">
                <CreditCard className="w-3.5 h-3.5 text-purple-700" />
                <span>Virement Bancaire</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
