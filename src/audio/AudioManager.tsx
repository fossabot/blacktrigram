import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { IAudioManager } from "../types/audio";

const AudioContext = createContext<IAudioManager | null>(null);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({
  children,
}: AudioProviderProps): React.JSX.Element {
  const [audioManager] = useState(() => new AudioManager());

  useEffect(() => {
    // Initialize the audio manager
    audioManager.initialize();
  }, [audioManager]);

  return (
    <AudioContext.Provider value={audioManager}>
      {children}
    </AudioContext.Provider>
  );
}

// Fix: Export the hook function properly
export function useAudio(): IAudioManager {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

// Export as default for import compatibility
export default useAudio;

// This file is deprecated - functionality moved to AudioProvider.tsx
// Please use AudioProvider.tsx instead
