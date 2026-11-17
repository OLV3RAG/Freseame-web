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
    <footer
      id="contacto"
      className="bg-[#4A2638] border-t border-[#F4B8C7]/30 pt-14 pb-8 px-4 sm:px-6 lg:px-8 text-[#FFF7EE] font-['Outfit'] mt-auto"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Grid responsivo de 4 columnas (1 en móvil, 2 en tablet, 4 en desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#F4B8C7]/20">
          
          {/* =======================================================
              COLUMNA 1 (Marca e Identidad)
             ======================================================= */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              {/* Área de seguridad >= 10% sin bordes, sombras ni degradados */}
              <div className="p-1.5 bg-[#FFF7EE] rounded-2xl shrink-0">
                <img
                  src="/logo.jpg"
                  alt="Freséame"
                  className="h-10 w-10 rounded-xl object-contain block"
                />
              </div>
              <div>
                <h3 className="font-['DynaPuff'] font-bold text-2xl text-[#FFF7EE] flex items-center gap-1.5 leading-none">
                  <span>Freséame</span>
                  <span className="text-xl" aria-hidden="true">🍓</span>
                </h3>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#F4B8C7] block mt-1.5">
                  EL LÍMITE LO PONES TÚ
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FFF7EE]/90 leading-relaxed font-normal">
              ¿Una cucharadita? Eso dijiste hace tres. El postre perfecto preparado al momento: fresas frescas seleccionadas, 7 cremas artesanales de receta secreta y barra libre con tus toppings favoritos.
            </p>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CDE5DA] text-[#4A2638] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#4A2638]" />
                <span>Frescura y calidad garantizada</span>
              </span>
            </div>
          </div>

          {/* =======================================================
              COLUMNA 2 (Sucursales y Horarios)
             ======================================================= */}
          <div className="space-y-3.5">
            <h4 className="font-['DynaPuff'] font-bold text-base text-[#FFF7EE] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F4B8C7] shrink-0" />
              <span>Sucursales y Horarios</span>
            </h4>

            <div className="space-y-3">
              {/* Sucursal 1: Puerta Tlatelolco */}
              <div className="p-3.5 rounded-2xl bg-[#3B1D2C] border border-[#F4B8C7]/25 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-['DynaPuff'] font-bold text-[#FFF7EE] text-xs sm:text-sm">
                    Puerta Tlatelolco
                  </span>
                  <span className="text-[10px] bg-[#B73E5B] text-white font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    NUEVA
                  </span>
                </div>
                <p className="text-xs text-[#F4B8C7] leading-snug font-normal">
                  1er piso frente a Walmart
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#CDE5DA] pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#CDE5DA] shrink-0" />
                  <span>Lunes a Domingo 11:00 AM – 10:00 PM</span>
                </div>
              </div>

              {/* Sucursal 2: Plaza Patio Clavería */}
              <div className="p-3.5 rounded-2xl bg-[#3B1D2C] border border-[#F4B8C7]/25 space-y-1.5">
                <span className="font-['DynaPuff'] font-bold text-[#FFF7EE] text-xs sm:text-sm block">
                  Plaza Patio Clavería
                </span>
                <p className="text-xs text-[#F4B8C7] leading-snug font-normal">
                  Zona central junto a McCarthy's
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#CDE5DA] pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#CDE5DA] shrink-0" />
                  <span>Lunes a Domingo 11:00 AM – 11:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* =======================================================
              COLUMNA 3 (Modalidad de Entrega)
             ======================================================= */}
          <div className="space-y-3.5">
            <h4 className="font-['DynaPuff'] font-bold text-base text-[#FFF7EE] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#F4B8C7] shrink-0" />
              <span>Modalidad de Entrega</span>
            </h4>

            <div className="space-y-3">
              {/* Pick-Up en Mostrador */}
              <div className="p-3.5 rounded-2xl bg-[#3B1D2C] border border-[#F4B8C7]/25 space-y-1">
                <span className="font-bold text-[#FFF7EE] text-xs sm:text-sm flex items-center gap-1.5">
                  <span>🛍️</span> Pick-Up en Mostrador
                </span>
                <p className="text-xs text-[#F4B8C7] leading-snug font-normal">
                  Arma tu pedido en línea, genera tu folio digital y recógelo listo sin filas.
                </p>
              </div>

              {/* Delivery a Domicilio */}
              <div className="p-3.5 rounded-2xl bg-[#3B1D2C] border border-[#F4B8C7]/25 space-y-2">
                <span className="font-bold text-[#FFF7EE] text-xs sm:text-sm flex items-center gap-1.5">
                  <span>🛵</span> Delivery a Domicilio
                </span>
                <p className="text-xs text-[#F4B8C7] leading-snug font-normal">
                  Cobertura local con entrega directa en nuestras apps oficiales:
                </p>
                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href="https://www.rappi.com.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF441F] hover:bg-[#e03a19] text-white text-[10px] font-bold uppercase transition-colors"
                  >
                    Rappi
                  </a>
                  <a
                    href="https://www.ubereats.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#5C3147] hover:bg-[#6D3B54] text-[#FFF7EE] border border-[#F4B8C7]/30 text-[10px] font-bold uppercase transition-colors"
                  >
                    <span className="text-[#CDE5DA] font-bold">●</span> Uber Eats
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* =======================================================
              COLUMNA 4 (Contacto Directo)
             ======================================================= */}
          <div className="space-y-3.5">
            <h4 className="font-['DynaPuff'] font-bold text-base text-[#FFF7EE] flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#F4B8C7] shrink-0" />
              <span>Contacto Directo</span>
            </h4>

            <p className="text-xs sm:text-sm text-[#FFF7EE]/90 leading-relaxed font-normal">
              ¿Qué se te antoja hoy? Escríbenos por dudas, eventos especiales o consulta de ingredientes:
            </p>

            <a
              id="footer-whatsapp-btn"
              href={WHATSAPP_UNIVERSAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[46px] py-3 px-4 rounded-2xl bg-[#B73E5B] hover:bg-[#9E324C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4 text-white shrink-0" />
              <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>

            <span className="text-[11px] text-[#F4B8C7] block text-center font-normal">
              Respuesta rápida en horario de sucursal
            </span>
          </div>

        </div>

        {/* =======================================================
            5. COPYRIGHT INFERIOR
           ======================================================= */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F4B8C7] text-center sm:text-left font-normal">
          <p>© 2026 NovaArc Tech. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1.5 text-[#FFF7EE]/90">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 fill-[#F4B8C7] text-[#F4B8C7]" />
            <span>para los amantes de las fresas en CDMX</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
