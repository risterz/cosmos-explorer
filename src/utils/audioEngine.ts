class CosmicAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private droneGain: GainNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      console.warn('Web Audio API not supported on this device');
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!this.ctx) {
      if (!muted) this.init();
      else return;
    }

    if (this.ctx && this.ctx.state === 'suspended' && !muted) {
      this.ctx.resume();
    }

    if (muted) {
      this.stopDrone();
    } else {
      this.startDrone();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private startDrone() {
    if (!this.ctx || this.isMuted) return;
    if (this.droneGain) return; // already running

    const now = this.ctx.currentTime;

    // Sub-bass sine oscillator (48 Hz - deep cosmic resonance)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(48, now);

    // Subtle 5th harmonic oscillator (72 Hz)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(72, now);

    // Warm low-pass filter
    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(110, now);
    this.droneFilter.Q.setValueAtTime(3.0, now);

    // Master drone gain
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.exponentialRampToValueAtTime(0.06, now + 3);

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneFilter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  private stopDrone() {
    if (!this.ctx || !this.droneGain) return;
    const now = this.ctx.currentTime;
    try {
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      setTimeout(() => {
        try {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.droneFilter?.disconnect();
          this.droneGain?.disconnect();
        } catch {
          // ignore
        }
        this.droneOsc1 = null;
        this.droneOsc2 = null;
        this.droneFilter = null;
        this.droneGain = null;
      }, 600);
    } catch {
      this.droneGain = null;
    }
  }

  public playClickPing() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5 note
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08); // chirp up

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playTransitionWhoosh() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Modulated resonant sweep
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.8);
    osc.frequency.exponentialRampToValueAtTime(80, now + 1.8);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(900, now + 0.7);
    filter.frequency.exponentialRampToValueAtTime(150, now + 1.8);
    filter.Q.setValueAtTime(4.0, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.8);
  }
}

export const audioEngine = new CosmicAudioEngine();
