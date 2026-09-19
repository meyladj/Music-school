from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AdmissionApplication, ContactMessage, AcademyProgram, FacultyMember, Testimonial, FAQ
from .serializers import (
    AdmissionApplicationSerializer,
    ContactMessageSerializer,
    AcademyProgramSerializer,
    FacultyMemberSerializer,
    TestimonialSerializer,
    FAQSerializer
)

class AdmissionCreateView(generics.CreateAPIView):
    """
    Endpoint public de pré-inscription / candidature en ligne.
    Génère automatiquement un matricule officiel 'IMA-ACA-2026-XXXX'.
    """
    queryset = AdmissionApplication.objects.all()
    serializer_class = AdmissionApplicationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            'success': True,
            'message': 'Votre demande de pré-inscription a été enregistrée avec succès auprès de l\'Îlot Musique Alger / American Canadian Academy.',
            'admission': serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)


class AdmissionListView(generics.ListAPIView):
    """
    Consultation des candidatures reçues.
    """
    queryset = AdmissionApplication.objects.all()
    serializer_class = AdmissionApplicationSerializer


class ContactCreateView(generics.CreateAPIView):
    """
    Formulaire de contact rapide.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            'success': True,
            'message': 'Votre message a été transmis à la direction pédagogique d\'Îlot Musique.'
        }, status=status.HTTP_201_CREATED)


class ProgramListView(generics.ListAPIView):
    """
    Liste des disciplines & cursus dispensés (Piano, Violon, Guitare, Batterie, Chant...).
    """
    queryset = AcademyProgram.objects.all().order_by('order', 'title')
    serializer_class = AcademyProgramSerializer


class FacultyListView(generics.ListAPIView):
    """
    Membres du corps professoral & jurys certifiés American Canadian Academy.
    """
    queryset = FacultyMember.objects.all().order_by('order')
    serializer_class = FacultyMemberSerializer


class TestimonialListView(generics.ListAPIView):
    """
    Témoignages d'apprenants et parents.
    """
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class FAQListView(generics.ListAPIView):
    """
    Foire aux questions classée par catégorie.
    """
    queryset = FAQ.objects.all().order_by('order')
    serializer_class = FAQSerializer


class AcademyOverviewView(APIView):
    """
    Synthèse officielle de l'établissement Îlot Musique & Partenariat American Canadian Academy.
    """
    def get(self, request):
        return Response({
            'name': 'Îlot Musique Alger',
            'partner': 'American Canadian Academy (ACA)',
            'partner_role': 'Représentant Officiel & Centre d\'Examens Agréé en Algérie',
            'tagline': 'L\'Excellence Musicale à Alger, Certifiée à l\'Échelle Internationale',
            'description': (
                'Conservatoire et école de musique d\'excellence à Alger, Îlot Musique est le partenaire '
                'exclusif de l\'American Canadian Academy en Algérie. Nous proposons des cours individuels '
                'et des cours en groupe pour tous les âges en Piano, Violon, Guitare, Batterie, et Chant '
                '(technique vocale), préparant aux diplômes et grades internationaux nord-américains.'
            ),
            'disciplines': [
                {'name': 'Piano', 'focus': 'Classique, Jazz & Musique Moderne', 'formats': ['Individuel', 'Collectif']},
                {'name': 'Violon', 'focus': 'Technique d\'archet, Justesse & Cordes', 'formats': ['Individuel', 'Collectif']},
                {'name': 'Guitare', 'focus': 'Classique, Acoustique, Électrique & Basse', 'formats': ['Individuel', 'Collectif']},
                {'name': 'Batterie', 'focus': 'Coordination, Rythmique, Groove & Percussions', 'formats': ['Individuel', 'Collectif']},
                {'name': 'Chant', 'focus': 'Technique Vocale, Respiration, Répertoire Lyrique & Actuel', 'formats': ['Individuel', 'Collectif']},
            ],
            'formats': [
                {
                    'id': 'individuel',
                    'title': 'Cours Individuels',
                    'tagline': 'Accompagnement sur mesure',
                    'description': 'Suivi personnalisé en tête-à-tête avec un maître de discipline. Idéal pour une progression technique rapide et la préparation ciblée aux grades ACA.'
                },
                {
                    'id': 'groupe',
                    'title': 'Cours en Groupe & Ateliers d\'Ensemble',
                    'tagline': 'Émulation collective & pratique scénique',
                    'description': 'Apprentissage dynamique en petits effectifs (4 à 7 élèves). Jeu d\'ensemble, écoute polyphonique, formation de groupes et chorale.'
                }
            ],
            'key_stats': {
                'active_students': 450,
                'exam_pass_rate': '100%',
                'aca_grades': 'Grade 1 à Grade 8 + Diplôme Supérieur',
                'years_of_excellence': 15,
                'locations': ['Didouche Mourad (Alger-Centre)', 'Hydra (Alger)']
            },
            'contact': {
                'phone': '+213 (0) 550 12 34 56',
                'email': 'contact@ilot-musique.dz',
                'address': '12, Rue Didouche Mourad / Val d\'Hydra, Alger, Algérie'
            }
        })
