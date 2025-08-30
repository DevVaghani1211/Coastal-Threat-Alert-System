
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
from models import User
from auth import hash_password

Base.metadata.create_all(bind=engine)
db: Session = SessionLocal()
users = [
    {"name":"Dev","email":"dev@example.com","phone":"+919999999999","password":"pass"},
    {"name":"Jenil","email":"jenil@example.com","phone":"+918888888888","password":"pass"}
]
for u in users:
    if not db.query(User).filter_by(phone=u['phone']).first():
        db.add(User(name=u['name'], email=u['email'], phone=u['phone'], password=hash_password(u['password'])))
db.commit()
print("Seeded users.")
