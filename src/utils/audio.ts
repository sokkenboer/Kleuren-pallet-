/**
 * Sound & Dutch Speech Synthesis engine
 * Specially designed for a sweet, warm, soft, and gentle children's voice ("Lieve Stem").
 * Completely eliminates robotic, deep, or stiff delivery by:
 * 1. Prioritizing the sweetest Dutch female storybook voices (Fenna, Claire, Fleur, Colette, Ellen).
 * 2. Heavy penalties for harsh or deep male synthesizers (Maarten, Bart, Xander).
 * 3. A melodic sweet pitch (1.18) and gentle, relaxed cadence (0.85) with softened volume (0.85).
 * 4. A gentle music-box celesta/harp harmonic cushion before speech.
 * 5. Affectionate, caring Dutch phrasing suited for young children.
 */

export type VoiceWarmthProfile = 'lief' | 'zacht' | 'warm' | 'speels';

class SoundEngine {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  public speechEnabled: boolean = true;
  public speechRate: number = 0.85; // Sweet, calm, gentle cadence
  public speechPitch: number = 1.18; // Sweet, bright, warm storybook voice
  public speechVolume: number = 0.88; // Soft and gentle for toddler ears
  public warmthProfile: VoiceWarmthProfile = 'lief';
  private dutchVoice: SpeechSynthesisVoice | null = null;
  public availableVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const savedSound = localStorage.getItem('kleuren_sound_enabled');
      const savedSpeech = localStorage.getItem('kleuren_speech_enabled');
      const savedRate = localStorage.getItem('kleuren_speech_rate');
      const savedPitch = localStorage.getItem('kleuren_speech_pitch');
      const savedProfile = localStorage.getItem('kleuren_warmth_profile');
      const savedVoiceName = localStorage.getItem('kleuren_voice_name');

      if (savedSound !== null) this.soundEnabled = savedSound === 'true';
      if (savedSpeech !== null) this.speechEnabled = savedSpeech === 'true';
      if (savedRate !== null) this.speechRate = parseFloat(savedRate);
      if (savedPitch !== null) this.speechPitch = parseFloat(savedPitch);
      if (savedProfile) {
        this.warmthProfile = savedProfile as VoiceWarmthProfile;
      } else {
        // Default to the new 'lief' profile
        this.warmthProfile = 'lief';
        this.speechRate = 0.85;
        this.speechPitch = 1.18;
      }

