# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=udms_d

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        netcat-traditional \
        dos2unix \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Create entrypoint script
RUN echo '#!/bin/sh\n\
# Wait for PostgreSQL\n\
echo "Waiting for PostgreSQL..."\n\
while ! nc -z db 5432; do\n\
    sleep 1\n\
done\n\
echo "PostgreSQL started"\n\
\n\
# Create database if it does not exist\n\
echo "Creating database if it does not exist..."\n\
export PGPASSWORD=$POSTGRES_PASSWORD\n\
psql -h db -U $POSTGRES_USER -tc "SELECT 1 FROM pg_database WHERE datname = '\''$POSTGRES_DB'\''" | grep -q 1 || psql -h db -U $POSTGRES_USER -c "CREATE DATABASE $POSTGRES_DB"\n\
\n\
# Run migrations\n\
echo "Running migrations..."\n\
alembic upgrade head\n\
\n\
# Initialize database and capture the output\n\
echo "Initializing database..."\n\
python -c "from app.core.init_db import init_db; from app.db.session import SessionLocal; init_db(SessionLocal())"\n\
\n\
# Start the application\n\
echo "Starting the application..."\n\
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload\n\
' > /entrypoint.sh

# Ensure scripts have correct line endings and permissions
RUN dos2unix /entrypoint.sh \
    && chmod +x /entrypoint.sh

# Run the application
ENTRYPOINT ["/entrypoint.sh"] 