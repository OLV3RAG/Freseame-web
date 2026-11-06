import React, { useState, useEffect } from 'react';
import logoImg from '../logo.jpg';

interface SplashScreenProps {
  isLoading: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState<number>(0);
  const [logoError, setLogoError] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(true);

  // Smoothly fill the progress bar over 1.8 seconds
  useEffect(() => {
    const duration = 1800;
    const interval = 25;
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
      }, 700);
      return () => clearTimeout(exitTimer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      id="freseame-splash-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-gray-900 select-none transition-opacity duration-700 ease-in-out ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isLoading}
    >
      {/* Dynamic Ambient Blur Halos */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Animated Ping Aura */}
        <div className="absolute w-36 h-36 sm:w-44 sm:h-44 bg-rose-200/50 blur-2xl rounded-full scale-125 animate-ping opacity-60 pointer-events-none" />

        {/* Soft Glowing Gradient Circle */}
        <div className="absolute w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-tr from-rose-200/60 via-pink-100/40 to-emerald-100/40 blur-3xl rounded-full animate-pulse pointer-events-none" />

        {/* Central Logo Container */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-xl border-4 border-rose-500 overflow-hidden bg-white flex items-center justify-center">
          {!logoError ? (
            <img
              src={logoImg || './logo.jpg'}
              alt="Freséame - Fresas con Crema"
              width="160"
              height="160"
              className="w-full h-full object-cover"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-full h-full bg-rose-50 flex items-center justify-center text-5xl">
              🍓
            </div>
          )}
        </div>
      </div>

      {/* Typography: Title & Slogan */}
      <div className="text-center px-4 mb-6 space-y-1.5">
        <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl tracking-tight text-gray-900 flex items-center justify-center gap-2">
          <span>Freséame</span>
          <span className="text-rose-600 animate-bounce">🍓</span>
        </h1>
        <p className="font-['Outfit'] text-base sm:text-lg font-bold text-rose-500 tracking-wide">
          "El límite lo pones tú"
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-60 sm:w-68 h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner p-0.5 border border-rose-100">
        <div
          className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-full transition-all duration-100 ease-out shadow-xs"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Progress Helper Text */}
      <p className="mt-3 text-xs sm:text-sm text-gray-500 font-medium tracking-wide flex items-center gap-1.5">
        <span>🍓</span>
        <span>Preparando fresas frescas y cremas artesanales...</span>
      </p>
    </div>
  );
};

export default SplashScreen;
