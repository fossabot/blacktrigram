import React, { createContext, useContext, useEffect, useState } from "react";
import type { AudioManager } from "./AudioManager";

interface AudioContextType {
  audioManager: AudioManager | null;
  isReady: boolean;
}

const AudioContext = createContext<AudioContextType>({
  audioManager: null,
  isReady: false,
});

export function useAudioContext(): AudioContextType {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within AudioProvider");
  }
  return context;
}

// Add this hook for compatibility with rest of codebase
export function useAudio() {
  const { audioManager } = useAudioContext();
  return audioManager;
}

interface AudioProviderProps {
  readonly children: React.ReactNode;
}

export function AudioProvider({
  children,
}: AudioProviderProps): React.JSX.Element {
  const [audioManager, setAudioManager] = useState<AudioManager | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function initializeAudio() {
      try {
        // Import the actual AudioManager implementation
        const { AudioManager: AudioManagerClass } = await import(
          "./AudioManager"
        );
        const manager = new AudioManagerClass();

        if (mounted) {
          setAudioManager(manager);
          setIsReady(true);
        }
      } catch (error) {
        console.warn("Audio initialization failed:", error);
        if (mounted) {
          setIsReady(true); // Continue without audio
        }
      }
    }

    initializeAudio();

    return () => {
      mounted = false;
      // Check if audioManager has cleanup methods before calling them
      if (audioManager) {
        // Use proper cleanup method based on AudioManager interface
        if (
          "cleanup" in audioManager &&
          typeof audioManager.cleanup === "function"
        ) {
          audioManager.cleanup();
        } else if (
          "dispose" in audioManager &&
          typeof audioManager.dispose === "function"
        ) {
          (audioManager as any).dispose();
        }
        // If no cleanup method exists, just set volume to 0 for graceful shutdown
        try {
          audioManager.setMasterVolume(0);
        } catch (error) {
          console.warn("Failed to cleanup audio manager:", error);
        }
      }
    };
  }, [audioManager]);

  const contextValue: AudioContextType = {
    audioManager,
    isReady,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}
