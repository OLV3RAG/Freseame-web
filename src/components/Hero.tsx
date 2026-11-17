import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/freseameData';

interface HeroProps {
  onExploreMenu?: () => void;
  onStartCustomizing?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCustomizing }) => {
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    '¡Hola Freséame! 🍓 Quiero hacer un pedido de fresas con crema. ¿Me pueden compartir el menú disponible?'
  )}`;

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
      className="relative pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-[#FFF7EE] font-['Outfit']"
    >
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Badge de frescura en Menta Suave con texto Ciruela */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CDE5DA] border border-[#4A2638]/15 text-[#4A2638] text-xs sm:text-sm font-semibold tracking-wide mb-5">
          <span className="text-base" aria-hidden="true">🍓</span>
          <span>¿Qué se te antoja hoy? Ingredientes 100% frescos</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4A2638]" />
        </div>

        {/* Titular principal en DynaPuff */}
        <h1 className="font-['DynaPuff'] font-bold text-3xl sm:text-5xl md:text-6xl text-[#4A2638] leading-[1.18] max-w-3xl">
          Fresas con crema{' '}
          <span className="text-[#B73E5B]">
            exactamente como te gustan
          </span>
        </h1>

        {/* Slogan oficial */}
        <p className="mt-4 text-lg sm:text-xl font-bold text-[#B73E5B] font-['DynaPuff'] tracking-wide">
          “El límite lo pones tú”
        </p>

        <p className="mt-2.5 text-sm sm:text-base text-[#4A2638]/85 max-w-xl mx-auto leading-relaxed font-normal">
          ¿Una cucharadita? Eso dijiste hace tres. Postres preparados al momento con fruta fresca seleccionada, 7 cremas artesanales y tus toppings favoritos.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          {/* CTA Principal en Frambuesa */}
          <a
            id="hero-cta-whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-2xl bg-[#B73E5B] hover:bg-[#9E324C] text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-white shrink-0" />
            <span>Pedir por WhatsApp</span>
          </a>

          {/* Botón Secundario en Rosa Fresa con texto Ciruela */}
          <button
            id="hero-btn-how-to-order"
            type="button"
            onClick={handleScrollToHowItWorks}
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-[#F4B8C7] hover:bg-[#ECA4B6] text-[#4A2638] font-bold text-sm sm:text-base border border-[#4A2638]/15 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>Armar mi Antojo</span>
            <ArrowRight className="w-4 h-4 text-[#4A2638]" />
          </button>
        </div>

        {/* Highlights en Rosa Fresa y Menta Suave */}
        <div className="mt-10 pt-6 border-t border-[#F4B8C7] grid grid-cols-3 gap-2 sm:gap-6 text-center w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl mb-1" aria-hidden="true">🍓</span>
            <span className="text-xs sm:text-sm font-bold text-[#4A2638]">Fruta Fresca</span>
            <span className="text-[11px] text-[#4A2638]/75 hidden sm:block font-normal">Lavada y desinfectada</span>
          </div>

          <div className="flex flex-col items-center border-x border-[#F4B8C7] px-2">
            <span className="text-xl sm:text-2xl mb-1" aria-hidden="true">🥛</span>
            <span className="text-xs sm:text-sm font-bold text-[#4A2638]">7 Cremas Artesanales</span>
            <span className="text-[11px] text-[#4A2638]/75 hidden sm:block font-normal">Receta secreta de la casa</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl mb-1" aria-hidden="true">🍫</span>
            <span className="text-xs sm:text-sm font-bold text-[#4A2638]">+25 Toppings</span>
            <span className="text-[11px] text-[#4A2638]/75 hidden sm:block font-normal">El crujidito de la oblea</span>
          </div>
        </div>
      </div>
    </section>
  );
};
