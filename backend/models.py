from sqlalchemy import Column, Integer, String, Text, DateTime, func
from database import Base

class RequestLog(Base):
    __tablename__ = "request_logs"

    id = Column(Integer, primary_key=True, index=True)
    method = Column(String(10))
    path = Column(String(255))
    request_body = Column(Text)
    response_body = Column(Text)
    status_code = Column(Integer)
    timestamp = Column(DateTime, default=func.now())  # <-- DB server will auto-set the current timestamp
