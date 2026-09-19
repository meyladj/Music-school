import React, { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';

export default function LandingNavbar({ onOpenStudentLogin, onOpenAdminPortal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DD] transition duration-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo with Diamond Motif matching Mockup */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          {/* Geometric Diamond Emblem */}
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition duration-300">
            <svg viewBox="0 0 48 48" className="w-9 h-9 text-[#1C1814]" fill="none" stroke="currentColor" strokeWidth="2">
              {/* Outer diamond */}
              <rect x="24" y="5" width="27" height="27" transform="rotate(45 24 5)" strokeWidth="1.8" />
              {/* Inner geometric accent */}
              <rect x="24" y="12" width="17" height="17" transform="rotate(45 24 12)" strokeWidth="1.2" strokeOpacity="0.75" />
              {/* Central harp / violin clef curve */}
              <circle cx="24" cy="24" r="3.5" fill="currentColor" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-serif tracking-[0.18em] text-sm sm:text-base font-semibold text-[#1C1814] uppercase leading-tight">
              ILOT MUSIQUE
            </span>
            <span className="text-[9px] tracking-[0.35em] font-sans font-medium text-[#7D756C] uppercase mt-0.5">
              ALGER
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-9 text-xs sm:text-[13px] font-medium text-[#3A3530]">
          <button 
            onClick={() => scrollToSection('partenariat')} 
            className="hover:text-[#1A1715] transition-colors py-1"
          >
            L'école
          </button>

          <button 
            onClick={() => scrollToSection('nos-cours')} 
            className="hover:text-[#1A1715] transition-colors py-1"
          >
            Nos cours
          </button>

          <button 
            onClick={() => scrollToSection('partenariat')} 
            className="hover:text-[#1A1715] transition-colors py-1"
          >
            Partenariat
          </button>

          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-[#1A1715] transition-colors py-1"
          >
            Contact
          </button>
        </div>

        {/* Right CTA Button: Warm Sand Pill matching Mockup */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={() => scrollToSection('admission')}
            className="px-6 py-2.5 rounded-full text-xs font-medium bg-[#E5CEB4] hover:bg-[#D8BE9F] text-[#1A1715] transition-all duration-300 shadow-2xs hover:shadow-xs transform hover:-translate-y-0.5 tracking-wide"
          >
            Nous rejoindre
          </button>

          <button
            onClick={onOpenStudentLogin}
            className="p-2.5 rounded-full text-[#665E56] hover:text-[#1A1715] hover:bg-[#EFEAE3] transition border border-[#E8E1D7] flex items-center justify-center group"
            title="Espace Étudiant & Apprenant (Connexion)"
            aria-label="Espace Étudiant"
          >
            <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform text-[#1A1715]" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => scrollToSection('admission')}
            className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#E5CEB4] text-[#1A1715]"
          >
            Nous rejoindre
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1A1715]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EAE5DD] px-6 py-5 space-y-4 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#2E2925]">
            <button onClick={() => scrollToSection('hero')} className="text-left py-1 hover:text-black">
              Accueil
            </button>
            <button onClick={() => scrollToSection('partenariat')} className="text-left py-1 hover:text-black">
              L'école
            </button>
            <button onClick={() => scrollToSection('nos-cours')} className="text-left py-1 hover:text-black">
              Nos cours
            </button>
            <button onClick={() => scrollToSection('formats-cours')} className="text-left py-1 hover:text-black">
              Formats adaptés
            </button>
            <button onClick={() => scrollToSection('partenariat')} className="text-left py-1 hover:text-black">
              Partenariat American Canadian Academy
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-left py-1 hover:text-black">
              Contact
            </button>
          </div>

          <div className="pt-3 border-t border-[#EAE5DD] flex flex-col gap-2">
            <button
              onClick={() => scrollToSection('admission')}
              className="w-full py-2.5 rounded-full text-xs font-medium bg-[#E5CEB4] text-[#1A1715] text-center"
            >
              Nous rejoindre (Pré-inscription)
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenStudentLogin) onOpenStudentLogin();
              }}
              className="w-full py-2.5 rounded-full text-xs font-medium bg-[#1A1715] text-white text-center flex items-center justify-center space-x-2"
            >
              <LogIn className="w-3.5 h-3.5 text-[#E5CEB4]" />
              <span>Espace Étudiant (Connexion)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
