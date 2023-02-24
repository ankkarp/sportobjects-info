import os

import uvicorn
from sqlalchemy import create_engine
from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()


app = FastAPI()
engine = create_engine("postgresql://{user}:{psw}@{host}:{port}/{db}".format(
    user=os.environ.get('DB_USERNAME'),
    psw=os.environ.get('DB_PASSWORD'),
    host=os.environ.get('DB_HOST'),
    port=os.environ.get('DB_PORT'),
    db=os.environ.get('DB_DATABASE'))
)


@app.get("/id/{id}")
async def read_item(id: int):

    print("item_id", item_id)
    return {"item_id": item_id}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
