from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Any, Dict
from datetime import datetime
from uuid import UUID

# --- Generic Models ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[str] = None

# --- User Models ---
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- Quote Models ---
class QuoteResponse(BaseModel):
    id: UUID
    content: str
    author: Optional[str]
    
    class Config:
        from_attributes = True

# --- Goal Models ---
class GoalBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: int = 1
    deadline: Optional[datetime] = None

class GoalCreate(GoalBase):
    pass

class GoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[int] = None
    deadline: Optional[datetime] = None

class GoalResponse(GoalBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# --- Project Models ---
class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "pending"
    progress: float = 0.0

class ProjectCreate(ProjectBase):
    goal_id: UUID

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    progress: Optional[float] = None

class ProjectResponse(ProjectBase):
    id: UUID
    goal_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# --- Mission Models ---
class MissionBase(BaseModel):
    title: str
    date: Optional[datetime] = None
    estimated_time: Optional[int] = None
    status: str = "pending"

class MissionCreate(MissionBase):
    project_id: UUID

class MissionUpdate(BaseModel):
    title: Optional[str] = None
    date: Optional[datetime] = None
    estimated_time: Optional[int] = None
    actual_time: Optional[int] = None
    status: Optional[str] = None

class MissionResponse(MissionBase):
    id: UUID
    project_id: UUID
    actual_time: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# --- Time Log Models ---
class TimeLogBase(BaseModel):
    task_name: str
    goal_id: Optional[UUID] = None
    category: Optional[str] = None
    duration_minutes: int

class TimeLogCreate(TimeLogBase):
    pass

class TimeLogResponse(TimeLogBase):
    id: UUID
    user_id: UUID
    timestamp: datetime
    created_at: datetime

    class Config:
        from_attributes = True

# --- Review Models ---
class DailyReviewBase(BaseModel):
    date: datetime
    content: Optional[str] = None
    mood_score: Optional[int] = None

class DailyReviewCreate(DailyReviewBase):
    pass

class DailyReviewResponse(DailyReviewBase):
    id: UUID
    user_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class WeeklyReviewBase(BaseModel):
    start_date: datetime
    end_date: datetime
    content: Optional[str] = None

class WeeklyReviewCreate(WeeklyReviewBase):
    pass

class WeeklyReviewResponse(WeeklyReviewBase):
    id: UUID
    user_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

# --- Event Models ---
class EventBase(BaseModel):
    event_type: str
    event_metadata: Optional[Dict[str, Any]] = None

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: UUID
    user_id: UUID
    timestamp: datetime

    class Config:
        from_attributes = True

# --- Dashboard Models ---
class DashboardStatsResponse(BaseModel):
    mission_completion_rate: float
    goal_alignment: float
    active_projects: int
    today_missions_count: int
    time_distribution: Dict[str, int] # category -> minutes
