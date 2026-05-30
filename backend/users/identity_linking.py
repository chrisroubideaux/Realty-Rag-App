import uuid
from werkzeug.security import generate_password_hash

from extensions import db
from users.models import User, UserIdentity


def _norm_email(email: str | None) -> str | None:
    return email.strip().lower() if email else None


def _find_identity(provider: str, provider_user_id: str) -> UserIdentity | None:
    return UserIdentity.query.filter_by(
        provider=provider,
        provider_user_id=provider_user_id,
    ).one_or_none()


def _find_user_by_email(email: str | None) -> User | None:
    email_norm = _norm_email(email)
    if not email_norm:
        return None

    return User.query.filter_by(email=email_norm).one_or_none()


def _link_identity(
    user: User,
    *,
    provider: str,
    provider_user_id: str,
    email: str | None,
    email_verified: bool,
) -> UserIdentity:
    existing = _find_identity(provider, provider_user_id)
    email_norm = _norm_email(email)

    if existing:
        if existing.user_id != user.id:
            raise ValueError("This OAuth account is already linked to another user.")

        existing.email_at_auth_time = email_norm
        existing.email_verified = bool(email_verified)
        db.session.add(existing)
        return existing

    identity = UserIdentity(
        user_id=user.id,
        provider=provider,
        provider_user_id=provider_user_id,
        email_at_auth_time=email_norm,
        email_verified=bool(email_verified),
    )

    db.session.add(identity)
    return identity


def get_or_create_user_from_oauth(
    *,
    provider: str,
    provider_user_id: str,
    email: str | None,
    email_verified: bool,
    full_name: str | None,
    avatar_url: str | None,
) -> User:
    if not provider or not provider_user_id:
        raise ValueError("OAuth provider and provider_user_id are required")

    identity = _find_identity(provider, provider_user_id)

    if identity:
        user = identity.user

        if avatar_url and not user.profile_image_url:
            user.profile_image_url = avatar_url

        db.session.commit()
        return user

    email_norm = _norm_email(email)
    user = _find_user_by_email(email_norm) if email_verified else None

    if not user:
        user = User(
            id=uuid.uuid4(),
            full_name=full_name or "Dakota Realty User",
            email=email_norm or f"{provider_user_id}@noemail.{provider}",
            password_hash=generate_password_hash(str(uuid.uuid4())),
            profile_image_url=avatar_url,
            oauth_provider=provider,
            oauth_id=provider_user_id,
            user_type="buyer",
            is_active=True,
        )

        db.session.add(user)
        db.session.flush()

    _link_identity(
        user,
        provider=provider,
        provider_user_id=provider_user_id,
        email=email_norm,
        email_verified=email_verified,
    )

    db.session.commit()
    return user