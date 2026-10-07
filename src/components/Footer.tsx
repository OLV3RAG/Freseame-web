import React, { useState } from 'react';
import { MapPin, Clock, MessageCircle, ExternalLink, Navigation, ShoppingBag, Sparkles, Heart } from 'lucide-react';
import { WHATSAPP_DEFAULT_URL, STORE_LOCATION, WHATSAPP_DISPLAY } from '../data/freseameData';
import logoImg from '../logo.jpg';
import { CempasuchilIcon, CalaveritaIcon, VeladoraIcon } from './DiaDeMuertosDecorations';

export const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-[#0A0710] text-stone-300 pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-[#FF8F00]/30 relative overflow-hidden">
      {/* Background ofrenda and candle ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF6F00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-4 left-10 w-80 h-80 bg-[#6A1B9A]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Veladora motifs in background */}
      <div className="absolute bottom-6 right-6 opacity-25 pointer-events-none flex items-center gap-4">
        <VeladoraIcon size={32} className="animate-pulse" />
        <CempasuchilIcon size={28} className="text-[#FF8F00]" />
        <VeladoraIcon size={24} className="animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-white/10">
          
          {/* Columna 1: Marca e Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {!logoError ? (
                <img
                  src={logoImg || './logo.jpg'}
                  alt="Freséame - Fresas con Crema Artesanales"
                  width="44"
                  height="44"
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#FF8F00]/60 shadow-xs"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-orange-950/80 border border-[#FF8F00] flex items-center justify-center text-xl">
                  🍓
                </div>
              )}
              <div>
                <h3 className="font-['Outfit'] font-black text-2xl text-[#FFFDF7] tracking-tight flex items-center gap-1.5">
                  Freséame
                  <span className="text-[#FF4B8B]">🍓</span>
                  <CempasuchilIcon size={18} className="text-[#FF8F00]" />
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD54F] block">
                  El límite lo pones tú
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              El postre perfecto preparado al momento: fresas frescas seleccionadas, 7 cremas artesanales de receta secreta y barra libre con tus toppings favoritos.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#FFD54F] bg-[#1A1228] px-3 py-1.5 rounded-xl border border-[#FF8F00]/30 w-fit">
              <CalaveritaIcon size={14} />
              <span>Tradición, frescura y calidad garantizada</span>
            </div>
          </div>

          {/* Columna 2: Sucursal y Horarios */}
          <div className="space-y-3.5">
            <h4 className="font-['Outfit'] font-black text-base text-white tracking-wide flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FF8F00]" />
              <span>Sucursal y Horarios</span>
            </h4>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="text-stone-300">
                <span className="font-bold text-white block text-sm">Plaza Patio Clavería</span>
                <span className="text-stone-400">En la zona central, justo junto a McCarthy's Irish Pub.</span>
              </div>

              <div className="flex items-start gap-2 pt-1 text-stone-300">
                <Clock className="w-4 h-4 text-[#FFD54F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Lunes a Domingo</span>
                  <span className="text-stone-400">11:00 AM a 11:00 PM (Horario continuo)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={STORE_LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#FF6F00] hover:text-[#0D0914] text-white text-xs font-bold transition-all border border-white/10 hover:border-transparent active:scale-95 touch-manipulation cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 shrink-0" />
                <span>Cómo llegar en Google Maps</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          {/* Columna 3: Modalidad de Entrega */}
          <div className="space-y-3.5">
            <h4 className="font-['Outfit'] font-black text-base text-white tracking-wide flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-[#FF8F00]" />
              <span>Modalidad de Entrega</span>
            </h4>

            <div className="space-y-2 text-xs sm:text-sm text-stone-400">
              <div className="p-2.5 rounded-xl bg-[#1A1228] border border-white/5">
                <span className="font-bold text-white block mb-0.5">🛍️ Pick-Up en Mostrador</span>
                <span>Arma tu pedido en línea, genera tu folio digital y recógelo listo sin filas.</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#1A1228] border border-white/5">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-bold text-white">🛵 Delivery a Domicilio</span>
                  <span className="text-[10px] bg-[#FF8F00]/20 text-[#FFD54F] border border-[#FF8F00]/30 px-1.5 py-0.5 rounded font-bold uppercase">
                    Próximamente
                  </span>
                </div>
                <span>Disponible muy pronto con cobertura local a través de <strong>Rappi</strong> y <strong>Uber Eats</strong>.</span>
              </div>
            </div>
          </div>

          {/* Columna 4: Contacto Directo */}
          <div className="space-y-3.5">
            <h4 className="font-['Outfit'] font-black text-base text-white tracking-wide flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Contacto Directo</span>
            </h4>

            <p className="text-xs sm:text-sm text-stone-400">
              ¿Dudas, pedidos especiales para eventos o consulta de ingredientes? Escríbenos directamente:
            </p>

            <a
              id="footer-whatsapp-btn"
              href={WHATSAPP_DEFAULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] py-3 px-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1eb855] hover:from-[#1eb855] hover:to-[#199d49] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md emerald-glow transition-all active:scale-95 touch-manipulation cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>

            <div className="text-[11px] text-stone-500 text-center">
              Respuesta rápida en horario de sucursal
            </div>
          </div>

        </div>

        {/* Franja Inferior: Derechos Reservados */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 text-center sm:text-left font-medium">
          <div>
            © 2026 NovaArc Tech. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1.5 text-stone-400">
            <span>Hecho con amor y tradición</span>
            <CempasuchilIcon size={14} className="text-[#FF8F00]" />
            <span>en CDMX</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
