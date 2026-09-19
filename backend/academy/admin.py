from django.contrib import admin
from .models import AdmissionApplication, ContactMessage, AcademyProgram, FacultyMember, Testimonial, FAQ

@admin.register(AdmissionApplication)
class AdmissionApplicationAdmin(admin.ModelAdmin):
    list_display = (
        'matricule',
        'first_name',
        'last_name',
        'instrument',
        'lesson_format',
        'curriculum_type',
        'formula',
        'level',
        'status',
        'created_at'
    )
    list_filter = ('instrument', 'lesson_format', 'curriculum_type', 'formula', 'level', 'status', 'commune')
    search_fields = ('matricule', 'first_name', 'last_name', 'email', 'phone', 'commune')
    readonly_fields = ('matricule', 'created_at', 'updated_at')
    ordering = ('-created_at',)
    list_editable = ('status',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'phone', 'subject', 'message')
    list_editable = ('is_read',)


@admin.register(AcademyProgram)
class AcademyProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'instrument', 'category', 'aca_certification', 'formats_available', 'order')
    list_editable = ('order',)
    prepopulated_fields = {'slug': ('title',)}


@admin.register(FacultyMember)
class FacultyMemberAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'instrument', 'title', 'aca_certified', 'order')
    list_editable = ('aca_certified', 'order')
    search_fields = ('full_name', 'instrument', 'credentials')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author', 'role', 'rating', 'year')
    list_filter = ('rating', 'year')


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'order')
    list_filter = ('category',)
    list_editable = ('order',)
