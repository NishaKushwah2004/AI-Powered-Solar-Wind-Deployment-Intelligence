from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService
from app.repositories.role_repository import RoleRepository
from app.schemas.auth import LoginRequest, TokenResponse
from app.auth.dependencies import get_current_user
from app.models.user import User
from fastapi.security import OAuth2PasswordRequestForm
from app.auth.permissions import require_roles

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

@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
):
    user_repository = UserRepository(db)
    role_repository = RoleRepository(db)

    service = UserService(
        user_repository=user_repository,
        role_repository=role_repository,
    )

    return service.authenticate_user(
        email=login_data.email,
        password=login_data.password,
    )

@router.post(
    "/token",
    response_model=TokenResponse,
)
def token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user_repository = UserRepository(db)
    role_repository = RoleRepository(db)

    service = UserService(
        user_repository=user_repository,
        role_repository=role_repository,
    )

    return service.authenticate_user(
        email=form_data.username,
        password=form_data.password,
    )

@router.get(
    "/me",
    response_model=UserResponse,
)
def get_profile(
    current_user: User = Depends(get_current_user),
):
    return current_user

@router.get("/admin")
def admin_dashboard(
    current_user: User = Depends(
        require_roles("Admin")
    ),
):
    return {
        "message": "Welcome Admin!",
        "user": current_user.full_name,
        "role": current_user.role.name,
    }