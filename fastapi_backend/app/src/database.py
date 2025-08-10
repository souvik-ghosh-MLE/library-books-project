from sqlmodel import create_engine, text, SQLModel
from sqlalchemy.ext.asyncio import AsyncEngine
from sqlalchemy.ext.asyncio import create_async_engine
from app.src.config import Config
import ssl
ssl_context = ssl.create_default_context()
from sqlmodel.ext.asyncio.session import AsyncSession

from sqlalchemy.orm import sessionmaker

#Create an async engine
async_engine = create_async_engine(
    Config.DATABASE_URL.split('?')[0],
    connect_args={"ssl": ssl_context},
    echo=True,
)

async def init_db() -> None:
    async with async_engine.begin() as conn:
        from app.models.book_models import Book
        await conn.run_sync(SQLModel.metadata.create_all)


async def get_session() -> AsyncSession:
    """
    Get a session for the database.
    """
    Session = sessionmaker(
        bind=async_engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )
    async with Session() as session:
        yield session
        await session.commit()
        await session.close() 
    pass    