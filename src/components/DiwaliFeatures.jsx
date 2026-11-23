import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import '../styles/DiwaliFeatures.css';

const DiwaliFeatures = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    // Use IntersectionObserver to detect when the 4-features grid enters the viewport
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsAnimated(true);
            } else {
              // When user scrolls away from this section, reset so that scrolling back re-animates from the 4 sides!
              setIsAnimated(false);
            }
          });
        },
        {
          threshold: 0.15, // Triggers as soon as the grid enters comfortably into view
          rootMargin: '0px 0px -20px 0px'
        }
      );

      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    } else {
      // Fallback for older browsers
      const handleScroll = () => {
        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < vh * 0.85 && rect.bottom > vh * 0.15) {
          setIsAnimated(true);
        } else if (rect.top > vh || rect.bottom < 0) {
          setIsAnimated(false);
        }
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`diwali-features-section ${isAnimated ? 'is-animated' : ''}`}
      id="features"
      aria-label="Why Choose New Crackers Sivakasi"
    >
      <div className="container">
        {/* Section Header */}
        <div className="diwali-features-header">
          <span className="section-badge">
            <Sparkles size={14} /> THE SIVAKASI PROMISE
          </span>
          <h2 className="section-title">Why Choose New Crackers?</h2>
          <p className="section-subtitle">
            When you celebrate Diwali with your loved ones, you deserve genuine quality, tested safety, and honest factory pricing.
          </p>
        </div>

        {/* 4 Features around Center Fireworks Artwork */}
        <div
          ref={gridRef}
          className={`diwali-features-grid ${isAnimated ? 'is-animated' : ''}`}
        >
          {/* 1. Top-Left: Quality (Flies in from Top-Left) */}
          <div className="feature-block feature-quality">
            <div className="feature-icon-wrap">
              <img
                src="/images/icon-quality.png"
                alt="Quality Badge Icon"
                className="feature-icon-img"
                loading="lazy"
              />
            </div>
            <h3 className="feature-title">Quality</h3>
            <p className="feature-desc">
              Quality &amp; innovation are the key behind our success
            </p>
          </div>

          {/* 2. Bottom-Left: Safe to Use (Flies in from Bottom-Left) */}
          <div className="feature-block feature-safe">
            <div className="feature-icon-wrap">
              <img
                src="/images/icon-safe.png"
                alt="Safe to Use Shield Icon"
                className="feature-icon-img"
                loading="lazy"
              />
            </div>
            <h3 className="feature-title">Safe to Use</h3>
            <p className="feature-desc">
              Crackers we offer are safe &amp; are made from fine quality raw materials
            </p>
          </div>

          {/* Center Fireworks Showcase (Zooms in from center) */}
          <div className="feature-center-art">
            <div className="diwali-center-art-wrap">
              <img
                src="/images/crackers-center-transparent.png?v=2"
                alt="Sivakasi Diwali Crackers and Fireworks Showcase"
                className="diwali-center-img"
              />
            </div>
          </div>

          {/* 3. Top-Right: Genuine Price (Flies in from Top-Right) */}
          <div className="feature-block feature-price">
            <div className="feature-icon-wrap">
              <img
                src="/images/icon-price.png"
                alt="Genuine Price Tag Icon"
                className="feature-icon-img"
                loading="lazy"
              />
            </div>
            <h3 className="feature-title">Genuine Price</h3>
            <p className="feature-desc">
              Quality products at economic price is the main motto for us
            </p>
          </div>

          {/* 4. Bottom-Right: Customer Satisfaction (Flies in from Bottom-Right) */}
          <div className="feature-block feature-satisfaction">
            <div className="feature-icon-wrap">
              <img
                src="/images/icon-customer.png"
                alt="Customer Satisfaction Icon"
                className="feature-icon-img"
                loading="lazy"
              />
            </div>
            <h3 className="feature-title">Customer Satisfaction</h3>
            <p className="feature-desc">
              Our quality and timely delivery has attracted customers easily
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiwaliFeatures;
