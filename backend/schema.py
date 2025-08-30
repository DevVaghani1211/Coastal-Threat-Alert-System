
from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str

class LoginRequest(BaseModel):
    email_or_phone: str
    password: str

class StormInput(BaseModel):
    wind_speed: float
    air_pressure: float
    tide_height: float
    rainfall: float

class AssistantQuery(BaseModel):
    question: str
    lang: Optional[str] = Field("en", description="en/hi/gu")
