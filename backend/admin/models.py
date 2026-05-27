# backend/admin/models.py
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from extensions import db


class Admin(db.Model):
    __tablename__ = "admins"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, index=True, nullable=False)
    password_hash = db.Column(db.String(512), nullable=True)

    profile_image_url = db.Column(db.String(512), nullable=True)
    phone_number = db.Column(db.String(50), nullable=True)

    role = db.Column(db.String(50), default="owner", nullable=False)

    permissions = db.Column(
        JSONB,
        default=lambda: {
            "can_manage_agents": True,
            "can_manage_listings": True,
            "can_manage_users": True,
            "can_view_analytics": True,
            "can_manage_rag": True,
        },
        nullable=False,
    )

    is_active = db.Column(db.Boolean, default=True, nullable=False)
    last_login_at = db.Column(db.DateTime, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    identities = db.relationship(
        "AdminIdentity",
        back_populates="admin",
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
            "permissions": self.permissions,
            "is_active": self.is_active,
            "last_login_at": self.last_login_at.isoformat() if self.last_login_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

    def __repr__(self):
        return f"<Admin {self.email}>"


class AdminIdentity(db.Model):
    __tablename__ = "admin_identities"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    admin_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey("admins.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    provider = db.Column(db.String(50), nullable=False)
    provider_user_id = db.Column(db.String(255), nullable=False, index=True)

    email_at_auth_time = db.Column(db.String(120), nullable=True)
    email_verified = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    admin = db.relationship("Admin", back_populates="identities")

    __table_args__ = (
        db.UniqueConstraint("provider", "provider_user_id", name="uq_admin_provider_identity"),
    )