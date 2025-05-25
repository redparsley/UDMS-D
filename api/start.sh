#!/bin/sh

# Wait for PostgreSQL to be ready
while ! nc -z db 5432; do
    echo "Waiting for PostgreSQL to be ready..."
    sleep 1
done

# Run migrations
alembic upgrade head

# Start the application
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload 