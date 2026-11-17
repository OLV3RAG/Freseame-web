import React, { useState, useEffect } from 'react';
import {
  MapPin,
  MessageCircle,
  Menu,
  X,
} from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '../data/freseameData';

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
      className={`sticky top-0 z-50 w-full transition-all duration-300 font-['Outfit'] ${
        isScrolled
          ? 'bg-[#FFF7EE]/95 backdrop-blur-md border-b border-[#F4B8C7]/60 py-1.5'
          : 'bg-[#FFF7EE]/90 backdrop-blur-md border-b border-[#F4B8C7]/40 py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Área de seguridad >= 10% alrededor del logotipo, sin sombras ni degradados */}
        <a
          id="navbar-brand-btn"
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 p-1.5 cursor-pointer active:scale-95 transition-transform shrink-0"
        >
          <img
            src="/logo.jpg"
            alt="Freséame"
            className="h-11 sm:h-12 w-auto object-contain rounded-xl"
          />
          <div className="flex flex-col text-left">
            <span className="font-['DynaPuff'] font-bold text-2xl sm:text-3xl text-[#4A2638] leading-none">
              Freséame
            </span>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#B73E5B] mt-1">
              EL LÍMITE LO PONES TÚ
            </span>
          </div>
        </a>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            id="nav-link-inicio"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-all cursor-pointer active:scale-95"
          >
            Inicio
          </button>

          <button
            id="nav-link-menu"
            type="button"
            onClick={() => handleScroll('cartelera-menu', onNavigateToMenu)}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-all cursor-pointer active:scale-95"
          >
            Menú
          </button>

          <button
            id="nav-link-como-pedir"
            type="button"
            onClick={() => handleScroll('como-funciona', onNavigateToHowToOrder)}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-all cursor-pointer active:scale-95"
          >
            Cómo Pedir
          </button>

          <button
            id="nav-link-sucursales"
            type="button"
            onClick={() => handleScroll('sucursal-info', onNavigateToLocation)}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-all cursor-pointer active:scale-95"
          >
            Sucursales
          </button>

          <button
            id="nav-link-contacto"
            type="button"
            onClick={() => handleScroll('contacto', onNavigateToContact)}
            className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-all cursor-pointer active:scale-95"
          >
            Contacto
          </button>

          <div className="h-5 w-px bg-[#F4B8C7] mx-2" />

          {/* CTA Principal en Frambuesa */}
          <a
            id="nav-cta-whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[40px] px-4 py-2 rounded-full bg-[#B73E5B] hover:bg-[#9E324C] text-white text-xs lg:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
            aria-label="Pedir por WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-white shrink-0" />
            <span>Pedir por WhatsApp</span>
          </a>
        </nav>

        {/* Controles Móvil */}
        <div className="flex md:hidden items-center gap-2">
          <a
            id="mobile-nav-whatsapp-btn"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[38px] px-3 py-1.5 rounded-full bg-[#B73E5B] hover:bg-[#9E324C] text-white text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
            aria-label="Pedir por WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white shrink-0" />
            <span>WhatsApp</span>
          </a>

          <button
            id="mobile-nav-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-[#FFF7EE] border border-[#F4B8C7] text-[#4A2638] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#B73E5B]" />
            ) : (
              <Menu className="w-5 h-5 text-[#4A2638]" />
            )}
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="md:hidden border-t border-[#F4B8C7] bg-[#FFF7EE] px-4 py-3 space-y-1.5"
        >
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-all flex items-center justify-between"
          >
            <span>🍓 Inicio</span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll('cartelera-menu', onNavigateToMenu)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-all flex items-center justify-between"
          >
            <span>📋 Menú Digital</span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll('como-funciona', onNavigateToHowToOrder)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-all flex items-center justify-between"
          >
            <span>✨ Arma tu Antojo</span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll('sucursal-info', onNavigateToLocation)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-all flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B73E5B]" />
              <span>Sucursales CDMX</span>
            </span>
            <span className="text-[10px] text-[#4A2638] font-semibold bg-[#CDE5DA] px-2.5 py-0.5 rounded-full">
              Abierto 11am-11pm
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll('contacto', onNavigateToContact)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-all flex items-center justify-between"
          >
            <span>💬 Contacto y Soporte</span>
          </button>

          <div className="pt-2 border-t border-[#F4B8C7]/50">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#B73E5B] hover:bg-[#9E324C] text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Pedir por WhatsApp ({WHATSAPP_DISPLAY})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
