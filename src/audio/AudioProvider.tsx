import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import type {
  SoundEffectId,
  MusicTrackId,
  AudioPlaybackOptions,
  AudioState,
  IAudioManager,
} from "../types/audio";
import type { TrigramStance, PlayerArchetype } from "../types/enums";

// Audio context interface
interface AudioContextInterface extends IAudioManager {
  readonly isInitialized: boolean;
  readonly currentState: AudioState;
  readonly playTrigramTransitionSound: (
    from: TrigramStance,
    to: TrigramStance
  ) => void;
  readonly playArchetypeSpecificSound: (
    archetype: PlayerArchetype,
    action: string
  ) => void;
  readonly playKoreanTechniqueAudio: (
    koreanName: string,
    englishName: string
  ) => void;
}

// Create audio context
const AudioContext = createContext<AudioContextInterface | null>(null);

// Korean martial arts sound mappings
const KOREAN_TECHNIQUE_SOUNDS: Record<string, string> = {
  천둥벽력: "thunder_strike",
  유수연타: "flowing_water_combo",
  화염지창: "fire_thrust",
  벽력일섬: "lightning_flash",
  선풍연격: "whirlwind_strikes",
  수류반격: "water_counter",
  반석방어: "mountain_defense",
  대지포옹: "earth_embrace",
};

const TRIGRAM_TRANSITION_SOUNDS: Record<
  TrigramStance,
  Record<TrigramStance, string>
> = {
  geon: {
    tae: "heaven_to_lake",
    li: "heaven_to_fire",
    jin: "heaven_to_thunder",
    son: "heaven_to_wind",
    gam: "heaven_to_water",
    gan: "heaven_to_mountain",
    gon: "heaven_to_earth",
    geon: "stance_hold",
  },
  // ...existing code...
  tae: {
    geon: "lake_to_heaven",
    li: "lake_to_fire",
    jin: "lake_to_thunder",
    son: "lake_to_wind",
    gam: "lake_to_water",
    gan: "lake_to_mountain",
    gon: "lake_to_earth",
    tae: "stance_hold",
  },
  li: {
    geon: "fire_to_heaven",
    tae: "fire_to_lake",
    jin: "fire_to_thunder",
    son: "fire_to_wind",
    gam: "fire_to_water",
    gan: "fire_to_mountain",
    gon: "fire_to_earth",
    li: "stance_hold",
  },
  jin: {
    geon: "thunder_to_heaven",
    tae: "thunder_to_lake",
    li: "thunder_to_fire",
    son: "thunder_to_wind",
    gam: "thunder_to_water",
    gan: "thunder_to_mountain",
    gon: "thunder_to_earth",
    jin: "stance_hold",
  },
  son: {
    geon: "wind_to_heaven",
    tae: "wind_to_lake",
    li: "wind_to_fire",
    jin: "wind_to_thunder",
    gam: "wind_to_water",
    gan: "wind_to_mountain",
    gon: "wind_to_earth",
    son: "stance_hold",
  },
  gam: {
    geon: "water_to_heaven",
    tae: "water_to_lake",
    li: "water_to_fire",
    jin: "water_to_thunder",
    son: "water_to_wind",
    gan: "water_to_mountain",
    gon: "water_to_earth",
    gam: "stance_hold",
  },
  gan: {
    geon: "mountain_to_heaven",
    tae: "mountain_to_lake",
    li: "mountain_to_fire",
    jin: "mountain_to_thunder",
    son: "mountain_to_wind",
    gam: "mountain_to_water",
    gon: "mountain_to_earth",
    gan: "stance_hold",
  },
  gon: {
    geon: "earth_to_heaven",
    tae: "earth_to_lake",
    li: "earth_to_fire",
    jin: "earth_to_thunder",
    son: "earth_to_wind",
    gam: "earth_to_water",
    gan: "earth_to_mountain",
    gon: "stance_hold",
  },
};

