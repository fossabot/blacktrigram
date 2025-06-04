import React from "react";
import type { KoreanHeaderProps } from "../../types/components";
import { KoreanText } from "./base/korean-text";

/**
 * Korean Header Component for Black Trigram
 * Displays bilingual Korean-English headers with proper styling
 */
export function KoreanHeader({
  korean,
  english,
  subtitle,
  level = 1,
  showLogo = false,
  style = {},
  onBackButtonClick,
  className = "",
}: KoreanHeaderProps): React.JSX.Element {
  const handleBackClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
    }
  };

  // Fix: Properly type the dynamic header element
  const headerProps = {
    className: "main-title",
  };

  return (
    <header className={`korean-header ${className}`} style={style}>
      {/* Back Button (if callback provided) */}
      {onBackButtonClick && (
        <button onClick={handleBackClick} className="back-button">
          ← 뒤로
        </button>
      )}

      {/* Logo Section (if enabled) */}
      {showLogo && (
        <div className="logo-section">
          <div className="trigram-symbol">☰☱☲☳☴☵☶☷</div>
        </div>
      )}

      {/* Main Header - Fix: Use conditional rendering instead of dynamic tag */}
      {level === 1 && (
        <h1 {...headerProps}>
          <KoreanText
            korean={korean}
            english={english}
            size="xxlarge"
            weight="bold"
            className="header-text"
          />
        </h1>
      )}
      {level === 2 && (
        <h2 {...headerProps}>
          <KoreanText
            korean={korean}
            english={english}
            size="xlarge"
            weight="bold"
            className="header-text"
          />
        </h2>
      )}
      {level === 3 && (
        <h3 {...headerProps}>
          <KoreanText
            korean={korean}
            english={english}
            size="large"
            weight="bold"
            className="header-text"
          />
        </h3>
      )}
      {level > 3 && (
        <h4 {...headerProps}>
          <KoreanText
            korean={korean}
            english={english}
            size="large"
            weight="bold"
            className="header-text"
          />
        </h4>
      )}

      {/* Subtitle */}
      {subtitle && (
        <div className="subtitle">
          {typeof subtitle === "string" ? (
            <span className="subtitle-text">{subtitle}</span>
          ) : (
            <KoreanText
              korean={subtitle.korean}
              english={subtitle.english}
              size="medium"
              weight="regular"
              className="subtitle-korean"
            />
          )}
        </div>
      )}

      <style>{`
        .korean-header {
          text-align: center;
          padding: 2rem;
          position: relative;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(26, 26, 46, 0.8));
          border-bottom: 2px solid #00ffff;
          margin-bottom: 2rem;
        }

        .back-button {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 255, 255, 0.1);
          border: 1px solid #00ffff;
          border-radius: 4px;
          color: #00ffff;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Noto Sans KR', Arial, sans-serif;
        }

        .back-button:hover {
          background: rgba(0, 255, 255, 0.2);
          transform: translateX(-2px);
        }

        .logo-section {
          margin-bottom: 1rem;
        }

        .trigram-symbol {
          font-size: 2rem;
          color: #ffd700;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          letter-spacing: 0.5rem;
          margin-bottom: 1rem;
        }

        .main-title {
          margin: 0;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
        }

        .header-text {
          background: linear-gradient(45deg, #00ffff, #ffffff, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
        }

        .subtitle {
          margin-top: 1rem;
        }

        .subtitle-text {
          color: #c0c0c0;
          font-size: 1.1rem;
          font-style: italic;
          font-family: 'Noto Sans KR', Arial, sans-serif;
        }

        .subtitle-korean {
          color: #c0c0c0;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .korean-header {
            padding: 1rem;
          }

          .trigram-symbol {
            font-size: 1.5rem;
            letter-spacing: 0.3rem;
          }

          .back-button {
            padding: 0.3rem 0.8rem;
            font-size: 0.9rem;
          }
        }

        /* Cyberpunk glow effects */
        .korean-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent);
          pointer-events: none;
          z-index: -1;
        }

        /* Animation for trigram symbols */
        .trigram-symbol {
          animation: trigramGlow 3s ease-in-out infinite;
        }

        @keyframes trigramGlow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.4);
          }
        }
      `}</style>
    </header>
  );
}

export default KoreanHeader;
