from fastapi import WebSocket, WebSocketDisconnect
from typing import Optional

class ConnectionManager:
    def __init__(self) -> None:
        self.active_connections:  Optional[WebSocket] = None

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections = websocket

    def disconnect(self, websocket: WebSocket):
        if self.active_connections == websocket:
            self.active_connections = None

    async def send_notification(self, message: str):
        if self.active_connections:
            await self.active_connections.send_text(message)
            
