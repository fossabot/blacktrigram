import React, { createContext, useContext, useEffect, useState } from "react";
import { placeholderSounds } from "./placeholder-sounds";

// Korean martial arts audio interface
export interface AudioManager {
  playMusic: (trackId: string, options?: AudioPlaybackOptions) => Promise<void>;
  stopMusic: () => void;
  playSFX: (soundId: string, volume?: number) => Promise<void>;
  playAttackSound: (damage: number) => Promise<void>;
  playHitSound: (damage: number, isVitalPoint?: boolean) => Promise<void>;
  playTechniqueSound: (techniqueId: string) => Promise<void>;
  setVolume: (volume: number) => void;
  isEnabled: boolean;
  getIsInitialized: () => boolean;
}

export interface AudioPlaybackOptions {
  loop?: boolean;
  volume?: number;
  fadeIn?: boolean;
}

// Audio Context for Korean martial arts
const AudioContext = createContext<AudioManager | null>(null);

// Korean martial arts audio implementation
class AudioManagerImpl implements AudioManager {
  private volume: number = 0.7;
  public isEnabled: boolean = true;
  private initialized: boolean = false;

  constructor() {
    this.initialized = true;
  }

  getIsInitialized(): boolean {
    return this.initialized;
  }

  async playMusic(
    trackId: string,
    options: AudioPlaybackOptions = {}
  ): Promise<void> {
    if (!this.isEnabled) return;
    const { loop = true, volume = this.volume } = options;
    console.log(
      `🎵 Playing Korean martial arts music: ${trackId}, loop: ${loop}, volume: ${volume}`
    );
    // Placeholder for Korean traditional music integration
  }

  stopMusic(): void {
    if (!this.isEnabled) return;
    console.log("🔇 Stopping martial arts music");
  }

  async playSFX(soundId: string, volume = this.volume): Promise<void> {
    if (!this.isEnabled) return;
    console.log(
      `🔊 Playing Korean martial arts SFX: ${soundId}, volume: ${volume}`
    );
    // Use existing placeholder sounds for authentic Korean martial arts
  }

  async playAttackSound(damage: number): Promise<void> {
    if (!this.isEnabled) return;
    await placeholderSounds.generateAttackSound(damage);
  }

  async playHitSound(damage: number, isVitalPoint = false): Promise<void> {
    if (!this.isEnabled) return;
    await placeholderSounds.generateHitSound(damage);
    if (isVitalPoint) {
      console.log("💥 Vital point strike sound (급소격)");
    }
  }

  async playTechniqueSound(techniqueId: string): Promise<void> {
    if (!this.isEnabled) return;
    console.log(`🥋 Playing Korean technique sound: ${techniqueId}`);
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }
}

// Korean martial arts audio provider
export const AudioManagerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [audioManager, setAudioManager] = useState<AudioManager | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const manager = new AudioManagerImpl();
    setAudioManager(manager);
    setIsInitialized(true);
  }, []);

  const contextValue = {
    audioManager,
    isInitialized,
    playSFX: (id: string) => audioManager?.playSFX?.(id as any),
    playMusic: (id: string) => audioManager?.playMusic?.(id as any),
    playTechniqueSound: (techniqueName: string) =>
      audioManager?.playTechniqueSound?.(techniqueName),
    playHitSound: (damage: number, isVitalPoint?: boolean) =>
      audioManager?.playHitSound?.(damage, isVitalPoint),
    playAttackSound: (damage: number) =>
      audioManager?.playAttackSound?.(damage),
    setVolume: (volume: number) => audioManager?.setVolume?.(volume),
    mute: () => audioManager?.mute?.(),
    unmute: () => audioManager?.unmute?.(),
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

// Hook for using Korean martial arts audio
export const useAudio = (): AudioManager => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error(
      "useAudio must be used within AudioProvider (Korean martial arts context required)"
    );
  }
  return context;
};

// Export singleton for direct use
export const audioManager = new AudioManagerImpl();
