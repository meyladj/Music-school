import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  Music,
  Printer,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function StudentAttendanceHistoryModal({ student, isOpen, onClose }) {
  const { attendance, updateAttendanceStatus } = useApp();
  const [selectedMonth, setSelectedMonth] = useState('Septembre 2026');

  if (!isOpen || !student) return null;

  const MONTHS = [
    'Juin 2026',
    'Juillet 2026',
    'Août 2026',
    'Septembre 2026',
    'Octobre 2026',
    'Novembre 2026',
    'Décembre 2026'
  ];

  // All attendance records for this student
  const allStudentSessions = (attendance || []).filter(a => a.studentId === student.id);
  
  // Filter for currently selected month
  const currentMonthSessions = allStudentSessions.filter(s => {
    if (selectedMonth === 'Septembre 2026') {
      return !s.month || s.month === 'Septembre 2026';
    }
    return s.month === selectedMonth;
  });

  const totalSlots = student.sessionsPerWeek === 1 ? 4 : 8;

  // Monthly stats
  const finished = currentMonthSessions.filter(s => s.status !== 'planned');
  const present = finished.filter(s => s.status === 'present').length;
  const excused = finished.filter(s => s.status === 'absent_excused').length;
  const unexcused = finished.filter(s => s.status === 'absent_unexcused').length;
  const rate = finished.length > 0 ? Math.round((present / finished.length) * 100) : 100;

  const nextStatusMap = {
    planned: 'present',
    present: 'absent_excused',
    absent_excused: 'absent_unexcused',
    absent_unexcused: 'planned'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl border border-music-border shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF4EA] to-[#FFFDF9] p-6 border-b border-music-border relative flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3.5">
            <img
              src={student.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'}
              alt={student.firstName}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-music-gold shadow-2xs"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold bg-music-gold text-white px-2 py-0.5 rounded-lg">
                  {student.matricule}
                </span>
                <span className="text-xs text-amber-900 font-bold bg-amber-100 px-2 py-0.5 rounded-lg">
                  {student.instrument} ({student.level})
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-music-ink mt-0.5">
                Historique d'Assiduité — {student.firstName} {student.lastName}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-rose-50 text-music-inkLight hover:text-rose-600 border border-music-border transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Month Selector Bar */}
        <div className="p-4 bg-music-card border-b border-music-border flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-music-gold" />
            <span className="text-xs font-bold text-music-ink">Sélectionner le Mois :</span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {MONTHS.map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setSelectedMonth(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedMonth === m
                    ? 'bg-music-ink text-white shadow-xs'
                    : 'bg-white text-music-inkMuted hover:text-music-ink border border-music-border'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Monthly KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-music-border text-center">
              <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">Taux d'Assiduité</span>
              <span className="text-2xl font-mono font-bold text-emerald-800 mt-1 block">{rate}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-music-border text-center">
              <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">Séances Présent</span>
              <span className="text-2xl font-mono font-bold text-music-cypress mt-1 block">{present}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-music-border text-center">
              <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">Absences Justifiées</span>
              <span className="text-2xl font-mono font-bold text-amber-600 mt-1 block">{excused}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-music-border text-center">
              <span className="text-[10px] font-bold text-music-inkLight uppercase tracking-wider block">Non Justifiées</span>
              <span className="text-2xl font-mono font-bold text-rose-600 mt-1 block">{unexcused}</span>
            </div>
          </div>

          {/* Detailed Sessions Table */}
          <div className="bg-white rounded-2xl border border-music-border overflow-hidden shadow-soft">
            <div className="p-3.5 bg-music-card border-b border-music-border font-bold text-xs text-music-ink flex justify-between items-center">
              <span>Séances planifiées & relevées ({selectedMonth})</span>
              <span className="text-[11px] text-music-inkMuted font-mono">
                Rythme : {student.sessionsPerWeek} séance(s)/semaine ({student.scheduleDays})
              </span>
            </div>

            <div className="divide-y divide-music-borderLight">
              {currentMonthSessions.length === 0 ? (
                <div className="p-8 text-center text-xs text-music-inkLight">
                  Aucune séance archivée pour ce mois. Les séances s'initialisent automatiquement au début de chaque période.
                </div>
              ) : (
                currentMonthSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-amber-50/20 transition"
                  >
                    <div className="flex items-start space-x-3.5">
                      <button
                        type="button"
                        onClick={() => {
                          updateAttendanceStatus(session.id, nextStatusMap[session.status]);
                        }}
                        title="Cliquer pour changer le statut"
                        className={`w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs ${
                          session.status === 'present'
                            ? 'bg-music-cypress'
                            : session.status === 'absent_excused'
                            ? 'bg-amber-500'
                            : session.status === 'absent_unexcused'
                            ? 'bg-rose-600'
                            : 'bg-music-border text-music-ink'
                        }`}
                      >
                        {session.status === 'present' ? 'P' : session.status === 'absent_excused' ? 'J' : session.status === 'absent_unexcused' ? 'A' : '·'}
                      </button>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs text-music-ink">
                            Séance #{session.sessionNumber}
                          </span>
                          <span className="font-mono text-xs text-music-inkMuted">
                            • {session.day} {session.date}
                          </span>
                          <span className="text-[10px] text-music-inkLight">
                            ({student.scheduleDays})
                          </span>
                        </div>

                        {session.note ? (
                          <div className="mt-1.5 p-2 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 italic flex items-center space-x-1.5">
                            <FileText className="w-3.5 h-3.5 text-music-gold shrink-0" />
                            <span>Remarque Professeur : « {session.note} »</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-music-inkLight italic mt-1 block">
                            Aucune remarque particulière notée par le professeur.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        session.status === 'present'
                          ? 'bg-emerald-100 text-emerald-800'
                          : session.status === 'absent_excused'
                          ? 'bg-amber-100 text-amber-800'
                          : session.status === 'absent_unexcused'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {session.status === 'present' ? 'Présent' : session.status === 'absent_excused' ? 'Absent Justifié' : session.status === 'absent_unexcused' ? 'Absent Non Justifié' : 'Planifié'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-music-card border-t border-music-border flex justify-between items-center shrink-0">
          <span className="text-xs text-music-inkMuted">
            Conservatoire Îlot Musique Alger • Registre d'assiduité certifié
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-music-ink text-white font-bold text-xs hover:bg-music-ink/90 transition shadow-xs"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
}
