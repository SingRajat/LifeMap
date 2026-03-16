from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime

from .. import schemas, models
from ..database import get_db
from ..auth import get_current_user

# --- Daily Reviews ---
daily_router = APIRouter(
    prefix="/daily-reviews",
    tags=["Daily Reviews"]
)

@daily_router.post("/", response_model=schemas.DailyReviewResponse, status_code=status.HTTP_201_CREATED)
def create_daily_review(review: schemas.DailyReviewCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_review = models.DailyReview(**review.model_dump(), user_id=current_user.id)
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review

@daily_router.get("/{date_str}", response_model=schemas.DailyReviewResponse)
def get_daily_review(date_str: str, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Fetch daily review by date. format YYYY-MM-DD"""
    try:
        target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
        
    start_of_day = datetime.combine(target_date, datetime.min.time())
    end_of_day = datetime.combine(target_date, datetime.max.time())
    
    review = db.query(models.DailyReview).filter(
        models.DailyReview.user_id == current_user.id,
        models.DailyReview.date >= start_of_day,
        models.DailyReview.date <= end_of_day
    ).first()
    
    if not review:
        raise HTTPException(status_code=404, detail="Daily review not found for given date")
        
    return review

# --- Weekly Reviews ---
weekly_router = APIRouter(
    prefix="/weekly-reviews",
    tags=["Weekly Reviews"]
)

@weekly_router.post("/", response_model=schemas.WeeklyReviewResponse, status_code=status.HTTP_201_CREATED)
def create_weekly_review(review: schemas.WeeklyReviewCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_review = models.WeeklyReview(**review.model_dump(), user_id=current_user.id)
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review

@weekly_router.get("/{start_date_str}", response_model=schemas.WeeklyReviewResponse)
def get_weekly_review(start_date_str: str, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Fetch weekly review by start_date. format YYYY-MM-DD"""
    try:
        target_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
        
    start_of_day = datetime.combine(target_date, datetime.min.time())
    end_of_day = datetime.combine(target_date, datetime.max.time())
    
    review = db.query(models.WeeklyReview).filter(
        models.WeeklyReview.user_id == current_user.id,
        models.WeeklyReview.start_date >= start_of_day,
        models.WeeklyReview.start_date <= end_of_day
    ).first()
    
    if not review:
        raise HTTPException(status_code=404, detail="Weekly review not found for given start date")
        
    return review
