import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { JSX, ReactNode } from "react";
import { Howl, Howler } from "howler";

export interface AudioState {
  readonly masterVolume: number;
  readonly isMuted: boolean;
  readonly isEnabled: boolean;
}

// Define valid sound effect IDs with all required sounds
export type SoundEffectId =
  | "menu_select"
  | "menu_back"
  | "menu_move"
  | "hover"
  | "attack"
  | "hit"
  | "vital_hit"
  | "combo"
  | "stance_change"
  | "footstep"
  | "ki_charge"
  | "ki_release"
  | "stamina_depleted"
  | "match_start"
  | "countdown"
  | "health_low"
  | "victory"
  | "defeat"
  | "dodge";

export interface AudioManager {
  readonly playMusic: (track: string) => Promise<void>;
  readonly stopMusic: () => void;
  readonly playSFX: (
    effect: SoundEffectId,
    options?: { volume?: number; delay?: number }
  ) => void;
  readonly playAttackSound: (damage: number) => void;
  readonly playHitSound: (damage: number, isVitalPoint?: boolean) => void;
  readonly playComboSound: (comboCount: number) => void;
  readonly playStanceChangeSound: () => void;
  readonly setMasterVolume: (volume: number) => void;
  readonly getMasterVolume: () => number;
  readonly toggleMute: () => void;
  readonly isEnabled: () => boolean;
  readonly getState: () => AudioState;
}

const AudioContext = createContext<AudioManager | null>(null);

interface AudioProviderProps {
  readonly children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps): JSX.Element {
  const [audioState, setAudioState] = useState<AudioState>({
    masterVolume: 0.8,
    isMuted: false,
    isEnabled: true,
  });

  const [currentMusic, setCurrentMusic] = useState<Howl | null>(null);
  const [sfxSounds] = useState<Map<string, Howl>>(new Map());

  const createSound = useCallback(
    (src: string, loop = false): Howl => {
      return new Howl({
        src: [`/audio/${src}.ogg`, `/audio/${src}.mp3`],
        loop,
        volume: audioState.masterVolume,
        onloaderror: () => {
          console.warn(`Failed to load audio: ${src}`);
        },
      });
    },
    [audioState.masterVolume]
  );

  const playMusic = useCallback(
    async (track: string): Promise<void> => {
      try {
        if (currentMusic) {
          currentMusic.stop();
        }

        const music = createSound(track, true);
        setCurrentMusic(music);
        music.play();
      } catch (error) {
        console.warn("Failed to play music:", error);
      }
    },
    [currentMusic, createSound]
  );

  const stopMusic = useCallback((): void => {
    if (currentMusic) {
      currentMusic.stop();
      setCurrentMusic(null);
    }
  }, [currentMusic]);

  const playSFX = useCallback(
    (
      effect: SoundEffectId,
      options?: { volume?: number; delay?: number }
    ): void => {
      try {
        let sound = sfxSounds.get(effect);
        if (!sound) {
          sound = createSound(effect);
          sfxSounds.set(effect, sound);
        }

        const volume = (options?.volume ?? 1) * audioState.masterVolume;
        sound.volume(volume);

        if (options?.delay) {
          setTimeout(() => sound.play(), options.delay);
        } else {
          sound.play();
        }
      } catch (error) {
        console.warn(`Failed to play SFX: ${effect}`, error);
      }
    },
    [sfxSounds, createSound, audioState.masterVolume]
  );

  const playAttackSound = useCallback(
    (damage: number): void => {
      const intensity = Math.min(damage / 40, 1);
      const volume = 0.4 + intensity * 0.4;
      playSFX("attack", { volume });
    },
    [playSFX]
  );

  const playHitSound = useCallback(
    (damage: number, isVitalPoint = false): void => {
      if (isVitalPoint) {
        playSFX("vital_hit", { volume: 0.8 });
      } else {
        const intensity = Math.min(damage / 40, 1);
        playSFX("hit", { volume: 0.3 + intensity * 0.3 });
      }
    },
    [playSFX]
  );

  const playComboSound = useCallback(
    (comboCount: number): void => {
      const volume = Math.min(0.2 + comboCount * 0.1, 0.8);
      playSFX("combo", { volume });
    },
    [playSFX]
  );

  const playStanceChangeSound = useCallback((): void => {
    playSFX("stance_change", { volume: 0.3 });
  }, [playSFX]);

  const setMasterVolume = useCallback((volume: number): void => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setAudioState((prev) => ({ ...prev, masterVolume: clampedVolume }));
    Howler.volume(clampedVolume);
  }, []);

  const getMasterVolume = useCallback((): number => {
    return audioState.masterVolume;
  }, [audioState.masterVolume]);

  const toggleMute = useCallback((): void => {
    const newMutedState = !audioState.isMuted;
    setAudioState((prev) => ({ ...prev, isMuted: newMutedState }));
    Howler.mute(newMutedState);
  }, [audioState.isMuted]);

  const isEnabled = useCallback((): boolean => {
    return audioState.isEnabled;
  }, [audioState.isEnabled]);

  const getState = useCallback((): AudioState => {
    return audioState;
  }, [audioState]);

  useEffect(() => {
    Howler.volume(audioState.masterVolume);
  }, [audioState.masterVolume]);

  const audioManager: AudioManager = {
    playMusic,
    stopMusic,
    playSFX,
    playAttackSound,
    playHitSound,
    playComboSound,
    playStanceChangeSound,
    setMasterVolume,
    getMasterVolume,
    toggleMute,
    isEnabled,
    getState,
  };

  return (
    <AudioContext.Provider value={audioManager}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio(): AudioManager {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
