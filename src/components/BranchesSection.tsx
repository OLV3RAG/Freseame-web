import React from 'react';
import { MapPin, Clock, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { STORE_BRANCHES } from '../data/freseameData';

export interface BranchData {
  id: string;
  name: string;
  isNew?: boolean;
  badgeText?: string;
  openStatus: string;
  address: string;
  reference: string;
  hours: string;
  phoneDisplay: string;
  phoneRaw: string;
  mapsUrl: string;
}

interface BranchesSectionProps {
  className?: string;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({ className = '' }) => {
  return (
    <section id="sucursales" className={`py-12 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 ${className}`}>
      {/* Encabezado de la sección */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 inline-flex items-center gap-1.5 mb-2 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Nuestras Ubicaciones Físicas</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-black font-['Outfit'] text-gray-900 tracking-tight">
          Encuentra tu Freséame Más Cercano
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-600">
          Visítanos en nuestras dos sucursales oficiales en CDMX para disfrutar tus fresas con crema recién preparadas o recoger tu pedido sin filas.
        </p>
      </div>

      {/* Cuadrícula responsiva: 1 columna en móvil y 2 en escritorio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {STORE_BRANCHES.map((branch) => {
          return (
            <div
              key={branch.id}
              className={`rounded-3xl border bg-white p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                branch.isNew
                  ? 'border-rose-300 shadow-lg shadow-rose-600/10 hover:shadow-xl hover:border-rose-400 ring-1 ring-rose-500/20'
                  : 'border-rose-100 shadow-md hover:shadow-lg hover:border-rose-200'
              }`}
            >
              {/* Resplandor decorativo de apertura si es nueva */}
              {branch.isNew && (
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-gradient-to-br from-rose-200/40 to-pink-200/10 rounded-full blur-2xl pointer-events-none" />
              )}

              <div className="space-y-5 relative z-10">
                {/* Badges superiores de estado */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Badge destacado para nueva sucursal */}
                    {branch.isNew && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black uppercase tracking-wider shadow-sm animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{branch.badgeText || '✨ ¡NUEVA SUCURSAL!'}</span>
                      </span>
                    )}

                    {/* Badge ABIERTO HOY */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-black uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{branch.openStatus}</span>
                    </span>
                  </div>

                  <span className="text-[11px] text-gray-400 font-semibold tracking-wide">
                    CDMX
                  </span>
                </div>

                {/* Título y Pin de ubicación */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-6 h-6 text-rose-600" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-['Outfit'] font-black text-xl sm:text-2xl text-gray-900 tracking-tight leading-tight">
                      {branch.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {branch.address}
                    </p>
                  </div>
                </div>

                {/* Referencia destacada en tono rosa/rojo */}
                <div className="rounded-2xl bg-rose-50/60 border border-rose-100 p-3 sm:p-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block mb-0.5">
                    📍 Ubicación exacta en la plaza:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-rose-600 leading-snug">
                    {branch.reference}
                  </p>
                </div>

                {/* Horario y WhatsApp */}
                <div className="pt-2 border-t border-rose-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>
                      <strong className="text-gray-900">Horario:</strong> {branch.hours}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${branch.phoneRaw}?text=${encodeURIComponent(`Hola Freséame! Tengo una consulta sobre la ${branch.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WhatsApp: {branch.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Botón inferior rojo a lo ancho */}
              <div className="pt-5 mt-4 border-t border-gray-100 relative z-10">
                <a
                  id={`maps-btn-${branch.id}`}
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xs shadow-rose-600/20 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>📍 Cómo llegar en Google Maps</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BranchesSection;
