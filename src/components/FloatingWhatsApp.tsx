import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/freseameData';

interface FloatingWhatsAppProps {
  toppingsCount?: number;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ toppingsCount = 0 }) => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 select-none font-['Outfit']">
      {/* Tooltip en Crema con borde Rosa Fresa */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FFF7EE] border border-[#F4B8C7] text-xs font-bold text-[#4A2638]">
          <span className="text-base" aria-hidden="true">🍓</span>
          <span>¿Qué se te antoja hoy? ¡Escríbenos por WhatsApp!</span>
          <button
            type="button"
            onClick={() => setTooltipDismissed(true)}
            className="text-[#4A2638]/60 hover:text-[#B73E5B] transition-colors ml-1 p-0.5 rounded-md cursor-pointer"
            title="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Botón flotante en Frambuesa */}
      <a
        id="floating-whatsapp-action-btn"
        href={`https://wa.me/${WHATSAPP_PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp para pedir postres de Freséame"
        className="w-14 h-14 rounded-full bg-[#B73E5B] hover:bg-[#9E324C] text-white flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 relative cursor-pointer group"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4B8C7] opacity-40 -z-10" />

        <MessageCircle className="w-7 h-7 text-white" />

        {toppingsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#4A2638] text-[#FFF7EE] text-[10px] font-bold flex items-center justify-center border-2 border-[#FFF7EE]">
            {toppingsCount}
          </span>
        )}
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
