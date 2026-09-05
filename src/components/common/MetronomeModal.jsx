import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Square, Plus, Minus, Volume2, Sparkles } from 'lucide-react';

export default function MetronomeModal() {
  const { isMetronomeOpen, setIsMetronomeOpen } = useApp();

  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [currentBeat, setCurrentBeat] = useState(0);

  const audioContextRef = useRef(null);
  const timerRef = useRef(null);
  const beatRef = useRef(0);
  const tapTimesRef = useRef([]);

  // Audio Click Generator using Web Audio API
  const playClick = (isFirstBeat) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isFirstBeat ? 1050 : 720, ctx.currentTime);

      gain.gain.setValueAtTime(isFirstBeat ? 0.85 : 0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn('Audio click error:', e);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = (60 / bpm) * 1000;
      beatRef.current = 0;
      setCurrentBeat(0);

      playClick(true);

      timerRef.current = setInterval(() => {
        beatRef.current = (beatRef.current + 1) % beatsPerMeasure;
        setCurrentBeat(beatRef.current);
        playClick(beatRef.current === 0);
      }, intervalMs);
    } else {
      clearInterval(timerRef.current);
      setCurrentBeat(0);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, bpm, beatsPerMeasure]);

  const handleTap = () => {
    const now = Date.now();
    tapTimesRef.current.push(now);

    if (tapTimesRef.current.length > 4) {
      tapTimesRef.current.shift();
    }

    if (tapTimesRef.current.length > 1) {
      const intervals = [];
      for (let i = 1; i < tapTimesRef.current.length; i++) {
        intervals.push(tapTimesRef.current[i] - tapTimesRef.current[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 40 && calculatedBpm <= 240) {
        setBpm(calculatedBpm);
      }
    }
  };

  const getTempoTerm = (val) => {
    if (val < 60) return 'Largo';
    if (val < 76) return 'Adagio';
    if (val < 108) return 'Andante';
    if (val < 120) return 'Moderato';
    if (val < 168) return 'Allegro';
    return 'Presto';
  };

  if (!isMetronomeOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFFDFB] border border-music-border rounded-3xl w-full max-w-md p-6 text-music-ink shadow-elevated relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-music-borderLight">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-music-gold flex items-center justify-center font-bold text-lg">
              ♩
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-music-ink">Métronome d'Atelier</h3>
              <p className="text-xs text-music-inkMuted">Îlot Musique Alger</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsPlaying(false);
              setIsMetronomeOpen(false);
            }}
            className="p-1.5 rounded-xl hover:bg-music-card text-music-inkLight hover:text-music-ink transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BPM Counter */}
        <div className="my-6 text-center">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setBpm(b => Math.max(40, b - 1))}
              className="p-2.5 rounded-full bg-music-card hover:bg-music-parchment text-music-ink font-bold transition border border-music-border"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="px-8 py-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 min-w-[170px]">
              <div className="text-5xl font-mono font-black text-music-ink tracking-tight">
                {bpm}
              </div>
              <div className="text-xs font-bold text-music-gold uppercase tracking-wider mt-1">
                BPM • {getTempoTerm(bpm)}
              </div>
            </div>
            <button
              onClick={() => setBpm(b => Math.min(240, b + 1))}
              className="p-2.5 rounded-full bg-music-card hover:bg-music-parchment text-music-ink font-bold transition border border-music-border"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Slider */}
          <div className="mt-5 px-4">
            <input
              type="range"
              min="40"
              max="220"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              aria-label="Réglage du tempo en BPM"
              className="w-full accent-music-gold cursor-pointer"
            />
          </div>
        </div>

        {/* Beat Dots Indicator */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          {Array.from({ length: beatsPerMeasure }).map((_, idx) => (
            <div
              key={idx}
              className={`w-6 h-6 rounded-full transition-all duration-75 flex items-center justify-center text-xs font-bold ${
                isPlaying && currentBeat === idx
                  ? idx === 0
                    ? 'bg-music-gold text-white scale-125 shadow-glow-gold ring-2 ring-amber-300'
                    : 'bg-amber-300 text-music-ink scale-110'
                  : 'bg-music-card text-music-inkLight border border-music-border'
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Time Signatures */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          {[2, 3, 4, 6].map(sig => (
            <button
              key={sig}
              onClick={() => {
                setBeatsPerMeasure(sig);
                setCurrentBeat(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                beatsPerMeasure === sig
                  ? 'bg-music-ink text-white shadow-sm'
                  : 'bg-music-card text-music-inkMuted hover:bg-music-parchment border border-music-border'
              }`}
            >
              {sig}/4
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition shadow-sm ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-music-gold hover:bg-music-goldHover text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>Arrêter</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Démarrer</span>
              </>
            )}
          </button>

          <button
            onClick={handleTap}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-music-card hover:bg-music-parchment text-music-ink font-bold transition border border-music-border"
          >
            <Sparkles className="w-4 h-4 text-music-gold" />
            <span>Tap Tempo</span>
          </button>
        </div>

      </div>
    </div>
  );
}
