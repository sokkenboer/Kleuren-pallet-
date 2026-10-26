import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles, ArrowRight, BookOpen, PartyPopper } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { Sticker } from '../types/game';

interface Props {
  isOpen: boolean;
  levelNumber: number;
  levelTitle: string;
  unlockedSticker: Sticker | null;
  onContinue: () => void;
  onGoToStickers: () => void;
}

export const fireCelebrationConfetti = () => {
  const colors = ['#EF4444', '#3B82F6', '#FBBF24', '#10B981', '#A855F7', '#F97316', '#EC4899'];

  // Wave 1: Center festive explosion with stars and circles
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.55 },
    colors,
    ticks: 220,
    gravity: 0.8,
    scalar: 1.25,
    shapes: ['star', 'circle'],
  });

  // Wave 2: Left corner cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 65,
      origin: { x: 0.05, y: 0.75 },
      colors,
      ticks: 200,
    });
  }, 250);

  // Wave 3: Right corner cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 65,
      origin: { x: 0.95, y: 0.75 },
      colors,
      ticks: 200,
    });
  }, 500);

  // Wave 4: Golden star rain from above
  setTimeout(() => {
    confetti({
      particleCount: 45,
      spread: 120,
      origin: { y: 0.05 },
      colors: ['#FBBF24', '#F59E0B', '#FEF08A'],
      shapes: ['star'],
      scalar: 1.4,
      ticks: 250,
    });
  }, 850);
};

export const CelebrationModal: React.FC<Props> = ({
  isOpen,
  levelNumber,
  levelTitle,
  unlockedSticker,
  onContinue,
  onGoToStickers,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundEngine.playFanfare();
      soundEngine.speak(
        unlockedSticker
          ? `Fantastisch gedaan! Je hebt een nieuwe sticker verdiend: de ${unlockedSticker.name}!`
          : 'Super goed gedaan! Wat knap van jou!'
      );

      // Launch multi-wave celebration confetti
      fireCelebrationConfetti();
    }
  }, [isOpen, unlockedSticker]);

  const handleManualConfetti = () => {
    soundEngine.playTap();
    fireCelebrationConfetti();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.75, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden"
          >
            {/* Decorative background sunburst circles */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-100 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-sky-100 rounded-full blur-xl pointer-events-none" />

            {/* Three golden stars with lively bouncing entrance */}
            <div className="flex justify-center items-center gap-2 mb-4">
              <motion.div
                initial={{ rotate: -25, scale: 0 }}
                animate={{ rotate: -10, scale: 1 }}
                transition={{ delay: 0.15, type: 'spring' }}
              >
                <Star className="w-10 h-10 fill-amber-400 text-amber-500 drop-shadow-sm" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.3 }}
                transition={{ delay: 0.28, type: 'spring' }}
              >
                <Star className="w-12 h-12 fill-amber-400 text-amber-500 drop-shadow-md" />
              </motion.div>
              <motion.div
                initial={{ rotate: 25, scale: 0 }}
                animate={{ rotate: 10, scale: 1 }}
                transition={{ delay: 0.42, type: 'spring' }}
              >
                <Star className="w-10 h-10 fill-amber-400 text-amber-500 drop-shadow-sm" />
              </motion.div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-900 mb-1 font-display">
              Geweldig Gedaan!
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-4 font-medium">
              Je hebt <span className="font-bold text-amber-700">{levelTitle}</span> met succes afgerond!
            </p>

            {/* Interactive "Gooi meer confetti!" button for kids */}
            <div className="flex justify-center mb-5">
              <button
                type="button"
                onClick={handleManualConfetti}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 via-rose-100 to-sky-100 hover:from-amber-200 hover:via-rose-200 hover:to-sky-200 border border-amber-300 text-amber-950 font-bold text-xs shadow-sm transition-transform active:scale-90"
              >
                <PartyPopper className="w-4 h-4 text-rose-500 animate-bounce" />
                <span>Nog een keer confetti! 🎉</span>
              </button>
            </div>

            {/* Unlocked Sticker Award */}
            {unlockedSticker && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-dashed border-amber-300 rounded-2xl p-4 mb-6 flex flex-col items-center"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Nieuwe Beloning Ontgrendeld!
                </div>
                <div className="text-5xl my-1 animate-bounce" role="img" aria-label={unlockedSticker.name}>
                  {unlockedSticker.emoji}
                </div>
                <div className="text-base font-bold text-slate-800">{unlockedSticker.name}</div>
                <p className="text-xs text-slate-500 mt-1">Toegevoegd aan je stickeralbum!</p>
              </motion.div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {unlockedSticker && (
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playTap();
                    onGoToStickers();
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-sm transition-transform active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  Naar Stickeralbum
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  soundEngine.playTap();
                  onContinue();
                }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-base shadow-lg shadow-emerald-500/25 transition-transform active:scale-95 flex-1"
              >
                Volgende Stap
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

