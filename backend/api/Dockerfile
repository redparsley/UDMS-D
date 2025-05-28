# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

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
# Run migrations\n\
echo "Running migrations..."\n\
alembic upgrade head\n\
\n\
# Start the application\n\
echo "Starting the application..."\n\
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload\n\
' > /app/entrypoint.sh

# Ensure scripts have correct line endings and permissions
RUN dos2unix /app/entrypoint.sh \
    && chmod +x /app/entrypoint.sh

# Run the application
ENTRYPOINT ["/app/entrypoint.sh"] 