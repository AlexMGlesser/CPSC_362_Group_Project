const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export function getStoredToken() {
  return localStorage.getItem("access_token") || null;
}

export function storeToken(token) {
  localStorage.setItem("access_token", token);
}

export function clearToken() {
  localStorage.removeItem("access_token");
}

async function handleResponse(res, defaultError = "Request failed") {
  let data = null;
  try {
    data = await res.json();
  } catch {
  }

  if (!res.ok) {
    const message = data?.detail || data?.message || defaultError;
    throw new Error(message);
  }

  return data;
}

export async function signUp(username, email, password) {
  const res = await fetch(`${API_BASE}/sign_up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email: email || null, password }),
  });

  return handleResponse(res, "Sign up failed.");
}

export async function signIn(username, password) {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);
  body.append("grant_type", "password");

  const res = await fetch(`${API_BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await handleResponse(res, "Login failed.");
  if (data.access_token) {
    storeToken(data.access_token);
  }
  return data;
}

export async function linkSteam(token, steamId) {
  if (!token) throw new Error("Not authenticated.");

  const res = await fetch(`${API_BASE}/link?steamid=${steamId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res, "Failed to link Steam account.");
}

export async function getRandomGame(token) {
  if (!token) throw new Error("Not authenticated.");

  const res = await fetch(`${API_BASE}/home`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res, "Failed to get random game.");
}

export async function blacklistGame(token, appId) {
  if (!token) throw new Error("Not authenticated.");
  if (!appId) throw new Error("Missing game id.");

  const res = await fetch(`${API_BASE}/home?app_id=${appId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res, "Failed to toggle blacklist.");
}

export async function getLoadedGames(token, appId) {
  if (!token) throw new Error("Not authenticated.");
  if (!appId) throw new Error("Missing game id.");


  const res = await fetch(`${API_BASE}/home?app_id=${appId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res, "Failed to get all loaded games.");
}