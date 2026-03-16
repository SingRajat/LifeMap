from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime

from .. import schemas, models
from ..database import get_db
from ..auth import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats", response_model=schemas.DashboardStatsResponse)
def get_dashboard_stats(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    user_id = current_user.id
    today = datetime.now().date()
    start_of_day = datetime.combine(today, datetime.min.time())
    end_of_day = datetime.combine(today, datetime.max.time())

    # Active projects (status not "completed")
    active_projects_count = db.query(models.Project).join(models.Goal).filter(
        models.Goal.user_id == user_id,
        models.Project.status != "completed"
    ).count()

    # Today's missions count
    today_missions_count = db.query(models.Mission).join(models.Project).join(models.Goal).filter(
        models.Goal.user_id == user_id,
        models.Mission.date >= start_of_day,
        models.Mission.date <= end_of_day
    ).count()

    # Time distribution (category -> total minutes)
    time_logs = db.query(models.TimeLog.category, func.sum(models.TimeLog.duration_minutes).label("total_duration")).filter(
        models.TimeLog.user_id == user_id
    ).group_by(models.TimeLog.category).all()
    
    time_distribution = {log.category if log.category else "Uncategorized": log.total_duration for log in time_logs}

    # Mission completion rate (all time for now)
    total_missions = db.query(models.Mission).join(models.Project).join(models.Goal).filter(
        models.Goal.user_id == user_id
    ).count()
    completed_missions = db.query(models.Mission).join(models.Project).join(models.Goal).filter(
        models.Goal.user_id == user_id,
        models.Mission.status == "completed"
    ).count()
    
    mission_completion_rate = 0.0
    if total_missions > 0:
        mission_completion_rate = (completed_missions / total_missions) * 100.0

    # Goal alignment (percentage of time spent on tasks linked to a goal)
    total_time = db.query(func.sum(models.TimeLog.duration_minutes)).filter(
        models.TimeLog.user_id == user_id
    ).scalar() or 0
    
    goal_time = db.query(func.sum(models.TimeLog.duration_minutes)).filter(
        models.TimeLog.user_id == user_id,
        models.TimeLog.goal_id.isnot(None)
    ).scalar() or 0
    
    goal_alignment = 0.0
    if total_time > 0:
        goal_alignment = (goal_time / total_time) * 100.0

    return schemas.DashboardStatsResponse(
        mission_completion_rate=mission_completion_rate,
        goal_alignment=goal_alignment,
        active_projects=active_projects_count,
        today_missions_count=today_missions_count,
        time_distribution=time_distribution
    )
