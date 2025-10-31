from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from database import supabase
import os
from dotenv import load_dotenv
from passlib.context import CryptContext
from auth import (get_password_hash, verify_password, create_access_token,
                  ACCESS_TOKEN_EXPIRE_MINUTES, timedelta, Token,
                  get_current_active_user)
load_dotenv()

app = FastAPI()

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
def link_steam_id(current_user: dict = Depends(get_current_active_user)):
    return current_user
        
