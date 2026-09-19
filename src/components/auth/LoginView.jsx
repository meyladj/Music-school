import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  UserCheck,
  GraduationCap,
  Music,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Sparkles,
  KeyRound,
  CheckCircle2,
  Info,
  Globe,
  Settings
} from 'lucide-react';

export default function LoginView({ onSuccess }) {
  const {
    loginUnified,
    students,
    teachers,
    language,
    setLanguage,
    t,
    setIsSettingsOpen
  } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const result = loginUnified(identifier, password);
    setIsLoading(false);

    if (!result.success) {
      setErrorMessage(result.message || 'Identifiants invalides.');
    } else {
      if (onSuccess) onSuccess();
    }
  };

  // Quick autofill for demonstration
  const handleAutofill = (id, pass) => {
    setIdentifier(id);
    setPassword(pass);
    setErrorMessage('');
  };

  return (
    <div className="w-full max-w-xl mx-auto my-auto p-2 sm:p-4">
      <div className="bg-[#FFFDFB] border border-music-border rounded-3xl shadow-elevated p-6 sm:p-10 relative overflow-hidden">
        
        {/* Top bar with Language Switcher */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-music-borderLight">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-music-inkLight">
            <Globe className="w-4 h-4 text-music-gold" />
            <span className="hidden sm:inline">Langue :</span>
          </div>

          <div className="flex items-center space-x-1 bg-music-card p-1 rounded-xl border border-music-border">
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                language === 'fr'
                  ? 'bg-white text-music-ink shadow-xs ring-1 ring-black/5'
                  : 'text-music-inkMuted hover:text-music-ink'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition font-arabic ${
                language === 'ar'
                  ? 'bg-white text-music-ink shadow-xs ring-1 ring-black/5'
                  : 'text-music-inkMuted hover:text-music-ink'
              }`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                language === 'en'
                  ? 'bg-white text-music-ink shadow-xs ring-1 ring-black/5'
                  : 'text-music-inkMuted hover:text-music-ink'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Official Academy Logo & Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <img
              src="/logo.jpg"
              alt="Îlot Musique Alger Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover shadow-card border-2 border-music-gold mx-auto"
            />
            <div className="absolute -bottom-2 -right-2 bg-amber-100 text-music-gold p-1.5 rounded-xl border border-amber-300 shadow-2xs">
              <Music className="w-4 h-4" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-music-ink">
            {t('appName')}
          </h1>
          <p className="text-xs text-music-gold font-bold uppercase tracking-wider mt-0.5">
            {t('tagline')}
          </p>
          <p className="text-xs text-music-inkMuted mt-1 font-medium max-w-md mx-auto">
            {t('loginSubtitle')}
          </p>
        </div>

        {/* Unified Login Explanatory Banner */}
        <div className="mb-5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start space-x-2.5 text-xs text-amber-950">
          <Info className="w-4 h-4 text-music-gold shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block text-amber-900 font-bold mb-0.5">
              {t('loginTitle')} :
            </strong>
            <p className="text-[11px] text-amber-900/90">
              {t('autoDetectNotice')} Que vous soyez <strong>Administrateur</strong>, <strong>Professeur</strong> ou <strong>Élève</strong>, connectez-vous avec votre matricule ou identifiant attribué par la direction.
            </p>
          </div>
        </div>

        {/* Single Unified Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="block font-bold text-music-ink mb-1.5">
              {t('identifier')}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-music-inkLight absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Ex: admin, m.benali, IMA-2026-001..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-music-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-music-gold bg-white shadow-2xs"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-bold text-music-ink">{t('password')}</label>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="text-[11px] text-music-inkLight hover:text-music-ink underline"
              >
                Aide & Paramètres
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-music-inkLight absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-music-border text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-music-gold bg-white shadow-2xs"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center space-x-2 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold transition shadow-soft text-xs mt-2 active:scale-[0.99]"
          >
            <span>{isLoading ? 'Vérification...' : t('loginBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* 1-Click Quick Demo Accounts (For easy review of each role) */}
        <div className="mt-6 pt-5 border-t border-music-borderLight">
          <div className="text-[11px] font-bold text-music-inkLight uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-music-gold" />
            <span>Comptes de Démonstration (1-Clic pour Tester) :</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            
            {/* Admin demo */}
            <button
              type="button"
              onClick={() => handleAutofill('admin', 'admin')}
              className="p-2.5 rounded-xl bg-music-card hover:bg-amber-50 text-left text-xs transition border border-music-border flex flex-col justify-between"
            >
              <div className="flex items-center space-x-1.5 text-amber-900 font-bold mb-1">
                <Shield className="w-3.5 h-3.5 text-music-gold" />
                <span>Direction</span>
              </div>
              <div className="text-[11px] font-mono text-music-inkMuted">
                admin / admin
              </div>
              <span className="text-[10px] text-amber-700 mt-1 font-medium">Gestion totale & comptes</span>
            </button>

            {/* Teacher demo */}
            <button
              type="button"
              onClick={() => handleAutofill('m.benali', 'prof2026')}
              className="p-2.5 rounded-xl bg-music-card hover:bg-purple-50 text-left text-xs transition border border-music-border flex flex-col justify-between"
            >
              <div className="flex items-center space-x-1.5 text-purple-900 font-bold mb-1">
                <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Prof. Mehdi</span>
              </div>
              <div className="text-[11px] font-mono text-music-inkMuted">
                m.benali / prof2026
              </div>
              <span className="text-[10px] text-purple-700 mt-1 font-medium">Piano & notations</span>
            </button>

            {/* Student demo */}
            <button
              type="button"
              onClick={() => handleAutofill('IMA-2026-001', 'piano2026')}
              className="p-2.5 rounded-xl bg-music-card hover:bg-emerald-50 text-left text-xs transition border border-music-border flex flex-col justify-between"
            >
              <div className="flex items-center space-x-1.5 text-emerald-900 font-bold mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-music-cypress" />
                <span>Élève Rayan</span>
              </div>
              <div className="text-[11px] font-mono text-music-inkMuted">
                IMA-2026-001
              </div>
              <span className="text-[10px] text-emerald-700 mt-1 font-medium">Pièces & exercices</span>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
