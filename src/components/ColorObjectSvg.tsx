import React from 'react';

interface Props {
  name: string;
  className?: string;
  colorHex?: string;
}

export const ColorObjectSvg: React.FC<Props> = ({ name, className = 'w-16 h-16', colorHex }) => {
  switch (name) {
    case 'strawberry':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Leaves */}
          <path d="M40 28 C30 18 20 20 25 10 C32 18 42 22 50 24 C58 22 68 18 75 10 C80 20 70 18 60 28 C68 28 80 32 75 40 C65 32 55 28 50 28 C45 28 35 32 25 40 C20 32 32 28 40 28 Z" fill="#10B981" />
          <path d="M50 24 L50 8" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
          {/* Berry body */}
          <path
            d="M50 88 C25 82 18 55 22 35 C25 25 75 25 78 35 C82 55 75 82 50 88 Z"
            fill={colorHex || '#EF4444'}
            stroke="#DC2626"
            strokeWidth="3"
          />
          {/* Seeds */}
          <circle cx="35" cy="42" r="2.5" fill="#FEF08A" />
          <circle cx="50" cy="40" r="2.5" fill="#FEF08A" />
          <circle cx="65" cy="42" r="2.5" fill="#FEF08A" />
          <circle cx="42" cy="55" r="2.5" fill="#FEF08A" />
          <circle cx="58" cy="55" r="2.5" fill="#FEF08A" />
          <circle cx="50" cy="70" r="2.5" fill="#FEF08A" />
        </svg>
      );

    case 'banana':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M20 75 C30 82 65 80 82 45 C86 38 88 28 88 22 C84 22 75 32 68 38 C52 52 32 60 20 75 Z"
            fill={colorHex || '#FBBF24'}
            stroke="#D97706"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Banana stem */}
          <path d="M88 22 L93 16" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M20 75 L15 80" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          {/* Ridge curve */}
          <path d="M30 70 C50 65 70 50 80 34" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'whale':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Whale body */}
          <path
            d="M15 50 C15 32 40 30 70 36 C80 38 90 32 94 28 C92 42 86 48 76 54 C72 65 58 72 40 72 C22 72 15 62 15 50 Z"
            fill={colorHex || '#3B82F6'}
            stroke="#2563EB"
            strokeWidth="3"
          />
          {/* Belly */}
          <path d="M25 58 C35 68 55 68 70 58" stroke="#93C5FD" strokeWidth="3" fill="none" />
          {/* Water fountain */}
          <path d="M45 28 C45 15 35 15 38 22" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 28 C50 12 55 12 52 20" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
          {/* Eye & Smile */}
          <circle cx="28" cy="46" r="3" fill="#1E293B" />
          <circle cx="27" cy="45" r="1" fill="#FFFFFF" />
          <path d="M22 53 Q28 57 32 53" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'frog':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Eye bumps */}
          <circle cx="32" cy="35" r="14" fill={colorHex || '#10B981'} stroke="#059669" strokeWidth="2.5" />
          <circle cx="68" cy="35" r="14" fill={colorHex || '#10B981'} stroke="#059669" strokeWidth="2.5" />
          {/* Eyes */}
          <circle cx="32" cy="33" r="7" fill="#FFFFFF" />
          <circle cx="33" cy="33" r="4" fill="#0F172A" />
          <circle cx="68" cy="33" r="7" fill="#FFFFFF" />
          <circle cx="67" cy="33" r="4" fill="#0F172A" />
          {/* Face */}
          <ellipse cx="50" cy="55" rx="36" ry="26" fill={colorHex || '#10B981'} stroke="#059669" strokeWidth="3" />
          {/* Big happy smile */}
          <path d="M30 55 Q50 72 70 55" stroke="#047857" strokeWidth="3.5" strokeLinecap="round" />
          {/* Rosy cheeks */}
          <ellipse cx="26" cy="57" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
          <ellipse cx="74" cy="57" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
        </svg>
      );

    case 'sun':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="50"
              y1="16"
              x2="50"
              y2="8"
              stroke={colorHex ? '#D97706' : '#F59E0B'}
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
          {/* Core */}
          <circle cx="50" cy="50" r="26" fill={colorHex || '#FBBF24'} stroke="#D97706" strokeWidth="3" />
          {/* Eyes & Smile */}
          <circle cx="42" cy="46" r="3" fill="#78350F" />
          <circle cx="58" cy="46" r="3" fill="#78350F" />
          <path d="M42 54 Q50 63 58 54" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'ladybug':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Head & Antennae */}
          <circle cx="50" cy="30" r="14" fill="#1E293B" />
          <path d="M45 20 Q40 10 32 12" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <path d="M55 20 Q60 10 68 12" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          {/* Shell */}
          <circle cx="50" cy="58" r="30" fill={colorHex || '#EF4444'} stroke="#DC2626" strokeWidth="3" />
          {/* Center line */}
          <line x1="50" y1="28" x2="50" y2="88" stroke="#1E293B" strokeWidth="3" />
          {/* Spots */}
          <circle cx="36" cy="46" r="4.5" fill="#1E293B" />
          <circle cx="64" cy="46" r="4.5" fill="#1E293B" />
          <circle cx="32" cy="66" r="5" fill="#1E293B" />
          <circle cx="68" cy="66" r="5" fill="#1E293B" />
          <circle cx="42" cy="78" r="3.5" fill="#1E293B" />
          <circle cx="58" cy="78" r="3.5" fill="#1E293B" />
        </svg>
      );

    case 'carrot':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Greens */}
          <path d="M50 30 C50 10 35 15 38 12" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 30 C50 5 50 5 50 10" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 30 C50 10 65 15 62 12" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
          {/* Carrot body */}
          <path
            d="M36 32 C36 26 64 26 64 32 C64 45 54 85 50 92 C46 85 36 45 36 32 Z"
            fill={colorHex || '#F97316'}
            stroke="#EA580C"
            strokeWidth="3"
          />
          {/* Lines */}
          <path d="M42 42 Q48 44 54 42" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M44 56 Q50 58 56 56" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M46 70 Q50 71 54 70" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'grapes':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Stem */}
          <path d="M50 24 C50 14 62 16 64 10" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 24 Q36 20 40 12" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          {/* Grapes */}
          <circle cx="42" cy="34" r="10" fill={colorHex || '#A855F7'} stroke="#9333EA" strokeWidth="2.5" />
          <circle cx="58" cy="34" r="10" fill={colorHex || '#A855F7'} stroke="#9333EA" strokeWidth="2.5" />
          <circle cx="34" cy="48" r="10" fill={colorHex || '#A855F7'} stroke="#9333EA" strokeWidth="2.5" />
          <circle cx="50" cy="48" r="10" fill={colorHex || '#A855F7'} stroke="#9333EA" strokeWidth="2.5" />
          <circle cx="66" cy="48" r="10" fill={colorHex || '#A855F7'} stroke="#9333EA" strokeWidth="2.5" />
          <circle cx="42" cy="62" r="10" fill={colorHex || '#A855F7'} stroke="#9333EA" strokeWidth="2.5" />
          <circle cx="58" cy="62" r="10" fill={colorHex || '#A855F7'} stroke="#9333EA" strokeWidth="2.5" />
          <circle cx="50" cy="76" r="10" fill={colorHex || '#A855F7'} stroke="#9333EA" strokeWidth="2.5" />
        </svg>
      );

    case 'pig':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Ears */}
          <polygon points="26,30 20,16 38,22" fill={colorHex || '#F472B6'} stroke="#DB2777" strokeWidth="2.5" />
          <polygon points="74,30 80,16 62,22" fill={colorHex || '#F472B6'} stroke="#DB2777" strokeWidth="2.5" />
          {/* Head */}
          <circle cx="50" cy="54" r="30" fill={colorHex || '#F472B6'} stroke="#DB2777" strokeWidth="3" />
          {/* Eyes */}
          <circle cx="38" cy="46" r="3.5" fill="#1E293B" />
          <circle cx="62" cy="46" r="3.5" fill="#1E293B" />
          {/* Snout */}
          <ellipse cx="50" cy="60" rx="14" ry="10" fill="#FBCFE8" stroke="#DB2777" strokeWidth="2.5" />
          <circle cx="45" cy="60" r="2.5" fill="#9D174D" />
          <circle cx="55" cy="60" r="2.5" fill="#9D174D" />
        </svg>
      );

    case 'duck':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Duck body */}
          <path
            d="M30 65 C30 50 48 50 62 55 C75 58 84 52 88 46 C86 64 78 78 55 78 C38 78 30 75 30 65 Z"
            fill={colorHex || '#FBBF24'}
            stroke="#D97706"
            strokeWidth="3"
          />
          {/* Head */}
          <circle cx="36" cy="42" r="16" fill={colorHex || '#FBBF24'} stroke="#D97706" strokeWidth="3" />
          {/* Beak */}
          <path d="M22 42 C14 43 14 48 22 48 Z" fill="#F97316" stroke="#EA580C" strokeWidth="2" />
          {/* Eye */}
          <circle cx="32" cy="38" r="3" fill="#1E293B" />
          <circle cx="31" cy="37" r="1" fill="#FFFFFF" />
        </svg>
      );

    case 'cloud':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M25 65 A16 16 0 0 1 35 38 A24 24 0 0 1 70 36 A18 18 0 0 1 85 55 A16 16 0 0 1 75 70 L25 70 Z"
            fill={colorHex || '#38BDF8'}
            stroke="#0284C7"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="42" cy="54" r="2.5" fill="#0C4A6E" />
          <circle cx="58" cy="54" r="2.5" fill="#0C4A6E" />
          <path d="M46 60 Q50 64 54 60" stroke="#0C4A6E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'dolphin':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M85 45 C75 30 55 25 35 32 C20 38 12 50 15 62 C20 68 35 62 48 58 C62 54 75 65 85 70 C80 60 76 52 85 45 Z"
            fill={colorHex || '#06B6D4'}
            stroke="#0891B2"
            strokeWidth="3"
          />
          {/* Dorsal fin */}
          <path d="M46 30 C48 20 56 18 58 22 C56 26 53 28 50 30" fill={colorHex || '#06B6D4'} stroke="#0891B2" strokeWidth="2.5" />
          <circle cx="28" cy="46" r="2.5" fill="#0F172A" />
          <circle cx="27" cy="45" r="1" fill="#FFFFFF" />
          <path d="M22 52 Q26 55 30 52" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'flower':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Petals */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <circle
              key={i}
              cx="50"
              cy="28"
              r="14"
              fill={colorHex || '#C084FC'}
              stroke="#A855F7"
              strokeWidth="2.5"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
          {/* Flower Center */}
          <circle cx="50" cy="50" r="15" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          <circle cx="46" cy="48" r="2" fill="#78350F" />
          <circle cx="54" cy="48" r="2" fill="#78350F" />
          <path d="M46 54 Q50 57 54 54" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'leaf':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M20 80 C20 80 25 45 55 25 C75 12 85 15 85 15 C85 15 88 25 75 45 C55 75 20 80 20 80 Z"
            fill={colorHex || '#84CC16'}
            stroke="#65A30D"
            strokeWidth="3"
          />
          <path d="M20 80 L70 30" stroke="#4D7C0F" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 62 L48 68" stroke="#4D7C0F" strokeWidth="2" strokeLinecap="round" />
          <path d="M52 48 L64 52" stroke="#4D7C0F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <polygon
            points="50,15 61,38 86,40 67,58 73,83 50,70 27,83 33,58 14,40 39,38"
            fill={colorHex || '#EAB308'}
            stroke="#CA8A04"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="44" cy="50" r="2.5" fill="#713F12" />
          <circle cx="56" cy="50" r="2.5" fill="#713F12" />
          <path d="M45 57 Q50 62 55 57" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'crown':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <polygon
            points="20,75 20,40 35,55 50,30 65,55 80,40 80,75"
            fill={colorHex || '#EAB308'}
            stroke="#CA8A04"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="38" r="4" fill="#EF4444" />
          <circle cx="50" cy="28" r="4.5" fill="#3B82F6" />
          <circle cx="80" cy="38" r="4" fill="#10B981" />
          <circle cx="36" cy="65" r="3" fill="#A855F7" />
          <circle cx="50" cy="65" r="3.5" fill="#EF4444" />
          <circle cx="64" cy="65" r="3" fill="#3B82F6" />
        </svg>
      );

    case 'moon':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M65 20 A35 35 0 1 0 65 80 A28 28 0 0 1 65 20 Z"
            fill={colorHex || '#1E40AF'}
            stroke="#1E3A8A"
            strokeWidth="3"
          />
          <circle cx="40" cy="46" r="2.5" fill="#93C5FD" />
          <path d="M36 56 Q42 60 46 54" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'bear':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Ears */}
          <circle cx="26" cy="34" r="10" fill={colorHex || '#8D5B4C'} stroke="#6D4034" strokeWidth="2.5" />
          <circle cx="74" cy="34" r="10" fill={colorHex || '#8D5B4C'} stroke="#6D4034" strokeWidth="2.5" />
          <circle cx="26" cy="34" r="5" fill="#FBBF24" opacity="0.6" />
          <circle cx="74" cy="34" r="5" fill="#FBBF24" opacity="0.6" />
          {/* Head */}
          <circle cx="50" cy="54" r="28" fill={colorHex || '#8D5B4C'} stroke="#6D4034" strokeWidth="3" />
          {/* Snout */}
          <ellipse cx="50" cy="62" rx="14" ry="10" fill="#FEF3C7" stroke="#6D4034" strokeWidth="2" />
          <ellipse cx="50" cy="58" rx="5" ry="3.5" fill="#451A03" />
          <path d="M50 61 L50 65" stroke="#451A03" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="38" cy="48" r="3" fill="#1E293B" />
          <circle cx="62" cy="48" r="3" fill="#1E293B" />
        </svg>
      );

    case 'elephant':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Big Ear */}
          <ellipse cx="30" cy="48" rx="16" ry="20" fill={colorHex || '#94A3B8'} stroke="#64748B" strokeWidth="2.5" />
          {/* Head */}
          <circle cx="56" cy="48" r="22" fill={colorHex || '#94A3B8'} stroke="#64748B" strokeWidth="3" />
          {/* Trunk */}
          <path d="M68 54 C78 56 82 70 74 76 C70 78 66 74 68 70" stroke="#64748B" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="56" cy="42" r="3" fill="#0F172A" />
          <circle cx="55" cy="41" r="1" fill="#FFFFFF" />
        </svg>
      );

    default:
      // Generic friendly paint splat
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M50 15 C65 15 80 28 78 45 C86 52 88 68 76 78 C65 88 42 85 30 80 C18 72 15 58 22 45 C15 32 30 18 50 15 Z"
            fill={colorHex || '#3B82F6'}
            stroke="#1D4ED8"
            strokeWidth="3"
          />
          <circle cx="78" cy="25" r="5" fill={colorHex || '#3B82F6'} />
          <circle cx="22" cy="75" r="4" fill={colorHex || '#3B82F6'} />
        </svg>
      );
  }
};
