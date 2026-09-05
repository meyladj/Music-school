import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Users,
  BookOpen,
  Calendar,
  Layers,
  MapPin,
  Check,
  UserCheck,
  Music
} from 'lucide-react';

export default function ClassModal({ isOpen, onClose, classToEdit }) {
  const {
    teachers,
    students,
    pedagogicalLevels,
    instrumentCategories,
    createClass,
    updateClass,
    showToast
  } = useApp();

  const [name, setName] = useState('');
  const [level, setLevel] = useState('Cycle 3 — Supérieur');
  const [instrument, setInstrument] = useState('Piano');
  const [teacherId, setTeacherId] = useState('');
  const [studentIds, setStudentIds] = useState([]);
  const [schedule, setSchedule] = useState('');
  const [room, setRoom] = useState('Salle Chopin');
  const [maxCapacity, setMaxCapacity] = useState(8);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (classToEdit) {
      setName(classToEdit.name || '');
      setLevel(classToEdit.level || 'Cycle 3 — Supérieur');
      setInstrument(classToEdit.instrument || 'Piano');
      setTeacherId(classToEdit.teacherId || teachers[0]?.id || '');
      setStudentIds(classToEdit.studentIds || []);
      setSchedule(classToEdit.schedule || '');
      setRoom(classToEdit.room || 'Salle Chopin');
      setMaxCapacity(classToEdit.maxCapacity || 8);
      setDescription(classToEdit.description || '');
    } else {
      setName('');
      setLevel('Cycle 3 — Supérieur');
      setInstrument('Piano');
      setTeacherId(teachers[0]?.id || '');
      setStudentIds([]);
      setSchedule('Mercredi 16h00 & Samedi 10h00');
      setRoom('Auditorium Chopin');
      setMaxCapacity(8);
      setDescription('');
    }
  }, [classToEdit, isOpen, teachers]);

  if (!isOpen) return null;

  const toggleStudent = (sId) => {
    setStudentIds(prev =>
      prev.includes(sId) ? prev.filter(id => id !== sId) : [...prev, sId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Veuillez donner un nom à la classe ou au groupe.', 'error');
      return;
    }

    if (classToEdit) {
      updateClass(classToEdit.id, {
        name,
        level,
        instrument,
        teacherId,
        studentIds,
        schedule,
        room,
        maxCapacity: Number(maxCapacity),
        description
      });
    } else {
      createClass({
        name,
        level,
        instrument,
        teacherId,
        studentIds,
        schedule,
        room,
        maxCapacity: Number(maxCapacity),
        description
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-music-border shadow-elevated overflow-hidden animate-scale-up max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-music-border flex items-center justify-between bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-music-gold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-music-ink">
                {classToEdit ? 'Modifier le Groupe / Classe' : 'Créer un Nouveau Groupe Pédagogique'}
              </h3>
              <p className="text-xs text-music-inkMuted">
                Définissez le niveau, assignez le professeur responsable et composez le groupe d'élèves
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-bold text-music-ink mb-1">
                Nom du Groupe / Intitulé de la Classe *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Piano Supérieur — Groupe A (Virtuoses)"
                className="w-full px-3 py-2 rounded-xl border border-music-border font-medium focus:ring-2 focus:ring-music-gold bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-music-ink mb-1">
                Cycle & Niveau Pédagogique
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-music-border font-medium focus:ring-2 focus:ring-music-gold bg-white text-xs"
              >
                {pedagogicalLevels.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-music-ink mb-1">
                Instrument / Discipline
              </label>
              <select
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-music-border font-medium focus:ring-2 focus:ring-music-gold bg-white text-xs"
              >
                {instrumentCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Professor Assignment (Core requirement: Admin assigns teachers to groups!) */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <label className="block font-bold text-amber-950 mb-1 flex items-center space-x-1.5">
              <UserCheck className="w-4 h-4 text-music-gold" />
              <span>Professeur Responsable Assigné au Groupe *</span>
            </label>
            <p className="text-[11px] text-amber-900/80 mb-2.5">
              Important : L'enseignant assigné aura accès <strong>uniquement</strong> aux élèves inscrits dans ce groupe.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {teachers.map(t => {
                const isAssigned = teacherId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTeacherId(t.id)}
                    className={`flex items-center space-x-3 p-2.5 rounded-xl border text-left transition ${
                      isAssigned
                        ? 'bg-white border-2 border-music-gold shadow-xs ring-2 ring-amber-200'
                        : 'bg-white/80 border-music-border hover:bg-white'
                    }`}
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-xl object-cover border border-music-border"
                    />
                    <div className="flex-1 overflow-hidden">
                      <div className="font-bold text-music-ink text-xs truncate">{t.name}</div>
                      <div className="text-[10px] text-music-inkLight truncate">{t.instrument}</div>
                    </div>
                    {isAssigned && (
                      <span className="w-5 h-5 rounded-full bg-music-gold text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Schedule, Room & Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-music-ink mb-1">Horaires & Jours</label>
              <input
                type="text"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="Ex: Samedi 10h00 & Mercredi 16h"
                className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-music-ink mb-1">Salle d'Atelier</label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Ex: Auditorium Chopin"
                className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-music-ink mb-1">Capacité Max (Élèves)</label>
              <input
                type="number"
                min="1"
                max="20"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white"
              />
            </div>
          </div>

          {/* Enrolled Students Checkbox Selection */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-bold text-music-ink uppercase tracking-wider text-[11px]">
                Apprenants inscrits dans ce groupe ({studentIds.length} / {maxCapacity}) :
              </label>
              <span className="text-[11px] text-music-inkLight">
                Cochez pour ajouter ou retirer un élève
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-music-card/50 rounded-2xl border border-music-border">
              {students.map(s => {
                const isSelected = studentIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleStudent(s.id)}
                    className={`flex items-center space-x-2.5 p-2 rounded-xl border text-left transition ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-2xs font-bold'
                        : 'bg-white border-music-border text-music-ink hover:bg-music-paper'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition shrink-0 ${
                      isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-music-border bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <div className="text-xs truncate">{s.firstName} {s.lastName}</div>
                      <div className="text-[10px] text-music-inkLight font-mono">
                        {s.matricule} • {s.instrument} ({s.level})
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-bold text-music-ink mb-1">Objectifs Pédagogiques & Notes</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Travail du grand répertoire classique, préparation aux auditions de fin d'année..."
              className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:ring-2 focus:ring-music-gold bg-white"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-music-border flex justify-end space-x-2 shrink-0">
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
              {classToEdit ? 'Enregistrer les Modifications' : 'Créer le Groupe & Assigner le Professeur'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
