from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.services.base_service import BaseService


class UserService(BaseService[UserRepository]):
    def get_all_users(self):
        return self.repository.get_all()

    def get_user_by_email(self, email: str):
        return self.repository.get_by_email(email)

    def create_user(self, user: User):
        return self.repository.create(user)