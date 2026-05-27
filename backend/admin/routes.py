# backend/admin/routes.py
from datetime import datetime

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

from extensions import db
from .models import Admin
from .decorators import admin_token_required


admin_bp = Blueprint("admins", __name__, url_prefix="/api/admins")


@admin_bp.route("/register", methods=["POST"])
def register_admin():
    data = request.get_json() or {}

    required_fields = ["full_name", "email", "password"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"Missing field: {field}"}), 400

    email = data["email"].strip().lower()

    existing_admin = Admin.query.filter_by(email=email).first()
    if existing_admin:
        return jsonify({"error": "Admin email already registered"}), 400

    admin = Admin(
        full_name=data["full_name"].strip(),
        email=email,
        password_hash=generate_password_hash(data["password"]),
        profile_image_url=data.get("profile_image_url"),
        phone_number=data.get("phone_number"),
        role=data.get("role", "owner"),
    )

    db.session.add(admin)
    db.session.commit()

    return jsonify({
        "message": "Admin registered successfully",
        "admin": admin.to_dict(),
    }), 201


@admin_bp.route("/login", methods=["POST"])
def login_admin():
    data = request.get_json() or {}

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    admin = Admin.query.filter_by(email=email).first()

    if not admin or not admin.password_hash:
        return jsonify({"error": "Invalid email or password"}), 401

    if not check_password_hash(admin.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    if not admin.is_active:
        return jsonify({"error": "Admin account disabled"}), 403

    admin.last_login_at = datetime.utcnow()
    db.session.commit()

    token = create_access_token(
        identity=str(admin.id),
        additional_claims={
            "role": admin.role,
            "email": admin.email,
        },
    )

    return jsonify({
        "message": "Admin login successful",
        "token": token,
        "admin": admin.to_dict(),
    }), 200


@admin_bp.route("/me", methods=["GET"])
@admin_token_required
def get_current_admin(current_admin):
    return jsonify({
        "admin": current_admin.to_dict()
    }), 200


@admin_bp.route("/me", methods=["PUT"])
@admin_token_required
def update_current_admin(current_admin):
    data = request.get_json() or {}

    if data.get("full_name"):
        current_admin.full_name = data["full_name"].strip()

    if data.get("phone_number") is not None:
        current_admin.phone_number = data.get("phone_number")

    if data.get("profile_image_url") is not None:
        current_admin.profile_image_url = data.get("profile_image_url")

    db.session.commit()

    return jsonify({
        "message": "Admin profile updated successfully",
        "admin": current_admin.to_dict(),
    }), 200


@admin_bp.route("/me/password", methods=["PUT"])
@admin_token_required
def update_admin_password(current_admin):
    data = request.get_json() or {}

    current_password = data.get("current_password") or ""
    new_password = data.get("new_password") or ""

    if not current_admin.password_hash:
        return jsonify({
            "error": "This admin account does not currently use password login"
        }), 400

    if not check_password_hash(current_admin.password_hash, current_password):
        return jsonify({"error": "Current password is incorrect"}), 401

    if len(new_password) < 8:
        return jsonify({"error": "New password must be at least 8 characters"}), 400

    current_admin.password_hash = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200


@admin_bp.route("/", methods=["GET"])
@admin_token_required
def get_all_admins(current_admin):
    admins = Admin.query.order_by(Admin.created_at.desc()).all()

    return jsonify({
        "admins": [admin.to_dict() for admin in admins]
    }), 200


@admin_bp.route("/<uuid:admin_id>", methods=["GET"])
@admin_token_required
def get_admin_by_id(current_admin, admin_id):
    admin = Admin.query.get(admin_id)

    if not admin:
        return jsonify({"error": "Admin not found"}), 404

    return jsonify({
        "admin": admin.to_dict()
    }), 200


@admin_bp.route("/<uuid:admin_id>", methods=["PUT"])
@admin_token_required
def update_admin_by_id(current_admin, admin_id):
    if current_admin.role != "owner":
        return jsonify({"error": "Only owner admins can update other admins"}), 403

    admin = Admin.query.get(admin_id)

    if not admin:
        return jsonify({"error": "Admin not found"}), 404

    data = request.get_json() or {}

    if data.get("full_name"):
        admin.full_name = data["full_name"].strip()

    if data.get("phone_number") is not None:
        admin.phone_number = data.get("phone_number")

    if data.get("profile_image_url") is not None:
        admin.profile_image_url = data.get("profile_image_url")

    if data.get("role"):
        admin.role = data.get("role")

    if data.get("permissions") is not None:
        admin.permissions = data.get("permissions")

    if data.get("is_active") is not None:
        admin.is_active = bool(data.get("is_active"))

    db.session.commit()

    return jsonify({
        "message": "Admin updated successfully",
        "admin": admin.to_dict(),
    }), 200


@admin_bp.route("/<uuid:admin_id>", methods=["DELETE"])
@admin_token_required
def delete_admin(current_admin, admin_id):
    if current_admin.role != "owner":
        return jsonify({"error": "Only owner admins can delete admins"}), 403

    admin = Admin.query.get(admin_id)

    if not admin:
        return jsonify({"error": "Admin not found"}), 404

    if str(admin.id) == str(current_admin.id):
        return jsonify({"error": "You cannot delete your own admin account"}), 400

    db.session.delete(admin)
    db.session.commit()

    return jsonify({
        "message": f"Admin '{admin.email}' deleted successfully"
    }), 200


@admin_bp.route("/logout", methods=["POST"])
@admin_token_required
def logout_admin(current_admin):
    return jsonify({
        "message": "Admin logged out successfully"
    }), 200