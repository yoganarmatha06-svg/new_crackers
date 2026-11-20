import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  Award,
  Sparkles,
  Heart
} from 'lucide-react';
import { GoldStripeRibbon } from './GoldStripe';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer no-print">
      {/* Gold Stripe Ribbon at top of footer */}
      <GoldStripeRibbon />

      {/* Top Value Propositions */}
      <div className="footer-features">
        <div className="container features-grid">
          <div className="feature-item">
            <div className="feature-icon-box">
              <Award className="feature-icon" size={24} />
            </div>
            <div className="feature-text">
              <h4>100% Genuine Sivakasi</h4>
              <p>Direct from Sivakasi factory manufacturing units</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <ShieldCheck className="feature-icon" size={24} />
            </div>
            <div className="feature-text">
              <h4>Green Cracker Certified</h4>
              <p>Approved by CSIR-NEERI for low emission &amp; safe lighting</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <Truck className="feature-icon" size={24} />
            </div>
            <div className="feature-text">
              <h4>Safe &amp; Express Transport</h4>
              <p>Specialized fireproof safety packaging delivered nationwide</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <Sparkles className="feature-icon" size={24} />
            </div>
            <div className="feature-text">
              <h4>Direct Factory Pricing</h4>
              <p>Save up to 70% with genuine wholesale prices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <img src="/images/logo.svg" alt="New Crackers" className="footer-logo" />
              <div className="footer-brand-title">
                <h3>NEW CRACKERS</h3>
                <span>SIVAKASI DIWALI FIREWORKS</span>
              </div>
            </div>
            <p className="footer-about">
              Lighting up smiles across India for more than three decades. We are Sivakasi's premier direct-to-customer fireworks distributor offering authentic, high-quality, eco-certified green crackers at unbeatable factory wholesale rates.
            </p>
            <div className="cert-badges">
              <span className="cert-pill">CSIR-NEERI Approved</span>
              <span className="cert-pill">PESO Certified</span>
              <span className="cert-pill">100% Sivakasi</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home Page</Link>
              </li>
              <li>
                <Link to="/about">About Our Heritage</Link>
              </li>
              <li>
                <Link to="/quick-shopping">Quick Shopping Store</Link>
              </li>
              <li>
                <Link to="/price-list">Price List (PDF &amp; Print)</Link>
              </li>
              <li>
                <Link to="/contact">Contact &amp; Showroom Location</Link>
              </li>
              <li>
                <Link to="/about#safety">Safety Guidelines &amp; Dos/Don'ts</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Cracker Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Top Categories</h4>
            <ul className="footer-links">
              <li>
                <Link to="/quick-shopping?category=flower-pots">Flower Pots (Anar)</Link>
              </li>
              <li>
                <Link to="/quick-shopping?category=sparklers">Sparklers (Phuljhadi)</Link>
              </li>
              <li>
                <Link to="/quick-shopping?category=ground-chakkars">Ground Chakkars (Wheels)</Link>
              </li>
              <li>
                <Link to="/quick-shopping?category=rockets">Sky Rockets &amp; Bombs</Link>
              </li>
              <li>
                <Link to="/quick-shopping?category=fountains">Peacock Fountains &amp; Cones</Link>
              </li>
              <li>
                <Link to="/quick-shopping?category=gift-boxes">Mega Family Gift Boxes</Link>
              </li>
              <li>
                <Link to="/quick-shopping?category=fancy-crackers">Fancy Aerial Multi-Shots</Link>
              </li>
              <li>
                <Link to="/quick-shopping?category=kids-special">Kids Safe Novelties</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Factory Details */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Sivakasi Contact</h4>
            <div className="footer-contact-info">
              <div className="contact-line">
                <MapPin className="icon" size={18} />
                <span>
                  <strong>New Crackers Fireworks:</strong><br />
                  142/3, Factory Road, Sivakasi West,<br />
                  Virudhunagar District, Tamil Nadu – 626123
                </span>
              </div>
              <div className="contact-line">
                <Phone className="icon" size={18} />
                <span>
                  Sales: <a href="tel:+919842112345">+91 98421 12345</a><br />
                  Helpline: <a href="tel:+919876543210">+91 98765 43210</a>
                </span>
              </div>
              <div className="contact-line">
                <Mail className="icon" size={18} />
                <span>
                  <a href="mailto:orders@newcrackers.com">orders@newcrackers.com</a><br />
                  <a href="mailto:support@newcrackers.com">support@newcrackers.com</a>
                </span>
              </div>
              <div className="contact-line">
                <Clock className="icon" size={18} />
                <span>Festival Season: 8:00 AM – 10:00 PM (Everyday)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container bottom-content">
          <p className="copyright">
            © {currentYear} New Crackers Sivakasi. All Rights Reserved. Crafted with <Heart size={14} className="heart-icon" /> for a Happy and Safe Diwali!
          </p>
          <div className="payment-badges">
            <span className="pay-tag">UPI</span>
            <span className="pay-tag">GPay</span>
            <span className="pay-tag">PhonePe</span>
            <span className="pay-tag">Net Banking</span>
            <span className="pay-tag">Safe Transport</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
