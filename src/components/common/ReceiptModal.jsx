import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, CheckCircle, Music } from 'lucide-react';

export default function ReceiptModal() {
  const { receiptToView, setReceiptToView, students, teachers } = useApp();

  if (!receiptToView) return null;

  const student = students.find(s => s.id === receiptToView.studentId) || {
    firstName: 'Élève',
    lastName: 'Inconnu',
    matricule: 'IMA-2026-XXX',
    instrument: 'Instrument',
    sessionsPerWeek: 2,
    tuitionFee: receiptToView.amount
  };

  const teacher = teachers.find(t => t.id === student.teacherId);

  const amountToWords = (val) => {
    if (val === 10000) return 'Dix Mille Dinars Algériens';
    if (val === 6500) return 'Six Mille Cinq Cents Dinars Algériens';
    if (val === 14000) return 'Quatorze Mille Dinars Algériens';
    return `${val.toLocaleString('fr-FR')} Dinars Algériens`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FFFDFB] text-music-ink rounded-3xl w-full max-w-2xl p-8 shadow-elevated relative my-8 border border-music-border print-card">
        
        {/* Modal Action Bar (Hidden on print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-music-borderLight no-print">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Récépissé de Paiement Valide & Authentifié</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-music-gold hover:bg-music-goldHover text-white text-xs font-bold transition shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer / Télécharger</span>
            </button>
            <button
              onClick={() => setReceiptToView(null)}
              className="p-2 rounded-xl hover:bg-music-card text-music-inkLight hover:text-music-ink transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt (Warm aged paper motif) */}
        <div className="border-2 border-music-ink/70 p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] relative">
          
          {/* Header of Receipt */}
          <div className="flex justify-between items-start border-b-2 border-music-ink/70 pb-5">
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-music-gold flex items-center justify-center font-bold">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-black tracking-tight text-music-ink uppercase">
                    Îlot Musique Alger
                  </h2>
                  <p className="text-[11px] font-bold text-music-inkMuted tracking-wider uppercase">
                    Conservatoire & Académie de Musique Privée
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-music-inkMuted mt-2 leading-relaxed">
                12, Rue Didouche Mourad / Hydra, Alger • Tél: +213 (0) 550 12 34 56<br />
                Agrément Ministériel & Pédagogique n° 442/2023
              </p>
            </div>

            <div className="text-right">
              <div className="inline-block px-3 py-1 rounded-lg bg-music-card text-music-ink font-mono text-xs font-bold uppercase border border-music-border">
                {receiptToView.receiptNumber}
              </div>
              <div className="text-xs text-music-inkMuted mt-1">
                Date : <span className="font-bold text-music-ink">{receiptToView.paymentDate || '01/09/2026'}</span>
              </div>
            </div>
          </div>

          {/* Title banner */}
          <div className="my-5 text-center bg-amber-50/70 py-2.5 border-y border-amber-200/80 rounded-lg">
            <h3 className="font-display font-extrabold text-base tracking-widest uppercase text-music-ink">
              Quittance de Frais de Scolarité & Enseignement
            </h3>
            <p className="text-xs text-music-inkMuted font-semibold">
              Période : {receiptToView.month}
            </p>
          </div>

          {/* Student Dossier Summary */}
          <div className="grid grid-cols-2 gap-4 text-xs mb-5">
            <div className="space-y-1.5 p-3.5 rounded-xl bg-music-paper border border-music-border">
              <div className="text-music-inkLight uppercase tracking-wider text-[10px] font-bold">Apprenant(e)</div>
              <div className="font-bold text-sm text-music-ink">{student.firstName} {student.lastName}</div>
              <div>Matricule : <span className="font-mono font-bold">{student.matricule}</span></div>
              <div>Tuteur légal : <span className="font-medium">{student.guardianName || 'Parent'}</span></div>
            </div>

            <div className="space-y-1.5 p-3.5 rounded-xl bg-music-paper border border-music-border">
              <div className="text-music-inkLight uppercase tracking-wider text-[10px] font-bold">Discipline & Cursus</div>
              <div className="font-bold text-sm text-music-ink">Instrument : {student.instrument}</div>
              <div>Rythme : <span className="font-bold text-music-ink">{student.sessionsPerWeek} séances / semaine</span></div>
              <div>Professeur référent : <span className="font-medium">{teacher ? teacher.name : 'Professeur principal'}</span></div>
            </div>
          </div>

          {/* Transaction & Amount Table */}
          <table className="w-full text-xs mb-5 border-collapse">
            <thead>
              <tr className="bg-music-card text-music-ink font-bold border-b border-music-border">
                <th className="p-2.5 text-left">Désignation</th>
                <th className="p-2.5 text-center">Mode de règlement</th>
                <th className="p-2.5 text-center">Réf. Transaction</th>
                <th className="p-2.5 text-right">Montant (DZD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-music-borderLight border border-music-border">
              <tr>
                <td className="p-3">
                  <div className="font-bold text-music-ink">Cotisation mensuelle d'apprentissage</div>
                  <div className="text-[11px] text-music-inkMuted">
                    Cours individuel d'instrument + Solfège & accès médiathèque
                  </div>
                </td>
                <td className="p-3 text-center font-medium">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold border border-blue-200">
                    {receiptToView.paymentMethod}
                  </span>
                </td>
                <td className="p-3 text-center font-mono text-[11px] text-music-ink font-semibold">
                  {receiptToView.reference || 'ESP-GUICHET-01'}
                </td>
                <td className="p-3 text-right font-bold font-mono text-sm text-music-ink">
                  {receiptToView.amount.toLocaleString('fr-FR')} DA
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-music-card font-bold">
                <td colSpan="3" className="p-3 text-right uppercase text-[11px] text-music-ink">Total Net Perçu :</td>
                <td className="p-3 text-right font-mono text-base text-music-ink border-t-2 border-music-ink">
                  {receiptToView.amount.toLocaleString('fr-FR')} DZD
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Amount in letters */}
          <div className="text-xs italic text-music-ink mb-6 bg-amber-50 p-3 rounded-xl border border-amber-200">
            Arrêté la présente quittance à la somme de : <strong className="not-italic text-music-ink font-bold">{amountToWords(receiptToView.amount)}</strong>.
          </div>

          {/* Signatures & Stamp */}
          <div className="grid grid-cols-2 gap-6 pt-3 border-t border-music-border text-xs">
            <div>
              <div className="font-bold text-music-ink">L’Apprenant / Le Tuteur</div>
              <div className="h-16 mt-1 flex items-end text-[11px] text-music-inkLight italic">
                Pour acquit et acceptation du règlement intérieur
              </div>
            </div>

            <div className="text-right">
              <div className="font-bold text-music-ink">Direction & Régie Financière</div>
              <div className="h-16 mt-1 flex flex-col items-end justify-center">
                <div className="w-32 h-12 border-2 border-dashed border-music-gold rounded-full flex items-center justify-center text-[10px] font-extrabold text-music-gold uppercase tracking-wider transform -rotate-3 bg-amber-50/50">
                  Îlot Musique Alger
                  <br />
                  CACHET OFFICIEL
                </div>
                <div className="text-[10px] text-music-inkLight font-mono mt-1 font-semibold">
                  Enregistré par : {receiptToView.collectedBy || 'Administration'}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
