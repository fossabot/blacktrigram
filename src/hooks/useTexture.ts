import { useState, useEffect } from "react";
import { Texture, Assets } from "pixi.js";

interface UseTextureResult {
  readonly texture: Texture | null;
  readonly loading: boolean;
  readonly error: string | null;
}

// Texture cache to prevent reloading
const textureCache = new Map<string, Texture>();

export function useTexture(url: string): UseTextureResult {
  const [texture, setTexture] = useState<Texture | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check cache first
    if (textureCache.has(url)) {
      const cachedTexture = textureCache.get(url);
      if (cachedTexture) {
        setTexture(cachedTexture);
        setLoading(false);
        return;
      }
    }

    let cancelled = false;

    const loadTexture = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const loadedTexture = await Assets.load(url);

        if (!cancelled) {
          // Cache the texture
          textureCache.set(url, loadedTexture);
          setTexture(loadedTexture);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : `Failed to load texture: ${url}`;
          setError(errorMessage);
          setLoading(false);
          console.warn(`[useTexture] ${errorMessage}`);
        }
      }
    };

    loadTexture();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { texture, loading, error };
}

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
