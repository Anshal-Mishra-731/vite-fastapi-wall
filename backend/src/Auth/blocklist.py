import time
from src.db.config import config
JTI_EXPIRY = config.ACCESS_TOKEN_EXPIRE_MINUTES * 60

blocklist = {}

async def add_jti_to_blocklist(jti: str) -> None:
    blocklist[jti] = time.time() + JTI_EXPIRY

async def is_jti_blocked(jti: str) -> bool:
    expiry = blocklist.get(jti)
    if expiry is None:
        return False
    if expiry < time.time():
        del blocklist[jti]
        return False
    return True