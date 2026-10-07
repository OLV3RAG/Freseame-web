import React from 'react';
import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { CalaveritaIcon, CempasuchilIcon, VeladoraIcon } from './DiaDeMuertosDecorations';
import { WHATSAPP_PHONE } from '../data/freseameData';

interface CalaveritaPromoCardProps {
  onCustomize?: () => void;
}

export const CalaveritaPromoCard: React.FC<CalaveritaPromoCardProps> = ({ onCustomize }) => {
  const whatsAppMessage =
    '¡Hola Freséame! 🍓 Leí la Calaverita Fresera y vengo por mi postre antes de que la Muerte me lleve al más allá. ¿Me comparten el menú del día?';
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
        {/* Contenedor Temático Día de Muertos con Gradiente Nocturno y Borde Naranja Cempasúchil */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#170a24] via-[#281138] to-[#170a24] border border-[#FF7518]/70 shadow-[0_0_20px_rgba(255,117,24,0.35)] p-5 sm:p-7 md:p-8 text-center text-[#FFFDF7] group">
          
          {/* Cenefa estilizada de papel picado en el remate superior */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#E91E63] via-[#FF6F00] via-[#7B1FA2] via-[#00BCD4] to-[#FFD54F] opacity-90" />

          {/* Resplandor ambiental de veladora en el fondo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-44 bg-[#FF7518]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            
            {/* Badge de Temporada */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#170a24]/90 border border-[#FF7518]/60 text-[#FFD54F] text-xs font-black uppercase tracking-wider shadow-md backdrop-blur-md">
              <span className="text-sm">💀</span>
              <span>Rima de Temporada</span>
              <span className="text-sm">🌼</span>
            </div>

            {/* Encabezado con Calaveritas y Cempasúchil a los costados */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <div className="hidden sm:flex items-center gap-1.5 opacity-90 transform -rotate-12">
                <CalaveritaIcon size={26} />
                <CempasuchilIcon size={20} className="text-[#FF8F00]" />
              </div>

              <h2
                id="calaverita-title"
                className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-[#FFFDF7] tracking-tight flex items-center justify-center gap-2 drop-shadow-sm"
              >
                <span>¡Calaverita Fresera!</span>
                <span className="inline-block animate-bounce text-2xl sm:text-3xl">🍓</span>
              </h2>

              <div className="hidden sm:flex items-center gap-1.5 opacity-90 transform rotate-12">
                <CempasuchilIcon size={20} className="text-[#FF8F00]" />
                <CalaveritaIcon size={26} />
              </div>
            </div>

            {/* Rima destacada en formato verso / cursiva destacada */}
            <div className="max-w-2xl mx-auto py-2 px-3 sm:px-6 rounded-2xl bg-[#170a24]/60 border border-[#FF7518]/30 backdrop-blur-xs shadow-inner">
              <blockquote className="font-serif italic text-sm sm:text-base md:text-lg leading-relaxed text-[#FFD54F] tracking-wide space-y-1">
                <p className="text-[#FFFDF7]">
                  &ldquo;La Muerte andaba buscando fresas para botanear,
                </p>
                <p className="text-[#FFE082]">
                  vio esta súper promo y se quedó a merendar.
                </p>
                <p className="font-extrabold text-[#FFD54F] text-base sm:text-lg md:text-xl not-italic font-['Outfit'] mt-1 drop-shadow-xs">
                  ¡Aprovecha el antojito antes de que te lleve al más allá!&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Pequeño detalle de veladoras y flores visible en móviles */}
            <div className="flex items-center justify-center gap-3 text-xs text-stone-300 font-medium">
              <VeladoraIcon size={18} className="text-[#FF8F00] animate-pulse" />
              <span>Patio Clavería • Tradición & Sabor Artesanal</span>
              <CempasuchilIcon size={16} className="text-[#FFB300]" />
            </div>

            {/* Botones de Acción con resplandor dorado tipo veladora */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              {/* Botón Principal: ¡Quiero mi Freséame! con enlace fluido al configurador */}
              <button
                type="button"
                id="btn-calaverita-personalizar"
                onClick={handleScrollToBuilder}
                className="w-full sm:w-auto flex-1 min-h-[48px] px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF6F00] via-[#FF8F00] to-[#FFA000] hover:from-[#FF8F00] hover:to-[#FFB300] text-[#0D0914] font-black text-xs sm:text-sm tracking-wide shadow-lg border-2 border-[#FFD54F] candle-glow transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer touch-manipulation flex items-center justify-center gap-2"
                aria-label="Ir a armar mi Freséame"
              >
                <span>¡Quiero mi Freséame!</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Botón Secundario: Pedir por WhatsApp */}
              <a
                id="btn-calaverita-whatsapp"
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 min-h-[48px] px-5 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#1eb855] hover:from-[#20ba59] hover:to-[#199d49] text-white font-black text-xs sm:text-sm tracking-wide shadow-md emerald-glow transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer touch-manipulation flex items-center justify-center gap-2"
                aria-label="Pedir por WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span>Pedir por WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Cenefa estilizada de papel picado en el remate inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFD54F] via-[#00BCD4] via-[#7B1FA2] via-[#FF6F00] to-[#E91E63] opacity-80" />
        </div>
      </div>
    </section>
  );
};
