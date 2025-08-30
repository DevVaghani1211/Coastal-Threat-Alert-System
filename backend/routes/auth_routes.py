
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import User
from schema import SignupRequest, LoginRequest
from auth import hash_password, verify_password
from sms_service import send_sms

router = APIRouter(tags=["auth"])

# Create tables
Base.metadata.create_all(bind=engine)

@router.post("/signup")
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    if db.query(User).filter((User.email==payload.email)|(User.phone==payload.phone)).first():
        raise HTTPException(status_code=400, detail="User already exists")
    u = User(name=payload.name, email=payload.email, phone=payload.phone, password=hash_password(payload.password))
    db.add(u)
    db.commit()
    db.refresh(u)
    # Welcome SMS
    try:
        send_sms(u.phone, "Welcome to Coastal Threat Alerts. You will now receive safety alerts.")
    except Exception as e:
        print("SMS error:", e)
    return {"id": u.id, "name": u.name, "email": u.email, "phone": u.phone}

@router.post("/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    u = db.query(User).filter((User.email==payload.email_or_phone)|(User.phone==payload.email_or_phone)).first()
    if not u or not verify_password(payload.password, u.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "login ok", "user": {"id": u.id, "name": u.name, "email": u.email, "phone": u.phone}}
