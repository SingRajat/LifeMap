from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime

from .. import schemas, models
from ..database import get_db
from ..auth import get_current_user

router = APIRouter(
    prefix="/missions",
    tags=["Missions"]
)

@router.post("/", response_model=schemas.MissionResponse, status_code=status.HTTP_201_CREATED)
def create_mission(mission: schemas.MissionCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Verify project belongs to a goal that belongs to user
    project = db.query(models.Project).join(models.Goal).filter(
        models.Project.id == mission.project_id,
        models.Goal.user_id == current_user.id
    ).first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found or does not belong to user")

    new_mission = models.Mission(**mission.model_dump())
    db.add(new_mission)
    db.commit()
    db.refresh(new_mission)
    return new_mission

@router.get("/today", response_model=List[schemas.MissionResponse])
def get_todays_missions(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Get today's bounds
    today = datetime.now().date()
    # Simple check matching current date, might need timezone handling in prod
    # using simple python level filtering for sqlite compat on date if needed, but lets use SA
    # In postgres it's ideal to use cast(models.Mission.date, Date) == today
    # But since it's just 'today', we can filter between start and end of day
    
    start_of_day = datetime.combine(today, datetime.min.time())
    end_of_day = datetime.combine(today, datetime.max.time())
    
    return db.query(models.Mission).join(models.Project).join(models.Goal).filter(
        models.Goal.user_id == current_user.id,
        models.Mission.date >= start_of_day,
        models.Mission.date <= end_of_day
    ).all()

@router.put("/{mission_id}", response_model=schemas.MissionResponse)
def update_mission(mission_id: UUID, mission_update: schemas.MissionUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_mission = db.query(models.Mission).join(models.Project).join(models.Goal).filter(
        models.Mission.id == mission_id,
        models.Goal.user_id == current_user.id
    ).first()
    
    if not db_mission:
        raise HTTPException(status_code=404, detail="Mission not found")
        
    update_data = mission_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_mission, key, value)
        
    db.commit()
    db.refresh(db_mission)
    return db_mission

@router.delete("/{mission_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_mission(mission_id: UUID, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_mission = db.query(models.Mission).join(models.Project).join(models.Goal).filter(
        models.Mission.id == mission_id,
        models.Goal.user_id == current_user.id
    ).first()
    
    if not db_mission:
        raise HTTPException(status_code=404, detail="Mission not found")
        
    db.delete(db_mission)
    db.commit()
    return None
