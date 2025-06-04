import React from "react";
import type { PlayerArchetype, TrigramStance } from "../types";

export interface IntroScreenProps {
  onNext: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onNext }) => {
  return <div className="intro-screen">{/* Implementation */}</div>;
};
