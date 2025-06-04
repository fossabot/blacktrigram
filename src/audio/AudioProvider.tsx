import React, { createContext, useContext, useEffect, useState } from "react";
import { AudioManager } from "./AudioManager";

const AudioContext = createContext<AudioManager | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [audioManager] = useState(() => new AudioManager());

  useEffect(() => {
    audioManager.initialize();
    return () => {
      audioManager.dispose();
    };
  }, [audioManager]);

  return (
    <AudioContext.Provider value={audioManager}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioManager => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

// Export as default for backward compatibility
export default useAudio;
