import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-18 sm:pt-20 pb-2 sm:pb-3 bg-[#FFF8F2] text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-['Outfit'] font-black text-2xl sm:text-3xl md:text-4xl text-[#2B1A24] tracking-tight leading-tight">
          Arma tu combinación favorita <span className="inline-block hover:scale-110 transition-transform">🍓</span>
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-500 font-medium">
          Elige tu postre, tu crema artesanal y disfruta en Patio Clavería
        </p>
      </div>
    </section>
  );
};
