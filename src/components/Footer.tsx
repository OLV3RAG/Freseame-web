import React, { useState } from 'react';
import { MessageCircle, Clock, MapPin, Phone, Instagram, Facebook, Heart, ShieldCheck, ExternalLink } from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY, STORE_LOCATION } from '../data/freseameData';
import logoImg from '../logo.jpg';

export const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);
  const handleWhatsApp = () => {
    window.open('https://wa.me/527731727582', '_blank');
  };

  return (
    <footer id="contacto" className="bg-[#2B1A24] text-stone-200 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative top ambient pink line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF4B8B] via-[#48C9B0] to-[#FF4B8B]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Identity & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {!logoError ? (
                <img
                  src={logoImg || './logo.jpg'}
                  alt="Freséame"
                  className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF4B8B] to-[#FF75A0] flex items-center justify-center text-white text-xl shadow-md">
                  🍓
                </div>
              )}
              <span className="font-['Outfit'] font-black text-2xl text-white tracking-tight">
                Freséame
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              "El límite lo pones tú" — La barra de postres personalizados con fresas frescas, waffles y hot cakes con cremas artesanales y más de 27 toppings únicos.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Freséame"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FF4B8B] text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook de Freséame"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/527731727582"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Freséame"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Horarios de Atención */}
          <div className="space-y-3">
            <h4 className="font-['Outfit'] font-black text-base text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#48C9B0]" />
              <span>Horarios de Atención</span>
            </h4>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-stone-300 font-medium">Lunes a Domingo:</span>
                <span className="font-black text-[#FF4B8B]">11:00 AM – 11:00 PM</span>
              </div>
              <div className="text-[11px] text-[#48C9B0] flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#48C9B0] animate-pulse"></span>
                <span>¡Abierto todos los días de la semana!</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Servicio continuo para Pick-Up express en mostrador o consumo en área de terrazas.
            </p>
          </div>

          {/* Col 3: Ubicación y Contacto */}
          <div className="space-y-3">
            <h4 className="font-['Outfit'] font-black text-base text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF4B8B]" />
              <span>Sucursal Patio Clavería</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-medium">
              <strong>Plaza Patio Clavería:</strong> Calle Egipto 142, Col. Clavería, Azcapotzalco, CDMX.
            </p>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-amber-200/95 leading-snug">
              📍 <strong>Referencia:</strong> En la zona central de la plaza, justo a un costado de <em>McCarthy's Irish Pub</em>.
            </div>
            <div className="pt-1">
              <a
                href={STORE_LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#48C9B0] hover:text-[#38b59d] font-bold underline underline-offset-4"
              >
                <span>Ver ubicación en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="pt-2 space-y-1.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF4B8B]" />
                <a
                  href="tel:+527731727582"
                  className="font-bold text-white hover:text-[#FF4B8B] transition-colors underline-offset-2 hover:underline"
                >
                  +52 773 172 7582
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <a
                  href="https://wa.me/527731727582"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white hover:text-[#25D366] transition-colors underline-offset-2 hover:underline"
                >
                  WhatsApp: +52 773 172 7582
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Métodos de Pago y Garantías */}
          <div className="space-y-3">
            <h4 className="font-['Outfit'] font-black text-base text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#48C9B0]" />
              <span>Garantías & Pagos</span>
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Todos nuestros pedidos se preparan bajo estrictas normas de inocuidad y desinfección grado alimenticio.
            </p>
            <div className="pt-1">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                Métodos de pago aceptados:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-medium">
                  💵 Efectivo
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-medium">
                  💳 Tarjetas (Visa/Mastercard)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-medium">
                  📲 Transferencia SPEI
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Freséame MX. Todos los derechos reservados. El límite lo pones tú.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="w-3.5 h-3.5 text-[#FF4B8B] fill-[#FF4B8B]" /> para todos los amantes de las fresas
          </p>
        </div>
      </div>
    </footer>
  );
};
