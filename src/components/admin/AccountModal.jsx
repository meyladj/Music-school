import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  KeyRound,
  Shield,
  UserCheck,
  GraduationCap,
  Sparkles,
  Lock,
  User,
  Mail,
  FileText,
  Check
} from 'lucide-react';

export default function AccountModal({ isOpen, onClose, accountToEdit }) {
  const {
    students,
    teachers,
    createAccount,
    updateAccount,
    showToast
  } = useApp();

  const [role, setRole] = useState('student'); // 'student' | 'teacher' | 'hybrid' | 'admin'
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('piano2026');
  const [linkedEntityId, setLinkedEntityId] = useState('');
  const [linkedTeacherId, setLinkedTeacherId] = useState('');
  const [linkedStudentId, setLinkedStudentId] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (accountToEdit) {
      setRole(accountToEdit.role || 'student');
      setName(accountToEdit.name || '');
      setUsername(accountToEdit.username || '');
      setEmail(accountToEdit.email || '');
      setPassword(accountToEdit.password || '');
      setLinkedEntityId(accountToEdit.linkedEntityId || '');
      setLinkedTeacherId(accountToEdit.linkedTeacherId || '');
      setLinkedStudentId(accountToEdit.linkedStudentId || '');
      setNotes(accountToEdit.notes || '');
      setStatus(accountToEdit.status || 'active');
    } else {
      setRole('student');
      setName('');
      setUsername('');
      setEmail('');
      setPassword('piano2026');
      setLinkedEntityId('');
      setLinkedTeacherId('');
      setLinkedStudentId('');
      setNotes('');
      setStatus('active');
    }
  }, [accountToEdit, isOpen]);

  if (!isOpen) return null;

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'student') {
      setPassword('piano2026');
    } else if (newRole === 'teacher') {
      setPassword('prof2026');
    } else if (newRole === 'hybrid') {
      setPassword('hybrid2026');
    } else {
      setPassword('admin2026');
    }
  };

  const handleLinkStudent = (studentId) => {
    setLinkedEntityId(studentId);
    setLinkedStudentId(studentId);
    const std = students.find(s => s.id === studentId);
    if (std) {
      setName(`${std.firstName} ${std.lastName}`);
      setUsername(std.matricule);
      setEmail(std.email || '');
      setPassword(std.password || 'piano2026');
      setNotes(`Compte associé au dossier élève ${std.matricule} (${std.instrument})`);
    }
  };

  const handleLinkTeacher = (teacherId) => {
    setLinkedEntityId(teacherId);
    setLinkedTeacherId(teacherId);
    const tch = teachers.find(t => t.id === teacherId);
    if (tch) {
      setName(tch.name);
      setUsername(tch.username || tch.email.split('@')[0]);
      setEmail(tch.email);
      setPassword(tch.password || 'prof2026');
      setNotes(`Compte associé à la classe de ${tch.instrument}`);
    }
  };

  const generatePassword = () => {
    const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
    let res = '';
    for (let i = 0; i < 8; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !password) {
      showToast('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    if (accountToEdit) {
      updateAccount(accountToEdit.id, {
        name,
        role,
        username,
        email,
        password,
        linkedEntityId: linkedEntityId || null,
        linkedTeacherId: linkedTeacherId || null,
        linkedStudentId: linkedStudentId || null,
        notes,
        status
      });
    } else {
      createAccount({
        name,
        role,
        username,
        email: email || `${username}@ilotmusique-alger.com`,
        password,
        linkedEntityId: linkedEntityId || null,
        linkedTeacherId: linkedTeacherId || null,
        linkedStudentId: linkedStudentId || null,
        notes: notes || `Compte ${role} attribué par la direction`,
        status
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-3xl border border-music-border shadow-elevated overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="p-6 border-b border-music-border flex items-center justify-between bg-gradient-to-r from-amber-50/60 via-white to-amber-50/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-music-gold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-music-ink">
                {accountToEdit ? 'Modifier le Compte d’Accès' : 'Créer un Compte & Assigner les Droits'}
              </h3>
              <p className="text-xs text-music-inkMuted">
                L’administrateur définit le rôle (Étudiant, Professeur, Hybride ou Admin) et les accès au portail
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-music-inkLight hover:text-music-ink hover:bg-music-card border border-music-border transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Role Choice (Admin decides if it's Student, Teacher, or Hybrid!) */}
          <div>
            <label className="block font-bold text-music-ink mb-1.5 uppercase tracking-wider text-[11px]">
              Type de Compte à Assigner (Décision Direction) :
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`flex flex-col items-center p-2.5 rounded-2xl border transition text-center ${
                  role === 'student'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-500'
                    : 'bg-white hover:bg-music-card border-music-border text-music-inkMuted'
                }`}
              >
                <GraduationCap className={`w-4 h-4 mb-1 ${role === 'student' ? 'text-emerald-700' : 'text-music-inkLight'}`} />
                <span className="text-xs">Élève</span>
                <span className="text-[9px] text-music-inkLight mt-0.5">Apprenant</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('teacher')}
                className={`flex flex-col items-center p-2.5 rounded-2xl border transition text-center ${
                  role === 'teacher'
                    ? 'bg-purple-50 border-purple-500 text-purple-950 font-bold shadow-xs ring-1 ring-purple-500'
                    : 'bg-white hover:bg-music-card border-music-border text-music-inkMuted'
                }`}
              >
                <UserCheck className={`w-4 h-4 mb-1 ${role === 'teacher' ? 'text-purple-700' : 'text-music-inkLight'}`} />
                <span className="text-xs">Professeur</span>
                <span className="text-[9px] text-music-inkLight mt-0.5">Enseignant</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('hybrid')}
                className={`flex flex-col items-center p-2.5 rounded-2xl border transition text-center ${
                  role === 'hybrid'
                    ? 'bg-cyan-50 border-cyan-500 text-cyan-950 font-bold shadow-xs ring-1 ring-cyan-500'
                    : 'bg-white hover:bg-music-card border-music-border text-music-inkMuted'
                }`}
              >
                <Sparkles className={`w-4 h-4 mb-1 ${role === 'hybrid' ? 'text-cyan-700' : 'text-music-inkLight'}`} />
                <span className="text-xs">Hybride</span>
                <span className="text-[9px] text-music-inkLight mt-0.5">Prof & Élève</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`flex flex-col items-center p-2.5 rounded-2xl border transition text-center ${
                  role === 'admin'
                    ? 'bg-amber-50 border-music-gold text-amber-950 font-bold shadow-xs ring-1 ring-music-gold'
                    : 'bg-white hover:bg-music-card border-music-border text-music-inkMuted'
                }`}
              >
                <Shield className={`w-4 h-4 mb-1 ${role === 'admin' ? 'text-music-gold' : 'text-music-inkLight'}`} />
                <span className="text-xs">Admin</span>
                <span className="text-[9px] text-music-inkLight mt-0.5">Direction</span>
              </button>

            </div>
          </div>

          {/* Quick link to existing student or teacher */}
          {role === 'student' && !accountToEdit && (
            <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-music-gold/40">
              <label className="block font-bold text-music-ink mb-1">
                Lier à un Dossier Apprenant existant :
              </label>
              <select
                value={linkedEntityId}
                onChange={(e) => handleLinkStudent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white focus:ring-2 focus:ring-music-gold"
              >
                <option value="">-- Sélectionner un élève pour pré-remplir --</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.matricule} • {s.firstName} {s.lastName} ({s.instrument})
                  </option>
                ))}
              </select>
            </div>
          )}

          {role === 'teacher' && !accountToEdit && (
            <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-purple-200">
              <label className="block font-bold text-music-ink mb-1">
                Lier à un Enseignant du Conservatoire :
              </label>
              <select
                value={linkedEntityId}
                onChange={(e) => handleLinkTeacher(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white focus:ring-2 focus:ring-purple-500"
              >
                <option value="">-- Sélectionner un enseignant --</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.instrument})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Double Link for Hybrid User */}
          {role === 'hybrid' && (
            <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-2.5">
              <div className="text-xs font-bold text-cyan-950 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-cyan-700" />
                <span>Configuration du Profil Hybride (Double Casquette) :</span>
              </div>
              <p className="text-[11px] text-cyan-900/90">
                L'utilisateur pourra basculer à tout moment entre son espace Professeur (gérer ses élèves) et son espace Apprenant (travailler ses pièces).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-cyan-950 text-[11px] mb-1">1. Profil Enseignant :</label>
                  <select
                    value={linkedTeacherId}
                    onChange={(e) => {
                      setLinkedTeacherId(e.target.value);
                      const t = teachers.find(tch => tch.id === e.target.value);
                      if (t && !name) setName(t.name);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-cyan-300 text-xs bg-white"
                  >
                    <option value="">-- Choisir le profil prof --</option>
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.instrument})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-cyan-950 text-[11px] mb-1">2. Profil Apprenant :</label>
                  <select
                    value={linkedStudentId}
                    onChange={(e) => {
                      setLinkedStudentId(e.target.value);
                      const s = students.find(std => std.id === e.target.value);
                      if (s && !username) setUsername(s.matricule);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-cyan-300 text-xs bg-white"
                  >
                    <option value="">-- Choisir le profil élève --</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.matricule} • {s.firstName} {s.lastName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Account Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-music-ink mb-1">Nom Complet</label>
              <div className="relative">
                <User className="w-4 h-4 text-music-inkLight absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Rayan Mansouri"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-music-border text-xs focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-music-ink mb-1">
                {role === 'student' ? 'Identifiant / Matricule' : 'Nom d’utilisateur (Username)'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-music-inkLight absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={role === 'student' ? 'IMA-2026-XXX' : 'prenom.nom'}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-music-border text-xs font-mono focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-music-ink mb-1">Email de contact</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-music-inkLight absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@exemple.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-music-border text-xs focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-music-ink">Mot de passe</label>
                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-[10px] text-music-gold font-bold hover:underline flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Générer</span>
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-music-inkLight absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-music-border text-xs font-mono font-bold focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-music-ink mb-1">Notes / Instructions pour la Direction</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Compte créé pour la formule 2 cours par semaine..."
              className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:ring-2 focus:ring-music-gold bg-white"
            />
          </div>

          {/* Status radio */}
          <div className="flex items-center space-x-4 pt-1">
            <span className="font-bold text-music-ink text-xs">Statut immédiat :</span>
            <label className="flex items-center space-x-1.5 cursor-pointer text-xs">
              <input
                type="radio"
                name="status"
                value="active"
                checked={status === 'active'}
                onChange={() => setStatus('active')}
                className="text-music-gold"
              />
              <span className="text-emerald-700 font-bold">Actif (autorisé à se connecter)</span>
            </label>
            <label className="flex items-center space-x-1.5 cursor-pointer text-xs">
              <input
                type="radio"
                name="status"
                value="suspended"
                checked={status === 'suspended'}
                onChange={() => setStatus('suspended')}
                className="text-rose-600"
              />
              <span className="text-rose-700 font-bold">Suspendu</span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-music-border flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-music-border text-music-inkMuted hover:text-music-ink text-xs font-bold transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-xs transition"
            >
              {accountToEdit ? 'Enregistrer les Modifications' : 'Créer et Assigner le Compte'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
