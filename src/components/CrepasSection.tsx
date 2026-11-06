import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/freseameData';

interface CrepasSectionProps {
  onCustomizeWithBase?: () => void;
}

interface CrepaItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tag: string;
  emoji: string;
  toppings: string[];
}

export const CrepasSection: React.FC<CrepasSectionProps> = ({ onCustomizeWithBase }) => {
  const [selectedCrepaId, setSelectedCrepaId] = useState<string>('crepa-fresas-queso');

  const crepasList: CrepaItem[] = [
    {
      id: 'crepa-fresas-queso',
      name: 'Crepa Tradicional Fresas & Queso',
      description: 'Crepa francesa dorada a la plancha, rellena de fresas frescas con nuestra Crema de la Casa (cheesecake) y lluvia de azúcar glass.',
      price: 85,
      tag: '⭐ La Más Pedida',
      emoji: '🍓',
      toppings: ['Fresas Frescas', 'Crema de Queso', 'Azúcar Glass'],
    },
    {
      id: 'crepa-nutella-suprema',
      name: 'Crepa Nutella Suprema con Fresas',
      description: 'Abundante Nutella pura untada sobre la crepa caliente con fresas laminadas, nuez en trozos y chocolate líquido.',
      price: 90,
      tag: 'Chocolatosa',
      emoji: '🍫',
      toppings: ['Nutella Pura', 'Fresas Frescas', 'Nuez Picada'],
    },
    {
      id: 'crepa-tres-leches-durazno',
      name: 'Crepa 3 Leches con Durazno',
      description: 'Relleno de durazno en almíbar dulce con nuestra crema 3 leches mexicana y toque de canela molida.',
      price: 85,
      tag: 'Muy Suave',
      emoji: '🍑',
      toppings: ['Duraznos Dulces', 'Crema 3 Leches', 'Canela'],
    },
    {
      id: 'crepa-fit-proteina',
      name: 'Crepa Fit con Frutos & Crema Proteica',
      description: 'Crepa ligera con yogur proteico, fresas, uvas sin semilla y almendras tostadas sin culpa.',
      price: 95,
      tag: '💪 High Protein',
      emoji: '🍇',
      toppings: ['Yogur Proteico', 'Fresas & Uvas', 'Almendra'],
    },
    {
      id: 'crepa-kinder-deluxe',
      name: 'Crepa Kinder Deluxe con Avellana',
      description: 'Rellena de trozos de Kinder Bueno, crema de avellana, chocolate rallado y crema de chocolate de la casa.',
      price: 95,
      tag: 'Especial',
      emoji: '🍪',
      toppings: ['Kinder Bueno', 'Crema de Avellana', 'Chispas'],
    },
    {
      id: 'crepa-cajeta-nuez',
      name: 'Crepa Tradicional Cajeta & Nuez',
      description: 'Cajeta quemada artesanal de Celaya con abundante nuez pecana troceada y toque de crema de café.',
      price: 85,
      tag: 'Clásica',
      emoji: '🍯',
      toppings: ['Cajeta Artesanal', 'Nuez Pecana', 'Crema Café'],
    },
  ];

  const handleOrderWhatsApp = (crepa: CrepaItem) => {
    const msg = `¡Hola Freséame! 🍓 Quiero ordenar la ${crepa.name} ($${crepa.price} MXN). ¿Me confirman tiempo de preparación en Patio Clavería? ✨`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="crepas" className="py-6 sm:py-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="max-w-2xl mx-auto text-center mb-6 sm:mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            🥞 Recién Hechas a la Plancha
          </span>
          <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-tight mt-2">
            Crepas Artesanales Freséame
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-600 font-medium">
            Masa delgada, doradita con mantequilla y rellena con nuestras 7 cremas de especialidad y frutas frescas.
          </p>
        </div>

        {/* Clean, Mobile-First Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {crepasList.map((crepa) => {
            const isSelected = selectedCrepaId === crepa.id;
            return (
              <div
                key={crepa.id}
                className={`rounded-3xl bg-white border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 ring-2 ring-rose-200 bg-rose-50/30'
                    : 'border-rose-100 hover:border-rose-300'
                }`}
                onClick={() => setSelectedCrepaId(crepa.id)}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-3xl p-2 rounded-2xl bg-rose-50 border border-rose-100 shrink-0">
                      {crepa.emoji}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-bold uppercase tracking-wider">
                      {crepa.tag}
                    </span>
                  </div>

                  <h3 className="font-['Outfit'] font-black text-lg text-gray-900 leading-snug">
                    {crepa.name}
                  </h3>

                  <p className="text-xs text-gray-600 font-medium leading-relaxed mt-2 mb-3">
                    {crepa.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {crepa.toppings.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-gray-50 text-gray-700 border border-gray-200 text-[10px] font-bold"
                      >
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Precio</span>
                    <span className="font-['Outfit'] font-black text-xl text-gray-900">
                      ${crepa.price} MXN
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderWhatsApp(crepa);
                    }}
                    className="min-h-[42px] py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                    <span>Pedir Crepa</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Customizer link banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-rose-50/60 border border-rose-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🥞</span>
            <div>
              <h4 className="font-['Outfit'] font-black text-sm sm:text-base text-gray-900">
                ¿Prefieres armar tu crepa desde cero?
              </h4>
              <p className="text-xs text-gray-600">
                Elige tu crema artesanal favorita, aderezo y toppings de la barra libre en el simulador.
              </p>
            </div>
          </div>

          {onCustomizeWithBase && (
            <button
              type="button"
              onClick={onCustomizeWithBase}
              className="min-h-[44px] py-2.5 px-5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-all shrink-0 cursor-pointer active:scale-95 shadow-sm"
            >
              Ir a Personalizador
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

export default CrepasSection;
