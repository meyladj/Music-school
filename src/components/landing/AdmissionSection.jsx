import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiService } from '../../services/api';

export default function AdmissionSection({ preselectedCourse, preselectedCategory }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    commune: 'Hydra',
    instrument: 'piano',
    lesson_format: 'individuel',
    curriculum_type: 'aca_certified',
    formula: '2_seances',
    level: 'debutant',
    age_group: '8-14',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedAdmission, setSubmittedAdmission] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (preselectedCourse) {
      if (preselectedCategory === 'format') {
        setFormData(prev => ({ ...prev, lesson_format: preselectedCourse }));
      } else {
        setFormData(prev => ({ ...prev, instrument: preselectedCourse }));
      }
    }
  }, [preselectedCourse, preselectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await apiService.submitAdmission(formData);
      setSubmittedAdmission(response.admission || {
        ...formData,
        matricule: `IMA-ACA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        created_at: new Date().toISOString()
      });

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } catch (err) {
      setErrorMessage(err.message || "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const mapEmbedUrl = "https://www.openstreetmap.org/export/embed.html?bbox=3.0100%2C36.7300%2C3.0700%2C36.7650&layer=mapnik&marker=36.7450%2C3.0400";
  const externalMapUrl = "https://www.openstreetmap.org/?mlat=36.7450&mlon=3.0400#map=15/36.7450/3.0400";

  return (
    <section id="admission" className="bg-[#FAF8F5] py-20 lg:py-28 border-b border-[#EAE5DD] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#78716A] block">
            CONTACT ET INSCRIPTIONS
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1814] font-normal tracking-tight">
            Contactez-nous
          </h2>

          <div className="w-12 h-[1.5px] bg-[#4A453E] mx-auto"></div>

          <p className="text-sm sm:text-base text-[#554E46] max-w-xl mx-auto font-sans leading-relaxed pt-1">
            Représentant officiel de l'American Canadian Academy en Algérie. 
            Déposez votre demande de pré-inscription ou contactez notre secrétariat.
          </p>
        </div>

        {/* 2-Column Side-by-Side Layout: Map on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Map + Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Free OpenStreetMap Interactive Frame */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#EAE5DD] shadow-sm flex flex-col">
              <div className="p-4 border-b border-[#EAE5DD] flex items-center justify-between bg-[#FAF8F5]/60">
                <div className="flex items-center space-x-2 text-xs font-medium text-[#1C1814]">
                  <MapPin className="w-4 h-4 text-[#C28422]" />
                  <span>Localisation • Alger</span>
                </div>
                <a 
                  href={externalMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#78716A] hover:text-[#1C1814] flex items-center space-x-1 transition"
                >
                  <span>Plein écran</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative w-full h-[320px] sm:h-[360px] bg-stone-100">
                <iframe
                  title="Carte interactive Îlot Musique Alger"
                  src={mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  aria-label="Carte OpenStreetMap"
                />
              </div>
            </div>

            {/* Practical Contact Info Cards */}
            <div className="bg-white rounded-3xl p-6 border border-[#EAE5DD] shadow-sm space-y-4 text-xs">
              <div className="flex items-start space-x-3.5 pb-3 border-b border-[#F0EBE3]">
                <MapPin className="w-4 h-4 text-[#C28422] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1814] block font-semibold">Campus Hydra & Alger-Centre</strong>
                  <span className="text-[#665E56]">Val d'Hydra / Rue Didouche Mourad, Alger</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 pb-3 border-b border-[#F0EBE3]">
                <Phone className="w-4 h-4 text-[#C28422] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1814] block font-semibold">Téléphone</strong>
                  <a href="tel:+213560123456" className="text-[#665E56] hover:text-[#1C1814] transition">
                    +213 (0) 560 123 456
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 pb-3 border-b border-[#F0EBE3]">
                <Mail className="w-4 h-4 text-[#C28422] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1814] block font-semibold">Email</strong>
                  <a href="mailto:contact@ilotmusique-dz.com" className="text-[#665E56] hover:text-[#1C1814] transition">
                    contact@ilotmusique-dz.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="w-4 h-4 text-[#C28422] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1814] block font-semibold">Horaires d'accueil</strong>
                  <span className="text-[#665E56]">Dimanche au Jeudi : 09h00 - 19h00 | Samedi : 09h00 - 18h00</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Pre-registration Form (7 cols) */}
          <div className="lg:col-span-7">
            
            {submittedAdmission ? (
              /* Success Confirmation */
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE5DD] shadow-sm text-center space-y-6 animate-fadeIn">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF8F5] border border-[#E5CEB4] flex items-center justify-center text-[#2A785E]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#2A785E] uppercase tracking-wider">
                    Demande enregistrée
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1814]">
                    Merci, {submittedAdmission.first_name} {submittedAdmission.last_name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#554E46] max-w-md mx-auto">
                    Votre demande a été transmise au secrétariat avec la référence officielle :
                  </p>
                  <div className="inline-block px-5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5CEB4] font-mono text-base font-bold text-[#1C1814]">
                    {submittedAdmission.matricule}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-xs text-left max-w-md mx-auto space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#78716A]">Discipline :</span>
                    <span className="font-medium text-[#1C1814] capitalize">{submittedAdmission.instrument}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#78716A]">Format :</span>
                    <span className="font-medium text-[#1C1814] capitalize">Cours {submittedAdmission.lesson_format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#78716A]">Cursus :</span>
                    <span className="font-medium text-[#1C1814]">American Canadian Academy</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2.5 rounded-full text-xs font-medium bg-[#1C1814] text-white hover:bg-black transition flex items-center space-x-2"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimer le reçu</span>
                  </button>

                  <button
                    onClick={() => setSubmittedAdmission(null)}
                    className="px-6 py-2.5 rounded-full text-xs font-medium bg-[#E5CEB4] hover:bg-[#D8BE9F] text-[#1C1814] transition"
                  >
                    Nouvelle demande
                  </button>
                </div>
              </div>
            ) : (
              /* Production Functional Form */
              <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#EAE5DD] shadow-sm">
                
                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Row 1: Prénom & Nom */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1C1814] mb-1.5">
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        required
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Prénom"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EAE5DD] text-xs text-[#1C1814] focus:outline-none focus:border-[#1C1814] bg-[#FAF8F5]/40 transition placeholder:text-[#948B81]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1C1814] mb-1.5">
                        Nom
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        required
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Nom"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EAE5DD] text-xs text-[#1C1814] focus:outline-none focus:border-[#1C1814] bg-[#FAF8F5]/40 transition placeholder:text-[#948B81]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Téléphone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1C1814] mb-1.5">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Téléphone"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EAE5DD] text-xs text-[#1C1814] focus:outline-none focus:border-[#1C1814] bg-[#FAF8F5]/40 transition placeholder:text-[#948B81]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1C1814] mb-1.5">
                        Adresse email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Adresse email"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EAE5DD] text-xs text-[#1C1814] focus:outline-none focus:border-[#1C1814] bg-[#FAF8F5]/40 transition placeholder:text-[#948B81]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Dropdowns for Discipline & Format */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1C1814] mb-1.5">
                        Discipline
                      </label>
                      <select
                        name="instrument"
                        required
                        value={formData.instrument}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EAE5DD] text-xs text-[#1C1814] focus:outline-none focus:border-[#1C1814] bg-[#FAF8F5]/40 transition cursor-pointer"
                      >
                        <option value="piano">Piano</option>
                        <option value="violon">Violon</option>
                        <option value="guitare">Guitare</option>
                        <option value="batterie">Batterie</option>
                        <option value="chant">Chant (Technique vocale)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1C1814] mb-1.5">
                        Format d'apprentissage
                      </label>
                      <select
                        name="lesson_format"
                        required
                        value={formData.lesson_format}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EAE5DD] text-xs text-[#1C1814] focus:outline-none focus:border-[#1C1814] bg-[#FAF8F5]/40 transition cursor-pointer"
                      >
                        <option value="individuel">Cours individuels</option>
                        <option value="groupe">Cours en groupe</option>
                        <option value="hybride">Formule hybride (Individuel + Groupe)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Commune */}
                  <div>
                    <label className="block text-xs font-medium text-[#1C1814] mb-1.5">
                      Commune de résidence
                    </label>
                    <select
                      name="commune"
                      value={formData.commune}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EAE5DD] text-xs text-[#1C1814] focus:outline-none focus:border-[#1C1814] bg-[#FAF8F5]/40 transition cursor-pointer"
                    >
                      <option value="Hydra">Hydra</option>
                      <option value="Didouche Mourad">Didouche Mourad (Alger-Centre)</option>
                      <option value="El Biar">El Biar</option>
                      <option value="Kouba">Kouba</option>
                      <option value="Dely Brahim">Dely Brahim</option>
                      <option value="Cheraga">Cheraga</option>
                      <option value="Autre Alger">Autre commune</option>
                    </select>
                  </div>

                  {/* Row 5: Message */}
                  <div>
                    <label className="block text-xs font-medium text-[#1C1814] mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message ou remarques"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EAE5DD] text-xs text-[#1C1814] focus:outline-none focus:border-[#1C1814] bg-[#FAF8F5]/40 transition placeholder:text-[#948B81]"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-full text-xs font-medium bg-[#E5CEB4] hover:bg-[#D8BE9F] text-[#1C1814] transition duration-200 shadow-xs disabled:opacity-60"
                    >
                      {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
