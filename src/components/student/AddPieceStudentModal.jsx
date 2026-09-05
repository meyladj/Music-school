import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Music,
  Plus,
  Sparkles,
  Lightbulb,
  Target,
  FileText,
  Check,
  Download,
  BookOpen
} from 'lucide-react';

const REPERTOIRE_PRESETS = [
  {
    title: 'Nocturne Op. 9 N°2',
    composer: 'Frédéric Chopin',
    difficulty: 'Intermédiaire 2',
    tempo: 'Andante (66 BPM)',
    key: 'Mi bémol Majeur',
    tips: [
      'Garder le poignet très souple dans le balancement des accords de la main gauche.',
      'Faire ressortir la ligne mélodique supérieure pianissimo sans raidir la main droite.',
      'Changer la pédale de résonance strictement sur chaque temps fort.'
    ],
    exercises: [
      {
        title: 'Basses & accords balancés main gauche',
        bars: 'Mesures 1 à 8',
        targetBpm: 60,
        notes: 'Travailler la main gauche seule avec un son ouaté et un tempo très régulier.'
      },
      {
        title: 'Mélodie chantante et fioritures en rubato',
        bars: 'Mesures 9 à 24',
        targetBpm: 66,
        notes: 'Compter les triolets et les doubles croches avec rigueur avant de libérer le rubato.'
      }
    ]
  },
  {
    title: 'Lettre à Élise (Für Elise)',
    composer: 'Ludwig van Beethoven',
    difficulty: 'Intermédiaire 1',
    tempo: 'Poco moto (120 BPM)',
    key: 'La mineur',
    tips: [
      'L’attaque des deux premières notes (Mi - Ré#) doit être d’une parfaite clarté et légèreté.',
      'Dans la partie centrale en arpèges, attention au passage du pouce sous la paume.',
      'Ne pas accélérer sur les doubles croches de la reprise.'
    ],
    exercises: [
      {
        title: 'Thème principal et souplesse du poignet',
        bars: 'Mesures 1 à 16',
        targetBpm: 100,
        notes: 'Articuler chaque note avec l’extrémité des doigts, poignet au niveau du clavier.'
      },
      {
        title: 'Arpèges descendants de la partie centrale',
        bars: 'Mesures 25 à 38',
        targetBpm: 90,
        notes: 'Jouer en accords plaqués pour mémoriser les positions des doigts avant d’égrener les arpèges.'
      }
    ]
  },
  {
    title: 'Gnossienne N°1',
    composer: 'Erik Satie',
    difficulty: 'Débutant',
    tempo: 'Lent (60 BPM)',
    key: 'Fa mineur',
    tips: [
      'Créer une atmosphère mystérieuse et épurée, sans vibrato excessif.',
      'Équilibrer le grondement des basses avec la légèreté des accords de répons.',
      'Prendre son temps entre chaque respiration musicale.'
    ],
    exercises: [
      {
        title: 'Pulsation lente & résonance des basses',
        bars: 'Mesures 1 à 12',
        targetBpm: 54,
        notes: 'Écouter la résonance acoustique jusqu’à l’extinction du son avant de relancer l’accord.'
      }
    ]
  },
  {
    title: 'Touchia Zidène (Mode Andalous)',
    composer: 'Traditionnel Algérien / Maalem',
    difficulty: 'Supérieur',
    tempo: 'Mizan Msaddar (84 BPM)',
    key: 'Mode Zidène (Sol)',
    tips: [
      'Soigner les quarts de ton et la justesse de l’intervalle Zidène.',
      'Articuler le coup d’archet ou le plectre (risha) avec vigueur et noblesse.',
      'Maintenir le rythme régulier du mizan traditionnel.'
    ],
    exercises: [
      {
        title: 'Gamme Zidène en aller-retour & ornements',
        bars: 'Ouverture libre',
        targetBpm: 80,
        notes: 'Travailler les ornements (trilles et battements rapides) au tempo métronomique.'
      },
      {
        title: 'Enchaînement du refrain mélodique',
        bars: 'Passage central',
        targetBpm: 84,
        notes: 'Faire sonner les cordes à vide pour soutenir le bourdon tonal.'
      }
    ]
  },
  {
    title: 'Prélude en Do Majeur BWV 846',
    composer: 'Johann Sebastian Bach',
    difficulty: 'Débutant',
    tempo: 'Moderato (80 BPM)',
    key: 'Do Majeur',
    tips: [
      'Égalité absolue de toucher entre tous les doigts des deux mains.',
      'Pas de pédale de sustain : la résonance doit venir uniquement de la tenue des doigts.',
      'Écouter la progression harmonique de la basse à chaque mesure.'
    ],
    exercises: [
      {
        title: 'Arpèges en accords plaqués puis brisés',
        bars: 'Mesures 1 à 16',
        targetBpm: 72,
        notes: 'Mémoriser l’harmonie en accords de 5 sons avant de dérouler les doubles croches.'
      }
    ]
  }
];

