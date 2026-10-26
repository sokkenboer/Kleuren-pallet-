import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  RotateCcw,
  Sparkles,
  Undo2,
  Download,
  Maximize2,
  Minimize2,
  Wand2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ColorId } from '../types/game';
import { COLORS } from '../data/colors';
import { soundEngine } from '../utils/audio';
import {
  COLORING_TEMPLATES,
  COLORING_CATEGORIES,
  TEMPLATE_PART_KEYS,
  ColoringTemplate,
} from '../data/coloringTemplates';
import { ColoringCanvas } from './coloring/ColoringCanvas';

export const ColoringStudio: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('kameleon');
  const [selectedCategory, setSelectedCategory] = useState<string>('alles');
  const [currentColor, setCurrentColor] = useState<ColorId>('rood');
  const [fillState, setFillState] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<Record<string, string>[]>([]);
  const [isLargeFormat, setIsLargeFormat] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const paletteColors: ColorId[] = [
    'rood',
    'blauw',
    'geel',
    'groen',
    'oranje',
    'paars',
    'roze',
    'bruin',
    'zwart',
    'wit',
    'grijs',
    'lichtblauw',
    'donkerblauw',
    'lichtgroen',
    'lila',
    'goud',
    'turkoois',
  ];

  const filteredTemplates = useMemo(() => {
    if (selectedCategory === 'alles') return COLORING_TEMPLATES;
    return COLORING_TEMPLATES.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const currentTemplate = useMemo(() => {
    return COLORING_TEMPLATES.find((t) => t.id === selectedTemplateId) || COLORING_TEMPLATES[0];
  }, [selectedTemplateId]);

  // 10% more compact sizing as requested: 432px normal, 576px large
  const svgClassName = `w-full ${
    isLargeFormat ? 'max-w-[576px]' : 'max-w-[432px]'
  } aspect-square select-none cursor-pointer transition-all duration-300 transform scale-95 sm:scale-100`;

  const handleSelectColor = (cId: ColorId) => {
    setCurrentColor(cId);
    soundEngine.playTap();
    const friendlyPraises: Record<ColorId, string> = {
      rood: 'Wat een lief kleurtje rood!',
      blauw: 'Zacht hemelsblauw!',
      geel: 'Warm zonnegeel!',
      groen: 'Zacht lentegroen!',
      oranje: 'Gezellig oranje!',
      paars: 'Mooi zacht paars!',
      roze: 'Lief suikerspin roze!',
      bruin: 'Lief beertjesbruin!',
      zwart: 'Zacht nachtzwart!',
      wit: 'Puur wolkjeswit!',
      grijs: 'Zacht muisjesgrijs!',
      lichtblauw: 'Prachtig zacht lichtblauw!',
      donkerblauw: 'Mooi diep donkerblauw!',
      lichtgroen: 'Fris vrolijk lentegroen!',
      lila: 'Zacht sprookjesachtig lila!',
      goud: 'Stralend glinsterend goud!',
      turkoois: 'Mooi fris zeeblauw!',
    };
    soundEngine.speak(friendlyPraises[cId] || COLORS[cId].name);
  };

  const handlePartClick = (partKey: string) => {
    soundEngine.playSparkle();
    setHistory((prev) => [...prev, { ...fillState }]);
    setFillState((prev) => ({
      ...prev,
      [partKey]: COLORS[currentColor].hex,
    }));
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    soundEngine.playTap();
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setFillState(previous);
    soundEngine.speak('Eén stapje teruggedaan.');
  };

  const handleReset = () => {
    soundEngine.playTap();
    if (Object.keys(fillState).length === 0) return;
    setHistory((prev) => [...prev, { ...fillState }]);
    setFillState({});
    soundEngine.speak('Tekening weer helemaal wit gemaakt!');
  };

  // Magic rainbow auto-color for toddler joy
  const handleMagicColor = () => {
    soundEngine.playFanfare();
    setHistory((prev) => [...prev, { ...fillState }]);
    const rainbowPalette = ['#EF4444', '#3B82F6', '#EAB308', '#22C55E', '#F97316', '#A855F7', '#EC4899', '#06B6D4'];

    const newFills: Record<string, string> = { ...fillState };
    const keys = TEMPLATE_PART_KEYS[selectedTemplateId] || [];

    keys.forEach((k, idx) => {
      newFills[k] = rainbowPalette[idx % rainbowPalette.length];
    });

    setFillState(newFills);
    setShowCelebration(true);
    soundEngine.speak('Tovermagie! Alles is vrolijk ingekleurd!');
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleSelectTemplate = (tmpl: ColoringTemplate) => {
    soundEngine.playTap();
    setSelectedTemplateId(tmpl.id);
    setFillState({});
    setHistory([]);
    soundEngine.speak(`We kleuren nu de ${tmpl.name}!`);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const distance = direction === 'left' ? -240 : 240;
    carouselRef.current.scrollBy({ left: distance, behavior: 'smooth' });
  };

  // Export coloring as printable PNG image
  const handleDownload = () => {
    if (!svgRef.current) return;
    soundEngine.playSuccess();
    soundEngine.speak('Je kunstwerk wordt bewaard als afbeelding!');

    const svgElement = svgRef.current;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 1200, 1200);

      ctx.strokeStyle = '#FDE68A';
      ctx.lineWidth = 16;
      ctx.strokeRect(20, 20, 1160, 1160);

      ctx.drawImage(img, 100, 100, 1000, 1000);

      ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#78350F';
      ctx.textAlign = 'center';
      ctx.fillText(`${currentTemplate.name} • KleurenAvontuur`, 600, 1140);

      ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('Bedenker & Ontwikkelaar: Robert Reestman', 600, 1170);

      const pngData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Kleurplaat-${selectedTemplateId}.png`;
      link.href = pngData;
      link.click();
      URL.revokeObjectURL(blobURL);
    };
    img.src = blobURL;
  };

  return (
    <div
      className={`mx-auto px-3 sm:px-5 py-3 sm:py-5 transition-all duration-300 ${
        isLargeFormat ? 'max-w-5xl' : 'max-w-4xl'
      }`}
    >
      {/* Header and Template Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-3.5">
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-2xl shadow-md text-white shrink-0">
            🎨
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-display tracking-tight">
                Vrolijk Kleur- & Schilderboek
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-200 text-amber-900">
                30 Platen!
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              30 prachtige kleurplaten • Tik op een kleur en schilder met je vingers!
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={() => setIsLargeFormat(!isLargeFormat)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shadow-xs ${
              isLargeFormat
                ? 'bg-amber-500 text-white shadow-amber-300'
                : 'bg-white hover:bg-amber-50 text-amber-900 border border-amber-200'
            }`}
            title={isLargeFormat ? 'Normaal formaat' : 'Groot formaat'}
          >
            {isLargeFormat ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isLargeFormat ? 'Normaal Formaat' : 'Groot Formaat'}</span>
          </button>

          <button
            onClick={handleMagicColor}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
            title="Tover alle kleuren in één keer"
          >
            <Wand2 className="w-4 h-4" />
            <span>Toverstaf</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs shadow-xs transition-all"
            title="Download of print je kunstwerk"
          >
            <Download className="w-4 h-4" />
            <span>Bewaar Foto</span>
          </button>
        </div>
      </div>

      {/* 30 Templates Carousel with Category Filter */}
      <div className="bg-white/95 backdrop-blur-xs p-3 rounded-3xl border border-amber-200/90 shadow-sm mb-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 px-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {COLORING_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundEngine.playTap();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-amber-50/80 hover:bg-amber-100 text-amber-900 border border-amber-200/60'
                  }`}
                >
                  <span className="mr-1">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-bold text-amber-900/70 hidden sm:flex items-center gap-1">
            <span>{COLORING_TEMPLATES.length} kleurplaten</span>
          </div>
        </div>

        {/* Carousel with side navigation buttons */}
        <div className="relative flex items-center">
          <button
            onClick={() => scrollCarousel('left')}
            className="hidden sm:flex absolute -left-2 z-10 w-7 h-7 rounded-full bg-white/90 border border-amber-300 shadow-md items-center justify-center text-amber-900 hover:bg-amber-50"
            aria-label="Vorige kleurplaten"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={carouselRef}
            className="flex items-center gap-2 overflow-x-auto py-1 px-1 no-scrollbar scroll-smooth w-full"
          >
            {filteredTemplates.map((tmpl) => {
              const isSelected = selectedTemplateId === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-bold text-xs whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md scale-102 ring-2 ring-amber-300'
                      : 'bg-amber-50/70 hover:bg-amber-100/90 text-amber-900 border border-amber-200/60'
                  }`}
                >
                  <span className="text-xl">{tmpl.icon}</span>
                  <span>{tmpl.name}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scrollCarousel('right')}
            className="hidden sm:flex absolute -right-2 z-10 w-7 h-7 rounded-full bg-white/90 border border-amber-300 shadow-md items-center justify-center text-amber-900 hover:bg-amber-50"
            aria-label="Volgende kleurplaten"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Area (10% more compact) */}
      <div
        className={`bg-white rounded-3xl sm:rounded-4xl border-4 border-amber-200/90 p-3 sm:p-6 shadow-xl flex flex-col items-center justify-center relative transition-all duration-300 ${
          isLargeFormat ? 'min-h-[470px] sm:min-h-[570px] md:min-h-[640px]' : 'min-h-[380px] sm:min-h-[470px]'
        } mb-3.5`}
      >
        {/* Top Floating Controls on Canvas */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <div className="px-3.5 py-1.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 font-bold text-xs flex items-center gap-1.5 shadow-xs">
            <span>{currentTemplate.icon}</span>
            <span>{currentTemplate.name}</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-2xl font-bold text-xs transition-colors shadow-xs ${
              history.length > 0
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
                : 'bg-slate-50 text-slate-300 cursor-not-allowed'
            }`}
            title="Vorige stap ongedaan maken"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Herstel</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors shadow-xs cursor-pointer"
            title="Opnieuw beginnen"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Wissen</span>
          </button>
        </div>

        {/* Celebration Overlay for completing or magic painting */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-amber-900/20 backdrop-blur-xs rounded-3xl"
            >
              <div className="bg-white p-6 rounded-3xl shadow-2xl border-4 border-amber-300 text-center max-w-sm">
                <div className="text-4xl mb-2">🎉✨🎨</div>
                <h3 className="text-xl font-black text-amber-950 font-display">Wat een prachtig kunstwerk!</h3>
                <p className="text-xs text-slate-600 mt-1">Je hebt alle kleuren zo mooi gebruikt!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* High-Resolution SVG Canvas */}
        <div className="w-full flex items-center justify-center py-4">
          <ColoringCanvas
            templateId={selectedTemplateId}
            svgRef={svgRef}
            svgClassName={svgClassName}
            fillState={fillState}
            onPartClick={handlePartClick}
          />
        </div>
      </div>

      {/* Palette Bar at Bottom */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-amber-200/90 shadow-sm">
        <div className="text-xs font-bold text-amber-950/80 uppercase tracking-wider mb-3 text-center flex items-center justify-center gap-1.5">
          <Palette className="w-4 h-4 text-amber-700" />
          <span>Kies je verfkleur (tik op een kleur en hoor hoe hij heet!):</span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 max-w-3xl mx-auto">
          {paletteColors.map((colorId) => {
            const c = COLORS[colorId];
            const isSelected = currentColor === colorId;
            return (
              <motion.button
                key={colorId}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleSelectColor(colorId)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all shadow-md cursor-pointer ${
                  isSelected
                    ? 'ring-4 ring-amber-400 ring-offset-3 scale-105 shadow-lg'
                    : 'hover:shadow-md'
                }`}
                style={{
                  backgroundColor: c.hex,
                  borderColor: c.borderColor,
                }}
              >
                <div className="w-6 h-6 rounded-full bg-white/30 mb-1 flex items-center justify-center">
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <span
                  className="text-[11px] font-black uppercase tracking-tight truncate w-full text-center drop-shadow-xs"
                  style={{ color: c.textColor }}
                >
                  {c.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-3 text-center text-xs text-slate-500 font-medium">
          Tip: Tik op <strong className="text-amber-900">"Bewaar Foto"</strong> om je schilderwerk te downloaden of op de koelkast te hangen!
        </div>
      </div>
    </div>
  );
};
