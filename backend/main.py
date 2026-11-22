
import os
import re
import resend

from html import escape
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# ==========================================
# LOAD ENVIRONMENT VARIABLES
# ==========================================

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL", "onboarding@resend.dev")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL")

# Configure Resend API key
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


# ==========================================
# INITIALIZE FASTAPI APPLICATION
# ==========================================

app = FastAPI(
    title="Abhinav Portfolio API",
    description="Backend API for Abhinav TS's Portfolio Website",
    version="1.0.0"
)


# ==========================================
# CORS CONFIGURATION
# ==========================================

origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://abhinavts-portfolio.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"]
)


# ==========================================
# ROOT ENDPOINT
# ==========================================

@app.get("/")
def home():
    return {
        "message": "Welcome to Abhinav's Portfolio API",
        "status": "Backend is running"
    }


# ==========================================
# HEALTH CHECK ENDPOINT
# ==========================================

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Portfolio Backend"
    }


# ==========================================
# CONTACT FORM REQUEST MODEL
# ==========================================

class ContactMessage(BaseModel):

    name: str = Field(min_length=2, max_length=100)
    email: str = Field(min_length=5, max_length=254)
    subject: str = Field(min_length=3, max_length=150)
    message: str = Field(min_length=10, max_length=5000)


# ==========================================
# CONTACT FORM API ENDPOINT
# ==========================================

@app.post("/api/contact")
def send_contact_message(contact: ContactMessage):

    # Validate email format
    email_pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

    if not re.fullmatch(email_pattern, contact.email):
        raise HTTPException(
            status_code=422,
            detail="Please provide a valid email address."
        )

    # Check Resend configuration
    if not all([
        RESEND_API_KEY,
        FROM_EMAIL,
        RECEIVER_EMAIL
    ]):
        raise HTTPException(
            status_code=503,
            detail="Email service is not configured."
        )

    # ======================================
    # ESCAPE VISITOR INPUT FOR HTML EMAIL
    # ======================================

    safe_name = escape(contact.name)
    safe_email = escape(contact.email)
    safe_subject = escape(contact.subject)
    safe_message = escape(contact.message)

    # ======================================
    # PLAIN-TEXT EMAIL
    # ======================================

    plain_text = f"""
New Portfolio Contact Message

Name: {contact.name}
Email: {contact.email}
Subject: {contact.subject}

Message:
{contact.message}

Sent through Abhinav TS's Portfolio.
"""

    # ======================================
    # HTML EMAIL FORMATTING
    # ======================================

    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333;">

        <div style="max-width: 600px; margin: auto;
                    padding: 25px; border: 1px solid #eee;
                    border-radius: 10px;">

            <h2 style="color: #b58b35;">
                New Portfolio Message
            </h2>

            <p>You have received a new message through your portfolio.</p>

            <hr>

            <p><strong>Name:</strong> {safe_name}</p>
            <p><strong>Email:</strong> {safe_email}</p>
            <p><strong>Subject:</strong> {safe_subject}</p>

            <h3>Message</h3>

            <div style="background: #f8f7f4; padding: 15px;
                        border-radius: 8px; white-space: pre-wrap;">
                {safe_message}
            </div>

            <p style="margin-top: 25px; color: #888; font-size: 12px;">
                Sent through Abhinav TS's Portfolio.
            </p>

        </div>

    </body>
    </html>
    """

    # ======================================
    # SEND EMAIL THROUGH RESEND API
    # ======================================

    try:

        email = resend.Emails.send({
            "from": FROM_EMAIL,
            "to": [RECEIVER_EMAIL],
            "subject": f"Portfolio Contact: {contact.subject}",
            "reply_to": contact.email,
            "text": plain_text,
            "html": html_body
        })

        return {
            "success": True,
            "message": "Your message has been sent successfully!"
        }

    except Exception as error:

        print("Resend email error:", str(error))

        raise HTTPException(
            status_code=502,
            detail="Unable to send your message. Please try again later."
        )
