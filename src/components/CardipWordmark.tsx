import React from 'react';

export interface CardipWordmarkProps {
  /**
   * - 'color': CAR (Red #C2181C) + DIP (Black or White based on bg)
   * - 'red': Entire CARDIP in Red (#C2181C)
   * - 'black': Pure Black (#000000)
   * - 'white': Pure White (#FFFFFF)
   * - 'darkblue': Pure DarkBlue (#0F1C25)
   */
  variant?: 'color' | 'red' | 'black' | 'white' | 'darkblue';
  /** If variant is 'color', onDark sets DIP to white instead of black */
  onDark?: boolean;
  /** Whether to show the registered trademark symbol (default: true) */
  withRegistered?: boolean;
  className?: string;
}

/**
 * Official CARDIP® Wordmark Component
 * Strictly complies with CARDIP Corporate Design Guidelines:
 * - Font: Roboto Black / Roboto Bold (from C:\projects\font\Roboto)
 * - Brand Colors:
 *   Red: #C2181C (Pantone 485 C / RAL 3020)
 *   DarkBlue: #0F1C25 (Pantone 296 C / RAL 5004)
 *   Black: #000000
 *   White: #FFFFFF
 * - No unauthorized gradients or non-brand colors.
 */
export const CardipWordmark: React.FC<CardipWordmarkProps> = ({
  variant = 'color',
  onDark = false,
  withRegistered = true,
  className = ''
}) => {
  if (variant === 'red') {
    return (
      <span className={`font-cardip font-black tracking-tight text-cardip-red ${className}`}>
        CARDIP{withRegistered && <sup className="text-[0.65em] font-bold ml-0.5">®</sup>}
      </span>
    );
  }

  if (variant === 'black') {
    return (
      <span className={`font-cardip font-black tracking-tight text-black ${className}`}>
        CARDIP{withRegistered && <sup className="text-[0.65em] font-bold ml-0.5">®</sup>}
      </span>
    );
  }

  if (variant === 'white') {
    return (
      <span className={`font-cardip font-black tracking-tight text-white ${className}`}>
        CARDIP{withRegistered && <sup className="text-[0.65em] font-bold ml-0.5">®</sup>}
      </span>
    );
  }

  if (variant === 'darkblue') {
    return (
      <span className={`font-cardip font-black tracking-tight text-cardip-dark ${className}`}>
        CARDIP{withRegistered && <sup className="text-[0.65em] font-bold ml-0.5">®</sup>}
      </span>
    );
  }

  // Official Two-Tone Logo: CAR (#C2181C) + DIP (Black on light / White on dark)
  const dipColor = onDark ? 'text-white' : 'text-black';

  return (
    <span className={`font-cardip font-black tracking-tight inline-flex items-baseline ${className}`}>
      <span className="text-cardip-red">CAR</span>
      <span className={dipColor}>DIP</span>
      {withRegistered && <sup className={`text-[0.65em] font-bold ml-0.5 ${dipColor}`}>®</sup>}
    </span>
  );
};
