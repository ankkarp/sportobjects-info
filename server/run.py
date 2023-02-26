import os

import uvicorn
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
from fastapi import FastAPI
import pandas as pd

load_dotenv()


app = FastAPI()
engine = create_engine("postgresql://{user}:{psw}@{host}:{port}/{db}".format(
    user=os.environ.get('PGUSER'),
    psw=os.environ.get('POSTGRES_PASSWORD'),
    host=os.environ.get('DB_HOST'),
    port=os.environ.get('DB_PORT'),
    db=os.environ.get('POSTGRES_DB'))
)
con = engine.connect()


@app.get("/id/{id}")
async def read_object(id: int):
    object_df = pd.read_sql(
        text(f'SELECT * FROM sportobjects WHERE id = {id}'), con).iloc[0]
    return object_df.to_dict()

# if __name__ == "__main__":
#     uvicorn.run(app, host='0.0.0.0', reload=True, proxy_headers=True)
