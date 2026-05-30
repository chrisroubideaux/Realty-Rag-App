# backend/users/models.py

import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    full_name = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(120), unique=True, index=True, nullable=True)
    password_hash = db.Column(db.String(512), nullable=True)

    profile_image_url = db.Column(db.String(512), nullable=True)
    phone_number = db.Column(db.String(50), nullable=True)

    role = db.Column(db.String(50), default="user", nullable=False)

    user_type = db.Column(db.String(50), default="buyer", nullable=False)
    # buyer | seller | renter | investor

    budget_min = db.Column(db.Integer, nullable=True)
    budget_max = db.Column(db.Integer, nullable=True)

    preferred_city = db.Column(db.String(100), nullable=True)
    preferred_state = db.Column(db.String(100), nullable=True)

    desired_bedrooms = db.Column(db.Integer, nullable=True)
    desired_bathrooms = db.Column(db.Float, nullable=True)

    property_interests = db.Column(JSONB, default=list, nullable=False)
    saved_search_preferences = db.Column(JSONB, default=dict, nullable=False)

    oauth_provider = db.Column(db.String(50), nullable=True)
    oauth_id = db.Column(db.String(255), nullable=True, index=True)

    is_active = db.Column(db.Boolean, default=True, nullable=False)

    last_login_at = db.Column(db.DateTime, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    identities = db.relationship(
        "UserIdentity",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    def to_dict(self):
        return {
            "id": str(self.id),
            "full_name": self.full_name,
            "email": self.email,
            "profile_image_url": self.profile_image_url,
            "phone_number": self.phone_number,
            "role": self.role,
            "user_type": self.user_type,
            "budget_min": self.budget_min,
            "budget_max": self.budget_max,
            "preferred_city": self.preferred_city,
            "preferred_state": self.preferred_state,
            "desired_bedrooms": self.desired_bedrooms,
            "desired_bathrooms": self.desired_bathrooms,
            "property_interests": self.property_interests,
            "saved_search_preferences": self.saved_search_preferences,
            "oauth_provider": self.oauth_provider,
            "is_active": self.is_active,
            "last_login_at": self.last_login_at.isoformat() if self.last_login_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class UserIdentity(db.Model):
    __tablename__ = "user_identities"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    user_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    provider = db.Column(db.String(50), nullable=False)
    provider_user_id = db.Column(db.String(255), nullable=False, index=True)

    email_at_auth_time = db.Column(db.String(120), nullable=True)
    email_verified = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    user = db.relationship("User", back_populates="identities")

    __table_args__ = (
        db.UniqueConstraint(
            "provider",
            "provider_user_id",
            name="uq_user_provider_identity",
        ),
    )