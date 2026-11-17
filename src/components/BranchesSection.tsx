import React from 'react';
import { MapPin, Clock, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { STORE_BRANCHES } from '../data/freseameData';
import { SparkleFourPoint, MinimalHeart } from './BrandDecorations';

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
    <section
      id="sucursales"
      className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 font-['Outfit'] ${className}`}
    >
      {/* Encabezado de la sección */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 relative">
        <SparkleFourPoint className="hidden sm:block w-5 h-5 text-[#F4B8C7] absolute top-0 left-10" />
        <MinimalHeart className="hidden sm:block w-5 h-5 text-[#CDE5DA] absolute top-4 right-10" />

        <span className="text-xs font-semibold text-[#4A2638] uppercase tracking-widest bg-[#CDE5DA] px-4 py-1.5 rounded-full border border-[#4A2638]/15 inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#4A2638]" />
          <span>Nuestras Ubicaciones Físicas</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold font-['DynaPuff'] text-[#4A2638]">
          Encuentra tu Freséame Más Cercano
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#4A2638]/85 font-normal">
          Cerca de ti para matar el antojo al momento.
        </p>
      </div>

      {/* Cuadrícula responsiva: 1 columna en móvil y 2 en escritorio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {STORE_BRANCHES.map((branch) => {
          return (
            <div
              key={branch.id}
              className={`rounded-3xl border-2 border-[#4A2638] shadow-[0_4px_0_#4A2638] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                branch.isNew
                  ? 'bg-[#F4B8C7]/35'
                  : 'bg-[#FFF7EE]'
              }`}
            >
              <div className="space-y-5 relative z-10">
                {/* Badges superiores de estado */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    {branch.isNew && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B73E5B] text-white text-xs font-bold uppercase tracking-wider border border-[#4A2638]">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span>{branch.badgeText || '✨ ¡NUEVA SUCURSAL!'}</span>
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CDE5DA] text-[#4A2638] border border-[#4A2638]/20 text-xs font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-[#4A2638]" />
                      <span>{branch.openStatus}</span>
                    </span>
                  </div>

                  <span className="text-[11px] text-[#4A2638]/75 font-semibold tracking-wide">
                    CDMX
                  </span>
                </div>

                {/* Título y Pin de ubicación */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4B8C7] border border-[#4A2638]/20 text-[#4A2638] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#4A2638]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-['DynaPuff'] font-bold text-xl sm:text-2xl text-[#4A2638] leading-tight">
                      {branch.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#4A2638]/85 leading-relaxed font-normal">
                      {branch.address}
                    </p>
                  </div>
                </div>

                {/* Referencia destacada en Rosa Fresa con texto Ciruela */}
                <div className="rounded-2xl bg-[#F4B8C7]/45 border border-[#4A2638]/15 p-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A2638] block mb-0.5">
                    📍 Ubicación exacta en la plaza:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#4A2638] leading-snug">
                    {branch.reference}
                  </p>
                </div>

                {/* Horario y WhatsApp */}
                <div className="pt-2 border-t border-[#4A2638]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#4A2638]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#B73E5B] shrink-0" />
                    <span className="font-normal">
                      <strong className="font-bold text-[#4A2638]">Horario:</strong> {branch.hours}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${branch.phoneRaw}?text=${encodeURIComponent(`Hola Freséame! Tengo una consulta sobre la ${branch.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#B73E5B] hover:text-[#4A2638] font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#B73E5B] shrink-0" />
                    <span>WhatsApp: {branch.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Botón CTA Frambuesa estilo Sticker */}
              <div className="pt-5 mt-4 border-t border-[#4A2638]/15 relative z-10">
                <a
                  id={`maps-btn-${branch.id}`}
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-[#B73E5B] hover:bg-[#9E324C] text-white font-bold text-sm border-2 border-[#4A2638] shadow-[0_3px_0_#4A2638] active:translate-y-0.5 active:shadow-[0_1px_0_#4A2638] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>📍 Cómo llegar en Google Maps</span>
                  <ExternalLink className="w-4 h-4 text-white shrink-0" />
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
