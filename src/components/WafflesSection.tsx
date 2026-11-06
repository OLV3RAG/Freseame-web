import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/freseameData';

interface WafflesSectionProps {
  onCustomizeWithBase?: () => void;
}

interface WaffleItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tag: string;
  emoji: string;
  toppings: string[];
}

export const WafflesSection: React.FC<WafflesSectionProps> = ({ onCustomizeWithBase }) => {
  const [selectedWaffleId, setSelectedWaffleId] = useState<string>('waffle-fresas-queso');

  const wafflesList: WaffleItem[] = [
    {
      id: 'waffle-fresas-queso',
      name: 'Waffle Belga Fresas & Crema de Queso',
      description: 'Waffle dorado y crujiente recién horneado, cubierto con generosas fresas frescas y nuestra Crema de la Casa estilo cheesecake.',
      price: 85,
      tag: '⭐ Favorito del Día',
      emoji: '🧇',
      toppings: ['Fresas Frescas', 'Crema de la Casa', 'Azúcar Glass'],
    },
    {
      id: 'waffle-nutella-bomb',
      name: 'Waffle Nutella Bomb & Plátano',
      description: 'Bañado con abundante Nutella pura derretida, trozos de plátano fresco, fresas laminadas y chispas crujientes de chocolate belga.',
      price: 90,
      tag: 'Extra Dulce',
      emoji: '🍫',
      toppings: ['Nutella Pura', 'Plátano', 'Chispas de Chocolate'],
    },
    {
      id: 'waffle-lotus-caramelo',
      name: 'Waffle Lotus Biscoff Caramelizado',
      description: 'Untable suave speculoos Lotus, galleta Biscoff triturada, aderezo de caramelo salado y un toque de canela recién molida.',
      price: 95,
      tag: 'Crunch Premium',
      emoji: '🍪',
      toppings: ['Crema Lotus', 'Galleta Biscoff', 'Caramelo Salado'],
    },
    {
      id: 'waffle-duo-kinder-oreo',
      name: 'Waffle Dúo Kinder Bueno & Oreo',
      description: 'La combinación definitiva: mitad Crema Kinder con barritas de Kinder Bueno y mitad galleta Oreo molida con chocolate Hershey’s.',
      price: 95,
      tag: 'El Más pedido',
      emoji: '✨',
      toppings: ['Crema Kinder', 'Kinder Bueno', 'Galleta Oreo'],
    },
    {
      id: 'waffle-frutos-rojos-fit',
      name: 'Waffle Frutos Rojos & Crema Fit',
      description: 'Elaborado con harina de avena, coronado con yogur proteico, fresas, zarzamoras y semillas de chía sin azúcar refinada.',
      price: 95,
      tag: '💪 100% Fit',
      emoji: '🫐',
      toppings: ['Yogur Proteico', 'Frutos Rojos', 'Semillas Chía'],
    },
    {
      id: 'waffle-mexicano-cajeta',
      name: 'Waffle Mexicano Cajeta de Celaya',
      description: 'Salsa espesa de cajeta de cabra, nuez pecana finamente picada y un toque ligero de nuestra crema tradicional.',
      price: 85,
      tag: 'Clásico Mexicano',
      emoji: '🍯',
      toppings: ['Cajeta de Celaya', 'Nuez Pecana', 'Crema Clásica'],
    },
  ];

  const handleOrderWhatsApp = (waffle: WaffleItem) => {
    const msg = `¡Hola Freséame! 🍓 Quiero ordenar el ${waffle.name} ($${waffle.price} MXN). ¿Me confirman tiempo de preparación en Patio Clavería? ✨`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="waffles" className="py-6 sm:py-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="max-w-2xl mx-auto text-center mb-6 sm:mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            🧇 Crujientes y Doraditos
          </span>
          <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-tight mt-2">
            Waffles Belgas Artesanales
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-600 font-medium">
            Masa esponjosa por dentro y crujiente por fuera, acompañados con crema de la casa y toppings premium.
          </p>
        </div>

        {/* Clean, Mobile-First Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {wafflesList.map((waffle) => {
            const isSelected = selectedWaffleId === waffle.id;
            return (
              <div
                key={waffle.id}
                className={`rounded-3xl bg-white border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 ring-2 ring-rose-200 bg-rose-50/30'
                    : 'border-rose-100 hover:border-rose-300'
                }`}
                onClick={() => setSelectedWaffleId(waffle.id)}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-3xl p-2 rounded-2xl bg-rose-50 border border-rose-100 shrink-0">
                      {waffle.emoji}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-bold uppercase tracking-wider">
                      {waffle.tag}
                    </span>
                  </div>

                  <h3 className="font-['Outfit'] font-black text-lg text-gray-900 leading-snug">
                    {waffle.name}
                  </h3>

                  <p className="text-xs text-gray-600 font-medium leading-relaxed mt-2 mb-3">
                    {waffle.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {waffle.toppings.map((t, idx) => (
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
                      ${waffle.price} MXN
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderWhatsApp(waffle);
                    }}
                    className="min-h-[42px] py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                    <span>Pedir Waffle</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Customizer link banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-rose-50/60 border border-rose-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧇</span>
            <div>
              <h4 className="font-['Outfit'] font-black text-sm sm:text-base text-gray-900">
                ¿Prefieres armar tu waffle con toppings ilimitados?
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

export default WafflesSection;
