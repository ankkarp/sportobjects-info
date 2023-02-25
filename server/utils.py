import json
import os

import pandas as pd
from sqlalchemy import create_engine, exc, text


engine = create_engine("postgresql://{user}:{psw}@{host}:{port}/{db}".format(
    user=os.environ.get('DB_USERNAME'),
    psw=os.environ.get('DB_PASSWORD'),
    host=os.environ.get('DB_HOST'),
    port=os.environ.get('DB_PORT'),
    db=os.environ.get('DB_DATABASE'))
)


def create_mapping(csv_file, mapping_path, table_name, index_col=None):
    data_cols = pd.Series(pd.read_csv(
        csv_file, index_col=index_col).columns).replace(':$', '', regex=True)
    with engine.connect() as con:
        postgre_cols = pd.read_sql(
            text(f'SELECT * FROM {table_name} LIMIT 1'), con).columns
    with open(mapping_path, 'w+', encoding='utf-8') as f:
        json.dump(dict(zip(postgre_cols, data_cols)), f, ensure_ascii=False)


if __name__ == '__main__':
    create_mapping(csv_file='server\data\data-20160714T0856-structure-20160714T0856.csv',
                   mapping_path='server/data/mapping.json',
                   table_name='sportobjects')
