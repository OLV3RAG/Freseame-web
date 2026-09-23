import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowRight, Check, Heart, Flame } from 'lucide-react';
import { MENU_ITEMS, WHATSAPP_PHONE } from '../data/freseameData';
import { CategoryType, MenuItem } from '../types';

interface MenuSectionProps {
  onCustomizeItem?: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onCustomizeItem }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'todos'>('todos');

  const categories = [
    { id: 'todos', label: 'Todo el Menú', icon: '✨' },
    { id: 'frutales', label: 'Bases Frutales', icon: '🍓' },
    { id: 'plancha', label: 'Plancha & Horneados', icon: '🧇' },
    { id: 'frappes', label: 'Bebidas & Frappés', icon: '🥤' },
  ];

  const filteredItems = activeCategory === 'todos'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleOrderDirect = (item: MenuItem) => {
    const text = encodeURIComponent(
      `¡Hola Freséame! 🍓 Me gustaría ordenar directamente del menú:\n` +
      `📌 Producto: ${item.name} ($${item.price} MXN)\n` +
      `Ingredientes: ${item.ingredients.join(', ')}\n\n` +
      `¿Tienen disponible para entrega o para pasar a recoger?`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-stone-50/70 border-t border-b border-[#2B1A24]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#48C9B0]/15 border border-[#48C9B0]/30 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Delicias de la Casa</span>
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl md:text-5xl text-[#2B1A24] tracking-tight">
            Nuestro Menú de Especialidades
          </h2>
          <p className="mt-3 text-base text-[#2B1A24]/75">
            Recetas prediseñadas por nuestros maestros postreros, listas para ordenar o usar como inspiración.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`menu-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#FF4B8B] text-white shadow-md shadow-[#FF4B8B]/20 scale-105'
                    : 'bg-white hover:bg-stone-100 text-[#2B1A24] border border-[#2B1A24]/10 shadow-xs'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`menu-card-${item.id}`}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl border border-[#2B1A24]/10 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Header Tag and Price */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  {item.tag ? (
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl uppercase tracking-wider ${item.tagColor || 'bg-rose-500 text-white'}`}>
                      {item.tag}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-stone-100 text-[#2B1A24]/60">
                      Freséame Special
                    </span>
                  )}
                  <span className="font-['Outfit'] font-black text-2xl text-[#FF4B8B]">
                    ${item.price} <span className="text-xs font-bold text-[#2B1A24]/50">MXN</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-['Outfit'] font-black text-xl text-[#2B1A24] group-hover:text-[#FF4B8B] transition-colors">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#2B1A24]/70 mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Ingredient Chips */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <span className="text-[11px] font-bold text-[#2B1A24]/50 block mb-1.5 uppercase tracking-wider">
                    Incluye:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-stone-100 text-[#2B1A24]/80"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2">
                <button
                  id={`btn-order-whatsapp-${item.id}`}
                  onClick={() => handleOrderDirect(item)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Pedir directo</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
