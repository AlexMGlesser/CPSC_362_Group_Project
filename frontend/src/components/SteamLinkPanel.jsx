import React, { useState } from "react";
import { linkSteam } from "../api";

function SteamLinkPanel({ token, showMessage }) {
  const [steamId, setSteamId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [lastLinked, setLastLinked] = useState(null);

  const handleLink = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Please log in first.");
      return;
    }
    setBusy(true);
    setError(null);

    try {
      const id = parseInt(steamId, 10);
      if (Number.isNaN(id)) {
        throw new Error("Steam ID must be a number.");
      }
      const data = await linkSteam(token, id);
      setLastLinked(data.account_info);
      showMessage("Steam account linked.");
    } catch (err) {
      setError(err.message || "Failed to link Steam account.");
    } finally {
      setBusy(false);
    }
  };

  const handleUnlink = async () => {
    if (!token) {
      setError("Please log in first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await linkSteam(token, -1);
      setLastLinked(null);
      setSteamId("");
      showMessage("Steam account unlinked.");
    } catch (err) {
      setError(err.message || "Failed to unlink Steam account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <h2 className="panel-title">Steam Account</h2>
      <p className="panel-text">
        Enter your 64-bit Steam ID. The backend will pull your library and store the games.
      </p>

      {!token && (
        <p className="hint-text">
          You must be logged in to link a Steam account.
        </p>
      )}

      <form className="form" onSubmit={handleLink}>
        <label className="field">
          <span>Steam ID</span>
          <input
            type="text"
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
            placeholder="7656119XXXXXXXXXX"
            disabled={!token || busy}
          />
        </label>

        {error && <div className="error-text">{error}</div>}

        <div className="btn-row">
          <button className="btn btn-primary" type="submit" disabled={!token || busy}>
            {busy ? "Linking..." : "Link / Update"}
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            disabled={!token || busy}
            onClick={handleUnlink}
          >
            Unlink
          </button>
        </div>
      </form>

      {lastLinked && (
        <div className="info-box">
          <div className="info-row">
            <span className="info-label">Steam ID:</span>
            <span>{lastLinked.steam_id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span>{lastLinked.steam_name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Profile:</span>
            <span>{lastLinked.profile_visibility ? "Public" : "Private"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SteamLinkPanel;
