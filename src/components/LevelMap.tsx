import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Lock, Play, Sparkles, Filter } from 'lucide-react';
import { LevelConfig } from '../types/game';
import { COLORS } from '../data/colors';
import { soundEngine } from '../utils/audio';
import kikiMascotImg from '../assets/images/mascot_color_chameleon_1791917253128.jpg';

interface Props {
  levels: LevelConfig[];
  completedLevels: number[]; // e.g. [1, 2]
  onSelectLevel: (level: LevelConfig) => void;
}

type LevelFilter = 'alle' | 'stap1' | 'stap2' | 'spellen';

export const LevelMap: React.FC<Props> = ({ levels, completedLevels, onSelectLevel }) => {
  const [imgError, setImgError] = useState(false);
  const [activeFilter, setActiveFilter] = useState<LevelFilter>('alle');

  const filteredLevels = levels.filter((lvl) => {
    if (activeFilter === 'stap1') return lvl.stepGroup === 1;
    if (activeFilter === 'stap2') return lvl.stepGroup === 2;
    if (activeFilter === 'spellen') return lvl.stepGroup && lvl.stepGroup >= 3;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
      {/* Mascot Hero Card */}
      <div className="bg-gradient-to-r from-amber-100/90 via-orange-50/90 to-yellow-100/90 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-md mb-6 flex flex-col sm:flex-row items-center gap-5">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white flex items-center justify-center"
        >
          {!imgError ? (
            <img
              src={kikiMascotImg || '/mascot_kiki.jpg'}
              alt="Kiki de Kameleon"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Friendly SVG Chameleon Fallback */
            <svg viewBox="0 0 100 100" className="w-24 h-24 p-1" fill="none">
              <ellipse cx="50" cy="55" rx="32" ry="24" fill="#10B981" stroke="#059669" strokeWidth="3" />
              <circle cx="68" cy="42" r="16" fill="#10B981" stroke="#059669" strokeWidth="3" />
              {/* Big happy eye */}
              <circle cx="70" cy="40" r="8" fill="#FFFFFF" />
              <circle cx="72" cy="40" r="5" fill="#0F172A" />
              <circle cx="70" cy="38" r="1.5" fill="#FFFFFF" />
              {/* Smile */}
              <path d="M62 50 Q72 58 80 50" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
              {/* Colorful spots */}
              <circle cx="40" cy="45" r="4.5" fill="#F59E0B" />
              <circle cx="52" cy="42" r="4" fill="#EF4444" />
              <circle cx="36" cy="60" r="5" fill="#3B82F6" />
              <circle cx="50" cy="62" r="4.5" fill="#A855F7" />
              {/* Curly tail */}
              <path d="M22 62 C15 62 10 52 16 46 C22 40 28 50 22 55" stroke="#059669" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
          )}
        </motion.div>

        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-amber-200 text-amber-900 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kiki de Kameleon</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-display">
            Welkom bij het KleurenAvontuur!
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
            Nu met nog meer levels en wonderkleuren! Kies steeds uit rustige kleine of grote vlakjes en ga stap voor stap verder.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs font-bold text-amber-800">
            <span>⭐ {completedLevels.length} van de {levels.length} stappen voltooid</span>
            <span aria-hidden="true" className="text-amber-400 hidden sm:inline">·</span>
            <span className="text-amber-950 font-semibold bg-white/70 px-2.5 py-0.5 rounded-full border border-amber-200">
              Ontwikkeld door Robert Reestman
            </span>
          </div>
        </div>
      </div>

      {/* Step Group Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        <button
          onClick={() => {
            soundEngine.playTap();
            setActiveFilter('alle');
          }}
          className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold whitespace-nowrap border transition-all cursor-pointer ${
            activeFilter === 'alle'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
          }`}
        >
          Alle Levels ({levels.length})
        </button>

        <button
          onClick={() => {
            soundEngine.playTap();
            setActiveFilter('stap1');
          }}
          className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold whitespace-nowrap border transition-all cursor-pointer ${
            activeFilter === 'stap1'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
          }`}
        >
          🔴 Stap 1: Ontdekken (5 levels · 2 vlakjes)
        </button>

        <button
          onClick={() => {
            soundEngine.playTap();
            setActiveFilter('stap2');
          }}
          className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold whitespace-nowrap border transition-all cursor-pointer ${
            activeFilter === 'stap2'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
          }`}
        >
          🎯 Stap 2: Kleurenzoeker (6 levels · 3-8 vlakjes)
        </button>

        <button
          onClick={() => {
            soundEngine.playTap();
            setActiveFilter('spellen');
          }}
          className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold whitespace-nowrap border transition-all cursor-pointer ${
            activeFilter === 'spellen'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
          }`}
        >
          🧪 Spellen & Toveren (4 levels)
        </button>
      </div>

      {/* Progressive Step Cards */}
      <div className="space-y-3.5">
        {filteredLevels.map((lvl) => {
          const isCompleted = completedLevels.includes(lvl.id);
          // Unlock if previous level completed or if it's level 1
          const isUnlocked = lvl.id === 1 || completedLevels.includes(lvl.id - 1);

          return (
            <motion.div
              key={lvl.id}
              whileHover={isUnlocked ? { scale: 1.012, y: -2 } : {}}
              className={`rounded-3xl p-4 sm:p-5 border-2 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isCompleted
                  ? 'bg-emerald-50/80 border-emerald-200'
                  : isUnlocked
                  ? 'bg-white border-amber-200 hover:border-amber-400 hover:shadow-md'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              {/* Level icon & details */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div
                  className={`w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-inner shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                      : isUnlocked
                      ? 'bg-amber-100 text-amber-900 border-2 border-amber-300'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isUnlocked ? lvl.icon : <Lock className="w-5 h-5 text-slate-400" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                    <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wide">
                      Level {lvl.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200">
                      {lvl.choiceCount === 2
                        ? '2 grote vlakjes'
                        : `${lvl.choiceCount} compacte vlakjes`}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Voltooid! ✨
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-display truncate">
                    {lvl.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                    {lvl.subtitle}
                  </p>

                  {/* Colors in this level preview dots */}
                  {lvl.availableColors && lvl.availableColors.length > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-[10px] font-bold text-slate-600 mr-1">Kleuren:</span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {lvl.availableColors.slice(0, 8).map((cId) => (
                          <div
                            key={cId}
                            className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                            style={{ backgroundColor: COLORS[cId]?.hex || '#CBD5E1' }}
                            title={COLORS[cId]?.name || cId}
                          />
                        ))}
                        {lvl.availableColors.length > 8 && (
                          <span className="text-[10px] font-bold text-slate-600">
                            +{lvl.availableColors.length - 8}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stars & Play CTA */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-3.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                {/* 3 stars rating display */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isCompleted
                          ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Start button */}
                <button
                  disabled={!isUnlocked}
                  onClick={() => {
                    soundEngine.playTap();
                    onSelectLevel(lvl);
                  }}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : isUnlocked
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isCompleted ? 'Nog eens' : 'Spelen'}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
