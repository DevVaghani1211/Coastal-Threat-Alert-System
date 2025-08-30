
import os
from backend.sms_service import send_sms
to = os.getenv("TEST_TO","+911234567890")
print(send_sms(to, "Test SMS from Coastal Threat Alert System."))
