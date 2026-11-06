import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/freseameData';

interface HeroProps {
  onExploreMenu?: () => void;
  onStartCustomizing?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onStartCustomizing }) => {
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    '¡Hola Freséame! 🍓 Quiero hacer un pedido de fresas con crema. ¿Me pueden compartir el menú disponible?'
  )}`;

  const handleScrollToMenu = () => {
    if (onExploreMenu) {
      onExploreMenu();
      return;
    }
    const el = document.getElementById('cartelera-menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToHowItWorks = () => {
    if (onStartCustomizing) {
      onStartCustomizing();
      return;
    }
    const el = document.getElementById('como-funciona');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-rose-50/20"
    >
      {/* Decorative luminous strawberry pink / mint blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-rose-200/40 via-pink-100/30 to-emerald-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Badge: Ingredientes 100% frescos todos los días */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-rose-200 shadow-xs text-rose-700 text-xs sm:text-sm font-bold tracking-wide mb-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="text-base">🍓</span>
          <span>Ingredientes 100% frescos todos los días</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        </div>

        {/* Headline: Fresas con crema exactamente como te gustan */}
        <h1 className="font-['Outfit'] font-black text-3xl sm:text-5xl md:text-6xl text-gray-900 tracking-tight leading-[1.15] max-w-3xl">
          Fresas con crema{' '}
          <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
            exactamente como te gustan
          </span>
        </h1>

        {/* Subtítulo con el slogan oficial: El límite lo pones tú */}
        <p className="mt-4 text-lg sm:text-xl font-bold text-rose-500 font-['Outfit'] tracking-wide">
          "El límite lo pones tú"
        </p>

        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
          Postres preparados al momento con fruta fresca seleccionada, 7 cremas artesanales
          y una variedad ilimitada de toppings clásicos, premium y picositos.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          {/* Botón Principal: Pedir por WhatsApp */}
          <a
            id="hero-cta-whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm sm:text-base shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white shrink-0" />
            <span>Pedir por WhatsApp</span>
          </a>

          {/* Botón Secundario: Arma tu Vaso / Ver Menú */}
          <button
            id="hero-btn-how-to-order"
            type="button"
            onClick={handleScrollToHowItWorks}
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-white hover:bg-rose-50 text-gray-800 hover:text-rose-600 font-bold text-sm sm:text-base border border-gray-200 hover:border-rose-200 shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>Arma tu Vaso en 3 Pasos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Value Highlights / Proof Points */}
        <div className="mt-10 pt-6 border-t border-rose-100/80 grid grid-cols-3 gap-2 sm:gap-6 text-center w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl mb-1">🍓</span>
            <span className="text-xs sm:text-sm font-bold text-gray-900">Fruta Fresca</span>
            <span className="text-[11px] text-gray-500 hidden sm:block">Lavada y desinfectada</span>
          </div>

          <div className="flex flex-col items-center border-x border-rose-100 px-2">
            <span className="text-xl sm:text-2xl mb-1">🥛</span>
            <span className="text-xs sm:text-sm font-bold text-gray-900">7 Cremas Artesanales</span>
            <span className="text-[11px] text-gray-500 hidden sm:block">Receta secreta de la casa</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl mb-1">🍫</span>
            <span className="text-xs sm:text-sm font-bold text-gray-900">+25 Toppings</span>
            <span className="text-[11px] text-gray-500 hidden sm:block">Clásicos, premium y picositos</span>
          </div>
        </div>

      </div>
    </section>
  );
};
