import logging
import time
import traceback
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from . import models

Base.metadata.create_all(bind=engine) # Keeping this simple structure for dev

# Import routers
from .routers import auth, quotes, goals, projects, missions, time_logs, reviews, dashboard

# Initialize the FastAPI app
app = FastAPI(
    title="LifeMap API",
    description="Backend API for the LifeMap personal goal execution and behavior analysis planner.",
    version="1.0.0"
)

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("lifemap_api")

@app.on_event("startup")
async def startup_event():
    logger.info("LifeMap API backend has started successfully.")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(f"{request.method} {request.url.path} - Status: {response.status_code} - {process_time:.4f}s")
        return response
    except Exception as exc:
        process_time = time.time() - start_time
        logger.error(f"Unhandled Exception during {request.method} {request.url.path} - Time: {process_time:.4f}s\n{traceback.format_exc()}")
        raise exc  # Re-raise to be caught by the global handler

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global Exception Caught: {request.method} {request.url.path} \n{traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error", "message": "An unexpected error occurred. Please check server logs."},
    )

# Configure CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(quotes.router)
app.include_router(goals.router)
app.include_router(projects.router)
app.include_router(missions.router)
app.include_router(time_logs.router)
app.include_router(reviews.daily_router)
app.include_router(reviews.weekly_router)
app.include_router(dashboard.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to LifeMap API"}
