import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Percent,
  ShoppingBag,
  HeartHandshake,
  Flame,
  ArrowRight,
  Check,
  X,
  CheckCircle2,
  XCircle,
  ShieldAlert
} from 'lucide-react';
import '../styles/About.css';

const specialFeatures = [
  {
    icon: Sparkles,
    title: 'Wide Variety',
    desc: 'Explore a large collection of crackers.'
  },
  {
    icon: ShieldCheck,
    title: 'Quality Products',
    desc: 'Products sourced from trusted manufacturers.'
  },
  {
    icon: Percent,
    title: 'Affordable Prices',
    desc: 'Enjoy great products at competitive prices.'
  },
  {
    icon: ShoppingBag,
    title: 'Easy Shopping',
    desc: 'Browse and order your favorite crackers online.'
  },
  {
    icon: HeartHandshake,
    title: 'Customer Support',
    desc: 'We care about your shopping experience.'
  }
];

const dosList = [
  {
    title: 'Instructions',
    desc: 'Display fireworks as per the instructions mentioned on the pack.'
  },
  {
    title: 'Outdoor',
    desc: 'Use fireworks only outdoor'
  },
  {
    title: 'Branded Fireworks',
    desc: 'Buy fireworks from authorized / reputed manufacturers only.'
  },
  {
    title: 'Water',
    desc: 'Keep two buckets of water handy. In the event of fire or any mishap.'
  }
];

const dontsList = [
  {
    title: "Don't make tricks",
    desc: 'Never make your own fireworks.'
  },
  {
    title: "Don't wear loose clothes",
    desc: 'Do not wear loose clothing while using fireworks.'
  },
  {
    title: "Don't Touch it",
    desc: 'After fireworks display never pick up fireworks they still be active.'
  },
  {
    title: "Don't place near candles",
    desc: "Don't store firecrackers near burning candles or lamps"
  }
];

const About = () => {
  return (
    <div className="about-page" id="safety">
      {/* 1. Welcome to Our Crackers Shop! (2-Column: Left Content, Right Image) */}
      <section className="section about-welcome-section">
        <div className="container">
          <div className="about-welcome-grid">
            {/* Left Side: Content */}
            <div className="about-welcome-content">
              <div className="welcome-tag">
                <Flame size={16} /> ABOUT US
              </div>
              <h1 className="about-welcome-heading">Welcome to Our Crackers Shop!</h1>
              <p className="about-welcome-lead">
                Welcome to our Crackers Shop, your one-stop destination for making every celebration brighter and more joyful!
              </p>
              <p className="about-welcome-body">
                We offer a wide collection of quality crackers at affordable prices to make your festivals and special occasions memorable. From sparkling sparklers and colorful flower pots to rockets, ground chakkars, and aerial fireworks, we have something for every celebration.
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="about-welcome-image-col">
              <div className="about-image-wrapper">
                <img
                  src="/images/about-crackers.jpg"
                  alt="Colorful Festive Diwali Crackers and Fireworks"
                  className="about-welcome-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What Makes Us Special? */}
      <section className="section about-special-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <Sparkles size={14} /> OUR ADVANTAGES
            </span>
            <h2 className="section-title special-section-title">What Makes Us Special?</h2>
            <p className="section-subtitle">
              Everything you need for a sparkling celebration with complete peace of mind.
            </p>
          </div>

          <div className="special-grid">
            {specialFeatures.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div key={index} className="special-card">
                  <div className="special-icon-box">
                    <Icon size={26} />
                  </div>
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Fireworks Safety – Do's & Don'ts */}
      <section className="section about-safety-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge safety-badge">
              <ShieldAlert size={14} /> FIREWORKS SAFETY
            </span>
            <h2 className="section-title safety-section-title">Celebrate Safely!</h2>
            <p className="section-subtitle">
              Follow these safety tips for a happy and safe celebration.
            </p>
          </div>

          {/* Two-Column Grid: Do's & Don'ts */}
          <div className="safety-columns-grid">
            {/* Left Column: DO's */}
            <div className="safety-card dos-card">
              <div className="safety-card-header dos-header">
                <div className="safety-header-icon dos-icon-box">
                  <CheckCircle2 size={24} />
                </div>
                <h3>Do's</h3>
              </div>

              <div className="safety-items-list">
                {dosList.map((item, index) => (
                  <div key={index} className="safety-item">
                    <div className="safety-icon-wrapper check-wrapper">
                      <Check size={20} className="safety-icon-check" />
                    </div>
                    <div className="safety-item-text">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: DONT's */}
            <div className="safety-card donts-card">
              <div className="safety-card-header donts-header">
                <div className="safety-header-icon donts-icon-box">
                  <XCircle size={24} />
                </div>
                <h3>Dont's</h3>
              </div>

              <div className="safety-items-list">
                {dontsList.map((item, index) => (
                  <div key={index} className="safety-item">
                    <div className="safety-icon-wrapper cross-wrapper">
                      <X size={20} className="safety-icon-cross" />
                    </div>
                    <div className="safety-item-text">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Safety Message */}
          <div className="safety-bottom-banner">
            <div className="safety-priority-pill">
              <ShieldAlert size={18} className="priority-shield-icon" />
              <span>Your Safety, Our Priority!</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Celebrate with Happiness! */}
      <section className="section about-celebrate-section">
        <div className="container">
          <div className="about-celebrate-card">
            <h2 className="celebrate-heading">Celebrate with Happiness!</h2>
            <p className="celebrate-desc">
              Whether it's Diwali, a family celebration, a wedding, or any special occasion, make every moment more exciting with our crackers collection.
            </p>
            <div className="celebrate-tagline-pill">
              <Sparkles size={18} className="pill-sparkle-icon" />
              <span>Light Up Your Celebrations, Spread Happiness!</span>
            </div>
            <div className="cta-btns">
              <Link to="/quick-shopping" className="btn btn-primary">
                Shop Crackers Now <ArrowRight size={16} />
              </Link>
              <Link to="/price-list" className="btn btn-gold">
                View Price List
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
