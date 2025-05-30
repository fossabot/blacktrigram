import React, { useCallback } from "react";
import type { GamePhase } from "../../../types";
import { KOREAN_COLORS } from "../../../types";

export interface MenuSectionProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly width?: number;
  readonly height?: number;
}

export function MenuSection({
  onGamePhaseChange,
}: MenuSectionProps): React.ReactElement {
  const handleTrainingMode = useCallback(() => {
    onGamePhaseChange("training");
  }, [onGamePhaseChange]);

  const handleCombatMode = useCallback(() => {
    onGamePhaseChange("combat");
  }, [onGamePhaseChange]);

  const handlePhilosophyMode = useCallback(() => {
    onGamePhaseChange("philosophy");
  }, [onGamePhaseChange]);

  return (
    <div data-menu-section className="menu-section">
      <div className="korean-menu-container">
        <h2 className="korean-title" style={{ color: KOREAN_COLORS.GOLD }}>
          흑괘 무술 도장
        </h2>
        <p className="korean-subtitle">Black Trigram Martial Arts</p>

        <div className="menu-buttons">
          <button
            className="korean-menu-button"
            onClick={handleTrainingMode}
            style={{
              backgroundColor: KOREAN_COLORS.TRADITIONAL_RED,
              color: KOREAN_COLORS.WHITE,
            }}
          >
            <span className="korean-text">수련 모드</span>
            <span className="english-text">Training Mode</span>
          </button>

          <button
            className="korean-menu-button"
            onClick={handleCombatMode}
            style={{
              backgroundColor: KOREAN_COLORS.DOJANG_BLUE,
              color: KOREAN_COLORS.WHITE,
            }}
          >
            <span className="korean-text">대전 모드</span>
            <span className="english-text">Combat Mode</span>
          </button>

          <button
            className="korean-menu-button"
            onClick={handlePhilosophyMode}
            style={{
              backgroundColor: KOREAN_COLORS.GOLD,
              color: KOREAN_COLORS.BLACK,
            }}
          >
            <span className="korean-text">철학 연구</span>
            <span className="english-text">Philosophy Study</span>
          </button>
        </div>
      </div>
    </div>
  );
}
