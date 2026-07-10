from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_gis_summary():
    response = client.get("/gis/summary")

    assert response.status_code in (200, 401)