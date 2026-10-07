import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/freseameData';
import { CempasuchilIcon } from './DiaDeMuertosDecorations';

interface FloatingWhatsAppProps {
  toppingsCount: number;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ toppingsCount }) => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Friendly Tooltip Bubble */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#1A1228]/95 border-2 border-[#FF8F00]/40 shadow-xl text-xs font-bold text-[#FFFDF7] animate-in fade-in slide-in-from-right duration-300 backdrop-blur-md">
          <CempasuchilIcon size={14} className="text-[#FF8F00]" />
          <span>🍓 ¿Antojo de fresas? ¡Escríbenos!</span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-stone-400 hover:text-white transition-colors ml-1 p-0.5 rounded-md"
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
        aria-label="Abrir WhatsApp para pedir postres"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-2xl emerald-glow transition-all transform hover:scale-105 active:scale-95 touch-manipulation relative cursor-pointer group"
      >
        {/* Animated Ripple Pulse */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-35 group-hover:opacity-60 -z-10" />

        <MessageCircle className="w-7 h-7 fill-white" />

        {/* Dynamic Badge if items selected */}
        {toppingsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF6F00] text-[#0D0914] text-[10px] font-black flex items-center justify-center shadow-md border-2 border-[#FFD54F]">
            {toppingsCount}
          </span>
        )}
      </a>
    </div>
  );
};
