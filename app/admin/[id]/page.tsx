// app/admin/[id].tsx
// app/admin/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import AdminSidebar, {
  type AdminSidebarTab,
} from "@/components/admin/sidebar/AdminSidebar";

const ADMIN_TOKEN_KEY = "adminToken";
const ADMIN_ID_KEY = "adminId";

type AdminProfile = {
  id: string;
  full_name: string;
  email?: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] =
    useState<AdminSidebarTab>("dashboard");

  useEffect(() => {
    const adminIdFromParams =
      typeof params.id === "string" ? params.id : "";

    const tokenFromURL =
      searchParams.get("admin_token") || searchParams.get("token");

    const adminIdFromURL =
      searchParams.get("admin_id") || adminIdFromParams;

    if (tokenFromURL && adminIdFromURL) {
      localStorage.setItem(ADMIN_TOKEN_KEY, tokenFromURL);
      localStorage.setItem(ADMIN_ID_KEY, adminIdFromURL);

      setAdminToken(tokenFromURL);

      setAdmin({
        id: adminIdFromURL,
        full_name: "Admin",
      });

      router.replace(`/admin/${adminIdFromURL}`);
      return;
    }

    const storedToken = localStorage.getItem(ADMIN_TOKEN_KEY);
    const storedAdminId =
      localStorage.getItem(ADMIN_ID_KEY) || adminIdFromParams;

    if (!storedToken || !storedAdminId) {
      router.replace("/admin");
      return;
    }

    setAdminToken(storedToken);

    setAdmin({
      id: storedAdminId,
      full_name: "Admin",
    });

    setLoading(false);
  }, [params.id, router, searchParams]);

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_ID_KEY);

    // Cleanup older test keys if they exist.
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("aurora_admin_token");

    setAdminToken(null);
    setAdmin(null);

    router.replace("/admin");
  };

  if (loading) {
    return (
      <main className="admin-dashboard-page">
        <h1>Loading admin dashboard…</h1>
      </main>
    );
  }

  if (!admin || !adminToken) return null;

  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar
        adminId={admin.id}
        adminName={admin.full_name}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="admin-dashboard-page">
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
                <p>Overview cards, recent activity, and platform stats will go here.</p>
              </>
            )}

            {activeTab === "calendar" && (
              <>
                <span className="brand-kicker">Showings & Open Houses</span>
                <h1>Calendar</h1>
                <p>Calendar CRUD for showings, appointments, and open houses will go here.</p>
              </>
            )}

            {activeTab === "listings" && (
              <>
                <span className="brand-kicker">Property Management</span>
                <h1>Listings</h1>
                <p>Current property types, add/edit/delete listings, and listing tools will go here.</p>
              </>
            )}

            {activeTab === "users" && (
              <>
                <span className="brand-kicker">User Analytics</span>
                <h1>Users</h1>
                <p>User analytics, account insights, and management tools will go here.</p>
              </>
            )}

            {activeTab === "ai" && (
              <>
                <span className="brand-kicker">AI Operations</span>
                <h1>AI / RAG</h1>
                <p>RAG operations, document indexing, prompts, and AI search tools will go here.</p>
              </>
            )}

            {activeTab === "agents" && (
              <>
                <span className="brand-kicker">Agent Management</span>
                <h1>Agents</h1>
                <p>Admin CRUD operations for real estate agents will go here.</p>
              </>
            )}

            {activeTab === "analytics" && (
              <>
                <span className="brand-kicker">Platform Analytics</span>
                <h1>Analytics</h1>
                <p>Charts, performance data, and platform insights will go here.</p>
              </>
            )}

            {activeTab === "activity" && (
              <>
                <span className="brand-kicker">Admin Activity</span>
                <h1>Activity</h1>
                <p>Admin actions, audit logs, and recent system activity will go here.</p>
              </>
            )}

            {activeTab === "settings" && (
              <>
                <span className="brand-kicker">Admin Settings</span>
                <h1>Settings</h1>
                <p>Admin preferences, permissions, and platform settings will go here.</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
