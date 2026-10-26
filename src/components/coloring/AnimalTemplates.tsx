import React from 'react';

interface TemplateSvgProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  svgClassName: string;
  fillState: Record<string, string>;
  onPartClick: (partKey: string) => void;
}

export const OlifantSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Ground Grass */}
    <ellipse cx="250" cy="445" rx="210" ry="25" fill={fillState['ol-ground'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('ol-ground')} />
    {/* Water Drops from Trunk */}
    <ellipse cx="120" cy="115" rx="14" ry="20" fill={fillState['ol-drop1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('ol-drop1')} />
    <ellipse cx="155" cy="85" rx="12" ry="17" fill={fillState['ol-drop2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('ol-drop2')} />
    {/* Back & Front Legs */}
    <rect x="230" y="320" width="55" height="110" rx="20" fill={fillState['ol-leg1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ol-leg1')} />
    <rect x="330" y="320" width="55" height="110" rx="20" fill={fillState['ol-leg2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ol-leg2')} />
    {/* Elephant Big Round Body */}
    <ellipse cx="310" cy="275" rx="125" ry="105" fill={fillState['ol-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('ol-body')} />
    {/* Tail with tuft */}
    <path d="M425 280 C445 300 450 330 445 350" stroke="#1E293B" strokeWidth="6" fill="none" strokeLinecap="round" pointerEvents="none" />
    <circle cx="445" cy="355" r="8" fill="#1E293B" pointerEvents="none" />
    {/* Head */}
    <circle cx="195" cy="235" r="75" fill={fillState['ol-head'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ol-head')} />
    {/* Trunk curving up */}
    <path
      d="M140 260 C100 280 80 230 95 180 C105 140 145 140 140 160 C130 180 115 190 125 220 C135 240 155 245 165 245 Z"
      fill={fillState['ol-trunk'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('ol-trunk')}
    />
    {/* Huge Flappy Ear */}
    <ellipse
      cx="240"
      cy="210"
      rx="50"
      ry="68"
      fill={fillState['ol-ear'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      onClick={(e) => { e.stopPropagation(); onPartClick('ol-ear'); }}
    />
    {/* Smiling Eye & Rosy Cheek */}
    <circle cx="170" cy="215" r="7" fill="#1E293B" pointerEvents="none" />
    <circle cx="172" cy="212" r="2.5" fill="#FFFFFF" pointerEvents="none" />
    <ellipse cx="170" cy="245" rx="12" ry="7" fill="#FDA4AF" opacity="0.6" pointerEvents="none" />
  </svg>
);

export const LeeuwSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <ellipse cx="250" cy="445" rx="200" ry="25" fill={fillState['lw-grass'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('lw-grass')} />
    {/* Lion Tail */}
    <path d="M370 330 C440 320 460 250 435 220" stroke="#1E293B" strokeWidth="7" fill="none" strokeLinecap="round" pointerEvents="none" />
    <ellipse cx="435" cy="215" rx="22" ry="16" fill={fillState['lw-tail'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('lw-tail')} />
    {/* Lion Body & Paws */}
    <ellipse cx="300" cy="340" rx="90" ry="75" fill={fillState['lw-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('lw-body')} />
    <ellipse cx="230" cy="410" rx="30" ry="24" fill={fillState['lw-paw1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('lw-paw1')} />
    <ellipse cx="320" cy="410" rx="30" ry="24" fill={fillState['lw-paw2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('lw-paw2')} />
    {/* Fluffy Round Sun Mane */}
    <circle cx="215" cy="210" r="115" fill={fillState['lw-mane'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('lw-mane')} />
    {/* Lion Head Face */}
    <circle cx="215" cy="210" r="75" fill={fillState['lw-head'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={(e) => { e.stopPropagation(); onPartClick('lw-head'); }} />
    {/* Lion Snout / Muzzle */}
    <ellipse cx="215" cy="235" rx="36" ry="26" fill={fillState['lw-snout'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onPartClick('lw-snout'); }} />
    {/* Eyes, Nose, Whiskers */}
    <circle cx="190" cy="195" r="7" fill="#1E293B" pointerEvents="none" />
    <circle cx="240" cy="195" r="7" fill="#1E293B" pointerEvents="none" />
    <polygon points="215,225 205,215 225,215" fill="#1E293B" pointerEvents="none" />
    <path d="M215 225 L215 240 M215 240 Q205 250 195 240 M215 240 Q225 250 235 240" stroke="#1E293B" strokeWidth="4" fill="none" pointerEvents="none" />
    {/* Cute Ears */}
    <circle cx="145" cy="145" r="22" fill="#F8FAFC" stroke="#1E293B" strokeWidth="6" pointerEvents="none" />
    <circle cx="285" cy="145" r="22" fill="#F8FAFC" stroke="#1E293B" strokeWidth="6" pointerEvents="none" />
  </svg>
);

export const DinoSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <ellipse cx="250" cy="450" rx="220" ry="25" fill={fillState['dn-ground'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('dn-ground')} />
    {/* Plates along back */}
    <polygon points="230,170 245,130 265,165" fill={fillState['dn-plate1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('dn-plate1')} />
    <polygon points="280,185 305,145 325,185" fill={fillState['dn-plate2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('dn-plate2')} />
    <polygon points="340,215 365,180 380,225" fill={fillState['dn-plate3'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('dn-plate3')} />
    <polygon points="395,260 425,230 430,275" fill={fillState['dn-plate4'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('dn-plate4')} />
    {/* Tail curving out */}
    <path d="M370 330 C450 340 480 300 470 270 C440 280 400 310 360 320 Z" fill={fillState['dn-tail'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('dn-tail')} />
    {/* Dino Main Body */}
    <ellipse cx="280" cy="320" rx="110" ry="90" fill={fillState['dn-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('dn-body')} />
    {/* Long Neck & Head */}
    <path
      d="M210 320 C180 260 160 180 145 120 C140 85 100 85 85 110 C70 135 90 170 120 185 C140 250 170 340 210 350 Z"
      fill={fillState['dn-neck'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('dn-neck')}
    />
    {/* Head Cap */}
    <circle cx="105" cy="115" r="38" fill={fillState['dn-head'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={(e) => { e.stopPropagation(); onPartClick('dn-head'); }} />
    {/* Belly Patch */}
    <path
      d="M220 330 C230 270 290 270 310 330 C270 360 250 360 220 330 Z"
      fill={fillState['dn-belly'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      onClick={(e) => { e.stopPropagation(); onPartClick('dn-belly'); }}
    />
    {/* Legs */}
    <rect x="225" y="380" width="40" height="55" rx="15" fill="#F8FAFC" stroke="#1E293B" strokeWidth="6" pointerEvents="none" />
    <rect x="310" y="380" width="40" height="55" rx="15" fill="#F8FAFC" stroke="#1E293B" strokeWidth="6" pointerEvents="none" />
    {/* Smiling Eye */}
    <circle cx="95" cy="105" r="6" fill="#1E293B" pointerEvents="none" />
    <circle cx="97" cy="103" r="2" fill="#FFFFFF" pointerEvents="none" />
    <path d="M85 125 Q95 135 110 128" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" pointerEvents="none" />
  </svg>
);

export const PandaSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Bamboo Stalk & Leaf */}
    <rect x="380" y="80" width="22" height="360" rx="8" fill={fillState['pd-bamboo'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('pd-bamboo')} />
    <ellipse cx="420" cy="170" rx="40" ry="18" fill={fillState['pd-leaf'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('pd-leaf')} />
    {/* Panda Ears */}
    <circle cx="170" cy="130" r="34" fill={fillState['pd-ear-l'] || '#1E293B'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('pd-ear-l')} />
    <circle cx="310" cy="130" r="34" fill={fillState['pd-ear-r'] || '#1E293B'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('pd-ear-r')} />
    {/* Panda Big Round Body */}
    <ellipse cx="240" cy="330" rx="115" ry="105" fill={fillState['pd-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('pd-body')} />
    {/* Panda White Belly */}
    <ellipse cx="240" cy="350" rx="75" ry="65" fill={fillState['pd-belly'] || '#FFFFFF'} stroke="#1E293B" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onPartClick('pd-belly'); }} />
    {/* Panda Paws */}
    <ellipse cx="150" cy="360" rx="35" ry="25" fill="#1E293B" stroke="#1E293B" strokeWidth="6" pointerEvents="none" />
    <ellipse cx="330" cy="360" rx="35" ry="25" fill="#1E293B" stroke="#1E293B" strokeWidth="6" pointerEvents="none" />
    {/* Panda Head */}
    <circle cx="240" cy="210" r="80" fill={fillState['pd-head'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('pd-head')} />
    {/* Eye Patches */}
    <ellipse cx="205" cy="205" rx="24" ry="18" fill={fillState['pd-eye-l'] || '#1E293B'} stroke="#1E293B" strokeWidth="5" onClick={(e) => { e.stopPropagation(); onPartClick('pd-eye-l'); }} />
    <ellipse cx="275" cy="205" rx="24" ry="18" fill={fillState['pd-eye-r'] || '#1E293B'} stroke="#1E293B" strokeWidth="5" onClick={(e) => { e.stopPropagation(); onPartClick('pd-eye-r'); }} />
    {/* Pupils & cute nose */}
    <circle cx="205" cy="205" r="5" fill="#FFFFFF" pointerEvents="none" />
    <circle cx="275" cy="205" r="5" fill="#FFFFFF" pointerEvents="none" />
    <ellipse cx="240" cy="235" rx="12" ry="8" fill="#1E293B" pointerEvents="none" />
    <path d="M230 248 Q240 256 250 248" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" pointerEvents="none" />
  </svg>
);

export const KikkerSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Pond Water */}
    <ellipse cx="250" cy="430" rx="220" ry="35" fill={fillState['kk-water1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('kk-water1')} />
    {/* Big Green Water Lily Pad */}
    <path
      d="M80 390 C80 340 220 320 380 340 C430 360 410 420 350 430 L280 380 L290 435 C170 440 80 430 80 390 Z"
      fill={fillState['kk-lilypad'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('kk-lilypad')}
    />
    {/* Lotus Flower on Water */}
    <circle cx="390" cy="350" r="28" fill={fillState['kk-flower'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('kk-flower')} />
    {/* Frog Legs */}
    <ellipse cx="145" cy="330" rx="45" ry="32" fill={fillState['kk-leg-l'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('kk-leg-l')} />
    <ellipse cx="325" cy="330" rx="45" ry="32" fill={fillState['kk-leg-r'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('kk-leg-r')} />
    {/* Frog Body */}
    <ellipse cx="235" cy="300" rx="80" ry="70" fill={fillState['kk-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('kk-body')} />
    {/* Frog Head */}
    <ellipse cx="235" cy="210" rx="95" ry="60" fill={fillState['kk-head'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('kk-head')} />
    {/* Big Popping Eyes */}
    <circle cx="175" cy="155" r="32" fill="#F8FAFC" stroke="#1E293B" strokeWidth="6" pointerEvents="none" />
    <circle cx="295" cy="155" r="32" fill="#F8FAFC" stroke="#1E293B" strokeWidth="6" pointerEvents="none" />
    <circle cx="178" cy="155" r="14" fill="#1E293B" pointerEvents="none" />
    <circle cx="182" cy="150" r="5" fill="#FFFFFF" pointerEvents="none" />
    <circle cx="292" cy="155" r="14" fill="#1E293B" pointerEvents="none" />
    <circle cx="296" cy="150" r="5" fill="#FFFFFF" pointerEvents="none" />
    {/* Big Frog Grin */}
    <path d="M175 220 Q235 255 295 220" stroke="#1E293B" strokeWidth="6" fill="none" strokeLinecap="round" pointerEvents="none" />
    <circle cx="170" cy="225" r="8" fill="#FDA4AF" opacity="0.7" pointerEvents="none" />
    <circle cx="300" cy="225" r="8" fill="#FDA4AF" opacity="0.7" pointerEvents="none" />
  </svg>
);

export const UilSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Crescent Moon & Stars */}
    <path d="M80 80 C110 80 130 110 120 140 C100 150 70 140 60 120 C50 100 60 85 80 80 Z" fill={fillState['ul-moon'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('ul-moon')} />
    <polygon points="380,70 388,85 405,90 388,95 380,110 372,95 355,90 372,85" fill={fillState['ul-star1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('ul-star1')} />
    <polygon points="430,130 435,142 450,145 435,150 430,165 425,150 410,145 425,142" fill={fillState['ul-star2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('ul-star2')} />
    {/* Tree Branch */}
    <rect x="40" y="390" width="420" height="35" rx="14" fill={fillState['ul-branch'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ul-branch')} />
    {/* Wings */}
    <ellipse cx="140" cy="290" rx="35" ry="75" fill={fillState['ul-wing-l'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ul-wing-l')} />
    <ellipse cx="340" cy="290" rx="35" ry="75" fill={fillState['ul-wing-r'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ul-wing-r')} />
    {/* Owl Body */}
    <ellipse cx="240" cy="290" rx="90" ry="110" fill={fillState['ul-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('ul-body')} />
    {/* Owl Belly */}
    <ellipse cx="240" cy="320" rx="55" ry="65" fill={fillState['ul-belly'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onPartClick('ul-belly'); }} />
    {/* Head with Feather Tufts */}
    <path
      d="M170 170 L150 120 L200 150 L280 150 L330 120 L310 170 C330 210 320 250 240 250 C160 250 150 210 170 170 Z"
      fill={fillState['ul-head'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('ul-head')}
    />
    {/* Big Round Owl Eyes */}
    <circle cx="205" cy="195" r="26" fill="#FFFFFF" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
    <circle cx="275" cy="195" r="26" fill="#FFFFFF" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
    <circle cx="205" cy="195" r="12" fill="#1E293B" pointerEvents="none" />
    <circle cx="275" cy="195" r="12" fill="#1E293B" pointerEvents="none" />
    <polygon points="240,205 230,225 250,225" fill="#F97316" stroke="#1E293B" strokeWidth="4" pointerEvents="none" />
  </svg>
);

export const EendjeSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Waves */}
    <path d="M40 400 Q140 370 250 400 T460 400 L460 460 L40 460 Z" fill={fillState['ed-wave1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ed-wave1')} />
    {/* Reeds on Side */}
    <path d="M410 420 L425 240 M435 420 L445 270" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" pointerEvents="none" />
    <ellipse cx="425" cy="235" rx="12" ry="25" fill={fillState['ed-reed1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('ed-reed1')} />
    <ellipse cx="445" cy="265" rx="12" ry="25" fill={fillState['ed-reed2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('ed-reed2')} />
    {/* Duck Body */}
    <path
      d="M140 330 C130 250 250 250 330 300 C370 330 360 380 320 380 C230 395 150 385 140 330 Z"
      fill={fillState['ed-body'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="8"
      strokeLinejoin="round"
      onClick={() => onPartClick('ed-body')}
    />
    {/* Duck Wing */}
    <ellipse cx="240" cy="325" rx="48" ry="32" fill={fillState['ed-wing'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onPartClick('ed-wing'); }} />
    {/* Duck Head */}
    <circle cx="170" cy="220" r="50" fill={fillState['ed-head'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ed-head')} />
    {/* Orange Beak */}
    <ellipse cx="105" cy="230" rx="28" ry="16" fill={fillState['ed-beak'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('ed-beak')} />
    {/* Friendly Eye */}
    <circle cx="165" cy="210" r="7" fill="#1E293B" pointerEvents="none" />
    <circle cx="168" cy="207" r="2.5" fill="#FFFFFF" pointerEvents="none" />
  </svg>
);

export const VisSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Sea Plant */}
    <path d="M430 450 Q390 350 420 280 T400 180" stroke="#1E293B" strokeWidth="8" fill="none" strokeLinecap="round" pointerEvents="none" />
    <ellipse cx="400" cy="180" rx="16" ry="30" fill={fillState['vs-plant'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('vs-plant')} />
    {/* Bubbles */}
    <circle cx="120" cy="170" r="15" fill={fillState['vs-bubble1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('vs-bubble1')} />
    <circle cx="100" cy="110" r="22" fill={fillState['vs-bubble2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('vs-bubble2')} />
    <circle cx="140" cy="65" r="12" fill={fillState['vs-bubble3'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="4" onClick={() => onPartClick('vs-bubble3')} />
    {/* Top & Bottom Fins */}
    <path d="M250 170 C280 110 320 120 310 180 Z" fill={fillState['vs-fin-t'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('vs-fin-t')} />
    <path d="M260 350 C290 410 330 400 310 340 Z" fill={fillState['vs-fin-b'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('vs-fin-b')} />
    {/* Big Tail Fin */}
    <polygon points="340,260 430,170 410,260 430,350" fill={fillState['vs-tail'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('vs-tail')} />
    {/* Fish Main Body */}
    <ellipse cx="240" cy="260" rx="125" ry="95" fill={fillState['vs-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('vs-body')} />
    {/* Eye & Cute Smile */}
    <circle cx="170" cy="245" r="12" fill="#FFFFFF" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
    <circle cx="170" cy="245" r="6" fill="#1E293B" pointerEvents="none" />
    <path d="M135 270 Q145 285 160 275" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" pointerEvents="none" />
  </svg>
);

export const SlakSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <ellipse cx="250" cy="450" rx="210" ry="24" fill={fillState['sl-grass'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('sl-grass')} />
    {/* Dandelion Flower next to snail */}
    <line x1="420" y1="440" x2="420" y2="280" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
    <circle cx="420" cy="270" r="32" fill={fillState['sl-flower'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('sl-flower')} />
    {/* Snail Body Foot */}
    <path
      d="M60 410 C150 410 380 410 400 410 C420 410 420 375 390 375 C300 375 180 370 120 310 C90 280 80 340 60 410 Z"
      fill={fillState['sl-body'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('sl-body')}
    />
    {/* Snail Head */}
    <circle cx="110" cy="290" r="35" fill={fillState['sl-head'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('sl-head')} />
    {/* Feelers */}
    <line x1="100" y1="260" x2="80" y2="200" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
    <circle cx="80" cy="200" r="8" fill="#1E293B" pointerEvents="none" />
    <line x1="120" y1="260" x2="135" y2="200" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
    <circle cx="135" cy="200" r="8" fill="#1E293B" pointerEvents="none" />
    {/* Snail Big Round Spiral Shell */}
    <circle cx="270" cy="290" r="105" fill={fillState['sl-shell-outer'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('sl-shell-outer')} />
    <circle cx="270" cy="290" r="55" fill={fillState['sl-shell-inner'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={(e) => { e.stopPropagation(); onPartClick('sl-shell-inner'); }} />
    {/* Eyes & Smile */}
    <circle cx="102" cy="285" r="5" fill="#1E293B" pointerEvents="none" />
    <path d="M98 305 Q108 315 120 305" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" pointerEvents="none" />
  </svg>
);

export const PaardSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <circle cx="80" cy="90" r="35" fill={fillState['pr-sun'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('pr-sun')} />
    {/* Meadow Fence */}
    <rect x="40" y="380" width="420" height="18" rx="5" fill={fillState['pr-fence'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('pr-fence')} />
    <line x1="120" y1="360" x2="120" y2="440" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
    <line x1="360" y1="360" x2="360" y2="440" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
    {/* Legs */}
    <rect x="220" y="330" width="30" height="110" rx="10" fill={fillState['pr-leg1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('pr-leg1')} />
    <rect x="330" y="330" width="30" height="110" rx="10" fill={fillState['pr-leg2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('pr-leg2')} />
    {/* Horse Body */}
    <ellipse cx="280" cy="280" rx="105" ry="75" fill={fillState['pr-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('pr-body')} />
    {/* Horse Tail */}
    <path d="M380 270 C430 300 440 360 410 400" stroke={fillState['pr-tail'] || '#F8FAFC'} strokeWidth="24" strokeLinecap="round" onClick={() => onPartClick('pr-tail')} />
    <path d="M380 270 C430 300 440 360 410 400" stroke="#1E293B" strokeWidth="6" fill="none" strokeLinecap="round" pointerEvents="none" />
    {/* Horse Neck and Head */}
    <path
      d="M210 270 L150 160 C130 140 100 160 110 190 L140 250 Z"
      fill={fillState['pr-head'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('pr-head')}
    />
    {/* Mane along neck */}
    <path d="M190 230 C180 180 165 150 140 140" stroke={fillState['pr-mane'] || '#F8FAFC'} strokeWidth="26" strokeLinecap="round" onClick={() => onPartClick('pr-mane')} />
    <path d="M190 230 C180 180 165 150 140 140" stroke="#1E293B" strokeWidth="6" fill="none" strokeLinecap="round" pointerEvents="none" />
    {/* Horse Eye */}
    <circle cx="130" cy="180" r="6" fill="#1E293B" pointerEvents="none" />
  </svg>
);

export const KrabSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <ellipse cx="250" cy="440" rx="210" ry="28" fill={fillState['kb-sand'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('kb-sand')} />
    <circle cx="410" cy="420" r="22" fill={fillState['kb-shell'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('kb-shell')} />
    {/* Crab Little Walking Legs */}
    <ellipse cx="140" cy="380" rx="25" ry="14" fill={fillState['kb-leg1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('kb-leg1')} />
    <ellipse cx="360" cy="380" rx="25" ry="14" fill={fillState['kb-leg2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('kb-leg2')} />
    {/* Claws Arms & Big Pincers */}
    <path d="M170 270 Q100 230 100 170" stroke="#1E293B" strokeWidth="8" fill="none" strokeLinecap="round" pointerEvents="none" />
    <ellipse cx="90" cy="150" rx="42" ry="32" fill={fillState['kb-claw-l'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('kb-claw-l')} />
    <path d="M330 270 Q400 230 400 170" stroke="#1E293B" strokeWidth="8" fill="none" strokeLinecap="round" pointerEvents="none" />
    <ellipse cx="410" cy="150" rx="42" ry="32" fill={fillState['kb-claw-r'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('kb-claw-r')} />
    {/* Crab Oval Body */}
    <ellipse cx="250" cy="300" rx="115" ry="85" fill={fillState['kb-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('kb-body')} />
    {/* Periscope Eyes */}
    <line x1="215" y1="230" x2="215" y2="190" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
    <circle cx="215" cy="180" r="16" fill="#FFFFFF" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
    <circle cx="215" cy="180" r="7" fill="#1E293B" pointerEvents="none" />
    <line x1="285" y1="230" x2="285" y2="190" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
    <circle cx="285" cy="180" r="16" fill="#FFFFFF" stroke="#1E293B" strokeWidth="5" pointerEvents="none" />
    <circle cx="285" cy="180" r="7" fill="#1E293B" pointerEvents="none" />
    {/* Big Crab Smile */}
    <path d="M210 320 Q250 355 290 320" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" pointerEvents="none" />
  </svg>
);

export const RupsSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <circle cx="430" cy="80" r="35" fill={fillState['rp-sun'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('rp-sun')} />
    {/* Big Juicy Leaf */}
    <path
      d="M50 400 C120 280 320 280 450 370 C380 460 160 480 50 400 Z"
      fill={fillState['rp-leaf'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="8"
      strokeLinejoin="round"
      onClick={() => onPartClick('rp-leaf')}
    />
    {/* Segments of Caterpillar */}
    <circle cx="360" cy="310" r="36" fill={fillState['rp-seg4'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('rp-seg4')} />
    <circle cx="300" cy="290" r="38" fill={fillState['rp-seg3'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('rp-seg3')} />
    <circle cx="235" cy="275" r="40" fill={fillState['rp-seg2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('rp-seg2')} />
    <circle cx="170" cy="265" r="42" fill={fillState['rp-seg1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('rp-seg1')} />
    {/* Caterpillar Smiling Head */}
    <circle cx="110" cy="245" r="46" fill={fillState['rp-head'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('rp-head')} />
    {/* Little Antennae */}
    <line x1="100" y1="205" x2="85" y2="165" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
    <circle cx="85" cy="165" r="7" fill="#1E293B" pointerEvents="none" />
    <line x1="120" y1="205" x2="135" y2="165" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
    <circle cx="135" cy="165" r="7" fill="#1E293B" pointerEvents="none" />
    {/* Face */}
    <circle cx="98" cy="240" r="6" fill="#1E293B" pointerEvents="none" />
    <circle cx="120" cy="240" r="6" fill="#1E293B" pointerEvents="none" />
    <path d="M100 260 Q110 270 120 260" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" pointerEvents="none" />
  </svg>
);

export const GirafSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    {/* Acacia Tree */}
    <ellipse cx="410" cy="160" rx="60" ry="35" fill={fillState['gr-tree'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('gr-tree')} />
    <line x1="410" y1="195" x2="410" y2="440" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
    {/* Long Legs */}
    <rect x="180" y="340" width="24" height="110" rx="8" fill={fillState['gr-leg1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('gr-leg1')} />
    <rect x="250" y="340" width="24" height="110" rx="8" fill={fillState['gr-leg2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('gr-leg2')} />
    {/* Giraffe Body */}
    <ellipse cx="225" cy="320" rx="80" ry="55" fill={fillState['gr-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('gr-body')} />
    {/* Super Long Giraffe Neck */}
    <path
      d="M175 300 L210 130 L250 135 L225 300 Z"
      fill={fillState['gr-neck'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('gr-neck')}
    />
    {/* Spots on Neck */}
    <circle cx="215" cy="240" r="14" fill={fillState['gr-spot1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={(e) => { e.stopPropagation(); onPartClick('gr-spot1'); }} />
    <circle cx="220" cy="190" r="12" fill={fillState['gr-spot2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={(e) => { e.stopPropagation(); onPartClick('gr-spot2'); }} />
    <circle cx="240" cy="315" r="15" fill={fillState['gr-spot3'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={(e) => { e.stopPropagation(); onPartClick('gr-spot3'); }} />
    {/* Giraffe Head with Horns */}
    <ellipse cx="230" cy="115" rx="35" ry="24" fill={fillState['gr-head'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('gr-head')} />
    <line x1="225" y1="95" x2="220" y2="70" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
    <circle cx="220" cy="68" r="5" fill="#1E293B" pointerEvents="none" />
    <line x1="240" y1="95" x2="245" y2="70" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
    <circle cx="245" cy="68" r="5" fill="#1E293B" pointerEvents="none" />
    <circle cx="240" cy="112" r="5" fill="#1E293B" pointerEvents="none" />
  </svg>
);
