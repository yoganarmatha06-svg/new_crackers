import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import bannerImg from '../assets/banner 1.png';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <div className="navbar-bottom-banner-section no-print">
      <Link to="/quick-shopping" className="navbar-banner-link" title="Click to Shop All Crackers">
        <img
          src={bannerImg}
          alt="New Crackers - Premium Diwali Fireworks Sivakasi"
          className="navbar-banner-img"
        />
        <div className="banner-hover-tag">
          <Sparkles size={16} /> Click to Shop Now • Flat 70% Off
        </div>
      </Link>
    </div>
  );
};

export default Hero;
