import React from 'react';
import { Bike } from 'lucide-react';

interface DeliverySectionProps {
  onOrderPickUp?: () => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({ onOrderPickUp }) => {
  return (
    <section
      id="delivery"
      className="py-16 sm:py-20 bg-[#FFF7EE] relative overflow-hidden scroll-mt-20 border-t border-b border-[#F4B8C7]/60 font-['Outfit']"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CDE5DA] border border-[#4A2638]/15 text-xs sm:text-sm font-semibold text-[#4A2638]">
            <Bike className="w-4 h-4 text-[#4A2638]" />
            <span>Entrega a Domicilio</span>
          </div>

          <h2 className="font-['DynaPuff'] font-bold text-3xl sm:text-4xl md:text-5xl text-[#4A2638] leading-tight">
            🛵 ¿Prefieres disfrutar Freséame en casa?
          </h2>

          <p className="text-base sm:text-lg text-[#4A2638]/85 font-normal leading-relaxed">
            Muy pronto podrás pedir tus combinaciones favoritas directo a tu puerta a través de tus plataformas de entrega preferidas.
          </p>
        </div>

        {/* Tarjetas de Aplicaciones */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
          {/* 1. TARJETA RAPPI */}
          <a
            id="delivery-card-rappi"
            href="https://www.rappi.com.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 sm:p-7 rounded-3xl bg-[#FF441F] hover:bg-[#e03a19] text-white hover:scale-[1.02] transition-transform duration-300 active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <div className="w-full h-14 bg-[#FFF7EE] rounded-2xl flex items-center justify-center p-2 mb-3">
              <img
                src="/rappi-logo.png"
                alt="Rappi"
                className="max-h-full max-w-[130px] object-contain"
              />
            </div>
            <span className="font-bold text-xs tracking-wider text-white">
              PEDIR EN RAPPI &gt;
            </span>
          </a>

          {/* 2. TARJETA UBER EATS (Ciruela en lugar de negro puro) */}
          <a
            id="delivery-card-ubereats"
            href="https://www.ubereats.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 sm:p-7 rounded-3xl bg-[#4A2638] hover:bg-[#3B1D2C] text-[#FFF7EE] border border-[#F4B8C7]/35 hover:scale-[1.02] transition-transform duration-300 active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <div className="w-full h-14 bg-[#FFF7EE] rounded-2xl flex items-center justify-center p-2 mb-3">
              <img
                src="/ubereats-logo.png"
                alt="Uber Eats"
                className="max-h-full max-w-[130px] object-contain"
              />
            </div>
            <span className="font-bold text-xs tracking-wider text-[#CDE5DA]">
              PEDIR EN UBER EATS &gt;
            </span>
          </a>
        </div>

        {/* Pick-up CTA */}
        <div className="max-w-2xl mx-auto mt-10 p-5 rounded-3xl bg-[#F4B8C7]/45 border border-[#F4B8C7] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#FFF7EE] text-[#4A2638] flex items-center justify-center text-xl shrink-0 border border-[#F4B8C7]">
              🍓
            </div>
            <div>
              <div className="font-['DynaPuff'] font-bold text-sm text-[#4A2638]">
                ¿Qué se te antoja hoy?
              </div>
              <p className="text-xs text-[#4A2638]/85 font-normal mt-0.5">
                Pide en línea en modalidad <strong className="font-bold text-[#4A2638]">Pick-Up Express</strong> y recoge tu postre sin filas en sucursal.
              </p>
            </div>
          </div>

          {onOrderPickUp && (
            <button
              type="button"
              onClick={onOrderPickUp}
              className="px-5 py-2.5 rounded-xl bg-[#B73E5B] hover:bg-[#9E324C] text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              ¡Armar mi postre ahora!
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
