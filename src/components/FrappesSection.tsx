import React, { useState } from 'react';
import { Sparkles, MessageCircle, Flame, Star, Snowflake, Heart } from 'lucide-react';
import { MENU_ITEMS, WHATSAPP_PHONE } from '../data/freseameData';

export const FrappesSection: React.FC = () => {
  const [selectedMilk, setSelectedMilk] = useState<'entera' | 'deslactosada' | 'almendra' | 'coco'>('deslactosada');
  const [extraWhip, setExtraWhip] = useState<boolean>(true);

  const frappes = MENU_ITEMS.filter((item) => item.isFrappe);

  const handleOrderFrappe = (frappeName: string, price: number) => {
    const text = encodeURIComponent(
      `¡Hola Freséame! 🍓 Quiero ordenar un Frappé:\n` +
      `🥤 Bebida: ${frappeName} ($${price} MXN)\n` +
      `🥛 Tipo de leche: ${selectedMilk.toUpperCase()}\n` +
      `☁️ Crema chantilly: ${extraWhip ? 'Sí, por favor' : 'Sin chantilly'}\n\n` +
      `¿Me confirman si lo pueden preparar ahora?`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <section id="frappes" className="py-16 md:py-24 bg-gradient-to-b from-[#FFF8F2] via-teal-50/30 to-[#FFF8F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#48C9B0]/20 border border-[#48C9B0]/40 text-teal-800 text-xs font-black uppercase tracking-wider mb-3">
            <Snowflake className="w-3.5 h-3.5 text-[#48C9B0]" />
            <span>Barra Helada Freséame</span>
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl md:text-5xl text-[#2B1A24] tracking-tight">
            Frappés Artesanales de Autor 🥤
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#2B1A24]/75">
            Elaborados con fruta congelada de temporada, bases ultra cremosas y toppings premium montados en la cima.
          </p>

          {/* Quick milk selector for frappés */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white border border-[#2B1A24]/10 shadow-xs text-xs">
            <span className="font-bold text-[#2B1A24]/60 px-2">Personaliza tu leche:</span>
            {[
              { id: 'entera', label: 'Entera' },
              { id: 'deslactosada', label: 'Deslactosada' },
              { id: 'almendra', label: 'Almendra 🌱' },
              { id: 'coco', label: 'Coco 🥥' },
            ].map((milk) => (
              <button
                key={milk.id}
                onClick={() => setSelectedMilk(milk.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedMilk === milk.id
                    ? 'bg-[#48C9B0] text-white shadow-2xs'
                    : 'bg-stone-50 text-[#2B1A24]/70 hover:bg-stone-100'
                }`}
              >
                {milk.label}
              </button>
            ))}
          </div>
        </div>

        {/* Frappé Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {frappes.map((frappe) => (
            <div
              key={frappe.id}
              id={`frappe-card-${frappe.id}`}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl border border-[#2B1A24]/10 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top ambient color bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF4B8B] via-[#48C9B0] to-amber-300" />

              <div>
                {/* Header Tag and Price */}
                <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl uppercase tracking-wider ${frappe.tagColor}`}>
                    {frappe.tag}
                  </span>
                  <span className="font-['Outfit'] font-black text-2xl text-[#FF4B8B]">
                    ${frappe.price} <span className="text-xs font-bold text-[#2B1A24]/50">MXN</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-['Outfit'] font-black text-xl text-[#2B1A24] group-hover:text-[#FF4B8B] transition-colors">
                  {frappe.name}
                </h3>

                {/* Flavor Notes Pill */}
                {frappe.flavorNotes && (
                  <div className="mt-2 text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg inline-block border border-teal-100">
                    💡 {frappe.flavorNotes}
                  </div>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#2B1A24]/70 mt-3 leading-relaxed">
                  {frappe.description}
                </p>

                {/* Ingredients list */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <div className="flex flex-wrap gap-1.5">
                    {frappe.ingredients.map((ing, idx) => (
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

              {/* Order CTA */}
              <div className="mt-6 pt-4 border-t border-stone-100">
                <button
                  id={`btn-order-frappe-${frappe.id}`}
                  onClick={() => handleOrderFrappe(frappe.name, frappe.price)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#48C9B0] hover:bg-[#3BAF99] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Pedir este Frappé por WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
