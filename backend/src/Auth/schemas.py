from pydantic import BaseModel, EmailStr

class UserCreateModel(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserReadModel(BaseModel):
    username: str
    email: str

class UserLoginModel(BaseModel):
    email: EmailStr
    password: str