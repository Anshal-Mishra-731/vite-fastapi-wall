from passlib.context import CryptContext
from datetime import timedelta, datetime
from src.db.config import config
from jose import jwt
from jose.exceptions import ExpiredSignatureError, JWTError

import uuid
import logging

password_ctx = CryptContext(
    schemes=["bcrypt"]
)

def gen_hash_password(password: str) -> str:
    return password_ctx.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_ctx.verify(plain_password, hashed_password)

def create_access_token(user_data: dict, expiry: timedelta = None, refresh: bool = False) -> str:
    payload = {}
    payload["user"] = user_data
    payload["exp"] = (
        datetime.utcnow()
        + (
            expiry
            if expiry
            else timedelta(
                minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES
            )
        )
    )
    payload["jti"] = str(uuid.uuid4())
    payload["refresh"] = refresh
    token = jwt.encode(
        payload,
        config.JWT_KEY,
        algorithm=config.JWT_ALGORITHM
    )
    return token

def decode_token(token: str) -> dict | None:
    try:
        payload = jwt.decode(
            token,
            config.JWT_KEY,
            algorithms=[config.JWT_ALGORITHM]
        )
        return payload
    except ExpiredSignatureError:
        logging.error("Token has expired")
        return None
    except JWTError:
        logging.error("Invalid token")
        return None