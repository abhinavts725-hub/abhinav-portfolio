import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL")

email = EmailMessage()
email["Subject"] = "Portfolio Backend - Email Test"
email["From"] = SENDER_EMAIL
email["To"] = RECEIVER_EMAIL

email.set_content("""
Hello Abhinav,

This is a test email from your Python FastAPI portfolio backend.

Your Gmail SMTP email delivery is working successfully!

Regards,
Abhinav Portfolio
""")

try:
    print("Connecting to Gmail...")

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=30) as server:
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(email)

    print("SUCCESS: Test email sent!")

except Exception as error:
    print("EMAIL DELIVERY FAILED:", repr(error))
