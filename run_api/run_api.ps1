# PowerShell script to run API service

# Function to check if a command exists
function Test-Command {
    param ($command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'stop'
    try { if (Get-Command $command) { return $true } }
    catch { return $false }
    finally { $ErrorActionPreference = $oldPreference }
}

# Check if Docker is installed
if (-not (Test-Command docker)) {
    Write-Host "Docker is not installed. Please install Docker first." -ForegroundColor Yellow
    exit 1
}

# Check if Docker Compose is installed
if (-not (Test-Command docker-compose)) {
    Write-Host "Docker Compose is not installed. Please install Docker Compose first." -ForegroundColor Yellow
    exit 1
}

# Check if Docker daemon is running
try {
    $null = docker info
}
catch {
    Write-Host "Docker daemon is not running. Please start Docker first." -ForegroundColor Yellow
    exit 1
}

Write-Host "Starting API service..." -ForegroundColor Green

# Create a temporary docker-compose file for API only
$dockerComposeContent = @"
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
"@

$dockerComposeContent | Out-File -FilePath "docker-compose.api.yml" -Encoding UTF8

# Function to cleanup on exit
function Cleanup {
    Write-Host "`nStopping services..." -ForegroundColor Yellow
    docker-compose -f docker-compose.api.yml down
    Remove-Item -Path "docker-compose.api.yml" -Force
    Write-Host "Services stopped." -ForegroundColor Green
    exit 0
}

# Register cleanup function to run on script exit
$null = Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action { Cleanup }

# Start the services
Write-Host "Building and starting services..." -ForegroundColor Green
docker-compose -f docker-compose.api.yml up --build

# Keep script running until interrupted
Wait-Event 