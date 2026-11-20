import React, { useRef, useState, useEffect } from 'react';
import '../styles/ScrollReveal.css';

const WelcomeSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    // Fallback if browser doesn't support IntersectionObserver
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // When scrolling back up to the top of the page,
            // reset so that scrolling down triggers the animation again
            if (entry.boundingClientRect.top > 0) {
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when ~20% of section is visible
        rootMargin: '0px'
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`welcome-intro-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Welcome to New Crackers Sivakasi"
    >
      <div className="container welcome-intro-container">
        {/* Left Side: New Crackers Logo */}
        <div className="welcome-badge-col">
          <img
            src="/images/new-crackers-badge.svg"
            alt="New Crackers Sivakasi Flame Badge Since 1994"
            className="welcome-flame-badge"
            width="260"
            height="270"
          />
        </div>

        {/* Right Side: Content Elements */}
        <div className="welcome-content-col">
          <h2 className="welcome-heading">
            <span className="welcome-pretitle">Welcome to</span>
            <span className="welcome-brand-name">NEW CRACKERS</span>
          </h2>
          <p className="welcome-description">
            New Crackers is one of the top leading Firework Crackers &amp; Fireworks Manufacturers, Wholesalers, Retailers, and Dealers for direct factory prices in Sivakasi, Tamil Nadu, India, successfully delivering the right products.
          </p>
          <div className="welcome-btn-wrapper">
            <a href="#categories" className="welcome-explore-btn">
              Explore Our Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
