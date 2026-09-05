// Initial mock data for Îlot Musique Alger
// Stored in localStorage for live interactivity across roles

export const INITIAL_TEACHERS = [
  {
    id: 'prof-1',
    name: 'Mehdi Benali',
    instrument: 'Piano & Solfège',
    bio: 'Diplômé de l’Institut Supérieur de Musique d’Alger (INSM). 12 ans d’expérience en piano classique et jazz.',
    email: 'm.benali@ilotmusique-alger.com',
    username: 'm.benali',
    password: 'prof2026',
    phone: '0550 12 34 56',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    color: '#c99738'
  },
  {
    id: 'prof-2',
    name: 'Amel Cherif',
    instrument: 'Violon & Alto',
    bio: 'Premier violon à l’Orchestre Symphonique National d’Alger. Pédagogie active méthode Suzuki et classique.',
    email: 'a.cherif@ilotmusique-alger.com',
    username: 'a.cherif',
    password: 'prof2026',
    phone: '0555 98 76 54',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    color: '#8b5cf6'
  },
  {
    id: 'prof-3',
    name: 'Karim Zouaoui',
    instrument: 'Guitare & Oud',
    bio: 'Maître de luth oriental (Oud) et guitariste classique. Spécialiste du répertoire andalou et flamenco.',
    email: 'k.zouaoui@ilotmusique-alger.com',
    username: 'k.zouaoui',
    password: 'prof2026',
    phone: '0770 45 67 89',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    color: '#10b981'
  },
  {
    id: 'prof-4',
    name: 'Yasmine Hadj',
    instrument: 'Chant & Technique Vocale',
    bio: 'Soprano lyrique et coach vocal. Préparation aux auditions et travail de la respiration/posture.',
    email: 'y.hadj@ilotmusique-alger.com',
    username: 'y.hadj',
    password: 'prof2026',
    phone: '0661 23 45 67',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    color: '#f43f5e'
  }
];

export const INSTRUMENT_CATEGORIES = [
  'Piano',
  'Guitare',
  'Violon',
  'Oud',
  'Chant',
  'Batterie',
  'Solfège & Éveil'
];

export const INITIAL_STUDENTS = [
  {
    id: 'std-1',
    matricule: 'IMA-2026-001',
    username: 'rayan.mansouri',
    password: 'piano2026',
    accountActive: true,
    accountCreatedDate: '15/09/2024',
    firstName: 'Rayan',
    lastName: 'Mansouri',
    age: 14,
    gender: 'M',
    instrument: 'Piano',
    teacherId: 'prof-1',
    level: 'Intermédiaire 2',
    sessionsPerWeek: 2, // 2 séances par semaine
    scheduleDays: 'Mercredi 16h30 & Samedi 10h00',
    tuitionFee: 10000, // 10 000 DZD
    guardianName: 'Sofiane Mansouri (Père)',
    phone: '0550 44 22 11',
    email: 'famille.mansouri@gmail.com',
    address: 'El Biar, Alger',
    enrolledDate: '15/09/2024',
    status: 'Actif',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-2',
    matricule: 'IMA-2026-002',
    username: 'lina.khelifi',
    password: 'violon2026',
    accountActive: true,
    accountCreatedDate: '02/10/2025',
    firstName: 'Lina',
    lastName: 'Khelifi',
    age: 11,
    gender: 'F',
    instrument: 'Violon',
    teacherId: 'prof-2',
    level: 'Débutant',
    sessionsPerWeek: 2,
    scheduleDays: 'Mardi 17h00 & Vendredi 15h00',
    tuitionFee: 10000,
    guardianName: 'Samia Khelifi (Mère)',
    phone: '0662 11 33 55',
    email: 's.khelifi@yahoo.fr',
    address: 'Hydra, Alger',
    enrolledDate: '02/10/2025',
    status: 'Actif',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-3',
    matricule: 'IMA-2026-003',
    username: 'youcef.belkacem',
    password: 'oud2026',
    accountActive: true,
    accountCreatedDate: '10/01/2024',
    firstName: 'Youcef',
    lastName: 'Belkacem',
    age: 22,
    gender: 'M',
    instrument: 'Oud',
    teacherId: 'prof-3',
    level: 'Avancé',
    sessionsPerWeek: 1, // 1 séance par semaine
    scheduleDays: 'Samedi 14h00',
    tuitionFee: 6500,
    guardianName: 'Lui-même (Étudiant universitaire)',
    phone: '0771 88 99 00',
    email: 'youcef.belkacem@esi.dz',
    address: 'Kouba, Alger',
    enrolledDate: '10/01/2024',
    status: 'Actif',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-4',
    matricule: 'IMA-2026-004',
    username: 'sarah.boudiaf',
    password: 'chant2026',
    accountActive: true,
    accountCreatedDate: '01/09/2025',
    firstName: 'Sarah',
    lastName: 'Boudiaf',
    age: 16,
    gender: 'F',
    instrument: 'Chant',
    teacherId: 'prof-4',
    level: 'Intermédiaire 1',
    sessionsPerWeek: 2,
    scheduleDays: 'Lundi 17h30 & Jeudi 17h30',
    tuitionFee: 10000,
    guardianName: 'Karima Boudiaf (Mère)',
    phone: '0559 77 44 11',
    email: 'karima.boudiaf@gmail.com',
    address: 'Dely Brahim, Alger',
    enrolledDate: '01/09/2025',
    status: 'Actif',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-5',
    matricule: 'IMA-2026-005',
    username: 'amine.taleb',
    password: 'guitare2026',
    accountActive: true,
    accountCreatedDate: '15/11/2025',
    firstName: 'Amine',
    lastName: 'Taleb',
    age: 9,
    gender: 'M',
    instrument: 'Guitare',
    teacherId: 'prof-3',
    level: 'Débutant',
    sessionsPerWeek: 1,
    scheduleDays: 'Mercredi 14h00',
    tuitionFee: 6500,
    guardianName: 'Hakim Taleb (Père)',
    phone: '0660 33 22 11',
    email: 'hakim.taleb@outlook.com',
    address: 'Bab Ezzouar, Alger',
    enrolledDate: '15/11/2025',
    status: 'Actif',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  }
];

