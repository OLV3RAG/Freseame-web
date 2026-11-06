import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  MessageCircle,
  Flame,
  Star,
  Layers,
  ChevronRight,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/freseameData';

interface BaseItem {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

interface CremaItem {
  id: string;
  name: string;
  desc: string;
  badge?: string;
}

interface ToppingCategory {
  id: 'clasicos' | 'premium' | 'enchilados' | 'jarabes';
  name: string;
  icon: string;
  items: string[];
}

const BASES_LIST: BaseItem[] = [
  { id: 'fresas', name: 'Fresas', desc: 'Frescas, desinfectadas y picadas al momento', icon: '🍓' },
  { id: 'uvas', name: 'Uvas', desc: 'Jugosas, sin semilla y muy crujientes', icon: '🍇' },
  { id: 'durazno', name: 'Durazno', desc: 'En su punto dulce de maduración', icon: '🍑' },
  { id: 'combinados', name: 'Combinados', desc: 'Tu mezcla favorita de frutas frescas', icon: '✨' },
];

const CREMAS_LIST: CremaItem[] = [
  { id: 'queso', name: 'De la casa (Queso)', desc: 'Receta estrella sedosa estilo cheesecake', badge: 'Especialidad' },
  { id: 'tradicional', name: 'Tradicional', desc: 'La receta clásica dulce y balanceada' },
  { id: 'proteina', name: 'Proteína (Fit)', desc: 'Ligera y cremosa con yogur proteico', badge: 'Fit' },
  { id: 'chocolate', name: 'Chocolate', desc: 'Intensa y sedosa elaborada con cacao' },
  { id: 'cafe', name: 'Café', desc: 'Sutil y aromática con notas de café' },
  { id: 'tres-leches', name: '3 Leches', desc: 'Extra dulce y suave, favorita mexicana' },
  { id: 'vegana', name: 'Vegana', desc: '100% plant-based a base de coco y vainilla', badge: 'Plant-Based' },
];

const TOPPING_CATEGORIES: ToppingCategory[] = [
  {
    id: 'clasicos',
    name: 'Clásicos',
    icon: '🍪',
    items: [
      'Galleta Oreo',
      'Galleta Chokis',
      'Bubulubu',
      'Galleta María',
      'Kranky',
      'Snickers',
      'Carlos V',
      'Mazapán',
      'M&M',
      'Nuez',
      'Coco rayado',
      'Granillo de chocolate',
      'Bocadín',
      'Tin Larín',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: '⭐',
    items: [
      'Conejo Turín',
      'Kit Kat',
      "Hershey's Pastelito",
      "Hershey's Cookies 'n' Creme",
      "Hershey's Almendra",
      'Freskas',
      'Larín',
    ],
  },
  {
    id: 'enchilados',
    name: 'Enchilados',
    icon: '🌶️',
    items: [
      'Gomitas chilifruta',
      'Pica Fresa',
      'Pulparindo',
      'Skwinkles Sandía',
      'Mini Panditas enchilados',
      'Gomitas fruta con chilito',
    ],
  },
  {
    id: 'jarabes',
    name: 'Jarabes & Salsas',
    icon: '🍯',
    items: [
      'Nutella original',
      'Lechera Nestlé',
      'Jarabe Hershey’s Chocolate',
      'Cajeta artesanal',
      'Chamoy casero con limón',
      'Mermelada de fresa natural',
    ],
  },
];

export const HowItWorksSteps: React.FC = () => {
  const [selectedBase, setSelectedBase] = useState<string>('fresas');
  const [selectedCrema, setSelectedCrema] = useState<string>('queso');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([
    'Galleta Oreo',
    'Nutella original',
  ]);
  const [activeToppingTab, setActiveToppingTab] = useState<string>('clasicos');
  const [selectedSize, setSelectedSize] = useState<'Mediano' | 'Grande'>('Mediano');

  const toggleTopping = (topping: string) => {
    setSelectedToppings((prev) =>
      prev.includes(topping) ? prev.filter((t) => t !== topping) : [...prev, topping]
    );
  };

  const handleReset = () => {
    setSelectedBase('fresas');
    setSelectedCrema('queso');
    setSelectedToppings(['Galleta Oreo']);
    setSelectedSize('Mediano');
  };

  const currentBaseName = BASES_LIST.find((b) => b.id === selectedBase)?.name || 'Fresas';
  const currentCremaName = CREMAS_LIST.find((c) => c.id === selectedCrema)?.name || 'De la casa (Queso)';

  const generateWhatsAppMessage = () => {
    const toppingsText =
      selectedToppings.length > 0 ? selectedToppings.join(', ') : 'Sin toppings adicionales';
    const message = `¡Hola Freséame! 🍓 Quiero pedir mi vaso armado desde la web:
• Tamaño: ${selectedSize}
• Paso 1 (Base): ${currentBaseName}
• Paso 2 (Crema): ${currentCremaName}
• Paso 3 (Toppings y Jarabes): ${toppingsText}

¿Me confirman disponibilidad y tiempo para recoger en Patio Clavería? ¡Gracias! ✨`;
    return encodeURIComponent(message);
  };

  const WHATSAPP_ORDER_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${generateWhatsAppMessage()}`;

  return (
    <section id="como-funciona" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Header de la sección */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 inline-block mb-3">
          ¿Cómo Funciona?
        </span>
        <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-gray-900 tracking-tight">
          Arma tu Vaso en 3 Sencillos Pasos
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
          Tú decides los sabores, las combinaciones y la cantidad. Prueba tus combinaciones en vivo
          y pídela directo por WhatsApp.
        </p>
      </div>

      {/* Grid de los 3 Pasos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* PASO 1: ELIGE TU BASE */}
        <div className="bg-white rounded-3xl border border-rose-100 shadow-lg shadow-rose-950/5 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-100/70">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-rose-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="font-['Outfit'] font-black text-lg text-gray-900">
                  Elige tu Base
                </h3>
              </div>
              <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full">
                Fruta Fresca
              </span>
            </div>

            <div className="space-y-2.5">
              {BASES_LIST.map((base) => {
                const isSelected = selectedBase === base.id;
                return (
                  <button
                    key={base.id}
                    type="button"
                    onClick={() => setSelectedBase(base.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50/80 border-rose-500 shadow-xs ring-1 ring-rose-400'
                        : 'bg-white hover:bg-rose-50/30 border-gray-100 hover:border-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-1.5 rounded-xl bg-white border border-gray-100 shadow-2xs">
                        {base.icon}
                      </span>
                      <div>
                        <span className="font-bold text-sm text-gray-900 block">
                          {base.name}
                        </span>
                        <span className="text-xs text-gray-500 leading-tight block">
                          {base.desc}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-gray-500">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Fruta fresca lavada y desinfectada diariamente.</span>
          </div>
        </div>

        {/* PASO 2: ELIGE TU CREMA */}
        <div className="bg-white rounded-3xl border border-rose-100 shadow-lg shadow-rose-950/5 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-100/70">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-rose-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="font-['Outfit'] font-black text-lg text-gray-900">
                  Elige tu Crema
                </h3>
              </div>
              <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full">
                7 Opciones
              </span>
            </div>

            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {CREMAS_LIST.map((crema) => {
                const isSelected = selectedCrema === crema.id;
                return (
                  <button
                    key={crema.id}
                    type="button"
                    onClick={() => setSelectedCrema(crema.id)}
                    className={`w-full p-2.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50/80 border-rose-500 shadow-xs ring-1 ring-rose-400'
                        : 'bg-white hover:bg-rose-50/30 border-gray-100 hover:border-rose-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm text-gray-900">
                          {crema.name}
                        </span>
                        {crema.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-rose-100 text-rose-700">
                            {crema.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 leading-tight block mt-0.5">
                        {crema.desc}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-gray-500">
            <span className="text-rose-600 font-bold">★</span>
            <span>Recetas artesanales ultra cremosas.</span>
          </div>
        </div>

        {/* PASO 3: TOPPINGS Y JARABES */}
        <div className="bg-white rounded-3xl border border-rose-100 shadow-lg shadow-rose-950/5 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-100/70">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-rose-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                  3
                </span>
                <h3 className="font-['Outfit'] font-black text-lg text-gray-900">
                  Toppings y Jarabes
                </h3>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                {selectedToppings.length} elegidos
              </span>
            </div>

            {/* Categorías de Toppings */}
            <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-xl mb-3 overflow-x-auto no-scrollbar">
              {TOPPING_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveToppingTab(cat.id)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
                    activeToppingTab === cat.id
                      ? 'bg-white text-rose-600 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Lista de Toppings seleccionables */}
            <div className="flex flex-wrap gap-1.5 max-h-[280px] overflow-y-auto pr-1">
              {TOPPING_CATEGORIES.find((c) => c.id === activeToppingTab)?.items.map((item) => {
                const isSelected = selectedToppings.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleTopping(item)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                        : 'bg-white text-gray-700 hover:bg-rose-50 border-gray-200 hover:border-rose-200'
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected ? (
                      <Check className="w-3 h-3 stroke-[3]" />
                    ) : (
                      <span className="text-gray-400 font-bold">+</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Puedes elegir todos los que gustes.</span>
            {selectedToppings.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedToppings([])}
                className="text-rose-600 font-bold hover:underline"
              >
                Limpiar selección
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Resumen Interactivo y Botón de Pedido por WhatsApp */}
      <div className="mt-8 bg-gradient-to-r from-rose-50 via-white to-rose-50 rounded-3xl border border-rose-200 p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Detalles del pedido armado */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-rose-100 px-3 py-1 rounded-full">
                Tu Vaso Personalizado
              </span>
              
              {/* Selector de tamaño */}
              <div className="inline-flex p-0.5 bg-white border border-rose-200 rounded-full shadow-2xs">
                <button
                  type="button"
                  onClick={() => setSelectedSize('Mediano')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedSize === 'Mediano'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Mediano
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSize('Grande')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedSize === 'Grande'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grande
                </button>
              </div>
            </div>

            <p className="text-base sm:text-lg font-black font-['Outfit'] text-gray-900">
              {currentBaseName} con {currentCremaName}
            </p>

            <p className="text-xs sm:text-sm text-gray-600">
              <strong className="text-gray-800">Toppings ({selectedToppings.length}):</strong>{' '}
              {selectedToppings.length > 0 ? selectedToppings.join(', ') : 'Ninguno seleccionado'}
            </p>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto flex-col sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              title="Reiniciar selección"
              className="px-4 py-3 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all w-full sm:w-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>

            <a
              id="steps-cta-whatsapp"
              href={WHATSAPP_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span>Pedir este Vaso por WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};
