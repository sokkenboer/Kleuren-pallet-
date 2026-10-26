import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, Check, ArrowRight, Wand2 } from 'lucide-react';
import { ColorId } from '../types/game';
import { COLORS, COLOR_MIXING_RECIPES } from '../data/colors';
import { soundEngine } from '../utils/audio';

interface Props {
  isLevelMode?: boolean;
  onCompleteLevel?: () => void;
  onBack?: () => void;
}

export const ColorMixerLab: React.FC<Props> = ({ isLevelMode = false, onCompleteLevel, onBack }) => {
  const [selectedColor1, setSelectedColor1] = useState<ColorId | null>(null);
  const [selectedColor2, setSelectedColor2] = useState<ColorId | null>(null);
  const [isMixing, setIsMixing] = useState(false);
  const [mixedResult, setMixedResult] = useState<{ id: ColorId; text: string } | null>(null);

  // Challenge mode target (if in level mode)
  const [challengeIndex, setChallengeIndex] = useState(0);
  const challenges = [
    { target: 'oranje' as ColorId, hint: 'Kun jij ORANJE maken?' },
    { target: 'groen' as ColorId, hint: 'Kun jij GROEN toveren?' },
    { target: 'paars' as ColorId, hint: 'Kun jij magisch PAARS mengen?' },
    { target: 'roze' as ColorId, hint: 'Kun jij zacht ROZE maken?' },
  ];
  const currentChallenge = isLevelMode ? challenges[challengeIndex] : null;

  // Primary available colors for mixing
  const paletteColors: ColorId[] = ['rood', 'geel', 'blauw', 'wit', 'zwart'];

  const handleSelectColor = (color: ColorId) => {
    soundEngine.playTap();
    if (!selectedColor1) {
      setSelectedColor1(color);
      soundEngine.speak(`Eerste kleur is ${COLORS[color].name}. Kies nu een tweede kleur!`);
    } else if (!selectedColor2 && color !== selectedColor1) {
      setSelectedColor2(color);
      soundEngine.speak(`Tweede kleur is ${COLORS[color].name}. Tik op de toverketel om te mengen!`);
    } else {
      // replace second color
      setSelectedColor2(color);
      soundEngine.speak(`${COLORS[color].name}`);
    }
  };

  const handleMix = () => {
    if (!selectedColor1 || !selectedColor2) {
      soundEngine.speak('Kies eerst twee verschillende kleuren om te mengen!');
      return;
    }

    setIsMixing(true);
    soundEngine.playBubbleMix();
    soundEngine.speak('Hocus pocus pilatus pas... mengen maar!');

    // Find recipe
    const match = COLOR_MIXING_RECIPES.find(
      (r) =>
        (r.color1 === selectedColor1 && r.color2 === selectedColor2) ||
        (r.color1 === selectedColor2 && r.color2 === selectedColor1)
    );

    setTimeout(() => {
      setIsMixing(false);

      if (match) {
        setMixedResult({ id: match.result, text: match.description });
        soundEngine.playSuccess();
        soundEngine.speak(match.description);

        if (isLevelMode && currentChallenge && match.result === currentChallenge.target) {
          // Challenge matched!
          setTimeout(() => {
            if (challengeIndex + 1 < challenges.length) {
              setChallengeIndex(challengeIndex + 1);
              resetLab();
              soundEngine.speak(`Super goed! Volgende opdracht: ${challenges[challengeIndex + 1].hint}`);
            } else {
              if (onCompleteLevel) onCompleteLevel();
            }
          }, 2000);
        }
      } else {
        // Unknown mix or brown/murky
        setMixedResult({
          id: 'bruin',
          text: `Samen wordt dit een mooie aardetint bruin!`,
        });
        soundEngine.playSuccess();
        soundEngine.speak(`Samen wordt dit een aardekleur bruin!`);
      }
    }, 1400);
  };

  const resetLab = () => {
    soundEngine.playTap();
    setSelectedColor1(null);
    setSelectedColor2(null);
    setMixedResult(null);
    setIsMixing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        {onBack && (
          <button
            onClick={() => {
              soundEngine.playTap();
              soundEngine.stopSpeaking();
              onBack();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white border border-amber-200 text-amber-900 hover:bg-amber-50 font-bold text-sm shadow-sm transition-transform active:scale-95"
          >
            ← Terug
          </button>
        )}

        <div className="text-center flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display flex items-center justify-center gap-2">
            <Wand2 className="w-6 h-6 text-amber-600" />
            {isLevelMode ? 'Meng-Opdracht' : 'Magisch Kleuren-Lab'}
          </h2>
          {isLevelMode && currentChallenge && (
            <div className="inline-flex items-center gap-2 mt-1 px-4 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
              <span>{currentChallenge.hint}</span>
            </div>
          )}
        </div>

        <button
          onClick={resetLab}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm shadow-sm transition-transform active:scale-95"
          title="Opnieuw mengen"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline">Opnieuw</span>
        </button>
      </div>

      {/* Main interactive mixing cauldron / container */}
      <div className="bg-gradient-to-b from-amber-50/80 via-white to-sky-50/80 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center text-center">
          {/* Flask 1 */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Kleur 1
            </span>
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${
                selectedColor1
                  ? 'border-white shadow-xl scale-105'
                  : 'border-dashed border-amber-300 bg-white/70'
              }`}
              style={{
                backgroundColor: selectedColor1 ? COLORS[selectedColor1].hex : undefined,
              }}
            >
              {selectedColor1 ? (
                <span
                  className="text-lg font-black uppercase drop-shadow-sm"
                  style={{ color: COLORS[selectedColor1].textColor }}
                >
                  {COLORS[selectedColor1].name}
                </span>
              ) : (
                <div className="text-xs font-bold text-amber-700/70 p-2">Kies hieronder kleur 1</div>
              )}
            </div>
          </div>

          {/* Plus sign & Cauldron / Result */}
          <div className="flex flex-col items-center">
            <div className="text-2xl font-black text-amber-700 mb-2">+</div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMix}
              disabled={!selectedColor1 || !selectedColor2 || isMixing}
              className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-6 flex flex-col items-center justify-center transition-all shadow-2xl cursor-pointer ${
                isMixing ? 'animate-spin' : ''
              } ${
                mixedResult
                  ? 'border-white ring-8 ring-amber-300'
                  : selectedColor1 && selectedColor2
                  ? 'border-amber-400 bg-amber-100 animate-gentle-pulse'
                  : 'border-dashed border-slate-300 bg-white/50 cursor-not-allowed opacity-80'
              }`}
              style={{
                backgroundColor: mixedResult
                  ? COLORS[mixedResult.id].hex
                  : isMixing
                  ? '#F59E0B'
                  : undefined,
              }}
            >
              {isMixing ? (
                <div className="text-4xl animate-bounce">✨</div>
              ) : mixedResult ? (
                <div className="flex flex-col items-center p-2">
                  <span
                    className="text-xl sm:text-2xl font-black uppercase tracking-wide drop-shadow-md"
                    style={{ color: COLORS[mixedResult.id].textColor }}
                  >
                    {COLORS[mixedResult.id].name}
                  </span>
                  <Sparkles className="w-6 h-6 mt-1 text-white animate-pulse" />
                </div>
              ) : selectedColor1 && selectedColor2 ? (
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-1">🧪</div>
                  <span className="text-xs sm:text-sm font-extrabold text-amber-900 uppercase">
                    Tik om te Mengen!
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <div className="text-3xl mb-1">🏺</div>
                  <span className="text-xs font-semibold">Toverketel</span>
                </div>
              )}
            </motion.button>

            {/* Mix button on mobile */}
            {selectedColor1 && selectedColor2 && !mixedResult && (
              <button
                onClick={handleMix}
                className="mt-3 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition-transform active:scale-95"
              >
                Mengen! 🪄
              </button>
            )}
          </div>

          {/* Flask 2 */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Kleur 2
            </span>
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${
                selectedColor2
                  ? 'border-white shadow-xl scale-105'
                  : 'border-dashed border-amber-300 bg-white/70'
              }`}
              style={{
                backgroundColor: selectedColor2 ? COLORS[selectedColor2].hex : undefined,
              }}
            >
              {selectedColor2 ? (
                <span
                  className="text-lg font-black uppercase drop-shadow-sm"
                  style={{ color: COLORS[selectedColor2].textColor }}
                >
                  {COLORS[selectedColor2].name}
                </span>
              ) : (
                <div className="text-xs font-bold text-amber-700/70 p-2">Kies hieronder kleur 2</div>
              )}
            </div>
          </div>
        </div>

        {/* Result description banner */}
        <AnimatePresence>
          {mixedResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 p-4 rounded-2xl bg-white/95 border-2 border-amber-300 text-center max-w-lg mx-auto shadow-sm"
            >
              <div className="text-lg font-extrabold text-slate-900 mb-1">
                {mixedResult.text}
              </div>
              <p className="text-xs text-slate-500">
                Probeer nog een combinatie of klik op 'Opnieuw'!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Palette selector buttons */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-amber-200 shadow-sm">
        <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 text-center">
          Kies een toverkleur om toe te voegen:
        </div>
        <div className="grid grid-cols-5 gap-3 max-w-lg mx-auto">
          {paletteColors.map((colorId) => {
            const c = COLORS[colorId];
            const isSelected = selectedColor1 === colorId || selectedColor2 === colorId;
            return (
              <motion.button
                key={colorId}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleSelectColor(colorId)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all shadow-md cursor-pointer ${
                  isSelected ? 'ring-4 ring-amber-400 ring-offset-2' : ''
                }`}
                style={{
                  backgroundColor: c.hex,
                  borderColor: c.borderColor,
                }}
              >
                <div className="w-6 h-6 rounded-full bg-white/30 mb-1" />
                <span
                  className="text-xs font-black uppercase"
                  style={{ color: c.textColor }}
                >
                  {c.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
