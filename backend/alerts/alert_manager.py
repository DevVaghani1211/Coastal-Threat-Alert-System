
from sqlalchemy.orm import Session
from models import Alert

def log_alert(db: Session, a_type: str, severity: str, message: str):
    rec = Alert(type=a_type, severity=severity, message=message)
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return rec
