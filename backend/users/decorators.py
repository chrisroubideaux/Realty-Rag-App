# backend/users/decorators.py

import uuid
from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt, get_jwt_identity

from users.models import User


def user_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.method == "OPTIONS":
            return "", 200

        try:
            verify_jwt_in_request()
            claims = get_jwt()
            identity = get_jwt_identity()
        except Exception:
            return jsonify({"error": "Missing or invalid token"}), 401

        if claims.get("role") != "user":
            return jsonify({"error": "Forbidden: user token required"}), 403

        try:
            user_uuid = uuid.UUID(str(identity))
        except Exception:
            return jsonify({"error": "Invalid user id in token"}), 401

        current_user = User.query.get(user_uuid)

        if not current_user:
            return jsonify({"error": "User not found"}), 404

        if not current_user.is_active:
            return jsonify({"error": "User account disabled"}), 403

        return f(current_user, *args, **kwargs)

    return decorated