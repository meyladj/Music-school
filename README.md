# 🎼 Îlot Musique Alger — Conservatoire & École de Musique
### Représentant Officiel & Centre d'Examens Agréé de l'American Canadian Academy (ACA) en Algérie

Projet full-stack combinant un frontend moderne **React (Vite, Tailwind CSS)** et un backend robuste **Django (Django REST Framework)**, conçu pour l'école de musique et conservatoire **Îlot Musique Alger**.

---

## 🌟 Points Clés du Projet

### 1. 🌐 Landing Page Prestige & Partenariat American Canadian Academy
- **Représentation Exclusive en Algérie** : Mise en valeur de l'accréditation et des cursus nord-américains (Grades 1 à 8 et diplôme supérieur).
- **Les 5 Disciplines Principales** :
  - 🎹 **Piano** (Classique, Jazz, Variété, Déchiffrage & Harmonie)
  - 🎻 **Violon & Cordes** (Technique d'archet, Justesse, Musique de chambre)
  - 🎸 **Guitare** (Classique, Acoustique, Électrique, Fingerpicking & Solos)
  - 🥁 **Batterie & Percussions** (Indépendance 4 membres, Tempo métronomique, Grooves rock/funk/jazz)
  - 🎤 **Chant (Technique Vocale)** (Respiration diaphragmatique, Résonance, Voix lyrique & actuelle)
  - ✨ *Option Éveil Musical (4-7 ans) & Solfège*
- **Deux Formats d'Enseignement** :
  - **Cours Individuels** : Suivi sur-mesure 1-à-1, ajustement postural minutieux, préparation accélérée aux examens ACA.
  - **Cours en Groupe** : Ateliers d'ensemble (4-7 élèves), polyphonie, rythme partagé, chorale et préparation scénique.
  - **Formule Hybride** : 1 séance individuelle + 1 atelier collectif par semaine.
- **Formulaire d'Admission & Pré-inscription en Ligne** :
  - Connecté à l'API Django REST (`/api/admissions/`) avec génération instantanée du matricule officiel `IMA-ACA-2026-XXXX` et quittance de pré-inscription.
- **Tarifs en Dinars Algériens (DZD)** :
  - 1 séance/semaine (6 500 DA/mois) | 2 séances/semaine (10 000 DA/mois)
  - Prise en charge des règlements algériens : **BaridiMob**, **CCP**, **Espèces au guichet**, **Virement bancaire**.

### 2. 🏛️ Portail Académique & Gestion Interne (Accès via "Portail Académique")
- **Espace Direction & Administration** : Suivi des effectifs, pointage, cotisations et attestations.
- **Portail Enseignant** : Suivi des élèves, assignation des pièces musicales, bulletins et devoirs.
- **Portail Étudiant** : Relevé de notes, assiduité, pièces de travail et quittances.
- **Bibliothèque & Partitions** : Médiathèque complète de méthodes, partitions et audios.
- **Outils Musicaux Intégrés** : Métronome Web Audio & Accordeur/Diapason 440 Hz.

---

## 🚀 Démarrage Rapide

Le projet se trouve désormais sur votre Bureau à l'emplacement :
`C:\Users\HP PAVILLION\Desktop\Music-school`

### 1. Démarrer le Backend Django REST API

Ouvrez un terminal (PowerShell) :

```bash
cd "C:\Users\HP PAVILLION\Desktop\Music-school\backend"

# Lancer le serveur Django
python manage.py runserver
```

- L'API REST est accessible sur : `http://127.0.0.1:8000/api/`
- L'administration Django est sur : `http://127.0.0.1:8000/admin/`
  - **Identifiant** : `admin`
  - **Mot de passe** : `admin123`

### 2. Démarrer le Frontend React

Dans un second terminal :

```bash
cd "C:\Users\HP PAVILLION\Desktop\Music-school"

# Lancer le serveur de développement Vite
npm run dev
```

- Le site s'ouvre sur : `http://localhost:5173`

---

## 🛠️ Architecture Technique

```
Music-school/
├── backend/                  # API REST Django
│   ├── academy/              # Application académique (Modèles, Vues, Sérialiseurs)
│   │   ├── models.py         # Candidatures, Cursus ACA, Formats (Individuel/Groupe), FAQ
│   │   ├── views.py          # Endpoints API REST
│   │   ├── serializers.py    # Sérialiseurs DRF
│   │   └── admin.py          # Dashboard d'administration Django
│   ├── ilot_backend/         # Paramètres du projet Django & CORS
│   ├── db.sqlite3            # Base SQLite pré-alimentée
│   └── manage.py
│
├── src/                      # Frontend React
│   ├── components/
│   │   ├── landing/          # Nouvelle Landing Page
│   │   │   ├── LandingPage.jsx          # Orchestrateur
│   │   │   ├── LandingNavbar.jsx        # Navigation & Badges ACA
│   │   │   ├── HeroSection.jsx          # Hero avec les 5 instruments
│   │   │   ├── AcaPartnershipSection.jsx# Présentation du partenariat ACA & Grades
│   │   │   ├── DisciplinesSection.jsx   # Piano, Violon, Guitare, Batterie, Chant
│   │   │   ├── LessonFormatsSection.jsx # Cours Individuels vs Cours en Groupe
│   │   │   ├── AdmissionSection.jsx     # Formulaire connecté à l'API Django
│   │   │   ├── PricingSection.jsx       # Tarifs en Dinars (DZD) & BaridiMob/CCP
│   │   │   ├── TestimonialsSection.jsx  # Témoignages d'élèves
│   │   │   ├── FaqSection.jsx           # FAQ interactive
│   │   │   └── LandingFooter.jsx        # Coordonnées Alger (Didouche / Hydra)
│   │   ├── admin/            # Dashboards de gestion académique
│   │   ├── teacher/
│   │   ├── student/
│   │   └── library/
│   ├── services/
│   │   └── api.js            # Client API REST avec fallback local
│   ├── App.jsx               # Navigation fluide Site Public ⟷ Portail Académique
│   └── main.jsx
├── public/                   # Logo officiel Îlot Musique
├── package.json
└── tailwind.config.js
```
