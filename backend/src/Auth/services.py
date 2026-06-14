from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.db.models import User
from src.Auth.schemas import UserCreateModel, UserLoginModel
from src.Auth.utils import (gen_hash_password, verify_password, create_access_token)


class AuthService:
    async def get_user_by_email(self, email: str, db: AsyncSession):
        statement = select(User).where(User.email == email)
        result = await db.exec(statement)
        return result.first()

    async def get_user_by_username(self, username: str, db: AsyncSession):
        statement = select(User).where(User.username == username)
        result = await db.exec(statement)
        return result.first()

    async def user_exists(self, email: str, db: AsyncSession):
        user = await self.get_user_by_email(email, db)
        return user is not None

    async def create_user(self, user_data: UserCreateModel, db: AsyncSession):
        user_data_dict = user_data.model_dump()

        hashed_password = gen_hash_password(user_data_dict["password"])

        user_data_dict.pop("password")

        new_user = User(
            **user_data_dict,
            password_hash=hashed_password
        )

        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        return new_user

    async def login_user(self, login_data: UserLoginModel, db: AsyncSession):
        user = await self.get_user_by_username(login_data.username, db)
        if not user:
            return None

        password_valid = verify_password(
            login_data.password,
            user.password_hash
        )
        if not password_valid:
            return None

        token = create_access_token(
            user_data={
                "uid": str(user.uid),
                "username": user.username
            }
        )
        return {
            "access_token": token,
            "user": user
        }

auth_service = AuthService()