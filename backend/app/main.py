from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import query

app = FastAPI()

# ✅ ADD THIS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # ✅ allow all (dev only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routes
app.include_router(query.router, prefix="/query")