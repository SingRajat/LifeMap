import uuid
from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID, JSONB

from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=True)

    # Relationships
    goals = relationship("Goal", back_populates="user", cascade="all, delete-orphan")
    time_logs = relationship("TimeLog", back_populates="user", cascade="all, delete-orphan")
    daily_reviews = relationship("DailyReview", back_populates="user", cascade="all, delete-orphan")
    weekly_reviews = relationship("WeeklyReview", back_populates="user", cascade="all, delete-orphan")
    events = relationship("Event", back_populates="user", cascade="all, delete-orphan")
    quotes = relationship("Quote", back_populates="user", cascade="all, delete-orphan")

class Quote(Base):
    __tablename__ = "quotes"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    content = Column(Text, nullable=False)
    author = Column(String, nullable=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)

    user = relationship("User", back_populates="quotes")

class Goal(Base):
    __tablename__ = "goals"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    priority = Column(Integer, nullable=False, default=1)
    deadline = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="goals")
    projects = relationship("Project", back_populates="goal", cascade="all, delete-orphan")
    time_logs = relationship("TimeLog", back_populates="goal")

class Project(Base):
    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    goal_id = Column(UUID(as_uuid=True), ForeignKey("goals.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String, nullable=False, default="pending")
    progress = Column(Float, nullable=False, default=0.0)

    goal = relationship("Goal", back_populates="projects")
    missions = relationship("Mission", back_populates="project", cascade="all, delete-orphan")

class Mission(Base):
    __tablename__ = "missions"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    title = Column(String, nullable=False)
    date = Column(DateTime(timezone=True), nullable=True)
    estimated_time = Column(Integer, nullable=True) # in minutes
    actual_time = Column(Integer, nullable=True) # in minutes
    status = Column(String, nullable=False, default="pending")

    project = relationship("Project", back_populates="missions")

class TimeLog(Base):
    __tablename__ = "time_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    task_name = Column(String, nullable=False)
    goal_id = Column(UUID(as_uuid=True), ForeignKey("goals.id"), nullable=True)
    category = Column(String, nullable=True)
    duration_minutes = Column(Integer, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="time_logs")
    goal = relationship("Goal", back_populates="time_logs")

class DailyReview(Base):
    __tablename__ = "daily_reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    date = Column(DateTime(timezone=True), nullable=False)
    content = Column(Text, nullable=True)
    mood_score = Column(Integer, nullable=True)

    user = relationship("User", back_populates="daily_reviews")

class WeeklyReview(Base):
    __tablename__ = "weekly_reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    start_date = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True), nullable=False)
    content = Column(Text, nullable=True)

    user = relationship("User", back_populates="weekly_reviews")

class Event(Base):
    __tablename__ = "events"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    event_type = Column(String, nullable=False)
    event_metadata = Column("metadata", JSONB, nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="events")
