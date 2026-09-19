import React, { useState } from 'react';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import AcaPartnershipSection from './AcaPartnershipSection';
import DisciplinesSection from './DisciplinesSection';
import LessonFormatsSection from './LessonFormatsSection';
import CtaSection from './CtaSection';
import AdmissionSection from './AdmissionSection';
import LandingFooter from './LandingFooter';

export default function LandingPage({ onOpenPortal, onOpenStudentLogin, onOpenAdminPortal }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCourse = (courseId, category) => {
    setSelectedCourse(courseId);
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1814] font-sans selection:bg-[#E5CEB4] selection:text-[#1C1814]">
      
      {/* 1. Header Navigation */}
      <LandingNavbar 
        onOpenStudentLogin={onOpenStudentLogin}
        onOpenAdminPortal={onOpenAdminPortal}
      />

      <main className="flex-1">
        {/* 2. Hero Section: Full-bleed Penthouse Grand Piano over Algiers Bay */}
        <HeroSection />

        {/* 3. Section: "Une ouverture sur le monde" - Partenariat American Canadian Academy */}
        <AcaPartnershipSection />

        {/* 4. Section: "Nos cours" - 5 Arched Cards (Piano, Violon, Guitare, Batterie, Chant) */}
        <DisciplinesSection onSelectCourse={handleSelectCourse} />

        {/* 5. Section: "Des cours adaptés à chacun" - 2 Wide Cards (Groupe & Individuels) */}
        <LessonFormatsSection onSelectFormat={handleSelectCourse} />

        {/* 6. Section: "Rejoignez l'aventure" CTA Banner */}
        <CtaSection />

        {/* 9. Section: Admission / Inscription & Contact (connected to Django backend) */}
        <AdmissionSection 
          preselectedCourse={selectedCourse}
          preselectedCategory={selectedCategory}
        />
      </main>

      {/* 10. Footer with Diamond Emblem, Navigation, Socials, Quote & Algiers Location */}
      <LandingFooter 
        onOpenPortal={onOpenPortal}
        onOpenAdminPortal={onOpenAdminPortal}
      />

    </div>
  );
}
