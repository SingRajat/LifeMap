import random
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID

from .. import schemas, models
from ..database import get_db
from ..auth import get_current_user

router = APIRouter(
    prefix="/quotes",
    tags=["Quotes"]
)

# Initial seed quotes (Optional, but good for "Get random quote" functionality if db empty)
DEFAULT_QUOTES = [
    {"content": "The only way to do great work is to love what you do.", "author": "Steve Jobs"},
    {"content": "Life is what happens when you're busy making other plans.", "author": "John Lennon"},
    {"content": "The future belongs to those who believe in the beauty of their dreams.", "author": "Eleanor Roosevelt"}
]

@router.get("/random", response_model=schemas.QuoteResponse)
def get_random_quote(db: Session = Depends(get_db)):
    # Simple approach to get random quote - in prod with large dataset, this can be slow
    quotes = db.query(models.Quote).all()
    if not quotes:
        # If no quotes in db, return a default one without saving to maintain pure GET semantics
        # Or alternatively add them to db. Let's return a fake one that fits the model schema for now
        import uuid
        from datetime import datetime
        q = random.choice(DEFAULT_QUOTES)
        return schemas.QuoteResponse(
            id=uuid.uuid4(),
            content=q["content"],
            author=q["author"]
        )
    return random.choice(quotes)
