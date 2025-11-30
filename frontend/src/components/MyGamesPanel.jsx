import React, { useEffect, useState } from "react";
import { getLoadedGames, blacklistGame } from "../api";

function MyGamesPanel({ token, showMessage }) {
  const [myGames, setMyGames] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleGetLibrary = async () => {
    if (!token) {
      setError("Please log in and link your Steam account first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const data = await getLoadedGames(token);
      const gamesArray = Object.values(data); 
      gamesArray.sort((a, b) => a.name.localeCompare(b.name));
      setMyGames(gamesArray);
      showMessage("Games from library loaded.");
    } catch (err) {
      setError(err.message || "Failed to fetch games.");
      setMyGames([])
    } finally {
      setBusy(false);
    }
  };

  const handleBlacklist = async (gameId) => {
    if (!token) return;

    try {
      await blacklistGame(token, gameId);
      showMessage("Game blacklisted.");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to blacklist game.");
    }
  };

  useEffect(() => {
    if (token) {
      handleGetLibrary();
    }
    else {
      setMyGames([]);
    }
  }, [token]);
  
  return (
    <div className="card card-library">
      <div className="panel">
        <h2 className="panel-title">My Games</h2>
        <p className="panel-text">
          Your complete Steam library will appear here.
        </p>
        
        <button className="btn btn-secondary" onClick={handleGetLibrary}>
            Refresh Library
        </button>

            
        {!busy && token && myGames.length === 0 && (
          <div className="library-unloaded">
            No games loaded yet.
          </div>
        )}

        {busy && <div className="loading-text">Loading games...</div>}
        {error && <div className="error-text error-mt">{error}</div>}

        
        {myGames.map((game) => (
            <div className={`game-card ${game.blacklist_game ? 'blacklisted' : ''}`} key={game.id}>
              <h3 className="game-title">{game.name}</h3>
              <p className="game-meta">
                  App ID: <span>{game.id}</span>
              </p>
              <p className="game-meta">
                  Playtime: <span>{(game.playtime_total_minutes / 60).toFixed(1)} hours</span>
              </p>
              <p className="game-meta">
                  Blacklisted: {" "}
                  <span>{game.blacklist_game ? "Yes" : "No"}</span>
              </p>
              <button className="btn btn-secondary btn-full" onClick={async () => {await handleBlacklist(game.id); handleGetLibrary();}} title="Remove from random selection">
                Blacklist
              </button>
            </div>
            
        ))}
        
      
      </div>
    </div>
  );
}

export default MyGamesPanel;