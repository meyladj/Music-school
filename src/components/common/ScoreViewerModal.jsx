import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Download, ZoomIn, ZoomOut, Play, Square, Music, Volume2 } from 'lucide-react';

export default function ScoreViewerModal() {
  const { documentToView, setDocumentToView, showToast } = useApp();
  const [zoom, setZoom] = useState(100);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  if (!documentToView) return null;

  const handleDownload = () => {
    const content = `Îlot Musique Alger - Document Pédagogique Officiel\nTitre: ${documentToView.title}\nAuteur/Compositeur: ${documentToView.composer || documentToView.author || 'Conservatoire'}\nInstrument: ${documentToView.instrument || 'Tous'}\nCatégorie: ${documentToView.category || 'Partition'}\n© Îlot Musique Alger - Tous droits réservés.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${documentToView.title.replace(/\s+/g, '_')}_IlotMusique.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Téléchargement lancé pour : ${documentToView.title}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFFDF9] text-music-ink border border-music-border rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-elevated overflow-hidden">
        
        {/* Top Bar on Desk */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-music-border bg-music-paper">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300/60 flex items-center justify-center text-music-gold">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-music-ink">
                {documentToView.title}
              </h3>
              <p className="text-xs text-music-inkMuted">
                {documentToView.composer || documentToView.author} • {documentToView.instrument} ({documentToView.difficulty || documentToView.level || 'Tous niveaux'})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom controls */}
            <div className="hidden sm:flex items-center bg-white rounded-xl p-1 border border-music-border text-xs shadow-xs">
              <button
                onClick={() => setZoom(z => Math.max(70, z - 10))}
                className="p-1 hover:bg-music-card rounded-lg text-music-inkLight hover:text-music-ink transition"
                title="Zoomer en arrière"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2.5 font-mono font-bold text-music-ink">{zoom}%</span>
              <button
                onClick={() => setZoom(z => Math.min(140, z + 10))}
                className="p-1 hover:bg-music-card rounded-lg text-music-inkLight hover:text-music-ink transition"
                title="Zoomer en avant"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Télécharger</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                setIsPlayingAudio(false);
                setDocumentToView(null);
              }}
              className="p-2 rounded-xl hover:bg-music-card text-music-inkLight hover:text-music-ink transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Music Stand / Pupitre Canvas (Warm light wooden background) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex justify-center bg-[#F4EFE6] border-y border-music-borderLight">
          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-2xl bg-white text-music-ink rounded-2xl shadow-card p-8 sm:p-10 border border-music-border transition-transform duration-150 min-h-[680px] relative font-serif"
          >
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] text-center select-none">
              <div className="font-display font-black text-6xl uppercase tracking-widest text-music-ink">
                Îlot Musique
              </div>
              <div className="text-2xl font-sans font-bold">Alger • Pédagogie</div>
            </div>

            {/* Score Header */}
            <div className="text-center mb-8 border-b pb-6 border-music-border">
              <div className="text-[11px] uppercase tracking-widest text-music-inkLight font-sans font-bold mb-1">
                Conservatoire & École de Musique — Partition d'Étude
              </div>
              <h2 className="font-display text-3xl font-bold text-music-ink tracking-tight">
                {documentToView.title}
              </h2>
              <div className="flex justify-between items-end mt-4 text-xs font-sans">
                <div className="text-left text-music-inkMuted italic">
                  Tempo : <span className="font-bold text-music-ink not-italic">{documentToView.tempo || 'Moderato (100 BPM)'}</span><br />
                  Tonalité : <span className="font-bold text-music-ink not-italic">{documentToView.key || 'Do Majeur'}</span>
                </div>
                <div className="text-right font-bold text-music-ink text-sm font-display">
                  {documentToView.composer || documentToView.author}
                </div>
              </div>
            </div>

            {/* Visual Musical Notation Staves Preview */}
            <div className="space-y-6 my-6">
              {[1, 2, 3, 4].map(line => (
                <div key={line} className="relative py-2">
                  <div className="h-10 border-t border-b border-music-ink/70 flex flex-col justify-between">
                    <div className="border-b border-music-ink/70"></div>
                    <div className="border-b border-music-ink/70"></div>
                    <div className="border-b border-music-ink/70"></div>
                  </div>

                  <div className="absolute top-0 left-2 text-2xl font-serif text-music-ink leading-none">
                    𝄞
                  </div>
                  <div className="absolute top-3 left-10 font-bold text-xs font-sans text-music-ink">
                    4/4
                  </div>

                  <div className="absolute inset-0 flex items-center justify-around pl-16 pr-4 pointer-events-none">
                    <span className="text-xl text-music-ink font-serif">♩</span>
                    <span className="text-xl text-music-ink font-serif">♫</span>
                    <span className="text-xl text-music-ink font-serif">𝅗</span>
                    <span className="text-xl text-music-ink font-serif">♪</span>
                    <span className="border-r-2 border-music-ink/70 h-10 inline-block"></span>
                    <span className="text-xl text-music-ink font-serif">♫</span>
                    <span className="text-xl text-music-ink font-serif">♩</span>
                    <span className="text-xl text-music-ink font-serif">𝅘𝅥𝅯</span>
                    <span className="text-xl text-music-ink font-serif">𝅗</span>
                    <span className="border-r-2 border-music-ink/70 h-10 inline-block"></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Teacher Notes if any */}
            {documentToView.teacherNotes && (
              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs font-sans">
                <div className="font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                  <Music className="w-3.5 h-3.5 text-music-gold" />
                  <span>Conseils & Doigtés de l'Enseignant :</span>
                </div>
                <p className="text-amber-950 leading-relaxed italic">
                  « {documentToView.teacherNotes} »
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-music-border flex justify-between items-center text-[10px] text-music-inkLight font-sans">
              <span>Îlot Musique Alger • Document réservé à l'usage pédagogique interne</span>
              <span>Page {currentPage} / {documentToView.pages || 4}</span>
            </div>

          </div>
        </div>

        {/* Bottom Audio Accompaniment Toolbar (Light theme) */}
        <div className="px-6 py-3.5 bg-music-paper border-t border-music-border flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-music-inkMuted font-semibold">Guide d'écoute & accompagnement :</span>
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-bold transition shadow-xs ${
                isPlayingAudio
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Arrêter le guide</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Écouter le morceau</span>
                </>
              )}
            </button>
            {isPlayingAudio && (
              <span className="text-emerald-700 font-mono text-[11px] font-bold flex items-center space-x-1">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                <span>Piste d'accompagnement active</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 text-music-inkMuted">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 bg-white hover:bg-music-card border border-music-border rounded-lg disabled:opacity-40 font-bold transition"
            >
              Précédent
            </button>
            <span className="font-bold text-music-ink">{currentPage} / {documentToView.pages || 4}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(documentToView.pages || 4, p + 1))}
              disabled={currentPage === (documentToView.pages || 4)}
              className="px-2.5 py-1 bg-white hover:bg-music-card border border-music-border rounded-lg disabled:opacity-40 font-bold transition"
            >
              Suivant
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
