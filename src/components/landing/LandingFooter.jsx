import React from 'react';
import { LogIn, MapPin, Shield } from 'lucide-react';

export default function LandingFooter({ onOpenPortal, onOpenAdminPortal }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0D0D0D] text-white pt-20 pb-12 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Main Grid: 4 Columns matching Mockup 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 items-start">
          
          {/* Col 1: Diamond Logo & School Name (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={() => scrollTo('hero')} 
              className="cursor-pointer group flex items-start space-x-3.5"
            >
              {/* Diamond Emblem Vector */}
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition duration-300 text-white">
                <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="24" y="5" width="27" height="27" transform="rotate(45 24 5)" strokeWidth="1.8" />
                  <rect x="24" y="12" width="17" height="17" transform="rotate(45 24 12)" strokeWidth="1.2" strokeOpacity="0.75" />
                  <circle cx="24" cy="24" r="3.5" fill="currentColor" />
                </svg>
              </div>

              <div className="flex flex-col text-left">
                <span className="font-serif tracking-[0.2em] text-sm sm:text-base font-semibold text-white uppercase leading-tight">
                  ILOT MUSIQUE
                </span>
                <span className="text-[9px] tracking-[0.35em] font-sans font-medium text-stone-400 uppercase mt-0.5">
                  ALGER
                </span>
              </div>
            </div>
            
            <p className="text-xs text-stone-400 font-sans max-w-xs leading-relaxed pt-1">
              Représentant officiel de l'American Canadian Academy en Algérie.
            </p>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-sans">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-white transition">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('partenariat')} className="hover:text-white transition">
                  L'école
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('nos-cours')} className="hover:text-white transition">
                  Nos cours
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('partenariat')} className="hover:text-white transition">
                  Partenariat
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('admission')} className="hover:text-white transition">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Suivez-nous (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Suivez-nous
            </h4>
            <div className="flex items-center space-x-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-stone-600 hover:border-white hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white transition duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-stone-600 hover:border-white hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white transition duration-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-stone-600 hover:border-white hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white transition duration-200"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 4: Cursive Flourish (3 cols) */}
          <div className="lg:col-span-3 space-y-3 lg:text-right">
            <p className="font-serif italic text-lg sm:text-xl text-stone-200 tracking-wide">
              « La musique nous rassemble »
            </p>
            <div className="w-16 h-[1px] bg-stone-600 lg:ml-auto"></div>
          </div>

        </div>

        {/* Bottom Legal & Location Bar matching Mockup 2 */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-sans">
          <p>© 2024 Ilot Musique Alger. Tous droits réservés.</p>
          
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>Alger, Algérie</span>
            </span>
            <span className="text-stone-600">•</span>
            <button 
              onClick={onOpenAdminPortal || onOpenPortal}
              className="text-stone-400 hover:text-white flex items-center space-x-1.5 text-xs transition"
              title="Accès réservé à la Direction et au Corps Professoral"
            >
              <Shield className="w-3.5 h-3.5 text-[#E5CEB4]" />
              <span>Accès Administration & Pédagogie</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
