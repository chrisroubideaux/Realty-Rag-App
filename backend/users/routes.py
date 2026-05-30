# backend/users/routes.py

from datetime import datetime

from flask import request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

from extensions import db
from users import user_bp
from users.models import User
from users.decorators import user_token_required


@user_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json() or {}

    required_fields = ["email", "password"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"Missing field: {field}"}), 400

    email = data["email"].strip().lower()

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    user = User(
        full_name=data.get("full_name"),
        email=email,
        password_hash=generate_password_hash(data["password"]),
        profile_image_url=data.get("profile_image_url"),
        phone_number=data.get("phone_number"),
        user_type=data.get("user_type", "buyer"),
        budget_min=data.get("budget_min"),
        budget_max=data.get("budget_max"),
        preferred_city=data.get("preferred_city"),
        preferred_state=data.get("preferred_state"),
        desired_bedrooms=data.get("desired_bedrooms"),
        desired_bathrooms=data.get("desired_bathrooms"),
        property_interests=data.get("property_interests", []),
        saved_search_preferences=data.get("saved_search_preferences", {}),
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": user.to_dict(),
    }), 201


@user_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json() or {}

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    user = User.query.filter_by(email=email).first()

    if not user or not user.password_hash:
        return jsonify({"error": "Invalid email or password"}), 401

    if not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    if not user.is_active:
        return jsonify({"error": "User account disabled"}), 403

    user.last_login_at = datetime.utcnow()
    db.session.commit()

    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": "user",
            "email": user.email,
        },
    )

    return jsonify({
        "message": "User login successful",
        "token": token,
        "user": user.to_dict(),
    }), 200


@user_bp.route("/me", methods=["GET"])
@user_token_required
def get_current_user(current_user):
    return jsonify({
        "user": current_user.to_dict()
    }), 200


@user_bp.route("/me", methods=["PUT"])
@user_token_required
def update_current_user(current_user):
    data = request.get_json() or {}

    editable_fields = [
        "full_name",
        "profile_image_url",
        "phone_number",
        "user_type",
        "budget_min",
        "budget_max",
        "preferred_city",
        "preferred_state",
        "desired_bedrooms",
        "desired_bathrooms",
        "property_interests",
        "saved_search_preferences",
    ]

    for field in editable_fields:
        if field in data:
            setattr(current_user, field, data[field])

    db.session.commit()

    return jsonify({
        "message": "User profile updated successfully",
        "user": current_user.to_dict(),
    }), 200


@user_bp.route("/me/password", methods=["PUT"])
@user_token_required
def update_user_password(current_user):
    data = request.get_json() or {}

    current_password = data.get("current_password") or ""
    new_password = data.get("new_password") or ""

    if not current_user.password_hash:
        return jsonify({
            "error": "This user account does not currently use password login"
        }), 400

    if not check_password_hash(current_user.password_hash, current_password):
        return jsonify({"error": "Current password is incorrect"}), 401

    if len(new_password) < 8:
        return jsonify({"error": "New password must be at least 8 characters"}), 400

    current_user.password_hash = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200


@user_bp.route("/logout", methods=["POST"])
@user_token_required
def logout_user(current_user):
    return jsonify({
        "message": "User logged out successfully"
    }), 200