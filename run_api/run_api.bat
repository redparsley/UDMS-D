@echo off
setlocal enabledelayedexpansion

:: Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Docker is not installed. Please install Docker first.
    exit /b 1
)

:: Check if Docker Compose is installed
where docker-compose >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

:: Check if Docker daemon is running
docker info >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Docker daemon is not running. Please start Docker first.
    exit /b 1
)

echo Starting API service...

:: Create a temporary docker-compose file for API only
(
echo version: '3.8'
echo.
echo services:
echo   api:
echo     build:
echo       context: ./backend/api
echo       dockerfile: Dockerfile
echo     ports:
echo       - "8020:8000"
echo     volumes:
echo       - ./backend/api:/app
echo     environment:
echo       - POSTGRES_SERVER=db
echo       - POSTGRES_USER=postgres
echo       - POSTGRES_PASSWORD=postgres
echo       - POSTGRES_DB=udms_d
echo       - PYTHONPATH=/app
echo     depends_on:
echo       db:
echo         condition: service_healthy
echo     networks:
echo       - udms-network
echo     healthcheck:
echo       test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
echo       interval: 30s
echo       timeout: 10s
echo       retries: 3
echo       start_period: 40s
echo.
echo   db:
echo     image: postgres:15-alpine
echo     volumes:
echo       - postgres_data:/var/lib/postgresql/data
echo     environment:
echo       - POSTGRES_USER=postgres
echo       - POSTGRES_PASSWORD=postgres
echo       - POSTGRES_DB=udms_d
echo     ports:
echo       - "5432:5432"
echo     networks:
echo       - udms-network
echo     healthcheck:
echo       test: ["CMD-SHELL", "pg_isready -U postgres"]
echo       interval: 10s
echo       timeout: 5s
echo       retries: 5
echo       start_period: 10s
echo.
echo volumes:
echo   postgres_data:
echo     driver: local
echo.
echo networks:
echo   udms-network:
echo     driver: bridge
) > docker-compose.api.yml

:: Function to cleanup on exit
:cleanup
echo.
echo Stopping services...
docker-compose -f docker-compose.api.yml down
del docker-compose.api.yml
echo Services stopped.
exit /b 0

:: Set up cleanup on script exit
set "CLEANUP_CMD=call :cleanup"
trap %CLEANUP_CMD% EXIT

:: Start the services
echo Building and starting services...
docker-compose -f docker-compose.api.yml up --build

:: Keep script running until interrupted
pause 