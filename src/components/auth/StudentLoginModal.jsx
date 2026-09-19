import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Lock,
  ArrowRight,
  GraduationCap,
  Music,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function StudentLoginModal({ isOpen, onClose, onOpenAdminPortal, onSuccess }) {
  const { loginUnified, students } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const result = loginUnified(identifier, password);
    setIsLoading(false);

    if (!result.success) {
      setErrorMessage(result.message || 'Identifiants invalides. Vérifiez votre matricule ou mot de passe.');
    } else {
      if (result.role !== 'student' && result.role !== 'hybrid') {
        // If someone entered admin or teacher credentials in student modal
        setErrorMessage('Ces identifiants correspondent à un compte administration ou professeur. Utilisez le lien en bas pour accéder à l\'espace dédié.');
        return;
      }
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    }
  };

  const handleQuickLogin = (studentMatricule, defaultPass) => {
    setErrorMessage('');
    setIsLoading(true);
    const result = loginUnified(studentMatricule, defaultPass);
    setIsLoading(false);

    if (result.success) {
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } else {
      setErrorMessage(result.message || 'Impossible de se connecter.');
    }
  };

  // Pre-configured student demo accounts
  const demoStudents = [
    {
      name: 'Rayan Mansouri',
      instrument: 'Piano classique',
      level: 'Intermédiaire 2',
      matricule: 'IMA-2026-001',
      password: 'piano2026',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Lina Khelifi',
      instrument: 'Violon & Alto',
      level: 'Débutant',
      matricule: 'IMA-2026-002',
      password: 'violon2026',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Youcef Belkacem',
      instrument: 'Luth oriental (Oud)',
      level: 'Avancé',
      matricule: 'IMA-2026-003',
      password: 'oud2026',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Sarah Boudiaf',
      instrument: 'Chant & Technique vocale',
      level: 'Intermédiaire 1',
      matricule: 'IMA-2026-004',
      password: 'chant2026',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Amine Taleb',
      instrument: 'Guitare classique',
      level: 'Débutant',
      matricule: 'IMA-2026-005',
      password: 'guitare2026',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Rayan Tebbouche',
      instrument: 'Batterie & Rythme',
      level: 'Intermédiaire 1',
      matricule: 'IMA-2026-006',
      password: 'batterie2026',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn select-none">
      <div 
        className="relative w-full max-w-xl bg-[#FAF8F5] text-[#1C1814] rounded-3xl border border-[#EAE5DD] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Diamond Motif */}
        <div className="bg-[#1C1814] text-white px-6 py-5 flex items-center justify-between border-b border-white/10 relative">
          <div className="flex items-center space-x-3.5">
            {/* Diamond emblem */}
            <div className="w-9 h-9 flex items-center justify-center text-[#E5CEB4]">
              <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="24" y="5" width="27" height="27" transform="rotate(45 24 5)" strokeWidth="1.8" />
                <rect x="24" y="12" width="17" height="17" transform="rotate(45 24 12)" strokeWidth="1.2" strokeOpacity="0.75" />
                <circle cx="24" cy="24" r="3" fill="currentColor" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#E5CEB4] block font-semibold">
                Portail Académique
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white">
                Espace Étudiant & Apprenant
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition"
            aria-label="Fermer la boîte de dialogue"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          <div className="text-center space-y-1">
            <p className="text-xs text-[#665E56] max-w-md mx-auto leading-relaxed">
              Consultez vos partitions officielles, vos fiches de cours, votre agenda de répétition et vos programmes d'exercices techniques.
            </p>
          </div>

          {/* Direct Credentials Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#3A3530] uppercase tracking-wider">
                Matricule Étudiant ou Identifiant :
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Ex: IMA-2026-001 ou prénom.nom"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-[#D9D3CA] bg-white text-xs text-[#1C1814] placeholder-[#9E958A] focus:outline-none focus:ring-2 focus:ring-[#C99738]/40 focus:border-[#C99738] transition shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#3A3530] uppercase tracking-wider">
                  Mot de Passe :
                </label>
                <span className="text-[11px] text-[#8C8377]">
                  Ex: piano2026
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe étudiant"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-2xl border border-[#D9D3CA] bg-white text-xs text-[#1C1814] placeholder-[#9E958A] focus:outline-none focus:ring-2 focus:ring-[#C99738]/40 focus:border-[#C99738] transition shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#8C8377] hover:text-[#1C1814] transition"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#1C1814] hover:bg-[#2F2923] text-white font-semibold text-xs tracking-wider uppercase transition shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-[0.99]"
            >
              <span>{isLoading ? 'Connexion en cours...' : 'Accéder à mon Espace Étudiant'}</span>
              <ArrowRight className="w-4 h-4 text-[#E5CEB4]" />
            </button>
          </form>

          {/* Fast 1-Click Demo Profiles Section */}
          <div className="pt-4 border-t border-[#EAE5DD] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#736B62]">
                Connexion Rapide en 1 Clic (Profils de Démonstration) :
              </span>
              <span className="text-[10px] font-medium bg-[#EFEAE3] text-[#4A433B] px-2 py-0.5 rounded-full border border-[#D9D3CA]">
                Test Direct
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {demoStudents.map((demo) => (
                <button
                  key={demo.matricule}
                  type="button"
                  onClick={() => handleQuickLogin(demo.matricule, demo.password)}
                  className="flex items-center space-x-3 p-2.5 rounded-2xl bg-white hover:bg-[#F2ECE3] border border-[#E0D9CE] hover:border-[#C99738] text-left transition duration-200 shadow-2xs group"
                >
                  <img
                    src={demo.avatar}
                    alt={demo.name}
                    className="w-10 h-10 rounded-xl object-cover border border-[#D9D3CA] group-hover:scale-105 transition"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1C1814] truncate">
                        {demo.name}
                      </span>
                      <span className="text-[9px] font-mono text-[#8C8377]">
                        {demo.matricule}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#665E56] truncate">
                      {demo.instrument} • <span className="text-[#8B6B38] font-medium">{demo.level}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer: Separate Link for Administration */}
        <div className="px-6 py-4 bg-[#F2ECE3] border-t border-[#EAE5DD] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#665E56]">
          <span>Vous êtes enseignant ou membre de l'administration ?</span>
          <button
            type="button"
            onClick={() => {
              if (onClose) onClose();
              if (onOpenAdminPortal) onOpenAdminPortal();
            }}
            className="font-bold text-[#1C1814] hover:text-[#C99738] underline transition flex items-center space-x-1"
          >
            <Shield className="w-3.5 h-3.5 text-[#C99738]" />
            <span>Accès Direction & Administration</span>
          </button>
        </div>

      </div>
    </div>
  );
}
