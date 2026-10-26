import React, { useState } from 'react';
import { X, RotateCcw, Heart, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
  onOpenPlayStore?: () => void;
}

export const ParentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onResetProgress,
  onOpenPlayStore,
}) => {
  const [currentRate, setCurrentRate] = useState(soundEngine.speechRate);

  if (!isOpen) return null;

  const handleSetRate = (rate: number) => {
    soundEngine.playTap();
    setCurrentRate(rate);
    soundEngine.setSpeechRate(rate);
    soundEngine.speak('Dit is het nieuwe rustige spreektempo.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Ouder & Opvoeder Gids
              </h2>
              <p className="text-xs text-slate-500">Over de leermethode en rustige stappen</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playTap();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Developer Attribution Card */}
        <div className="bg-gradient-to-r from-amber-100/90 via-orange-50/80 to-amber-100/90 border border-amber-300 rounded-2xl p-3.5 mb-5 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" role="img" aria-label="Ontwikkelaar">👨‍💻</span>
            <div>
              <div className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wide">
                Bedenker & Ontwikkelaar
              </div>
              <div className="text-base font-black text-slate-900 font-display">
                Robert Reestman
              </div>
            </div>
          </div>
          <span className="text-[11px] text-amber-900 font-bold bg-white/90 px-3 py-1 rounded-full border border-amber-200 shadow-xs">
            Made with ❤️ for kids
          </span>
        </div>

        <div className="space-y-5 text-sm text-slate-600">
          {/* Pedagogical approach */}
          <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/80">
            <h3 className="font-bold text-amber-900 text-base mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Leren in rustige stappen (zonder stress)
            </h3>
            <p className="leading-relaxed text-slate-700">
              Jonge kinderen leren kleuren het beste wanneer ze niet overprikkeld raken. In deze app:
            </p>
            <ul className="mt-2.5 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Geen tijdsdruk of straf:</strong> Een verkeerde keuze geeft een zachte, bemoedigende hint ("Dat is geel! Zoek je mee naar rood?") in plaats van een zoemer.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Rustige opbouw:</strong> We starten met slechts 2 primaire kleuren, breiden uit naar 3, koppelen echte voorwerpen en leren daarna het magische mengen.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Duidelijke Nederlandse stem:</strong> Elk woord wordt helder uitgesproken zodat klank en kleur natuurlijk samensmelten.</span>
              </li>
            </ul>
          </div>

          {/* Tips for parents */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Samen spelen & tips voor thuis
            </h3>
            <p className="leading-relaxed mb-3">
              Kinderen versterken hun kleurbesef door het te koppelen aan tastbare voorwerpen in huis:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-800 text-xs mb-1">Aan tafel & boodschappen</div>
                <div className="text-xs text-slate-600">"Wil je de rode appel of de gele banaan?" Benoem altijd de kleur vóór het voorwerp.</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-800 text-xs mb-1">Kleren aantrekken</div>
                <div className="text-xs text-slate-600">"Kijk, we trekken vandaag de blauwe sokken aan!" Laat je kind de kleur herhalen.</div>
              </div>
            </div>
          </div>

          {/* Stem & Warmte Instellingen */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                  <span>Stem & Klankkleur</span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">Natuurlijk & Warm</span>
                </div>
                <div className="text-xs text-slate-500">Kies de warmte en intonatie van de Nederlandse voorleesstem.</div>
              </div>
              <button
                type="button"
                onClick={() => soundEngine.speak('Hallo kleine kunstenaar! Zullen we samen kleuren ontdekken?')}
                className="text-[11px] font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1 rounded-xl transition-colors shrink-0"
              >
                🔊 Luister stem
              </button>
            </div>

            {/* Warmth Profiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {[
                { id: 'lief', label: 'Lieve Stem 🌸', desc: 'Warm, lief en zacht', rate: 0.85 },
                { id: 'zacht', label: 'Extra Zacht 🕊️', desc: 'Heel kalm en stil', rate: 0.80 },
                { id: 'warm', label: 'Warm & Vriendelijk ☀️', desc: 'Rustige cadans', rate: 0.90 },
                { id: 'speels', label: 'Vrolijk & Speels 🎈', desc: 'Actief en monter', rate: 0.94 },
              ].map((profile) => {
                const isActive = soundEngine.warmthProfile === profile.id;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playTap();
                      soundEngine.setWarmthProfile(profile.id as any);
                      setCurrentRate(soundEngine.speechRate);
                      soundEngine.speak(
                        profile.id === 'lief'
                          ? 'Hallo! Dit is de lieve, warme en zachte stem.'
                          : profile.id === 'zacht'
                          ? 'Dit is de extra zachte en rustige stem voor gevoelige kindjes.'
                          : profile.id === 'warm'
                          ? 'Dit is de warme, vriendelijke voorleesstem.'
                          : 'Dit is de vrolijke speelstem!'
                      );
                    }}
                    className={`p-2.5 rounded-xl text-left transition-all border ${
                      isActive
                        ? 'bg-rose-100/90 border-rose-400 text-rose-950 shadow-xs ring-2 ring-rose-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight">{profile.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{profile.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Available voices selection if browser provides options */}
            {soundEngine.availableVoices.length > 1 && (
              <div className="mt-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Kies een geïnstalleerde Nederlandse stem:
                </label>
                <select
                  value={soundEngine.getSelectedVoiceName()}
                  onChange={(e) => {
                    soundEngine.setVoiceByName(e.target.value);
                    soundEngine.speak('Dit is je gekozen Nederlandse stem!');
                  }}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {soundEngine.availableVoices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} {v.name.toLowerCase().includes('natural') ? '⭐ (Natuurlijk)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Play Store Publishing Guide */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-slate-900 text-xs">Publiceren in Google Play Store</div>
              <div className="text-xs text-slate-500">Volledige PWA & TWA handleiding voor Android Play Store.</div>
            </div>
            {onOpenPlayStore && (
              <button
                onClick={() => {
                  soundEngine.playTap();
                  onOpenPlayStore();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors shrink-0"
              >
                <span>🛍️ Bekijk Play Store Gids</span>
              </button>
            )}
          </div>

          {/* Reset Progress Section */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-slate-900 text-xs">Voortgang opnieuw beginnen?</div>
              <div className="text-xs text-slate-500">Handig als een broertje of zusje vanaf stap 1 wil spelen.</div>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Weet je zeker dat je alle behaalde sterren en stickers wilt resetten?')) {
                  onResetProgress();
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Voortgang Resetten
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              soundEngine.playTap();
              onClose();
            }}
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
          >
            Begrepen & Terug Naar het Spel
          </button>
        </div>
      </div>
    </div>
  );
};
