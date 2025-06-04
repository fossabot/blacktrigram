import React, { useCallback } from "react";
import type { TrigramStance, PlayerState } from "../../../types";
import { KoreanText } from "../../ui/base/korean-text/KoreanText";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../../types/constants";

interface CombatControlsProps {
  readonly player: PlayerState;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly onAttack: () => void;
  readonly onBlock: () => void;
  readonly onSpecialTechnique: () => void;
  readonly disabled?: boolean;
}

export function CombatControls({
  player,
  onStanceChange,
  onAttack,
  onBlock,
  onSpecialTechnique,
  disabled = false,
}: CombatControlsProps): React.JSX.Element {
  const stances: TrigramStance[] = [
    "geon",
    "tae",
    "li",
    "jin",
    "son",
    "gam",
    "gan",
    "gon",
  ];

  const handleStanceClick = useCallback(
    (stance: TrigramStance) => {
      if (!disabled && stance !== player.stance) {
        onStanceChange(stance);
      }
    },
    [disabled, player.stance, onStanceChange]
  );

  const buttonStyle = (isActive: boolean, color: number) => ({
    padding: "0.5rem 1rem",
    margin: "0.25rem",
    background: isActive
      ? `#${color.toString(16).padStart(6, "0")}`
      : "rgba(255, 255, 255, 0.1)",
    color: isActive ? "#000000" : "#ffffff",
    border: `1px solid #${color.toString(16).padStart(6, "0")}`,
    borderRadius: "4px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: "all 0.2s ease",
    fontFamily: '"Noto Sans KR", Arial, sans-serif',
    fontSize: "0.8rem",
    minWidth: "80px",
  });

  const actionButtonStyle = (color: number, canUse: boolean = true) => ({
    padding: "1rem 2rem",
    margin: "0.5rem",
    background: canUse
      ? `#${color.toString(16).padStart(6, "0")}`
      : "rgba(128, 128, 128, 0.3)",
    color: canUse ? "#000000" : "#666666",
    border: `2px solid #${color.toString(16).padStart(6, "0")}`,
    borderRadius: "8px",
    cursor: disabled || !canUse ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: "all 0.2s ease",
    fontFamily: '"Noto Sans KR", Arial, sans-serif',
    fontSize: "1rem",
    fontWeight: "bold",
    minWidth: "120px",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0, 0, 0, 0.9)",
        border: `2px solid #${KOREAN_COLORS.GOLD.toString(16)}`,
        borderRadius: "12px",
        padding: "1.5rem",
        color: "#ffffff",
        fontFamily: '"Noto Sans KR", Arial, sans-serif',
      }}
    >
      {/* Stance Selection */}
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <KoreanText
          korean="팔괘 자세 선택"
          english="Eight Trigram Stance Selection"
          size="medium"
          weight={600}
          style={{ marginBottom: "0.5rem" }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.5rem",
            maxWidth: "400px",
          }}
        >
          {stances.map((stance) => {
            const trigramData = TRIGRAM_DATA[stance];
            const stanceColor =
              KOREAN_COLORS[stance as keyof typeof KOREAN_COLORS] ||
              KOREAN_COLORS.WHITE;
            const isActive = player.stance === stance;

            return (
              <button
                key={stance}
                onClick={() => handleStanceClick(stance)}
                style={buttonStyle(isActive, stanceColor)}
                title={`${trigramData.name.korean} (${trigramData.name.english})`}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem", marginBottom: "0.2rem" }}>
                    {trigramData.symbol}
                  </div>
                  <div style={{ fontSize: "0.7rem" }}>
                    {trigramData.name.korean}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Combat Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onAttack}
          disabled={disabled || player.stamina < 15}
          style={actionButtonStyle(KOREAN_COLORS.RED, player.stamina >= 15)}
        >
          <KoreanText
            korean="공격"
            english="Attack"
            size="medium"
            weight={700}
          />
        </button>

        <button
          onClick={onBlock}
          disabled={disabled || player.stamina < 10}
          style={actionButtonStyle(KOREAN_COLORS.BLUE, player.stamina >= 10)}
        >
          <KoreanText
            korean="방어"
            english="Block"
            size="medium"
            weight={700}
          />
        </button>

        <button
          onClick={onSpecialTechnique}
          disabled={disabled || player.ki < 25}
          style={actionButtonStyle(KOREAN_COLORS.PURPLE, player.ki >= 25)}
        >
          <KoreanText
            korean="특수기"
            english="Special"
            size="medium"
            weight={700}
          />
        </button>
      </div>

      {/* Current Technique Info */}
      <div
        style={{
          marginTop: "1rem",
          padding: "0.5rem",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <KoreanText
          korean={`현재 기법: ${
            TRIGRAM_DATA[player.stance].technique.koreanName
          }`}
          english={`Current Technique: ${
            TRIGRAM_DATA[player.stance].technique.englishName
          }`}
          size="small"
          weight={500}
        />
      </div>
    </div>
  );
}
