import os

from sqlalchemy import create_engine, exc, text
from dotenv import load_dotenv
import pandas as pd
import numpy as np


load_dotenv()


# try:
engine = create_engine("postgresql://{user}:{psw}@{host}:{port}/{db}".format(
    user=os.environ.get('DB_USERNAME'),
    psw=os.environ.get('DB_PASSWORD'),
    host=os.environ.get('DB_HOST'),
    port=os.environ.get('DB_PORT'),
    db=os.environ.get('DB_DATABASE'))
)

with engine.connect() as con:
    con.execute(
        text("""CREATE TABLE IF NOT EXISTS sportobjects (
    id integer,
    objectname varchar(127),
    title_in_english varchar(255),
    active varchar(1),
    short_description varchar(8191),
    detailed_description varchar(8191),
    brief_description varchar(8191),
    detailed_description_in_english varchar(8191),
    mo varchar(63),
    subject_of_the_federation varchar(63),
    significance varchar(31),
    locality varchar(31),
    locality_in_english varchar(63),
    addr varchar(255),
    addr_in_english varchar(255),
    oktmo float,
    ftp_federal_target_program varchar(63),
    actions_with_an_object varchar(15),
    start_date_of_construction_reconstruction varchar(15),
    date_of_completion_of_construction_reconstruction varchar(15),
    total_funding float,
    financing_from_the_federal_budget float,
    funding_from_the_federal_budget_of_which_mastered float,
    funding_from_the_budget_of_the_subject_of_the_federation float,
    funding_from_the_budget_of_the_subject_of_the_federation_of_which_mastered float,
    financing_from_the_budget_of_the_municipality float,
    financing_from_the_budget_of_the_municipality_of_which_mastered float,
    funding_from_extrabudgetary_sources float,
    financing_from_extrabudgetary_sources_of_which_mastered float,
    key_or_not float,
    supervisory_body varchar(255),
    supervising_body_in_english float,
    address_of_the_supervising_body varchar(127),
    address_of_the_supervising_body_in_english float,
    phone_number_of_the_supervising_body varchar(63),
    contact_phone_number_of_the_object varchar(63),
    opening_hours_mon_fri varchar(63),
    opening_hours_sat varchar(31),
    opening_hours_sun varchar(31),
    square float,
    email varchar(31),
    site_url varchar(63),
    registered varchar(3),
    type_of_sports_complex varchar(63),
    what_competitions_are_held varchar(31),
    kinds_of_sports varchar(1023),
    yandex_object_coordinate_x float,
    yandex_object_coordinate_y float,
    yandex_map_scale float,
    yandex_coordinate_center_x float,
    yandex_y_center_coordinate float,
    mini_x_coordinate float,
    mini_y_coordinate float,
    general_plan integer,
    additional_plans integer,
    photo integer,
    object_gallery_url varchar(127),
    video integer,
    panoramas integer,
    webcasts integer,
    other_materials integer,
    PRIMARY KEY (id)
)""")
    )
    con.commit()
# except Exception as e:
#     raise Exception(f'Unable to connect to database: {e}')


def build_db(csv_data):
    df = pd.read_csv(csv_data, index_col=0)
    with engine.connect() as con:
        for i in df.index:
            cols = [col for col in df.columns if str(df.iloc[i][col]) != 'nan']
            try:
                con.execute(text("INSERT INTO sportobjects ({columns}) VALUES ({values});".format(
                    columns=', '.join(cols),
                    values=', '.join(["'" + str(v.replace("'", '')) + "'" if type(v) == str else str(v) for v in df.iloc[i][cols]]))))
            except Exception as e:
                print(f'{e}: {cols}')
                break

        con.commit()


if __name__ == '__main__':
    build_db(csv_data='server\data\data.csv')
