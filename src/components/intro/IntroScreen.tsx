import React, { useState } from "react";
import { KoreanText } from "../ui/base/korean-text";
import type { IntroScreenProps } from "../../types/components";
import type { PlayerArchetype, TrigramStance } from "../../types";
import { KoreanHeader } from "../ui";
import { PhilosophySection } from "./sections";

/**
 * IntroScreen Component for Black Trigram (흑괘)
 * Authentic Korean martial arts introduction with cyberpunk aesthetics
 */
export function IntroScreen({
  onGamePhaseChange,
  currentSection = "main",
  className = "",
  style = {},
}: IntroScreenProps): React.JSX.Element {
  const [selectedArchetype, setSelectedArchetype] =
    useState<PlayerArchetype>("musa");
  const [selectedStance, setSelectedStance] = useState<TrigramStance>("geon");
  const [activeSection, setActiveSection] = useState(currentSection);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleStartTraining = () => {
    onGamePhaseChange("training");
  };

  const handleStartCombat = () => {
    onGamePhaseChange("combat");
  };

  const handleArchetypeSelect = (archetype: PlayerArchetype) => {
    setSelectedArchetype(archetype);
  };

  const handleStanceSelect = (stance: TrigramStance) => {
    setSelectedStance(stance);
  };

  // Render different sections based on activeSection
  if (activeSection === "philosophy") {
    return (
      <PhilosophySection
        onGamePhaseChange={onGamePhaseChange}
        className={className}
        style={style}
      />
    );
  }

  return (
    <div className={`intro-screen ${className}`} style={style}>
      <KoreanHeader
        korean="흑괘"
        english="Black Trigram"
        subtitle={{
          korean: "한국 무술 정밀 전투 시뮬레이터",
          english: "Korean Martial Arts Precision Combat Simulator",
        }}
        level={1}
        showLogo={true}
        className="intro-header"
      />

      <main className="intro-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-text">
            <KoreanText
              korean="전통과 현대가 만나는 곳"
              english="Where Tradition Meets Modernity"
              size="xlarge"
              weight="bold"
              className="welcome-title"
            />
            <KoreanText
              korean="사이버펑크 지하 도장에서 진정한 한국 무술의 정수를 경험하세요. 70개의 급소와 8개의 괘를 통해 정밀한 전투 기술을 익히고, 고대의 지혜를 현대적으로 재해석한 무예의 세계로 들어오세요."
              english="Experience the essence of authentic Korean martial arts in a cyberpunk underground dojang. Master precise combat through 70 vital points and 8 trigrams, entering a world where ancient wisdom meets modern interpretation."
              size="medium"
              className="welcome-description"
            />
          </div>

          <div className="trigram-display">
            <div className="trigram-circle">
              <div className="trigram-symbols">☰☱☲☳☴☵☶☷</div>
              <div className="center-symbol">흑괘</div>
            </div>
          </div>
        </section>

        {/* Archetype Selection */}
        <section className="archetype-section">
          <KoreanText
            korean="무예가 선택"
            english="Choose Your Martial Artist"
            size="xlarge"
            weight="bold"
            className="section-title"
          />

          <div className="archetype-grid">
            {/* 무사 (Musa) - Traditional Warrior */}
            <div
              className={`archetype-card ${
                selectedArchetype === "musa" ? "selected" : ""
              }`}
              onClick={() => handleArchetypeSelect("musa")}
            >
              <div className="archetype-symbol">⚔️</div>
              <KoreanText
                korean="무사"
                english="Musa"
                size="large"
                weight="bold"
                className="archetype-name"
              />
              <KoreanText
                korean="전통 무인 - 힘을 통한 명예"
                english="Traditional Warrior - Honor through strength"
                size="small"
                className="archetype-description"
              />
              <div className="archetype-stats">
                <span>공격력: ★★★★☆</span>
                <span>정확도: ★★★☆☆</span>
                <span>방어력: ★★★★★</span>
              </div>
            </div>

            {/* 암살자 (Amsalja) - Shadow Assassin */}
            <div
              className={`archetype-card ${
                selectedArchetype === "amsalja" ? "selected" : ""
              }`}
              onClick={() => handleArchetypeSelect("amsalja")}
            >
              <div className="archetype-symbol">🗡️</div>
              <KoreanText
                korean="암살자"
                english="Amsalja"
                size="large"
                weight="bold"
                className="archetype-name"
              />
              <KoreanText
                korean="그림자 암살자 - 은밀함을 통한 효율"
                english="Shadow Assassin - Efficiency through stealth"
                size="small"
                className="archetype-description"
              />
              <div className="archetype-stats">
                <span>공격력: ★★★★★</span>
                <span>정확도: ★★★★★</span>
                <span>방어력: ★★☆☆☆</span>
              </div>
            </div>

            {/* 해커 (Hacker) - Cyber Warrior */}
            <div
              className={`archetype-card ${
                selectedArchetype === "hacker" ? "selected" : ""
              }`}
              onClick={() => handleArchetypeSelect("hacker")}
            >
              <div className="archetype-symbol">💻</div>
              <KoreanText
                korean="해커"
                english="Hacker"
                size="large"
                weight="bold"
                className="archetype-name"
              />
              <KoreanText
                korean="사이버 전사 - 정보는 힘"
                english="Cyber Warrior - Information as power"
                size="small"
                className="archetype-description"
              />
              <div className="archetype-stats">
                <span>공격력: ★★★☆☆</span>
                <span>정확도: ★★★★★</span>
                <span>방어력: ★★★☆☆</span>
              </div>
            </div>

            {/* 정보요원 (Jeongbo Yowon) - Intelligence Operative */}
            <div
              className={`archetype-card ${
                selectedArchetype === "jeongbo_yowon" ? "selected" : ""
              }`}
              onClick={() => handleArchetypeSelect("jeongbo_yowon")}
            >
              <div className="archetype-symbol">🕵️</div>
              <KoreanText
                korean="정보요원"
                english="Jeongbo Yowon"
                size="large"
                weight="bold"
                className="archetype-name"
              />
              <KoreanText
                korean="정보 요원 - 관찰을 통한 지식"
                english="Intelligence Operative - Knowledge through observation"
                size="small"
                className="archetype-description"
              />
              <div className="archetype-stats">
                <span>공격력: ★★★★☆</span>
                <span>정확도: ★★★★☆</span>
                <span>방어력: ★★★★☆</span>
              </div>
            </div>

            {/* 조직폭력배 (Jojik Pokryeokbae) - Organized Crime */}
            <div
              className={`archetype-card ${
                selectedArchetype === "jojik_pokryeokbae" ? "selected" : ""
              }`}
              onClick={() => handleArchetypeSelect("jojik_pokryeokbae")}
            >
              <div className="archetype-symbol">👊</div>
              <KoreanText
                korean="조직폭력배"
                english="Jojik Pokryeokbae"
                size="large"
                weight="bold"
                className="archetype-name"
              />
              <KoreanText
                korean="조직 폭력배 - 무자비함을 통한 생존"
                english="Organized Crime - Survival through ruthlessness"
                size="small"
                className="archetype-description"
              />
              <div className="archetype-stats">
                <span>공격력: ★★★★★</span>
                <span>정확도: ★★☆☆☆</span>
                <span>방어력: ★★★☆☆</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stance Preview */}
        <section className="stance-section">
          <KoreanText
            korean="기본 자세 선택"
            english="Choose Starting Stance"
            size="xlarge"
            weight="bold"
            className="section-title"
          />

          <div className="stance-grid">
            {[
              {
                stance: "geon" as TrigramStance,
                symbol: "☰",
                korean: "건",
                english: "Geon",
                element: "Heaven",
              },
              {
                stance: "tae" as TrigramStance,
                symbol: "☱",
                korean: "태",
                english: "Tae",
                element: "Lake",
              },
              {
                stance: "li" as TrigramStance,
                symbol: "☲",
                korean: "리",
                english: "Li",
                element: "Fire",
              },
              {
                stance: "jin" as TrigramStance,
                symbol: "☳",
                korean: "진",
                english: "Jin",
                element: "Thunder",
              },
              {
                stance: "son" as TrigramStance,
                symbol: "☴",
                korean: "손",
                english: "Son",
                element: "Wind",
              },
              {
                stance: "gam" as TrigramStance,
                symbol: "☵",
                korean: "감",
                english: "Gam",
                element: "Water",
              },
              {
                stance: "gan" as TrigramStance,
                symbol: "☶",
                korean: "간",
                english: "Gan",
                element: "Mountain",
              },
              {
                stance: "gon" as TrigramStance,
                symbol: "☷",
                korean: "곤",
                english: "Gon",
                element: "Earth",
              },
            ].map((stanceData) => (
              <div
                key={stanceData.stance}
                className={`stance-card ${
                  selectedStance === stanceData.stance ? "selected" : ""
                }`}
                onClick={() => handleStanceSelect(stanceData.stance)}
              >
                <div className="stance-symbol">{stanceData.symbol}</div>
                <KoreanText
                  korean={stanceData.korean}
                  english={stanceData.english}
                  size="medium"
                  weight="bold"
                  className="stance-name"
                />
                <span className="stance-element">{stanceData.element}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Menu */}
        <nav className="intro-navigation">
          <button
            onClick={() => handleSectionChange("philosophy")}
            className="nav-button philosophy"
          >
            <KoreanText
              korean="무예 철학"
              english="Martial Philosophy"
              size="medium"
            />
          </button>

          <button onClick={handleStartTraining} className="nav-button training">
            <KoreanText
              korean="수련 시작"
              english="Begin Training"
              size="medium"
            />
          </button>

          <button onClick={handleStartCombat} className="nav-button combat">
            <KoreanText
              korean="대련 시작"
              english="Begin Combat"
              size="medium"
            />
          </button>
        </nav>
      </main>

      <style>{`
        .intro-screen {
          min-height: 100vh;
          background: linear-gradient(135deg, 
            rgba(10, 10, 20, 0.95), 
            rgba(26, 26, 46, 0.95)
          );
          color: #ffffff;
          overflow-y: auto;
        }

        .intro-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .welcome-section {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 3rem;
          margin: 3rem 0;
          align-items: center;
        }

        .welcome-title {
          margin-bottom: 1.5rem;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
        }

        .welcome-description {
          line-height: 1.8;
          opacity: 0.9;
        }

        .trigram-display {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .trigram-circle {
          width: 250px;
          height: 250px;
          border: 3px solid rgba(0, 255, 255, 0.6);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, 
            rgba(0, 255, 255, 0.1), 
            rgba(255, 215, 0, 0.1)
          );
          animation: rotate 20s linear infinite;
        }

        .trigram-symbols {
          font-size: 2rem;
          letter-spacing: 0.5rem;
          color: #ffd700;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
          margin-bottom: 1rem;
        }

        .center-symbol {
          font-size: 1.5rem;
          font-weight: bold;
          color: #00ffff;
          text-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .section-title {
          text-align: center;
          margin: 3rem 0 2rem 0;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
        }

        .archetype-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .archetype-card {
          background: linear-gradient(135deg, 
            rgba(0, 255, 255, 0.1), 
            rgba(255, 215, 0, 0.05)
          );
          border: 2px solid rgba(0, 255, 255, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .archetype-card:hover,
        .archetype-card.selected {
          border-color: rgba(0, 255, 255, 0.8);
          background: linear-gradient(135deg, 
            rgba(0, 255, 255, 0.2), 
            rgba(255, 215, 0, 0.1)
          );
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
        }

        .archetype-symbol {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .archetype-name {
          margin: 1rem 0;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        .archetype-description {
          opacity: 0.8;
          margin-bottom: 1rem;
        }

        .archetype-stats {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #ffd700;
        }

        .stance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
        }

        .stance-card {
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .stance-card:hover,
        .stance-card.selected {
          border-color: rgba(255, 215, 0, 0.8);
          background: rgba(255, 215, 0, 0.1);
          transform: translateY(-3px);
          box-shadow: 0 5px 20px rgba(255, 215, 0, 0.3);
        }

        .stance-symbol {
          font-size: 2rem;
          color: #ffd700;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }

        .stance-name {
          margin: 0.5rem 0;
        }

        .stance-element {
          font-size: 0.8rem;
          color: #c0c0c0;
        }

        .intro-navigation {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 4rem 0 2rem 0;
          flex-wrap: wrap;
        }

        .nav-button {
          padding: 1rem 2rem;
          border: 2px solid;
          border-radius: 8px;
          background: transparent;
          color: white;
          font-family: 'Noto Sans KR', Arial, sans-serif;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 180px;
        }

        .nav-button.philosophy {
          border-color: #ffd700;
          color: #ffd700;
        }

        .nav-button.philosophy:hover {
          background: rgba(255, 215, 0, 0.1);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }

        .nav-button.training {
          border-color: #00ffff;
          color: #00ffff;
        }

        .nav-button.training:hover {
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        .nav-button.combat {
          border-color: #ff0040;
          color: #ff0040;
        }

        .nav-button.combat:hover {
          background: rgba(255, 0, 64, 0.1);
          box-shadow: 0 0 20px rgba(255, 0, 64, 0.3);
        }

        /* Responsive design */
        @media (max-width: 1024px) {
          .welcome-section {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }

          .trigram-circle {
            width: 200px;
            height: 200px;
          }

          .archetype-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .intro-content {
            padding: 1rem;
          }

          .archetype-grid {
            grid-template-columns: 1fr;
          }

          .stance-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          .intro-navigation {
            flex-direction: column;
            align-items: center;
          }

          .nav-button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
}

export default IntroScreen;
