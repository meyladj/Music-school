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
  Printer,
  Search,
  Filter,
  UserCheck,
  AlertCircle,
  Play,
  Volume2,
  Compass,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  ExternalLink
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
    setIsMetronomeOpen,
    showToast,
    t
  } = useApp();

  // Active student tab: 'courses' | 'partitions' | 'exercises' | 'pieces' | 'piano' | 'grades'
  const [activeSubTab, setActiveSubTab] = useState('courses');
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const [isAddPieceModalOpen, setIsAddPieceModalOpen] = useState(false);

  // Partition library filters inside the student space
  const [searchScore, setSearchScore] = useState('');
  const [scoreInstrumentFilter, setScoreInstrumentFilter] = useState('Tous');
  const [scoreLevelFilter, setScoreLevelFilter] = useState('Tous');
  const [scoreCategoryFilter, setScoreCategoryFilter] = useState('Tous');

  // Inline custom exercise form state
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [newExForm, setNewExForm] = useState({
    title: '',
    bars: '',
    targetBpm: 60,
    notes: ''
  });

  // Inline custom tip form state
  const [isAddingTip, setIsAddingTip] = useState(false);
  const [newTipText, setNewTipText] = useState('');

  // Contact modal / alert state
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubject, setContactSubject] = useState('Rattrapage de cours');

  if (!currentStudent) {
    return (
      <div className="text-center py-16 text-[#665E56] font-sans">
        <GraduationCap className="w-12 h-12 mx-auto text-[#C99738] mb-3 opacity-60" />
        <p className="font-serif text-lg font-bold text-[#1C1814]">Aucun profil étudiant actif</p>
        <p className="text-xs text-[#8C8377] mt-1">Veuillez vous reconnecter depuis le menu principal.</p>
      </div>
    );
  }

  const teacher = teachers.find(t => t.id === currentStudent.teacherId) || teachers[0];
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

  // Filter student library scores
  const filteredScores = library.filter(item => {
    const matchInst = scoreInstrumentFilter === 'Tous' || item.instrument === scoreInstrumentFilter || item.instrument === 'Tous';
    const matchLevel = scoreLevelFilter === 'Tous' || item.level?.toLowerCase().includes(scoreLevelFilter.toLowerCase());
    const matchCat = scoreCategoryFilter === 'Tous' || item.category === scoreCategoryFilter;
    const matchSearch = `${item.title} ${item.author} ${item.description || ''}`.toLowerCase().includes(searchScore.toLowerCase());
    return matchInst && matchLevel && matchCat && matchSearch;
  });

  // Add library score to student active pieces
  const handleAddLibraryScoreToRepertoire = (item) => {
    const alreadyExists = myPieces.some(p => p.title.toLowerCase().trim() === item.title.toLowerCase().trim());
    if (alreadyExists) {
      showToast?.(`"${item.title}" est déjà dans votre répertoire d'étude.`, 'info');
      return;
    }

    const newPiece = {
      studentId: currentStudent.id,
      title: item.title,
      composer: item.author,
      difficulty: item.level || 'Intermédiaire 1',
      tempo: item.tempo || 'Moderato (80 BPM)',
      key: item.key || 'Do Majeur',
      progress: 0,
      status: 'decouverte',
      teacherNotes: item.description || 'Pièce sélectionnée dans la médiathèque du conservatoire.',
      assignedDate: new Date().toLocaleDateString('fr-FR'),
      sheetUrl: '#',
      tips: [
        'Déchiffrer les 16 premières mesures mains séparées avec métronome très lent.',
        'Respecter scrupuleusement les doigtés indiqués sur la partition.',
        'Veiller à la relaxation musculaire des bras et des poignets.'
      ],
      exercises: [
        {
          id: 'ex-sc-' + Date.now(),
          title: 'Déchiffrage et repérage des harmonies (Mesures 1 à 8)',
          bpm: 60,
          target: 'Mesures 1 à 8',
          advice: 'Lire les notes à haute voix avant de jouer pour fluidifier la lecture à vue.',
          completed: false,
          duration: '10 min / jour'
        },
        {
          id: 'ex-sc-' + (Date.now() + 1),
          title: 'Travail du phrasé au tempo de travail (BPM modéré)',
          bpm: 72,
          target: 'Thème A',
          advice: 'Maintenir la régularité rythmique sans modifier la pulsation.',
          completed: false,
          duration: '15 min / jour'
        }
      ]
    };

    addPiece(newPiece);
    setSelectedPieceId(newPiece.id);
    showToast?.(`« ${item.title} » a été ajoutée à votre répertoire d'étude !`);
  };

  // Student studio rooms mapping
  const instrumentRoomMap = {
    'Piano': { name: 'Studio Debussy (N°3)', desc: 'Piano à queue Yamaha C3, acoustique isolée RT60' },
    'Violon': { name: 'Studio Ravel (N°2)', desc: 'Pupitres de concert, miroirs d’alignement postural' },
    'Guitare': { name: 'Studio Tarrega (N°4)', desc: 'Acoustique boisée chaleureuse, repose-pieds et supports' },
    'Oud': { name: 'Studio Ziryab (N°1)', desc: 'Espace traditionnel, micros statiques et enregistrement' },
    'Chant': { name: 'Studio Callas (N°5)', desc: 'Piano droit d’accompagnement, traitement vocal et miroir' },
    'Batterie': { name: 'Studio Bonham (N°6)', desc: 'Batterie acoustique insonorisée, pads de précision' },
    'Solfège & Éveil': { name: 'Salle Polyphonie (RDC)', desc: 'Claviers maîtres, tableau de portées, écran d’écoute' }
  };

  const studentRoom = instrumentRoomMap[currentStudent.instrument] || {
    name: 'Studio Pédagogique Principal',
    desc: 'Instruments de conservatoire certifiés ACA'
  };

  // Sessions for current student
  const studentSessions = (attendance || []).filter(a => a.studentId === currentStudent.id);
  const presentSessionsCount = studentSessions.filter(s => s.status === 'present').length;
  const plannedSessionsCount = studentSessions.filter(s => s.status === 'planned').length;
  const attendanceRate = studentSessions.length > 0
    ? Math.round((presentSessionsCount / (studentSessions.length - plannedSessionsCount || 1)) * 100)
    : 100;

  return (
    <div className="space-y-6 select-none font-sans text-[#1C1814]">
      
      {/* 1. Light Luminous Student Banner */}
      <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF4EA] to-[#FFFDF9] text-[#1C1814] p-6 sm:p-7 rounded-3xl shadow-soft border border-[#EAE5DD] relative overflow-hidden">
        <div className="absolute inset-0 stave-pattern-light pointer-events-none opacity-40"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4 sm:space-x-5">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.firstName}
              className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover border-2 border-[#C99738] shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold bg-[#1C1814] text-[#E5CEB4] px-2.5 py-0.5 rounded-lg shadow-xs">
                  {currentStudent.matricule}
                </span>
                <span className="text-xs text-[#614217] font-bold bg-[#F4EBE0] px-2.5 py-0.5 rounded-lg border border-[#E5CEB4]">
                  {currentStudent.level}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-1.5 text-[#1C1814]">
                Bonjour, {currentStudent.firstName} {currentStudent.lastName}
              </h2>
              <p className="text-xs sm:text-sm text-[#665E56] mt-1 flex items-center space-x-2">
                <Music className="w-4 h-4 text-[#C99738] inline shrink-0" />
                <span>Classe de <strong className="text-[#1C1814]">{currentStudent.instrument}</strong> • Prof. {teacher ? teacher.name : 'Professeur'}</span>
              </p>
            </div>
          </div>

          {/* Next Lesson Box */}
          <div className="bg-white/95 backdrop-blur-xs px-5 py-4 rounded-2xl border border-[#EAE5DD] min-w-[260px] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#8C8377] uppercase tracking-wider block">
                Prochaine Séance en Atelier :
              </span>
              <div className="text-base font-bold text-[#1C1814] mt-1 flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#C99738]" />
                <span>{currentStudent.scheduleDays?.split('&')[0] || 'Mercredi 16h30'}</span>
              </div>
            </div>
            <div className="text-[11px] text-[#665E56] mt-2 pt-2 border-t border-[#F0EBE1] flex items-center justify-between">
              <span>{studentRoom.name}</span>
              <span className="text-[#2E7D32] font-semibold">Confirmé</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Musical Pedagogical KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* Active Repertoire */}
        <button
          type="button"
          onClick={() => setActiveSubTab('pieces')}
          className="bg-white p-5 rounded-3xl border border-[#EAE5DD] shadow-soft text-left hover:border-[#C99738] transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C8377] uppercase tracking-wider">Répertoire Actif</span>
            <Music className="w-4 h-4 text-[#C99738] group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-mono font-bold text-[#1C1814] mt-1.5">
            {myPieces.length} <span className="text-xs font-sans text-[#8C8377] font-normal">morceaux</span>
          </div>
          <p className="text-[11px] text-[#665E56] mt-0.5">
            Pièces d'étude assignées
          </p>
        </button>

        {/* Tailored Exercises */}
        <button
          type="button"
          onClick={() => setActiveSubTab('exercises')}
          className="bg-white p-5 rounded-3xl border border-[#EAE5DD] shadow-soft text-left hover:border-[#C99738] transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C8377] uppercase tracking-wider">Exercices & Gammes</span>
            <Target className="w-4 h-4 text-[#2E7D32] group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-mono font-bold text-[#2E7D32] mt-1.5">
            {validatedExercises} / {totalExercises}
          </div>
          <p className="text-[11px] text-[#2E7D32] font-semibold mt-0.5">
            {overallExercisesRate}% d'objectifs validés
          </p>
        </button>

        {/* Partitions & Library Catalog */}
        <button
          type="button"
          onClick={() => setActiveSubTab('partitions')}
          className="bg-white p-5 rounded-3xl border border-[#EAE5DD] shadow-soft text-left hover:border-[#C99738] transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C8377] uppercase tracking-wider">Partitions Disponibles</span>
            <BookOpen className="w-4 h-4 text-[#8C6B28] group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-mono font-bold text-[#1C1814] mt-1.5">
            {library.length} <span className="text-xs font-sans text-[#8C8377] font-normal">titres</span>
          </div>
          <p className="text-[11px] text-[#8C6B28] font-semibold mt-0.5">
            Partitions, méthodes & play-along
          </p>
        </button>

        {/* ACA Evaluation Report Card */}
        <button
          type="button"
          onClick={() => setActiveSubTab('grades')}
          className="bg-white p-5 rounded-3xl border border-[#EAE5DD] shadow-soft text-left hover:border-[#C99738] transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C8377] uppercase tracking-wider">Bulletin du Mois</span>
            <Award className="w-4 h-4 text-[#6A1B9A] group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-mono font-bold text-[#4A148C] mt-1.5">
            {myEval ? (
              ((myEval.solfegeScore + myEval.techniqueScore + myEval.musicalityScore + myEval.regularityScore) / 4).toFixed(1)
            ) : '17.5'}{' '}
            <span className="text-xs text-[#8C8377] font-sans">/ 20</span>
          </div>
          <p className="text-[11px] text-[#2E7D32] font-semibold mt-0.5">
            Mention Très Bien
          </p>
        </button>

      </div>

      {/* 3. Main Student Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#EAE5DD] pb-3 overflow-x-auto">
        
        {/* Tab: Mes Cours & Agenda */}
        <button
          type="button"
          onClick={() => setActiveSubTab('courses')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition whitespace-nowrap ${
            activeSubTab === 'courses'
              ? 'bg-[#1C1814] text-white shadow-sm'
              : 'bg-white text-[#665E56] hover:bg-[#F4EFEA] hover:text-[#1C1814] border border-[#EAE5DD]'
          }`}
        >
          <Calendar className={`w-3.5 h-3.5 ${activeSubTab === 'courses' ? 'text-[#E5CEB4]' : 'text-[#8C8377]'}`} />
          <span>Mes Cours & Agenda</span>
        </button>

        {/* Tab: Partitions & Médiathèque */}
        <button
          type="button"
          onClick={() => setActiveSubTab('partitions')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition whitespace-nowrap ${
            activeSubTab === 'partitions'
              ? 'bg-[#1C1814] text-white shadow-sm'
              : 'bg-white text-[#665E56] hover:bg-[#F4EFEA] hover:text-[#1C1814] border border-[#EAE5DD]'
          }`}
        >
          <BookOpen className={`w-3.5 h-3.5 ${activeSubTab === 'partitions' ? 'text-[#E5CEB4]' : 'text-[#8C8377]'}`} />
          <span>Partitions & Médiathèque</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            activeSubTab === 'partitions' ? 'bg-[#C99738] text-white' : 'bg-[#F2ECE3] text-[#4A433B]'
          }`}>
            {library.length}
          </span>
        </button>

        {/* Tab: Mes Exercices & Gammes */}
        <button
          type="button"
          onClick={() => setActiveSubTab('exercises')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition whitespace-nowrap ${
            activeSubTab === 'exercises'
              ? 'bg-[#1C1814] text-white shadow-sm'
              : 'bg-white text-[#665E56] hover:bg-[#F4EFEA] hover:text-[#1C1814] border border-[#EAE5DD]'
          }`}
        >
          <Target className={`w-3.5 h-3.5 ${activeSubTab === 'exercises' ? 'text-[#E5CEB4]' : 'text-[#8C8377]'}`} />
          <span>Mes Exercices & Gammes</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            activeSubTab === 'exercises' ? 'bg-[#2E7D32] text-white' : 'bg-[#E8F5E9] text-[#1B5E20]'
          }`}>
            {validatedExercises}/{totalExercises}
          </span>
        </button>

        {/* Tab: Mon Répertoire Actif */}
        <button
          type="button"
          onClick={() => setActiveSubTab('pieces')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition whitespace-nowrap ${
            activeSubTab === 'pieces'
              ? 'bg-[#1C1814] text-white shadow-sm'
              : 'bg-white text-[#665E56] hover:bg-[#F4EFEA] hover:text-[#1C1814] border border-[#EAE5DD]'
          }`}
        >
          <Music className={`w-3.5 h-3.5 ${activeSubTab === 'pieces' ? 'text-[#E5CEB4]' : 'text-[#8C8377]'}`} />
          <span>Mon Répertoire Actif</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            activeSubTab === 'pieces' ? 'bg-[#C99738] text-white' : 'bg-[#F2ECE3] text-[#4A433B]'
          }`}>
            {myPieces.length}
          </span>
        </button>

        {/* Tab: Simulateur Clavier & Solfège */}
        <button
          type="button"
          onClick={() => setActiveSubTab('piano')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition whitespace-nowrap ${
            activeSubTab === 'piano'
              ? 'bg-[#1C1814] text-white shadow-sm'
              : 'bg-white text-[#665E56] hover:bg-[#F4EFEA] hover:text-[#1C1814] border border-[#EAE5DD]'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${activeSubTab === 'piano' ? 'text-[#E5CEB4]' : 'text-[#C99738]'}`} />
          <span>Simulateur Clavier & Gammes</span>
        </button>

        {/* Tab: Carnet de Notes & Devoirs */}
        <button
          type="button"
          onClick={() => setActiveSubTab('grades')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition whitespace-nowrap ${
            activeSubTab === 'grades'
              ? 'bg-[#1C1814] text-white shadow-sm'
              : 'bg-white text-[#665E56] hover:bg-[#F4EFEA] hover:text-[#1C1814] border border-[#EAE5DD]'
          }`}
        >
          <Award className={`w-3.5 h-3.5 ${activeSubTab === 'grades' ? 'text-[#E5CEB4]' : 'text-[#8C8377]'}`} />
          <span>Carnet de Notes & Devoirs</span>
        </button>

      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MES COURS & AGENDA PÉDAGOGIQUE                                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'courses' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Active Course Card */}
          <div className="bg-white rounded-3xl border border-[#EAE5DD] p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F0EBE1]">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#F4EBE0] text-[#614217] border border-[#E5CEB4]">
                    Classe de {currentStudent.instrument}
                  </span>
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
                    Inscription Active ACA 2026
                  </span>
                </div>

                <h3 className="font-serif font-bold text-2xl text-[#1C1814]">
                  Parcours Instrumental & Formation Musicale
                </h3>
                <p className="text-xs text-[#665E56] max-w-2xl leading-relaxed">
                  Enseignement officiel homologué par l'American Canadian Academy. Formule combinant cours individuel d'instrument de 45 minutes et atelier d'ensemble hebdomadaire.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#1C1814] hover:bg-[#2F2923] text-white font-semibold text-xs shadow-xs transition"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E5CEB4]" />
                  <span>Contacter le Secrétariat / Demande de Rattrapage</span>
                </button>
              </div>
            </div>

            {/* Course Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              
              {/* Teacher Info */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-3">
                <span className="text-[10px] font-bold text-[#8C8377] uppercase tracking-wider block">
                  Professeur Référent :
                </span>
                <div className="flex items-center space-x-3.5">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#D9D3CA]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1C1814]">{teacher.name}</h4>
                    <p className="text-[11px] text-[#665E56]">{teacher.instrument}</p>
                    <p className="text-[10px] text-[#8C8377] mt-0.5">{teacher.email}</p>
                  </div>
                </div>
                <p className="text-xs text-[#665E56] italic leading-relaxed pt-1 border-t border-[#EAE5DD]">
                  « {teacher.bio} »
                </p>
              </div>

              {/* Schedule and Timetable */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-3">
                <span className="text-[10px] font-bold text-[#8C8377] uppercase tracking-wider block">
                  Horaires Hebdomadaires :
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-[#1C1814] font-semibold">
                    <Calendar className="w-4 h-4 text-[#C99738]" />
                    <span>{currentStudent.scheduleDays}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#665E56]">
                    <Clock className="w-4 h-4 text-[#8C8377]" />
                    <span>{currentStudent.sessionsPerWeek} séances d'atelier par semaine</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#665E56]">
                    <MapPin className="w-4 h-4 text-[#8C8377]" />
                    <span>{studentRoom.name}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#8C8377] pt-1 border-t border-[#EAE5DD]">
                  Équipement : {studentRoom.desc}
                </p>
              </div>

              {/* Attendance and Progress */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#8C8377] uppercase tracking-wider block">
                    Assiduité & Ponctualité :
                  </span>
                  <div className="text-3xl font-mono font-bold text-[#2E7D32] mt-1">
                    {attendanceRate}%
                  </div>
                  <p className="text-xs text-[#665E56] mt-0.5">
                    {presentSessionsCount} séances honorées sur {studentSessions.length - plannedSessionsCount} effectuées ce mois-ci.
                  </p>
                </div>
                <div className="text-[11px] text-[#2E7D32] font-semibold flex items-center space-x-1 pt-2 border-t border-[#EAE5DD]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Dossier d'assiduité exemplaire</span>
                </div>
              </div>

            </div>
          </div>

          {/* Timetable / Sessions History Table */}
          <div className="bg-white rounded-3xl border border-[#EAE5DD] p-6 sm:p-8 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
              <div>
                <h4 className="font-serif font-bold text-lg text-[#1C1814]">
                  Emploi du Temps & Suivi des Séances (Septembre 2026)
                </h4>
                <p className="text-xs text-[#665E56] mt-0.5">
                  Consultez le déroulement de vos cours passés et les dates des prochaines répétitions.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#8C8377] bg-[#F4EFEA] px-3 py-1 rounded-xl">
                {studentSessions.length} séances au total
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#EAE5DD] text-[#8C8377] uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Séance</th>
                    <th className="py-3 px-3">Date & Jour</th>
                    <th className="py-3 px-3">Statut</th>
                    <th className="py-3 px-4">Remarques & Conseils du Professeur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE1]">
                  {studentSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-[#FAF8F5] transition">
                      <td className="py-3.5 px-3 font-mono font-bold text-[#1C1814]">
                        #{session.sessionNumber}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-[#1C1814]">
                        {session.day} {session.date}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          session.status === 'present'
                            ? 'bg-[#E8F5E9] text-[#1B5E20]'
                            : session.status === 'absent_excused'
                            ? 'bg-[#FFF3E0] text-[#E65100]'
                            : session.status === 'planned'
                            ? 'bg-[#E3F2FD] text-[#0D47A1]'
                            : 'bg-[#FFEBEE] text-[#C62828]'
                        }`}>
                          {session.status === 'present'
                            ? 'Présent'
                            : session.status === 'absent_excused'
                            ? 'Absence justifiée'
                            : session.status === 'planned'
                            ? 'Séance à venir'
                            : 'Absent'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#665E56] italic">
                        « {session.note || 'Séance conforme au programme pédagogique.'} »
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Teacher Remarks Callout */}
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#E5CEB4] p-6 sm:p-8 shadow-soft space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-[#E5CEB4]/60">
              <div className="w-10 h-10 rounded-2xl bg-[#F4EBE0] border border-[#E5CEB4] flex items-center justify-center text-[#C99738]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1814]">
                  Dernières Remarques Pédagogiques du Professeur
                </h4>
                <p className="text-xs text-[#665E56]">
                  Points techniques, posture et conseils personnalisés délivrés durant vos séances en atelier.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {studentSessions
                .filter(s => s.note && s.note !== 'Présent' && s.note !== 'Séance à venir')
                .map(s => (
                  <div key={s.id} className="p-4 rounded-2xl bg-white border border-[#E5CEB4]/80 shadow-2xs space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-bold text-[#614217]">
                      <span className="bg-[#FAF8F5] px-2.5 py-0.5 rounded-md border border-[#E5CEB4]">
                        Séance #{s.sessionNumber}
                      </span>
                      <span>{s.day} {s.date}</span>
                    </div>
                    <p className="text-xs text-[#1C1814] italic leading-relaxed pt-1">
                      « {s.note} »
                    </p>
                  </div>
                ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PARTITIONS & MÉDIATHÈQUE (PLEINS DE PARTITIONS)                     */}
      {/* ========================================================================= */}
      {activeSubTab === 'partitions' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header & Stats Banner */}
          <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF4EA] to-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#EAE5DD] shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F4EBE0] text-[#614217] border border-[#E5CEB4]">
                  Médiathèque Officielle
                </span>
                <span className="text-xs text-[#8C8377] font-semibold">Îlot Musique Alger</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1C1814] mt-1.5">
                Fonds de Partitions & Ouvrages Pédagogiques
              </h3>
              <p className="text-xs text-[#665E56] mt-1 max-w-2xl leading-relaxed">
                Accédez à plus de 30 partitions officielles, méthodes classiques et Play-Along téléchargeables en PDF haute définition et visualisables sur pupitre interactif.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <span className="text-xs font-mono font-bold px-4 py-2 rounded-2xl bg-white border border-[#EAE5DD] text-[#1C1814] shadow-2xs">
                {filteredScores.length} partitions affichées
              </span>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-5 rounded-3xl border border-[#EAE5DD] shadow-soft space-y-3.5">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#8C8377] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchScore}
                  onChange={(e) => setSearchScore(e.target.value)}
                  placeholder="Rechercher une partition, un compositeur..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#D9D3CA] text-xs focus:outline-none focus:ring-2 focus:ring-[#C99738]/40 focus:border-[#C99738] bg-[#FAF8F5]"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {['Tous', 'Partitions', 'Livres', 'Théorie & Solfège', 'Audios'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setScoreCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                      scoreCategoryFilter === cat
                        ? 'bg-[#1C1814] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-[#665E56] hover:bg-[#F2ECE3] border border-[#EAE5DD]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Instrument Buttons Filter */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pt-2 border-t border-[#F0EBE1]">
              <span className="text-xs text-[#8C8377] font-semibold mr-1 flex items-center shrink-0">
                <Filter className="w-3 h-3 mr-1" /> Discipline :
              </span>
              {['Tous', 'Piano', 'Violon', 'Guitare', 'Batterie', 'Chant', 'Oud', 'Solfège & Éveil'].map(inst => (
                <button
                  key={inst}
                  onClick={() => setScoreInstrumentFilter(inst)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    scoreInstrumentFilter === inst
                      ? 'bg-[#C99738] text-white shadow-xs'
                      : 'bg-white text-[#665E56] hover:bg-[#FAF8F5] border border-[#EAE5DD]'
                  }`}
                >
                  {inst}
                </button>
              ))}
            </div>
          </div>

          {/* Scores Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScores.map(scoreItem => {
              const isAlreadyInRepertoire = myPieces.some(
                p => p.title.toLowerCase().trim() === scoreItem.title.toLowerCase().trim()
              );

              return (
                <div
                  key={scoreItem.id}
                  className="bg-white rounded-3xl border border-[#EAE5DD] hover:border-[#C99738] p-5 shadow-soft hover:shadow-card transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Tags */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#F4EBE0] text-[#614217] border border-[#E5CEB4]">
                        {scoreItem.instrument}
                      </span>
                      <span className="text-[10px] font-medium text-[#8C8377] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#EAE5DD]">
                        {scoreItem.level || 'Tous niveaux'}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#1C1814] group-hover:text-[#8C6B28] transition leading-snug">
                      {scoreItem.title}
                    </h4>
                    <p className="text-xs text-[#665E56] italic mt-0.5">
                      {scoreItem.author}
                    </p>

                    <p className="text-xs text-[#665E56] leading-relaxed mt-2.5 line-clamp-2">
                      {scoreItem.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0EBE1] space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#8C8377] font-mono">
                      <span>{scoreItem.tempo || scoreItem.pages + ' pages'}</span>
                      <span className="font-semibold text-[#1C1814]">{scoreItem.key || scoreItem.format}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDocumentToView(scoreItem)}
                        className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE3] text-[#1C1814] font-semibold text-xs border border-[#D9D3CA] transition shadow-2xs"
                        title="Visualiser la partition sur pupitre interactif"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C99738]" />
                        <span>Visualiser</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => downloadPieceScore(scoreItem, `${currentStudent.firstName} ${currentStudent.lastName}`)}
                        className="p-2 rounded-xl bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#1B5E20] border border-[#A5D6A7] transition"
                        title="Télécharger la partition PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      {isAlreadyInRepertoire ? (
                        <span 
                          className="px-2.5 py-2 rounded-xl bg-[#F4EBE0] text-[#614217] text-[10px] font-bold border border-[#E5CEB4] flex items-center"
                          title="Cette partition est déjà dans votre répertoire d'étude"
                        >
                          <Check className="w-3 h-3 mr-1" /> Au répertoire
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddLibraryScoreToRepertoire(scoreItem)}
                          className="p-2 rounded-xl bg-[#1C1814] hover:bg-[#2F2923] text-white transition"
                          title="Ajouter à mes morceaux d'étude"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#E5CEB4]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MES EXERCICES & GAMMES                                              */}
      {/* ========================================================================= */}
      {activeSubTab === 'exercises' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header Banner with Overall Progress */}
          <div className="bg-white rounded-3xl border border-[#EAE5DD] p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0EBE1]">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
                    Programme Technique
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#1C1814]">
                    Mes Exercices Dédiés, Gammes & Routines Quotidiennes
                  </h3>
                </div>
                <p className="text-xs text-[#665E56] mt-1">
                  Validez vos objectifs techniques par morceau et pratiquez vos gammes avec tempo au métronome.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setIsMetronomeOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#F2ECE3] text-[#1C1814] font-semibold text-xs border border-[#D9D3CA] transition shadow-2xs"
                >
                  <Clock className="w-4 h-4 text-[#C99738]" />
                  <span>Ouvrir le Métronome</span>
                </button>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="pt-6 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#1C1814]">Taux de Maîtrise Technique :</span>
                <span className="font-mono font-bold text-[#2E7D32] text-sm">
                  {validatedExercises} / {totalExercises} validés ({overallExercisesRate}%)
                </span>
              </div>
              <div className="w-full bg-[#FAF8F5] h-3 rounded-full overflow-hidden border border-[#EAE5DD]">
                <div
                  className="h-full bg-gradient-to-r from-[#C99738] to-[#2E7D32] rounded-full transition-all duration-500"
                  style={{ width: `${overallExercisesRate}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Section: Exercices par Morceau d'Étude */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#8C8377] uppercase tracking-wider">
              1. Exercices Ciblés par Morceau ({totalExercises}) :
            </h4>

            {myPieces.map(piece => {
              if (!piece.exercises || piece.exercises.length === 0) return null;

              return (
                <div key={piece.id} className="bg-white rounded-3xl border border-[#EAE5DD] p-5 sm:p-6 shadow-soft space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#F4EBE0] border border-[#E5CEB4] flex items-center justify-center text-[#C99738]">
                        <Music className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-serif font-bold text-sm text-[#1C1814]">
                          {piece.title} — <span className="font-sans text-xs text-[#665E56] font-normal">{piece.composer}</span>
                        </h5>
                        <span className="text-[10px] font-mono text-[#8C8377]">
                          Tonalité : {piece.key} • Niveau {piece.difficulty}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-[#2E7D32]">
                      {piece.exercises.filter(e => e.completed).length} / {piece.exercises.length} acquis
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {piece.exercises.map(ex => (
                      <div
                        key={ex.id}
                        className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          ex.completed
                            ? 'bg-[#E8F5E9]/50 border-[#C8E6C9]'
                            : 'bg-[#FAF8F5] hover:bg-white border-[#EAE5DD]'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <button
                            type="button"
                            onClick={() => togglePieceExercise(piece.id, ex.id)}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center transition shrink-0 mt-0.5 ${
                              ex.completed
                                ? 'bg-[#2E7D32] text-white shadow-xs'
                                : 'border-2 border-[#D9D3CA] text-transparent hover:border-[#C99738] bg-white'
                            }`}
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>

                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className={`text-xs font-bold ${ex.completed ? 'text-[#1B5E20] line-through' : 'text-[#1C1814]'}`}>
                                {ex.title}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white text-[#665E56] border border-[#EAE5DD]">
                                {ex.target || ex.bars || 'Toutes mesures'}
                              </span>
                              {(ex.targetBpm || ex.bpm) && (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#F4EBE0] text-[#614217] border border-[#E5CEB4]">
                                  {ex.targetBpm || ex.bpm} BPM
                                </span>
                              )}
                            </div>
                            <p className={`text-xs leading-relaxed ${ex.completed ? 'text-[#1B5E20]' : 'text-[#665E56]'}`}>
                              {ex.advice || ex.notes}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center space-x-2 self-end sm:self-auto">
                          <button
                            type="button"
                            onClick={() => togglePieceExercise(piece.id, ex.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                              ex.completed
                                ? 'bg-[#C8E6C9] text-[#1B5E20]'
                                : 'bg-white hover:bg-[#E8F5E9] text-[#1C1814] border border-[#D9D3CA]'
                            }`}
                          >
                            {ex.completed ? 'Objectif Validé' : 'Marquer Acquis'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section: Gammes et Arpèges Fondamentaux */}
          <div className="bg-white rounded-3xl border border-[#EAE5DD] p-6 sm:p-8 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F4EBE0] border border-[#E5CEB4] flex items-center justify-center text-[#C99738]">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1C1814]">
                    Gammes & Arpèges d'Étude du Conservatoire
                  </h4>
                  <p className="text-xs text-[#665E56]">
                    Programme de travail digital quotidien pour votre instrument.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMetronomeOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE3] text-[#1C1814] border border-[#D9D3CA] text-xs font-semibold"
              >
                Lancer Métronome
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                {
                  title: 'Gamme de Do Majeur (2 octaves)',
                  finger: 'MD: 1-2-3-1-2-3-4-5 • MG: 5-4-3-2-1-3-2-1',
                  bpm: '60 -> 100 BPM',
                  note: 'Égalité parfaite des doigts et passage souple du pouce.'
                },
                {
                  title: 'Gamme de Sol Majeur (1 dièse : Fa#)',
                  finger: 'Doigtés standards, écoute attentive de la note sensible',
                  bpm: '60 -> 90 BPM',
                  note: 'Veiller à la justesse du Fa# et à la fluidité en descente.'
                },
                {
                  title: 'Gamme de Fa Majeur (1 bémol : Si♭)',
                  finger: 'MD: 1-2-3-4-1-2-3-4 • MG: 5-4-3-2-1-3-2-1',
                  bpm: '60 -> 90 BPM',
                  note: 'Attention au passage du pouce après le Si bémol à la main droite.'
                },
                {
                  title: 'Gamme de La mineur harmonique',
                  finger: 'Sensible Sol# avec intervalle de seconde augmentée',
                  bpm: '56 -> 84 BPM',
                  note: 'Garder le poignet droit et ne pas accentuer le Sol#.'
                },
                {
                  title: 'Arpèges Fondamentaux en Accords Brisés',
                  finger: 'Mains ensemble sur accords parfaits majeurs et mineurs',
                  bpm: '50 -> 80 BPM',
                  note: 'Relâcher la paume et préparer la position suivante par anticipation.'
                },
                {
                  title: 'Exercice Rythmique d’Indépendance 4/4',
                  finger: 'Binaire contre ternaire (triolets à droite, croches à gauche)',
                  bpm: '72 BPM',
                  note: 'Compter à haute voix pour stabiliser la pulsation interne.'
                }
              ].map((g, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-2">
                  <div className="flex justify-between items-start">
                    <h5 className="font-serif font-bold text-xs text-[#1C1814]">{g.title}</h5>
                    <span className="font-mono text-[10px] text-[#614217] bg-[#F4EBE0] px-2 py-0.5 rounded-md border border-[#E5CEB4]">
                      {g.bpm}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#8C8377]">{g.finger}</p>
                  <p className="text-[11px] text-[#665E56] italic">{g.note}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: MON RÉPERTOIRE ACTIF (PIÈCES ASSIGNÉES)                             */}
      {/* ========================================================================= */}
      {activeSubTab === 'pieces' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header & Repertoire Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE5DD] shadow-soft">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C99738]"></span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1814]">
                  Mon Répertoire Musical Actif
                </h3>
              </div>
              <p className="text-xs text-[#665E56] mt-1">
                Gérez vos morceaux d'étude, consultez les astuces de votre professeur et téléchargez vos partitions officielles.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsAddPieceModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#C99738] hover:bg-[#8C6B28] text-white font-semibold text-xs shadow-soft transition"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un Morceau</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('partitions')}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#F4EBE0] hover:bg-[#E5CEB4] text-[#614217] font-semibold text-xs border border-[#E5CEB4] transition shadow-2xs"
              >
                <BookOpen className="w-4 h-4 text-[#C99738]" />
                <span>Parcourir la Médiathèque</span>
              </button>
            </div>
          </div>

          {/* Pieces Cards Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#8C8377] uppercase tracking-wider mb-2.5">
              Morceaux d'étude en cours ({myPieces.length}) :
            </label>

            {myPieces.length === 0 ? (
              <div className="bg-white rounded-3xl border-2 border-dashed border-[#D9D3CA] p-8 text-center space-y-3">
                <Music className="w-12 h-12 text-[#C99738] mx-auto opacity-60" />
                <h4 className="font-serif font-bold text-base text-[#1C1814]">Votre répertoire d'étude est vide</h4>
                <p className="text-xs text-[#665E56] max-w-md mx-auto">
                  Choisissez une partition dans la médiathèque ou ajoutez un morceau pour démarrer votre programme de travail !
                </p>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('partitions')}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#C99738] hover:bg-[#8C6B28] text-white font-semibold text-xs shadow-soft transition"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explorer les Partitions</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
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
                          ? 'bg-gradient-to-br from-[#F4EBE0]/90 via-white to-[#FAF8F5] border-[#C99738] shadow-md ring-2 ring-[#C99738]/40'
                          : 'bg-white hover:bg-[#FAF8F5] border-[#EAE5DD] shadow-soft hover:shadow-card'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-mono font-bold text-[#8C8377] uppercase tracking-wider">
                            {piece.difficulty} • {piece.key}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            piece.status === 'maitrise'
                              ? 'bg-[#E8F5E9] text-[#1B5E20]'
                              : piece.status === 'nuances'
                              ? 'bg-[#F3E5F5] text-[#4A148C]'
                              : 'bg-[#FFF3E0] text-[#E65100]'
                          }`}>
                            {piece.status === 'maitrise' ? '★ Maîtrisé' : piece.status === 'nuances' ? 'Nuances' : 'Déchiffrage'}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-base text-[#1C1814]">
                          {piece.title}
                        </h4>
                        <p className="text-xs text-[#665E56] italic">
                          {piece.composer}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1.5 text-[#8C8377] text-[11px]">
                          <Music className="w-3.5 h-3.5 text-[#C99738]" />
                          <span>{completedCount}/{totalEx} exercices</span>
                        </div>

                        <span className="font-mono font-bold text-[#1C1814] text-[11px]">
                          {piece.progress}%
                        </span>
                      </div>
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
                <div className="bg-white rounded-3xl border border-[#EAE5DD] p-6 sm:p-8 shadow-soft relative overflow-hidden">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F0EBE1]">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#F4EBE0] text-[#614217] border border-[#E5CEB4]">
                          {activePiece.key}
                        </span>
                        <span className="px-3 py-1 rounded-xl text-xs font-mono text-[#665E56] bg-[#FAF8F5] border border-[#EAE5DD]">
                          {activePiece.tempo}
                        </span>
                        <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#FAF8F5] text-[#1C1814] border border-[#EAE5DD]">
                          Niveau {activePiece.difficulty}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1814]">
                        {activePiece.title}
                      </h2>
                      <p className="text-sm text-[#665E56] font-medium mt-1">
                        Compositeur : <strong className="text-[#1C1814]">{activePiece.composer}</strong> • Recommandé par Prof. {teacher?.name}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => downloadPieceScore(activePiece, `${currentStudent.firstName} ${currentStudent.lastName}`)}
                        className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-xs shadow-soft transition"
                        title="Télécharger la partition officielle au format PDF"
                      >
                        <Download className="w-4 h-4" />
                        <span>Télécharger PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDocumentToView(activePiece)}
                        className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#1C1814] hover:bg-[#2F2923] text-white font-semibold text-xs shadow-soft transition"
                      >
                        <Eye className="w-4 h-4 text-[#E5CEB4]" />
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
                        className="flex items-center space-x-1.5 px-3 py-2.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs border border-red-200 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Retirer</span>
                      </button>
                    </div>
                  </div>

                  {/* Teacher notes and mastery */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    <div className="md:col-span-2 space-y-2">
                      <h4 className="text-xs font-semibold text-[#8C8377] uppercase tracking-wider flex items-center space-x-2">
                        <Award className="w-4 h-4 text-[#C99738]" />
                        <span>Consignes & Conseils Techniques du Professeur :</span>
                      </h4>
                      <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E5CEB4] text-xs text-[#1C1814] leading-relaxed">
                        <p className="italic text-[#614217] font-medium">
                          « {activePiece.teacherNotes || 'Travailler régulièrement au métronome lent avant de monter le tempo final.'} »
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EAE5DD] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#8C8377] uppercase tracking-wider block">
                          Maîtrise Globale
                        </span>
                        <div className="text-3xl font-mono font-bold text-[#1C1814] mt-1">
                          {activePiece.progress}%
                        </div>
                      </div>
                      <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-[#D9D3CA] mt-3">
                        <div
                          className="h-full bg-[#C99738] rounded-full transition-all duration-500"
                          style={{ width: `${activePiece.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-[11px] text-[#8C8377] mt-2">
                        Cochez vos exercices pour faire progresser votre maîtrise.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section: Tipps et Astuces */}
                <div className="bg-[#FFFDF9] rounded-3xl border border-[#E5CEB4] p-6 sm:p-7 shadow-soft space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5CEB4]/60">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#F4EBE0] border border-[#E5CEB4] flex items-center justify-center text-[#C99738]">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1814]">
                          Petits Tipps & Astuces de Pratique
                        </h4>
                        <p className="text-xs text-[#665E56]">
                          Recommandations de méthode et ergonomie du geste pour {activePiece.title}.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAddingTip(!isAddingTip)}
                      className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1C1814] font-semibold text-xs border border-[#D9D3CA] transition shadow-2xs self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#C99738]" />
                      <span>{isAddingTip ? 'Fermer' : 'Ajouter une astuce perso'}</span>
                    </button>
                  </div>

                  {/* Add tip inline form */}
                  {isAddingTip && (
                    <div className="bg-white p-4 rounded-2xl border border-[#E5CEB4] shadow-sm space-y-2.5">
                      <label className="block text-xs font-semibold text-[#1C1814]">
                        Votre astuce ou note de travail personnelle :
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newTipText}
                          onChange={(e) => setNewTipText(e.target.value)}
                          placeholder="Ex: Veiller à relâcher le poignet sur le saut d'octave..."
                          className="flex-1 px-3.5 py-2 rounded-xl border border-[#D9D3CA] text-xs focus:ring-2 focus:ring-[#C99738]/30 focus:border-[#C99738] outline-none"
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
                          className="px-4 py-2 rounded-xl bg-[#C99738] text-white font-semibold text-xs hover:bg-[#8C6B28] transition shadow-xs shrink-0"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Tips list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activePiece.tips && activePiece.tips.length > 0 ? (
                      activePiece.tips.map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-3 p-3.5 rounded-2xl bg-white border border-[#E5CEB4]/70 shadow-2xs"
                        >
                          <span className="w-6 h-6 rounded-lg bg-[#F4EBE0] text-[#614217] border border-[#E5CEB4] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-xs text-[#1C1814] leading-relaxed font-medium">
                            {tip}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-4 text-xs text-[#8C8377] bg-white rounded-2xl border border-dashed border-[#E5CEB4]">
                        Aucune astuce enregistrée pour l'instant.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })()}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SIMULATEUR CLAVIER & SOLFÈGE                                       */}
      {/* ========================================================================= */}
      {activeSubTab === 'piano' && (
        <div className="animate-fadeIn">
          <PianoScaleSimulator />
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: CARNET DE NOTES & DEVOIRS (BULLETIN ACA)                           */}
      {/* ========================================================================= */}
      {activeSubTab === 'grades' && (
        <div className="space-y-6 animate-fadeIn">
          
          {myEval ? (
            <div className="bg-white rounded-3xl border border-[#EAE5DD] p-6 sm:p-8 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0EBE1]">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#1C1814]">
                    Bulletin d'Évaluation Pédagogique — {myEval.period}
                  </h3>
                  <p className="text-xs text-[#665E56] mt-0.5">
                    Conservatoire Îlot Musique Alger • Enseignant référent : {teacher.name}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#8C8377] font-semibold">Moyenne Globale :</span>
                  <span className="px-3 py-1 rounded-xl bg-[#F3E5F5] text-[#4A148C] font-mono font-bold text-sm border border-[#E1BEE7]">
                    {((myEval.solfegeScore + myEval.techniqueScore + myEval.musicalityScore + myEval.regularityScore) / 4).toFixed(1)} / 20
                  </span>
                </div>
              </div>

              {/* Homework Box */}
              <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E5CEB4] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#614217] uppercase tracking-wider">
                    Devoir Pédagogique à Préparer pour la Prochaine Séance :
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleHomeworkDone(currentStudent.id, myEval.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      myEval.homeworkDone
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-white text-[#614217] border border-[#E5CEB4] hover:bg-[#F4EBE0]'
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

                <p className="text-xs text-[#1C1814] font-medium leading-relaxed">
                  {myEval.homework || 'Travailler les mesures 1 à 16 mains séparées avec métronome au tempo lent.'}
                </p>
              </div>

              {/* Grades Detail Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-center">
                  <span className="text-[#8C8377] block text-[11px] font-semibold">Solfège & Rythme</span>
                  <span className="text-xl font-mono font-bold text-[#1C1814] mt-1 block">
                    {myEval.solfegeScore} <span className="text-xs text-[#8C8377]">/ 20</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-center">
                  <span className="text-[#8C8377] block text-[11px] font-semibold">Technique & Doigté</span>
                  <span className="text-xl font-mono font-bold text-[#1C1814] mt-1 block">
                    {myEval.techniqueScore} <span className="text-xs text-[#8C8377]">/ 20</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-center">
                  <span className="text-[#8C8377] block text-[11px] font-semibold">Musicalité & Nuances</span>
                  <span className="text-xl font-mono font-bold text-[#1C1814] mt-1 block">
                    {myEval.musicalityScore} <span className="text-xs text-[#8C8377]">/ 20</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-center">
                  <span className="text-[#8C8377] block text-[11px] font-semibold">Implication & Rigueur</span>
                  <span className="text-xl font-mono font-bold text-[#1C1814] mt-1 block">
                    {myEval.regularityScore} <span className="text-xs text-[#8C8377]">/ 20</span>
                  </span>
                </div>
              </div>

              {/* General Appreciation */}
              {myEval.generalAppreciation && (
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-xs space-y-1">
                  <span className="block font-bold text-[#1C1814]">
                    Appréciation Globale du Professeur :
                  </span>
                  <p className="text-[#665E56] italic leading-relaxed">
                    « {myEval.generalAppreciation} »
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-[#EAE5DD] text-center text-xs text-[#8C8377]">
              Aucun bulletin d'évaluation publié pour l'instant pour ce trimestre.
            </div>
          )}

        </div>
      )}

      {/* Modal: Ajouter une Pièce au Répertoire */}
      <AddPieceStudentModal
        isOpen={isAddPieceModalOpen}
        onClose={() => setIsAddPieceModalOpen(false)}
        onPieceAdded={(newPiece) => {
          setSelectedPieceId(newPiece.id);
          setActiveSubTab('pieces');
        }}
        currentStudent={currentStudent}
      />

      {/* Modal: Contacter le Secrétariat / Demande de Rattrapage */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#EAE5DD] p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
              <h4 className="font-serif font-bold text-lg text-[#1C1814]">
                Demande Pédagogique au Secrétariat
              </h4>
              <button
                type="button"
                onClick={() => setIsContactOpen(false)}
                className="text-[#8C8377] hover:text-[#1C1814]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#665E56]">
              Pour toute demande de rattrapage de cours, aménagement d'horaire ou certificat d'assiduité, veuillez renseigner l'objet ci-dessous.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1C1814] mb-1">Motif de la demande :</label>
                <select
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D9D3CA] bg-[#FAF8F5]"
                >
                  <option>Rattrapage de cours (absence pour motifs scolaires / maladie)</option>
                  <option>Demande d'aménagement d'horaire hebdomadaire</option>
                  <option>Préparation aux examens ACA</option>
                  <option>Autre demande pédagogique</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1C1814] mb-1">Message ou précisions :</label>
                <textarea
                  rows="4"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Indiquez les détails de votre demande..."
                  className="w-full px-3 py-2 rounded-xl border border-[#D9D3CA] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#C99738]/40"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-[#F0EBE1]">
              <button
                type="button"
                onClick={() => setIsContactOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE3] text-[#665E56] font-semibold text-xs border border-[#D9D3CA]"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsContactOpen(false);
                  setContactMessage('');
                  showToast?.('Votre demande a été transmise à la Direction Pédagogique.');
                }}
                className="px-5 py-2 rounded-xl bg-[#1C1814] hover:bg-[#2F2923] text-white font-semibold text-xs shadow-xs"
              >
                Transmettre la demande
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
