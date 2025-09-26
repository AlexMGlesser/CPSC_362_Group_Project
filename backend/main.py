from fastapi import FastAPI, Depends
from database import get_db, engine
from sqlalchemy.orm import Session
from typing import Annotated
import os
from dotenv import load_dotenv
import models

load_dotenv()

API_KEY = os.getenv("API_KEY")
app = FastAPI()

db_dependency = Annotated[Session, Depends(get_db)]
models.Base.metadata.create_all(bind=engine)

if __name__ == "__main__":

    string="firoaeojtetijthisisatest"

    testttt = models.Test(text=string)