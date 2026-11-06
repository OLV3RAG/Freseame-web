import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Clock,
  MapPin,
  CheckCircle2,
  Heart,
  ExternalLink,
  Bike,
  Check,
  RotateCcw,
  Plus,
  ShoppingBag,
  ChevronDown,
  X,
  Layers,
  Sparkle,
} from 'lucide-react';
import { Footer } from './components/Footer';

// =======================================================
// CONSTANTES OFICIALES DE MARCA, CONTACTO Y DELIVERY
// =======================================================
const WHATSAPP_PHONE = '525535021829';
const WHATSAPP_DISPLAY = '+52 55 3502 1829';
const WHATSAPP_UNIVERSAL_URL = 'https://wa.me/525535021829?text=Hola%20Fres%C3%A9ame!%20Me%20gustar%C3%ADa%20hacer%20un%20pedido.';

// =======================================================
// DATOS DEL ARMADOR / CONFIGURADOR INTERACTIVO
// =======================================================
export type CupSize = 'mediano' | 'grande';

export interface SizeOption {
  id: CupSize;
  name: string;
  label: string;
  oz: string;
  multiplier: number;
  includedToppings: number;
}

export const SIZES_DATA: SizeOption[] = [
  { id: 'mediano', name: 'Mediano', label: '16 oz (Individual favorito)', oz: '16 oz', multiplier: 1.0, includedToppings: 3 },
  { id: 'grande', name: 'Grande', label: '24 oz (Para compartir o doble antojo)', oz: '24 oz', multiplier: 1.27, includedToppings: 4 },
];

export interface BaseItem {
  id: string;
  name: string;
  price: number;
  description: string;
  tag: string;
  icon: string;
}

export const BASES_DATA: BaseItem[] = [
  { id: 'fresas-crema', name: 'Fresas con crema', price: 75, description: 'Fresas frescas desinfectadas cortadas al momento.', tag: 'Estrella', icon: '🍓' },
  { id: 'fresas-enchiladas', name: 'Fresas Enchiladas', price: 80, description: 'Fresas con chamoy, chilito y limón artesanal.', tag: 'Picosito', icon: '🌶️' },
  { id: 'duraznos-crema', name: 'Duraznos con crema', price: 75, description: 'Gajos de durazno dulce en su punto perfecto.', tag: 'Suave', icon: '🍑' },
  { id: 'uvas-crema', name: 'Uvas con crema', price: 70, description: 'Uvas crujientes sin semilla, ultra frescas.', tag: 'Ligero', icon: '🍇' },
  { id: 'waffle-1pza', name: 'Waffle (1 pza)', price: 85, description: 'Waffle belga crujiente por fuera y suave por dentro.', tag: 'Plancha', icon: '🧇' },
  { id: 'hot-cakes-3mini', name: 'Hot Cakes (3 mini pzas)', price: 85, description: 'Trío esponjoso recién dorado con mantequilla.', tag: 'Favorito', icon: '🥞' },
  { id: 'pan-fresh-2reb', name: 'Pan Fresh (2 rebanadas)', price: 70, description: 'Rebanadas de brioche tostadas con toque de canela.', tag: 'Crujiente', icon: '🍞' },
];

export interface CremaItem {
  id: string;
  name: string;
  description: string;
  tag: string;
}

export const CREMAS_DATA: CremaItem[] = [
  { id: 'crema-casa-queso', name: 'Crema de la Casa con Queso', description: 'Receta secreta sedosa estilo cheesecake dulce.', tag: '⭐ La Más Pedida' },
  { id: 'crema-tradicional', name: 'Crema Tradicional', description: 'Nuestra clásica crema dulce, suave y balanceada.', tag: 'Clásica' },
  { id: 'crema-proteina-fit', name: 'Crema de Proteína Fit', description: 'Opción ligera a base de yogur proteico.', tag: '💪 Fit' },
  { id: 'crema-chocolate', name: 'Crema de Chocolate', description: 'Emulsión intensa con auténtico cacao oscuro.', tag: 'Choco Lover' },
  { id: 'crema-cafe', name: 'Crema de Café', description: 'Notas suaves y aromáticas de café moka.', tag: 'Aromática' },
  { id: 'crema-3-leches', name: 'Crema 3 Leches', description: 'Inspirada en el tradicional postre mexicano.', tag: 'Extra Dulce' },
];

export interface AderezoItem {
  id: string;
  name: string;
  icon: string;
}

export const ADEREZOS_DATA: AderezoItem[] = [
  { id: 'nutella', name: 'Nutella original', icon: '🌰' },
  { id: 'chocolate-hersheys', name: "Chocolate Hershey's", icon: '🍫' },
  { id: 'cajeta', name: 'Cajeta Coronado', icon: '🍯' },
  { id: 'lechera', name: 'Leche Condensada (Lechera)', icon: '🥛' },
  { id: 'fresa', name: 'Jarabe de Fresa Artesanal', icon: '🍓' },
  { id: 'maple', name: 'Miel de Maple pura', icon: '🍁' },
  { id: 'chamoy-miguelito', name: 'Chamoy líquido y Miguelito', icon: '🌶️' },
];

