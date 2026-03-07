from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base

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

@app.get("/")
def read_root():
    return {"message": "Welcome to LifeMap API"}
