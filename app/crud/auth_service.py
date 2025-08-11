from app.models.user_models import User
from sqlmodel.ext.asyncio.session import AsyncSession
from app.utilities.utilities import generate_password_hash, verify_password
from app.schemas.user_schema import UserCreateModel
from sqlmodel import select



class UserService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_user_by_email(self, email: str, session: AsyncSession):
        statement = select(User).where(User.email == email)
        result = await session.exec(statement)
        user = result.first()
        return user
    
    async def user_exists(self, email: str, session: AsyncSession):
        user = await self.get_user_by_email(email, session)
        return user is not None


    async def create_user(self, user_data: UserCreateModel, session: AsyncSession):
        user_data_dict = user_data.model_dump()
        new_user = User(**user_data_dict)
        new_user.password_hash = generate_password_hash(user_data_dict['password'])
        session.add(new_user)
        await session.commit()
        await session.refresh(new_user)
        return new_user