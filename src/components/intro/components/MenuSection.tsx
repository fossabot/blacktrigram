import React, { useCallback } from "react";
import { BaseButton } from "../../ui/base/BaseButton";
import { KoreanText } from "../../ui/base/KoreanText";
import { KOREAN_COLORS } from "../../../types";
import { useAudio } from "../../../audio/AudioManager";

export interface MenuSectionProps {
  readonly onGamePhaseChange: (phase: string) => void;
}

export function MenuSection({
  onGamePhaseChange,
}: MenuSectionProps): React.ReactElement {
  const audio = useAudio();

  const menuItems = [
    {
      korean: "전투 시작",
      english: "Start Combat",
      action: () => onGamePhaseChange("combat"),
      key: "combat",
    },
    {
      korean: "수련 모드",
      english: "Training Mode",
      action: () => onGamePhaseChange("training"),
      key: "training",
    },
    {
      korean: "철학 연구",
      english: "Philosophy Study",
      action: () => onGamePhaseChange("philosophy"),
      key: "philosophy",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "center",
      }}
    >
      <KoreanText
        text="메뉴 선택"
        englishText="Select Mode"
        size="xlarge"
        color={`#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`}
        showBoth={true}
        style={{ textAlign: "center", marginBottom: "1rem" }}
      />

      <div
        style={{
          display: "grid",
          gap: "1rem",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {menuItems.map((item) => (
          <BaseButton
            key={item.key}
            onClick={() => {
              audio.playSFX("menu_select");
              item.action();
            }}
            variant="primary"
            size="large"
            style={{
              padding: "1.5rem 2rem",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
              {item.korean}
            </div>
            <div style={{ fontSize: "1rem", opacity: 0.8 }}>{item.english}</div>
          </BaseButton>
        ))}
      </div>

      {/* Audio Controls */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          border: `1px solid rgba(${KOREAN_COLORS.CYAN}, 0.3)`,
        }}
      >
        <KoreanText
          text="오디오 설정"
          englishText="Audio Settings"
          size="medium"
          showBoth={true}
          style={{ marginBottom: "1rem" }}
        />

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <BaseButton
            onClick={() => {
              audio.toggleMute();
              audio.playSFX("menu_click");
            }}
            variant="secondary"
            size="small"
          >
            {audio.getState().muted ? "음소거 해제" : "음소거"}
          </BaseButton>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.9rem" }}>볼륨:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={audio.getState().masterVolume}
              onChange={(e) => {
                audio.setMasterVolume(parseFloat(e.target.value));
              }}
              style={{
                width: "100px",
                accentColor: `#${KOREAN_COLORS.CYAN.toString(16).padStart(
                  6,
                  "0"
                )}`,
              }}
            />
            <span style={{ fontSize: "0.8rem", minWidth: "30px" }}>
              {Math.round(audio.getState().masterVolume * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
