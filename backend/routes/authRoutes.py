from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from database.database import Base, Session, engine
from models.user import User
from utilities.JWT import create_access_token, verify_password, get_hashed_password
from utilities.manager_instance import manager

auth_router = APIRouter()
Base.metadata.create_all(bind=engine)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    model_config = {'from_attributes': True}

@auth_router.post("/register", status_code=201)
async def register_user(user: UserRequest):
    db = Session()
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        name=user.name,
        email=user.email,
        password=get_hashed_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    """await manager.send_notification(f"New user registered: {new_user.email}")"""

    access_token = create_access_token(data={"sub": new_user.email})

    return {
        "message": "User registered successfully",
        "user": UserResponse.model_validate(new_user),
        "access_token": access_token
    }

@auth_router.post("/login", status_code=status.HTTP_200_OK)
async def login_user(user: UserLogin):
    if not user.email or not user.password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    db = Session()
    existing_user = db.query(User).filter(User.email == user.email).first()

    if not existing_user or not verify_password(user.password, existing_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    """await manager.send_notification(f"User logged in: {existing_user.email}")"""

    access_token = create_access_token(data={"sub": existing_user.email})

    return {
        "message": "User authenticated successfully",
        "user": UserResponse.model_validate(existing_user),
        "access_token": access_token
    }