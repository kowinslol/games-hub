import React from "react";

export default function GameCard({ game, onPlay }) {
  return (
    <div className="game-card">
      <div className="game-thumb">{game.title.slice(0,2)}</div>
      <div className="game-meta">
        <div className="game-title">{game.title}</div>
        <div className="game-desc">{game.desc}</div>
      </div>
      <div className="game-actions">
        <button onClick={onPlay}>Play</button>
      </div>
    </div>
  );
}
