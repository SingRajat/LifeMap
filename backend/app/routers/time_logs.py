from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime

from .. import schemas, models
from ..database import get_db
from ..auth import get_current_user

router = APIRouter(
    prefix="/time-logs",
    tags=["Time Logs"]
)

@router.post("/", response_model=schemas.TimeLogResponse, status_code=status.HTTP_201_CREATED)
def create_time_log(time_log: schemas.TimeLogCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if time_log.goal_id:
        goal = db.query(models.Goal).filter(models.Goal.id == time_log.goal_id, models.Goal.user_id == current_user.id).first()
        if not goal:
            raise HTTPException(status_code=400, detail="Provided goal_id is invalid or does not belong to user")
        
    new_log = models.TimeLog(**time_log.model_dump(), user_id=current_user.id)
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log

@router.get("/date/{date_str}", response_model=List[schemas.TimeLogResponse])
def get_time_logs_by_date(date_str: str, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Fetch logs by date. date_str format: YYYY-MM-DD"""
    try:
        target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
        
    start_of_day = datetime.combine(target_date, datetime.min.time())
    end_of_day = datetime.combine(target_date, datetime.max.time())
    
    return db.query(models.TimeLog).filter(
        models.TimeLog.user_id == current_user.id,
        models.TimeLog.timestamp >= start_of_day,
        models.TimeLog.timestamp <= end_of_day
    ).all()
