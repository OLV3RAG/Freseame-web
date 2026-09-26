import React, { useState } from 'react';
import { Clock, ExternalLink, Navigation } from 'lucide-react';
import { STORE_LOCATION } from '../data/freseameData';

export const CompactInfoSection: React.FC = () => {
  const [rappiError, setRappiError] = useState(false);
  const [uberError, setUberError] = useState(false);

  return (
    <section id="sucursal-info" className="py-8 px-3 sm:px-6 lg:px-8 bg-[#FFF8F2] scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Ficha Sucursal Patio Clavería */}
        <div className="bg-white rounded-3xl border border-[#2B1A24]/10 shadow-xs p-5 sm:p-7">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 text-[#FF4B8B] flex items-center justify-center shrink-0 text-2xl shadow-2xs">
                📍
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-['Outfit'] font-black text-lg sm:text-xl text-[#2B1A24] leading-tight">
                    Sucursal Patio Clavería
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                    Abierto hoy
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  En medio de la plaza, junto a McCarthy's Irish Pub • Azcapotzalco, CDMX
                </p>

                <div className="flex items-center gap-3 text-xs text-stone-500 font-semibold pt-0.5">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Lunes a Domingo: 11:00 AM – 11:00 PM</span>
                  </span>
                </div>
              </div>
            </div>

            <a
              id="compact-google-maps-btn"
              href={STORE_LOCATION.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2.5 rounded-2xl bg-[#FF4B8B] hover:bg-[#e63f7c] text-white text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-2 shrink-0 active:scale-95 touch-manipulation cursor-pointer self-stretch md:self-auto"
            >
              <Navigation className="w-4 h-4 fill-white shrink-0" />
              <span>Cómo llegar en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Apartado Próximamente en Delivery */}
        <div
          id="delivery-section"
          className="bg-white rounded-3xl border border-[#2B1A24]/10 shadow-xs p-6 sm:p-8 scroll-mt-24"
        >
          {/* Encabezado del Bloque Centrado */}
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <h3 className="font-['Outfit'] font-semibold text-xl sm:text-2xl text-[#FF4B8B] tracking-tight flex items-center justify-center gap-2">
              <span>🛵</span>
              <span>Próximamente en Delivery</span>
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-stone-600 font-normal">
              Muy pronto podrás pedir directo a tu casa a través de tus apps favoritas.
            </p>
          </div>

          {/* Grid de Tarjetas Interactivas de Rappi y Uber Eats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {/* Tarjeta Rappi */}
            <div
              id="delivery-card-rappi"
              className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:border-[#FF441F]/40 transition-all duration-300 transform hover:-translate-y-1 p-5 sm:p-6 flex flex-col items-center justify-center gap-3 relative cursor-default"
            >
              <div className="h-14 sm:h-16 flex items-center justify-center w-full">
                {!rappiError ? (
                  <img
                    src="./rappi-logo.png"
                    alt="Rappi"
                    className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={() => setRappiError(true)}
                  />
                ) : (
                  <span className="font-['Outfit'] font-black text-2xl text-[#FF441F]">
                    Rappi
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 bg-[#FF441F]/10 text-[#FF441F] text-xs font-semibold px-3 py-1 rounded-full">
                <span>🛵</span>
                <span>Próximamente</span>
              </span>
            </div>

            {/* Tarjeta Uber Eats */}
            <div
              id="delivery-card-ubereats"
              className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:border-[#06C167]/40 transition-all duration-300 transform hover:-translate-y-1 p-5 sm:p-6 flex flex-col items-center justify-center gap-3 relative cursor-default"
            >
              <div className="h-14 sm:h-16 flex items-center justify-center w-full">
                {!uberError ? (
                  <img
                    src="./ubereats-logo.png"
                    alt="Uber Eats"
                    className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={() => setUberError(true)}
                  />
                ) : (
                  <span className="font-['Outfit'] font-black text-2xl text-[#06C167]">
                    Uber Eats
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 bg-[#06C167]/10 text-[#06C167] text-xs font-semibold px-3 py-1 rounded-full">
                <span>🛵</span>
                <span>Próximamente</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
