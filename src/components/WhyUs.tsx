import React from 'react';
import { ShieldCheck, Heart, Sparkles, Star, Clock, Truck, Award } from 'lucide-react';
import { FRESEAME_REVIEWS } from '../data/freseameData';

export const WhyUs: React.FC = () => {
  const pillars = [
    {
      icon: '🍓',
      title: 'Frescura Innegociable',
      description: 'Fresas lavadas, desinfectadas y rebanadas justo al momento de tu pedido. Cero fruta rezagada.',
    },
    {
      icon: '✨',
      title: 'El Límite lo Pones Tú',
      description: 'Más de 27 toppings, 6 tipos de crema y aderezos premium. Cada vaso es una obra única a tu antojo.',
    },
    {
      icon: '🌱',
      title: 'Para Todos los Gustos',
      description: 'Desde opciones indulgentes con Nutella y Ferrero hasta opciones Fit con proteína y crema vegana.',
    },
    {
      icon: '⚡',
      title: 'Atención Inmediata',
      description: 'Haces tu pedido por WhatsApp y te lo preparamos al instante para recoger o enviar a domicilio.',
    },
  ];

  return (
    <section id="calidad" className="py-16 md:py-24 bg-white border-b border-[#2B1A24]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-wider text-[#FF4B8B] bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-200">
            ¿Por qué Freséame?
          </span>
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl md:text-5xl text-[#2B1A24] tracking-tight mt-3">
            El Secreto Está en el Amor & la Frescura
          </h2>
          <p className="mt-3 text-base text-[#2B1A24]/75">
            Cuidamos cada detalle para que tu experiencia dulce sea memorable en cada bocado.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#FFF8F2] border border-[#2B1A24]/8 hover:border-[#FF4B8B]/30 hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl mb-4 border border-rose-100">
                {pillar.icon}
              </div>
              <h3 className="font-['Outfit'] font-black text-lg text-[#2B1A24] mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#2B1A24]/70 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-r from-rose-50 via-white to-pink-50 rounded-3xl p-8 sm:p-10 border border-pink-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#FF4B8B] uppercase tracking-wider">
                Opiniones de la Comunidad
              </span>
              <h3 className="font-['Outfit'] font-black text-2xl text-[#2B1A24] mt-0.5">
                Lo que dicen los #FresiLovers 🍓
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm font-black text-[#2B1A24] ml-1">4.9 de calificación</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FRESEAME_REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 shadow-xs border border-pink-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#2B1A24]/50 mb-2">
                    <span className="font-bold text-[#2B1A24]">{rev.name}</span>
                    <span>{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400 mb-2">
                    {[...Array(rev.stars)].map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#2B1A24]/80 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-semibold text-[#FF4B8B]">
                  Pidió: {rev.ordered}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
