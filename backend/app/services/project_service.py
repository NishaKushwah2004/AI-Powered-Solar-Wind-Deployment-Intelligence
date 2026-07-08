from fastapi import HTTPException, status

from app.models.project import Project
from app.models.user import User
from app.repositories.project_repository import ProjectRepository
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.services.base_service import BaseService


class ProjectService(BaseService[ProjectRepository]):
    def __init__(self, repository: ProjectRepository):
        super().__init__(repository)

    def get_all_projects(self):
        return self.repository.get_all()

    def get_project_by_id(self, project_id: int):
        project = self.repository.get_by_id(project_id)

        if project is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        return project

    def create_project(
        self,
        project_data: ProjectCreate,
        current_user: User,
    ):
        existing_project = self.repository.get_by_name(
            project_data.name
        )

        if existing_project:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Project name already exists",
            )

        project = Project(
            name=project_data.name,
            description=project_data.description,
            region=project_data.region,
            created_by=current_user.id,
        )

        return self.repository.create(project)

    def update_project(
        self,
        project_id: int,
        project_data: ProjectUpdate,
    ):
        project = self.get_project_by_id(project_id)

        if (
            project_data.name
            and project_data.name != project.name
        ):
            existing_project = self.repository.get_by_name(
                project_data.name
            )

            if existing_project:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Project name already exists",
                )

            project.name = project_data.name

        if project_data.description is not None:
            project.description = project_data.description

        if project_data.region is not None:
            project.region = project_data.region

        return self.repository.update(project)

    def delete_project(self, project_id: int):
        project = self.get_project_by_id(project_id)

        self.repository.delete(project)

        return {
            "message": "Project deleted successfully"
        }