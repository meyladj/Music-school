import uuid
from django.db import models

class AdmissionApplication(models.Model):
    class InstrumentChoices(models.TextChoices):
        PIANO = 'piano', 'Piano (Classique, Jazz & Moderne)'
        VIOLON = 'violon', 'Violon & Cordes'
        GUITARE = 'guitare', 'Guitare (Classique, Acoustique, Électrique)'
        BATTERIE = 'batterie', 'Batterie & Percussions'
        CHANT = 'chant', 'Chant & Technique Vocale'
        VIOLONCELLE = 'violoncelle', 'Violoncelle'
        OUD = 'oud', 'Luth Arabe / Oud & Musique Andalouse'
        EVEIL = 'eveil', 'Éveil Musical (4 - 7 ans)'
        SOLFEGE = 'solfege', 'Formation Musicale & Solfège'

    class FormatChoices(models.TextChoices):
        INDIVIDUAL = 'individuel', 'Cours Individuel (Suivi personnalisé sur mesure)'
        GROUP = 'groupe', 'Cours en Groupe (Atelier d\'ensemble & émulation collective)'
        HYBRID = 'hybride', 'Formule Duo / Hybride (Individuel + Atelier collectif)'

    class CurriculumChoices(models.TextChoices):
        ACA_CERTIFIED = 'aca_certified', 'Cursus International American Canadian Academy (Examens & Certifications)'
        LEISURE = 'leisure', 'Cursus Découverte & Pratique Libre'
        CONSERVATOIRE = 'conservatoire', 'Cursus Académique Supérieur & Préparation Concours'

    class FormulaChoices(models.TextChoices):
        ONE_SESSION = '1_seance', 'Formule 1 séance par semaine (6 500 DZD / mois)'
        TWO_SESSIONS = '2_seances', 'Formule 2 séances par semaine (10 000 DZD / mois)'

    class LevelChoices(models.TextChoices):
        DEBUTANT = 'debutant', 'Débutant complet (Jamais pratiqué)'
        INTERMEDIAIRE = 'intermediaire', 'Intermédiaire (1 à 3 ans de pratique)'
        AVANCE = 'avance', 'Avancé (+3 ans de conservatoire / pratique)'

    class AgeGroupChoices(models.TextChoices):
        EVEIL = '4-7', 'Enfant (4 à 7 ans)'
        JUNIOR = '8-14', 'Junior (8 à 14 ans)'
        ADO = '15-18', 'Adolescent (15 à 18 ans)'
        ADULTE = 'adulte', 'Adulte (+18 ans)'

    class StatusChoices(models.TextChoices):
        NOUVEAU = 'nouveau', 'Nouveau dossier'
        CONTACTE = 'contacte', 'Candidat contacté'
        AUDITION = 'audition', 'Audition de niveau programmée'
        ADMIS = 'admis', 'Admis & Inscrit'
        REFUSE = 'refuse', 'Dossier clôturé'

    matricule = models.CharField(
        max_length=32, 
        unique=True, 
        blank=True, 
        editable=False,
        verbose_name="Matricule d'inscription"
    )
    first_name = models.CharField(max_length=100, verbose_name="Prénom")
    last_name = models.CharField(max_length=100, verbose_name="Nom de famille")
    email = models.EmailField(verbose_name="Adresse Email")
    phone = models.CharField(max_length=25, verbose_name="Numéro de téléphone")
    commune = models.CharField(
        max_length=100, 
        default="Alger", 
        verbose_name="Commune de résidence (ex: Hydra, Didouche, Kouba, El Biar...)"
    )
    
    instrument = models.CharField(
        max_length=50, 
        choices=InstrumentChoices.choices, 
        default=InstrumentChoices.PIANO,
        verbose_name="Instrument souhaité"
    )
    lesson_format = models.CharField(
        max_length=30,
        choices=FormatChoices.choices,
        default=FormatChoices.INDIVIDUAL,
        verbose_name="Format des cours (Individuel ou Groupe)"
    )
    curriculum_type = models.CharField(
        max_length=50, 
        choices=CurriculumChoices.choices, 
        default=CurriculumChoices.ACA_CERTIFIED,
        verbose_name="Filière choisie"
    )
    formula = models.CharField(
        max_length=50, 
        choices=FormulaChoices.choices, 
        default=FormulaChoices.TWO_SESSIONS,
        verbose_name="Rythme hebdomadaire"
    )
    level = models.CharField(
        max_length=50, 
        choices=LevelChoices.choices, 
        default=LevelChoices.DEBUTANT,
        verbose_name="Niveau initial"
    )
    age_group = models.CharField(
        max_length=50, 
        choices=AgeGroupChoices.choices, 
        default=AgeGroupChoices.JUNIOR,
        verbose_name="Tranche d'âge"
    )
    
    message = models.TextField(
        blank=True, 
        verbose_name="Remarques, objectifs ou antécédents musicaux"
    )
    status = models.CharField(
        max_length=30, 
        choices=StatusChoices.choices, 
        default=StatusChoices.NOUVEAU,
        verbose_name="Statut du dossier"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de soumission")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Candidature / Pré-inscription"
        verbose_name_plural = "Candidatures / Pré-inscriptions"
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.matricule:
            random_suffix = str(uuid.uuid4().int)[:4]
            self.matricule = f"IMA-ACA-2026-{random_suffix}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.matricule}] {self.first_name} {self.last_name} - {self.get_instrument_display()} ({self.get_lesson_format_display()})"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150, verbose_name="Nom complet")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=30, blank=True, verbose_name="Téléphone")
    subject = models.CharField(max_length=200, verbose_name="Objet")
    message = models.TextField(verbose_name="Message")
    is_read = models.BooleanField(default=False, verbose_name="Traité / Lu")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date d'envoi")

    class Meta:
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject} ({self.created_at.strftime('%d/%m/%Y')})"