// Repertoire pieces per student ("pièces à apprendre")
export const INITIAL_PIECES = [
  {
    id: 'pc-1',
    studentId: 'std-1',
    title: 'Clair de Lune (Suite Bergamasque)',
    composer: 'Claude Debussy',
    difficulty: 'Intermédiaire 2',
    tempo: 'Andante très expressif (56 BPM)',
    key: 'Ré bémol Majeur',
    progress: 75,
    status: 'nuances', // decouverte | rythme | nuances | maitrise
    teacherNotes: 'Superbe progression sur les arpèges. Attention au rubato dans la deuxième partie et au relâchement des poignets.',
    assignedDate: '05/08/2026',
    sheetUrl: '#',
    audioSample: 'Enregistrement de référence disponible',
    tips: [
      'Garder le poignet gauche très souple sur les arpèges ondulants.',
      'Faire ressortir la ligne mélodique supérieure (chant) en pianissimo bien timbré.',
      'Changer la pédale de résonance avec précision à chaque changement d’harmonie.',
      'Ne pas accélérer sur le passage central rubato ; penser respiration fluide.'
    ],
    exercises: [
      {
        id: 'ex-101',
        title: 'Arpèges en balancement main gauche (Mesures 1 à 14)',
        bpm: 50,
        target: 'Mesures 1 à 14',
        advice: 'Garder le poignet très souple. Le pouce doit effleurer les touches sans accent brusque.',
        completed: true,
        duration: '10 min / jour'
      },
      {
        id: 'ex-102',
        title: 'Chant espressivo de la main droite et phrasé pianissimo',
        bpm: 54,
        target: 'Mesures 15 à 26',
        advice: 'Faire ressortir la ligne supérieure mélodique tout en étouffant légèrement les tierces intérieures.',
        completed: false,
        duration: '15 min / jour'
      },
      {
        id: 'ex-103',
        title: 'Transition vers le tempo rubato & pédale de résonance',
        bpm: 58,
        target: 'Mesures 27 à 42',
        advice: 'Changer la pédale scrupuleusement à chaque harmonie pour éviter tout flou dans la tonalité de Ré bémol.',
        completed: false,
        duration: '12 min / jour'
      }
    ]
  },
  {
    id: 'pc-2',
    studentId: 'std-1',
    title: 'Valse en La mineur, Op. posth. B 150',
    composer: 'Frédéric Chopin',
    difficulty: 'Intermédiaire 1',
    tempo: 'Allegretto (120 BPM)',
    key: 'La mineur',
    progress: 100,
    status: 'maitrise',
    teacherNotes: 'Morceau validé pour le concert de fin de trimestre ! Parfait équilibre main gauche et basse.',
    assignedDate: '10/06/2026',
    sheetUrl: '#',
    audioSample: 'Validé en audition',
    tips: [
      'Basse au 1er temps toujours ronde et profonde, temps 2 et 3 délicats et légers.',
      'Anticiper le déplacement de la main gauche pour ne jamais briser le rythme de valse.',
      'Trille de la mesure 21 à travailler bouche fermée en chantant le motif.',
      'Respirer à chaque fin de phrase musicale de 8 mesures.'
    ],
    exercises: [
      {
        id: 'ex-201',
        title: 'Saut de basse et accords 2-3 de valse viennoise',
        bpm: 110,
        target: 'Mesures 1 à 16',
        advice: 'Basse bien appuyée au 1er temps, 2e et 3e temps très légers et sautillants.',
        completed: true,
        duration: '8 min / jour'
      },
      {
        id: 'ex-202',
        title: 'Trilles et ornementations de la main droite (Mesure 21)',
        bpm: 120,
        target: 'Mesures 17 à 32',
        advice: 'Doigté 3-2-1-2 rapide sans raidir l’avant-bras.',
        completed: true,
        duration: '10 min / jour'
      }
    ]
  },
  {
    id: 'pc-3',
    studentId: 'std-2',
    title: 'Le Printemps - 1er Mvt (Les Quatre Saisons)',
    composer: 'Antonio Vivaldi',
    difficulty: 'Débutant 2',
    tempo: 'Allegro (108 BPM)',
    key: 'Mi Majeur',
    progress: 40,
    status: 'rythme',
    teacherNotes: 'Bien surveiller la tenue de l’archet et la justesse du 3ème doigt sur la corde de La.',
    assignedDate: '20/08/2026',
    sheetUrl: '#',
    audioSample: 'Audio lent métronome disponible',
    exercises: [
      {
        id: 'ex-301',
        title: 'Sauts de corde et régularité du coup d’archet',
        bpm: 80,
        target: 'Thème principal (Mesures 1-8)',
        advice: 'Archet bien parallèle au chevalet, utiliser le tiers supérieur de la mèche.',
        completed: true,
        duration: '10 min / jour'
      },
      {
        id: 'ex-302',
        title: 'Justesse du 3ème doigt sur la corde de La (Ré #)',
        bpm: 76,
        target: 'Mesures 9 à 16',
        advice: 'Vérifier la résonance par sympathie avec la corde de Ré.',
        completed: false,
        duration: '12 min / jour'
      }
    ]
  },
  {
    id: 'pc-4',
    studentId: 'std-3',
    title: 'Samaï Rast Tatyos Efendi',
    composer: 'Tatyos Enserjian',
    difficulty: 'Avancé',
    tempo: 'Thaqil 10/8 (72 BPM)',
    key: 'Maqam Rast',
    progress: 85,
    status: 'nuances',
    teacherNotes: 'Excellente maîtrise du Risha (médiator). Travailler l’ornementation du 4ème Khanah.',
    assignedDate: '12/07/2026',
    sheetUrl: '#',
    audioSample: 'Enregistrement maître disponible',
    exercises: [
      {
        id: 'ex-401',
        title: 'Frappe alternée du Risha sur le cycle rythmique 10/8',
        bpm: 68,
        target: 'Iqa’a Thaqil (DUM-ES-TAK-DUM-TAK)',
        advice: 'Attaque franche du Risha vers le bas sur le premier Dum.',
        completed: true,
        duration: '15 min / jour'
      },
      {
        id: 'ex-402',
        title: 'Précision du quart de ton Sikah (Mi demi-bémol)',
        bpm: 60,
        target: 'Khanah 2 et Taslim',
        advice: 'Écoute attentive de la tierce neutre du Maqam Rast.',
        completed: true,
        duration: '10 min / jour'
      }
    ]
  },
  {
    id: 'pc-5',
    studentId: 'std-4',
    title: 'Lascia ch’io pianga (Rinaldo)',
    composer: 'G.F. Händel',
    difficulty: 'Intermédiaire',
    tempo: 'Largo (52 BPM)',
    key: 'Fa Majeur',
    progress: 60,
    status: 'rythme',
    teacherNotes: 'Soutien diaphragmatique en progrès. Prendre le temps sur les respirations sans casser la ligne mélodique.',
    assignedDate: '18/08/2026',
    sheetUrl: '#',
    audioSample: 'Piste piano accompagnement disponible',
    exercises: [
      {
        id: 'ex-501',
        title: 'Tenue de souffle sur les voyelles ouvertes [a] et [o]',
        bpm: 48,
        target: 'Première phrase (Mesures 1-6)',
        advice: 'Expansion des côtes basses sans soulever la poitrine.',
        completed: true,
        duration: '10 min / jour'
      },
      {
        id: 'ex-502',
        title: 'Messa di Voce : Enfler puis diminuer le son sur le Fa aigu',
        bpm: 52,
        target: 'Mesure 14',
        advice: 'Garder le timbre homogène et le vibrato naturel.',
        completed: false,
        duration: '15 min / jour'
      }
    ]
  },
  {
    id: 'pc-6',
    studentId: 'std-5',
    title: 'Romance Anonyme (Jeux Interdits)',
    composer: 'Traditionnel Espagnol',
    difficulty: 'Débutant',
    tempo: 'Andante (84 BPM)',
    key: 'Mi mineur',
    progress: 50,
    status: 'rythme',
    teacherNotes: 'Bonne régularité de l’arpège p-i-m-a. Veiller à garder l’annulaire bien lié.',
    assignedDate: '22/08/2026',
    sheetUrl: '#',
    audioSample: 'Exercice audio guidé',
    exercises: [
      {
        id: 'ex-601',
        title: 'Arpège p-i-m-a en cordes à vide',
        bpm: 72,
        target: 'Préparation technique',
        advice: 'L’annulaire (a) joue la mélodie en buté léger, les doigts m et i en pincé.',
        completed: true,
        duration: '10 min / jour'
      },
      {
        id: 'ex-602',
        title: 'Transition vers le barré VII (Mesure 9)',
        bpm: 60,
        target: 'Mesures 9 à 12',
        advice: 'Placer le pouce bien au milieu du dos du manche.',
        completed: false,
        duration: '15 min / jour'
      }
    ]
  }
];

