import React, { createContext, useContext, ReactNode } from "react";
import { AudioManager } from "./AudioManager";
import type { IAudioManager } from "../types/audio";

// Create audio context
const AudioContext = createContext<IAudioManager | null>(null);

// Audio provider component
interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const audioManager = new AudioManager();

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
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

// Default export for compatibility
export { useAudio as default };