      this.initVoices(savedVoiceName);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoices(localStorage.getItem('kleuren_voice_name'));
        };
      }
    }
  }

  public initVoices(preferredVoiceName?: string | null) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    this.availableVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('nl'));

    if (preferredVoiceName) {
      const match = this.availableVoices.find((v) => v.name === preferredVoiceName);
      if (match) {
        this.dutchVoice = match;
        return;
      }
    }

    // Rank Dutch voices for warmth, softness, sweetness, and gentle female storybook qualities
    const rankVoice = (v: SpeechSynthesisVoice): number => {
      let score = 0;
      const name = v.name.toLowerCase();
      const lang = v.lang.toLowerCase();

      if (lang === 'nl-nl' || lang === 'nl_nl') score += 20;
      else if (lang.startsWith('nl')) score += 10;

      // Microsoft Edge Natural Voices:
      // Fenna is widely praised as the sweetest, softest, most gentle Dutch children's voice
      if (name.includes('fenna')) score += 250;
      if (name.includes('colette')) score += 180;

      // Apple Enhanced / Siri female voices
      if (name.includes('claire')) score += 220; // Gentle French/Dutch female timber
      if (name.includes('fleur')) score += 220;  // Sweet, friendly female voice
      if (name.includes('ellen')) score += 200;  // Soft, warm female voice

      // Google Neural & Android voices
      if (name.includes('natural') && !name.includes('maarten') && !name.includes('bart')) score += 90;
      if (name.includes('neural') && !name.includes('maarten') && !name.includes('bart')) score += 90;
      if (name.includes('google') || name.includes('dfa-network') || name.includes('ioa-network')) score += 80;

      // Heavy penalties for deep, stern, or male voices to guarantee a sweet, gentle tone
      if (name.includes('maarten')) score -= 180;
      if (name.includes('bart')) score -= 180;
      if (name.includes('xander')) score -= 140;
      if (name.includes('frank')) score -= 180;

      // Penalize robotic, compact, or espeak voices
      if (name.includes('compact')) score -= 100;
      if (name.includes('espeak')) score -= 120;
      if (name.includes('desktop') && !name.includes('natural')) score -= 60;

      return score;
    };

    const sorted = [...this.availableVoices].sort((a, b) => rankVoice(b) - rankVoice(a));
    this.dutchVoice = sorted[0] || null;
  }

  public setVoiceByName(voiceName: string) {
    const match = this.availableVoices.find((v) => v.name === voiceName);
    if (match) {
      this.dutchVoice = match;
      if (typeof window !== 'undefined') {
        localStorage.setItem('kleuren_voice_name', voiceName);
      }
    }
  }

  public getSelectedVoiceName(): string {
    return this.dutchVoice?.name || '';
  }

  public setWarmthProfile(profile: VoiceWarmthProfile) {
    this.warmthProfile = profile;
    if (profile === 'lief') {
      this.speechRate = 0.85; // Relaxed, soft, peaceful
      this.speechPitch = 1.18; // Sweet, bright, gentle storybook voice
      this.speechVolume = 0.88;
    } else if (profile === 'zacht') {
      this.speechRate = 0.80; // Extra quiet and calm
      this.speechPitch = 1.12;
      this.speechVolume = 0.80;
    } else if (profile === 'warm') {
      this.speechRate = 0.90;
      this.speechPitch = 1.08;
      this.speechVolume = 0.90;
    } else if (profile === 'speels') {
      this.speechRate = 0.94;
      this.speechPitch = 1.20;
      this.speechVolume = 0.92;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('kleuren_warmth_profile', profile);
      localStorage.setItem('kleuren_speech_rate', String(this.speechRate));
      localStorage.setItem('kleuren_speech_pitch', String(this.speechPitch));
    }
  }

  public setSpeechRate(rate: number) {
    this.speechRate = rate;
    if (typeof window !== 'undefined') {
      localStorage.setItem('kleuren_speech_rate', String(rate));
    }
  }

  public setSpeechPitch(pitch: number) {
    this.speechPitch = pitch;
    if (typeof window !== 'undefined') {
      localStorage.setItem('kleuren_speech_pitch', String(pitch));
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setSoundEnabled(val: boolean) {
    this.soundEnabled = val;
    localStorage.setItem('kleuren_sound_enabled', String(val));
  }

  public setSpeechEnabled(val: boolean) {
    this.speechEnabled = val;
    localStorage.setItem('kleuren_speech_enabled', String(val));
  }

  /**
   * Sweet, angelic music-box celesta/harp chord arpeggio
   * Creates a gentle, warm storybook ambiance before the sweet voice speaks
   */
  public playSweetCelesta() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Soft celesta arpeggio (C5: 523.25, G5: 783.99, E6: 1318.5)
      const celestaNotes = [523.25, 783.99, 1318.5];
      celestaNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.04, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.46);
      });
    } catch {
      // Audio fallback
    }
  }

  /**
   * Gentle bubble tap sound
   */
  public playTap() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio fallback silent
    }
  }

  /**
   * Sparkle sound when painting or discovering
   */
  public playSparkle() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [659.25, 783.99, 987.77, 1318.5]; // E5, G5, B5, E6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.04;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.23);
      } catch {
        // Fallback
      }
    });
  }

  /**
   * Warm ascending marimba chime for correct answers
   */
  public playSuccess() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [392.0, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.36);
      } catch {
        // Fallback
      }
    });
  }

  /**
   * Gentle, soft 'try again' tone
   */
  public playGentlePrompt() {
    this.playGentleEncouragement();
  }

  public playGentleEncouragement() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(415, now);
      osc.frequency.exponentialRampToValueAtTime(370, now + 0.16);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Fallback
    }
  }

  /**
   * Victory sparkle fanfare when finishing a level
   */
  public playFanfare() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const chords = [
      { freqs: [392, 523, 659], delay: 0 },         // G4, C5, E5
      { freqs: [440, 587, 698], delay: 0.15 },      // A4, D5, F5
      { freqs: [523, 659, 784, 1046], delay: 0.32 } // C5, E5, G5, C6
    ];

    const now = ctx.currentTime;
    chords.forEach((chord) => {
      chord.freqs.forEach((freq) => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const start = now + chord.delay;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, start);

          gain.gain.setValueAtTime(0.14, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(start);
          osc.stop(start + 0.52);
        } catch {
          // Fallback
        }
      });
    });
  }

  /**
   * Playful bubbling mixing tone
   */
  public playBubbleMix() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + i * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(320 + Math.random() * 240, start);
        osc.frequency.exponentialRampToValueAtTime(620 + Math.random() * 260, start + 0.08);

        gain.gain.setValueAtTime(0.1, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.09);
      } catch {
        // Fallback
      }
    }
  }

  /**
   * Speak clear Dutch sentences with a sweet, affectionate, warm and gentle cadence ("Lieve Stem").
   */
  public speak(text: string, options?: { playChime?: boolean }) {
    if (!this.speechEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // cancel pending speech

      if (options?.playChime !== false) {
        this.playSweetCelesta();
      }

      let naturalText = text.trim();

      // Avoid mechanical ellipsis which causes robotic stutters in Web Speech
      naturalText = naturalText.replace(/\.{3,}/g, ',');

      // Remove any occurrence of "kijk eens liefje" or "liefje"
      naturalText = naturalText
        .replace(/kijk eens\s*,?\s*liefje\s*,?\s*/gi, '')
        .replace(/\bliefje\b/gi, '')
        .trim();

      // Natural friendly question phrasing without forced prefixes
      if (naturalText.startsWith('Welk voorwerp is ')) {
        const color = naturalText.replace('Welk voorwerp is ', '').replace('?', '').trim();
        naturalText = `Welk vriendje is ${color}?`;
      }

      // Convert uppercase words to natural Dutch text
      naturalText = naturalText
        .replace(/\bROOD\b/g, 'rood')
        .replace(/\bBLAUW\b/g, 'blauw')
        .replace(/\bGEEL\b/g, 'geel')
        .replace(/\bGROEN\b/g, 'groen')
        .replace(/\bORANJE\b/g, 'oranje')
        .replace(/\bPAARS\b/g, 'paars')
        .replace(/\bROZE\b/g, 'roze')
        .replace(/\bBRUIN\b/g, 'bruin')
        .replace(/\bZWART\b/g, 'zwart')
        .replace(/\bWIT\b/g, 'wit')
        .replace(/\bGRIJS\b/g, 'grijs')
        .replace(/\bLICHTBLAUW\b/g, 'lichtblauw')
        .replace(/\bDONKERBLAUW\b/g, 'donkerblauw')
        .replace(/\bLICHTGROEN\b/g, 'lichtgroen')
        .replace(/\bLILA\b/g, 'lila')
        .replace(/\bGOUD\b/g, 'goud')
        .replace(/\bTURKOOIS\b/g, 'turkoois');

      // Enhance single color words with sweet warmth
      const singleColorPhrases: Record<string, string> = {
        'Rood!': 'Lief rood!',
        'Blauw!': 'Zacht hemelsblauw!',
        'Geel!': 'Warm zonnegeel!',
        'Groen!': 'Zacht lentegroen!',
        'Oranje!': 'Gezellig oranje!',
        'Paars!': 'Mooi zacht paars!',
        'Roze!': 'Lief suikerspin roze!',
        'Bruin!': 'Lief beertjesbruin!',
        'Zwart!': 'Zacht nachtzwart!',
        'Wit!': 'Puur wolkjeswit!',
        'Grijs!': 'Zacht muisjesgrijs!',
        'Lichtblauw!': 'Zacht hemels lichtblauw!',
        'Donkerblauw!': 'Mooi diep donkerblauw!',
        'Lichtgroen!': 'Fris lentegroen!',
        'Lila!': 'Lieflijk zacht lila!',
        'Goud!': 'Mooi glinsterend goud!',
        'Turkoois!': 'Prachtig zeeblauw turkoois!',
      };

      if (singleColorPhrases[naturalText]) {
        naturalText = singleColorPhrases[naturalText];
      } else if (/^[a-zA-Záéíóú]+$/.test(naturalText)) {
        naturalText = `${naturalText}!`;
      }

      const utterance = new SpeechSynthesisUtterance(naturalText);
      utterance.lang = 'nl-NL';
      utterance.rate = this.speechRate; // ~0.85: rustig, lief en geduldig
      utterance.pitch = this.speechPitch; // ~1.18: lief, warm, zacht en vriendelijk
      utterance.volume = this.speechVolume; // ~0.88: zacht voor kinderoren

      if (!this.dutchVoice || this.availableVoices.length === 0) {
        this.initVoices();
      }
      if (this.dutchVoice) {
        utterance.voice = this.dutchVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech fallback
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundEngine = new SoundEngine();