// Attendance records for current month (September 2026)
// Showing planned sessions (e.g. 8 sessions for 2 sessions/week, 4 sessions for 1 session/week)
export const INITIAL_ATTENDANCE = [
  // Rayan Mansouri (Piano - 2 sessions / week: Mercredi & Samedi)
  { id: 'att-101', studentId: 'std-1', sessionNumber: 1, date: '02/09/2026', day: 'Mercredi', status: 'present', note: 'À l’heure, travail sérieux' },
  { id: 'att-102', studentId: 'std-1', sessionNumber: 2, date: '05/09/2026', day: 'Samedi', status: 'present', note: 'Bon déchiffrage Debussy' },
  { id: 'att-103', studentId: 'std-1', sessionNumber: 3, date: '09/09/2026', day: 'Mercredi', status: 'present', note: 'Exercice Hanon n°5 validé' },
  { id: 'att-104', studentId: 'std-1', sessionNumber: 4, date: '12/09/2026', day: 'Samedi', status: 'absent_excused', note: 'Malade (certificat médical reçu)' },
  { id: 'att-105', studentId: 'std-1', sessionNumber: 5, date: '16/09/2026', day: 'Mercredi', status: 'present', note: 'Rattrapage effectué' },
  { id: 'att-106', studentId: 'std-1', sessionNumber: 6, date: '19/09/2026', day: 'Samedi', status: 'present', note: 'Très bonne musicalité' },
  { id: 'att-107', studentId: 'std-1', sessionNumber: 7, date: '23/09/2026', day: 'Mercredi', status: 'planned', note: 'Séance à venir' },
  { id: 'att-108', studentId: 'std-1', sessionNumber: 8, date: '26/09/2026', day: 'Samedi', status: 'planned', note: 'Séance à venir' },

  // Lina Khelifi (Violon - 2 sessions / week: Mardi & Vendredi)
  { id: 'att-201', studentId: 'std-2', sessionNumber: 1, date: '01/09/2026', day: 'Mardi', status: 'present', note: 'Bonne tenue d’archet' },
  { id: 'att-202', studentId: 'std-2', sessionNumber: 2, date: '04/09/2026', day: 'Vendredi', status: 'present', note: 'Exercice cordes à vide' },
  { id: 'att-203', studentId: 'std-2', sessionNumber: 3, date: '08/09/2026', day: 'Mardi', status: 'absent_unexcused', note: 'Absence non prévenue' },
  { id: 'att-204', studentId: 'std-2', sessionNumber: 4, date: '11/09/2026', day: 'Vendredi', status: 'present', note: 'Retour motivée' },
  { id: 'att-205', studentId: 'std-2', sessionNumber: 5, date: '15/09/2026', day: 'Mardi', status: 'planned', note: 'Séance à venir' },
  { id: 'att-206', studentId: 'std-2', sessionNumber: 6, date: '18/09/2026', day: 'Vendredi', status: 'planned', note: 'Séance à venir' },
  { id: 'att-207', studentId: 'std-2', sessionNumber: 7, date: '22/09/2026', day: 'Mardi', status: 'planned', note: 'Séance à venir' },
  { id: 'att-208', studentId: 'std-2', sessionNumber: 8, date: '25/09/2026', day: 'Vendredi', status: 'planned', note: 'Séance à venir' },

  // Youcef Belkacem (Oud - 1 session / week: Samedi)
  { id: 'att-301', studentId: 'std-3', sessionNumber: 1, date: '05/09/2026', day: 'Samedi', status: 'present', note: 'Maîtrise du maqam Rast' },
  { id: 'att-302', studentId: 'std-3', sessionNumber: 2, date: '12/09/2026', day: 'Samedi', status: 'present', note: 'Travail du rythme 10/8' },
  { id: 'att-303', studentId: 'std-3', sessionNumber: 3, date: '19/09/2026', day: 'Samedi', status: 'planned', note: 'Séance à venir' },
  { id: 'att-304', studentId: 'std-3', sessionNumber: 4, date: '26/09/2026', day: 'Samedi', status: 'planned', note: 'Séance à venir' },

  // Sarah Boudiaf (Chant - 2 sessions / week: Lundi & Jeudi)
  { id: 'att-401', studentId: 'std-4', sessionNumber: 1, date: '03/09/2026', day: 'Jeudi', status: 'present', note: 'Vocalises d’échauffement' },
  { id: 'att-402', studentId: 'std-4', sessionNumber: 2, date: '07/09/2026', day: 'Lundi', status: 'present', note: 'Justesse impeccable' },
  { id: 'att-403', studentId: 'std-4', sessionNumber: 3, date: '10/09/2026', day: 'Jeudi', status: 'present', note: 'Travail de l’air de Händel' },
  { id: 'att-404', studentId: 'std-4', sessionNumber: 4, date: '14/09/2026', day: 'Lundi', status: 'planned', note: 'Séance à venir' },
  { id: 'att-405', studentId: 'std-4', sessionNumber: 5, date: '17/09/2026', day: 'Jeudi', status: 'planned', note: 'Séance à venir' },
  { id: 'att-406', studentId: 'std-4', sessionNumber: 6, date: '21/09/2026', day: 'Lundi', status: 'planned', note: 'Séance à venir' },
  { id: 'att-407', studentId: 'std-4', sessionNumber: 7, date: '24/09/2026', day: 'Jeudi', status: 'planned', note: 'Séance à venir' },
  { id: 'att-408', studentId: 'std-4', sessionNumber: 8, date: '28/09/2026', day: 'Lundi', status: 'planned', note: 'Séance à venir' },

  // Amine Taleb (Guitare - 1 session / week: Mercredi)
  { id: 'att-501', studentId: 'std-5', sessionNumber: 1, date: '02/09/2026', day: 'Mercredi', status: 'present', note: 'Premières notes de Romance' },
  { id: 'att-502', studentId: 'std-5', sessionNumber: 2, date: '09/09/2026', day: 'Mercredi', status: 'absent_excused', note: 'Voyage familial' },
  { id: 'att-503', studentId: 'std-5', sessionNumber: 3, date: '16/09/2026', day: 'Mercredi', status: 'planned', note: 'Séance à venir' },
  { id: 'att-504', studentId: 'std-5', sessionNumber: 4, date: '23/09/2026', day: 'Mercredi', status: 'planned', note: 'Séance à venir' }
];

