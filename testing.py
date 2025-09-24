import json, requests

BASE = "https://api.steampowered.com"
API_KEY = "SECRET"


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
    url = f"{BASE}//IPlayerService/GetRecentlyPlayedGames/v0001/"
    payload = {"steamid" : steamid}
    params = {
        "key": API_KEY,
        "format": "json",
        "input_json": json.dumps(payload)
    }
    return requests.get(url, params=params).json()

if __name__ == "__main__":
    print(get_recently_played_games(76561198258366170))


    

