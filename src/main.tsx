import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AudioProvider } from "./audio/AudioManager.tsx"; // Fix: Add .tsx extension to get the React component
import "./index.css";

// Error boundary for production stability
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): {
    hasError: boolean;
    error: Error;
  } {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Black Trigram Error:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "#001122",
            color: "#ffffff",
            fontFamily: "Noto Sans KR, Arial, sans-serif",
          }}
        >
          <h1>흑괘 무술 도장 - 오류 발생</h1>
          <h2>Black Trigram - Error Occurred</h2>
          <p>게임을 다시 시작해 주세요 / Please restart the game</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "#ffd700",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            다시 시작 / Restart
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize application
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <ErrorBoundary>
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
