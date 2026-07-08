from app.schemas.base import BaseSchema
from app.schemas.role import RoleResponse
from pydantic import EmailStr


class UserBase(BaseSchema):
    full_name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str
    role_id: int


class UserResponse(UserBase):
    id: int
    is_active: bool
    role: RoleResponse