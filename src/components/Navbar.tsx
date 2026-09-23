import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, Sparkles, Heart } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/freseameData';
import logoImg from '../logo.jpg';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  selectedToppingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, selectedToppingsCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menú', href: '#menu' },
    { label: 'Arma tu Freséame', href: '#constructor', isHighlight: true },
    { label: 'Frappés', href: '#frappes' },
    { label: 'Nosotros', href: '#calidad' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = href.replace('#', '');
    onNavigate(target);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      '¡Hola Freséame! 🍓 Me gustaría hacer un pedido o consultar el menú del día. ¿Me podrían dar informes?'
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFF8F2]/95 backdrop-blur-md shadow-sm border-b border-[#FF4B8B]/15 py-3'
          : 'bg-[#FFF8F2]/80 backdrop-blur-xs py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => handleLinkClick('#hero')}
          className="flex items-center gap-3 group text-left transition-transform active:scale-95"
        >
          {!logoError ? (
            <img
              src={logoImg || './logo.jpg'}
              alt="Freséame"
              className="h-12 w-12 rounded-full object-cover shadow-sm border border-pink-100 group-hover:scale-105 transition-transform"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-[#FFF0F5] border border-pink-200 flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
              🍓
            </div>
          )}
          <div>
            <span className="font-['Outfit'] font-black text-2xl tracking-tight text-[#2B1A24] flex items-center gap-1.5">
              Freséame
              <span className="inline-block text-[#FF4B8B] text-xs font-bold px-2 py-0.5 rounded-full bg-[#FF4B8B]/10 border border-[#FF4B8B]/20">
                MX
              </span>
            </span>
            <span className="block text-[11px] font-semibold text-[#2B1A24]/60 tracking-wider uppercase -mt-0.5">
              El límite lo pones tú
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleLinkClick(link.href)}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                link.isHighlight
                  ? 'bg-[#FF4B8B]/10 text-[#FF4B8B] hover:bg-[#FF4B8B]/20 border border-[#FF4B8B]/25'
                  : 'text-[#2B1A24]/80 hover:text-[#FF4B8B] hover:bg-stone-200/40'
              }`}
            >
              {link.isHighlight && <Sparkles className="w-3.5 h-3.5 text-[#FF4B8B]" />}
              {link.label}
              {link.isHighlight && selectedToppingsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#FF4B8B] text-white text-[10px] flex items-center justify-center font-bold">
                  {selectedToppingsCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            id="navbar-whatsapp-cta-desktop"
            onClick={handleDirectWhatsApp}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Pedir por WhatsApp</span>
          </button>
        </div>

        {/* Mobile Menu & WhatsApp Icon */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-quick-wa-btn"
            onClick={handleDirectWhatsApp}
            aria-label="Pedir por WhatsApp"
            className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-sm"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="w-10 h-10 rounded-2xl bg-white border border-[#2B1A24]/10 text-[#2B1A24] flex items-center justify-center shadow-xs"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF8F2] border-b border-[#2B1A24]/10 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleLinkClick(link.href)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-base font-semibold transition-all flex items-center justify-between ${
                  link.isHighlight
                    ? 'bg-[#FF4B8B]/10 text-[#FF4B8B] border border-[#FF4B8B]/20'
                    : 'text-[#2B1A24] hover:bg-stone-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.isHighlight && <Sparkles className="w-4 h-4 text-[#FF4B8B]" />}
                  {link.label}
                </span>
                {link.isHighlight && selectedToppingsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#FF4B8B] text-white text-xs font-bold">
                    {selectedToppingsCount} toppings
                  </span>
                )}
              </button>
            ))}
            <div className="pt-2">
              <button
                id="mobile-drawer-whatsapp-btn"
                onClick={handleDirectWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold text-base shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Pedir por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
