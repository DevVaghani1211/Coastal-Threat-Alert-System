
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as auth_router
from routes.predict_routes import router as predict_router
from routes.assistant_routes import router as assistant_router

app = FastAPI(title="Coastal Threat Alert System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api")
app.include_router(predict_router, prefix="/api")
app.include_router(assistant_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "ok", "service": "coastal-threat-alert"}
