"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiSearch,
  FiUsers,
  FiInfo,
  FiLogIn,
  FiMenu,
  FiX,
  FiHeart,
  FiCalendar,
  FiMessageCircle,
  FiShield,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

type SidebarLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const mainLinks: SidebarLink[] = [
  { label: "Home", href: "/", icon: <FiHome /> },
  { label: "Listings", href: "/listings", icon: <FiSearch /> },
  { label: "Agents", href: "/agents", icon: <FiUsers /> },
  { label: "Saved Homes", href: "/saved", icon: <FiHeart /> },
  { label: "Showings", href: "/showings", icon: <FiCalendar /> },
  { label: "AI Assistant", href: "/assistant", icon: <FiMessageCircle /> },
  { label: "About", href: "/about", icon: <FiInfo /> },
];

const accountLinks: SidebarLink[] = [
  { label: "Login", href: "/login", icon: <FiLogIn /> },
  { label: "Agent Portal", href: "/agent/login", icon: <FiShield /> },
];

export default function HomeSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      <button
        className="home-sidebar__mobile-toggle"
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setIsMobileOpen(true)}
      >
        <FiMenu />
      </button>

      <aside
        className={
          isCollapsed
            ? "home-sidebar home-sidebar--desktop home-sidebar--collapsed"
            : "home-sidebar home-sidebar--desktop"
        }
      >
        <button
          className="home-sidebar__collapse-btn"
          type="button"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setIsCollapsed((current) => !current)}
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>

        <SidebarContent
          onLinkClick={closeMobileMenu}
          isCollapsed={isCollapsed}
        />
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.button
              className="home-sidebar__backdrop"
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="home-sidebar home-sidebar--mobile"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <button
                className="home-sidebar__close"
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsMobileOpen(false)}
              >
                <FiX />
              </button>

              <SidebarContent
                onLinkClick={closeMobileMenu}
                isCollapsed={false}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({
  onLinkClick,
  isCollapsed,
}: {
  onLinkClick: () => void;
  isCollapsed: boolean;
}) {
  return (
    <div className="home-sidebar__inner">
      <Link
        href="/"
        className="home-sidebar__brand"
        onClick={onLinkClick}
        title="Dakota Realty AI"
      >
        <span className="home-sidebar__brand-mark">D</span>

        {!isCollapsed && (
          <span className="home-sidebar__brand-text">
            <strong>Dakota</strong>
            <small>Realty AI</small>
          </span>
        )}
      </Link>

      <div className="home-sidebar__section">
        {!isCollapsed && (
          <span className="home-sidebar__section-label">Explore</span>
        )}

        <nav className="home-sidebar__nav" aria-label="Main navigation">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="home-sidebar__link"
              onClick={onLinkClick}
              title={link.label}
            >
              <span className="home-sidebar__link-icon">{link.icon}</span>

              {!isCollapsed && (
                <span className="home-sidebar__link-label">{link.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="home-sidebar__section">
        {!isCollapsed && (
          <span className="home-sidebar__section-label">Account</span>
        )}

        <nav className="home-sidebar__nav" aria-label="Account navigation">
          {accountLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="home-sidebar__link"
              onClick={onLinkClick}
              title={link.label}
            >
              <span className="home-sidebar__link-icon">{link.icon}</span>

              {!isCollapsed && (
                <span className="home-sidebar__link-label">{link.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {!isCollapsed && (
        <div className="home-sidebar__ai-card">
          <div className="home-sidebar__ai-icon">
            <FiMessageCircle />
          </div>

          <div>
            <strong>Ask before you tour.</strong>
            <p>
              Compare homes, understand listing details, and narrow your search
              with AI.
            </p>
          </div>

          <Link href="/assistant" onClick={onLinkClick}>
            Open assistant
          </Link>
        </div>
      )}
    </div>
  );
}