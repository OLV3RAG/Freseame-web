import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/freseameData';

interface FloatingWhatsAppProps {
  toppingsCount?: number;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ toppingsCount = 0 }) => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 select-none">
      {/* Friendly Tooltip Bubble */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-rose-100 shadow-xl text-xs font-bold text-gray-800 animate-in fade-in slide-in-from-right duration-300">
          <span className="text-base">🍓</span>
          <span>¿Antojo de fresas? ¡Escríbenos por WhatsApp!</span>
          <button
            type="button"
            onClick={() => setTooltipDismissed(true)}
            className="text-gray-400 hover:text-gray-700 transition-colors ml-1 p-0.5 rounded-md cursor-pointer"
            title="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-action-btn"
        href={`https://wa.me/${WHATSAPP_PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp para pedir postres de Freséame"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 relative cursor-pointer group"
      >
        {/* Animated Ripple Pulse */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 group-hover:opacity-50 -z-10" />

        <MessageCircle className="w-7 h-7 fill-white" />

        {/* Dynamic Badge if items selected */}
        {toppingsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shadow-md border-2 border-white">
            {toppingsCount}
          </span>
        )}
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
