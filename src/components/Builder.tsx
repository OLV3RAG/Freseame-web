import React, { useState, useMemo } from 'react';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  MessageCircle,
  Copy,
  CheckCheck,
  Search,
  AlertCircle,
  Heart,
  RotateCcw,
  Info,
  ShoppingBag,
  Bike,
  Receipt,
  MapPin,
  Clock,
  Download,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import logoImg from '../logo.jpg';
import { generatePdfTicket } from '../utils/generatePdfTicket';
import {
  BASES,
  CREMAS,
  ADEREZOS,
  TOPPINGS,
  SIZES,
  PRESET_COMBOS,
  WHATSAPP_PHONE,
} from '../data/freseameData';
import {
  BaseOption,
  CremaOption,
  AderezoOption,
  ToppingOption,
  CupSize,
  CustomOrderState,
} from '../types';
import { DessertVisualizer } from './DessertVisualizer';

interface BuilderProps {
  orderState: CustomOrderState;
  setOrderState: React.Dispatch<React.SetStateAction<CustomOrderState>>;
}

export const Builder: React.FC<BuilderProps> = ({ orderState, setOrderState }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [toppingCategory, setToppingCategory] = useState<string>('all');
  const [toppingSearch, setToppingSearch] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [orderMode, setOrderMode] = useState<'pickup' | 'delivery'>('pickup');
  const [orderFolio, setOrderFolio] = useState<string>(() => `FSM-${Math.floor(100 + Math.random() * 900)}`);
  const [ticketLogoError, setTicketLogoError] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfToast, setPdfToast] = useState<boolean>(false);

  const generateNewFolio = () => {
    setOrderFolio(`FSM-${Math.floor(100 + Math.random() * 900)}`);
  };

  const steps = [
    { number: 1, label: 'Base', icon: '🍓', desc: 'Elige tu base frutal u horneada' },
    { number: 2, label: 'Crema', icon: '🥛', desc: 'Selecciona tu crema artesanal' },
    { number: 3, label: 'Aderezo', icon: '🍯', desc: 'Elige tu salsa o jarabe' },
    { number: 4, label: 'Toppings', icon: '🍫', desc: 'Elige 2 o más toppings' },
    { number: 5, label: 'Confirmar', icon: '✨', desc: 'Revisa y envía a WhatsApp' },
  ];

  const currentSizeConfig = useMemo(() => {
    return SIZES.find((s) => s.id === orderState.size) || SIZES[1];
  }, [orderState.size]);

  // Dynamic price calculation
  const calculatedTotal = useMemo(() => {
    let total = 0;
    if (orderState.base) {
      total += orderState.base.basePrice;
    } else {
      total += 75; // Default reference
    }

    if (orderState.crema) {
      total += orderState.crema.extraPrice;
    }

    // Multiply by size multiplier
    total = Math.round(total * currentSizeConfig.multiplier);

    // Extra toppings beyond included toppings
    const included = currentSizeConfig.includedToppings;
    if (orderState.toppings.length > included) {
      const extraCount = orderState.toppings.length - included;
      // Flat extra or specific
      total += extraCount * 12;
    }

    return total;
  }, [orderState.base, orderState.crema, currentSizeConfig, orderState.toppings]);

  // Handler for Base selection
  const handleSelectBase = (base: BaseOption) => {
    setOrderState((prev) => ({ ...prev, base }));
    setSelectedPresetId(null);
  };

  // Handler for Crema selection
  const handleSelectCrema = (crema: CremaOption) => {
    setOrderState((prev) => ({ ...prev, crema }));
    setSelectedPresetId(null);
  };

  // Handler for Aderezo selection
  const handleSelectAderezo = (aderezo: AderezoOption) => {
    setOrderState((prev) => ({ ...prev, aderezo }));
    setSelectedPresetId(null);
  };

  // Handler for Topping toggle
  const handleToggleTopping = (topping: ToppingOption) => {
    setOrderState((prev) => {
      const exists = prev.toppings.some((t) => t.id === topping.id);
      if (exists) {
        return {
          ...prev,
          toppings: prev.toppings.filter((t) => t.id !== topping.id),
        };
      } else {
        return {
          ...prev,
          toppings: [...prev.toppings, topping],
        };
      }
    });
    setSelectedPresetId(null);
  };

  const handleRemoveTopping = (toppingId: string) => {
    setOrderState((prev) => ({
      ...prev,
      toppings: prev.toppings.filter((t) => t.id !== toppingId),
    }));
  };

  const handleReset = () => {
    setOrderState({
      size: 'mediano',
      base: BASES[0],
      crema: CREMAS[0],
      aderezo: ADEREZOS[0],
      toppings: [TOPPINGS[0], TOPPINGS[6]], // Kinder bueno & Oreo as sweet starter
      notes: '',
    });
    setSelectedPresetId(null);
    generateNewFolio();
    setActiveStep(1);
  };

  // Apply a Preset Combo
  const handleApplyPreset = (presetId: string) => {
    const preset = PRESET_COMBOS.find((p) => p.id === presetId);
    if (!preset) return;

    const base = BASES.find((b) => b.id === preset.baseId) || BASES[0];
    const crema = CREMAS.find((c) => c.id === preset.cremaId) || CREMAS[0];
    const aderezo = ADEREZOS.find((a) => a.id === preset.aderezoId) || ADEREZOS[0];
    const toppings = TOPPINGS.filter((t) => preset.toppingIds.includes(t.id));

    setOrderState({
      size: 'mediano',
      base,
      crema,
      aderezo,
      toppings,
      notes: `Combo Sugerido: ${preset.title}`,
    });
    setSelectedPresetId(presetId);
  };

  // Filter toppings
  const filteredToppings = useMemo(() => {
    return TOPPINGS.filter((topping) => {
      const matchesCategory =
        toppingCategory === 'all' || topping.category === toppingCategory;
      const matchesSearch = topping.name
        .toLowerCase()
        .includes(toppingSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [toppingCategory, toppingSearch]);

  // Construct the enriched WhatsApp Message
  const generateWhatsAppMessage = () => {
    const baseName = orderState.base ? orderState.base.name : 'Fresas con crema';
    const cremaName = orderState.crema ? orderState.crema.name : 'Crema de la Casa (Queso)';
    const aderezoName = orderState.aderezo ? orderState.aderezo.name : 'Nutella';
    const toppingsList =
      orderState.toppings.length > 0
        ? orderState.toppings.map((t) => t.name).join(', ')
        : 'Sin toppings';

    const modalidadLabel =
      orderMode === 'pickup'
        ? '🛍️ Recoger en Sucursal (Pick-Up Clavería - Sin fila)'
        : '🛵 Entrega a Domicilio';

    const text =
      `¡Hola Freséame! 🍓 Quiero registrar mi orden de preparación:\n\n` +
      `📋 Folio de Pedido: #${orderFolio}\n` +
      `📍 Modalidad: ${modalidadLabel}\n` +
      `🍧 Tamaño: ${currentSizeConfig.name} (${currentSizeConfig.label})\n` +
      `🍓 Base: ${baseName}\n` +
      `🥛 Crema Artesanal: ${cremaName}\n` +
      `🍯 Aderezo: ${aderezoName}\n` +
      `🍫 Toppings (${orderState.toppings.length}): ${toppingsList}\n` +
      (orderState.notes.trim() ? `📝 Instrucciones especiales: ${orderState.notes.trim()}\n` : '') +
      `💰 Total a liquidar en caja: $${calculatedTotal} MXN (Pago al recoger)\n\n` +
      `✅ ¡Ya cuento con mi Comprobante de Pedido digital generado (Folio #${orderFolio})! Solicito confirmar la preparación en cocina para pasar a recoger. ¡Muchas gracias!`;

    return text;
  };

  const handleDownloadOnlyPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      await generatePdfTicket({
        folio: orderFolio,
        orderMode,
        sizeName: currentSizeConfig.name,
        sizeLabel: currentSizeConfig.label,
        baseName: orderState.base ? orderState.base.name : 'Fresas con Crema',
        cremaName: orderState.crema ? orderState.crema.name : 'Crema de la Casa (Queso)',
        aderezoName: orderState.aderezo ? orderState.aderezo.name : 'Nutella',
        toppings: orderState.toppings.map((t) => t.name),
        notes: orderState.notes,
        total: calculatedTotal,
      });
      setPdfToast(true);
      setTimeout(() => setPdfToast(false), 6000);
    } catch (err) {
      console.error('Error generando Comprobante de Pedido PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleOrderAndDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      // 1. Descarga inmediata del archivo Comprobante_Pedido_Freseame_[FOLIO].pdf
      await generatePdfTicket({
        folio: orderFolio,
        orderMode,
        sizeName: currentSizeConfig.name,
        sizeLabel: currentSizeConfig.label,
        baseName: orderState.base ? orderState.base.name : 'Fresas con Crema',
        cremaName: orderState.crema ? orderState.crema.name : 'Crema de la Casa (Queso)',
        aderezoName: orderState.aderezo ? orderState.aderezo.name : 'Nutella',
        toppings: orderState.toppings.map((t) => t.name),
        notes: orderState.notes,
        total: calculatedTotal,
      });

      // 2. Muestra modal/alerta visual
      setPdfToast(true);
      setTimeout(() => setPdfToast(false), 6000);
    } catch (err) {
      console.error('Error generando Comprobante PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
      // 3. Abre WhatsApp con el folio y el desglose listo para enviar
      const msg = generateWhatsAppMessage();
      const url = `https://wa.me/527731727582?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    }
  };

  const handleOrderWhatsApp = () => {
    handleOrderAndDownloadPdf();
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(generateWhatsAppMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Validation checks
  const hasMinToppings = orderState.toppings.length >= 2;
  const isReadyToOrder = orderState.base && orderState.crema && orderState.aderezo && hasMinToppings;

  return (
    <section id="constructor" className="py-16 md:py-24 bg-[#FFF8F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4B8B]/10 border border-[#FF4B8B]/20 text-[#FF4B8B] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>El Constructor Artesanal</span>
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl md:text-5xl text-[#2B1A24] tracking-tight">
            ¡Arma tu Freséame! 🍓
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#2B1A24]/75">
            Sigue los pasos a continuación: combina tu base, crema artesanal, aderezo y tus toppings favoritos en tiempo real.
          </p>
        </div>

        {/* Quick Presets Shortcut Banner */}
        <div className="mb-10 p-5 rounded-3xl bg-white border border-[#2B1A24]/10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <h3 className="font-['Outfit'] font-extrabold text-sm text-[#2B1A24]">
                ¿Prefieres una combinación probada y consentida?
              </h3>
            </div>
            <span className="text-xs text-[#2B1A24]/60">Carga un preset con un toque:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_COMBOS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-50 border-[#FF4B8B] shadow-sm ring-1 ring-[#FF4B8B]'
                      : 'bg-stone-50 hover:bg-stone-100/80 border-[#2B1A24]/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${preset.tagColor}`}>
                      {preset.tag}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#FF4B8B]" />}
                  </div>
                  <div>
                    <h4 className="font-['Outfit'] font-bold text-sm text-[#2B1A24] leading-snug">
                      {preset.title}
                    </h4>
                    <p className="text-[11px] text-[#2B1A24]/60 mt-0.5 line-clamp-1">
                      {preset.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Selection Bar */}
        <div className="mb-8 p-4 rounded-3xl bg-white border border-[#2B1A24]/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">🍧</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2B1A24]/70 block">
                Paso 0: Tamaño del Vaso
              </span>
              <span className="text-sm font-extrabold text-[#2B1A24]">
                ¿Cuánto antojo tienes hoy?
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {SIZES.map((size) => (
              <button
                key={size.id}
                onClick={() => setOrderState((prev) => ({ ...prev, size: size.id }))}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all text-center ${
                  orderState.size === size.id
                    ? 'bg-[#FF4B8B] text-white shadow-md'
                    : 'bg-stone-100 text-[#2B1A24] hover:bg-stone-200/70'
                }`}
              >
                <div className="font-extrabold">{size.name}</div>
                <div className="text-[10px] opacity-80">{size.oz.split(' ')[0]} oz</div>
              </button>
            ))}
          </div>
        </div>

        {/* Stepper Navigation Tabs */}
        <div className="flex items-center justify-between overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
          {steps.map((step) => {
            const isCurrent = activeStep === step.number;
            const isCompleted =
              (step.number === 1 && orderState.base !== null) ||
              (step.number === 2 && orderState.crema !== null) ||
              (step.number === 3 && orderState.aderezo !== null) ||
              (step.number === 4 && orderState.toppings.length >= 2);

            return (
              <button
                key={step.number}
                id={`wizard-step-btn-${step.number}`}
                onClick={() => setActiveStep(step.number)}
                className={`flex-1 min-w-[130px] p-3 sm:p-4 rounded-2xl border text-left transition-all relative ${
                  isCurrent
                    ? 'bg-white border-[#FF4B8B] shadow-md ring-2 ring-[#FF4B8B]/20'
                    : isCompleted
                    ? 'bg-white/90 border-[#48C9B0]/50 hover:bg-white'
                    : 'bg-white/50 border-[#2B1A24]/10 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{step.icon}</span>
                  {isCompleted ? (
                    <span className="w-5 h-5 rounded-full bg-[#48C9B0] text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#2B1A24]/40">#{step.number}</span>
                  )}
                </div>
                <div className="font-['Outfit'] font-bold text-sm text-[#2B1A24]">
                  {step.label}
                </div>
                <div className="text-[10px] text-[#2B1A24]/60 truncate">
                  {step.number === 1 && orderState.base ? orderState.base.name : ''}
                  {step.number === 2 && orderState.crema ? orderState.crema.name : ''}
                  {step.number === 3 && orderState.aderezo ? orderState.aderezo.name : ''}
                  {step.number === 4 ? `${orderState.toppings.length} elegidos` : ''}
                  {step.number === 5 ? 'Revisar' : ''}
                  {!isCompleted && step.number !== 5 && 'Pendiente'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Grid: Left interactive controls, Right live visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Step Interactive Panel */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: BASE */}
            {activeStep === 1 && (
              <div id="step-1-base-panel" className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#2B1A24]/10 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold text-[#FF4B8B] uppercase tracking-wider">
                      Paso 1 de 4 (Selección única)
                    </span>
                    <h3 className="font-['Outfit'] font-black text-2xl text-[#2B1A24] mt-0.5">
                      Elige tu Base 🍓
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-[#2B1A24]/70">
                    7 opciones disponibles
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {BASES.map((base) => {
                    const isSelected = orderState.base?.id === base.id;
                    return (
                      <button
                        key={base.id}
                        id={`base-option-${base.id}`}
                        onClick={() => handleSelectBase(base)}
                        className={`text-left p-4 rounded-2xl border-2 transition-all relative flex flex-col justify-between group ${
                          isSelected
                            ? 'border-[#FF4B8B] bg-rose-50/60 shadow-md ring-1 ring-[#FF4B8B]'
                            : 'border-stone-100 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl group-hover:scale-110 transition-transform">
                              {base.icon}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-[#2B1A24]/70">
                              {base.tag}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-[#FF4B8B] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-['Outfit'] font-black text-base text-[#2B1A24]">
                            {base.name}
                          </h4>
                          <p className="text-xs text-[#2B1A24]/60 mt-1 leading-relaxed">
                            {base.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                          <span className="text-stone-400 font-medium">{base.calories}</span>
                          <span className="font-black text-[#FF4B8B]">${base.basePrice} MXN</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Step Bottom Controls */}
                <div className="mt-8 pt-4 border-t border-stone-100 flex justify-end">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-3 rounded-2xl bg-[#FF4B8B] hover:bg-[#E8437D] text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
                  >
                    <span>Siguiente: Elige tu Crema</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CREMA */}
            {activeStep === 2 && (
              <div id="step-2-crema-panel" className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#2B1A24]/10 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold text-[#FF4B8B] uppercase tracking-wider">
                      Paso 2 de 4 (Selección única)
                    </span>
                    <h3 className="font-['Outfit'] font-black text-2xl text-[#2B1A24] mt-0.5">
                      Elige tu Crema 🥛
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-[#2B1A24]/70">
                    7 cremas de la casa
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {CREMAS.map((crema) => {
                    const isSelected = orderState.crema?.id === crema.id;
                    return (
                      <button
                        key={crema.id}
                        id={`crema-option-${crema.id}`}
                        onClick={() => handleSelectCrema(crema)}
                        className={`text-left p-4 rounded-2xl border-2 transition-all relative flex flex-col justify-between group ${
                          isSelected
                            ? 'border-[#FF4B8B] bg-rose-50/60 shadow-md ring-1 ring-[#FF4B8B]'
                            : 'border-stone-100 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-5 h-5 rounded-full border border-stone-200 shadow-2xs inline-block"
                              style={{ backgroundColor: crema.color }}
                            />
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-[#2B1A24]/70">
                              {crema.tag}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-[#FF4B8B] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-['Outfit'] font-black text-base text-[#2B1A24]">
                            {crema.name}
                          </h4>
                          <p className="text-xs text-[#2B1A24]/60 mt-1 leading-relaxed">
                            {crema.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                          <span className="text-stone-400 font-medium">{crema.texture}</span>
                          <span className="font-black text-[#2B1A24]">
                            {crema.extraPrice > 0 ? `+$${crema.extraPrice} MXN` : 'Incluida'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Step Bottom Controls */}
                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-5 py-3 rounded-2xl text-[#2B1A24]/70 hover:bg-stone-100 font-bold text-sm flex items-center gap-2 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Volver a Base</span>
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-3 rounded-2xl bg-[#FF4B8B] hover:bg-[#E8437D] text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
                  >
                    <span>Siguiente: Elige tu Aderezo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ADEREZO */}
            {activeStep === 3 && (
              <div id="step-3-aderezo-panel" className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#2B1A24]/10 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold text-[#FF4B8B] uppercase tracking-wider">
                      Paso 3 de 4 (Selección única)
                    </span>
                    <h3 className="font-['Outfit'] font-black text-2xl text-[#2B1A24] mt-0.5">
                      Elige tu Aderezo 🍯
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-[#2B1A24]/70">
                    7 aderezos disponibles
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {ADEREZOS.map((aderezo) => {
                    const isSelected = orderState.aderezo?.id === aderezo.id;
                    return (
                      <button
                        key={aderezo.id}
                        id={`aderezo-option-${aderezo.id}`}
                        onClick={() => handleSelectAderezo(aderezo)}
                        className={`text-left p-4 rounded-2xl border-2 transition-all relative flex flex-col justify-between group ${
                          isSelected
                            ? 'border-[#FF4B8B] bg-rose-50/60 shadow-md ring-1 ring-[#FF4B8B]'
                            : 'border-stone-100 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-5 h-5 rounded-full shadow-xs border border-white"
                              style={{ backgroundColor: aderezo.color }}
                            />
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-[#2B1A24]/70">
                              Aderezo
                            </span>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-[#FF4B8B] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-['Outfit'] font-black text-base text-[#2B1A24]">
                            {aderezo.name}
                          </h4>
                          <p className="text-xs text-[#2B1A24]/60 mt-1 leading-relaxed">
                            {aderezo.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                          <span className="text-stone-400 font-medium">Toque dulce</span>
                          <span className="font-bold text-[#48C9B0]">Incluido</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Step Bottom Controls */}
                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-5 py-3 rounded-2xl text-[#2B1A24]/70 hover:bg-stone-100 font-bold text-sm flex items-center gap-2 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Volver a Crema</span>
                  </button>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-3 rounded-2xl bg-[#FF4B8B] hover:bg-[#E8437D] text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
                  >
                    <span>Siguiente: Elige Toppings</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: TOPPINGS (Selection multiple, 2 or more) */}
            {activeStep === 4 && (
              <div id="step-4-toppings-panel" className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#2B1A24]/10 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <span className="text-xs font-bold text-[#FF4B8B] uppercase tracking-wider">
                      Paso 4 de 4 (Selección múltiple, 2 o más)
                    </span>
                    <h3 className="font-['Outfit'] font-black text-2xl text-[#2B1A24] mt-0.5">
                      Elige tus Toppings 🍫
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-full bg-rose-50 text-[#FF4B8B] font-extrabold text-xs border border-rose-200">
                      {orderState.toppings.length} seleccionados
                    </span>
                  </div>
                </div>

                {/* Leyenda Destacada: Barra libre en sucursal */}
                <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-teal-50/60 border-2 border-[#FF4B8B]/30 shadow-xs flex items-start gap-3 text-[#2B1A24]">
                  <div className="w-8 h-8 rounded-xl bg-[#FF4B8B] text-white flex items-center justify-center text-sm shrink-0 shadow-xs mt-0.5">
                    ✨
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#FF4B8B] block mb-0.5">
                      ¡Barra Libre de Toppings en Sucursal!
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-[#2B1A24] leading-relaxed">
                      ¡En sucursal sírvete tú mismo los toppings con tu propia mano y a tu gusto! Para entrega a domicilio selecciona aquí tus favoritos.
                    </p>
                  </div>
                </div>

                {/* Notice pill */}
                <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center gap-2.5 text-xs text-amber-900">
                  <Info className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>
                    Elige <strong>al menos 2 toppings</strong> para una explosión completa de sabor. ¡Puedes agregar tantos como quieras!
                  </span>
                </div>

                {/* Filter and Search Bar for the 27 Toppings */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar topping (Oreo, Kinder, Nuez, Gomitas...)"
                      value={toppingSearch}
                      onChange={(e) => setToppingSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF4B8B] focus:ring-1 focus:ring-[#FF4B8B]"
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'Todos (27)' },
                      { id: 'chocolates', label: 'Chocolates' },
                      { id: 'galletas', label: 'Galletas' },
                      { id: 'picositos', label: 'Picositos' },
                      { id: 'frutos_secos', label: 'Frutos Secos' },
                      { id: 'dulces', label: 'Dulces' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setToppingCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          toppingCategory === cat.id
                            ? 'bg-[#2B1A24] text-white shadow-2xs'
                            : 'bg-stone-100 text-[#2B1A24]/70 hover:bg-stone-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full 27 Toppings Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {filteredToppings.map((topping) => {
                    const isSelected = orderState.toppings.some((t) => t.id === topping.id);
                    return (
                      <button
                        key={topping.id}
                        id={`topping-btn-${topping.id}`}
                        onClick={() => handleToggleTopping(topping)}
                        className={`text-left p-3 rounded-2xl border transition-all flex items-center justify-between group ${
                          isSelected
                            ? 'border-[#FF4B8B] bg-rose-50/80 text-[#2B1A24] shadow-xs ring-1 ring-[#FF4B8B]'
                            : 'border-stone-100 bg-stone-50/50 hover:bg-stone-100 text-[#2B1A24]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-1">
                          <span className="text-base group-hover:scale-110 transition-transform">
                            {topping.emoji}
                          </span>
                          <span className="text-xs font-bold truncate">
                            {topping.name}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center text-[10px] shrink-0 ${
                            isSelected
                              ? 'bg-[#FF4B8B] border-[#FF4B8B] text-white font-bold'
                              : 'border-stone-300 bg-white text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                      </button>
                    );
                  })}
                </div>

                {filteredToppings.length === 0 && (
                  <div className="text-center py-8 text-stone-400 text-xs">
                    No encontramos toppings con ese nombre. Intenta otra palabra.
                  </div>
                )}

                {/* Special Request Notes */}
                <div className="mt-6 pt-5 border-t border-stone-100">
                  <label className="block text-xs font-bold text-[#2B1A24] mb-1.5">
                    ¿Alguna indicación o nota especial? (Opcional)
                  </label>
                  <input
                    type="text"
                    value={orderState.notes}
                    onChange={(e) => setOrderState((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Ej. Crema por separado, extra Nutella, sin canela..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF4B8B]"
                  />
                </div>

                {/* Step Bottom Controls */}
                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-5 py-3 rounded-2xl text-[#2B1A24]/70 hover:bg-stone-100 font-bold text-sm flex items-center gap-2 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Volver a Aderezo</span>
                  </button>
                  <button
                    onClick={() => setActiveStep(5)}
                    className="px-6 py-3 rounded-2xl bg-[#FF4B8B] hover:bg-[#E8437D] text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
                  >
                    <span>Ver Resumen & Pedir</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CONFIRMAR Y PEDIR POR WHATSAPP */}
            {activeStep === 5 && (
              <div id="step-5-summary-panel" className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#2B1A24]/10 animate-in fade-in duration-200 space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#48C9B0] uppercase tracking-wider">
                      ¡Tu combinación está lista!
                    </span>
                    <h3 className="font-['Outfit'] font-black text-2xl text-[#2B1A24] mt-0.5">
                      Confirmar Pedido & Ticket Digital 🍓✨
                    </h3>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    Paso Final
                  </span>
                </div>

                {/* 1. SELECTOR DE MODALIDAD ANTES DE PEDIR */}
                <div className="p-4 sm:p-5 rounded-3xl bg-stone-50 border border-stone-200/80">
                  <span className="text-xs font-black uppercase tracking-wider text-[#2B1A24]/70 block mb-3">
                    1. Elige cómo deseas recibir tu postre:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      id="modalidad-pickup-btn"
                      onClick={() => setOrderMode('pickup')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                        orderMode === 'pickup'
                          ? 'bg-white border-[#FF4B8B] shadow-md ring-2 ring-[#FF4B8B]/20'
                          : 'bg-white/70 border-stone-200 hover:bg-white text-[#2B1A24]/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">🛍️</span>
                        {orderMode === 'pickup' && (
                          <span className="w-5 h-5 rounded-full bg-[#FF4B8B] text-white flex items-center justify-center text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-['Outfit'] font-black text-sm text-[#2B1A24] leading-snug">
                          Pick-Up (Sucursal Clavería)
                        </div>
                        <div className="text-[11px] font-bold text-[#48C9B0] mt-0.5">
                          Sin fila • Pasa por tu orden
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      id="modalidad-delivery-btn"
                      onClick={() => setOrderMode('delivery')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                        orderMode === 'delivery'
                          ? 'bg-white border-[#FF4B8B] shadow-md ring-2 ring-[#FF4B8B]/20'
                          : 'bg-white/70 border-stone-200 hover:bg-white text-[#2B1A24]/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">🛵</span>
                        {orderMode === 'delivery' && (
                          <span className="w-5 h-5 rounded-full bg-[#FF4B8B] text-white flex items-center justify-center text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-['Outfit'] font-black text-sm text-[#2B1A24] leading-snug">
                          Entrega a Domicilio
                        </div>
                        <div className="text-[11px] font-bold text-[#FF4B8B] mt-0.5">
                          Envío directo a tu puerta
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Aviso dinámico según modalidad */}
                  {orderMode === 'pickup' ? (
                    <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900 animate-in fade-in duration-200">
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed font-medium">
                        Preparamos tu orden con anticipación. Al enviar tu pedido por WhatsApp, te responderemos con tu <strong>Ticket Digital</strong> y tiempo estimado para pasar a recogerlo <strong>al lado de McCarthy's</strong>.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-900 animate-in fade-in duration-200">
                      <Bike className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed font-medium">
                        Servicio a domicilio disponible en tu zona. Al enviar tu mensaje por WhatsApp, comparte tu ubicación o dirección exacta para confirmar tiempo de llegada y costo de envío.
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. TARJETA DE CONFIRMACIÓN VISUAL ESTILO "TICKET DE POSTRE" */}
                <div
                  id="ticket-digital-preview"
                  className="rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFF8F2] border-2 border-[#2B1A24]/10 shadow-lg p-6 sm:p-7 relative overflow-hidden font-mono text-xs"
                >
                  {/* Decorative Ticket Punch Notches */}
                  <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FFF8F2] border-2 border-[#2B1A24]/10 pointer-events-none" />
                  <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FFF8F2] border-2 border-[#2B1A24]/10 pointer-events-none" />

                  {/* Ticket Header */}
                  <div className="text-center pb-4 border-b-2 border-dashed border-stone-200">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {!ticketLogoError ? (
                        <img
                          src={logoImg || './logo.jpg'}
                          alt="Freséame"
                          className="h-10 w-10 rounded-full object-cover border border-pink-200 shadow-2xs"
                          onError={() => setTicketLogoError(true)}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-lg">
                          🍓
                        </div>
                      )}
                      <span className="font-['Outfit'] font-black text-xl tracking-tight text-[#2B1A24]">
                        Freséame 🍓
                      </span>
                    </div>
                    <div className="font-sans text-[10px] font-black uppercase tracking-widest text-[#FF4B8B]">
                      ★ COMPROBANTE DE PEDIDO / ORDEN DE PREPARACIÓN ★
                    </div>
                    <div className="font-sans text-[11px] text-[#2B1A24]/75 mt-0.5">
                      Sucursal: Plaza Patio Clavería (junto a McCarthy's)
                    </div>
                    <div className="font-sans text-[10px] text-stone-500">
                      Horario: Lunes a Domingo de 11:00 AM a 11:00 PM
                    </div>
                  </div>

                  {/* Folio & Modalidad Bar */}
                  <div className="py-3 border-b border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2 font-sans">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-stone-400">FOLIO:</span>
                      <span className="px-3 py-1 rounded-lg bg-[#FF4B8B] text-white font-black text-sm tracking-wider shadow-2xs font-mono">
                        #{orderFolio}
                      </span>
                      <button
                        type="button"
                        onClick={generateNewFolio}
                        title="Generar nuevo folio"
                        className="text-[10px] text-[#2B1A24]/50 hover:text-[#FF4B8B] underline font-bold"
                      >
                        (Nuevo)
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadOnlyPdf}
                        disabled={isGeneratingPdf}
                        className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#FF4B8B] font-bold text-[11px] flex items-center gap-1 border border-rose-200 transition-colors cursor-pointer"
                        title="Descargar Comprobante en PDF"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </button>
                    </div>

                    <div className="text-[11px] font-bold text-[#2B1A24]/80 flex items-center gap-1.5">
                      {orderMode === 'pickup' ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-extrabold text-[10px]">
                          🛍️ Recoger en Sucursal
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-extrabold text-[10px]">
                          🛵 Entrega a Domicilio
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Estado de Pedido (NO de pago) */}
                  <div className="py-2 px-3 my-2 rounded-xl bg-amber-50 border border-amber-200 text-[10.5px] font-sans flex items-center justify-between gap-2">
                    <span className="font-extrabold text-amber-900">
                      ESTADO: PEDIDO REGISTRADO / PAGO PENDIENTE EN CAJA
                    </span>
                    <span className="text-amber-700 text-[9.5px] font-medium hidden sm:inline">
                      (Efectivo / Tarjeta al recoger)
                    </span>
                  </div>

                  {/* Receipt Items Breakdown */}
                  <div className="py-3 space-y-2.5 text-xs font-sans">
                    <div className="flex justify-between items-center text-[#2B1A24]">
                      <span className="text-stone-500 font-medium">Tamaño de Vaso:</span>
                      <span className="font-bold">
                        {currentSizeConfig.name} ({currentSizeConfig.label})
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[#2B1A24]">
                      <span className="text-stone-500 font-medium">🍓 Base:</span>
                      <span className="font-bold">{orderState.base?.name}</span>
                    </div>

                    <div className="flex justify-between items-center text-[#2B1A24]">
                      <span className="text-stone-500 font-medium">🥛 Crema Artesanal:</span>
                      <span className="font-black text-[#FF4B8B]">{orderState.crema?.name}</span>
                    </div>

                    <div className="flex justify-between items-center text-[#2B1A24]">
                      <span className="text-stone-500 font-medium">🍯 Aderezo:</span>
                      <span className="font-bold">{orderState.aderezo?.name}</span>
                    </div>

                    <div className="pt-2 border-t border-stone-100">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-stone-500 font-medium">
                          🍫 Toppings Seleccionados ({orderState.toppings.length}):
                        </span>
                        <span className="text-[10px] font-bold text-[#48C9B0]">
                          {hasMinToppings ? 'Completo ✓' : 'Sugerido: 2+'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {orderState.toppings.map((t) => (
                          <span
                            key={t.id}
                            className="px-2 py-0.5 rounded-md bg-stone-100 text-[#2B1A24] text-[11px] font-semibold"
                          >
                            {t.emoji} {t.name}
                          </span>
                        ))}
                      </div>
                      <div className="text-[10.5px] text-teal-700 italic mt-1 font-medium">
                        * Recuerda: En barra de sucursal la barra de toppings es libre e ilimitada.
                      </div>
                    </div>

                    {orderState.notes.trim() && (
                      <div className="pt-2 text-[11px] text-stone-600 italic">
                        <strong>Instrucciones especiales:</strong> "{orderState.notes.trim()}"
                      </div>
                    )}
                  </div>

                  {/* Dashed Total Line */}
                  <div className="pt-3 border-t-2 border-dashed border-stone-300 flex justify-between items-baseline font-sans">
                    <div>
                      <span className="font-black text-sm text-[#2B1A24] block">
                        TOTAL A LIQUIDAR EN CAJA
                      </span>
                      <span className="text-[10px] text-stone-400">
                        IVA Incluido • Pago directo en mostrador al recoger
                      </span>
                    </div>
                    <span className="font-['Outfit'] font-black text-2xl sm:text-3xl text-[#FF4B8B]">
                      ${calculatedTotal} MXN
                    </span>
                  </div>

                  {/* Receipt Footer Message */}
                  <div className="mt-4 pt-3 border-t border-stone-100 text-center text-[11px] font-sans text-stone-600 leading-relaxed">
                    {orderMode === 'pickup' ? (
                      <span>
                        📍 <strong>Muestra este folio en barra</strong> al llegar para recibir tu pedido sin hacer fila. El pago se liquida directamente en mostrador al recoger tu orden.
                      </span>
                    ) : (
                      <span>
                        🛵 <strong>Entrega a Domicilio:</strong> Te responderemos por WhatsApp con el tiempo estimado de entrega y monto de envío.
                      </span>
                    )}
                  </div>
                </div>

                {/* Modal / Alerta Visual: Comprobante Listo */}
                {pdfToast && (
                  <div
                    id="comprobante-download-modal"
                    className="p-5 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-3 duration-300 border-2 border-emerald-300/60"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-['Outfit'] font-black text-base sm:text-lg leading-tight">
                          ¡Tu comprobante de pedido está listo!
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-100 mt-1 leading-snug">
                          Hemos abierto WhatsApp para confirmar la preparación en cocina con tu folio <strong>#{orderFolio}</strong>.
                        </p>
                        <div className="text-[11px] text-emerald-200/90 font-mono mt-1">
                          Archivo guardado: Comprobante_Pedido_Freseame_{orderFolio}.pdf
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPdfToast(false)}
                      className="self-end sm:self-center text-xs text-white bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer shrink-0"
                    >
                      Aceptar ✕
                    </button>
                  </div>
                )}

                {!hasMinToppings && (
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Te sugerimos elegir al menos 2 toppings en el Paso 4 para la mejor experiencia.</span>
                  </div>
                )}

                {/* 3. BOTONES DE ACCIÓN: CONFIRMAR Y GENERAR PEDIDO */}
                <div className="space-y-3 pt-2">
                  <button
                    id="confirmar-y-generar-pedido-btn"
                    type="button"
                    onClick={handleOrderAndDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#20ba59] hover:from-[#20ba59] hover:to-[#1ea750] text-white font-black text-base sm:text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer transform hover:-translate-y-0.5 text-center disabled:opacity-75"
                  >
                    {isGeneratingPdf ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generando Comprobante y abriendo WhatsApp...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 text-white" />
                        <span>Confirmar y Generar Pedido</span>
                        <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadOnlyPdf}
                      disabled={isGeneratingPdf}
                      className="py-3 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#FF4B8B] font-bold text-xs flex items-center justify-center gap-2 border border-rose-200 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Descargar Comprobante PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#2B1A24] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <CheckCheck className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copiar texto comanda</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="py-3 px-4 rounded-xl text-[#2B1A24]/70 hover:bg-stone-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Modificar pasos</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Right Column: Live Dynamic Dessert Visualizer */}
          <div className="lg:col-span-5">
            <DessertVisualizer
              base={orderState.base}
              crema={orderState.crema}
              aderezo={orderState.aderezo}
              toppings={orderState.toppings}
              sizeConfig={currentSizeConfig}
              totalPrice={calculatedTotal}
              onRemoveTopping={handleRemoveTopping}
              onReset={handleReset}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
