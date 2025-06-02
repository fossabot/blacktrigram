// filepath: /workspaces/blacktrigram/src/types/constants/trigram.ts
import type { TrigramStance } from "../enums";

// Eight Trigram stance order (팔괘 순서)
export const TRIGRAM_STANCES_ORDER = [
  "geon", // ☰ Heaven
  "tae", // ☱ Lake
  "li", // ☲ Fire
  "jin", // ☳ Thunder
  "son", // ☴ Wind
  "gam", // ☵ Water
  "gan", // ☶ Mountain
  "gon", // ☷ Earth
] as const satisfies readonly TrigramStance[];

// Trigram stance effectiveness matrix (팔괘 상성표)
export const STANCE_EFFECTIVENESS_MATRIX: Record<
  TrigramStance,
  Record<TrigramStance, number>
> = {
  geon: {
    geon: 1.0,
    tae: 1.1,
    li: 0.9,
    jin: 1.2,
    son: 0.8,
    gam: 1.1,
    gan: 0.9,
    gon: 1.3,
  },
  tae: {
    geon: 0.9,
    tae: 1.0,
    li: 1.2,
    jin: 0.8,
    son: 1.1,
    gam: 0.9,
    gan: 1.3,
    gon: 0.8,
  },
  li: {
    geon: 1.1,
    tae: 0.8,
    li: 1.0,
    jin: 0.9,
    son: 1.3,
    gam: 0.8,
    gan: 1.1,
    gon: 0.9,
  },
  jin: {
    geon: 0.8,
    tae: 1.2,
    li: 1.1,
    jin: 1.0,
    son: 0.9,
    gam: 1.3,
    gan: 0.8,
    gon: 1.1,
  },
  son: {
    geon: 1.2,
    tae: 0.9,
    li: 0.7,
    jin: 1.1,
    son: 1.0,
    gam: 1.1,
    gan: 1.3,
    gon: 0.8,
  },
  gam: {
    geon: 0.9,
    tae: 1.1,
    li: 1.2,
    jin: 0.7,
    son: 0.9,
    gam: 1.0,
    gan: 1.1,
    gon: 1.3,
  },
  gan: {
    geon: 1.1,
    tae: 0.7,
    li: 0.9,
    jin: 1.2,
    son: 0.7,
    gam: 0.9,
    gan: 1.0,
    gon: 1.1,
  },
  gon: {
    geon: 0.7,
    tae: 1.2,
    li: 1.1,
    jin: 0.9,
    son: 1.2,
    gam: 0.7,
    gan: 0.9,
    gon: 1.0,
  },
} as const;
