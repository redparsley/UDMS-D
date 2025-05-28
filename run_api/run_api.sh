#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Docker is installed
if ! command_exists docker; then
    echo -e "${YELLOW}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command_exists docker-compose; then
    echo -e "${YELLOW}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Check if Docker daemon is running
if ! docker info >/dev/null 2>&1; then
    echo -e "${YELLOW}Docker daemon is not running. Please start Docker first.${NC}"
    exit 1
fi

echo -e "${GREEN}Starting API service...${NC}"

# Create a temporary docker-compose file for API only
cat > docker-compose.api.yml << EOL
version: '3.8'

services:
  api:
    build:
      context: ./backend/api
      dockerfile: Dockerfile
    ports:
      - "8020:8000"
    volumes:
      - ./backend/api:/app
    environment:
      - POSTGRES_SERVER=db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=udms_d
      - PYTHONPATH=/app
    depends_on:
      db:
        condition: service_healthy
    networks:
      - udms-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=udms_d
    ports:
      - "5432:5432"
    networks:
      - udms-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

volumes:
  postgres_data:
    driver: local

networks:
  udms-network:
    driver: bridge
EOL

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Stopping services...${NC}"
    docker-compose -f docker-compose.api.yml down
    rm docker-compose.api.yml
    echo -e "${GREEN}Services stopped.${NC}"
    exit 0
}

# Set up trap for cleanup on script exit
trap cleanup SIGINT SIGTERM

# Start the services
echo -e "${GREEN}Building and starting services...${NC}"
docker-compose -f docker-compose.api.yml up --build

# Keep script running until interrupted
wait 