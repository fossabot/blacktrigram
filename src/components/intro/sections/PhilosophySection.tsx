import React from "react";
import type { PhilosophySectionProps } from "../../../types/components";
import { KoreanText } from "../../ui/base/korean-text";

/**
 * Philosophy Section for Black Trigram Introduction
 * Presents authentic Korean martial arts philosophy with cyberpunk aesthetics
 */
export function PhilosophySection({
  onGamePhaseChange,
  className = "",
  style = {},
}: PhilosophySectionProps): React.JSX.Element {
  const handleContinue = () => {
    onGamePhaseChange("training");
  };

  const handleReturnToMenu = () => {
    onGamePhaseChange("intro");
  };

  return (
    <section className={`philosophy-section ${className}`} style={style}>
      {/* Main Philosophy Content */}
      <div className="philosophy-content">
        {/* Core Principles */}
        <div className="principles-grid">
          <div className="principle-card">
            <div className="trigram-symbol">☰</div>
            <KoreanText
              korean="존중"
              english="Respect"
              size="large"
              weight="bold"
              className="principle-title"
            />
            <KoreanText
              korean="무예와 상대방을 존중하라"
              english="Honor the art and opponent"
              size="medium"
              className="principle-description"
            />
          </div>

          <div className="principle-card">
            <div className="trigram-symbol">☱</div>
            <KoreanText
              korean="수련"
              english="Discipline"
              size="large"
              weight="bold"
              className="principle-title"
            />
            <KoreanText
              korean="끊임없는 연습과 학습"
              english="Dedicated practice and learning"
              size="medium"
              className="principle-description"
            />
          </div>

          <div className="principle-card">
            <div className="trigram-symbol">☲</div>
            <KoreanText
              korean="정확"
              english="Precision"
              size="large"
              weight="bold"
              className="principle-title"
            />
            <KoreanText
              korean="정확한 기법 실행"
              english="Exact technique execution"
              size="medium"
              className="principle-description"
            />
          </div>

          <div className="principle-card">
            <div className="trigram-symbol">☳</div>
            <KoreanText
              korean="지혜"
              english="Wisdom"
              size="large"
              weight="bold"
              className="principle-title"
            />
            <KoreanText
              korean="육체를 넘어선 이해"
              english="Understanding beyond physical"
              size="medium"
              className="principle-description"
            />
          </div>

          <div className="principle-card">
            <div className="trigram-symbol">☴</div>
            <KoreanText
              korean="균형"
              english="Balance"
              size="large"
              weight="bold"
              className="principle-title"
            />
            <KoreanText
              korean="정신, 육체, 영혼의 조화"
              english="Harmony of mind, body, spirit"
              size="medium"
              className="principle-description"
            />
          </div>
        </div>

        {/* Ancient Wisdom Quote */}
        <div className="wisdom-quote">
          <KoreanText
            korean="무예의 진정한 힘은 상대를 이기는 것이 아니라 자신을 극복하는 것이다"
            english="The true power of martial arts is not in defeating others, but in overcoming oneself"
            size="xlarge"
            weight="bold"
            className="quote-text"
          />
          <p className="quote-attribution">— 전통 한국 무예 철학</p>
        </div>

        {/* Eight Trigrams Philosophy */}
        <div className="trigrams-philosophy">
          <KoreanText
            korean="팔괘 (八卦) - 여덟 개의 길"
            english="Eight Trigrams - Eight Paths"
            size="xlarge"
            weight="bold"
            className="section-title"
          />

          <div className="trigrams-explanation">
            <KoreanText
              korean="각각의 괘는 우주의 원리와 전투의 철학을 나타냅니다. 건(☰)의 강함, 태(☱)의 유연함, 리(☲)의 정확함, 진(☳)의 힘, 손(☴)의 지속성, 감(☵)의 흐름, 간(☶)의 방어, 곤(☷)의 안정성을 익히세요."
              english="Each trigram represents cosmic principles and combat philosophy. Master the strength of Geon (☰), flexibility of Tae (☱), precision of Li (☲), power of Jin (☳), persistence of Son (☴), flow of Gam (☵), defense of Gan (☶), and stability of Gon (☷)."
              size="medium"
              className="explanation-text"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="philosophy-navigation">
        <button onClick={handleReturnToMenu} className="nav-button secondary">
          <KoreanText korean="돌아가기" english="Return" size="medium" />
        </button>
        <button onClick={handleContinue} className="nav-button primary">
          <KoreanText
            korean="수련 시작"
            english="Begin Training"
            size="medium"
          />
        </button>
      </div>

      <style>{`
        .philosophy-section {
          min-height: 100vh;
          background: linear-gradient(135deg, 
            rgba(10, 10, 20, 0.95), 
            rgba(30, 30, 60, 0.95)
          );
          color: #ffffff;
          padding: 2rem;
          overflow-y: auto;
        }

        .philosophy-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .principles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .principle-card {
          background: linear-gradient(135deg, 
            rgba(0, 255, 255, 0.1), 
            rgba(255, 215, 0, 0.1)
          );
          border: 2px solid rgba(0, 255, 255, 0.3);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .principle-card:hover {
          border-color: rgba(0, 255, 255, 0.6);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
        }

        .trigram-symbol {
          font-size: 3rem;
          color: #ffd700;
          margin-bottom: 1rem;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
        }

        .principle-title {
          margin: 1rem 0;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        .principle-description {
          opacity: 0.9;
          line-height: 1.6;
        }

        .wisdom-quote {
          text-align: center;
          margin: 4rem 0;
          padding: 3rem;
          background: linear-gradient(135deg, 
            rgba(255, 215, 0, 0.1), 
            rgba(255, 0, 64, 0.1)
          );
          border-radius: 16px;
          border: 2px solid rgba(255, 215, 0, 0.3);
        }

        .quote-text {
          font-style: italic;
          margin-bottom: 1.5rem;
          text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
        }

        .quote-attribution {
          color: #c0c0c0;
          font-size: 1rem;
          margin: 1rem 0 0 0;
        }

        .trigrams-philosophy {
          margin: 4rem 0;
        }

        .section-title {
          text-align: center;
          margin-bottom: 2rem;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
        }

        .trigrams-explanation {
          background: rgba(0, 0, 0, 0.3);
          padding: 2rem;
          border-radius: 12px;
          border-left: 4px solid #00ffff;
        }

        .explanation-text {
          line-height: 1.8;
          opacity: 0.95;
        }

        .philosophy-navigation {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 2px solid rgba(0, 255, 255, 0.2);
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
          min-width: 160px;
        }

        .nav-button.primary {
          border-color: #00ffff;
          color: #00ffff;
        }

        .nav-button.primary:hover {
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        .nav-button.secondary {
          border-color: #c0c0c0;
          color: #c0c0c0;
        }

        .nav-button.secondary:hover {
          background: rgba(192, 192, 192, 0.1);
          box-shadow: 0 0 20px rgba(192, 192, 192, 0.2);
        }

        @media (max-width: 768px) {
          .philosophy-section {
            padding: 1rem;
          }

          .principles-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .principle-card {
            padding: 1.5rem;
          }

          .trigram-symbol {
            font-size: 2.5rem;
          }

          .wisdom-quote {
            padding: 2rem;
            margin: 3rem 0;
          }

          .philosophy-navigation {
            flex-direction: column;
            align-items: center;
          }

          .nav-button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
}

export default PhilosophySection;
