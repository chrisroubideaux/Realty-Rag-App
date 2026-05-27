// components/admin/login.tsx
// components/admin/login.tsx

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiShield,
  FiUserCheck,
  FiZap,
} from "react-icons/fi";
import { FaFacebookF, FaGoogle } from "react-icons/fa";


const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const adminToken = searchParams.get("admin_token");
    const adminId = searchParams.get("admin_id");

    if (!adminToken || !adminId) return;

    localStorage.setItem("adminToken", adminToken);
    localStorage.setItem("adminId", adminId);

    router.replace(`/admin/${adminId}`);
  }, [router, searchParams]);

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/admin/google/login`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${API_BASE}/auth/admin/facebook/login`;
  };

  const handleFaceLogin = () => {
    window.location.href = "/admin/face-login";
  };

  return (
    <main className="admin-login-page">
      <div className="app-container">
        <div className="admin-login-page__grid">
          <motion.section
            className="admin-login-page__intro"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiShield />
              Admin access
            </span>

            <h1>
              Welcome back to{" "}
              <span className="text-gradient">Dakota Realty AI.</span>
            </h1>

            <p>
              Sign in to manage listings, agents, users, AI/RAG tools, platform
              analytics, and admin permissions from your secure dashboard.
            </p>

            <div className="admin-login-page__benefits">
              <div>
                <FiUserCheck />
                <span>Owner and admin-ready account flow</span>
              </div>

              <div>
                <FiEye />
                <span>Facial login support for fast admin access</span>
              </div>

              <div>
                <FiZap />
                <span>Manage Realty AI tools from one dashboard</span>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="admin-login-card glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          >
            <div className="admin-login-card__header">
              <div className="admin-login-card__icon">
                <AdminHomeIcon />
              </div>

              <div>
                <span>Admin portal</span>
                <h2>Choose how to continue</h2>
              </div>
            </div>

            <div className="admin-login-card__auth-stack">
              <Link href="/" className="admin-login-card__home-btn">
                <span className="admin-login-card__button-icon">
                  <FiArrowLeft />
                </span>

                <span>Back home</span>
              </Link>

              <button
                className="admin-login-card__face"
                type="button"
                onClick={handleFaceLogin}
              >
                <span className="admin-login-card__button-icon">
                  <FiEye />
                </span>

                <span>Login with facial recognition</span>

                <FiArrowRight className="admin-login-card__button-arrow" />
              </button>

              <div className="admin-login-card__divider">
                <span />
                <p>or continue with</p>
                <span />
              </div>

              <button
                className="admin-login-card__oauth-btn admin-login-card__oauth-btn--google"
                type="button"
                onClick={handleGoogleLogin}
              >
                <span className="admin-login-card__button-icon">
                  <FaGoogle />
                </span>

                <span>Continue with Google</span>

                <FiArrowRight className="admin-login-card__button-arrow" />
              </button>

              <button
                className="admin-login-card__oauth-btn admin-login-card__oauth-btn--facebook"
                type="button"
                onClick={handleFacebookLogin}
              >
                <span className="admin-login-card__button-icon">
                  <FaFacebookF />
                </span>

                <span>Continue with Facebook</span>

                <FiArrowRight className="admin-login-card__button-arrow" />
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

function AdminHomeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 10.8L12 3l9 7.8V21a1 1 0 0 1-1 1h-5.2v-6.8H9.2V22H4a1 1 0 0 1-1-1V10.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 11.5h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}