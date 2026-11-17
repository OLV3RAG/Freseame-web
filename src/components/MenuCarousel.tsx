import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { SparkleFourPoint } from './BrandDecorations';

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

  const AUTOPLAY_INTERVAL = 6000;
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
      className={`relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-10 sm:my-14 focus:outline-none font-['Outfit'] ${className}`}
    >
      {/* Header de la sección */}
      <div className="text-center mb-6 relative">
        <SparkleFourPoint className="hidden sm:block w-5 h-5 text-[#F4B8C7] absolute top-1 left-12" />
        <SparkleFourPoint className="hidden sm:block w-4 h-4 text-[#CDE5DA] absolute top-4 right-14" />

        <span className="text-xs font-semibold text-[#4A2638] uppercase tracking-widest bg-[#CDE5DA] px-4 py-1.5 rounded-full border border-[#4A2638]/15 inline-block">
          Cartelera Digital Oficial
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-['DynaPuff'] text-[#4A2638] mt-3">
          Nuestro Menú en Imágenes
        </h2>
        <p className="text-sm text-[#4A2638]/85 max-w-lg mx-auto mt-1.5 font-normal">
          El crujidito de la oblea, lo cremosito de la casa... ¿Por dónde va tu primera cucharada?
        </p>
      </div>

      {/* Contenedor estilo Sticker en Crema con placa interior Blanca y borde Rosa Fresa */}
      <div className="relative overflow-hidden rounded-3xl bg-[#FFF7EE] border-2 border-[#4A2638] shadow-[0_4px_0_#4A2638] p-3 sm:p-5">
        <div className="absolute top-5 sm:top-7 left-5 sm:left-8 z-20 flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#CDE5DA] border border-[#4A2638]/20 text-[#4A2638]">
            <Sparkles className="w-3.5 h-3.5 text-[#4A2638]" />
            <span className="font-bold">{MENU_SLIDES[currentIndex].title}</span>
            <span className="text-[#4A2638]/40 font-normal">|</span>
            <span className="text-[#4A2638] font-semibold">
              {currentIndex + 1} de {MENU_SLIDES.length}
            </span>
          </div>
        </div>

        <div className="absolute top-5 sm:top-7 right-5 sm:right-8 z-20">
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            aria-label={isAutoPlaying ? 'Pausar rotación' : 'Iniciar rotación'}
            title={isAutoPlaying ? 'Pausar rotación (6s)' : 'Reanudar rotación'}
            className="p-2 rounded-full bg-[#FFF7EE] hover:bg-[#F4B8C7] border-2 border-[#4A2638] text-[#4A2638] transition-all cursor-pointer"
          >
            {isAutoPlaying && !isHovered ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[640px] flex items-center justify-center bg-white border-2 border-[#F4B8C7] rounded-2xl select-none overflow-hidden">
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
                    className="w-full h-full object-contain transition-transform duration-500 rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full max-w-2xl mx-auto rounded-2xl border-2 border-[#F4B8C7] bg-[#FFF7EE] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#F4B8C7] flex items-center justify-center text-[#4A2638] mb-4">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[#B73E5B] font-bold mb-1">
                      Lámina {index + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-['DynaPuff'] text-[#4A2638] mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-[#4A2638]/75 max-w-sm">
                      Visualizando archivo: <code className="text-[#B73E5B] font-mono">{slide.image}</code>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={handlePrev}
          aria-label="Lámina anterior"
          className="absolute left-5 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#FFF7EE] hover:bg-[#F4B8C7] border-2 border-[#4A2638] text-[#4A2638] shadow-[0_2px_0_#4A2638] transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Lámina siguiente"
          className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#FFF7EE] hover:bg-[#F4B8C7] border-2 border-[#4A2638] text-[#4A2638] shadow-[0_2px_0_#4A2638] transition-all duration-200 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7EE] border border-[#4A2638]/25">
            {MENU_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleGoTo(idx)}
                  aria-label={`Ir a ${slide.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                    isActive
                      ? 'w-7 sm:w-8 bg-[#B73E5B]'
                      : 'w-2.5 bg-[#F4B8C7] hover:bg-[#B73E5B]/60'
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
