from flask import Blueprint

user_bp = Blueprint("users", __name__, url_prefix="/api/users")

from . import routes  