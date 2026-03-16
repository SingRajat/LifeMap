from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from . import models

# Base.metadata.create_all(bind=engine) # Should use alembic in prod, but keeping this simple structure

# Import routers
from .routers import auth, quotes, goals, projects, missions, time_logs, reviews, dashboard

# Initialize the FastAPI app
app = FastAPI(
    title="LifeMap API",
    description="Backend API for the LifeMap personal goal execution and behavior analysis planner.",
    version="1.0.0"
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
