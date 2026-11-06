import React from 'react';
import { ArrowRight, ShieldCheck, Check } from 'lucide-react';
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
  const getBadgeStyle = (tag: string) => {
    if (tag.includes('Especialidad')) return 'bg-amber-50 text-amber-800 border-amber-200';
    if (tag.includes('Siempre')) return 'bg-rose-50 text-rose-800 border-rose-200';
    if (tag.includes('Muy Pedida')) return 'bg-pink-50 text-pink-800 border-pink-200';
    if (tag.includes('Moka')) return 'bg-amber-100 text-amber-900 border-amber-200';
    if (tag.includes('Choco')) return 'bg-stone-100 text-stone-800 border-stone-200';
    if (tag.includes('Protein')) return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (tag.includes('Plant-Based')) return 'bg-teal-50 text-teal-800 border-teal-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  return (
    <section id="cremas" className="py-6 sm:py-10 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Nuestras 7 Recetas Exclusivas
          </span>
          <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-tight mt-2 flex items-center justify-center gap-2">
            <span>Cremas de Especialidad</span>
            <span className="text-2xl sm:text-3xl">🥛</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 font-medium">
            Elige una crema para preseleccionarla de inmediato en tu postre.
          </p>
        </div>

        {/* PROMINENT BANNER: Propuesta de Valor de la Barra Libre */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white shadow-xl shadow-rose-950/10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2.5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                Propuesta Única Freséame
              </span>
              <h3 className="font-['Outfit'] font-black text-2xl sm:text-3xl leading-tight text-white">
                ¡En Sucursal: Barra Libre de Toppings a Tu Antojo!
              </h3>
              <p className="text-sm sm:text-base text-rose-50 leading-relaxed font-medium">
                ¡El límite lo pones tú! En sucursal <strong>sírvete tú mismo los toppings con tu propia mano y a tu gusto</strong>. Escoge tu base y tu crema artesanal favorita, y sumérgete en nuestra barra libre con más de 25 chocolates, galletas y frutos secos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href="#como-funciona"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-rose-50 text-rose-600 font-black text-sm text-center shadow-md transition-all active:scale-95"
              >
                ¡Armar con mi crema favorita!
              </a>
              <div className="text-center text-xs text-white/90 font-semibold flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>100% Fresco y Artesanal</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7 CREMAS INTERACTIVE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CREMAS.map((crema) => {
            const isSelected = selectedCremaId === crema.id;
            return (
              <div
                key={crema.id}
                id={`crema-card-${crema.id}`}
                className={`bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 ring-2 ring-rose-200 bg-rose-50/40'
                    : 'border-rose-100 hover:border-rose-300 hover:-translate-y-1'
                }`}
                onClick={() => onSelectCrema && onSelectCrema(crema)}
              >
                <div>
                  {/* Top Badge & Swatch */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full border ${getBadgeStyle(
                        crema.tag
                      )}`}
                    >
                      {crema.tag}
                    </span>

                    {/* Color Swatch Circle */}
                    <div
                      className="w-8 h-8 rounded-full border-2 border-rose-200 shadow-xs shrink-0 flex items-center justify-center text-xs"
                      style={{ backgroundColor: crema.color }}
                      title={`Tonalidad: ${crema.name}`}
                    >
                      🥛
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Outfit'] font-black text-xl text-gray-900 group-hover:text-rose-600 transition-colors">
                    {crema.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                    "{crema.description}"
                  </p>

                  {/* Texture pill */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-medium">Textura:</span>
                    <span className="font-bold text-rose-600">{crema.texture}</span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCrema && onSelectCrema(crema);
                    }}
                    className={`w-full min-h-[42px] py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'bg-rose-600 text-white font-black shadow-xs'
                        : 'bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200'
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
          <div className="bg-gradient-to-br from-rose-50 to-pink-50/50 rounded-3xl p-6 shadow-xs border border-rose-200 flex flex-col justify-between text-center">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white text-rose-600 border border-rose-200 flex items-center justify-center mx-auto text-2xl mb-3 shadow-xs">
                🍓
              </div>
              <h3 className="font-['Outfit'] font-black text-lg text-gray-900">
                El Secreto de la Casa
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Nuestras recetas secretas y proporciones exactas son el tesoro artesanal de Freséame. Batidas todos los días para garantizar la textura sedosa que enamora a toda la comunidad.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100">
              <span className="text-[11px] font-extrabold text-rose-700 uppercase tracking-wider block">
                Frescura Garantizada
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CremasSection;