class AcademyProgram(models.Model):
    title = models.CharField(max_length=150, verbose_name="Intitulé du programme")
    slug = models.SlugField(max_length=150, unique=True)
    instrument = models.CharField(max_length=100, verbose_name="Discipline")
    category = models.CharField(max_length=80, verbose_name="Catégorie (Claviers, Cordes, Rythme, etc.)")
    aca_certification = models.CharField(
        max_length=200, 
        verbose_name="Certification American Canadian Academy correspondante",
        default="Diplôme Certifié ACA - Grades 1 à 8"
    )
    summary = models.CharField(max_length=300, verbose_name="Résumé accrocheur")
    description = models.TextField(verbose_name="Présentation détaillée")
    formats_available = models.CharField(
        max_length=150,
        default="Cours individuels & Ateliers de groupe disponibles",
        verbose_name="Formats dispensés"
    )
    syllabus = models.TextField(
        blank=True, 
        verbose_name="Contenu pédagogique & pièces au programme"
    )
    recommended_age = models.CharField(max_length=80, default="Dès 6 ans & adultes", verbose_name="Âge conseillé")
    weekly_hours = models.CharField(max_length=80, default="1 à 2 séances / semaine", verbose_name="Volume horaire")
    monthly_fee = models.CharField(max_length=80, default="6 500 DA - 10 000 DA / mois", verbose_name="Tarif indicatif")
    icon_name = models.CharField(max_length=50, default="Music", verbose_name="Nom de l'icône Lucide")
    badge = models.CharField(max_length=80, blank=True, default="Accrédité ACA", verbose_name="Badge visuel")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre d'affichage")

    class Meta:
        verbose_name = "Programme d'enseignement"
        verbose_name_plural = "Programmes d'enseignement"
        ordering = ['order', 'title']

    def __str__(self):
        return f"{self.title} ({self.instrument})"


class FacultyMember(models.Model):
    full_name = models.CharField(max_length=120, verbose_name="Nom et Prénom")
    title = models.CharField(max_length=120, verbose_name="Titre / Fonction académique")
    instrument = models.CharField(max_length=100, verbose_name="Spécialité instrumentale")
    aca_certified = models.BooleanField(
        default=True, 
        verbose_name="Certifié Examinateur American Canadian Academy"
    )
    bio = models.TextField(verbose_name="Biographie et parcours")
    credentials = models.CharField(
        max_length=250, 
        verbose_name="Diplômes & Distinctions"
    )
    photo_url = models.CharField(
        max_length=300, 
        blank=True, 
        verbose_name="Lien ou chemin photo"
    )
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre")

    class Meta:
        verbose_name = "Professeur / Membre du jury"
        verbose_name_plural = "Corps professoral & Jury"
        ordering = ['order', 'full_name']

    def __str__(self):
        return f"{self.full_name} - {self.instrument}"


class Testimonial(models.Model):
    author = models.CharField(max_length=120, verbose_name="Nom de l'apprenant ou parent")
    role = models.CharField(max_length=150, verbose_name="Cursus / Grade ACA obtenu")
    quote = models.TextField(verbose_name="Témoignage")
    rating = models.PositiveSmallIntegerField(default=5, verbose_name="Note sur 5")
    year = models.CharField(max_length=30, default="2025/2026", verbose_name="Année académique")

    class Meta:
        verbose_name = "Témoignage"
        verbose_name_plural = "Témoignages"

    def __str__(self):
        return f"{self.author} ({self.role})"


class FAQ(models.Model):
    question = models.CharField(max_length=300, verbose_name="Question")
    answer = models.TextField(verbose_name="Réponse détaillée")
    category = models.CharField(
        max_length=80, 
        default="aca", 
        verbose_name="Catégorie (aca, cursus, tarifs, formats)"
    )
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre")

    class Meta:
        verbose_name = "Question fréquente (FAQ)"
        verbose_name_plural = "Foire aux questions (FAQ)"
        ordering = ['order', 'id']

    def __str__(self):
        return self.question
