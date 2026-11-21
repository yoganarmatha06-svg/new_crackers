import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/quick-shopping">Quick Shopping</Link>
              </li>
              <li>
                <Link to="/price-list">Price List</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Factory Details */}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
