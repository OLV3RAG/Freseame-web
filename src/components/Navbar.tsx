import React, { useState, useEffect } from 'react';
import {
  MapPin,
  MessageCircle,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '../data/freseameData';
import logoImg from '../logo.jpg';

interface NavbarProps {
  onNavigateToMenu?: () => void;
  onNavigateToHowToOrder?: () => void;
  onNavigateToLocation?: () => void;
  onNavigateToContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateToMenu,
  onNavigateToHowToOrder,
  onNavigateToLocation,
  onNavigateToContact,
}) => {
  const [logoError, setLogoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}`;

  useEffect(() => {
    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-100 py-1'
          : 'bg-white/85 backdrop-blur-md border-b border-rose-100/60 py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        
        {/* Lado izquierdo: Logo oficial con tipografía y slogan destacados */}
        <a
          id="navbar-brand-btn"
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer active:scale-95 transition-transform shrink-0"
        >
          <img
            src="/logo.jpg"
            alt="Freséame"
            className="h-10 sm:h-12 w-auto object-contain rounded-xl drop-shadow-sm"
          />
          <div className="flex flex-col text-left">
            <span className="font-['Outfit'] font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent drop-shadow-xs leading-none">
              Freséame
            </span>
            <span className="text-[9px] uppercase tracking-widest font-extrabold text-gray-500 mt-1">
              EL LÍMITE LO PONES TÚ
            </span>
          </div>
        </a>

        {/* Centro / Lado derecho en Desktop: Enlaces de navegación suave */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {/* Inicio */}
          <button
            id="nav-link-inicio"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold text-gray-700 hover:text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer active:scale-95"
          >
            Inicio
          </button>

          {/* Menú */}
          <button
            id="nav-link-menu"
            type="button"
            onClick={() => handleScroll('cartelera-menu', onNavigateToMenu)}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold text-gray-700 hover:text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer active:scale-95"
          >
            Menú
          </button>

          {/* Cómo Pedir */}
          <button
            id="nav-link-como-pedir"
            type="button"
            onClick={() => handleScroll('como-funciona', onNavigateToHowToOrder)}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold text-gray-700 hover:text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer active:scale-95"
          >
            Cómo Pedir
          </button>

          {/* Sucursales */}
          <button
            id="nav-link-sucursales"
            type="button"
            onClick={() => handleScroll('sucursal-info', onNavigateToLocation)}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold text-gray-700 hover:text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer active:scale-95"
          >
            Sucursales
          </button>

          {/* Contacto */}
          <button
            id="nav-link-contacto"
            type="button"
            onClick={() => handleScroll('footer-contacto', onNavigateToContact)}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold text-gray-700 hover:text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer active:scale-95"
          >
            Contacto
          </button>

          <div className="h-5 w-px bg-gray-200 mx-2" />

          {/* Botón CTA: Pedir por WhatsApp */}
          <a
            id="nav-cta-whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[40px] px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-xs lg:text-sm font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
            aria-label="Pedir por WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" />
            <span>Pedir por WhatsApp</span>
          </a>
        </nav>

        {/* Lado derecho en Móvil: CTA WhatsApp + Hamburguesa */}
        <div className="flex md:hidden items-center gap-2">
          <a
            id="mobile-nav-whatsapp-btn"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[38px] px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1 active:scale-95"
            aria-label="Pedir por WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>WhatsApp</span>
          </a>

          <button
            id="mobile-nav-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-rose-600" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="md:hidden border-t border-rose-100 bg-white/98 backdrop-blur-md px-4 py-3 space-y-1.5 animate-in slide-in-from-top-2 duration-200 shadow-lg"
        >
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-gray-800 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center justify-between"
          >
            <span>🍓 Inicio</span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll('cartelera-menu', onNavigateToMenu)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-gray-800 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center justify-between"
          >
            <span>📋 Menú Digital</span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll('como-funciona', onNavigateToHowToOrder)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-gray-800 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center justify-between"
          >
            <span>✨ Cómo Pedir (3 Pasos)</span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll('sucursal-info', onNavigateToLocation)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-gray-800 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Sucursal Patio Clavería</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Abierto 11am-11pm
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll('footer-contacto', onNavigateToContact)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-gray-800 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center justify-between"
          >
            <span>💬 Contacto y Soporte</span>
          </button>

          <div className="pt-2 border-t border-gray-100">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Pedir por WhatsApp ({WHATSAPP_DISPLAY})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
