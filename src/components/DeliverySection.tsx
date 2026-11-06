import React from 'react';
import { Bike } from 'lucide-react';

interface DeliverySectionProps {
  onOrderPickUp?: () => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({ onOrderPickUp }) => {

  return (
    <section
      id="delivery"
      className="py-16 sm:py-20 md:py-24 bg-[#FFF8F2] relative overflow-hidden scroll-mt-20 border-t border-b border-[#2B1A24]/5"
    >
      {/* Subtle decorative background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#FF4B8B]/20 shadow-xs text-xs sm:text-sm font-extrabold text-[#FF4B8B]">
            <Bike className="w-4 h-4 text-[#FF4B8B]" />
            <span>Entrega a Domicilio</span>
          </div>

          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl md:text-5xl text-[#2B1A24] tracking-tight leading-tight">
            🛵 ¿Prefieres disfrutar Freséame en casa?
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-medium leading-relaxed">
            Muy pronto podrás pedir tus combinaciones favoritas directo a tu puerta a través de tus plataformas de entrega preferidas.
          </p>
        </div>


        {/* Tarjetas de Aplicaciones (Grid de 2 columnas centradas) */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
          
          {/* 1. TARJETA RAPPI */}
          <a
            id="delivery-card-rappi"
            href="https://www.rappi.com.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 sm:p-7 rounded-3xl bg-[#FF441F] hover:bg-[#e03a19] text-white shadow-md hover:shadow-lg shadow-orange-500/25 hover:scale-[1.02] transition-transform duration-300 active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer group"
          >
            <div className="w-full h-14 bg-white rounded-2xl flex items-center justify-center p-2 mb-3 shadow-inner">
              <img 
                src="/rappi-logo.png" 
                alt="Rappi" 
                className="max-h-full max-w-[130px] object-contain" 
              />
            </div>
            <span className="font-black text-xs tracking-wider text-white">
              PEDIR EN RAPPI &gt;
            </span>
          </a>

          {/* 2. TARJETA UBER EATS */}
          <a
            id="delivery-card-ubereats"
            href="https://www.ubereats.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 sm:p-7 rounded-3xl bg-black hover:bg-stone-900 text-white border border-stone-800 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer group"
          >
            <div className="w-full h-14 bg-white rounded-2xl flex items-center justify-center p-2 mb-3 shadow-inner">
              <img 
                src="/ubereats-logo.png" 
                alt="Uber Eats" 
                className="max-h-full max-w-[130px] object-contain" 
              />
            </div>
            <span className="font-black text-xs tracking-wider text-[#06C167]">
              PEDIR EN UBER EATS &gt;
            </span>
          </a>

        </div>

        {/* Informative Call-to-action: Pick-up available right now */}
        <div className="max-w-2xl mx-auto mt-10 p-5 rounded-3xl bg-white border border-[#2B1A24]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-pink-50 text-[#FF4B8B] flex items-center justify-center text-xl shrink-0 border border-pink-100">
              🍓
            </div>
            <div>
              <div className="font-['Outfit'] font-black text-sm text-[#2B1A24]">
                ¿Tienes antojo de Freséame hoy mismo?
              </div>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                Pide en línea en modalidad <strong>Pick-Up Express</strong> y recoge tu postre sin filas en Plaza Patio Clavería.
              </p>
            </div>
          </div>

          {onOrderPickUp && (
            <button
              type="button"
              onClick={onOrderPickUp}
              className="px-5 py-2.5 rounded-xl bg-[#FF4B8B] hover:bg-[#e63f7c] text-white text-xs font-black shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
            >
              ¡Armar mi postre ahora!
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
