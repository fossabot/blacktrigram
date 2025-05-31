// Types related to status effects and conditions

export interface StatusEffect {
  type: string;
  duration: number;
  magnitude?: number;
  chance?: number;
  source?: string;
}

export interface Condition {
  type: string;
  duration: number;
  magnitude?: number;
  source: string;
}
