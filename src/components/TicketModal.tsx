import React, { useState } from 'react';
import {
  X,
  Download,
  MessageCircle,
  Camera,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import logoImg from '../logo.jpg';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  folio: string;
  sizeName: string;
  sizeLabel: string;
  baseName: string;
  cremaName: string;
  aderezoName: string;
  toppings: Array<{ id: string; name: string; emoji: string }>;
  notes?: string;
  total: number;
  pdfUrl: string | null;
  onDownloadPdfAgain: () => void;
  isDownloadingPdf?: boolean;
  whatsAppUrl: string;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  folio,
  sizeName,
  sizeLabel,
  baseName,
  cremaName,
  aderezoName,
  toppings,
  notes,
  total,
  pdfUrl,
  onDownloadPdfAgain,
  isDownloadingPdf = false,
  whatsAppUrl,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleLocalDownloadAgain = () => {
    // Si ya existe el Blob URL en memoria, disparar la descarga de forma sincrónica con el click
    if (pdfUrl) {
      try {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `Comprobante_Freseame_${folio.replace(/[^a-zA-Z0-9_-]/g, '')}.pdf`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          try {
            if (document.body.contains(link)) {
              document.body.removeChild(link);
            }
          } catch (_) {}
        }, 1000);
      } catch (err) {
        console.warn('Error en click directo de descarga:', err);
      }
    }
    // Re-ejecutar generación/descarga completa
    onDownloadPdfAgain();
  };

  if (!isOpen) return null;

  return (
    <div
      id="ticket-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#FF4B8B] to-[#FF6B9D] px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🍓</span>
            <div>
              <h2 id="ticket-modal-title" className="font-['Outfit'] font-black text-base sm:text-lg leading-tight">
                Comprobante de Pedido Generado
              </h2>
              <span className="text-[11px] text-pink-100 font-medium">
                Listo para presentar en barra al recoger
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-4">
          
          {/* Important Callout Badge: Screenshot / Save notice */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <span>Respaldo Inmediato</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-200 text-[10px]">Importante</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-amber-950 leading-snug">
                ¡Puedes tomarle captura de pantalla a este comprobante o volver a descargarlo!
              </p>
              <p className="text-[11px] text-amber-800 leading-tight">
                No requieres imprimir nada en papel; solo muestra este comprobante o tu folio al llegar.
              </p>
            </div>
          </div>

          {/* Thermal Boutique Digital Ticket */}
          <div
            id="ticket-en-pantalla"
            className="rounded-2xl bg-[#FFFDF9] border-2 border-dashed border-stone-300 p-4 sm:p-5 relative shadow-inner font-mono text-xs text-[#2B1A24]"
          >
            {/* Ticket Notches */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-stone-300 pointer-events-none" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-stone-300 pointer-events-none" />

            {/* Logo & Brand Header */}
            <div className="text-center pb-3 border-b border-stone-200 space-y-1.5">
              <div className="flex justify-center">
                {!imgError ? (
                  <img
                    src={logoImg || './logo.jpg'}
                    alt="Freséame"
                    className="h-12 w-12 rounded-full object-cover border-2 border-pink-200 shadow-xs"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center text-2xl">
                    🍓
                  </div>
                )}
              </div>

              <div className="font-['Outfit'] font-black text-xl text-[#FF4B8B] tracking-tight">
                FRESÉAME 🍓
              </div>

              {/* Folio Destacado en Grande */}
              <div className="py-1.5 px-4 bg-pink-50 rounded-2xl inline-block border border-pink-200">
                <span className="text-[11px] font-bold text-stone-500 block uppercase tracking-wider">
                  Folio de Orden
                </span>
                <span className="font-['Outfit'] font-black text-2xl sm:text-3xl text-[#FF4B8B] tracking-wider block">
                  #{folio}
                </span>
              </div>
            </div>

            {/* Branch & Mode Badge */}
            <div className="py-2.5 border-b border-stone-200 text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-black">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>Servicio Pick-Up en Sucursal Patio Clavería</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#2B1A24] font-sans leading-snug">
                Pasa a recoger en Sucursal Patio Clavería (junto a McCarthy's) de 11:00 AM a 11:00 PM.
              </p>
              <div className="text-[10px] text-stone-500 font-sans">
                Calle Egipto 142, Col. Clavería, Azcapotzalco, CDMX
              </div>
            </div>

            {/* Status Line */}
            <div className="py-2 px-3 my-2 rounded-xl bg-amber-100/70 border border-amber-300 text-center font-sans">
              <span className="font-black text-amber-950 text-xs block">
                ORDEN REGISTRADA • PAGO AL RECOGER EN CAJA
              </span>
              <span className="text-[10px] text-amber-800 block">
                Aceptamos efectivo, tarjeta de débito/crédito y transferencias
              </span>
            </div>

            {/* Dessert Recipe Breakdown */}
            <div className="py-2 space-y-2 text-xs font-sans">
              <div className="flex justify-between items-center py-0.5 border-b border-stone-100">
                <span className="text-stone-500">Tamaño:</span>
                <span className="font-bold text-[#2B1A24]">{sizeName} ({sizeLabel})</span>
              </div>

              <div className="flex justify-between items-center py-0.5 border-b border-stone-100">
                <span className="text-stone-500">🍓 Base:</span>
                <span className="font-bold text-[#2B1A24]">{baseName}</span>
              </div>

              <div className="flex justify-between items-center py-0.5 border-b border-stone-100">
                <span className="text-stone-500">🥛 Crema de la Casa:</span>
                <span className="font-black text-[#FF4B8B]">{cremaName}</span>
              </div>

              <div className="flex justify-between items-center py-0.5 border-b border-stone-100">
                <span className="text-stone-500">🍯 Aderezo:</span>
                <span className="font-bold text-[#2B1A24]">{aderezoName}</span>
              </div>

              <div className="py-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-stone-500">🍫 Toppings ({toppings.length}):</span>
                  <span className="text-[10px] font-bold text-teal-700">Barra libre en sucursal</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {toppings.map((t) => (
                    <span
                      key={t.id}
                      className="px-2 py-0.5 rounded-md bg-stone-200/70 text-[#2B1A24] text-[11px] font-semibold"
                    >
                      {t.emoji} {t.name}
                    </span>
                  ))}
                </div>
              </div>

              {notes && notes.trim() && (
                <div className="p-2 rounded-lg bg-stone-100 text-[11px] text-stone-700 italic">
                  <strong>Nota:</strong> "{notes.trim()}"
                </div>
              )}
            </div>

            {/* Total Section */}
            <div className="pt-2.5 mt-2 border-t-2 border-dashed border-stone-300 flex justify-between items-baseline font-sans">
              <div>
                <span className="font-black text-xs text-[#2B1A24] block uppercase">
                  Total a pagar en mostrador
                </span>
                <span className="text-[10px] text-stone-400">
                  IVA Incluido • Sin cargos ocultos
                </span>
              </div>
              <span className="font-['Outfit'] font-black text-2xl text-[#FF4B8B]">
                ${total} MXN
              </span>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="space-y-2.5 pt-2 font-sans">
            {/* Botón 2: 🟢 Enviar orden por WhatsApp */}
            <a
              id="ticket-modal-whatsapp-btn"
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1eb855] hover:from-[#1eb855] hover:to-[#199d49] text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 text-center transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>Enviar orden por WhatsApp</span>
            </a>

            {/* Botón 1: 📄 Volver a descargar PDF */}
            <div className="flex gap-2">
              <button
                type="button"
                id="ticket-modal-pdf-btn"
                onClick={handleLocalDownloadAgain}
                disabled={isDownloadingPdf}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#FF4B8B] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-rose-200 transition-colors cursor-pointer disabled:opacity-60"
              >
                {isDownloadingPdf ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#FF4B8B] border-t-transparent rounded-full animate-spin" />
                    <span>Generando PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Volver a descargar PDF</span>
                  </>
                )}
              </button>

              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-stone-200 transition-colors"
                  title="Abrir PDF en pestaña nueva"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Ver PDF</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-center text-xs text-stone-500 hover:text-stone-800 font-semibold transition-colors cursor-pointer"
            >
              Volver al personalizador
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
