import { useState, useEffect } from "react";
import { Texture, Assets } from "pixi.js";
import type { TextureState } from "../types";

export function useTexture(url: string): TextureState {
  const [state, setState] = useState<TextureState>({
    texture: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const loadTexture = async (): Promise<void> => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const texture = await Assets.load(url);

        if (!cancelled) {
          setState({
            texture,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            texture: null,
            loading: false,
            error:
              error instanceof Error
                ? error
                : new Error("Failed to load texture"),
          });
        }
      }
    };

    loadTexture();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}

// Texture cache to prevent reloading
const textureCache = new Map<string, Texture>();

// Preload commonly used textures
export async function preloadGameTextures(): Promise<void> {
  const commonTextures = [
    "/dark-trigram-256.png",
    "/trigram-effects.png",
    "/vital-points.png",
  ];

  try {
    await Promise.all(
      commonTextures.map(async (url) => {
        if (!textureCache.has(url)) {
          const texture = await Assets.load(url);
          textureCache.set(url, texture);
        }
      })
    );
  } catch (error) {
    console.warn(
      "[preloadGameTextures] Some textures failed to preload:",
      error
    );
  }
}
