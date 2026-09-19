import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import Header from './components/common/Header';
import LoginView from './components/auth/LoginView';
import StudentLoginModal from './components/auth/StudentLoginModal';
import LandingPage from './components/landing/LandingPage';
import MetronomeModal from './components/common/MetronomeModal';
import TunerModal from './components/common/TunerModal';
import ReceiptModal from './components/common/ReceiptModal';
import ScoreViewerModal from './components/common/ScoreViewerModal';
import SettingsModal from './components/common/SettingsModal';
import AdminDashboard from './components/admin/AdminDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import LibraryView from './components/library/LibraryView';
import {
  Shield,
  UserCheck,
  GraduationCap,
  BookOpen,
  Music,
  CheckCircle,
  AlertTriangle,
  KeyRound,
  X,
  ArrowLeft,
  Globe
} from 'lucide-react';

export default function App() {
  const { currentUser, role, hybridMode, toggleHybridMode, toastMessage } = useApp();
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'portal'
  const [currentView, setCurrentView] = useState('main'); // 'main' | 'library'
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isStudentLoginModalOpen, setIsStudentLoginModalOpen] = useState(false);

  // Check URL parameters for direct administration access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === '1' || params.get('admin') === 'true') {
        setViewMode('portal');
      }
    }
  }, []);

  // If the logged-in user is a hybrid account, their active workspace depends on hybridMode
  const effectiveRole = currentUser?.role === 'hybrid' ? hybridMode : role;

  // 1. PUBLIC LANDING PAGE VIEW
  if (viewMode === 'landing') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-music-ink font-sans selection:bg-music-goldLight selection:text-music-ink">
        <LandingPage 
          onOpenPortal={() => setViewMode('portal')}
          onOpenStudentLogin={() => setIsStudentLoginModalOpen(true)}
          onOpenAdminPortal={() => {
            if (currentUser?.role === 'admin') {
              setViewMode('portal');
            } else {
              setIsLoginModalOpen(true);
            }
          }}
        />

        {/* Dedicated Student Login Modal */}
        <StudentLoginModal
          isOpen={isStudentLoginModalOpen}
          onClose={() => setIsStudentLoginModalOpen(false)}
          onSuccess={() => {
            setIsStudentLoginModalOpen(false);
            setViewMode('portal');
            setCurrentView('main');
          }}
          onOpenAdminPortal={() => {
            setIsStudentLoginModalOpen(false);
            if (currentUser?.role === 'admin') {
              setViewMode('portal');
            } else {
              setIsLoginModalOpen(true);
            }
          }}
        />

        {/* Administration / Teacher Login Modal */}
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-fadeIn">
            <div className="relative w-full max-w-xl">
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-xl bg-white hover:bg-music-card text-music-inkLight hover:text-music-ink shadow-sm border border-music-border"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
              <LoginView onSuccess={() => {
                setIsLoginModalOpen(false);
                setViewMode('portal');
              }} />
            </div>
          </div>
        )}



        {/* Global modals */}
        <MetronomeModal />
        <TunerModal />
        <SettingsModal />

        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-2xl bg-white text-music-ink shadow-card border border-music-border text-xs font-bold animate-bounce-short">
            {toastMessage.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            )}
            <span>{toastMessage.message}</span>
          </div>
        )}
      </div>
    );
  }

  // 2. PORTAL VIEW (LOGIN REQUIRED IF NOT LOGGED IN)
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-music-ink font-sans">
        {/* Portal top bar with back to landing page */}
        <div className="bg-[#1C1814] text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-music-border">
          <button
            onClick={() => setViewMode('landing')}
            className="flex items-center space-x-1.5 text-music-gold hover:text-white font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Retour au Site & Présentation (Landing Page)</span>
          </button>

          <div className="text-white/70 hidden sm:block">
            Îlot Musique Alger • American Canadian Academy
          </div>
        </div>

        <Header onOpenLogin={() => setIsLoginModalOpen(true)} />
        
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="mb-4 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold mb-2">
              Espace Restreint
            </span>
            <h2 className="font-display font-bold text-2xl text-music-ink">
              Connexion au Portail Académique
            </h2>
            <p className="text-xs text-music-inkMuted mt-1">
              Administration, Professeurs certifiés ACA et Étudiants
            </p>
          </div>

          <LoginView />
        </main>

        <footer className="bg-white text-music-inkMuted text-xs py-6 border-t border-music-border text-center">
          Îlot Musique Alger • Conservatoire & École de Musique Privée • Tous droits réservés
        </footer>

        <MetronomeModal />
        <TunerModal />
        <SettingsModal />

        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-2xl bg-white text-music-ink shadow-card border border-music-border text-xs font-bold">
            {toastMessage.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            )}
            <span>{toastMessage.message}</span>
          </div>
        )}
      </div>
    );
  }

  // 3. LOGGED-IN PORTAL DASHBOARD
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-music-ink font-sans selection:bg-music-goldLight selection:text-music-ink">
      
      {/* Global Academy Header */}
      <Header onOpenLogin={() => setIsLoginModalOpen(true)} />

      {/* Sub-Header Context Indicator (Light theme) */}
      <div className="bg-white border-b border-music-border px-4 sm:px-8 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-music-inkLight font-medium">Espace actif :</span>
            <div className="flex flex-wrap items-center gap-1.5 font-bold">
              {effectiveRole === 'admin' && (
                <span className="text-music-ink flex items-center space-x-1.5 bg-music-card border border-music-border px-3 py-1 rounded-xl">
                  <Shield className="w-3.5 h-3.5 text-music-gold" />
                  <span>Direction Pédagogique & Administration</span>
                </span>
              )}
              {effectiveRole === 'teacher' && (
                <span className="text-amber-950 flex items-center space-x-1.5 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                  <UserCheck className="w-3.5 h-3.5 text-music-gold" />
                  <span>Portail Enseignant ({currentUser.name})</span>
                </span>
              )}
              {effectiveRole === 'student' && (
                <span className="text-emerald-950 flex items-center space-x-1.5 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  <GraduationCap className="w-3.5 h-3.5 text-music-cypress" />
                  <span>Portail Apprenant ({currentUser.name} {currentUser.matricule ? `— ${currentUser.matricule}` : ''})</span>
                </span>
              )}

              {/* Hybrid Role 1-Click Mode Switcher */}
              {currentUser?.role === 'hybrid' && (
                <div className="flex items-center space-x-1 bg-amber-100/70 p-1 rounded-xl border border-amber-300 ml-1">
                  <span className="text-[11px] font-bold text-amber-950 px-1.5">Profil Hybride :</span>
                  <button
                    onClick={() => hybridMode !== 'teacher' && toggleHybridMode()}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                      hybridMode === 'teacher'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-amber-900 hover:bg-amber-200/70'
                    }`}
                  >
                    <UserCheck className="w-3 h-3" />
                    <span>Mode Enseignant</span>
                  </button>
                  <button
                    onClick={() => hybridMode !== 'student' && toggleHybridMode()}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                      hybridMode === 'student'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-900 hover:bg-emerald-200/70'
                    }`}
                  >
                    <GraduationCap className="w-3 h-3" />
                    <span>Mode Apprenant</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* View Switcher & Landing Back Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('landing')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl font-bold transition text-xs border border-music-border bg-amber-50/60 text-amber-950 hover:bg-amber-100"
              title="Retourner à la page de présentation publique"
            >
              <Globe className="w-3.5 h-3.5 text-music-gold" />
              <span>Site & Présentation</span>
            </button>

            <button
              onClick={() => setCurrentView('main')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition text-xs ${
                currentView === 'main'
                  ? 'bg-music-ink text-white shadow-xs'
                  : 'text-music-inkMuted hover:bg-music-card'
              }`}
            >
              Tableau de Bord
            </button>

            <button
              onClick={() => setCurrentView('library')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-bold transition text-xs ${
                currentView === 'library'
                  ? 'bg-music-gold text-white shadow-xs'
                  : 'text-music-inkMuted hover:bg-music-card'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Bibliothèque & Partitions</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'library' ? (
          <LibraryView />
        ) : (
          <>
            {effectiveRole === 'admin' && <AdminDashboard />}
            {effectiveRole === 'teacher' && <TeacherDashboard />}
            {effectiveRole === 'student' && (
              <StudentDashboard onNavigateToLibrary={() => setCurrentView('library')} />
            )}
          </>
        )}
      </main>

      {/* Light Luminous Academy Footer */}
      <footer className="bg-white text-music-inkMuted text-xs py-8 border-t border-music-border no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5 text-music-ink">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="w-8 h-8 rounded-lg object-cover border border-music-border shadow-2xs"
            />
            <span className="font-display font-bold text-base tracking-tight text-music-ink">Îlot Musique Alger</span>
            <span className="text-music-inkLight text-xs">— Représentant American Canadian Academy</span>
          </div>

          <div className="text-center md:text-right text-music-inkMuted space-y-1">
            <p className="font-semibold text-music-ink">12, Rue Didouche Mourad / Hydra, Alger • Tél: +213 (0) 550 12 34 56</p>
            <p className="text-[11px] text-music-inkLight">
              Gestion intégrale des dossiers personnels, assiduité hebdomadaire, cotisations DZD et médiathèque de partitions.
            </p>
          </div>
        </div>
      </footer>

      {/* Switch Account / Login Modal if opened while logged in */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-xl">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-xl bg-white hover:bg-music-card text-music-inkLight hover:text-music-ink shadow-sm border border-music-border"
            >
              <X className="w-5 h-5" />
            </button>
            <LoginView onSuccess={() => setIsLoginModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Acoustic Tools Modals */}
      <MetronomeModal />
      <TunerModal />
      <ReceiptModal />
      <ScoreViewerModal />
      <SettingsModal />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-2xl bg-white text-music-ink shadow-card border border-music-border animate-bounce-short text-xs font-bold">
          {toastMessage.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          )}
          <span>{toastMessage.message}</span>
        </div>
      )}

    </div>
  );
}
