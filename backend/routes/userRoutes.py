from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from pydantic import BaseModel, EmailStr
from models.user import User
from database.database import Session, Base, engine
from routes.authRoutes import UserResponse
from utilities.JWT import decode_token, get_token_header_request
from utilities.manager_instance import manager

Base.metadata.create_all(bind=engine)

user_router = APIRouter()

class UserRequest(BaseModel):
    name: str
    email: EmailStr


@user_router.put("/{userId}", status_code=status.HTTP_200_OK)
async def update_user(
    userId: int,
    user: UserRequest,
    token: str = Depends(get_token_header_request)
):
    try:
        # Validar token
        payload = decode_token(token)
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        db = Session()

        existing_user = db.query(User).filter(User.id == userId).first()
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")

        # Actualizar campos del usuario
        for key, value in user.model_dump().items():
            setattr(existing_user, key, value)

        db.commit()
        db.refresh(existing_user)
        """await manager.send_notification(f"User updated: {existing_user.email}")"""

        return {
            "message": f"User with ID {userId} updated successfully",
            "user": UserResponse.model_validate(existing_user)
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@user_router.delete("/{userId}", status_code=status.HTTP_200_OK)
async def delete_user(userId: int, token: str = Depends(get_token_header_request)):   
    if not userId:
        raise HTTPException(status_code=400, detail="Invalid user ID")
    try:
        
         # Validar token
        payload = decode_token(token)
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        
        db = Session()
        existing_user = db.query(User).filter(User.id == userId).first()
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        db.delete(existing_user)
        db.commit()
        """await manager.send_notification(f"User deleted: {existing_user.email}")"""

        return {"message": f"User with ID {userId} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@user_router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(user: UserRequest):
    if not user:
        raise HTTPException(status_code=400, detail="Invalid user data")
    try:
        db = Session()
        new_user = User(**user)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "User created successfully", "user": new_user}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@user_router.get("/", status_code=status.HTTP_200_OK)
def get_users():
    try:
        db = Session()
        users = db.query(User).all()
        response_users = [UserResponse.model_validate(user) for user in users]
        
        return {
            "message": "List of users retrieved successfully",
            "users": response_users
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))