from fastapi import Depends, HTTPException, status

from app.auth.dependencies import get_current_user
from app.models.user import User


def require_roles(*allowed_roles: str):
    """
    RBAC dependency.
    Allows access only to users whose role
    is included in allowed_roles.
    """

    def role_checker(
        current_user: User = Depends(get_current_user),
    ) -> User:

        user_role = current_user.role.name

        if user_role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action.",
            )

        return current_user

    return role_checker