import React from "react";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
  TRIGRAM_DATA,
} from "../../../types";

export function ControlsSection(): React.ReactElement {
  return (
    <div
      className="controls-section"
      style={{
        fontFamily: KOREAN_FONT_FAMILY,
        color: KOREAN_COLORS.WHITE,
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          color: KOREAN_COLORS.GOLD,
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        조작법 (Controls)
      </h2>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
      >
        {/* Trigram Stances */}
        <div>
          <h3 style={{ color: KOREAN_COLORS.CYAN, marginBottom: "1rem" }}>
            팔괘 자세 (Trigram Stances)
          </h3>
          <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
            {Object.entries(TRIGRAM_DATA).map(([stance, data], index) => (
              <div key={stance} style={{ marginBottom: "0.5rem" }}>
                <kbd
                  style={{
                    background: KOREAN_COLORS.GOLD,
                    color: KOREAN_COLORS.BLACK,
                    padding: "2px 6px",
                    borderRadius: "3px",
                    marginRight: "0.5rem",
                  }}
                >
                  {index + 1}
                </kbd>
                <span
                  style={{
                    color: `#${data.color.toString(16).padStart(6, "0")}`,
                  }}
                >
                  {data.symbol} {data.koreanName}
                </span>
                <br />
                <span
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.8,
                    marginLeft: "2rem",
                  }}
                >
                  {data.technique.koreanName}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Combat Controls */}
        <div>
          <h3 style={{ color: KOREAN_COLORS.CYAN, marginBottom: "1rem" }}>
            전투 조작 (Combat Controls)
          </h3>
          <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <kbd
                style={{
                  background: KOREAN_COLORS.GOLD,
                  color: KOREAN_COLORS.BLACK,
                  padding: "2px 6px",
                  borderRadius: "3px",
                  marginRight: "0.5rem",
                }}
              >
                SPACE
              </kbd>
              공격 (Attack)
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <kbd
                style={{
                  background: KOREAN_COLORS.GOLD,
                  color: KOREAN_COLORS.BLACK,
                  padding: "2px 6px",
                  borderRadius: "3px",
                  marginRight: "0.5rem",
                }}
              >
                SHIFT
              </kbd>
              방어 (Block)
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <kbd
                style={{
                  background: KOREAN_COLORS.GOLD,
                  color: KOREAN_COLORS.BLACK,
                  padding: "2px 6px",
                  borderRadius: "3px",
                  marginRight: "0.5rem",
                }}
              >
                A/D
              </kbd>
              이동 (Move Left/Right)
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <kbd
                style={{
                  background: KOREAN_COLORS.GOLD,
                  color: KOREAN_COLORS.BLACK,
                  padding: "2px 6px",
                  borderRadius: "3px",
                  marginRight: "0.5rem",
                }}
              >
                ESC
              </kbd>
              메뉴 (Menu)
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          fontSize: "0.9rem",
          opacity: 0.8,
        }}
      >
        <p>각 팔괘는 고유한 철학과 전투 기술을 가지고 있습니다</p>
        <p>Each trigram has unique philosophy and combat techniques</p>
      </div>
    </div>
  );
}
