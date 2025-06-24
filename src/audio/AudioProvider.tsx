import React, { createContext, useContext, useEffect, useState } from "react";
import { AudioAsset, AudioConfig } from "./";
import AudioManager from "./AudioManager";
import placeholderAssets from "./placeholder-sounds";
import { IAudioManager } from "./types";

export interface AudioProviderProps {
  children: React.ReactNode;
  config?: Partial<AudioConfig>;
  manager?: IAudioManager;
}

export const AudioContext = createContext<IAudioManager | null>(null);

export const useAudio = (): IAudioManager => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be inside AudioProvider");
  return ctx;
};

export const AudioProvider: React.FC<AudioProviderProps> = ({
  children,
  config,
  manager,
}) => {
  const [audioManager] = useState<IAudioManager>(
    () => manager || new AudioManager(config)
  );

  useEffect(() => {
    (async () => {
      await audioManager.initialize(); // no args
      // preload all placeholder assets
      const list = Object.values(placeholderAssets).flat() as AudioAsset[];
      await Promise.all(list.map((a) => audioManager.loadAsset(a)));
    })();
  }, [audioManager]);

  return (
    <AudioContext.Provider value={audioManager}>
      {children}
    </AudioContext.Provider>
  );
};
