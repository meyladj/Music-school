import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Volume2, VolumeX, Radio } from 'lucide-react';

const INSTRUMENT_TUNINGS = {
  diapason: [
    { label: 'La 440 Hz (Diapason standard de référence)', freq: 440, note: 'A4' }
  ],
  violon: [
    { label: 'Sol 3 (Corde IV grave)', freq: 196.00, note: 'G3' },
    { label: 'Ré 4 (Corde III)', freq: 293.66, note: 'D4' },
    { label: 'La 4 (Corde II - Réf)', freq: 440.00, note: 'A4' },
    { label: 'Mi 5 (Corde I aiguë)', freq: 659.25, note: 'E5' }
  ],
  guitare: [
    { label: 'Mi grave (6)', freq: 82.41, note: 'E2' },
    { label: 'La (5)', freq: 110.00, note: 'A2' },
    { label: 'Ré (4)', freq: 146.83, note: 'D3' },
    { label: 'Sol (3)', freq: 196.00, note: 'G3' },
    { label: 'Si (2)', freq: 246.94, note: 'B3' },
    { label: 'Mi aigu (1)', freq: 329.63, note: 'E4' }
  ],
  oud: [
    { label: 'Do 2 (Qarar Do)', freq: 130.81, note: 'C3' },
    { label: 'Sol 2 (Yakah)', freq: 196.00, note: 'G3' },
    { label: 'Ré 3 (Dukah)', freq: 293.66, note: 'D4' },
    { label: 'La 3 (Nawa)', freq: 440.00, note: 'A4' },
    { label: 'Fa 3 (Jaharkah)', freq: 349.23, note: 'F4' }
  ]
};

export default function TunerModal() {
  const { isTunerOpen, setIsTunerOpen } = useApp();
  const [selectedPreset, setSelectedPreset] = useState('diapason');
  const [playingFreq, setPlayingFreq] = useState(null);

  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);

  const stopTone = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (e) {
        // ignore
      }
      oscRef.current = null;
    }
    setPlayingFreq(null);
  };

  const playTone = (frequency) => {
    stopTone();

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();

    oscRef.current = osc;
    gainRef.current = gain;
    setPlayingFreq(frequency);
  };

  useEffect(() => {
    return () => {
      stopTone();
    };
  }, []);

  if (!isTunerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFFDFB] border border-music-border rounded-3xl w-full max-w-lg p-6 text-music-ink shadow-elevated relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-music-borderLight">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-music-cypress flex items-center justify-center font-bold">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-music-ink">Diapason & Tonalités de Référence</h3>
              <p className="text-xs text-music-inkMuted">Pour instruments à cordes & vocalises</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopTone();
              setIsTunerOpen(false);
            }}
            className="p-1.5 rounded-xl hover:bg-music-card text-music-inkLight hover:text-music-ink transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-4 gap-2 my-5">
          {[
            { id: 'diapason', label: 'Diapason 440' },
            { id: 'violon', label: 'Violon' },
            { id: 'guitare', label: 'Guitare' },
            { id: 'oud', label: 'Oud' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                stopTone();
                setSelectedPreset(item.id);
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition text-center ${
                selectedPreset === item.id
                  ? 'bg-music-ink text-white shadow-sm'
                  : 'bg-music-card text-music-inkMuted hover:bg-music-parchment border border-music-border'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Note Buttons */}
        <div className="space-y-2 mb-6">
          {INSTRUMENT_TUNINGS[selectedPreset].map((noteItem, idx) => {
            const isCurrent = playingFreq === noteItem.freq;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (isCurrent) {
                    stopTone();
                  } else {
                    playTone(noteItem.freq);
                  }
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400/40 shadow-sm'
                    : 'bg-white border-music-border text-music-ink hover:bg-music-card hover:border-music-border'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-extrabold text-xs ${
                    isCurrent ? 'bg-music-cypress text-white' : 'bg-music-card text-music-ink border border-music-border'
                  }`}>
                    {noteItem.note}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-music-ink">{noteItem.label}</div>
                    <div className="text-[11px] text-music-inkLight font-mono">{noteItem.freq} Hz</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {isCurrent ? (
                    <span className="flex items-center space-x-1 text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                      <span>Écoute active</span>
                    </span>
                  ) : (
                    <span className="text-xs text-music-inkLight font-semibold">Écouter</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Stop Button */}
        {playingFreq && (
          <button
            onClick={stopTone}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition text-xs shadow-sm"
          >
            <VolumeX className="w-4 h-4" />
            <span>Couper la tonalité</span>
          </button>
        )}

      </div>
    </div>
  );
}
