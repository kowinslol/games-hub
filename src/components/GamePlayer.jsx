import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import TicTacToeScene from "../games/tictactoe/TicTacToeScene";

export default function GamePlayer({ gameId, onExit }) {
  const containerRef = useRef(null);
  const phaserRef = useRef(null);

  useEffect(() => {
    // Create Phaser game on mount
    if (gameId === "tictactoe") {
      const config = {
        type: Phaser.AUTO,
        parent: containerRef.current,
        width: 480,
        height: 480,
        backgroundColor: "#ffffff",
        scene: [TicTacToeScene]
      };
      phaserRef.current = new Phaser.Game(config);
    }

    return () => {
      // Destroy phaser on unmount or game change
      if (phaserRef.current) {
        try {
          phaserRef.current.destroy(true);
        } catch (e) {
          console.warn("Phaser destroy error:", e);
        }
        phaserRef.current = null;
      }
    };
  }, [gameId]);

  return (
    <div className="player-wrapper">
      <div className="player-header">
        <button onClick={onExit}>Back to library</button>
        <div className="player-title">{gameId}</div>
      </div>
      <div className="phaser-container" ref={containerRef} />
    </div>
  );
}
