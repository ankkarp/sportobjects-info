import os

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


@app.get("/data")
async def get_all():
    df = pd.read_sql(text(f'SELECT * FROM sportobjects'), con)
    return df.astype(str).to_dict('records')


@app.get("/ids")
async def read_object():
    df = pd.read_sql(text(f'SELECT id FROM sportobjects'), con)
    return df.to_dict()


@app.get("/id/{id}")
async def read_object(id: int):
    object_df = pd.read_sql(
        text(f'SELECT * FROM sportobjects WHERE id = {id}'), con).iloc[0]
    return object_df.to_dict()


@app.get("/funding")
async def read_object():
    df = pd.read_sql(text(f'''SELECT funding_from_the_federal_budget,
                          funding_from_the_federal_budget_of_which_mastered
                          funding_from_the_budget_of_the_subject_of_the_federation,
                          funding_from_the_budget_of_the_subject_of_the_federation_of_whi,
                          funding_from_the_budget_of_the_municipality,
                          funding_from_the_budget_of_the_municipality_of_which_mastered,
                          funding_from_extrabudgetary_sources,
                          funding_from_extrabudgetary_sources_of_which_mastered
                          FROM sportobjects'''), con)
    return {col: df[col].sum(skipna=True) for col in df.columns}


@app.get("/sporttype")
async def read_object():
    df = pd.read_sql(
        text(f'''SELECT type_of_sports_complex FROM sportobjects'''), con)
    return df['type_of_sports_complex'].value_counts().to_dict()


# @app.get()s
