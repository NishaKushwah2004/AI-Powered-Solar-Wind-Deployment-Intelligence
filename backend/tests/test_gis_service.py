from unittest.mock import MagicMock

from app.services.gis_service import GISService


def test_get_bounding_box():
    service = GISService(db=MagicMock())

    service.site_repository.get_all = MagicMock(
        return_value=[]
    )

    assert service.get_bounding_box() is None