import React from 'react';
import { Sparkles, ArrowRight, Heart, ShieldCheck, Check, UtensilsCrossed } from 'lucide-react';
import { CREMAS } from '../data/freseameData';
import { CremaOption } from '../types';

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
    <section id="cremas" className="py-16 md:py-24 bg-[#FFF8F2] relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4B8B]/10 border border-[#FF4B8B]/20 text-[#FF4B8B] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nuestras Recetas de la Casa</span>
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl md:text-5xl text-[#2B1A24] tracking-tight">
            Nuestras Cremas de Especialidad 🥛✨
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#2B1A24]/75 leading-relaxed">
            Siete cremas artesanales diseñadas para lograr el maridaje perfecto con fruta fresca y postres horneados. Batidas diariamente en pequeños lotes con ingredientes de la más alta calidad.
          </p>
        </div>

        {/* PROMINENT BANNER: Propuesta de Valor de la Barra Libre */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FF4B8B] via-[#E8437D] to-[#48C9B0] text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none text-9xl">
            🍓
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Propuesta Única Freséame</span>
              </div>
              <h3 className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl leading-tight">
                ¡En Sucursal: Barra Libre de Toppings a Tu Antojo!
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
                ¡El límite lo pones tú! En sucursal <strong>sírvete tú mismo los toppings con tu propia mano y a tu gusto</strong>. Escoge tu base y tu crema artesanal favorita, y sumérgete en nuestra barra libre con más de 27 chocolates, galletas y frutos secos. Para pedidos con entrega a domicilio, selecciona tus combinaciones aquí y las servimos con abundancia garantizada.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href="#constructor"
                className="px-6 py-3.5 rounded-2xl bg-white text-[#FF4B8B] hover:bg-stone-50 font-black text-sm text-center shadow-lg transition-transform active:scale-95"
              >
                ¡Armar con mi crema favorita!
              </a>
              <div className="text-center text-xs text-white/80 font-semibold flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-white" />
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
                className={`bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'border-[#FF4B8B] ring-2 ring-[#FF4B8B]/30 shadow-md'
                    : 'border-[#2B1A24]/10 hover:border-[#FF4B8B]/40 hover:-translate-y-1'
                }`}
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
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md shrink-0 flex items-center justify-center text-xs"
                      style={{ backgroundColor: crema.color }}
                      title={`Tonalidad: ${crema.name}`}
                    >
                      🥛
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Outfit'] font-black text-xl text-[#2B1A24] group-hover:text-[#FF4B8B] transition-colors">
                    {crema.name}
                  </h3>

                  {/* Description as requested */}
                  <p className="text-xs sm:text-sm text-[#2B1A24]/75 mt-2.5 leading-relaxed font-normal">
                    "{crema.description}"
                  </p>

                  {/* Texture pill */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-medium">Textura:</span>
                    <span className="font-bold text-[#2B1A24]/80">{crema.texture}</span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-3 border-t border-stone-100">
                  <button
                    onClick={() => onSelectCrema && onSelectCrema(crema)}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-50 hover:bg-rose-50 text-[#FF4B8B] font-bold text-xs flex items-center justify-center gap-1.5 transition-all group-hover:bg-[#FF4B8B] group-hover:text-white"
                  >
                    <span>Elegir para mi Freséame</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* 8th Card: Confidencialidad & Tradición */}
          <div className="bg-gradient-to-br from-white to-[#FFF5F8] rounded-3xl p-6 shadow-sm border border-dashed border-[#FF4B8B]/30 flex flex-col justify-between text-center">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100/70 text-[#FF4B8B] flex items-center justify-center mx-auto text-2xl mb-3">
                ⭐
              </div>
              <h3 className="font-['Outfit'] font-black text-lg text-[#2B1A24]">
                El Secreto de la Casa
              </h3>
              <p className="text-xs text-[#2B1A24]/70 mt-2 leading-relaxed">
                Nuestras recetas secretas y proporciones exactas son el tesoro artesanal de Freséame. Batidas todos los días para garantizar la textura sedosa que enamora a toda la comunidad.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100">
              <span className="text-[11px] font-extrabold text-[#FF4B8B] uppercase tracking-wider block">
                Frescura Garantizada
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
