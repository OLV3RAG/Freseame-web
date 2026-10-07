import React from 'react';
import { PetalShower, CempasuchilIcon, CalaveritaIcon, VeladoraIcon } from './DiaDeMuertosDecorations';
import { Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-6 sm:pt-8 pb-3 sm:pb-4 bg-transparent text-center px-4 overflow-hidden">
      {/* Lluvia animada de pétalos de cempasúchil flotantes */}
      <PetalShower />

      {/* Resplandor ambiental de ofrenda y veladoras */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[200px] bg-gradient-to-r from-[#FF6F00]/15 via-[#E91E63]/10 to-[#FFD54F]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Festive Badge Día de Muertos */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1228]/90 border border-[#FF8F00]/40 text-[#FFD54F] text-xs font-black uppercase tracking-wider mb-2.5 shadow-md shadow-[#FF6F00]/10 backdrop-blur-md">
          <CalaveritaIcon size={16} />
          <span className="text-[11px] sm:text-xs">Tradición & Dulzura • Freséame</span>
          <CempasuchilIcon size={16} />
        </div>

        <h1 className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-[#FFFDF7] tracking-tight leading-tight flex items-center justify-center gap-2 flex-wrap">
          <span>Arma tu combinación favorita</span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block hover:scale-110 transition-transform">🍓</span>
            <CempasuchilIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFB300] animate-pulse" />
          </span>
        </h1>

        <p className="mt-1.5 text-xs sm:text-sm text-stone-300 font-medium max-w-xl mx-auto">
          Elige tu postre, tu crema artesanal y disfruta con barra libre en <strong className="text-[#FFD54F]">Patio Clavería</strong>
        </p>
      </div>
    </section>
  );
};

