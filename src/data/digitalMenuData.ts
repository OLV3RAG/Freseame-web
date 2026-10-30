export interface DigitalMenuBase {
  id: string;
  name: string;
  tagline?: string;
  icon: string;
}

export interface DigitalMenuCrema {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
}

export interface DigitalMenuSizePricing {
  size: 'Chico' | 'Grande';
  sizeLabel: string;
  basicToppingPrice: number;
  premiumToppingPrice: number;
}

export interface DigitalMenuSlide1Data {
  id: 'slide-arma-tu-vaso';
  slideNumber: 1;
  title: string;
  subtitle: string;
  badge: string;
  bases: DigitalMenuBase[];
  cremas: DigitalMenuCrema[];
  pricing: DigitalMenuSizePricing[];
}

export interface DigitalMenuSlide2Data {
  id: 'slide-toppings';
  slideNumber: 2;
  title: string;
  subtitle: string;
  badge: string;
  clasicos: string[];
  premium: string[];
  enchilados: {
    title: string;
    items: string[];
    specialtyName: string;
    specialtyDescription: string;
  };
}

export interface DigitalMenuExtraTreat {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  pricing: {
    basicPrice: number;
    premiumPrice: number;
  };
  features: string[];
}

export interface DigitalMenuSlide3Data {
  id: 'slide-mas-antojos';
  slideNumber: 3;
  title: string;
  subtitle: string;
  badge: string;
  items: DigitalMenuExtraTreat[];
}

export type DigitalMenuSlide =
  | DigitalMenuSlide1Data
  | DigitalMenuSlide2Data
  | DigitalMenuSlide3Data;

/**
 * Datos 100% fidedignos extraídos de la Cartelera Digital Animada "MENU ANIMADO_FRESEAME.mp4"
 * de Freseame (Edición Día de Muertos / Franquicia).
 */
export const DIGITAL_MENU_DATA: {
  slide1: DigitalMenuSlide1Data;
  slide2: DigitalMenuSlide2Data;
  slide3: DigitalMenuSlide3Data;
} = {
  slide1: {
    id: 'slide-arma-tu-vaso',
    slideNumber: 1,
    title: 'Arma tu Freséame',
    subtitle: 'Elige tu base, tu crema artesanal y tu combinación de tamaño y topping',
    badge: 'Paso a Paso',
    bases: [
      { id: 'fresas', name: 'Fresas', tagline: 'Frescas y seleccionadas', icon: '🍓' },
      { id: 'uvas', name: 'Uvas', tagline: 'Jugosas sin semilla', icon: '🍇' },
      { id: 'duraznos', name: 'Duraznos', tagline: 'En almíbar suave', icon: '🍑' },
      { id: 'combinados', name: 'Combinados', tagline: 'Tu mezcla favorita', icon: '✨' },
    ],
    cremas: [
      { id: 'casa-queso', name: 'De la casa (Queso)', badge: 'Especialidad', popular: true },
      { id: 'tradicional', name: 'Tradicional', popular: true },
      { id: 'proteina', name: 'Proteína' },
      { id: 'vegana', name: 'Vegana' },
      { id: 'chocolate', name: 'Chocolate' },
      { id: 'cafe', name: 'Café' },
      { id: 'tres-leches', name: '3 Leches', badge: 'Favorito' },
    ],
    pricing: [
      {
        size: 'Chico',
        sizeLabel: 'Vaso Chico',
        basicToppingPrice: 90,
        premiumToppingPrice: 130,
      },
      {
        size: 'Grande',
        sizeLabel: 'Vaso Grande',
        basicToppingPrice: 130,
        premiumToppingPrice: 160,
      },
    ],
  },

  slide2: {
    id: 'slide-toppings',
    slideNumber: 2,
    title: 'Variedad de Toppings',
    subtitle: 'Elige entre nuestras selecciones Clásicas, Premium y la línea Enchilada',
    badge: 'Toppings & Chamoy',
    clasicos: [
      'Bubulubu',
      'Galleta Oreo',
      'Galleta Chokis',
      'Galleta María',
      'Kranky',
      'Snickers',
      'Carlos V',
      'Tapón',
      'Tin Larín',
      'Bocadín',
      'Mazapán',
      'M&M',
      'Nuez',
      'Coco rayado',
      'Granillo de chocolate',
    ],
    premium: [
      'Kit Kat',
      "Hershey's pastelito",
      "Hershey's Cookies n Creme",
      "Hershey's almendra",
      'Freskas',
      'Larín',
      'Conejo Turín',
    ],
    enchilados: {
      title: '¿Se te antoja algo picosito? - Toppings Enchilados',
      items: [
        'Gomitas chilifruta',
        'Pica Fresa',
        'Gomitas Fruta',
        'Pulparindo',
        'Skwinkles Sandía',
        'Mini Panditas',
      ],
      specialtyName: 'Fresas Enchiladas',
      specialtyDescription: 'Con chamoy y tus toppings enchilados favoritos',
    },
  },

  slide3: {
    id: 'slide-mas-antojos',
    slideNumber: 3,
    title: 'Más Antojos',
    subtitle: 'Waffles y Crepas hechos al momento con tus toppings e ingredientes favoritos',
    badge: 'Plancha & Antojitos',
    items: [
      {
        id: 'waffles',
        name: 'Waffles',
        subtitle: 'Personalízalos con crema y tus toppings favoritos',
        icon: '🧇',
        pricing: {
          basicPrice: 130,
          premiumPrice: 160,
        },
        features: [
          'Hechos al momento y doraditos',
          'Acompañados con crema artesanal',
          'Elige Topping Básico o Premium',
        ],
      },
      {
        id: 'crepas',
        name: 'Crepas',
        subtitle: 'Personalízalas con crema y tus toppings favoritos',
        icon: '🥞',
        pricing: {
          basicPrice: 130,
          premiumPrice: 160,
        },
        features: [
          'Masa suave y dorada al estilo francés',
          'Relleno abundante a tu elección',
          'Elige Topping Básico o Premium',
        ],
      },
    ],
  },
};

export const MENU_SLIDES_LIST: DigitalMenuSlide[] = [
  DIGITAL_MENU_DATA.slide1,
  DIGITAL_MENU_DATA.slide2,
  DIGITAL_MENU_DATA.slide3,
];