export interface ToppingItem {
  id: string;
  name: string;
  category: 'clasico' | 'premium' | 'enchilado';
  price: number;
}

export const TOPPINGS_DATA: ToppingItem[] = [
  // Clásicos (incluidos)
  { id: 'chispas-choco', name: 'Chispas de Chocolate', category: 'clasico', price: 0 },
  { id: 'granillo-colores', name: 'Granillo de Colores', category: 'clasico', price: 0 },
  { id: 'mini-bombones', name: 'Mini Bombones', category: 'clasico', price: 0 },
  { id: 'amaranto', name: 'Amaranto con miel', category: 'clasico', price: 0 },
  { id: 'coco-rallado', name: 'Coco rallado tostado', category: 'clasico', price: 0 },
  { id: 'galleta-maria', name: 'Galleta María molida', category: 'clasico', price: 0 },
  // Premium
  { id: 'kinder-bueno', name: 'Kinder Bueno en trozos', category: 'premium', price: 15 },
  { id: 'ferrero', name: 'Ferrero Rocher troceado', category: 'premium', price: 18 },
  { id: 'oreo', name: 'Galleta Oreo triturada', category: 'premium', price: 10 },
  { id: 'nuez-pecana', name: 'Nuez pecana en trozos', category: 'premium', price: 12 },
  { id: 'almendra-fileteada', name: 'Almendra fileteada', category: 'premium', price: 12 },
  { id: 'mms', name: "M&M's de chocolate", category: 'premium', price: 10 },
  { id: 'mazapan', name: 'Mazapán de cacahuate', category: 'premium', price: 10 },
  // Enchilados
  { id: 'skwinkles', name: 'Skwinkles Salsagheti', category: 'enchilado', price: 12 },
  { id: 'gomitas-mango', name: 'Gomitas de mango con chile', category: 'enchilado', price: 10 },
  { id: 'pulparindo', name: 'Pulparindo en trocitos', category: 'enchilado', price: 10 },
  { id: 'cacahuates-japoneses', name: 'Cacahuates japoneses', category: 'enchilado', price: 8 },
];

// Diapositivas de la Cartelera de Menú Digital
interface MenuSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const MENU_SLIDES: MenuSlide[] = [
  {
    id: 1,
    image: '/menu/Freseame1.png',
    title: 'Arma tu Vaso: Bases, Cremas y Precios',
    subtitle: 'Nuestros tamaños Chico/Mediano/Grande y bases frescas',
  },
  {
    id: 2,
    image: '/menu/Freseame2.png',
    title: 'Variedad de Toppings y Fresas Enchiladas',
    subtitle: 'Toppings clásicos, premium y especialidad enchilada',
  },
  {
    id: 3,
    image: '/menu/Freseame3.png',
    title: 'Waffles Artesanales',
    subtitle: 'Waffles recién dorados con fruta y crema de la casa',
  },
  {
    id: 4,
    image: '/menu/Freseame4.png',
    title: 'Crepas Dulces',
    subtitle: 'Especialidades dulces con aderezos y toppings',
  },
];

// Promociones Semanales Oficiales
interface PromoItem {
  id: string;
  day: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  whatsappMessage: string;
}

const WEEKLY_PROMOS: PromoItem[] = [
  {
    id: 'lunes',
    day: 'Lunes',
    title: '2x1 en Waffles Básicos',
    description: 'Comienza tu semana compartiendo: llévate 2 waffles básicos al precio de 1.',
    image: '/menu/PromoLunes.png',
    badge: '¡Lunes 2x1!',
    whatsappMessage: 'Hola Freséame! Quiero aprovechar la promoción de Lunes: 2x1 en Waffles Básicos 🍓🧇',
  },
  {
    id: 'martes',
    day: 'Martes',
    title: 'Tu 2do Vaso a Mitad de Precio (Chico Clásico)',
    description: 'Aplica en tu segundo vaso tamaño chico clásico. ¡El dúo perfecto para tu antojo!',
    image: '/menu/PromoMartes.png',
    badge: '50% en 2do Vaso',
    whatsappMessage: 'Hola Freséame! Quiero aprovechar la promoción de Martes: 2do vaso a mitad de precio (Chico Clásico) 🍓',
  },
  {
    id: 'miercoles',
    day: 'Miércoles',
    title: 'Tu 2do Vaso a Mitad de Precio (Chico Premium)',
    description: 'Disfruta toppings premium con 50% de descuento en tu segundo vaso tamaño chico.',
    image: '/menu/PromoMiercoles.png',
    badge: '50% Chico Premium',
    whatsappMessage: 'Hola Freséame! Quiero aprovechar la promoción de Miércoles: 2do vaso a mitad de precio (Chico Premium) 🍓',
  },
];

