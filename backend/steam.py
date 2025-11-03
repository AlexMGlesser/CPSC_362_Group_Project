import json, requests
import os
from dotenv import load_dotenv

load_dotenv()

BASE = "https://api.steampowered.com"
API_KEY = os.getenv("API_KEY")

def get_owned_games(steamid: int):
    url = f"{BASE}//IPlayerService/GetOwnedGames/v0001/"
    payload = {"steamid" : steamid}
    params = {
        "key": API_KEY,
        "format": "json",
        "input_json": json.dumps(payload)
    }
    return requests.get(url, params=params).json()

def get_recently_played_games(steamid: int, count: int = 5):
    url = f"{BASE}/IPlayerService/GetRecentlyPlayedGames/v0001/"
    params = {
        "key": API_KEY,
        "steamid": steamid,
        "count": count
    }
    return requests.get(url, params=params).json()

def get_game_achievements(steamid: int, appid: int):
    url = f"{BASE}/ISteamUserStats/GetPlayerAchievements/v0001/"
    params = {
        "key": API_KEY,
        "format": "json",
        "steamid": steamid, 
        "appid": appid
    }
    return requests.get(url, params=params).json()

def get_steam_account_info(steamid: int):
    url = f"{BASE}/ISteamUser/GetPlayerSummaries/v0002/"
    params = {
        "key": API_KEY,
        "format": "json",
        "steamids": steamid
    }
    return requests.get(url, params=params).json()
    
# print(get_steam_account_info(76561198258366170))

