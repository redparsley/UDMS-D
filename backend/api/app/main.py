from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

from app.api.endpoints import auth, users, tickets
from app.db.base import Base
from app.db.session import engine, SessionLocal
from app.core.init_db import init_db

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize database with default data
db = SessionLocal()
try:
    init_db(db)
finally:
    db.close()

# Create main application
app = FastAPI(
    title="EDIS Lite API",
    description="API for managing tickets and users",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

# Create sub-application for /api/v1
api_v1 = FastAPI(
    title="EDIS Lite API",
    description="API for managing tickets and users",
    version="1.0.0",
    openapi_url="/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware for API v1
api_v1.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom middleware for logging IP addresses
class IPLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # You can add your IP logging logic here
        response = await call_next(request)
        return response

api_v1.add_middleware(IPLoggingMiddleware)

# Include routers in API v1
api_v1.include_router(auth.router, prefix="/auth", tags=["auth"])
api_v1.include_router(users.router, prefix="/users", tags=["users"])
api_v1.include_router(tickets.router, prefix="/tickets", tags=["tickets"])

# Mount API v1 under /api/v1
app.mount("/api/v1", api_v1)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to EDIS Lite API",
        "docs_url": "/api/v1/docs",
        "redoc_url": "/api/v1/redoc"
    } 