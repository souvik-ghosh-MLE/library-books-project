from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from app.schemas.user_schema import UserCreateModel, UserModel
from app.crud.auth_service import UserService
from app.src.database import get_session

auth_router = APIRouter()

@auth_router.post("/signup", response_model=UserModel, status_code=status.HTTP_201_CREATED)
async def create_user_account(
    user_data: UserCreateModel,
    session: AsyncSession = Depends(get_session)
):
    user_service = UserService(session)  
    email = user_data.email

    if await user_service.user_exists(email, session):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User with this email already exists."
        )

    new_user = await user_service.create_user(user_data, session)
    return new_user