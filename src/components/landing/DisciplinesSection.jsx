import React, { useRef, useState, useEffect, useCallback } from 'react';

export default function DisciplinesSection({ onSelectCourse }) {
  const disciplines = [
    {
      id: 'piano',
      title: 'Piano',
      subtitle: '',
      image: '/photos/photo_3.png',
      alt: 'Cours de Piano à Îlot Musique Alger'
    },
    {
      id: 'violon',
      title: 'Violon',
      subtitle: '',
      image: '/photos/photo_4.png',
      alt: 'Cours de Violon à Îlot Musique Alger'
    },
    {
      id: 'guitare',
      title: 'Guitare',
      subtitle: '',
      image: '/photos/photo_5.png',
      alt: 'Cours de Guitare à Îlot Musique Alger'
    },
    {
      id: 'batterie',
      title: 'Batterie',
      subtitle: '',
      image: '/photos/photo_6.png',
      alt: 'Cours de Batterie à Îlot Musique Alger'
    },
    {
      id: 'chant',
      title: 'Chant',
      subtitle: '(Technique vocale)',
      image: '/photos/photo_7.png',
      alt: 'Cours de Chant et Technique Vocale à Îlot Musique Alger'
    }
  ];

  // 3 duplicate sets to enable seamless circular infinite scrolling in both directions
  const loopedDisciplines = [...disciplines, ...disciplines, ...disciplines];

  const scrollContainerRef = useRef(null);
  const firstCardRef = useRef(null);
  const sixthCardRef = useRef(null);
  const isInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollStartRef = useRef(0);
  const hasMovedRef = useRef(false);

  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = (disciplineId) => {
    // If the user was dragging to scroll, ignore the click
    if (hasMovedRef.current) return;
    if (onSelectCourse) {
      onSelectCourse(disciplineId, 'instrument');
    }
    const el = document.getElementById('admission');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Measure exact width of 1 full set of 5 cards
  const getSetWidth = useCallback(() => {
    if (firstCardRef.current && sixthCardRef.current) {
      const diff = sixthCardRef.current.offsetLeft - firstCardRef.current.offsetLeft;
      if (diff > 50) return diff;
    }
    return 1300; // Safe fallback
  }, []);

  // RequestAnimationFrame continuous smooth auto-scroll with seamless loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animId;
    let lastTime = performance.now();

    const step = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      // Only auto-scroll when not manually dragging, touching, or hovering
      if (!isInteractingRef.current && !isHovered && container.clientWidth < container.scrollWidth) {
        const setWidth = getSetWidth();
        if (setWidth > 0) {
          // Speed: ~45 pixels per second for a serene, graceful drift
          const speed = (45 * Math.min(delta, 100)) / 1000;
          container.scrollLeft += speed;

          // Seamless infinite wrap: when reaching set 2, reset silently to set 1
          if (container.scrollLeft >= setWidth * 2) {
            container.scrollLeft -= setWidth;
          } else if (container.scrollLeft <= 5) {
            container.scrollLeft += setWidth;
          }
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, [isHovered, getSetWidth]);

  // Pause on interaction and resume after inactivity
  const setInteracting = (interacting) => {
    isInteractingRef.current = interacting;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    if (!interacting) {
      resumeTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false;
      }, 1500);
    }
  };

  // Mouse Drag Handlers (allows manual desktop dragging)
  const handleMouseDown = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartXRef.current = e.pageX;
    dragScrollStartRef.current = container.scrollLeft;
    setInteracting(true);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const diff = e.pageX - dragStartXRef.current;
    if (Math.abs(diff) > 4) {
      hasMovedRef.current = true;
    }
    container.scrollLeft = dragScrollStartRef.current - diff;

    // Handle seamless wrapping during manual drag
    const setWidth = getSetWidth();
    if (setWidth > 0) {
      if (container.scrollLeft >= setWidth * 2) {
        container.scrollLeft -= setWidth;
        dragScrollStartRef.current -= setWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += setWidth;
        dragScrollStartRef.current += setWidth;
      }
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setInteracting(false);
  };

  // Touch Handlers for Mobile & Trackpad
  const handleTouchStart = () => {
    hasMovedRef.current = false;
    setInteracting(true);
  };

  const handleTouchMove = () => {
    hasMovedRef.current = true;
    const container = scrollContainerRef.current;
    const setWidth = getSetWidth();
    if (container && setWidth > 0) {
      if (container.scrollLeft >= setWidth * 2) {
        container.scrollLeft -= setWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += setWidth;
      }
    }
  };

  const handleTouchEnd = () => {
    setInteracting(false);
  };

  const handleWheel = () => {
    setInteracting(true);
    setInteracting(false);
  };

  const renderCard = (item, uniqueKey, isRefFirst = false, isRefSixth = false) => (
    <div
      key={uniqueKey}
      ref={isRefFirst ? firstCardRef : isRefSixth ? sixthCardRef : null}
      onClick={() => handleCardClick(item.id)}
      className="group cursor-pointer flex flex-col items-center select-none flex-shrink-0 w-[210px] sm:w-[230px] md:w-[245px] lg:w-auto"
    >
      {/* Arched Window Card with clean white hover border (no yellow) */}
      <div className="relative w-full aspect-[9/13] rounded-t-[75px] sm:rounded-t-[85px] lg:rounded-t-[95px] rounded-b-2xl overflow-hidden border border-white/20 group-hover:border-white/70 shadow-2xl transition duration-500 bg-[#1A1A1A]">
        <img 
          src={item.image} 
          alt={item.alt}
          draggable="false"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-700 ease-out pointer-events-none" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition duration-300" />
      </div>

      {/* Title under card */}
      <div className="mt-5 text-center space-y-0.5 px-1">
        <h3 className="font-serif text-lg sm:text-xl text-white/95 group-hover:text-white transition duration-200 tracking-wide font-normal whitespace-nowrap">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-xs text-[#9E958C] font-sans font-light tracking-wide whitespace-nowrap">
            {item.subtitle}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section id="nos-cours" className="bg-[#0C0C0C] text-white py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Centered Section Header */}
        <div className="text-center space-y-4 mb-14 sm:mb-20">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] text-white font-normal tracking-tight">
            Nos cours
          </h2>
          {/* Subtle minimal divider */}
          <div className="w-12 h-[1.5px] bg-[#666666] mx-auto"></div>
        </div>

        {/* 1. Large Screen View (lg+): Stationary grid of the 5 cards */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-stretch">
          {disciplines.map((item) => renderCard(item, `desktop-${item.id}`))}
        </div>

        {/* 2. Small Screen & Split-Screen View (<lg): 
            Auto-scrolls smoothly AND allows manual drag/swipe/wheel!
            Chant is followed directly by Piano in an unbroken circular loop. */}
        <div className="block lg:hidden relative w-full overflow-hidden">
          {/* Subtle edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10 pointer-events-none" />

          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              handleMouseUp();
              setIsHovered(false);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className="flex gap-6 overflow-x-auto select-none cursor-grab active:cursor-grabbing py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {loopedDisciplines.map((item, index) => 
              renderCard(
                item, 
                `scroll-${item.id}-${index}`, 
                index === 0, 
                index === 5
              )
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
