# backend/admin/decorators.py
import uuid
from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt, get_jwt_identity, decode_token

from admin.models import Admin


def admin_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.method == "OPTIONS":
            return "", 200

        try:
            verify_jwt_in_request()
            claims = get_jwt()
            identity = get_jwt_identity()
        except Exception:
            token = request.args.get("token")
            if not token:
                return jsonify({"error": "Missing token"}), 401

            try:
                decoded = decode_token(token)
                claims = decoded
                identity = decoded.get("sub")
            except Exception:
                return jsonify({"error": "Invalid or expired token"}), 401

        if claims.get("role") not in ["admin", "owner"]:
            return jsonify({"error": "Forbidden: admin token required"}), 403

        try:
            admin_uuid = uuid.UUID(str(identity))
        except Exception:
            return jsonify({"error": "Invalid admin id in token"}), 401

        current_admin = Admin.query.get(admin_uuid)

        if not current_admin:
            return jsonify({"error": "Admin not found"}), 404

        if not current_admin.is_active:
            return jsonify({"error": "Admin account disabled"}), 403

        return f(current_admin, *args, **kwargs)

    return decorated