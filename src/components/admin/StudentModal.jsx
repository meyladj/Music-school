import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  UserPlus,
  Save,
  User,
  Phone,
  Award,
  KeyRound,
  ShieldCheck,
  Copy,
  RefreshCw,
  Check
} from 'lucide-react';

export default function StudentModal({ isOpen, onClose, studentToEdit = null }) {
  const { addStudent, updateStudent, teachers, instrumentCategories, showToast } = useApp();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: 12,
    gender: 'M',
    instrument: 'Piano',
    teacherId: teachers[0]?.id || 'prof-1',
    level: 'Débutant',
    sessionsPerWeek: 2,
    scheduleDays: 'Mercredi 16h00 & Samedi 10h00',
    tuitionFee: 10000,
    guardianName: '',
    phone: '',
    email: '',
    address: 'Alger',
    // Student Portal Web Credentials created by Admin
    accountActive: true,
    username: '',
    password: ''
  });

  const [isCopied, setIsCopied] = useState(false);

  // Generate random password helper
  const generateRandomPassword = () => {
    const words = ['musique', 'piano', 'luth', 'violon', 'rythme', 'solfege', 'harmonie'];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `${randomWord}${randomNum}`;
  };

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        firstName: studentToEdit.firstName || '',
        lastName: studentToEdit.lastName || '',
        age: studentToEdit.age || 12,
        gender: studentToEdit.gender || 'M',
        instrument: studentToEdit.instrument || 'Piano',
        teacherId: studentToEdit.teacherId || teachers[0]?.id || 'prof-1',
        level: studentToEdit.level || 'Débutant',
        sessionsPerWeek: studentToEdit.sessionsPerWeek || 2,
        scheduleDays: studentToEdit.scheduleDays || '',
        tuitionFee: studentToEdit.tuitionFee || (studentToEdit.sessionsPerWeek === 1 ? 6500 : 10000),
        guardianName: studentToEdit.guardianName || '',
        phone: studentToEdit.phone || '',
        email: studentToEdit.email || '',
        address: studentToEdit.address || 'Alger',
        accountActive: studentToEdit.accountActive !== false,
        username: studentToEdit.username || (studentToEdit.matricule ? studentToEdit.matricule.toLowerCase() : ''),
        password: studentToEdit.password || 'piano2026'
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        age: 12,
        gender: 'M',
        instrument: 'Piano',
        teacherId: teachers[0]?.id || 'prof-1',
        level: 'Débutant',
        sessionsPerWeek: 2,
        scheduleDays: 'Mercredi 16h00 & Samedi 10h00',
        tuitionFee: 10000,
        guardianName: '',
        phone: '',
        email: '',
        address: 'Alger',
        accountActive: true,
        username: '',
        password: generateRandomPassword()
      });
    }
  }, [studentToEdit, isOpen, teachers]);

  const handleSessionsChange = (num) => {
    setFormData(prev => ({
      ...prev,
      sessionsPerWeek: num,
      tuitionFee: num === 1 ? 6500 : 10000,
      scheduleDays: num === 1 ? 'Samedi 14h00' : 'Mercredi 16h00 & Samedi 10h00'
    }));
  };

  // Auto suggest username when name is typed
  const handleNameChange = (field, val) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: val };
      if (!studentToEdit && (!prev.username || prev.username.includes('.'))) {
        const first = field === 'firstName' ? val : prev.firstName;
        const last = field === 'lastName' ? val : prev.lastName;
        if (first || last) {
          updated.username = `${first.trim().toLowerCase()}.${last.trim().toLowerCase()}`.replace(/\s+/g, '');
        }
      }
      return updated;
    });
  };

  const copyAccessCard = () => {
    const text = `🎵 ÎLOT MUSIQUE ALGER — ACCÈS ESPACE ÉTUDIANT\nÉlève : ${formData.firstName} ${formData.lastName}\nDiscipline : ${formData.instrument}\nIdentifiant / Matricule : ${formData.username || 'Voir matricule'}\nMot de passe : ${formData.password}\nLien d'accès : http://localhost:3000`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    showToast('Fiche d’identifiants copiée dans le presse-papier pour envoi aux parents !');
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      alert('Veuillez renseigner le nom et le prénom de l’élève.');
      return;
    }

    if (studentToEdit) {
      updateStudent(studentToEdit.id, formData);
    } else {
      addStudent(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FFFDFB] rounded-3xl w-full max-w-2xl shadow-elevated overflow-hidden my-8 border border-music-border text-music-ink">
        
        {/* Header */}
        <div className="px-6 py-4 bg-music-card text-music-ink flex items-center justify-between border-b border-music-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-music-gold">
              {studentToEdit ? <Save className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-music-ink">
                {studentToEdit ? 'Modifier le Dossier Apprenant' : 'Créer un Dossier & Espace Étudiant'}
              </h3>
              <p className="text-xs text-music-inkMuted">
                L’administrateur crée le dossier personnel et génère les accès web de l'élève
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-music-parchment text-music-inkLight hover:text-music-ink transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-music-ink text-sm max-h-[80vh] overflow-y-auto">
          
          {/* SECTION 1: Identité de l'apprenant */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-music-inkLight mb-3 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-music-gold" />
              <span>1. Identité Civile de l’Apprenant</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-music-ink mb-1">Prénom *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleNameChange('firstName', e.target.value)}
                  placeholder="Ex: Rayan"
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-music-ink mb-1">Nom de famille *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleNameChange('lastName', e.target.value)}
                  placeholder="Ex: Mansouri"
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-music-ink mb-1">Âge</label>
                  <input
                    type="number"
                    min="4"
                    max="80"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-music-ink mb-1">Genre</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Cursus & Rythme */}
          <div className="pt-3 border-t border-music-borderLight">
            <h4 className="text-xs font-bold uppercase tracking-wider text-music-inkLight mb-3 flex items-center space-x-1.5">
              <Award className="w-3.5 h-3.5 text-music-gold" />
              <span>2. Discipline & Rythme des Séances</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-music-ink mb-1">Instrument / Catégorie</label>
                <select
                  value={formData.instrument}
                  onChange={(e) => setFormData({ ...formData, instrument: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                >
                  {instrumentCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-music-ink mb-1">Professeur assigné</label>
                <select
                  value={formData.teacherId}
                  onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.instrument})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-music-ink mb-1">Niveau d'étude</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                >
                  <option value="Éveil (4-6 ans)">Éveil (4-6 ans)</option>
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire 1">Intermédiaire 1</option>
                  <option value="Intermédiaire 2">Intermédiaire 2</option>
                  <option value="Avancé">Avancé</option>
                  <option value="Perfectionnement">Perfectionnement</option>
                </select>
              </div>
            </div>

            {/* Sessions Formula */}
            <div className="mt-3.5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="block text-xs font-bold text-amber-950 mb-0.5">
                    Rythme Hebdomadaire :
                  </label>
                  <p className="text-[11px] text-amber-900">
                    Détermine le nombre de séances mensuelles (4 ou 8 séances) et le barème de scolarité
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleSessionsChange(1)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      formData.sessionsPerWeek === 1
                        ? 'bg-music-ink text-white shadow-xs'
                        : 'bg-white text-music-ink border border-music-border hover:bg-music-card'
                    }`}
                  >
                    1 séance / semaine
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSessionsChange(2)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      formData.sessionsPerWeek === 2
                        ? 'bg-music-ink text-white shadow-xs'
                        : 'bg-white text-music-ink border border-music-border hover:bg-music-card'
                    }`}
                  >
                    2 séances / semaine
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-amber-200/60">
                <div>
                  <label className="block text-xs font-semibold text-music-ink mb-1">
                    Créneaux et Horaires convenus
                  </label>
                  <input
                    type="text"
                    value={formData.scheduleDays}
                    onChange={(e) => setFormData({ ...formData, scheduleDays: e.target.value })}
                    placeholder="Ex: Mardi 17h00 & Vendredi 15h00"
                    className="w-full px-3 py-1.5 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-music-ink mb-1">
                    Tarif mensuel (Dinars Algériens DZD)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="500"
                      value={formData.tuitionFee}
                      onChange={(e) => setFormData({ ...formData, tuitionFee: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded-xl border border-music-border text-xs font-mono font-bold text-music-ink focus:outline-none focus:ring-2 focus:ring-music-gold pr-14 bg-white"
                    />
                    <span className="absolute right-3 top-1.5 text-xs text-music-inkLight font-bold">DA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: CRÉATION & GESTION DE L'ESPACE ÉTUDIANT (Créé par l'Admin !) */}
          <div className="pt-3 border-t border-music-borderLight">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-music-inkLight flex items-center space-x-1.5">
                <KeyRound className="w-3.5 h-3.5 text-music-cypress" />
                <span>3. Espace Étudiant en Ligne (Créé par l'Admin)</span>
              </h4>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Accès Sécurisé
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-xs font-bold text-emerald-950 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.accountActive}
                    onChange={(e) => setFormData({ ...formData, accountActive: e.target.checked })}
                    className="w-4 h-4 rounded text-music-cypress accent-music-cypress cursor-pointer"
                  />
                  <span>Activer l'Espace Étudiant pour cet apprenant</span>
                </label>

                <button
                  type="button"
                  onClick={copyAccessCard}
                  className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-300 transition shadow-2xs"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-emerald-700" />}
                  <span>{isCopied ? 'Copié !' : 'Copier fiche parents'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1">
                    Identifiant de connexion web
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Ex: rayan.mansouri"
                    className="w-full px-3 py-2 rounded-xl border border-emerald-300 text-xs font-mono font-bold text-music-ink focus:outline-none focus:ring-2 focus:ring-music-cypress bg-white"
                  />
                  <span className="text-[10px] text-emerald-800 mt-1 block">
                    L'élève peut également se connecter avec son matricule officiel.
                  </span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-emerald-950">
                      Mot de passe d'accès
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, password: generateRandomPassword() })}
                      className="text-[10px] text-emerald-700 hover:text-emerald-900 font-bold flex items-center space-x-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Générer</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Mot de passe"
                    className="w-full px-3 py-2 rounded-xl border border-emerald-300 text-xs font-mono font-bold text-music-ink focus:outline-none focus:ring-2 focus:ring-music-cypress bg-white"
                  />
                  <span className="text-[10px] text-emerald-800 mt-1 block">
                    Remis à l'élève ou aux parents par SMS/WhatsApp.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Contact & Parent Info */}
          <div className="pt-3 border-t border-music-borderLight">
            <h4 className="text-xs font-bold uppercase tracking-wider text-music-inkLight mb-3 flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-music-gold" />
              <span>4. Coordonnées & Tuteur Légal</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-music-ink mb-1">Nom du tuteur / parent</label>
                <input
                  type="text"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  placeholder="Ex: Sofiane Mansouri (Père)"
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-music-ink mb-1">Numéro de Téléphone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0550 12 34 56"
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-music-ink mb-1">Email de correspondance</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="famille@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-music-ink mb-1">Commune / Adresse (Alger)</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ex: Hydra, Alger"
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:outline-none focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-music-borderLight">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-music-inkMuted hover:bg-music-card font-semibold transition text-xs"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold transition text-xs shadow-xs flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{studentToEdit ? 'Enregistrer le dossier & accès' : 'Créer dossier & espace étudiant'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
