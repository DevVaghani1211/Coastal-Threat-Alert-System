
import os
from twilio.rest import Client

TWILIO_SID = os.getenv("TWILIO_SID", "")
TWILIO_AUTH = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_NUMBER = os.getenv("TWILIO_PHONE_NUMBER", "")

def send_sms(to_number: str, message: str) -> dict:
    if not (TWILIO_SID and TWILIO_AUTH and TWILIO_NUMBER):
        # Fallback to console log if creds missing
        print(f"[MOCK SMS] to {to_number}: {message}")
        return {"status": "mocked"}
    client = Client(TWILIO_SID, TWILIO_AUTH)
    msg = client.messages.create(
        body=message,
        from_=TWILIO_NUMBER,
        to=to_number
    )
    return {"status": "sent", "sid": msg.sid}
