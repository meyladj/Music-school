import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Globe,
  Check,
  BookOpen,
  Info
} from 'lucide-react';

export default function SettingsModal() {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    language,
    setLanguage,
    t,
    showToast
  } = useApp();

  if (!isSettingsOpen) return null;

  const languages = [
    {
      code: 'fr',
      name: 'Français',
      nativeName: 'Français',
      flag: '🇫🇷',
      desc: 'Langue officielle d’enseignement au conservatoire'
    },
    {
      code: 'ar',
      name: 'Arabe',
      nativeName: 'العربية',
      flag: '🇩🇿',
      desc: 'الواجهة الكاملة باللغة العربية مع قراءة من اليمين إلى اليسار (RTL)'
    },
    {
      code: 'en',
      name: 'Anglais',
      nativeName: 'English',
      flag: '🇬🇧',
      desc: 'International musical terminology and navigation'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-music-border shadow-elevated overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="p-6 border-b border-music-border flex items-center justify-between bg-gradient-to-r from-amber-50/50 via-white to-amber-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-music-gold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-music-ink">
                {t('settings')}
              </h3>
              <p className="text-xs text-music-inkMuted">
                {t('chooseLanguage')} & Configuration Pédagogique
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 rounded-xl text-music-inkLight hover:text-music-ink hover:bg-music-card border border-music-border transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Language Selection */}
          <div>
            <label className="block text-xs font-bold text-music-ink uppercase tracking-wider mb-3">
              {t('chooseLanguage')}
            </label>

            <div className="grid grid-cols-1 gap-2.5">
              {languages.map(lang => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      showToast(`Langue modifiée : ${lang.name} (${lang.nativeName})`);
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition ${
                      isSelected
                        ? 'bg-amber-50/90 border-music-gold text-music-ink shadow-xs ring-1 ring-music-gold'
                        : 'bg-white hover:bg-music-card border-music-border text-music-inkMuted hover:text-music-ink'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs text-music-ink">{lang.nativeName}</span>
                          <span className="text-[11px] text-music-inkLight">({lang.name})</span>
                        </div>
                        <p className="text-[11px] text-music-inkMuted mt-0.5">{lang.desc}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-music-gold text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* User's PDF Resources & Library Section Notice */}
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-music-gold/40 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-music-ink">
              <BookOpen className="w-4 h-4 text-music-gold shrink-0" />
              <span>{t('resourcesNotice')}</span>
            </div>
            <p className="text-xs text-music-inkMuted leading-relaxed">
              Dès que vous nous transmettez vos fichiers PDF (méthodes Hanon, partitions classiques et arabes-andalouses, précis de solfège), ils apparaîtront automatiquement dans la section <strong>Bibliothèque & Partitions</strong> avec aperçu et téléchargement direct.
            </p>
          </div>

          {/* School Brand Identity */}
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-music-card border border-music-border">
            <img
              src="/logo.jpg"
              alt="Îlot Musique Alger"
              className="w-10 h-10 rounded-xl object-cover border border-music-border shadow-2xs"
            />
            <div>
              <div className="text-xs font-bold text-music-ink">Îlot Musique Alger</div>
              <div className="text-[11px] text-music-inkLight">Version 2.0 • Plateforme de Gestion Conservatoire</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-music-border bg-music-paper flex justify-end">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="px-5 py-2 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs transition shadow-xs"
          >
            Fermer les paramètres
          </button>
        </div>

      </div>
    </div>
  );
}
