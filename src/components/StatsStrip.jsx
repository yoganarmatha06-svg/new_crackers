import React, { useState, useEffect, useRef } from 'react';
import '../styles/StatsStrip.css';

const statsData = [
  { id: 'heritage', target: 30, suffix: '+', label: 'Years Sivakasi Heritage', duration: 1600 },
  { id: 'varieties', target: 100, suffix: '+', label: 'Green Cracker Varieties', duration: 1800 },
  { id: 'families', target: 50, suffix: 'K+', label: 'Delighted Indian Families', duration: 1900 },
  { id: 'savings', target: 70, suffix: '%', label: 'Factory Direct Savings', duration: 1700 }
];

const CountUpNumber = ({ target, suffix, duration = 1800, shouldAnimate, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(0);
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    let startTime = null;
    let animId = null;
    let timeoutId = null;

    timeoutId = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth easeOutCubic curve (fast start, silky-smooth deceleration)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);

        setCount(current);

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      animId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [shouldAnimate, target, duration, delay]);

  return (
    <span className="stat-num">
      {count}{suffix}
    </span>
  );
};

const StatsStrip = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Re-arm when scrolled well out of view so scrolling back counts up again smoothly
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
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
      className={`stats-strip ${isVisible ? 'is-visible' : ''}`}
      aria-label="Key Statistics"
    >
      <div className="container stats-container">
        {statsData.map((stat, index) => (
          <div
            key={stat.id}
            className="stat-card"
            style={{
              '--stagger-delay': `${index * 0.12}s`,
              '--shine-delay': `${index * 0.9}s`
            }}
          >
            <div className="stat-num-wrapper">
              {/* Tiny floating golden sparkle particles */}
              <svg
                className="stat-sparkle-svg sparkle-top-left"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0L14 9.5L24 12L14 14.5L12 24L10 14.5L0 12L10 9.5z" />
              </svg>

              <svg
                className="stat-sparkle-svg sparkle-top-right"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0L14 9.5L24 12L14 14.5L12 24L10 14.5L0 12L10 9.5z" />
              </svg>

              <span className="stat-particle particle-orb-bottom" aria-hidden="true" />

              {/* Number with smooth Count-up + subtle Neon Glow Pulse + Golden Shine Sweep */}
              <CountUpNumber
                target={stat.target}
                suffix={stat.suffix}
                duration={stat.duration}
                shouldAnimate={isVisible}
                delay={index * 0.12}
              />
            </div>

            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;
