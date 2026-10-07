import React from 'react';
import { Sparkles, ArrowRight, Heart, ShieldCheck, Check, UtensilsCrossed } from 'lucide-react';
import { CREMAS } from '../data/freseameData';
import { CremaOption } from '../types';
import { CempasuchilIcon, CalaveritaIcon, VeladoraIcon } from './DiaDeMuertosDecorations';

interface CremasSectionProps {
  onSelectCrema?: (crema: CremaOption) => void;
  selectedCremaId?: string;
}

export const CremasSection: React.FC<CremasSectionProps> = ({
  onSelectCrema,
  selectedCremaId,
}) => {
  // Badges color mapping for each specialty cream
  const getBadgeStyle = (tag: string) => {
    if (tag.includes('Especialidad')) return 'bg-amber-100 text-amber-800 border-amber-300';
    if (tag.includes('Siempre')) return 'bg-rose-100 text-rose-800 border-rose-200';
    if (tag.includes('Muy Pedida')) return 'bg-pink-100 text-pink-800 border-pink-200';
    if (tag.includes('Moka')) return 'bg-amber-900/10 text-amber-900 border-amber-900/20';
    if (tag.includes('Choco')) return 'bg-stone-800 text-white border-stone-700';
    if (tag.includes('Protein')) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (tag.includes('Plant-Based')) return 'bg-teal-100 text-teal-800 border-teal-300';
    return 'bg-pink-50 text-[#FF4B8B] border-pink-200';
  };

  return (
    <section id="cremas" className="py-4 sm:py-6 bg-transparent relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6F00]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6A1B9A]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1228] border border-[#FF8F00]/40 text-[#FFD54F] text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
            <CalaveritaIcon size={14} />
            <span>Nuestras 7 Recetas</span>
            <CempasuchilIcon size={14} />
          </div>
          <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-[#FFFDF7] tracking-tight flex items-center justify-center gap-2">
            <span>Cremas de Especialidad</span>
            <span className="text-2xl sm:text-3xl">🥛</span>
            <CempasuchilIcon size={24} className="text-[#FF8F00]" />
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-300 font-medium">
            Elige una crema para preseleccionarla de inmediato en tu postre.
          </p>
        </div>

        {/* PROMINENT BANNER: Propuesta de Valor de la Barra Libre */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#4A148C] via-[#6A1B9A] to-[#FF6F00] text-white shadow-2xl relative overflow-hidden border-2 border-[#FFD54F]/40 candle-glow">
          <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none text-9xl">
            🍓
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-[#FFD54F] border border-[#FFD54F]/30 text-xs font-extrabold uppercase tracking-wider">
                <CempasuchilIcon size={14} />
                <span>Propuesta Única Freséame</span>
              </div>
              <h3 className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl leading-tight text-[#FFFDF7]">
                ¡En Sucursal: Barra Libre de Toppings a Tu Antojo!
              </h3>
              <p className="text-sm sm:text-base text-stone-100 leading-relaxed font-medium">
                ¡El límite lo pones tú! En sucursal <strong>sírvete tú mismo los toppings con tu propia mano y a tu gusto</strong>. Escoge tu base y tu crema artesanal favorita, y sumérgete en nuestra barra libre con más de 27 chocolates, galletas y frutos secos. Para pedidos con entrega a domicilio, selecciona tus combinaciones aquí y las servimos con abundancia garantizada.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href="#category-nav-bar"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FFD54F] to-[#FFB300] hover:from-[#FFE082] hover:to-[#FFD54F] text-[#0D0914] font-black text-sm text-center shadow-lg transition-transform active:scale-95 border border-white"
              >
                ¡Armar con mi crema favorita!
              </a>
              <div className="text-center text-xs text-white/90 font-semibold flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFD54F]" />
                <span>100% Fresco y Artesanal</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7 CREMAS INTERACTIVE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CREMAS.map((crema, index) => {
            const isSelected = selectedCremaId === crema.id;
            return (
              <div
                key={crema.id}
                id={`crema-card-${crema.id}`}
                className={`bg-[#1A1228]/95 rounded-3xl p-6 shadow-md hover:shadow-2xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? 'border-[#FF8F00] ring-2 ring-[#FF8F00]/60 candle-glow bg-[#221636]'
                    : 'border-[#FF8F00]/25 hover:border-[#FF8F00]/60 hover:bg-[#201433] hover:-translate-y-1'
                }`}
                onClick={() => onSelectCrema && onSelectCrema(crema)}
              >
                <div>
                  {/* Top Badge & Swatch */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <span
                      className={`text-[11px] font-black px-3 py-1 rounded-full border shadow-2xs ${getBadgeStyle(
                        crema.tag
                      )}`}
                    >
                      {crema.tag}
                    </span>

                    {/* Color Swatch Circle with spoon effect */}
                    <div
                      className="w-8 h-8 rounded-full border-2 border-[#FFD54F]/70 shadow-md shrink-0 flex items-center justify-center text-xs"
                      style={{ backgroundColor: crema.color }}
                      title={`Tonalidad: ${crema.name}`}
                    >
                      🥛
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Outfit'] font-black text-xl text-[#FFFDF7] group-hover:text-[#FFD54F] transition-colors flex items-center gap-1.5">
                    <span>{crema.name}</span>
                    {isSelected && <CempasuchilIcon size={14} className="text-[#FF8F00]" />}
                  </h3>

                  {/* Description as requested */}
                  <p className="text-xs sm:text-sm text-stone-300 mt-2.5 leading-relaxed font-normal">
                    "{crema.description}"
                  </p>

                  {/* Texture pill */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-medium">Textura:</span>
                    <span className="font-bold text-[#FFD54F]">{crema.texture}</span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-3 border-t border-white/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCrema && onSelectCrema(crema);
                    }}
                    className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 touch-manipulation cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-[#0D0914] font-black candle-glow'
                        : 'bg-[#25173B] text-[#FFD54F] hover:bg-[#FF6F00] hover:text-[#0D0914] border border-[#FF8F00]/30'
                    }`}
                  >
                    <span>{isSelected ? '✓ Crema Seleccionada' : 'Elegir para mi Freséame'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* 8th Card: Confidencialidad & Tradición */}
          <div className="bg-gradient-to-br from-[#1A1228] to-[#25173B] rounded-3xl p-6 shadow-md border-2 border-dashed border-[#FF8F00]/40 flex flex-col justify-between text-center">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF6F00]/20 text-[#FFD54F] border border-[#FF8F00]/30 flex items-center justify-center mx-auto text-2xl mb-3">
                <CalaveritaIcon size={26} />
              </div>
              <h3 className="font-['Outfit'] font-black text-lg text-[#FFFDF7] flex items-center justify-center gap-1.5">
                <span>El Secreto de la Casa</span>
                <CempasuchilIcon size={16} className="text-[#FF8F00]" />
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                Nuestras recetas secretas y proporciones exactas son el tesoro artesanal de Freséame. Batidas todos los días para garantizar la textura sedosa que enamora a toda la comunidad.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10">
              <span className="text-[11px] font-extrabold text-[#FFD54F] uppercase tracking-wider block">
                Frescura Garantizada
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
