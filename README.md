# sportobjects-info

## Звпуск

### Через docker-compose

В первую очередь необходимо создать .env в корневой папке:

    POSTGRES_PASSWORD=qwerty
    PGUSER=postgres
    POSTGRES_DB=sport
    DB_HOST=db
    DB_PORT=5432

Выполнить в командной строке из корневой папки проекта:

    docker compose up

Эта команда забилдит сервер и инициализирует базу данных, а также развернет фронтенд на localhost:3000.

Образы бд и сервера есть на dockerhub:

https://hub.docker.com/repository/docker/ankkarp/sportobjects-db
https://hub.docker.com/repository/docker/ankkarp/sportobjects-server

### Без docker-compose (требует python, nodejs и postgresql)

В первую очередь необходимо создать .env в корневой папке:

    POSTGRES_PASSWORD=qwerty
    PGUSER=postgres
    POSTGRES_DB=sport
    DB_HOST=localhost
    DB_PORT=5432

Перейти в папку server:

    python3 -m venv .venv
    pip install -r requirements.txt
    python build_db.py && uvicorn run:app --proxy-headers --host 0.0.0.0 --port 8000 --reload

Перейти в папку frontend:

Заменить в файлах map.js и overview/[stat].js wev на localhost в api-запросах.

Затем выполнить в терминале комманды:

    npm install
    npm run dev

Затем можно будет открыть веб-приложение на localhost:3000.
