from django.core.management.base import BaseCommand
from academy.models import AdmissionApplication, AcademyProgram, FacultyMember, Testimonial, FAQ

class Command(BaseCommand):
    help = "Seed database with initial programs, faculty, FAQ, and testimonials for Îlot Musique Alger"

    def handle(self, *args, **kwargs):
        self.stdout.write("Purging and seeding Îlot Musique Academy data...")

        # 1. Programs (Piano, Violon, Guitare, Batterie, Chant + Eveil)
        AcademyProgram.objects.all().delete()
        programs_data = [
            {
                'title': 'Piano (Classique, Jazz & Moderne)',
                'slug': 'piano-classique-jazz',
                'instrument': 'Piano',
                'category': 'Claviers',
                'aca_certification': 'Accrédité American Canadian Academy — Grades 1 à 8 & Diplôme Supérieur',
                'summary': 'Apprentissage pianistique d\'excellence, du déchiffrage aux chefs-d\'œuvre classiques et harmonies jazz.',
                'description': (
                    'Cursus complet pour pianistes de tous niveaux. En cours individuel pour une technique '
                    'digitale rigoureuse et une interprétation fine, ou en cours de groupe pour le déchiffrage '
                    'à quatre mains, l\'harmonie pratique et l\'écoute polyphonique. Préparation officielle aux '
                    'examens certifiés de l\'American Canadian Academy.'
                ),
                'formats_available': 'Cours Individuel & Masterclass en Groupe',
                'syllabus': 'Déchiffrage, Gammes & Arpèges, Bach, Mozart, Chopin, Debussy, Standards Jazz & Improvisation.',
                'recommended_age': 'Dès 6 ans, adolescents et adultes',
                'weekly_hours': '1 ou 2 séances / semaine (45 min à 1h30)',
                'monthly_fee': '6 500 DA (1 séance/sem) — 10 000 DA (2 séances/sem)',
                'icon_name': 'Piano',
                'badge': 'Cursus Phare ACA',
                'order': 1
            },
            {
                'title': 'Violon & Ensembles à Cordes',
                'slug': 'violon-cordes',
                'instrument': 'Violon',
                'category': 'Cordes',
                'aca_certification': 'Accrédité American Canadian Academy — Grades 1 à 8',
                'summary': 'Maîtrise du jeu d\'archet, justesse absolue, sonorité expressive et pratique d\'ensemble.',
                'description': (
                    'Enseignement alliant tradition classique et pédagogie moderne. Les cours individuels '
                    'permettent un réglage postural méticuleux (tenue de l\'archet, justesse, vibrato). Les ateliers '
                    'en groupe favorisent le jeu polyphonique en duos, trios et ensemble à cordes pour préparer les auditions.'
                ),
                'formats_available': 'Cours Individuel & Ateliers d\'Ensemble en Groupe',
                'syllabus': 'Tenue d\'archet, Suzuki & Ševčík, Vivaldi, Bach, Mozart, Musique de chambre.',
                'recommended_age': 'Dès 6 ans et adultes',
                'weekly_hours': '1 ou 2 séances / semaine',
                'monthly_fee': '6 500 DA (1 séance/sem) — 10 000 DA (2 séances/sem)',
                'icon_name': 'Violin',
                'badge': 'Accrédité ACA',
                'order': 2
            },
            {
                'title': 'Guitare (Classique, Acoustique & Électrique)',
                'slug': 'guitare-classique-moderne',
                'instrument': 'Guitare',
                'category': 'Cordes Pincées',
                'aca_certification': 'Accrédité American Canadian Academy — Grades 1 à 8',
                'summary': 'Polyvalence technique et stylistique : de la guitare classique au fingerstyle et solos électriques.',
                'description': (
                    'Filière riche explorant le répertoire classique (Carcassi, Tarrega, Villa-Lobos) et les musiques '
                    'actuelles (Rock, Pop, Blues, Jazz). Formule individuelle pour le travail technique poussé, '
                    'et cours en groupe pour l\'accompagnement rythmique en combo et le jeu en groupe musical.'
                ),
                'formats_available': 'Cours Individuel & Ateliers Guitare en Groupe',
                'syllabus': 'Arpèges, accords barrés, lecture en clé de Sol et tablatures, solos, improvisation pentatonique.',
                'recommended_age': 'Dès 7 ans, ados et adultes',
                'weekly_hours': '1 ou 2 séances / semaine',
                'monthly_fee': '6 500 DA (1 séance/sem) — 10 000 DA (2 séances/sem)',
                'icon_name': 'Guitar',
                'badge': 'Accrédité ACA',
                'order': 3
            },
            {
                'title': 'Batterie & Percussions Rythmiques',
                'slug': 'batterie-percussions',
                'instrument': 'Batterie',
                'category': 'Percussions & Rythme',
                'aca_certification': 'Accrédité American Canadian Academy — Grades 1 à 8 (Drumkit & Percussion)',
                'summary': 'Coordination des 4 membres, groove, tempo métronomique et pulsation scénique.',
                'description': (
                    'La batterie est le cœur battant de la musique. Apprenez l\'indépendance motrice, les rudiments '
                    'de caisse claire (frisés, roulés, paradiddles) et les rythmes incontournables (Rock, Funk, Jazz, Latin). '
                    'Cours individuels sur batterie acoustique professionnelle et sessions en groupe avec d\'autres instrumentistes.'
                ),
                'formats_available': 'Cours Individuel & Ateliers Rythmiques en Groupe',
                'syllabus': 'Rudiments, indépendance 4 membres, lecture rythmique, métronome, grooves funk/rock/jazz, jeu en groupe.',
                'recommended_age': 'Dès 7 ans, ados et adultes',
                'weekly_hours': '1 ou 2 séances / semaine',
                'monthly_fee': '6 500 DA (1 séance/sem) — 10 000 DA (2 séances/sem)',
                'icon_name': 'Drum',
                'badge': 'Nouveau & Très Demandé',
                'order': 4
            },
            {
                'title': 'Chant (Technique Vocale & Voix)',
                'slug': 'chant-technique-vocale',
                'instrument': 'Chant',
                'category': 'Voix',
                'aca_certification': 'Accrédité American Canadian Academy — Grades 1 à 8 (Vocal Arts)',
                'summary': 'Libérez votre voix naturelle : respiration abdominale, justesse, résonance et expressivité scénique.',
                'description': (
                    'Travail approfondi de la voix comme instrument corporel complet. En cours individuel pour développer '
                    'son timbre propre, étendre sa tessiture et éliminer les tensions de gorge. En ateliers de groupe pour la '
                    'polyphonie, l\'harmonie chorale et l\'assurance en public.'
                ),
                'formats_available': 'Coaching Vocal Individuel & Ateliers Chorale / Chœur en Groupe',
                'syllabus': 'Respiration diaphragmatique, soutien du souffle, justesse, résonateurs, interprétation lyrique & pop/soul.',
                'recommended_age': 'Dès 8 ans, ados et adultes',
                'weekly_hours': '1 ou 2 séances / semaine',
                'monthly_fee': '6 500 DA (1 séance/sem) — 10 000 DA (2 séances/sem)',
                'icon_name': 'Mic',
                'badge': 'Accrédité ACA',
                'order': 5
            },
            {
                'title': 'Éveil Musical & Initiation aux Instruments',
                'slug': 'eveil-musical-enfants',
                'instrument': 'Éveil Musical',
                'category': 'Petite Enfance',
                'aca_certification': 'Programme Pré-Académique American Canadian Academy',
                'summary': 'Sensibilisation ludique aux sons, au rythme et découverte des instruments pour les 4 à 7 ans.',
                'description': (
                    'Méthode active inspirée d\'Orff et Kodály adaptée aux normes ACA. Écoute active, chant d\'enfants, '
                    'petites percussions (xylophone, maracas, tambourins) et premier contact avec le piano et le violon.'
                ),
                'formats_available': 'Cours en Petit Groupe (Atelier d\'éveil 5-8 enfants)',
                'syllabus': 'Reconnaissance auditive des timbres, comptines rythmiques, coordination motrice, psychomotricité sonore.',
                'recommended_age': '4 à 7 ans',
                'weekly_hours': '1 séance / semaine (1 heure)',
                'monthly_fee': '5 500 DA / mois',
                'icon_name': 'Sparkles',
                'badge': 'Spécial Enfants',
                'order': 6
            }
        ]
        for p in programs_data:
            AcademyProgram.objects.create(**p)

        # 2. Faculty
        FacultyMember.objects.all().delete()
        faculty_data = [
            {
                'full_name': 'Dr. Karim Benali',
                'title': 'Directeur Pédagogique & Examinateur Agréé ACA',
                'instrument': 'Piano & Direction Musicale',
                'aca_certified': True,
                'bio': 'Pianiste concertiste, diplômé du Conservatoire National Supérieur et formé aux standards d\'évaluation nord-américains de l\'American Canadian Academy.',
                'credentials': 'Doctorat en Musicologie, Prix de Perfectionnement Piano, Formateur Examinateur ACA.',
                'order': 1
            },
            {
                'full_name': 'Amina Hadj-Ali',
                'title': 'Professeure Principale de Violon & Ensembles',
                'instrument': 'Violon & Cordes',
                'aca_certified': True,
                'bio': 'Premier violon et soliste invitée de prestigieux orchestres symphoniques. Elle guide les élèves dans l\'apprentissage minutieux du violon et du répertoire certifié ACA.',
                'credentials': 'Diplôme Supérieur d\'Exécution Musicale, Masterclass ACA Montréal.',
                'order': 2
            },
            {
                'full_name': 'Yacine Mansouri',
                'title': 'Professeur de Guitare & Harmonie Moderne',
                'instrument': 'Guitare',
                'aca_certified': True,
                'bio': 'Spécialiste de la guitare classique et jazz. Il anime avec passion les cours individuels et les ateliers d\'ensemble à Alger.',
                'credentials': 'Diplômé d\'État en Guitare Classique, Certifié ACA Guitar Curriculum.',
                'order': 3
            },
            {
                'full_name': 'Mehdi Zouaoui',
                'title': 'Professeur de Batterie & Percussions',
                'instrument': 'Batterie',
                'aca_certified': True,
                'bio': 'Batteur professionnel de session et pédagogue réputé, expert en rythmique binaire, ternaire, funk et latin jazz.',
                'credentials': 'Diplômé de Conservatoire en Percussions, Certifié ACA Drumkit Syllabus.',
                'order': 4
            },
            {
                'full_name': 'Selma Belkacem',
                'title': 'Coach Vocale & Professeure de Chant',
                'instrument': 'Chant (Technique Vocale)',
                'aca_certified': True,
                'bio': 'Soprano et formatrice de voix lyrique et musiques actuelles, formée aux techniques de résonance et de santé vocale.',
                'credentials': 'Prix de Chant et Art Lyrique, Masterclass ACA Vocal Arts Toronto.',
                'order': 5
            }
        ]
        for f in faculty_data:
            FacultyMember.objects.create(**f)

        # 3. Testimonials
        Testimonial.objects.all().delete()
        testimonials_data = [
            {
                'author': 'Nadia B. (Maman d\'Amine, 11 ans)',
                'role': 'Élève Piano — Obtention du Grade 3 American Canadian Academy',
                'quote': 'Le partenariat officiel d\'Îlot Musique avec l\'American Canadian Academy est une opportunité formidable pour nos enfants à Alger. Mon fils a passé son Grade 3 avec mention d\'honneur et son diplôme a une valeur reconnue à l\'international.',
                'rating': 5,
                'year': '2025'
            },
            {
                'author': 'Sofiane M. (26 ans)',
                'role': 'Élève Batterie — Formule Hybride (Individuel + Groupe)',
                'quote': 'J\'ai commencé la batterie en cours individuel pour asseoir la technique, puis j\'ai intégré les ateliers de groupe le week-end. L\'ambiance est stimulante et le matériel au conservatoire est de premier ordre.',
                'rating': 5,
                'year': '2025/2026'
            },
            {
                'author': 'Meriem L. (19 ans)',
                'role': 'Élève Chant & Technique Vocale — Grade 5 ACA',
                'quote': 'La professeure de chant m\'a aidée à débloquer ma voix sans forcer. La rigueur de l\'American Canadian Academy m\'a permis de constituer un dossier solide pour mes études artistiques au Canada.',
                'rating': 5,
                'year': '2026'
            },
            {
                'author': 'Rachid K.',
                'role': 'Parent d\'élève en Guitare & Éveil musical',
                'quote': 'L\'encadrement pédagogique est exceptionnel. La flexibilité entre cours individuels et cours en groupe permet aux enfants de s\'épanouir sans pression tout en ayant des objectifs clairs.',
                'rating': 5,
                'year': '2025/2026'
            }
        ]
        for t in testimonials_data:
            Testimonial.objects.create(**t)

        # 4. FAQs
        FAQ.objects.all().delete()
        faqs_data = [
            {
                'question': 'Quelle est la valeur du partenariat avec l\'American Canadian Academy (ACA) ?',
                'answer': 'Îlot Musique est le représentant officiel et centre d\'examens agréé de l\'American Canadian Academy en Algérie. Les élèves préparent des cursus standardisés nord-américains (Grades 1 à 8 et diplômes supérieurs) et passent des examens officiels validés par des jurys certifiés. Ces diplômes sont reconnus internationalement et valorisent grandement les dossiers académiques et artistiques.',
                'category': 'aca',
                'order': 1
            },
            {
                'question': 'Quelle est la différence entre les cours individuels et les cours en groupe ?',
                'answer': 'Les cours individuels (tête-à-tête avec l\'enseignant) permettent un travail sur mesure, une correction millimétrée de la posture et une préparation rapide aux examens de grade ACA. Les cours en groupe (4 à 7 élèves) développent l\'écoute collective, le rythme partagé, le plaisir de jouer en ensemble musical (orchestres, duos, chorale) et favorisent la convivialité.',
                'category': 'formats',
                'order': 2
            },
            {
                'question': 'Quels instruments puis-je apprendre à l\'Îlot Musique Alger ?',
                'answer': 'Nous enseignons le Piano (classique, jazz, variété), le Violon (et violoncelle), la Guitare (classique, acoustique, électrique), la Batterie & Percussions, ainsi que le Chant (technique vocale lyrique et musiques actuelles). Nous proposons également l\'Éveil musical pour les plus petits (4 à 7 ans) et le Solfège.',
                'category': 'cursus',
                'order': 3
            },
            {
                'question': 'Faut-il déjà posséder son propre instrument pour commencer ?',
                'answer': 'Au sein de l\'école, tous les instruments sont mis à votre disposition durant vos séances (pianos acoustiques et numériques, batterie complète, microphones de chant, guitares et violons d\'étude). Pour la pratique à domicile, nos professeurs vous conseillent précisément sur le choix de l\'instrument adapté à votre morphologie et budget.',
                'category': 'organisation',
                'order': 4
            },
            {
                'question': 'Quels sont les tarifs et modes de règlement acceptés ?',
                'answer': 'Les cotisations mensuelles débutent à partir de 6 500 DZD pour 1 séance par semaine et 10 000 DZD pour la formule intensive de 2 séances par semaine. Nous facilitons les paiements en Dinars Algériens via BaridiMob, virement CCP, espèces au secrétariat ou virement bancaire.',
                'category': 'tarifs',
                'order': 5
            },
            {
                'question': 'Où se situe l\'école de musique à Alger ?',
                'answer': 'Îlot Musique vous accueille au 12, Rue Didouche Mourad (Alger-Centre) avec une annexe au Val d\'Hydra. Les locaux disposent de salles insonorisées, d\'un auditorium de répétition et d\'une médiathèque de partitions.',
                'category': 'organisation',
                'order': 6
            }
        ]
        for f in faqs_data:
            FAQ.objects.create(**f)

        # 5. Sample Admission Application
        if not AdmissionApplication.objects.exists():
            AdmissionApplication.objects.create(
                matricule="IMA-ACA-2026-001",
                first_name="Lina",
                last_name="Boudiaf",
                email="lina.boudiaf@example.com",
                phone="0550123456",
                commune="Hydra",
                instrument=AdmissionApplication.InstrumentChoices.PIANO,
                lesson_format=AdmissionApplication.FormatChoices.INDIVIDUAL,
                curriculum_type=AdmissionApplication.CurriculumChoices.ACA_CERTIFIED,
                formula=AdmissionApplication.FormulaChoices.TWO_SESSIONS,
                level=AdmissionApplication.LevelChoices.INTERMEDIAIRE,
                age_group=AdmissionApplication.AgeGroupChoices.JUNIOR,
                message="Désire passer le Grade 4 de l'American Canadian Academy cette année.",
                status=AdmissionApplication.StatusChoices.ADMIS
            )
            AdmissionApplication.objects.create(
                matricule="IMA-ACA-2026-002",
                first_name="Rayan",
                last_name="Tebbouche",
                email="rayan.teb@example.com",
                phone="0661987654",
                commune="Didouche Mourad",
                instrument=AdmissionApplication.InstrumentChoices.BATTERIE,
                lesson_format=AdmissionApplication.FormatChoices.GROUP,
                curriculum_type=AdmissionApplication.CurriculumChoices.ACA_CERTIFIED,
                formula=AdmissionApplication.FormulaChoices.ONE_SESSION,
                level=AdmissionApplication.LevelChoices.DEBUTANT,
                age_group=AdmissionApplication.AgeGroupChoices.ADO,
                message="Passionné par le rythme rock/jazz, souhaite intégrer un atelier de batterie en groupe.",
                status=AdmissionApplication.StatusChoices.CONTACTE
            )

        self.stdout.write(self.style.SUCCESS("Successfully seeded Îlot Musique / American Canadian Academy data!"))
