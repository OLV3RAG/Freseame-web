import React, { useState } from 'react';
import { Clock, ExternalLink, Navigation, MessageCircle } from 'lucide-react';
import { STORE_LOCATION, WHATSAPP_DISPLAY, WHATSAPP_DEFAULT_URL } from '../data/freseameData';
import { CempasuchilIcon, CalaveritaIcon } from './DiaDeMuertosDecorations';

export const CompactInfoSection: React.FC = () => {
  const [rappiError, setRappiError] = useState(false);
  const [uberError, setUberError] = useState(false);

  return (
    <section id="sucursal-info" className="py-8 px-3 sm:px-6 lg:px-8 bg-transparent scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Ficha Sucursal Patio Clavería */}
        <div className="bg-[#1A1228]/95 rounded-3xl border-2 border-[#FF8F00]/30 shadow-xl p-5 sm:p-7 backdrop-blur-md text-[#FFFDF7]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6F00]/20 border border-[#FF8F00]/40 text-[#FFD54F] flex items-center justify-center shrink-0 text-2xl shadow-2xs">
                📍
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-['Outfit'] font-black text-lg sm:text-xl text-[#FFFDF7] leading-tight flex items-center gap-2">
                    <span>Sucursal Patio Clavería</span>
                    <CempasuchilIcon size={16} className="text-[#FF8F00]" />
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                    Abierto hoy
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 font-medium">
                  En medio de la plaza, junto a McCarthy's Irish Pub • Azcapotzalco, CDMX
                </p>

                <div className="flex items-center gap-3 sm:gap-4 text-xs text-stone-300 font-semibold pt-0.5 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FFB300]" />
                    <span>Lunes a Domingo: 11:00 AM – 11:00 PM</span>
                  </span>
                  <a
                    id="compact-whatsapp-link"
                    href={WHATSAPP_DEFAULT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
                    <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                  </a>
                </div>
              </div>
            </div>

            <a
              id="compact-google-maps-btn"
              href={STORE_LOCATION.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF6F00] via-[#FF8F00] to-[#FFA000] hover:from-[#FF8F00] hover:to-[#FFB300] text-[#0D0914] text-xs sm:text-sm font-black transition-all shadow-md candle-glow border border-[#FFD54F] flex items-center justify-center gap-2 shrink-0 active:scale-95 touch-manipulation cursor-pointer self-stretch md:self-auto"
            >
              <Navigation className="w-4 h-4 fill-[#0D0914] shrink-0" />
              <span>Cómo llegar en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Apartado Próximamente en Delivery */}
        <div
          id="delivery-section"
          className="bg-[#1A1228]/95 rounded-3xl border-2 border-[#FF8F00]/30 shadow-xl p-6 sm:p-8 scroll-mt-24 text-[#FFFDF7]"
        >
          {/* Encabezado del Bloque Centrado */}
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <h3 className="font-['Outfit'] font-black text-xl sm:text-2xl text-[#FFD54F] tracking-tight flex items-center justify-center gap-2">
              <CalaveritaIcon size={20} />
              <span>Próximamente en Delivery</span>
              <CempasuchilIcon size={20} className="text-[#FF8F00]" />
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-stone-300 font-normal">
              Muy pronto podrás pedir directo a tu casa a través de tus apps favoritas.
            </p>
          </div>

          {/* Grid de Tarjetas Interactivas de Rappi y Uber Eats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {/* Tarjeta Rappi */}
            <div
              id="delivery-card-rappi"
              className="group bg-[#25173B] rounded-2xl border border-white/10 shadow-md hover:shadow-xl hover:border-[#FF441F]/60 transition-all duration-300 transform hover:-translate-y-1 p-5 sm:p-6 flex flex-col items-center justify-center gap-3 relative cursor-default"
            >
              <div className="h-14 sm:h-16 flex items-center justify-center w-full">
                {!rappiError ? (
                  <img
                    src="./rappi-logo.png"
                    alt="Rappi Delivery Logo"
                    width="160"
                    height="64"
                    loading="lazy"
                    className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                    onError={() => setRappiError(true)}
                  />
                ) : (
                  <span className="font-['Outfit'] font-black text-2xl text-[#FF441F]">
                    Rappi
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 bg-[#FF441F]/20 text-[#FF7043] border border-[#FF441F]/30 text-xs font-semibold px-3 py-1 rounded-full">
                <span>🛵</span>
                <span>Próximamente</span>
              </span>
            </div>

            {/* Tarjeta Uber Eats */}
            <div
              id="delivery-card-ubereats"
              className="group bg-[#25173B] rounded-2xl border border-white/10 shadow-md hover:shadow-xl hover:border-[#06C167]/60 transition-all duration-300 transform hover:-translate-y-1 p-5 sm:p-6 flex flex-col items-center justify-center gap-3 relative cursor-default"
            >
              <div className="h-14 sm:h-16 flex items-center justify-center w-full">
                {!uberError ? (
                  <img
                    src="./ubereats-logo.png"
                    alt="Uber Eats Delivery Logo"
                    width="160"
                    height="64"
                    loading="lazy"
                    className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                    onError={() => setUberError(true)}
                  />
                ) : (
                  <span className="font-['Outfit'] font-black text-2xl text-[#06C167]">
                    Uber Eats
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 bg-[#06C167]/20 text-[#00E676] border border-[#06C167]/30 text-xs font-semibold px-3 py-1 rounded-full">
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