// Monthly Tuition Payments (DZD)
export const INITIAL_PAYMENTS = [
  {
    id: 'pay-001',
    receiptNumber: 'REC-2026-09-001',
    studentId: 'std-1',
    month: 'Septembre 2026',
    amount: 10000,
    status: 'paid', // paid | pending | overdue
    paymentDate: '01/09/2026',
    paymentMethod: 'BaridiMob',
    reference: 'BMOB-98321044',
    collectedBy: 'Secrétariat Îlot Musique',
    notes: 'Règlement anticipé complet pour le mois de septembre.'
  },
  {
    id: 'pay-002',
    receiptNumber: 'REC-2026-09-002',
    studentId: 'std-2',
    month: 'Septembre 2026',
    amount: 10000,
    status: 'overdue',
    paymentDate: null,
    paymentMethod: 'En attente',
    reference: null,
    collectedBy: null,
    notes: 'Relance envoyée par SMS au tuteur le 04/09.'
  },
  {
    id: 'pay-003',
    receiptNumber: 'REC-2026-09-003',
    studentId: 'std-3',
    month: 'Septembre 2026',
    amount: 6500,
    status: 'paid',
    paymentDate: '03/09/2026',
    paymentMethod: 'Espèces',
    reference: 'ESP-ALGER-441',
    collectedBy: 'Direction Pédagogique',
    notes: 'Payé au secrétariat avec reçu papier délivré.'
  },
  {
    id: 'pay-004',
    receiptNumber: 'REC-2026-09-004',
    studentId: 'std-4',
    month: 'Septembre 2026',
    amount: 10000,
    status: 'paid',
    paymentDate: '02/09/2026',
    paymentMethod: 'Virement CCP',
    reference: 'CCP-77823-DZ',
    collectedBy: 'Secrétariat Îlot Musique',
    notes: 'Virement postal vérifié et validé.'
  },
  {
    id: 'pay-005',
    receiptNumber: 'REC-2026-09-005',
    studentId: 'std-5',
    month: 'Septembre 2026',
    amount: 6500,
    status: 'pending',
    paymentDate: null,
    paymentMethod: 'Espèces (Promis)',
    reference: null,
    collectedBy: null,
    notes: 'Le parent a confirmé règlement lors du prochain cours.'
  },
  // Previous month historical record
  {
    id: 'pay-000-1',
    receiptNumber: 'REC-2026-08-015',
    studentId: 'std-1',
    month: 'Août 2026',
    amount: 10000,
    status: 'paid',
    paymentDate: '02/08/2026',
    paymentMethod: 'BaridiMob',
    reference: 'BMOB-87114500',
    collectedBy: 'Secrétariat Îlot Musique',
    notes: 'Session d’été'
  }
];

