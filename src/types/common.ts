// Common basic types shared across the application

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export type Vector2D = Position;

export interface TrilingualName {
  readonly english: string;
  readonly korean: string;
  readonly chinese?: string;
}
