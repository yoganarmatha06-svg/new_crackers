import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, Gift, Clock, ArrowRight } from 'lucide-react';
import bannerImg from '../assets/banner 1.png';
import '../styles/FestivalBanner.css';

const FestivalBanner = () => {
  return (
    <section className="festival-banner-section">
      <div className="container">
        <div className="festival-banner-card">
          {/* Panoramic Background Image */}
          <div className="banner-bg-wrapper">
            <img
              src={bannerImg}
              alt="New Crackers Premium Diwali Fireworks Banner"
              className="banner-full-img"
            />
            <div className="banner-gradient-overlay"></div>
          </div>

          <div className="banner-content">
            <div className="banner-tag">
              <Flame size={14} className="banner-flame" /> GRAND DIWALI DHAMAKA CELEBRATION
            </div>

            <h2 className="banner-heading">
              Flat <span className="highlight-text">70% OFF</span> Pre-Booking Sale!
            </h2>

            <p className="banner-subtext">
              Direct from Sivakasi factory. Authentic eco-friendly green crackers, dazzling sparklers, roaring sky shots, and festive hampers. Book early to secure guaranteed doorstep delivery!
            </p>

            <div className="banner-perks">
              <div className="perk-item">
                <Gift size={16} className="perk-icon" />
                <span>Free Gift Box on orders &gt; ₹3,000</span>
              </div>
              <div className="perk-item">
                <Clock size={16} className="perk-icon" />
                <span>Use Festival Coupon: <strong>DIWALI2026</strong></span>
              </div>
            </div>

            <div className="banner-buttons">
              <Link to="/quick-shopping" className="btn btn-gold banner-btn">
                Grab Festive Deals <ArrowRight size={18} />
              </Link>
              <Link to="/price-list" className="btn btn-primary banner-btn">
                View Price List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestivalBanner;
