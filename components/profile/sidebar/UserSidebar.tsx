// components/profile/sidebar/UserSidebar.tsx

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
  FiX,
} from "react-icons/fi";

export type UserSidebarTab =
  | "dashboard"
  | "calendar"
  | "listings"
  | "ai"
  | "agents";

type UserSidebarProps = {
  userId: string;
  userName?: string | null;
  activeTab: UserSidebarTab;
  onTabChange: (tab: UserSidebarTab) => void;
  onLogout: () => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
};

type UserSidebarItem = {
  label: string;
  tab: UserSidebarTab;
  icon: React.ReactNode;
};

const mainTabs: UserSidebarItem[] = [
  { label: "Dashboard", tab: "dashboard", icon: <FiHome /> },
  { label: "Calendar", tab: "calendar", icon: <FiCalendar /> },
  { label: "Listings", tab: "listings", icon: <FiSearch /> },
  { label: "AI / RAG", tab: "ai", icon: <FiCpu /> },
  { label: "Agents", tab: "agents", icon: <FiShield /> },
];

function getFirstName(name?: string | null) {
  const cleanName = (name || "").trim();

  if (!cleanName) {
    return "there";
  }

  return cleanName.split(" ")[0];
}

function getTimeGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function UserSidebar({
  userId,
  userName,
  activeTab,
  onTabChange,
  onLogout,
  onCollapseChange,
}: UserSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const closeMobileMenu = () => setIsMobileOpen(false);

  const handleTabClick = (tab: UserSidebarTab) => {
    onTabChange(tab);
    closeMobileMenu();
  };

  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  return (
    <>
      <button
        className="user-sidebar__mobile-toggle"
        type="button"
        aria-label="Open profile menu"
        onClick={() => setIsMobileOpen(true)}
      >
        <FiMenu />
      </button>

      <aside
        className={
          isCollapsed
            ? "user-sidebar user-sidebar--desktop user-sidebar--collapsed"
            : "user-sidebar user-sidebar--desktop"
        }
      >
        <button
          className="user-sidebar__collapse-btn"
          type="button"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setIsCollapsed((current) => !current)}
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>

        <UserSidebarContent
          userName={userName}
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
              className="user-sidebar__backdrop"
              type="button"
              aria-label="Close profile menu"
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="user-sidebar user-sidebar--mobile"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <button
                className="user-sidebar__close"
                type="button"
                aria-label="Close profile menu"
                onClick={() => setIsMobileOpen(false)}
              >
                <FiX />
              </button>

              <UserSidebarContent
                userName={userName}
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

function UserSidebarContent({
  userName,
  activeTab,
  isCollapsed,
  onTabClick,
  onLogout,
}: {
  userName?: string | null;
  activeTab: UserSidebarTab;
  isCollapsed: boolean;
  onTabClick: (tab: UserSidebarTab) => void;
  onLogout: () => void;
}) {
  const firstName = useMemo(() => getFirstName(userName), [userName]);
  const greeting = useMemo(() => getTimeGreeting(), []);

  return (
    <div className="user-sidebar__inner">
      <button
        className="user-sidebar__brand"
        type="button"
        onClick={() => onTabClick("dashboard")}
        title="User dashboard"
      >
        <span className="user-sidebar__brand-mark">D</span>

        {!isCollapsed && (
          <span className="user-sidebar__brand-text">
            <strong>
              {greeting}, {firstName}
            </strong>
            <small>Welcome back</small>
          </span>
        )}
      </button>

      <div className="user-sidebar__section">
        {!isCollapsed && (
          <span className="user-sidebar__section-label">Profile</span>
        )}

        <nav className="user-sidebar__nav" aria-label="Profile navigation">
          {mainTabs.map((item) => (
            <button
              key={item.tab}
              type="button"
              className={
                activeTab === item.tab
                  ? "user-sidebar__link user-sidebar__link--active"
                  : "user-sidebar__link"
              }
              onClick={() => onTabClick(item.tab)}
              title={item.label}
            >
              <span className="user-sidebar__link-icon">{item.icon}</span>

              {!isCollapsed && (
                <span className="user-sidebar__link-label">{item.label}</span>
              )}
            </button>
          ))}

          <button
            className="user-sidebar__logout"
            type="button"
            onClick={onLogout}
            title="Logout"
          >
            <span className="user-sidebar__link-icon">
              <FiLogOut />
            </span>

            {!isCollapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>
    </div>
  );
}