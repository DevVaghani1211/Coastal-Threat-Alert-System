
from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120))
    email = Column(String(255), unique=True, index=True)
    phone = Column(String(50), unique=True, index=True)
    password = Column(String(255))

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50))    # STORM / BLOOM
    severity = Column(String(50))
    message = Column(Text)
    ts = Column(DateTime, default=datetime.utcnow)
