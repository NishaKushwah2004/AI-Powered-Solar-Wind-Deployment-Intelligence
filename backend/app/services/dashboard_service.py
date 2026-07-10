from app.repositories.dashboard_repository import DashboardRepository


class DashboardService:

    def __init__(self, repository: DashboardRepository):
        self.repository = repository

    def get_summary(self):

        return {
            "total_projects": self.repository.count_projects(),
            "total_sites": self.repository.count_sites(),
            "total_users": self.repository.count_users(),
            "system_status": "Online",
        }