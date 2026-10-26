export type ColorId =
  | 'rood'
  | 'blauw'
  | 'geel'
  | 'groen'
  | 'oranje'
  | 'paars'
  | 'roze'
  | 'bruin'
  | 'zwart'
  | 'wit'
  | 'grijs'
  | 'lichtblauw'
  | 'donkerblauw'
  | 'lichtgroen'
  | 'lila'
  | 'goud'
  | 'turkoois';

export interface ColorItem {
  id: ColorId;
  name: string; // Dutch name e.g. "Rood"
  hex: string;
  textColor: string; // for contrast
  borderColor: string;
  pronunciationHint: string;
  examples: {
    name: string; // e.g. "Aardbei"
    svgPath: string; // custom illustrated SVG
  }[];
}

export type LevelDifficulty = 'basis' | 'verkennen' | 'objecten' | 'mengen' | 'sorteren' | 'patronen';

export interface LevelConfig {
  id: number;
  stepGroup?: 1 | 2 | 3 | 4 | 5 | 6; // Logical step group for filtering
  title: string;
  subtitle: string;
  difficulty: LevelDifficulty;
  availableColors: ColorId[];
  choiceCount: number; // 2, 3, 4, 6 or 8
  questionCount: number;
  description: string;
  icon: string;
}

export interface Sticker {
  id: string;
  name: string;
  emoji: string;
  color: string;
  requiredLevel: number;
  unlocked: boolean;
}

export interface PlacedSticker {
  id: string;
  stickerId: string;
  emoji: string;
  x: number; // percentage
  y: number; // percentage
  scale: number;
  rotation: number;
}

export type ActiveTab = 'pad' | 'mengen' | 'kleurboek' | 'stickers';
