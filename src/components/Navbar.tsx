import React, { useState } from 'react';
import {
  MapPin,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  Bike,
  Store,
} from 'lucide-react';
import { WHATSAPP_DEFAULT_URL } from '../data/freseameData';
import logoImg from '../logo.jpg';

interface NavbarProps {
  onNavigateToMenu?: () => void;
  onNavigateToDelivery?: () => void;
  onNavigateToLocation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateToMenu,
  onNavigateToDelivery,
  onNavigateToLocation,
}) => {
  const [logoError, setLogoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (id: string, customHandler?: () => void) => {
    setMobileMenuOpen(false);
    if (customHandler) {
      customHandler();
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-50 bg-[#FFF8F2]/95 backdrop-blur-md border-b border-pink-100 shadow-2xs w-full transition-all"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Lado izquierdo: Logo circular pequeño + Nombre Freséame */}
        <button
          id="navbar-brand-btn"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group cursor-pointer active:scale-95 transition-transform shrink-0"
        >
          {!logoError ? (
            <img
              src={logoImg || './logo.jpg'}
              alt="Freséame"
              width="36"
              height="36"
              className="h-9 w-9 rounded-full object-cover border border-[#FF4B8B]/30 shadow-2xs group-hover:scale-105 transition-transform"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-pink-100 flex items-center justify-center text-lg shadow-2xs">
              🍓
            </div>
          )}
          <span className="font-['Outfit'] font-black text-xl sm:text-2xl tracking-tight text-[#2B1A24] flex items-center gap-1">
            Freséame
            <span className="text-[#FF4B8B] text-lg sm:text-xl">🍓</span>
          </span>
        </button>

        {/* Lado derecho en Desktop (md+): Enlaces rápidos + Botón WhatsApp */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {/* Enlace: 🍓 Menú */}
          <button
            id="nav-link-menu"
            type="button"
            onClick={() => handleScroll('category-nav-bar', onNavigateToMenu)}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-bold text-stone-700 hover:text-[#FF4B8B] hover:bg-pink-50/70 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation"
          >
            <span>🍓</span>
            <span>Menú</span>
          </button>

          {/* Enlace: 🛵 Delivery */}
          <button
            id="nav-link-delivery"
            type="button"
            onClick={() => handleScroll('delivery-section', onNavigateToDelivery)}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-bold text-stone-700 hover:text-[#FF4B8B] hover:bg-pink-50/70 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation"
          >
            <span>🛵</span>
            <span>Delivery</span>
          </button>

          {/* Enlace: 📍 Sucursal */}
          <button
            id="nav-link-sucursal"
            type="button"
            onClick={() => handleScroll('sucursal-info', onNavigateToLocation)}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-bold text-stone-700 hover:text-[#FF4B8B] hover:bg-pink-50/70 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation"
          >
            <MapPin className="w-3.5 h-3.5 text-[#FF4B8B]" />
            <span>Sucursal</span>
          </button>

          {/* Separador sutil */}
          <div className="h-5 w-px bg-stone-200/80 mx-1" />

          {/* Botón Destacado estilo píldora: 📲 WhatsApp */}
          <a
            id="nav-cta-whatsapp"
            href={WHATSAPP_DEFAULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[40px] px-4 py-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#1eb855] hover:from-[#20ba59] hover:to-[#199d49] text-white text-xs font-black shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation shrink-0"
            aria-label="Abrir WhatsApp oficial"
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" />
            <span>WhatsApp</span>
          </a>
        </nav>

        {/* Lado derecho en Móvil: WhatsApp directo + Botón Hamburguesa */}
        <div className="flex md:hidden items-center gap-2">
          {/* Botón WhatsApp compacto para móviles */}
          <a
            id="mobile-nav-whatsapp-btn"
            href={WHATSAPP_DEFAULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[38px] px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black shadow-2xs transition-all flex items-center gap-1 active:scale-95 touch-manipulation"
            aria-label="Pedir por WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* Botón Hamburguesa para desplegar menú rápido */}
          <button
            id="mobile-nav-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="min-h-[44px] min-w-[44px] rounded-2xl bg-white border border-stone-200/90 text-stone-700 hover:text-[#FF4B8B] flex items-center justify-center transition-colors cursor-pointer active:scale-95 touch-manipulation"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#FF4B8B]" />
            ) : (
              <Menu className="w-5 h-5 text-stone-700" />
            )}
          </button>
        </div>

      </div>

      {/* Menú Móvil Desplegable Limpio */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="md:hidden border-t border-pink-100 bg-[#FFF8F2]/98 backdrop-blur-md px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-md"
        >
          <button
            type="button"
            onClick={() => handleScroll('category-nav-bar', onNavigateToMenu)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white hover:bg-pink-50 border border-stone-200/80 text-stone-800 hover:text-[#FF4B8B] text-xs font-bold transition-all flex items-center justify-between active:scale-95 touch-manipulation cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>🍓</span>
              <span>Menú y Categorías</span>
            </span>
            <span className="text-[10px] text-pink-500 font-extrabold uppercase bg-pink-50 px-2 py-0.5 rounded-full">
              Simulador
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll('delivery-section', onNavigateToDelivery)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white hover:bg-pink-50 border border-stone-200/80 text-stone-800 hover:text-[#FF4B8B] text-xs font-bold transition-all flex items-center justify-between active:scale-95 touch-manipulation cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>🛵</span>
              <span>Delivery (Rappi / Uber Eats)</span>
            </span>
            <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
              Próximamente
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll('sucursal-info', onNavigateToLocation)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white hover:bg-pink-50 border border-stone-200/80 text-stone-800 hover:text-[#FF4B8B] text-xs font-bold transition-all flex items-center justify-between active:scale-95 touch-manipulation cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF4B8B]" />
              <span>Sucursal Patio Clavería</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              Abierto 11am-11pm
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
