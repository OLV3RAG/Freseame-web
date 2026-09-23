import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Builder } from './components/Builder';
import { MenuSection } from './components/MenuSection';
import { FrappesSection } from './components/FrappesSection';
import { WhyUs } from './components/WhyUs';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BASES, CREMAS, ADEREZOS, TOPPINGS } from './data/freseameData';
import { CustomOrderState } from './types';

export default function App() {
  // Global interactive builder state initialized with delicious favorites
  const [orderState, setOrderState] = useState<CustomOrderState>({
    size: 'mediano',
    base: BASES[0], // Fresas con crema
    crema: CREMAS[0], // Crema clásica
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

  return (
    <div className="min-h-screen bg-[#FFF8F2] text-[#2B1A24] flex flex-col font-sans selection:bg-[#FF4B8B]/20 selection:text-[#FF4B8B]">
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

        {/* 2. Interactive Dessert Simulator & Builder */}
        <Builder
          orderState={orderState}
          setOrderState={setOrderState}
        />

        {/* 3. Categorized Full Menu */}
        <MenuSection />

        {/* 4. Specialized Frappés Bar */}
        <FrappesSection />

        {/* 5. Quality, Hygiene & Testimonials */}
        <WhyUs />
      </main>

      {/* 6. Footer & Contact Info */}
      <Footer />

      {/* 7. Floating WhatsApp Support Button */}
      <FloatingWhatsApp toppingsCount={orderState.toppings.length} />
    </div>
  );
}