// Teacher Notes & Student Evaluations (Espace Prof)
export const INITIAL_EVALUATIONS = [
  {
    id: 'eval-1',
    studentId: 'std-1',
    teacherId: 'prof-1',
    period: 'Septembre 2026',
    date: '04/09/2026',
    solfegeScore: 18,
    techniqueScore: 16.5,
    musicalityScore: 17,
    regularityScore: 19,
    generalAppreciation: 'Rayan montre une maturité remarquable dans son interprétation de Debussy. La gestuelle du bras commence à bien se fluidifier. Continue ainsi !',
    homework: 'Travailler le Hanon n°6 avec les 4 rythmes différents. Jouer les pages 1 et 2 du Clair de Lune avec métronome à 50 BPM pour stabiliser les doubles croches.',
    homeworkDone: false
  },
  {
    id: 'eval-2',
    studentId: 'std-2',
    teacherId: 'prof-2',
    period: 'Septembre 2026',
    date: '03/09/2026',
    solfegeScore: 14,
    techniqueScore: 13,
    musicalityScore: 15,
    regularityScore: 12,
    generalAppreciation: 'Lina a une belle sensibilité auditive. Il faut insister sur le maintien du violon bien à l’horizontale et éviter que le poignet gauche ne colle au manche.',
    homework: '10 minutes quotidiennes de cordes à vide devant le miroir. Apprendre les 4 premières mesures du thème de Vivaldi au tempo 80.',
    homeworkDone: true
  },
  {
    id: 'eval-3',
    studentId: 'std-3',
    teacherId: 'prof-3',
    period: 'Septembre 2026',
    date: '05/09/2026',
    solfegeScore: 19,
    techniqueScore: 18,
    musicalityScore: 19.5,
    regularityScore: 18.5,
    generalAppreciation: 'Excellente maîtrise du Samaï. La sensibilité des quarts de ton (Sikah et Rast) est très juste. Prévoir un passage en audition solo d’ici décembre.',
    homework: 'Perfectionner la transition modale vers le Maqam Nahawand dans le Taslim. Fluidifier les allers-retours rapides du Risha.',
    homeworkDone: false
  }
];

