import React from 'react';

interface TemplateSvgProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  svgClassName: string;
  fillState: Record<string, string>;
  onPartClick: (partKey: string) => void;
}

export const KameleonSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <path
      d="M40 370 C160 360 300 375 460 360 L460 410 C300 420 160 410 40 420 Z"
      fill={fillState['k-branch'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('k-branch')}
    />
    <path
      d="M70 360 C50 310 110 300 130 350 C110 360 85 365 70 360 Z"
      fill={fillState['k-leaf1'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      strokeLinejoin="round"
      onClick={() => onPartClick('k-leaf1')}
    />
    <path
      d="M430 350 C450 300 390 290 370 340 C390 350 415 355 430 350 Z"
      fill={fillState['k-leaf2'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      strokeLinejoin="round"
      onClick={() => onPartClick('k-leaf2')}
    />
    <path
      d="M190 310 C130 330 80 290 90 230 C100 180 150 170 170 200 C185 220 175 245 155 245 C140 245 135 235 140 225"
      fill="none"
      stroke={fillState['k-tail'] || '#F8FAFC'}
      strokeWidth="38"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={() => onPartClick('k-tail')}
    />
    <path
      d="M190 310 C130 330 80 290 90 230 C100 180 150 170 170 200 C185 220 175 245 155 245 C140 245 135 235 140 225"
      fill="none"
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinecap="round"
      pointerEvents="none"
    />
    <ellipse
      cx="210"
      cy="365"
      rx="24"
      ry="18"
      fill={fillState['k-leg1'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      onClick={() => onPartClick('k-leg1')}
    />
    <ellipse
      cx="330"
      cy="365"
      rx="24"
      ry="18"
      fill={fillState['k-leg2'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      onClick={() => onPartClick('k-leg2')}
    />
    <path
      d="M180 320 C180 200 350 190 370 320 C360 360 190 365 180 320 Z"
      fill={fillState['k-body'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('k-body')}
    />
    <path
      d="M230 340 C240 280 310 280 330 340 C290 355 260 355 230 340 Z"
      fill={fillState['k-belly'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      strokeLinejoin="round"
      onClick={(e) => {
        e.stopPropagation();
        onPartClick('k-belly');
      }}
    />
    <path
      d="M340 290 C340 180 430 190 440 260 C445 310 390 330 340 290 Z"
      fill={fillState['k-head'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('k-head')}
    />
    <circle
      cx="390"
      cy="235"
      r="32"
      fill={fillState['k-eye-rim'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      onClick={(e) => {
        e.stopPropagation();
        onPartClick('k-eye-rim');
      }}
    />
    <circle cx="394" cy="235" r="14" fill="#1E293B" pointerEvents="none" />
    <circle cx="398" cy="230" r="5" fill="#FFFFFF" pointerEvents="none" />
    <path
      d="M405 280 Q425 295 440 275"
      stroke="#1E293B"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      pointerEvents="none"
    />
  </svg>
);

export const VlinderSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <circle
      cx="80"
      cy="420"
      r="35"
      fill={fillState['v-flower1'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      onClick={() => onPartClick('v-flower1')}
    />
    <circle cx="80" cy="420" r="15" fill="#EAB308" stroke="#1E293B" strokeWidth="4" pointerEvents="none" />
    <circle
      cx="420"
      cy="420"
      r="35"
      fill={fillState['v-flower2'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      onClick={() => onPartClick('v-flower2')}
    />
    <circle cx="420" cy="420" r="15" fill="#EAB308" stroke="#1E293B" strokeWidth="4" pointerEvents="none" />

    <path
      d="M230 230 C180 80 40 100 65 220 C85 280 180 270 230 250 Z"
      fill={fillState['v-wing-lt'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('v-wing-lt')}
    />
    <circle
      cx="135"
      cy="190"
      r="30"
      fill={fillState['v-spot-lt'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      onClick={(e) => {
        e.stopPropagation();
        onPartClick('v-spot-lt');
      }}
    />

    <path
      d="M270 230 C320 80 460 100 435 220 C415 280 320 270 270 250 Z"
      fill={fillState['v-wing-rt'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('v-wing-rt')}
    />
    <circle
      cx="365"
      cy="190"
      r="30"
      fill={fillState['v-spot-rt'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      onClick={(e) => {
        e.stopPropagation();
        onPartClick('v-spot-rt');
      }}
    />

    <path
      d="M230 270 C160 280 80 340 120 420 C150 460 220 380 240 320 Z"
      fill={fillState['v-wing-lb'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('v-wing-lb')}
    />
    <path
      d="M270 270 C340 280 420 340 380 420 C350 460 280 380 260 320 Z"
      fill={fillState['v-wing-rb'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={() => onPartClick('v-wing-rb')}
    />

    <ellipse
      cx="250"
      cy="290"
      rx="24"
      ry="80"
      fill={fillState['v-body'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      onClick={() => onPartClick('v-body')}
    />
    <circle
      cx="250"
      cy="175"
      r="32"
      fill={fillState['v-head'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      onClick={() => onPartClick('v-head')}
    />
    <circle cx="240" cy="170" r="5" fill="#1E293B" pointerEvents="none" />
    <circle cx="260" cy="170" r="5" fill="#1E293B" pointerEvents="none" />
    <path
      d="M242 190 Q250 198 258 190"
      stroke="#1E293B"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      pointerEvents="none"
    />

    <path d="M242 145 Q225 100 205 110" stroke="#1E293B" strokeWidth="6" fill="none" strokeLinecap="round" pointerEvents="none" />
    <circle cx="205" cy="110" r="8" fill="#1E293B" pointerEvents="none" />
    <path d="M258 145 Q275 100 295 110" stroke="#1E293B" strokeWidth="6" fill="none" strokeLinecap="round" pointerEvents="none" />
    <circle cx="295" cy="110" r="8" fill="#1E293B" pointerEvents="none" />
  </svg>
);

export const SchildpadSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <ellipse cx="120" cy="440" rx="40" ry="22" fill={fillState['t-pebble1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('t-pebble1')} />
    <ellipse cx="380" cy="440" rx="40" ry="22" fill={fillState['t-pebble2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('t-pebble2')} />
    <ellipse cx="150" cy="190" rx="30" ry="44" fill={fillState['t-leg1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('t-leg1')} />
    <ellipse cx="350" cy="190" rx="30" ry="44" fill={fillState['t-leg2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('t-leg2')} />
    <ellipse cx="150" cy="340" rx="30" ry="44" fill={fillState['t-leg3'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('t-leg3')} />
    <ellipse cx="350" cy="340" rx="30" ry="44" fill={fillState['t-leg4'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('t-leg4')} />
    <circle cx="250" cy="120" r="46" fill={fillState['t-head'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('t-head')} />
    <circle cx="235" cy="110" r="6" fill="#1E293B" pointerEvents="none" />
    <circle cx="265" cy="110" r="6" fill="#1E293B" pointerEvents="none" />
    <path d="M236 136 Q250 148 264 136" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" pointerEvents="none" />
    <ellipse cx="250" cy="265" rx="125" ry="110" fill={fillState['t-shell-main'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('t-shell-main')} />
    <polygon
      points="250,215 295,250 295,300 250,325 205,300 205,250"
      fill={fillState['t-shell-center'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      onClick={(e) => {
        e.stopPropagation();
        onPartClick('t-shell-center');
      }}
    />
  </svg>
);

export const RegenboogSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <path d="M10 440 Q250 360 490 440 L490 490 L10 490 Z" fill={fillState['rb-hill'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('rb-hill')} />
    <path d="M50 360 A200 200 0 0 1 450 360" fill="none" stroke={fillState['rb-arc-1'] || '#CBD5E1'} strokeWidth="36" strokeLinecap="round" onClick={() => onPartClick('rb-arc-1')} />
    <path d="M85 360 A165 165 0 0 1 415 360" fill="none" stroke={fillState['rb-arc-2'] || '#E2E8F0'} strokeWidth="34" strokeLinecap="round" onClick={() => onPartClick('rb-arc-2')} />
    <path d="M120 360 A130 130 0 0 1 380 360" fill="none" stroke={fillState['rb-arc-3'] || '#F1F5F9'} strokeWidth="34" strokeLinecap="round" onClick={() => onPartClick('rb-arc-3')} />
    <circle cx="250" cy="110" r="40" fill={fillState['rb-sun'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('rb-sun')} />
    <circle cx="238" cy="105" r="5" fill="#1E293B" pointerEvents="none" />
    <circle cx="262" cy="105" r="5" fill="#1E293B" pointerEvents="none" />
    <path d="M240 125 Q250 135 260 125" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" pointerEvents="none" />
    <ellipse cx="90" cy="370" rx="65" ry="44" fill={fillState['rb-cloud-l'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('rb-cloud-l')} />
    <ellipse cx="410" cy="370" rx="65" ry="44" fill={fillState['rb-cloud-r'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('rb-cloud-r')} />
  </svg>
);

export const RaketSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <polygon points="90,80 100,105 125,115 100,125 90,150 80,125 55,115 80,105" fill={fillState['rk-star1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('rk-star1')} />
    <polygon points="410,120 420,145 445,155 420,165 410,190 400,165 375,155 400,145" fill={fillState['rk-star2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('rk-star2')} />
    <polygon points="175,310 100,410 195,380" fill={fillState['rk-wing-l'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('rk-wing-l')} />
    <polygon points="325,310 400,410 305,380" fill={fillState['rk-wing-r'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('rk-wing-r')} />
    <path d="M190 210 C190 110 250 60 250 60 C250 60 310 110 310 210 L310 380 L190 380 Z" fill={fillState['rk-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('rk-body')} />
    <path
      d="M205 160 C215 105 250 60 250 60 C250 60 285 105 295 160 Z"
      fill={fillState['rk-nose'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      onClick={(e) => {
        e.stopPropagation();
        onPartClick('rk-nose');
      }}
    />
    <circle
      cx="250"
      cy="235"
      r="30"
      fill={fillState['rk-window'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      onClick={(e) => {
        e.stopPropagation();
        onPartClick('rk-window');
      }}
    />
    <circle cx="245" cy="230" r="8" fill="#FFFFFF" pointerEvents="none" />
    <polygon points="215,380 250,460 285,380" fill={fillState['rk-flame'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('rk-flame')} />
  </svg>
);

export const LieveheersbeestjeSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <path d="M50 350 C70 180 260 140 450 180 C470 340 300 460 50 350 Z" fill={fillState['lh-leaf'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" strokeLinejoin="round" onClick={() => onPartClick('lh-leaf')} />
    <circle cx="380" cy="220" r="22" fill={fillState['lh-drop'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('lh-drop')} />
    <ellipse cx="250" cy="280" rx="115" ry="110" fill={fillState['lh-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('lh-body')} />
    <path d="M245 180 C150 185 140 370 245 385 Z" fill={fillState['lh-wing-l'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('lh-wing-l')} />
    <path d="M255 180 C350 185 360 370 255 385 Z" fill={fillState['lh-wing-r'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('lh-wing-r')} />
    <circle cx="195" cy="240" r="18" fill={fillState['lh-spot1'] || '#1E293B'} stroke="#1E293B" strokeWidth="5" onClick={(e) => { e.stopPropagation(); onPartClick('lh-spot1'); }} />
    <circle cx="305" cy="240" r="18" fill={fillState['lh-spot2'] || '#1E293B'} stroke="#1E293B" strokeWidth="5" onClick={(e) => { e.stopPropagation(); onPartClick('lh-spot2'); }} />
    <circle cx="250" cy="325" r="18" fill={fillState['lh-spot3'] || '#1E293B'} stroke="#1E293B" strokeWidth="5" onClick={(e) => { e.stopPropagation(); onPartClick('lh-spot3'); }} />
    <circle cx="250" cy="170" r="40" fill={fillState['lh-head'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('lh-head')} />
    <circle cx="236" cy="165" r="5" fill="#1E293B" pointerEvents="none" />
    <circle cx="264" cy="165" r="5" fill="#1E293B" pointerEvents="none" />
    <path d="M240 135 Q225 105 210 115" stroke="#1E293B" strokeWidth="6" fill="none" strokeLinecap="round" pointerEvents="none" />
    <circle cx="210" cy="115" r="7" fill="#1E293B" pointerEvents="none" />
    <path d="M260 135 Q275 105 290 115" stroke="#1E293B" strokeWidth="6" fill="none" strokeLinecap="round" pointerEvents="none" />
    <circle cx="290" cy="115" r="7" fill="#1E293B" pointerEvents="none" />
  </svg>
);

export const WalvisSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <path d="M30 420 Q125 390 220 420 T410 420 L470 460 L30 460 Z" fill={fillState['w-wave1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('w-wave1')} />
    <path d="M210 180 C200 90 140 110 110 70 C150 50 200 110 220 180 Z" fill={fillState['w-water1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('w-water1')} />
    <path d="M230 180 C240 80 320 90 350 60 C320 40 260 100 240 180 Z" fill={fillState['w-water2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('w-water2')} />
    <path d="M390 290 C430 250 470 230 470 200 C440 250 410 270 380 290 C410 310 440 330 470 380 C470 350 430 330 390 290 Z" fill={fillState['w-tail'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('w-tail')} />
    <path d="M80 300 C80 180 340 180 390 290 C370 370 120 400 80 300 Z" fill={fillState['w-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" strokeLinejoin="round" onClick={() => onPartClick('w-body')} />
    <path
      d="M120 340 C170 370 300 370 340 330 C270 385 160 380 120 340 Z"
      fill={fillState['w-belly'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      strokeLinejoin="round"
      onClick={(e) => {
        e.stopPropagation();
        onPartClick('w-belly');
      }}
    />
    <path
      d="M210 320 C180 360 210 390 240 350 Z"
      fill={fillState['w-fin'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="6"
      strokeLinejoin="round"
      onClick={(e) => {
        e.stopPropagation();
        onPartClick('w-fin');
      }}
    />
    <circle cx="150" cy="270" r="8" fill="#1E293B" pointerEvents="none" />
    <circle cx="153" cy="267" r="3" fill="#FFFFFF" pointerEvents="none" />
    <path d="M130 305 Q155 320 180 305" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" pointerEvents="none" />
  </svg>
);

export const ZonnebloemSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <path d="M240 280 L240 450 L260 450 L260 280 Z" fill={fillState['zb-stem'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('zb-stem')} />
    <path d="M240 380 C160 360 140 420 180 430 C220 440 240 400 240 380 Z" fill={fillState['zb-leaf-l'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('zb-leaf-l')} />
    <path d="M260 350 C340 330 360 390 320 400 C280 410 260 370 260 350 Z" fill={fillState['zb-leaf-r'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('zb-leaf-r')} />
    <circle cx="250" cy="120" r="45" fill={fillState['zb-p1'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('zb-p1')} />
    <circle cx="330" cy="200" r="45" fill={fillState['zb-p2'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('zb-p2')} />
    <circle cx="250" cy="280" r="45" fill={fillState['zb-p3'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('zb-p3')} />
    <circle cx="170" cy="200" r="45" fill={fillState['zb-p4'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('zb-p4')} />
    <circle cx="250" cy="200" r="65" fill={fillState['zb-center'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('zb-center')} />
    <circle cx="230" cy="190" r="7" fill="#1E293B" pointerEvents="none" />
    <circle cx="270" cy="190" r="7" fill="#1E293B" pointerEvents="none" />
    <path d="M232 215 Q250 235 268 215" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" pointerEvents="none" />
    <ellipse cx="400" cy="110" rx="26" ry="18" fill={fillState['zb-bee-body'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" onClick={() => onPartClick('zb-bee-body')} />
    <ellipse cx="400" cy="85" rx="14" ry="18" fill={fillState['zb-bee-wing'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="5" onClick={() => onPartClick('zb-bee-wing')} />
  </svg>
);

export const KasteelSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <rect x="40" y="420" width="420" height="40" rx="16" fill={fillState['ks-ground'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ks-ground')} />
    <rect x="150" y="260" width="200" height="160" fill={fillState['ks-wall'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" onClick={() => onPartClick('ks-wall')} />
    <rect x="80" y="210" width="80" height="210" fill={fillState['ks-tower-l'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ks-tower-l')} />
    <polygon points="120,110 70,210 170,210" fill={fillState['ks-roof-l'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('ks-roof-l')} />
    <rect x="340" y="210" width="80" height="210" fill={fillState['ks-tower-r'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ks-tower-r')} />
    <polygon points="380,110 330,210 430,210" fill={fillState['ks-roof-r'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('ks-roof-r')} />
    <rect x="210" y="180" width="80" height="90" fill={fillState['ks-tower-m'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('ks-tower-m')} />
    <polygon points="250,90 200,180 300,180" fill={fillState['ks-roof-m'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('ks-roof-m')} />
    <polygon points="250,90 250,45 295,65 250,85" fill={fillState['ks-flag'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" strokeLinejoin="round" onClick={() => onPartClick('ks-flag')} />
    <path
      d="M220 420 L220 340 C220 310 280 310 280 340 L280 420 Z"
      fill={fillState['ks-door'] || '#F8FAFC'}
      stroke="#1E293B"
      strokeWidth="7"
      strokeLinejoin="round"
      onClick={(e) => {
        e.stopPropagation();
        onPartClick('ks-door');
      }}
    />
  </svg>
);

export const ZeilbootSvg: React.FC<TemplateSvgProps> = ({ svgRef, svgClassName, fillState, onPartClick }) => (
  <svg ref={svgRef} viewBox="0 0 500 500" className={svgClassName}>
    <circle cx="100" cy="100" r="40" fill={fillState['zb-sun'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('zb-sun')} />
    <path d="M40 400 Q140 370 250 400 T460 400 L460 460 L40 460 Z" fill={fillState['zb-water'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" strokeLinejoin="round" onClick={() => onPartClick('zb-water')} />
    <polygon points="110,330 390,330 350,400 150,400" fill={fillState['zb-hull'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="8" strokeLinejoin="round" onClick={() => onPartClick('zb-hull')} />
    <rect x="200" y="290" width="90" height="40" rx="8" fill={fillState['zb-cabin'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" onClick={() => onPartClick('zb-cabin')} />
    <line x1="245" y1="90" x2="245" y2="290" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
    <polygon points="255,100 370,270 255,270" fill={fillState['zb-sail-main'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('zb-sail-main')} />
    <polygon points="235,130 130,270 235,270" fill={fillState['zb-sail-front'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="7" strokeLinejoin="round" onClick={() => onPartClick('zb-sail-front')} />
    <polygon points="245,90 245,60 290,75" fill={fillState['zb-flag'] || '#F8FAFC'} stroke="#1E293B" strokeWidth="6" strokeLinejoin="round" onClick={() => onPartClick('zb-flag')} />
  </svg>
);
