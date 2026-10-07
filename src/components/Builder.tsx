import React, { useState, useMemo, useEffect } from 'react';
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
import { DeliveryComingSoon } from './DeliveryComingSoon';
import { TicketModal } from './TicketModal';
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
import { CempasuchilIcon, CalaveritaIcon, VeladoraIcon } from './DiaDeMuertosDecorations';

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
  const [showModalTicket, setShowModalTicket] = useState<boolean>(false);
  const [lastGeneratedPdfUrl, setLastGeneratedPdfUrl] = useState<string | null>(null);

  const generateNewFolio = () => {
    setOrderFolio(`FSM-${Math.floor(100 + Math.random() * 900)}`);
    setLastGeneratedPdfUrl(null);
  };

  const steps = [
    { number: 1, label: 'Base', icon: '🍓', desc: 'Elige tu base frutal u horneada' },
    { number: 2, label: 'Crema', icon: '🥛', desc: 'Selecciona tu crema artesanal' },
    { number: 3, label: 'Aderezo', icon: '🍯', desc: 'Elige tu salsa o jarabe' },
    { number: 4, label: 'Toppings', icon: '🍫', desc: 'Elige 2 o más toppings' },
    { number: 5, label: 'Confirmar', icon: '✨', desc: 'Revisa y envía a WhatsApp' },
  ];

  const currentSizeConfig = useMemo(() => {
    return SIZES.find((s) => s.id === orderState.size) || SIZES[0];
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

  // Validation state & friendly error messages
  const [validationAlert, setValidationAlert] = useState<string | null>(null);

  // Handler for Base selection
  const handleSelectBase = (base: BaseOption) => {
    setOrderState((prev) => ({ ...prev, base }));
    setSelectedPresetId(null);
    setValidationAlert(null);
  };

  // Handler for Crema selection
  const handleSelectCrema = (crema: CremaOption) => {
    setOrderState((prev) => ({ ...prev, crema }));
    setSelectedPresetId(null);
    setValidationAlert(null);
  };

  // Handler for Aderezo selection
  const handleSelectAderezo = (aderezo: AderezoOption) => {
    setOrderState((prev) => ({ ...prev, aderezo }));
    setSelectedPresetId(null);
    setValidationAlert(null);
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
    setValidationAlert(null);
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
    setValidationAlert(null);
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
    setValidationAlert(null);
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

    const text =
      `¡Hola! Quiero registrar mi pedido para PICK-UP en Sucursal Clavería:\n\n` +
      `📋 Folio de Pedido: #${orderFolio}\n` +
      `📍 Modalidad: Recolección en Sucursal (Pick-Up Clavería - Sin fila)\n` +
      `🍧 Tamaño: ${currentSizeConfig.name} (${currentSizeConfig.label})\n` +
      `🍓 Base: ${baseName}\n` +
      `🥛 Crema Artesanal: ${cremaName}\n` +
      `🍯 Aderezo: ${aderezoName}\n` +
      `🍫 Toppings (${orderState.toppings.length}): ${toppingsList}\n` +
      (orderState.notes.trim() ? `📝 Instrucciones especiales: ${orderState.notes.trim()}\n` : '') +
      `💰 Total a liquidar en caja: $${calculatedTotal} MXN (Pago al recoger en mostrador)\n\n` +
      `✅ ¡Ya cuento con mi Comprobante de Pedido digital generado (Folio #${orderFolio})! Solicito confirmar la preparación en cocina para pasar a recoger. ¡Muchas gracias!`;

    return text;
  };

  const whatsAppUrl = useMemo(() => {
    const msg = generateWhatsAppMessage();
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  }, [
    orderFolio,
    currentSizeConfig,
    orderState.base,
    orderState.crema,
    orderState.aderezo,
    orderState.toppings,
    orderState.notes,
    calculatedTotal,
  ]);

  // Validation checks & missing steps list
  const missingSteps = useMemo(() => {
    const list: { step: number; label: string; action: () => void }[] = [];
    if (!orderState.size) {
      list.push({
        step: 0,
        label: 'Tamaño de Vaso',
        action: () => {
          const el = document.getElementById('step-0-size-bar');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
      });
    }
    if (!orderState.base) {
      list.push({
        step: 1,
        label: 'Base (Fresas, Waffles...)',
        action: () => setActiveStep(1),
      });
    }
    if (!orderState.crema) {
      list.push({
        step: 2,
        label: 'Crema Artesanal',
        action: () => setActiveStep(2),
      });
    }
    if (!orderState.aderezo) {
      list.push({
        step: 3,
        label: 'Aderezo o Salsa',
        action: () => setActiveStep(3),
      });
    }
    if (orderState.toppings.length < 2) {
      list.push({
        step: 4,
        label: `Mínimo 2 Toppings (llevas ${orderState.toppings.length})`,
        action: () => setActiveStep(4),
      });
    }
    return list;
  }, [orderState.size, orderState.base, orderState.crema, orderState.aderezo, orderState.toppings.length]);

  const hasMinToppings = orderState.toppings.length >= 2;
  const isReadyToOrder = missingSteps.length === 0;

  // Revoke object URL on unmount or when replaced to free mobile memory
  useEffect(() => {
    return () => {
      if (lastGeneratedPdfUrl) {
        try {
          URL.revokeObjectURL(lastGeneratedPdfUrl);
        } catch (_) {}
      }
    };
  }, [lastGeneratedPdfUrl]);

  // Step navigation guards with visual alerts
  const handleNextFromBase = () => {
    if (!orderState.base) {
      setValidationAlert('Por favor selecciona una base (fresas frescas, waffles, etc.) para avanzar.');
      return;
    }
    setValidationAlert(null);
    setActiveStep(2);
  };

  const handleNextFromCrema = () => {
    if (!orderState.crema) {
      setValidationAlert('Por favor selecciona una crema artesanal de la casa para continuar.');
      return;
    }
    setValidationAlert(null);
    setActiveStep(3);
  };

  const handleNextFromAderezo = () => {
    if (!orderState.aderezo) {
      setValidationAlert('Por favor selecciona un aderezo o jarabe para continuar.');
      return;
    }
    setValidationAlert(null);
    setActiveStep(4);
  };

  const handleNextFromToppings = () => {
    if (orderState.toppings.length < 2) {
      setValidationAlert(`Por favor selecciona al menos 2 toppings para tu postre (actualmente tienes ${orderState.toppings.length}).`);
      return;
    }
    setValidationAlert(null);
    setActiveStep(5);
  };

  const handleDownloadOnlyPdf = async () => {
    if (!isReadyToOrder) {
      setValidationAlert('Completa los pasos requeridos para poder generar el comprobante PDF.');
      return;
    }
    setValidationAlert(null);
    try {
      setIsGeneratingPdf(true);
      const res = await generatePdfTicket({
        folio: orderFolio,
        orderMode: 'pickup',
        sizeName: currentSizeConfig.name,
        sizeLabel: currentSizeConfig.label,
        baseName: orderState.base ? orderState.base.name : 'Fresas con Crema',
        cremaName: orderState.crema ? orderState.crema.name : 'Crema de la Casa (Queso)',
        aderezoName: orderState.aderezo ? orderState.aderezo.name : 'Nutella',
        toppings: orderState.toppings.map((t) => t.name),
        notes: orderState.notes,
        total: calculatedTotal,
      });
      if (res && res.url) {
        if (lastGeneratedPdfUrl) {
          try {
            URL.revokeObjectURL(lastGeneratedPdfUrl);
          } catch (_) {}
        }
        setLastGeneratedPdfUrl(res.url);
      }
      setPdfToast(true);
      setTimeout(() => setPdfToast(false), 6000);
    } catch (err) {
      console.error('Error generando Comprobante de Pedido PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleOrderAndDownloadPdf = async () => {
    if (!isReadyToOrder) {
      setValidationAlert('Completa las selecciones obligatorias marcadas abajo para generar tu orden.');
      return;
    }
    setValidationAlert(null);
    // 1. Abrir Modal de Comprobante en Pantalla de inmediato (evento de usuario directo)
    setShowModalTicket(true);

    // 2. Generar el PDF y disparar descarga segura en segundo plano
    try {
      setIsGeneratingPdf(true);
      const res = await generatePdfTicket({
        folio: orderFolio,
        orderMode: 'pickup',
        sizeName: currentSizeConfig.name,
        sizeLabel: currentSizeConfig.label,
        baseName: orderState.base ? orderState.base.name : 'Fresas con Crema',
        cremaName: orderState.crema ? orderState.crema.name : 'Crema de la Casa (Queso)',
        aderezoName: orderState.aderezo ? orderState.aderezo.name : 'Nutella',
        toppings: orderState.toppings.map((t) => t.name),
        notes: orderState.notes,
        total: calculatedTotal,
      });
      if (res && res.url) {
        if (lastGeneratedPdfUrl) {
          try {
            URL.revokeObjectURL(lastGeneratedPdfUrl);
          } catch (_) {}
        }
        setLastGeneratedPdfUrl(res.url);
      }
      setPdfToast(true);
      setTimeout(() => setPdfToast(false), 6000);
    } catch (err) {
      console.error('Error generando Comprobante PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
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

  return (
    <section id="constructor" className="py-4 sm:py-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Quick Presets Shortcut Banner */}
        <div className="mb-6 p-4 rounded-3xl bg-[#1A1228]/95 border border-[#FF8F00]/30 shadow-lg backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <CempasuchilIcon size={18} className="text-[#FF8F00]" />
              <h3 className="font-['Outfit'] font-black text-sm text-[#FFFDF7]">
                ¿Prefieres una combinación probada y consentida?
              </h3>
            </div>
            <span className="text-xs text-stone-300">Carga una especialidad con un toque:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_COMBOS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer active:scale-95 touch-manipulation ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#2F1B47] to-[#201235] border-[#FF8F00] shadow-md ring-2 ring-[#FF8F00]/60 candle-glow'
                      : 'bg-[#150D24]/80 hover:bg-[#25173B] border-white/10 hover:border-[#FF8F00]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${preset.tagColor}`}>
                      {preset.tag}
                    </span>
                    {isSelected && (
                      <div className="flex items-center gap-1">
                        <Check className="w-4 h-4 text-[#FFD54F]" />
                        <CempasuchilIcon size={12} className="text-[#FF8F00]" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-['Outfit'] font-bold text-sm text-[#FFFDF7] leading-snug">
                      {preset.title}
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">
                      {preset.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Selection Bar: 2 Columnas Equilibradas (Mediano y Grande) */}
        <div className="mb-8 p-4 sm:p-5 rounded-3xl bg-[#1A1228]/95 border border-[#FF8F00]/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🍧</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFB300] flex items-center gap-1">
                <span>Paso 0: Tamaño del Vaso</span>
                <CempasuchilIcon size={12} />
              </span>
              <span className="text-sm font-extrabold text-[#FFFDF7]">
                ¿Cuánto antojo tienes hoy?
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full md:w-auto md:min-w-[340px]">
            {SIZES.map((size) => (
              <button
                key={size.id}
                id={`size-btn-${size.id}`}
                onClick={() => setOrderState((prev) => ({ ...prev, size: size.id }))}
                className={`min-h-[50px] px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-center active:scale-95 touch-manipulation cursor-pointer flex flex-col items-center justify-center relative ${
                  orderState.size === size.id
                    ? 'bg-gradient-to-r from-[#FF6F00] via-[#FF8F00] to-[#FFA000] text-[#0D0914] font-black shadow-lg shadow-orange-500/30 border-2 border-[#FFD54F] candle-glow'
                    : 'bg-[#241738] text-stone-200 hover:text-white border border-[#FF8F00]/30 hover:border-[#FF8F00]/70 hover:bg-[#2C1C45]'
                }`}
              >
                <div className="font-extrabold text-sm sm:text-base flex items-center gap-1.5">
                  <span>{size.name}</span>
                  {orderState.size === size.id && <CempasuchilIcon size={14} className="text-[#0D0914]" />}
                </div>
                <div className={`text-[11px] ${orderState.size === size.id ? 'opacity-90 font-bold' : 'text-stone-400'}`}>
                  {size.label}
                </div>
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
                className={`flex-1 min-w-[130px] min-h-[52px] p-3 sm:p-4 rounded-2xl border text-left transition-all relative active:scale-95 touch-manipulation cursor-pointer ${
                  isCurrent
                    ? 'bg-[#25173B] border-2 border-[#FF8F00] shadow-md ring-2 ring-[#FF8F00]/40 candle-glow text-[#FFFDF7]'
                    : isCompleted
                    ? 'bg-[#1A1228] border border-emerald-500/50 hover:bg-[#221535] text-stone-200'
                    : 'bg-[#150D24]/80 border border-white/10 hover:bg-[#1E1230] text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{step.icon}</span>
                  {isCompleted ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
                      ✓
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-stone-500">#{step.number}</span>
                  )}
                </div>
                <div className="font-['Outfit'] font-bold text-sm text-[#FFFDF7]">
                  {step.label}
                </div>
                <div className="text-[10px] text-stone-400 truncate">
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
            
            {/* Friendly Validation Alert Banner */}
            {validationAlert && (
              <div
                id="builder-validation-alert"
                className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 shadow-sm flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold">{validationAlert}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setValidationAlert(null)}
                  className="text-xs text-rose-700 hover:text-rose-950 font-black px-2.5 py-1 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer shrink-0"
                >
                  ✕ Cerrar
                </button>
              </div>
            )}

            {/* STEP 1: BASE */}
            {activeStep === 1 && (
              <div id="step-1-base-panel" className="bg-[#1A1228]/95 rounded-3xl p-6 sm:p-8 shadow-xl border border-[#FF8F00]/30 animate-in fade-in duration-200 text-[#FFFDF7]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold text-[#FFB300] uppercase tracking-wider flex items-center gap-1.5">
                      <CempasuchilIcon size={13} />
                      <span>Paso 1 de 4 (Selección única)</span>
                    </span>
                    <h3 className="font-['Outfit'] font-black text-2xl text-[#FFFDF7] mt-0.5">
                      Elige tu Base 🍓
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">
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
                        className={`text-left p-4 rounded-2xl border-2 transition-all relative flex flex-col justify-between group cursor-pointer active:scale-95 touch-manipulation ${
                          isSelected
                            ? 'border-[#FF8F00] bg-[#2C1945] shadow-md ring-2 ring-[#FF8F00]/40 candle-glow text-[#FFFDF7]'
                            : 'border-white/10 bg-[#201335]/70 hover:border-[#FF8F00]/40 hover:bg-[#25183E] text-stone-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl group-hover:scale-110 transition-transform">
                              {base.icon}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-[#FFD54F]">
                              {base.tag}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-1">
                              <div className="w-6 h-6 rounded-full bg-[#FF8F00] text-[#0D0914] flex items-center justify-center text-xs font-black shadow-xs">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                              <CempasuchilIcon size={14} className="text-[#FFB300]" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-['Outfit'] font-black text-base text-[#FFFDF7]">
                            {base.name}
                          </h4>
                          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                            {base.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                          <span className="text-stone-400 font-medium">{base.calories}</span>
                          <span className="font-black text-[#FFD54F]">${base.basePrice} MXN</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Step Bottom Controls */}
                <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={handleNextFromBase}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF6F00] to-[#FFA000] text-[#0D0914] font-black text-sm shadow-md candle-glow flex items-center gap-2 transition-all cursor-pointer active:scale-95 touch-manipulation"
                  >
                    <span>Siguiente: Elige tu Crema</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CREMA */}
            {activeStep === 2 && (
              <div id="step-2-crema-panel" className="bg-[#1A1228]/95 rounded-3xl p-6 sm:p-8 shadow-xl border border-[#FF8F00]/30 animate-in fade-in duration-200 text-[#FFFDF7]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold text-[#FFB300] uppercase tracking-wider flex items-center gap-1.5">
                      <CempasuchilIcon size={13} />
                      <span>Paso 2 de 4 (Selección única)</span>
                    </span>
                    <h3 className="font-['Outfit'] font-black text-2xl text-[#FFFDF7] mt-0.5">
                      Elige tu Crema 🥛
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">
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
                        className={`text-left p-4 rounded-2xl border-2 transition-all relative flex flex-col justify-between group cursor-pointer active:scale-95 touch-manipulation ${
                          isSelected
                            ? 'border-[#FF8F00] bg-[#2C1945] shadow-md ring-2 ring-[#FF8F00]/40 candle-glow text-[#FFFDF7]'
                            : 'border-white/10 bg-[#201335]/70 hover:border-[#FF8F00]/40 hover:bg-[#25183E] text-stone-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-5 h-5 rounded-full border border-stone-200 shadow-2xs inline-block"
                              style={{ backgroundColor: crema.color }}
                            />
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-[#FFD54F]">
                              {crema.tag}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-1">
                              <div className="w-6 h-6 rounded-full bg-[#FF8F00] text-[#0D0914] flex items-center justify-center text-xs font-black shadow-xs">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                              <CempasuchilIcon size={14} className="text-[#FFB300]" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-['Outfit'] font-black text-base text-[#FFFDF7]">
                            {crema.name}
                          </h4>
                          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                            {crema.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                          <span className="text-stone-400 font-medium">{crema.texture}</span>
                          <span className="font-black text-[#FFD54F]">
                            {crema.extraPrice > 0 ? `+$${crema.extraPrice} MXN` : 'Incluida'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Step Bottom Controls */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-5 py-3 rounded-2xl text-stone-300 hover:bg-white/5 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95 touch-manipulation"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Volver a Base</span>
                  </button>
                  <button
                    onClick={handleNextFromCrema}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF6F00] to-[#FFA000] text-[#0D0914] font-black text-sm shadow-md candle-glow flex items-center gap-2 transition-all cursor-pointer active:scale-95 touch-manipulation"
                  >
                    <span>Siguiente: Elige tu Aderezo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ADEREZO */}
            {activeStep === 3 && (
              <div id="step-3-aderezo-panel" className="bg-[#1A1228]/95 rounded-3xl p-6 sm:p-8 shadow-xl border border-[#FF8F00]/30 animate-in fade-in duration-200 text-[#FFFDF7]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold text-[#FFB300] uppercase tracking-wider flex items-center gap-1.5">
                      <CempasuchilIcon size={13} />
                      <span>Paso 3 de 4 (Selección única)</span>
                    </span>
                    <h3 className="font-['Outfit'] font-black text-2xl text-[#FFFDF7] mt-0.5">
                      Elige tu Aderezo 🍯
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">
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
                        className={`text-left p-4 rounded-2xl border-2 transition-all relative flex flex-col justify-between group cursor-pointer active:scale-95 touch-manipulation ${
                          isSelected
                            ? 'border-[#FF8F00] bg-[#2C1945] shadow-md ring-2 ring-[#FF8F00]/40 candle-glow text-[#FFFDF7]'
                            : 'border-white/10 bg-[#201335]/70 hover:border-[#FF8F00]/40 hover:bg-[#25183E] text-stone-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-5 h-5 rounded-full shadow-xs border border-white"
                              style={{ backgroundColor: aderezo.color }}
                            />
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-[#FFD54F]">
                              Aderezo
                            </span>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-1">
                              <div className="w-6 h-6 rounded-full bg-[#FF8F00] text-[#0D0914] flex items-center justify-center text-xs font-black shadow-xs">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                              <CempasuchilIcon size={14} className="text-[#FFB300]" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-['Outfit'] font-black text-base text-[#FFFDF7]">
                            {aderezo.name}
                          </h4>
                          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                            {aderezo.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                          <span className="text-stone-400 font-medium">Toque dulce</span>
                          <span className="font-bold text-[#48C9B0]">Incluido</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Step Bottom Controls */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-5 py-3 rounded-2xl text-stone-300 hover:bg-white/5 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95 touch-manipulation"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Volver a Crema</span>
                  </button>
                  <button
                    onClick={handleNextFromAderezo}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF6F00] to-[#FFA000] text-[#0D0914] font-black text-sm shadow-md candle-glow flex items-center gap-2 transition-all cursor-pointer active:scale-95 touch-manipulation"
                  >
                    <span>Siguiente: Elige Toppings</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}


            {/* STEP 4: TOPPINGS (Selection multiple, 2 or more) */}
            {activeStep === 4 && (
              <div id="step-4-toppings-panel" className="bg-[#1A1228]/95 rounded-3xl p-6 sm:p-8 shadow-xl border border-[#FF8F00]/30 animate-in fade-in duration-200 text-[#FFFDF7]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <span className="text-xs font-bold text-[#FFB300] uppercase tracking-wider flex items-center gap-1.5">
                      <CempasuchilIcon size={13} />
                      <span>Paso 4 de 4 (Selección múltiple, 2 o más)</span>
                    </span>
                    <h3 className="font-['Outfit'] font-black text-2xl text-[#FFFDF7] mt-0.5">
                      Elige tus Toppings 🍫
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#FF6F00]/20 text-[#FFD54F] font-extrabold text-xs border border-[#FF8F00]/40">
                      {orderState.toppings.length} seleccionados
                    </span>
                  </div>
                </div>

                {/* Leyenda Destacada: Barra libre en sucursal */}
                <div className="mb-5 p-4 rounded-2xl bg-[#25173B] border-2 border-[#FF8F00]/40 shadow-xs flex items-start gap-3 text-[#FFFDF7]">
                  <div className="w-8 h-8 rounded-xl bg-[#FF8F00] text-[#0D0914] flex items-center justify-center text-sm shrink-0 shadow-xs mt-0.5 font-black">
                    ✨
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#FFD54F] block mb-0.5 flex items-center gap-1.5">
                      <CempasuchilIcon size={12} />
                      <span>¡Barra Libre de Toppings en Sucursal!</span>
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-stone-100 leading-relaxed">
                      ¡En sucursal sírvete tú mismo los toppings con tu propia mano y a tu gusto! Para entrega a domicilio selecciona aquí tus favoritos.
                    </p>
                  </div>
                </div>

                {/* Notice pill */}
                <div className="mb-5 p-3 rounded-2xl bg-[#201335] border border-[#FF8F00]/30 flex items-center gap-2.5 text-xs text-stone-300">
                  <Info className="w-4 h-4 shrink-0 text-[#FFB300]" />
                  <span>
                    Elige <strong className="text-[#FFD54F]">al menos 2 toppings</strong> para una explosión completa de sabor. ¡Puedes agregar tantos como quieras!
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
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#FF8F00]/30 bg-[#25173B] text-[#FFFDF7] placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00]"
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
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          toppingCategory === cat.id
                            ? 'bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-[#0D0914] font-black candle-glow'
                            : 'bg-[#25173B] text-stone-200 border border-white/10 hover:border-[#FF8F00]/40'
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
                        className={`text-left p-3 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer active:scale-95 touch-manipulation ${
                          isSelected
                            ? 'border-[#FF8F00] bg-[#2C1945] text-[#FFFDF7] shadow-xs ring-2 ring-[#FF8F00]/40 candle-glow'
                            : 'border-white/10 bg-[#201335]/70 hover:border-[#FF8F00]/40 hover:bg-[#25183E] text-stone-200'
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
                              ? 'bg-[#FF8F00] border-[#FF8F00] text-[#0D0914] font-black'
                              : 'border-white/20 bg-white/5 text-transparent'
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
                <div className="mt-6 pt-5 border-t border-white/10">
                  <label className="block text-xs font-bold text-[#FFD54F] mb-1.5">
                    ¿Alguna indicación o nota especial? (Opcional)
                  </label>
                  <input
                    type="text"
                    value={orderState.notes}
                    onChange={(e) => setOrderState((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Ej. Crema por separado, extra Nutella, sin canela..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#FF8F00]/30 bg-[#25173B] text-[#FFFDF7] placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#FF8F00]"
                  />
                </div>

                {/* Step Bottom Controls */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-5 py-3 rounded-2xl text-stone-300 hover:bg-white/5 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95 touch-manipulation"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Volver a Aderezo</span>
                  </button>
                  <button
                    onClick={handleNextFromToppings}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF6F00] to-[#FFA000] text-[#0D0914] font-black text-sm shadow-md candle-glow flex items-center gap-2 transition-all cursor-pointer active:scale-95 touch-manipulation"
                  >
                    <span>Ver Resumen & Pedir</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CONFIRMAR Y PEDIR POR WHATSAPP */}
            {activeStep === 5 && (
              <div id="step-5-summary-panel" className="bg-[#1A1228]/95 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#FF8F00]/30 animate-in fade-in duration-200 space-y-6 text-[#FFFDF7] backdrop-blur-md">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#FFD54F] uppercase tracking-wider flex items-center gap-1.5">
                      <CempasuchilIcon size={13} />
                      <span>¡Tu combinación está lista!</span>
                    </span>
                    <h3 className="font-['Outfit'] font-black text-2xl text-[#FFFDF7] mt-0.5 flex items-center gap-2">
                      <span>Confirmar Pedido & Ticket Digital</span>
                      <span className="text-xl">🍓</span>
                      <CempasuchilIcon size={20} className="text-[#FF8F00]" />
                    </h3>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#FF6F00]/20 border border-[#FF8F00]/40 text-[#FFD54F]">
                    Paso Final
                  </span>
                </div>

                {/* 1. MODALIDAD EXCLUSIVA PICK-UP */}
                <div className="p-4 sm:p-5 rounded-3xl bg-[#25173B] border border-[#FF8F00]/30">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-[#FFD54F] flex items-center gap-1.5">
                      <CalaveritaIcon size={14} />
                      <span>1. Modalidad de Pedido:</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black tracking-wide border border-emerald-400/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Pick-Up Express
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#1A1228] border-2 border-[#FF8F00]/40 shadow-xs flex items-center justify-between gap-3 text-[#FFFDF7]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-[#FF6F00]/20 text-[#FFD54F] flex items-center justify-center text-2xl shrink-0 border border-[#FF8F00]/30">
                        🛍️
                      </div>
                      <div>
                        <div className="font-['Outfit'] font-black text-sm sm:text-base text-[#FFFDF7]">
                          Recolección en Sucursal (Pick-Up Patio Clavería)
                        </div>
                        <div className="text-xs text-stone-300 font-medium mt-0.5">
                          Calle Egipto 142 • En medio de la plaza, junto a McCarthy's
                        </div>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex px-3 py-1 rounded-xl bg-teal-500/20 text-teal-300 font-extrabold text-xs border border-teal-400/30">
                      Sin fila
                    </span>
                  </div>

                  <div className="mt-3 p-3.5 rounded-2xl bg-[#1A1228] border border-[#FF8F00]/30 flex items-start gap-2.5 text-xs text-stone-300">
                    <MapPin className="w-4 h-4 text-[#FF8F00] shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-medium">
                      Preparamos tu orden con anticipación. Al confirmar tu pedido, se descarga tu <strong className="text-[#FFD54F]">Comprobante de Pedido en PDF</strong> y se notifica a cocina por WhatsApp para que solo pases por tu postre en barra <strong className="text-white">sin hacer fila</strong>.
                    </p>
                  </div>
                </div>

                {/* 2. TARJETA DE CONFIRMACIÓN VISUAL ESTILO "TICKET DE POSTRE" */}
                <div
                  id="ticket-digital-preview"
                  className="rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFF8F2] border-2 border-[#FF8F00]/50 shadow-xl p-6 sm:p-7 relative overflow-hidden font-mono text-xs text-[#2B1A24]"
                >
                  {/* Decorative Ticket Punch Notches */}
                  <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#1A1228] border-2 border-[#FF8F00]/40 pointer-events-none" />
                  <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#1A1228] border-2 border-[#FF8F00]/40 pointer-events-none" />

                  {/* Ticket Header */}
                  <div className="text-center pb-4 border-b-2 border-dashed border-stone-200">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {!ticketLogoError ? (
                        <img
                          src={logoImg || './logo.jpg'}
                          alt="Freséame"
                          width="40"
                          height="40"
                          loading="lazy"
                          className="h-10 w-10 rounded-full object-cover border-2 border-[#FF8F00]/60 shadow-2xs"
                          onError={() => setTicketLogoError(true)}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-orange-100 border border-[#FF8F00] flex items-center justify-center text-lg">
                          🍓
                        </div>
                      )}
                      <span className="font-['Outfit'] font-black text-xl tracking-tight text-[#2B1A24] flex items-center gap-1.5">
                        <span>Freséame</span>
                        <span className="text-[#FF4B8B]">🍓</span>
                        <CempasuchilIcon size={16} className="text-[#FF8F00]" />
                      </span>
                    </div>
                    <div className="font-sans text-[10px] font-black uppercase tracking-widest text-[#FF6F00]">
                      ★ COMPROBANTE DE PEDIDO / ORDEN DE PREPARACIÓN ★
                    </div>
                    <div className="font-sans text-[11px] font-bold text-[#2B1A24] mt-0.5">
                      Punto de recogida: Sucursal Clavería (en medio de la plaza, junto a McCarthy's)
                    </div>
                    <div className="font-sans text-[10px] text-stone-600">
                      Plaza Patio Clavería • Calle Egipto 142, Col. Clavería, Azcapotzalco, CDMX
                    </div>
                    <div className="font-sans text-[10px] text-emerald-700 font-bold">
                      Horario de entrega: Lunes a Domingo de 11:00 AM a 11:00 PM
                    </div>
                  </div>

                  {/* Folio & Modalidad Bar */}
                  <div className="py-3 border-b border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2 font-sans">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-stone-400">FOLIO:</span>
                      <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-[#0D0914] font-black text-sm tracking-wider shadow-2xs font-mono border border-[#FFD54F]">
                        #{orderFolio}
                      </span>
                      <button
                        type="button"
                        onClick={generateNewFolio}
                        title="Generar nuevo folio"
                        className="text-[10px] text-[#2B1A24]/50 hover:text-[#FF6F00] underline font-bold"
                      >
                        (Nuevo)
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadOnlyPdf}
                        disabled={isGeneratingPdf}
                        className="px-2 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#FF6F00] font-bold text-[11px] flex items-center gap-1 border border-orange-200 transition-colors cursor-pointer"
                        title="Descargar Comprobante en PDF"
                      >
                        <Download className="w-3 h-3 text-[#FF6F00]" />
                        <span>PDF</span>
                      </button>
                    </div>

                    <div className="text-[11px] font-bold text-[#2B1A24]/80 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-extrabold text-[10px]">
                        🛍️ RECOLECCIÓN EN SUCURSAL (PICK-UP)
                      </span>
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
                      <span className="font-black text-[#FF6F00]">{orderState.crema?.name}</span>
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
                    <span className="font-['Outfit'] font-black text-2xl sm:text-3xl text-[#FF6F00]">
                      ${calculatedTotal} MXN
                    </span>
                  </div>

                  {/* Receipt Footer Message */}
                  <div className="mt-4 pt-3 border-t border-stone-100 text-center text-[11px] font-sans text-stone-600 leading-relaxed">
                    <span>
                      📍 <strong>Punto de recogida:</strong> Sucursal Clavería (en medio de la plaza, junto a McCarthy's). Muestra este folio <strong>#{orderFolio}</strong> en barra al llegar para recibir tu pedido sin hacer fila. El pago se liquida directamente en mostrador al recoger tu orden.
                    </span>
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

                {/* Alerta de Pasos Faltantes (Prevención de Errores) */}
                {!isReadyToOrder && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#25173B] border-2 border-[#FF8F00]/50 text-[#FFFDF7] shadow-md space-y-2.5">
                    <div className="flex items-center gap-2 font-black text-sm text-[#FFD54F]">
                      <AlertCircle className="w-5 h-5 text-[#FF8F00] shrink-0" />
                      <span>Faltan pasos obligatorios para completar tu pedido:</span>
                    </div>
                    <p className="text-xs text-stone-300">
                      Selecciona las opciones pendientes a continuación para habilitar tu comprobante y confirmación:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {missingSteps.map((m) => (
                        <button
                          key={m.step}
                          type="button"
                          onClick={m.action}
                          className="px-3 py-1.5 rounded-xl bg-[#1A1228] hover:bg-[#321F4E] text-[#FFD54F] border border-[#FF8F00]/40 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                        >
                          <span>Paso {m.step}: {m.label}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. BOTONES DE ACCIÓN: CONFIRMAR Y GENERAR PEDIDO */}
                <div className="space-y-3 pt-2">
                  <button
                    id="confirmar-y-generar-pedido-btn"
                    type="button"
                    onClick={handleOrderAndDownloadPdf}
                    disabled={isGeneratingPdf || !isReadyToOrder}
                    className={`w-full min-h-[52px] py-4 px-6 rounded-2xl font-black text-base sm:text-lg shadow-lg transition-all active:scale-95 touch-manipulation flex items-center justify-center gap-3 text-center ${
                      !isReadyToOrder
                        ? 'bg-stone-800 text-stone-500 cursor-not-allowed shadow-none border border-white/10'
                        : 'bg-gradient-to-r from-[#25D366] to-[#20ba59] hover:from-[#20ba59] hover:to-[#1ea750] text-white shadow-md hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5 emerald-glow'
                    }`}
                  >
                    {isGeneratingPdf ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generando Comprobante...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 text-current" />
                        <span>Confirmar y Ver Comprobante en Pantalla</span>
                        <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadOnlyPdf}
                      disabled={isGeneratingPdf}
                      className="min-h-[44px] py-3 px-4 rounded-xl bg-[#25173B] hover:bg-[#321F4E] text-[#FFD54F] font-bold text-xs flex items-center justify-center gap-2 border border-[#FF8F00]/30 transition-colors cursor-pointer active:scale-95 touch-manipulation"
                    >
                      <FileText className="w-4 h-4 text-[#FFD54F]" />
                      <span>Descargar Comprobante PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="min-h-[44px] py-3 px-4 rounded-xl bg-[#1A1228] hover:bg-[#25173B] text-stone-200 font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer active:scale-95 touch-manipulation"
                    >
                      {copied ? (
                        <>
                          <CheckCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-stone-400" />
                          <span>Copiar texto comanda</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="min-h-[44px] py-3 px-4 rounded-xl text-stone-300 hover:text-white hover:bg-white/5 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 touch-manipulation border border-transparent"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Modificar pasos</span>
                    </button>
                  </div>
                </div>

                {/* Delivery Coming Soon Notice in Step 5 */}
                <DeliveryComingSoon className="mt-4" />

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

      {/* Modal / Ventana de "Comprobante en Pantalla" (Respaldo Visual) */}
      <TicketModal
        isOpen={showModalTicket}
        onClose={() => setShowModalTicket(false)}
        onResetOrder={handleReset}
        folio={orderFolio}
        sizeName={currentSizeConfig.name}
        sizeLabel={currentSizeConfig.label}
        baseName={orderState.base ? orderState.base.name : 'Fresas con Crema'}
        cremaName={orderState.crema ? orderState.crema.name : 'Crema de la Casa (Queso)'}
        aderezoName={orderState.aderezo ? orderState.aderezo.name : 'Nutella'}
        toppings={orderState.toppings}
        notes={orderState.notes}
        total={calculatedTotal}
        pdfUrl={lastGeneratedPdfUrl}
        onDownloadPdfAgain={handleDownloadOnlyPdf}
        isDownloadingPdf={isGeneratingPdf}
        whatsAppUrl={whatsAppUrl}
      />
    </section>
  );
};
