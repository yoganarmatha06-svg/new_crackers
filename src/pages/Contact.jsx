import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { GoldStripeRibbon, GoldStripeDivider } from '../components/GoldStripe';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errs.message = 'Message cannot be empty';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setErrors({});
  };

  const faqs = [
    {
      q: 'How are crackers delivered safely to my state/city?',
      a: 'All our consignments are packed in heavy-duty fireproof corrugated boxes with bubble lining and moisture barriers. We ship through authorized surface cargo logistics companies compliant with PESO fireworks transportation regulations.'
    },
    {
      q: 'What is the minimum order value for delivery?',
      a: 'The minimum order value for nationwide doorstep delivery is ₹3,000. For orders over ₹5,000, we include complimentary festival sparkler gift boxes!'
    },
    {
      q: 'Are your crackers genuine CSIR-NEERI certified Green Crackers?',
      a: 'Yes, 100%. All New Crackers products carry genuine CSIR-NEERI QR verification codes and are produced without barium nitrate, reducing harmful particulate emissions by over 30%.'
    },
    {
      q: 'When should I place my order to guarantee delivery before Diwali?',
      a: 'We strongly advise placing your order at least 10 to 14 days before Diwali. Pre-booking in advance also unlocks our maximum 70% wholesale discount before seasonal courier rates rise.'
    }
  ];

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-hero">
        <div className="container">
          <span className="section-badge">
            <Sparkles size={14} /> WE ARE HERE TO HELP
          </span>
          <h1 className="contact-hero-title">Contact New Crackers</h1>
          <p className="contact-hero-subtitle">
            Have questions about pre-booking, wholesale bulk orders, customized gift hampers, or delivery timelines? Get in touch with our Sivakasi fireworks specialists.
          </p>
        </div>
      </section>

      {/* Gold Stripe Ribbon */}
      <GoldStripeRibbon />

      {/* Main Grid: Form + Info */}
      <section className="section contact-main-section">
        <div className="container contact-grid">
          {/* Left: Contact Form */}
          <div className="contact-form-card gold-stripe-top">
            <h2 className="form-card-title">Send Us a Message</h2>
            <p className="form-card-subtitle">
              Fill out the form below and our team will get back to you within 2 hours.
            </p>

            {isSubmitted ? (
              <div className="form-success-alert">
                <CheckCircle size={36} className="success-icon" />
                <h3>Thank You for Contacting Us!</h3>
                <p>
                  Your message has been received by our Sivakasi support desk. Our fireworks coordinator will call or email you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="contact-form">
                <div className="form-row-2">
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Kumar"
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                    />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ramesh@example.com"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row-2">
                  {/* Phone */}
                  <div className="form-group">
                    <label htmlFor="phone">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9842112345"
                      className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    />
                    {errors.phone && <span className="error-msg">{errors.phone}</span>}
                  </div>

                  {/* Subject */}
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`form-input form-select ${errors.subject ? 'input-error' : ''}`}
                    >
                      <option value="">Select subject...</option>
                      <option value="Pre-Booking Enquiry">Pre-Booking Enquiry</option>
                      <option value="Bulk Wholesale Order">Bulk Wholesale Order (&gt; ₹25,000)</option>
                      <option value="Delivery & Tracking">Delivery &amp; Tracking Status</option>
                      <option value="Corporate Gift Hampers">Corporate Gift Hampers</option>
                      <option value="Other Questions">Other Questions</option>
                    </select>
                    {errors.subject && <span className="error-msg">{errors.subject}</span>}
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us your requirements, delivery city, or specific cracker varieties you need..."
                    className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
                  ></textarea>
                  {errors.message && <span className="error-msg">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary form-submit-btn">
                  <Send size={18} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Information & WhatsApp */}
          <div className="contact-info-column">
            {/* Quick WhatsApp Action Box */}
            <div className="whatsapp-callout-card gold-stripe-top">
              <div className="wa-icon-box">
                <MessageCircle size={32} />
              </div>
              <div className="wa-callout-text">
                <h3>Instant WhatsApp Assistance</h3>
                <p>Chat directly with our factory booking manager for quick quotes and instant PDF price lists.</p>
                <a
                  href="https://wa.me/919842112345?text=Hello%20New%20Crackers!%20I%20want%20to%20inquire%20about%20crackers."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold btn-sm wa-btn"
                >
                  <MessageCircle size={16} /> Open WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Address & Details Cards */}
            <div className="info-cards-stack">
              <div className="info-card gold-stripe-top">
                <div className="info-icon-box">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4>Factory &amp; Retail Showroom</h4>
                  <p>
                    <strong>New Crackers Fireworks Industries</strong><br />
                    142/3, Factory Road, Sivakasi West,<br />
                    Virudhunagar District, Tamil Nadu – 626123, India
                  </p>
                </div>
              </div>

              <div className="info-card gold-stripe-top">
                <div className="info-icon-box">
                  <Phone size={22} />
                </div>
                <div>
                  <h4>Phone Helplines</h4>
                  <p>
                    Factory Sales: <a href="tel:+919842112345">+91 98421 12345</a><br />
                    Customer Support: <a href="tel:+919876543210">+91 98765 43210</a>
                  </p>
                </div>
              </div>

              <div className="info-card gold-stripe-top">
                <div className="info-icon-box">
                  <Mail size={22} />
                </div>
                <div>
                  <h4>Email Addresses</h4>
                  <p>
                    Orders: <a href="mailto:orders@newcrackers.com">orders@newcrackers.com</a><br />
                    General: <a href="mailto:support@newcrackers.com">support@newcrackers.com</a>
                  </p>
                </div>
              </div>

              <div className="info-card gold-stripe-top">
                <div className="info-icon-box">
                  <Clock size={22} />
                </div>
                <div>
                  <h4>Festival Working Hours</h4>
                  <p>
                    Monday – Sunday: 8:00 AM – 10:00 PM<br />
                    (Open all 7 days during festival pre-booking season)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Stripe Divider */}
      <GoldStripeDivider label="FACTORY LOCATION MAP" />

      {/* Google Maps Section */}
      <section className="section map-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <MapPin size={14} /> LOCATE OUR SIVAKASI SHOWROOM
            </span>
            <h2 className="section-title">Visit Our Sivakasi Factory Showroom</h2>
            <p className="section-subtitle">
              Heading to Sivakasi for your annual Diwali shopping? Visit our factory showroom to witness the grand cracker display in person.
            </p>
          </div>

          <div className="map-frame-wrapper gold-stripe-top">
            <iframe
              title="New Crackers Sivakasi Factory Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62985.40567675715!2d77.76675271816773!3d9.453303429396324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cee3a4e981b7%3A0xb3574c76041ec01c!2sSivakasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Gold Stripe Divider */}
      <GoldStripeDivider label="FREQUENTLY ASKED QUESTIONS" />

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <HelpCircle size={14} /> COMMON QUESTIONS
            </span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Answers to common queries regarding ordering, payment, packaging and festival transport.
            </p>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item gold-stripe-top ${activeFaq === index ? 'active' : ''}`}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className="faq-arrow" />
                </div>
                {activeFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Gold Stripe Ribbon */}
      <GoldStripeRibbon />
    </div>
  );
};

export default Contact;
