import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { extend } from "@pixi/react";
import { Container, Graphics, Text, Sprite, AnimatedSprite } from "pixi.js";
import App from "./App";
import { AudioProvider } from "./audio/AudioProvider";
import "./index.css";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div
      style={{
        padding: "2rem",
        background:
          "linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)",
        color: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"Noto Sans KR", Arial, sans-serif',
      }}
    >
      <h1 style={{ color: "#ffd700", marginBottom: "1rem" }}>
        흑괘 오류 (Black Trigram Error)
      </h1>
      <p style={{ marginBottom: "1rem", textAlign: "center" }}>
        게임 로딩 중 오류가 발생했습니다.
        <br />
        An error occurred while loading the game.
      </p>
      <details
        style={{
          marginBottom: "1rem",
          padding: "1rem",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "4px",
        }}
      >
        <summary>오류 상세 정보 (Error Details)</summary>
        <pre style={{ marginTop: "1rem", fontSize: "0.8rem" }}>
          {error.message}
        </pre>
      </details>
      <button
        onClick={resetErrorBoundary}
        style={{
          padding: "0.5rem 1rem",
          background: "#ffd700",
          color: "#000000",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        다시 시도 (Try Again)
      </button>
    </div>
  );
}

// Extend PIXI React with necessary components
extend({
  Container,
  Graphics,
  Text,
  Sprite,
  AnimatedSprite,
});

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AudioProvider>
        <App />
      </AudioProvider>
    </ErrorBoundary>
  </StrictMode>
);

// Add Korean font loading
const koreanFontLink = document.createElement("link");
koreanFontLink.href =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap";
koreanFontLink.rel = "stylesheet";
document.head.appendChild(koreanFontLink);

// Set document title with Korean martial arts theme
document.title = "흑괘 무술 도장 - Black Trigram Martial Arts";
