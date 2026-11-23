import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  FileText,
  Search,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { cartCount, openCart, total } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Click outside listener to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        (!mobileSearchRef.current || !mobileSearchRef.current.contains(event.target))
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Matching products for live search preview
  const matchingProducts = searchQuery.trim().length > 0
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/quick-shopping?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleProductSelect = (productName) => {
    navigate(`/quick-shopping?search=${encodeURIComponent(productName)}`);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar - Seamless Infinite Marquee */}
      <div className="announcement-bar no-print" aria-label="Announcement marquee">
        <div className="announcement-marquee-wrapper">
          <div className="announcement-marquee-track">
            {/* Primary Track Content */}
            <div className="announcement-marquee-group">
              <span className="announcement-item">✨ Direct Sivakasi Wholesale Factory Prices</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">🌱 100% Certified Eco-Friendly Green Crackers</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">🚚 Express Delivery All Across India</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">
                <a href="tel:+919842112345" className="announcement-phone-link">
                  <Phone size={13} className="phone-icon" /> +91 98421 12345
                </a>
              </span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">✨ Direct Sivakasi Wholesale Factory Prices</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">🌱 100% Certified Eco-Friendly Green Crackers</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">🚚 Express Delivery All Across India</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">
                <a href="tel:+919842112345" className="announcement-phone-link">
                  <Phone size={13} className="phone-icon" /> +91 98421 12345
                </a>
              </span>
              <span className="announcement-sep">•</span>
            </div>

            {/* Seamless Infinite Clone */}
            <div className="announcement-marquee-group" aria-hidden="true">
              <span className="announcement-item">✨ Direct Sivakasi Wholesale Factory Prices</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">🌱 100% Certified Eco-Friendly Green Crackers</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">🚚 Express Delivery All Across India</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">
                <a href="tel:+919842112345" className="announcement-phone-link">
                  <Phone size={13} className="phone-icon" /> +91 98421 12345
                </a>
              </span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">✨ Direct Sivakasi Wholesale Factory Prices</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">🌱 100% Certified Eco-Friendly Green Crackers</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">🚚 Express Delivery All Across India</span>
              <span className="announcement-sep">•</span>
              <span className="announcement-item">
                <a href="tel:+919842112345" className="announcement-phone-link">
                  <Phone size={13} className="phone-icon" /> +91 98421 12345
                </a>
              </span>
              <span className="announcement-sep">•</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gold Stripe Ribbon under Announcement Bar */}
      <div className="gold-stripe-ribbon no-print"></div>

      {/* Main Sticky Navbar Header */}
      <header className={`navbar-header no-print ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* 1. Logo & Brand */}
          <Link to="/" className="navbar-brand">
            <div className="logo-wrapper">
              <img src="/images/logo.svg" alt="New Crackers Logo" className="brand-logo" />
              <span className="logo-pulse"></span>
            </div>
            <div className="brand-text">
              <span className="brand-name">
                NEW <span className="highlight">CRACKERS</span>
              </span>
              <span className="brand-tagline">SIVAKASI FIREWORKS DIRECT</span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links */}
          <nav className="navbar-nav">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
            <NavLink to="/quick-shopping" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Quick Shopping
              <span className="hot-pill">Hot</span>
            </NavLink>
            <NavLink to="/price-list" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <FileText size={15} /> Price List
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          {/* 3. Right Actions: Search Box + Cart Button + Mobile Toggle */}
          <div className="navbar-actions">
            {/* Desktop Search Bar */}
            <form
              className="navbar-search-form"
              onSubmit={handleSearchSubmit}
              ref={searchRef}
            >
              <div className="navbar-search-wrapper">
                <Search size={16} className="navbar-search-icon" />
                <input
                  type="text"
                  className="navbar-search-input"
                  placeholder="Search crackers..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  aria-label="Search crackers"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Live Search Suggestions Dropdown */}
              {isSearchOpen && searchQuery.trim().length > 0 && (
                <div className="search-results-popup">
                  {matchingProducts.length > 0 ? (
                    <>
                      {matchingProducts.map((p) => (
                        <div
                          key={p.id}
                          className="search-result-item"
                          onClick={() => handleProductSelect(p.name)}
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="search-result-thumb"
                            onError={(e) => {
                              e.target.src = '/images/logo.svg';
                            }}
                          />
                          <div className="search-result-details">
                            <span className="search-result-name">{p.name}</span>
                            <span className="search-result-category">{p.category}</span>
                            <div className="search-result-pricing">
                              <span className="search-result-offer">₹{p.offerPrice}</span>
                              <span className="search-result-orig">₹{p.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="search-view-all-btn"
                        onClick={handleSearchSubmit}
                      >
                        View all results for "{searchQuery}" →
                      </button>
                    </>
                  ) : (
                    <div style={{ padding: '16px', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                      No crackers found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* Cart Button */}
            <button
              type="button"
              className="navbar-cart-btn"
              onClick={openCart}
              title="View Shopping Cart"
              aria-label="View Shopping Cart"
            >
              <div className="cart-icon-box">
                <ShoppingBag size={17} />
                <span className="cart-badge-count">{cartCount}</span>
              </div>
              <div className="cart-text-box">
                <span className="cart-label">Cart</span>
                <span className="cart-amount">₹{total > 0 ? total.toFixed(2) : '0.00'}</span>
              </div>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-toggle-btn"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-inner">
            {/* Mobile Search Bar */}
            <form
              className="mobile-search-form"
              onSubmit={handleSearchSubmit}
              ref={mobileSearchRef}
            >
              <div className="navbar-search-wrapper">
                <Search size={16} className="navbar-search-icon" />
                <input
                  type="text"
                  className="navbar-search-input"
                  placeholder="Search crackers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search crackers"
                />
              </div>
            </form>

            <nav className="mobile-links">
              <NavLink
                to="/"
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </NavLink>
              <NavLink
                to="/quick-shopping"
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Quick Shopping
                <span className="mobile-hot-pill">Sale 70% Off</span>
              </NavLink>
              <NavLink
                to="/price-list"
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Price List (View &amp; Print)
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact &amp; Support
              </NavLink>
            </nav>

            <div className="mobile-action-box">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCart();
                }}
                className="btn btn-primary mobile-cart-btn"
              >
                <ShoppingBag size={18} /> View Cart ({cartCount} items • ₹{total.toFixed(2)})
              </button>

              <div className="mobile-contact-info">
                <p>📍 Sivakasi Main Road, Tamil Nadu</p>
                <p>📞 Phone: +91 98421 12345</p>
                <p>⏰ Open: 8:00 AM – 10:00 PM (All 7 Days)</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;