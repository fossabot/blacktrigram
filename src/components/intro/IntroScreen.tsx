import React, { useState, useEffect, useCallback } from "react";
import { Stage, Container } from "../ui/base/PixiComponents";
import { KOREAN_COLORS, KOREAN_TEXT_STYLE } from "../ui/base/PixiComponents";
import { MenuSection } from "./components/MenuSection";
import { ControlsSection } from "./components/ControlsSection";
import { PhilosophySection } from "./components/PhilosophySection";

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

interface IntroScreenProps {
  readonly onStartGame: () => void;
}

export function IntroScreen({
  onStartGame,
}: IntroScreenProps): React.ReactElement {
  const [currentSection, setCurrentSection] = useState<string>("menu");
  const [animationTime, setAnimationTime] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<
    "training" | "combat" | "settings"
  >("training");

  // Create a type-safe wrapper for setSelectedOption that handles string input
  const handleOptionChange = useCallback((option: string) => {
    // Cast as needed, ensuring the value is one of the allowed types
    if (option === "training" || option === "combat" || option === "settings") {
      setSelectedOption(option);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTime((prev) => prev + 0.016);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const drawBackground = (graphics: any) => {
    graphics.clear();

    // Dark cyberpunk Korean martial arts background
    graphics.setFillStyle({ color: 0x000a12, alpha: 1.0 });
    graphics.rect(0, 0, 1000, 700);
    graphics.fill();

    // Traditional Korean pattern overlay
    graphics.setStrokeStyle({ color: 0xffd700, width: 2, alpha: 0.3 });

    // Draw traditional Korean border patterns
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const radius = 300 + Math.sin(animationTime * 0.5) * 20;
      const centerX = 500;
      const centerY = 350;

      const startX = centerX + Math.cos(angle) * (radius - 50);
      const startY = centerY + Math.sin(angle) * (radius - 50);
      const endX = centerX + Math.cos(angle) * radius;
      const endY = centerY + Math.sin(angle) * radius;

      graphics.moveTo(startX, startY);
      graphics.lineTo(endX, endY);
    }
    graphics.stroke();

    // Cyberpunk accent lines
    graphics.setStrokeStyle({ color: 0x004455, width: 1, alpha: 0.6 });
    for (let i = 0; i < 5; i++) {
      const y = 100 + i * 120 + Math.sin(animationTime + i) * 10;
      graphics.moveTo(50, y);
      graphics.lineTo(950, y);
    }
    graphics.stroke();
  };

  const nextSection = () => {
    if (currentSection === "menu") {
      setCurrentSection("controls");
    } else if (currentSection === "controls") {
      setCurrentSection("philosophy");
    } else {
      onStartGame();
    }
  };

  const prevSection = () => {
    if (currentSection === "philosophy") {
      setCurrentSection("controls");
    } else if (currentSection === "controls") {
      setCurrentSection("menu");
    }
  };

  const handleStartGame = () => {
    onStartGame();
  };

  const handleStartTraining = () => {
    // Logic for starting training mode
    onStartGame();
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
        case "Enter":
        case " ":
          nextSection();
          break;
        case "ArrowLeft":
          prevSection();
          break;
        case "Escape":
          if (currentSection === "menu") {
            onStartGame();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSection, prevSection, currentSection, onStartGame]);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "menu":
        return (
          <MenuSection
            selectedOption={selectedOption}
            onOptionChange={handleOptionChange}
            onMenuSelect={(section) => setCurrentSection(section)}
            onNext={nextSection}
            onStartGame={handleStartGame}
            onStartTraining={handleStartTraining}
          />
        );
      case "controls":
        return <ControlsSection onNext={nextSection} onPrev={prevSection} />;
      case "philosophy":
        return <PhilosophySection onNext={onStartGame} />;
      default:
        return null;
    }
  };

  return (
    <Stage width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
      <Container>
        {/* Background */}
        <pixiGraphics draw={drawBackground} />

        {/* Main title - use pixiText instead of Text */}
        <pixiText
          text="흑괘 무술 도장"
          x={SCREEN_WIDTH / 2}
          y={120}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: KOREAN_TEXT_STYLE.fontFamily,
            fontSize: 42,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "bold",
            stroke: KOREAN_COLORS.BLACK,
          }}
        />

        {/* Subtitle */}
        <pixiText
          text="Black Trigram Martial Arts Dojang"
          x={SCREEN_WIDTH / 2}
          y={160}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            ...KOREAN_TEXT_STYLE,
            fontSize: 18,
            fill: 0xcccccc, // Use hex value directly instead of KOREAN_COLORS.GRAY_LIGHT
          }}
        />

        {/* Render current section - remove x and y props */}
        {renderCurrentSection()}
      </Container>
    </Stage>
  );
}
