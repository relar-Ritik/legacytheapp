from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from sqlalchemy.orm import Session
from database import SessionLocal
from models import RequestLog
import json

EXCLUDED_PATHS = {"/openapi.json", "/docs", "/docs/oauth2-redirect", "/redoc", "/favicon.ico"}
MAX_BODY_LENGTH = 1000  # Limit request/response body size for logging

class DBLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Skip logging certain paths
        if request.url.path in EXCLUDED_PATHS:
            return await call_next(request)

        # Capture request body
        body_bytes = await request.body()
        try:
            body_text = body_bytes.decode('utf-8')
            # Pretty print if JSON
            body_json = json.loads(body_text)
            body_text = json.dumps(body_json, indent=2)
        except (UnicodeDecodeError, json.JSONDecodeError):
            body_text = body_bytes.decode('utf-8', errors='ignore')

        # Truncate if too big
        if len(body_text) > MAX_BODY_LENGTH:
            body_text = body_text[:MAX_BODY_LENGTH] + "... [TRUNCATED]"

        # Process the actual request
        response = await call_next(request)

        # Capture response body if possible
        response_body = b""
        async for chunk in response.body_iterator:
            response_body += chunk
        response.body_iterator = iterate_in_memory(response_body)

        try:
            response_text = response_body.decode('utf-8')
            response_json = json.loads(response_text)
            response_text = json.dumps(response_json, indent=2)
        except (UnicodeDecodeError, json.JSONDecodeError):
            response_text = response_body.decode('utf-8', errors='ignore')

        if len(response_text) > MAX_BODY_LENGTH:
            response_text = response_text[:MAX_BODY_LENGTH] + "... [TRUNCATED]"

        # Save to DB
        db: Session = SessionLocal()
        try:
            log = RequestLog(
                method=request.method,
                path=str(request.url.path),
                request_body=body_text,
                response_body=response_text,
                status_code=response.status_code,
            )
            db.add(log)
            db.commit()
        finally:
            db.close()

        return response

async def iterate_in_memory(data: bytes):
    yield data
