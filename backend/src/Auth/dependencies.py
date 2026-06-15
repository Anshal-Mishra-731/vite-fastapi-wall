from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer
from sqlmodel.ext.asyncio.session import AsyncSession

from src.Auth.utilis import decode_token
from src.db.database import get_session
from src.db.models import User
from src.Auth.services import auth_service
from src.Auth.blocklist import is_jti_blocked


class AccessTokenBearer(HTTPBearer):
    async def __call__(self, request: Request):
        credentials = await super().__call__(request)
        token = credentials.credentials
        token_data = decode_token(token)

        if token_data is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        if await is_jti_blocked(token_data["jti"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been revoked, you need to log in again"
            )
            
        return token_data

async def get_current_user(token_data: dict = Depends(AccessTokenBearer()), session: AsyncSession = Depends(get_session)):
    username = token_data["user"]["username"]

    user = await auth_service.get_user_by_username(username,session)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user