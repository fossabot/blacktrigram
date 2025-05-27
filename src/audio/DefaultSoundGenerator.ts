/**
 * Default sound generator for testing when actual audio files are not available
 * Uses Web Audio API to create simple synthesized sounds for Korean martial arts
 */

interface SoundParams {
  readonly frequency: number;
  readonly duration: number;
  readonly type: OscillatorType;
  readonly volume: number;
  readonly envelope?: {
    readonly attack: number;
    readonly decay: number;
    readonly sustain: number;
    readonly release: number;
  };
}

export class DefaultSoundGenerator {
  private audioContext: AudioContext | null = null;
  private isInitialized: boolean = false;

  constructor() {
    this.initializeAudioContext();
  }

  private initializeAudioContext(): void {
    try {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
        this.isInitialized = true;
      }
    } catch (error) {
      console.warn("Web Audio API not supported:", error);
      this.isInitialized = false;
    }
  }

  private async resumeAudioContext(): Promise<void> {
    if (this.audioContext?.state === "suspended") {
      try {
        await this.audioContext.resume();
      } catch (error) {
        console.warn("Failed to resume audio context:", error);
      }
    }
  }

  public async playTone(params: SoundParams): Promise<void> {
    if (!this.audioContext || !this.isInitialized) return;

    try {
      await this.resumeAudioContext();

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Set oscillator properties
      oscillator.type = params.type;
      oscillator.frequency.setValueAtTime(
        params.frequency,
        this.audioContext.currentTime
      );

      // Set envelope
      const {
        attack = 0.01,
        decay = 0.1,
        sustain = 0.7,
        release = 0.3,
      } = params.envelope || {};
      const now = this.audioContext.currentTime;

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(params.volume, now + attack);
      gainNode.gain.linearRampToValueAtTime(
        params.volume * sustain,
        now + attack + decay
      );
      gainNode.gain.setValueAtTime(
        params.volume * sustain,
        now + params.duration - release
      );
      gainNode.gain.linearRampToValueAtTime(0, now + params.duration);

      oscillator.start(now);
      oscillator.stop(now + params.duration);
    } catch (error) {
      console.warn("Failed to play tone:", error);
    }
  }

  // Korean martial arts themed sounds
  public async playAttackSound(damage: number): Promise<void> {
    const intensity = Math.min(damage / 40, 1);
    await this.playTone({
      frequency: 200 + intensity * 300, // Higher pitch for stronger attacks
      duration: 0.15,
      type: "sawtooth",
      volume: 0.3 + intensity * 0.4,
      envelope: { attack: 0.005, decay: 0.05, sustain: 0.8, release: 0.1 },
    });
  }

  public async playHitSound(
    damage: number,
    isVitalPoint: boolean = false
  ): Promise<void> {
    if (isVitalPoint) {
      // Sharp, high-pitched critical hit
      await this.playTone({
        frequency: 800,
        duration: 0.2,
        type: "square",
        volume: 0.6,
        envelope: { attack: 0.001, decay: 0.02, sustain: 0.9, release: 0.177 },
      });
    } else {
      const intensity = Math.min(damage / 30, 1);
      await this.playTone({
        frequency: 150 + intensity * 200,
        duration: 0.12,
        type: "triangle",
        volume: 0.4 + intensity * 0.3,
        envelope: { attack: 0.01, decay: 0.03, sustain: 0.7, release: 0.08 },
      });
    }
  }

  public async playStanceChangeSound(): Promise<void> {
    // Smooth transition sound
    await this.playTone({
      frequency: 440,
      duration: 0.25,
      type: "sine",
      volume: 0.3,
      envelope: { attack: 0.05, decay: 0.1, sustain: 0.6, release: 0.1 },
    });
  }

  public async playComboSound(comboCount: number): Promise<void> {
    const pitch = 300 + comboCount * 50;
    await this.playTone({
      frequency: pitch,
      duration: 0.1,
      type: "square",
      volume: Math.min(0.2 + comboCount * 0.1, 0.7),
      envelope: { attack: 0.01, decay: 0.02, sustain: 0.8, release: 0.067 },
    });
  }

  public async playMenuSound(): Promise<void> {
    await this.playTone({
      frequency: 523, // C5 note
      duration: 0.1,
      type: "sine",
      volume: 0.3,
      envelope: { attack: 0.01, decay: 0.02, sustain: 0.7, release: 0.067 },
    });
  }

  public async playMatchStartSound(): Promise<void> {
    // Traditional bell-like sound
    await this.playTone({
      frequency: 660,
      duration: 1.0,
      type: "sine",
      volume: 0.5,
      envelope: { attack: 0.01, decay: 0.3, sustain: 0.5, release: 0.69 },
    });
  }

  public async playVictorySound(): Promise<void> {
    // Rising victory melody
    const notes = [523, 659, 784]; // C, E, G
    for (let i = 0; i < notes.length; i++) {
      setTimeout(() => {
        this.playTone({
          frequency: notes[i]!,
          duration: 0.3,
          type: "sine",
          volume: 0.4,
          envelope: { attack: 0.05, decay: 0.1, sustain: 0.8, release: 0.15 },
        });
      }, i * 200);
    }
  }

  public cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.isInitialized = false;
    }
  }
}

// Export singleton instance for easy access
export const defaultSoundGenerator = new DefaultSoundGenerator();
