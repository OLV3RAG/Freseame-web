import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBar, CategoryTab } from './components/CategoryBar';
import { Builder } from './components/Builder';
import { CrepasSection } from './components/CrepasSection';
import { WafflesSection } from './components/WafflesSection';
import { CremasSection } from './components/CremasSection';
import { CompactInfoSection } from './components/CompactInfoSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PapelPicado } from './components/DiaDeMuertosDecorations';
import { CalaveritaPromoCard } from './components/CalaveritaPromoCard';
import { BASES, CREMAS, ADEREZOS, TOPPINGS } from './data/freseameData';
import { CustomOrderState, CremaOption } from './types';

export default function App() {
  // Splash Screen Loader state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Active Category Tab (Default: 'fresas')
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('fresas');

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
    setActiveCategory('fresas');
    handleSmoothScroll('constructor');
  };

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-gradient-to-b from-[#0D0914] via-[#150D24] to-[#0A0710] text-[#FFFDF7] flex flex-col font-sans selection:bg-[#FF6F00]/30 selection:text-[#FFB300]">
      {/* Animated Splash Screen Loader */}
      <SplashScreen isLoading={isLoading} />

      {/* Sticky Header with Navigation and WhatsApp */}
      <Navbar
        onNavigateToMenu={() => handleSmoothScroll('category-nav-bar')}
        onNavigateToDelivery={() => handleSmoothScroll('delivery-section')}
        onNavigateToLocation={() => handleSmoothScroll('sucursal-info')}
      />

      {/* Tira superior de Papel Picado Ondulante */}
      <PapelPicado className="-mt-1 shadow-sm" />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* 1. Compact Hero: Short title */}
        <Hero />

        {/* 1.5. Tarjeta Promocional Temática Día de Muertos: Calaverita Fresera */}
        <CalaveritaPromoCard
          onCustomize={() => {
            setActiveCategory('fresas');
            handleSmoothScroll('constructor');
          }}
        />

        {/* 2. Horizontal Category Pills Bar: [ 🍓 Fresas ] [ 🥞 Crepas ] [ 🧇 Waffles ] [ 🥛 Cremas ] */}
        <CategoryBar
          activeTab={activeCategory}
          onSelectTab={(tab) => {
            setActiveCategory(tab);
            handleSmoothScroll('category-nav-bar');
          }}
        />

        {/* 3. Conditional Category Product Card / Customizer */}
        <div
          id="category-content-container"
          key={activeCategory}
          className="transition-all duration-300 ease-in-out animate-in fade-in-50 slide-in-from-bottom-2 fill-mode-both w-full"
        >
          {activeCategory === 'fresas' && (
            <Builder
              orderState={orderState}
              setOrderState={setOrderState}
            />
          )}

          {activeCategory === 'crepas' && (
            <CrepasSection
              onCustomizeWithBase={() => {
                setOrderState((prev) => ({
                  ...prev,
                  base: BASES.find((b) => b.id === 'hot-cakes-3mini') || BASES[0],
                }));
                setActiveCategory('fresas');
                handleSmoothScroll('constructor');
              }}
            />
          )}

          {activeCategory === 'waffles' && (
            <WafflesSection
              onCustomizeWithBase={() => {
                setOrderState((prev) => ({
                  ...prev,
                  base: BASES.find((b) => b.id === 'waffle-1pza') || BASES[0],
                }));
                setActiveCategory('fresas');
                handleSmoothScroll('constructor');
              }}
            />
          )}

          {activeCategory === 'cremas' && (
            <CremasSection
              onSelectCrema={handleSelectCremaAndScroll}
              selectedCremaId={orderState.crema?.id}
            />
          )}
        </div>

        {/* 4. Compact Info Card: Mini Ficha Patio Clavería + Próximamente en Delivery */}
        <CompactInfoSection />
      </main>

      {/* Tira inferior de Papel Picado como cenefa divisora sobre el Footer */}
      <PapelPicado className="mt-8 mb-0" />

      {/* 5. Minimalist Single-Line Footer */}
      <Footer />

      {/* Floating WhatsApp Support Button */}
      <FloatingWhatsApp toppingsCount={orderState.toppings.length} />
    </div>
  );
}

