import React, { useState } from 'react';
import { Download, Smartphone, Share } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { soundEngine } from '../utils/audio';

interface Props {
  onOpenPlayStoreGuide: () => void;
}

export const PWAInstallButton: React.FC<Props> = ({ onOpenPlayStoreGuide }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  const handleInstallClick = async () => {
    soundEngine.playTap();
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      onOpenPlayStoreGuide();
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-sm transition-transform active:scale-95 whitespace-nowrap shrink-0"
        title="App installeren of publiceren in Play Store"
      >
        <Smartphone className="w-4 h-4" />
        <span className="hidden sm:inline">
          {isInstalled ? 'Play Store' : isInstallable ? 'Installeer App' : 'Play Store'}
        </span>
        <span className="sm:hidden">Install</span>
      </button>

      {/* iOS Safari Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3">
              <Share className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 font-display">
              Installeren op iPad of iPhone
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              1. Tik onderaan (of bovenaan) op de <strong>Deel-knop</strong> in Safari.<br />
              2. Scroll naar beneden en kies <strong>'Zet op beginscherm'</strong>.<br />
              3. Tik rechtsboven op <strong>'Voeg toe'</strong>.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Begrepen
            </button>
          </div>
        </div>
      )}
    </>
  );
};
