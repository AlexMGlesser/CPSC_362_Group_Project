import React, { useEffect, useState } from "react";
import AuthPanel from "./components/AuthPanel";
import SteamLinkPanel from "./components/SteamLinkPanel";
import RandomGamePanel from "./components/RandomGamePanel.jsx";
import { getStoredToken, clearToken } from "./api";

function App() {
  const [token, setToken] = useState(getStoredToken());
  const [toast, setToast] = useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken);
    setToast("Logged in successfully.");
  };

  const handleLogout = () => {
    clearToken();
    setToken(null);
    setToast("Logged out.");
  };

  const showMessage = (msg) => {
    setToast(msg);
  };

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <div className="app-root">
      <div className="background-gradient" />
      <header className="app-header">
        <h1 className="app-title">Steam Game Picker</h1>
        <p className="app-subtitle">
          Link your Steam account and let the app pick a random game from your library.
        </p>
      </header>

      <main className="app-main">
        <section className="grid-layout">
          <div className="card card-auth">
            <AuthPanel
              token={token}
              onLogin={handleLogin}
              onLogout={handleLogout}
              showMessage={showMessage}
            />
          </div>

          <div className="card card-steam">
            <SteamLinkPanel token={token} showMessage={showMessage} />
          </div>

          <div className="card card-game">
            <RandomGamePanel token={token} showMessage={showMessage} />
          </div>
        </section>
      </main>

      {toast && (
        <div className="toast">
          <span>{toast}</span>
        </div>
      )}

      <footer className="app-footer">
        <span>Backend: FastAPI + Supabase · Frontend: React + Vite</span>
      </footer>
    </div>
  );
}

export default App;