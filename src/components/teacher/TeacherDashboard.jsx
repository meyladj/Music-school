import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { downloadPieceScore } from '../../utils/scoreDownload';
import {
  UserCheck,
  Music,
  Award,
  Calendar,
  BookOpen,
  Plus,
  Save,
  CheckCircle,
  Clock,
  Sparkles,
  Trash2,
  Eye,
  Sliders,
  ChevronRight,
  MessageSquare,
  Layers,
  Edit3,
  Check,
  X,
  Download
} from 'lucide-react';

export default function TeacherDashboard() {
  const {
    currentTeacher,
    students,
    classes,
    getTeacherClasses,
    getTeacherStudents,
    pieces,
    addPiece,
    updatePiece,
    deletePiece,
    evaluations,
    saveEvaluation,
    attendance,
    updateAttendanceStatus,
    updateSessionRemark,
    setDocumentToView
  } = useApp();

  // STRICT TEACHER SCOPING:
  // "le prof aura acces qu'au eleves de son groupe , pas de tout"
  const myClasses = getTeacherClasses ? getTeacherClasses(currentTeacher.id) : [];
  const myAllStudents = getTeacherStudents ? getTeacherStudents(currentTeacher.id) : students.filter(s => s.teacherId === currentTeacher.id);

  const [selectedClassId, setSelectedClassId] = useState('all');

  const myStudents = selectedClassId === 'all'
    ? myAllStudents
    : myAllStudents.filter(std => {
        const cls = myClasses.find(c => c.id === selectedClassId);
        return cls ? (cls.studentIds || []).includes(std.id) : false;
      });

  const [activeStudentId, setActiveStudentId] = useState(myStudents[0]?.id || myAllStudents[0]?.id);

  // Keep active student valid when filtering by group
  useEffect(() => {
    if (myStudents.length > 0 && !myStudents.some(s => s.id === activeStudentId)) {
      setActiveStudentId(myStudents[0].id);
    }
  }, [selectedClassId, myStudents, activeStudentId]);

  const activeStudent = myStudents.find(s => s.id === activeStudentId) || myStudents[0];
  const studentPieces = pieces.filter(p => p.studentId === activeStudent?.id);
  const existingEval = evaluations.find(e => e.studentId === activeStudent?.id && e.period === 'Septembre 2026');

  const [evalForm, setEvalForm] = useState({
    solfegeScore: existingEval?.solfegeScore || 16,
    techniqueScore: existingEval?.techniqueScore || 15,
    musicalityScore: existingEval?.musicalityScore || 16,
    regularityScore: existingEval?.regularityScore || 17,
    generalAppreciation: existingEval?.generalAppreciation || '',
    homework: existingEval?.homework || ''
  });

  const [isAddPieceOpen, setIsAddPieceOpen] = useState(false);
  const [newPieceData, setNewPieceData] = useState({
    title: '',
    composer: '',
    difficulty: 'Intermédiaire 1',
    tempo: 'Moderato (100 BPM)',
    key: 'Do Majeur',
    teacherNotes: ''
  });

  // Session Remark state (Teacher can put notes/remarks for each session)
  const [editingSessionRemark, setEditingSessionRemark] = useState(null);
  const [sessionRemarkText, setSessionRemarkText] = useState('');

  const quickRemarkSuggestions = [
    'Très bonne assise corporelle & tenue de l’instrument.',
    'Doigtés de la main gauche à stabiliser à tempo lent.',
    'Rythme régulier, excellent respect des valeurs de notes.',
    'Attention aux nuances (pianissimo / forte) sur la reprise.',
    'Travailler le passage difficile au métronome (mesures 16 à 24).',
    'Sensibilité musicale remarquable et phrasé expressif.',
    'Absence rattrapée avec grand sérieux.'
  ];

  const averageScore = (
    (Number(evalForm.solfegeScore) +
      Number(evalForm.techniqueScore) +
      Number(evalForm.musicalityScore) +
      Number(evalForm.regularityScore)) / 4
  ).toFixed(1);

  const handleSaveEvaluation = (e) => {
    e.preventDefault();
    if (!activeStudent) return;

    saveEvaluation({
      studentId: activeStudent.id,
      teacherId: currentTeacher.id,
      period: 'Septembre 2026',
      solfegeScore: Number(evalForm.solfegeScore),
      techniqueScore: Number(evalForm.techniqueScore),
      musicalityScore: Number(evalForm.musicalityScore),
      regularityScore: Number(evalForm.regularityScore),
      generalAppreciation: evalForm.generalAppreciation,
      homework: evalForm.homework,
      homeworkDone: false
    });
  };

  const handleSaveSessionRemark = (e) => {
    e.preventDefault();
    if (!editingSessionRemark) return;

    updateSessionRemark(
      editingSessionRemark.id,
      sessionRemarkText,
      editingSessionRemark.status
    );
    setEditingSessionRemark(null);
    setSessionRemarkText('');
  };

  const handleCreatePiece = (e) => {
    e.preventDefault();
    if (!newPieceData.title.trim()) return;

    addPiece({
      studentId: activeStudent.id,
      title: newPieceData.title,
      composer: newPieceData.composer || 'Traditionnel',
      difficulty: newPieceData.difficulty,
      tempo: newPieceData.tempo,
      key: newPieceData.key,
      progress: 20,
      status: 'decouverte',
      teacherNotes: newPieceData.teacherNotes,
      sheetUrl: '#'
    });

    setIsAddPieceOpen(false);
    setNewPieceData({
      title: '',
      composer: '',
      difficulty: 'Intermédiaire 1',
      tempo: 'Moderato (100 BPM)',
      key: 'Do Majeur',
      teacherNotes: ''
    });
  };

  const studentSessions = attendance.filter(a => a.studentId === activeStudent?.id);

  return (
    <div className="space-y-6">
      
      {/* Light Luminous Teacher Banner */}
      <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF5EB] to-[#FFFDF9] text-music-ink p-6 rounded-3xl shadow-soft border border-music-border relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center space-x-4 sm:space-x-5">
            <img
              src={currentTeacher.avatar}
              alt={currentTeacher.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-music-gold shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-display font-bold text-music-ink">{currentTeacher.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                  {currentTeacher.instrument}
                </span>
              </div>
              <p className="text-xs text-music-inkMuted mt-1 max-w-xl leading-relaxed">
                {currentTeacher.bio}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-music-border text-center shadow-xs">
              <span className="text-music-inkMuted block font-semibold">Groupes Assignés</span>
              <span className="text-xl font-bold font-mono text-music-gold">{myClasses.length}</span>
            </div>
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-music-border text-center shadow-xs">
              <span className="text-music-inkMuted block font-semibold">Élèves de vos Groupes</span>
              <span className="text-xl font-bold font-mono text-music-cypress">{myAllStudents.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Group & Class Scoping Filter (Strict Isolation requirement) */}
      {myClasses.length > 0 && (
        <div className="bg-white p-3.5 rounded-2xl border border-music-border shadow-soft flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-music-ink mr-2">
            <Layers className="w-4 h-4 text-music-gold" />
            <span>Vos Classes & Groupes :</span>
          </div>

          <button
            onClick={() => setSelectedClassId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              selectedClassId === 'all'
                ? 'bg-music-ink text-white shadow-xs'
                : 'bg-music-card text-music-inkMuted hover:bg-music-parchment'
            }`}
          >
            <span>Tous mes Groupes</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              selectedClassId === 'all' ? 'bg-white/20 text-white' : 'bg-music-parchment text-music-ink'
            }`}>
              {myAllStudents.length}
            </span>
          </button>

          {myClasses.map(cls => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                selectedClassId === cls.id
                  ? 'bg-music-gold text-white shadow-xs'
                  : 'bg-music-card text-music-inkMuted hover:bg-music-parchment'
              }`}
            >
              <span>{cls.name}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedClassId === cls.id ? 'bg-white/20 text-white' : 'bg-music-parchment text-music-ink'
              }`}>
                {(cls.studentIds || []).length}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Student Selector Row */}
      {myStudents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-music-border p-8 text-center text-xs text-music-inkMuted">
          <p className="font-bold text-music-ink text-sm mb-1">Aucun élève trouvé dans ce groupe.</p>
          <p>L'administration centrale peut ajouter des élèves à vos classes depuis le portail de gestion.</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-music-inkLight">
              Sélectionner un Apprenant de votre Groupe :
            </h3>
            <span className="text-xs text-music-inkMuted font-semibold">
              {myStudents.length} élève{myStudents.length > 1 ? 's' : ''} dans ce groupe
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {myStudents.map(std => {
              const isSelected = std.id === activeStudent?.id;
              return (
                <button
                  key={std.id}
                  onClick={() => {
                    setActiveStudentId(std.id);
                    const ev = evaluations.find(e => e.studentId === std.id && e.period === 'Septembre 2026');
                    setEvalForm({
                      solfegeScore: ev?.solfegeScore || 16,
                      techniqueScore: ev?.techniqueScore || 15,
                      musicalityScore: ev?.musicalityScore || 16,
                      regularityScore: ev?.regularityScore || 17,
                      generalAppreciation: ev?.generalAppreciation || '',
                      homework: ev?.homework || ''
                    });
                  }}
                  className={`p-3 rounded-2xl text-left border transition flex items-center space-x-3 ${
                    isSelected
                      ? 'bg-white border-2 border-music-gold shadow-card ring-2 ring-amber-100'
                      : 'bg-white/80 border-music-border hover:bg-white hover:border-music-borderLight'
                  }`}
                >
                  <img
                    src={std.avatar}
                    alt={std.firstName}
                    className="w-10 h-10 rounded-full object-cover border border-music-border"
                  />
                  <div className="overflow-hidden">
                    <div className={`text-xs font-bold truncate ${isSelected ? 'text-music-ink' : 'text-music-inkMuted'}`}>
                      {std.firstName} {std.lastName}
                    </div>
                    <div className="text-[10px] text-music-inkLight truncate font-medium">
                      {std.instrument} • {std.sessionsPerWeek} s/sem
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeStudent && (
        <div className="space-y-6">
          
          {/* SECTION 1: POINTAGE DES ABSENCES DU MOIS & REMARQUES DE SÉANCES */}
          <div className="bg-white rounded-3xl border border-music-border p-6 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-music-borderLight mb-5">
              <div>
                <h3 className="font-display font-bold text-base text-music-ink flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-music-cypress" />
                  <span>Feuille d'Assiduité & Remarques Pédagogiques — {activeStudent.firstName} {activeStudent.lastName}</span>
                </h3>
                <p className="text-xs text-music-inkMuted">
                  Rythme : {activeStudent.sessionsPerWeek} séance{activeStudent.sessionsPerWeek > 1 ? 's' : ''} par semaine ({activeStudent.scheduleDays}) • Vous pouvez saisir une remarque pour chaque séance.
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                Septembre 2026
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {studentSessions.map(session => (
                <div
                  key={session.id}
                  className="p-3.5 rounded-2xl border border-music-border bg-music-paper hover:bg-white transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-music-inkLight">
                      <span className="bg-white px-2 py-0.5 rounded-md border border-music-border">Séance #{session.sessionNumber}</span>
                      <span>{session.day}</span>
                    </div>
                    <div className="text-xs font-bold text-music-ink my-1.5">{session.date}</div>

                    {/* Status Toggles: P / J / A */}
                    <div className="grid grid-cols-3 gap-1 my-2">
                      <button
                        onClick={() => updateAttendanceStatus(session.id, 'present', session.note || 'Présent')}
                        title="Présent"
                        className={`py-1 rounded-lg text-[10px] font-bold transition flex items-center justify-center space-x-0.5 ${
                          session.status === 'present'
                            ? 'bg-music-cypress text-white shadow-xs'
                            : 'bg-white text-music-inkMuted hover:bg-emerald-50 border border-music-border'
                        }`}
                      >
                        <span>P</span>
                        <span className="hidden sm:inline text-[9px] font-normal">(Présent)</span>
                      </button>
                      <button
                        onClick={() => updateAttendanceStatus(session.id, 'absent_excused', session.note || 'Absence justifiée')}
                        title="Absent Justifié"
                        className={`py-1 rounded-lg text-[10px] font-bold transition flex items-center justify-center space-x-0.5 ${
                          session.status === 'absent_excused'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-white text-music-inkMuted hover:bg-amber-50 border border-music-border'
                        }`}
                      >
                        <span>J</span>
                        <span className="hidden sm:inline text-[9px] font-normal">(Justifié)</span>
                      </button>
                      <button
                        onClick={() => updateAttendanceStatus(session.id, 'absent_unexcused', session.note || 'Absent')}
                        title="Absent Non Justifié"
                        className={`py-1 rounded-lg text-[10px] font-bold transition flex items-center justify-center space-x-0.5 ${
                          session.status === 'absent_unexcused'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-white text-music-inkMuted hover:bg-rose-50 border border-music-border'
                        }`}
                      >
                        <span>A</span>
                        <span className="hidden sm:inline text-[9px] font-normal">(Absent)</span>
                      </button>
                    </div>

                    {/* Per-session observation/remark preview */}
                    {session.note ? (
                      <div
                        onClick={() => {
                          setEditingSessionRemark(session);
                          setSessionRemarkText(session.note);
                        }}
                        className="mt-2 p-2 rounded-xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 text-[11px] text-amber-950 italic cursor-pointer transition flex items-start space-x-1.5"
                        title="Cliquer pour modifier la remarque de séance"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-music-gold shrink-0 mt-0.5" />
                        <span className="line-clamp-2">« {session.note} »</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingSessionRemark(session);
                          setSessionRemarkText('');
                        }}
                        className="mt-2 w-full py-1.5 px-2 rounded-xl border border-dashed border-music-border hover:border-music-gold text-[10px] font-bold text-music-inkLight hover:text-music-ink transition flex items-center justify-center space-x-1 bg-white"
                      >
                        <Plus className="w-3 h-3 text-music-gold" />
                        <span>Ajouter remarque de séance</span>
                      </button>
                    )}
                  </div>

                  <div className="pt-2 mt-2 border-t border-music-borderLight flex justify-end">
                    <button
                      onClick={() => {
                        setEditingSessionRemark(session);
                        setSessionRemarkText(session.note || '');
                      }}
                      className="text-[10px] text-music-gold hover:text-music-goldHover font-bold flex items-center space-x-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{session.note ? 'Modifier remarque' : 'Rédiger remarque'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: PIÈCES À APPRENDRE */}
          <div className="bg-white rounded-3xl border border-music-border p-6 shadow-soft">
            <div className="flex items-center justify-between pb-4 border-b border-music-borderLight mb-5">
              <div>
                <h3 className="font-display font-bold text-base text-music-ink flex items-center space-x-2">
                  <Music className="w-4 h-4 text-music-gold" />
                  <span>Pièces du Répertoire à Apprendre</span>
                </h3>
                <p className="text-xs text-music-inkMuted">
                  Morceaux en cours d'apprentissage, partitions d'étude et maturité technique
                </p>
              </div>

              <button
                onClick={() => setIsAddPieceOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs transition shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Assigner une pièce</span>
              </button>
            </div>

            {studentPieces.length === 0 ? (
              <div className="text-center py-8 text-music-inkLight text-xs">
                Aucun morceau assigné pour le moment. Cliquez sur "Assigner une pièce" pour commencer.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentPieces.map(piece => (
                  <div
                    key={piece.id}
                    className="p-5 rounded-2xl border border-music-border bg-white hover:border-music-gold/60 transition shadow-soft flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-display font-bold text-music-ink text-base">
                            {piece.title}
                          </h4>
                          <p className="text-xs text-music-inkMuted">
                            {piece.composer} • <span className="italic">{piece.key}</span>
                          </p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          piece.status === 'maitrise'
                            ? 'bg-emerald-100 text-emerald-800'
                            : piece.status === 'nuances'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {piece.status === 'maitrise'
                            ? 'Maîtrisé'
                            : piece.status === 'nuances'
                            ? 'Nuances & Style'
                            : 'Déchiffrage & Rythme'}
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-music-inkMuted font-medium">Progression :</span>
                          <span className="font-mono font-bold text-music-ink">{piece.progress}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={piece.progress}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            const newStatus = val === 100 ? 'maitrise' : val >= 60 ? 'nuances' : 'rythme';
                            updatePiece(piece.id, { progress: val, status: newStatus });
                          }}
                          className="w-full accent-music-gold cursor-pointer"
                        />
                      </div>

                      {piece.teacherNotes && (
                        <div className="mt-3.5 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 italic">
                          « {piece.teacherNotes} »
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-music-borderLight text-xs">
                      <span className="text-music-inkLight text-[11px] font-mono">{piece.tempo}</span>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => downloadPieceScore(piece, `${activeStudent.firstName} ${activeStudent.lastName}`)}
                          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition border border-emerald-200"
                          title="Télécharger la partition officielle PDF avec tipps et exercices"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDocumentToView(piece)}
                          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-music-card hover:bg-music-parchment text-music-ink font-bold text-xs transition border border-music-border"
                        >
                          <Eye className="w-3.5 h-3.5 text-music-gold" />
                          <span>Partition</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Retirer cette pièce du carnet de l’élève ?')) {
                              deletePiece(piece.id);
                            }
                          }}
                          className="p-1.5 rounded-xl text-music-inkLight hover:text-rose-600 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 3: NOTES & ÉVALUATION DU MOIS */}
          <div className="bg-white rounded-3xl border border-music-border p-6 shadow-soft">
            <div className="flex items-center justify-between pb-4 border-b border-music-borderLight mb-5">
              <div>
                <h3 className="font-display font-bold text-base text-music-ink flex items-center space-x-2">
                  <Award className="w-4 h-4 text-purple-700" />
                  <span>Bulletin Pédagogique & Notation — Septembre 2026</span>
                </h3>
                <p className="text-xs text-music-inkMuted">
                  Évaluation directement transmise à l'espace élève et consultable par la direction
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-purple-50 border border-purple-200 px-3.5 py-1.5 rounded-2xl">
                <span className="text-xs font-semibold text-purple-900">Moyenne :</span>
                <span className="font-mono text-base font-extrabold text-purple-950">{averageScore} / 20</span>
              </div>
            </div>

            <form onSubmit={handleSaveEvaluation} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-music-paper border border-music-border">
                  <label className="block font-bold text-music-ink mb-1">
                    Solfège & Lecture (/20)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="20"
                    value={evalForm.solfegeScore}
                    onChange={(e) => setEvalForm({ ...evalForm, solfegeScore: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border border-music-border font-mono font-bold text-music-ink text-sm bg-white"
                  />
                  <span className="text-[10px] text-music-inkLight mt-1 block font-medium">Clé de Sol/Fa, justesse</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-music-paper border border-music-border">
                  <label className="block font-bold text-music-ink mb-1">
                    Technique Instrumentale (/20)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="20"
                    value={evalForm.techniqueScore}
                    onChange={(e) => setEvalForm({ ...evalForm, techniqueScore: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border border-music-border font-mono font-bold text-music-ink text-sm bg-white"
                  />
                  <span className="text-[10px] text-music-inkLight mt-1 block font-medium">Doigtés, posture, archet/luth</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-music-paper border border-music-border">
                  <label className="block font-bold text-music-ink mb-1">
                    Musicalité & Nuances (/20)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="20"
                    value={evalForm.musicalityScore}
                    onChange={(e) => setEvalForm({ ...evalForm, musicalityScore: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border border-music-border font-mono font-bold text-music-ink text-sm bg-white"
                  />
                  <span className="text-[10px] text-music-inkLight mt-1 block font-medium">Sensibilité, phrasé, son</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-music-paper border border-music-border">
                  <label className="block font-bold text-music-ink mb-1">
                    Assiduité & Travail (/20)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="20"
                    value={evalForm.regularityScore}
                    onChange={(e) => setEvalForm({ ...evalForm, regularityScore: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border border-music-border font-mono font-bold text-music-ink text-sm bg-white"
                  />
                  <span className="text-[10px] text-music-inkLight mt-1 block font-medium">Régularité à la maison</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-music-ink mb-1">
                  Appréciation globale du professeur (visible sur le carnet de l'élève) :
                </label>
                <textarea
                  rows="3"
                  value={evalForm.generalAppreciation}
                  onChange={(e) => setEvalForm({ ...evalForm, generalAppreciation: e.target.value })}
                  placeholder="Ex: Excellents progrès ce mois-ci..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-music-ink mb-1">
                  Exercices & Devoirs à préparer pour la semaine prochaine :
                </label>
                <textarea
                  rows="2"
                  value={evalForm.homework}
                  onChange={(e) => setEvalForm({ ...evalForm, homework: e.target.value })}
                  placeholder="Ex: Gamme de Ré Majeur à 80 BPM..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-music-ink hover:bg-black text-white font-bold transition shadow-sm text-xs"
                >
                  <Save className="w-4 h-4 text-music-gold" />
                  <span>Enregistrer et Publier l'Évaluation</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      )}

      {/* Add Piece Modal */}
      {isAddPieceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFDFB] rounded-3xl w-full max-w-lg shadow-elevated p-6 border border-music-border">
            <div className="flex justify-between items-center pb-3 border-b border-music-borderLight mb-4">
              <h3 className="font-display font-bold text-base text-music-ink">
                Assigner une Nouvelle Pièce à {activeStudent?.firstName}
              </h3>
              <button
                onClick={() => setIsAddPieceOpen(false)}
                className="text-music-inkLight hover:text-music-ink p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePiece} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-music-ink mb-1">Titre de la pièce *</label>
                <input
                  type="text"
                  required
                  value={newPieceData.title}
                  onChange={(e) => setNewPieceData({ ...newPieceData, title: e.target.value })}
                  placeholder="Ex: Lettre à Élise, Gnossienne n°1..."
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-music-ink mb-1">Compositeur</label>
                  <input
                    type="text"
                    value={newPieceData.composer}
                    onChange={(e) => setNewPieceData({ ...newPieceData, composer: e.target.value })}
                    placeholder="L. v. Beethoven"
                    className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-music-ink mb-1">Tonalité</label>
                  <input
                    type="text"
                    value={newPieceData.key}
                    onChange={(e) => setNewPieceData({ ...newPieceData, key: e.target.value })}
                    placeholder="La mineur"
                    className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-music-ink mb-1">Tempo indicatif</label>
                  <input
                    type="text"
                    value={newPieceData.tempo}
                    onChange={(e) => setNewPieceData({ ...newPieceData, tempo: e.target.value })}
                    placeholder="Poco moto (120 BPM)"
                    className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-music-ink mb-1">Difficulté</label>
                  <select
                    value={newPieceData.difficulty}
                    onChange={(e) => setNewPieceData({ ...newPieceData, difficulty: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-music-border text-xs bg-white"
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire 1">Intermédiaire 1</option>
                    <option value="Intermédiaire 2">Intermédiaire 2</option>
                    <option value="Avancé">Avancé</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-music-ink mb-1">Conseils & Objectifs du professeur</label>
                <textarea
                  rows="2"
                  value={newPieceData.teacherNotes}
                  onChange={(e) => setNewPieceData({ ...newPieceData, teacherNotes: e.target.value })}
                  placeholder="Conseils spécifiques sur la respiration, les doigtés ou le tempo..."
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddPieceOpen(false)}
                  className="px-4 py-2 rounded-xl text-music-inkMuted hover:bg-music-card"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-music-gold text-white font-bold hover:bg-music-goldHover transition shadow-xs"
                >
                  Ajouter au carnet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Session Remark Modal (Teacher writes specific remarks for each session) */}
      {editingSessionRemark && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-elevated border border-music-border overflow-hidden">
            <div className="p-5 border-b border-music-border flex items-center justify-between bg-amber-50/60">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 text-music-gold flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-music-ink">
                    Remarque de Séance #{editingSessionRemark.sessionNumber}
                  </h3>
                  <p className="text-[11px] text-music-inkMuted">
                    {activeStudent?.firstName} {activeStudent?.lastName} • {editingSessionRemark.day} {editingSessionRemark.date}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingSessionRemark(null)}
                className="p-1.5 rounded-xl hover:bg-white text-music-inkLight hover:text-music-ink transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSessionRemark} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-music-ink mb-1">
                  Observation & consignes pour cette séance :
                </label>
                <textarea
                  rows="3"
                  required
                  value={sessionRemarkText}
                  onChange={(e) => setSessionRemarkText(e.target.value)}
                  placeholder="Notez ici les progrès constatés, les mesures travaillées, la posture..."
                  className="w-full px-3 py-2 rounded-xl border border-music-border focus:ring-2 focus:ring-music-gold bg-music-paper text-xs"
                />
              </div>

              {/* Quick suggestions chips */}
              <div>
                <span className="block text-[11px] font-bold text-music-inkLight uppercase tracking-wider mb-1.5">
                  Suggestions rapides :
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                  {quickRemarkSuggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSessionRemarkText(sug)}
                      className="text-[10px] px-2.5 py-1 rounded-lg border border-music-border bg-white hover:bg-amber-50 hover:border-amber-300 text-music-ink text-left transition"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-music-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingSessionRemark(null)}
                  className="px-3.5 py-1.5 rounded-xl border border-music-border text-music-inkMuted hover:bg-music-card font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold transition shadow-xs flex items-center space-x-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Enregistrer la Remarque</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
