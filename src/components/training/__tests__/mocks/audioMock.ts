import { vi } from "vitest";

export const createAudioMock = () => ({
  playSFX: vi.fn(),
  playMusic: vi.fn(),
  playAttackSound: vi.fn(),
  playHitSound: vi.fn(),
  playComboSound: vi.fn(),
  playStanceChangeSound: vi.fn(),
  setMasterVolume: vi.fn(),
  getMasterVolume: vi.fn(() => 0.7),
  isEnabled: vi.fn(() => true),
});

export type AudioMockType = ReturnType<typeof createAudioMock>;
