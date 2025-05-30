import React from "react";
import { KOREAN_COLORS } from "../../../types";

export interface ControlsSectionProps {
  readonly width?: number;
  readonly height?: number;
}

export function ControlsSection({}: ControlsSectionProps): React.ReactElement {
  return (
    <div
      className="controls-section"
      style={{
        width: "100%",
        height: "100%",
        padding: "2rem",
        background: `linear-gradient(135deg, ${KOREAN_COLORS.DARK_BLUE}, ${KOREAN_COLORS.BLACK})`,
        color: KOREAN_COLORS.WHITE,
        fontFamily: "Noto Sans KR, Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ color: KOREAN_COLORS.GOLD, marginBottom: "1rem" }}>
          조작법 안내 (Control Guide)
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Basic Controls */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "1.5rem",
            borderRadius: "8px",
            border: `1px solid ${KOREAN_COLORS.GOLD}`,
          }}
        >
          <h3 style={{ color: KOREAN_COLORS.GOLD, marginBottom: "1rem" }}>
            기본 조작 (Basic Controls)
          </h3>
          <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
            <p>
              <strong>WASD</strong> - 이동 (Movement)
            </p>
            <p>
              <strong>마우스</strong> - 공격 조준 (Attack Targeting)
            </p>
            <p>
              <strong>클릭</strong> - 공격 실행 (Execute Attack)
            </p>
            <p>
              <strong>Shift</strong> - 방어 (Block/Guard)
            </p>
            <p>
              <strong>Space</strong> - 일시정지 (Pause)
            </p>
          </div>
        </div>

        {/* Trigram Stances */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "1.5rem",
            borderRadius: "8px",
            border: `1px solid ${KOREAN_COLORS.GOLD}`,
          }}
        >
          <h3 style={{ color: KOREAN_COLORS.GOLD, marginBottom: "1rem" }}>
            팔괘 자세 (Trigram Stances)
          </h3>
          <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
            <p>
              <strong>1</strong> - 건 ☰ (Heaven)
            </p>
            <p>
              <strong>2</strong> - 태 ☱ (Lake)
            </p>
            <p>
              <strong>3</strong> - 리 ☲ (Fire)
            </p>
            <p>
              <strong>4</strong> - 진 ☳ (Thunder)
            </p>
            <p>
              <strong>5</strong> - 손 ☴ (Wind)
            </p>
            <p>
              <strong>6</strong> - 감 ☵ (Water)
            </p>
            <p>
              <strong>7</strong> - 간 ☶ (Mountain)
            </p>
            <p>
              <strong>8</strong> - 곤 ☷ (Earth)
            </p>
          </div>
        </div>

        {/* Advanced Techniques */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "1.5rem",
            borderRadius: "8px",
            border: `1px solid ${KOREAN_COLORS.GOLD}`,
            gridColumn: "1 / -1",
          }}
        >
          <h3 style={{ color: KOREAN_COLORS.GOLD, marginBottom: "1rem" }}>
            고급 기술 (Advanced Techniques)
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
              fontSize: "0.9rem",
            }}
          >
            <div>
              <h4
                style={{
                  color: KOREAN_COLORS.CYAN,
                  marginBottom: "0.5rem",
                }}
              >
                급소 공격 (Vital Point Targeting)
              </h4>
              <p>
                정확한 마우스 조준으로 상대의 급소를 노려 추가 피해를 입힙니다.
              </p>
            </div>
            <div>
              <h4
                style={{
                  color: KOREAN_COLORS.CYAN,
                  marginBottom: "0.5rem",
                }}
              >
                자세 연계 (Stance Combos)
              </h4>
              <p>팔괘 자세를 빠르게 전환하여 강력한 연계 기술을 사용합니다.</p>
            </div>
            <div>
              <h4
                style={{
                  color: KOREAN_COLORS.CYAN,
                  marginBottom: "0.5rem",
                }}
              >
                기 관리 (Ki Management)
              </h4>
              <p>기력을 효율적으로 관리하여 지속적인 전투를 유지합니다.</p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          opacity: 0.7,
          fontSize: "0.8rem",
        }}
      >
        <p>한국 전통 무술의 정신으로 정확하고 절제된 움직임을 연습하세요.</p>
        <p>
          Practice precise and disciplined movements in the spirit of Korean
          martial arts.
        </p>
      </div>
    </div>
  );
}
