import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  User,
  Music,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Printer,
  Edit2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Award,
  BookOpen,
  Check,
  FileText
} from 'lucide-react';

export default function StudentDossierModal({ student, isOpen, onClose, onEditStudent }) {
  const {
    teachers,
    classes,
    payments,
    pieces,
    attendance,
    evaluations,
    setReceiptToView,
    showToast
  } = useApp();

  const [showPassword, setShowPassword] = useState(false);
  const [activeDossierTab, setActiveDossierTab] = useState('overview'); // 'overview' | 'repertoire' | 'attendance' | 'payments'

  if (!isOpen || !student) return null;

  const teacher = teachers.find(t => t.id === student.teacherId);
  const studentClasses = classes.filter(c => (c.studentIds || []).includes(student.id));
  const studentPieces = pieces.filter(p => p.studentId === student.id);
  const studentAttendance = attendance.filter(a => a.studentId === student.id);
  const studentPayments = payments.filter(p => p.studentId === student.id);
  const currentPayment = studentPayments.find(p => p.month === 'Septembre 2026') || studentPayments[0];
  const currentEval = evaluations.find(e => e.studentId === student.id && e.period === 'Septembre 2026');

  // Compute attendance stats
  const finishedSessions = studentAttendance.filter(s => s.status !== 'planned');
  const presentCount = finishedSessions.filter(s => s.status === 'present').length;
  const excusedCount = finishedSessions.filter(s => s.status === 'absent_excused').length;
  const unexcusedCount = finishedSessions.filter(s => s.status === 'absent_unexcused').length;
  const attendanceRate = finishedSessions.length > 0
    ? Math.round((presentCount / finishedSessions.length) * 100)
    : 100;

  const handleCopyCredentials = () => {
    const text = `🎵 *Îlot Musique Alger — Fiche d'Accès Élève*\n\n` +
      `Apprenant : ${student.firstName} ${student.lastName}\n` +
      `Matricule : ${student.matricule}\n` +
      `Instrument : ${student.instrument} (${student.level})\n` +
      `Professeur : ${teacher ? teacher.name : 'Attribué'}\n\n` +
      `🔑 *Identifiants Espace Web :*\n` +
      `Identifiant : ${student.username || student.matricule}\n` +
      `Mot de passe : ${student.password || 'piano2026'}\n\n` +
      `Lien d'accès : https://ilot-musique-alger.dz/connexion`;

    navigator.clipboard.writeText(text);
    showToast?.('Identifiants copiés pour envoi aux parents !', 'success');
  };

  const handlePrintDossier = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=750');
    if (!printWindow) {
      alert("Veuillez autoriser les fenêtres pop-up pour imprimer la fiche dossier.");
      return;
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Dossier Apprenant — ${student.firstName} ${student.lastName} (${student.matricule})</title>
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; margin: 0; padding: 20px; line-height: 1.5; font-size: 13px; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #C28422; padding-bottom: 12px; margin-bottom: 20px; }
    .brand { font-size: 22px; font-weight: bold; color: #111; }
    .badge { background: #FFF4E5; border: 1px solid #C28422; color: #8C5B0E; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 11px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 18px; }
    .section-title { font-size: 13px; font-weight: bold; text-transform: uppercase; color: #C28422; border-bottom: 1px solid #eee; padding-bottom: 4px; margin-bottom: 10px; letter-spacing: 0.5px; }
    .field { margin-bottom: 6px; }
    .label { font-size: 11px; color: #666; display: block; }
    .val { font-weight: 600; color: #222; }
    .card { background: #FAF8F5; border: 1px solid #EADBCC; padding: 14px; border-radius: 8px; }
    .creds-box { background: #FFFBF2; border: 1px dashed #C28422; padding: 12px; border-radius: 8px; margin-top: 15px; }
    .footer { margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 10px; color: #777; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">Îlot Musique Alger</div>
      <div style="font-size: 11px; color: #666;">Conservatoire & Pôle d'Enseignement Musical Supérieur</div>
    </div>
    <div style="text-align: right;">
      <div class="badge">DOSSIER OFFICIEL APPRENANT</div>
      <div style="font-family: monospace; font-size: 12px; font-weight: bold; margin-top: 4px;">Matricule : ${student.matricule}</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="section-title">1. État Civil & Identité</div>
      <div class="field"><span class="label">Nom & Prénom</span><span class="val">${student.lastName} ${student.firstName}</span></div>
      <div class="field"><span class="label">Âge & Genre</span><span class="val">${student.age} ans • ${student.gender === 'F' ? 'Féminin' : 'Masculin'}</span></div>
      <div class="field"><span class="label">Date d'inscription</span><span class="val">${student.enrolledDate || '15/09/2024'}</span></div>
      <div class="field"><span class="label">Statut du dossier</span><span class="val">${student.status || 'Actif'}</span></div>
    </div>

    <div class="card">
      <div class="section-title">2. Cursus & Pédagogie</div>
      <div class="field"><span class="label">Discipline / Instrument</span><span class="val">${student.instrument}</span></div>
      <div class="field"><span class="label">Niveau d'étude</span><span class="val">${student.level}</span></div>
      <div class="field"><span class="label">Professeur Référent</span><span class="val">${teacher ? teacher.name : 'Non assigné'} (${teacher?.phone || '0550 12 34 56'})</span></div>
      <div class="field"><span class="label">Emploi du temps</span><span class="val">${student.sessionsPerWeek} séance(s) / sem. — ${student.scheduleDays}</span></div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="section-title">3. Tuteur Légal & Contact</div>
      <div class="field"><span class="label">Parent / Tuteur</span><span class="val">${student.guardianName || 'Non renseigné'}</span></div>
      <div class="field"><span class="label">Téléphone de contact</span><span class="val">${student.phone}</span></div>
      <div class="field"><span class="label">Adresse email</span><span class="val">${student.email}</span></div>
      <div class="field"><span class="label">Adresse de résidence</span><span class="val">${student.address || 'Alger'}</span></div>
    </div>

    <div class="card">
      <div class="section-title">4. Scolarité & Finances</div>
      <div class="field"><span class="label">Cotisation mensuelle</span><span class="val">${student.tuitionFee?.toLocaleString('fr-FR')} DZD / mois</span></div>
      <div class="field"><span class="label">État du mois en cours</span><span class="val">${currentPayment?.status === 'paid' ? 'À JOUR (Réglé)' : 'EN ATTENTE'}</span></div>
      <div class="field"><span class="label">Assiduité globale</span><span class="val">${attendanceRate}% de présence (${presentCount} présences, ${excusedCount + unexcusedCount} absences)</span></div>
      <div class="field"><span class="label">Morceaux d'étude en cours</span><span class="val">${studentPieces.length} pièces assignées</span></div>
    </div>
  </div>

  <div class="creds-box">
    <div class="section-title" style="margin-bottom: 6px;">5. Accès Numérique — Espace Web Élève</div>
    <div style="display: flex; justify-content: space-between; font-family: monospace;">
      <div>Identifiant : <strong>${student.username || student.matricule}</strong></div>
      <div>Mot de passe : <strong>${student.password || 'piano2026'}</strong></div>
      <div>Portail : <strong>https://ilot-musique-alger.dz</strong></div>
    </div>
  </div>

  <div class="footer">
    Document certifié par l'administration du Conservatoire Îlot Musique Alger • Édité le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
  </div>
</body>
</html>`;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl border border-music-border shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF4EA] to-[#FFFDF9] p-6 border-b border-music-border relative shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Student Identity Card */}
            <div className="flex items-center space-x-4">
              <img
                src={student.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'}
                alt={student.firstName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-music-gold shadow-sm shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold bg-music-gold text-white px-2.5 py-0.5 rounded-lg shadow-2xs">
                    {student.matricule}
                  </span>
                  <span className="text-xs text-amber-900 font-bold bg-amber-100/90 px-2.5 py-0.5 rounded-lg border border-amber-200">
                    {student.level}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                    student.status === 'Actif'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    ● {student.status || 'Actif'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-bold text-music-ink">
                  {student.firstName} {student.lastName}
                </h2>

                <p className="text-xs sm:text-sm text-music-inkMuted flex items-center space-x-2 mt-0.5">
                  <Music className="w-4 h-4 text-music-gold shrink-0" />
                  <span>Classe de <strong>{student.instrument}</strong> • Professeur : {teacher ? teacher.name : 'Non assigné'}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handlePrintDossier}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 text-music-ink font-bold text-xs border border-music-border shadow-2xs transition"
                title="Imprimer la fiche dossier A4"
              >
                <Printer className="w-4 h-4 text-music-gold" />
                <span>Imprimer / PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEditStudent(student);
                }}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-soft transition"
              >
                <Edit2 className="w-4 h-4" />
                <span>Modifier le Dossier</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white hover:bg-rose-50 text-music-inkLight hover:text-rose-600 border border-music-border transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center space-x-2 mt-5 border-t border-music-border/60 pt-3 overflow-x-auto">
            <button
              onClick={() => setActiveDossierTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeDossierTab === 'overview'
                  ? 'bg-music-ink text-white shadow-xs'
                  : 'bg-white/80 text-music-inkMuted hover:bg-white hover:text-music-ink'
              }`}
            >
              Fiche Générale & Accès Web
            </button>
            <button
              onClick={() => setActiveDossierTab('repertoire')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center space-x-1.5 ${
                activeDossierTab === 'repertoire'
                  ? 'bg-music-ink text-white shadow-xs'
                  : 'bg-white/80 text-music-inkMuted hover:bg-white hover:text-music-ink'
              }`}
            >
              <span>Répertoire & Morceaux</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-music-gold text-white">{studentPieces.length}</span>
            </button>
            <button
              onClick={() => setActiveDossierTab('attendance')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center space-x-1.5 ${
                activeDossierTab === 'attendance'
                  ? 'bg-music-ink text-white shadow-xs'
                  : 'bg-white/80 text-music-inkMuted hover:bg-white hover:text-music-ink'
              }`}
            >
              <span>Assiduité & Séances</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-700 text-white">{attendanceRate}%</span>
            </button>
            <button
              onClick={() => setActiveDossierTab('payments')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center space-x-1.5 ${
                activeDossierTab === 'payments'
                  ? 'bg-music-ink text-white shadow-xs'
                  : 'bg-white/80 text-music-inkMuted hover:bg-white hover:text-music-ink'
              }`}
            >
              <span>Scolarité & Quittances</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${currentPayment?.status === 'paid' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
                {currentPayment?.status === 'paid' ? 'À jour' : 'En attente'}
              </span>
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* TAB 1: OVERVIEW & CREDENTIALS */}
          {activeDossierTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Web Credentials Card (Priority for Admin) */}
              <div className="bg-gradient-to-r from-amber-50/80 via-[#FFFDF9] to-amber-50/80 rounded-2xl border-2 border-music-gold/40 p-5 shadow-soft">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-music-gold">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-music-ink">
                        Accès Numérique à l'Espace Étudiant
                      </h4>
                      <p className="text-[11px] text-music-inkMuted">
                        Identifiants générés par l'administration pour la connexion web de l'élève
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCredentials}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-xs transition self-start sm:self-auto"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier la Fiche Parent (WhatsApp/SMS)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3.5">
                  <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">
                      Identifiant de Connexion
                    </span>
                    <div className="font-mono font-bold text-sm text-music-ink mt-1 select-all">
                      {student.username || student.matricule}
                    </div>
                    <span className="text-[10px] text-music-inkMuted mt-0.5 block">
                      Matricule ou pseudo attribué
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider">
                        Mot de Passe
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[10px] font-bold text-music-gold hover:underline flex items-center space-x-1"
                      >
                        {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span>{showPassword ? 'Masquer' : 'Afficher'}</span>
                      </button>
                    </div>
                    <div className="font-mono font-bold text-sm text-music-ink mt-1 select-all">
                      {showPassword ? (student.password || 'piano2026') : '••••••••••'}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">
                      ✓ Compte actif & opérationnel
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">
                      Statut de l'Espace Web
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-bold text-xs text-emerald-900">Actif & Autorisé</span>
                    </div>
                    <span className="text-[10px] text-music-inkMuted mt-0.5 block">
                      Créé le {student.accountCreatedDate || student.enrolledDate || '15/09/2024'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Detail Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Pedagogical info */}
                <div className="bg-white p-5 rounded-2xl border border-music-border shadow-soft space-y-3">
                  <h4 className="font-display font-bold text-sm text-music-ink flex items-center space-x-2 border-b border-music-borderLight pb-2">
                    <BookOpen className="w-4 h-4 text-music-gold" />
                    <span>Cursus & Pédagogie Musicale</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-music-borderLight">
                      <span className="text-music-inkMuted">Discipline :</span>
                      <strong className="text-music-ink">{student.instrument}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-music-borderLight">
                      <span className="text-music-inkMuted">Niveau au Conservatoire :</span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[11px]">
                        {student.level}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-music-borderLight">
                      <span className="text-music-inkMuted">Professeur Référent :</span>
                      <strong className="text-music-ink">{teacher ? teacher.name : 'Non assigné'}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-music-borderLight">
                      <span className="text-music-inkMuted">Fréquence des cours :</span>
                      <span className="font-mono font-bold text-music-ink">
                        {student.sessionsPerWeek} séance{student.sessionsPerWeek > 1 ? 's' : ''} / semaine
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-music-borderLight">
                      <span className="text-music-inkMuted">Jours & Horaires d'atelier :</span>
                      <strong className="text-music-ink">{student.scheduleDays}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-music-inkMuted">Classes / Groupes :</span>
                      <span className="text-music-ink font-semibold">
                        {studentClasses.length > 0 ? studentClasses.map(c => c.name).join(', ') : 'Groupe standard'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Family & Contact info */}
                <div className="bg-white p-5 rounded-2xl border border-music-border shadow-soft space-y-3">
                  <h4 className="font-display font-bold text-sm text-music-ink flex items-center space-x-2 border-b border-music-borderLight pb-2">
                    <User className="w-4 h-4 text-music-cypress" />
                    <span>Contact & Tuteur Légal</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-music-borderLight">
                      <span className="text-music-inkMuted">Âge de l'apprenant :</span>
                      <strong className="text-music-ink">{student.age} ans ({student.gender === 'F' ? 'Fille' : 'Garçon'})</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-music-borderLight">
                      <span className="text-music-inkMuted">Parent / Tuteur :</span>
                      <strong className="text-music-ink">{student.guardianName || 'Non spécifié'}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-music-borderLight">
                      <span className="text-music-inkMuted">Téléphone de contact :</span>
                      <a href={`tel:${student.phone}`} className="font-mono font-bold text-music-gold hover:underline flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{student.phone}</span>
                      </a>
                    </div>
                    <div className="flex justify-between py-1 border-b border-music-borderLight">
                      <span className="text-music-inkMuted">Adresse email :</span>
                      <a href={`mailto:${student.email}`} className="text-music-ink hover:underline truncate max-w-[200px]">
                        {student.email}
                      </a>
                    </div>
                    <div className="flex justify-between py-1 border-b border-music-borderLight">
                      <span className="text-music-inkMuted">Lieu de résidence :</span>
                      <strong className="text-music-ink">{student.address || 'Alger'}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-music-inkMuted">Date d'inscription :</span>
                      <span className="font-mono text-music-inkLight">{student.enrolledDate || '15/09/2024'}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Monthly Evaluation Summary */}
              {currentEval && (
                <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-music-border shadow-2xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-music-borderLight">
                    <span className="text-xs font-bold text-purple-900 flex items-center space-x-1.5">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span>Dernier Bulletin d'Évaluation — {currentEval.period}</span>
                    </span>
                    <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-900">
                      Moyenne : {((currentEval.solfegeScore + currentEval.techniqueScore + currentEval.musicalityScore + currentEval.regularityScore) / 4).toFixed(1)} / 20
                    </span>
                  </div>
                  <p className="text-xs text-music-ink italic">
                    « {currentEval.generalAppreciation || 'Élève consciencieux avec une très belle musicalité.'} »
                  </p>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: REPERTOIRE */}
          {activeDossierTab === 'repertoire' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h4 className="font-display font-bold text-sm text-music-ink">
                  Morceaux & Pièces du Répertoire ({studentPieces.length})
                </h4>
                <span className="text-xs text-music-inkMuted">
                  Exercices et morceaux assignés par l'enseignant
                </span>
              </div>

              {studentPieces.length === 0 ? (
                <div className="text-center py-10 text-xs text-music-inkLight bg-music-card rounded-2xl border border-music-border">
                  Aucune pièce d'étude actuellement assignée à cet élève.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studentPieces.map(piece => (
                    <div key={piece.id} className="p-4 rounded-2xl border border-music-border bg-white shadow-soft space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="flex items-center space-x-1.5 mb-1">
                            <span className="text-[10px] font-mono font-bold text-music-inkLight">
                              {piece.difficulty} • {piece.key}
                            </span>
                          </div>
                          <h5 className="font-display font-bold text-base text-music-ink">{piece.title}</h5>
                          <p className="text-xs text-music-inkMuted italic">{piece.composer}</p>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          piece.status === 'maitrise'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {piece.status === 'maitrise' ? '★ Maîtrisé' : 'En cours'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-music-inkMuted">Maîtrise :</span>
                          <span className="font-mono font-bold text-music-ink">{piece.progress}%</span>
                        </div>
                        <div className="w-full bg-music-paper rounded-full h-2 overflow-hidden">
                          <div className="bg-music-gold h-full rounded-full" style={{ width: `${piece.progress}%` }} />
                        </div>
                      </div>

                      {piece.teacherNotes && (
                        <p className="text-[11px] text-music-inkMuted italic bg-[#FFFDF9] p-2 rounded-xl border border-amber-100">
                          « {piece.teacherNotes} »
                        </p>
                      )}

                      <div className="flex justify-between items-center pt-2 border-t border-music-borderLight text-[11px] text-music-inkMuted">
                        <span>Tempo : {piece.tempo}</span>
                        <span>{piece.exercises?.length || 0} exercices</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ATTENDANCE */}
          {activeDossierTab === 'attendance' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-music-border text-center">
                  <span className="text-[10px] font-bold text-music-inkMuted uppercase tracking-wider block">Taux Présence</span>
                  <span className="text-2xl font-mono font-bold text-emerald-800 mt-0.5 block">{attendanceRate}%</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-music-border text-center">
                  <span className="text-[10px] font-bold text-music-inkMuted uppercase tracking-wider block">Présences (P)</span>
                  <span className="text-2xl font-mono font-bold text-music-cypress mt-0.5 block">{presentCount}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-music-border text-center">
                  <span className="text-[10px] font-bold text-music-inkMuted uppercase tracking-wider block">Justifiées (J)</span>
                  <span className="text-2xl font-mono font-bold text-amber-600 mt-0.5 block">{excusedCount}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-music-border text-center">
                  <span className="text-[10px] font-bold text-music-inkMuted uppercase tracking-wider block">Injustifiées (A)</span>
                  <span className="text-2xl font-mono font-bold text-rose-600 mt-0.5 block">{unexcusedCount}</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-music-border overflow-hidden">
                <div className="p-3.5 bg-music-card border-b border-music-border font-bold text-xs text-music-ink">
                  Historique détaillé des séances — Septembre 2026
                </div>
                <div className="divide-y divide-music-borderLight">
                  {studentAttendance.length === 0 ? (
                    <div className="p-6 text-center text-xs text-music-inkLight">
                      Aucune séance enregistrée pour cet élève.
                    </div>
                  ) : (
                    studentAttendance.map(s => (
                      <div key={s.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-amber-50/20 transition">
                        <div className="flex items-center space-x-3">
                          <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center text-white ${
                            s.status === 'present'
                              ? 'bg-music-cypress'
                              : s.status === 'absent_excused'
                              ? 'bg-amber-500'
                              : s.status === 'absent_unexcused'
                              ? 'bg-rose-600'
                              : 'bg-music-border text-music-ink'
                          }`}>
                            {s.status === 'present' ? 'P' : s.status === 'absent_excused' ? 'J' : s.status === 'absent_unexcused' ? 'A' : '·'}
                          </span>
                          <div>
                            <div className="font-bold text-music-ink">
                              Séance #{s.sessionNumber} • {s.day} {s.date}
                            </div>
                            {s.note && (
                              <div className="text-[11px] text-amber-950 italic mt-0.5">
                                « {s.note} »
                              </div>
                            )}
                          </div>
                        </div>

                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full self-start sm:self-auto ${
                          s.status === 'present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.status === 'absent_excused'
                            ? 'bg-amber-100 text-amber-800'
                            : s.status === 'absent_unexcused'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {s.status === 'present' ? 'Présent' : s.status === 'absent_excused' ? 'Absence Justifiée' : s.status === 'absent_unexcused' ? 'Absence Non Justifiée' : 'Planifié'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENTS & RECEIPTS */}
          {activeDossierTab === 'payments' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h4 className="font-display font-bold text-sm text-music-ink">
                  Historique des Frais de Scolarité & Quittances
                </h4>
                <div className="font-mono font-bold text-xs text-music-ink">
                  Tarif Mensuel : <strong className="text-music-gold text-sm">{student.tuitionFee?.toLocaleString('fr-FR')} DZD</strong>
                </div>
              </div>

              <div className="space-y-3">
                {studentPayments.map(p => (
                  <div key={p.id} className="p-4 rounded-2xl bg-white border border-music-border shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        p.status === 'paid'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : p.status === 'overdue'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-music-ink">{p.month}</div>
                        <div className="text-[11px] text-music-inkMuted">
                          Quittance N° : <span className="font-mono">{p.receiptNumber}</span> • {p.paymentMethod} {p.paidDate ? `le ${p.paidDate}` : ''}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 self-end sm:self-auto">
                      <div className="text-right">
                        <div className="font-mono font-bold text-sm text-music-ink">{p.amount?.toLocaleString('fr-FR')} DZD</div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                          p.status === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.status === 'overdue'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.status === 'paid' ? 'Payé' : p.status === 'overdue' ? 'En Retard' : 'En Attente'}
                        </span>
                      </div>

                      {p.status === 'paid' && (
                        <button
                          type="button"
                          onClick={() => {
                            setReceiptToView(p);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 transition shadow-2xs"
                        >
                          Quittance PDF
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-music-card border-t border-music-border flex justify-between items-center shrink-0">
          <span className="text-xs text-music-inkMuted font-mono">
            Matricule : {student.matricule} • Îlot Musique Alger
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-music-ink hover:bg-music-ink/90 text-white font-bold text-xs shadow-soft transition"
          >
            Fermer le Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
