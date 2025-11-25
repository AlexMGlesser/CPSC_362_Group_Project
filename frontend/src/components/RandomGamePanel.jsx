import React, { useState } from "react";
import { getRandomGame, blacklistGame } from "../api";

function RandomGamePanel({ token, showMessage }) {
  const [game, setGame] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [blacklistBusy, setBlacklistBusy] = useState(false);

  const handleGetGame = async () => {
    if (!token) {
      setError("Please log in and link your Steam account first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const data = await getRandomGame(token);
      setGame(data);
      showMessage("Here is a random game from your library.");
    } catch (err) {
      setError(err.message || "Failed to fetch game.");
      setGame(null);
    } finally {
      setBusy(false);
    }
  };

  const handleBlacklist = async () => {
    if (!token || !game) return;
    const appId = game.id;
    if (!appId) {
      setError("Cannot find app id for this game.");
      return;
    }

    setBlacklistBusy(true);
    setError(null);
    try {
      await blacklistGame(token, appId);
      showMessage("Game blacklisted. It will not be picked again.");
      setGame(null);
    } catch (err) {
      setError(err.message || "Failed to toggle blacklist.");
    } finally {
      setBlacklistBusy(false);
    }
  };

  const playtimeHours =
    game && (game.playtime_hours ??
    (typeof game.playtime_total_minutes === "number"
      ? (game.playtime_total_minutes / 60).toFixed(1)
      : null));

  return (
    <div className="panel">
      <h2 className="panel-title">Random Game</h2>
      <p className="panel-text">
        Press the button and the server will pick a random game from your library
        that is not blacklisted.
      </p>

      <button className="btn btn-primary" onClick={handleGetGame} disabled={busy || !token}>
        {busy ? "Picking..." : "Pick a random game"}
      </button>

      {!token && (
        <p className="hint-text">
          Log in and link a Steam account to use this feature.
        </p>
      )}

      {error && <div className="error-text error-mt">{error}</div>}

      {game && (
        <div className="game-card">
          <h3 className="game-title">{game.name}</h3>
          <p className="game-meta">
            App ID: <span>{game.id}</span>
          </p>
          {playtimeHours && (
            <p className="game-meta">
              Playtime: <span>{playtimeHours} hours</span>
            </p>
          )}
          {typeof game.achievements_unlocked === "number" &&
            typeof game.achievements_total === "number" && (
              <p className="game-meta">
                Achievements:{" "}
                <span>
                  {game.achievements_unlocked}/{game.achievements_total}
                </span>
              </p>
            )}
          <p className="game-meta">
            Blacklisted:{" "}
            <span>{game.blacklist_game ? "Yes" : "No"}</span>
          </p>

          <button
            className="btn btn-secondary btn-full"
            onClick={handleBlacklist}
            disabled={blacklistBusy}
          >
            {blacklistBusy ? "Updating..." : "Blacklist this game"}
          </button>
        </div>
      )}
    </div>
  );
}

export default RandomGamePanel;