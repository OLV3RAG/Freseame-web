import React, { useState, useEffect } from 'react';
import logoImg from '../logo.jpg';

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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF8F2] select-none transition-opacity duration-700 ease-in-out ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isLoading}
    >
      {/* Dynamic Ambient Blur Halos */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Animated Ping Aura */}
        <div className="absolute w-36 h-36 sm:w-44 sm:h-44 bg-pink-400/30 blur-2xl rounded-full scale-125 animate-ping opacity-60 pointer-events-none" />

        {/* Soft Glowing Gradient Circle */}
        <div className="absolute w-52 h-52 sm:w-60 sm:h-60 bg-gradient-to-tr from-[#FF4B8B]/25 via-[#48C9B0]/20 to-pink-300/30 blur-3xl rounded-full animate-pulse pointer-events-none" />

        {/* Central Logo Container */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full shadow-2xl border-4 border-pink-200 overflow-hidden bg-white flex items-center justify-center animate-pulse">
          {!logoError ? (
            <img
              src={logoImg || './logo.jpg'}
              alt="Freséame"
              className="w-full h-full object-cover"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[#FFF0F5] flex items-center justify-center text-5xl">
              🍓
            </div>
          )}
        </div>
      </div>

      {/* Typography: Title & Animated Slogan */}
      <div className="text-center px-4 mb-7 space-y-1">
        <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl tracking-tight text-[#FF4B8B] drop-shadow-xs flex items-center justify-center gap-2">
          <span>Freséame</span>
          <span className="text-3xl sm:text-4xl animate-bounce">🍓</span>
        </h1>
        <p className="font-sans text-sm sm:text-base font-bold text-[#2B1A24]/75 tracking-wider italic">
          "El límite lo pones tú..."
        </p>
      </div>

      {/* Thin Progress Bar */}
      <div className="w-64 sm:w-72 h-2.5 bg-pink-100 rounded-full overflow-hidden shadow-inner p-0.5 border border-pink-200/80">
        <div
          className="h-full bg-gradient-to-r from-[#FF4B8B] via-[#E8437D] to-[#48C9B0] rounded-full transition-all duration-100 ease-out shadow-xs"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Progress Helper Text */}
      <p className="mt-3 text-xs sm:text-sm text-[#2B1A24]/60 font-medium tracking-wide animate-pulse">
        Batiendo la crema fresca y alistando los toppings...
      </p>
    </div>
  );
};
