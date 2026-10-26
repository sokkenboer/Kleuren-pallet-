import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trash2, Lock, BookOpen } from 'lucide-react';
import { Sticker, PlacedSticker } from '../types/game';
import { soundEngine } from '../utils/audio';
import meadowBgImg from '../assets/images/sticker_album_meadow_1791917252748.jpg';

interface Props {
  stickers: Sticker[];
}

export const StickerBook: React.FC<Props> = ({ stickers }) => {
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>(() => {
    const saved = localStorage.getItem('kleuren_placed_stickers');
    return saved ? JSON.parse(saved) : [
      { id: 'p-1', stickerId: 'stk-star', emoji: '⭐', x: 25, y: 35, scale: 1.2, rotation: -8 },
      { id: 'p-2', stickerId: 'stk-ladybug', emoji: '🐞', x: 70, y: 65, scale: 1.1, rotation: 12 },
    ];
  });

  const meadowRef = useRef<HTMLDivElement>(null);

  const savePlaced = (updated: PlacedSticker[]) => {
    setPlacedStickers(updated);
    localStorage.setItem('kleuren_placed_stickers', JSON.stringify(updated));
  };

  const handleAddSticker = (stk: Sticker) => {
    if (!stk.unlocked) {
      soundEngine.speak(`Deze sticker ontgrendel je bij Stap ${stk.requiredLevel}! Speel verder om hem te winnen.`);
      return;
    }

    soundEngine.playTap();
    const newPlaced: PlacedSticker = {
      id: `p-${Date.now()}`,
      stickerId: stk.id,
      emoji: stk.emoji,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      scale: 1 + (Math.random() * 0.3 - 0.15),
      rotation: Math.floor(Math.random() * 30) - 15,
    };

    const next = [...placedStickers, newPlaced];
    savePlaced(next);
    soundEngine.speak(`Je hebt de ${stk.name} in de weide geplakt!`);
  };

  const handleClearMeadow = () => {
    soundEngine.playTap();
    savePlaced([]);
    soundEngine.speak('De weide is weer leeggemaakt.');
  };

  const handleStickerTap = (id: string, name: string) => {
    soundEngine.playTap();
    soundEngine.speak(`Vrolijke sticker!`);
    // Gentle rotation wiggle
    savePlaced(
      placedStickers.map((s) => (s.id === id ? { ...s, rotation: s.rotation + 15 } : s))
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-600" />
            Mijn Stickeralbum & Speelweide
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Kies een sticker uit je verzameling om in de magische weide te plakken!
          </p>
        </div>

        {placedStickers.length > 0 && (
          <button
            onClick={handleClearMeadow}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Weide Leegmaken</span>
          </button>
        )}
      </div>

      {/* The Meadow Interactive Playground */}
      <div
        ref={meadowRef}
        className="relative w-full aspect-[16/9] max-h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 bg-sky-100 select-none mb-6"
      >
        {/* Background Meadow Art */}
        <img
          src={meadowBgImg || '/meadow_background.jpg'}
          alt="Magische Kleurenweide"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />

        {/* Placed Stickers on the meadow */}
        {placedStickers.map((ps) => (
          <motion.div
            key={ps.id}
            drag
            dragConstraints={meadowRef}
            dragElastic={0.1}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStickerTap(ps.id, ps.emoji)}
            style={{
              position: 'absolute',
              left: `${ps.x}%`,
              top: `${ps.y}%`,
              transform: `rotate(${ps.rotation}deg) scale(${ps.scale})`,
              cursor: 'grab',
            }}
            className="text-4xl sm:text-6xl drop-shadow-lg active:cursor-grabbing select-none"
          >
            {ps.emoji}
          </motion.div>
        ))}

        {placedStickers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/80 backdrop-blur-xs px-5 py-2.5 rounded-2xl border border-amber-200 text-amber-900 font-bold text-sm shadow-md flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              Tik hieronder op een sticker om hem in de weide te plaatsen!
            </div>
          </div>
        )}
      </div>

      {/* Sticker drawer */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-amber-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Jouw Verzamelde Beloningen
          </div>
          <div className="text-xs font-bold text-amber-800">
            {stickers.filter((s) => s.unlocked).length} van de {stickers.length} ontgrendeld
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {stickers.map((stk) => {
            return (
              <motion.button
                key={stk.id}
                whileHover={stk.unlocked ? { scale: 1.08, y: -2 } : {}}
                whileTap={stk.unlocked ? { scale: 0.95 } : {}}
                onClick={() => handleAddSticker(stk)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all relative ${
                  stk.unlocked
                    ? 'bg-amber-50/70 border-amber-200 hover:border-amber-400 shadow-sm cursor-pointer'
                    : 'bg-slate-50 border-dashed border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                {stk.unlocked ? (
                  <>
                    <span className="text-3xl sm:text-4xl mb-1">{stk.emoji}</span>
                    <span className="text-[11px] font-bold text-slate-800 text-center truncate w-full">
                      {stk.name}
                    </span>
                    <span className="text-[9px] text-amber-700 font-semibold mt-0.5">
                      Tik om te plakken
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mb-1 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 text-center">
                      Stap {stk.requiredLevel}
                    </span>
                  </>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
