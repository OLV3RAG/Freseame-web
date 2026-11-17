import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SparkleFourPoint, MinimalHeart } from './BrandDecorations';

const SPLASH_SESSION_KEY = 'freseame_splash_seen';

export interface SplashScreenProps {
  /** Duración de la barra de carga en ms (por defecto 1600 ms, rango 1400-1800 ms) */
  durationMs?: number;
  /** Callback opcional al completar el desmontaje del Splash Screen */
  onComplete?: () => void;
}

const hasSeenSplashInSession = (): boolean => {
  if (typeof window === 'undefined') return true;
  try {
    return window.sessionStorage.getItem(SPLASH_SESSION_KEY) === '1';
  } catch {
    return false;
  }
};

const markSplashSeenInSession = (): void => {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(SPLASH_SESSION_KEY, '1');
  } catch {
    // Silencioso en modos privados restrictivos
  }
};

export const SplashScreen: React.FC<SplashScreenProps> = ({
  durationMs = 1600,
  onComplete,
}) => {
  const [alreadySeen] = useState<boolean>(() => hasSeenSplashInSession());
  const [shouldRender, setShouldRender] = useState<boolean>(() => !alreadySeen);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [logoError, setLogoError] = useState<boolean>(false);

  const dismissTriggeredRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerDismiss = useCallback(() => {
    if (dismissTriggeredRef.current) return;
    dismissTriggeredRef.current = true;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    setProgress(100);
    markSplashSeenInSession();
    setIsExiting(true);

    exitTimerRef.current = setTimeout(() => {
      setShouldRender(false);
      onComplete?.();
    }, 700);
  }, [onComplete]);

  useEffect(() => {
    if (alreadySeen) return;

    const clampedDuration = Math.min(Math.max(durationMs, 1400), 1800);
    const startTime = performance.now();

    const tick = (now: number) => {
      if (dismissTriggeredRef.current) return;
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / clampedDuration) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        triggerDismiss();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (exitTimerRef.current !== null) {
        clearTimeout(exitTimerRef.current);
      }
    };
  }, [alreadySeen, durationMs, triggerDismiss]);

  if (!shouldRender) return null;

  return (
    <div
      id="freseame-splash-screen"
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida a Freséame"
      aria-hidden={isExiting}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF7EE] text-[#4A2638] font-['Outfit'] select-none px-6 transition-all duration-700 ease-out ${
        isExiting
          ? 'opacity-0 -translate-y-4 pointer-events-none'
          : 'opacity-100 translate-y-0 pointer-events-auto'
      }`}
    >
      {/* Botón discreto Saltar en esquina superior derecha */}
      <button
        id="splash-skip-btn"
        type="button"
        onClick={triggerDismiss}
        aria-label="Saltar pantalla de bienvenida"
        className="absolute top-5 right-5 sm:top-7 sm:right-7 min-h-[40px] px-4 py-2 rounded-full bg-[#FFF7EE] hover:bg-[#F4B8C7] text-[#4A2638] text-xs font-semibold border border-[#4A2638]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B73E5B] transition-colors cursor-pointer"
      >
        Saltar
      </button>

      {/* Composición central con flotación sutil */}
      <div className="relative flex flex-col items-center max-w-sm w-full text-center">
        {/* Motivos SVG minimalistas flotantes (sin amarillo) */}
        <SparkleFourPoint className="w-6 h-6 text-[#F4B8C7] absolute -top-6 left-6 sm:left-4 animate-splash-float pointer-events-none" />
        <MinimalHeart className="w-5 h-5 text-[#CDE5DA] absolute -top-3 right-8 sm:right-6 animate-splash-float-reverse pointer-events-none" />
        <MinimalHeart className="w-5 h-5 text-[#F4B8C7] absolute top-28 -left-2 sm:left-0 animate-splash-float-reverse pointer-events-none" />
        <SparkleFourPoint className="w-5 h-5 text-[#CDE5DA] absolute top-24 -right-2 sm:right-0 animate-splash-float pointer-events-none" />

        {/* Emblema Circular Sticker con doble aro en Menta Suave y Rosa Fresa */}
        <div className="relative flex items-center justify-center mb-7 animate-splash-float">
          {/* Aro exterior en Menta Suave (#CDE5DA) */}
          <div className="p-2.5 rounded-full border-2 border-[#CDE5DA] bg-[#FFF7EE]">
            {/* Aro interior en Rosa Fresa (#F4B8C7) */}
            <div className="p-2.5 rounded-full border-2 border-[#F4B8C7] bg-[#FFF7EE]">
              {/* Contenedor Sticker con borde Ciruela, sombra sólida y área de seguridad >= 10% */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white border-2 border-[#4A2638] shadow-[0_6px_0_#4A2638] p-4 sm:p-5 flex items-center justify-center overflow-hidden">
                {!logoError ? (
                  <img
                    src="/logo.jpg"
                    alt="Freséame"
                    className="w-full h-full object-contain block"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-3xl leading-none mb-1" aria-hidden="true">🍓</span>
                    <span className="font-['DynaPuff'] font-bold text-base text-[#4A2638]">
                      Freséame
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Eslogan oficial en DynaPuff */}
        <h2 className="font-['DynaPuff'] font-bold text-2xl sm:text-3xl text-[#4A2638] leading-snug">
          El límite lo pones tú
        </h2>

        {/* Barra de progreso minimalista: pista Menta Suave y relleno Frambuesa */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Cargando Freséame"
          className="mt-5 w-56 sm:w-64 h-2.5 bg-[#CDE5DA] rounded-full overflow-hidden border border-[#4A2638]/15"
        >
          <div
            className="w-full h-full bg-[#B73E5B] rounded-full origin-left transition-transform duration-75 ease-out"
            style={{ transform: `scaleX(${Math.min(progress, 100) / 100})` }}
          />
        </div>

        {/* Micro-copy antojable en Outfit */}
        <p className="mt-3 text-xs sm:text-sm font-normal text-[#4A2638]/80 tracking-wide">
          Preparando tus fresas al momento...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
