from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService
from app.repositories.role_repository import RoleRepository

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    user_repository = UserRepository(db)
    role_repository = RoleRepository(db)

    service = UserService(
        user_repository=user_repository,
        role_repository=role_repository,
    )

    created_user = service.register_user(user)

    return created_user