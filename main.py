from fastapi import FastAPI
from app.routers.book_router import book_router
from contextlib import asynccontextmanager
from app.src.database import init_db


#For managing the lifespan of the FastAPI application
@asynccontextmanager
async def life_span(app: FastAPI):
    print("Server starting up...")
    await init_db()
    yield
    print("Server shutting down...")

version = "v1"

#For creating the FastAPI app instance
app = FastAPI(
    title="Book API",
    description="A simple API to manage books",
    version=version,
    lifespan=life_span
)


#Registering the book router with the FastAPI app
app.include_router(book_router, prefix=f"/api/{version}/books", tags=["books"])