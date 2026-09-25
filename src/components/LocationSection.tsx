import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  ExternalLink,
  Navigation,
  Car,
  ShoppingBag,
  Sparkles,
  Check,
  Copy,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { STORE_LOCATION } from '../data/freseameData';

interface LocationSectionProps {
  onOrderPickUp: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOrderPickUp }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        `${STORE_LOCATION.plaza}, ${STORE_LOCATION.address}. Referencia: ${STORE_LOCATION.reference}`
      );
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section
      id="ubicacion"
      className="py-16 md:py-24 bg-gradient-to-b from-white via-[#FFF8F2] to-white relative overflow-hidden border-b border-[#2B1A24]/5"
    >
      {/* Anchor alias for #sucursal */}
      <div id="sucursal" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Decorative background glow */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-black uppercase tracking-wider text-[#FF4B8B] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#FF4B8B]" />
            <span>Punto de Encuentro Dulce</span>
          </div>

          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl md:text-5xl text-[#2B1A24] tracking-tight">
            📍 Sucursal Principal: Patio Clavería
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#2B1A24]/75">
            Ven a disfrutar tus fresas con crema artesanal recién preparadas o recoge tu orden sin hacer fila.
          </p>
        </div>

        {/* Main Grid: Info Card + Interactive Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Sucursal Details (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-[#2B1A24]/10 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Top Row: Plaza Badge + Open Daily Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#FFF0F5] text-[#FF4B8B] font-black text-xs sm:text-sm tracking-wide border border-pink-200">
                  🍓 BARRA ARTESANAL MATRIZ
                </span>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200 shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>{STORE_LOCATION.openBadge}</span>
                </div>
              </div>

              {/* Address Highlight */}
              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-stone-400">
                  Dirección Oficial
                </div>
                <h3 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-[#2B1A24] leading-snug">
                  {STORE_LOCATION.name}
                </h3>
                <p className="text-sm sm:text-base text-[#2B1A24]/85 font-medium leading-relaxed">
                  {STORE_LOCATION.address}
                </p>
              </div>

              {/* Crucial Reference Card (McCarthy's) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-200/90 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 text-xl font-bold">
                  📍
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                    Referencia Clave para Llegar
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
                    "{STORE_LOCATION.reference}"
                  </p>
                  <p className="text-[11px] text-amber-800">
                    Estamos en la zona de terrazas y restaurantes, fácil de ubicar en cuanto entras a la plaza.
                  </p>
                </div>
              </div>

              {/* Horarios de Atención */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F2] border border-pink-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#FF4B8B] shadow-2xs border border-pink-200 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
                      Horario de Atención Continuo
                    </span>
                    <span className="font-['Outfit'] font-black text-base sm:text-lg text-[#2B1A24]">
                      {STORE_LOCATION.hours}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hidden sm:inline-block">
                  Lunes a Domingo
                </span>
              </div>

              {/* Value Perks in Sucursal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-150 text-xs font-semibold text-[#2B1A24]">
                  <Car className="w-4 h-4 text-[#48C9B0] shrink-0" />
                  <span>Estacionamiento techado y seguro en la plaza</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-150 text-xs font-semibold text-[#2B1A24]">
                  <Sparkles className="w-4 h-4 text-[#FF4B8B] shrink-0" />
                  <span>Barra libre de toppings al recoger tu orden</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
              {/* Botón Principal: Ver ubicación en Google Maps */}
              <a
                id="btn-google-maps-location"
                href={STORE_LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 px-6 rounded-2xl bg-[#FF4B8B] hover:bg-[#E8437D] text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-center transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Navigation className="w-4 h-4 fill-white" />
                <span>Ver ubicación en Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Botón Secundario: Pedir para Pick-Up aquí */}
              <button
                id="btn-pedir-pickup-here"
                type="button"
                onClick={onOrderPickUp}
                className="flex-1 py-4 px-6 rounded-2xl bg-white hover:bg-stone-50 text-[#2B1A24] font-black text-sm sm:text-base border-2 border-[#2B1A24]/15 hover:border-[#FF4B8B] shadow-sm transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#FF4B8B]" />
                <span>Pedir para Pick-Up aquí</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Map Card & Quick Tools (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Interactive Map Embed Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-lg border border-[#2B1A24]/10 flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#FF4B8B]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-['Outfit'] font-black text-sm text-[#2B1A24] block leading-tight">
                      Patio Clavería
                    </span>
                    <span className="text-[11px] text-stone-400">Azcapotzalco, CDMX</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold text-stone-600 hover:text-[#FF4B8B] hover:bg-pink-50 transition-colors border border-stone-200"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">¡Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar dirección</span>
                    </>
                  )}
                </button>
              </div>

              {/* Map Iframe Container */}
              <div className="relative w-full h-64 sm:h-72 lg:h-full min-h-[220px] rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-stone-100 group">
                <iframe
                  title="Ubicación Freséame en Patio Clavería"
                  src={STORE_LOCATION.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover"
                />

                {/* Overlay Badge to open direct app */}
                <a
                  href={STORE_LOCATION.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#2B1A24]/90 backdrop-blur-xs text-white text-xs font-bold shadow-md hover:bg-[#FF4B8B] transition-colors flex items-center gap-1.5"
                >
                  <span>Abrir en Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Quick Contact & WhatsApp Route Banner */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-100 block">
                  ¿Necesitas indicaciones al llegar?
                </span>
                <span className="font-['Outfit'] font-black text-sm sm:text-base leading-tight block">
                  Escríbenos y te guiamos al local
                </span>
              </div>

              <a
                href="https://wa.me/527731727582?text=¡Hola!%20Estoy%20en%20Plaza%20Patio%20Clavería,%20¿dónde%20están%20ubicados?%20🍓"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 font-black text-xs shadow-sm hover:bg-stone-100 transition-colors shrink-0 flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
