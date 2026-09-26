import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBar, CategoryTab } from './components/CategoryBar';
import { Builder } from './components/Builder';
import { CrepasSection } from './components/CrepasSection';
import { WafflesSection } from './components/WafflesSection';
import { CremasSection } from './components/CremasSection';
import { LocationSection } from './components/LocationSection';
import { DeliverySection } from './components/DeliverySection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
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
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-[#FFF8F2] text-[#2B1A24] flex flex-col font-sans selection:bg-[#FF4B8B]/20 selection:text-[#FF4B8B]">
      {/* Animated Splash Screen Loader */}
      <SplashScreen isLoading={isLoading} />

      {/* Fixed Sticky Navigation */}
      <Navbar
        onNavigate={handleSmoothScroll}
        onSelectCategory={(category) => {
          setActiveCategory(category);
          handleSmoothScroll('category-nav-bar');
        }}
        selectedToppingsCount={orderState.toppings.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Banner */}
        <Hero
          onStartBuilding={() => {
            setActiveCategory('fresas');
            handleSmoothScroll('category-nav-bar');
          }}
          onExploreMenu={() => {
            setActiveCategory('crepas');
            handleSmoothScroll('category-nav-bar');
          }}
        />

        {/* 2. Barra de Categorías Rápida (Píldoras / Chips con scroll horizontal en móvil) */}
        <CategoryBar
          activeTab={activeCategory}
          onSelectTab={(tab) => {
            setActiveCategory(tab);
            handleSmoothScroll('category-nav-bar');
          }}
        />

        {/* 3. Contenido Condicional: Muestra ÚNICAMENTE la categoría activa con transición suave */}
        <div
          id="category-content-container"
          key={activeCategory}
          className="transition-all duration-300 ease-in-out animate-in fade-in-50 slide-in-from-bottom-2 fill-mode-both"
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

        {/* 4. CIERRE DIRECTO */}
        {/* Acceso a Sucursal Patio Clavería (junto a McCarthy's) con botón a Google Maps */}
        <LocationSection
          onOrderPickUp={() => {
            setActiveCategory('fresas');
            handleSmoothScroll('constructor');
          }}
        />

        {/* Tarjetas de Próximamente en Rappi y Uber Eats */}
        <DeliverySection
          onOrderPickUp={() => {
            setActiveCategory('fresas');
            handleSmoothScroll('constructor');
          }}
        />
      </main>

      {/* Footer & Contact Info */}
      <Footer />

      {/* Floating WhatsApp Support Button */}
      <FloatingWhatsApp toppingsCount={orderState.toppings.length} />
    </div>
  );
}
