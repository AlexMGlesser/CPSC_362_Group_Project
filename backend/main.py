from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from database import supabase
import os
from dotenv import load_dotenv
from passlib.context import CryptContext
from auth import (get_password_hash, verify_password, create_access_token,
                  ACCESS_TOKEN_EXPIRE_MINUTES, timedelta, Token,
                  get_current_active_user)
from steam import get_steam_account_info, get_all_steam_game_stats

load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5173",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SignUpBase(BaseModel):
    username: str
    password: str
    email: str | None=None

class SignUpOut(BaseModel):
    id: int
    username: str
    email: str | None=None
    created_at: str
    steam_id: int | None=None

class SignInBase(BaseModel):
    username: str
    password: str

class SignInOut(BaseModel):
    id: int
    username: str


@app.get("/")
def read_root():
    return {"message": "Welcome to the Supabase FastAPI app"}

@app.post("/sign_up", response_model=SignUpOut)
def create_account(account: SignUpBase):
    try:
        hashed_password = get_password_hash(account.password)

        account_data = {
            "username": account.username,
            "email": account.email,
            "password_hash" : hashed_password
        }
        
        response = supabase.table("users").insert(account_data).execute()

        if response.data:
            user_data = response.data[0]
            return {"id": user_data["user_id"], "username": user_data["username"], "password": hashed_password,
                    "email" : user_data["email"], "created_at": user_data["created_at"]}
        else:
            raise HTTPException(status_code=400, detail="Could not create account.")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/token", response_model=Token)
def login_for_token(account: OAuth2PasswordRequestForm = Depends()):
    try:
        response = supabase.table("users").select("*").eq("username", account.username).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found.")
        user_data = response.data[0]
        if not verify_password(account.password, user_data["password_hash"]):
            raise HTTPException(status_code=401, detail="Incorrect username or password.")
        
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        token = create_access_token(data={"sub" : str(user_data["user_id"])}, expires_delta=access_token_expires)
        return {"access_token" : token, "token_type" : "bearer"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/link")
def link_steam_id(steamid: int, current_user: dict = Depends(get_current_active_user)):
    try:
        # Unlink Steam Account if no steamid is given
        if steamid == -1:
            supabase.table("steam_account").delete().eq("user_id", current_user["user_id"]).execute()
            return {"message": "Steam account successfully unlinked.", "user_id": current_user["user_id"]}
        
        user_id = current_user["user_id"]
        
        steam_info = get_steam_account_info(steamid)["response"]["players"][0]
        public = 0
        try:
            name = steam_info["realname"]
            if name:
                public = 1
        except:
            pass

        account_info = {
            "steam_id" : steamid,
            "user_id": user_id,
            "steam_name": steam_info["personaname"],
            "profile_visibility": public
        }

        supabase.table("steam_account").upsert(account_info, on_conflict="user_id").execute()
        supabase.table("library_entry").delete().eq("steam_id", steamid).execute()

        steam_games_list = get_all_steam_game_stats(steamid)
        if not steam_games_list:
            return {
                "message": "Steam account linked, but no games were found. Profile may be private.",
                "account_info": account_info
            }
        
        games_for_central_table = [
            {"id": g["appid"], "name": g["name"]} for g in steam_games_list
        ]

        if games_for_central_table:
            print(f"Upserting {len(games_for_central_table)} games into central 'game' table...")
            # We use upsert with ignore_duplicates=True.
            # This inserts new games and ignores any that already exist based on the 'appid' primary key.
            # Assumes 'appid' is the primary key or a unique constraint on 'game' table.
            supabase.table("game").upsert(
                games_for_central_table,
                on_conflict="id",
                ignore_duplicates=True
            ).execute()
        
        library_entries_to_insert = []
        for game in steam_games_list:
            entry_data = {
                'steam_id': steamid,
                'game_id': game['appid'], # This links to the 'game' table
                'playtime_total_minutes': game['playtime_minutes'],
                'blacklist_game' : True
            }
            library_entries_to_insert.append(entry_data)

        if library_entries_to_insert:
            supabase.table("library_entry").insert(library_entries_to_insert).execute()

        return {
            "message": "Steam account linked and games populated successfully.",
            "account_info": account_info,
            "games_added": len(library_entries_to_insert)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


