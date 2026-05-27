// app/admin/[id]/page.tsx
// app/admin/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import AdminSidebar, {
  type AdminSidebarTab,
} from "@/components/admin/sidebar/AdminSidebar";
import AdminBioCard from "@/components/admin/bio/AdminBioCard";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000";

const ADMIN_TOKEN_KEY = "adminToken";
const ADMIN_ID_KEY = "adminId";

type AdminPermissions = {
  can_manage_agents?: boolean;
  can_manage_listings?: boolean;
  can_manage_rag?: boolean;
  can_manage_users?: boolean;
  can_view_analytics?: boolean;
};

type AdminProfile = {
  id: string;
  full_name: string;
  email?: string;
  phone_number?: string | null;
  profile_image_url?: string | null;
  role?: string;
  is_active?: boolean;
  permissions?: AdminPermissions;
  created_at?: string;
  updated_at?: string;
  last_login_at?: string | null;
};

type EditableAdminField = "full_name" | "email" | "phone_number";

type AdminMeResponse =
  | AdminProfile
  | {
      admin: AdminProfile;
      message?: string;
    };

function normalizeAdminProfile(data: AdminMeResponse): AdminProfile {
  if ("admin" in data) return data.admin;
  return data;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [activeTab, setActiveTab] =
    useState<AdminSidebarTab>("dashboard");

  useEffect(() => {
    let isMounted = true;

    const bootstrapAdmin = async () => {
      try {
        const adminIdFromParams =
          typeof params.id === "string" ? params.id : "";

        const tokenFromURL =
          searchParams.get("admin_token") || searchParams.get("token");

        const adminIdFromURL =
          searchParams.get("admin_id") || adminIdFromParams;

        let tokenToUse = tokenFromURL;
        let adminIdToUse = adminIdFromURL;

        if (tokenFromURL && adminIdFromURL) {
          localStorage.setItem(ADMIN_TOKEN_KEY, tokenFromURL);
          localStorage.setItem(ADMIN_ID_KEY, adminIdFromURL);

          router.replace(`/admin/${adminIdFromURL}`);
        }

        if (!tokenToUse) {
          tokenToUse = localStorage.getItem(ADMIN_TOKEN_KEY);
        }

        if (!adminIdToUse) {
          adminIdToUse =
            localStorage.getItem(ADMIN_ID_KEY) || adminIdFromParams;
        }

        if (!tokenToUse || !adminIdToUse) {
          router.replace("/admin");
          return;
        }

        if (isMounted) {
          setAdminToken(tokenToUse);
        }

        const res = await fetch(`${API_BASE}/api/admins/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
          },
        });

        if (!res.ok) {
          throw new Error("Unable to load admin profile");
        }

        const data = (await res.json()) as AdminMeResponse;
        const adminProfile = normalizeAdminProfile(data);

        localStorage.setItem(ADMIN_ID_KEY, adminProfile.id);

        if (isMounted) {
          setAdmin(adminProfile);
        }
      } catch (err) {
        console.error("Admin auth/profile error:", err);

        localStorage.removeItem(ADMIN_TOKEN_KEY);
        localStorage.removeItem(ADMIN_ID_KEY);
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
        localStorage.removeItem("aurora_admin_token");

        if (isMounted) {
          setAdmin(null);
          setAdminToken(null);
        }

        router.replace("/admin");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    bootstrapAdmin();

    return () => {
      isMounted = false;
    };
  }, [params.id, router, searchParams]);

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_ID_KEY);
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("aurora_admin_token");

    setAdminToken(null);
    setAdmin(null);

    router.replace("/admin");
  };

  const handleSaveAdminField = async (
    field: EditableAdminField,
    value: string
  ) => {
    if (!adminToken) {
      throw new Error("Missing admin token");
    }

    const res = await fetch(`${API_BASE}/api/admins/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        [field]: value,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update admin profile");
    }

    const data = (await res.json()) as AdminMeResponse;
    const updatedAdmin = normalizeAdminProfile(data);

    setAdmin(updatedAdmin);
    localStorage.setItem(ADMIN_ID_KEY, updatedAdmin.id);
  };

  if (loading) {
    return (
      <main className="admin-dashboard-main">
        <span className="brand-kicker">Admin</span>
        <h1>Loading admin dashboard…</h1>
      </main>
    );
  }

  if (!admin || !adminToken) return null;

  return (
    <div
      className={
        isSidebarCollapsed
          ? "admin-dashboard-layout admin-dashboard-layout--collapsed"
          : "admin-dashboard-layout"
      }
    >
      <AdminSidebar
        adminId={admin.id}
        adminName={admin.full_name || "Admin"}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        onCollapseChange={setIsSidebarCollapsed}
      />

      <main className="admin-dashboard-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25 }}
            className="admin-dashboard-content"
          >
            {activeTab === "dashboard" && (
              <>
                <span className="brand-kicker">Admin Dashboard</span>
                <h1>Dashboard</h1>
                <p>
                  Welcome back, {admin.full_name}. Manage your admin profile and
                  platform tools from one place.
                </p>

                <AdminBioCard
                  fullName={admin.full_name}
                  email={admin.email}
                  phoneNumber={admin.phone_number}
                  role={admin.role}
                  isActive={admin.is_active}
                  onSaveField={handleSaveAdminField}
                />
              </>
            )}

            {activeTab === "calendar" && (
              <>
                <span className="brand-kicker">Showings & Open Houses</span>
                <h1>Calendar</h1>
                <p>
                  Calendar CRUD for showings, appointments, and open houses will
                  go here.
                </p>
              </>
            )}

            {activeTab === "listings" && (
              <>
                <span className="brand-kicker">Property Management</span>
                <h1>Listings</h1>
                <p>
                  Current property types, add/edit/delete listings, and listing
                  tools will go here.
                </p>
              </>
            )}

            {activeTab === "users" && (
              <>
                <span className="brand-kicker">User Management</span>
                <h1>Users</h1>
                <p>
                  User analytics, account insights, and management tools will go
                  here.
                </p>
              </>
            )}

            {activeTab === "ai" && (
              <>
                <span className="brand-kicker">AI Operations</span>
                <h1>AI / RAG</h1>
                <p>
                  RAG operations, document indexing, prompts, and AI search tools
                  will go here.
                </p>
              </>
            )}

            {activeTab === "agents" && (
              <>
                <span className="brand-kicker">Agent Management</span>
                <h1>Agents</h1>
                <p>
                  Admin CRUD operations for real estate agents will go here.
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
import { motion, AnimatePresence } from "framer-motion";

import AdminSidebar, {
  type AdminSidebarTab,
} from "@/components/admin/sidebar/AdminSidebar";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000";

const ADMIN_TOKEN_KEY = "adminToken";
const ADMIN_ID_KEY = "adminId";

type AdminPermissions = {
  can_manage_agents?: boolean;
  can_manage_listings?: boolean;
  can_manage_rag?: boolean;
  can_manage_users?: boolean;
  can_view_analytics?: boolean;
};

type AdminProfile = {
  id: string;
  full_name: string;
  email?: string;
  phone_number?: string | null;
  profile_image_url?: string | null;
  role?: string;
  is_active?: boolean;
  permissions?: AdminPermissions;
  created_at?: string;
  updated_at?: string;
  last_login_at?: string | null;
};

type AdminMeResponse =
  | AdminProfile
  | {
      admin: AdminProfile;
      message?: string;
    };

function normalizeAdminProfile(data: AdminMeResponse): AdminProfile {
  if ("admin" in data) return data.admin;
  return data;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [activeTab, setActiveTab] =
    useState<AdminSidebarTab>("dashboard");

  useEffect(() => {
    let isMounted = true;

    const bootstrapAdmin = async () => {
      try {
        const adminIdFromParams =
          typeof params.id === "string" ? params.id : "";

        const tokenFromURL =
          searchParams.get("admin_token") || searchParams.get("token");

        const adminIdFromURL =
          searchParams.get("admin_id") || adminIdFromParams;

        let tokenToUse = tokenFromURL;
        let adminIdToUse = adminIdFromURL;

        if (tokenFromURL && adminIdFromURL) {
          localStorage.setItem(ADMIN_TOKEN_KEY, tokenFromURL);
          localStorage.setItem(ADMIN_ID_KEY, adminIdFromURL);

          router.replace(`/admin/${adminIdFromURL}`);
        }

        if (!tokenToUse) {
          tokenToUse = localStorage.getItem(ADMIN_TOKEN_KEY);
        }

        if (!adminIdToUse) {
          adminIdToUse =
            localStorage.getItem(ADMIN_ID_KEY) || adminIdFromParams;
        }

        if (!tokenToUse || !adminIdToUse) {
          router.replace("/admin");
          return;
        }

        if (isMounted) {
          setAdminToken(tokenToUse);
        }

        const res = await fetch(`${API_BASE}/api/admins/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
          },
        });

        if (!res.ok) {
          throw new Error("Unable to load admin profile");
        }

        const data = (await res.json()) as AdminMeResponse;
        const adminProfile = normalizeAdminProfile(data);

        localStorage.setItem(ADMIN_ID_KEY, adminProfile.id);

        if (isMounted) {
          setAdmin(adminProfile);
        }
      } catch (err) {
        console.error("Admin auth/profile error:", err);

        localStorage.removeItem(ADMIN_TOKEN_KEY);
        localStorage.removeItem(ADMIN_ID_KEY);
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
        localStorage.removeItem("aurora_admin_token");

        if (isMounted) {
          setAdmin(null);
          setAdminToken(null);
        }

        router.replace("/admin");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    bootstrapAdmin();

    return () => {
      isMounted = false;
    };
  }, [params.id, router, searchParams]);

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_ID_KEY);
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("aurora_admin_token");

    setAdminToken(null);
    setAdmin(null);

    router.replace("/admin");
  };

  if (loading) {
    return (
      <main className="admin-dashboard-main">
        <span className="brand-kicker">Admin</span>
        <h1>Loading admin dashboard…</h1>
      </main>
    );
  }

  if (!admin || !adminToken) return null;

  return (
    <div
      className={
        isSidebarCollapsed
          ? "admin-dashboard-layout admin-dashboard-layout--collapsed"
          : "admin-dashboard-layout"
      }
    >
      <AdminSidebar
        adminId={admin.id}
        adminName={admin.full_name || "Admin"}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        onCollapseChange={setIsSidebarCollapsed}
      />

      <main className="admin-dashboard-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25 }}
            className="admin-dashboard-content"
          >
            {activeTab === "dashboard" && (
              <>
                <span className="brand-kicker">Admin Dashboard</span>
                <h1>Dashboard</h1>
                <p>
                  Welcome back, {admin.full_name}. Overview cards, recent
                  activity, and platform stats will go here.
                </p>
              </>
            )}

            {activeTab === "calendar" && (
              <>
                <span className="brand-kicker">Showings & Open Houses</span>
                <h1>Calendar</h1>
                <p>
                  Calendar CRUD for showings, appointments, and open houses will
                  go here.
                </p>
              </>
            )}

            {activeTab === "listings" && (
              <>
                <span className="brand-kicker">Property Management</span>
                <h1>Listings</h1>
                <p>
                  Current property types, add/edit/delete listings, and listing
                  tools will go here.
                </p>
              </>
            )}

            {activeTab === "users" && (
              <>
                <span className="brand-kicker">User Management</span>
                <h1>Users</h1>
                <p>
                  User analytics, account insights, and management tools will go
                  here.
                </p>
              </>
            )}

            {activeTab === "ai" && (
              <>
                <span className="brand-kicker">AI Operations</span>
                <h1>AI / RAG</h1>
                <p>
                  RAG operations, document indexing, prompts, and AI search tools
                  will go here.
                </p>
              </>
            )}

            {activeTab === "agents" && (
              <>
                <span className="brand-kicker">Agent Management</span>
                <h1>Agents</h1>
                <p>
                  Admin CRUD operations for real estate agents will go here.
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

*/}