import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2, Sparkles, Check, HelpCircle, Lightbulb } from 'lucide-react';
import { LevelConfig, ColorId } from '../types/game';
import { COLORS } from '../data/colors';
import { ColorObjectSvg } from './ColorObjectSvg';
import { soundEngine } from '../utils/audio';

interface Props {
  level: LevelConfig;
  onComplete: () => void;
  onBack: () => void;
}

interface Question {
  type: 'color_pick' | 'object_pick' | 'pattern';
  targetColor: ColorId;
  promptText: string;
  speakText: string;
  options: {
    colorId: ColorId;
    objectName?: string;
    svgPath?: string;
  }[];
  patternSequence?: ColorId[]; // for level 6
}

export const LevelGame: React.FC<Props> = ({ level, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedWrongId, setSelectedWrongId] = useState<string | null>(null);
  const [selectedCorrectId, setSelectedCorrectId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Inactivity hint state (appears after 10s of inactivity)
  const [showHintButton, setShowHintButton] = useState(false);
  const [isHintActive, setIsHintActive] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sorting mode state (specifically for Level difficulty 'sorteren')
  const isSortingLevel = level.difficulty === 'sorteren';
  const [sortItems, setSortItems] = useState<{ id: string; colorId: ColorId; name: string; svgPath: string }[]>([]);
  const [selectedSortItem, setSelectedSortItem] = useState<{ id: string; colorId: ColorId; name: string; svgPath: string } | null>(null);
  const [sortedCount, setSortedCount] = useState(0);

  // User-controllable tile sizing: 'compact' (smaller tiles) vs 'normaal'
  const [tileSize, setTileSize] = useState<'compact' | 'normaal'>(() => {
    try {
      const saved = localStorage.getItem('kleuren_tile_size');
      if (saved === 'compact' || saved === 'normaal') return saved;
    } catch {
      // ignore
    }
    return 'compact'; // default to compact for crisp, screen-fitting cards
  });

  const toggleTileSize = () => {
    soundEngine.playTap();
    const next = tileSize === 'compact' ? 'normaal' : 'compact';
    setTileSize(next);
    try {
      localStorage.setItem('kleuren_tile_size', next);
    } catch {
      // ignore
    }
  };

  // Reset inactivity timer (10 seconds)
  const resetInactivityTimer = useCallback(() => {
    setShowHintButton(false);
    setIsHintActive(false);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      setShowHintButton(true);
    }, 10000);
  }, []);

  // Trigger hint when child taps the hint button
  const handleTriggerHint = () => {
    soundEngine.playTap();
    setIsHintActive(true);
    if (isSortingLevel) {
      if (selectedSortItem) {
        const targetColorName = COLORS[selectedSortItem.colorId].name;
        soundEngine.speak(`Kijk naar het ${targetColorName}e mandje dat nu zachtjes oplicht!`);
      } else if (sortItems.length > 0) {
        const first = sortItems[0];
        soundEngine.speak(`Tik eerst op de ${first.name} die oplicht!`);
      }
    } else if (currentQ) {
      const targetName = COLORS[currentQ.targetColor].name;
      soundEngine.speak(`Kijk eens goed naar de kaart die oplicht! Dat is ${targetName}.`);
    }
  };

  // Generate randomized questions for this level
  const generateQuestions = useCallback((): Question[] => {
    const list: Question[] = [];
    const colorIds = [...level.availableColors];

    for (let q = 0; q < level.questionCount; q++) {
      // Pick target color
      const target = colorIds[Math.floor(Math.random() * colorIds.length)];
      const targetObj = COLORS[target];

      // Pick distractor colors
      const distractors = colorIds.filter((c) => c !== target);
      // shuffle distractors
      const shuffledDistractors = distractors.sort(() => Math.random() - 0.5);
      const chosenDistractors = shuffledDistractors.slice(0, level.choiceCount - 1);

      const allColorChoices = [target, ...chosenDistractors].sort(() => Math.random() - 0.5);

      if (level.difficulty === 'objecten') {
        // Level 3: Identify real world object matching color
        const targetExample = targetObj.examples[Math.floor(Math.random() * targetObj.examples.length)];
        const optionList = allColorChoices.map((c) => {
          if (c === target) {
            return {
              colorId: c,
              objectName: targetExample.name,
              svgPath: targetExample.svgPath,
            };
          } else {
            const ex = COLORS[c].examples[Math.floor(Math.random() * COLORS[c].examples.length)];
            return {
              colorId: c,
              objectName: ex.name,
              svgPath: ex.svgPath,
            };
          }
        });

        list.push({
          type: 'object_pick',
          targetColor: target,
          promptText: `Welk voorwerp is ${targetObj.name.toUpperCase()}?`,
          speakText: `Welk voorwerp is ${targetObj.name}? Tik op de ${targetObj.name}e ${targetExample.name}!`,
          options: optionList,
        });
      } else if (level.difficulty === 'patronen') {
        // Level 6: Color patterns
        const patternColors = [colorIds[0], colorIds[1]];
        // pattern: A, B, A, ? -> Target is B
        const seq: ColorId[] = [patternColors[0], patternColors[1], patternColors[0]];
        const expectedNext = patternColors[1];

        const patternChoices = [expectedNext, ...colorIds.filter((c) => c !== expectedNext).slice(0, 3)].sort(
          () => Math.random() - 0.5
        );

        list.push({
          type: 'pattern',
          targetColor: expectedNext,
          promptText: `Welke kleur komt er nu in de rij?`,
          speakText: `Welke kleur hoort er op de lege plek?`,
          patternSequence: seq,
          options: patternChoices.map((c) => ({ colorId: c })),
        });
      } else {
        // Level 1 & 2: Simple direct color choice
        list.push({
          type: 'color_pick',
          targetColor: target,
          promptText: `Waar is ${targetObj.name.toUpperCase()}?`,
          speakText: `Waar is ${targetObj.name}? Tik op ${targetObj.name}!`,
          options: allColorChoices.map((c) => ({ colorId: c })),
        });
      }
    }

    return list;
  }, [level]);

  // Set up sorting items for Level 5
  const setupSortingLevel = useCallback(() => {
    const items = [
      { id: 'item-1', colorId: 'rood' as ColorId, name: 'Aardbei', svgPath: 'strawberry' },
      { id: 'item-2', colorId: 'geel' as ColorId, name: 'Banaan', svgPath: 'banana' },
      { id: 'item-3', colorId: 'blauw' as ColorId, name: 'Walvis', svgPath: 'whale' },
      { id: 'item-4', colorId: 'groen' as ColorId, name: 'Kikker', svgPath: 'frog' },
    ];
    setSortItems(items.sort(() => Math.random() - 0.5));
    setSortedCount(0);
    setSelectedSortItem(null);
    soundEngine.speak('Sorteer alle vriendjes naar het mandje met dezelfde kleur! Tik eerst op een voorwerp.');
  }, []);

  useEffect(() => {
    if (isSortingLevel) {
      setupSortingLevel();
    } else {
      const qList = generateQuestions();
      setQuestions(qList);
      setCurrentQuestionIndex(0);
      setIsProcessing(false);

      if (qList.length > 0) {
        // Initial speech prompt
        const timer = setTimeout(() => {
          soundEngine.speak(qList[0].speakText);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isSortingLevel, setupSortingLevel, generateQuestions]);

  // Start / reset inactivity timer on question changes
  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [currentQuestionIndex, isSortingLevel, sortedCount, resetInactivityTimer]);

  const currentQ = questions[currentQuestionIndex];

  // Speak current question
  const repeatSpeech = () => {
    soundEngine.playTap();
    resetInactivityTimer();
    if (isSortingLevel) {
      soundEngine.speak('Tik op een voorwerp en daarna op het mandje met dezelfde kleur!');
    } else if (currentQ) {
      soundEngine.speak(currentQ.speakText);
    }
  };

  // Handle standard option choice
  const handleSelectOption = (colorId: ColorId, optionIndex: number) => {
    if (isProcessing || !currentQ) return;
    resetInactivityTimer();

    const isCorrect = colorId === currentQ.targetColor;
    const optionKey = `${colorId}-${optionIndex}`;

    if (isCorrect) {
      setIsProcessing(true);
      setSelectedCorrectId(optionKey);
      soundEngine.playSuccess();

      const compliments = ['Super goed!', 'Geweldig!', 'Wat knap!', 'Dat klopt!'];
      const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
      const targetName = COLORS[colorId].name;
      soundEngine.speak(`${randomCompliment} Dat is inderdaad ${targetName}!`);

      setTimeout(() => {
        setSelectedCorrectId(null);
        setIsProcessing(false);

        if (currentQuestionIndex + 1 < questions.length) {
          const nextIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextIndex);
          soundEngine.speak(questions[nextIndex].speakText);
        } else {
          onComplete();
        }
      }, 1200);
    } else {
      // Gentle encouragement, never harsh
      setSelectedWrongId(optionKey);
      soundEngine.playGentleEncouragement();

      const chosenName = COLORS[colorId].name;
      const targetName = COLORS[currentQ.targetColor].name;
      soundEngine.speak(`Dat is ${chosenName}! Zoek je mee naar ${targetName}?`);

      setTimeout(() => {
        setSelectedWrongId(null);
      }, 900);
    }
  };

  // Sorting level interactions
  const handleSortItemClick = (item: { id: string; colorId: ColorId; name: string; svgPath: string }) => {
    soundEngine.playTap();
    resetInactivityTimer();
    setSelectedSortItem(item);
    soundEngine.speak(`Dit is een ${COLORS[item.colorId].name}e ${item.name}! In welk mandje hoort deze?`);
  };

  const handleBasketClick = (basketColor: ColorId) => {
    resetInactivityTimer();
    if (!selectedSortItem) {
      soundEngine.speak('Tik eerst op een van de voorwerpen hierboven!');
      return;
    }

    if (selectedSortItem.colorId === basketColor) {
      // Correct basket!
      soundEngine.playSuccess();
      soundEngine.speak(`Ja! De ${selectedSortItem.name} hoort in het ${COLORS[basketColor].name}e mandje!`);
      const nextRemaining = sortItems.filter((i) => i.id !== selectedSortItem.id);
      setSortItems(nextRemaining);
      setSelectedSortItem(null);
      const newSorted = sortedCount + 1;
      setSortedCount(newSorted);

      if (nextRemaining.length === 0) {
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    } else {
      soundEngine.playGentleEncouragement();
      soundEngine.speak(`Dat mandje is ${COLORS[basketColor].name}. Zoek het ${COLORS[selectedSortItem.colorId].name}e mandje!`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col min-h-[80vh] justify-between">
      {/* Top Bar for Game */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          onClick={() => {
            soundEngine.playTap();
            soundEngine.stopSpeaking();
            onBack();
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-amber-200 text-amber-900 hover:bg-amber-50 font-bold text-sm shadow-sm transition-transform active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Terug</span>
        </button>

        {/* Progress indicators */}
        <div className="flex items-center gap-1.5">
          {!isSortingLevel &&
            questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  idx < currentQuestionIndex
                    ? 'bg-emerald-500 ring-2 ring-emerald-200 scale-105'
                    : idx === currentQuestionIndex
                    ? 'bg-amber-500 ring-4 ring-amber-200 scale-125'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          {isSortingLevel && (
            <div className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
              {sortedCount} van 4 gesorteerd
            </div>
          )}
        </div>

        {/* Action controls: Tile size & Speech */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Tile size toggle button */}
          <button
            onClick={toggleTileSize}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs font-bold border shadow-xs transition-transform active:scale-95 cursor-pointer ${
              tileSize === 'compact'
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-300'
            }`}
            title="Wissel het formaat van de vlakjes (klein of groot)"
          >
            <span>{tileSize === 'compact' ? '🔲 Klein' : '⬛ Groot'}</span>
          </button>

          {/* Listen again button */}
          <button
            onClick={repeatSpeech}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-xs sm:text-sm border border-sky-200 shadow-sm transition-transform active:scale-95 cursor-pointer"
            title="Luister nog eens naar de vraag"
          >
            <Volume2 className="w-4 h-4 text-sky-600 animate-pulse" />
            <span className="hidden sm:inline">Luister</span>
          </button>
        </div>
      </div>

      {/* Main question card / stage */}
      {isSortingLevel ? (
        /* SORTING LEVEL STAGE */
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Instruction banner */}
          <div className="text-center mb-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display">
              Sorteer de Kleuren!
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Tik eerst op een voorwerp, en daarna op het juiste gekleurde mandje.
            </p>
          </div>

          {/* Inactivity Hint Button in Sorting Level */}
          <AnimatePresence>
            {showHintButton && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="my-2 flex justify-center"
              >
                <button
                  type="button"
                  onClick={handleTriggerHint}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 hover:from-amber-300 hover:to-amber-300 border-2 border-amber-400 text-amber-950 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 animate-gentle-pulse cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600 animate-bounce" />
                  <span>Hulpje nodig? Tik hier voor een hint! 💡</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Items waiting to be sorted */}
          <div className="bg-amber-100/50 border-2 border-dashed border-amber-300 rounded-3xl p-4 min-h-[140px] flex items-center justify-center gap-4 flex-wrap mb-6">
            <AnimatePresence>
              {sortItems.map((item, idx) => {
                const isSelected = selectedSortItem?.id === item.id;
                const isHintedItem = isHintActive && !selectedSortItem && idx === 0;
                return (
                  <motion.button
                    key={item.id}
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: isSelected ? 1.15 : isHintedItem ? 1.08 : 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSortItemClick(item)}
                    className={`relative flex flex-col items-center p-3 rounded-2xl bg-white transition-all shadow-md cursor-pointer ${
                      isSelected
                        ? 'ring-4 ring-amber-400 border-2 border-amber-500 shadow-xl -translate-y-1'
                        : isHintedItem
                        ? 'ring-4 ring-amber-400 ring-offset-2 border-amber-300 shadow-lg animate-gentle-pulse'
                        : 'border border-slate-200'
                    }`}
                  >
                    {isHintedItem && (
                      <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase shadow-xs animate-bounce">
                        Kies mij! ✨
                      </span>
                    )}
                    <ColorObjectSvg name={item.svgPath} className="w-16 h-16 sm:w-20 sm:h-20" colorHex={COLORS[item.colorId].hex} />
                    <span className="text-xs font-bold text-slate-700 mt-1">{item.name}</span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
            {sortItems.length === 0 && (
              <div className="text-emerald-700 font-bold text-base flex items-center gap-2">
                <Check className="w-6 h-6 text-emerald-600" />
                Alles is netjes gesorteerd!
              </div>
            )}
          </div>

          {/* Baskets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {(['rood', 'blauw', 'geel', 'groen'] as ColorId[]).map((cId) => {
              const c = COLORS[cId];
              const isMatchingBasket = isHintActive && selectedSortItem?.colorId === cId;
              return (
                <button
                  key={cId}
                  onClick={() => handleBasketClick(cId)}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer ${
                    isMatchingBasket
                      ? 'ring-6 ring-amber-400 ring-offset-4 scale-105 shadow-xl shadow-amber-300/70 animate-gentle-pulse'
                      : ''
                  }`}
                  style={{
                    backgroundColor: `${c.hex}15`,
                    borderColor: c.hex,
                  }}
                >
                  <div className="text-3xl sm:text-4xl mb-1">🧺</div>
                  <span
                    className="text-base sm:text-lg font-extrabold uppercase tracking-wide"
                    style={{ color: c.id === 'geel' ? '#B45309' : c.hex }}
                  >
                    {c.name}
                  </span>
                  {isMatchingBasket && (
                    <span className="text-[11px] font-black text-amber-950 bg-amber-300 px-2.5 py-0.5 rounded-full mt-1 animate-bounce shadow-xs">
                      Hierin! ✨
                    </span>
                  )}
                  <div
                    className="w-8 h-8 rounded-full mt-2 shadow-inner border-2 border-white"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* STANDARD QUESTIONS (Level 1, 2, 3, etc.) */
        <div className="flex-1 flex flex-col justify-center items-center py-2 sm:py-4">
          {currentQ && (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl text-center"
            >
              {/* Question text with friendly speaker icon */}
              <div className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/90 border-2 border-amber-200 shadow-sm mb-3 sm:mb-4">
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse shrink-0" />
                <h2 className="text-lg sm:text-2xl font-extrabold text-amber-950 font-display">
                  {currentQ.promptText}
                </h2>
              </div>

              {/* Inactivity Hint Button (Appears after 10s of inactivity) */}
              <AnimatePresence>
                {showHintButton && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mb-4 flex justify-center"
                  >
                    <button
                      type="button"
                      onClick={handleTriggerHint}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 hover:from-amber-300 hover:to-amber-300 border-2 border-amber-400 text-amber-950 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 animate-gentle-pulse cursor-pointer"
                    >
                      <Lightbulb className="w-5 h-5 text-amber-600 animate-bounce" />
                      <span>Hulpje nodig? Tik hier voor een hint! 💡</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pattern display for pattern levels */}
              {currentQ.type === 'pattern' && currentQ.patternSequence && (
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 bg-white/80 p-3 sm:p-4 rounded-3xl border border-amber-200 shadow-sm max-w-md mx-auto">
                  {currentQ.patternSequence.map((cId, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl shadow-md border-3 border-white flex items-center justify-center"
                      style={{ backgroundColor: COLORS[cId].hex }}
                    />
                  ))}
                  <div className="text-xl font-bold text-slate-400">➔</div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border-4 border-dashed border-amber-400 bg-amber-50 flex items-center justify-center text-amber-600 font-extrabold text-2xl animate-pulse">
                    ?
                  </div>
                </div>
              )}

              {/* Choices Grid with dynamic sizing */}
              <div
                className={`grid justify-center mx-auto ${
                  currentQ.options.length === 2
                    ? 'grid-cols-2 max-w-md gap-3 sm:gap-5'
                    : currentQ.options.length === 3
                    ? 'grid-cols-3 max-w-xl gap-2 sm:gap-3.5'
                    : currentQ.options.length === 4
                    ? 'grid-cols-2 sm:grid-cols-4 max-w-2xl gap-2.5 sm:gap-3.5'
                    : currentQ.options.length === 6
                    ? 'grid-cols-3 sm:grid-cols-6 max-w-3xl gap-2 sm:gap-2.5'
                    : 'grid-cols-4 sm:grid-cols-4 md:grid-cols-8 max-w-4xl gap-1.5 sm:gap-2'
                }`}
              >
                {currentQ.options.map((option, idx) => {
                  const colorObj = COLORS[option.colorId];
                  const optionKey = `${option.colorId}-${idx}`;
                  const isCorrect = selectedCorrectId === optionKey;
                  const isWrong = selectedWrongId === optionKey;
                  const isCorrectAnswer = option.colorId === currentQ.targetColor;
                  const isHintHighlight = isHintActive && isCorrectAnswer;
                  const optCount = currentQ.options.length;
                  const isCompact = tileSize === 'compact';

                  // Dynamic card height
                  let cardMinHeightClass = 'min-h-[140px] sm:min-h-[170px] p-4 sm:p-5';
                  if (isCompact) {
                    if (optCount === 2) cardMinHeightClass = 'min-h-[110px] sm:min-h-[135px] p-3 sm:p-4';
                    else if (optCount === 3) cardMinHeightClass = 'min-h-[95px] sm:min-h-[115px] p-2.5 sm:p-3';
                    else if (optCount === 4) cardMinHeightClass = 'min-h-[85px] sm:min-h-[105px] p-2 sm:p-2.5';
                    else if (optCount === 6) cardMinHeightClass = 'min-h-[75px] sm:min-h-[90px] p-1.5 sm:p-2';
                    else cardMinHeightClass = 'min-h-[65px] sm:min-h-[80px] p-1.5';
                  } else {
                    if (optCount === 4) cardMinHeightClass = 'min-h-[105px] sm:min-h-[125px] p-3 sm:p-4';
                    else if (optCount === 6) cardMinHeightClass = 'min-h-[90px] sm:min-h-[110px] p-2.5 sm:p-3';
                    else if (optCount >= 8) cardMinHeightClass = 'min-h-[75px] sm:min-h-[95px] p-2';
                  }

                  return (
                    <motion.button
                      key={optionKey}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.94 }}
                      animate={
                        isCorrect
                          ? { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }
                          : isWrong
                          ? { x: [-8, 8, -6, 6, 0] }
                          : isHintHighlight
                          ? { scale: [1, 1.06, 1] }
                          : {}
                      }
                      transition={{ duration: isHintHighlight ? 1.5 : 0.4, repeat: isHintHighlight ? Infinity : 0 }}
                      onClick={() => handleSelectOption(option.colorId, idx)}
                      className={`relative flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl transition-all shadow-md select-none cursor-pointer ${
                        currentQ.type === 'object_pick'
                          ? 'bg-white border-3 sm:border-4 hover:border-amber-400 p-3'
                          : cardMinHeightClass
                      } ${
                        isCorrect
                          ? 'ring-6 ring-emerald-400 ring-offset-2 sm:ring-offset-4'
                          : isWrong
                          ? 'ring-4 ring-rose-400'
                          : isHintHighlight
                          ? 'ring-4 ring-amber-400 ring-offset-2 shadow-xl shadow-amber-300/60 scale-105'
                          : ''
                      }`}
                      style={{
                        backgroundColor: currentQ.type === 'object_pick' ? '#FFFFFF' : colorObj.hex,
                        borderColor:
                          currentQ.type === 'object_pick'
                            ? isHintHighlight
                              ? '#F59E0B'
                              : colorObj.hex
                            : isWrong
                            ? '#F43F5E'
                            : isHintHighlight
                            ? '#F59E0B'
                            : '#FFFFFF',
                      }}
                    >
                      {/* Subtle hint badge for young children */}
                      {isHintHighlight && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-3 -right-1 sm:-top-3.5 sm:-right-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-400 border-2 border-white text-amber-950 text-[10px] sm:text-[11px] font-black uppercase shadow-lg flex items-center gap-1 z-20 animate-bounce"
                        >
                          <Sparkles className="w-3 h-3 fill-amber-950" />
                          <span>Hier! ✨</span>
                        </motion.div>
                      )}

                      {currentQ.type === 'object_pick' ? (
                        <>
                          <div className="p-1 rounded-2xl mb-1">
                            <ColorObjectSvg
                              name={option.svgPath || 'strawberry'}
                              className={isCompact ? 'w-14 h-14 sm:w-18 sm:h-18' : 'w-18 h-18 sm:w-24 sm:h-24'}
                              colorHex={colorObj.hex}
                            />
                          </div>
                          <span className="text-sm sm:text-base font-extrabold text-slate-800">
                            {option.objectName}
                          </span>
                          <span
                            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-0.5 px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${colorObj.hex}25`,
                              color: colorObj.id === 'geel' ? '#B45309' : colorObj.hex,
                            }}
                          >
                            {colorObj.name}
                          </span>
                        </>
                      ) : (
                        <>
                          {/* Inner color badge / ring */}
                          <div
                            className={`rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-inner ${
                              isCompact
                                ? optCount <= 3
                                  ? 'w-8 h-8 sm:w-10 sm:h-10 mb-1'
                                  : optCount <= 6
                                  ? 'w-6 h-6 sm:w-7 sm:h-7 mb-0.5'
                                  : 'w-5 h-5 mb-0.5'
                                : optCount <= 3
                                ? 'w-12 h-12 sm:w-16 sm:h-16 mb-2'
                                : 'w-8 h-8 sm:w-10 sm:h-10 mb-1'
                            }`}
                          >
                            <div className="w-1/2 h-1/2 rounded-full bg-white/40" />
                          </div>
                          <span
                            className={`uppercase tracking-wider drop-shadow-xs ${
                              isCompact
                                ? optCount === 2
                                  ? 'text-sm sm:text-base font-black'
                                  : optCount <= 4
                                  ? 'text-xs sm:text-sm font-black'
                                  : optCount <= 6
                                  ? 'text-[11px] sm:text-xs font-black'
                                  : 'text-[10px] font-black'
                                : optCount === 2
                                ? 'text-lg sm:text-xl font-black'
                                : optCount <= 4
                                ? 'text-sm sm:text-base font-black'
                                : 'text-xs font-black'
                            }`}
                            style={{ color: colorObj.textColor }}
                          >
                            {colorObj.name}
                          </span>
                        </>
                      )}

                      {/* Correct Feedback Icon */}
                      {isCorrect && (
                        <div className="absolute inset-0 bg-emerald-500/85 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white backdrop-blur-xs">
                          <Check className="w-10 h-10 sm:w-14 sm:h-14 stroke-[3] animate-bounce" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Gentle helper advice at bottom */}
      <div className="text-center text-xs text-slate-500 py-2">
        <span>Rustig spelen · Neem alle tijd · </span>
        <button
          onClick={repeatSpeech}
          className="text-sky-600 underline font-semibold hover:text-sky-700"
        >
          Herhaal vraag met stem
        </button>
      </div>
    </div>
  );
};
