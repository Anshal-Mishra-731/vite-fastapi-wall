from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.db.database import init_db

# Routers
from src.Auth.routes import auth_router
from src.Posts.routes import post_router


@asynccontextmanager
async def life_span(app: FastAPI):
    print("Starting Social Media API...")
    await init_db()
    yield
    print("Server stopped...")


version = "v1"
app = FastAPI(
    version=version,
    title="Social Media API",
    description="Backend for the Social Media Project",
    lifespan=life_span
)

app.include_router(auth_router, prefix=f"/api/{version}/auth", tags=["Auth"])
app.include_router(post_router, prefix=f"/api/{version}/posts", tags=["Posts"])