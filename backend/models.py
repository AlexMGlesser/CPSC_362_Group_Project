from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, PrimaryKeyConstraint, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base

class Test(Base):
    __tablename__ = 'test'

    id = Column(Integer, primary_key = True)
    text = Column(String, nullable=False)