// components/nav/Footer.tsx
"use client";

import Link from "next/link";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <FiFacebook />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: <FiYoutube />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <FiInstagram />,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: <FaTiktok />,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="simple-footer">
      <div className="app-container">
        <div className="simple-footer__bar">
          <Link href="/" className="simple-footer__brand">
            Dakota Realty AI
          </Link>

          <div className="simple-footer__socials">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>

          <p>© {year} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}