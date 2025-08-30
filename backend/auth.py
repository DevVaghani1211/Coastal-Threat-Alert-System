
import hashlib

def hash_password(p: str) -> str:
    return hashlib.sha256(p.encode()).hexdigest()

def verify_password(p: str, hashed: str) -> bool:
    return hash_password(p) == hashed
