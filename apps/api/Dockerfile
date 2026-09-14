# syntax=docker/dockerfile:1
FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# psycopg[binary] ships its own libpq, so no libpq-dev / build-essential is
# needed here — keeps the image small and avoids a compiler toolchain.
COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY app ./app
COPY alembic ./alembic
COPY alembic.ini ./
COPY scripts ./scripts
COPY docker-entrypoint.sh ./

RUN chmod +x docker-entrypoint.sh \
  && useradd --system --create-home appuser \
  && chown -R appuser:appuser /app

USER appuser

EXPOSE 8000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
