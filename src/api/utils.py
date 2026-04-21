import os
import jwt
from datetime import datetime, timedelta

SECRET = os.getenv("JWT_SECRET", "super-secret-key")

def generate_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")

def decode_token(token):
    try:
        data = jwt.decode(token, SECRET, algorithms=["HS256"])
        return data["user_id"]
    except:
        return None
