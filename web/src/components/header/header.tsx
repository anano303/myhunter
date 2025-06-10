"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/modules/auth/hooks/use-user";
import { X } from "lucide-react";
// import { useLanguage } from "@/hooks/LanguageContext";
import "./header.css";

export default function Header() {
  const { user } = useUser();
  // const { t, language, changeLanguage } = useLanguage();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <>
      <header className="main-header">
        <div className="header-container">
          <div className="logo-container">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="SSBB Market"
                width={80}
                height={40}
                className="logo-image"
              />
            </Link>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="ძიება..."
              className="search-input"
            />
          </div>

          <div className="menu-button" onClick={toggleNavbar}>
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isNavbarOpen && (
        <div className="mobile-navbar">
          <div className="mobile-navbar-header">
            <div className="close-button" onClick={closeNavbar}>
              <X size={24} />
            </div>
            <div className="auth-status">
              {user ? `თავა` : "თავა"}
              <div className="user-avatar">
                <Image
                  src={user?.avatar || "/default-avatar.png"}
                  alt="User"
                  width={30}
                  height={30}
                  className="avatar-image"
                />
              </div>
            </div>
          </div>

          <nav className="mobile-nav-links">
            <Link href="/products" className="nav-item" onClick={closeNavbar}>
              <span className="nav-icon">🔫</span>
              <span className="nav-text">ნადირობა</span>
            </Link>
            <Link href="/fishing" className="nav-item" onClick={closeNavbar}>
              <span className="nav-icon">🎣</span>
              <span className="nav-text">თევზაობა</span>
            </Link>
            <Link href="/camping" className="nav-item" onClick={closeNavbar}>
              <span className="nav-icon">⛺</span>
              <span className="nav-text">ქემპინგი</span>
            </Link>
            <Link href="/cart" className="nav-item" onClick={closeNavbar}>
              <span className="nav-icon">🛒</span>
              <span className="nav-text">კალათა</span>
            </Link>
            <Link href="/contact" className="nav-item" onClick={closeNavbar}>
              <span className="nav-icon">🎯</span>
              <span className="nav-text">ჩვენს შესახებ & საკონტაქტო</span>
            </Link>
          </nav>

          <div className="auth-buttons">
            {user ? (
              <Link
                href="/profile"
                className="auth-button register-button"
                onClick={closeNavbar}
              >
                პროფილი
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="auth-button register-button"
                  onClick={closeNavbar}
                >
                  რეგისტრაცია
                </Link>
                <Link
                  href="/login"
                  className="auth-button login-button"
                  onClick={closeNavbar}
                >
                  ავტორიზაცია
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
