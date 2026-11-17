import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Clock,
  MapPin,
  ExternalLink,
  Bike,
  Check,
  RotateCcw,
  ChevronDown,
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
export type CupSize = 'chico' | 'grande';

export interface SizeOption {
  id: CupSize;
  name: string;
  label: string;
  oz: string;
  basicPrice: number;
  premiumPrice: number;
}

export const SIZES_DATA: SizeOption[] = [
  { id: 'chico', name: 'Chico (12 oz)', label: '$90 básico / $130 premium', oz: '12 oz', basicPrice: 90, premiumPrice: 130 },
  { id: 'grande', name: 'Grande (16 oz)', label: '$130 básico / $160 premium', oz: '16 oz', basicPrice: 130, premiumPrice: 160 },
];

export interface BaseItem {
  id: string;
  name: string;
  description: string;
  tag: string;
  icon: string;
  isSpecialAntojo?: boolean;
}

export const BASES_DATA: BaseItem[] = [
  { id: 'fresas-crema', name: 'Fresas con crema', description: 'Fresas frescas seleccionadas y desinfectadas cortadas al momento.', tag: 'Estrella', icon: '🍓' },
  { id: 'uvas-crema', name: 'Uvas con crema', description: 'Uvas frescas sin semilla, dulces y crujientes con crema.', tag: 'Frescura', icon: '🍇' },
  { id: 'duraznos-crema', name: 'Duraznos con crema', description: 'Gajos de durazno dulce en su punto perfecto de maduración.', tag: 'Suave', icon: '🍑' },
  { id: 'combinados', name: 'Combinados (Fresas, Uvas y Duraznos)', description: 'Trilogía frutal fresca combinada con tu crema artesanal favorita.', tag: 'Mix Frutal', icon: '🥗' },
  { id: 'fresas-enchiladas', name: 'Fresas Enchiladas (con chamoy)', description: 'Fresas con chamoy especial, chilito y limón artesanal.', tag: 'Picosito', icon: '🌶️' },
  { id: 'waffles-freseame', name: 'Waffles Freséame', description: 'Waffle artesanal recién horneado servido con fruta y crema.', tag: 'Más Antojos ($130 / $160)', icon: '🧇', isSpecialAntojo: true },
  { id: 'crepas-freseame', name: 'Crepas Freséame', description: 'Crepa dulce suave y doradita preparada al momento.', tag: 'Más Antojos ($130 / $160)', icon: '🥞', isSpecialAntojo: true },
];

export interface CremaItem {
  id: string;
  name: string;
  description: string;
  tag: string;
}

export const CREMAS_DATA: CremaItem[] = [
  { id: 'crema-tradicional', name: 'Tradicional', description: 'Nuestra clásica crema dulce, suave y balanceada.', tag: 'Clásica' },
  { id: 'crema-casa-queso', name: 'De la casa (Queso)', description: 'Receta secreta insignia con toque cremoso estilo cheesecake dulce.', tag: '⭐ Favorita' },
  { id: 'crema-proteina', name: 'De proteína', description: 'Elaborada con proteína de alta calidad para cuidar tu línea.', tag: '💪 Fit' },
  { id: 'crema-vegana', name: 'Vegana', description: '100% de origen vegetal, libre de lácteos y deliciosa.', tag: '🌱 Plant-Based' },
  { id: 'crema-chocolate', name: 'De chocolate', description: 'Intenso y delicioso sabor a chocolate semiamargo artesanal.', tag: 'Choco Lover' },
  { id: 'crema-cafe', name: 'De café', description: 'Toque aromático gourmet con sutiles notas moka.', tag: '☕ Aromática' },
  { id: 'crema-3-leches', name: 'De 3 leches', description: 'Cremosa mezcla tradicional mexicana inspirada en 3 leches.', tag: 'Extra Dulce' },
];

export interface AderezoItem {
  id: string;
  name: string;
  icon: string;
}

export const ADEREZOS_DATA: AderezoItem[] = [
  { id: 'nutella', name: 'Nutella', icon: '🍫' },
  { id: 'lechera', name: 'Lechera', icon: '🥛' },
  { id: 'chocolate-hersheys', name: "Chocolate Hershey's", icon: '🤎' },
  { id: 'cajeta', name: 'Cajeta', icon: '🍯' },
  { id: 'chamoy-miguelito', name: 'Chamoy con miguelito', icon: '🌶️' },
];

export interface ToppingItem {
  id: string;
  name: string;
  category: 'clasico' | 'premium' | 'enchilado';
  badgeLabel: string;
}

