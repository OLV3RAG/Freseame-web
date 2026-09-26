import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowRight, Check, Heart, MapPin } from 'lucide-react';
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
      id: 'waffle-3leches-durazno',
      name: 'Waffle 3 Leches & Duraznos Dulces',
      description: 'Esponjoso por dentro y dorado por fuera, bañado con nuestra crema 3 leches artesanal y gajos frescos de durazno.',
      price: 90,
      tag: 'Tradicional',
      emoji: '🍑',
      toppings: ['Durazno en Gajos', 'Crema 3 Leches', 'Canela'],
    },
    {
      id: 'waffle-cajeta-nuez',
      name: 'Waffle Cajeta de Sayula & Nuez',
      description: 'Generosa cobertura de cajeta quemada artesanal, trozos de nuez pecana tostada y un espejo de crema tradicional.',
      price: 85,
      tag: 'Artesanal',
      emoji: '🍯',
      toppings: ['Cajeta Quemada', 'Nuez Tostada', 'Crema Tradicional'],
    },
  ];

  const handleOrderWhatsApp = (waffle: WaffleItem) => {
    const folio = `FSM-${Math.floor(100 + Math.random() * 900)}`;
    const msg =
      `¡Hola Freséame! 🍓 Quiero ordenar una orden de Waffles:\n\n` +
      `🧾 Folio: #${folio}\n` +
      `🧇 Producto: ${waffle.name}\n` +
      `💰 Precio: $${waffle.price} MXN\n` +
      `🍓 Ingredientes: ${waffle.toppings.join(', ')}\n` +
      `📍 Servicio: Pick-Up en Patio Clavería (junto a McCarthy's)\n\n` +
      `¿Tienen disponible para pasar a recoger?`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="waffles" className="py-8 sm:py-12 bg-[#FFF8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-300 text-orange-900 text-xs font-black uppercase tracking-wider mb-2">
            <span>🧇 Horneados al Momento</span>
          </div>
          <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-[#2B1A24] tracking-tight">
            Waffles Belgas Crujientes
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-600 font-medium">
            Masa tradicional con mantequilla dorada, crujientes por fuera y suaves por dentro.
          </p>
        </div>

        {/* Clean, Mobile-First Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {wafflesList.map((waffle) => {
            const isSelected = selectedWaffleId === waffle.id;
            return (
              <div
                key={waffle.id}
                className={`rounded-3xl bg-white border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md ${
                  isSelected ? 'border-[#FF4B8B] ring-2 ring-[#FF4B8B]/20' : 'border-stone-200/90'
                }`}
                onClick={() => setSelectedWaffleId(waffle.id)}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-3xl p-2 rounded-2xl bg-orange-50 border border-orange-100 shrink-0">
                      {waffle.emoji}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-[#FF4B8B] text-[11px] font-black uppercase tracking-wider">
                      {waffle.tag}
                    </span>
                  </div>

                  <h3 className="font-['Outfit'] font-black text-lg text-[#2B1A24] leading-snug">
                    {waffle.name}
                  </h3>

                  <p className="text-xs text-stone-500 font-medium leading-relaxed mt-2 mb-3">
                    {waffle.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {waffle.toppings.map((t, idx) => (
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
                      ${waffle.price} MXN
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderWhatsApp(waffle);
                    }}
                    className="min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1eb855] hover:from-[#1eb855] hover:to-[#199d49] text-white text-xs font-black shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation"
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
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#2B1A24]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <h4 className="font-['Outfit'] font-black text-sm text-[#2B1A24]">
                ¿Prefieres armar tu waffle con toppings ilimitados?
              </h4>
              <p className="text-xs text-stone-500">
                Pasa al simulador interactivo para elegir tu base de waffle con tus cremas y toppings favoritos.
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
