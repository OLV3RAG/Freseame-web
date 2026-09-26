import React, { useState } from 'react';
import { Bike, Clock, ArrowRight, Sparkles, MapPin, CheckCircle2, Info } from 'lucide-react';

// =========================================================================
// ARQUITECTURA PARA ACTIVACIÓN FUTURA DE ENLACES DE DELIVERY:
// Deja estas constantes declaradas. Cuando recibas los enlaces reales
// de las tiendas en Rappi y Uber Eats, simplemente colócalos aquí
// (ej. "https://www.rappi.com.mx/restaurantes/freseame") y los botones
// se activarán automáticamente como enlaces directos a las aplicaciones.
// =========================================================================
export const RAPPI_URL: string = "";
export const UBER_URL: string = "";

interface DeliverySectionProps {
  onOrderPickUp?: () => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({ onOrderPickUp }) => {
  const [rappiImgError, setRappiImgError] = useState(false);
  const [uberImgError, setUberImgError] = useState(false);
  const [clickNotice, setClickNotice] = useState<string | null>(null);

  const handleDisabledClick = (e: React.MouseEvent, appName: string) => {
    e.preventDefault();
    setClickNotice(`¡La tienda oficial de ${appName} estará activa en unos días! Por ahora te esperamos con Pick-Up sin filas en Patio Clavería.`);
    setTimeout(() => {
      setClickNotice(null);
    }, 4500);
  };

  const isRappiActive = Boolean(RAPPI_URL && RAPPI_URL.trim() !== '');
  const isUberActive = Boolean(UBER_URL && UBER_URL.trim() !== '');

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

        {/* Temporary floating click notice */}
        {clickNotice && (
          <div className="max-w-xl mx-auto mb-8 p-4 rounded-2xl bg-stone-900 text-white shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <Info className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-xs sm:text-sm font-medium leading-snug">{clickNotice}</p>
          </div>
        )}

        {/* Tarjetas de Aplicaciones (Grid de 2 columnas centradas) */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* 1. TARJETA RAPPI */}
          <div
            id="delivery-card-rappi"
            className="group rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden"
          >
            {/* Top pill badge */}
            <div className="w-full flex justify-end mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-black tracking-wide uppercase">
                <Clock className="w-3 h-3 text-orange-600" />
                <span>Próximamente</span>
              </span>
            </div>

            {/* Logo Container */}
            <div className="w-full flex flex-col items-center justify-center my-4 min-h-[80px]">
              {!rappiImgError ? (
                <img
                  src="./rappi-logo.png"
                  alt="Rappi Logo"
                  className="h-14 sm:h-16 w-auto max-w-[190px] object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={() => setRappiImgError(true)}
                />
              ) : (
                <div className="h-14 sm:h-16 px-6 py-2 rounded-2xl bg-[#FF441F] text-white flex items-center justify-center font-black text-2xl tracking-tighter shadow-xs">
                  Rappi
                </div>
              )}
            </div>

            {/* App Card Description */}
            <div className="space-y-1.5 my-3">
              <h3 className="font-['Outfit'] font-black text-lg text-[#2B1A24]">
                Freséame en Rappi
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-medium leading-relaxed">
                Pide tus fresas con crema artesanal, waffles y aderezos directo a tu casa con cobertura en Azcapotzalco y zonas cercanas.
              </p>
            </div>

            {/* Action Button / Link */}
            <div className="w-full mt-5 pt-4 border-t border-stone-100">
              {isRappiActive ? (
                <a
                  href={RAPPI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#FF441F] hover:bg-[#E03816] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pedir por Rappi</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href="#"
                  onClick={(e) => handleDisabledClick(e, 'Rappi')}
                  className="w-full py-3.5 px-5 rounded-2xl bg-stone-100 hover:bg-stone-150 text-stone-500 font-bold text-sm border border-stone-200/80 flex items-center justify-center gap-2 cursor-wait transition-all"
                  aria-disabled="true"
                  title="Disponible en unos días"
                >
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span>Disponible en unos días</span>
                </a>
              )}
            </div>
          </div>

          {/* 2. TARJETA UBER EATS */}
          <div
            id="delivery-card-ubereats"
            className="group rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden"
          >
            {/* Top pill badge */}
            <div className="w-full flex justify-end mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black tracking-wide uppercase">
                <Clock className="w-3 h-3 text-emerald-700" />
                <span>Próximamente</span>
              </span>
            </div>

            {/* Logo Container */}
            <div className="w-full flex flex-col items-center justify-center my-4 min-h-[80px]">
              {!uberImgError ? (
                <img
                  src="./ubereats-logo.png"
                  alt="Uber Eats Logo"
                  className="h-14 sm:h-16 w-auto max-w-[190px] object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={() => setUberImgError(true)}
                />
              ) : (
                <div className="h-14 sm:h-16 px-6 py-2 rounded-2xl bg-[#06C167] text-white flex items-center justify-center font-black text-xl tracking-tight shadow-xs">
                  Uber Eats
                </div>
              )}
            </div>

            {/* App Card Description */}
            <div className="space-y-1.5 my-3">
              <h3 className="font-['Outfit'] font-black text-lg text-[#2B1A24]">
                Freséame en Uber Eats
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-medium leading-relaxed">
                Tus creaciones favoritas con seguimiento en tiempo real y promociones exclusivas en la app de Uber Eats.
              </p>
            </div>

            {/* Action Button / Link */}
            <div className="w-full mt-5 pt-4 border-t border-stone-100">
              {isUberActive ? (
                <a
                  href={UBER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#06C167] hover:bg-[#05a557] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pedir por Uber Eats</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href="#"
                  onClick={(e) => handleDisabledClick(e, 'Uber Eats')}
                  className="w-full py-3.5 px-5 rounded-2xl bg-stone-100 hover:bg-stone-150 text-stone-500 font-bold text-sm border border-stone-200/80 flex items-center justify-center gap-2 cursor-wait transition-all"
                  aria-disabled="true"
                  title="Disponible en unos días"
                >
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span>Disponible en unos días</span>
                </a>
              )}
            </div>
          </div>

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
