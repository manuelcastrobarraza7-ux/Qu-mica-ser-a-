import React from 'react';
import { NFPAData } from '../data/chemicals';

interface NFPADiamondProps {
  data: NFPAData;
  size?: number;
  className?: string;
}

export const NFPADiamond: React.FC<NFPADiamondProps> = ({ data, size = 120, className = '' }) => {
  const { health, flammability, instability, special = 'NONE' } = data;

  const renderSpecialSymbol = () => {
    switch (special) {
      case 'W':
        return (
          <g>
            <text x="50" y="79" textAnchor="middle" dominantBaseline="middle" className="text-black font-bold text-xs" fill="#000" fontSize="12" fontFamily="monospace">
              W
            </text>
            <line x1="42" y1="79" x2="58" y2="79" stroke="#000" strokeWidth="2" />
          </g>
        );
      case 'OX':
        return (
          <text x="50" y="79" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="10" fontWeight="bold" fontFamily="monospace">
            OX
          </text>
        );
      case 'ACID':
        return (
          <text x="50" y="79" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="9" fontWeight="bold" fontFamily="monospace">
            ACID
          </text>
        );
      case 'ALK':
        return (
          <text x="50" y="79" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="9" fontWeight="bold" fontFamily="monospace">
            ALK
          </text>
        );
      case 'COR':
        return (
          <text x="50" y="79" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="9" fontWeight="bold" fontFamily="monospace">
            COR
          </text>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-md"
        role="img"
        aria-label={`Rombo NFPA 704: Salud ${health}, Inflamabilidad ${flammability}, Inestabilidad ${instability}, Especial ${special}`}
      >
        {/* Background diamond rotated 45 deg */}
        <g stroke="#0f172a" strokeWidth="1.5">
          {/* Top Diamond: Red (Flammability) */}
          <polygon points="50,4 73,27 50,50 27,27" fill="#ef4444" />
          {/* Left Diamond: Blue (Health) */}
          <polygon points="27,27 50,50 27,73 4,50" fill="#2563eb" />
          {/* Right Diamond: Yellow (Instability / Reactivity) */}
          <polygon points="73,27 96,50 73,73 50,50" fill="#eab308" />
          {/* Bottom Diamond: White (Special) */}
          <polygon points="50,50 73,73 50,96 27,73" fill="#f8fafc" />
        </g>

        {/* Text values */}
        {/* Flammability (Red) */}
        <text
          x="50"
          y="29"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontSize="15"
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
        >
          {flammability}
        </text>

        {/* Health (Blue) */}
        <text
          x="27"
          y="51"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontSize="15"
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
        >
          {health}
        </text>

        {/* Instability (Yellow) */}
        <text
          x="73"
          y="51"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#0f172a"
          fontSize="15"
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
        >
          {instability}
        </text>

        {/* Special (White) */}
        {renderSpecialSymbol()}
      </svg>

      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
        NFPA 704 Standard
      </span>
    </div>
  );
};
