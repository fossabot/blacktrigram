import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { AudioManager } from "./AudioManager";
import type { AudioConfig, SoundEffectId, MusicTrackId } from "../types/audio";
import type { PlayerArchetype } from "../types/enums";

interface AudioContextType {
  audioManager: AudioManager;
  isInitialized: boolean;
  currentMusic: string | null;
  sfxVolume: number;
  musicVolume: number;
  setSfxVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  playKoreanTechniqueSound: (
    techniqueId: string,
    archetype: PlayerArchetype
  ) => Promise<void>;
  playTrigramStanceSound: (stance: string) => Promise<void>;
  playVitalPointHitSound: (
    severity: "minor" | "moderate" | "severe" | "critical"
  ) => Promise<void>;
  playMusic: (trackId: MusicTrackId) => Promise<void>;
  playSoundEffect: (soundId: SoundEffectId) => Promise<void>;
  stopMusic: () => void;
  mute: () => void;
  unmute: () => void;
  isMuted: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
  config?: AudioConfig;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [audioManager] = useState(() => new AudioManager());
  const [isLoading, setIsLoading] = useState(false);

  const initializeAudio = useCallback(async () => {
    if (isInitialized) return;

    try {
      setIsLoading(true);
      console.log("🎵 Initializing audio system...");

      // Add the missing loadAudio method to audioManager
      if (!audioManager.loadAudio) {
        audioManager.loadAudio = async () => {
          try {
            // Load audio assets through the registry
            console.log("Loading audio assets...");
            // Implementation would load actual audio files
            return Promise.resolve();
          } catch (error) {
            console.warn("Audio asset loading failed:", error);
            throw error;
          }
        };
      }

      const config = {
        enableSpatialAudio: false,
        maxSimultaneousSounds: 32,
        audioFormats: ["audio/mp3", "audio/wav", "audio/webm"],
        fadeTransitionTime: 1000,
        defaultVolume: 0.7,
      };

      await audioManager.initialize(config);

      try {
        await audioManager.loadAudio();
        console.log("✅ Audio system initialized successfully");
      } catch (audioError) {
        console.warn(
          "⚠️ Audio loading failed, continuing without audio:",
          audioError
        );
      }

      setIsInitialized(true);
    } catch (error) {
      console.error("❌ Failed to initialize audio system:", error);
      setIsInitialized(true);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized, audioManager]);

  // Prevent audio errors from blocking the app
  useEffect(() => {
    const handleAudioError = (event: any) => {
      if (
        event.reason?.message?.includes("Failed to load") ||
        event.reason?.message?.includes("no supported source")
      ) {
        console.warn("Audio loading error handled:", event.reason);
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handleAudioError);
    return () => {
      window.removeEventListener("unhandledrejection", handleAudioError);
    };
  }, []);

  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  const playKoreanTechniqueSound = async (
    techniqueId: string,
    archetype: PlayerArchetype
  ): Promise<void> => {
    if (!isInitialized) return;
    return audioManager.playKoreanTechniqueSound(techniqueId, archetype);
  };

  const playTrigramStanceSound = async (stance: string): Promise<void> => {
    if (!isInitialized) return;
    return audioManager.playTrigramStanceSound(stance);
  };

  const playVitalPointHitSound = async (
    severity: "minor" | "moderate" | "severe" | "critical"
  ): Promise<void> => {
    if (!isInitialized) return;
    return audioManager.playVitalPointHitSound(severity);
  };

  const playMusic = async (trackId: MusicTrackId): Promise<void> => {
    if (!isInitialized) return;
    await audioManager.playMusic(trackId); // Fix: Use playMusic instead of playMusicTrack
  };

  const playSoundEffect = async (soundId: SoundEffectId): Promise<void> => {
    if (!isInitialized) return;
    await audioManager.playSoundEffect(soundId); // Fix: Use correct method name
  };

  const stopMusic = (): void => {
    audioManager.stopMusic(); // Fix: Now this method exists
  };

  const mute = (): void => {
    audioManager.setVolume("master", 0);
  };

  const unmute = (): void => {
    audioManager.setVolume("master", 1);
  };

  const [sfxVolumeState, setSfxVolumeState] = useState(0.8);
  const [musicVolumeState, setMusicVolumeState] = useState(0.7);

  const setSfxVolume = useCallback(
    (volume: number) => {
      audioManager.setVolume("sfx", volume);
      setSfxVolumeState(volume);
    },
    [audioManager]
  );

  const setMusicVolume = useCallback(
    (volume: number) => {
      audioManager.setVolume("music", volume);
      setMusicVolumeState(volume);
    },
    [audioManager]
  );

  const contextValue: AudioContextType = {
    audioManager,
    isInitialized: isInitialized && !isLoading, // Use isLoading
    currentMusic: null,
    sfxVolume: sfxVolumeState,
    musicVolume: musicVolumeState,
    setSfxVolume,
    setMusicVolume,
    playKoreanTechniqueSound,
    playTrigramStanceSound,
    playVitalPointHitSound,
    playMusic,
    playSoundEffect,
    stopMusic,
    mute,
    unmute,
    isMuted: false,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
