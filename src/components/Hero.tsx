import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart, Star, ShieldCheck, Flame, Award } from 'lucide-react';
import logoImg from '../logo.jpg';

interface HeroProps {
  onStartBuilding: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBuilding, onExploreMenu }) => {
  const [mascotError, setMascotError] = useState(false);
  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FFF8F2] via-[#FFF1E8]/60 to-[#FFF8F2]"
    >
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#FF4B8B]/12 via-[#48C9B0]/10 to-amber-200/20 blur-3xl pointer-events-none rounded-full -z-10" />
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FF4B8B]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 -left-16 w-56 h-56 bg-[#48C9B0]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, badges and CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#FF4B8B]/25 shadow-xs mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4B8B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4B8B]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF4B8B]">
                Barra de Postres Artesanales
              </span>
              <span className="text-xs font-semibold text-[#2B1A24]/60">• Abierto hoy</span>
            </div>

            {/* Main Title */}
            <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-[#2B1A24] tracking-tight leading-[1.08] mb-6">
              Freséame: <br className="hidden sm:inline" />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B8B] via-[#E8437D] to-[#48C9B0]">
                El límite lo pones tú
              </span>{' '}
              <span className="inline-block hover:scale-110 transition-transform">🍓</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#2B1A24]/80 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              Personaliza tu postre favorito: fresas frescas, waffles y hot cakes con cremas artesanales, aderezos y tus toppings favoritos.
            </p>

            {/* Visual Badges Required by Prompt */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-9">
              <div
                id="badge-100-fresco"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 border border-[#2B1A24]/10 shadow-xs hover:border-[#FF4B8B]/40 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center text-xs">
                  🍓
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#2B1A24]">
                  100% Fresco
                </span>
              </div>

              <div
                id="badge-cremas-veganas-proteina"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 border border-[#2B1A24]/10 shadow-xs hover:border-[#48C9B0]/50 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  🌱
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#2B1A24]">
                  Cremas Veganas & Proteína disponibles
                </span>
              </div>

              <div
                id="badge-20-toppings"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 border border-[#2B1A24]/10 shadow-xs hover:border-amber-400 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                  🍫
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#2B1A24]">
                  +27 Toppings a Elegir
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-cta-armar-postre"
                onClick={onStartBuilding}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FF4B8B] hover:bg-[#E8437D] text-white font-extrabold text-base tracking-wide shadow-lg shadow-[#FF4B8B]/25 hover:shadow-xl hover:shadow-[#FF4B8B]/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
                <span>¡Armar mi postre ahora!</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-cta-explorar-menu"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-stone-100 text-[#2B1A24] border border-[#2B1A24]/15 font-bold text-base shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explorar Menú</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-10 pt-6 border-t border-[#2B1A24]/10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-1.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm font-black text-[#2B1A24] ml-1">4.9 / 5.0</span>
              </div>
              <span className="text-xs sm:text-sm text-[#2B1A24]/70 font-medium">
                Amado por más de <strong>1,800 amantes del dulce</strong> en la ciudad
              </span>
            </div>
          </div>

          {/* Right Column: Hero Mascot / Ilustración Destacada */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md text-center">
              {/* Background ambient badge */}
              <div className="absolute -top-3 left-2 sm:-left-3 z-20 px-3.5 py-1.5 rounded-2xl bg-[#48C9B0] text-white font-extrabold text-xs shadow-md rotate-[-3deg] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>¡Mascota Oficial Freséame!</span>
              </div>

              {!mascotError ? (
                <div className="relative flex justify-center items-center">
                  <div className="absolute inset-0 bg-pink-300/20 blur-3xl rounded-full scale-90 -z-10"></div>
                  <img 
                    src={logoImg || './logo.jpg'} 
                    alt="Freséame - Mascota Fresa con chamarra rosa y lentes de corazón" 
                    className="w-72 sm:w-88 md:w-96 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300 object-contain mx-auto" 
                    onError={() => setMascotError(true)}
                  />
                </div>
              ) : (
                <div className="w-72 sm:w-88 md:w-96 h-80 rounded-3xl bg-[#FFF0F5] border-2 border-pink-200 shadow-2xl flex flex-col items-center justify-center p-6 text-center mx-auto">
                  <span className="text-6xl mb-3 animate-bounce">🍓</span>
                  <h3 className="font-['Outfit'] font-black text-3xl text-[#2B1A24]">Freséame</h3>
                  <p className="text-xs font-bold text-[#FF4B8B] tracking-wider uppercase mt-1">El límite lo pones tú</p>
                </div>
              )}

              {/* Instant Try / Customize Button below mascot */}
              <div className="mt-6 w-full max-w-sm mx-auto">
                <button
                  id="hero-mascot-customize-btn"
                  onClick={onStartBuilding}
                  className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-stone-50 text-[#2B1A24] font-black text-xs sm:text-sm border border-[#2B1A24]/10 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4 text-[#FF4B8B] group-hover:rotate-12 transition-transform" />
                  <span>¡Armar mi postre personalizado ahora!</span>
                </button>
              </div>

              {/* Floating Guarantee Badge */}
              <div className="mt-4 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 border border-[#2B1A24]/10 shadow-xs">
                <div className="w-7 h-7 rounded-xl bg-[#48C9B0]/20 text-[#48C9B0] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#48C9B0]" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-black text-[#2B1A24] block">Garantía Freséame</span>
                  <span className="text-[10px] text-[#2B1A24]/60">Fruta fresca y desinfectada del día</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
