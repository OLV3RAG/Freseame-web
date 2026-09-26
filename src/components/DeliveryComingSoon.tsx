import React, { useState } from 'react';
import { Bike, Sparkles, Clock, AlertCircle } from 'lucide-react';

interface DeliveryComingSoonProps {
  className?: string;
  variant?: 'banner' | 'card';
}

export const DeliveryComingSoon: React.FC<DeliveryComingSoonProps> = ({
  className = '',
  variant = 'banner',
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAppClick = (appName: string) => {
    setToastMessage(`¡Estamos afinando los detalles con ${appName}! Muy pronto activaremos los enlaces para pedidos directos.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div
      id="delivery-proximamente"
      className={`relative overflow-hidden rounded-3xl border border-stone-200/80 bg-gradient-to-br from-stone-50 via-white to-pink-50/40 p-6 sm:p-8 shadow-sm ${className}`}
    >
      {/* Decorative background glow */}
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-pink-200/30 blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-teal-100/40 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Text info */}
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/70 border border-pink-200 text-xs font-black uppercase tracking-wider text-[#FF4B8B]">
            <Bike className="w-3.5 h-3.5 text-[#FF4B8B]" />
            <span>Servicio a Domicilio</span>
          </div>

          <h3 className="font-['Outfit'] font-black text-xl sm:text-2xl text-[#2B1A24] leading-tight">
            ¿Prefieres entrega a domicilio? <span className="text-[#FF4B8B]">Muy pronto encuéntranos en Rappi y Uber Eats.</span>
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            Estamos integrando nuestras plataformas de delivery para que disfrutes tus fresas con crema artesanal directo en tu puerta. Por ahora, te esperamos con nuestro servicio <strong>Pick-Up Express sin filas</strong> en Plaza Patio Clavería.
          </p>
        </div>

        {/* Brand App Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          {/* Rappi Button */}
          <button
            type="button"
            onClick={() => handleAppClick('Rappi')}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-stone-50 text-[#2B1A24] border border-stone-200/90 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            title="Rappi - Próximamente"
          >
            <img
              src="./rappi-logo.png"
              alt="Rappi"
              className="h-8 w-auto max-w-[80px] object-contain"
              onError={(e) => {
                // fallback
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="text-left">
              <div className="font-['Outfit'] font-black text-sm tracking-wide leading-none text-[#FF441F]">
                Rappi
              </div>
              <div className="text-[10px] text-stone-400 font-bold mt-0.5">
                Delivery Oficial
              </div>
            </div>
            <span className="ml-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-wider">
              Próximamente
            </span>
          </button>

          {/* Uber Eats Button */}
          <button
            type="button"
            onClick={() => handleAppClick('Uber Eats')}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-stone-50 text-[#2B1A24] border border-stone-200/90 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            title="Uber Eats - Próximamente"
          >
            <img
              src="./ubereats-logo.png"
              alt="Uber Eats"
              className="h-8 w-auto max-w-[85px] object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="text-left">
              <div className="font-['Outfit'] font-black text-sm tracking-wide leading-none text-[#06C167]">
                Uber Eats
              </div>
              <div className="text-[10px] text-stone-400 font-bold mt-0.5">
                Delivery Oficial
              </div>
            </div>
            <span className="ml-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
              Próximamente
            </span>
          </button>
        </div>
      </div>

      {/* Floating click feedback */}
      {toastMessage && (
        <div className="mt-4 p-3 rounded-2xl bg-stone-900 text-white text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
