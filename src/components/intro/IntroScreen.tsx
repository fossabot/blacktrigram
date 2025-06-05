import React, { useState } from "react";
import type { PlayerArchetype } from "../../types";
import { KoreanText } from "../ui/base/korean-text/KoreanText";
import "./IntroScreen.css";

interface IntroScreenProps {
  readonly onStartTraining: () => void;
  readonly onStartCombat: () => void;
  readonly onArchetypeSelect: (archetype: PlayerArchetype) => void;
  readonly selectedArchetype: PlayerArchetype;
}

const PLAYER_ARCHETYPES: Array<{
  id: PlayerArchetype;
  korean: string;
  english: string;
  description: string;
  philosophy: string;
}> = [
  {
    id: "musa",
    korean: "무사",
    english: "Traditional Warrior",
    description: "Honor through strength, disciplined combat",
    philosophy: "존중과 규율의 길 - Path of respect and discipline",
  },
  {
    id: "amsalja",
    korean: "암살자",
    english: "Shadow Assassin",
    description: "Efficiency through invisibility, one perfect strike",
    philosophy: "그림자의 길 - Path of shadows",
  },
  {
    id: "hacker",
    korean: "해커",
    english: "Cyber Warrior",
    description: "Information as power, technological advantage",
    philosophy: "정보의 길 - Path of information",
  },
  {
    id: "jeongbo_yowon",
    korean: "정보요원",
    english: "Intelligence Operative",
    description: "Knowledge through observation, strategic thinking",
    philosophy: "지혜의 길 - Path of wisdom",
  },
  {
    id: "jojik_pokryeokbae",
    korean: "조직폭력배",
    english: "Organized Crime",
    description: "Survival through ruthlessness, practical violence",
    philosophy: "생존의 길 - Path of survival",
  },
];

