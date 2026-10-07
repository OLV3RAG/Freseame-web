import React from 'react';
import { Tag, Sparkles, MapPin, MessageCircle, ArrowRight, Clock } from 'lucide-react';
import { WHATSAPP_PHONE, STORE_LOCATION } from '../data/freseameData';

export const PromoBentoSection: React.FC = () => {
  const promoWhatsAppMessage =
    '¡Hola Freséame! 🍓 Quiero aprovechar la promoción de Jueves 2x1/2 (el segundo a mitad de precio) en Patio Clavería. ¿Me comparten los detalles para mi visita?';
  const promoWhatsAppUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(promoWhatsAppMessage)}`;

  return (
    <section
      id="promo-jueves-claveria"
      aria-labelledby="promo-heading"
      className="w-full py-4 sm:py-6 px-3 sm:px-6 lg:px-8 scroll-mt-28"
    >
      <div className="max-w-5xl mx-auto">
        {/* Bento Promotion Card - Apple Minimalist Aesthetic */}
        <div className="relative overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-[#C6A052]/30 hover:border-[#C6A052]/60 transition-all duration-300 shadow-2xl p-6 sm:p-8 md:p-10 group">
          
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#C6A052]/10 blur-3xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-60" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#071A2B] blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            
            {/* Left Content Column */}
            <div className="space-y-3.5 max-w-2xl">
              
              {/* Badge Superior */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071A2B] border border-[#C6A052]/40 text-[#C6A052] text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-xs">
                  <Tag className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
                  <span>Especial de Jueves</span>
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F7F4EC]/70 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                  <Clock className="w-3 h-3 text-[#C6A052]" />
                  <span>El segundo a mitad de precio</span>
                </span>
              </div>

              {/* Título Claro */}
              <h2
                id="promo-heading"
                className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-[#F7F4EC] tracking-tight leading-tight flex items-center gap-2.5 flex-wrap"
              >
                <span>2x1/2 en Patio Clavería</span>
                <span className="inline-flex items-center gap-1 text-sm sm:text-base font-bold text-[#C6A052] bg-[#071A2B]/80 px-2.5 py-0.5 rounded-xl border border-[#C6A052]/30">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A052]" />
                  <span>-50% en el 2º postre</span>
                </span>
              </h2>

              {/* Microtexto Conciso (Máximo 2 líneas) */}
              <p className="text-xs sm:text-sm md:text-base text-stone-300 font-normal leading-relaxed line-clamp-2">
                Aprovecha todos los jueves nuestra promoción especial directamente en sucursal Patio Clavería o consúltala con un asesor.
              </p>

              {/* Location Reference Meta */}
              <div className="flex items-center gap-2 text-xs text-stone-400 font-medium pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
                <span className="truncate">Patio Clavería • {STORE_LOCATION.shortReference}</span>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
              {/* Botón Redondeado con Microinteracción */}
              <a
                id="btn-promo-whatsapp"
                href={promoWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3.5 rounded-full bg-[#C6A052] hover:bg-[#d8b365] active:bg-[#b59042] text-[#071A2B] font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-[#C6A052]/20 hover:shadow-[#C6A052]/35 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer touch-manipulation select-none"
                aria-label="Aprovechar promoción 2x1/2 en Patio Clavería por WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-[#071A2B] shrink-0" />
                <span className="whitespace-nowrap">Aprovechar promoción en Patio Clavería</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>

              <span className="text-[11px] text-stone-400 text-center lg:text-right font-medium">
                Válido exclusivamente en compras en mostrador los días jueves
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
