// All API calls can be managed through this file, which connects our frontend
// to our backend

export const API = import.meta.env.VITE_API_BASE;

// Calls login function from API
export async function login(username, password) {
    const body = new URLSearchParams({
        grant_type: "password",
        username,
        password,
    });

    const res = await fetch(`${API}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Login failed: ${res.status} ${text}`);
    }

    return res.json();
}   