export function IntroScreen({
  onStartTraining,
  onStartCombat,
  onArchetypeSelect,
  selectedArchetype,
}: IntroScreenProps): React.JSX.Element {
  const [showArchetypes, setShowArchetypes] = useState(false);

  const selectedArchetypeData = PLAYER_ARCHETYPES.find(
    (a) => a.id === selectedArchetype
  );

  return (
    <div className="intro-screen" data-testid="intro-screen">
      <div className="intro-background">
        <div className="intro-content">
          {/* Main Title */}
          <div className="title-section" data-testid="title-section">
            <KoreanText
              korean="흑괘 무술 도장"
              english="Black Trigram Martial Arts"
              className="main-title"
              data-testid="main-title"
            />
            <KoreanText
              korean="정밀 격투 시뮬레이터"
              english="Precision Combat Simulator"
              className="subtitle"
              data-testid="subtitle"
            />
          </div>

          {/* Trigram Philosophy */}
          <div className="philosophy-section" data-testid="philosophy-section">
            <KoreanText
              korean="팔괘의 길"
              english="Path of Eight Trigrams"
              className="philosophy-title"
              data-testid="philosophy-title"
            />
            <div className="trigram-symbols" data-testid="trigram-symbols">
              ☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷
            </div>
          </div>

          {/* Archetype Selection */}
          <div className="archetype-section" data-testid="archetype-section">
            <button
              className="archetype-toggle"
              onClick={() => setShowArchetypes(!showArchetypes)}
              data-testid="archetype-toggle"
            >
              <KoreanText
                korean={selectedArchetypeData?.korean || "무사"}
                english={
                  selectedArchetypeData?.english || "Traditional Warrior"
                }
                className="selected-archetype"
                data-testid="selected-archetype"
              />
            </button>

            {showArchetypes && (
              <div className="archetype-list" data-testid="archetype-list">
                {PLAYER_ARCHETYPES.map((archetype) => (
                  <button
                    key={archetype.id}
                    className={`archetype-option ${
                      selectedArchetype === archetype.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      onArchetypeSelect(archetype.id);
                      setShowArchetypes(false);
                    }}
                    data-testid={`archetype-option-${archetype.id}`}
                  >
                    <KoreanText
                      korean={archetype.korean}
                      english={archetype.english}
                      className="archetype-name"
                      data-testid={`archetype-name-${archetype.id}`}
                    />
                    <p className="archetype-description">
                      {archetype.description}
                    </p>
                    <p className="archetype-philosophy">
                      {archetype.philosophy}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons" data-testid="action-buttons">
            <button
              className="primary-button"
              onClick={onStartTraining}
              data-testid="training-button"
            >
              <KoreanText korean="수련 시작" english="Begin Training" />
            </button>
            <button
              className="secondary-button"
              onClick={onStartCombat}
              data-testid="combat-button"
            >
              <KoreanText korean="실전 격투" english="Enter Combat" />
            </button>
          </div>

          {/* Korean Martial Arts Quote */}
          <div className="quote-section" data-testid="quote-section">
            <KoreanText
              korean="흑괘의 길을 걸어라"
              english="Walk the Path of the Black Trigram"
              className="closing-quote"
              data-testid="closing-quote"
            />
          </div>
        </div>
      </div>

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

        .title-section {
          text-align: center;
          margin: 3rem 0;
        }

        .main-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
        }

        .subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .philosophy-section {
          text-align: center;
          margin: 2rem 0;
        }

        .philosophy-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
        }

        .trigram-symbols {
          font-size: 2rem;
          letter-spacing: 0.5rem;
          color: #ffd700;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
        }

        .archetype-section {
          text-align: center;
          margin: 3rem 0;
        }

        .archetype-toggle {
          background: transparent;
          border: none;
          color: #00ffff;
          font-size: 1.2rem;
          cursor: pointer;
          position: relative;
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .archetype-toggle:hover {
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }

        .selected-archetype {
          font-weight: bold;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
        }

        .archetype-list {
          margin-top: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 255, 255, 0.2);
        }

        .archetype-option {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 1rem;
          cursor: pointer;
          padding: 1rem;
          text-align: left;
          width: 100%;
          transition: all 0.3s ease;
        }

        .archetype-option:hover {
          background: rgba(0, 255, 255, 0.1);
        }

        .archetype-option.selected {
          background: rgba(0, 255, 255, 0.2);
          font-weight: bold;
        }

        .archetype-name {
          font-size: 1.1rem;
          margin: 0;
        }

        .archetype-description {
          font-size: 0.9rem;
          margin: 0.2rem 0;
          opacity: 0.8;
        }

        .archetype-philosophy {
          font-size: 0.8rem;
          margin: 0;
          color: #ffd700;
        }

        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 4rem 0 2rem 0;
        }

        .primary-button,
        .secondary-button {
          padding: 1rem 2rem;
          border: 2px solid;
          border-radius: 8px;
          background: transparent;
          color: white;
          font-family: "Noto Sans KR", Arial, sans-serif;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 180px;
        }

        .primary-button {
          border-color: #00ffff;
          color: #00ffff;
        }

        .primary-button:hover {
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        .secondary-button {
          border-color: #ff0040;
          color: #ff0040;
        }

        .secondary-button:hover {
          background: rgba(255, 0, 64, 0.1);
          box-shadow: 0 0 20px rgba(255, 0, 64, 0.3);
        }

        .quote-section {
          text-align: center;
          margin: 3rem 0;
          font-size: 1.2rem;
          font-style: italic;
          color: #ffd700;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
        }

        /* Responsive design */
        @media (max-width: 1024px) {
          .trigram-symbols {
            font-size: 1.5rem;
          }

          .archetype-toggle {
            font-size: 1rem;
            padding: 0.5rem;
          }

          .primary-button,
          .secondary-button {
            font-size: 1rem;
            padding: 0.8rem 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .intro-content {
            padding: 1rem;
          }

          .archetype-list {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            z-index: 10;
          }

          .archetype-option {
            font-size: 0.9rem;
            padding: 0.8rem;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
}

export default IntroScreen;