// Pedagogical Library (Partitions, Livres, Documentation, Audios)
export const INITIAL_LIBRARY = [
  {
    id: 'lib-1',
    title: 'Méthode Rose - Première Année de Piano',
    category: 'Livres',
    instrument: 'Piano',
    level: 'Débutant',
    author: 'Ernest Van de Velde',
    format: 'PDF',
    pages: 64,
    fileSize: '14.2 Mo',
    description: 'La méthode classique de référence pour l’apprentissage du piano et de la lecture musicale des deux mains en clé de Sol et Fa.',
    downloadUrl: '#',
    badge: 'Incontournable',
    dateAdded: '15/01/2026'
  },
  {
    id: 'lib-2',
    title: 'Le Pianiste Virtuose en 60 Exercices (Hanon)',
    category: 'Livres',
    instrument: 'Piano',
    level: 'Tous niveaux',
    author: 'Charles-Louis Hanon',
    format: 'PDF',
    pages: 118,
    fileSize: '22.8 Mo',
    description: 'Exercices d’agilité, d’indépendance, de force et de parfaite égalité des doigts, ainsi que de souplesse des poignets.',
    downloadUrl: '#',
    badge: 'Technique',
    dateAdded: '10/02/2026'
  },
  {
    id: 'lib-3',
    title: 'Partition : Clair de Lune (Suite Bergamasque)',
    category: 'Partitions',
    instrument: 'Piano',
    level: 'Intermédiaire / Avancé',
    author: 'Claude Debussy',
    format: 'PDF + Audio',
    pages: 6,
    fileSize: '3.4 Mo',
    description: 'Édition urtext doigtée avec annotations stylistiques et dynamiques par les professeurs d’Îlot Musique.',
    downloadUrl: '#',
    badge: 'Chef-d’œuvre',
    dateAdded: '01/03/2026'
  },
  {
    id: 'lib-4',
    title: 'Manuel d’Étude du Oud (Luth Arabe)',
    category: 'Livres',
    instrument: 'Oud',
    level: 'Intermédiaire',
    author: 'Charbel Rouhana & Jamil Ghanim',
    format: 'PDF',
    pages: 88,
    fileSize: '18.5 Mo',
    description: 'Approche moderne du luth oriental : doigtés, ornementations, études des Maqamat (Bayati, Rast, Hijaz, Nahawand, Sikah).',
    downloadUrl: '#',
    badge: 'Tradition & Modernité',
    dateAdded: '12/04/2026'
  },
  {
    id: 'lib-5',
    title: 'Manuel Pratique pour l’Étude des Clés (Dandelot)',
    category: 'Théorie & Solfège',
    instrument: 'Solfège & Éveil',
    level: 'Tous niveaux',
    author: 'Georges Dandelot',
    format: 'PDF',
    pages: 76,
    fileSize: '8.9 Mo',
    description: 'Entraînement quotidien à la lecture rapide et réflexe des notes en clé de Sol, Fa et Ut.',
    downloadUrl: '#',
    badge: 'Essentiel',
    dateAdded: '20/02/2026'
  },
  {
    id: 'lib-6',
    title: 'Partition : Les Quatre Saisons - Le Printemps (Violon & Piano)',
    category: 'Partitions',
    instrument: 'Violon',
    level: 'Débutant / Intermédiaire',
    author: 'Antonio Vivaldi (Arr. Pédagogique)',
    format: 'PDF',
    pages: 8,
    fileSize: '4.1 Mo',
    description: 'Partition conducteur violon solo avec réduction piano pour travail d’ensemble.',
    downloadUrl: '#',
    badge: 'Répertoire',
    dateAdded: '05/05/2026'
  },
  {
    id: 'lib-7',
    title: 'Guide de la Technique Vocale & Respiration Diaphragmatique',
    category: 'Théorie & Solfège',
    instrument: 'Chant',
    level: 'Tous niveaux',
    author: 'Département Vocal Îlot Musique Alger',
    format: 'PDF + Exercices audio',
    pages: 32,
    fileSize: '12.0 Mo',
    description: 'Postures fondamentales, vocalises progressives, gestion du souffle et santé des cordes vocales.',
    downloadUrl: '#',
    badge: 'Exclusivité École',
    dateAdded: '18/06/2026'
  },
  {
    id: 'lib-8',
    title: '25 Études Mélodiques et Progressives Op. 60',
    category: 'Partitions',
    instrument: 'Guitare',
    level: 'Intermédiaire',
    author: 'Matteo Carcassi',
    format: 'PDF',
    pages: 42,
    fileSize: '9.6 Mo',
    description: 'Études indispensables pour la technique de guitare classique : arpèges, gammes, liaisons et accords brisés.',
    downloadUrl: '#',
    badge: 'Classique',
    dateAdded: '11/07/2026'
  },
  {
    id: 'lib-9',
    title: 'Piste Audio : Accompagnement Play-Along Valse Chopin (120 BPM)',
    category: 'Audios',
    instrument: 'Piano',
    level: 'Intermédiaire',
    author: 'Studio Îlot Musique Alger',
    format: 'MP3',
    pages: 0,
    fileSize: '7.8 Mo',
    description: 'Basse et contretemps enregistrés au métronome pour travailler la régularité et le jeu d’ensemble.',
    downloadUrl: '#',
    badge: 'Play-along',
    dateAdded: '02/08/2026'
  }
];

