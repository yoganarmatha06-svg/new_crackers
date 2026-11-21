import React from 'react';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';
import '../styles/TrustFeaturesBar.css';

const TrustFeaturesBar = () => {
  return (
    <section className="trust-features-section" aria-label="Sivakasi Guarantee and Trust Badges">
      <div className="container trust-features-container">
        <div className="trust-features-grid">
          <div className="trust-feature-item">
            <div className="trust-icon-box">
              <Award className="trust-icon" size={24} />
            </div>
            <div className="trust-feature-text">
              <h4>100% Genuine Sivakasi</h4>
              <p>Direct from Sivakasi factory manufacturing units</p>
            </div>
          </div>

          <div className="trust-feature-item">
            <div className="trust-icon-box">
              <ShieldCheck className="trust-icon" size={24} />
            </div>
            <div className="trust-feature-text">
              <h4>Green Cracker Certified</h4>
              <p>Approved by CSIR-NEERI for low emission &amp; safe lighting</p>
            </div>
          </div>

          <div className="trust-feature-item">
            <div className="trust-icon-box">
              <Sparkles className="trust-icon" size={24} />
            </div>
            <div className="trust-feature-text">
              <h4>Direct Factory Pricing</h4>
              <p>Save up to 70% with genuine wholesale prices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustFeaturesBar;
