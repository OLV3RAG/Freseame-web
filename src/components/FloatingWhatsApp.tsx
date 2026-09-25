import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/freseameData';

interface FloatingWhatsAppProps {
  toppingsCount: number;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ toppingsCount }) => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      '¡Hola Freséame! 🍓 Vi su página web y se me antojó un postre. ¿Me comparten su menú y promociones del día?'
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Friendly Tooltip Bubble */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#2B1A24]/10 shadow-xl text-xs font-bold text-[#2B1A24] animate-in fade-in slide-in-from-right duration-300">
          <span>🍓 ¿Antojo de fresas? ¡Escríbenos!</span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-stone-400 hover:text-stone-600 transition-colors ml-1 p-0.5 rounded-md"
            title="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-action-btn"
        href="https://wa.me/527731727582"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp para pedir postres"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 relative cursor-pointer group"
      >
        {/* Animated Ripple Pulse */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-35 group-hover:opacity-60 -z-10" />

        <MessageCircle className="w-7 h-7 fill-white" />

        {/* Dynamic Badge if items selected */}
        {toppingsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF4B8B] text-white text-[10px] font-black flex items-center justify-center shadow-md border-2 border-white">
            {toppingsCount}
          </span>
        )}
      </a>
    </div>
  );
};
