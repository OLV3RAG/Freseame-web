import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowRight, Check, Heart, MapPin } from 'lucide-react';
import { WHATSAPP_PHONE, STORE_LOCATION } from '../data/freseameData';

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
      id: 'crepa-kinder-bueno',
      name: 'Crepa Kinder Bueno & Crema Kinder',
      description: 'Nuestra exclusiva crema artesanal Kinder combinada con barritas de Kinder Bueno, fresas y chocolate blanco derretido.',
      price: 95,
      tag: 'Especialidad',
      emoji: '✨',
      toppings: ['Crema Kinder', 'Kinder Bueno', 'Chocolate Blanco'],
    },
    {
      id: 'crepa-cajeta-platano',
      name: 'Crepa Cajeta de Celaya & Plátano',
      description: 'Cajeta quemada tradicional, rebanadas de plátano fresco, nuez picada y un toque suave de crema 3 leches.',
      price: 85,
      tag: 'Clásico Dulce',
      emoji: '🍌',
      toppings: ['Cajeta Quemada', 'Plátano', 'Crema 3 Leches'],
    },
    {
      id: 'crepa-lotus-biscoff',
      name: 'Crepa Lotus Biscoff Crunch',
      description: 'Untable cremoso de galleta Lotus Biscoff con trozos crujientes de galleta caramelizada, fresas frescas y canela.',
      price: 95,
      tag: 'Tendencia',
      emoji: '🍪',
      toppings: ['Crema Lotus', 'Galleta Biscoff', 'Canela'],
    },
    {
      id: 'crepa-3-leches-durazno',
      name: 'Crepa 3 Leches & Durazno Glaseado',
      description: 'Gajos seleccionados de durazno dulce en su punto, bañados en nuestra crema 3 leches y almendra fileteada.',
      price: 85,
      tag: 'Suave & Fresca',
      emoji: '🍑',
      toppings: ['Durazno Dulce', 'Crema 3 Leches', 'Almendra'],
    },
  ];

  const handleOrderWhatsApp = (crepa: CrepaItem) => {
    const folio = `FSM-${Math.floor(100 + Math.random() * 900)}`;
    const msg =
      `¡Hola Freséame! 🍓 Quiero ordenar una orden de Crepas:\n\n` +
      `🧾 Folio: #${folio}\n` +
      `🥞 Producto: ${crepa.name}\n` +
      `💰 Precio: $${crepa.price} MXN\n` +
      `🍓 Ingredientes: ${crepa.toppings.join(', ')}\n` +
      `📍 Servicio: Pick-Up en Patio Clavería (junto a McCarthy's)\n\n` +
      `¿Tienen disponible para pasar a recoger?`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="crepas" className="py-4 sm:py-6 bg-[#FFF8F2]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="max-w-2xl mx-auto text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider mb-2">
            <span>🥞 Recién Hechas a la Plancha</span>
          </div>
          <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-[#2B1A24] tracking-tight">
            Crepas Artesanales Freséame
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-600 font-medium">
            Masa delgada, doradita con mantequilla y rellena con nuestras 7 cremas de especialidad y frutas frescas.
          </p>
        </div>

        {/* Clean, Mobile-First Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {crepasList.map((crepa) => {
            const isSelected = selectedCrepaId === crepa.id;
            return (
              <div
                key={crepa.id}
                className={`rounded-3xl bg-white border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md ${
                  isSelected ? 'border-[#FF4B8B] ring-2 ring-[#FF4B8B]/20' : 'border-stone-200/90'
                }`}
                onClick={() => setSelectedCrepaId(crepa.id)}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-3xl p-2 rounded-2xl bg-amber-50 border border-amber-100 shrink-0">
                      {crepa.emoji}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-[#FF4B8B] text-[11px] font-black uppercase tracking-wider">
                      {crepa.tag}
                    </span>
                  </div>

                  <h3 className="font-['Outfit'] font-black text-lg text-[#2B1A24] leading-snug">
                    {crepa.name}
                  </h3>

                  <p className="text-xs text-stone-500 font-medium leading-relaxed mt-2 mb-3">
                    {crepa.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {crepa.toppings.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-bold"
                      >
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold block uppercase">Precio</span>
                    <span className="font-['Outfit'] font-black text-xl text-[#FF4B8B]">
                      ${crepa.price} MXN
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderWhatsApp(crepa);
                    }}
                    className="min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1eb855] hover:from-[#1eb855] hover:to-[#199d49] text-white text-xs font-black shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation"
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
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#2B1A24]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <h4 className="font-['Outfit'] font-black text-sm text-[#2B1A24]">
                ¿Prefieres armar tu crepa desde cero?
              </h4>
              <p className="text-xs text-stone-500">
                Elige tu crema artesanal favorita, aderezo y toppings de la barra libre en el simulador.
              </p>
            </div>
          </div>

          {onCustomizeWithBase && (
            <button
              type="button"
              onClick={onCustomizeWithBase}
              className="min-h-[44px] py-2.5 px-5 rounded-xl bg-[#FF4B8B] hover:bg-[#e63f7c] text-white text-xs font-bold transition-all shrink-0 cursor-pointer active:scale-95 touch-manipulation flex items-center justify-center"
            >
              Ir a Personalizador
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
