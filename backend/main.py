import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from routes.authRoutes import auth_router
from routes.userRoutes import user_router
from utilities.manager_instance import manager

app = FastAPI()

@app.websocket("/notifications")
async def notifications(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        

app.include_router(auth_router, prefix="/auth")
app.include_router(user_router, prefix="/users")
load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
