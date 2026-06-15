from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.database import get_session

from src.Auth.schemas import (UserCreateModel, UserReadModel, UserLoginModel)
from src.Auth.services import auth_service
from src.Auth.dependencies import get_current_user
from src.Auth.blocklist import add_jti_to_blocklist
from src.Auth.dependencies import AccessTokenBearer

auth_router = APIRouter()

@auth_router.post("/signup", response_model=UserReadModel, status_code=status.HTTP_201_CREATED)

async def signup_user(user_data: UserCreateModel, session: AsyncSession = Depends(get_session)):
    existing_email = await auth_service.get_user_by_email(user_data.email,session)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    existing_username = await auth_service.get_user_by_username(user_data.username, session)
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists"
        )

    user = await auth_service.create_user(user_data,session)

    return user


@auth_router.post("/login")

async def login_user(login_data: UserLoginModel, session: AsyncSession = Depends(get_session)):
    result = await auth_service.login_user(login_data, session)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

    return result


@auth_router.get("/current-user", response_model=UserReadModel)

async def current_user(user=Depends(get_current_user)):
    return user


@auth_router.post("/logout")

async def logout_user(token_data: dict = Depends(AccessTokenBearer())):
    await add_jti_to_blocklist(token_data["jti"])
    return {
    "message": "Logout successful"
    }