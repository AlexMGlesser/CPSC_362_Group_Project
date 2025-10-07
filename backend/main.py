from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from passlib.context import CryptContext
load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

supabase = create_client(url, key)
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

app = FastAPI()

class SignUpBase(BaseModel):
    username: str
    password: str
    email: str | None=None

class SignUpOut(BaseModel):
    id: int
    username: str
    email: str | None=None
    password: str
    created_at: str
    steam_id: int | None=None


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
            "password": hashed_password
        }
        
        response = supabase.table("account").insert(account_data).execute()

        if response.data:
            return response.data[0]
        else:
            raise HTTPException(status_code=400, detail="Could not create account.")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_password_hash(password: str):
    hashed_password = pwd_context.hash(password)
    return hashed_password