import React from "react";
import GameCard from "./GameCard";

const games = [
  { id: "tictactoe", title: "Tic‑Tac‑Toe", desc: "Classic 3x3 - play vs random AI" },
  { id: "snake", title: "Snake", desc: "Collect and grow" },
  { id: "memory", title: "Memory", desc: "Match the pairs" },
  { id: "minesweeper", title: "Minesweeper", desc: "Clear the field" },
  { id: "endless-runner", title: "Endless Runner", desc: "Avoid obstacles" }
];

export default function GameLobby({ onPlay }) {
  return (
    <div className="lobby">
      <h3>Game Library</h3>
      <div className="cards">
        {games.map((g) => (
          <GameCard key={g.id} game={g} onPlay={() => onPlay(g.id)} />
        ))}
      </div>
    </div>
  );
}
