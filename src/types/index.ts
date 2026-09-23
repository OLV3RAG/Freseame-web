export type CategoryType = 'frutales' | 'plancha' | 'frappes';

export interface BaseOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  calories: string;
  tag: string;
  icon: string;
  type: 'fruta' | 'plancha';
  color: string;
}

export interface CremaOption {
  id: string;
  name: string;
  description: string;
  tag: string;
  extraPrice: number;
  color: string;
  texture: string;
}

export interface AderezoOption {
  id: string;
  name: string;
  description: string;
  color: string;
  accentColor: string;
}

export interface ToppingOption {
  id: string;
  name: string;
  category: 'chocolates' | 'galletas' | 'picositos' | 'frutos_secos' | 'dulces';
  isPopular?: boolean;
  extraPrice: number;
  emoji: string;
}

export type CupSize = 'chico' | 'mediano' | 'grande';

export interface SizeConfig {
  id: CupSize;
  name: string;
  label: string;
  multiplier: number;
  includedToppings: number;
  oz: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  price: number;
  tag?: string;
  tagColor?: string;
  ingredients: string[];
  isFrappe?: boolean;
  flavorNotes?: string;
}

export interface CustomOrderState {
  size: CupSize;
  base: BaseOption | null;
  crema: CremaOption | null;
  aderezo: AderezoOption | null;
  toppings: ToppingOption[];
  notes: string;
}

export interface PresetCombo {
  id: string;
  title: string;
  subtitle: string;
  baseId: string;
  cremaId: string;
  aderezoId: string;
  toppingIds: string[];
  tag: string;
  tagColor: string;
}
