import React, { useState, useEffect } from 'react';
import logoImg from '../logo.jpg';
import { CempasuchilIcon, CalaveritaIcon } from './DiaDeMuertosDecorations';

interface SplashScreenProps {
  isLoading: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState<number>(0);
  const [logoError, setLogoError] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(true);

  // Smoothly fill the progress bar from 0% to 100% over 2.2 seconds
  useEffect(() => {
    const duration = 2200; // 2.2 seconds
    const interval = 25; // 25ms steps
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Remove completely from DOM after fade-out transition finishes
  useEffect(() => {
    if (!isLoading) {
      const exitTimer = setTimeout(() => {
        setShouldRender(false);
      }, 750); // Matches transition duration
      return () => clearTimeout(exitTimer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      id="freseame-splash-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0914] text-[#FFFDF7] select-none transition-opacity duration-700 ease-in-out ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isLoading}
    >
      {/* Dynamic Ambient Blur Halos */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Animated Ping Aura */}
        <div className="absolute w-36 h-36 sm:w-44 sm:h-44 bg-[#FF6F00]/25 blur-2xl rounded-full scale-125 animate-ping opacity-60 pointer-events-none" />

        {/* Soft Glowing Gradient Circle */}
        <div className="absolute w-52 h-52 sm:w-60 sm:h-60 bg-gradient-to-tr from-[#FF6F00]/30 via-[#6A1B9A]/30 to-[#FFD54F]/30 blur-3xl rounded-full animate-pulse pointer-events-none" />

        {/* Central Logo Container */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full shadow-2xl border-4 border-[#FF8F00] overflow-hidden bg-[#1A1228] flex items-center justify-center candle-glow">
          {!logoError ? (
            <img
              src={logoImg || './logo.jpg'}
              alt="Freséame - Fresas con Crema Artesanales"
              width="176"
              height="176"
              className="w-full h-full object-cover"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[#1A1228] flex items-center justify-center text-5xl">
              🍓
            </div>
          )}
        </div>
      </div>

      {/* Typography: Title & Animated Slogan */}
      <div className="text-center px-4 mb-7 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1228] border border-[#FF8F00]/40 text-[#FFD54F] text-xs font-bold uppercase tracking-wider mb-1">
          <CalaveritaIcon size={14} />
          <span>Edición Especial Día de Muertos</span>
          <CempasuchilIcon size={14} />
        </div>
        <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl tracking-tight text-[#FFFDF7] drop-shadow-md flex items-center justify-center gap-2">
          <span>Freséame</span>
          <span className="text-3xl sm:text-4xl animate-bounce">🍓</span>
          <CempasuchilIcon size={28} className="text-[#FF8F00]" />
        </h1>
        <p className="font-sans text-sm sm:text-base font-bold text-[#FFD54F] tracking-wider italic">
          "El límite lo pones tú..."
        </p>
      </div>

      {/* Thin Progress Bar */}
      <div className="w-64 sm:w-72 h-2.5 bg-[#25173B] rounded-full overflow-hidden shadow-inner p-0.5 border border-[#FF8F00]/40">
        <div
          className="h-full bg-gradient-to-r from-[#FF6F00] via-[#FF8F00] to-[#FFD54F] rounded-full transition-all duration-100 ease-out shadow-xs candle-glow"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Progress Helper Text */}
      <p className="mt-3 text-xs sm:text-sm text-stone-300 font-medium tracking-wide animate-pulse flex items-center gap-1.5">
        <CempasuchilIcon size={12} className="text-[#FF8F00]" />
        <span>Batiendo la crema fresca y alistando los toppings...</span>
      </p>
    </div>
  );
};
