import json
import requests
import os
from dotenv import load_dotenv
import time
from typing import List, Dict, Any, Optional

load_dotenv()

BASE = "https://api.steampowered.com"
API_KEY = os.getenv("API_KEY")


def get_all_steam_game_stats(steamid: int, api_key: Optional[str] = None,
                             sleep_between_calls: float = 0.0) -> List[Dict[str, Any]]:
    """
    Notes:
    - Requires the Steam profile/game details to be public, otherwise achievements may be missing.
    - `sleep_between_calls` can be used to throttle requests for large libraries.
    """
    api_key = api_key or API_KEY
    if not api_key:
        raise ValueError("No API key provided. Set API_KEY env var or pass api_key=...")

    owned_url = f"{BASE}/IPlayerService/GetOwnedGames/v0001/"
    owned_params = {
        "key": api_key,
        "steamid": steamid,
        "include_appinfo": 1,
        "include_played_free_games": 1,
        "format": "json",
    }
    owned_resp = requests.get(owned_url, params=owned_params, timeout=20)
    owned_resp.raise_for_status()
    data = owned_resp.json()
    games = data.get("response", {}).get("games", []) or []

    results: List[Dict[str, Any]] = []

    ach_url = f"{BASE}/ISteamUserStats/GetPlayerAchievements/v0001/"

    for g in games:
        appid = g.get("appid")
        name = g.get("name", f"App {appid}")
        playtime_minutes = g.get("playtime_forever", 0)
        playtime_hours = round(playtime_minutes / 60.0, 2)

        achievements_unlocked = 0
        achievements_total = 0

        try:
            ach_params = {
                "key": api_key,
                "steamid": steamid,
                "appid": appid,
                "l": "en",
            }
            ach_resp = requests.get(ach_url, params=ach_params, timeout=20)

            if ach_resp.ok:
                ach_json = ach_resp.json()
                playerstats = ach_json.get("playerstats", {})
                ach_list = playerstats.get("achievements")
                if isinstance(ach_list, list):
                    achievements_total = len(ach_list)
                    achievements_unlocked = sum(1 for a in ach_list if a.get("achieved") == 1)
        except requests.HTTPError:
            pass
        except Exception:
            pass

        results.append({
            "appid": appid,
            "name": name,
            "playtime_minutes": playtime_minutes,
            "playtime_hours": playtime_hours,
            "achievements_unlocked": achievements_unlocked,
            "achievements_total": achievements_total,
        })

        if sleep_between_calls:
            time.sleep(sleep_between_calls)

    results.sort(key=lambda r: r["name"].lower())
    return results


if __name__ == "__main__":
    STEAMID = os.getenv("STEAM_ID")
    all_games = get_all_steam_game_stats(STEAMID)
    for g in all_games:
        print(f"{g['name']} — {g['playtime_hours']}h — {g['achievements_unlocked']}/{g['achievements_total']} achievements")



    

