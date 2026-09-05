import React, { useState, useEffect, useRef } from 'react';
import {
  Music,
  Play,
  Square,
  Volume2,
  Sparkles,
  ArrowRightLeft,
  BookOpen,
  Sliders,
  Award,
  Info,
  Layers,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

// 12 Semitones Definitions with French & International Names
const CHROMATIC_SCALE = [
  { pitch: 0, solfege: 'Do', name: 'C', alt: 'Do', isBlack: false },
  { pitch: 1, solfege: 'Do#', name: 'C#', alt: 'Ré♭', isBlack: true },
  { pitch: 2, solfege: 'Ré', name: 'D', alt: 'Ré', isBlack: false },
  { pitch: 3, solfege: 'Mi♭', name: 'E♭', alt: 'Ré#', isBlack: true },
  { pitch: 4, solfege: 'Mi', name: 'E', alt: 'Mi', isBlack: false },
  { pitch: 5, solfege: 'Fa', name: 'F', alt: 'Fa', isBlack: false },
  { pitch: 6, solfege: 'Fa#', name: 'F#', alt: 'Sol♭', isBlack: true },
  { pitch: 7, solfege: 'Sol', name: 'G', alt: 'Sol', isBlack: false },
  { pitch: 8, solfege: 'La♭', name: 'A♭', alt: 'Sol#', isBlack: true },
  { pitch: 9, solfege: 'La', name: 'A', alt: 'La', isBlack: false },
  { pitch: 10, solfege: 'Si♭', name: 'B♭', alt: 'La#', isBlack: true },
  { pitch: 11, solfege: 'Si', name: 'B', alt: 'Si', isBlack: false }
];

// Scale Mode Definitions
const SCALE_MODES = [
  {
    id: 'major',
    name: 'Gamme Majeure',
    subtitle: 'Mode Ionien — Brillant, stable & affirmé',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    steps: ['1 Ton', '1 Ton', '½ Ton', '1 Ton', '1 Ton', '1 Ton', '½ Ton'],
    formula: 'T — T — ½T — T — T — T — ½T',
    description: 'La gamme fondamentale de la musique occidentale. Elle est caractérisée par sa tierce majeure (2 tons) et sa sensible à un demi-ton de la tonique.'
  },
  {
    id: 'minor_natural',
    name: 'Gamme Mineure Naturelle',
    subtitle: 'Mode Éolien — Mélancolique, intime & doux',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    steps: ['1 Ton', '½ Ton', '1 Ton', '1 Ton', '½ Ton', '1 Ton', '1 Ton'],
    formula: 'T — ½T — T — T — ½T — T — T',
    description: 'Identique à sa relative majeure mais débutant sur le 6e degré. Sa tierce mineure (1 ton et demi) lui confère sa couleur sombre et poétique.'
  },
  {
    id: 'minor_harmonic',
    name: 'Gamme Mineure Harmonique',
    subtitle: 'Avec Sensible haussée — Couleur orientale & dramatique',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    steps: ['1 Ton', '½ Ton', '1 Ton', '1 Ton', '½ Ton', '1½ Ton', '½ Ton'],
    formula: 'T — ½T — T — T — ½T — 1½T — ½T',
    description: 'Le 7e degré est haussé d’un demi-ton pour recréer une "sensible" attirée par la tonique, produisant un intervalle de seconde augmentée très expressif.'
  },
  {
    id: 'minor_melodic',
    name: 'Gamme Mineure Mélodique',
    subtitle: '6e & 7e degrés haussés — Fluide & classique',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    steps: ['1 Ton', '½ Ton', '1 Ton', '1 Ton', '1 Ton', '1 Ton', '½ Ton'],
    formula: 'T — ½T — T — T — T — T — ½T',
    description: 'Adoucit la seconde augmentée de la mineure harmonique en haussant également le 6e degré lors de la montée mélodique.'
  },
  {
    id: 'pentatonic_major',
    name: 'Pentatonique Majeure',
    subtitle: '5 sons sans demi-tons — Pop, Folk & Classique',
    intervals: [0, 2, 4, 7, 9],
    steps: ['1 Ton', '1 Ton', '1½ Ton', '1 Ton', '1½ Ton'],
    formula: 'T — T — 1½T — T — 1½T',
    description: 'Gamme à 5 notes sans dissonance (pas de 4e ni 7e degré), très utilisée pour l’improvisation libre et les mélodies universelles.'
  },
  {
    id: 'pentatonic_minor',
    name: 'Pentatonique Mineure',
    subtitle: '5 sons — Blues, Jazz & Énergie',
    intervals: [0, 3, 5, 7, 10],
    steps: ['1½ Ton', '1 Ton', '1 Ton', '1½ Ton', '1 Ton'],
    formula: '1½T — T — T — 1½T — T',
    description: 'Pilier du blues et du rock, construite sur les degrés 1, b3, 4, 5, b7.'
  }
];

// Scale Degrees Metadata
const SCALE_DEGREES = [
  { num: 'I', name: 'Tonique', role: 'Fondation et repos absolu' },
  { num: 'II', name: 'Sus-tonique', role: 'Élan mélodique' },
  { num: 'III', name: 'Médiante', role: 'Définit le mode (Majeur ou Mineur)' },
  { num: 'IV', name: 'Sous-dominante', role: 'Ouverture harmonique' },
  { num: 'V', name: 'Dominante', role: 'Tension maximale vers la tonique' },
  { num: 'VI', name: 'Sus-dominante', role: 'Couleur affective' },
  { num: 'VII', name: 'Sensible', role: 'Attirance irrésistible vers la tonique' }
];

// Key Signatures (Armures)
const KEY_SIGNATURES = {
  '0_major': { key: 'Do Majeur', sharps: 0, flats: 0, text: 'Gamme naturelle (0 altération)', relRoot: 9, relMode: 'minor_natural' },
  '7_major': { key: 'Sol Majeur', sharps: 1, flats: 0, text: '1 dièse (Fa#)', relRoot: 4, relMode: 'minor_natural' },
  '2_major': { key: 'Ré Majeur', sharps: 2, flats: 0, text: '2 dièses (Fa#, Do#)', relRoot: 11, relMode: 'minor_natural' },
  '9_major': { key: 'La Majeur', sharps: 3, flats: 0, text: '3 dièses (Fa#, Do#, Sol#)', relRoot: 6, relMode: 'minor_natural' },
  '4_major': { key: 'Mi Majeur', sharps: 4, flats: 0, text: '4 dièses (Fa#, Do#, Sol#, Ré#)', relRoot: 1, relMode: 'minor_natural' },
  '11_major': { key: 'Si Majeur', sharps: 5, flats: 0, text: '5 dièses (Fa#, Do#, Sol#, Ré#, La#)', relRoot: 8, relMode: 'minor_natural' },
  '6_major': { key: 'Fa# Majeur', sharps: 6, flats: 0, text: '6 dièses (Fa#, Do#, Sol#, Ré#, La#, Mi#)', relRoot: 3, relMode: 'minor_natural' },
  '5_major': { key: 'Fa Majeur', sharps: 0, flats: 1, text: '1 bémol (Si♭)', relRoot: 2, relMode: 'minor_natural' },
  '10_major': { key: 'Si♭ Majeur', sharps: 0, flats: 2, text: '2 bémols (Si♭, Mi♭)', relRoot: 7, relMode: 'minor_natural' },
  '3_major': { key: 'Mi♭ Majeur', sharps: 0, flats: 3, text: '3 bémols (Si♭, Mi♭, La♭)', relRoot: 0, relMode: 'minor_natural' },
  '8_major': { key: 'La♭ Majeur', sharps: 0, flats: 4, text: '4 bémols (Si♭, Mi♭, La♭, Ré♭)', relRoot: 5, relMode: 'minor_natural' },
  '1_major': { key: 'Ré♭ Majeur', sharps: 0, flats: 5, text: '5 bémols (Si♭, Mi♭, La♭, Ré♭, Sol♭)', relRoot: 10, relMode: 'minor_natural' }
};

export default function PianoScaleSimulator() {
  const [selectedRootPitch, setSelectedRootPitch] = useState(0); // 0 = Do (C)
  const [selectedModeId, setSelectedModeId] = useState('major');
  const [activeOctaves, setActiveOctaves] = useState(2); // 2 octaves displayed
  const [isPlayingScale, setIsPlayingScale] = useState(false);
  const [activePlayingKeyIndex, setActivePlayingKeyIndex] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(100); // BPM
  const [volume, setVolume] = useState(0.7);

  // Web Audio Context reference
  const audioCtxRef = useRef(null);
  const playbackTimerRef = useRef(null);

  // Initialize Web Audio Context on first user action
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Synthesize realistic acoustic piano-like sound
  const playNoteAudio = (frequency, duration = 0.8) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, now);
      masterGain.connect(ctx.destination);

      // Fundamental oscillator
      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(frequency, now);

      // Warm harmonic oscillator
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(frequency * 2, now);

      // Percussive hammer noise/click
      const osc3 = ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(frequency * 3, now);

      // Gain envelopes (ADSR for piano attack and decay)
      const gain1 = ctx.createGain();
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.exponentialRampToValueAtTime(0.8, now + 0.015); // Fast piano attack
      gain1.gain.exponentialRampToValueAtTime(0.4, now + 0.15); // Initial decay
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Long natural sustain

      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.exponentialRampToValueAtTime(0.3, now + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.7));

      const gain3 = ctx.createGain();
      gain3.gain.setValueAtTime(0.001, now);
      gain3.gain.exponentialRampToValueAtTime(0.15, now + 0.01);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.08); // Quick hammer tap

      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(masterGain);
      gain2.connect(masterGain);
      gain3.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      osc3.stop(now + duration);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  };

  // Convert key index (0 to 24) to Frequency in Hz (C4 is 261.63Hz)
  const getFrequencyForIndex = (absIndex) => {
    // absIndex 0 = C4 (261.63 Hz)
    // MIDI 60 is C4
    const midi = 60 + absIndex;
    return 440 * Math.pow(2, (midi - 69) / 12);
  };

  // Current Scale Mode & Root
  const currentMode = SCALE_MODES.find(m => m.id === selectedModeId) || SCALE_MODES[0];
  const rootNote = CHROMATIC_SCALE[selectedRootPitch];

  // Calculate pitches belonging to the scale in one octave (0-11)
  const scalePitchesInOctave = currentMode.intervals.map(i => (selectedRootPitch + i) % 12);

  // Generate complete keyboard keys (2 octaves = 24 keys + 1 top C = 25 keys)
  const totalKeys = activeOctaves * 12 + 1;
  const keyboardKeys = [];

  for (let i = 0; i < totalKeys; i++) {
    const pitch = i % 12;
    const octaveOffset = Math.floor(i / 12);
    const chromaticInfo = CHROMATIC_SCALE[pitch];
    const isRoot = pitch === selectedRootPitch;
    const isInScale = scalePitchesInOctave.includes(pitch);

    // Degree calculation
    let degreeIndex = -1;
    let degreeInfo = null;
    if (isInScale) {
      degreeIndex = currentMode.intervals.findIndex(int => (selectedRootPitch + int) % 12 === pitch);
      if (degreeIndex !== -1 && degreeIndex < SCALE_DEGREES.length) {
        degreeInfo = SCALE_DEGREES[degreeIndex];
      }
    }

    keyboardKeys.push({
      index: i,
      pitch,
      octave: 4 + octaveOffset,
      isBlack: chromaticInfo.isBlack,
      solfege: chromaticInfo.solfege,
      name: chromaticInfo.name,
      alt: chromaticInfo.alt,
      isRoot,
      isInScale,
      degreeIndex,
      degreeInfo,
      frequency: getFrequencyForIndex(i)
    });
  }

  // Play a single key
  const handleKeyClick = (key) => {
    playNoteAudio(key.frequency, 1.0);
    setActivePlayingKeyIndex(key.index);
    setTimeout(() => {
      setActivePlayingKeyIndex(null);
    }, 400);
  };

  // Stop playback on unmount or reset
  useEffect(() => {
    return () => {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    };
  }, []);

  // Play the entire scale automatically
  const handlePlayScale = () => {
    if (isPlayingScale) {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
      setIsPlayingScale(false);
      setActivePlayingKeyIndex(null);
      return;
    }

    // Filter keys that belong to the active scale in order
    const scaleKeys = keyboardKeys.filter(k => k.isInScale);
    if (scaleKeys.length === 0) return;

    setIsPlayingScale(true);
    let step = 0;
    const intervalMs = Math.round((60 / playbackSpeed) * 1000);

    // Play first note immediately
    const firstKey = scaleKeys[0];
    playNoteAudio(firstKey.frequency, 0.7);
    setActivePlayingKeyIndex(firstKey.index);

    playbackTimerRef.current = setInterval(() => {
      step++;
      if (step >= scaleKeys.length) {
        clearInterval(playbackTimerRef.current);
        setIsPlayingScale(false);
        setActivePlayingKeyIndex(null);
        return;
      }
      const k = scaleKeys[step];
      playNoteAudio(k.frequency, 0.7);
      setActivePlayingKeyIndex(k.index);
    }, intervalMs);
  };

  // Compute Relative Scale
  // Major -> Relative Natural Minor is -3 semitones (+9 mod 12)
  // Minor -> Relative Major is +3 semitones (+3 mod 12)
  const isCurrentlyMajor = selectedModeId.includes('major');
  const relativeRootPitch = isCurrentlyMajor
    ? (selectedRootPitch + 9) % 12
    : (selectedRootPitch + 3) % 12;
  const relativeModeId = isCurrentlyMajor ? 'minor_natural' : 'major';
  const relativeRootNote = CHROMATIC_SCALE[relativeRootPitch];
  const relativeMode = SCALE_MODES.find(m => m.id === relativeModeId);

  // Key Signature info for current root and major/minor
  const keySignatureLookupKey = `${selectedRootPitch}_major`;
  const signatureInfo = KEY_SIGNATURES[keySignatureLookupKey] || {
    key: `${rootNote.solfege} Majeur`,
    text: 'Tonalité modale',
    sharps: 0,
    flats: 0
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Control Deck */}
      <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF4EA] to-[#FFFDF9] p-6 sm:p-7 rounded-3xl border border-music-border shadow-soft relative overflow-hidden">
        <div className="absolute inset-0 stave-pattern-light pointer-events-none opacity-40"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-music-gold text-white shadow-2xs">
                {rootNote.solfege} {currentMode.name}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-white text-music-ink border border-music-border">
                {signatureInfo.text}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200">
                Formule : {currentMode.formula}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-black text-music-ink">
              Simulateur de Piano & Théorie des Gammes
            </h2>
            <p className="text-xs sm:text-sm text-music-inkMuted mt-1">
              Visualisez instantanément les touches du clavier, les degrés harmoniques, la répartition tonale et les gammes relatives.
            </p>
          </div>

          {/* Audio Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePlayScale}
              className={`flex items-center space-x-2 px-5 py-3 rounded-2xl font-bold text-xs shadow-soft transition active:scale-[0.98] ${
                isPlayingScale
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              {isPlayingScale ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>Arrêter la Gamme</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Écouter la Gamme</span>
                </>
              )}
            </button>

            <div className="bg-white px-4 py-2.5 rounded-2xl border border-music-border flex items-center space-x-3 shadow-2xs">
              <span className="text-[11px] font-bold text-music-inkLight uppercase tracking-wider">Tempo :</span>
              <input
                type="range"
                min="50"
                max="180"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="w-20 accent-music-gold cursor-pointer"
              />
              <span className="font-mono font-bold text-xs text-music-ink w-12 text-right">{playbackSpeed} BPM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selectors: 1. Root Note (Tonique) & 2. Mode */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: 12 Root Notes Selector */}
        <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-3xl border border-music-border shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-music-ink uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-music-gold"></span>
              <span>1. Choisissez la Note Tonique (Fondamentale) :</span>
            </label>
            <span className="text-[11px] font-mono font-bold text-music-gold">
              {rootNote.solfege} ({rootNote.name})
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {CHROMATIC_SCALE.map((note) => {
              const isSelected = selectedRootPitch === note.pitch;
              return (
                <button
                  key={note.pitch}
                  type="button"
                  onClick={() => setSelectedRootPitch(note.pitch)}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-bold transition flex flex-col items-center justify-center relative ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-md ring-2 ring-music-gold/40'
                      : note.isBlack
                      ? 'bg-[#1C1B18] text-white/90 hover:bg-black border border-neutral-700'
                      : 'bg-[#FAF8F5] text-music-ink hover:bg-white border border-music-border shadow-2xs'
                  }`}
                >
                  <span className="text-sm font-display">{note.solfege}</span>
                  <span className="text-[10px] font-mono opacity-70">{note.name}</span>
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-amber-600"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Scale Mode Selector */}
        <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-3xl border border-music-border shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-music-ink uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-music-cypress"></span>
              <span>2. Mode & Couleur Harmonique :</span>
            </label>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {currentMode.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SCALE_MODES.map((mode) => {
              const isSelected = selectedModeId === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSelectedModeId(mode.id)}
                  className={`p-3 rounded-2xl border text-left transition ${
                    isSelected
                      ? 'bg-amber-50 border-music-gold ring-2 ring-music-gold/30 shadow-xs'
                      : 'bg-[#FAF8F5] hover:bg-white border-music-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? 'text-amber-950' : 'text-music-ink'}`}>
                      {mode.name}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-music-gold"></span>}
                  </div>
                  <p className="text-[10px] text-music-inkMuted mt-0.5 line-clamp-1">
                    {mode.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* VIRTUAL PIANO KEYBOARD SIMULATION */}
      <div className="bg-[#1C1B18] p-5 sm:p-7 rounded-3xl border-4 border-[#2D2A24] shadow-2xl relative overflow-hidden">
        
        {/* Top Keyboard Felt Strip & Brand Plate */}
        <div className="flex items-center justify-between pb-4 mb-2 border-b border-[#3A362E]">
          <div className="flex items-center space-x-3">
            <span className="h-2 w-16 bg-red-800 rounded-full shadow-inner"></span>
            <span className="font-display font-bold text-amber-300 text-xs sm:text-sm tracking-wider uppercase">
              Îlot Musique Alger • Clavier d'Étude Harmonique
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-amber-200/80">
            <span>Cliquez sur une touche pour écouter le son</span>
          </div>
        </div>

        {/* The Piano Keys Container */}
        <div className="relative overflow-x-auto pb-4 pt-1 select-none flex justify-center">
          <div className="inline-flex relative h-56 sm:h-64 bg-[#0F0E0C] p-2 rounded-2xl shadow-2xl border border-[#3A362E]">
            
            {/* White Keys */}
            {keyboardKeys.filter(k => !k.isBlack).map((whiteKey) => {
              const isPlaying = activePlayingKeyIndex === whiteKey.index;

              return (
                <button
                  key={whiteKey.index}
                  type="button"
                  onClick={() => handleKeyClick(whiteKey)}
                  className={`w-11 sm:w-13 h-full rounded-b-xl transition-all duration-100 flex flex-col justify-between items-center pb-3 pt-2 relative border-r border-neutral-300 last:border-r-0 ${
                    isPlaying
                      ? 'bg-amber-200 transform translate-y-1 shadow-inner ring-2 ring-music-gold'
                      : whiteKey.isRoot
                      ? 'bg-gradient-to-b from-[#FFFBEA] to-[#FDE68A] shadow-md border-amber-300'
                      : whiteKey.isInScale
                      ? 'bg-gradient-to-b from-white to-[#FAF6EE] shadow-sm'
                      : 'bg-gradient-to-b from-[#F3EFE6] to-[#E5DFCFC] opacity-75'
                  }`}
                  style={{ zIndex: 1 }}
                >
                  {/* Root / Degree Top Badge */}
                  <div className="h-7 flex items-center justify-center">
                    {whiteKey.isRoot ? (
                      <span className="px-1.5 py-0.5 rounded-md bg-amber-600 text-white font-mono font-bold text-[9px] shadow-xs">
                        Tonique
                      </span>
                    ) : whiteKey.isInScale && whiteKey.degreeInfo ? (
                      <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono font-bold text-[9px] border border-amber-300">
                        {whiteKey.degreeInfo.num}
                      </span>
                    ) : null}
                  </div>

                  {/* Note Name & Solfege at the bottom */}
                  <div className="text-center">
                    <span className={`block text-xs font-bold leading-tight ${whiteKey.isRoot ? 'text-amber-900 font-black' : whiteKey.isInScale ? 'text-music-ink' : 'text-neutral-500'}`}>
                      {whiteKey.solfege}
                    </span>
                    <span className="block text-[9px] font-mono text-neutral-400">
                      {whiteKey.name}{whiteKey.octave}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Black Keys (Positioned Absolutely) */}
            <div className="absolute top-2 left-2 pointer-events-none flex h-34 sm:h-38">
              {(() => {
                // Calculate black keys positions relative to white keys
                const whiteKeyWidth = 44; // base width approximate
                const whiteKeys = keyboardKeys.filter(k => !k.isBlack);
                const blackKeys = keyboardKeys.filter(k => k.isBlack);

                return blackKeys.map((blackKey) => {
                  const isPlaying = activePlayingKeyIndex === blackKey.index;

                  // Find how many white keys precede this black key
                  const precedingWhites = keyboardKeys.slice(0, blackKey.index).filter(k => !k.isBlack).length;
                  // In standard piano: black key is centered between preceding white and current white key
                  const leftOffset = precedingWhites * 44 - 14; // adjust based on sm screen via CSS

                  return (
                    <button
                      key={blackKey.index}
                      type="button"
                      onClick={() => handleKeyClick(blackKey)}
                      className={`pointer-events-auto absolute top-0 w-7 sm:w-8 h-34 sm:h-40 rounded-b-lg transition-all duration-100 flex flex-col justify-between items-center pb-2 pt-1.5 border-x border-b border-black shadow-xl ${
                        isPlaying
                          ? 'bg-amber-400 transform translate-y-1 ring-2 ring-white'
                          : blackKey.isRoot
                          ? 'bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 text-white'
                          : blackKey.isInScale
                          ? 'bg-gradient-to-b from-[#2A2925] via-amber-950/80 to-[#1A1916] text-amber-200 border-amber-600/60'
                          : 'bg-gradient-to-b from-[#252420] via-[#1A1916] to-black text-neutral-500'
                      }`}
                      style={{
                        left: `${(precedingWhites) * (window.innerWidth >= 640 ? 52 : 44) - (window.innerWidth >= 640 ? 16 : 14)}px`,
                        zIndex: 10
                      }}
                    >
                      {/* Black Key Degree Badge */}
                      <div className="h-5 flex items-center justify-center">
                        {blackKey.isRoot ? (
                          <span className="px-1 rounded bg-amber-400 text-amber-950 font-mono font-bold text-[8px]">
                            I
                          </span>
                        ) : blackKey.isInScale && blackKey.degreeInfo ? (
                          <span className="px-1 rounded bg-amber-900/90 text-amber-200 font-mono font-bold text-[8px] border border-amber-600">
                            {blackKey.degreeInfo.num}
                          </span>
                        ) : null}
                      </div>

                      {/* Black Key Solfege */}
                      <div className="text-center">
                        <span className={`block text-[10px] font-bold leading-tight ${blackKey.isInScale ? 'text-amber-300' : 'text-neutral-400'}`}>
                          {blackKey.solfege}
                        </span>
                        <span className="block text-[8px] font-mono opacity-60">
                          {blackKey.name}
                        </span>
                      </div>
                    </button>
                  );
                });
              })()}
            </div>

          </div>
        </div>

        {/* Legend beneath keyboard */}
        <div className="pt-3 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-3 border-t border-[#3A362E]">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-amber-200 font-bold">Tonique (I)</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300"></span>
              <span className="text-neutral-300">Notes de la Gamme</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-neutral-600"></span>
              <span className="text-neutral-400">Notes hors-gamme</span>
            </span>
          </div>

          <span className="font-mono text-[11px] text-amber-300">
            Gamme active : {rootNote.solfege} {currentMode.name}
          </span>
        </div>

      </div>

      {/* 2 PANELS: RÉPARTITION TONALE & GAMMES RELATIVES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Panel 1: Répartition Tonale & Structure par Degrés */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-music-border p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-music-borderLight">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-music-gold">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-music-ink">
                  Répartition Tonale & Intervalles
                </h4>
                <p className="text-xs text-music-inkMuted">
                  Structure harmonique de la gamme ({currentMode.formula})
                </p>
              </div>
            </div>

            <span className="font-mono font-bold text-xs bg-amber-50 text-amber-950 px-3 py-1 rounded-xl border border-amber-200">
              7 Degrés
            </span>
          </div>

          {/* Tone / Semitone Steps Flow */}
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-amber-200/80">
            <span className="text-[11px] font-bold text-music-inkLight uppercase tracking-wider block mb-2">
              Enchaînement des Intervalles Consecutifs :
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {currentMode.steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <span className={`px-2.5 py-1 rounded-xl font-mono font-bold text-xs ${
                    step.includes('½')
                      ? 'bg-rose-100 text-rose-900 border border-rose-300'
                      : step.includes('1½')
                      ? 'bg-purple-100 text-purple-900 border border-purple-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {step}
                  </span>
                  {idx < currentMode.steps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-music-inkLight" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-xs text-music-inkMuted mt-2.5 leading-relaxed">
              {currentMode.description}
            </p>
          </div>

          {/* Table of the 7 Degrees of the selected Scale */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-music-card text-music-ink font-bold border-b border-music-border">
                  <th className="p-2.5">Degré</th>
                  <th className="p-2.5">Note</th>
                  <th className="p-2.5">Nom Harmonique</th>
                  <th className="p-2.5">Fonction & Rôle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-music-borderLight">
                {currentMode.intervals.map((int, i) => {
                  const noteObj = CHROMATIC_SCALE[(selectedRootPitch + int) % 12];
                  const degMeta = SCALE_DEGREES[i] || { num: `${i+1}`, name: 'Degré', role: '' };
                  const isTonic = i === 0;
                  const isSensible = i === 6;

                  return (
                    <tr key={i} className={`hover:bg-amber-50/40 transition ${isTonic ? 'bg-amber-50/60 font-bold' : ''}`}>
                      <td className="p-2.5 font-mono">
                        <span className={`px-2 py-0.5 rounded-md ${isTonic ? 'bg-music-gold text-white' : 'bg-music-card text-music-ink border border-music-border'}`}>
                          {degMeta.num}
                        </span>
                      </td>
                      <td className="p-2.5 font-bold text-music-ink">
                        <span className="text-sm">{noteObj.solfege}</span> <span className="text-[10px] font-mono text-music-inkLight">({noteObj.name})</span>
                      </td>
                      <td className="p-2.5 font-semibold text-music-ink">
                        {degMeta.name} {isSensible && currentMode.id.includes('minor') && !currentMode.id.includes('harmonic') ? '(Sous-tonique)' : ''}
                      </td>
                      <td className="p-2.5 text-music-inkMuted">
                        {degMeta.role}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

        {/* Panel 2: Relative Keys (Gammes Relatives) & Modulation */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-music-border p-6 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-music-borderLight mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-music-ink">
                    Gammes Relatives & Liens
                  </h4>
                  <p className="text-xs text-music-inkMuted">
                    Même armure, même armature de dièses/bémols
                  </p>
                </div>
              </div>
            </div>

            {/* Relative Key Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50/80 via-white to-purple-50/50 border-2 border-purple-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900">
                  {isCurrentlyMajor ? 'Gamme Relative Mineure :' : 'Gamme Relative Majeure :'}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-purple-100 text-purple-900 border border-purple-200">
                  Tierce {isCurrentlyMajor ? 'descendante (-3 demi-tons)' : 'ascendante (+3 demi-tons)'}
                </span>
              </div>

              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-display font-black text-purple-950">
                  {relativeRootNote.solfege} {relativeMode.name}
                </h3>
                <span className="text-xs text-purple-800 font-mono">({relativeRootNote.name})</span>
              </div>

              <p className="text-xs text-purple-900 leading-relaxed">
                {isCurrentlyMajor ? (
                  <>
                    La gamme de <strong>{rootNote.solfege} Majeur</strong> partage exactement les mêmes notes et la même armure ({signatureInfo.text}) que la gamme de <strong>{relativeRootNote.solfege} mineur</strong>.
                  </>
                ) : (
                  <>
                    La gamme de <strong>{rootNote.solfege} mineur</strong> partage exactement les mêmes notes et la même armure ({signatureInfo.text}) que la gamme de <strong>{relativeRootNote.solfege} Majeur</strong>.
                  </>
                )}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSelectedRootPitch(relativeRootPitch);
                  setSelectedModeId(relativeModeId);
                }}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition shadow-soft flex items-center justify-center space-x-2 active:scale-[0.98]"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Basculer vers {relativeRootNote.solfege} {relativeMode.name}</span>
              </button>
            </div>

            {/* Armure & Altérations */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1.5">
              <strong className="block font-bold text-amber-900">
                Armure & Ordre des Altérations :
              </strong>
              <div className="text-[11px] text-amber-900 leading-relaxed">
                • Ordre des dièses (#) : <strong>Fa - Do - Sol - Ré - La - Mi - Si</strong>
              </div>
              <div className="text-[11px] text-amber-900 leading-relaxed">
                • Ordre des bémols (♭) : <strong>Si - Mi - La - Ré - Sol - Do - Fa</strong>
              </div>
            </div>
          </div>

          {/* Quick Tip Footer */}
          <div className="pt-3 border-t border-music-borderLight flex items-center space-x-2 text-[11px] text-music-inkMuted">
            <Sparkles className="w-4 h-4 text-music-gold shrink-0" />
            <span>Astuce Conservatoire : Pratiquez vos gammes au métronome lent pour une régularité parfaite de l'archet ou du doigté.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
