import { createContext, useContext, ReactNode, useMemo } from "react";
import { AudioManager } from "./AudioManager";
import type { IAudioManager } from "../types/audio";

// Create audio context
const AudioContext = createContext<IAudioManager | null>(null);

// Audio provider component
interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const audioManager = useMemo(() => new AudioManager(), []);

  return (
    <AudioContext.Provider value={audioManager}>
      {children}
    </AudioContext.Provider>
  );
}

// Hook to use audio manager
export function useAudio(): IAudioManager {
  const context = useContext(AudioContext);
  if (!context) {
    // Return a mock audio manager for development
    return {
      playSFX: () => null,
      playMusic: () => null,
      stopMusic: () => {},
      setMasterVolume: () => {},
      setSFXVolume: () => {},
      setMusicVolume: () => {},
      setMuted: () => {},
      getState: () => ({
        masterVolume: 1,
        sfxVolume: 1,
        musicVolume: 1,
        muted: false,
        currentMusicTrack: null,
        isInitialized: false,
      }),
      playAttackSound: () => {},
      playHitSound: () => {},
      playTechniqueSound: () => {},
      playStanceChangeSound: () => {},
      playBlockSound: () => {},
      stopAllSounds: () => {},
    };
  }
  return context;
}
