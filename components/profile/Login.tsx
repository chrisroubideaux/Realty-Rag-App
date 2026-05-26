// components/profile/Login.tsx

"use client";

import Link from "next/link";
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

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google/login`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${API_BASE}/auth/facebook/login`;
  };

  const handleFaceLogin = () => {
    window.location.href = "/face-login";
  };

  return (
    <main className="login-page">
      <div className="app-container">
        <div className="login-page__grid">
          <motion.section
            className="login-page__intro"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiShield />
              Password-free access
            </span>

            <h1>
              Welcome back to{" "}
              <span className="text-gradient">Dakota Realty AI.</span>
            </h1>

            <p>
              Sign in or create your account with facial recognition, Google, or
              Facebook to save listings, request showings, compare properties,
              and access your AI-powered real estate dashboard.
            </p>

            <div className="login-page__benefits">
              <div>
                <FiUserCheck />
                <span>Buyer, seller, and agent-ready account flow</span>
              </div>

              <div>
                <FiEye />
                <span>Facial login support for fast account access</span>
              </div>

              <div>
                <FiZap />
                <span>No password management required</span>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="login-card glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          >
            <div className="login-card__header">
              <div className="login-card__icon">
                <FiHomeIcon />
              </div>

              <div>
                <span>Account access</span>
                <h2>Choose how to continue</h2>
              </div>
            </div>

            <div className="login-card__auth-stack">
              <Link href="/" className="login-card__home-btn">
                <span className="login-card__button-icon">
                  <FiArrowLeft />
                </span>

                <span>Back home</span>
              </Link>

              <button
                className="login-card__face"
                type="button"
                onClick={handleFaceLogin}
              >
                <span className="login-card__button-icon">
                  <FiEye />
                </span>

                <span>Login with facial recognition</span>

                <FiArrowRight className="login-card__button-arrow" />
              </button>

              <div className="login-card__divider">
                <span />
                <p>or continue with</p>
                <span />
              </div>

              <button
                className="login-card__oauth-btn login-card__oauth-btn--google"
                type="button"
                onClick={handleGoogleLogin}
              >
                <span className="login-card__button-icon">
                  <FaGoogle />
                </span>

                <span>Continue with Google</span>

                <FiArrowRight className="login-card__button-arrow" />
              </button>

              <button
                className="login-card__oauth-btn login-card__oauth-btn--facebook"
                type="button"
                onClick={handleFacebookLogin}
              >
                <span className="login-card__button-icon">
                  <FaFacebookF />
                </span>

                <span>Continue with Facebook</span>

                <FiArrowRight className="login-card__button-arrow" />
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

function FiHomeIcon() {
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
    </svg>
  );
}


{/*
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiEye,
  FiLock,
  FiMail,
  FiShield,
  FiUserCheck,
} from "react-icons/fi";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google/login`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${API_BASE}/auth/facebook/login`;
  };

  const handleFaceLogin = () => {
    window.location.href = "/face-login";
  };

  return (
    <main className="login-page">
      <div className="app-container">
        <div className="login-page__grid">
          <motion.section
            className="login-page__intro"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="brand-kicker">
              <FiShield />
              Secure access
            </span>

            <h1>
              Welcome back to <span className="text-gradient">Dakota Realty AI.</span>
            </h1>

            <p>
              Sign in to save listings, request showings, compare properties,
              and access your AI-powered real estate dashboard.
            </p>

            <div className="login-page__benefits">
              <div>
                <FiUserCheck />
                <span>Buyer, seller, and agent-ready account flow</span>
              </div>

              <div>
                <FiEye />
                <span>Facial login support for a faster sign-in experience</span>
              </div>

              <div>
                <FiLock />
                <span>OAuth-ready authentication with Google and Facebook</span>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="login-card glass-card-strong"
            initial={{ opacity: 0, scale: 0.96, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          >
            <div className="login-card__header">
              <div className="login-card__icon">
                <FiHomeIcon />
              </div>

              <div>
                <span>Account login</span>
                <h2>Sign in to continue</h2>
              </div>
            </div>

            <form className="login-card__form">
              <label htmlFor="email">Email address</label>
              <div className="login-card__input">
                <FiMail />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <label htmlFor="password">Password</label>
              <div className="login-card__input">
                <FiLock />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              <div className="login-card__options">
                <label className="login-card__remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <Link href="/forgot-password">Forgot password?</Link>
              </div>

              <button className="login-card__submit" type="button">
                Login
                <FiArrowRight />
              </button>
            </form>

            <div className="login-card__divider">
              <span />
              <p>or continue with</p>
              <span />
            </div>

            <div className="login-card__oauth">
              <button type="button" onClick={handleGoogleLogin}>
                <FaGoogle />
                Google
              </button>

              <button type="button" onClick={handleFacebookLogin}>
                <FaFacebookF />
                Facebook
              </button>
            </div>

            <button
              className="login-card__face"
              type="button"
              onClick={handleFaceLogin}
            >
              <FiEye />
              Login with facial recognition
            </button>

            <p className="login-card__signup">
              Don&apos;t have an account? <Link href="/register">Create one</Link>
            </p>

            <Link href="/agent/login" className="login-card__agent-link">
              Agent or admin? Continue to agent portal
            </Link>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

function FiHomeIcon() {
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
    </svg>
  );
}

*/}