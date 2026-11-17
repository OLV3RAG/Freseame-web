import React from 'react';

interface DecorProps {
  className?: string;
}

/** Destello minimalista de 4 puntas (✦) inspirado en el manual de Freséame */
export const SparkleFourPoint: React.FC<DecorProps> = ({ className = 'w-5 h-5 text-[#F4B8C7]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 1.5C12.7 7.6 16.4 11.3 22.5 12C16.4 12.7 12.7 16.4 12 22.5C11.3 16.4 7.6 12.7 1.5 12C7.6 11.3 11.3 7.6 12 1.5Z" />
  </svg>
);

/** Corazoncito minimalista (♡) de trazo suave */
export const MinimalHeart: React.FC<DecorProps> = ({ className = 'w-5 h-5 text-[#F4B8C7]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 20.5s-7.5-4.7-9.2-9.2C1.7 8.4 3.6 5.2 6.8 5c2-.1 3.8.9 5.2 2.6C13.4 5.9 15.2 4.9 17.2 5c3.2.2 5.1 3.4 4 6.3-1.7 4.5-9.2 9.2-9.2 9.2Z" />
  </svg>
);

/** Líneas curvas dobles inspiradas en el aro del emblema circular oficial */
export const DoubleArcDecor: React.FC<DecorProps> = ({ className = 'w-32 h-16 text-[#F4B8C7]' }) => (
  <svg
    viewBox="0 0 160 72"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M8 58C36 16 124 16 152 58"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M22 64C46 28 114 28 138 64"
      stroke="#CDE5DA"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);
