import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import StudentModal from './StudentModal';
import AccountModal from './AccountModal';
import ClassModal from './ClassModal';
import StudentDossierModal from './StudentDossierModal';
import StudentAttendanceHistoryModal from './StudentAttendanceHistoryModal';
import {
  Users,
  CalendarCheck,
  CreditCard,
  BookOpen,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  Printer,
  Filter,
  Eye,
  Check,
  X,
  KeyRound,
  Copy,
  RefreshCw,
  Shield,
  UserCheck,
  GraduationCap,
  Lock,
  Ban,
  Layers,
  MapPin,
  Sparkles,
  History,
  Calendar
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    students,
    teachers,
    accounts,
    classes,
    pedagogicalLevels,
    createClass,
    updateClass,
    deleteClass,
    assignTeacherToClass,
    toggleStudentInClass,
    attendance,
    payments,
    library,
    deleteStudent,
    validatePayment,
    setReceiptToView,
    setDocumentToView,
    updateAttendanceStatus,
    instrumentCategories,
    resetStudentPassword,
    createAccount,
    updateAccount,
    toggleAccountStatus,
    resetAccountPassword,
    deleteAccount,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState('Tous');
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudentForDossier, setSelectedStudentForDossier] = useState(null);

  // Classes & Groups management state (Cycles, Initiation, Supérieur, assigned teachers)
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [classLevelFilter, setClassLevelFilter] = useState('Tous');
  const [classSearch, setClassSearch] = useState('');

  // Accounts management state
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [accountRoleFilter, setAccountRoleFilter] = useState('Tous');
  const [accountSearch, setAccountSearch] = useState('');

  // Attendance & Absences management state (Search, monthly history, filters)
  const [attendanceSearchQuery, setAttendanceSearchQuery] = useState('');
  const [attendanceInstrumentFilter, setAttendanceInstrumentFilter] = useState('Tous');
  const [attendanceStatusFilter, setAttendanceStatusFilter] = useState('all'); // 'all' | 'has_absences' | 'perfect'
  const [selectedAttendanceMonth, setSelectedAttendanceMonth] = useState('Septembre 2026');
  const [studentForAttendanceHistory, setStudentForAttendanceHistory] = useState(null);

  const ATTENDANCE_MONTHS = [
    'Juin 2026',
    'Juillet 2026',
    'Août 2026',
    'Septembre 2026',
    'Octobre 2026',
    'Novembre 2026',
    'Décembre 2026'
  ];

  const totalCollected = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status !== 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const overdueCount = payments.filter(p => p.status === 'overdue').length;

  const completedAttendance = attendance.filter(a => a.status !== 'planned');
  const presentCount = completedAttendance.filter(a => a.status === 'present').length;
  const attendanceRate = completedAttendance.length > 0
    ? Math.round((presentCount / completedAttendance.length) * 100)
    : 100;

  const filteredStudents = students.filter(std => {
    const matchSearch = `${std.firstName} ${std.lastName} ${std.matricule}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchInst = selectedInstrument === 'Tous' || std.instrument === selectedInstrument;
    return matchSearch && matchInst;
  });

  const filteredAccounts = (accounts || []).filter(acc => {
    const matchSearch = `${acc.name} ${acc.username} ${acc.email || ''}`.toLowerCase().includes(accountSearch.toLowerCase());
    const matchRole = accountRoleFilter === 'Tous' || acc.role === accountRoleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner KPI Cards (Light theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-music-border shadow-soft relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-music-inkLight uppercase tracking-wider">Apprenants Inscrits</p>
              <h3 className="text-3xl font-black text-music-ink mt-1 font-mono">{students.length}</h3>
              <p className="text-[11px] text-emerald-700 font-bold mt-1">
                Année Académique 2026/2027
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-music-gold flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-music-border shadow-soft relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-music-inkLight uppercase tracking-wider">Taux d'Assiduité</p>
              <h3 className="text-3xl font-black text-music-ink mt-1 font-mono">{attendanceRate}%</h3>
              <p className="text-[11px] text-music-inkMuted mt-1">
                {presentCount} présences sur {completedAttendance.length} séances
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-music-cypress flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-music-border shadow-soft relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-music-inkLight uppercase tracking-wider">Cotisations Encaissées</p>
              <h3 className="text-2xl font-black text-music-ink mt-1 font-mono">
                {totalCollected.toLocaleString('fr-FR')} <span className="text-sm font-sans font-bold">DA</span>
              </h3>
              <p className="text-[11px] text-music-inkMuted mt-1">
                Mois de Septembre 2026
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-music-border shadow-soft relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-music-inkLight uppercase tracking-wider">Paiements en Attente</p>
              <h3 className="text-2xl font-black text-amber-700 mt-1 font-mono">
                {totalPending.toLocaleString('fr-FR')} <span className="text-sm font-sans font-bold">DA</span>
              </h3>
              <p className="text-[11px] text-rose-700 font-bold mt-1">
                {overdueCount} dossier(s) en retard
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-music-border pb-3">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 bg-music-card p-1 rounded-2xl border border-music-border">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'students'
                ? 'bg-white text-music-ink shadow-sm'
                : 'text-music-inkMuted hover:text-music-ink'
            }`}
          >
            <Users className="w-4 h-4 text-music-gold" />
            <span>Dossiers Apprenants ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('classes')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'classes'
                ? 'bg-white text-music-ink shadow-sm'
                : 'text-music-inkMuted hover:text-music-ink'
            }`}
          >
            <Layers className="w-4 h-4 text-music-gold" />
            <span>Classes & Groupes ({classes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'attendance'
                ? 'bg-white text-music-ink shadow-sm'
                : 'text-music-inkMuted hover:text-music-ink'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-music-cypress" />
            <span>Absences & Séances</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'payments'
                ? 'bg-white text-music-ink shadow-sm'
                : 'text-music-inkMuted hover:text-music-ink'
            }`}
          >
            <CreditCard className="w-4 h-4 text-blue-700" />
            <span>Paiements & Quittances DZD</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'library'
                ? 'bg-white text-music-ink shadow-sm'
                : 'text-music-inkMuted hover:text-music-ink'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-700" />
            <span>Fonds Documentaire ({library.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('accounts')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'accounts'
                ? 'bg-white text-music-ink shadow-sm'
                : 'text-music-inkMuted hover:text-music-ink'
            }`}
          >
            <KeyRound className="w-4 h-4 text-music-gold" />
            <span>Comptes & Accès ({accounts.length})</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {activeTab === 'students' && (
            <button
              onClick={() => {
                setEditingStudent(null);
                setIsStudentModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Inscrire un Apprenant</span>
            </button>
          )}

          {activeTab === 'classes' && (
            <button
              onClick={() => {
                setEditingClass(null);
                setIsClassModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Créer un Groupe / Classe</span>
            </button>
          )}

          {activeTab === 'accounts' && (
            <button
              onClick={() => {
                setEditingAccount(null);
                setIsAccountModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Créer un Compte d'Accès</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: DOSSIERS APPRENANTS */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-music-border shadow-soft">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-music-inkLight absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom, matricule..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-music-paper"
              />
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs text-music-inkMuted font-bold mr-1 flex items-center">
                <Filter className="w-3 h-3 mr-1" /> Instrument:
              </span>
              {['Tous', ...instrumentCategories].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedInstrument(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedInstrument === cat
                      ? 'bg-music-ink text-white shadow-xs'
                      : 'bg-music-card text-music-inkMuted hover:bg-music-parchment'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-3xl border border-music-border shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-music-card text-music-ink uppercase font-bold border-b border-music-border">
                    <th className="p-4">Élève & Matricule</th>
                    <th className="p-4">Instrument & Niveau</th>
                    <th className="p-4">Professeur Assigné</th>
                    <th className="p-4 text-center">Formule Séances</th>
                    <th className="p-4 text-center">Espace Étudiant (Admin)</th>
                    <th className="p-4 text-right">Cotisation</th>
                    <th className="p-4 text-center">État Paiement</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-music-borderLight">
                  {filteredStudents.map(std => {
                    const teacher = teachers.find(t => t.id === std.teacherId);
                    const currentPayment = payments.find(p => p.studentId === std.id && p.month === 'Septembre 2026');

                    return (
                      <tr key={std.id} className="hover:bg-amber-50/40 transition">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={std.avatar}
                              alt={std.firstName}
                              className="w-10 h-10 rounded-full object-cover border border-music-border shadow-xs"
                            />
                            <div>
                              <button
                                onClick={() => setSelectedStudentForDossier(std)}
                                className="font-bold text-music-ink hover:text-music-gold text-sm text-left flex items-center space-x-1"
                              >
                                <span>{std.firstName} {std.lastName}</span>
                              </button>
                              <div className="text-[11px] text-music-inkLight font-mono">
                                {std.matricule} • {std.age} ans
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-music-ink">{std.instrument}</div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 mt-0.5 border border-amber-200">
                            {std.level}
                          </span>
                        </td>

                        <td className="p-4 font-bold text-music-inkMuted">
                          {teacher ? teacher.name : 'Non assigné'}
                        </td>

                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 rounded-xl text-xs font-bold bg-music-card text-music-ink border border-music-border">
                            {std.sessionsPerWeek} séance{std.sessionsPerWeek > 1 ? 's' : ''} / sem.
                          </span>
                          <div className="text-[10px] text-music-inkLight mt-0.5 font-medium">{std.scheduleDays}</div>
                        </td>

                        {/* Student Web Access status created by Admin */}
                        <td className="p-4 text-center">
                          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-bold">
                            <KeyRound className="w-3.5 h-3.5 text-music-cypress shrink-0" />
                            <span className="font-mono">{std.username || std.matricule}</span>
                          </div>
                        </td>

                        <td className="p-4 text-right font-mono font-bold text-music-ink text-sm">
                          {std.tuitionFee?.toLocaleString('fr-FR')} DA
                        </td>

                        <td className="p-4 text-center">
                          {currentPayment?.status === 'paid' ? (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <CheckCircle className="w-3 h-3" />
                              <span>Réglé</span>
                            </span>
                          ) : currentPayment?.status === 'overdue' ? (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                              <AlertCircle className="w-3 h-3" />
                              <span>En retard</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              <Clock className="w-3 h-3" />
                              <span>En attente</span>
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => setSelectedStudentForDossier(std)}
                              title="Consulter le dossier complet & identifiants"
                              className="p-2 rounded-xl bg-music-card hover:bg-music-parchment text-music-ink transition border border-music-border"
                            >
                              <Eye className="w-3.5 h-3.5 text-music-gold" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingStudent(std);
                                setIsStudentModalOpen(true);
                              }}
                              title="Modifier"
                              className="p-2 rounded-xl bg-music-card hover:bg-music-parchment text-music-ink transition border border-music-border"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Supprimer définitivement le dossier de ${std.firstName} ${std.lastName} ?`)) {
                                  deleteStudent(std.id);
                                }
                              }}
                              title="Supprimer"
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition border border-rose-200"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Student Dossier Drawer */}
          {selectedStudentForDossier && (
            <div className="bg-white rounded-3xl border-2 border-music-gold/50 p-6 shadow-card animate-fade-in relative">
              <button
                onClick={() => setSelectedStudentForDossier(null)}
                className="absolute top-5 right-5 p-1.5 rounded-xl bg-music-card hover:bg-music-parchment text-music-inkLight hover:text-music-ink transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-music-borderLight">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedStudentForDossier.avatar}
                    alt=""
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-music-gold shadow-sm"
                  />
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-music-card border border-music-border text-music-ink font-mono font-bold text-xs">
                      {selectedStudentForDossier.matricule}
                    </span>
                    <h3 className="text-xl font-display font-bold text-music-ink mt-1">
                      {selectedStudentForDossier.firstName} {selectedStudentForDossier.lastName}
                    </h3>
                    <p className="text-xs text-music-inkMuted">
                      Inscrit le {selectedStudentForDossier.enrolledDate} • {selectedStudentForDossier.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingStudent(selectedStudentForDossier);
                      setIsStudentModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-music-card hover:bg-music-parchment text-music-ink font-bold text-xs flex items-center space-x-1.5 border border-music-border"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Modifier la fiche</span>
                  </button>
                </div>
              </div>

              {/* 4 Detailed Cards including Web Credentials created by Admin */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs">
                <div className="p-4 rounded-2xl bg-music-paper border border-music-border">
                  <div className="font-bold text-music-inkLight uppercase tracking-wider text-[10px] mb-1">
                    Cursus Musical
                  </div>
                  <div className="text-sm font-bold text-music-ink">{selectedStudentForDossier.instrument}</div>
                  <div className="text-music-inkMuted mt-1">Niveau : <span className="font-bold text-music-ink">{selectedStudentForDossier.level}</span></div>
                  <div className="text-music-inkMuted">Rythme : <span className="font-bold text-music-ink">{selectedStudentForDossier.sessionsPerWeek} séances / semaine</span></div>
                  <div className="text-music-inkLight mt-1">{selectedStudentForDossier.scheduleDays}</div>
                </div>

                <div className="p-4 rounded-2xl bg-music-paper border border-music-border">
                  <div className="font-bold text-music-inkLight uppercase tracking-wider text-[10px] mb-1">
                    Contact & Responsable
                  </div>
                  <div className="text-sm font-bold text-music-ink">{selectedStudentForDossier.guardianName || 'Tuteur légal'}</div>
                  <div className="text-music-inkMuted mt-1">Tél : <span className="font-mono font-bold text-music-ink">{selectedStudentForDossier.phone}</span></div>
                  <div className="text-music-inkMuted">Email : <span className="font-medium text-music-ink">{selectedStudentForDossier.email}</span></div>
                  <div className="text-music-inkMuted">Commune : {selectedStudentForDossier.address}</div>
                </div>

                {/* Web Credentials Box (Created by Admin) */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-emerald-900 uppercase tracking-wider text-[10px] mb-1 flex items-center space-x-1">
                      <KeyRound className="w-3 h-3 text-music-cypress" />
                      <span>Accès Espace Étudiant (Admin)</span>
                    </div>
                    <div className="text-emerald-950 mt-1">
                      Identifiant : <span className="font-mono font-bold text-xs">{selectedStudentForDossier.username || selectedStudentForDossier.matricule}</span>
                    </div>
                    <div className="text-emerald-950 mt-0.5">
                      Mot de passe : <span className="font-mono font-bold text-xs">{selectedStudentForDossier.password || 'piano2026'}</span>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-emerald-200/80 flex items-center space-x-1.5">
                    <button
                      onClick={() => {
                        const txt = `🎵 ÎLOT MUSIQUE ALGER — ACCÈS ÉTUDIANT\nÉlève: ${selectedStudentForDossier.firstName} ${selectedStudentForDossier.lastName}\nIdentifiant: ${selectedStudentForDossier.username || selectedStudentForDossier.matricule}\nMot de passe: ${selectedStudentForDossier.password || 'piano2026'}\nLien: http://localhost:3000`;
                        navigator.clipboard.writeText(txt);
                        showToast('Identifiants copiés pour envoi aux parents !');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100 text-emerald-900 font-bold text-[10px] border border-emerald-300 transition flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copier</span>
                    </button>

                    <button
                      onClick={() => {
                        const newP = prompt('Nouveau mot de passe pour cet élève :', 'musique2026');
                        if (newP) {
                          resetStudentPassword(selectedStudentForDossier.id, newP);
                          setSelectedStudentForDossier(prev => ({ ...prev, password: newP }));
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100 text-emerald-900 font-bold text-[10px] border border-emerald-300 transition flex items-center space-x-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Réinitialiser</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-music-paper border border-music-border">
                  <div className="font-bold text-music-inkLight uppercase tracking-wider text-[10px] mb-1">
                    Situation Financière
                  </div>
                  <div className="text-base font-bold text-music-ink font-mono">
                    {selectedStudentForDossier.tuitionFee?.toLocaleString('fr-FR')} DA / mois
                  </div>
                  <div className="mt-2">
                    {payments.find(p => p.studentId === selectedStudentForDossier.id && p.month === 'Septembre 2026')?.status === 'paid' ? (
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                        ✓ Cotisation Septembre Réglée
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-bold text-[11px] border border-amber-200">
                        ⚠ En attente de paiement
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB: GESTION DES CLASSES & GROUPES PÉDAGOGIQUES (Admin central management) */}
      {activeTab === 'classes' && (
        <div className="space-y-4">
          
          {/* Informative Banner */}
          <div className="bg-amber-50/80 border border-amber-200 p-5 rounded-3xl flex items-start space-x-3.5 text-xs text-amber-950">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-music-gold shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <strong className="font-bold text-amber-900 text-sm">Gestion Centralisée des Classes & Groupes Pédagogiques :</strong>
              <p className="mt-1 text-amber-900/90 leading-relaxed">
                Configurez les cycles (Initiation, Débutant, Intermédiaire, Supérieur), créez les groupes et assignez les professeurs responsables.
                <strong> Sécurité & Confidentialité :</strong> L'enseignant assigné à un groupe aura un accès pédagogique <em>exclusivement</em> aux élèves qui y sont inscrits.
              </p>
            </div>
          </div>

          {/* Search & Level Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-music-border shadow-soft">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-music-inkLight absolute left-3 top-2.5" />
              <input
                type="text"
                value={classSearch}
                onChange={(e) => setClassSearch(e.target.value)}
                placeholder="Rechercher par nom de classe, instrument, salle..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-music-paper"
              />
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs text-music-inkMuted font-bold mr-1 flex items-center">
                <Filter className="w-3 h-3 mr-1" /> Cycle:
              </span>
              {['Tous', ...pedagogicalLevels].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setClassLevelFilter(lvl)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    classLevelFilter === lvl
                      ? 'bg-music-ink text-white shadow-xs'
                      : 'bg-music-card text-music-inkMuted hover:bg-music-parchment'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Classes Cards Grid */}
          {classes.filter(cls => {
            const matchSearch = `${cls.name} ${cls.instrument} ${cls.room || ''}`.toLowerCase().includes(classSearch.toLowerCase());
            const matchLevel = classLevelFilter === 'Tous' || cls.level === classLevelFilter;
            return matchSearch && matchLevel;
          }).length === 0 ? (
            <div className="bg-white rounded-3xl border border-music-border p-12 text-center text-xs text-music-inkMuted">
              <Layers className="w-8 h-8 text-music-inkLight mx-auto mb-2" />
              <p className="font-bold text-music-ink text-sm">Aucun groupe pédagogique ne correspond aux critères.</p>
              <p className="mt-1">Cliquez sur « Créer un Groupe / Classe » pour ajouter une nouvelle division.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {classes
                .filter(cls => {
                  const matchSearch = `${cls.name} ${cls.instrument} ${cls.room || ''}`.toLowerCase().includes(classSearch.toLowerCase());
                  const matchLevel = classLevelFilter === 'Tous' || cls.level === classLevelFilter;
                  return matchSearch && matchLevel;
                })
                .map(cls => {
                  const teacher = teachers.find(t => t.id === cls.teacherId);
                  const enrolledCount = (cls.studentIds || []).length;
                  const enrolledStudentsList = students.filter(s => (cls.studentIds || []).includes(s.id));

                  return (
                    <div
                      key={cls.id}
                      className="bg-white rounded-3xl border border-music-border hover:border-music-gold/60 p-6 shadow-soft transition flex flex-col justify-between"
                    >
                      <div>
                        {/* Badges Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              {cls.level}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-music-card text-music-ink border border-music-border">
                              {cls.instrument}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1 text-music-inkLight text-xs font-medium">
                            <MapPin className="w-3.5 h-3.5 text-music-gold" />
                            <span>{cls.room || 'Salle Principale'}</span>
                          </div>
                        </div>

                        {/* Title & Schedule */}
                        <h4 className="text-base font-display font-bold text-music-ink">
                          {cls.name}
                        </h4>
                        <p className="text-xs text-music-inkMuted font-medium mt-0.5">
                          Horaires : <span className="text-music-ink font-semibold">{cls.schedule || 'À définir'}</span>
                        </p>

                        {/* Assigned Teacher Card */}
                        <div className="mt-4 p-3 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={teacher?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                              alt={teacher?.name || 'Professeur'}
                              className="w-10 h-10 rounded-xl object-cover border border-amber-300 shadow-2xs"
                            />
                            <div>
                              <div className="text-xs font-bold text-music-ink flex items-center space-x-1.5">
                                <span>{teacher?.name || 'Professeur non assigné'}</span>
                                <span className="text-[10px] font-semibold text-music-gold">
                                  ({teacher?.instrument || cls.instrument})
                                </span>
                              </div>
                              <span className="text-[10px] text-amber-900 font-medium block mt-0.5">
                                ✓ Enseignant responsable de ce groupe
                              </span>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold bg-white text-music-ink px-2.5 py-1 rounded-xl border border-music-border shadow-2xs">
                            Accès Restreint
                          </span>
                        </div>

                        {/* Capacity Progress */}
                        <div className="mt-4">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="text-music-inkMuted font-medium">
                              Effectif de la classe :
                            </span>
                            <span className="font-mono font-bold text-music-ink">
                              {enrolledCount} / {cls.maxCapacity || 8} élèves
                            </span>
                          </div>
                          <div className="w-full bg-music-paper rounded-full h-2 overflow-hidden border border-music-borderLight">
                            <div
                              className="bg-music-gold h-full rounded-full transition-all"
                              style={{ width: `${Math.min(100, Math.round((enrolledCount / (cls.maxCapacity || 8)) * 100))}%` }}
                            />
                          </div>
                        </div>

                        {/* Enrolled Students List */}
                        <div className="mt-4">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-music-inkLight mb-2">
                            Apprenants Inscrits ({enrolledCount}) :
                          </div>
                          
                          {enrolledStudentsList.length === 0 ? (
                            <div className="p-3 rounded-xl bg-music-paper border border-music-border text-center text-[11px] text-music-inkLight italic">
                              Aucun élève inscrit dans ce groupe. Cliquez sur "Modifier" pour composer le groupe.
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                              {enrolledStudentsList.map(std => (
                                <div
                                  key={std.id}
                                  className="flex items-center justify-between p-2 rounded-xl bg-music-paper border border-music-border text-xs"
                                >
                                  <div className="flex items-center space-x-2 overflow-hidden">
                                    <img
                                      src={std.avatar}
                                      alt={std.firstName}
                                      className="w-6 h-6 rounded-full object-cover border border-music-border shrink-0"
                                    />
                                    <div className="truncate">
                                      <span className="font-bold text-music-ink truncate block">
                                        {std.firstName} {std.lastName}
                                      </span>
                                      <span className="text-[10px] text-music-inkLight font-mono">
                                        {std.matricule}
                                      </span>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => toggleStudentInClass(cls.id, std.id)}
                                    title="Retirer de ce groupe"
                                    className="p-1 rounded-lg text-music-inkLight hover:text-rose-600 hover:bg-rose-50 transition"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {cls.description && (
                          <p className="mt-3.5 text-xs text-music-inkMuted italic bg-music-card p-2.5 rounded-xl border border-music-border">
                            « {cls.description} »
                          </p>
                        )}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-4 mt-5 border-t border-music-borderLight flex items-center justify-between text-xs">
                        <div className="text-[11px] text-music-inkLight font-mono">
                          ID: {cls.id}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingClass(cls);
                              setIsClassModalOpen(true);
                            }}
                            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-music-card hover:bg-music-parchment text-music-ink font-bold transition border border-music-border shadow-2xs"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-music-gold" />
                            <span>Modifier le Groupe</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Supprimer définitivement le groupe pédagogique "${cls.name}" ?`)) {
                                deleteClass(cls.id);
                              }
                            }}
                            className="p-1.5 rounded-xl text-music-inkLight hover:text-rose-700 hover:bg-rose-50 transition border border-transparent hover:border-music-border"
                            title="Supprimer la classe"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: GESTION DES ABSENCES & SÉANCES */}
      {activeTab === 'attendance' && (() => {
        // Filter students according to search, instrument, and status filters
        const filteredStudents = students.filter(std => {
          // Search query match
          const query = attendanceSearchQuery.toLowerCase().trim();
          const matchQuery = !query ||
            `${std.firstName} ${std.lastName}`.toLowerCase().includes(query) ||
            std.matricule.toLowerCase().includes(query) ||
            std.instrument.toLowerCase().includes(query);

          // Instrument filter match
          const matchInstrument = attendanceInstrumentFilter === 'Tous' ||
            std.instrument === attendanceInstrumentFilter;

          // Status filter match
          const studentSessions = attendance.filter(a => a.studentId === std.id && (!a.month || a.month === selectedAttendanceMonth));
          const finished = studentSessions.filter(s => s.status !== 'planned');
          const hasAbsences = finished.some(s => s.status === 'absent_excused' || s.status === 'absent_unexcused');
          const isPerfect = finished.length > 0 && !hasAbsences;

          let matchStatus = true;
          if (attendanceStatusFilter === 'has_absences') {
            matchStatus = hasAbsences;
          } else if (attendanceStatusFilter === 'perfect') {
            matchStatus = isPerfect;
          }

          return matchQuery && matchInstrument && matchStatus;
        });

        // Compute Monthly Summary KPIs for the selected month
        const monthSessions = attendance.filter(a => !a.month || a.month === selectedAttendanceMonth);
        const finishedMonth = monthSessions.filter(s => s.status !== 'planned');
        const totalPresentMonth = finishedMonth.filter(s => s.status === 'present').length;
        const totalExcusedMonth = finishedMonth.filter(s => s.status === 'absent_excused').length;
        const totalUnexcusedMonth = finishedMonth.filter(s => s.status === 'absent_unexcused').length;
        const globalMonthRate = finishedMonth.length > 0
          ? Math.round((totalPresentMonth / finishedMonth.length) * 100)
          : 100;

        return (
          <div className="space-y-5">
            
            {/* Top Control Bar: Month Switcher & Monthly Summary Banner */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-music-border shadow-soft space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-music-borderLight">
                <div>
                  <div className="flex items-center space-x-2">
                    <CalendarCheck className="w-5 h-5 text-music-cypress" />
                    <h3 className="font-display font-bold text-lg sm:text-xl text-music-ink">
                      Registre des Présences & Historique des Absences
                    </h3>
                  </div>
                  <p className="text-xs text-music-inkMuted mt-1">
                    Suivi mensuel de l'assiduité par élève. Cliquez sur un statut pour le modifier ou sur l'icône historique pour consulter les archives.
                  </p>
                </div>

                {/* Month Selector Pills */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 self-start lg:self-auto">
                  {ATTENDANCE_MONTHS.map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedAttendanceMonth(m)}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
                        selectedAttendanceMonth === m
                          ? 'bg-music-gold text-white shadow-soft ring-2 ring-music-gold/30'
                          : 'bg-[#FAF8F5] text-music-inkMuted hover:bg-white hover:text-music-ink border border-music-border'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Stats KPIs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-music-border text-center">
                  <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">
                    Taux Global ({selectedAttendanceMonth.split(' ')[0]})
                  </span>
                  <span className="text-2xl font-mono font-black text-emerald-800 mt-1 block">
                    {globalMonthRate}%
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-music-border text-center">
                  <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">
                    Séances Présent (P)
                  </span>
                  <span className="text-2xl font-mono font-black text-music-cypress mt-1 block">
                    {totalPresentMonth}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-music-border text-center">
                  <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">
                    Absences Justifiées (J)
                  </span>
                  <span className="text-2xl font-mono font-black text-amber-600 mt-1 block">
                    {totalExcusedMonth}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-music-border text-center">
                  <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">
                    Absences Injustifiées (A)
                  </span>
                  <span className="text-2xl font-mono font-black text-rose-600 mt-1 block">
                    {totalUnexcusedMonth}
                  </span>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-music-inkLight" />
                  <input
                    type="text"
                    value={attendanceSearchQuery}
                    onChange={(e) => setAttendanceSearchQuery(e.target.value)}
                    placeholder="Rechercher par nom d'élève, matricule, instrument..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-music-border text-xs bg-[#FAF8F5] focus:bg-white focus:ring-2 focus:ring-music-gold/30 focus:border-music-gold outline-none transition"
                  />
                  {attendanceSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setAttendanceSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-music-inkLight hover:text-music-ink text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter Dropdowns */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={attendanceInstrumentFilter}
                    onChange={(e) => setAttendanceInstrumentFilter(e.target.value)}
                    className="px-3 py-2.5 rounded-2xl border border-music-border text-xs bg-[#FAF8F5] font-semibold text-music-ink outline-none"
                  >
                    <option value="Tous">Tous Instruments</option>
                    {instrumentCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <select
                    value={attendanceStatusFilter}
                    onChange={(e) => setAttendanceStatusFilter(e.target.value)}
                    className="px-3 py-2.5 rounded-2xl border border-music-border text-xs bg-[#FAF8F5] font-semibold text-music-ink outline-none"
                  >
                    <option value="all">Tous les Statuts</option>
                    <option value="has_absences">Avec Absences (J ou A)</option>
                    <option value="perfect">100% Assidus</option>
                  </select>

                  {(attendanceSearchQuery || attendanceInstrumentFilter !== 'Tous' || attendanceStatusFilter !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setAttendanceSearchQuery('');
                        setAttendanceInstrumentFilter('Tous');
                        setAttendanceStatusFilter('all');
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-music-gold hover:underline"
                    >
                      Réinitialiser
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-3xl border border-music-border shadow-soft overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-music-border flex justify-between items-center bg-music-card">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-music-gold" />
                  <h3 className="font-display font-bold text-sm sm:text-base text-music-ink">
                    Feuille de Présence — {selectedAttendanceMonth}
                  </h3>
                </div>
                <span className="text-xs text-music-inkMuted font-bold">
                  {filteredStudents.length} apprenant{filteredStudents.length > 1 ? 's' : ''} affiché{filteredStudents.length > 1 ? 's' : ''}
                </span>
              </div>

              {filteredStudents.length === 0 ? (
                <div className="p-10 text-center text-xs text-music-inkLight space-y-2">
                  <CalendarCheck className="w-10 h-10 text-music-gold/40 mx-auto" />
                  <p className="font-semibold text-music-ink">Aucun apprenant ne correspond aux filtres de recherche.</p>
                  <p className="text-music-inkMuted">Essayez de modifier votre recherche ou de réinitialiser les filtres.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-music-card text-music-ink font-bold border-b border-music-border">
                        <th className="p-3.5 w-52">Apprenant</th>
                        <th className="p-3.5 text-center">Formule</th>
                        <th className="p-3.5 text-center">S1</th>
                        <th className="p-3.5 text-center">S2</th>
                        <th className="p-3.5 text-center">S3</th>
                        <th className="p-3.5 text-center">S4</th>
                        <th className="p-3.5 text-center">S5</th>
                        <th className="p-3.5 text-center">S6</th>
                        <th className="p-3.5 text-center">S7</th>
                        <th className="p-3.5 text-center">S8</th>
                        <th className="p-3.5 text-center">Taux</th>
                        <th className="p-3.5 text-right">Historique</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-music-borderLight">
                      {filteredStudents.map(std => {
                        const studentSessions = attendance.filter(a => a.studentId === std.id && (!a.month || a.month === selectedAttendanceMonth));
                        const totalSlots = std.sessionsPerWeek === 1 ? 4 : 8;

                        const finished = studentSessions.filter(s => s.status !== 'planned');
                        const present = finished.filter(s => s.status === 'present').length;
                        const studentRate = finished.length > 0 ? Math.round((present / finished.length) * 100) : 100;

                        return (
                          <tr key={std.id} className="hover:bg-amber-50/30 transition">
                            <td className="p-3.5">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={std.avatar}
                                  alt={std.firstName}
                                  className="w-8 h-8 rounded-xl object-cover border border-music-border"
                                />
                                <div>
                                  <div className="font-bold text-music-ink flex items-center space-x-1.5">
                                    <span>{std.firstName} {std.lastName}</span>
                                    <span className="text-[10px] font-mono text-music-inkLight">({std.matricule})</span>
                                  </div>
                                  <div className="text-[10px] text-music-inkLight">
                                    {std.instrument} • {std.level}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="p-3.5 text-center">
                              <span className="px-2 py-0.5 rounded-lg bg-music-card text-music-ink font-bold text-[10px] border border-music-border">
                                {std.sessionsPerWeek} s/sem
                              </span>
                            </td>

                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => {
                              if (num > totalSlots) {
                                return (
                                  <td key={num} className="p-2 text-center text-music-inkLight/40 font-mono text-[10px]">
                                    —
                                  </td>
                                );
                              }

                              const session = studentSessions.find(s => s.sessionNumber === num);
                              const status = session ? session.status : 'planned';

                              const nextStatusMap = {
                                planned: 'present',
                                present: 'absent_excused',
                                absent_excused: 'absent_unexcused',
                                absent_unexcused: 'planned'
                              };

                              return (
                                <td key={num} className="p-2 text-center">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (session) {
                                        updateAttendanceStatus(session.id, nextStatusMap[status]);
                                      }
                                    }}
                                    title={`Séance ${num} (${session?.date || 'Date'})\nStatut : ${status}\nCliquer pour basculer`}
                                    className={`w-7 h-7 rounded-lg text-[10px] font-bold inline-flex items-center justify-center transition shadow-2xs ${
                                      status === 'present'
                                        ? 'bg-music-cypress text-white'
                                        : status === 'absent_excused'
                                        ? 'bg-amber-500 text-white'
                                        : status === 'absent_unexcused'
                                        ? 'bg-rose-600 text-white'
                                        : 'bg-music-card text-music-inkLight border border-music-border'
                                    }`}
                                  >
                                    {status === 'present' ? 'P' : status === 'absent_excused' ? 'J' : status === 'absent_unexcused' ? 'A' : '·'}
                                  </button>
                                </td>
                              );
                            })}

                            <td className="p-3.5 text-center font-mono font-bold">
                              <span className={`px-2 py-0.5 rounded-xl text-xs ${
                                studentRate >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {studentRate}%
                              </span>
                            </td>

                            <td className="p-3.5 text-right">
                              <button
                                type="button"
                                onClick={() => setStudentForAttendanceHistory(std)}
                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition shadow-2xs"
                                title="Voir l'historique complet mois par mois"
                              >
                                <History className="w-3.5 h-3.5 text-music-gold" />
                                <span>Historique</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Legend & Instructions */}
              <div className="p-4 bg-music-card border-t border-music-border flex flex-wrap items-center justify-between text-xs text-music-inkMuted gap-3">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded bg-music-cypress text-white font-bold flex items-center justify-center text-[10px]">P</span>
                    <span>Présent</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded bg-amber-500 text-white font-bold flex items-center justify-center text-[10px]">J</span>
                    <span>Absent Justifié</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded bg-rose-600 text-white font-bold flex items-center justify-center text-[10px]">A</span>
                    <span>Absent Non Justifié</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded bg-music-paper border border-music-border text-music-inkLight font-bold flex items-center justify-center text-[10px]">·</span>
                    <span>À venir</span>
                  </span>
                </div>
                <span className="text-[11px] text-music-inkLight italic">
                  Cliquer sur un bouton P / J / A pour mettre à jour instantanément
                </span>
              </div>
            </div>

          </div>
        );
      })()}

      {/* TAB 3: PAIEMENTS & COTISATIONS (DZD) */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-lg text-music-ink">
              Registre des Règlements & Quittances Officielles
            </h3>
          </div>

          <div className="bg-white rounded-3xl border border-music-border shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-music-card text-music-ink uppercase font-bold border-b border-music-border">
                    <th className="p-4">N° Quittance</th>
                    <th className="p-4">Apprenant</th>
                    <th className="p-4">Mois</th>
                    <th className="p-4 text-right">Montant (DZD)</th>
                    <th className="p-4 text-center">Mode de règlement</th>
                    <th className="p-4 text-center">État</th>
                    <th className="p-4 text-right">Quittance & Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-music-borderLight">
                  {payments.map(pay => {
                    const std = students.find(s => s.id === pay.studentId);
                    return (
                      <tr key={pay.id} className="hover:bg-amber-50/30 transition">
                        <td className="p-4 font-mono font-bold text-music-ink">
                          {pay.receiptNumber}
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-music-ink">{std ? `${std.firstName} ${std.lastName}` : 'Élève'}</div>
                          <div className="text-[11px] text-music-inkLight">{std ? std.instrument : ''}</div>
                        </td>

                        <td className="p-4 font-semibold text-music-ink">
                          {pay.month}
                        </td>

                        <td className="p-4 text-right font-mono font-bold text-sm text-music-ink">
                          {pay.amount.toLocaleString('fr-FR')} DA
                        </td>

                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 rounded-xl text-[11px] font-bold bg-music-card text-music-ink border border-music-border">
                            {pay.paymentMethod || 'En attente'}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          {pay.status === 'paid' ? (
                            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <CheckCircle className="w-3 h-3" />
                              <span>Encaissé ({pay.paymentDate})</span>
                            </span>
                          ) : pay.status === 'overdue' ? (
                            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                              <AlertCircle className="w-3 h-3" />
                              <span>En Retard</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              <Clock className="w-3 h-3" />
                              <span>Non Réglé</span>
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {pay.status !== 'paid' ? (
                              <button
                                onClick={() => validatePayment(pay.id, 'Espèces', 'GUICHET-ALGER')}
                                className="px-3.5 py-1.5 rounded-xl bg-music-cypress hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs flex items-center space-x-1"
                              >
                                <Check className="w-3 h-3" />
                                <span>Encaisser</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => setReceiptToView(pay)}
                                className="px-3.5 py-1.5 rounded-xl bg-music-card hover:bg-music-parchment text-music-ink font-bold text-xs transition border border-music-border flex items-center space-x-1.5"
                              >
                                <Printer className="w-3.5 h-3.5 text-music-gold" />
                                <span>Voir Quittance</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BIBLIOTHÈQUE PÉDAGOGIQUE */}
      {activeTab === 'library' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-display font-bold text-lg text-music-ink">
                Fonds Documentaire & Partitions d'Étude
              </h3>
              <p className="text-xs text-music-inkMuted">Documents téléchargeables par les apprenants et enseignants</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {library.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-music-border p-6 shadow-soft hover:shadow-card hover:border-music-gold/60 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-music-card text-music-ink font-mono border border-music-border">
                      {item.fileSize}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-music-ink text-base leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-music-inkMuted mt-1">
                    {item.author} • {item.instrument}
                  </p>
                  <p className="text-xs text-music-inkMuted mt-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-music-borderLight flex items-center justify-between">
                  <span className="text-[11px] text-music-inkLight font-medium">
                    {item.format} • {item.pages > 0 ? `${item.pages} p.` : 'Audio MP3'}
                  </span>

                  <button
                    onClick={() => setDocumentToView(item)}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-music-card hover:bg-music-parchment text-music-ink text-xs font-bold transition border border-music-border"
                  >
                    <Eye className="w-3.5 h-3.5 text-music-gold" />
                    <span>Consulter</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: GESTION DES COMPTES & ACCÈS (DIRECTION) */}
      {activeTab === 'accounts' && (
        <div className="space-y-4">
          
          {/* Top Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-music-border shadow-soft">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-music-inkLight absolute left-3 top-2.5" />
              <input
                type="text"
                value={accountSearch}
                onChange={(e) => setAccountSearch(e.target.value)}
                placeholder="Rechercher par nom, identifiant, email..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-music-paper"
              />
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs text-music-inkMuted font-bold mr-1 flex items-center">
                <Filter className="w-3 h-3 mr-1" /> Filtrer par rôle :
              </span>
              {[
                { id: 'Tous', label: 'Tous les Comptes' },
                { id: 'student', label: 'Élèves' },
                { id: 'teacher', label: 'Professeurs' },
                { id: 'admin', label: 'Direction' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setAccountRoleFilter(filter.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    accountRoleFilter === filter.id
                      ? 'bg-music-ink text-white shadow-xs'
                      : 'bg-music-card text-music-inkMuted hover:bg-music-parchment'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Explanatory Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start space-x-3 text-xs text-amber-950">
            <KeyRound className="w-5 h-5 text-music-gold shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-900 font-bold mb-0.5">
                Autorité Centrale de Gestion des Comptes — Îlot Musique Alger :
              </strong>
              <p className="text-[11px] text-amber-900/90 leading-relaxed">
                C'est l'administrateur qui décide si un compte est <strong>Étudiant</strong> ou <strong>Professeur</strong>, assigne les mots de passe initiaux et contrôle les droits d'accès. Vous pouvez à tout moment suspendre un accès, réinitialiser un mot de passe ou copier la fiche de connexion pour les parents d'élèves.
              </p>
            </div>
          </div>

          {/* Accounts Table */}
          <div className="bg-white rounded-3xl border border-music-border shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-music-card/60 text-music-inkMuted border-b border-music-border">
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Utilisateur & Nom</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Rôle Assigné</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Identifiant / Matricule</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Mot de Passe</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Statut Portail</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Notes & Liaison</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-music-borderLight">
                  {filteredAccounts.map(acc => (
                    <tr key={acc.id} className="hover:bg-music-paper/60 transition">
                      
                      {/* User & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                            acc.role === 'admin'
                              ? 'bg-amber-100 text-music-gold'
                              : acc.role === 'teacher'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {acc.role === 'admin' ? (
                              <Shield className="w-4 h-4" />
                            ) : acc.role === 'teacher' ? (
                              <UserCheck className="w-4 h-4" />
                            ) : (
                              <GraduationCap className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-music-ink">{acc.name}</div>
                            <div className="text-[11px] text-music-inkLight">{acc.email || 'Aucun email'}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center space-x-1 ${
                          acc.role === 'admin'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : acc.role === 'teacher'
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}>
                          <span>{acc.role === 'admin' ? 'Direction' : acc.role === 'teacher' ? 'Professeur' : 'Élève'}</span>
                        </span>
                      </td>

                      {/* Username */}
                      <td className="py-3 px-4 font-mono font-bold text-music-ink">
                        <span className="bg-music-card px-2 py-0.5 rounded border border-music-border">
                          {acc.username}
                        </span>
                      </td>

                      {/* Password */}
                      <td className="py-3 px-4 font-mono text-music-inkMuted">
                        <span className="bg-music-card px-2 py-0.5 rounded border border-music-border text-[11px] font-medium text-music-ink">
                          {acc.password || '••••••••'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        {acc.status === 'active' ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Actif</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                            <Ban className="w-3 h-3 text-rose-600" />
                            <span>Suspendu</span>
                          </span>
                        )}
                      </td>

                      {/* Notes & Linked */}
                      <td className="py-3 px-4 text-xs text-music-inkMuted max-w-xs truncate">
                        {acc.notes || (acc.linkedEntityId ? `Lié ID: ${acc.linkedEntityId}` : '—')}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          
                          {/* Toggle Active / Suspended */}
                          <button
                            type="button"
                            onClick={() => toggleAccountStatus(acc.id)}
                            title={acc.status === 'active' ? 'Suspendre l’accès au portail' : 'Réactiver l’accès au portail'}
                            className={`p-1.5 rounded-lg border transition ${
                              acc.status === 'active'
                                ? 'text-music-inkLight hover:text-rose-700 hover:bg-rose-50 border-music-border'
                                : 'text-emerald-700 bg-emerald-50 border-emerald-300'
                            }`}
                          >
                            {acc.status === 'active' ? <Ban className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                          </button>

                          {/* Reset Password */}
                          <button
                            type="button"
                            onClick={() => {
                              const newPass = prompt(`Saisir le nouveau mot de passe pour ${acc.name} :`, acc.role === 'student' ? 'piano2026' : 'prof2026');
                              if (newPass && newPass.trim()) resetAccountPassword(acc.id, newPass.trim());
                            }}
                            title="Attribuer un nouveau mot de passe"
                            className="p-1.5 rounded-lg border border-music-border text-music-inkLight hover:text-music-gold hover:bg-amber-50 transition"
                          >
                            <KeyRound className="w-3.5 h-3.5 text-music-gold" />
                          </button>

                          {/* Copy Parent / Student Login Slip */}
                          <button
                            type="button"
                            onClick={() => {
                              const roleLabel = acc.role === 'student' ? 'Espace Apprenant' : acc.role === 'teacher' ? 'Espace Enseignant' : 'Direction';
                              const slipText = `[Îlot Musique Alger - Fiche d'Accès Portail]\nDestinataire : ${acc.name}\nEspace : ${roleLabel}\nIdentifiant / Matricule : ${acc.username}\nMot de passe : ${acc.password}\nPlateforme : http://localhost:3001/`;
                              navigator.clipboard.writeText(slipText);
                              showToast(`Fiche de connexion copiée pour ${acc.name} !`);
                            }}
                            title="Copier la fiche d'accès pour les parents"
                            className="p-1.5 rounded-lg border border-music-border text-music-inkLight hover:text-music-ink hover:bg-music-card transition"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit Details */}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingAccount(acc);
                              setIsAccountModalOpen(true);
                            }}
                            title="Modifier les informations"
                            className="p-1.5 rounded-lg border border-music-border text-music-inkLight hover:text-music-ink hover:bg-music-card transition"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Account */}
                          {acc.role !== 'admin' && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Supprimer définitivement le compte d’accès de ${acc.name} ?`)) {
                                  deleteAccount(acc.id);
                                }
                              }}
                              title="Supprimer ce compte"
                              className="p-1.5 rounded-lg border border-music-border text-music-inkLight hover:text-rose-700 hover:bg-rose-50 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Student Modal */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => {
          setIsStudentModalOpen(false);
          setEditingStudent(null);
        }}
        studentToEdit={editingStudent}
      />

      {/* Account Modal (Admin Management) */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => {
          setIsAccountModalOpen(false);
          setEditingAccount(null);
        }}
        accountToEdit={editingAccount}
      />

      {/* Class & Group Modal (Admin Management) */}
      <ClassModal
        isOpen={isClassModalOpen}
        onClose={() => {
          setIsClassModalOpen(false);
          setEditingClass(null);
        }}
        classToEdit={editingClass}
      />

      {/* Student Dossier Modal (Triggered by Eye Icon) */}
      <StudentDossierModal
        isOpen={!!selectedStudentForDossier}
        student={selectedStudentForDossier}
        onClose={() => setSelectedStudentForDossier(null)}
        onEditStudent={(std) => {
          setSelectedStudentForDossier(null);
          setEditingStudent(std);
          setIsStudentModalOpen(true);
        }}
      />

      {/* Student Monthly Attendance History Modal */}
      <StudentAttendanceHistoryModal
        isOpen={!!studentForAttendanceHistory}
        student={studentForAttendanceHistory}
        onClose={() => setStudentForAttendanceHistory(null)}
      />

    </div>
  );
}
