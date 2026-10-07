import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

interface PromoTopBarProps {
  onViewDetails: () => void;
}

export const PromoTopBar: React.FC<PromoTopBarProps> = ({ onViewDetails }) => {
  return (
    <aside
      id="promo-top-bar"
      aria-label="Promoción destacada"
      className="w-full bg-[#071A2B] text-[#F7F4EC] border-b border-[#C6A052]/20 relative z-50 text-[11px] sm:text-xs py-1.5 px-3 transition-colors select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-center flex-wrap">
        <span className="inline-flex items-center gap-1.5 font-medium tracking-wide text-stone-200">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
          <strong className="text-[#C6A052] font-bold">Jueves de 2x1/2 en Patio Clavería</strong>
          <span className="opacity-40 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-stone-300">Válido únicamente en sucursal</span>
        </span>

        <button
          type="button"
          onClick={onViewDetails}
          className="inline-flex items-center gap-0.5 text-[#C6A052] hover:text-[#e5bf6c] font-bold transition-all hover:translate-x-0.5 cursor-pointer underline-offset-2 hover:underline shrink-0 active:scale-95 touch-manipulation"
          aria-label="Ver detalles de la promoción de jueves"
        >
          <span>Ver detalles</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </aside>
  );
};