export const TOPPINGS_DATA: ToppingItem[] = [
  // Clásicos
  { id: 'bubulubu', name: 'Bubulubu', category: 'clasico', badgeLabel: 'Clásico' },
  { id: 'galleta-oreo', name: 'Galleta Oreo', category: 'clasico', badgeLabel: 'Clásico' },
  { id: 'galleta-chokis', name: 'Galleta Chokis', category: 'clasico', badgeLabel: 'Clásico' },
  { id: 'galleta-maria', name: 'Galleta María', category: 'clasico', badgeLabel: 'Clásico' },
  { id: 'kranky', name: 'Kranky', category: 'clasico', badgeLabel: 'Clásico' },
  { id: 'snickers', name: 'Snickers', category: 'clasico', badgeLabel: 'Clásico' },
  { id: 'carlos-v', name: 'Carlos V', category: 'clasico', badgeLabel: 'Clásico' },
  { id: 'tapon', name: 'Tapón', category: 'clasico', badgeLabel: 'Clásico' },
  { id: 'tin-larin', name: 'Tin Larín', category: 'clasico', badgeLabel: 'Clásico' },
  { id: 'bocadin', name: 'Bocadín', category: 'clasico', badgeLabel: 'Clásico' },
  { id: 'mazapan', name: 'Mazapán', category: 'clasico', badgeLabel: 'Clásico' },
  { id: 'm-and-m', name: 'M&M', category: 'clasico', badgeLabel: 'Clásico' },

  // Premium
  { id: 'kit-kat', name: 'Kit Kat', category: 'premium', badgeLabel: 'Premium ⭐' },
  { id: 'kinder-delice', name: 'Kinder Delice', category: 'premium', badgeLabel: 'Premium ⭐' },
  { id: 'kinder-bueno', name: 'Kinder Bueno', category: 'premium', badgeLabel: 'Premium ⭐' },
  { id: 'hersheys-pastelito', name: "Hershey's pastelito", category: 'premium', badgeLabel: 'Premium ⭐' },
  { id: 'hersheys-cookies-creme', name: "Hershey's Cookies 'n' Creme", category: 'premium', badgeLabel: 'Premium ⭐' },
  { id: 'hersheys-almendra', name: "Hershey's almendra", category: 'premium', badgeLabel: 'Premium ⭐' },
  { id: 'ferrero', name: 'Ferrero', category: 'premium', badgeLabel: 'Premium ⭐' },
  { id: 'kinder-sorpresa', name: 'Kinder Sorpresa', category: 'premium', badgeLabel: 'Premium ⭐' },
  { id: 'freskas', name: 'Freskas', category: 'premium', badgeLabel: 'Premium ⭐' },
  { id: 'larin', name: 'Larín', category: 'premium', badgeLabel: 'Premium ⭐' },
  { id: 'conejo-turin', name: 'Conejo Turín', category: 'premium', badgeLabel: 'Premium ⭐' },

  // Enchilados
  { id: 'gomitas-chilifruta', name: 'Gomitas Chilifruta', category: 'enchilado', badgeLabel: 'Enchilado 🌶️' },
  { id: 'pica-fresa', name: 'Pica Fresa', category: 'enchilado', badgeLabel: 'Enchilado 🌶️' },
  { id: 'gomitas-fruta', name: 'Gomitas Fruta', category: 'enchilado', badgeLabel: 'Enchilado 🌶️' },
  { id: 'pulparindo', name: 'Pulparindo', category: 'enchilado', badgeLabel: 'Enchilado 🌶️' },
  { id: 'skwinkles-sandia', name: 'Skwinkles Sandía', category: 'enchilado', badgeLabel: 'Enchilado 🌶️' },
  { id: 'mini-panditas', name: 'Mini Panditas', category: 'enchilado', badgeLabel: 'Enchilado 🌶️' },
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
    subtitle: 'Nuestros tamaños Chico/Grande y bases frescas',
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
    description: 'Arranca tu semana compartiendo: llévate 2 waffles básicos al precio de 1 y disfruta el crujidito de la oblea.',
    image: '/menu/PromoLunes.png',
    badge: '¡Lunes 2x1!',
    whatsappMessage: 'Hola Freséame! Quiero aprovechar la promoción de Lunes: 2x1 en Waffles Básicos 🍓🧇',
  },
  {
    id: 'martes',
    day: 'Martes',
    title: 'Tu 2do Vaso a Mitad de Precio (Chico Clásico)',
    description: 'Aplica en tu segundo vaso tamaño chico clásico. ¡El dúo perfecto para consentirte hoy!',
    image: '/menu/PromoMartes.png',
    badge: '50% en 2do Vaso',
    whatsappMessage: 'Hola Freséame! Quiero aprovechar la promoción de Martes: 2do vaso a mitad de precio (Chico Clásico) 🍓',
  },
  {
    id: 'miercoles',
    day: 'Miércoles',
    title: 'Tu 2do Vaso a Mitad de Precio (Chico Premium)',
    description: 'Date gusto con toppings premium y aprovecha 50% de descuento en tu segundo vaso tamaño chico.',
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
  const [selectedSize, setSelectedSize] = useState<CupSize>('chico');
  const [selectedBase, setSelectedBase] = useState<BaseItem>(BASES_DATA[0]);
  const [selectedCrema, setSelectedCrema] = useState<CremaItem>(CREMAS_DATA[0]);
  const [selectedAderezo, setSelectedAderezo] = useState<AderezoItem>(ADEREZOS_DATA[0]);
  const [selectedToppings, setSelectedToppings] = useState<ToppingItem[]>([
    TOPPINGS_DATA[1], // Galleta Oreo
    TOPPINGS_DATA[14], // Kinder Bueno
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

  // Detección de Topping Premium
  const hasPremiumTopping = useMemo(() => {
    return selectedToppings.some((t) => t.category === 'premium');
  }, [selectedToppings]);

  // Cálculo en Vivo del Total según carta oficial física
  const calculatedTotal = useMemo(() => {
    const isSpecialAntojo = Boolean(selectedBase.isSpecialAntojo);
    if (isSpecialAntojo) {
      return hasPremiumTopping ? 160 : 130;
    }
    if (selectedSize === 'chico') {
      return hasPremiumTopping ? 130 : 90;
    } else {
      return hasPremiumTopping ? 160 : 130;
    }
  }, [selectedSize, selectedBase, hasPremiumTopping]);

  // Mensaje Formateado para WhatsApp del Pedido Armado
  const whatsappOrderUrl = useMemo(() => {
    const isSpecialAntojo = Boolean(selectedBase.isSpecialAntojo);
    const sizeDisplay = isSpecialAntojo ? 'Tamaño Especial (Waffle/Crepa)' : (selectedSize === 'chico' ? 'Chico (12 oz)' : 'Grande (16 oz)');
    
    const toppingsList = selectedToppings.length > 0
      ? selectedToppings.map((t) => `• ${t.name} (${t.category === 'premium' ? 'Premium ⭐' : t.category === 'enchilado' ? 'Enchilado 🌶️' : 'Clásico'})`).join('\n')
      : '• Sin toppings seleccionados';

    const tarifaTipo = hasPremiumTopping
      ? 'Tarifa Premium ⭐ (Incluye toppings premium)'
      : 'Tarifa Básica 🏷️ (Toppings clásicos / enchilados)';

    const msg = `¡Hola Freséame! 🍓 Quiero hacer el siguiente pedido personalizado:

📋 *RESUMEN DE MI PEDIDO FRESÉAME*
• *Producto / Base:* ${selectedBase.name}
• *Tamaño:* ${sizeDisplay}
• *Crema Elegida:* ${selectedCrema.name}
• *Aderezo / Jarabe:* ${selectedAderezo.name}
• *Toppings:*
${toppingsList}
• *Tipo de Tarifa:* ${tarifaTipo}
${orderNotes ? `• *Notas Especiales:* ${orderNotes}\n` : ''}
💰 *Total Oficial:* $${calculatedTotal} MXN

¿Tienen disponibilidad para pasar a recoger en sucursal? ¡Muchas gracias! ✨`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  }, [selectedSize, selectedBase, selectedCrema, selectedAderezo, selectedToppings, hasPremiumTopping, orderNotes, calculatedTotal]);

  const createWhatsAppUrl = (customText?: string) => {
    const text = customText || 'Hola Freséame! Me gustaría hacer un pedido.';
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF7EE] text-[#4A2638] font-['Outfit'] antialiased selection:bg-[#F4B8C7] selection:text-[#4A2638] flex flex-col overflow-x-hidden">
      
      {/* =======================================================
          1. NAVBAR Y LOGO DE MARCA (Con Área de Seguridad >= 10%)
         ======================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#FFF7EE]/95 backdrop-blur-md border-b border-[#F4B8C7]/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo oficial limpio: espacio libre >= 10% alrededor, sin sombras ni degradados */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('inicio');
            }}
            className="flex items-center gap-3 cursor-pointer active:scale-95 transition-transform py-1"
          >
            <div className="p-1.5 rounded-2xl bg-[#FFF7EE] shrink-0">
              <img
                src="/logo.jpg"
                alt="Freséame"
                className="h-10 sm:h-11 w-auto object-contain rounded-xl block"
              />
            </div>
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
              type="button"
              onClick={() => scrollToSection('inicio')}
              className="px-3 py-2 rounded-full text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('menu-digital')}
              className="px-3 py-2 rounded-full text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-colors cursor-pointer"
            >
              Menú Digital
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('armar-pedido')}
              className="px-4 py-1.5 rounded-full text-sm font-bold bg-[#F4B8C7] text-[#4A2638] hover:bg-[#F4B8C7]/85 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4A2638]" />
              <span>Armar Pedido</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('promociones')}
              className="px-3 py-2 rounded-full text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-colors cursor-pointer"
            >
              Promos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sucursales')}
              className="px-3 py-2 rounded-full text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-colors cursor-pointer"
            >
              Sucursales
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('delivery')}
              className="px-3 py-2 rounded-full text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/45 transition-colors cursor-pointer"
            >
              Delivery
            </button>

            <div className="h-5 w-px bg-[#F4B8C7] mx-1.5" />

            {/* Acceso Rápido a Delivery */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDeliveryDropdownOpen((prev) => !prev)}
                className="px-3.5 py-2 rounded-full text-xs font-semibold bg-[#CDE5DA] hover:bg-[#CDE5DA]/80 text-[#4A2638] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Bike className="w-3.5 h-3.5 text-[#4A2638]" />
                <span>Delivery</span>
                <ChevronDown className="w-3 h-3 text-[#4A2638]" />
              </button>

              {deliveryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#FFF7EE] rounded-2xl shadow-lg border-2 border-[#F4B8C7] p-2 z-50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A2638]/70 px-2.5 py-1 block">
                    Pide a domicilio en:
                  </span>
                  <a
                    href="https://www.ubereats.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDeliveryDropdownOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F4B8C7]/35 font-bold text-xs text-[#4A2638]"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#4A2638]" />
                    <span>Uber Eats</span>
                  </a>
                  <a
                    href="https://www.rappi.com.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDeliveryDropdownOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F4B8C7]/35 font-bold text-xs text-[#B73E5B]"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#B73E5B]" />
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
              className="min-h-[40px] px-4 py-2 rounded-full bg-[#B73E5B] hover:bg-[#9E324C] text-white text-xs lg:text-sm font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
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
              className="p-2.5 rounded-full bg-[#B73E5B] text-white"
            >
              <MessageCircle className="w-4 h-4 text-white" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Abrir menú"
              className="p-2.5 rounded-xl border border-[#F4B8C7] text-[#4A2638] hover:bg-[#F4B8C7]/30 transition-colors"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-[#4A2638] rounded-full transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`h-0.5 w-full bg-[#4A2638] rounded-full transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-[#4A2638] rounded-full transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>

        </div>

        {/* Menú Móvil Desplegable */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#F4B8C7] bg-[#FFF7EE] px-4 py-4 space-y-2 shadow-lg">
            <button
              type="button"
              onClick={() => scrollToSection('inicio')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/35"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('menu-digital')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/35"
            >
              Menú Digital
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('armar-pedido')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-[#4A2638] bg-[#F4B8C7] flex items-center justify-between"
            >
              <span>Armar Pedido (Simulador)</span>
              <Sparkles className="w-4 h-4 text-[#4A2638]" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('promociones')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/35"
            >
              Promociones de la Semana
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sucursales')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/35"
            >
              Sucursales (Tlatelolco y Clavería)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('delivery')}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-[#4A2638] hover:bg-[#F4B8C7]/35"
            >
              Delivery Oficial
            </button>

            <div className="pt-2 border-t border-[#F4B8C7]/50">
              <a
                href={WHATSAPP_UNIVERSAL_URL}
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

      {/* =======================================================
          2. HERO SECTION
         ======================================================= */}
      <section
        id="inicio"
        className="relative pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-[#FFF7EE]"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[620px] h-[300px] sm:h-[380px] bg-gradient-to-tr from-[#F4B8C7]/35 via-[#FFF7EE] to-[#CDE5DA]/35 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Badge superior en Menta Suave con texto Ciruela */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CDE5DA] text-[#4A2638] text-xs sm:text-sm font-semibold tracking-wide mb-5">
            <span className="text-base">🍓</span>
            <span>¿Qué se te antoja hoy? • Fruta fresca del día</span>
          </div>

          {/* Título principal en DynaPuff */}
          <h1 className="font-['DynaPuff'] font-bold text-3xl sm:text-5xl md:text-6xl text-[#4A2638] leading-[1.15] max-w-3xl">
            Fresas con crema{' '}
            <span className="text-[#B73E5B]">
              exactamente a tu gusto
            </span>
          </h1>

          {/* Subtítulo con slogan y tono verbal cercano */}
          <p className="mt-4 text-base sm:text-lg text-[#4A2638]/85 max-w-2xl leading-relaxed font-normal">
            <strong className="font-bold text-[#4A2638]">«El límite lo pones tú»</strong>. ¿Una cucharadita? Eso dijiste hace tres. Arma tu combinación con fruta fresquecita al momento, 7 cremas artesanales y tus toppings favoritos.
          </p>

          {/* Botones principales */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollToSection('armar-pedido')}
              className="min-h-[48px] px-8 py-3.5 rounded-2xl bg-[#B73E5B] hover:bg-[#9E324C] text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span>Armar Mi Vaso en Vivo</span>
            </button>

            <a
              id="hero-cta-whatsapp"
              href={WHATSAPP_UNIVERSAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-7 py-3.5 rounded-2xl bg-[#F4B8C7] hover:bg-[#F4B8C7]/85 text-[#4A2638] font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-[#4A2638]" />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>

          {/* Badges de confianza con identidad verbal */}
          <div className="mt-10 pt-6 border-t border-[#F4B8C7]/60 grid grid-cols-3 gap-2 sm:gap-6 text-center w-full max-w-2xl">
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl mb-1">🍓</span>
              <span className="text-xs sm:text-sm font-bold text-[#4A2638]">Fruta 100% Fresca</span>
              <span className="text-[11px] text-[#4A2638]/75 hidden sm:block">Cortada y lista para ti</span>
            </div>

            <div className="flex flex-col items-center border-x border-[#F4B8C7]/60 px-2">
              <span className="text-xl sm:text-2xl mb-1">🥛</span>
              <span className="text-xs sm:text-sm font-bold text-[#4A2638]">7 Cremas Artesanales</span>
              <span className="text-[11px] text-[#4A2638]/75 hidden sm:block">¿Una cucharadita? Eso dijiste hace tres</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl mb-1">🍫</span>
              <span className="text-xs sm:text-sm font-bold text-[#4A2638]">El crujidito de la oblea</span>
              <span className="text-[11px] text-[#4A2638]/75 hidden sm:block">Clásicos, premium y picositos</span>
            </div>
          </div>

        </div>
      </section>

      {/* =======================================================
          3. PROMOCIONES DE LA SEMANA
         ======================================================= */}
      <section id="promociones" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F4B8C7]/25 border-y border-[#F4B8C7]/60 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-semibold text-[#4A2638] uppercase tracking-widest bg-[#CDE5DA] px-4 py-1.5 rounded-full inline-block mb-3">
              ¿Qué se te antoja hoy? • Ahorra con Freséame
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-['DynaPuff'] text-[#4A2638]">
              Promociones de la Semana
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#4A2638]/85 font-normal">
              Aprovecha nuestras ofertas en sucursales Patio Clavería y Puerta Tlatelolco, o pídelas directo por WhatsApp.
            </p>
          </div>

          {/* Grid de 3 tarjetas de promociones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {WEEKLY_PROMOS.map((promo) => (
              <div
                key={promo.id}
                className="bg-[#FFF7EE] rounded-3xl border-2 border-[#F4B8C7] hover:border-[#B73E5B]/60 transition-all flex flex-col overflow-hidden group"
              >
                <div className="relative aspect-[4/3] bg-[#F4B8C7]/20 overflow-hidden flex items-center justify-center p-2">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#B73E5B] text-white text-xs font-bold">
                    {promo.day}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#CDE5DA] text-[#4A2638] text-[11px] font-semibold">
                    {promo.badge}
                  </span>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-['DynaPuff'] font-bold text-lg text-[#4A2638] leading-snug">
                      {promo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A2638]/80 leading-relaxed font-normal">
                      {promo.description}
                    </p>
                  </div>

                  <a
                    href={createWhatsAppUrl(promo.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#B73E5B] hover:bg-[#9E324C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer mt-auto"
                  >
                    <MessageCircle className="w-4 h-4 text-white shrink-0" />
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
          <span className="text-xs font-semibold text-[#4A2638] uppercase tracking-widest bg-[#CDE5DA] px-4 py-1.5 rounded-full inline-block mb-3">
            Cartelera Digital Oficial
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-['DynaPuff'] text-[#4A2638]">
            Nuestro Menú en Imágenes
          </h2>
          <p className="text-xs sm:text-sm text-[#4A2638]/80 max-w-md mx-auto mt-2 font-normal">
            Explora nuestras 4 láminas oficiales y ve planeando tu próximo antojo: bases, toppings, waffles y crepas.
          </p>
        </div>

        {/* Contenedor crema con borde Rosa Fresa */}
        <div className="relative overflow-hidden rounded-3xl bg-[#FFF7EE] border-2 border-[#F4B8C7] p-3 sm:p-5">
          
          <div className="absolute top-4 sm:top-6 left-4 sm:left-7 z-20 flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#CDE5DA] text-[#4A2638]">
              <Sparkles className="w-3.5 h-3.5 text-[#4A2638]" />
              <span className="font-bold">{MENU_SLIDES[currentSlide].title}</span>
              <span className="text-[#4A2638]/40">|</span>
              <span className="text-[#4A2638]/80">{currentSlide + 1} de {MENU_SLIDES.length}</span>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[640px] flex items-center justify-center bg-[#F4B8C7]/15 rounded-2xl select-none overflow-hidden">
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
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Lámina anterior"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#FFF7EE] hover:bg-[#F4B8C7] border border-[#F4B8C7] text-[#4A2638] transition-all active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Lámina siguiente"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#FFF7EE] hover:bg-[#F4B8C7] border border-[#F4B8C7] text-[#4A2638] transition-all active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="absolute bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7EE]/95 border border-[#F4B8C7]">
              {MENU_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleGoToSlide(idx)}
                    aria-label={`Ir a ${slide.title}`}
                    className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                      isActive ? 'w-7 sm:w-8 bg-[#B73E5B]' : 'w-2.5 bg-[#F4B8C7] hover:bg-[#B73E5B]/60'
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
      <section id="armar-pedido" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        
        {/* Header del Armador */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#4A2638] uppercase tracking-widest bg-[#CDE5DA] px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#4A2638]" />
            <span>El límite lo pones tú • Paso a Paso</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-['DynaPuff'] text-[#4A2638]">
            Arma tu Vaso en 4 Sencillos Pasos
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4A2638]/85 font-normal">
            ¿Qué se te antoja hoy? Elige tu tamaño, tu base favorita, la crema artesanal, el aderezo y tus toppings. Checa tu total en vivo y mándalo directo a WhatsApp.
          </p>
        </div>

        {/* Layout en 2 columnas: Pasos interactivos (Izq) y Resumen en vivo (Der) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Los 4 Pasos (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Selector de Tamaño de Vaso */}
            <div className="bg-[#FFF7EE] rounded-3xl border-2 border-[#F4B8C7] p-5 sm:p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B73E5B] block mb-3">
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
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#B73E5B] bg-[#F4B8C7] text-[#4A2638]'
                          : 'border-[#F4B8C7] hover:bg-[#F4B8C7]/30 bg-[#FFF7EE] text-[#4A2638]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-['DynaPuff'] font-bold text-lg text-[#4A2638]">
                            {size.name}
                          </span>
                          {isSelected && (
                            <span className="text-xs bg-[#B73E5B] text-white px-2.5 py-0.5 rounded-full font-bold">
                              Activo
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#4A2638]/85 mt-1 font-semibold">{size.label}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-[#B73E5B] bg-[#B73E5B] text-white' : 'border-[#4A2638]/30'}`}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedBase.isSpecialAntojo && (
                <div className="mt-3 p-3.5 rounded-2xl bg-[#CDE5DA] text-xs text-[#4A2638] font-semibold flex items-center gap-2">
                  <span>🧇</span>
                  <span>Has elegido <strong className="font-bold">{selectedBase.name}</strong>: cuenta con tarifa única de <strong className="font-bold">$130</strong> (Básico) o <strong className="font-bold">$160</strong> (Premium).</span>
                </div>
              )}
            </div>

            {/* Selector de Pasos en Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#F4B8C7]">
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
                      ? 'bg-[#B73E5B] text-white'
                      : 'bg-[#FFF7EE] text-[#4A2638] hover:bg-[#F4B8C7]/40 border border-[#F4B8C7]'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* TAB 1: Base */}
            {activeStepTab === 1 && (
              <div className="bg-[#FFF7EE] rounded-3xl border-2 border-[#F4B8C7] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-['DynaPuff'] font-bold text-lg text-[#4A2638]">
                    Paso 1 • Selecciona tu Base
                  </h3>
                  <span className="text-xs text-[#B73E5B] font-bold">Base seleccionada: {selectedBase.name}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BASES_DATA.map((base) => {
                    const isSelected = selectedBase.id === base.id;
                    return (
                      <button
                        key={base.id}
                        type="button"
                        onClick={() => setSelectedBase(base)}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'border-[#B73E5B] bg-[#F4B8C7] text-[#4A2638]'
                            : 'border-[#F4B8C7] hover:bg-[#F4B8C7]/25 bg-[#FFF7EE] text-[#4A2638]'
                        }`}
                      >
                        <span className="text-2xl shrink-0 p-2 bg-[#FFF7EE] rounded-xl">{base.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-1 flex-wrap">
                            <span className="font-bold text-sm text-[#4A2638]">{base.name}</span>
                            <span className="text-[10px] font-semibold bg-[#CDE5DA] text-[#4A2638] px-2.5 py-0.5 rounded-full">
                              {base.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#4A2638]/80 mt-1 leading-snug font-normal">{base.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: Crema */}
            {activeStepTab === 2 && (
              <div className="bg-[#FFF7EE] rounded-3xl border-2 border-[#F4B8C7] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-['DynaPuff'] font-bold text-lg text-[#4A2638]">
                    Paso 2 • Elige tu Crema Artesanal
                  </h3>
                  <span className="text-xs text-[#B73E5B] font-bold">{selectedCrema.name}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CREMAS_DATA.map((crema) => {
                    const isSelected = selectedCrema.id === crema.id;
                    return (
                      <button
                        key={crema.id}
                        type="button"
                        onClick={() => setSelectedCrema(crema)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#B73E5B] bg-[#F4B8C7] text-[#4A2638]'
                            : 'border-[#F4B8C7] hover:bg-[#F4B8C7]/25 bg-[#FFF7EE] text-[#4A2638]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5 gap-2">
                          <span className="font-bold text-sm text-[#4A2638]">{crema.name}</span>
                          <span className="text-[10px] bg-[#CDE5DA] text-[#4A2638] px-2.5 py-0.5 rounded-full font-semibold">
                            {crema.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#4A2638]/80 leading-snug font-normal">{crema.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: Aderezos */}
            {activeStepTab === 3 && (
              <div className="bg-[#FFF7EE] rounded-3xl border-2 border-[#F4B8C7] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-['DynaPuff'] font-bold text-lg text-[#4A2638]">
                    Paso 3 • Selecciona tu Aderezo o Jarabe
                  </h3>
                  <span className="text-xs text-[#B73E5B] font-bold">{selectedAderezo.name}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADEREZOS_DATA.map((aderezo) => {
                    const isSelected = selectedAderezo.id === aderezo.id;
                    return (
                      <button
                        key={aderezo.id}
                        type="button"
                        onClick={() => setSelectedAderezo(aderezo)}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-[#B73E5B] bg-[#F4B8C7] text-[#4A2638]'
                            : 'border-[#F4B8C7] hover:bg-[#F4B8C7]/25 bg-[#FFF7EE] text-[#4A2638]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{aderezo.icon}</span>
                          <span className="font-bold text-xs sm:text-sm text-[#4A2638]">{aderezo.name}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-[#B73E5B] bg-[#B73E5B] text-white' : 'border-[#4A2638]/30'}`}>
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
              <div className="bg-[#FFF7EE] rounded-3xl border-2 border-[#F4B8C7] p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-['DynaPuff'] font-bold text-lg text-[#4A2638]">
                    Paso 4 • Elige tus Toppings Favoritos
                  </h3>
                  <span className="text-xs font-bold text-[#B73E5B]">
                    {selectedToppings.length} seleccionados
                  </span>
                </div>

                {/* Filtro por categoría */}
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { id: 'all', label: 'Todos' },
                    { id: 'clasico', label: 'Clásicos' },
                    { id: 'premium', label: 'Premium' },
                    { id: 'enchilado', label: 'Enchilados' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setToppingsFilter(cat.id as 'all' | 'clasico' | 'premium' | 'enchilado')}
                      className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                        toppingsFilter === cat.id
                          ? 'bg-[#B73E5B] text-white font-bold'
                          : 'bg-[#CDE5DA] text-[#4A2638] hover:bg-[#F4B8C7]'
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
                        className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'border-[#B73E5B] bg-[#F4B8C7] text-[#4A2638]'
                            : 'border-[#F4B8C7] hover:bg-[#F4B8C7]/25 bg-[#FFF7EE] text-[#4A2638]'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-xs text-[#4A2638] block truncate">{topping.name}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-1 ${
                            topping.category === 'premium'
                              ? 'bg-[#FFF7EE] text-[#4A2638] border border-[#B73E5B]/40'
                              : topping.category === 'enchilado'
                              ? 'bg-[#F4B8C7]/60 text-[#4A2638]'
                              : 'bg-[#CDE5DA] text-[#4A2638]'
                          }`}>
                            {topping.badgeLabel}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-[#B73E5B] bg-[#B73E5B] text-white' : 'border-[#4A2638]/30'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notas opcionales */}
            <div className="bg-[#FFF7EE] rounded-3xl border-2 border-[#F4B8C7] p-4 sm:p-5">
              <label htmlFor="order-notes" className="text-xs font-bold text-[#4A2638] block mb-1.5">
                ¿Algún detallito extra para tu antojo? (Opcional):
              </label>
              <input
                id="order-notes"
                type="text"
                placeholder="Ej. Poca crema, topping por separado, bien frío..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF7EE] border border-[#F4B8C7] focus:outline-none focus:border-[#B73E5B] text-xs sm:text-sm text-[#4A2638] placeholder:text-[#4A2638]/50 font-normal"
              />
            </div>

          </div>

          {/* Columna Derecha: Tarjeta Simulador / Resumen en Vivo (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-[#F4B8C7]/35 rounded-3xl border-2 border-[#F4B8C7] p-6 space-y-5">
              
              <div className="border-b border-[#F4B8C7] pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B73E5B] block">
                    Simulador en Vivo
                  </span>
                  <h3 className="font-['DynaPuff'] font-bold text-xl text-[#4A2638] mt-0.5">
                    Tu Vaso Freséame
                  </h3>
                </div>
                <span className="text-2xl">🍓</span>
              </div>

              {/* Desglose de Selección */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1 border-b border-[#F4B8C7]/60">
                  <span className="text-[#4A2638]/75 font-normal">Tamaño:</span>
                  <strong className="text-[#4A2638] font-bold">
                    {selectedBase.isSpecialAntojo ? 'Especial Waffles / Crepas' : (selectedSize === 'chico' ? 'Chico (12 oz)' : 'Grande (16 oz)')}
                  </strong>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#F4B8C7]/60">
                  <span className="text-[#4A2638]/75 font-normal">Base:</span>
                  <strong className="text-[#4A2638] font-bold text-right">{selectedBase.name}</strong>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#F4B8C7]/60">
                  <span className="text-[#4A2638]/75 font-normal">Crema:</span>
                  <strong className="text-[#4A2638] font-bold text-right">{selectedCrema.name}</strong>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#F4B8C7]/60">
                  <span className="text-[#4A2638]/75 font-normal">Aderezo:</span>
                  <strong className="text-[#4A2638] font-bold text-right">{selectedAderezo.name}</strong>
                </div>

                <div className="py-1 border-b border-[#F4B8C7]/60 pb-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#4A2638]/75 font-normal">Toppings ({selectedToppings.length}):</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      hasPremiumTopping
                        ? 'bg-[#F4B8C7] text-[#4A2638] border border-[#B73E5B]/40'
                        : 'bg-[#CDE5DA] text-[#4A2638]'
                    }`}>
                      {hasPremiumTopping ? '⭐ Tarifa Premium' : '🏷️ Tarifa Básica'}
                    </span>
                  </div>
                  {selectedToppings.length === 0 ? (
                    <span className="text-[#4A2638]/60 italic text-xs font-normal">Sin toppings (Tarifa básica)</span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedToppings.map((t) => (
                        <span key={t.id} className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                          t.category === 'premium'
                            ? 'bg-[#F4B8C7] text-[#4A2638] border border-[#B73E5B]/30'
                            : 'bg-[#CDE5DA] text-[#4A2638]'
                        }`}>
                          {t.name} {t.category === 'premium' ? '⭐' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Precio Total Oficial y Tarifa (DynaPuff en precios destacados) */}
              <div className="pt-2 border-t border-[#F4B8C7] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#4A2638]/75 block">Total Oficial</span>
                  <span className="text-2xl sm:text-3xl font-bold font-['DynaPuff'] text-[#4A2638]">
                    ${calculatedTotal}{' '}
                    <span className="text-xs font-['Outfit'] text-[#4A2638]/80 font-semibold">MXN</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-[#4A2638]/75 block">Tarifa Aplicada:</span>
                  <span className="text-xs font-bold text-[#4A2638]">
                    {hasPremiumTopping ? 'Con Topping Premium' : 'Con Topping Básico'}
                  </span>
                </div>
              </div>

              {/* Botón WhatsApp de Envío (Frambuesa CTA primario) */}
              <a
                id="btn-enviar-pedido-whatsapp"
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl bg-[#B73E5B] hover:bg-[#9E324C] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer text-center"
              >
                <MessageCircle className="w-5 h-5 text-white shrink-0" />
                <span>Enviar Pedido Armado por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setSelectedSize('chico');
                  setSelectedBase(BASES_DATA[0]);
                  setSelectedCrema(CREMAS_DATA[0]);
                  setSelectedAderezo(ADEREZOS_DATA[0]);
                  setSelectedToppings([]);
                  setOrderNotes('');
                }}
                className="w-full text-center text-xs text-[#4A2638]/70 hover:text-[#4A2638] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
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
      <section id="sucursales" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold text-[#4A2638] uppercase tracking-widest bg-[#CDE5DA] px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#4A2638]" />
            <span>Nuestras Ubicaciones Físicas</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-['DynaPuff'] text-[#4A2638]">
            Sucursales Oficiales Freséame
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4A2638]/85 font-normal">
            Lánzate por tu antojo a nuestras dos ubicaciones en Ciudad de México y disfruta tus fresas recién preparadas.
          </p>
        </div>

        {/* Cuadrícula responsiva: 1 columna en móvil y 2 en escritorio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {OFFICIAL_BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className={`rounded-3xl border-2 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                branch.isNew
                  ? 'bg-[#F4B8C7]/25 border-[#B73E5B]/50'
                  : 'bg-[#FFF7EE] border-[#F4B8C7]'
              }`}
            >
              <div className="space-y-5 relative z-10">
                {/* Badges superiores de estado */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    {branch.isNew && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B73E5B] text-white text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{branch.badgeText}</span>
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CDE5DA] text-[#4A2638] text-xs font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-[#4A2638]" />
                      <span>{branch.openStatus}</span>
                    </span>
                  </div>

                  <span className="text-[11px] text-[#4A2638]/70 font-semibold tracking-wide">
                    CDMX
                  </span>
                </div>

                {/* Título (DynaPuff) y Pin de ubicación */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4B8C7] text-[#4A2638] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#4A2638]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-['DynaPuff'] font-bold text-xl sm:text-2xl text-[#4A2638] leading-tight">
                      {branch.name}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#4A2638]/85 leading-relaxed font-normal">
                      {branch.address}
                    </p>
                  </div>
                </div>

                {/* Referencia destacada en tono Rosa Fresa con texto Ciruela */}
                <div className="rounded-2xl bg-[#F4B8C7]/45 border border-[#F4B8C7] p-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A2638] block mb-0.5">
                    📍 Ubicación exacta en la plaza:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#4A2638] leading-snug">
                    {branch.reference}
                  </p>
                </div>

                {/* Horario y WhatsApp */}
                <div className="pt-2 border-t border-[#F4B8C7]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#4A2638]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#B73E5B] shrink-0" />
                    <span>
                      <strong className="text-[#4A2638] font-bold">Horario:</strong> {branch.hours}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${branch.phoneRaw}?text=${encodeURIComponent(`Hola Freséame! Tengo una consulta sobre la ${branch.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#B73E5B] hover:text-[#4A2638] font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#B73E5B] shrink-0" />
                    <span>WhatsApp: {branch.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Botón inferior Frambuesa a lo ancho: Google Maps */}
              <div className="pt-5 mt-4 border-t border-[#F4B8C7]/60 relative z-10">
                <a
                  id={`maps-btn-${branch.id}`}
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-[#B73E5B] hover:bg-[#9E324C] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
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
        <div className="rounded-3xl bg-[#F4B8C7]/30 border-2 border-[#F4B8C7] p-6 sm:p-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CDE5DA] text-[#4A2638] text-xs font-semibold uppercase tracking-wider mb-3">
            <Bike className="w-3.5 h-3.5 text-[#4A2638]" />
            Canales Oficiales
          </span>
          <h2 className="font-['DynaPuff'] font-bold text-2xl sm:text-4xl text-[#4A2638]">
            Pide en Línea a Domicilio
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4A2638]/85 max-w-lg mx-auto font-normal">
            ¿Antojo sin salir de casa? Disfruta tus fresas con crema directo en tu puerta desde nuestras apps asociadas.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            {/* Botón de Rappi (Fondo #FF441F) */}
            <a
              id="delivery-hub-rappi"
              href="https://www.rappi.com.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 sm:p-7 rounded-3xl bg-[#FF441F] hover:bg-[#e03a19] text-white hover:scale-[1.02] transition-transform duration-300 active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <div className="w-full h-14 bg-white rounded-2xl flex items-center justify-center p-2 mb-3">
                <img 
                  src="/rappi-logo.png" 
                  alt="Rappi" 
                  className="max-h-full max-w-[130px] object-contain" 
                />
              </div>
              <span className="font-bold text-xs tracking-wider text-white">
                PEDIR EN RAPPI &gt;
              </span>
            </a>

            {/* Botón de Uber Eats (Fondo Ciruela #4A2638 en lugar de negro puro) */}
            <a
              id="delivery-hub-ubereats"
              href="https://www.ubereats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 sm:p-7 rounded-3xl bg-[#4A2638] hover:bg-[#3A1D2B] text-[#FFF7EE] border border-[#4A2638] hover:scale-[1.02] transition-transform duration-300 active:scale-95 flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <div className="w-full h-14 bg-white rounded-2xl flex items-center justify-center p-2 mb-3">
                <img 
                  src="/ubereats-logo.png" 
                  alt="Uber Eats" 
                  className="max-h-full max-w-[130px] object-contain" 
                />
              </div>
              <span className="font-bold text-xs tracking-wider text-[#CDE5DA]">
                PEDIR EN UBER EATS &gt;
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer Corporativo Oficial (4 Columnas en Ciruela #4A2638) */}
      <Footer />

      {/* =======================================================
          BOTÓN FLOTANTE PERMANENTE DE WHATSAPP (Frambuesa #B73E5B)
         ======================================================= */}
      <a
        id="floating-whatsapp-btn"
        href={WHATSAPP_UNIVERSAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir por WhatsApp a Freséame"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#B73E5B] hover:bg-[#9E324C] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4B8C7] opacity-40 group-hover:opacity-60 -z-10" />
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

    </div>
  );
}
