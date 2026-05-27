from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from extensions import db, migrate, jwt


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(
        app,
        resources={r"/api/*": {"origins": [Config.FRONTEND_URL]}},
        supports_credentials=True,
    )

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    @app.get("/")
    def home():
        return jsonify({
            "message": "Realtor AI backend is running"
        }), 200

    @app.get("/api/health")
    def health_check():
        return jsonify({
            "status": "ok",
            "service": "realtor-ai-backend"
        }), 200

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)