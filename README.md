# 🎵 Îlot Musique Alger — Plateforme Académique & Pédagogique

Plateforme web moderne conçue sur mesure pour l'école de musique et conservatoire **Îlot Musique Alger**, permettant la gestion complète des dossiers apprenants, des pièces musicales à apprendre, du pointage des absences (formules 1 ou 2 séances par semaine), des règlements mensuels en Dinars Algériens (DZD), des évaluations des enseignants et d'une riche bibliothèque de partitions et méthodes à télécharger.

---

## 🌟 Modules et Fonctionnalités Principales

### 1. 📋 Gestion des Dossiers Personnels des Apprenants
- **Fiche d'inscription complète** : Nom, prénom, âge, matricule unique (`IMA-2026-XXX`), photo, instrument/catégorie, niveau (Débutant, Intermédiaire, Avancé), professeur assigné.
- **Formule de séances** : Prise en charge exacte du rythme hebdomadaire (1 séance/semaine ou 2 séances/semaine).
- **Contacts & Tuteurs** : Nom du responsable légal, téléphone (format algérien), email, commune d'Alger (Hydra, Kouba, El Biar, Dely Brahim...).
- **Actions complètes** : Ajout d'un nouvel élève, modification du dossier, consultation de la fiche détaillée, suppression.

### 2. 🎼 Suivi des « Pièces à Apprendre » (Répertoire Musical)
- Assignation de morceaux par le professeur avec titre, compositeur (Chopin, Debussy, Vivaldi, luth oriental Tatyos Efendi, etc.), tonalité, tempo indicatif (BPM).
- **Jauge de progression interactive (0 à 100%)** et 4 étapes de maîtrise : *Déchiffrage*, *Mise en place rythmique*, *Nuances & Style*, *Morceau Maîtrisé*.
- **Visionneuse de partitions intégrée** avec portées musicales, annotations stylistiques et lecteur audio de démonstration.

### 3. 📅 Gestion des Absences & Séances du Mois
- Calendrier adapté selon le nombre de séances par semaine (ex: 8 séances pour 2 séances/semaine, 4 séances pour 1 séance/semaine).
- **Pointage en 1 clic** : Présent (P), Absent Justifié (J), Absent Non Justifié (A).
- Calcul automatique en temps réel du **taux d'assiduité mensuel** (ex: 87.5%).
- Motifs d'absence et suivi des rattrapages.

### 4. 💳 Gestion des Paiements Mensuels (Dinars Algériens DZD)
- Suivi des cotisations selon la formule (ex: 6 500 DA pour 1 séance/sem., 10 000 DA pour 2 séances/sem.).
- États financiers clairs : **Encaissé**, **En attente**, **En retard**.
- Prise en charge des modes de règlement usuels en Algérie : **BaridiMob**, **Virement CCP**, **Espèces au guichet**, **Virement bancaire**.
- **Édition de la Quittance Officielle de Paiement** imprimable et téléchargeable avec cachet officiel de l'école.

### 5. 👨‍🏫 Espace Professeur (Portail Enseignant)
- Sélecteur de professeur avec profil et instrument.
- Liste filtrée de ses élèves attitrés.
- **Grille de notation mensuelle (/20)** : Solfège & Lecture, Technique instrumentale, Musicalité & Nuances, Assiduité & Travail personnel, avec calcul automatique de la moyenne générale.
- **Appréciation globale** visible par l'élève et la direction.
- **Assignation des exercices et devoirs** pour la semaine suivante.
- Ajout de nouvelles pièces au carnet de travail de l'élève.

### 6. 🎓 Espace Étudiant (Portail Apprenant)
- Accueil personnalisé avec instrument, professeur référent, et rappel de la prochaine séance.
- **Mes Pièces en Cours** : accès direct à la partition et aux consignes du prof.
- **Mes Devoirs** : liste des exercices hebdomadaires avec case à cocher « Marquer comme fait ».
- **Mon Assiduité** : historique visuel de toutes les séances du mois avec statuts.
- **Ma Cotisation** : statut de paiement et bouton pour imprimer le reçu officiel.
- **Mon Bulletin** : notes détaillées et appréciation du professeur.

### 7. 📚 Bibliothèque Pédagogique & Espace de Téléchargement
- Fonds documentaire complet :
  - **Partitions** (Classique, Moderne, Jazz, Musique Andalouse & Orientale).
  - **Méthodes & Livres** (Méthode Rose, Hanon, Matteo Carcassi, Manuel de Luth Arabe...).
  - **Théorie & Solfège** (Dandelot, Technique Vocale, Maqamat).
  - **Audios Play-Along** (Pistes d'accompagnement MP3).
- Moteur de recherche instantané et filtres par catégorie et instrument.
- **Visionneuse plein écran** et bouton de **téléchargement immédiat**.
- Possibilité pour l'administrateur d'ajouter de nouvelles ressources.

### 8. 🛠️ Outils Musicaux Interactifs (Bonus Exclusif)
- **Métronome Interactif Web Audio** : 40 à 220 BPM, tap tempo, signatures 2/4, 3/4, 4/4, 6/8, son réaliste et indicateur visuel de temps.
- **Accordeur & Diapason de Référence** : Générateur de fréquences pures Web Audio (La 440 Hz, presets Violon, Guitare classique, Luth oriental / Oud).

---

## 🚀 Démarrage Rapide

```bash
# Se placer dans le répertoire du projet
cd ilot-musique-alger

# Lancer le serveur de développement local
npm run dev
```

L'application s'ouvre sur `http://localhost:3000` (ou le port affiché).

---

## 🎨 Technologies Utilisées
- **React 18** avec architecture de composants modulaires
- **Vite 6** pour un build ultra-rapide
- **Tailwind CSS 3** avec palette de couleurs sur mesure (*Nocturne Navy, Brass Gold, Parchment*)
- **Lucide React** pour l'iconographie moderne
- **Web Audio API** native pour la synthèse sonore (métronome & accordeur)
- **LocalStorage sync** pour préserver les modifications et permettre une navigation fluide entre les rôles Administrateur, Professeur et Apprenant.
