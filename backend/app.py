# backend/app.py
from dotenv import load_dotenv
load_dotenv()

import os
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import Config
from extensions import db, migrate, jwt, limiter

# Models for migrations
from admin.models import Admin, AdminIdentity


# Blueprints
from admin.routes import admin_bp
from admin.oauth import admin_oauth_bp


def _build_allowed_origins():
    frontend_url = (os.getenv("FRONTEND_URL") or "").rstrip("/")
    vercel_url = (os.getenv("VERCEL_URL") or "").rstrip("/")

    origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    if frontend_url:
        origins.append(frontend_url)

    if vercel_url:
        if vercel_url.startswith("http"):
            origins.append(vercel_url)
        else:
            origins.append(f"https://{vercel_url}")

    return list(dict.fromkeys(origins))


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config.from_object(Config)

    allowed_origins = _build_allowed_origins()
    allowed_origin_set = set(allowed_origins)

    CORS(
        app,
        resources={
            r"/api/*": {"origins": allowed_origins},
            r"/auth/*": {"origins": allowed_origins},
        },
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
        supports_credentials=False,
        max_age=86400,
    )

    @app.before_request
    def handle_preflight():
        if request.method == "OPTIONS" and (
            request.path.startswith("/api/") or request.path.startswith("/auth/")
        ):
            response = app.make_response(("", 204))
            origin = request.headers.get("Origin")

            if origin in allowed_origin_set:
                response.headers["Access-Control-Allow-Origin"] = origin
                response.headers["Vary"] = "Origin"
                response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
                response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
                response.headers["Access-Control-Max-Age"] = "86400"

            return response

        return None

    @app.after_request
    def add_cors_headers(response):
        origin = request.headers.get("Origin")

        if origin in allowed_origin_set:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Vary"] = "Origin"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            response.headers["Access-Control-Max-Age"] = "86400"

        return response

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    limiter.init_app(app)

    app.register_blueprint(admin_bp)
    app.register_blueprint(admin_oauth_bp)

    @app.get("/")
    def home():
        return jsonify({
            "message": "Dakota Realty backend is running",
            "allowed_origins": allowed_origins,
        }), 200

    @app.get("/api/health")
    def health_check():
        return jsonify({
            "status": "ok",
            "service": "dakota-realty-backend",
        }), 200

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000,
    )