const ARCHETYPE_SOUNDS: Record<PlayerArchetype, Record<string, string>> = {
  musa: {
    attack: "musa_honorable_strike",
    victory: "musa_victory_shout",
    defeat: "musa_honorable_surrender",
    special: "musa_military_discipline",
  },
  amsalja: {
    attack: "amsalja_silent_strike",
    victory: "amsalja_shadow_fade",
    defeat: "amsalja_vanish",
    special: "amsalja_stealth_mode",
  },
  hacker: {
    attack: "hacker_data_strike",
    victory: "hacker_system_override",
    defeat: "hacker_connection_lost",
    special: "hacker_analysis_mode",
  },
  jeongbo_yowon: {
    attack: "agent_precise_strike",
    victory: "agent_mission_complete",
    defeat: "agent_tactical_retreat",
    special: "agent_intel_gathering",
  },
  jojik_pokryeokbae: {
    attack: "street_brutal_strike",
    victory: "street_dominance_roar",
    defeat: "street_survival_escape",
    special: "street_dirty_fighting",
  },
};

// Audio provider component
export function AudioProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const audioManagerRef = useRef<IAudioManager | null>(null);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const [audioState, setAudioState] = useState<AudioState>({
    masterVolume: 1.0,
    sfxVolume: 0.8,
    musicVolume: 0.6,
    muted: false,
    currentMusicTrack: null,
    isInitialized: false,
    fallbackMode: false,
  });

  // Initialize audio manager with Korean martial arts support
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Initialize Web Audio API with Korean martial arts context
        const webAudioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();

        // Resume audio context if suspended (required by many browsers)
        if (webAudioContext.state === "suspended") {
          await webAudioContext.resume();
        }

        // Create gain nodes for volume control
        const masterGainNode = webAudioContext.createGain();
        const sfxGainNode = webAudioContext.createGain();
        const musicGainNode = webAudioContext.createGain();

        masterGainNode.connect(webAudioContext.destination);
        sfxGainNode.connect(masterGainNode);
        musicGainNode.connect(masterGainNode);

        // Set initial volumes
        masterGainNode.gain.value = audioState.masterVolume;
        sfxGainNode.gain.value = audioState.sfxVolume;
        musicGainNode.gain.value = audioState.musicVolume;

        // Create comprehensive audio manager implementation
        audioManagerRef.current = {
          playSFX: (id: SoundEffectId, options?: AudioPlaybackOptions) => {
            if (audioState.muted) return null;

            console.log(`[Black Trigram Audio] Playing SFX: ${id}`, options);

            // Create procedural sound for Korean martial arts
            const source = webAudioContext.createOscillator();
            const gainNode = webAudioContext.createGain();

            source.connect(gainNode);
            gainNode.connect(sfxGainNode);

            // Korean martial arts specific sound generation
            const frequency = getKoreanMartialArtsFrequency(id);
            const duration = getKoreanMartialArtsDuration(id);

            source.frequency.setValueAtTime(
              frequency,
              webAudioContext.currentTime
            );
            gainNode.gain.setValueAtTime(
              0.3 * (options?.volume || 1.0),
              webAudioContext.currentTime
            );
            gainNode.gain.exponentialRampToValueAtTime(
              0.01,
              webAudioContext.currentTime + duration
            );

            source.start(webAudioContext.currentTime);
            source.stop(webAudioContext.currentTime + duration);

            return Math.random(); // Return mock source ID
          },

          playMusic: (id: MusicTrackId, options?: AudioPlaybackOptions) => {
            console.log(`[Black Trigram Audio] Playing Music: ${id}`, options);
            setAudioState((prev) => ({ ...prev, currentMusicTrack: id }));

            // Create ambient Korean martial arts background music
            const oscillator = webAudioContext.createOscillator();
            const gainNode = webAudioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(musicGainNode);

            // Korean traditional music frequencies
            const baseFrequency = getKoreanTraditionalFrequency(id);
            oscillator.frequency.setValueAtTime(
              baseFrequency,
              webAudioContext.currentTime
            );
            gainNode.gain.setValueAtTime(
              0.1 * (options?.volume || 1.0),
              webAudioContext.currentTime
            );

            // Fix: Use AudioBufferSourceNode for looping, not OscillatorNode
            if (options?.loop !== false) {
              // Create a new audio buffer source for proper looping
              const bufferSource = webAudioContext.createBufferSource();
              bufferSource.loop = true;
              bufferSource.connect(gainNode);

              // Generate a simple buffer for looping
              const buffer = webAudioContext.createBuffer(
                1,
                webAudioContext.sampleRate * 2,
                webAudioContext.sampleRate
              );
              const data = buffer.getChannelData(0);
              for (let i = 0; i < data.length; i++) {
                data[i] =
                  Math.sin(
                    (2 * Math.PI * baseFrequency * i) /
                      webAudioContext.sampleRate
                  ) * 0.1;
              }
              bufferSource.buffer = buffer;
              bufferSource.start(webAudioContext.currentTime);

              // Track the source for cleanup
              activeSourcesRef.current.add(bufferSource);
            } else {
              oscillator.start(webAudioContext.currentTime);
            }

            return Math.random(); // Return mock source ID
          },

          stopMusic: () => {
            console.log("[Black Trigram Audio] Stopping music");
            setAudioState((prev) => ({ ...prev, currentMusicTrack: null }));

            // Stop all active music sources
            activeSourcesRef.current.forEach((source) => {
              try {
                source.stop();
              } catch (e) {
                // Source may already be stopped
              }
            });
            activeSourcesRef.current.clear();
          },

          setMasterVolume: (volume: number) => {
            masterGainNode.gain.value = Math.max(0, Math.min(1, volume));
            setAudioState((prev) => ({ ...prev, masterVolume: volume }));
          },

          setSFXVolume: (volume: number) => {
            sfxGainNode.gain.value = Math.max(0, Math.min(1, volume));
            setAudioState((prev) => ({ ...prev, sfxVolume: volume }));
          },

          setMusicVolume: (volume: number) => {
            musicGainNode.gain.value = Math.max(0, Math.min(1, volume));
            setAudioState((prev) => ({ ...prev, musicVolume: volume }));
          },

          setMuted: (muted: boolean) => {
            masterGainNode.gain.value = muted ? 0 : audioState.masterVolume;
            setAudioState((prev) => ({ ...prev, muted }));
          },

          getState: () => audioState,

          // Korean martial arts specific audio methods
          playAttackSound: (damage: number) => {
            const intensity =
              damage > 40
                ? "critical"
                : damage > 25
                ? "heavy"
                : damage > 10
                ? "medium"
                : "light";
            const soundId = `attack_${intensity}` as SoundEffectId;
            audioManagerRef.current?.playSFX(soundId, {
              volume: Math.min(1.0, damage / 50),
            });
          },

          playHitSound: (damage: number, isVitalPoint?: boolean) => {
            const intensity =
              damage > 40
                ? "critical"
                : damage > 25
                ? "heavy"
                : damage > 10
                ? "medium"
                : "light";
            const soundId = `hit_${intensity}` as SoundEffectId;
            const volume = isVitalPoint
              ? Math.min(1.0, damage / 30)
              : Math.min(0.8, damage / 40);
            audioManagerRef.current?.playSFX(soundId, { volume });
          },

          playTechniqueSound: (koreanName: string) => {
            const soundKey =
              KOREAN_TECHNIQUE_SOUNDS[koreanName] || "generic_technique";
            console.log(
              `[Korean Technique Audio] ${koreanName} -> ${soundKey}`
            );

            // Generate Korean technique-specific procedural audio
            const source = webAudioContext.createOscillator();
            const gainNode = webAudioContext.createGain();

            source.connect(gainNode);
            gainNode.connect(sfxGainNode);

            const frequency = getKoreanTechniqueFrequency(koreanName);
            source.frequency.setValueAtTime(
              frequency,
              webAudioContext.currentTime
            );
            gainNode.gain.setValueAtTime(0.4, webAudioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
              0.01,
              webAudioContext.currentTime + 0.8
            );

            source.start(webAudioContext.currentTime);
            source.stop(webAudioContext.currentTime + 0.8);
          },

          playStanceChangeSound: () => {
            audioManagerRef.current?.playSFX("stance_change", { volume: 0.6 });
          },

          playBlockSound: () => {
            audioManagerRef.current?.playSFX("block_success", { volume: 0.7 });
          },

          stopAllSounds: () => {
            console.log("[Black Trigram Audio] Stopping all sounds");
            activeSourcesRef.current.forEach((source) => {
              try {
                source.stop();
              } catch (e) {
                // Source may already be stopped
              }
            });
            activeSourcesRef.current.clear();
          },
        };

        setAudioState((prev) => ({ ...prev, isInitialized: true }));
        console.log(
          "[Black Trigram Audio] Audio system initialized successfully"
        );
      } catch (error) {
        console.warn(
          "[Black Trigram Audio] Audio initialization failed, using fallback mode:",
          error
        );

        // Create fallback audio manager for environments without Web Audio API
        audioManagerRef.current = createFallbackAudioManager();
        setAudioState((prev) => ({
          ...prev,
          isInitialized: true,
          fallbackMode: true,
        }));
      }
    };

    initializeAudio();
  }, []);

  // Korean martial arts specific audio methods
  const playTrigramTransitionSound = (
    from: TrigramStance,
    to: TrigramStance
  ) => {
    const transitionSound =
      TRIGRAM_TRANSITION_SOUNDS[from]?.[to] || "stance_change";
    console.log(`[Trigram Transition] ${from} -> ${to}: ${transitionSound}`);
    audioManagerRef.current?.playSFX("stance_change", { volume: 0.5 });
  };

  const playArchetypeSpecificSound = (
    archetype: PlayerArchetype,
    action: string
  ) => {
    const soundKey =
      ARCHETYPE_SOUNDS[archetype]?.[action] || `${archetype}_generic`;
    console.log(`[Archetype Audio] ${archetype} ${action}: ${soundKey}`);
    audioManagerRef.current?.playSFX("menu_select", { volume: 0.6 });
  };

  const playKoreanTechniqueAudio = (
    koreanName: string,
    englishName: string
  ) => {
    console.log(`[Korean Technique] ${koreanName} (${englishName})`);
    audioManagerRef.current?.playTechniqueSound(koreanName);
  };

  // Create context value with Korean martial arts extensions
  const contextValue: AudioContextInterface = {
    ...audioManagerRef.current!,
    isInitialized: audioState.isInitialized,
    currentState: audioState,
    playTrigramTransitionSound,
    playArchetypeSpecificSound,
    playKoreanTechniqueAudio,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

// Helper functions for Korean martial arts audio generation
function getKoreanMartialArtsFrequency(soundId: SoundEffectId): number {
  const frequencies: Record<string, number> = {
    attack_light: 220, // A3 - Light, precise
    attack_medium: 330, // E4 - Balanced force
    attack_heavy: 440, // A4 - Strong impact
    attack_critical: 660, // E5 - Devastating strike
    hit_light: 180, // F#3 - Light contact
    hit_medium: 280, // C#4 - Solid hit
    hit_heavy: 380, // F#4 - Heavy impact
    hit_critical: 540, // C#5 - Critical damage
    menu_hover: 800, // Cyberpunk UI tone
    menu_select: 1000, // Confirmation tone
    stance_change: 400, // Martial transition
    block_success: 500, // Defensive success
  };

  return frequencies[soundId] || 440; // Default to A4
}

function getKoreanMartialArtsDuration(soundId: SoundEffectId): number {
  const durations: Record<string, number> = {
    attack_light: 0.2,
    attack_medium: 0.3,
    attack_heavy: 0.5,
    attack_critical: 0.8,
    hit_light: 0.15,
    hit_medium: 0.25,
    hit_heavy: 0.4,
    hit_critical: 0.6,
    menu_hover: 0.1,
    menu_select: 0.3,
    stance_change: 0.4,
    block_success: 0.3,
  };

  return durations[soundId] || 0.3; // Default duration
}

function getKoreanTraditionalFrequency(musicId: MusicTrackId): number {
  const frequencies: Record<string, number> = {
    combat_theme: 110, // A2 - Deep, intense
    menu_theme: 220, // A3 - Welcoming
    training_theme: 165, // E3 - Focused practice
    intro_theme: 130, // C3 - Introduction
    victory_theme: 330, // E4 - Triumphant
    ambient_dojang: 90, // F#2 - Meditative background
  };

  return frequencies[musicId] || 220; // Default to A3
}

function getKoreanTechniqueFrequency(koreanName: string): number {
  // Generate frequency based on Korean syllable count and meaning
  const syllableCount = koreanName.length;
  const baseFrequency = 200;

  // Different frequency ranges for different technique types
  if (koreanName.includes("천둥") || koreanName.includes("벽력")) {
    return baseFrequency * 2; // Thunder techniques - higher pitch
  } else if (koreanName.includes("수") || koreanName.includes("유")) {
    return baseFrequency * 1.2; // Water techniques - flowing pitch
  } else if (koreanName.includes("화") || koreanName.includes("불")) {
    return baseFrequency * 1.8; // Fire techniques - aggressive pitch
  }

  return baseFrequency + syllableCount * 30; // Base calculation
}

function createFallbackAudioManager(): IAudioManager {
  console.log("[Black Trigram Audio] Creating fallback audio manager");

  return {
    playSFX: (id: SoundEffectId, options?: AudioPlaybackOptions) => {
      console.log(`[Fallback Audio] SFX: ${id}`, options);
      return null;
    },
    playMusic: (id: MusicTrackId, options?: AudioPlaybackOptions) => {
      console.log(`[Fallback Audio] Music: ${id}`, options);
      return null;
    },
    stopMusic: () => console.log("[Fallback Audio] Stop music"),
    setMasterVolume: (volume: number) =>
      console.log(`[Fallback Audio] Master volume: ${volume}`),
    setSFXVolume: (volume: number) =>
      console.log(`[Fallback Audio] SFX volume: ${volume}`),
    setMusicVolume: (volume: number) =>
      console.log(`[Fallback Audio] Music volume: ${volume}`),
    setMuted: (muted: boolean) =>
      console.log(`[Fallback Audio] Muted: ${muted}`),
    getState: () => ({
      masterVolume: 1.0,
      sfxVolume: 1.0,
      musicVolume: 1.0,
      muted: false,
      currentMusicTrack: null,
      isInitialized: true,
      fallbackMode: true,
    }),
    playAttackSound: (damage: number) =>
      console.log(`[Fallback Audio] Attack: ${damage} damage`),
    playHitSound: (damage: number, isVitalPoint?: boolean) =>
      console.log(
        `[Fallback Audio] Hit: ${damage} damage${
          isVitalPoint ? " (vital point)" : ""
        }`
      ),
    playTechniqueSound: (koreanName: string) =>
      console.log(`[Fallback Audio] Technique: ${koreanName}`),
    playStanceChangeSound: () => console.log("[Fallback Audio] Stance change"),
    playBlockSound: () => console.log("[Fallback Audio] Block"),
    stopAllSounds: () => console.log("[Fallback Audio] Stop all sounds"),
  };
}

// Custom hook to use audio context
export function useAudio(): AudioContextInterface {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

// Export default for compatibility
export default AudioProvider;
