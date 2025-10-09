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
            "password" : hashed_password
        }
        
        response = supabase.table("account").insert(account_data).execute()

        if response.data:
            user_data = response.data[0]
            return {"id": user_data["id"], "username": user_data["username"],
                    "email" : user_data["email"], "created_at": user_data["created_at"],
                    "steam_id": user_data["steam_id"]}
        else:
            raise HTTPException(status_code=400, detail="Could not create account.")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_password_hash(password: str):
    hashed_password = pwd_context.hash(password)
    return hashed_password

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

@app.post("/sign_in", response_model=SignInOut)
def login_for_token(account: SignInBase):
    try:
        response = supabase.table("account").select("*").eq("username", account.username).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found.")
        user_data = response.data[0]
        if not verify_password(account.password, user_data["password"]):
            raise HTTPException(status_code=401, detail="Incorrect username or password.")
        
        return {"id": user_data["id"], "username": user_data["username"]}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        

