from fastapi import FastAPI
from app.routers.book_router import book_router
from app.routers.auth_router import auth_router
from contextlib import asynccontextmanager
from app.src.database import init_db
from fastapi.middleware.cors import CORSMiddleware

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Registering the book router with the FastAPI app
app.include_router(book_router, prefix=f"/api/{version}/books", tags=["books"])
app.include_router(auth_router, prefix=f"/api/{version}/auth", tags=['auth'])