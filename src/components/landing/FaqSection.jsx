import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Award } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "En quoi consiste le partenariat entre l'Îlot Musique et l'American Canadian Academy (ACA) ?",
      a: "Îlot Musique Alger est le centre officiel agréé et représentant exclusif en Algérie de l'American Canadian Academy. Nos élèves suivent des cursus alignés sur les standards nord-américains (Grades 1 à 8) et passent des examens officiels chaque année. Les diplômes et attestations de réussite délivrés sont internationalement reconnus et constituent une valorisation majeure pour les dossiers scolaires ou universitaires à l'étranger (USA, Canada, Europe)."
    },
    {
      q: "Comment choisir entre un cours individuel et un cours en groupe ?",
      a: "Le cours individuel (tête-à-tête) offre une personnalisation totale, idéal pour progresser rapidement techniquement et passer les grades ACA. Le cours en groupe (4 à 7 élèves) met l'accent sur l'émulation collective, l'écoute polyphonique, le jeu d'ensemble et permet d'apprendre dans une ambiance conviviale. Vous pouvez également opter pour la formule hybride combinant les deux."
    },
    {
      q: "Quels sont les instruments enseignés à l'école ?",
      a: "Nous formons principalement sur 5 grandes disciplines : le Piano (classique et jazz), le Violon (et violoncelle), la Guitare (classique, acoustique, électrique), la Batterie & percussions, ainsi que le Chant (technique vocale lyrique et musiques actuelles). Nous proposons également l'Éveil Musical pour les enfants de 4 à 7 ans et le Solfège."
    },
    {
      q: "Dois-je obligatoirement posséder mon propre instrument pour m'inscrire ?",
      a: "Non, pour débuter vos séances à l'académie, tous les instruments sont mis à votre disposition sur place (pianos acoustiques à queue et droits, batterie complète professionnelle, guitares, violons et micros de chant). Pour le travail personnel à domicile, nos enseignants vous guideront avec précision pour choisir l'instrument idéal selon votre budget."
    },
    {
      q: "À partir de quel âge peut-on débuter ?",
      a: "Dès 4 ans avec notre atelier d'Éveil Musical. Pour le piano, le violon et la batterie, l'apprentissage instrumental spécifique commence généralement vers 6-7 ans. Pour le chant et la guitare, dès 7-8 ans. Nous avons également d'excellents cursus adaptés aux adolescents et adultes débutants sans limite d'âge !"
    },
    {
      q: "Quels sont les modes de paiement et comment sont délivrées les quittances ?",
      a: "Les cotisations sont réglées mensuellement en Dinars Algériens (DZD) via BaridiMob, CCP, espèces au secrétariat ou virement bancaire. Une quittance officielle d'Îlot Musique avec cachet de l'académie et matricule d'élève vous est remise à chaque encaissement."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-music-border relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
            <HelpCircle className="w-3.5 h-3.5 text-music-gold" />
            <span>Foire Aux Questions</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-music-ink tracking-tight">
            Tout ce que vous devez savoir sur l'Îlot Musique & l'ACA
          </h2>

          <p className="text-xs sm:text-sm text-music-inkMuted">
            Des réponses précises à vos interrogations sur nos cursus, diplômes et fonctionnement à Alger.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-music-border rounded-2xl overflow-hidden bg-[#FAF7F2] transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-music-ink hover:text-music-gold transition"
              >
                <span>{faq.q}</span>
                <span className="p-1 rounded-lg bg-white border border-music-border text-music-inkLight flex-shrink-0">
                  {openIndex === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {openIndex === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-music-inkMuted leading-relaxed border-t border-music-border/50 pt-3 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
