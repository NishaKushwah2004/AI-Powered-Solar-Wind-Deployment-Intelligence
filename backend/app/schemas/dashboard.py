from pydantic import BaseModel


class DashboardSummaryResponse(BaseModel):
    total_projects: int
    total_sites: int
    total_users: int
    system_status: str