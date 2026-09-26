import React, { useState } from 'react';
import { MapPin, Clock, MessageCircle, ExternalLink, Navigation, ShoppingBag, Sparkles, Heart } from 'lucide-react';
import { WHATSAPP_DEFAULT_URL, STORE_LOCATION } from '../data/freseameData';
import logoImg from '../logo.jpg';

export const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-[#2B1A24] text-stone-300 pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-[#FF4B8B]/20 relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF4B8B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-white/10">
          
          {/* Columna 1: Marca e Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {!logoError ? (
                <img
                  src={logoImg || './logo.jpg'}
                  alt="Freséame"
                  width="44"
                  height="44"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#FF4B8B]/40 shadow-xs"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-pink-900/60 flex items-center justify-center text-xl">
                  🍓
                </div>
              )}
              <div>
                <h3 className="font-['Outfit'] font-black text-2xl text-white tracking-tight flex items-center gap-1">
                  Freséame
                  <span className="text-[#FF4B8B]">🍓</span>
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider text-pink-300 block">
                  El límite lo pones tú
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              El postre perfecto preparado al momento: fresas frescas seleccionadas, 7 cremas artesanales de receta secreta y barra libre con tus toppings favoritos.
            </p>

            <div className="flex items-center gap-2 text-xs text-pink-200/90 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4B8B]" />
              <span>Frescura y calidad garantizada</span>
            </div>
          </div>

          {/* Columna 2: Sucursal y Horarios */}
          <div className="space-y-3.5">
            <h4 className="font-['Outfit'] font-black text-base text-white tracking-wide flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FF4B8B]" />
              <span>Sucursal y Horarios</span>
            </h4>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="text-stone-300">
                <span className="font-bold text-white block text-sm">Plaza Patio Clavería</span>
                <span className="text-stone-400">En la zona central, justo junto a McCarthy's Irish Pub.</span>
              </div>

              <div className="flex items-start gap-2 pt-1 text-stone-300">
                <Clock className="w-4 h-4 text-[#48C9B0] shrink-0 mt-0.5" />
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#FF4B8B] text-white text-xs font-bold transition-all border border-white/10 hover:border-transparent active:scale-95 touch-manipulation cursor-pointer"
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
              <ShoppingBag className="w-4 h-4 text-[#48C9B0]" />
              <span>Modalidad de Entrega</span>
            </h4>

            <div className="space-y-2 text-xs sm:text-sm text-stone-400">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-0.5">🛍️ Pick-Up en Mostrador</span>
                <span>Arma tu pedido en línea, genera tu folio digital y recógelo listo sin filas.</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-bold text-white">🛵 Delivery a Domicilio</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold uppercase">
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
              className="w-full min-h-[44px] py-3 px-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#20ba59] hover:from-[#20ba59] hover:to-[#1ea750] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 touch-manipulation cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span>WhatsApp: +52 773 172 7582</span>
            </a>

            <div className="text-[11px] text-stone-500 text-center">
              Respuesta rápida en horario de sucursal
            </div>
          </div>

        </div>

        {/* Franja Inferior: Derechos Reservados */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 text-center sm:text-left font-medium">
          <div>
            © 2026 Freséame. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Hecho con amor por el postre artesanal</span>
            <Heart className="w-3.5 h-3.5 fill-[#FF4B8B] text-[#FF4B8B]" />
            <span>en CDMX</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
