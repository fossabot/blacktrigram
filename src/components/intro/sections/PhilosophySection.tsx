import React from "react";
import { KoreanText } from "../../ui/base/korean-text";
import { useAudio } from "../../../audio/AudioManager";
import type { PhilosophySectionProps } from "../../../types/components";

/**
 * Philosophy section explaining Korean martial arts principles
 * Deep dive into the cultural and philosophical foundations
 */
export function PhilosophySection({
  onGamePhaseChange,
}: PhilosophySectionProps): React.JSX.Element {
  const audio = useAudio();

  const philosophyPrinciples = [
    {
      korean: "존중",
      english: "Respect",
      trigram: "☰",
      description:
        "Honor the art, your opponent, and yourself. In Korean martial arts, respect (존중) forms the foundation of all training.",
      culturalNote:
        "This principle stems from Confucian values deeply embedded in Korean culture.",
    },
    {
      korean: "수련",
      english: "Discipline",
      trigram: "☱",
      description:
        "Dedicated practice leads to mastery. Suryeon (수련) represents the endless journey of self-improvement.",
      culturalNote:
        "Korean martial artists traditionally train for decades, viewing it as lifelong cultivation.",
    },
    {
      korean: "정확",
      english: "Precision",
      trigram: "☲",
      description:
        "Every technique must be executed perfectly. Precision (정확) in Korean martial arts targets vital points with surgical accuracy.",
      culturalNote:
        "This reflects the Korean aesthetic of perfectionism and attention to detail.",
    },
    {
      korean: "지혜",
      english: "Wisdom",
      trigram: "☳",
      description:
        "Understanding beyond mere physical technique. Wisdom (지혜) guides when and how to apply martial knowledge.",
      culturalNote:
        "Influenced by Buddhist and Daoist philosophy integrated into Korean martial traditions.",
    },
    {
      korean: "균형",
      english: "Balance",
      trigram: "☴",
      description:
        "Harmony of mind, body, and spirit. Balance (균형) represents the Korean concept of wholistic development.",
      culturalNote:
        "Derived from the I Ching philosophy that influences Korean martial arts.",
    },
  ];

  const handleReturnClick = () => {
    audio.playSFX("menu_select");
    onGamePhaseChange("intro");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        padding: "2rem",
        maxWidth: "900px",
        margin: "0 auto",
        background: "rgba(0, 17, 34, 0.95)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 215, 0, 0.3)",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "#ffd700",
          }}
        >
          ☯
        </div>
        <KoreanText
          korean="무도철학"
          english="Martial Philosophy"
          size="xlarge"
          weight="bold"
          color="#ffd700"
          align="center"
        />
        <div
          style={{
            marginTop: "0.5rem",
            color: "#ffffff",
            fontSize: "1rem",
            opacity: 0.8,
          }}
        >
          The philosophical foundations of Korean martial arts
        </div>
      </div>

      {/* Philosophy Principles Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "2rem",
          width: "100%",
        }}
      >
        {philosophyPrinciples.map((principle, index) => (
          <div
            key={index}
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
              border: "1px solid #ffd700",
              borderRadius: "8px",
              padding: "2rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Trigram Symbol */}
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                fontSize: "2.5rem",
                color: "#ffd700",
                opacity: 0.3,
              }}
            >
              {principle.trigram}
            </div>

            {/* Principle Title */}
            <KoreanText
              korean={principle.korean}
              english={principle.english}
              size="large"
              weight="bold"
              color="#ffd700"
              align="left"
            />

            {/* Description */}
            <p
              style={{
                marginTop: "1rem",
                color: "#ffffff",
                opacity: 0.9,
                lineHeight: 1.6,
                fontSize: "1rem",
              }}
            >
              {principle.description}
            </p>

            {/* Cultural Note */}
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "rgba(0, 255, 255, 0.1)",
                borderLeft: "3px solid #00ffff",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#00ffff",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Cultural Context:
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#e0e0e0",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                {principle.culturalNote}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Core Philosophy Statement */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 200, 255, 0.05) 100%)",
          border: "1px solid #00ffff",
          borderRadius: "8px",
          padding: "2rem",
          marginTop: "2rem",
          textAlign: "center",
          width: "100%",
        }}
      >
        <KoreanText
          korean="흑괘의 길"
          english="The Way of Black Trigram"
          size="large"
          weight="bold"
          color="#00ffff"
          align="center"
        />
        <p
          style={{
            marginTop: "1rem",
            color: "#ffffff",
            opacity: 0.9,
            lineHeight: 1.8,
            fontSize: "1.1rem",
          }}
        >
          Black Trigram (흑괘) combines traditional Korean martial arts wisdom
          with modern precision combat simulation. Through the eight trigram
          stances and 70 vital points, practitioners learn authentic techniques
          while understanding the deep philosophical foundations that have
          guided Korean martial artists for centuries.
        </p>
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "rgba(255, 215, 0, 0.1)",
            borderRadius: "4px",
            fontStyle: "italic",
          }}
        >
          <KoreanText
            korean="무술은 단순한 격투기가 아니라 인생의 철학이다"
            english="Martial arts is not mere combat, but a philosophy of life"
            size="medium"
            align="center"
            color="#ffd700"
          />
        </div>
      </div>

      {/* Return Button */}
      <button
        onClick={handleReturnClick}
        style={{
          background: "rgba(0, 255, 255, 0.2)",
          border: "2px solid #00ffff",
          color: "#00ffff",
          padding: "1rem 2rem",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "2rem",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "rgba(0, 255, 255, 0.3)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "rgba(0, 255, 255, 0.2)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <KoreanText
          korean="돌아가기"
          english="Return to Menu"
          size="medium"
          align="center"
        />
      </button>
    </div>
  );
}