// Sucursales Oficiales de Freséame
export interface BranchItem {
  id: string;
  name: string;
  isNew?: boolean;
  badgeText?: string;
  openStatus: string;
  address: string;
  reference: string;
  hours: string;
  phoneDisplay: string;
  phoneRaw: string;
  mapsUrl: string;
  uberEatsUrl: string;
  rappiUrl: string;
}

const OFFICIAL_BRANCHES: BranchItem[] = [
  {
    id: 'tlatelolco',
    name: 'Sucursal Puerta Tlatelolco',
    isNew: true,
    badgeText: '✨ ¡NUEVA SUCURSAL!',
    openStatus: 'PROXIMAMENTE',
    address: 'Manuel González 113, San Simón Tolnahuac, Cuauhtémoc, C.P. 06920 Ciudad de México, CDMX',
    reference: '1er piso, frente a Walmart, a un lado de Jack Papotas.',
    hours: 'Lunes a Domingo: 11:00 AM – 10:00 PM',
    phoneDisplay: '+52 55 3502 1829',
    phoneRaw: '525535021829',
    mapsUrl: 'https://maps.app.goo.gl/7VkEx88bJ5SvGkEH6',
    uberEatsUrl: 'https://www.ubereats.com/search?q=Freseame+Puerta+Tlatelolco',
    rappiUrl: 'https://www.rappi.com.mx/restaurantes/search?query=Freseame+Tlatelolco',
  },
  {
    id: 'claveria',
    name: 'Sucursal Patio Clavería',
    isNew: false,
    openStatus: 'ABIERTO HOY',
    address: 'Plaza Patio Clavería, Calle Egipto 142, Col. Clavería, Azcapotzalco, C.P. 02080, Ciudad de México',
    reference: "En la zona central de la plaza, justo a un costado de McCarthy's Irish Pub.",
    hours: 'Lunes a Domingo: 11:00 AM – 11:00 PM',
    phoneDisplay: '+52 55 3502 1829',
    phoneRaw: '525535021829',
    mapsUrl: 'https://maps.google.com/?q=Plaza+Patio+Claveria',
    uberEatsUrl: 'https://www.ubereats.com/search?q=Freseame+Patio+Claveria',
    rappiUrl: 'https://www.rappi.com.mx/restaurantes/search?query=Freseame+Claveria',
  },
];

