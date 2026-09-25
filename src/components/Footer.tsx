import React, { useState } from 'react';
import { MessageCircle, Clock, MapPin, Phone, Instagram, Facebook, Heart, ShieldCheck, CreditCard } from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '../data/freseameData';
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
            <ul className="text-xs sm:text-sm text-stone-300 space-y-2">
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>Lunes a Jueves:</span>
                <span className="font-bold text-white">1:00 PM – 9:30 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>Viernes y Sábados:</span>
                <span className="font-bold text-[#FF4B8B]">1:00 PM – 10:30 PM</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Domingos:</span>
                <span className="font-bold text-white">2:00 PM – 9:00 PM</span>
              </li>
            </ul>
            <div className="pt-2 text-[11px] text-[#48C9B0] flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#48C9B0] animate-pulse"></span>
              <span>¡Pedidos por WhatsApp listos en ~15 minutos!</span>
            </div>
          </div>

          {/* Col 3: Ubicación y Contacto */}
          <div className="space-y-3">
            <h4 className="font-['Outfit'] font-black text-base text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF4B8B]" />
              <span>Visítanos o Pide a Casa</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Av. Dulzura #120, Col. Delicias, Ciudad de México (Frente a la glorieta de las flores).
            </p>
            <div className="pt-2 space-y-2 text-xs text-stone-300">
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
              <div className="flex items-center gap-2">
                <span className="text-[#48C9B0]">🛵</span>
                <span>Envíos locales y pick-up express</span>
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
