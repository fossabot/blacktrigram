import React, { useCallback } from "react";
import type { TrainingScreenProps } from "../../types";
import { TRIGRAM_DATA } from "../../types/constants";
import { TrigramWheel } from "../ui/TrigramWheel";

export function TrainingScreen({
  player,
  onPlayerStateChange,
  selectedStance,
}: TrainingScreenProps): React.JSX.Element {
  // Use onPlayerStateChange in component logic
  const handlePlayerUpdate = useCallback(
    (updates: any) => {
      if (onPlayerStateChange) {
        onPlayerStateChange(updates);
      }
    },
    [onPlayerStateChange]
  );

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      {/* Trigram Wheel Section */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TrigramWheel
            currentStance={player?.stance || "geon"}
            onStanceSelect={(stance) => {
              // Add missing onStanceSelect handler
              console.log("Selected stance:", stance);
              if (onPlayerStateChange) {
                onPlayerStateChange({ stance });
              }
            }}
            showLabels={true}
          />
        </div>

        {/* Use handlePlayerUpdate */}
        <button onClick={() => handlePlayerUpdate({ stance: selectedStance })}>
          Update Stance
        </button>

        {/* Current Stance Info */}
        {selectedStance && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h4 style={{ color: "#ffffff" }}>
              현재 자세:{" "}
              {TRIGRAM_DATA[selectedStance]?.name.korean || "알 수 없음"}
            </h4>

            {/* Training Exercises */}
            <div style={{ marginTop: "15px" }}>
              <h5 style={{ color: "#ffffff" }}>사용 가능한 기법:</h5>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {TRIGRAM_DATA[selectedStance]?.technique && (
                  <div
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#333",
                      borderRadius: "6px",
                    }}
                  >
                    <div
                      style={{
                        color: "#ffffff",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {TRIGRAM_DATA[selectedStance].technique.koreanName}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
