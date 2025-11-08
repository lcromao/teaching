from fastapi import status


def test_signup_then_login(client):
    payload = {"name": "Lucas", "email": "user@example.com", "password": "string"}

    # Try signup; accept 201 (created) or 409 (already exists) as pass
    resp = client.post("/auth/signup", json=payload)
    assert resp.status_code in (status.HTTP_201_CREATED, status.HTTP_409_CONFLICT)

    # Login must succeed
    login = client.post("/auth/login", json={"email": payload["email"], "password": payload["password"]})
    assert login.status_code == status.HTTP_200_OK
    data = login.json()
    assert "access_token" in data and data.get("token_type") == "bearer"

    # /auth/me returns the current user
    me = client.get("/auth/me", headers={"Authorization": f"Bearer {data['access_token']}"})
    assert me.status_code == status.HTTP_200_OK
    me_data = me.json()
    assert me_data["email"] == payload["email"]

