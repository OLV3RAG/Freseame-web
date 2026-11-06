import React from 'react';
import { MessageCircle, Sparkles, Navigation } from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY, STORE_LOCATION } from '../data/freseameData';

interface CtaBannerProps {
  onStartCustomizing?: () => void;
  onNavigateToLocation?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  onStartCustomizing,
  onNavigateToLocation,
}) => {
  const WHATSAPP_ORDER_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    'Hola Freséame! Me gustaría hacer un pedido.'
  )}`;

  return (
    <section id="cta-antojo-banner" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 text-white p-8 sm:p-12 shadow-xl shadow-rose-600/20">
        
        {/* Soft background glow circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-rose-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-pink-200" />
            <span>Atención Personalizada • Patio Clavería</span>
          </div>

          {/* Title */}
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            ¿Listo para darte un antojo?
          </h2>

          {/* Slogan & Description */}
          <p className="mt-3 text-base sm:text-lg text-rose-100 font-medium max-w-2xl leading-relaxed">
            <span className="font-bold text-white">"El límite lo pones tú"</span>. Fruta 100% fresca seleccionada, 7 recetas de crema artesanal y barra libre con tus toppings favoritos.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto">
            {/* Primary WhatsApp Button with Updated Number */}
            <a
              id="cta-banner-whatsapp-btn"
              href={WHATSAPP_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[50px] px-8 py-3.5 rounded-2xl bg-white text-rose-600 hover:bg-rose-50 font-black text-sm sm:text-base shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-emerald-500 fill-emerald-500 shrink-0" />
              <span>Pedir por WhatsApp ({WHATSAPP_DISPLAY})</span>
            </a>

            {/* Secondary Location Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateToLocation) {
                  onNavigateToLocation();
                  return;
                }
                const el = document.getElementById('sucursal-info');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="min-h-[50px] px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/30 backdrop-blur-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Navigation className="w-4 h-4 shrink-0" />
              <span>Ver Ubicación en Clavería</span>
            </button>
          </div>

          <div className="mt-4 text-xs text-rose-100/90 font-medium">
            Horario: Lunes a Domingo de 11:00 AM a 11:00 PM • Respuesta inmediata por WhatsApp
          </div>

        </div>

      </div>
    </section>
  );
};

export default CtaBanner;
