import React from 'react';
import { MessageCircle, ArrowRight, Tag, Percent } from 'lucide-react';
import { CalaveritaIcon, CempasuchilIcon, VeladoraIcon } from './DiaDeMuertosDecorations';
import { WHATSAPP_PHONE } from '../data/freseameData';

interface CalaveritaPromoCardProps {
  onCustomize?: () => void;
}

export const CalaveritaPromoCard: React.FC<CalaveritaPromoCardProps> = ({ onCustomize }) => {
  const whatsAppMessage =
    '¡Hola Freséame! 🍓 Quiero aprovechar la PROMO 2x1/2 (el 2do vaso a mitad de precio) en Patio Clavería. ¿Me comparten los detalles para mi pedido?';
  const whatsAppUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsAppMessage)}`;

  const handleScrollToBuilder = () => {
    if (onCustomize) {
      onCustomize();
      return;
    }
    const el = document.getElementById('constructor') || document.getElementById('category-nav-bar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="calaverita-promo-section"
      aria-labelledby="calaverita-title"
      className="w-full py-4 sm:py-6 px-3 sm:px-6 lg:px-8 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Contenedor Temático Día de Muertos con Fondo Místico y Borde Iluminado en Cempasúchil */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#170a24] via-[#2a103c] to-[#170a24] border-2 border-[#FF7518] shadow-[0_0_25px_rgba(255,117,24,0.35)] p-5 sm:p-7 md:p-8 text-center text-[#FFFDF7] group">
          
          {/* Cenefa estilizada de papel picado en el remate superior */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#E91E63] via-[#FF6F00] via-[#7B1FA2] via-[#00BCD4] to-[#FFD54F] opacity-90" />

          {/* Resplandor ambiental de veladora en el fondo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[32rem] h-48 bg-[#FF7518]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            
            {/* 1. Badge Superior Solicitado */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#170a24]/90 border border-[#FF7518]/80 text-[#FFD54F] text-xs font-black uppercase tracking-wider shadow-md backdrop-blur-md">
              <span className="text-sm">💀</span>
              <span>Tradición con Antojo</span>
              <span className="text-sm">🌼</span>
            </div>

            {/* 2. Titular Principal con la Promo en Grande */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <div className="hidden sm:flex items-center gap-1.5 opacity-90 transform -rotate-12">
                <CalaveritaIcon size={28} />
                <CempasuchilIcon size={22} className="text-[#FF8F00]" />
              </div>

              <h2
                id="calaverita-title"
                className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-[#FFFDF7] tracking-tight leading-tight max-w-3xl drop-shadow-sm"
              >
                <span>¡PROMO </span>
                <span className="text-[#FFD54F] underline decoration-[#FF7518] decoration-wavy decoration-2 underline-offset-4">2x1/2</span>
                <span>: El 2do vaso a </span>
                <span className="text-[#FFD54F]">mitad de precio!</span>
              </h2>

              <div className="hidden sm:flex items-center gap-1.5 opacity-90 transform rotate-12">
                <CempasuchilIcon size={22} className="text-[#FF8F00]" />
                <CalaveritaIcon size={28} />
              </div>
            </div>

            {/* 3. Etiqueta / Badge llamativo de Detalle de Promo */}
            <div className="flex items-center justify-center pt-0.5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-gradient-to-r from-[#FF6F00]/25 via-[#E91E63]/25 to-[#FF6F00]/25 border border-[#FFD54F]/70 text-[#FFD54F] shadow-inner text-xs sm:text-sm font-extrabold tracking-wide uppercase">
                <span className="text-base">🍓</span>
                <span>50% DE DESCUENTO EN TU 2DO VASO</span>
                <span className="text-base">🍓</span>
                <span className="hidden md:inline text-[11px] font-normal text-stone-300 normal-case">
                  (Aplica en tamaños Mediano y Grande)
                </span>
              </div>
            </div>

            {/* Subnota en móviles sobre tamaños */}
            <p className="text-[11px] sm:text-xs text-stone-300 md:hidden font-medium -mt-2">
              Aplica en tamaños Mediano y Grande • Patio Clavería
            </p>

            {/* 4. Rima Temática (Calaverita Literaria) */}
            <div className="max-w-2xl mx-auto py-3 px-4 sm:px-6 rounded-2xl bg-[#170a24]/75 border border-[#FF7518]/40 backdrop-blur-xs shadow-inner">
              <blockquote className="font-serif italic text-sm sm:text-base md:text-lg leading-relaxed text-[#FFD54F] tracking-wide space-y-1">
                <p className="text-[#FFFDF7]">
                  &ldquo;La Muerte andaba buscando fresas para botanear,
                </p>
                <p className="text-[#FFE082]">
                  vio el 2do a mitad de precio y se quedó a merendar.
                </p>
                <p className="font-extrabold text-[#FFD54F] text-base sm:text-lg md:text-xl not-italic font-['Outfit'] mt-1 drop-shadow-xs">
                  ¡Aprovecha la promo antes de que te lleve al más allá!&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Pequeño detalle de veladoras y flores visible */}
            <div className="flex items-center justify-center gap-3 text-xs text-stone-300 font-medium">
              <VeladoraIcon size={18} className="text-[#FF8F00] animate-pulse" />
              <span>Sucursal Patio Clavería • Tradición Fresera</span>
              <CempasuchilIcon size={16} className="text-[#FFB300]" />
            </div>

            {/* 5. Botón de Acción Principal y Secundario */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
              {/* Botón Principal Solicitado: Pedir mi 2x1/2 por WhatsApp */}
              <a
                id="btn-calaverita-whatsapp"
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 min-h-[50px] px-6 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] via-[#20ba59] to-[#199d49] hover:from-[#20ba59] hover:to-[#168a40] text-white font-black text-xs sm:text-sm tracking-wide shadow-xl emerald-glow transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer touch-manipulation flex items-center justify-center gap-2 border-2 border-emerald-300/40"
                aria-label="Pedir mi promoción 2x1/2 por WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span>¡Pedir mi 2x1/2 por WhatsApp!</span>
              </a>

              {/* Botón Secundario: Ir a armar mi Freséame en el configurador */}
              <button
                type="button"
                id="btn-calaverita-personalizar"
                onClick={handleScrollToBuilder}
                className="w-full sm:w-auto flex-1 min-h-[50px] px-5 py-3.5 rounded-full bg-gradient-to-r from-[#FF6F00] via-[#FF8F00] to-[#FFA000] hover:from-[#FF8F00] hover:to-[#FFB300] text-[#0D0914] font-black text-xs sm:text-sm tracking-wide shadow-lg border-2 border-[#FFD54F] candle-glow transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer touch-manipulation flex items-center justify-center gap-2"
                aria-label="Armar mi Freséame en el menú interactivo"
              >
                <span>Armar en el Menú</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

          {/* Cenefa estilizada de papel picado en el remate inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFD54F] via-[#00BCD4] via-[#7B1FA2] via-[#FF6F00] to-[#E91E63] opacity-80" />
        </div>
      </div>
    </section>
  );
};
