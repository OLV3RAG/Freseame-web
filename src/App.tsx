import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CremasSection } from './components/CremasSection';
import { Builder } from './components/Builder';
import { MenuSection } from './components/MenuSection';
import { FrappesSection } from './components/FrappesSection';
import { WhyUs } from './components/WhyUs';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BASES, CREMAS, ADEREZOS, TOPPINGS } from './data/freseameData';
import { CustomOrderState, CremaOption } from './types';

export default function App() {
  // Splash Screen Loader state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Splash screen timer (2.3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll while splash screen is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Global interactive builder state initialized with delicious favorites
  const [orderState, setOrderState] = useState<CustomOrderState>({
    size: 'mediano',
    base: BASES[0], // Fresas con crema
    crema: CREMAS[0], // Crema de la Casa (Queso)
    aderezo: ADEREZOS[0], // Nutella
    toppings: [TOPPINGS[0], TOPPINGS[6]], // Kinder Bueno & Oreo
    notes: '',
  });

  const handleSmoothScroll = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCremaAndScroll = (crema: CremaOption) => {
    setOrderState((prev) => ({ ...prev, crema }));
    handleSmoothScroll('constructor');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] text-[#2B1A24] flex flex-col font-sans selection:bg-[#FF4B8B]/20 selection:text-[#FF4B8B]">
      {/* Animated Splash Screen Loader */}
      <SplashScreen isLoading={isLoading} />

      {/* Fixed Sticky Navigation */}
      <Navbar
        onNavigate={handleSmoothScroll}
        selectedToppingsCount={orderState.toppings.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onStartBuilding={() => handleSmoothScroll('constructor')}
          onExploreMenu={() => handleSmoothScroll('menu')}
        />

        {/* 2. Nuestras 7 Cremas de Especialidad & Barra Libre */}
        <CremasSection
          onSelectCrema={handleSelectCremaAndScroll}
          selectedCremaId={orderState.crema?.id}
        />

        {/* 3. Interactive Dessert Simulator & Builder */}
        <Builder
          orderState={orderState}
          setOrderState={setOrderState}
        />

        {/* 4. Categorized Full Menu */}
        <MenuSection />

        {/* 5. Specialized Frappés Bar */}
        <FrappesSection />

        {/* 6. Quality, Hygiene & Testimonials */}
        <WhyUs />

        {/* 7. Ubicación y Horarios Patio Clavería */}
        <LocationSection onOrderPickUp={() => handleSmoothScroll('constructor')} />
      </main>

      {/* 7. Footer & Contact Info */}
      <Footer />

      {/* 8. Floating WhatsApp Support Button */}
      <FloatingWhatsApp toppingsCount={orderState.toppings.length} />
    </div>
  );
}
