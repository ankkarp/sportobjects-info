FROM python:3.8-slim-buster
WORKDIR .
COPY . .
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
EXPOSE 800