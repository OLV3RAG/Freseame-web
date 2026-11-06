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
    fallbackImage: '/menu/Freseame1.png',
    title: 'Elige tu Base, Crema y Precios',
    alt: 'Menú Freséame - Elige tu Base, Crema y Precios',
  },
  {
    id: 2,
    image: '/menu/Freseame2.png',
    fallbackImage: '/menu/Freseame2.png',
    title: 'Toppings y Fresas Enchiladas',
    alt: 'Menú Freséame - Toppings y Fresas Enchiladas',
  },
  {
    id: 3,
    image: '/menu/Freseame3.png',
    fallbackImage: '/menu/Freseame3.png',
    title: 'Waffles',
    alt: 'Menú Freséame - Waffles Artesanales',
  },
  {
    id: 4,
    image: '/menu/Freseame4.png',
    fallbackImage: '/menu/Freseame4.png',
    title: 'Crepas',
    alt: 'Menú Freséame - Crepas Dulces',
  },
];

export interface MenuCarouselProps {
  className?: string;
  onSelectToCustomize?: () => void;
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
      aria-label="Menú Digital Freséame"
      className={`relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-10 sm:my-14 focus:outline-none ${className}`}
    >
      {/* Header de la sección de Menú */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          Cartelera Digital Oficial
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-gray-900 mt-2">
          Nuestro Menú en Imágenes
        </h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
          Desliza para conocer nuestras bases, toppings y especialidades recién preparadas.
        </p>
      </div>

      {/* Contenedor blanco con borde sutil border-rose-100 y sombra suave */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-rose-100 shadow-xl shadow-rose-950/5 p-2 sm:p-4">
        
        {/* Barra superior interior con badge y botón de auto-play */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 border border-rose-100 text-rose-700 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span className="font-bold">{MENU_SLIDES[currentIndex].title}</span>
            <span className="text-gray-300 font-normal">|</span>
            <span className="text-gray-500 font-medium">
              {currentIndex + 1} de {MENU_SLIDES.length}
            </span>
          </div>
        </div>

        {/* Botón sutil de reproducción / pausa */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            aria-label={isAutoPlaying ? 'Pausar rotación' : 'Iniciar rotación'}
            title={isAutoPlaying ? 'Pausar rotación (6s)' : 'Reanudar rotación'}
            className="p-2 rounded-full bg-white/90 hover:bg-white border border-rose-100 text-gray-600 hover:text-rose-600 backdrop-blur-md transition-all shadow-xs"
          >
            {isAutoPlaying && !isHovered ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Visor de Imágenes con transición suave de opacidad */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[640px] flex items-center justify-center bg-rose-50/20 rounded-2xl select-none overflow-hidden">
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
                      const imgElement = document.getElementById(`menu-img-${index}`) as HTMLImageElement | null;
                      if (imgElement && imgElement.src.endsWith('.png') && slide.fallbackImage) {
                        imgElement.src = slide.fallbackImage;
                      } else {
                        handleImageError(index);
                      }
                    }}
                    id={`menu-img-${index}`}
                    className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full max-w-2xl mx-auto rounded-2xl border border-rose-100 bg-white flex flex-col items-center justify-center p-6 text-center shadow-xs">
                    <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4 shadow-xs">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-rose-600 font-bold mb-1">
                      Lámina {index + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-gray-500 max-w-sm">
                      Visualizando archivo: <code className="text-rose-600 font-mono">{slide.image}</code>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Flechas de Navegación con efecto cristal e icono lucide-react */}
        <button
          onClick={handlePrev}
          aria-label="Lámina anterior"
          className="absolute left-4 sm:left-7 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-white/90 hover:bg-white border border-rose-100 text-gray-700 hover:text-rose-600 backdrop-blur-md transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Lámina siguiente"
          className="absolute right-4 sm:right-7 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-white/90 hover:bg-white border border-rose-100 text-gray-700 hover:text-rose-600 backdrop-blur-md transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Barra inferior de indicadores (Dots) en tono rose-500 */}
        <div className="absolute bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-rose-100 backdrop-blur-md shadow-md">
            {MENU_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleGoTo(idx)}
                  aria-label={`Ir a ${slide.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                    isActive
                      ? 'w-7 sm:w-8 bg-rose-600 shadow-xs'
                      : 'w-2.5 bg-rose-200 hover:bg-rose-300'
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