export default function App() {
  // Mobile Navbar menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Selector / Menú Desplegable "Delivery" en Navbar
  const [deliveryDropdownOpen, setDeliveryDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Carrusel de Menú Digital
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // =======================================================
  // ESTADO DEL ARMADOR INTERACTIVO / SIMULADOR DE PEDIDO
  // =======================================================
  const [selectedSize, setSelectedSize] = useState<CupSize>('mediano');
  const [selectedBase, setSelectedBase] = useState<BaseItem>(BASES_DATA[0]);
  const [selectedCrema, setSelectedCrema] = useState<CremaItem>(CREMAS_DATA[0]);
  const [selectedAderezo, setSelectedAderezo] = useState<AderezoItem>(ADEREZOS_DATA[0]);
  const [selectedToppings, setSelectedToppings] = useState<ToppingItem[]>([
    TOPPINGS_DATA[6], // Kinder Bueno
    TOPPINGS_DATA[8], // Oreo
  ]);
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [toppingsFilter, setToppingsFilter] = useState<'all' | 'clasico' | 'premium' | 'enchilado'>('all');

  // Cerrar dropdown de delivery al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDeliveryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autoplay de 6 segundos con pausa en hover
  const resetAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % MENU_SLIDES.length);
      }, 6000);
    }
  }, [isHovered]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + MENU_SLIDES.length) % MENU_SLIDES.length);
    resetAutoplay();
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % MENU_SLIDES.length);
    resetAutoplay();
  };

  const handleGoToSlide = (index: number) => {
    setCurrentSlide(index);
    resetAutoplay();
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setDeliveryDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Toggle Topping en Armador
  const toggleTopping = (topping: ToppingItem) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.id === topping.id);
      if (exists) {
        return prev.filter((t) => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  // Cálculo en Vivo del Total
  const calculatedTotal = useMemo(() => {
    const currentSizeObj = SIZES_DATA.find((s) => s.id === selectedSize) || SIZES_DATA[0];
    const baseCalc = Math.round(selectedBase.price * currentSizeObj.multiplier);
    const extraToppingsTotal = selectedToppings.reduce((acc, curr) => acc + curr.price, 0);
    return baseCalc + extraToppingsTotal;
  }, [selectedSize, selectedBase, selectedToppings]);

  // Mensaje Formateado para WhatsApp del Pedido Armado
  const whatsappOrderUrl = useMemo(() => {
    const sizeName = selectedSize === 'mediano' ? 'Mediano (16 oz)' : 'Grande (24 oz)';
    const toppingsList = selectedToppings.length > 0
      ? selectedToppings.map((t) => (t.price > 0 ? `• ${t.name} (+$${t.price})` : `• ${t.name}`)).join('\n')
      : '• Sin toppings adicionales';

    const msg = `¡Hola Freséame! 🍓 Quiero hacer el siguiente pedido personalizado:

📋 *RESUMEN DE MI VASO FRESÉAME*
• *Tamaño:* ${sizeName}
• *Paso 1 (Base):* ${selectedBase.name} ($${selectedBase.price} MXN)
• *Paso 2 (Crema):* ${selectedCrema.name}
• *Paso 3 (Aderezo):* ${selectedAderezo.name}
• *Paso 4 (Toppings):*
${toppingsList}
${orderNotes ? `• *Notas:* ${orderNotes}\n` : ''}
💰 *Total Estimado:* $${calculatedTotal} MXN

¿Tienen disponibilidad para pasar a recoger en sucursal? ¡Muchas gracias! ✨`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  }, [selectedSize, selectedBase, selectedCrema, selectedAderezo, selectedToppings, orderNotes, calculatedTotal]);

  const createWhatsAppUrl = (customText?: string) => {
    const text = customText || 'Hola Freséame! Me gustaría hacer un pedido.';
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFDF7] text-gray-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-700 flex flex-col overflow-x-hidden">
      
      {/* =======================================================
          1. NAVBAR Y LOGO DE MARCA
         ======================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Logo oficial: Isotipo + Nombre "Freséame" + Slogan */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('inicio');
            }}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer active:scale-95 transition-transform"
          >
            <img
              src="/logo.jpg"
              alt="Freséame"
              className="h-11 sm:h-12 w-auto object-contain rounded-2xl drop-shadow-sm"
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

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              type="button"
              onClick={() => scrollToSection('inicio')}
              className="px-3 py-2 rounded-full text-sm font-semibold text-gray-700 hover:text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('menu-digital')}
              className="px-3 py-2 rounded-full text-sm font-semibold text-gray-700 hover:text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer"
            >
              Menú Digital
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('armar-pedido')}
              className="px-3.5 py-1.5 rounded-full text-sm font-bold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Armar Pedido</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('promociones')}
              className="px-3 py-2 rounded-full text-sm font-semibold text-gray-700 hover:text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer"
            >
              Promos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sucursales')}
              className="px-3 py-2 rounded-full text-sm font-semibold text-gray-700 hover:text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer"
            >
              Sucursales
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('delivery')}
              className="px-3 py-2 rounded-full text-sm font-semibold text-gray-700 hover:text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer"
            >
              Delivery
            </button>

            <div className="h-5 w-px bg-gray-200 mx-1.5" />

            {/* Acceso Rápido a Delivery */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDeliveryDropdownOpen((prev) => !prev)}
                className="px-3.5 py-2 rounded-full text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Delivery</span>
                <ChevronDown className="w-3 h-3 text-stone-500" />
              </button>

              {deliveryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-rose-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 px-2 py-1 block">
                    Pide a domicilio en:
                  </span>
                  <a
                    href="https://www.ubereats.com/search?q=Freseame"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDeliveryDropdownOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-stone-50 font-bold text-xs text-gray-800"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#06C167]" />
                    <span>Uber Eats</span>
                  </a>
                  <a
                    href="https://www.rappi.com.mx/restaurantes/search?query=Freseame"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDeliveryDropdownOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-orange-50 font-bold text-xs text-[#FF441F]"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FF441F]" />
                    <span>Rappi</span>
                  </a>
                </div>
              )}
            </div>

            {/* Botón CTA Header WhatsApp */}
            <a
              id="navbar-cta-whatsapp"
              href={WHATSAPP_UNIVERSAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-xs lg:text-sm font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Pedir por WhatsApp</span>
            </a>
          </nav>

          {/* Botón móvil hamburguesa */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={WHATSAPP_UNIVERSAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pedir por WhatsApp"
              className="p-2.5 rounded-full bg-emerald-500 text-white shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Abrir menú"
              className="p-2.5 rounded-xl border border-rose-100 text-gray-700 hover:bg-rose-50 transition-colors"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-gray-800 rounded-full transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`h-0.5 w-full bg-gray-800 rounded-full transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-gray-800 rounded-full transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>

        </div>

        {/* Menú Móvil Desplegable */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-rose-100 bg-white px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
            <button
              type="button"
              onClick={() => scrollToSection('inicio')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-gray-800 hover:bg-rose-50"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('menu-digital')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-gray-800 hover:bg-rose-50"
            >
              Menú Digital
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('armar-pedido')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-rose-600 bg-rose-50 flex items-center justify-between"
            >
              <span>Armar Pedido (Simulador)</span>
              <Sparkles className="w-4 h-4 text-rose-500" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('promociones')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-gray-800 hover:bg-rose-50"
            >
              Promociones de la Semana
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sucursales')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-gray-800 hover:bg-rose-50"
            >
              Sucursales (Tlatelolco y Clavería)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('delivery')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-gray-800 hover:bg-rose-50"
            >
              Delivery Oficial
            </button>

            <div className="pt-2 border-t border-gray-100">
              <a
                href={WHATSAPP_UNIVERSAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Pedir por WhatsApp ({WHATSAPP_DISPLAY})</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* =======================================================
          2. HERO SECTION
         ======================================================= */}
      <section
        id="inicio"
        className="relative pt-10 sm:pt-16 pb-12 sm:pb-18 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-gradient-to-b from-rose-50/70 via-[#FFFDF7] to-white"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-rose-200/40 via-pink-100/30 to-emerald-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-rose-200 shadow-xs text-rose-700 text-xs sm:text-sm font-bold tracking-wide mb-4">
            <span className="text-base">🍓</span>
            <span>Fruta fresca seleccionada todos los días</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>

          {/* Título principal */}
          <h1 className="font-['Outfit'] font-black text-3xl sm:text-5xl md:text-6xl text-gray-900 tracking-tight leading-[1.15] max-w-3xl">
            Fresas con crema{' '}
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
              exactamente a tu gusto
            </span>
          </h1>

          {/* Subtítulo con slogan */}
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
            <span className="font-bold text-gray-900">"El límite lo pones tú"</span>. Fruta 100% fresca desinfectada al momento, 7 cremas de receta secreta y barra libre con tus toppings favoritos.
          </p>

          {/* Botones principales */}
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollToSection('armar-pedido')}
              className="min-h-[48px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-700 hover:to-pink-700 text-white font-black text-sm sm:text-base shadow-md shadow-rose-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span>Armar Mi Vaso en Vivo</span>
            </button>

            <a
              id="hero-cta-whatsapp"
              href={WHATSAPP_UNIVERSAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-7 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-700 font-bold text-sm sm:text-base border border-emerald-200 shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-600" />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>

          {/* Badges de confianza */}
          <div className="mt-10 pt-6 border-t border-rose-100/90 grid grid-cols-3 gap-2 sm:gap-6 text-center w-full max-w-2xl">
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl mb-1">🍓</span>
              <span className="text-xs sm:text-sm font-bold text-gray-900">Fruta 100% Fresca</span>
              <span className="text-[11px] text-gray-500 hidden sm:block">Lavada y desinfectada</span>
            </div>

            <div className="flex flex-col items-center border-x border-rose-100 px-2">
              <span className="text-xl sm:text-2xl mb-1">🥛</span>
              <span className="text-xs sm:text-sm font-bold text-gray-900">7 Cremas Artesanales</span>
              <span className="text-[11px] text-gray-500 hidden sm:block">Receta secreta de la casa</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl mb-1">🍫</span>
              <span className="text-xs sm:text-sm font-bold text-gray-900">Toppings Ilimitados</span>
              <span className="text-[11px] text-gray-500 hidden sm:block">Clásicos, premium y picositos</span>
            </div>
          </div>

        </div>
      </section>

      {/* =======================================================
          3. PROMOCIONES DE LA SEMANA
         ======================================================= */}
      <section id="promociones" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/70 border-y border-rose-100/70 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 inline-block mb-2">
              Ahorra con Freséame
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-['Outfit'] text-gray-900 tracking-tight">
              Promociones de la Semana
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600">
              Aprovecha nuestras ofertas exclusivas en sucursales Patio Clavería y Puerta Tlatelolco o pidiendo por WhatsApp.
            </p>
          </div>

          {/* Grid de 3 tarjetas de promociones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {WEEKLY_PROMOS.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-3xl border border-rose-100 shadow-md shadow-rose-950/5 hover:shadow-xl hover:border-rose-200 transition-all flex flex-col overflow-hidden group"
              >
                <div className="relative aspect-[4/3] bg-rose-50/40 overflow-hidden flex items-center justify-center p-2">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black shadow-sm">
                    {promo.day}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white/95 text-rose-700 text-[11px] font-bold border border-rose-100 shadow-xs">
                    {promo.badge}
                  </span>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-['Outfit'] font-black text-lg text-gray-900 leading-snug">
                      {promo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {promo.description}
                    </p>
                  </div>

                  <a
                    href={createWhatsAppUrl(promo.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer mt-auto"
                  >
                    <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                    <span>Aprovechar Promo por WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =======================================================
          4. MENÚ DIGITAL (CARRUSEL DE 4 LÁMINAS)
         ======================================================= */}
      <section
        id="menu-digital"
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20 focus:outline-none"
      >
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 inline-block mb-2">
            Cartelera Digital Oficial
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-['Outfit'] text-gray-900 tracking-tight">
            Nuestro Menú en Imágenes
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mt-1">
            Explora las 4 láminas oficiales de nuestro menú tradicional: bases, toppings, waffles y crepas.
          </p>
        </div>

        {/* Contenedor blanco con borde border-rose-100 y sombra suave */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-rose-100 shadow-xl shadow-rose-950/5 p-3 sm:p-5">
          
          <div className="absolute top-4 sm:top-6 left-4 sm:left-7 z-20 flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 border border-rose-100 text-rose-700 backdrop-blur-md shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span className="font-bold">{MENU_SLIDES[currentSlide].title}</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{currentSlide + 1} de {MENU_SLIDES.length}</span>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[640px] flex items-center justify-center bg-rose-50/20 rounded-2xl select-none overflow-hidden">
            {MENU_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                  aria-hidden={!isActive}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-contain drop-shadow-sm rounded-xl"
                  />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Lámina anterior"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white border border-rose-100 text-gray-700 hover:text-rose-600 backdrop-blur-md transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Lámina siguiente"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white border border-rose-100 text-gray-700 hover:text-rose-600 backdrop-blur-md transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="absolute bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-rose-100 backdrop-blur-md shadow-md">
              {MENU_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleGoToSlide(idx)}
                    aria-label={`Ir a ${slide.title}`}
                    className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                      isActive ? 'w-7 sm:w-8 bg-rose-600 shadow-xs' : 'w-2.5 bg-rose-200 hover:bg-rose-300'
                    }`}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* =======================================================
          5. ARMADOR INTERACTIVO / SIMULADOR DE PEDIDO (4 PASOS)
         ======================================================= */}
      <section id="armar-pedido" className="py-12 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        
        {/* Header del Armador */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 inline-flex items-center gap-1.5 mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Configurador en Tiempo Real</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-['Outfit'] text-gray-900 tracking-tight">
            Arma tu Vaso en 4 Sencillos Pasos
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Elige tu tamaño, tu base favorita, la crema artesanal, el aderezo y tus toppings. Mira el resumen en vivo y mándalo directo a WhatsApp.
          </p>
        </div>

        {/* Layout en 2 columnas: Pasos interactivos (Izq) y Resumen en vivo (Der) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Los 4 Pasos (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Selector de Tamaño de Vaso */}
            <div className="bg-white rounded-3xl border border-rose-100 p-5 sm:p-6 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 block mb-2">
                Paso 0 • Elige el Tamaño
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SIZES_DATA.map((size) => {
                  const isSelected = selectedSize === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-rose-600 bg-rose-50/60 ring-2 ring-rose-500/20 shadow-xs'
                          : 'border-gray-200 hover:border-rose-200 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-['Outfit'] font-black text-lg text-gray-900">
                            {size.name} ({size.oz})
                          </span>
                          {isSelected && <span className="text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold">Activo</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{size.label}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-rose-600 bg-rose-600 text-white' : 'border-gray-300'}`}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector de Pasos en Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-rose-100">
              {[
                { step: 1, name: '1. Base' },
                { step: 2, name: '2. Crema' },
                { step: 3, name: '3. Aderezos' },
                { step: 4, name: '4. Toppings' },
              ].map((tab) => (
                <button
                  key={tab.step}
                  type="button"
                  onClick={() => setActiveStepTab(tab.step)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeStepTab === tab.step
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white text-gray-600 hover:bg-rose-50 border border-gray-200'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* TAB 1: Base */}
            {activeStepTab === 1 && (
              <div className="bg-white rounded-3xl border border-rose-100 p-5 sm:p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Outfit'] font-black text-lg text-gray-900">
                    Paso 1 • Selecciona tu Base
                  </h3>
                  <span className="text-xs text-rose-600 font-bold">Base seleccionada: {selectedBase.name}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BASES_DATA.map((base) => {
                    const isSelected = selectedBase.id === base.id;
                    return (
                      <button
                        key={base.id}
                        type="button"
                        onClick={() => setSelectedBase(base)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'border-rose-600 bg-rose-50/70 ring-2 ring-rose-500/20 shadow-xs'
                            : 'border-gray-200 hover:border-rose-200 bg-white'
                        }`}
                      >
                        <span className="text-2xl shrink-0 p-2 bg-rose-50 rounded-xl">{base.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-gray-900">{base.name}</span>
                            <span className="text-xs font-black text-rose-600">${base.price}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{base.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: Crema */}
            {activeStepTab === 2 && (
              <div className="bg-white rounded-3xl border border-rose-100 p-5 sm:p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Outfit'] font-black text-lg text-gray-900">
                    Paso 2 • Elige tu Crema Artesanal
                  </h3>
                  <span className="text-xs text-rose-600 font-bold">{selectedCrema.name}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CREMAS_DATA.map((crema) => {
                    const isSelected = selectedCrema.id === crema.id;
                    return (
                      <button
                        key={crema.id}
                        type="button"
                        onClick={() => setSelectedCrema(crema)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-rose-600 bg-rose-50/70 ring-2 ring-rose-500/20 shadow-xs'
                            : 'border-gray-200 hover:border-rose-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-gray-900">{crema.name}</span>
                          <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                            {crema.tag}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-snug">{crema.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: Aderezos */}
            {activeStepTab === 3 && (
              <div className="bg-white rounded-3xl border border-rose-100 p-5 sm:p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Outfit'] font-black text-lg text-gray-900">
                    Paso 3 • Selecciona tu Aderezo o Jarabe
                  </h3>
                  <span className="text-xs text-rose-600 font-bold">{selectedAderezo.name}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADEREZOS_DATA.map((aderezo) => {
                    const isSelected = selectedAderezo.id === aderezo.id;
                    return (
                      <button
                        key={aderezo.id}
                        type="button"
                        onClick={() => setSelectedAderezo(aderezo)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-rose-600 bg-rose-50/70 ring-2 ring-rose-500/20 shadow-xs'
                            : 'border-gray-200 hover:border-rose-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{aderezo.icon}</span>
                          <span className="font-bold text-xs sm:text-sm text-gray-900">{aderezo.name}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-rose-600 bg-rose-600 text-white' : 'border-gray-300'}`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: Toppings */}
            {activeStepTab === 4 && (
              <div className="bg-white rounded-3xl border border-rose-100 p-5 sm:p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-['Outfit'] font-black text-lg text-gray-900">
                    Paso 4 • Elige tus Toppings Favoritos
                  </h3>
                  <span className="text-xs font-bold text-rose-600">
                    {selectedToppings.length} seleccionados
                  </span>
                </div>

                {/* Filtro por categoría */}
                <div className="flex items-center gap-2">
                  {[
                    { id: 'all', label: 'Todos' },
                    { id: 'clasico', label: 'Clásicos' },
                    { id: 'premium', label: 'Premium' },
                    { id: 'enchilado', label: 'Enchilados' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setToppingsFilter(cat.id as any)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        toppingsFilter === cat.id
                          ? 'bg-rose-600 text-white'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {TOPPINGS_DATA.filter((t) => toppingsFilter === 'all' || t.category === toppingsFilter).map((topping) => {
                    const isSelected = selectedToppings.some((t) => t.id === topping.id);
                    return (
                      <button
                        key={topping.id}
                        type="button"
                        onClick={() => toggleTopping(topping)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-rose-600 bg-rose-50/70 ring-1 ring-rose-500/20'
                            : 'border-gray-200 hover:border-rose-200 bg-white'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-xs text-gray-900 block">{topping.name}</span>
                          <span className="text-[10px] text-gray-400 capitalize">
                            {topping.category} {topping.price > 0 ? `(+$${topping.price})` : '(Incluido)'}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${isSelected ? 'border-rose-600 bg-rose-600 text-white' : 'border-gray-300'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notas opcionales */}
            <div className="bg-white rounded-3xl border border-rose-100 p-4 sm:p-5 shadow-xs">
              <label htmlFor="order-notes" className="text-xs font-bold text-gray-700 block mb-1">
                ¿Alguna indicación especial? (Opcional):
              </label>
              <input
                id="order-notes"
                type="text"
                placeholder="Ej. Poca crema, topping por separado, sin azúcar extra..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-xs sm:text-sm text-gray-800"
              />
            </div>

          </div>

          {/* Columna Derecha: Tarjeta Simulador / Resumen en Vivo (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-3xl border-2 border-rose-200 shadow-xl shadow-rose-950/5 p-6 space-y-5">
              
              <div className="border-b border-rose-100 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 block">
                    Simulador en Vivo
                  </span>
                  <h3 className="font-['Outfit'] font-black text-xl text-gray-900">
                    Tu Vaso Freséame
                  </h3>
                </div>
                <span className="text-2xl">🍓</span>
              </div>

              {/* Desglose de Selección */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Tamaño:</span>
                  <strong className="text-gray-900 capitalize">{selectedSize} ({selectedSize === 'mediano' ? '16 oz' : '24 oz'})</strong>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Base:</span>
                  <strong className="text-gray-900">{selectedBase.name}</strong>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Crema:</span>
                  <strong className="text-gray-900 text-right">{selectedCrema.name}</strong>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Aderezo:</span>
                  <strong className="text-gray-900">{selectedAderezo.name}</strong>
                </div>

                <div className="py-1">
                  <span className="text-gray-500 font-medium block mb-1">Toppings ({selectedToppings.length}):</span>
                  {selectedToppings.length === 0 ? (
                    <span className="text-gray-400 italic text-xs">Ninguno seleccionado</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {selectedToppings.map((t) => (
                        <span key={t.id} className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                          {t.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Precio Total Estimado */}
              <div className="pt-4 border-t border-rose-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Estimado</span>
                  <span className="text-2xl sm:text-3xl font-black font-['Outfit'] text-rose-600">
                    ${calculatedTotal} <span className="text-xs text-gray-500 font-medium">MXN</span>
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">Pago en sucursal</span>
              </div>

              {/* Botón WhatsApp de Envío */}
              <a
                id="btn-enviar-pedido-whatsapp"
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer text-center"
              >
                <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                <span>Enviar Pedido Armado por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setSelectedBase(BASES_DATA[0]);
                  setSelectedCrema(CREMAS_DATA[0]);
                  setSelectedAderezo(ADEREZOS_DATA[0]);
                  setSelectedToppings([]);
                  setOrderNotes('');
                }}
                className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar selección a ceros</span>
              </button>

            </div>
          </div>

        </div>

      </section>

      {/* =======================================================
          6. SECCIÓN DE SUCURSALES (GRID DE 2 SUCURSALES)
         ======================================================= */}
      <section id="sucursales" className="py-12 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 inline-flex items-center gap-1.5 mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Nuestras Ubicaciones Físicas</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-['Outfit'] text-gray-900 tracking-tight">
            Sucursales Oficiales Freséame
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Visítanos en nuestras dos ubicaciones en Ciudad de México para disfrutar tus fresas con crema recién preparadas.
          </p>
        </div>

        {/* Cuadrícula responsiva: 1 columna en móvil y 2 en escritorio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {OFFICIAL_BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className={`rounded-3xl border bg-white p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                branch.isNew
                  ? 'border-rose-300 shadow-lg shadow-rose-600/10 hover:shadow-xl hover:border-rose-400 ring-1 ring-rose-500/20'
                  : 'border-rose-100 shadow-md hover:shadow-lg hover:border-rose-200'
              }`}
            >
              {/* Resplandor decorativo si es la nueva apertura */}
              {branch.isNew && (
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-44 h-44 bg-gradient-to-br from-rose-200/50 to-pink-200/10 rounded-full blur-2xl pointer-events-none" />
              )}

              <div className="space-y-5 relative z-10">
                {/* Badges superiores de estado */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    {branch.isNew && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black uppercase tracking-wider shadow-sm animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{branch.badgeText}</span>
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-black uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{branch.openStatus}</span>
                    </span>
                  </div>

                  <span className="text-[11px] text-gray-400 font-semibold tracking-wide">
                    CDMX
                  </span>
                </div>

                {/* Título y Pin de ubicación */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-6 h-6 text-rose-600" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-['Outfit'] font-black text-xl sm:text-2xl text-gray-900 tracking-tight leading-tight">
                      {branch.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {branch.address}
                    </p>
                  </div>
                </div>

                {/* Referencia destacada en tono rosa/rojo */}
                <div className="rounded-2xl bg-rose-50/60 border border-rose-100 p-3 sm:p-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block mb-0.5">
                    📍 Ubicación exacta en la plaza:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-rose-600 leading-snug">
                    {branch.reference}
                  </p>
                </div>

                {/* Horario y WhatsApp */}
                <div className="pt-2 border-t border-rose-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>
                      <strong className="text-gray-900">Horario:</strong> {branch.hours}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${branch.phoneRaw}?text=${encodeURIComponent(`Hola Freséame! Tengo una consulta sobre la ${branch.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WhatsApp: {branch.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Botón inferior rojo a lo ancho: Google Maps */}
              <div className="pt-5 mt-4 border-t border-gray-100 relative z-10">
                <a
                  id={`maps-btn-${branch.id}`}
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xs shadow-rose-600/20 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>📍 Cómo llegar en Google Maps</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =======================================================
          7. DELIVERY HUBS & FOOTER
         ======================================================= */}
      <section id="delivery" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">
        <div className="rounded-3xl bg-white border border-rose-100 shadow-xl shadow-rose-950/5 p-6 sm:p-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Bike className="w-3.5 h-3.5" />
            Canales Oficiales
          </span>
          <h2 className="font-['Outfit'] font-black text-2xl sm:text-4xl text-gray-900 tracking-tight">
            Pide en Línea a Domicilio
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            Disfruta de nuestras fresas con crema desde la comodidad de tu casa con entrega directa en nuestras apps asociadas.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            {/* Botón de Rappi (Fondo #FF441F) */}
            <a
              id="delivery-hub-rappi"
              href="https://www.rappi.com.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 sm:p-7 rounded-3xl bg-[#FF441F] hover:bg-[#e03a19] text-white shadow-md hover:shadow-lg shadow-orange-500/25 hover:scale-[1.02] transition-transform duration-300 active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <div className="w-full h-14 bg-white rounded-2xl flex items-center justify-center p-2 mb-3 shadow-inner">
                <img 
                  src="/rappi-logo.png" 
                  alt="Rappi" 
                  className="max-h-full max-w-[130px] object-contain" 
                />
              </div>
              <span className="font-black text-xs tracking-wider text-white">
                PEDIR EN RAPPI &gt;
              </span>
            </a>

            {/* Botón de Uber Eats (Fondo negro) */}
            <a
              id="delivery-hub-ubereats"
              href="https://www.ubereats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 sm:p-7 rounded-3xl bg-black hover:bg-stone-900 text-white border border-stone-800 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <div className="w-full h-14 bg-white rounded-2xl flex items-center justify-center p-2 mb-3 shadow-inner">
                <img 
                  src="/ubereats-logo.png" 
                  alt="Uber Eats" 
                  className="max-h-full max-w-[130px] object-contain" 
                />
              </div>
              <span className="font-black text-xs tracking-wider text-[#06C167]">
                PEDIR EN UBER EATS &gt;
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer Corporativo Oficial (4 Columnas) */}
      <Footer />

      {/* =======================================================
          BOTÓN FLOTANTE PERMANENTE DE WHATSAPP (#25D366)
         ======================================================= */}
      <a
        id="floating-whatsapp-btn"
        href={WHATSAPP_UNIVERSAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir por WhatsApp a Freséame"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-25 group-hover:opacity-40 -z-10" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>

    </div>
  );
}