// Notifications for Student / Teacher
export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    targetRole: 'student',
    studentId: 'std-1',
    title: 'Nouveau devoir de piano',
    message: 'Prof. Mehdi Benali a ajouté le Hanon n°6 et 2 pages de Debussy à travailler pour la séance du mercredi 09/09.',
    date: 'Il y a 2 heures',
    read: false,
    icon: 'Music'
  },
  {
    id: 'notif-2',
    targetRole: 'student',
    studentId: 'std-1',
    title: 'Paiement validé avec succès',
    message: 'Votre cotisation de Septembre 2026 (10 000 DZD - BaridiMob) a été validée. Reçu REC-2026-09-001 disponible.',
    date: 'Hier',
    read: true,
    icon: 'CreditCard'
  },
  {
    id: 'notif-3',
    targetRole: 'student',
    studentId: 'std-2',
    title: 'Rappel de cotisation mensuelle',
    message: 'Le règlement des frais de scolarité pour le mois de septembre est en attente. Merci de régulariser au secrétariat.',
    date: 'Il y a 1 jour',
    read: false,
    icon: 'AlertCircle'
  },
  {
    id: 'notif-4',
    targetRole: 'teacher',
    teacherId: 'prof-1',
    title: 'Absence justifiée enregistrée',
    message: 'L’élève Rayan Mansouri a une absence justifiée pour le samedi 12/09 (certificat médical). Rattrapage le 16/09.',
    date: 'Il y a 3 jours',
    read: false,
    icon: 'Calendar'
  }
];

// Centralized User Accounts Directory (Managed by Admin)
export const INITIAL_ACCOUNTS = [
  {
    id: 'acc-admin',
    name: 'Direction & Secrétariat Général',
    role: 'admin',
    username: 'admin',
    email: 'admin@ilotmusique-alger.com',
    password: 'admin',
    status: 'active',
    linkedEntityId: null,
    createdAt: '01/09/2023',
    notes: 'Compte administrateur principal'
  },
  {
    id: 'acc-prof-1',
    name: 'Mehdi Benali',
    role: 'teacher',
    username: 'm.benali',
    email: 'm.benali@ilotmusique-alger.com',
    password: 'prof2026',
    status: 'active',
    linkedEntityId: 'prof-1',
    createdAt: '01/09/2024',
    notes: 'Professeur Piano & Solfège'
  },
  {
    id: 'acc-prof-2',
    name: 'Amel Cherif',
    role: 'teacher',
    username: 'a.cherif',
    email: 'a.cherif@ilotmusique-alger.com',
    password: 'prof2026',
    status: 'active',
    linkedEntityId: 'prof-2',
    createdAt: '15/09/2024',
    notes: 'Professeur Violon & Alto'
  },
  {
    id: 'acc-prof-3',
    name: 'Karim Zouaoui',
    role: 'teacher',
    username: 'k.zouaoui',
    email: 'k.zouaoui@ilotmusique-alger.com',
    password: 'prof2026',
    status: 'active',
    linkedEntityId: 'prof-3',
    createdAt: '10/01/2024',
    notes: 'Professeur Guitare & Oud'
  },
  {
    id: 'acc-prof-4',
    name: 'Yasmine Hadj',
    role: 'teacher',
    username: 'y.hadj',
    email: 'y.hadj@ilotmusique-alger.com',
    password: 'prof2026',
    status: 'active',
    linkedEntityId: 'prof-4',
    createdAt: '01/09/2025',
    notes: 'Professeur Chant & Technique Vocale'
  },
  {
    id: 'acc-std-1',
    name: 'Rayan Mansouri',
    role: 'student',
    username: 'IMA-2026-001',
    email: 'famille.mansouri@gmail.com',
    password: 'piano2026',
    status: 'active',
    linkedEntityId: 'std-1',
    createdAt: '15/09/2024',
    notes: 'Élève Piano (2 séances/semaine)'
  },
  {
    id: 'acc-std-2',
    name: 'Lina Khelifi',
    role: 'student',
    username: 'IMA-2026-002',
    email: 's.khelifi@yahoo.fr',
    password: 'violon2026',
    status: 'active',
    linkedEntityId: 'std-2',
    createdAt: '02/10/2025',
    notes: 'Élève Violon (2 séances/semaine)'
  },
  {
    id: 'acc-std-3',
    name: 'Youcef Belkacem',
    role: 'student',
    username: 'IMA-2026-003',
    email: 'youcef.belkacem@esi.dz',
    password: 'oud2026',
    status: 'active',
    linkedEntityId: 'std-3',
    createdAt: '10/01/2024',
    notes: 'Élève Oud (1 séance/semaine)'
  },
  {
    id: 'acc-std-4',
    name: 'Sarah Boudiaf',
    role: 'student',
    username: 'IMA-2026-004',
    email: 'karima.boudiaf@gmail.com',
    password: 'chant2026',
    status: 'active',
    linkedEntityId: 'std-4',
    createdAt: '01/09/2025',
    notes: 'Élève Chant (2 séances/semaine)'
  },
  {
    id: 'acc-std-5',
    name: 'Amine Taleb',
    role: 'student',
    username: 'IMA-2026-005',
    email: 'hakim.taleb@outlook.com',
    password: 'guitare2026',
    status: 'active',
    linkedEntityId: 'std-5',
    createdAt: '15/11/2025',
    notes: 'Élève Guitare (1 séance/semaine)'
  },
  {
    id: 'acc-hybrid-1',
    name: 'Youcef Belkacem',
    role: 'hybrid',
    username: 'youcef.hybrid',
    email: 'youcef.belkacem@ilotmusique-alger.com',
    password: 'hybrid2026',
    status: 'active',
    linkedTeacherId: 'prof-3',
    linkedStudentId: 'std-3',
    createdAt: '15/01/2025',
    notes: 'Compte Hybride : Enseignant initiation solfège & Apprenant Luth/Oud'
  }
];

