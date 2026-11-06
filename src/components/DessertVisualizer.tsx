import React from 'react';
import { Sparkles, Trash2, X } from 'lucide-react';
import { BaseOption, CremaOption, AderezoOption, ToppingOption, SizeConfig } from '../types';

interface DessertVisualizerProps {
  base: BaseOption | null;
  crema: CremaOption | null;
  aderezo: AderezoOption | null;
  toppings: ToppingOption[];
  sizeConfig: SizeConfig;
  totalPrice: number;
  onRemoveTopping: (toppingId: string) => void;
  onReset: () => void;
}

export const DessertVisualizer: React.FC<DessertVisualizerProps> = ({
  base,
  crema,
  aderezo,
  toppings,
  sizeConfig,
  totalPrice,
  onRemoveTopping,
  onReset,
}) => {
  return (
    <div
      id="dessert-visualizer-card"
      className="bg-white rounded-3xl p-6 shadow-xl shadow-rose-950/5 border border-rose-100 sticky top-24 backdrop-blur-md text-gray-900"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Simulador en Tiempo Real</span>
          </span>
          <h3 className="font-['Outfit'] font-black text-xl text-gray-900">
            Tu Creación Freséame 🍓
          </h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          title="Reiniciar postre"
          className="text-xs font-semibold text-gray-400 hover:text-rose-600 transition-colors flex items-center gap-1 p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer active:scale-95"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Visual Cup / Dish Stage */}
      <div className="my-5 relative rounded-2xl bg-gradient-to-b from-rose-50/50 via-white to-rose-50/30 p-5 border border-rose-100 overflow-hidden min-h-[250px] flex flex-col items-center justify-center shadow-inner">
        {/* Dynamic Visual Stacking */}
        {base ? (
          <div className="w-full max-w-[240px] flex flex-col items-center relative animate-in fade-in zoom-in duration-300">
            {/* Top Dressing Drizzle Bar */}
            {aderezo && (
              <div
                className="w-36 h-3 rounded-full shadow-xs mb-1 animate-pulse border border-white/40"
                style={{ backgroundColor: aderezo.color }}
                title={`Aderezo: ${aderezo.name}`}
              />
            )}

            {/* Crema Layer */}
            <div
              className="w-44 h-14 rounded-t-2xl border-2 border-rose-200 shadow-sm flex items-center justify-center relative overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: crema ? crema.color : '#FFF8F2',
                color: crema?.id === 'crema-chocolate' ? '#FFFFFF' : '#1F2937',
              }}
            >
              {crema ? (
                <div className="text-center px-2">
                  <span className="text-[11px] font-extrabold block leading-tight">
                    {crema.name}
                  </span>
                  <span className="text-[9px] opacity-75">{crema.texture}</span>
                </div>
              ) : (
                <span className="text-[11px] font-medium text-gray-400 italic">
                  + Elige tu crema
                </span>
              )}
            </div>

            {/* Base Layer */}
            <div
              className="w-40 h-28 rounded-b-3xl border-2 border-rose-400 shadow-md flex flex-col items-center justify-center p-3 text-center transition-all duration-300 text-white relative -mt-1"
              style={{ backgroundColor: base.color }}
            >
              <span className="text-3xl mb-1 filter drop-shadow-xs">{base.icon}</span>
              <span className="text-xs font-black tracking-wide leading-tight drop-shadow-xs">
                {base.name}
              </span>
              <span className="text-[10px] opacity-90 mt-0.5 font-medium">
                {sizeConfig.name} ({sizeConfig.label})
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center p-6 flex flex-col items-center text-gray-400">
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 shadow-inner flex items-center justify-center text-3xl mb-3">
              🍓
            </div>
            <p className="text-sm font-bold text-gray-800">Comienza eligiendo tu base</p>
            <p className="text-xs text-gray-500 max-w-[200px] mt-1">
              Fresas frescas, duraznos, waffles y más en el paso 1.
            </p>
          </div>
        )}

        {/* Aderezo Badge floating on stage */}
        {aderezo && (
          <div className="absolute top-2 right-2 px-2.5 py-1 rounded-xl bg-white/95 border border-rose-100 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-gray-700">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: aderezo.color }}
            />
            <span>{aderezo.name}</span>
          </div>
        )}
      </div>

      {/* Selected Ingredients Breakdown List */}
      <div className="space-y-2.5">
        {/* Base Item */}
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100">
          <span className="text-gray-600 font-semibold flex items-center gap-1.5">
            <span>🍓</span> Base:
          </span>
          <span className="font-bold text-gray-900">
            {base ? base.name : <span className="text-gray-400 font-normal">Sin seleccionar</span>}
          </span>
        </div>

        {/* Crema Item */}
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100">
          <span className="text-gray-600 font-semibold flex items-center gap-1.5">
            <span>🥛</span> Crema:
          </span>
          <span className="font-bold text-gray-900">
            {crema ? crema.name : <span className="text-gray-400 font-normal">Sin seleccionar</span>}
          </span>
        </div>

        {/* Aderezo Item */}
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100">
          <span className="text-gray-600 font-semibold flex items-center gap-1.5">
            <span>🍯</span> Aderezo:
          </span>
          <span className="font-bold text-gray-900">
            {aderezo ? aderezo.name : <span className="text-gray-400 font-normal">Sin seleccionar</span>}
          </span>
        </div>

        {/* Toppings Chips list */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-600 font-semibold flex items-center gap-1.5">
              <span>🍫</span> Toppings ({toppings.length}):
            </span>
            <span className="text-[11px] font-bold text-emerald-600">
              {toppings.length >= 2 ? '¡Listo para pedir!' : 'Elige al menos 2'}
            </span>
          </div>

          {toppings.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No has seleccionado toppings aún.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
              {toppings.map((t) => (
                <span
                  key={t.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold shadow-2xs group"
                >
                  <span>{t.emoji}</span>
                  <span>{t.name}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveTopping(t.id)}
                    className="ml-1 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title={`Quitar ${t.name}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing and Size Summary Footer */}
      <div className="mt-5 pt-4 border-t-2 border-dashed border-rose-100">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>Tamaño seleccionado:</span>
          <span className="font-bold text-rose-600">{sizeConfig.name} ({sizeConfig.label})</span>
        </div>
        <div className="flex items-center justify-between items-baseline mt-2">
          <div>
            <span className="text-xs text-gray-500 block font-semibold">Total estimado</span>
            <span className="text-[10px] text-gray-400">Precios transparentes MXN</span>
          </div>
          <span className="font-['Outfit'] font-black text-2xl sm:text-3xl text-gray-900">
            ${totalPrice} <span className="text-sm font-bold text-gray-500">MXN</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DessertVisualizer;
