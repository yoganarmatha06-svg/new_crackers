import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import '../styles/WhatsAppButton.css';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const phoneNumber = '919842112345';
  const defaultMessage = encodeURIComponent(
    'Hello New Crackers! 🪔 I would like to enquire about Diwali crackers pre-booking, availability, and wholesale pricing.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="whatsapp-floating-wrapper no-print">
      {showTooltip && (
        <div className="whatsapp-tooltip">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="tooltip-close"
            aria-label="Dismiss message"
          >
            <X size={12} />
          </button>
          <div className="tooltip-title">Need Help Booking? 🪔</div>
          <div className="tooltip-sub">Chat with our Sivakasi fireworks expert on WhatsApp!</div>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
      >
        <div className="whatsapp-pulse"></div>
        <MessageCircle size={28} className="whatsapp-icon" />
        <span className="whatsapp-label">Chat with Us</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
