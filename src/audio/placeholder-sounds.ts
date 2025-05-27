/**
 * Placeholder sound generation for development
 * This creates procedural audio for testing before real sound assets are available
 */

// Web Audio API sound generation utilities
class SoundGenerator {
  private static audioContext: AudioContext | null = null;

  private static getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Generate simple tones for different game events
  public static generateTone(
    frequency: number,
    duration: number,
    type: OscillatorType = "sine",
    volume: number = 0.3
  ): Promise<void> {
    return new Promise((resolve) => {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration
      );

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);

      oscillator.onended = () => resolve();
    });
  }

  // Generate attack sound based on damage
  public static async generateAttackSound(damage: number): Promise<void> {
    const baseFreq = 200 + damage * 10;
    const duration = 0.1 + damage * 0.005;
    await this.generateTone(baseFreq, duration, "square", 0.4);
  }

  // Generate hit sound
  public static async generateHitSound(damage: number): Promise<void> {
    const freq = 150 + damage * 5;
    const duration = 0.15;
    await this.generateTone(freq, duration, "sawtooth", 0.3);
  }

  // Generate menu sounds
  public static async generateMenuHover(): Promise<void> {
    await this.generateTone(800, 0.1, "sine", 0.2);
  }

  public static async generateMenuSelect(): Promise<void> {
    await this.generateTone(1000, 0.15, "triangle", 0.3);
  }

  // Generate stance change sound
  public static async generateStanceChange(): Promise<void> {
    await this.generateTone(600, 0.2, "sine", 0.25);
    setTimeout(async () => {
      await this.generateTone(400, 0.1, "triangle", 0.15);
    }, 100);
  }

  // Generate combo sound
  public static async generateCombo(count: number): Promise<void> {
    for (let i = 0; i < count && i < 5; i++) {
      setTimeout(async () => {
        await this.generateTone(500 + i * 100, 0.08, "square", 0.2);
      }, i * 50);
    }
  }
}

// Export placeholder functions that match the AudioManager interface
export const placeholderSounds = {
  generateAttackSound: SoundGenerator.generateAttackSound,
  generateHitSound: SoundGenerator.generateHitSound,
  generateMenuHover: SoundGenerator.generateMenuHover,
  generateMenuSelect: SoundGenerator.generateMenuSelect,
  generateStanceChange: SoundGenerator.generateStanceChange,
  generateCombo: SoundGenerator.generateCombo,
};
