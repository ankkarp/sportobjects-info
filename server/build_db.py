import os
import math

from sqlalchemy import create_engine, exc, text
from dotenv import load_dotenv
import pandas as pd
import numpy as np
from tqdm import tqdm

load_dotenv()


engine = create_engine("postgresql://{user}:{psw}@{host}:{port}/{db}".format(
    user=os.environ.get('DB_USERNAME'),
    psw=os.environ.get('DB_PASSWORD'),
    host=os.environ.get('DB_HOST'),
    port=os.environ.get('DB_PORT'),
    db=os.environ.get('DB_DATABASE'))
)


def init_db(df, table_name, pk):
    sql_code = f"""CREATE TABLE IF NOT EXISTS "{table_name}" (
                   "{pk}" integer,\n"""
    for col in tqdm(df.columns):
        col_values = df[col].dropna()
        if col != pk:
            sql_code += f'"{col.strip()}"'
            if len(col_values) == 0:
                sql_code += f' varchar(255),\n'
            else:
                col_values = pd.to_numeric(col_values, errors='ignore')
                if str(col_values.dtype).startswith('float'):
                    sql_code += ' float,\n'
                elif str(col_values.dtype).startswith('int'):
                    if col != 'id' and col_values.max() < 32768 and col_values.max() > -32767:
                        sql_code += ' smallint,\n'
                    elif col_values.max() < 2147483648 and col_values.max() > -2147483647:
                        sql_code += ' integer,\n'
                    else:
                        sql_code += ' bigint,\n'
                else:
                    maxlen = max(col_values.str.len() + 1)
                    sql_code += f' varchar({2 ** math.ceil(math.log2(maxlen)) - 1}),\n'
    sql_code += f'PRIMARY KEY ("{pk}"))'
    return sql_code


def build_db(csv_data, table_name, pk):
    df = pd.read_csv(csv_data)
    df.columns = pd.Series(df.columns).str.replace(r':$', '', regex=True)
    sql_create = init_db(df=df, table_name=table_name, pk=pk)
    with engine.connect() as con:
        con.execute(text(sql_create))
        con.commit()
        for i in tqdm(df.index):
            cols = [col for col in df.columns if str(df.iloc[i][col]) != 'nan']
            try:
                con.execute(text("INSERT INTO {table_name} ({columns}) VALUES({values}); ".format(
                    table_name=table_name,
                    columns=', '.join([f'"{col}"' for col in cols]),
                    values=', '.join(["'{}'".format(v.replace("'", ''))
                                      if type(v) == str else str(v)
                                      for v in df.iloc[i][cols]]))))
            except Exception as e:
                print(f'{e}: {cols}')
                break
        con.commit()


if __name__ == '__main__':
    build_db(csv_data='server\data\data.csv',
             table_name='objects',
             pk='id')
    # with engine.connect() as con:
    #     res = pd.read_sql(text('SELECT * FROM sportobjects LIMIT 2;'), con)
    #     print(res)
