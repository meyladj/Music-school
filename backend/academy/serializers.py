from rest_framework import serializers
from .models import AdmissionApplication, ContactMessage, AcademyProgram, FacultyMember, Testimonial, FAQ

class AdmissionApplicationSerializer(serializers.ModelSerializer):
    instrument_display = serializers.CharField(source='get_instrument_display', read_only=True)
    lesson_format_display = serializers.CharField(source='get_lesson_format_display', read_only=True)
    curriculum_display = serializers.CharField(source='get_curriculum_type_display', read_only=True)
    formula_display = serializers.CharField(source='get_formula_display', read_only=True)
    level_display = serializers.CharField(source='get_level_display', read_only=True)
    age_group_display = serializers.CharField(source='get_age_group_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = AdmissionApplication
        fields = [
            'id',
            'matricule',
            'first_name',
            'last_name',
            'email',
            'phone',
            'commune',
            'instrument',
            'instrument_display',
            'lesson_format',
            'lesson_format_display',
            'curriculum_type',
            'curriculum_display',
            'formula',
            'formula_display',
            'level',
            'level_display',
            'age_group',
            'age_group_display',
            'message',
            'status',
            'status_display',
            'created_at',
        ]
        read_only_fields = ['id', 'matricule', 'status', 'created_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class AcademyProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademyProgram
        fields = '__all__'


class FacultyMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacultyMember
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'
