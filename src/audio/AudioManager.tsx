import React, { createContext, useContext, useEffect, useState } from "react";
import { AudioManager } from "./AudioManager";
import type { IAudioManager } from "../types/audio";

interface AudioManagerState {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  isMuted: boolean;
  isInitialized: boolean;
  loadedAssetCount: number;
}

interface AudioContextType {
  audioManager: AudioManager;
  state: AudioManagerState;
  refreshState: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

interface AudioProviderProps {
  children: React.ReactNode;
}

export function AudioProvider({
  children,
}: AudioProviderProps): React.JSX.Element {
  const [audioManager] = useState(() => AudioManager.getInstance());
  const [state, setState] = useState<AudioManagerState>(() => ({
    masterVolume: audioManager.getMasterVolume(),
    sfxVolume: audioManager.getSFXVolume(),
    musicVolume: audioManager.getMusicVolume(),
    isMuted: audioManager.getIsMuted(),
    isInitialized: audioManager.getIsInitialized(),
    loadedAssetCount: audioManager.getLoadedAssetCount(),
  }));

  const refreshState = () => {
    setState({
      masterVolume: audioManager.getMasterVolume(),
      sfxVolume: audioManager.getSFXVolume(),
      musicVolume: audioManager.getMusicVolume(),
      isMuted: audioManager.getIsMuted(),
      isInitialized: audioManager.getIsInitialized(),
      loadedAssetCount: audioManager.getLoadedAssetCount(),
    });
  };

  useEffect(() => {
    // Set up periodic state updates
    const interval = setInterval(refreshState, 1000);

    // Initial state update
    refreshState();

    return () => {
      clearInterval(interval);
    };
  }, [audioManager]);

  // Listen for user interaction to enable audio context
  useEffect(() => {
    const enableAudio = async () => {
      if (!audioManager.getIsInitialized()) {
        try {
          // Trigger audio context initialization on user interaction
          await audioManager.playMenuSound();
        } catch (error) {
          console.warn(
            "Failed to initialize audio on user interaction:",
            error
          );
        }
        refreshState();
      }
    };

    const handleUserInteraction = () => {
      enableAudio();
      // Remove listeners after first interaction
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [audioManager]);

  const contextValue: AudioContextType = {
    audioManager,
    state,
    refreshState,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext(): AudioContextType {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
}

// Export the hook that returns the AudioManager instance directly
export function useAudio(): AudioManager {
  const { audioManager } = useAudioContext();
  return audioManager;
}

// Export hook for accessing audio state
export function useAudioState(): AudioManagerState {
  const { state } = useAudioContext();
  return state;
}
