import React from 'react';
import { Sparkles } from 'lucide-react';

export const GoldStripeRibbon = ({ className = '' }) => {
  return <div className={`gold-stripe-ribbon no-print ${className}`} role="presentation" />;
};

export const GoldStripeDivider = ({ label = 'DIWALI SPARKLERS', className = '' }) => {
  return (
    <div className={`gold-stripe-divider no-print ${className}`}>
      <span className="stripe-center-badge">
        <Sparkles size={14} /> {label} <Sparkles size={14} />
      </span>
    </div>
  );
};

export default GoldStripeRibbon;
