import React, { createContext, useContext, type ReactNode } from "react";
import { AudioManager } from "./AudioManager";
import type { IAudioManager } from "../types/audio";

const AudioContext = createContext<IAudioManager | null>(null);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({
  children,
}: AudioProviderProps): React.JSX.Element {
  const audioManager = new AudioManager();

  return (
    <AudioContext.Provider value={audioManager}>
      {children}
    </AudioContext.Provider>
  );
}

// Export both named and default exports
export const useAudio = (): IAudioManager => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

// Default export
export default useAudio;

// This file is being removed - functionality moved to AudioProvider.tsx
