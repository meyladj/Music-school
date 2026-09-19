from django.urls import path
from .views import (
    AdmissionCreateView,
    AdmissionListView,
    ContactCreateView,
    ProgramListView,
    FacultyListView,
    TestimonialListView,
    FAQListView,
    AcademyOverviewView
)

urlpatterns = [
    path('overview/', AcademyOverviewView.as_view(), name='academy-overview'),
    path('admissions/', AdmissionCreateView.as_view(), name='admission-create'),
    path('admissions/list/', AdmissionListView.as_view(), name='admission-list'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
    path('programs/', ProgramListView.as_view(), name='program-list'),
    path('faculty/', FacultyListView.as_view(), name='faculty-list'),
    path('testimonials/', TestimonialListView.as_view(), name='testimonial-list'),
    path('faqs/', FAQListView.as_view(), name='faq-list'),
]
