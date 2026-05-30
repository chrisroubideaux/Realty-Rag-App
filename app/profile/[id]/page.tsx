// app/profile[id]/page.tsx
// app/profile/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import UserSidebar, {
  type UserSidebarTab,
} from "@/components/profile/sidebar/UserSidebar";
import UserBioCard from "@/components/profile/bio/UserBioCard";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000";

const USER_TOKEN_KEY = "userToken";
const USER_ID_KEY = "userId";

type UserProfile = {
  id: string;
  full_name?: string | null;
  email: string;
  phone_number?: string | null;
  profile_image_url?: string | null;
  user_type?: string;
  budget_min?: number | null;
  budget_max?: number | null;
  preferred_city?: string | null;
  preferred_state?: string | null;
  desired_bedrooms?: number | null;
  desired_bathrooms?: number | null;
  property_interests?: string[];
  saved_search_preferences?: Record<string, unknown>;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  last_login_at?: string | null;
};

type EditableUserField =
  | "full_name"
  | "email"
  | "phone_number"
  | "user_type"
  | "preferred_city"
  | "preferred_state";

type UserMeResponse =
  | UserProfile
  | {
      user: UserProfile;
      message?: string;
    };

function normalizeUserProfile(data: UserMeResponse): UserProfile {
  if ("user" in data) return data.user;
  return data;
}

