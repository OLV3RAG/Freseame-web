import React, { useState } from 'react';
import { Clock, ExternalLink, Navigation, MessageCircle, MapPin, ShoppingBag } from 'lucide-react';
import { STORE_LOCATION, WHATSAPP_DISPLAY, WHATSAPP_DEFAULT_URL } from '../data/freseameData';

export const CompactInfoSection: React.FC = () => {
  const [rappiError, setRappiError] = useState(false);
  const [uberError, setUberError] = useState(false);

  return (
    <section id="sucursal-info" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-transparent scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Ficha Sucursal Patio Clavería */}
        <div className="bg-white rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 text-2xl shadow-xs">
                <MapPin className="w-7 h-7 text-rose-600" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-['Outfit'] font-black text-xl sm:text-2xl text-gray-900 leading-tight">
                    Sucursal Patio Clavería
                  </h3>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                    Abierto hoy
                  </span>
                </div>

                <p className="text-sm text-gray-600 font-medium">
                  {STORE_LOCATION.fullAddress}
                </p>
                <p className="text-xs text-rose-600 font-semibold">
                  {STORE_LOCATION.reference}
                </p>

                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-700 font-medium pt-2 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-rose-500" />
                    <span className="font-semibold">Lunes a Domingo:</span> 11:00 AM – 11:00 PM
                  </span>
                  
                  <a
                    id="compact-whatsapp-link"
                    href={WHATSAPP_DEFAULT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Botón de Google Maps */}
            <a
              id="compact-google-maps-btn"
              href={STORE_LOCATION.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm shadow-rose-600/20 flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer self-stretch lg:self-auto"
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
          className="bg-gradient-to-b from-white to-rose-50/40 rounded-3xl border border-rose-100 shadow-lg shadow-rose-950/5 p-6 sm:p-8 scroll-mt-24"
        >
          {/* Encabezado del Bloque Centrado */}
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-100/70 px-3 py-1 rounded-full">
              Entregas a Domicilio
            </span>
            <h3 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-gray-900 tracking-tight mt-2">
              Próximamente en Apps de Delivery
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Muy pronto podrás pedir tus fresas con crema favoritas directamente a tu casa
              u oficina con cobertura local en Azcapotzalco y alrededores.
            </p>
          </div>

          {/* Grid de Tarjetas de Rappi y Uber Eats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {/* Tarjeta Rappi */}
            <div
              id="delivery-card-rappi"
              className="group bg-white rounded-2xl border border-gray-200 hover:border-orange-300 shadow-xs hover:shadow-md transition-all duration-300 p-5 sm:p-6 flex flex-col items-center justify-center gap-3"
            >
              <div className="h-14 sm:h-16 flex items-center justify-center w-full">
                {!rappiError ? (
                  <img
                    src="./rappi-logo.png"
                    alt="Rappi Delivery Logo"
                    width="140"
                    height="56"
                    loading="lazy"
                    className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={() => setRappiError(true)}
                  />
                ) : (
                  <span className="font-['Outfit'] font-black text-2xl text-[#FF441F]">
                    Rappi
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold px-3 py-1 rounded-full">
                <span>🛵</span>
                <span>Próximamente en Rappi</span>
              </span>
            </div>

            {/* Tarjeta Uber Eats */}
            <div
              id="delivery-card-ubereats"
              className="group bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-300 p-5 sm:p-6 flex flex-col items-center justify-center gap-3"
            >
              <div className="h-14 sm:h-16 flex items-center justify-center w-full">
                {!uberError ? (
                  <img
                    src="./ubereats-logo.png"
                    alt="Uber Eats Delivery Logo"
                    width="140"
                    height="56"
                    loading="lazy"
                    className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={() => setUberError(true)}
                  />
                ) : (
                  <span className="font-['Outfit'] font-black text-2xl text-[#06C167]">
                    Uber Eats
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                <span>🛵</span>
                <span>Próximamente en Uber Eats</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
