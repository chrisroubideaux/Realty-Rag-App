# backend/admin/indentity_linking.py
from werkzeug.security import generate_password_hash

from extensions import db
from admin.models import Admin, AdminIdentity


def get_or_create_admin_from_oauth(
    provider: str,
    provider_user_id: str,
    email: str,
    email_verified: bool = False,
    full_name: str | None = None,
    avatar_url: str | None = None,
):
    if not provider or not provider_user_id:
        raise ValueError("OAuth provider and provider_user_id are required")

    if not email:
        raise ValueError("OAuth email is required for admin login")

    email = email.strip().lower()

    identity = AdminIdentity.query.filter_by(
        provider=provider,
        provider_user_id=provider_user_id,
    ).first()

    if identity:
        admin = identity.admin

        if avatar_url and not admin.profile_image_url:
            admin.profile_image_url = avatar_url

        db.session.commit()
        return admin

    admin = Admin.query.filter_by(email=email).first()

    if not admin:
        admin = Admin(
            full_name=full_name or email.split("@")[0],
            email=email,
            password_hash=None,
            profile_image_url=avatar_url,
            role="owner",
        )

        db.session.add(admin)
        db.session.flush()

    new_identity = AdminIdentity(
        admin_id=admin.id,
        provider=provider,
        provider_user_id=provider_user_id,
        email_at_auth_time=email,
        email_verified=email_verified,
    )

    db.session.add(new_identity)
    db.session.commit()

    return admin