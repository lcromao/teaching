from datetime import date
from fastapi import status


def _signup_and_token(client) -> str:
    client.post(
        "/auth/signup",
        json={"name": "User", "email": "user@example.com", "password": "string"},
    )
    login = client.post("/auth/login", json={"email": "user@example.com", "password": "string"})
    assert login.status_code == status.HTTP_200_OK
    return login.json()["access_token"]


def test_tasks_crud_flow(client):
    token = _signup_and_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    # Initially empty
    resp = client.get("/tasks", headers=headers)
    assert resp.status_code == status.HTTP_200_OK
    assert resp.json()["tasks"] == []

    # Create
    create = client.post(
        "/tasks",
        headers=headers,
        json={"title": "T1", "description": "desc", "deadline": date.today().isoformat()},
    )
    assert create.status_code == status.HTTP_201_CREATED
    task = create.json()
    task_id = task["id"]
    assert task["title"] == "T1"
    assert "user_id" in task

    # List has one
    listed = client.get("/tasks", headers=headers)
    assert listed.status_code == status.HTTP_200_OK
    assert len(listed.json()["tasks"]) == 1

    # Get single
    got = client.get(f"/tasks/{task_id}", headers=headers)
    assert got.status_code == status.HTTP_200_OK
    assert got.json()["id"] == task_id

    # Update
    updated = client.put(f"/tasks/{task_id}", headers=headers, json={"title": "T1-upd"})
    assert updated.status_code == status.HTTP_200_OK
    assert updated.json()["title"] == "T1-upd"

    # Delete
    deleted = client.delete(f"/tasks/{task_id}", headers=headers)
    assert deleted.status_code == status.HTTP_204_NO_CONTENT

    # Empty again
    resp = client.get("/tasks", headers=headers)
    assert resp.status_code == status.HTTP_200_OK
    assert resp.json()["tasks"] == []

