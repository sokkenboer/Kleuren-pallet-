import React, { useState, useEffect } from 'react';
import { Compass, Wand2, Palette, Sparkles, BookOpen } from 'lucide-react';
import { ActiveTab, LevelConfig, Sticker } from './types/game';
import { LEVELS, INITIAL_STICKERS } from './data/colors';
import { AudioControls } from './components/AudioControls';
import { LevelMap } from './components/LevelMap';
import { LevelGame } from './components/LevelGame';
import { ColorMixerLab } from './components/ColorMixerLab';
import { ColoringStudio } from './components/ColoringStudio';
import { StickerBook } from './components/StickerBook';
import { CelebrationModal } from './components/CelebrationModal';
import { ParentModal } from './components/ParentModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { PlayStorePublishModal } from './components/PlayStorePublishModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { usePWAInstall } from './hooks/usePWAInstall';
import { soundEngine } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pad');
  const [activePlayingLevel, setActivePlayingLevel] = useState<LevelConfig | null>(null);
  const { install, isInstallable } = usePWAInstall();

  // Completed levels state
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('kleuren_completed_levels');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Stickers state
  const [stickers, setStickers] = useState<Sticker[]>(() => {
    try {
      const saved = localStorage.getItem('kleuren_stickers');
      return saved ? JSON.parse(saved) : INITIAL_STICKERS;
    } catch {
      return INITIAL_STICKERS;
    }
  });

  // Celebration modal state
  const [celebrationData, setCelebrationData] = useState<{
    isOpen: boolean;
    level: LevelConfig | null;
    unlockedSticker: Sticker | null;
  }>({
    isOpen: false,
    level: null,
    unlockedSticker: null,
  });

  // Parent guide modal state
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  // Play Store publishing guide modal state
  const [isPlayStoreModalOpen, setIsPlayStoreModalOpen] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('kleuren_completed_levels', JSON.stringify(completedLevels));
  }, [completedLevels]);

  useEffect(() => {
    localStorage.setItem('kleuren_stickers', JSON.stringify(stickers));
  }, [stickers]);

  // Handle level completion
  const handleLevelComplete = (level: LevelConfig) => {
    // Mark completed if not already
    let newlyCompleted = completedLevels;
    if (!completedLevels.includes(level.id)) {
      newlyCompleted = [...completedLevels, level.id];
      setCompletedLevels(newlyCompleted);
    }

    // Check if new sticker unlocked
    let unlocked: Sticker | null = null;
    const nextStickers = stickers.map((s) => {
      if (s.requiredLevel === level.id && !s.unlocked) {
        unlocked = { ...s, unlocked: true };
        return { ...s, unlocked: true };
      }
      return s;
    });

    if (unlocked) {
      setStickers(nextStickers);
    }

    setCelebrationData({
      isOpen: true,
      level,
      unlockedSticker: unlocked,
    });
  };

  // Continue to next level or map
  const handleContinueFromCelebration = () => {
    const currentId = celebrationData.level?.id || 1;
    setCelebrationData({ isOpen: false, level: null, unlockedSticker: null });

    const nextLevel = LEVELS.find((l) => l.id === currentId + 1);
    if (nextLevel) {
      setActivePlayingLevel(nextLevel);
    } else {
      setActivePlayingLevel(null);
      setActiveTab('pad');
    }
  };

  // Reset all progress
  const handleResetProgress = () => {
    setCompletedLevels([]);
    setStickers(INITIAL_STICKERS);
    localStorage.removeItem('kleuren_completed_levels');
    localStorage.removeItem('kleuren_stickers');
    localStorage.removeItem('kleuren_placed_stickers');
    setActivePlayingLevel(null);
    setActiveTab('pad');
    soundEngine.speak('Alle sterren en stickers zijn gereset. We beginnen weer bij stap 1!');
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'pad', label: 'Kleurpad', icon: <Compass className="w-4 h-4" /> },
    { id: 'mengen', label: 'Meng-Lab', icon: <Wand2 className="w-4 h-4" /> },
    { id: 'kleurboek', label: 'Kleurboek', icon: <Palette className="w-4 h-4" /> },
    { id: 'stickers', label: 'Stickeralbum', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 via-amber-50/30 to-orange-50/50 flex flex-col text-slate-800">
      {/* Top Bar Contract: exactly 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            soundEngine.playTap();
            setActivePlayingLevel(null);
            setActiveTab('pad');
          }}
          className="text-lg sm:text-xl font-black text-amber-950 font-display tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl" role="img" aria-label="Kleurpotlood">🎨</span>
          <span>KleurenAvontuur</span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-amber-100/50 rounded-2xl border border-amber-200">
          {navItems.map((item) => {
            const isActive = activeTab === item.id && !activePlayingLevel;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playTap();
                  setActivePlayingLevel(null);
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-white text-amber-900 shadow-sm'
                    : 'text-amber-800 hover:text-amber-950 hover:bg-amber-100/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action / Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <PWAInstallButton onOpenPlayStoreGuide={() => setIsPlayStoreModalOpen(true)} />
          <AudioControls onOpenParentModal={() => setIsParentModalOpen(true)} />
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200 px-3 py-2 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const isActive = activeTab === item.id && !activePlayingLevel;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundEngine.playTap();
                setActivePlayingLevel(null);
                setActiveTab(item.id);
              }}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                isActive ? 'text-amber-900 bg-amber-100/80' : 'text-slate-500 hover:text-amber-800'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-8">
        {activePlayingLevel ? (
          /* Level with difficulty 'mengen' is specifically the interactive Color Mixer Lab in Level Mode */
          activePlayingLevel.difficulty === 'mengen' ? (
            <ColorMixerLab
              isLevelMode={true}
              onCompleteLevel={() => handleLevelComplete(activePlayingLevel)}
              onBack={() => setActivePlayingLevel(null)}
            />
          ) : (
            <LevelGame
              level={activePlayingLevel}
              onComplete={() => handleLevelComplete(activePlayingLevel)}
              onBack={() => setActivePlayingLevel(null)}
            />
          )
        ) : (
          <>
            {activeTab === 'pad' && (
              <LevelMap
                levels={LEVELS}
                completedLevels={completedLevels}
                onSelectLevel={(lvl) => setActivePlayingLevel(lvl)}
              />
            )}

            {activeTab === 'mengen' && <ColorMixerLab isLevelMode={false} />}

            {activeTab === 'kleurboek' && <ColoringStudio />}

            {activeTab === 'stickers' && <StickerBook stickers={stickers} />}
          </>
        )}
      </main>

      {/* Celebratory reward popup */}
      <CelebrationModal
        isOpen={celebrationData.isOpen}
        levelNumber={celebrationData.level?.id || 1}
        levelTitle={celebrationData.level?.title || ''}
        unlockedSticker={celebrationData.unlockedSticker}
        onContinue={handleContinueFromCelebration}
        onGoToStickers={() => {
          setCelebrationData({ isOpen: false, level: null, unlockedSticker: null });
          setActivePlayingLevel(null);
          setActiveTab('stickers');
        }}
      />

      {/* Educational guide modal for parents & teachers */}
      <ParentModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        onResetProgress={handleResetProgress}
        onOpenPlayStore={() => setIsPlayStoreModalOpen(true)}
      />

      {/* Play Store publishing & Android installation modal */}
      <PlayStorePublishModal
        isOpen={isPlayStoreModalOpen}
        onClose={() => setIsPlayStoreModalOpen(false)}
        onDirectInstall={install}
        isInstallable={isInstallable}
      />

      {/* Non-intrusive offline status banner */}
      <OfflineIndicator />

      {/* Ontwikkelaar credits footer */}
      <footer className="py-4 px-4 text-center text-xs text-slate-500 border-t border-amber-200/60 bg-white/40 mt-auto">
        <p className="font-medium">
          KleurenAvontuur · Ontwikkeld door <span className="font-bold text-slate-800">Robert Reestman</span>
        </p>
      </footer>
    </div>
  );
}
