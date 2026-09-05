import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Music,
  Shield,
  GraduationCap,
  UserCheck,
  Clock,
  Volume2,
  RefreshCw,
  LogOut,
  User,
  KeyRound,
  Globe,
  Settings,
  MoreVertical,
  ChevronRight,
  Check,
  X,
  Sparkles,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';

export default function Header({ onOpenLogin }) {
  const {
    currentUser,
    logout,
    role,
    setRole,
    hybridMode,
    toggleHybridMode,
    teachers,
    students,
    classes,
    currentTeacherId,
    setCurrentTeacherId,
    currentStudentId,
    setCurrentStudentId,
    setIsMetronomeOpen,
    setIsTunerOpen,
    setIsSettingsOpen,
    language,
    setLanguage,
    t,
    resetToFactorySeed
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-music-ink border-b border-music-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Logo & Academy Identity */}
          <div className="flex items-center space-x-3.5">
            <img
              src="/logo.jpg"
              alt="Îlot Musique Alger Logo"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl object-cover border border-amber-300/80 shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display text-2xl font-black tracking-tight text-music-ink">
                  {t('appName')}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-music-goldLight/70 text-music-goldHover border border-music-gold/30">
                  Alger
                </span>
              </div>
              <p className="text-xs text-music-inkMuted font-sans hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Right Section: Compact User Card + 3-Dots Dropdown Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* User Compact Pill (if logged in) */}
            {currentUser ? (
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center space-x-2.5 px-3 py-1.5 rounded-2xl bg-music-card hover:bg-music-parchment border border-music-border text-left transition shadow-2xs"
                title="Cliquer pour voir votre fiche de profil"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-music-border shadow-2xs"
                />
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-music-ink leading-tight flex items-center space-x-1.5">
                    <span className="truncate max-w-[130px]">{currentUser.name}</span>
                    <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      currentUser.role === 'admin'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : currentUser.role === 'hybrid'
                        ? (hybridMode === 'teacher' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300')
                        : currentUser.role === 'teacher'
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {currentUser.role === 'admin'
                        ? t('admin')
                        : currentUser.role === 'hybrid'
                        ? (hybridMode === 'teacher' ? 'Prof' : 'Élève')
                        : currentUser.role === 'teacher'
                        ? t('teacher')
                        : t('student')}
                    </span>
                  </div>
                  <div className="text-[10px] text-music-inkLight truncate max-w-[160px]">
                    {currentUser.role === 'hybrid'
                      ? `${currentUser.teacherInstrument || 'Violon'} & ${currentUser.studentInstrument || 'Piano'}`
                      : currentUser.role === 'student' && currentUser.matricule
                      ? `${currentUser.matricule} • ${currentUser.instrument || 'Musique'}`
                      : currentUser.role === 'teacher'
                      ? `Classe de ${currentUser.instrument || 'Musique'}`
                      : 'Direction Centrale'}
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs transition shadow-sm"
              >
                <KeyRound className="w-4 h-4" />
                <span>Se Connecter</span>
              </button>
            )}

            {/* Three Dots Menu Button (Dropdown: Profil, Languages, Déconnexion, Outils) */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                title="Options, Profil, Langues & Déconnexion"
                className={`p-2 sm:p-2.5 rounded-2xl border transition flex items-center justify-center shadow-2xs ${
                  isMenuOpen
                    ? 'bg-music-gold text-white border-music-gold shadow-sm'
                    : 'bg-music-card hover:bg-music-parchment text-music-ink border-music-border'
                }`}
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Floating Dropdown */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-3xl border border-music-border shadow-elevated p-2 z-50 animate-scale-up text-xs">
                  
                  {/* 1. Profil Section */}
                  {currentUser && (
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70 border border-amber-200/80 mb-2">
                      <div className="flex items-center space-x-3 mb-2.5">
                        <img
                          src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover border-2 border-music-gold shadow-2xs"
                        />
                        <div className="overflow-hidden flex-1">
                          <div className="font-bold text-music-ink text-sm truncate">{currentUser.name}</div>
                          <div className="text-[10px] text-music-inkLight truncate font-mono">{currentUser.email}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100/60 text-music-ink font-bold border border-amber-200 text-xs transition shadow-2xs"
                      >
                        <div className="flex items-center space-x-2">
                          <User className="w-3.5 h-3.5 text-music-gold" />
                          <span>Voir mon Dossier & Profil</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-music-inkLight" />
                      </button>

                      {/* If Hybrid Account: In-dropdown switcher */}
                      {currentUser.role === 'hybrid' && (
                        <button
                          type="button"
                          onClick={() => {
                            toggleHybridMode();
                            setIsMenuOpen(false);
                          }}
                          className="mt-2 w-full flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white font-bold text-xs transition shadow-2xs"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{hybridMode === 'teacher' ? 'Basculer en Mode Élève' : 'Basculer en Mode Prof'}</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* 2. Langues (Languages) */}
                  <div className="p-2.5 rounded-2xl bg-music-paper border border-music-border mb-2">
                    <div className="flex items-center space-x-1.5 text-[11px] font-bold text-music-inkLight uppercase tracking-wider mb-2">
                      <Globe className="w-3.5 h-3.5 text-music-gold" />
                      <span>Langue / Language :</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setLanguage('fr');
                          setIsMenuOpen(false);
                        }}
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
                          language === 'fr'
                            ? 'bg-music-ink text-white shadow-xs'
                            : 'bg-white text-music-ink hover:bg-music-card border border-music-border'
                        }`}
                      >
                        <span>🇫🇷</span>
                        <span>FR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setLanguage('ar');
                          setIsMenuOpen(false);
                        }}
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
                          language === 'ar'
                            ? 'bg-music-ink text-white shadow-xs'
                            : 'bg-white text-music-ink hover:bg-music-card border border-music-border'
                        }`}
                      >
                        <span>🇩🇿</span>
                        <span>عربي</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setLanguage('en');
                          setIsMenuOpen(false);
                        }}
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
                          language === 'en'
                            ? 'bg-music-ink text-white shadow-xs'
                            : 'bg-white text-music-ink hover:bg-music-card border border-music-border'
                        }`}
                      >
                        <span>🇬🇧</span>
                        <span>EN</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. Outils Pédagogiques & Session */}
                  <div className="space-y-0.5 mb-1 px-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMetronomeOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-music-ink hover:bg-amber-50 hover:text-amber-950 font-medium transition text-xs text-left"
                    >
                      <Clock className="w-4 h-4 text-music-gold shrink-0" />
                      <span>Métronome Interactif</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsTunerOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-music-ink hover:bg-emerald-50 hover:text-emerald-950 font-medium transition text-xs text-left"
                    >
                      <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Diapason La 440 & Accordeur</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onOpenLogin();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-music-ink hover:bg-music-card font-medium transition text-xs text-left"
                    >
                      <KeyRound className="w-4 h-4 text-music-gold shrink-0" />
                      <span>Changer d'Utilisateur</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        resetToFactorySeed();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-music-inkLight hover:text-music-ink hover:bg-music-card font-medium transition text-xs text-left"
                    >
                      <RefreshCw className="w-4 h-4 shrink-0" />
                      <span>Réinitialiser Données Démo</span>
                    </button>
                  </div>

                  {/* 4. Déconnexion */}
                  {currentUser && (
                    <div className="pt-2 border-t border-music-border">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-rose-700 hover:bg-rose-50 font-bold transition text-xs text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Profile Modal (Displayed when user clicks on their profile from header or 3-dots menu) */}
      {isProfileModalOpen && currentUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl border border-music-border shadow-elevated overflow-hidden animate-scale-up">
            
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 border-b border-music-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src="/logo.jpg"
                  alt=""
                  className="w-10 h-10 rounded-2xl object-cover border border-amber-300 shadow-2xs"
                />
                <div>
                  <h3 className="font-display font-bold text-base text-music-ink">
                    Fiche & Profil Conservatoire
                  </h3>
                  <p className="text-[11px] text-music-inkMuted">
                    Îlot Musique Alger • Année Académique 2026/2027
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1.5 rounded-xl border border-music-border text-music-inkLight hover:text-music-ink hover:bg-music-card transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 text-xs">
              
              {/* ID Card Display */}
              <div className="p-5 rounded-2xl bg-music-paper border border-music-border flex items-center space-x-4">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt=""
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-music-gold shadow-sm shrink-0"
                />
                <div>
                  <div className="text-base font-bold text-music-ink">{currentUser.name}</div>
                  <div className="text-xs text-music-inkLight font-mono mt-0.5">{currentUser.email}</div>
                  <div className="mt-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                      ✓ Statut Académique Actif
                    </span>
                  </div>
                </div>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-white border border-music-border">
                  <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">
                    Rôle Principal
                  </span>
                  <span className="text-xs font-bold text-music-ink mt-0.5 block">
                    {currentUser.role === 'admin'
                      ? 'Direction & Administration'
                      : currentUser.role === 'hybrid'
                      ? 'Compte Hybride (Prof / Élève)'
                      : currentUser.role === 'teacher'
                      ? 'Professeur Titulaire'
                      : 'Apprenant du Conservatoire'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-music-border">
                  <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">
                    Identifiant / Matricule
                  </span>
                  <span className="text-xs font-bold font-mono text-music-gold mt-0.5 block">
                    {currentUser.matricule || currentUser.id || 'ADMIN-01'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-music-border">
                  <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">
                    Discipline
                  </span>
                  <span className="text-xs font-bold text-music-ink mt-0.5 block">
                    {currentUser.instrument || currentUser.teacherInstrument || 'Conservatoire & Pédagogie'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-music-border">
                  <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">
                    Établissement
                  </span>
                  <span className="text-xs font-bold text-music-ink mt-0.5 block">
                    Hydra / Alger Centre
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-music-ink hover:bg-black text-white font-bold transition shadow-xs"
                >
                  Fermer
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </header>
  );
}
