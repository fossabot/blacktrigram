import React from "react";
import { KoreanText } from "../../ui/base/korean-text";
import { useAudio } from "../../../audio/AudioProvider"; // Fixed: Import from AudioProvider instead
import type { PhilosophySectionProps } from "../../../types/components";

/**
 * Philosophy section explaining Korean martial arts principles
 * Deep dive into the cultural and philosophical foundations of 흑괘 (Black Trigram)
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
      element: "Heaven",
      description:
        "Honor the art, your opponent, and yourself. In Korean martial arts, respect (존중) forms the foundation of all training and combat philosophy.",
      culturalNote:
        "This principle stems from Confucian values deeply embedded in Korean culture, emphasizing hierarchy, respect for elders, and mutual honor.",
      practicalApplication:
        "Always bow before and after training, show respect to opponents even in defeat.",
    },
    {
      korean: "수련",
      english: "Discipline",
      trigram: "☱",
      element: "Lake",
      description:
        "Dedicated practice leads to mastery. Suryeon (수련) represents the endless journey of self-improvement through consistent training.",
      culturalNote:
        "Korean martial artists traditionally train for decades, viewing martial arts as lifelong cultivation of mind, body, and spirit.",
      practicalApplication:
        "Daily practice of forms, meditation, and technique refinement builds true martial skill.",
    },
    {
      korean: "정확",
      english: "Precision",
      trigram: "☲",
      element: "Fire",
      description:
        "Every technique must be executed perfectly. Precision (정확) in Korean martial arts targets vital points with surgical accuracy.",
      culturalNote:
        "This reflects the Korean aesthetic of perfectionism and attention to detail, seen in all aspects of Korean culture.",
      practicalApplication:
        "Focus on exact positioning, timing, and targeting of the 70 vital points for maximum effectiveness.",
    },
    {
      korean: "지혜",
      english: "Wisdom",
      trigram: "☳",
      element: "Thunder",
      description:
        "Understanding beyond mere physical technique. Wisdom (지혜) guides when and how to apply martial knowledge appropriately.",
      culturalNote:
        "Influenced by Buddhist and Daoist philosophy integrated into Korean martial traditions over centuries.",
      practicalApplication:
        "Know when to fight, when to yield, and when to use minimum force for maximum effect.",
    },
    {
      korean: "균형",
      english: "Balance",
      trigram: "☴",
      element: "Wind",
      description:
        "Harmony of mind, body, and spirit. Balance (균형) represents the Korean concept of wholistic development and inner peace.",
      culturalNote:
        "Derived from the I Ching philosophy that influences Korean martial arts, emphasizing the balance of opposing forces.",
      practicalApplication:
        "Maintain physical balance in stances, emotional balance in combat, and spiritual balance in life.",
    },
  ];

  const handleReturnClick = () => {
    audio.playSFX("menu_select");
    onGamePhaseChange("intro");
  };

  const handleSectionHover = () => {
    audio.playSFX("menu_hover");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        padding: "2rem",
        maxWidth: "1000px",
        margin: "0 auto",
        background:
          "linear-gradient(135deg, rgba(0, 17, 34, 0.95) 0%, rgba(0, 34, 68, 0.9) 100%)",
        borderRadius: "12px",
        border: "2px solid rgba(255, 215, 0, 0.4)",
        boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)",
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            color: "#ffd700",
            textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
          }}
        >
          ☯ ☰☱☲☳☴☵☶☷ ☯
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
            marginTop: "1rem",
            color: "#00ffff",
            fontSize: "1.1rem",
            opacity: 0.9,
            fontStyle: "italic",
          }}
        >
          The philosophical foundations of Korean martial arts • 한국 무술의
          철학적 기초
        </div>
      </div>

      {/* Philosophy Principles Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
          gap: "2.5rem",
          width: "100%",
        }}
      >
        {philosophyPrinciples.map((principle, index) => (
          <div
            key={index}
            onMouseEnter={handleSectionHover}
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.12) 0%, rgba(255, 215, 0, 0.06) 100%)",
              border: "2px solid #ffd700",
              borderRadius: "12px",
              padding: "2.5rem",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(255, 215, 0, 0.3)";
              e.currentTarget.style.borderColor = "#ffed4e";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#ffd700";
            }}
          >
            {/* Trigram Symbol and Element */}
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  color: "#ffd700",
                  opacity: 0.4,
                  lineHeight: 1,
                }}
              >
                {principle.trigram}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#ffd700",
                  opacity: 0.6,
                  marginTop: "0.2rem",
                }}
              >
                {principle.element}
              </div>
            </div>

            {/* Principle Title */}
            <div style={{ marginBottom: "1.5rem" }}>
              <KoreanText
                korean={principle.korean}
                english={principle.english}
                size="large"
                weight="bold"
                color="#ffd700"
                align="left"
              />
            </div>

            {/* Main Description */}
            <div
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "6px",
                borderLeft: "4px solid #ffd700",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#ffffff",
                  opacity: 0.95,
                  lineHeight: 1.6,
                  fontSize: "1rem",
                }}
              >
                {principle.description}
              </p>
            </div>

            {/* Cultural Context */}
            <div
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                background: "rgba(0, 255, 255, 0.08)",
                borderLeft: "3px solid #00ffff",
                borderRadius: "6px",
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
                문화적 맥락 • Cultural Context:
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "#e0e0e0",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                {principle.culturalNote}
              </p>
            </div>

            {/* Practical Application */}
            <div
              style={{
                padding: "1rem",
                background: "rgba(0, 255, 0, 0.05)",
                borderLeft: "3px solid #90ee90",
                borderRadius: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#90ee90",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                실전 적용 • Practical Application:
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "#e0e0e0",
                  lineHeight: 1.5,
                }}
              >
                {principle.practicalApplication}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Core Philosophy Statement */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(0, 200, 255, 0.08) 100%)",
          border: "2px solid #00ffff",
          borderRadius: "12px",
          padding: "3rem",
          marginTop: "2rem",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <KoreanText
            korean="흑괘의 길"
            english="The Way of Black Trigram"
            size="xlarge"
            weight="bold"
            color="#00ffff"
            align="center"
          />
        </div>

        <p
          style={{
            marginBottom: "2rem",
            color: "#ffffff",
            opacity: 0.95,
            lineHeight: 1.8,
            fontSize: "1.1rem",
            maxWidth: "800px",
            margin: "0 auto 2rem auto",
          }}
        >
          Black Trigram (흑괘) represents the synthesis of ancient Korean
          martial wisdom with modern precision combat simulation. Through
          mastery of the eight trigram stances (팔괘) and targeting of 70 vital
          points (칠십혈), practitioners develop not just fighting skill, but
          deep understanding of Korean martial philosophy that has guided
          warriors for over a millennium.
        </p>

        <div
          style={{
            padding: "2rem",
            background: "rgba(255, 215, 0, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(255, 215, 0, 0.3)",
            marginBottom: "2rem",
          }}
        >
          <KoreanText
            korean="무술은 단순한 격투기가 아니라 인생의 철학이다"
            english="Martial arts is not mere combat, but a philosophy of life"
            size="large"
            align="center"
            color="#ffd700"
            weight="bold"
          />
          <div
            style={{
              marginTop: "1rem",
              fontSize: "0.9rem",
              color: "#ffffff",
              opacity: 0.7,
              fontStyle: "italic",
            }}
          >
            — Traditional Korean Martial Arts Proverb
          </div>
        </div>

        {/* Eight Trigrams Reference */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginTop: "2rem",
            padding: "1.5rem",
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "8px",
          }}
        >
          {[
            { symbol: "☰", name: "건 Geon", element: "Heaven" },
            { symbol: "☱", name: "태 Tae", element: "Lake" },
            { symbol: "☲", name: "리 Li", element: "Fire" },
            { symbol: "☳", name: "진 Jin", element: "Thunder" },
            { symbol: "☴", name: "손 Son", element: "Wind" },
            { symbol: "☵", name: "감 Gam", element: "Water" },
            { symbol: "☶", name: "간 Gan", element: "Mountain" },
            { symbol: "☷", name: "곤 Gon", element: "Earth" },
          ].map((trigram, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                padding: "0.5rem",
                background: "rgba(255, 215, 0, 0.1)",
                borderRadius: "4px",
              }}
            >
              <div style={{ fontSize: "1.5rem", color: "#ffd700" }}>
                {trigram.symbol}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#ffffff",
                  marginTop: "0.2rem",
                }}
              >
                {trigram.name}
              </div>
              <div
                style={{
                  fontSize: "0.6rem",
                  color: "#00ffff",
                  opacity: 0.8,
                }}
              >
                {trigram.element}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Return Button */}
      <button
        onClick={handleReturnClick}
        onMouseEnter={handleSectionHover}
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(0, 200, 255, 0.3) 100%)",
          border: "2px solid #00ffff",
          color: "#00ffff",
          padding: "1.5rem 3rem",
          borderRadius: "10px",
          cursor: "pointer",
          marginTop: "2rem",
          transition: "all 0.3s ease",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, rgba(0, 255, 255, 0.3) 0%, rgba(0, 200, 255, 0.4) 100%)";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 255, 255, 0.4)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(0, 200, 255, 0.3) 100%)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
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