function getDisplayName(user: UserProfile) {
  if (user.full_name?.trim()) return user.full_name;
  return user.email;
}

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [activeTab, setActiveTab] =
    useState<UserSidebarTab>("dashboard");

  useEffect(() => {
    let isMounted = true;

    const bootstrapUser = async () => {
      try {
        const userIdFromParams =
          typeof params.id === "string" ? params.id : "";

        const tokenFromURL = searchParams.get("token");

        const userIdFromURL =
          searchParams.get("id") ||
          searchParams.get("user_id") ||
          userIdFromParams;

        let tokenToUse = tokenFromURL;
        let userIdToUse = userIdFromURL;

        if (tokenFromURL && userIdFromURL) {
          localStorage.setItem(USER_TOKEN_KEY, tokenFromURL);
          localStorage.setItem(USER_ID_KEY, userIdFromURL);

          localStorage.setItem("authToken", tokenFromURL);
          localStorage.setItem("token", tokenFromURL);

          router.replace(`/profile/${userIdFromURL}`);
        }

        if (!tokenToUse) {
          tokenToUse = localStorage.getItem(USER_TOKEN_KEY);
        }

        if (!userIdToUse) {
          userIdToUse = localStorage.getItem(USER_ID_KEY) || userIdFromParams;
        }

        if (!tokenToUse || !userIdToUse) {
          router.replace("/login");
          return;
        }

        if (isMounted) {
          setUserToken(tokenToUse);
        }

        const res = await fetch(`${API_BASE}/api/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
          },
        });

        if (!res.ok) {
          throw new Error("Unable to load user profile");
        }

        const data = (await res.json()) as UserMeResponse;
        const userProfile = normalizeUserProfile(data);

        localStorage.setItem(USER_ID_KEY, userProfile.id);

        if (isMounted) {
          setUser(userProfile);
        }
      } catch (err) {
        console.error("User auth/profile error:", err);

        localStorage.removeItem(USER_TOKEN_KEY);
        localStorage.removeItem(USER_ID_KEY);
        localStorage.removeItem("authToken");
        localStorage.removeItem("token");

        if (isMounted) {
          setUser(null);
          setUserToken(null);
        }

        router.replace("/login");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    bootstrapUser();

    return () => {
      isMounted = false;
    };
  }, [params.id, router, searchParams]);

  const handleLogout = () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");

    setUser(null);
    setUserToken(null);

    router.replace("/login");
  };

  const handleSaveUserField = async (
    field: EditableUserField,
    value: string
  ) => {
    if (!userToken) {
      throw new Error("Missing user token");
    }

    const res = await fetch(`${API_BASE}/api/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        [field]: value,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update user profile");
    }

    const data = (await res.json()) as UserMeResponse;
    const updatedUser = normalizeUserProfile(data);

    setUser(updatedUser);
    localStorage.setItem(USER_ID_KEY, updatedUser.id);
  };

  if (loading) {
    return (
      <main className="profile-dashboard-main">
        <span className="brand-kicker">Profile</span>
        <h1>Loading your dashboard…</h1>
      </main>
    );
  }

  if (!user || !userToken) return null;

  return (
    <div
      className={
        isSidebarCollapsed
          ? "profile-dashboard-layout profile-dashboard-layout--collapsed"
          : "profile-dashboard-layout"
      }
    >
      <UserSidebar
        userId={user.id}
        userName={getDisplayName(user)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        onCollapseChange={setIsSidebarCollapsed}
      />

      <main className="profile-dashboard-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25 }}
            className="profile-dashboard-content"
          >
            {activeTab === "dashboard" && (
              <>
                <span className="brand-kicker">User Dashboard</span>
                <h1>Dashboard</h1>
                <p>
                  Welcome back, {getDisplayName(user)}. Your saved listings,
                  search preferences, and property activity will go here.
                </p>

                <UserBioCard
                  fullName={user.full_name}
                  email={user.email}
                  phoneNumber={user.phone_number}
                  userType={user.user_type}
                  preferredCity={user.preferred_city}
                  preferredState={user.preferred_state}
                  isActive={user.is_active}
                  onSaveField={handleSaveUserField}
                />
              </>
            )}

            {activeTab === "calendar" && (
              <>
                <span className="brand-kicker">Showings & Appointments</span>
                <h1>Calendar</h1>
                <p>
                  Your upcoming showings, open houses, and real estate
                  appointments will go here.
                </p>
              </>
            )}

            {activeTab === "listings" && (
              <>
                <span className="brand-kicker">Saved Properties</span>
                <h1>Listings</h1>
                <p>
                  Saved listings, compared properties, and favorite homes will
                  go here.
                </p>
              </>
            )}

            {activeTab === "ai" && (
              <>
                <span className="brand-kicker">AI Search Assistant</span>
                <h1>AI / RAG</h1>
                <p>
                  AI-powered search, property Q&A, recommendations, and RAG
                  results will go here.
                </p>
              </>
            )}

            {activeTab === "agents" && (
              <>
                <span className="brand-kicker">Agent Support</span>
                <h1>Agents</h1>
                <p>
                  Connected agents, messages, showing requests, and support
                  contacts will go here.
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

{/*
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000";

const USER_TOKEN_KEY = "userToken";
const USER_ID_KEY = "userId";

type UserProfile = {
  id: string;
  full_name?: string | null;
  email: string;
  phone_number?: string | null;
  profile_image_url?: string | null;
  user_type?: string;
  budget_min?: number | null;
  budget_max?: number | null;
  preferred_city?: string | null;
  preferred_state?: string | null;
  desired_bedrooms?: number | null;
  desired_bathrooms?: number | null;
  property_interests?: string[];
  saved_search_preferences?: Record<string, unknown>;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  last_login_at?: string | null;
};

type UserMeResponse =
  | UserProfile
  | {
      user: UserProfile;
      message?: string;
    };

function normalizeUserProfile(data: UserMeResponse): UserProfile {
  if ("user" in data) return data.user;
  return data;
}

function getDisplayName(user: UserProfile) {
  if (user.full_name?.trim()) return user.full_name;
  return user.email;
}

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const bootstrapUser = async () => {
      try {
        const userIdFromParams =
          typeof params.id === "string" ? params.id : "";

        const tokenFromURL = searchParams.get("token");

        const userIdFromURL =
          searchParams.get("id") ||
          searchParams.get("user_id") ||
          userIdFromParams;

        let tokenToUse = tokenFromURL;
        let userIdToUse = userIdFromURL;

        if (tokenFromURL && userIdFromURL) {
          localStorage.setItem(USER_TOKEN_KEY, tokenFromURL);
          localStorage.setItem(USER_ID_KEY, userIdFromURL);

          // Compatibility keys if other components check these.
          localStorage.setItem("authToken", tokenFromURL);
          localStorage.setItem("token", tokenFromURL);

          router.replace(`/profile/${userIdFromURL}`);
        }

        if (!tokenToUse) {
          tokenToUse = localStorage.getItem(USER_TOKEN_KEY);
        }

        if (!userIdToUse) {
          userIdToUse = localStorage.getItem(USER_ID_KEY) || userIdFromParams;
        }

        if (!tokenToUse || !userIdToUse) {
          router.replace("/login");
          return;
        }

        if (isMounted) {
          setUserToken(tokenToUse);
        }

        const res = await fetch(`${API_BASE}/api/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
          },
        });

        if (!res.ok) {
          throw new Error("Unable to load user profile");
        }

        const data = (await res.json()) as UserMeResponse;
        const userProfile = normalizeUserProfile(data);

        localStorage.setItem(USER_ID_KEY, userProfile.id);

        if (isMounted) {
          setUser(userProfile);
        }
      } catch (err) {
        console.error("User auth/profile error:", err);

        localStorage.removeItem(USER_TOKEN_KEY);
        localStorage.removeItem(USER_ID_KEY);
        localStorage.removeItem("authToken");
        localStorage.removeItem("token");

        if (isMounted) {
          setUser(null);
          setUserToken(null);
        }

        router.replace("/login");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    bootstrapUser();

    return () => {
      isMounted = false;
    };
  }, [params.id, router, searchParams]);

  const handleLogout = () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");

    setUser(null);
    setUserToken(null);

    router.replace("/login");
  };

  if (loading) {
    return (
      <main className="profile-page">
        <div className="app-container">
          <span className="brand-kicker">Profile</span>
          <h1>Loading your dashboard…</h1>
        </div>
      </main>
    );
  }

  if (!user || !userToken) return null;

  return (
    <main className="profile-page">
      <div className="app-container">
        <motion.section
          className="profile-hero glass-card-strong"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <div>
            <span className="brand-kicker">User Dashboard</span>

            <h1>Welcome, {getDisplayName(user)}</h1>

            <p>
              This is where saved listings, showing requests, search
              preferences, and AI-powered property recommendations will go.
            </p>
          </div>

          <button type="button" className="btn-soft" onClick={handleLogout}>
            Logout
          </button>
        </motion.section>

        <section className="profile-overview-grid">
          <div className="soft-card profile-overview-card">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="soft-card profile-overview-card">
            <span>User Type</span>
            <strong>{user.user_type || "buyer"}</strong>
          </div>

          <div className="soft-card profile-overview-card">
            <span>Preferred Location</span>
            <strong>
              {[user.preferred_city, user.preferred_state]
                .filter(Boolean)
                .join(", ") || "Not set"}
            </strong>
          </div>

          <div className="soft-card profile-overview-card">
            <span>Budget</span>
            <strong>
              {user.budget_min || user.budget_max
                ? `$${user.budget_min || 0} - $${user.budget_max || 0}`
                : "Not set"}
            </strong>
          </div>
        </section>
      </div>
    </main>
  );
}

*/}