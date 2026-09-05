import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AddPieceStudentModal from './AddPieceStudentModal';
import PianoScaleSimulator from './PianoScaleSimulator';
import { downloadPieceScore } from '../../utils/scoreDownload';
import {
  GraduationCap,
  Music,
  CheckCircle2,
  Calendar,
  Award,
  BookOpen,
  Eye,
  Clock,
  Check,
  Sparkles,
  Target,
  FileText,
  Plus,
  Download,
  Lightbulb,
  Trash2,
  Printer
} from 'lucide-react';

export default function StudentDashboard({ onNavigateToLibrary }) {
  const {
    currentStudent,
    teachers,
    pieces,
    addPiece,
    deletePiece,
    addExerciseToPiece,
    addTipToPiece,
    evaluations,
    attendance,
    library,
    setDocumentToView,
    toggleHomeworkDone,
    togglePieceExercise,
    showToast,
    t
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('pieces'); // 'pieces' | 'grades'
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const [isAddPieceModalOpen, setIsAddPieceModalOpen] = useState(false);

  // Inline exercise form state
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [newExForm, setNewExForm] = useState({
    title: '',
    bars: '',
    targetBpm: 60,
    notes: ''
  });

  // Inline tip form state
  const [isAddingTip, setIsAddingTip] = useState(false);
  const [newTipText, setNewTipText] = useState('');

  if (!currentStudent) {
    return <div className="text-center py-12 text-music-inkLight">Aucun élève sélectionné.</div>;
  }

  const teacher = teachers.find(t => t.id === currentStudent.teacherId);
  const myPieces = pieces.filter(p => p.studentId === currentStudent.id);
  const myEval = evaluations.find(e => e.studentId === currentStudent.id && e.period === 'Septembre 2026');

  // Compute total tailored exercises count and validated count
  let totalExercises = 0;
  let validatedExercises = 0;
  myPieces.forEach(p => {
    if (p.exercises && p.exercises.length > 0) {
      totalExercises += p.exercises.length;
      validatedExercises += p.exercises.filter(e => e.completed).length;
    }
  });

  const overallExercisesRate = totalExercises > 0
    ? Math.round((validatedExercises / totalExercises) * 100)
    : 0;

  return (
    <div className="space-y-6">
      
      {/* Light Luminous Student Banner */}
      <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF4EA] to-[#FFFDF9] text-music-ink p-6 rounded-3xl shadow-soft border border-music-border relative overflow-hidden">
        <div className="absolute inset-0 stave-pattern-light pointer-events-none opacity-40"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4 sm:space-x-5">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.firstName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-music-gold shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold bg-music-gold text-white px-2.5 py-0.5 rounded-lg shadow-xs">
                  {currentStudent.matricule}
                </span>
                <span className="text-xs text-amber-900 font-bold bg-amber-100/90 px-2.5 py-0.5 rounded-lg border border-amber-200">
                  {currentStudent.level}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mt-1 text-music-ink">
                Bonjour, {currentStudent.firstName} {currentStudent.lastName} !
              </h2>
              <p className="text-xs sm:text-sm text-music-inkMuted mt-1 flex items-center space-x-1.5">
                <Music className="w-4 h-4 text-music-gold inline" />
                <span>Classe de {currentStudent.instrument} • Prof. {teacher ? teacher.name : 'Professeur'}</span>
              </p>
            </div>
          </div>

          {/* Next Lesson Box */}
          <div className="bg-white/90 backdrop-blur-xs px-5 py-3.5 rounded-2xl border border-music-border min-w-[240px] shadow-xs">
            <span className="text-[11px] font-bold text-music-inkLight uppercase tracking-wider block">
              Prochaine Séance en Atelier :
            </span>
            <div className="text-base font-bold text-music-ink mt-0.5 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-music-gold" />
              <span>{currentStudent.scheduleDays?.split('&')[0] || 'Mercredi 16h30'}</span>
            </div>
            <div className="text-[11px] text-music-inkMuted mt-1">
              Conservatoire Îlot Musique Alger
            </div>
          </div>
        </div>
      </div>

      {/* Musical KPI Cards (Exclusively pedagogical: no financial or attendance data) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Active Repertoire */}
        <div className="bg-white p-5 rounded-3xl border border-music-border shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-music-inkLight uppercase tracking-wider">Répertoire Actif</span>
            <Music className="w-4 h-4 text-music-gold" />
          </div>
          <div className="text-2xl font-mono font-black text-music-ink mt-1">
            {myPieces.length} <span className="text-xs font-sans text-music-inkMuted font-normal">morceaux</span>
          </div>
          <p className="text-[11px] text-music-inkMuted mt-0.5 font-medium">
            Pièces d'étude assignées
          </p>
        </div>

        {/* Tailored Exercises Rate */}
        <div className="bg-white p-5 rounded-3xl border border-music-border shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-music-inkLight uppercase tracking-wider">Exercices Spécifiques</span>
            <Target className="w-4 h-4 text-music-cypress" />
          </div>
          <div className="text-2xl font-mono font-black text-emerald-800 mt-1">
            {validatedExercises} / {totalExercises}
          </div>
          <p className="text-[11px] text-emerald-700 font-bold mt-0.5">
            {overallExercisesRate}% d'objectifs validés
          </p>
        </div>

        {/* Teacher Grade Average */}
        <div className="bg-white p-5 rounded-3xl border border-music-border shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-music-inkLight uppercase tracking-wider">Bulletin du Mois</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-mono font-black text-purple-950 mt-1">
            {myEval ? (
              ((myEval.solfegeScore + myEval.techniqueScore + myEval.musicalityScore + myEval.regularityScore) / 4).toFixed(1)
            ) : '17.5'}{' '}
            <span className="text-xs text-music-inkLight font-sans">/ 20</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-bold mt-0.5">
            Mention Très Bien
          </p>
        </div>

        {/* Library Resources */}
        <div className="bg-white p-5 rounded-3xl border border-music-border shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-music-inkLight uppercase tracking-wider">Bibliothèque & Partitions</span>
            <BookOpen className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-mono font-black text-music-ink mt-1">
            {library.length} <span className="text-xs font-sans text-music-inkMuted font-normal">titres</span>
          </div>
          <p className="text-[11px] text-music-gold font-bold mt-0.5">
            Livres, études & partitions PDF
          </p>
        </div>

      </div>

      {/* Sub-Tab Navigation Bar (Only Pedagogical Tabs) */}
      <div className="flex items-center space-x-2 border-b border-music-border pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('pieces')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'pieces'
              ? 'bg-music-ink text-white shadow-sm'
              : 'bg-white text-music-inkMuted hover:bg-music-card hover:text-music-ink border border-music-border'
          }`}
        >
          <Music className={`w-3.5 h-3.5 ${activeSubTab === 'pieces' ? 'text-music-gold' : 'text-music-inkLight'}`} />
          <span>Mes Pièces & Exercices Personnalisés</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            activeSubTab === 'pieces' ? 'bg-music-gold text-white' : 'bg-music-card text-music-inkMuted border border-music-border'
          }`}>
            {myPieces.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('grades')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'grades'
              ? 'bg-music-ink text-white shadow-sm'
              : 'bg-white text-music-inkMuted hover:bg-music-card hover:text-music-ink border border-music-border'
          }`}
        >
          <Award className={`w-3.5 h-3.5 ${activeSubTab === 'grades' ? 'text-purple-400' : 'text-music-inkLight'}`} />
          <span>Carnet de Notes & Devoirs</span>
        </button>

        <button
          onClick={() => setActiveSubTab('piano')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'piano'
              ? 'bg-music-ink text-white shadow-sm'
              : 'bg-white text-music-inkMuted hover:bg-music-card hover:text-music-ink border border-music-border'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${activeSubTab === 'piano' ? 'text-amber-400' : 'text-music-gold'}`} />
          <span>Simulateur Clavier & Gammes</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            Nouveau
          </span>
        </button>
      </div>

      {/* SUB-TAB 1: PIÈCES À APPRENDRE & EXERCICES PERSONNALISÉS */}
      {activeSubTab === 'pieces' && (
        <div className="space-y-6">
          
          {/* Header & Library Callout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-music-border shadow-soft">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-music-gold"></span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-music-ink">
                  Mon Répertoire Musical & Exercices Dédiés
                </h3>
              </div>
              <p className="text-xs text-music-inkMuted mt-1">
                Gérez vos morceaux d'étude, consultez les astuces techniques et téléchargez vos partitions officielles.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsAddPieceModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-soft transition active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>+ Ajouter une Pièce à mon Répertoire</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToLibrary}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition shadow-2xs"
              >
                <BookOpen className="w-4 h-4 text-music-gold" />
                <span>Médiathèque</span>
              </button>
            </div>
          </div>

          {/* Interactive Piece Selector Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-xs font-bold text-music-inkLight uppercase tracking-wider">
                1. Sélectionnez votre pièce d'étude ({myPieces.length}) :
              </label>
              {myPieces.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsAddPieceModalOpen(true)}
                  className="text-xs font-bold text-music-gold hover:underline flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter un autre morceau</span>
                </button>
              )}
            </div>

            {myPieces.length === 0 ? (
              <div className="bg-white rounded-3xl border-2 border-dashed border-music-border p-8 text-center space-y-3">
                <Music className="w-12 h-12 text-music-gold mx-auto opacity-60" />
                <h4 className="font-display font-bold text-base text-music-ink">Votre répertoire est encore vide</h4>
                <p className="text-xs text-music-inkMuted max-w-md mx-auto">
                  Ajoutez vos premières pièces d'étude avec leurs tipps et exercices techniques sur-mesure en 1 clic grâce à nos modèles de conservatoire !
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddPieceModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-soft transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter ma Première Pièce</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {myPieces.map(piece => {
                const isSelected = (selectedPieceId || myPieces[0]?.id) === piece.id;
                const completedCount = piece.exercises ? piece.exercises.filter(e => e.completed).length : 0;
                const totalEx = piece.exercises ? piece.exercises.length : 0;

                return (
                  <button
                    key={piece.id}
                    type="button"
                    onClick={() => setSelectedPieceId(piece.id)}
                    className={`p-4 rounded-3xl border text-left transition relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-50/90 via-white to-amber-50/60 border-music-gold shadow-md ring-2 ring-music-gold/40'
                        : 'bg-white hover:bg-music-card border-music-border shadow-soft hover:shadow-card'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-music-inkLight uppercase tracking-wider">
                          {piece.difficulty} • {piece.key}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          piece.status === 'maitrise'
                            ? 'bg-emerald-100 text-emerald-800'
                            : piece.status === 'nuances'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {piece.status === 'maitrise' ? '★ Maîtrisé' : piece.status === 'nuances' ? 'Nuances' : 'Déchiffrage'}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-base text-music-ink">
                        {piece.title}
                      </h4>
                      <p className="text-xs text-music-inkMuted italic">
                        {piece.composer}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-music-borderLight flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5 text-music-inkLight text-[11px]">
                        <Music className="w-3.5 h-3.5 text-music-gold" />
                        <span>{completedCount}/{totalEx} exercices validés</span>
                      </div>

                      <span className="font-mono font-bold text-music-ink text-[11px]">
                        {piece.progress}%
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-music-gold animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

          {/* Active Piece Studio Card */}
          {(() => {
            const activePiece = myPieces.find(p => p.id === (selectedPieceId || myPieces[0]?.id)) || myPieces[0];
            if (!activePiece) return null;

            return (
              <div className="space-y-6">
                
                {/* Piece Hero Card & Actions */}
                <div className="bg-white rounded-3xl border border-music-border p-6 sm:p-8 shadow-soft relative overflow-hidden">
                  
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-music-borderLight">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-music-goldLight text-music-goldHover border border-music-gold/30">
                          {activePiece.key}
                        </span>
                        <span className="px-3 py-1 rounded-xl text-xs font-mono text-music-inkLight bg-music-card border border-music-border">
                          {activePiece.tempo}
                        </span>
                        <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                          Niveau {activePiece.difficulty}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-display font-black text-music-ink">
                        {activePiece.title}
                      </h2>
                      <p className="text-sm text-music-inkMuted font-medium mt-1">
                        Compositeur : <strong className="text-music-ink">{activePiece.composer}</strong> • Recommandé par Prof. {teacher?.name}
                      </p>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => downloadPieceScore(activePiece, `${currentStudent.firstName} ${currentStudent.lastName}`)}
                        className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-soft transition active:scale-[0.98]"
                        title="Télécharger la partition officielle avec tipps et exercices au format PDF"
                      >
                        <Download className="w-4 h-4" />
                        <span>Télécharger la Partition (PDF)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDocumentToView(activePiece)}
                        className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-soft transition active:scale-[0.98]"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Visualiser en Direct</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Voulez-vous retirer "${activePiece.title}" de votre répertoire d'étude ?`)) {
                            deletePiece(activePiece.id);
                            showToast?.('Pièce retirée de votre répertoire', 'info');
                          }
                        }}
                        className="flex items-center space-x-1.5 px-3 py-2.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 transition"
                        title="Retirer cette pièce du répertoire"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Retirer</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress & Teacher Instructions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    
                    {/* Left 2 cols: Teacher Notes */}
                    <div className="md:col-span-2 space-y-3">
                      <h4 className="text-xs font-bold text-music-ink uppercase tracking-wider flex items-center space-x-2">
                        <Award className="w-4 h-4 text-music-gold" />
                        <span>Consignes & Conseils Techniques du Professeur :</span>
                      </h4>
                      <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-amber-200/90 text-xs text-music-ink leading-relaxed">
                        <p className="italic text-amber-950 font-medium">
                          « {activePiece.teacherNotes || 'Travailler régulièrement au métronome lent avant de monter le tempo final.'} »
                        </p>
                        <div className="mt-3 flex items-center space-x-4 text-[11px] text-music-inkMuted font-mono">
                          <span>• Partition : {activePiece.pages || '4'} pages</span>
                          <span>• Mesures totales : {activePiece.measuresCount || 48}</span>
                          <span>• Assignée le : {activePiece.assignedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right col: Mastery percentage */}
                    <div className="bg-music-card p-5 rounded-2xl border border-music-border flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-music-inkLight uppercase tracking-wider block">
                          Maîtrise Globale
                        </span>
                        <div className="text-3xl font-mono font-black text-music-ink mt-1">
                          {activePiece.progress}%
                        </div>
                      </div>

                      <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-music-borderLight mt-3">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            activePiece.progress === 100
                              ? 'bg-emerald-600'
                              : activePiece.progress >= 60
                              ? 'bg-purple-600'
                              : 'bg-music-gold'
                          }`}
                          style={{ width: `${activePiece.progress}%` }}
                        ></div>
                      </div>

                      <p className="text-[11px] text-music-inkMuted mt-2">
                        Cochez les exercices ci-dessous pour faire progresser votre niveau de maîtrise.
                      </p>
                    </div>

                  </div>

                </div>

                {/* Section: Petits Tipps & Astuces de Pratique */}
                <div className="bg-[#FFFDF9] rounded-3xl border border-amber-200 p-6 sm:p-7 shadow-soft space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/70">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-music-gold shadow-xs">
                        <Lightbulb className="w-5 h-5 text-music-gold" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-display font-bold text-base sm:text-lg text-music-ink">
                            Petits Tipps & Astuces de Pratique
                          </h3>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                            Conseils Clés
                          </span>
                        </div>
                        <p className="text-xs text-music-inkMuted mt-0.5">
                          Recommandations de méthode, ergonomie du geste et repères d'interprétation pour {activePiece.title}.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAddingTip(!isAddingTip)}
                      className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 text-amber-950 font-bold text-xs border border-amber-300 transition shadow-2xs self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5 text-music-gold" />
                      <span>{isAddingTip ? 'Fermer' : 'Ajouter un tipp perso'}</span>
                    </button>
                  </div>

                  {/* Add tip inline form */}
                  {isAddingTip && (
                    <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm space-y-2.5 animate-fadeIn">
                      <label className="block text-xs font-bold text-amber-950">
                        Votre astuce ou note personnelle de travail :
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newTipText}
                          onChange={(e) => setNewTipText(e.target.value)}
                          placeholder="Ex: Veiller à relâcher le poignet gauche sur la descente chromatique..."
                          className="flex-1 px-3.5 py-2 rounded-xl border border-music-border text-xs focus:ring-2 focus:ring-music-gold/30 focus:border-music-gold outline-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newTipText.trim()) {
                              addTipToPiece(activePiece.id, newTipText.trim());
                              setNewTipText('');
                              setIsAddingTip(false);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newTipText.trim()) {
                              addTipToPiece(activePiece.id, newTipText.trim());
                              setNewTipText('');
                              setIsAddingTip(false);
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-music-gold text-white font-bold text-xs hover:bg-music-goldHover transition shadow-xs shrink-0"
                        >
                          Enregistrer le tipp
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Tips List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activePiece.tips && activePiece.tips.length > 0 ? (
                      activePiece.tips.map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-3 p-3.5 rounded-2xl bg-white border border-amber-200/70 shadow-2xs hover:border-amber-300 transition"
                        >
                          <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-xs text-music-ink leading-relaxed font-medium">
                            {tip}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-5 text-xs text-music-inkMuted bg-white rounded-2xl border border-dashed border-amber-200">
                        Aucun tipp spécifique enregistré pour ce morceau. Cliquez sur "+ Ajouter un tipp perso" ci-dessus pour noter vos astuces !
                      </div>
                    )}
                  </div>
                </div>

                {/* Section: Exercices Personnalisés pour cette Pièce */}
                <div className="bg-white rounded-3xl border border-music-border p-6 sm:p-8 shadow-soft space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-music-borderLight">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
                          Spécifiques à la Pièce
                        </span>
                        <h3 className="font-display font-bold text-lg text-music-ink">
                          Exercices Personnalisés ({activePiece.title})
                        </h3>
                      </div>
                      <p className="text-xs text-music-inkMuted mt-1">
                        Exercices créés sur-mesure pour surmonter les difficultés techniques précises de ce morceau.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="text-xs font-bold text-music-inkMuted">
                        Progression : <strong className="text-emerald-700">{activePiece.exercises?.filter(e => e.completed).length || 0}</strong> / {activePiece.exercises?.length || 0} validés
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsAddExerciseOpen(!isAddExerciseOpen)}
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5 text-music-gold" />
                        <span>{isAddExerciseOpen ? 'Fermer' : 'Ajouter un exercice'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Add Exercise Inline Form */}
                  {isAddExerciseOpen && (
                    <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200 shadow-sm space-y-3 animate-fadeIn">
                      <h5 className="font-bold text-xs text-amber-950 flex items-center space-x-2">
                        <Plus className="w-4 h-4 text-music-gold" />
                        <span>Créer un nouvel exercice technique pour cette pièce :</span>
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                          <label className="block text-[11px] font-bold text-music-inkMuted mb-1">
                            Titre de l'exercice *
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Arpèges lents mes. 8-12"
                            value={newExForm.title}
                            onChange={(e) => setNewExForm({ ...newExForm, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white focus:ring-2 focus:ring-music-gold/30 focus:border-music-gold outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-music-inkMuted mb-1">
                            Mesures concernées
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Mesures 8 à 16"
                            value={newExForm.bars}
                            onChange={(e) => setNewExForm({ ...newExForm, bars: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white focus:ring-2 focus:ring-music-gold/30 focus:border-music-gold outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-music-inkMuted mb-1">
                            Tempo cible (BPM)
                          </label>
                          <input
                            type="number"
                            placeholder="Ex: 60"
                            value={newExForm.targetBpm}
                            onChange={(e) => setNewExForm({ ...newExForm, targetBpm: Number(e.target.value) || 60 })}
                            className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white focus:ring-2 focus:ring-music-gold/30 focus:border-music-gold outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-music-inkMuted mb-1">
                          Consigne d'exécution / Conseil technique
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Mains séparées, détendre le poignet sur chaque changement de position."
                          value={newExForm.notes}
                          onChange={(e) => setNewExForm({ ...newExForm, notes: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white focus:ring-2 focus:ring-music-gold/30 focus:border-music-gold outline-none"
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddExerciseOpen(false);
                            setNewExForm({ title: '', bars: '', targetBpm: 60, notes: '' });
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-music-card text-music-inkMuted text-xs font-bold border border-music-border"
                        >
                          Annuler
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!newExForm.title.trim()) {
                              alert("Veuillez indiquer au moins un titre pour l'exercice.");
                              return;
                            }
                            addExerciseToPiece(activePiece.id, newExForm);
                            setNewExForm({ title: '', bars: '', targetBpm: 60, notes: '' });
                            setIsAddExerciseOpen(false);
                          }}
                          className="px-4 py-1.5 rounded-xl bg-music-gold hover:bg-music-goldHover text-white text-xs font-bold shadow-xs"
                        >
                          Ajouter l'exercice
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of Custom Exercises */}
                  <div className="space-y-3">
                    {activePiece.exercises && activePiece.exercises.length > 0 ? (
                      activePiece.exercises.map((ex) => (
                        <div
                          key={ex.id}
                          className={`p-4 sm:p-5 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            ex.completed
                              ? 'bg-emerald-50/60 border-emerald-200'
                              : 'bg-music-card hover:bg-[#FFFDF9] border-music-border'
                          }`}
                        >
                          <div className="flex items-start space-x-3.5">
                            <button
                              type="button"
                              onClick={() => togglePieceExercise(activePiece.id, ex.id)}
                              title={ex.completed ? 'Marquer comme non acquis' : 'Valider cet exercice'}
                              className={`w-6 h-6 rounded-lg flex items-center justify-center transition shrink-0 mt-0.5 ${
                                ex.completed
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'border-2 border-music-border text-transparent hover:border-music-gold bg-white'
                              }`}
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                            </button>

                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`text-xs font-bold ${ex.completed ? 'text-emerald-900 line-through' : 'text-music-ink'}`}>
                                  {ex.title}
                                </span>
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white text-music-inkLight border border-music-border">
                                  {ex.bars || ex.target || 'Toutes mesures'}
                                </span>
                                {(ex.targetBpm || ex.bpm) && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200">
                                    Tempo cible : {ex.targetBpm || ex.bpm} BPM
                                  </span>
                                )}
                              </div>

                              <p className={`text-xs leading-relaxed ${ex.completed ? 'text-emerald-800' : 'text-music-inkMuted'}`}>
                                {ex.notes || ex.advice}
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center space-x-2 self-end sm:self-auto">
                            {ex.completed ? (
                              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Objectif Validé</span>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => togglePieceExercise(activePiece.id, ex.id)}
                                className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-music-ink hover:text-emerald-800 border border-music-border text-xs font-bold transition shadow-2xs"
                              >
                                Marquer Acquis
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-music-inkLight text-xs">
                        Aucun exercice spécifique assigné pour l'instant. Cliquez sur "+ Ajouter un exercice" pour créer votre premier objectif !
                      </div>
                    )}
                  </div>

                </div>

                {/* Section: Téléchargement Partition & Fiche d'Étude */}
                <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 rounded-3xl border-2 border-music-gold/30 p-6 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-music-gold/40 flex items-center justify-center text-music-gold shrink-0 shadow-xs">
                      <Download className="w-6 h-6 text-music-gold" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-music-ink">
                        Télécharger la Partition Officielle ({activePiece.title})
                      </h4>
                      <p className="text-xs text-music-inkMuted mt-0.5">
                        Édition pédagogique complète avec portées musicales, {activePiece.tips?.length || 0} tipps de pratique et {activePiece.exercises?.length || 0} exercices personnalisés prêts à imprimer.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => downloadPieceScore(activePiece, `${currentStudent.firstName} ${currentStudent.lastName}`)}
                      className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-soft transition flex items-center space-x-2 active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Télécharger PDF / Imprimer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocumentToView(activePiece)}
                      className="px-4 py-3 rounded-2xl bg-white hover:bg-music-card text-music-ink font-bold text-xs border border-music-border transition"
                    >
                      Aperçu
                    </button>
                  </div>
                </div>

                {/* Pedagogical Library Callout */}
                <div className="bg-[#FFFDF9] rounded-3xl border border-music-border p-6 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-music-gold shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-music-ink">
                        Bibliothèque de Partitions & Méthodes Pédagogiques
                      </h4>
                      <p className="text-xs text-music-inkMuted mt-0.5">
                        Consultez tous les manuels de solfège, études de technique instrumentale et recueils de morceaux mis à disposition par l'école.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onNavigateToLibrary}
                    className="px-5 py-2.5 rounded-2xl bg-music-ink hover:bg-music-ink/90 text-white font-bold text-xs shadow-soft transition shrink-0"
                  >
                    Explorer la Médiathèque
                  </button>
                </div>

              </div>
            );
          })()}

        </div>
      )}

      {/* SUB-TAB 2: CARNET DE NOTES & DEVOIRS */}
      {activeSubTab === 'grades' && (
        <div className="space-y-4">
          {myEval ? (
            <div className="bg-white rounded-3xl border border-music-border p-6 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-music-borderLight">
                <div>
                  <h3 className="font-display font-bold text-base text-music-ink">
                    Bulletin d'Évaluation — {myEval.period}
                  </h3>
                  <p className="text-xs text-music-inkMuted">
                    Professeur référent : {teacher ? teacher.name : 'Professeur'} • Reçu le {myEval.date}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-music-inkMuted font-bold">Moyenne :</span>
                  <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-900 font-mono font-black text-sm">
                    {((myEval.solfegeScore + myEval.techniqueScore + myEval.musicalityScore + myEval.regularityScore) / 4).toFixed(1)} / 20
                  </span>
                </div>
              </div>

              {/* Homework Section */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      Devoir à la Maison pour la prochaine séance :
                    </span>
                  </div>

                  <button
                    onClick={() => toggleHomeworkDone(currentStudent.id, myEval.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      myEval.homeworkDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-amber-900 border border-amber-300 hover:bg-amber-100'
                    }`}
                  >
                    {myEval.homeworkDone ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Devoir Terminé</span>
                      </>
                    ) : (
                      <span>Marquer comme Terminé</span>
                    )}
                  </button>
                </div>

                <p className="text-xs text-amber-950 font-medium mt-2 leading-relaxed">
                  {myEval.homework || 'Travailler les mesures 1 à 16 mains séparées au tempo 60.'}
                </p>
              </div>

              {/* Grades Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-music-card border border-music-border text-center">
                  <span className="text-music-inkMuted block text-[11px] font-semibold">Solfège & Rythme</span>
                  <span className="text-lg font-mono font-black text-music-ink mt-1 block">
                    {myEval.solfegeScore} <span className="text-[11px] text-music-inkLight font-sans">/20</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-music-card border border-music-border text-center">
                  <span className="text-music-inkMuted block text-[11px] font-semibold">Technique & Doigté</span>
                  <span className="text-lg font-mono font-black text-music-ink mt-1 block">
                    {myEval.techniqueScore} <span className="text-[11px] text-music-inkLight font-sans">/20</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-music-card border border-music-border text-center">
                  <span className="text-music-inkMuted block text-[11px] font-semibold">Musicalité & Nuances</span>
                  <span className="text-lg font-mono font-black text-music-ink mt-1 block">
                    {myEval.musicalityScore} <span className="text-[11px] text-music-inkLight font-sans">/20</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-music-card border border-music-border text-center">
                  <span className="text-music-inkMuted block text-[11px] font-semibold">Implication & Rigueur</span>
                  <span className="text-lg font-mono font-black text-music-ink mt-1 block">
                    {myEval.regularityScore} <span className="text-[11px] text-music-inkLight font-sans">/20</span>
                  </span>
                </div>
              </div>

              {myEval.generalAppreciation && (
                <div className="p-4 rounded-2xl bg-music-paper border border-music-border text-xs">
                  <strong className="block font-bold text-music-ink mb-1">
                    Appréciation Pédagogique du Professeur :
                  </strong>
                  <p className="text-music-ink italic leading-relaxed">
                    « {myEval.generalAppreciation} »
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-music-border text-center text-xs text-music-inkLight">
              Aucune évaluation publiée pour ce mois pour l'instant.
            </div>
          )}

          {/* Observations & Remarques Pédagogiques de Séances */}
          {(() => {
            const sessionsWithRemarks = (attendance || []).filter(
              a => a.studentId === currentStudent.id &&
                   a.note &&
                   a.note !== 'Présent' &&
                   a.note !== 'Absent' &&
                   a.note !== 'Absence justifiée'
            );
            if (sessionsWithRemarks.length === 0) return null;

            return (
              <div className="bg-white rounded-3xl border border-music-border p-6 shadow-soft space-y-3.5">
                <div className="flex items-center space-x-2.5 pb-3 border-b border-music-borderLight">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-200 text-music-gold flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-music-ink">
                      Remarques & Conseils du Professeur lors des Séances
                    </h4>
                    <p className="text-[11px] text-music-inkMuted">
                      Points techniques, posture et conseils personnalisés notés durant vos cours
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sessionsWithRemarks.map(s => (
                    <div key={s.id} className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs">
                      <div className="flex justify-between items-center text-[10px] font-bold text-amber-900 mb-1.5">
                        <span className="bg-white px-2 py-0.5 rounded-md border border-amber-200">Séance #{s.sessionNumber}</span>
                        <span>{s.day} {s.date}</span>
                      </div>
                      <p className="text-music-ink italic leading-relaxed">
                        « {s.note} »
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* SUB-TAB 3: SIMULATEUR CLAVIER & GAMMES */}
      {activeSubTab === 'piano' && (
        <PianoScaleSimulator />
      )}

      {/* Modal: Ajouter une Pièce au Répertoire de l'Apprenant */}
      <AddPieceStudentModal
        isOpen={isAddPieceModalOpen}
        onClose={() => setIsAddPieceModalOpen(false)}
        onPieceAdded={(newPiece) => {
          setSelectedPieceId(newPiece.id);
        }}
        currentStudent={currentStudent}
      />

    </div>
  );
}
