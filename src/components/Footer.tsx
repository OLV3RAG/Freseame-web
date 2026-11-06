import React from 'react';
import {
  MapPin,
  Clock,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Heart,
} from 'lucide-react';
import { WHATSAPP_UNIVERSAL_URL, WHATSAPP_DISPLAY } from '../data/freseameData';

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-white border-t border-rose-100/80 pt-14 pb-8 px-4 sm:px-6 lg:px-8 text-gray-600 mt-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid responsivo de 4 columnas (1 en móvil, 2 en tablet, 4 en desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-rose-100">
          
          {/* =======================================================
              COLUMNA 1 (Marca e Identidad)
             ======================================================= */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Freséame"
                className="h-11 w-11 rounded-2xl object-cover border border-rose-200/80 shadow-xs shrink-0"
              />
              <div>
                <h3 className="font-['Outfit'] font-black text-2xl text-gray-900 tracking-tight flex items-center gap-1.5 leading-none">
                  Freséame
                  <span className="text-rose-600 text-xl">🍓</span>
                </h3>
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-rose-500 block mt-1">
                  EL LÍMITE LO PONES TÚ
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              El postre perfecto preparado al momento: fresas frescas seleccionadas, 7 cremas artesanales de receta secreta y barra libre con tus toppings favoritos.
            </p>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100/80 text-rose-600 text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>✨ Frescura y calidad garantizada</span>
              </span>
            </div>
          </div>

          {/* =======================================================
              COLUMNA 2 (Sucursal y Horarios)
             ======================================================= */}
          <div className="space-y-3.5">
            <h4 className="font-['Outfit'] font-black text-base text-gray-900 tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Sucursales y Horarios</span>
            </h4>

            <div className="space-y-3">
              {/* Sucursal 1: Puerta Tlatelolco */}
              <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-rose-100 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-gray-900 text-xs sm:text-sm">Puerta Tlatelolco</span>
                  <span className="text-[9px] bg-rose-600 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                    NUEVA
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 leading-snug">
                  1er piso frente a Walmart
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-600 pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>Lunes a Domingo 11:00 AM – 10:00 PM</span>
                </div>
              </div>

              {/* Sucursal 2: Plaza Patio Clavería */}
              <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-rose-100 shadow-2xs space-y-1.5">
                <span className="font-bold text-gray-900 text-xs sm:text-sm block">Plaza Patio Clavería</span>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Zona central junto a McCarthy's
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-600 pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>Lunes a Domingo 11:00 AM – 11:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* =======================================================
              COLUMNA 3 (Modalidad de Entrega)
             ======================================================= */}
          <div className="space-y-3.5">
            <h4 className="font-['Outfit'] font-black text-base text-gray-900 tracking-wide flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Modalidad de Entrega</span>
            </h4>

            <div className="space-y-3">
              {/* Pick-Up en Mostrador */}
              <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-rose-100 shadow-2xs space-y-1">
                <span className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-1">
                  <span>🛍️</span> Pick-Up en Mostrador
                </span>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Arma tu pedido en línea, genera tu folio digital y recógelo listo sin filas.
                </p>
              </div>

              {/* Delivery a Domicilio */}
              <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-rose-100 shadow-2xs space-y-1.5">
                <span className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-1">
                  <span>🛵</span> Delivery a Domicilio
                </span>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Cobertura local con entrega directa en nuestras apps oficiales:
                </p>
                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href="https://www.rappi.com.mx/restaurantes/search?query=Freseame"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF441F] hover:bg-[#e03a19] text-white text-[10px] font-black uppercase transition-colors"
                  >
                    Rappi
                  </a>
                  <a
                    href="https://www.ubereats.com/search?q=Freseame"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black hover:bg-stone-900 text-white text-[10px] font-black uppercase transition-colors"
                  >
                    <span className="text-[#06C167] font-black">●</span> Uber Eats
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* =======================================================
              COLUMNA 4 (Contacto Directo)
             ======================================================= */}
          <div className="space-y-3.5">
            <h4 className="font-['Outfit'] font-black text-base text-gray-900 tracking-wide flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Contacto Directo</span>
            </h4>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              ¿Dudas, pedidos especiales para eventos o consulta de ingredientes? Escríbenos directamente:
            </p>

            <a
              id="footer-whatsapp-btn"
              href={WHATSAPP_UNIVERSAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[46px] py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>

            <span className="text-[11px] text-gray-500 block text-center font-medium">
              Respuesta rápida en horario de sucursal
            </span>
          </div>

        </div>

        {/* =======================================================
            5. COPYRIGHT INFERIOR
           ======================================================= */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 text-center sm:text-left font-medium">
          <p>© 2026 NovaArc Tech. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>para los amantes de las fresas en CDMX</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