export const PEDAGOGICAL_LEVELS = [
  'Éveil & Initiation',
  'Cycle 1 — Débutant',
  'Cycle 2 — Intermédiaire',
  'Cycle 3 — Supérieur',
  'Perfectionnement & Masterclass'
];

export const INITIAL_CLASSES = [
  {
    id: 'cls-1',
    name: 'Piano Supérieur — Classe Virtuose',
    level: 'Cycle 3 — Supérieur',
    instrument: 'Piano',
    teacherId: 'prof-1', // Mehdi Benali
    studentIds: ['std-1'], // Rayan Mansouri
    schedule: 'Mercredi 16h30 & Samedi 10h00',
    room: 'Auditorium Chopin',
    maxCapacity: 6,
    description: 'Répertoire romantique & impressionniste (Debussy, Chopin), perfectionnement de l’interprétation et du phrasé.'
  },
  {
    id: 'cls-2',
    name: 'Violon — Cycle Intermédiaire & Alto',
    level: 'Cycle 2 — Intermédiaire',
    instrument: 'Violon',
    teacherId: 'prof-2', // Amel Cherif
    studentIds: ['std-2'], // Lina Khelifi
    schedule: 'Mardi 17h00 & Samedi 11h00',
    room: 'Salle Mozart',
    maxCapacity: 8,
    description: 'Travail de l’archet, méthode Suzuki, justesse en positions et concertos classiques.'
  },
  {
    id: 'cls-3',
    name: 'Luth Oriental (Oud) — Initiation & Noubas',
    level: 'Éveil & Initiation',
    instrument: 'Oud',
    teacherId: 'prof-3', // Karim Zouaoui
    studentIds: ['std-3'], // Youcef Belkacem
    schedule: 'Jeudi 18h00',
    room: 'Salle Ziryab',
    maxCapacity: 10,
    description: 'Modes arabes classiques (Maqam Rast, Bayati), ornementation et technique du plectre (Risha).'
  },
  {
    id: 'cls-4',
    name: 'Chant Lyrique & Technique Vocale Avancée',
    level: 'Cycle 3 — Supérieur',
    instrument: 'Chant',
    teacherId: 'prof-4', // Yasmine Hadj
    studentIds: ['std-4'], // Sarah Boudiaf
    schedule: 'Lundi 16h00 & Samedi 14h00',
    room: 'Salle Berlioz',
    maxCapacity: 6,
    description: 'Soutien diaphragmatique, résonateurs, diction en italien/français et airs baroques.'
  },
  {
    id: 'cls-5',
    name: 'Guitare Classique — Débutants & Initiation',
    level: 'Éveil & Initiation',
    instrument: 'Guitare',
    teacherId: 'prof-3', // Karim Zouaoui
    studentIds: ['std-5'], // Amine Taleb
    schedule: 'Samedi 11h30',
    room: 'Salle Tarrega',
    maxCapacity: 8,
    description: 'Placement des mains, déliateurs, arpèges de Carulli et Jeux Interdits.'
  }
];

