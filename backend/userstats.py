from database import supabase

def get_player_stats(player_id):
    """
    Fetch total playtime and location for a player.
    """
    # Fetch data from Supabase
    response = supabase.table('player_stats').select("game_time, location").eq("player_id", player_id).execute()
    
    if response.error:
        raise Exception(f"Error fetching player stats: {response.error.message}")

    data = response.data

    # Calculate total playtime
    total_playtime = sum(item['game_time'] for item in data)
    location = data[0]['location'] if data else None

    return {
        "total_playtime": total_playtime,
        "location": location
    }