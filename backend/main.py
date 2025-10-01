from fastapi import FastAPI, HTTPException
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

supabase = create_client(url, key)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Supabase FastAPI app"}

@app.get("/items")
def get_items():
    try:
        response = supabase.table("test-me").select("*").execute()
        return response.data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


