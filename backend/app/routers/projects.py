from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from .. import schemas, models
from ..database import get_db
from ..auth import get_current_user

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

@router.post("/", response_model=schemas.ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Verify goal belongs to user
    goal = db.query(models.Goal).filter(models.Goal.id == project.goal_id, models.Goal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found or does not belong to user")

    new_project = models.Project(**project.model_dump())
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.get("/goal/{goal_id}", response_model=List[schemas.ProjectResponse])
def get_projects_by_goal(goal_id: UUID, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Verify goal belongs to user
    goal = db.query(models.Goal).filter(models.Goal.id == goal_id, models.Goal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
        
    return db.query(models.Project).filter(models.Project.goal_id == goal_id).all()

@router.put("/{project_id}", response_model=schemas.ProjectResponse)
def update_project(project_id: UUID, project_update: schemas.ProjectUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_project = db.query(models.Project).join(models.Goal).filter(
        models.Project.id == project_id,
        models.Goal.user_id == current_user.id
    ).first()
    
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    update_data = project_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)
        
    db.commit()
    db.refresh(db_project)
    return db_project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: UUID, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_project = db.query(models.Project).join(models.Goal).filter(
        models.Project.id == project_id,
        models.Goal.user_id == current_user.id
    ).first()
    
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    db.delete(db_project)
    db.commit()
    return None
