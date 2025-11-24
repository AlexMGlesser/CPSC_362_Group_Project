import React, { useState } from "react";
import { signIn, signUp } from "../api";

function AuthPanel({ token, onLogin, onLogout, showMessage }) {
  const [mode, setMode] = useState("login"); // this is for login and signup, hopefully i did this correct !
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const switchMode = (newMode) => {
    setMode(newMode);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      if (mode === "signup") {
        await signUp(username, email, password);
        showMessage("Account created. You can log in now.");
        setMode("login");
      } else {
        const data = await signIn(username, password);
        onLogin(data.access_token);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  if (token) {
    return (
      <div className="panel">
        <h2 className="panel-title">Account</h2>
        <p className="panel-text">
          You are logged in. You can link your Steam account and pick games.
        </p>
        <button className="btn btn-secondary" onClick={onLogout}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="tab-switch">
        <button
          className={`tab ${mode === "login" ? "tab-active" : ""}`}
          onClick={() => switchMode("login")}
        >
          Log in
        </button>
        <button
          className={`tab ${mode === "signup" ? "tab-active" : ""}`}
          onClick={() => switchMode("signup")}
        >
          Sign up
        </button>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Username</span>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="gamer123"
          />
        </label>

        {mode === "signup" && (
          <label className="field">
            <span>Email (optional)</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
        )}

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </label>

        {error && <div className="error-text">{error}</div>}

        <button className="btn btn-primary" disabled={busy}>
          {busy ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>
    </div>
  );
}

export default AuthPanel;
