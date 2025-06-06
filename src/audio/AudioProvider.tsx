import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import type {
  IAudioManager,
  AudioPlaybackOptions,
  MusicTrackId,
} from "../types/audio"; // Removed unused SoundEffectId
import type { AudioManager as AudioManagerClass } from "./AudioManager"; // Use type import for the class

interface AudioContextValue extends IAudioManager {
  isInitialized: boolean;
  // Add any other state or methods you want to expose via context
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  isMuted: boolean;
  currentMusicTrack: MusicTrackId | null | undefined;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export const useAudio = (): AudioContextValue => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
  manager: AudioManagerClass; // Use the AudioManager class instance
}

export const AudioProvider: React.FC<AudioProviderProps> = ({
  children,
  manager,
}) => {
  const [isInitialized, setIsInitialized] = useState(manager.isInitialized);
  const [masterVolume, setMasterVolumeState] = useState(
    manager.getState().masterVolume
  );
  const [sfxVolume, setSfxVolumeState] = useState(manager.getState().sfxVolume);
  const [musicVolume, setMusicVolumeState] = useState(
    manager.getState().musicVolume
  );
  const [isMuted, setIsMutedState] = useState(manager.getState().muted);
  const [currentMusicTrack, setCurrentMusicTrackState] = useState(
    manager.getState().currentMusicTrack
  );

  useEffect(() => {
    const handleInit = () => setIsInitialized(true);
    const handleError = () => setIsInitialized(false); // Or handle error state

    // Assuming AudioManager has an event emitter or similar mechanism
    // For simplicity, directly checking state or using a callback
    if (!manager.isInitialized) {
      manager.init().then(handleInit).catch(handleError);
    } else {
      handleInit();
    }

    // Example of listening to events from AudioManager if it had an emitter
    // manager.on('initialized', handleInit);
    // manager.on('stateChanged', (newState) => { /* update states */ });
    // return () => {
    //   manager.off('initialized', handleInit);
    //   manager.off('stateChanged', ...);
    // };
  }, [manager]);

  const audioContextValue = useMemo<AudioContextValue>(
    () => ({
      // Spread the manager's methods
      ...manager,
      // Expose state and wrapped setters
      isInitialized,
      masterVolume,
      sfxVolume,
      musicVolume,
      isMuted,
      currentMusicTrack,
      // Wrap manager methods to update local state as well, if needed, or ensure manager emits events
      setMasterVolume: (vol: number) => {
        manager.setMasterVolume(vol);
        setMasterVolumeState(manager.getState().masterVolume);
      },
      setSFXVolume: (vol: number) => {
        manager.setSFXVolume(vol);
        setSfxVolumeState(manager.getState().sfxVolume);
      },
      setMusicVolume: (vol: number) => {
        manager.setMusicVolume(vol);
        setMusicVolumeState(manager.getState().musicVolume);
      },
      setMuted: (muted: boolean) => {
        manager.setMuted(muted);
        setIsMutedState(manager.getState().muted);
      },
      playMusic: (id: MusicTrackId, options?: AudioPlaybackOptions) => {
        const soundId = manager.playMusic(id, options);
        setCurrentMusicTrackState(manager.getState().currentMusicTrack);
        return soundId;
      },
      stopMusic: (id?: MusicTrackId, fadeOutDuration?: number) => {
        manager.stopMusic(id, fadeOutDuration);
        setCurrentMusicTrackState(manager.getState().currentMusicTrack);
      },
      // Ensure all IAudioManager methods are correctly exposed
      // If manager's methods directly update its internal state and that's what getState() returns,
      // then we might not need to call setXXXState for volume/mute if manager emits events for these changes.
      // For now, this explicit update ensures UI reflects changes made via these context methods.
      init: manager.init.bind(manager),
      playSFX: manager.playSFX.bind(manager),
      stopAllSounds: manager.stopAllSounds.bind(manager),
      getState: manager.getState.bind(manager),
      isMusicPlaying: manager.isMusicPlaying.bind(manager),
      loadAudioAsset: manager.loadAudioAsset.bind(manager),
      playAttackSound: manager.playAttackSound.bind(manager),
      playHitSound: manager.playHitSound.bind(manager),
      playTechniqueSound: manager.playTechniqueSound.bind(manager),
      playStanceChangeSound: manager.playStanceChangeSound.bind(manager),
      playBlockSound: manager.playBlockSound.bind(manager),
    }),
    [
      isInitialized,
      manager,
      masterVolume,
      sfxVolume,
      musicVolume,
      isMuted,
      currentMusicTrack,
    ]
  );

  return (
    <AudioContext.Provider value={audioContextValue}>
      {children}
    </AudioContext.Provider>
  );
};
