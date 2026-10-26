import React from 'react';

interface TemplateSvgProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  svgClassName: string;
  fillState: Record<string, string>;
  onPartClick: (partKey: string) => void;
}

export const BrandweerautoSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Road Ground */}
    <rect x="30" y="420" width="440" height="25" rx="10" fill="#E2E8F0" stroke="#1E293B" strokeWidth="6" pointerEvents="none" />
    {/* Siren Light on top */}
    <ellipse cx="160" cy="170" rx="20" ry="14" fill={fillState['bw-light'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('bw-light')} />
    {/* Ladder */}
    <rect x="210" y="150" width="180" height="24" rx="6" fill={fillState['bw-ladder'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('bw-ladder')} />
    <line x1="250" y1="150" x2="250" y2="174" stroke="#1E293B" strokeWidth="4" />
    <line x1="290" y1="150" x2="290" y2="174" stroke="#1E293B" strokeWidth="4" />
    <line x1="330" y1="150" x2="330" y2="174" stroke="#1E293B" strokeWidth="4" />
    <line x1="370" y1="150" x2="370" y2="174" stroke="#1E293B" strokeWidth="4" />
    {/* Main Fire Truck Body */}
    <path
      d="M100 280 L100 370 L420 370 L420 190 L220 190 L220 280 Z"
      fill={fillState['bw-body'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="8"
      strokeLinejoin="round"
      onClick={() => onPartClick('bw-body')}
    />
    {/* Truck Front Driver Cabin */}
    <path
      d="M100 280 L140 200 L220 200 L220 280 Z"
      fill={fillState['bw-cabin'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={(e) => { e.stopPropagation(); onPartClick('bw-cabin'); }}
    />
    {/* Front Window */}
    <polygon points="120,270 148,215 205,215 205,270" fill="#FFFFFF" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
    {/* Big Wheels */}
    <circle cx="170" cy="380" r="42" fill={fillState['bw-wheel1'] || '#1E293B'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('bw-wheel1')} />
    <circle cx="170" cy="380" r="18" fill="#F8FAFC" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
    <circle cx="350" cy="380" r="42" fill={fillState['bw-wheel2'] || '#1E293B'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('bw-wheel2')} />
    <circle cx="350" cy="380" r="18" fill="#F8FAFC" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
    {/* Water Hose Reel */}
    <circle cx="280" cy="280" r="28" fill={fillState['bw-hose'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('bw-hose')} />
  </svg>
);

export const VliegtuigSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Clouds in background */}
    <ellipse cx="120" cy="120" rx="55" ry="32" fill={fillState['vt-cloud'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('vt-cloud')} />
    {/* Back Wings */}
    <polygon points="250,220 230,90 280,105 290,220" fill={fillState['vt-wing-r'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('vt-wing-r')} />
    {/* Airplane Tail Fin */}
    <polygon points="400,240 460,150 480,160 440,250" fill={fillState['vt-tail'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('vt-tail')} />
    {/* Airplane Main Fuselage */}
    <ellipse cx="270" cy="260" rx="170" ry="50" fill={fillState['vt-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('vt-body')} />
    {/* Front Propeller */}
    <ellipse cx="90" cy="260" rx="14" ry="55" fill={fillState['vt-propeller'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('vt-propeller')} />
    <circle cx="90" cy="260" r="10" fill="#1E293B" pointerEvents="none" />
    {/* Front Wing */}
    <polygon points="240,280 200,420 250,420 300,280" fill={fillState['vt-wing-l'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('vt-wing-l')} />
    {/* Porthole Windows */}
    <circle cx="210" cy="255" r="14" fill={fillState['vt-window1'] || '#FFFFFF'} stroke="#1E293B" strokeWidth="5" onClick={(e) => { e.stopPropagation(); onPartClick('vt-window1'); }} />
    <circle cx="255" cy="255" r="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
    <circle cx="300" cy="255" r="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
  </svg>
);

export const LuchtballonSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Clouds and bird */}
    <ellipse cx="90" cy="240" rx="50" ry="30" fill={fillState['lb-cloud-l'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('lb-cloud-l')} />
    <ellipse cx="410" cy="220" rx="50" ry="30" fill={fillState['lb-cloud-r'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('lb-cloud-r')} />
    <path d="M380 90 Q395 75 410 90 Q425 75 440 90" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" onClick={() => onPartClick('lb-bird')} />
    {/* Wicker Basket */}
    <rect x="210" y="380" width="80" height="65" rx="12" fill={fillState['lb-basket'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('lb-basket')} />
    {/* Ropes to balloon */}
    <line x1="225" y1="380" x2="200" y2="330" stroke="#1E293B" strokeWidth="5" />
    <line x1="275" y1="380" x2="300" y2="330" stroke="#1E293B" strokeWidth="5" />
    {/* Balloon Left Stripe */}
    <path
      d="M200 330 C130 310 100 240 100 180 C100 100 170 60 210 60 C180 120 180 250 200 330 Z"
      fill={fillState['lb-strip1'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('lb-strip1')}
    />
    {/* Balloon Middle Center Stripe */}
    <path
      d="M200 330 C180 250 180 120 210 60 L290 60 C320 120 320 250 300 330 Z"
      fill={fillState['lb-strip2'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('lb-strip2')}
    />
    {/* Balloon Right Stripe */}
    <path
      d="M300 330 C370 310 400 240 400 180 C400 100 330 60 290 60 C320 120 320 250 300 330 Z"
      fill={fillState['lb-strip3'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('lb-strip3')}
    />
  </svg>
);

export const TreinSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Train Rails */}
    <rect x="30" y="420" width="440" height="15" rx="6" fill="#64748B" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
    {/* Smoke Puffs */}
    <circle cx="160" cy="110" r="32" fill={fillState['tr-smoke1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('tr-smoke1')} />
    <circle cx="220" cy="75" r="42" fill={fillState['tr-smoke2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('tr-smoke2')} />
    {/* Smokestack Chimney */}
    <polygon points="135,240 120,160 170,160 155,240" fill={fillState['tr-chimney'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('tr-chimney')} />
    {/* Locomotive Boiler Front */}
    <rect x="90" y="240" width="180" height="120" rx="20" fill={fillState['tr-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('tr-body')} />
    {/* Driver Cabin */}
    <path
      d="M260 180 L400 180 L400 360 L260 360 Z"
      fill={fillState['tr-cabin'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="8"
      strokeLinejoin="round"
      onClick={() => onPartClick('tr-cabin')}
    />
    <rect x="290" y="210" width="60" height="50" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
    {/* Wheels */}
    <circle cx="150" cy="380" r="42" fill={fillState['tr-wheel1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('tr-wheel1')} />
    <circle cx="150" cy="380" r="16" fill="#1E293B" pointerEvents="none" />
    <circle cx="330" cy="380" r="48" fill={fillState['tr-wheel2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('tr-wheel2')} />
    <circle cx="330" cy="380" r="18" fill="#1E293B" pointerEvents="none" />
  </svg>
);

export const IjsjeSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Crispy Waffle Cone */}
    <polygon
      points="170,270 330,270 250,470"
      fill={fillState['ij-cone'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="8"
      strokeLinejoin="round"
      onClick={() => onPartClick('ij-cone')}
    />
    <line x1="200" y1="310" x2="270" y2="430" stroke="#1E293B" strokeWidth="4" pointerEvents="none" />
    <line x1="300" y1="310" x2="230" y2="430" stroke="#1E293B" strokeWidth="4" pointerEvents="none" />
    {/* Scoop 1 Bottom */}
    <ellipse cx="250" cy="255" rx="75" ry="42" fill={fillState['ij-scoop1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ij-scoop1')} />
    {/* Scoop 2 Middle */}
    <ellipse cx="250" cy="195" rx="68" ry="40" fill={fillState['ij-scoop2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ij-scoop2')} />
    {/* Scoop 3 Top */}
    <circle cx="250" cy="135" r="50" fill={fillState['ij-scoop3'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ij-scoop3')} />
    {/* Sprinkles on top scoop */}
    <line x1="225" y1="125" x2="235" y2="135" stroke={fillState['ij-sprinkle'] || '#EC4899'} strokeWidth="6" strokeLinecap="round" onClick={() => onPartClick('ij-sprinkle')} />
    <line x1="260" y1="120" x2="272" y2="125" stroke={fillState['ij-sprinkle'] || '#3B82F6'} strokeWidth="6" strokeLinecap="round" onClick={() => onPartClick('ij-sprinkle')} />
    {/* Sweet Cherry on Top */}
    <circle cx="250" cy="65" r="22" fill={fillState['ij-cherry'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('ij-cherry')} />
    <path d="M250 45 Q265 20 280 25" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" pointerEvents="none" />
  </svg>
);

export const AppelboomSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Grass Ground */}
    <ellipse cx="250" cy="450" rx="220" ry="25" fill={fillState['ab-grass'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('ab-grass')} />
    {/* Tree Trunk */}
    <path
      d="M220 250 L210 440 L290 440 L280 250 Z"
      fill={fillState['ab-trunk'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="8"
      strokeLinejoin="round"
      onClick={() => onPartClick('ab-trunk')}
    />
    {/* Bushy Tree Crown */}
    <path
      d="M250 70 C160 70 110 130 110 200 C110 270 170 300 250 300 C330 300 390 270 390 200 C390 130 340 70 250 70 Z"
      fill={fillState['ab-crown'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="8"
      strokeLinejoin="round"
      onClick={() => onPartClick('ab-crown')}
    />
    {/* Juicy Apples in Tree */}
    <circle cx="180" cy="160" r="24" fill={fillState['ab-apple1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onPartClick('ab-apple1'); }} />
    <circle cx="250" cy="210" r="24" fill={fillState['ab-apple2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onPartClick('ab-apple2'); }} />
    <circle cx="310" cy="150" r="24" fill={fillState['ab-apple3'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onPartClick('ab-apple3'); }} />
    {/* Basket on Ground */}
    <polygon points="340,390 420,390 405,440 355,440" fill={fillState['ab-basket'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('ab-basket')} />
  </svg>
);

export const PaddenstoelSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <ellipse cx="250" cy="450" rx="210" ry="25" fill={fillState['ps-grass'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('ps-grass')} />
    {/* Mushroom Stem Base */}
    <path
      d="M190 250 C180 340 170 430 170 430 L330 430 C330 430 320 340 310 250 Z"
      fill={fillState['ps-stem'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="8"
      strokeLinejoin="round"
      onClick={() => onPartClick('ps-stem')}
    />
    {/* Fairy Door */}
    <path
      d="M225 430 L225 350 C225 330 275 330 275 350 L275 430 Z"
      fill={fillState['ps-door'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      onClick={(e) => { e.stopPropagation(); onPartClick('ps-door'); }}
    />
    <circle cx="265" cy="385" r="4" fill="#1E293B" pointerEvents="none" />
    {/* Big Mushroom Red Cap */}
    <path
      d="M80 270 C80 120 420 120 420 270 C340 285 160 285 80 270 Z"
      fill={fillState['ps-cap'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="8"
      strokeLinejoin="round"
      onClick={() => onPartClick('ps-cap')}
    />
    {/* Big White Dots */}
    <circle cx="170" cy="200" r="26" fill={fillState['ps-dot1'] || '#FFFFFF'} stroke="#1E293B" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onPartClick('ps-dot1'); }} />
    <circle cx="250" cy="160" r="30" fill={fillState['ps-dot2'] || '#FFFFFF'} stroke="#1E293B" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onPartClick('ps-dot2'); }} />
    <circle cx="330" cy="210" r="26" fill={fillState['ps-dot3'] || '#FFFFFF'} stroke="#1E293B" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onPartClick('ps-dot3'); }} />
  </svg>
);
