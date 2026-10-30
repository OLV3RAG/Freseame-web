import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';

interface MenuSlideItem {
  id: number;
  image: string;
  fallbackImage: string;
  title: string;
  alt: string;
}

const MENU_SLIDES: MenuSlideItem[] = [
  {
    id: 1,
    image: '/menu/Freseame1.png',
    fallbackImage: '/menu/Freseame1.jpg',
    title: 'Fresas con crema',
    alt: 'Menú Freséame - Fresas con Crema',
  },
  {
    id: 2,
    image: '/menu/Freseame2.png',
    fallbackImage: '/menu/Freseame2.jpg',
    title: 'Fresas enchiladas y toppings',
    alt: 'Menú Freséame - Fresas Enchiladas y Variedad de Toppings',
  },
  {
    id: 3,
    image: '/menu/Freseame3.png',
    fallbackImage: '/menu/Freseame3.jpg',
    title: 'Waffles y crepas',
    alt: 'Menú Freséame - Más Antojos: Waffles y Crepas',
  },
];

export interface MenuCarouselProps {
  onSelectToCustomize?: () => void;
  className?: string;
}

export const MenuCarousel: React.FC<MenuCarouselProps> = ({
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const AUTOPLAY_INTERVAL = 6000; // 6 segundos
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (isAutoPlaying && !isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % MENU_SLIDES.length);
      }, AUTOPLAY_INTERVAL);
    }
  }, [isAutoPlaying, isHovered]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetTimer]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MENU_SLIDES.length) % MENU_SLIDES.length);
    resetTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MENU_SLIDES.length);
    resetTimer();
  };

  const handleGoTo = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section
      id="cartelera-menu"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-roledescription="carousel"
      aria-label="Cartelera de Menú Freséame"
      className={`relative w-full max-w-5xl mx-auto px-3 sm:px-6 my-6 sm:my-10 focus:outline-none ${className}`}
    >
      {/* Contenedor Principal con bordes redondeados y estilo moderno de franquicia */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#180a26] via-[#10071a] to-[#0a0412] shadow-2xl shadow-black/80">
        
        {/* Barra superior de estatus y badge sutil */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 border border-amber-500/30 text-amber-300 backdrop-blur-md shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="tracking-wide">Menú Freséame</span>
            <span className="text-stone-400 font-normal">|</span>
            <span className="text-white font-medium">
              {currentIndex + 1} / {MENU_SLIDES.length}
            </span>
          </div>
        </div>

        {/* Botón sutil de reproducción / pausa */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            aria-label={isAutoPlaying ? 'Pausar rotación' : 'Iniciar rotación'}
            title={isAutoPlaying ? 'Pausar rotación (6s)' : 'Reanudar rotación'}
            className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-amber-500/40 text-stone-300 hover:text-amber-300 backdrop-blur-md transition-all shadow-md"
          >
            {isAutoPlaying && !isHovered ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Visor de Imágenes con transición suave de opacidad */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[640px] flex items-center justify-center bg-black/50 select-none">
          {MENU_SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            const hasError = imageErrors[index];

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-700 ease-in-out ${
                  isActive
                    ? 'opacity-100 z-10 pointer-events-auto'
                    : 'opacity-0 z-0 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                {!hasError ? (
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={() => {
                      // Intenta primero con la imagen fallback si difiere, de lo contrario marca error
                      const imgElement = document.getElementById(`menu-img-${index}`) as HTMLImageElement | null;
                      if (imgElement && imgElement.src.endsWith('.png') && slide.fallbackImage) {
                        imgElement.src = slide.fallbackImage;
                      } else {
                        handleImageError(index);
                      }
                    }}
                    id={`menu-img-${index}`}
                    className="w-full h-full object-contain rounded-2xl drop-shadow-2xl transition-transform duration-500"
                  />
                ) : (
                  // Respaldo visual elegante y sobrio si la imagen aún no está cargada en disco
                  <div className="w-full h-full max-w-3xl mx-auto rounded-2xl border border-amber-500/20 bg-gradient-to-br from-black/80 via-stone-900/60 to-black/90 flex flex-col items-center justify-center p-6 text-center text-stone-200">
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-lg">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
                      Lámina {index + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-stone-400 max-w-sm">
                      Visualizando archivo: <code className="text-amber-300 font-mono">{slide.image}</code>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Flechas de Navegación (Izquierda y Derecha) con efecto cristal */}
        <button
          onClick={handlePrev}
          aria-label="Lámina anterior"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 hover:border-amber-500/40 text-stone-200 hover:text-amber-300 backdrop-blur-md transition-all duration-200 shadow-xl active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Lámina siguiente"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 hover:border-amber-500/40 text-stone-200 hover:text-amber-300 backdrop-blur-md transition-all duration-200 shadow-xl active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Barra inferior de indicadores (Dots) interactivos con efecto cristal */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-lg">
            {MENU_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleGoTo(idx)}
                  aria-label={`Ir a ${slide.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                    isActive
                      ? 'w-7 sm:w-8 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MenuCarousel;
