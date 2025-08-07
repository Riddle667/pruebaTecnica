import bcrypt
import os
from fastapi import HTTPException, Request, status
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone


def get_hashed_password(password: str) -> str:
    """hash a una contraseña."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica una contraseña en texto plano con un hash."""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict, expires_delta: timedelta = None):
    """Crea un token JWT."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=30))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))

def decode_token(token: str) -> dict:
    """Decodifica un token JWT."""
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=[os.getenv("ALGORITHM")])
        return payload
    except JWTError as e:
        raise Exception(f"Token is invalid or expired: {e}")
    
def get_current_user(token: str) -> str:
    """Obtiene el usuario actual a partir del token."""
    payload = decode_token(token)
    return payload.get("sub")

def get_token_header_request(request: Request) -> str:
    """Obtiene el token JWT del encabezado Authorization."""
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing",
            headers={"WWW-Authenticate": "Bearer"}
        )

    token_type, _, token = auth_header.partition(" ")
    if token_type.lower() != "bearer" or not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format",
            headers={"WWW-Authenticate": "Bearer"}
        )

    return token