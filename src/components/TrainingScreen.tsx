import React from "react";
import type { PlayerArchetype, TrigramStance } from "../types";

export interface TrainingScreenProps {
  onBack: () => void;
}

export const TrainingScreen: React.FC<TrainingScreenProps> = ({ onBack }) => {
  return <div className="training-screen">{/* Implementation */}</div>;
};
