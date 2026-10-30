import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Flame,
  Sparkles,
  UtensilsCrossed,
  Info,
  CheckCircle2,
  Tag,
  Star,
  ExternalLink,
} from 'lucide-react';
import {
  DIGITAL_MENU_DATA,
  MENU_SLIDES_LIST,
  DigitalMenuSlide,
} from '../data/digitalMenuData';
import {
  CempasuchilIcon,
  CalaveritaIcon,
  VeladoraIcon,
} from './DiaDeMuertosDecorations';

interface MenuCarouselProps {
  onSelectToCustomize?: () => void;
  className?: string;
}

export const MenuCarousel: React.FC<MenuCarouselProps> = ({
  onSelectToCustomize,
  className = '',
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const SLIDE_DURATION_MS = 7500; // 7.5 segundos por lámina
  const PROGRESS_INTERVAL_MS = 50;

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = MENU_SLIDES_LIST.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Timer loop for auto-play and progress bar
  useEffect(() => {
    if (!isAutoPlaying || isHovered) {
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (PROGRESS_INTERVAL_MS / SLIDE_DURATION_MS) * 100;
      });
    }, PROGRESS_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  // Touch gesture support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diffX = touchStartXRef.current - touchEndXRef.current;
    const threshold = 50; // pixels to count as swipe

    if (diffX > threshold) {
      // Swiped left -> Next
      nextSlide();
    } else if (diffX < -threshold) {
      // Swiped right -> Previous
      prevSlide();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleWhatsAppOrder = (itemSummary: string) => {
    const text = encodeURIComponent(
      `¡Hola Freséame! Vi su cartelera digital de Día de Muertos y quiero pedir: ${itemSummary}. ¿Me apoyan con mi pedido? 🍓💀`
    );
    window.open(`https://wa.me/5215517898795?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="cartelera-menu"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Cartelera Digital Freseame Día de Muertos"
      className={`relative w-full max-w-6xl mx-auto px-3 sm:px-6 my-8 focus:outline-none focus:ring-1 focus:ring-[#FF7518]/50 ${className}`}
    >
      {/* Decorative Aura Glow Behind Carousel */}
      <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-[#FF7518]/20 via-[#E6007E]/20 to-[#9C27B0]/20 rounded-3xl blur-xl opacity-70 pointer-events-none -z-10" />

      {/* Main Container Card */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#FF7518]/40 bg-gradient-to-b from-[#190a29] via-[#210d35] to-[#120721] text-[#FFFDF7] shadow-2xl backdrop-blur-md">
        
        {/* Top Header Bar / Franchise Digital Board Title */}
        <div className="relative border-b border-[#FF7518]/25 bg-black/40 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Seasonal Badge */}
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7518]/20 border border-[#FF7518]/40 text-[#FFD54F] shadow-sm">
              <CempasuchilIcon size={18} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#FFD54F]">
                  Cartelera Digital
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E6007E]/25 text-pink-300 border border-[#E6007E]/40">
                  <CalaveritaIcon size={11} /> Edición Día de Muertos 💀🌼
                </span>
              </div>
              <p className="text-xs text-stone-300 font-medium hidden sm:block">
                Menú Oficial de Temporada Patio Clavería
              </p>
            </div>
          </div>

          {/* Quick Slide Navigation Tabs + Autoplay toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 bg-white/[0.06] p-1 rounded-xl border border-white/10">
              {MENU_SLIDES_LIST.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    currentSlide === idx
                      ? 'bg-gradient-to-r from-[#FF7518] to-[#FF8F00] text-black font-bold shadow-md shadow-[#FF7518]/30'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{idx === 0 ? '🍓' : idx === 1 ? '🍫' : '🧇'}</span>
                  <span>Lámina {idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-label={isAutoPlaying ? 'Pausar rotación automática' : 'Reanudar rotación automática'}
              title={isAutoPlaying ? 'Pausar auto-play' : 'Iniciar auto-play'}
              className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-stone-200 transition-colors"
            >
              {isAutoPlaying && !isHovered ? (
                <Pause className="w-3.5 h-3.5 text-[#FFD54F]" />
              ) : (
                <Play className="w-3.5 h-3.5 text-stone-300" />
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Progress Indicator Bar */}
        <div className="w-full bg-black/50 h-1 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#FF7518] via-[#FFD54F] to-[#E6007E] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Carousel Content Slide Viewport */}
        <div className="relative min-h-[460px] sm:min-h-[500px] p-4 sm:p-7 flex flex-col justify-between">
          {/* Slide 1: Paso a Paso (Base, Crema, Tamaños & Precios) */}
          {currentSlide === 0 && (
            <Slide1BasesCremaPricing
              data={DIGITAL_MENU_DATA.slide1}
              onOrderClick={() => {
                if (onSelectToCustomize) {
                  onSelectToCustomize();
                } else {
                  handleWhatsAppOrder('Vaso Personalizado (Lámina 1)');
                }
              }}
            />
          )}

          {/* Slide 2: Variedad de Toppings (Clásicos, Premium & Enchilados) */}
          {currentSlide === 1 && (
            <Slide2Toppings
              data={DIGITAL_MENU_DATA.slide2}
              onOrderClick={() => handleWhatsAppOrder('Fresas Enchiladas o Selección de Toppings')}
            />
          )}

          {/* Slide 3: Más Antojos (Waffles & Crepas) */}
          {currentSlide === 2 && (
            <Slide3MasAntojos
              data={DIGITAL_MENU_DATA.slide3}
              onOrderClick={(item) => handleWhatsAppOrder(item)}
            />
          )}

          {/* Bottom Bar: Prev / Next Buttons + Slide Dots & Status */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            {/* Status info */}
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF7518] animate-ping" />
              <span className="font-medium text-stone-300">
                Lámina {currentSlide + 1} de {totalSlides}:{' '}
                <strong className="text-[#FFD54F]">
                  {MENU_SLIDES_LIST[currentSlide].title}
                </strong>
              </span>
              {isHovered && (
                <span className="hidden sm:inline-block text-[11px] text-stone-400 italic">
                  (Pausado al pasar el cursor)
                </span>
              )}
            </div>

            {/* Carousel Interactive Controls */}
            <div className="flex items-center gap-3">
              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {MENU_SLIDES_LIST.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Ir a lámina ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? 'w-6 bg-[#FF7518] shadow-[0_0_8px_rgba(255,117,24,0.7)]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  onClick={prevSlide}
                  aria-label="Lámina anterior"
                  className="p-2 rounded-full bg-white/[0.08] hover:bg-[#FF7518] text-white hover:text-black border border-white/15 hover:border-[#FF7518] transition-all shadow-md active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Lámina siguiente"
                  className="p-2 rounded-full bg-white/[0.08] hover:bg-[#FF7518] text-white hover:text-black border border-white/15 hover:border-[#FF7518] transition-all shadow-md active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* LÁMINA 1: ARMA TU FRESEAME (Base, Crema, Tamaños & Precios)                */
/* -------------------------------------------------------------------------- */
interface Slide1Props {
  data: typeof DIGITAL_MENU_DATA.slide1;
  onOrderClick: () => void;
}

const Slide1BasesCremaPricing: React.FC<Slide1Props> = ({ data, onOrderClick }) => {
  return (
    <div className="animate-in fade-in duration-300 space-y-6">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF7518]/20 text-[#FFD54F] border border-[#FF7518]/30 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7518]" />
            Lámina 1: {data.badge}
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            {data.title}
            <span className="text-xl">🍓</span>
          </h3>
          <p className="text-sm text-stone-300 max-w-2xl">{data.subtitle}</p>
        </div>

        <button
          onClick={onOrderClick}
          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#FF7518] to-[#FF8F00] text-black hover:brightness-110 shadow-lg shadow-[#FF7518]/30 transition-transform active:scale-95 flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>¡Armar mi Vaso Ahora!</span>
        </button>
      </div>

      {/* 3 Step Structured Grid from Video */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Paso 1: Elige tu Base */}
        <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.04] border border-[#FF7518]/25 hover:border-[#FF7518]/50 transition-all shadow-inner flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#FF7518] flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-[#FF7518]/20 text-[#FFD54F] flex items-center justify-center font-black text-xs">
                  1
                </span>
                Elige tu Base
              </span>
              <span className="text-lg">🍇</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {data.bases.map((base) => (
                <div
                  key={base.id}
                  className="p-2.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#FF7518]/40 transition-colors"
                >
                  <div className="text-xl mb-1">{base.icon}</div>
                  <div className="text-sm font-bold text-white">{base.name}</div>
                  <div className="text-[11px] text-stone-400 leading-tight">
                    {base.tagline}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-[#FFD54F]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Fruta fresca lavada y desinfectada</span>
          </div>
        </div>

        {/* Paso 2: Elige tu Crema */}
        <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.04] border border-[#FF7518]/25 hover:border-[#FF7518]/50 transition-all shadow-inner flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#FF7518] flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-[#FF7518]/20 text-[#FFD54F] flex items-center justify-center font-black text-xs">
                  2
                </span>
                Elige tu Crema
              </span>
              <span className="text-lg">🥛</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {data.cremas.map((crema) => (
                <div
                  key={crema.id}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                    crema.popular
                      ? 'bg-[#E6007E]/20 border-[#E6007E]/50 text-pink-200'
                      : 'bg-black/40 border-white/10 text-stone-200'
                  }`}
                >
                  <span>{crema.name}</span>
                  {crema.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-[#FF7518] text-black font-extrabold uppercase">
                      {crema.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-[#FFD54F]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recetas artesanales ultra cremosas</span>
          </div>
        </div>

        {/* Paso 3: Elige tu Tamaño y Topping (Precios) */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#2c103e]/70 to-[#190a29] border-2 border-[#FF7518]/60 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#FFD54F] flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-[#FFD54F] text-black flex items-center justify-center font-black text-xs">
                  3
                </span>
                Tamaño y Topping
              </span>
              <Tag className="w-4 h-4 text-[#FF7518]" />
            </div>

            <div className="space-y-3 mt-2">
              {data.pricing.map((tier) => (
                <div
                  key={tier.size}
                  className="p-3 rounded-xl bg-black/50 border border-white/10 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF7518]" />
                      {tier.sizeLabel}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-stone-300">
                      {tier.size === 'Chico' ? 'Individual' : 'Para Compartir'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/5">
                      <div className="text-[10px] text-stone-400">Topping Básico</div>
                      <div className="text-base font-black text-[#FFD54F]">
                        ${tier.basicToppingPrice}{' '}
                        <span className="text-[10px] font-normal text-stone-400">MXN</span>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg bg-[#FF7518]/15 border border-[#FF7518]/30">
                      <div className="text-[10px] text-amber-300 font-semibold">Topping Premium</div>
                      <div className="text-base font-black text-white">
                        ${tier.premiumToppingPrice}{' '}
                        <span className="text-[10px] font-normal text-stone-400">MXN</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 text-center text-[11px] text-stone-300 italic">
            * Elige tu vaso Chico o Grande con tu topping favorito
          </div>
        </div>

      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* LÁMINA 2: VARIEDAD DE TOPPINGS (Clásicos, Premium & Enchilados)            */
/* -------------------------------------------------------------------------- */
interface Slide2Props {
  data: typeof DIGITAL_MENU_DATA.slide2;
  onOrderClick: () => void;
}

const Slide2Toppings: React.FC<Slide2Props> = ({ data, onOrderClick }) => {
  return (
    <div className="animate-in fade-in duration-300 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E6007E]/20 text-pink-300 border border-[#E6007E]/30 mb-1">
            <Star className="w-3.5 h-3.5 text-[#E6007E]" />
            Lámina 2: {data.badge}
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            {data.title}
            <span className="text-xl">🍫</span>
          </h3>
          <p className="text-sm text-stone-300 max-w-2xl">{data.subtitle}</p>
        </div>

        <button
          onClick={onOrderClick}
          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#E6007E] to-[#FF7518] text-white hover:brightness-110 shadow-lg shadow-[#E6007E]/30 transition-transform active:scale-95 flex items-center gap-1.5"
        >
          <Flame className="w-4 h-4 text-amber-200" />
          <span>¡Pedir con estos Toppings!</span>
        </button>
      </div>

      {/* Grid: Clásicos (15) + Premium (7) + Enchilados / Chamoy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Col 1: Toppings Clásicos (15) */}
        <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-stone-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-400" />
                Toppings Clásicos
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/10 text-stone-300">
                15 Opciones
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-[220px] overflow-y-auto pr-1">
              {data.clasicos.map((topping, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-xs rounded-lg bg-black/40 border border-white/10 text-stone-200 hover:border-[#FF7518]/50 hover:text-white transition-all"
                >
                  {topping}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-stone-400 mt-3 pt-3 border-t border-white/5">
            Galletas, chocolates clásicos, nuez, coco rayado y mazapán.
          </p>
        </div>

        {/* Col 2: Toppings Premium (7) */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-[#24133a] to-[#170a25] border-2 border-[#C6A052]/50 hover:border-[#FFD54F] transition-all shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#FFD54F] flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#FFD54F] fill-current" />
                Toppings Premium
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#C6A052]/30 text-[#FFD54F] border border-[#C6A052]/50">
                Lujo & Sabor
              </span>
            </div>

            <div className="space-y-1.5">
              {data.premium.map((topping, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-[#C6A052]/30 flex items-center justify-between text-xs text-white hover:bg-[#C6A052]/10 transition-colors"
                >
                  <span className="font-semibold">{topping}</span>
                  <span className="text-[10px] text-[#FFD54F] font-bold">★ Premium</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-amber-200/80 mt-3 pt-3 border-t border-[#C6A052]/30">
            Marcas selectas: Kit Kat, Conejo Turín y línea especial Hershey's.
          </p>
        </div>

        {/* Col 3: ¿Se te antoja algo picosito? & Fresas Enchiladas */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#2f0e21] via-[#240b2a] to-[#18061f] border-2 border-[#FF7518]/70 hover:border-[#FF7518] transition-all shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#FF7518] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#FF7518] animate-pulse" />
                Línea Enchilada
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FF7518]/25 text-[#FFD54F] border border-[#FF7518]/40">
                🌶️ ¡Picosito!
              </span>
            </div>

            {/* Subtítulo */}
            <h4 className="text-xs font-bold text-amber-300 mb-2">
              {data.enchilados.title}
            </h4>

            {/* Chips de toppings enchilados */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {data.enchilados.items.map((item, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-xs rounded-lg bg-red-950/60 border border-red-500/30 text-rose-200 font-medium hover:border-red-400"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Featured Specialty Card: FRESAS ENCHILADAS */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-red-950/80 to-purple-950/80 border border-red-500/40 shadow-inner">
              <div className="flex items-center gap-2 text-white font-extrabold text-sm">
                <span>🍓🌶️</span>
                <span>{data.enchilados.specialtyName}</span>
              </div>
              <p className="text-xs text-rose-200/90 mt-1">
                "{data.enchilados.specialtyDescription}"
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2 text-[11px] text-stone-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FF7518]" />
            <span>Chamoy líquido casero con el nivel ideal de acidito.</span>
          </div>
        </div>

      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* LÁMINA 3: MÁS ANTOJOS (Waffles & Crepas)                                   */
/* -------------------------------------------------------------------------- */
interface Slide3Props {
  data: typeof DIGITAL_MENU_DATA.slide3;
  onOrderClick: (item: string) => void;
}

const Slide3MasAntojos: React.FC<Slide3Props> = ({ data, onOrderClick }) => {
  return (
    <div className="animate-in fade-in duration-300 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF7518]/20 text-[#FFD54F] border border-[#FF7518]/30 mb-1">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#FF7518]" />
            Lámina 3: {data.badge}
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            {data.title}
            <span className="text-xl">🧇🥞</span>
          </h3>
          <p className="text-sm text-stone-300 max-w-2xl">{data.subtitle}</p>
        </div>

        <div className="text-xs text-stone-300 flex items-center gap-1.5 bg-white/[0.05] px-3 py-1.5 rounded-xl border border-white/10">
          <VeladoraIcon size={14} />
          <span>Preparados calientitos al instante</span>
        </div>
      </div>

      {/* 2 Main Antojos Cards: Waffles & Crepas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {data.items.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#271038] via-[#1d0a2c] to-[#12061f] border-2 border-[#FF7518]/40 hover:border-[#FF7518] transition-all duration-300 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Header inside card */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-[#FF7518]/20 border border-[#FF7518]/40 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="text-2xl font-black text-white">{item.name}</h4>
                    <p className="text-xs text-stone-300">{item.subtitle}</p>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-[#E6007E]/25 text-pink-300 border border-[#E6007E]/40">
                  Calientito
                </span>
              </div>

              {/* Price Tier Showcase */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-black/50 border border-white/10 hover:border-[#FF7518]/40 transition-colors">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 block mb-1">
                    Topping Básico
                  </span>
                  <div className="text-2xl font-black text-[#FFD54F]">
                    ${item.pricing.basicPrice}{' '}
                    <span className="text-xs font-normal text-stone-400">MXN</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FF7518]/15 border border-[#FF7518]/40 hover:border-[#FF7518] transition-colors">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-300 block mb-1">
                    Topping Premium
                  </span>
                  <div className="text-2xl font-black text-white">
                    ${item.pricing.premiumPrice}{' '}
                    <span className="text-xs font-normal text-stone-400">MXN</span>
                  </div>
                </div>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-1.5 text-xs text-stone-300 mb-5">
                {item.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7518] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onOrderClick(`${item.name} ($${item.pricing.basicPrice} / $${item.pricing.premiumPrice})`)}
              className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-[#FF7518] text-white hover:text-black border border-white/15 hover:border-[#FF7518] transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
            >
              <span>Pedir {item.name} por WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MenuCarousel;
