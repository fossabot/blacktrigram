import React from "react";
import type { PhilosophySectionProps } from "../../../types/components";
import { KoreanText } from "../../ui/base/korean-text";

export function PhilosophySection({
  onGamePhaseChange,
  className = "",
  style = {},
}: PhilosophySectionProps): React.JSX.Element {
  const handleStartTraining = () => {
    onGamePhaseChange("training");
  };

  const handleStartCombat = () => {
    onGamePhaseChange("combat");
  };

  return (
    <div className={`philosophy-section ${className}`} style={style}>
      <div className="philosophy-content">
        {/* Korean Martial Arts Philosophy Header */}
        <div className="philosophy-header">
          <KoreanText
            korean="흑괘 무도 철학"
            english="Black Trigram Martial Philosophy"
            size="xlarge"
            weight="bold"
            className="philosophy-title"
          />
        </div>

        {/* Core Principles */}
        <div className="philosophy-principles">
          <div className="principle-item">
            <KoreanText
              korean="존중 (Jonjung)"
              english="Respect - Honor the art and opponent"
              size="medium"
              weight="semibold"
              className="principle-title"
            />
            <p className="principle-description">
              Respect for the martial arts tradition, your opponent, and
              yourself forms the foundation of all combat.
            </p>
          </div>

          <div className="principle-item">
            <KoreanText
              korean="수련 (Suryeon)"
              english="Discipline - Dedicated practice and learning"
              size="medium"
              weight="semibold"
              className="principle-title"
            />
            <p className="principle-description">
              Through disciplined practice, the mind and body unite to achieve
              perfect technique execution.
            </p>
          </div>

          <div className="principle-item">
            <KoreanText
              korean="정확 (Jeonghwak)"
              english="Precision - Exact technique execution"
              size="medium"
              weight="semibold"
              className="principle-title"
            />
            <p className="principle-description">
              Every strike must be placed with anatomical precision to achieve
              maximum effectiveness.
            </p>
          </div>

          <div className="principle-item">
            <KoreanText
              korean="지혜 (Jihye)"
              english="Wisdom - Understanding beyond physical technique"
              size="medium"
              weight="semibold"
              className="principle-title"
            />
            <p className="principle-description">
              True mastery comes from understanding the deeper principles that
              govern combat and life.
            </p>
          </div>

          <div className="principle-item">
            <KoreanText
              korean="균형 (Gyunhyeong)"
              english="Balance - Harmony of mind, body, spirit"
              size="medium"
              weight="semibold"
              className="principle-title"
            />
            <p className="principle-description">
              The eight trigrams teach us that balance in all things leads to
              ultimate power.
            </p>
          </div>
        </div>

        {/* Eight Trigrams Introduction */}
        <div className="trigram-philosophy">
          <KoreanText
            korean="팔괘 무술"
            english="Eight Trigram Martial Arts"
            size="large"
            weight="bold"
            className="trigram-title"
          />
          <p className="trigram-description">
            The eight trigrams (팔괘) represent the fundamental forces of nature
            and combat. Each stance embodies a different aspect of power,
            strategy, and philosophical understanding.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="philosophy-actions">
          <button
            onClick={handleStartTraining}
            className="philosophy-button training-button"
          >
            <KoreanText
              korean="수련 시작"
              english="Begin Training"
              size="medium"
              weight="semibold"
            />
          </button>

          <button
            onClick={handleStartCombat}
            className="philosophy-button combat-button"
          >
            <KoreanText
              korean="실전 시작"
              english="Begin Combat"
              size="medium"
              weight="semibold"
            />
          </button>
        </div>
      </div>

      <style>{`
        .philosophy-section {
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          border: 2px solid #00ffff;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        .philosophy-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .philosophy-header {
          text-align: center;
          border-bottom: 1px solid #00ffff;
          padding-bottom: 1rem;
        }

        .philosophy-principles {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .principle-item {
          padding: 1rem;
          background: rgba(0, 255, 255, 0.05);
          border-left: 3px solid #00ffff;
          border-radius: 6px;
        }

        .principle-description {
          margin-top: 0.5rem;
          color: #e0e0e0;
          line-height: 1.6;
          font-size: 14px;
        }

        .trigram-philosophy {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid #ffd700;
          border-radius: 8px;
        }

        .trigram-description {
          margin-top: 1rem;
          color: #e0e0e0;
          line-height: 1.6;
          font-style: italic;
        }

        .philosophy-actions {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }

        .philosophy-button {
          padding: 1rem 2rem;
          background: linear-gradient(45deg, #1a1a2e, #16213e);
          border: 2px solid #00ffff;
          border-radius: 8px;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 150px;
        }

        .philosophy-button:hover {
          background: linear-gradient(45deg, #16213e, #0f3460);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .training-button {
          border-color: #00ff88;
        }

        .training-button:hover {
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
        }

        .combat-button {
          border-color: #ff4444;
        }

        .combat-button:hover {
          box-shadow: 0 0 15px rgba(255, 68, 68, 0.5);
        }
      `}</style>
    </div>
  );
}

export default PhilosophySection;
