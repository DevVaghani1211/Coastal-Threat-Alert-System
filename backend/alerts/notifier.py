
from typing import List
from sms_service import send_sms

def notify_numbers(numbers: List[str], message: str):
    results = []
    for n in numbers:
        try:
            results.append(send_sms(n, message))
        except Exception as e:
            results.append({"status": "error", "error": str(e)})
    return results
