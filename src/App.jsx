import React, { useState } from "react";
import GameLobby from "./components/GameLobby";
import GamePlayer from "./components/GamePlayer";

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);

  return (
    <div className="app">
      <header className="header">
        <h1>Games Hub</h1>
        <div className="header-sub">Play quick, fun mini games — web preview</div>
      </header>

      <main className="main">
        <aside className="sidebar">
          <GameLobby onPlay={(gameId) => setCurrentGame(gameId)} />
        </aside>

        <section className="player-area">
          {currentGame ? (
            <GamePlayer gameId={currentGame} onExit={() => setCurrentGame(null)} />
          ) : (
            <div className="welcome">
              <h2>Welcome!</h2>
              <p>Select a game from the left to start playing.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        Built with React + Phaser — Starter preview
      </footer>
    </div>
  );
}
