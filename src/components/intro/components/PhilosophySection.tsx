import React from "react";
import { KOREAN_COLORS } from "../../../types";

export interface PhilosophySectionProps {
  readonly width?: number;
  readonly height?: number;
  readonly onNext?: () => void;
  readonly onPrev?: () => void;
}

export function PhilosophySection({
  onNext,
  onPrev,
}: PhilosophySectionProps): React.ReactElement {
  return (
    <div
      className="philosophy-section"
      style={{
        width: "100%",
        height: "100%",
        padding: "2rem",
        background: `linear-gradient(135deg, ${KOREAN_COLORS.DARK_BLUE}, ${KOREAN_COLORS.BLACK})`,
        color: KOREAN_COLORS.WHITE,
        fontFamily: "Noto Sans KR, Arial, sans-serif",
        overflow: "auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ color: KOREAN_COLORS.GOLD, marginBottom: "1rem" }}>
          무술 철학 (Martial Philosophy)
        </h2>
        <p style={{ opacity: 0.8, fontSize: "1.1rem" }}>
          한국 전통 무술과 팔괘의 깊은 의미
        </p>
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* Eight Trigrams Philosophy */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "2rem",
            borderRadius: "12px",
            border: `2px solid ${KOREAN_COLORS.GOLD}`,
          }}
        >
          <h3
            style={{
              color: KOREAN_COLORS.GOLD,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            팔괘의 철학 (Philosophy of Eight Trigrams)
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>☰</div>
              <h4 style={{ color: KOREAN_COLORS.GOLD }}>건 (Heaven)</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                창조적 에너지와 순수한 양의 힘. 강력하고 지속적인 공격력을
                상징합니다.
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>☱</div>
              <h4 style={{ color: KOREAN_COLORS.GOLD }}>태 (Lake)</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                기쁨과 유연성. 흐르는 물처럼 부드럽고 연속적인 공격을
                나타냅니다.
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>☲</div>
              <h4 style={{ color: KOREAN_COLORS.GOLD }}>리 (Fire)</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                밝음과 명료함. 정확하고 치명적인 급소 공격의 정신을 담습니다.
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>☳</div>
              <h4 style={{ color: KOREAN_COLORS.GOLD }}>진 (Thunder)</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                갑작스런 움직임과 행동. 번개같이 빠르고 강력한 일격을
                의미합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Korean Martial Arts Principles */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "2rem",
            borderRadius: "12px",
            border: `1px solid ${KOREAN_COLORS.CYAN}`,
          }}
        >
          <h3
            style={{
              color: KOREAN_COLORS.CYAN,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            한국 무술의 원리 (Korean Martial Arts Principles)
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
          >
            <div>
              <h4
                style={{
                  color: KOREAN_COLORS.GOLD,
                  marginBottom: "1rem",
                }}
              >
                정신 수양 (Mental Cultivation)
              </h4>
              <p
                style={{
                  lineHeight: "1.6",
                  fontSize: "0.95rem",
                }}
              >
                한국 무술은 단순한 기술이 아닌 정신과 몸의 통합을 추구합니다.
                집중력, 인내, 그리고 내적 평화를 통해 진정한 강함을 얻습니다.
              </p>
            </div>

            <div>
              <h4
                style={{
                  color: KOREAN_COLORS.GOLD,
                  marginBottom: "1rem",
                }}
              >
                조화와 균형 (Harmony and Balance)
              </h4>
              <p
                style={{
                  lineHeight: "1.6",
                  fontSize: "0.95rem",
                }}
              >
                음양의 원리에 따라 공격과 방어, 강함과 부드러움의 균형을 이루어
                상대를 제압하지 않고 조화를 이룹니다.
              </p>
            </div>

            <div>
              <h4
                style={{
                  color: KOREAN_COLORS.GOLD,
                  marginBottom: "1rem",
                }}
              >
                급소술의 정밀함 (Precision of Vital Points)
              </h4>
              <p
                style={{
                  lineHeight: "1.6",
                  fontSize: "0.95rem",
                }}
              >
                전통 한의학의 경혈과 급소에 대한 깊은 이해를 바탕으로 최소한의
                힘으로 최대의 효과를 얻는 기술을 연마합니다.
              </p>
            </div>

            <div>
              <h4
                style={{
                  color: KOREAN_COLORS.GOLD,
                  marginBottom: "1rem",
                }}
              >
                도덕적 수행 (Moral Practice)
              </h4>
              <p
                style={{
                  lineHeight: "1.6",
                  fontSize: "0.95rem",
                }}
              >
                무술은 자신을 보호하고 약자를 지키기 위한 수단이며, 힘을 함부로
                사용하지 않는 절제와 겸손을 배웁니다.
              </p>
            </div>
          </div>
        </div>

        {/* Training Philosophy */}
        <div
          style={{
            background: `linear-gradient(45deg, ${KOREAN_COLORS.TRADITIONAL_RED}20, ${KOREAN_COLORS.DOJANG_BLUE}20)`,
            padding: "2rem",
            borderRadius: "12px",
            border: `1px solid ${KOREAN_COLORS.WHITE}`,
            textAlign: "center",
          }}
        >
          <h3 style={{ color: KOREAN_COLORS.GOLD, marginBottom: "1rem" }}>
            수련의 길 (The Path of Training)
          </h3>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              fontStyle: "italic",
              opacity: 0.95,
            }}
          >
            "천천히 서두르라" - 급하지 않게 꾸준히 연마하여 몸과 마음이 하나가
            되는 경지에 이르는 것이 진정한 무술의 완성입니다.
          </p>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.9rem",
              opacity: 0.8,
            }}
          >
            "Make haste slowly" - Through patient and consistent practice,
            achieve the unity of body and mind that is true martial mastery.
          </p>
        </div>
      </div>

      {/* Navigation controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {onPrev && (
          <button
            onClick={onPrev}
            style={{
              background: `linear-gradient(45deg, ${KOREAN_COLORS.ACCENT_BLUE}, ${KOREAN_COLORS.DOJANG_BLUE})`,
              color: KOREAN_COLORS.WHITE,
              border: `1px solid ${KOREAN_COLORS.GOLD}`,
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "Noto Sans KR, Arial, sans-serif",
              fontSize: "1rem",
              transition: "all 0.3s ease",
            }}
          >
            ← 이전 (Previous)
          </button>
        )}

        {onNext && (
          <button
            onClick={onNext}
            style={{
              background: `linear-gradient(45deg, ${KOREAN_COLORS.TRADITIONAL_RED}, ${KOREAN_COLORS.GOLD})`,
              color: KOREAN_COLORS.WHITE,
              border: `1px solid ${KOREAN_COLORS.GOLD}`,
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "Noto Sans KR, Arial, sans-serif",
              fontSize: "1rem",
              transition: "all 0.3s ease",
            }}
          >
            다음 (Next) →
          </button>
        )}
      </div>
    </div>
  );
}
