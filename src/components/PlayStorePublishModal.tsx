import React, { useState } from 'react';
import { X, CheckCircle2, Copy, Check, ExternalLink, Download, Smartphone, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDirectInstall?: () => void;
  isInstallable?: boolean;
}

export const PlayStorePublishModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onDirectInstall,
  isInstallable,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-5m74v7kh7jln4jyaupa7af-576862082323.europe-west3.run.app';

  const handleCopyUrl = () => {
    soundEngine.playTap();
    navigator.clipboard.writeText(appUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-amber-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl shadow-sm">
              🛍️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                Publiceren in Google Play Store
              </h2>
              <p className="text-xs text-slate-500">
                Stappenplan om KleurenAvontuur als echte Android-app in de Play Store te zetten
              </p>
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

        {/* Quick App URL Box */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left w-full sm:w-auto">
            <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
              Live Web-URL van jouw app
            </div>
            <div className="text-xs font-mono text-slate-800 break-all select-all mt-0.5">
              {appUrl}
            </div>
          </div>
          <button
            onClick={handleCopyUrl}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs shadow-xs hover:bg-amber-100/60 transition-colors shrink-0"
          >
            {copiedUrl ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedUrl ? 'Gekopieerd!' : 'Kopieer URL'}</span>
          </button>
        </div>

        {/* Ready-Status Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-xs">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">PWA Manifest Gereed</span>
              192px & 512px iconen, standalone weergave.
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Offline Ondersteuning</span>
              Service worker cacht kleuren en geluiden.
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Kindvriendelijk (PEGI 3)</span>
              Geen reclames, geen in-app aankopen.
            </div>
          </div>
        </div>

        {/* Interactive Steps Accordion */}
        <div className="space-y-4 mb-6">
          {/* Step 1 */}
          <div className={`p-4 rounded-2xl border transition-all ${activeStep === 1 ? 'border-amber-400 bg-white shadow-sm' : 'border-slate-200 bg-slate-50'}`}>
            <button
              onClick={() => setActiveStep(1)}
              className="w-full flex items-center justify-between text-left font-bold text-slate-900 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs">1</span>
                Android App-pakket (.aab) genereren via PWABuilder
              </span>
              <span className="text-xs text-amber-700">Aanbevolen methode</span>
            </button>
            {activeStep === 1 && (
              <div className="mt-3 text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3">
                <p>
                  Google ondersteunt <strong>Trusted Web Activity (TWA)</strong>. Hiermee verpak je deze web-app binnen enkele minuten in een officieel <code>.aab</code> bestand voor de Play Store:
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Ga naar <a href="https://www.pwabuilder.com" target="_blank" rel="noopener noreferrer" className="text-sky-600 underline font-semibold inline-flex items-center gap-1">PWABuilder.com <ExternalLink className="w-3 h-3" /></a></li>
                  <li>Plak de live URL van deze app hierboven in het invoerveld.</li>
                  <li>PWABuilder controleert de app (deze scoort 100% op PWA-eisen).</li>
                  <li>Klik op <strong>"Package for Stores"</strong> &rarr; <strong>"Android"</strong>.</li>
                  <li>Download het gegenereerde <strong>signed .aab bestand</strong> (Android App Bundle).</li>
                </ol>
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div className={`p-4 rounded-2xl border transition-all ${activeStep === 2 ? 'border-amber-400 bg-white shadow-sm' : 'border-slate-200 bg-slate-50'}`}>
            <button
              onClick={() => setActiveStep(2)}
              className="w-full flex items-center justify-between text-left font-bold text-slate-900 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs">2</span>
                Google Play Developer Console Account
              </span>
            </button>
            {activeStep === 2 && (
              <div className="mt-3 text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3">
                <p>
                  Om een app in de Play Store te publiceren heb je een Google Play Developer-account nodig:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>Ga naar <a href="https://play.google.com/console" target="_blank" rel="noopener noreferrer" className="text-sky-600 underline font-semibold inline-flex items-center gap-1">play.google.com/console <ExternalLink className="w-3 h-3" /></a></li>
                  <li>Eenmalige registratiekost bij Google: $25 (geldt voor onbeperkt aantal apps).</li>
                  <li>Ontwikkelaar / Developer accountnaam: <strong>Robert Reestman</strong>.</li>
                  <li>Klik op <strong>"App maken"</strong> (App naam: <em>KleurenAvontuur</em>, Ontwikkelaar: <em>Robert Reestman</em>, Taal: <em>Nederlands</em>, Type: <em>App</em>, Gratis).</li>
                </ul>
              </div>
            )}
          </div>

          {/* Step 3 */}
          <div className={`p-4 rounded-2xl border transition-all ${activeStep === 3 ? 'border-amber-400 bg-white shadow-sm' : 'border-slate-200 bg-slate-50'}`}>
            <button
              onClick={() => setActiveStep(3)}
              className="w-full flex items-center justify-between text-left font-bold text-slate-900 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs">3</span>
                Winkelvermelding & Gezinsbeleid (Kinderen)
              </span>
            </button>
            {activeStep === 3 && (
              <div className="mt-3 text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3">
                <p>
                  Omdat KleurenAvontuur gemaakt is voor peuters en kleuters, gelden de kindvriendelijke richtlijnen van Google:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li><strong>Doelgroep:</strong> Vink aan: <em>Kinderen van 5 jaar en jonger</em> en <em>6-8 jaar</em> (Designed for Families programma).</li>
                  <li><strong>Advertenties:</strong> Kies <em>"Nee, mijn app bevat geen advertenties"</em>.</li>
                  <li><strong>Leeftijdsclassificatie (IARC):</strong> Vul de vragenlijst in &rarr; levert automatisch PEGI 3 / Alle Leeftijden op.</li>
                  <li><strong>Screenshots:</strong> Maak 2 tot 4 screenshots van het Kleurpad, Meng-Lab en Kleurboek.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Step 4 */}
          <div className={`p-4 rounded-2xl border transition-all ${activeStep === 4 ? 'border-amber-400 bg-white shadow-sm' : 'border-slate-200 bg-slate-50'}`}>
            <button
              onClick={() => setActiveStep(4)}
              className="w-full flex items-center justify-between text-left font-bold text-slate-900 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs">4</span>
                Upload .aab en Live zetten!
              </span>
            </button>
            {activeStep === 4 && (
              <div className="mt-3 text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3">
                <p>
                  Upload in de Google Play Console bij <em>Productie &rarr; Nieuwe release maken</em> het <code>.aab</code> bestand dat je bij stap 1 hebt gedownload.
                </p>
                <p>
                  Na verificatie door Google (duurt doorgaans 1 à 3 werkdagen) staat KleurenAvontuur wereldwijd te downloaden in de Google Play Store!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Direct Local Install Feature */}
        <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div>
            <div className="font-bold text-sky-950 text-sm flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-sky-600" />
              Direct op deze telefoon of tablet installeren?
            </div>
            <p className="text-xs text-sky-800 mt-0.5">
              Je hoeft niet op de Play Store te wachten: installeer de app nu direct op je startscherm als volwaardige app.
            </p>
          </div>
          {onDirectInstall && isInstallable && (
            <button
              onClick={() => {
                soundEngine.playTap();
                onDirectInstall();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-transform active:scale-95 shrink-0"
            >
              Nu Installeren 📲
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center">
          <button
            onClick={() => {
              soundEngine.playTap();
              onClose();
            }}
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
          >
            Begrepen & Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};
