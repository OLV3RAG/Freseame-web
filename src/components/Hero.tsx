import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/freseameData';
import {
  SparkleFourPoint,
  MinimalHeart,
  DoubleArcDecor,
} from './BrandDecorations';

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
      className="relative pt-10 sm:pt-16 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-[#FFF7EE] font-['Outfit']"
    >
      <div className="max-w-5xl mx-auto relative">
        <SparkleFourPoint className="hidden sm:block w-7 h-7 text-[#F4B8C7] absolute top-2 left-6 pointer-events-none" />
        <MinimalHeart className="hidden sm:block w-6 h-6 text-[#F4B8C7] absolute top-12 right-10 pointer-events-none" />
        <SparkleFourPoint className="hidden sm:block w-5 h-5 text-[#CDE5DA] absolute bottom-12 left-12 pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <DoubleArcDecor className="w-28 h-12 text-[#F4B8C7] mb-2" />

        {/* Badge de marca en Menta Suave con borde Ciruela */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CDE5DA] border border-[#4A2638]/20 text-[#4A2638] text-xs sm:text-sm font-semibold tracking-wide mb-5">
          <SparkleFourPoint className="w-3.5 h-3.5 text-[#B73E5B]" />
          <span>Hoy se me antoja algo fresa</span>
          <MinimalHeart className="w-3.5 h-3.5 text-[#4A2638]" />
        </div>

        {/* Titular principal en DynaPuff */}
        <h1 className="font-['DynaPuff'] font-bold text-3xl sm:text-5xl md:text-6xl text-[#4A2638] leading-[1.18] max-w-3xl">
          Fresas con crema{' '}
          <span className="text-[#B73E5B]">
            exactamente como te gustan
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#4A2638]/85 max-w-xl mx-auto leading-relaxed font-normal">
          <strong className="font-bold text-[#4A2638]">Cada vaso se arma a tu gusto. El límite lo pones tú.</strong>{' '}
          Fruta fresca seleccionada, 7 cremas artesanales y tus toppings favoritos preparados al momento.
        </p>

        {/* Botones estilo Sticker con sombra sólida Ciruela */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            id="hero-cta-whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[50px] px-7 py-3 rounded-3xl bg-[#B73E5B] hover:bg-[#9E324C] text-white font-bold text-sm sm:text-base border-2 border-[#4A2638] shadow-[0_4px_0_#4A2638] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#4A2638] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-white shrink-0" />
            <span>Pedir por WhatsApp</span>
          </a>

          <button
            id="hero-btn-how-to-order"
            type="button"
            onClick={handleScrollToHowItWorks}
            className="w-full sm:w-auto min-h-[50px] px-6 py-3 rounded-3xl bg-[#F4B8C7] hover:bg-[#F4B8C7]/90 text-[#4A2638] font-bold text-sm sm:text-base border-2 border-[#4A2638] shadow-[0_4px_0_#4A2638] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#4A2638] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Armar mi Antojo</span>
            <ArrowRight className="w-4 h-4 text-[#4A2638]" />
          </button>
        </div>

        {/* Tarjetas emblema */}
        <div className="mt-11 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center w-full max-w-2xl">
          <div className="rounded-3xl bg-[#F4B8C7]/35 border border-[#4A2638]/15 px-4 py-3.5 flex flex-col items-center">
            <span className="text-xl sm:text-2xl mb-1" aria-hidden="true">🍓</span>
            <span className="text-xs sm:text-sm font-bold text-[#4A2638]">Fruta Fresca</span>
            <span className="text-[11px] text-[#4A2638]/80 font-normal">Lavada y desinfectada</span>
          </div>

          <div className="rounded-3xl bg-[#CDE5DA]/55 border border-[#4A2638]/15 px-4 py-3.5 flex flex-col items-center">
            <span className="text-xl sm:text-2xl mb-1" aria-hidden="true">🥛</span>
            <span className="text-xs sm:text-sm font-bold text-[#4A2638]">7 Cremas Artesanales</span>
            <span className="text-[11px] text-[#4A2638]/80 font-normal">Receta secreta de la casa</span>
          </div>

          <div className="rounded-3xl bg-[#F4B8C7]/35 border border-[#4A2638]/15 px-4 py-3.5 flex flex-col items-center">
            <span className="text-xl sm:text-2xl mb-1" aria-hidden="true">🍫</span>
            <span className="text-xs sm:text-sm font-bold text-[#4A2638]">El crujidito de la oblea</span>
            <span className="text-[11px] text-[#4A2638]/80 font-normal">Clásicos, premium y picositos</span>
          </div>
        </div>
      </div>
    </section>
  );
};
