// components/admin/sidebar/AdminSidebar.tsx
// components/admin/sidebar/AdminSidebar.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiCpu,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiShield,
  FiUsers,
  FiX,
} from "react-icons/fi";

export type AdminSidebarTab =
  | "dashboard"
  | "calendar"
  | "listings"
  | "users"
  | "ai"
  | "agents";

type AdminSidebarProps = {
  adminId: string;
  adminName?: string;
  activeTab: AdminSidebarTab;
  onTabChange: (tab: AdminSidebarTab) => void;
  onLogout: () => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
};

type AdminSidebarItem = {
  label: string;
  tab: AdminSidebarTab;
  icon: React.ReactNode;
};

const mainTabs: AdminSidebarItem[] = [
  { label: "Dashboard", tab: "dashboard", icon: <FiHome /> },
  { label: "Calendar", tab: "calendar", icon: <FiCalendar /> },
  { label: "Listings", tab: "listings", icon: <FiSearch /> },
  { label: "Users", tab: "users", icon: <FiUsers /> },
  { label: "AI / RAG", tab: "ai", icon: <FiCpu /> },
  { label: "Agents", tab: "agents", icon: <FiShield /> },
];

function getFirstName(name: string) {
  const cleanName = name.trim();

  if (!cleanName || cleanName.toLowerCase() === "admin") {
    return "Admin";
  }

  return cleanName.split(" ")[0];
}

function getTimeGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function AdminSidebar({
  adminId,
  adminName = "Admin",
  activeTab,
  onTabChange,
  onLogout,
  onCollapseChange,
}: AdminSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const closeMobileMenu = () => setIsMobileOpen(false);

  const handleTabClick = (tab: AdminSidebarTab) => {
    onTabChange(tab);
    closeMobileMenu();
  };

  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  return (
    <>
      <button
        className="admin-sidebar__mobile-toggle"
        type="button"
        aria-label="Open admin menu"
        onClick={() => setIsMobileOpen(true)}
      >
        <FiMenu />
      </button>

      <aside
        className={
          isCollapsed
            ? "admin-sidebar admin-sidebar--desktop admin-sidebar--collapsed"
            : "admin-sidebar admin-sidebar--desktop"
        }
      >
        <button
          className="admin-sidebar__collapse-btn"
          type="button"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setIsCollapsed((current) => !current)}
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>

        <AdminSidebarContent
          adminName={adminName}
          activeTab={activeTab}
          isCollapsed={isCollapsed}
          onTabClick={handleTabClick}
          onLogout={onLogout}
        />
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.button
              className="admin-sidebar__backdrop"
              type="button"
              aria-label="Close admin menu"
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="admin-sidebar admin-sidebar--mobile"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <button
                className="admin-sidebar__close"
                type="button"
                aria-label="Close admin menu"
                onClick={() => setIsMobileOpen(false)}
              >
                <FiX />
              </button>

              <AdminSidebarContent
                adminName={adminName}
                activeTab={activeTab}
                isCollapsed={false}
                onTabClick={handleTabClick}
                onLogout={onLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function AdminSidebarContent({
  adminName,
  activeTab,
  isCollapsed,
  onTabClick,
  onLogout,
}: {
  adminName: string;
  activeTab: AdminSidebarTab;
  isCollapsed: boolean;
  onTabClick: (tab: AdminSidebarTab) => void;
  onLogout: () => void;
}) {
  const firstName = useMemo(() => getFirstName(adminName), [adminName]);
  const greeting = useMemo(() => getTimeGreeting(), []);

  return (
    <div className="admin-sidebar__inner">
      <button
        className="admin-sidebar__brand"
        type="button"
        onClick={() => onTabClick("dashboard")}
        title="Admin dashboard"
      >
        <span className="admin-sidebar__brand-mark">D</span>

        {!isCollapsed && (
          <span className="admin-sidebar__brand-text">
            <strong>
              {greeting}, {firstName}
            </strong>
            <small>Welcome back</small>
          </span>
        )}
      </button>

      <div className="admin-sidebar__section">
        {!isCollapsed && (
          <span className="admin-sidebar__section-label">Admin</span>
        )}

        <nav className="admin-sidebar__nav" aria-label="Admin navigation">
          {mainTabs.map((item) => (
            <button
              key={item.tab}
              type="button"
              className={
                activeTab === item.tab
                  ? "admin-sidebar__link admin-sidebar__link--active"
                  : "admin-sidebar__link"
              }
              onClick={() => onTabClick(item.tab)}
              title={item.label}
            >
              <span className="admin-sidebar__link-icon">{item.icon}</span>

              {!isCollapsed && (
                <span className="admin-sidebar__link-label">{item.label}</span>
              )}
            </button>
          ))}

          <button
            className="admin-sidebar__logout"
            type="button"
            onClick={onLogout}
            title="Logout"
          >
            <span className="admin-sidebar__link-icon">
              <FiLogOut />
            </span>

            {!isCollapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>
    </div>
  );
}

{/*


// components/admin/sidebar/AdminSidebar.tsx

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiActivity,
  FiBarChart2,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiCpu,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiSettings,
  FiShield,
  FiUsers,
  FiX,
} from "react-icons/fi";


export type AdminSidebarTab =
  | "dashboard"
  | "calendar"
  | "listings"
  | "users"
  | "ai"
  | "agents"
  | "analytics"
  | "activity"
  | "settings";

type AdminSidebarProps = {
  adminId: string;
  adminName?: string;
  activeTab: AdminSidebarTab;
  onTabChange: (tab: AdminSidebarTab) => void;
  onLogout: () => void;
};

type AdminSidebarItem = {
  label: string;
  tab: AdminSidebarTab;
  icon: React.ReactNode;
};

const mainTabs: AdminSidebarItem[] = [
  { label: "Dashboard", tab: "dashboard", icon: <FiHome /> },
  { label: "Calendar", tab: "calendar", icon: <FiCalendar /> },
  { label: "Listings", tab: "listings", icon: <FiSearch /> },
  { label: "Users", tab: "users", icon: <FiUsers /> },
  { label: "AI / RAG", tab: "ai", icon: <FiCpu /> },
  { label: "Agents", tab: "agents", icon: <FiShield /> },
];

const systemTabs: AdminSidebarItem[] = [
  { label: "Analytics", tab: "analytics", icon: <FiBarChart2 /> },
  { label: "Activity", tab: "activity", icon: <FiActivity /> },
  { label: "Settings", tab: "settings", icon: <FiSettings /> },
];

export default function AdminSidebar({
  adminId,
  adminName = "Admin",
  activeTab,
  onTabChange,
  onLogout,
}: AdminSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const closeMobileMenu = () => setIsMobileOpen(false);

  const handleTabClick = (tab: AdminSidebarTab) => {
    onTabChange(tab);
    closeMobileMenu();
  };

  useEffect(() => {
    document.body.classList.toggle("admin-sidebar-is-collapsed", isCollapsed);

    return () => {
      document.body.classList.remove("admin-sidebar-is-collapsed");
    };
  }, [isCollapsed]);

  return (
    <>
      <button
        className="admin-sidebar__mobile-toggle"
        type="button"
        aria-label="Open admin menu"
        onClick={() => setIsMobileOpen(true)}
      >
        <FiMenu />
      </button>

      <aside
        className={
          isCollapsed
            ? "admin-sidebar admin-sidebar--desktop admin-sidebar--collapsed"
            : "admin-sidebar admin-sidebar--desktop"
        }
      >
        <button
          className="admin-sidebar__collapse-btn"
          type="button"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setIsCollapsed((current) => !current)}
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>

        <AdminSidebarContent
          adminId={adminId}
          adminName={adminName}
          activeTab={activeTab}
          isCollapsed={isCollapsed}
          onTabClick={handleTabClick}
          onLogout={onLogout}
        />
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.button
              className="admin-sidebar__backdrop"
              type="button"
              aria-label="Close admin menu"
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="admin-sidebar admin-sidebar--mobile"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <button
                className="admin-sidebar__close"
                type="button"
                aria-label="Close admin menu"
                onClick={() => setIsMobileOpen(false)}
              >
                <FiX />
              </button>

              <AdminSidebarContent
                adminId={adminId}
                adminName={adminName}
                activeTab={activeTab}
                isCollapsed={false}
                onTabClick={handleTabClick}
                onLogout={onLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function AdminSidebarContent({
  adminId,
  adminName,
  activeTab,
  isCollapsed,
  onTabClick,
  onLogout,
}: {
  adminId: string;
  adminName: string;
  activeTab: AdminSidebarTab;
  isCollapsed: boolean;
  onTabClick: (tab: AdminSidebarTab) => void;
  onLogout: () => void;
}) {
  return (
    <div className="admin-sidebar__inner">
      <button
        className="admin-sidebar__brand"
        type="button"
        onClick={() => onTabClick("dashboard")}
        title="Dakota Realty AI Admin"
      >
        <span className="admin-sidebar__brand-mark">D</span>

        {!isCollapsed && (
          <span className="admin-sidebar__brand-text">
            <strong>Dakota</strong>
            <small>Admin Portal</small>
          </span>
        )}
      </button>

      {!isCollapsed && (
        <div className="admin-sidebar__profile">
          <span>Signed in as</span>
          <strong>{adminName}</strong>
          <small>{adminId.slice(0, 8)}...</small>
        </div>
      )}

      <div className="admin-sidebar__section">
        {!isCollapsed && (
          <span className="admin-sidebar__section-label">Admin</span>
        )}

        <nav className="admin-sidebar__nav" aria-label="Admin navigation">
          {mainTabs.map((item) => (
            <button
              key={item.tab}
              type="button"
              className={
                activeTab === item.tab
                  ? "admin-sidebar__link admin-sidebar__link--active"
                  : "admin-sidebar__link"
              }
              onClick={() => onTabClick(item.tab)}
              title={item.label}
            >
              <span className="admin-sidebar__link-icon">{item.icon}</span>

              {!isCollapsed && (
                <span className="admin-sidebar__link-label">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="admin-sidebar__section">
        {!isCollapsed && (
          <span className="admin-sidebar__section-label">System</span>
        )}

        <nav className="admin-sidebar__nav" aria-label="Admin system navigation">
          {systemTabs.map((item) => (
            <button
              key={item.tab}
              type="button"
              className={
                activeTab === item.tab
                  ? "admin-sidebar__link admin-sidebar__link--active"
                  : "admin-sidebar__link"
              }
              onClick={() => onTabClick(item.tab)}
              title={item.label}
            >
              <span className="admin-sidebar__link-icon">{item.icon}</span>

              {!isCollapsed && (
                <span className="admin-sidebar__link-label">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="admin-sidebar__footer">
        <button
          className="admin-sidebar__logout"
          type="button"
          onClick={onLogout}
          title="Logout"
        >
          <span className="admin-sidebar__link-icon">
            <FiLogOut />
          </span>

          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

*/}