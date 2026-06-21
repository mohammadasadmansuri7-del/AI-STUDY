import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineAcademicCap, HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/generate", label: "Generate Notes" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      id="main-navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(10, 14, 26, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 70,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
            }}
          >
            <HiOutlineAcademicCap size={22} color="white" />
          </div>
          <span
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              letterSpacing: "-0.025em",
            }}
          >
            <span className="gradient-text">Study</span>
            <span style={{ color: "#e2e8f0" }}>Notes AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          className="desktop-nav"
        >
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: "8px 20px",
                borderRadius: 10,
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.3s",
                background: isActive(link.path)
                  ? "rgba(99, 102, 241, 0.15)"
                  : "transparent",
                color: isActive(link.path) ? "#a5b4fc" : "#94a3b8",
                border: isActive(link.path)
                  ? "1px solid rgba(99, 102, 241, 0.3)"
                  : "1px solid transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            padding: 8,
          }}
          className="mobile-menu-btn"
        >
          {mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid rgba(99, 102, 241, 0.1)",
            background: "rgba(10, 14, 26, 0.95)",
          }}
          className="mobile-nav"
        >
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "12px 16px",
                borderRadius: 10,
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                marginBottom: 4,
                background: isActive(link.path)
                  ? "rgba(99, 102, 241, 0.15)"
                  : "transparent",
                color: isActive(link.path) ? "#a5b4fc" : "#94a3b8",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
