import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${showBackground ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Left Section - Logo and Links */}
        <div className="navbar-left">
          <div className="navbar-logo">
            <span className="logo-text">NETFLIX</span>
          </div>
          
          <div className="navbar-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#tv-shows" className="nav-link">TV Shows</a>
            <a href="#movies" className="nav-link">Movies</a>
            <a href="#new" className="nav-link">New & Popular</a>
            <a href="#mylist" className="nav-link">My List</a>
            <a href="#browse" className="nav-link">Browse by Language</a>
          </div>
        </div>

        {/* Right Section - User Menu */}
        <div className="navbar-right">
          <div className="navbar-search">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="navbar-profile">
            <div className="profile-icon">
              <img src="/images/profile.png" alt="Profile" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}