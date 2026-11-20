import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Target,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Truck,
  Heart,
  FileCheck2,
  ChevronRight
} from 'lucide-react';
import { GoldStripeRibbon, GoldStripeDivider } from '../components/GoldStripe';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* 1. Page Header Banner */}
      <section className="about-hero">
        <div className="container about-hero-container">
          <span className="section-badge">
            <Sparkles size={14} /> SIVAKASI HERITAGE SINCE 1994
          </span>
          <h1 className="about-hero-title">Lighting Up Millions of Diwali Celebrations</h1>
          <p className="about-hero-subtitle">
            Welcome to New Crackers Sivakasi. For over 30 years, we have been crafting authentic, eco-friendly, and breathtaking fireworks that unite families and illuminate festival nights across India.
          </p>
        </div>
      </section>

      {/* Gold Stripe Ribbon */}
      <GoldStripeRibbon />

      {/* 2. Shop Introduction & Story */}
      <section className="section about-story-section">
        <div className="container story-grid">
          <div className="story-image-box gold-stripe-top">
            <img
              src="/images/about-heritage.svg"
              alt="New Crackers Factory Heritage Sivakasi"
              className="story-img"
            />
            <div className="story-badge">
              <Award size={20} className="badge-icon" />
              <div>
                <strong>30+ Years</strong>
                <span>Direct Manufacturing</span>
              </div>
            </div>
          </div>

          <div className="story-content">
            <span className="section-badge">
              <Flame size={14} /> OUR STORY
            </span>
            <h2 className="story-title">From Sivakasi's Heart to Every Indian Home</h2>
            <p>
              Founded in 1994 in the fireworks capital of India — <strong>Sivakasi, Tamil Nadu</strong> — New Crackers began with a simple passion: to manufacture the highest quality, most reliable, and safest festival crackers at fair, direct-from-factory prices.
            </p>
            <p>
              Over the last three decades, we have grown from a modest family artisan workshop into one of Tamil Nadu's most respected fireworks manufacturers. Today, we supply directly to retail families, housing communities, and festival organizers across 20+ states in India without intermediate dealer margins.
            </p>
            <p>
              Every sparkler, every flower pot, and every aerial shot is crafted under strict quality monitoring, ensuring pristine colors, dependable ignition, and zero hazardous misfires.
            </p>

            <div className="story-metrics">
              <div className="metric-box">
                <span className="metric-val">100%</span>
                <span className="metric-desc">Sivakasi Made</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">50,000+</span>
                <span className="metric-desc">Happy Families</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">100+</span>
                <span className="metric-desc">Product Models</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Stripe Divider */}
      <GoldStripeDivider label="OUR MISSION &amp; VISION" />

      {/* 3. Mission & Vision */}
      <section className="section mission-vision-section">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card mission-card gold-stripe-top">
              <div className="mv-icon-circle">
                <Target size={32} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To bring festive joy and authentic celebration to every home by delivering premium, eco-friendly green crackers directly from Sivakasi factory at transparent wholesale prices, while upholding the highest standards of safety, ethics, and customer happiness.
              </p>
              <ul className="mv-list">
                <li><CheckCircle2 size={16} /> 100% CSIR-NEERI green formulation compliance</li>
                <li><CheckCircle2 size={16} /> Zero child labour &amp; certified ethical manufacturing</li>
                <li><CheckCircle2 size={16} /> Reliable nationwide express delivery before Diwali</li>
              </ul>
            </div>

            <div className="mv-card vision-card gold-stripe-top">
              <div className="mv-icon-circle">
                <Eye size={32} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be India's most trusted, sustainable, and technology-driven fireworks brand, pioneering low-smoke chemical formulations and making direct-to-consumer festival shopping seamless, joyful, and affordable for generations to come.
              </p>
              <ul className="mv-list">
                <li><CheckCircle2 size={16} /> Continuing innovation in low-decibel, high-visual displays</li>
                <li><CheckCircle2 size={16} /> 100% biodegradable and recyclable packaging by 2028</li>
                <li><CheckCircle2 size={16} /> Empowering local Sivakasi artisan families and communities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Stripe Divider */}
      <GoldStripeDivider label="THE SIVAKASI ADVANTAGE" />

      {/* 4. Why Choose Our Shop */}
      <section className="section about-why-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <Heart size={14} /> THE SIVAKASI ADVANTAGE
            </span>
            <h2 className="section-title">Why Choose Our Shop?</h2>
            <p className="section-subtitle">
              We stand apart from regular seasonal street vendors by offering authentic factory direct crackers backed by quality guarantees.
            </p>
          </div>

          <div className="about-why-grid">
            <div className="about-why-item gold-stripe-top">
              <div className="why-num">01</div>
              <h4>Direct Wholesale Factory Rates</h4>
              <p>Skip multiple middlemen and save up to 70% compared to local retail shops in metro cities.</p>
            </div>

            <div className="about-why-item gold-stripe-top">
              <div className="why-num">02</div>
              <h4>Fresh Seasonal Stock</h4>
              <p>All crackers are manufactured in current seasonal batches, guaranteeing dry powder and instant lighting.</p>
            </div>

            <div className="about-why-item gold-stripe-top">
              <div className="why-num">03</div>
              <h4>Strict Fireproof Packing</h4>
              <p>Water-resistant bubble liners, corner guards, and rigid 7-ply corrugated cartons prevent transit damage.</p>
            </div>

            <div className="about-why-item gold-stripe-top">
              <div className="why-num">04</div>
              <h4>Dedicated Customer Care</h4>
              <p>Direct WhatsApp and phone updates for order booking, payment receipts, and transport tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Stripe Divider */}
      <GoldStripeDivider label="CERTIFIED SAFETY &amp; GREEN NORMS" />

      {/* 5. Quality & Safety Information */}
      <section id="safety" className="section quality-safety-section">
        <div className="container">
          <div className="safety-grid">
            <div className="safety-info-content">
              <span className="section-badge green-badge">
                <ShieldCheck size={14} /> GREEN CRACKER CERTIFIED
              </span>
              <h2 className="safety-title">Quality &amp; Safety Standards</h2>
              <p>
                At New Crackers, safety is our core ethos. All our crackers are produced under license approved by the Petroleum and Explosives Safety Organisation (PESO) and adhere to CSIR-NEERI green cracker formulation directives.
              </p>

              <div className="safety-check-list">
                <div className="safety-check-item">
                  <FileCheck2 size={22} className="check-icon" />
                  <div>
                    <h5>CSIR-NEERI Certified Formulations</h5>
                    <p>Free from harmful barium nitrate and heavy metals; produces 30% less particulate matter (PM2.5) emission.</p>
                  </div>
                </div>

                <div className="safety-check-item">
                  <FileCheck2 size={22} className="check-icon" />
                  <div>
                    <h5>Timed Fuse Delay Verification</h5>
                    <p>Every fuse is tested for an exact 4 to 6-second burn delay to allow users safe retreat distance.</p>
                  </div>
                </div>

                <div className="safety-check-item">
                  <FileCheck2 size={22} className="check-icon" />
                  <div>
                    <h5>Controlled Permissible Decibels</h5>
                    <p>Garlands and aerial bombs strictly adhere to the 125 dB limit for sound safety and pet comfort.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="safety-visual-box gold-stripe-top">
              <img
                src="/images/about-safety.svg"
                alt="Green Cracker Certification"
                className="safety-cert-img"
              />
            </div>
          </div>

          {/* Dos & Don'ts Grid */}
          <div className="dos-donts-container">
            <div className="dos-card gold-stripe-top">
              <h3 className="dos-title">
                <CheckCircle2 size={20} className="icon-green" /> Safety DO's
              </h3>
              <ul className="safety-bullets">
                <li>Buy only genuine certified green crackers from authorized manufacturers.</li>
                <li>Always ignite crackers in open outdoor grounds away from trees or buildings.</li>
                <li>Keep two buckets of water and a bucket of dry sand ready nearby.</li>
                <li>Light crackers at arm's length using an agarbatti (incense stick) or sparkler.</li>
                <li>Wear fitted cotton clothes and protective eye gear.</li>
                <li>Immerse used sparkler wires in water immediately after burn.</li>
              </ul>
            </div>

            <div className="donts-card gold-stripe-top">
              <h3 className="donts-title">
                <AlertTriangle size={20} className="icon-red" /> Safety DON'Ts
              </h3>
              <ul className="safety-bullets">
                <li>Never light crackers indoors, in balconies, or near parking lots with vehicles.</li>
                <li>Never lean directly over a cracker while lighting its fuse.</li>
                <li>Never attempt to re-ignite a cracker that did not explode immediately.</li>
                <li>Never wear loose, flowing silk, synthetic or nylon clothing while bursting.</li>
                <li>Never hold rockets, bombs, or flower pots in your hand while lighting.</li>
                <li>Never leave young children unattended with fireworks.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Stripe Ribbon */}
      <GoldStripeRibbon />

      {/* 6. Bottom Banner CTA */}
      <section className="about-cta-section">
        <div className="container about-cta-card gold-stripe-top">
          <h2>Ready to Celebrate a Joyful Diwali?</h2>
          <p>Explore our complete 2026 festive collection with direct Sivakasi factory discounts.</p>
          <div className="cta-btns">
            <Link to="/quick-shopping" className="btn btn-primary">
              Shop Fireworks Now
            </Link>
            <Link to="/price-list" className="btn btn-gold">
              View Wholesale Price List
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
