# backend/users/oauth.py
import os
import logging
import requests
from urllib.parse import urlencode

from flask import Blueprint, jsonify, redirect, request
from flask_jwt_extended import create_access_token

from users.identity_linking import get_or_create_user_from_oauth


oauth_bp = Blueprint("oauth", __name__, url_prefix="/auth")

logging.basicConfig(level=logging.DEBUG)

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000").rstrip("/")
SERVER_BASE_URL = os.getenv("SERVER_BASE_URL", "http://localhost:5000").rstrip("/")


def user_google_callback_url() -> str:
    return os.getenv(
        "GOOGLE_CALLBACK_URL",
        f"{SERVER_BASE_URL}/auth/google/callback",
    ).rstrip("/")


def user_facebook_callback_url() -> str:
    return os.getenv(
        "FACEBOOK_CALLBACK_URL_LOGIN",
        f"{SERVER_BASE_URL}/auth/facebook/callback",
    ).rstrip("/")


@oauth_bp.route("/debug/oauth", methods=["GET"])
def debug_oauth():
    return jsonify({
        "FRONTEND_URL": FRONTEND_URL,
        "SERVER_BASE_URL": SERVER_BASE_URL,
        "GOOGLE_CALLBACK_URL": os.getenv("GOOGLE_CALLBACK_URL"),
        "google_redirect_uri_used": user_google_callback_url(),
        "FACEBOOK_CALLBACK_URL_LOGIN": os.getenv("FACEBOOK_CALLBACK_URL_LOGIN"),
        "facebook_redirect_uri_used": user_facebook_callback_url(),
        "google_client_id_exists": bool(os.getenv("GOOGLE_CLIENT_ID")),
        "facebook_client_id_exists": bool(os.getenv("FACEBOOK_CLIENT_ID")),
    }), 200


@oauth_bp.route("/google/login", methods=["GET"])
def google_login():
    redirect_uri = user_google_callback_url()

    params = {
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent",
    }

    return redirect(
        "https://accounts.google.com/o/oauth2/v2/auth?"
        + urlencode(params)
    )


@oauth_bp.route("/google/callback", methods=["GET"])
def google_callback():
    code = request.args.get("code")

    if not code:
        return jsonify({"error": "Missing Google OAuth code"}), 400

    redirect_uri = user_google_callback_url()

    token_res = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "code": code,
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code",
        },
        timeout=15,
    )

    if token_res.status_code != 200:
        logging.error("Google token exchange failed: %s", token_res.text)
        return jsonify({
            "error": "Google token exchange failed",
            "details": token_res.text,
            "redirect_uri_used": redirect_uri,
        }), 400

    access_token = token_res.json().get("access_token")

    if not access_token:
        return jsonify({"error": "No access token returned from Google"}), 400

    info_res = requests.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        headers={"Authorization": f"Bearer {access_token}"},
        timeout=15,
    )

    info = info_res.json() or {}

    user = get_or_create_user_from_oauth(
        provider="google",
        provider_user_id=info.get("sub"),
        email=info.get("email"),
        email_verified=bool(info.get("email_verified")),
        full_name=info.get("name"),
        avatar_url=info.get("picture"),
    )

    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": "user",
            "email": user.email,
        },
    )

    return redirect(
        f"{FRONTEND_URL}/login"
        f"?token={token}&id={user.id}"
    )


@oauth_bp.route("/facebook/login", methods=["GET"])
def facebook_login():
    redirect_uri = user_facebook_callback_url()

    params = {
        "client_id": os.getenv("FACEBOOK_CLIENT_ID"),
        "redirect_uri": redirect_uri,
        "scope": "email,public_profile",
        "response_type": "code",
    }

    return redirect(
        "https://www.facebook.com/v19.0/dialog/oauth?"
        + urlencode(params)
    )


@oauth_bp.route("/facebook/callback", methods=["GET"])
def facebook_callback():
    code = request.args.get("code")

    if not code:
        return jsonify({"error": "Missing Facebook OAuth code"}), 400

    redirect_uri = user_facebook_callback_url()

    token_res = requests.get(
        "https://graph.facebook.com/v19.0/oauth/access_token",
        params={
            "client_id": os.getenv("FACEBOOK_CLIENT_ID"),
            "client_secret": os.getenv("FACEBOOK_CLIENT_SECRET"),
            "redirect_uri": redirect_uri,
            "code": code,
        },
        timeout=15,
    )

    token_json = token_res.json() or {}
    access_token = token_json.get("access_token")

    if not access_token:
        logging.error("Facebook token exchange failed: %s", token_res.text)
        return jsonify({
            "error": "Failed to obtain Facebook access token",
            "details": token_res.text,
            "redirect_uri_used": redirect_uri,
        }), 400

    info = requests.get(
        "https://graph.facebook.com/me?fields=id,name,email,picture.type(large)",
        params={"access_token": access_token},
        timeout=15,
    ).json() or {}

    email = info.get("email")

    if not email:
        return jsonify({"error": "Facebook did not return an email"}), 400

    user = get_or_create_user_from_oauth(
        provider="facebook",
        provider_user_id=info.get("id"),
        email=email,
        email_verified=True,
        full_name=info.get("name"),
        avatar_url=(info.get("picture") or {}).get("data", {}).get("url"),
    )

    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": "user",
            "email": user.email,
        },
    )

    return redirect(
        f"{FRONTEND_URL}/login"
        f"?token={token}&id={user.id}"
    )