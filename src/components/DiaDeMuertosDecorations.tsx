import React from 'react';

// Flor de Cempasúchil SVG decorativa
export const CempasuchilIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-5 h-5 text-[#FF8F00]',
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="cempasuchil-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="45%" stopColor="#FFB300" />
        <stop offset="80%" stopColor="#FF6F00" />
        <stop offset="100%" stopColor="#E65100" />
      </radialGradient>
    </defs>
    {/* Pétalos exteriores en estrella radial */}
    <g fill="url(#cempasuchil-grad)">
      <circle cx="12" cy="12" r="10" opacity="0.3" />
      <path d="M12 2 C13 5 15 5 17 3 C17 5 19 6 21 6 C19 8 19 10 21 12 C19 14 19 16 21 18 C19 18 17 19 17 21 C15 19 13 19 12 22 C11 19 9 19 7 21 C7 19 5 18 3 18 C5 16 5 14 3 12 C5 10 5 8 3 6 C5 6 7 5 7 3 C9 5 11 5 12 2 Z" />
      <path d="M12 4.5 C12.8 6.5 14.5 6.5 16 5 C16 6.8 17.5 7.5 19 8 C17.5 9.5 17.5 11 19 12 C17.5 13 17.5 14.5 19 16 C17.5 16.5 16 17.2 16 19 C14.5 17.5 12.8 17.5 12 19.5 C11.2 17.5 9.5 17.5 8 19 C8 17.2 6.5 16.5 5 16 C6.5 14.5 6.5 13 5 12 C6.5 11 6.5 9.5 5 8 C6.5 7.5 8 6.8 8 5 C9.5 6.5 11.2 6.5 12 4.5 Z" opacity="0.9" />
      <circle cx="12" cy="12" r="4.2" fill="#FFE082" />
      <circle cx="12" cy="12" r="2.2" fill="#FF8F00" />
    </g>
  </svg>
);

// Calaverita de Azúcar Festiva SVG
export const CalaveritaIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-5 h-5 text-pink-300',
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 2C7.58 2 4 5.58 4 10c0 2.22.9 4.23 2.37 5.68.21.21.36.48.42.77l.42 2.1c.12.61.65 1.05 1.27 1.05h6.04c.62 0 1.15-.44 1.27-1.05l.42-2.1c.06-.29.21-.56.42-.77C20.1 14.23 21 12.22 21 10c0-4.42-3.58-8-8-8z"
      fill="#FFFDF7"
      stroke="#FF8F00"
      strokeWidth="0.8"
    />
    {/* Ojos de Flor (Rosa Mexicano y Turquesa) */}
    <circle cx="8.5" cy="10" r="2.4" fill="#E91E63" />
    <circle cx="8.5" cy="10" r="1.2" fill="#FFE082" />
    <circle cx="15.5" cy="10" r="2.4" fill="#00BCD4" />
    <circle cx="15.5" cy="10" r="1.2" fill="#FFE082" />
    {/* Nariz corazón invertido */}
    <path d="M12 13.5 C11.3 12.5 11.8 11.8 12 11.8 C12.2 11.8 12.7 12.5 12 13.5 Z" fill="#9C27B0" />
    {/* Dientes y sonrisa */}
    <path d="M9 16h6M10.5 15v2M12 15v2M13.5 15v2" stroke="#2B1A24" strokeWidth="0.8" strokeLinecap="round" />
    {/* Detalle floral frente */}
    <circle cx="12" cy="5.5" r="1" fill="#FF8F00" />
    <circle cx="10.5" cy="6" r="0.6" fill="#E91E63" />
    <circle cx="13.5" cy="6" r="0.6" fill="#E91E63" />
  </svg>
);

