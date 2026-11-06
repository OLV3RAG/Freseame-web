import React, { useState } from 'react';
import { Bike } from 'lucide-react';

interface DeliveryComingSoonProps {
  className?: string;
  variant?: 'banner' | 'card';
}

export const DeliveryComingSoon: React.FC<DeliveryComingSoonProps> = ({
  className = '',
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAppClick = (appName: string) => {
    setToastMessage(`¡Estamos afinando los detalles con ${appName}! Muy pronto activaremos los pedidos directos.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div
      id="delivery-proximamente"
      className={`relative overflow-hidden rounded-3xl border border-rose-100 bg-white p-6 sm:p-8 shadow-md text-gray-900 ${className}`}
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Text info */}
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold uppercase tracking-wider text-rose-700">
            <Bike className="w-3.5 h-3.5 text-rose-600" />
            <span>Servicio a Domicilio</span>
          </div>

          <h3 className="font-['Outfit'] font-black text-xl sm:text-2xl text-gray-900 leading-tight">
            ¿Prefieres entrega a domicilio? <span className="text-rose-600">Muy pronto en Rappi y Uber Eats.</span>
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
            Estamos integrando nuestras plataformas de delivery para que disfrutes tus fresas con crema artesanal directo en tu puerta. Por ahora, te esperamos con nuestro servicio <strong>Pick-Up Express sin filas</strong> en Plaza Patio Clavería.
          </p>
        </div>

        {/* Buttons / Badges */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleAppClick('Rappi')}
            className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-orange-50 hover:bg-orange-100 text-[#FF441F] font-bold text-xs border border-orange-200 shadow-2xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span>Rappi</span>
            <span className="text-[10px] bg-orange-200/60 px-2 py-0.5 rounded-full uppercase">Pronto</span>
          </button>

          <button
            type="button"
            onClick={() => handleAppClick('Uber Eats')}
            className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-[#06C167] font-bold text-xs border border-emerald-200 shadow-2xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span>Uber Eats</span>
            <span className="text-[10px] bg-emerald-200/60 px-2 py-0.5 rounded-full uppercase">Pronto</span>
          </button>
        </div>
      </div>

      {/* Floating feedback toast */}
      {toastMessage && (
        <div className="mt-4 p-3 rounded-xl bg-rose-600 text-white text-xs font-medium animate-in fade-in slide-in-from-bottom duration-200 shadow-lg text-center">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default DeliveryComingSoon;
