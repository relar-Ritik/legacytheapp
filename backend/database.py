import time
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL")
print("DATABASE_URL:", DATABASE_URL)
print("sadasdasdasdasdasdasdasdasdasdasdasdasssssssssssssssssssssss")

max_tries = 10
wait_seconds = 2

for i in range(max_tries):
    try:
        engine = create_engine(DATABASE_URL)
        engine.connect()
        break
    except OperationalError:
        print(f"Database not ready, retrying ({i+1}/{max_tries})...")
        time.sleep(wait_seconds)
else:
    raise Exception("Failed to connect to database after multiple tries.")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