// Veladora Tradicional con Flama Titilante
export const VeladoraIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-5 h-5',
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    {/* Vaso de veladora con relieve */}
    <rect x="7" y="10" width="10" height="11" rx="2" fill="#7B1FA2" opacity="0.35" stroke="#FFB300" strokeWidth="1" />
    <rect x="8.5" y="11" width="7" height="9" rx="1" fill="#FFF8E1" opacity="0.85" />
    <line x1="12" y1="10" x2="12" y2="7.5" stroke="#3E2723" strokeWidth="1.2" strokeLinecap="round" />
    {/* Flama con resplandor */}
    <path
      d="M12 3.5 C13 5.5 14 6.8 13.2 8.2 C12.6 9.2 11.4 9.2 10.8 8.2 C10 6.8 11 5.5 12 3.5 Z"
      fill="#FF6F00"
    />
    <path
      d="M12 5.5 C12.5 6.6 13 7.2 12.6 8 C12.3 8.5 11.7 8.5 11.4 8 C11 7.2 11.5 6.6 12 5.5 Z"
      fill="#FFE082"
    />
  </svg>
);

// Cenefa de Banderines de Papel Picado Ondulante
interface PapelPicadoProps {
  inverted?: boolean;
  className?: string;
}

export const PapelPicado: React.FC<PapelPicadoProps> = ({ inverted = false, className = '' }) => {
  const flags = [
    { color: '#E91E63', icon: 'calavera', delay: '0s' },    // Rosa Mexicano
    { color: '#FF6F00', icon: 'cempasuchil', delay: '0.4s' },// Naranja Cempasúchil
    { color: '#7B1FA2', icon: 'corazon', delay: '0.8s' },    // Morado Fiesta
    { color: '#00BCD4', icon: 'flor', delay: '0.2s' },       // Turquesa
    { color: '#FFD54F', icon: 'calavera', delay: '0.6s' },   // Amarillo Oro
    { color: '#E91E63', icon: 'cempasuchil', delay: '1.0s' },// Rosa Mexicano
    { color: '#FF6F00', icon: 'corazon', delay: '0.3s' },    // Naranja
    { color: '#7B1FA2', icon: 'flor', delay: '0.7s' },       // Morado
    { color: '#00BCD4', icon: 'calavera', delay: '0.5s' },   // Turquesa
    { color: '#FFD54F', icon: 'cempasuchil', delay: '0.9s' },// Amarillo Oro
  ];

  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none relative z-20 ${
        inverted ? 'transform rotate-180' : ''
      } ${className}`}
      aria-hidden="true"
    >
      {/* Cuerda superior */}
      <div className="w-full h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 opacity-90 shadow-2xs" />

      {/* Tira horizontal flexible de banderines */}
      <div className="flex justify-between items-start w-full px-1 min-w-[700px] sm:min-w-0">
        {flags.map((flag, idx) => (
          <div
            key={idx}
            className="flex-1 mx-0.5 sm:mx-1 max-w-[90px] wave-flag-anim"
            style={{ animationDelay: flag.delay }}
          >
            <svg
              viewBox="0 0 70 85"
              fill={flag.color}
              className="w-full h-auto drop-shadow-sm opacity-95 hover:opacity-100 transition-opacity"
            >
              {/* Cuerpo del banderín con calado festivo */}
              <path d="M0,0 L70,0 L70,72 L52,65 L35,82 L18,65 L0,72 Z" />
              {/* Cenefas y calados geométricos tradicionales (simulando papel perforado a mano) */}
              <g fill="#0D0914" opacity="0.88">
                {/* Filas de pequeños agujeros festivos */}
                <circle cx="10" cy="8" r="2.2" />
                <circle cx="22" cy="8" r="2.2" />
                <circle cx="35" cy="8" r="2.2" />
                <circle cx="48" cy="8" r="2.2" />
                <circle cx="60" cy="8" r="2.2" />

                {/* Motivo central según el banderín */}
                {flag.icon === 'calavera' && (
                  <>
                    <path d="M35,22 C27,22 23,26 23,34 C23,39 25,41 27,43 L27,47 C27,48 29,49 31,49 L39,49 C41,49 43,48 43,47 L43,43 C45,41 47,39 47,34 C47,26 43,22 35,22 Z" />
                    <circle cx="30" cy="32" r="3.2" fill={flag.color} />
                    <circle cx="40" cy="32" r="3.2" fill={flag.color} />
                    <polygon points="35,36 33,40 37,40" fill={flag.color} />
                    <line x1="31" y1="46" x2="39" y2="46" stroke={flag.color} strokeWidth="1.5" />
                  </>
                )}

                {flag.icon === 'cempasuchil' && (
                  <>
                    <circle cx="35" cy="34" r="11" />
                    <circle cx="35" cy="34" r="5" fill={flag.color} />
                    <circle cx="23" cy="34" r="2.5" />
                    <circle cx="47" cy="34" r="2.5" />
                    <circle cx="35" cy="22" r="2.5" />
                    <circle cx="35" cy="46" r="2.5" />
                  </>
                )}

                {flag.icon === 'corazon' && (
                  <>
                    <path d="M35,46 C35,46 22,37 22,28 C22,23 26,20 30,22 C33,23.5 35,26 35,26 C35,26 37,23.5 40,22 C44,20 48,23 48,28 C48,37 35,46 35,46 Z" />
                    <circle cx="35" cy="31" r="2" fill={flag.color} />
                  </>
                )}

                {flag.icon === 'flor' && (
                  <>
                    <polygon points="35,20 39,29 49,29 41,35 44,45 35,39 26,45 29,35 21,29 31,29" />
                    <circle cx="35" cy="32" r="2.5" fill={flag.color} />
                  </>
                )}

                {/* Calados inferiores de ondas */}
                <circle cx="15" cy="55" r="2" />
                <circle cx="25" cy="58" r="2" />
                <circle cx="35" cy="60" r="2.5" />
                <circle cx="45" cy="58" r="2" />
                <circle cx="55" cy="55" r="2" />
              </g>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

// Lluvia de Pétalos de Cempasúchil Flotantes en Hero
export const PetalShower: React.FC = () => {
  // Pre-configured coordinates and delays to render 14 floating petals
  const petals = [
    { left: '4%', delay: '0s', duration: '7s', size: 18, rotate: '25deg' },
    { left: '12%', delay: '2.5s', duration: '8.5s', size: 14, rotate: '70deg' },
    { left: '22%', delay: '1s', duration: '6.8s', size: 20, rotate: '-45deg' },
    { left: '33%', delay: '4s', duration: '9s', size: 16, rotate: '110deg' },
    { left: '45%', delay: '0.6s', duration: '7.5s', size: 22, rotate: '-15deg' },
    { left: '55%', delay: '3.2s', duration: '8s', size: 15, rotate: '55deg' },
    { left: '65%', delay: '1.8s', duration: '7.2s', size: 19, rotate: '-80deg' },
    { left: '76%', delay: '4.8s', duration: '8.8s', size: 14, rotate: '35deg' },
    { left: '86%', delay: '2.1s', duration: '6.5s', size: 21, rotate: '95deg' },
    { left: '94%', delay: '0.2s', duration: '7.8s', size: 16, rotate: '-60deg' },
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none"
      aria-hidden="true"
    >
      {petals.map((p, idx) => (
        <div
          key={idx}
          className="absolute top-0 opacity-0"
          style={{
            left: p.left,
            animation: `float-petal ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
            transform: `rotate(${p.rotate})`,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
            className="drop-shadow-xs"
          >
            {/* Silueta de pétalo de cempasúchil con degradado cálido */}
            <path
              d="M10,0 C16,6 20,15 17,21 C14,26 6,26 3,21 C0,15 4,6 10,0 Z"
              fill="url(#petal-gradient)"
            />
          </svg>
        </div>
      ))}
      <svg width="0" height="0" className="hidden">
        <defs>
          <linearGradient id="petal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="40%" stopColor="#FFB300" />
            <stop offset="85%" stopColor="#FF6F00" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
