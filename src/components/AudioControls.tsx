import React, { useState } from 'react';
import { Volume2, VolumeX, Volume1, HelpCircle } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Props {
  onOpenParentModal: () => void;
}

export const AudioControls: React.FC<Props> = ({ onOpenParentModal }) => {
  const [soundOn, setSoundOn] = useState(soundEngine.soundEnabled);
  const [speechOn, setSpeechOn] = useState(soundEngine.speechEnabled);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundEngine.setSoundEnabled(next);
    if (next) soundEngine.playTap();
  };

  const toggleSpeech = () => {
    const next = !speechOn;
    setSpeechOn(next);
    soundEngine.setSpeechEnabled(next);
    if (next) {
      soundEngine.speak('De lieve stem staat aan!');
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Sound FX Toggle */}
      <button
        onClick={toggleSound}
        className={`p-2.5 rounded-xl border transition-colors ${
          soundOn
            ? 'bg-amber-100/80 border-amber-300 text-amber-900 hover:bg-amber-200'
            : 'bg-slate-100 border-slate-300 text-slate-400 hover:bg-slate-200'
        }`}
        title={soundOn ? 'Geluidseffecten aan' : 'Geluidseffecten uit'}
        aria-label="Geluidseffecten schakelaar"
      >
        {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>

      {/* Voice Toggle */}
      <button
        onClick={toggleSpeech}
        className={`p-2.5 rounded-xl border transition-colors ${
          speechOn
            ? 'bg-rose-100/80 border-rose-300 text-rose-900 hover:bg-rose-200'
            : 'bg-slate-100 border-slate-300 text-slate-400 hover:bg-slate-200'
        }`}
        title={speechOn ? 'Lieve stem aan (warm & zacht)' : 'Stem uit'}
        aria-label="Lieve stem schakelaar"
      >
        <Volume1 className={`w-5 h-5 ${speechOn ? 'text-rose-600' : 'text-slate-400'}`} />
      </button>

      {/* Parent / Pedagogy Info */}
      <button
        onClick={onOpenParentModal}
        className="p-2.5 rounded-xl bg-white/80 border border-amber-200 text-amber-800 hover:bg-amber-100/70 transition-colors"
        title="Ouder & Docent informatie"
        aria-label="Informatie voor ouders"
      >
        <HelpCircle className="w-5 h-5" />
      </button>
    </div>
  );
};
