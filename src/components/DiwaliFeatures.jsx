import React, { useState, useEffect, useRef } from 'react';
import { Award, Sparkles } from 'lucide-react';
import '../styles/DiwaliFeatures.css';

const DiwaliFeatures = () => {
  const gridRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const checkVisibility = () => {
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Triggers precisely when the user scrolls to this place:
      // When the top of the crackers grid enters into comfortable view (76% of screen height)
      // and is still on screen (bottom > 14% of screen height)
      const inView = rect.top < windowHeight * 0.76 && rect.bottom > windowHeight * 0.14;

      if (inView) {
        setHasAnimated(true);
      } else if (rect.top > windowHeight * 0.96 || rect.bottom < windowHeight * 0.04) {
        // Reset when user scrolls away from this place, so scrolling back re-animates every time
        setHasAnimated(false);
      }
    };

    // Check immediately on mount and on scroll / resize
    checkVisibility();

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <section
      className={`diwali-features-section ${hasAnimated ? 'is-animated' : ''}`}
      id="features"
      aria-label="Diwali Features and Why Choose Us"
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

        {/* 4 Features around Center Diwali Artwork */}
        <div ref={gridRef} className={`diwali-features-grid ${hasAnimated ? 'is-animated' : ''}`}>
          {/* Left Column: Top Left (Quality) & Bottom Left (Safe to Use) */}
          <div className="features-col features-col-left">
            {/* Top Left: Quality */}
            <div className="feature-block feature-top-left">
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

            {/* Bottom Left: Safe to Use */}
            <div className="feature-block feature-bottom-left">
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
          </div>

          {/* Center Column: Prominent Diwali Crackers Showcase */}
          <div className="features-col features-col-center">
            <div className="diwali-center-art-wrap">
              <img
                src="/images/crackers-center-transparent.png?v=2"
                alt="Sivakasi Diwali Crackers and Fireworks Showcase"
                className="diwali-center-img"
              />
            </div>
          </div>

          {/* Right Column: Top Right (Genuine Price) & Bottom Right (Customer Satisfaction) */}
          <div className="features-col features-col-right">
            {/* Top Right: Genuine Price */}
            <div className="feature-block feature-top-right">
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

            {/* Bottom Right: Customer Satisfaction */}
            <div className="feature-block feature-bottom-right">
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
      </div>
    </section>
  );
};

export default DiwaliFeatures;