export default function AddPieceStudentModal({ isOpen, onClose, onPieceAdded, currentStudent }) {
  const { addPiece, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [composer, setComposer] = useState('');
  const [difficulty, setDifficulty] = useState('Intermédiaire 1');
  const [tempo, setTempo] = useState('Moderato (80 BPM)');
  const [key, setKey] = useState('Do Majeur');
  const [tipsList, setTipsList] = useState([
    'Travailler la main gauche seule avec métronome avant d’assembler.',
    'Garder les poignets souples et soigner la respiration musicale.'
  ]);
  const [newTipInput, setNewTipInput] = useState('');

  const [exercisesList, setExercisesList] = useState([
    {
      title: 'Exercice 1 : Déchiffrage lent & régularité rythmique',
      bars: 'Mesures 1 à 16',
      targetBpm: 60,
      notes: 'Mains séparées au métronome lent.'
    },
    {
      title: 'Exercice 2 : Travail des nuances et du phrasé',
      bars: 'Mesures 17 à 32',
      targetBpm: 72,
      notes: 'Marquer les crescendos et l’expression du thème.'
    }
  ]);

  if (!isOpen) return null;

  const handleApplyPreset = (preset) => {
    setTitle(preset.title);
    setComposer(preset.composer);
    setDifficulty(preset.difficulty);
    setTempo(preset.tempo);
    setKey(preset.key);
    setTipsList(preset.tips || []);
    setExercisesList(preset.exercises || []);
    showToast(`Modèle "${preset.title}" chargé avec ses tipps et exercices !`);
  };

  const handleAddTip = (textToAdd) => {
    const txt = (textToAdd || newTipInput).trim();
    if (!txt) return;
    if (!tipsList.includes(txt)) {
      setTipsList(prev => [...prev, txt]);
    }
    setNewTipInput('');
  };

  const handleRemoveTip = (index) => {
    setTipsList(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleAddExerciseRow = () => {
    setExercisesList(prev => [
      ...prev,
      {
        title: `Exercice ${prev.length + 1} : Travail technique ciblé`,
        bars: 'Mesures à préciser',
        targetBpm: 72,
        notes: 'Répéter 5 fois sans faute avant de monter le tempo.'
      }
    ]);
  };

  const handleExerciseChange = (index, field, value) => {
    setExercisesList(prev => prev.map((ex, idx) => (idx === index ? { ...ex, [field]: value } : ex)));
  };

  const handleRemoveExercise = (index) => {
    setExercisesList(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Veuillez renseigner le titre du morceau.', 'error');
      return;
    }

    const newPiece = addPiece({
      studentId: currentStudent.id,
      title: title.trim(),
      composer: composer.trim() || 'Traditionnel / Inconnu',
      difficulty,
      tempo,
      key,
      progress: 20,
      status: 'decouverte',
      tips: tipsList,
      teacherNotes: tipsList[0] || 'Travailler régulièrement au métronome lent.',
      sheetUrl: '#',
      pages: 3,
      measuresCount: 48,
      exercises: exercisesList.map((ex, i) => ({
        id: `ex-${Date.now()}-${i}`,
        title: ex.title,
        bars: ex.bars,
        targetBpm: Number(ex.targetBpm) || 60,
        notes: ex.notes,
        completed: false
      }))
    });

    if (onPieceAdded) {
      onPieceAdded(newPiece);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/40 backdrop-blur-xs">
      <div className="bg-[#FFFDFB] text-music-ink w-full max-w-2xl rounded-3xl border border-music-border shadow-elevated overflow-hidden animate-scale-up max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-music-border flex items-center justify-between bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-music-goldLight text-music-goldHover border border-music-gold/30 flex items-center justify-center shadow-2xs">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-music-ink">
                Ajouter une Pièce à mon Répertoire
              </h3>
              <p className="text-xs text-music-inkMuted">
                Configurez votre morceau avec ses tipps d'étude, ses exercices dédiés et sa partition
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border border-music-border text-music-inkLight hover:text-music-ink hover:bg-music-card transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto text-xs flex-1">
          
          {/* Quick Preset Chips */}
          <div>
            <span className="block text-[11px] font-bold text-music-inkLight uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-music-gold" />
              <span>Modèles rapides du Conservatoire (1 clic pour pré-remplir) :</span>
            </span>

            <div className="flex flex-wrap gap-1.5">
              {REPERTOIRE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="px-2.5 py-1.5 rounded-xl border border-music-border bg-white hover:bg-amber-50 hover:border-amber-300 text-music-ink text-[11px] font-semibold transition flex items-center space-x-1 shadow-2xs"
                >
                  <Music className="w-3 h-3 text-music-gold" />
                  <span>{p.title}</span>
                  <span className="text-music-inkLight font-normal">({p.composer.split(' ').pop()})</span>
                </button>
              ))}
            </div>
          </div>

          {/* General Piece Info */}
          <div className="p-4 rounded-2xl bg-music-paper border border-music-border space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-music-ink mb-1">Titre de la Pièce *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Nocturne Op. 9 N°2..."
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-music-ink mb-1">Compositeur / Auteur</label>
                <input
                  type="text"
                  value={composer}
                  onChange={(e) => setComposer(e.target.value)}
                  placeholder="Ex: Frédéric Chopin, Traditionnel..."
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs focus:ring-2 focus:ring-music-gold bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-music-ink mb-1">Tonalité</label>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Ex: Mi bémol Majeur"
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-music-ink mb-1">Tempo Indicatif</label>
                <input
                  type="text"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                  placeholder="Ex: Andante (66 BPM)"
                  className="w-full px-3 py-2 rounded-xl border border-music-border text-xs bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-music-ink mb-1">Niveau & Cycle</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl border border-music-border text-xs bg-white font-medium"
                >
                  <option value="Initiation">Initiation</option>
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire 1">Intermédiaire 1</option>
                  <option value="Intermédiaire 2">Intermédiaire 2</option>
                  <option value="Supérieur">Supérieur</option>
                  <option value="Virtuose">Virtuose</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION: PETITS TIPPS & ASTUCES DE PRATIQUE */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-amber-950 flex items-center space-x-1.5 uppercase tracking-wider text-[11px]">
                <Lightbulb className="w-4 h-4 text-music-gold" />
                <span>Petits Tipps & Astuces de Pratique pour ce morceau :</span>
              </label>
              <span className="text-[10px] text-amber-900 font-semibold">
                {tipsList.length} tipp{tipsList.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* List of active tips */}
            <div className="space-y-1.5">
              {tipsList.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between p-2 rounded-xl bg-white border border-amber-200 text-xs text-amber-950"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-music-gold font-bold">•</span>
                    <span>{tip}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTip(idx)}
                    className="text-amber-700 hover:text-rose-700 p-0.5 ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Input to add a new tip */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="text"
                value={newTipInput}
                onChange={(e) => setNewTipInput(e.target.value)}
                placeholder="Écrire un conseil (ex: Travailler le passage difficile au tempo 50...)"
                className="flex-1 px-3 py-1.5 rounded-xl border border-amber-300 bg-white text-xs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTip();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleAddTip()}
                className="px-3 py-1.5 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-2xs transition shrink-0"
              >
                + Ajouter
              </button>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="flex flex-wrap gap-1 pt-1">
              {[
                'Mains séparées au métronome',
                'Souplesse du poignet et des épaules',
                'Faire chanter la voix supérieure',
                'Respecter la respiration musicale',
                'Accords plaqués avant d’égrener'
              ].map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAddTip(sug)}
                  className="text-[10px] px-2 py-0.5 rounded-lg border border-amber-200 bg-white hover:bg-amber-100/60 text-amber-900 transition"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION: EXERCICES PERSONNALISÉS */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-emerald-950 flex items-center space-x-1.5 uppercase tracking-wider text-[11px]">
                <Target className="w-4 h-4 text-emerald-700" />
                <span>Exercices Personnalisés Dédiés à la Pièce :</span>
              </label>
              <button
                type="button"
                onClick={handleAddExerciseRow}
                className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center space-x-1 bg-white px-2 py-0.5 rounded-lg border border-emerald-300"
              >
                <Plus className="w-3 h-3" />
                <span>Ajouter un exercice</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {exercisesList.map((ex, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={ex.title}
                      onChange={(e) => handleExerciseChange(idx, 'title', e.target.value)}
                      placeholder="Titre de l'exercice..."
                      className="font-bold text-emerald-950 flex-1 border-b border-dashed border-emerald-300 pb-0.5 text-xs bg-transparent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(idx)}
                      className="text-emerald-700 hover:text-rose-700 p-0.5"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-music-inkLight block">Passage / Mesures :</span>
                      <input
                        type="text"
                        value={ex.bars}
                        onChange={(e) => handleExerciseChange(idx, 'bars', e.target.value)}
                        placeholder="Ex: Mesures 1 à 16"
                        className="w-full px-2 py-1 rounded-lg border border-music-border bg-music-paper text-[11px]"
                      />
                    </div>
                    <div>
                      <span className="text-music-inkLight block">Tempo Cible (BPM) :</span>
                      <input
                        type="number"
                        value={ex.targetBpm}
                        onChange={(e) => handleExerciseChange(idx, 'targetBpm', e.target.value)}
                        placeholder="60"
                        className="w-full px-2 py-1 rounded-lg border border-music-border bg-music-paper text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={ex.notes}
                      onChange={(e) => handleExerciseChange(idx, 'notes', e.target.value)}
                      placeholder="Consigne technique (ex: Mains séparées, sans pédale...)"
                      className="w-full px-2 py-1 rounded-lg border border-music-border bg-music-paper text-[11px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partition & Document Notice */}
          <div className="p-3 rounded-2xl bg-music-card border border-music-border flex items-center space-x-3 text-xs text-music-inkMuted">
            <Download className="w-5 h-5 text-music-gold shrink-0" />
            <div>
              <strong className="text-music-ink font-semibold">Génération Automatique de la Partition :</strong>
              <p className="text-[11px] mt-0.5">
                Une fois la pièce ajoutée, vous pourrez la visualiser sur le pupitre interactif et <strong>télécharger la partition officielle prête à imprimer au format PDF</strong> avec tous ses tipps et exercices intégrés.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-music-border flex justify-end space-x-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-music-border text-music-inkMuted hover:text-music-ink text-xs font-bold transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-music-gold hover:bg-music-goldHover text-white font-bold text-xs shadow-xs transition flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter à mon Répertoire</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
